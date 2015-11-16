JMVC.require('core/screen/screen');
JMVC.extend('html5', function () {
	
	var spinnerClass = "fa fa-spinner fa-pulse",
		loadedClass = "fa fa-play-circle",
		replayClass = "fa fa-refresh",
		mobile = (function () {
		    var ua = (navigator.userAgent || navigator.vendor || window.opera).substr(0, 4);
		    return /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|meego.+mobile|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|playbook|silk/i.test(ua) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua);
		})(),
		evLoaded = mobile ? 'canplaythrough' : 'loadeddata';

	function videoPreview (video) {
		
		var sources = [].slice.call(video.getElementsByTagName('source'), 0),
	        size = {
				height : video.clientHeight,
				width : video.clientWidth
			},
			cnv = document.createElement('canvas'),
			ctx,
			actionButton,
			videoLoaded = false,
			video2Loaded = false,

			/**
			 * this video tag is created as source for the preview video within the canvas
			 */
			video2 = document.createElement('video'),
			sources2 = [
				document.createElement('source'),
				document.createElement('source')
			],
			playing = true,
			container;
		
		function insertAfter(node, referenceNode) {
			var p = referenceNode.parentNode;
			p.insertBefore(node, referenceNode.nextSibling);
			return node;
		}
		function wrap(node, tag) {
			var wrap = document.createElement(tag || 'div');
			insertAfter(wrap, node);
			wrap.appendChild(node);
			return wrap;
		}

		/**
		 * style the canvas used for playing back
		 */
		cnv.style.width = size.width + 'px',
		cnv.style.height = size.height + 'px';
		cnv.style.zIndex = 300;
		cnv.style.position = 'absolute';
		cnv.style.top = 0;
		cnv.style.left = 0;
		cnv.setAttribute('width', size.width);
		cnv.setAttribute('height', size.height);
		cnv.style.webkitFilter = 'brightness(0.5)';



		ctx = cnv.getContext('2d');
		

		/**
		 * wrap the video withina container, and stlye it
		 */
        container = wrap(video);
		container.style.display = 'inline-block';
		container.style.width = size.width + 'px';
		container.style.height = size.height + 'px';
        container.style.position = 'relative';

        /**
         * a dry function for common actions over videos tag
         */
        function setVideo(_v, z) {
        	_v.style.position = 'absolute';
	        _v.style.left = 0;
	        _v.style.top = 0;
	        _v.style.width = size.width + 'px';
	        _v.style.height = size.height + 'px';
	        _v.style.zIndex = z;
			_v.setAttribute('preload', 'preload');
        }

        setVideo(video, 200);
        setVideo(video2, 299);

        /**
         * copy video2 sources src & type attributes
         */
		sources2[0].src = sources[0].src;
		sources2[0].type = sources[0].type;
		sources2[1].src = sources[1].src;
		sources2[1].type = sources[1].type;

		/**
		 * append sources
		 */
		video2.appendChild(sources2[0]);
		video2.appendChild(sources2[1]);
		
		
		// video2.style.display = 'none';
		// video2.id = 'video2';
		video2.setAttribute('controls', 'controls');



		/**
		 * create the action button used for play and replay 
		 */
        actionButton = document.createElement('span');

        /**
         * at this time for sure has to be a spinner
         */
        actionButton.className = spinnerClass;

        actionButton.style.height =
        actionButton.style.width = size.width / 5 + 'px';

	    actionButton.style.position = 'absolute';
	    actionButton.style.left = (size.width - size.width / 5) / 2 + 'px';
	    actionButton.style.top = (size.height - size.width / 5) / 2 + 'px';
	    actionButton.style.fontSize = actionButton.style.width;
	    actionButton.style.pointerEvents = 'none';
	    actionButton.style.color = 'black';
	    actionButton.style.cursor = 'pointer';
	    actionButton.style.textShadow = '0px 0px 5px #fff';
	    actionButton.style.zIndex = 301;


	    container.appendChild(actionButton);	    
	    container.appendChild(video2);
	    container.appendChild(cnv);



	    (video2.readyState == 4 && _checkLoad())
        ||
        video2.addEventListener(evLoaded, function () {
        	video2Loaded = true;
        	_checkLoad();
        	playing = true;
        }, false);



        video2.addEventListener('ended', function () {
        	cnv.style.display = 'block';
        	actionButton.style.display = 'block';
        	JMVC.screen.exitFullscreen(video2);
        }, false);
        video2.addEventListener('pause', function () {
        	cnv.style.display = 'block';
        	actionButton.style.display = 'block';
        	playing = true;
        }, false);
	    

	    (video.readyState == 4 && _checkLoad())
        ||
        video.addEventListener(evLoaded, function () {
        	videoLoaded = true;
        	_checkLoad();
        }, false);


        video.load();
        video2.load();

        function _checkLoad () {
        	// console.debug(videoLoaded, video2Loaded);
        	videoLoaded && video2Loaded && _videoIsLoaded();
        }


	    function _videoIsLoaded() {
	    	video2.style.display = 'block';
			ctx.drawImage(video, 0, 0, size.width, size.height);
	        video.currentTime = 0;
	        

	        cnv.addEventListener('click', function () {
	        	// container.appendChild(video2);
	        	cnv.style.display = 'none';
	        	
        		actionButton.style.display = 'none';
        		video2.play();
        		playing = false;

	        	
	        });
	        _startPreview();
	        return true;
        }

        function _startPreview () {
        	cnv.style.cursor = 'pointer';
        	// this.cnv.className = '';
	        cnv.style.webkitFilter = 'brightness(0.5)';
	        actionButton.className = loadedClass;
	        // remove the video from the dom, but still have it here 
	       	container.removeChild(video);
	        // !again && (video.style.visibiliy = 'hidden');
	        
	        _doPlay();
        }

        function _againPreview() {
        	cnv.style.cursor = 'pointer';
        	// this.cnv.className = '';
	        cnv.style.webkitFilter = 'brightness(0.5)';
	        actionButton.className = loadedClass;
	       	actionButton.style.display = 'block';

	        // video.parentNode.removeChild(video);
	        
	        _doPlay();
	        return true;
        }

        function _doPlay() {
        	video.currentTime = 0;

        	console.debug('playing');
        	_loop();
        }

        function _loop () {
        	var lastTime = Date.now(),
	        	animationFrame,
        		framesPerSecond = 25;

	        ~function r() {
	        	
	            if (playing) {
	                var time = Date.now(),
	                    elapsed = (time - lastTime) / 1000,
	                    currentTime = (Math.round(parseFloat(video.currentTime) * 10000) / 10000),
	                    duration = (Math.round(parseFloat(video.duration) * 10000) / 10000);

	                if (elapsed >= ((1000 / framesPerSecond) / 1000)) {
	                    video.currentTime = video.currentTime + elapsed;
	                    
	                    ctx.drawImage(video, 0, 0, size.width, size.height);
	                    lastTime = time;
	                }
	                if (currentTime >= duration) {
	                	// playing = false;
	                	
	                    console.log('ENDED: currentTime: ' + currentTime + ' duration: ' + video.duration);
	                    _againPreview();
	                    return;
	                }
	            } else {
	            	lastTime = Date.now();
	            }
	            animationFrame = requestAnimationFrame(r);
	        }();
        }   
	}

	return {
		videoPreview : videoPreview
	}
});