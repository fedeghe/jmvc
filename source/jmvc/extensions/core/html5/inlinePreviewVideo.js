/* eslint-disable no-useless-escape */
JMVC.extend('html5', function () {
    var spinnerClass = 'fa fa-spinner fa-pulse',
        loadedClass = 'fa fa-play-circle',
        volumeActive = 'fa fa-volume-off',
        volumeInactive = 'fa fa-volume-up',
        mobile = (function () {
            var ua = navigator.userAgent || navigator.vendor || window.opera;
            return /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|meego.+mobile|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|playbook|silk/i.test(ua) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0, 4));
        })(),

        _ios = (function () {
            var ua = navigator.userAgent || navigator.vendor || window.opera;
            return /iP(hone|ad|od)/i.test(ua);
        })(),

        _android = (function () {
            var ua = navigator.userAgent || navigator.vendor || window.opera;
            return /android/i.test(ua);
        })(),

        _microsoft = (function () {
            var ua = navigator.userAgent || navigator.vendor || window.opera;
            return /windows/i.test(ua);
        })(),
        evLoaded = mobile ? 'canplaythrough' : 'loadeddata';

    // console.debug(mobile, _ios, _android, _microsoft)

    function PreviewInlineVideoIOS (v) {
        var sources,
            sources2,
            self = this,
            i, l;
        // v.load();

        this.size = {
            height: v.clientHeight,
            width: v.clientWidth
        };
        this.playing = true;
        this.video = v;
        this.video2 = document.createElement('video');
        sources = [].slice.call(this.video.getElementsByTagName('source'), 0);
        sources2 = [
            document.createElement('source'),
            document.createElement('source')
        ];

        this.muted = false;
        this.audioLoaded = false;
        this.videoLoaded = false;
        this.video2Loaded = false;
        this.readyToPlay = false;

        /**
         * append sources
         */
        this.video2.appendChild(sources2[0]);
        this.video2.appendChild(sources2[1]);
        this.audio = document.createElement('audio');
        this.audio.setAttribute('preload', 'preload');
        this.video.setAttribute('preload', 'preload');
        this.video.setAttribute('muted', 'muted');
        this.video.id = 'asdasdas';
        this.cnv = document.createElement('canvas');
        this.cnv.style.width = this.size.width + 'px';
        this.cnv.style.height = this.size.height + 'px';
        this.cnv.style.zIndex = 300;
        this.cnv.style.top = 0;
        this.cnv.style.left = 0;
        this.cnv.style.position = 'absolute';
        this.cnv.setAttribute('width', this.size.width);
        this.cnv.setAttribute('height', this.size.height);
        this.cnv.style.webkitFilter = 'brightness(0.5)';

        this.ctx = this.cnv.getContext('2d');

        this.parent = v.parentNode;

        this.container = JMVC.dom.wrap(this.video);
        this.container.className = 'respfixed'; // only JMVC
        this.container.style.display = 'inline-block';
        this.container.style.width = this.size.width + 'px';
        this.container.style.height = this.size.height + 'px';
        this.container.style.position = 'relative';
        this.container.style.left = 0;
        this.container.style.top = 0;

        this.a_mp4 = document.createElement('source');
        this.a_mp4.setAttribute('type', 'audio/mp4');
        this.a_webm = document.createElement('source');
        this.a_webm.setAttribute('type', 'audio/webm');

        // sources
        //
        for (i = 0, l = sources.length; i < l; i++) {
            switch (sources[i].type) {
            case 'video/mp4':
                this.a_mp4.setAttribute('src', sources[i].src);
                break;
            case 'video/webm':
                this.a_webm.setAttribute('src', sources[i].src);
                break;
            }
            sources2[i].src = sources[i].src;
            sources2[i].type = sources[i].type;
        }

        this.volumeSwitch = document.createElement('span');
        this.volumeSwitch.className = volumeActive;
        this.volumeSwitch.style.position = 'absolute';
        this.volumeSwitch.style.right = 0;
        this.volumeSwitch.style.bottom = 0;
        this.volumeSwitch.style.zIndex = 401;
        this.volumeSwitch.style['font-size'] = this.size.width / 10 + 'px !important';
        this.volumeSwitch.style['line-height'] = this.size.width / 10 + 'px !important';
        this.volumeSwitch.style.width = this.size.width / 10 + 'px';
        this.volumeSwitch.style.cursor = 'pointer';
        this.volumeSwitch.style.color = 'black';
        this.volumeSwitch.style.textShadow = '0px 0px 5px #fff';
        this.volumeSwitch.style.display = 'none';

        this.actionButton = document.createElement('span');
        this.actionButton.className = spinnerClass;
        this.actionButton.style.height = this.actionButton.style.width = this.size.width / 5 + 'px';
        this.actionButton.style.position = 'absolute';
        this.actionButton.style.left = (this.size.width - this.size.width / 5) / 2 + 'px';
        this.actionButton.style.top = (this.size.height - this.size.width / 5) / 2 + 'px';
        this.actionButton.style['font-size'] = this.size.width / 5 + 'px !important';
        this.actionButton.style['line-height'] = this.size.width / 5 + 'px !important';
        this.actionButton.style.pointerEvents = 'none';
        this.actionButton.style.color = 'black';
        this.actionButton.style.cursor = 'pointer';
        this.actionButton.style.textShadow = '0px 0px 5px #fff';
        this.actionButton.style.zIndex = 301;

        this.rushPlay = v.hasAttribute('autoplay');

        this.video.style.display = 'none';

        function setVideo (_v, z) {
            _v.style.position = 'absolute';
            _v.style.left = 0;
            _v.style.top = 0;
            _v.style.width = self.size.width + 'px';
            _v.style.height = self.size.height + 'px';
            _v.style.zIndex = z;
            _v.setAttribute('preload', 'preload');
        }

        setVideo(this.video, 200);
        setVideo(this.video2, 299);

        // append
        this.audio.appendChild(this.a_mp4);
        this.audio.appendChild(this.a_webm);
        this.container.appendChild(this.video2);
        this.container.appendChild(this.audio);
        this.container.appendChild(this.volumeSwitch);
        this.container.appendChild(this.actionButton);
        this.container.appendChild(this.cnv);

        this.parent.appendChild(this.container);

        self.ctx.drawImage(v, 0, 0, self.size.width, self.size.height);

        //
        // =====================================================
        //
        (this.video.readyState === 4 && self._videoIsLoaded()) ||
        this.video.addEventListener(evLoaded, function () {
            self._videoIsLoaded();
        }, false);
        //
        // =====================================================
        //
        (this.video2.readyState === 4 && self._video2IsLoaded()) ||
        this.video2.addEventListener(evLoaded, function () {
            self._video2IsLoaded();
        }, false);
        //
        // =====================================================
        //
        (this.audio.readyState === 4 && self._audioIsLoaded()) ||
        this.audio.addEventListener(evLoaded, function () {
            self._audioIsLoaded();
        }, false);
        //
        // =====================================================
        //

        this.volumeSwitch.addEventListener('click', function () {
            self.volumeSwitch.className = self.muted ? volumeActive : volumeInactive;
            self[self.muted ? 'unmute' : 'mute']();
        });

        this.audio.load();
        this.video.load();
        this.video2.load();
    }

    PreviewInlineVideoIOS.prototype = {

        _audioIsLoaded: function () {
            this.video2.currentTime = 0;
            this.audioLoaded = true;
            this._synchCheck();
            return true;
        },

        _videoIsLoaded: function () {
            this.videoLoaded = true;
            this._synchCheck();
            return true;
        },
        _video2IsLoaded: function () {
            this.video2Loaded = true;
            this._synchCheck();
            return true;
        },

        _synchCheck: function () {
            if (this.videoLoaded && this.video2Loaded && this.audioLoaded) {
                this._readyToPreview();
                this.video2.currentTime = 0;
                this.readyToPlay = true;
                return true;
            }
            return false;
        },

        _readyToPreview: function (again) {
            var self = this;
            self.video2.style.display = 'block';
            self.ctx.drawImage(self.video, 0, 0, self.size.width, self.size.height);
            self.video2.currentTime = 0;

            self.cnv.addEventListener('click', function () {
                // container.appendChild(video2);
                // self.cnv.style.display = 'none';

                self.actionButton.style.display = 'none';
                // self.video2.play();
                self.cnv.style.webkitFilter = 'brightness(1)';

                // volumeswitch
                self.volumeSwitch.style.display = 'block';

                self.audio.currentTime = 0;
                self.video.currentTime = 0;
                self.video2.currentTime = 0;
                if (!self.startedAudio) {
                    self.startedAudio = true;
                    self.audio.play();
                }
            });
            self._startPreview();
            return true;
        },

        _startPreview: function () {
            var self = this;
            self.cnv.style.cursor = 'pointer';
            // this.cnv.className = '';
            self.cnv.style.webkitFilter = 'brightness(0.5)';
            self.actionButton.className = loadedClass;
            // remove the video from the dom, but still have it here
            // self.container.removeChild(self.video);
            // !again && (video.style.visibiliy = 'hidden');

            self._doPlay();
        },

        _doPlay: function () {
            this.video2.currentTime = 0;
            this.video.currentTime = 0;

            this.playing = true;
            console.debug('playing');
            this._loop();
        },

        _loop: function () {
            var self = this,
                lastTime = Date.now(),
                framesPerSecond = 25;
            this.startedAudio = false;
            // if (!this.video.muted) {
            //     this.audio.currentTime = this.video.currentTime;
            // }
            console.debug('_loop');
            (function rep () {
                if (self.playing) {
                    var time = Date.now(),
                        elapsed = (time - lastTime) / 1000,
                        currentTime = (Math.round(parseFloat(self.video.currentTime) * 10000) / 10000),
                        duration = (Math.round(parseFloat(self.video.duration) * 10000) / 10000);

                    if (elapsed >= ((1000 / framesPerSecond) / 1000)) {
                        self.video.currentTime = self.video.currentTime + elapsed;

                        self.ctx.drawImage(self.video, 0, 0, self.size.width, self.size.height);
                        lastTime = time;
                    }
                    if (currentTime >= duration) {
                        // playing = false;
                        currentTime = 0;
                        self.playing = false;
                        self.startedAudio = false;
                        console.log('ENDED: currentTime: ' + currentTime + ' duration: ' + self.video.duration);
                        self._againPreview();
                        return;
                    }
                } else {
                    lastTime = Date.now();
                }
                requestAnimationFrame(rep);
            })();
        },

        _againPreview: function () {
            this.cnv.style.cursor = 'pointer';
            this.cnv.style.webkitFilter = 'brightness(0.5)';
            this.actionButton.className = loadedClass;
            this.actionButton.style.display = 'block';
            this._doPlay();

            return true;
        },
        checkHaveToPlay: function () {
            this.rushPlay && this._doPlay();
        },
        // PUBLIC
        //
        play: function () {
            this.playing = true;
            this.rushPlay = true;
            this.readyToPlay && this._doPlay();
        },
        pause: function () {
            this.playing = false;
            this.audio.pause();
            this.audio.currentTime = this.video.currentTime;
        },
        resume: function () {
            this.audio.currentTime = this.video.currentTime;
            this.audio.play();
            this.playing = true;
        },
        seekTo: function (t) {
            t = t || 0;
            this.video.currentTime = t;
            this.video2.currentTime = t;
            this.audio.currentTime = t;
        },
        mute: function () {
            this.audio.pause();
            this.muted = true;
        },
        unmute: function () {
            this.audio.currentTime = this.video.currentTime;
            this.audio.play();
            this.muted = false;
        }
    };

    function PreviewInlineVideoANDROID (v) {
        // eslint-disable-next-line no-unused-vars
        var sources,
            self = this;
        // v.load();

        this.size = {
            height: v.clientHeight,
            width: v.clientWidth
        };
        this.playing = true;
        this.video = v;

        sources = [].slice.call(this.video.getElementsByTagName('source'), 0);

        this.muted = false;

        this.videoLoaded = false;
        this.readyToPlay = false;

        /**
         * append sources
         */
        this.video.setAttribute('preload', 'preload');
        this.video.setAttribute('muted', 'muted');
        this.parent = v.parentNode;
        this.container = JMVC.dom.wrap(this.video);
        this.container.className = 'respfixed'; // only JMVC
        this.container.style.display = 'inline-block';
        this.container.style.width = this.size.width + 'px';
        this.container.style.height = this.size.height + 'px';
        this.container.style.position = 'relative';
        this.container.style.left = 0;
        this.container.style.top = 0;

        this.volumeSwitch = document.createElement('span');
        this.volumeSwitch.className = volumeActive;
        this.volumeSwitch.style.position = 'absolute';
        this.volumeSwitch.style.right = 0;
        this.volumeSwitch.style.bottom = 0;
        this.volumeSwitch.style.zIndex = 401;
        this.volumeSwitch.style['font-size'] = this.size.width / 10 + 'px';
        this.volumeSwitch.style['line-height'] = this.size.width / 10 + 'px';
        this.volumeSwitch.style.width = this.size.width / 10 + 'px';
        this.volumeSwitch.style.cursor = 'pointer';
        this.volumeSwitch.style.color = 'black';
        this.volumeSwitch.style.textShadow = '0px 0px 5px #fff';
        this.volumeSwitch.style.display = 'none';

        this.actionButton = document.createElement('span');
        this.actionButton.className = spinnerClass;
        this.actionButton.style.height = this.actionButton.style.width = this.size.width / 5 + 'px';
        this.actionButton.style.position = 'absolute';
        this.actionButton.style.left = (this.size.width - this.size.width / 5) / 2 + 'px';
        this.actionButton.style.top = (this.size.height - this.size.width / 5) / 2 + 'px';
        this.actionButton.style['font-size'] = this.size.width / 5 + 'px';
        this.actionButton.style['line-height'] = this.size.width / 5 + 'px';
        this.actionButton.style.pointerEvents = 'none';
        this.actionButton.style.color = 'black';
        this.actionButton.style.cursor = 'pointer';
        this.actionButton.style.textShadow = '0px 0px 5px #fff';
        this.actionButton.style.zIndex = 301;

        this.rushPlay = v.hasAttribute('autoplay');

        // this.video.style.display = "none";
        // this.audio.style.display = "none";

        function setVideo (_v, z) {
            _v.style.position = 'absolute';
            _v.style.left = 0;
            _v.style.top = 0;
            _v.style.width = self.size.width + 'px';
            _v.style.height = self.size.height + 'px';
            _v.style.zIndex = z;
            _v.setAttribute('preload', 'preload');
        }

        setVideo(this.video, 200);

        // append
        this.container.appendChild(this.volumeSwitch);
        this.container.appendChild(this.actionButton);

        this.parent.appendChild(this.container);

        //
        // =====================================================
        //
        (this.video.readyState === 4 && self._videoIsLoaded()) || /// on android is 'loadeddata'
        this.video.addEventListener('loadeddata', function () {
            self._videoIsLoaded();
        }, false);

        this.volumeSwitch.addEventListener('click', function () {
            self.volumeSwitch.className = self.muted ? volumeActive : volumeInactive;
            self[self.muted ? 'unmute' : 'mute']();
        });
    }

    PreviewInlineVideoANDROID.prototype = {
        _videoIsLoaded: function () {
            var self = this,
                started = false;

            this.videoLoaded = true;

            function videoStart () {
                if (started) return;
                started = true;
                self._readyToPreview();
                console.log('first touch');
                // remove from the window and call the function we are removing
                this.removeEventListener('touchstart', videoStart);
                this.removeEventListener('touchmove', videoStart);
                this.removeEventListener('touchend', videoStart);
            }

            window.addEventListener('touchstart', videoStart);
            window.addEventListener('touchmove', videoStart);
            window.addEventListener('touchend', videoStart);

            this.readyToPlay = true;
        },

        _readyToPreview: function (again) {
            var self = this;

            self.video.setAttribute('muted', 'muted');
            self.video.volume = 0;

            self.video.addEventListener('click', function calle () {
                self.actionButton.style.display = 'none';
                self.video.style.webkitFilter = 'brightness(1)';

                // volumeswitch
                self.volumeSwitch.style.display = 'block';
                self.video.currentTime = 0;

                self.video.removeAttribute('loop');
                self.video.removeAttribute('muted');
                self.video.volume = 1;

                self.video.removeEventListener('click', calle);
                self.video.addEventListener('ended', function () {
                    self.actionButton.style.display = 'block';
                    self.volumeSwitch.style.display = 'none';
                    self._readyToPreview();
                });
            });
            self._startPreview();
            return true;
        },

        _startPreview: function () {
            var self = this;
            self.video.style.cursor = 'pointer';
            self.video.style.webkitFilter = 'brightness(0.5)';
            self.actionButton.className = loadedClass;
            self._doPlay();
        },

        _doPlay: function () {
            this.video.currentTime = 0;
            this.playing = true;
            console.debug('playing');
            this._loop();
        },

        _loop: function () {
            var self = this;
            self.video.setAttribute('loop', 'loop');
            self.video.play();
        },

        _againPreview: function () {
            this.video.style.cursor = 'pointer';
            // this.cnv.className = '';
            this.video.style.webkitFilter = 'brightness(0.5)';
            this.actionButton.className = loadedClass;
            this.actionButton.style.display = 'block';

            // video.parentNode.removeChild(video);
            this._doPlay();

            return true;
        },
        checkHaveToPlay: function () {
            this.rushPlay && this._doPlay();
        },
        // PUBLIC
        //
        play: function () {
            this.playing = true;
            this.rushPlay = true;
            this.readyToPlay && this._doPlay();
        },
        pause: function () {
            this.playing = false;
            this.video.pause();
        },
        resume: function () {
            this.video.play();
            this.playing = true;
        },
        seekTo: function (t) {
            t = t || 0;
            this.video.currentTime = t;
        },
        mute: function () {
            this.video.setAttribute('muted', 'muted');
            this.video.volume = 0;
            this.muted = true;
        },
        unmute: function () {
            this.video.removeAttribute('muted');
            this.video.volume = 1;
            this.muted = false;
        }
    };

    function PreviewInlineVideoMICROSOFT (v) { }
    PreviewInlineVideoMICROSOFT.prototype = {};

    return {
        previewInlineVideo: function (v) {
            var ilv;
            if (_ios) {
                ilv = new PreviewInlineVideoIOS(v);
            } else if (_android) {
                ilv = new PreviewInlineVideoANDROID(v);
            } else if (_microsoft) {
                ilv = new PreviewInlineVideoMICROSOFT(v);
            } else {
                return false;
            }

            return {
                play: function () { ilv.play(); },
                resume: function () { ilv.resume(); },
                pause: function () { ilv.pause(); },
                seekTo: function (t) { ilv.seekTo(t); },
                mute: function () { ilv.mute(); },
                unmute: function () { ilv.unmute(); },
                canvas: ilv.cnv,
                video: ilv.video
            };
        }
    };
});
