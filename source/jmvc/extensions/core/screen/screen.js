// type : LIB
//

JMVC.extend('screen', {
    getViewportSize: function () {
        if (typeof JMVC.W.innerWidth !== 'undefined') {
            return {
                width: JMVC.W.innerWidth,
                height: JMVC.W.innerHeight
            };
        } else {
            if (typeof JMVC.WD.documentElement !== 'undefined' &&
                typeof JMVC.WD.documentElement.clientWidth !== 'undefined' &&
                JMVC.WD.documentElement.clientWidth !== 0
            ) {
                return {
                    width: JMVC.WD.documentElement.clientWidth,
                    height: JMVC.WD.documentElement.clientHeight
                };
            } else {
                return {
                    width: JMVC.WD.getElementsByTagName('body')[0].clientWidth,
                    height: JMVC.WD.getElementsByTagName('body')[0].clientHeight
                };
            }
        }
    },

    bodySize: function () {
        var body = JMVC.WD.body,
            html = JMVC.WD.documentElement;
        return [
            JMVC.WD.getElementsByTagName('html')[0].clientWidth,
            Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
        ];
    },

    getScreenData: function () {
        return {
            clientWidth: this.f_filterResults(
                JMVC.W.innerWidth ? JMVC.W.innerWidth : 0,
                JMVC.WD.documentElement ? JMVC.WD.documentElement.clientWidth : 0,
                JMVC.WD.body ? JMVC.WD.body.clientWidth : 0
            ),
            clientHeight: this.f_filterResults(
                JMVC.W.innerHeight ? JMVC.W.innerHeight : 0,
                JMVC.WD.documentElement ? JMVC.WD.documentElement.clientHeight : 0,
                JMVC.WD.body ? JMVC.WD.body.clientHeight : 0
            ),
            scrollLeft: this.f_filterResults(
                JMVC.W.pageXOffset ? JMVC.W.pageXOffset : 0,
                JMVC.WD.documentElement ? JMVC.WD.documentElement.scrollLeft : 0,
                JMVC.WD.body ? JMVC.WD.body.scrollLeft : 0
            ),
            scrollTop: this.f_filterResults(
                JMVC.W.pageYOffset ? JMVC.W.pageYOffset : 0,
                JMVC.WD.documentElement ? JMVC.WD.documentElement.scrollTop : 0,
                JMVC.WD.body ? JMVC.WD.body.scrollTop : 0
            )
        };
    },

    getNodePosition: function (elem) {
        var box = elem.getBoundingClientRect(),
            body = document.body,
            docElem = document.documentElement,
            scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
            scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft,
            clientTop = docElem.clientTop || body.clientTop || 0,
            clientLeft = docElem.clientLeft || body.clientLeft || 0;
        return {
            top: box.top + scrollTop - clientTop,
            left: box.left + scrollLeft - clientLeft
        };
    },

    f_filterResults: function (nWin, nDocel, nBody) {
        var nResult = nWin || 0;
        if (nDocel && (!nResult || (nResult > nDocel))) {
            nResult = nDocel;
        }
        return nBody && (!nResult || (nResult > nBody)) ? nBody : nResult;
    },

    no_frames: function () {
        if (JMVC.W.top.location !== JMVC.W.location) {
            JMVC.W.top.location.href = JMVC.WD.location.href;
        }
    },

    'window': function () {
        if (typeof (JMVC.W.innerWidth) === 'number') {
            // Non-IE
            return {
                width: JMVC.W.innerWidth,
                height: JMVC.W.innerHeight
            };
        } else if (JMVC.WD.documentElement && JMVC.WD.documentElement.clientWidth) {
            // IE 6+ in 'standards compliant mode'
            return {
                width: JMVC.WD.documentElement.clientWidth,
                height: JMVC.WD.documentElement.clientHeight
            };
        } else if (JMVC.WD.body && JMVC.WD.body.clientWidth) {
            // IE 4 compatible
            return {
                width: JMVC.WD.body.clientWidth,
                height: JMVC.WD.body.clientHeight
            };
        }

        return {
            width: void 0,
            height: void 0
        };
    },

    screen: function () {
        return {
            width: JMVC.W.innerWidth,
            height: JMVC.W.innerHeight
        };
    },

    page: function () {
        var d = {
                width: typeof JMVC.WD.width !== 'undefined' ? JMVC.WD.width : JMVC.WD.body.offsetWidth,
                height: typeof JMVC.WD.height !== 'undefined' ? JMVC.WD.height : JMVC.WD.body.offsetHeight
            },
            wp = JMVC.screen.screen();
        /**
         * if body is taller than viewport the page height assumes viewport height
         */
        return {
            width: d.width,
            height: wp.height > d.height ? wp.height : d.height
        };
    },
    /*
    canScroll : function () {
        return JMVC.W.innerHeight <
            (window.innerHeight >  (document.height || document.body.offsetHeight) ?
                window.innerHeight
                :
                (document.height || document.body.offsetHeight)
            );
    },
    */

    canScroll: function (node) {
        if (typeof node === 'undefined') {
            if (window.innerHeight) {
                return document.body.offsetHeight > innerHeight;
            }
            return document.documentElement.scrollHeight > document.documentElement.offsetHeight ||
                document.body.scrollHeight > document.body.offsetHeight;
        }
        return node.scrollHeight > node.offsetHeight;
    },

    // window.innerHeight >  (document.height || document.body.offsetHeight) ? window.innerHeight : document.height || document.body.offsetHeight

    scroll: function () {
        return {
            left: JMVC.screen.f_filterResults(
                JMVC.W.pageXOffset ? JMVC.W.pageXOffset : 0,
                JMVC.WD.documentElement ? JMVC.WD.documentElement.scrollLeft : 0,
                JMVC.WD.body ? JMVC.WD.body.scrollLeft : 0
            ),
            top: JMVC.screen.f_filterResults(
                JMVC.W.pageYOffset ? JMVC.W.pageYOffset : 0,
                JMVC.WD.documentElement ? JMVC.WD.documentElement.scrollTop : 0,
                JMVC.WD.body ? JMVC.WD.body.scrollTop : 0
            )
        };
    },

    /**
     * take the screen dimensions of the square that needs to be centerer
     * returns the upper-left absolute position to be used
     */
    centerHelper: function (w, h) {
        var win = JMVC.screen.window(),
            scroll = JMVC.screen.scroll();
        return {
            left: scroll['left'] + (win['width'] - w) / 2,
            top: scroll['top'] + (win['height'] - h) / 2
        };
    },

    fullscreen: function () {
        JMVC.W.moveTo(0, 0);
        if (JMVC.WD.all) {
            JMVC.W.top.window.resizeTo(screen.availWidth, screen.availHeight);
        } else if (
            (JMVC.WD.layers || JMVC.WD.getElementById) &&
            (JMVC.W.top.window.outerHeight < screen.availHeight || JMVC.W.top.window.outerWidth < screen.availWidth)
        ) {
            JMVC.W.top.window.outerHeight = screen.availHeight;
            JMVC.W.top.window.outerWidth = screen.availWidth;
        }
    },

    // http://davidwalsh.name/fullscreen
    launchFullscreen: function (el) {
        el = el || JMVC.WD.body;
        if (el.requestFullscreen) {
            el.requestFullscreen();
        } else if (el.mozRequestFullScreen) {
            el.mozRequestFullScreen();
        } else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen();
        } else if (el.msRequestFullscreen) {
            el.msRequestFullscreen();
        }
    },
    // http://davidwalsh.name/fullscreen
    exitFullscreen: function (el) {
        // var trg = el || document;
        if (el.exitFullscreen) {
            el.exitFullscreen();
        } else if (el.mozCancelFullScreen) {
            el.mozCancelFullScreen();
        } else if (el.webkitExitFullscreen) {
            el.webkitExitFullscreen();
        }
    },
    enabled: document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled,
    el: function () {
        return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
    }
});
