// type : LIB
//

JMVC.extend('util', {
	checkinput : function (tipo) {
		var i = document.createElement('input');
		i.setAttribute('type', tipo);
		return i.type !== 'text';
	},
	propinel : function (prop, el) {
		return prop in document.createElement(el);
	}
});
JMVC.extend('sniffer', {
	init : function () {
		var bcheck = {
				Firefox : function () {return navigator.userAgent.match(/firefox\/([^\s]*)/i); },
				Opera : function () {return navigator.userAgent.match(/opera\/([^\s]*)/i); },
				IE : function () {return document.all && !(navigator.userAgent.match(/opera/i)); },
				Chrome : function () {return navigator.userAgent.match(/chrome\/([^\s]*)/i); },
				Safari : function () {return navigator.userAgent.match(/safari\/([^\s]*)/i); },
				iCab : function () {return navigator.userAgent.match(/icab\/([^\s]*)/i); }
			},
			ocheck = {
				Android : function () {return navigator.platform.match(/android/i); },
				MacOS : function () {return navigator.appVersion.match(/mac/i); },
				Win : function () {return navigator.appVersion.match(/win/i); },
				Linux : function () {return navigator.userAgent.match(/linux/i); },
				Unix : function () {return navigator.appVersion.match(/x11/i); }
			},
			dcheck = {
				iDevice : function () {return navigator.userAgent.match(/iP(hone|ad|od)/i);},
				BlackBerry : function () {return navigator.userAgent.match(/blackberry/i);}
			},
			bro,
			os,
			r,
			i;

		for (i in bcheck) {
			r = bcheck[i]();
			if (r) {
				JMVC.sniffer.browser.name = i;
				JMVC.sniffer.browser.version = r[1];
				break;
			}
		}

		for (i in ocheck) {
			r = ocheck[i]();
			if (r) {
				JMVC.sniffer.os.name = i;
				break;
			} else {
				JMVC.sniffer.os.name = navigator.platform;
			}
		}
	
		for (i in dcheck) {
			r = dcheck[i]();
			if (r) {
				JMVC.sniffer.device.name = i;
				switch (i) {
					case 'iPad' :
						if (window.screen.availWidth === 768 && window.screen.availHeight === 1004) {
							i = 'iPadMini';
						}
					break;
					default:break;
				}
				break;
			}
		}
	},
	
	features : {
		tags : {
			audio : !!JMVC.WD.createElement('audio').canPlayType,
			audio_MP3 : !!JMVC.WD.createElement('audio').canPlayType('audio/mpeg;').replace(/no/, ''),
			audio_VORBIS : !!JMVC.WD.createElement('audio').canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''),
			audio_WAV : !!JMVC.WD.createElement('audio').canPlayType('audio/wav; codecs="1"').replace(/no/, ''),
			audio_AAC : !!JMVC.WD.createElement('audio').canPlayType('audio/mp4; codecs="mp4a.40.2"').replace(/no/, ''),
			canvas : !!JMVC.WD.createElement('canvas').getContext,
			canvas_txtAPI : (function () {var c = JMVC.WD.createElement('canvas'); return c.getContext && typeof c.getContext('2d').fillText == 'function'; })(),
			command : JMVC.util.propinel('type', 'command'),
			datalist : JMVC.util.propinel('options', 'datalist'),
			details : JMVC.util.propinel('open', 'details'),
			device : JMVC.util.propinel('type', 'device'),
			form_VALIDATION : JMVC.util.propinel('noValidate', 'form'),
			iframe_SANDBOX : (function () {return JMVC.util.propinel('sandbox', 'iframe'); })(),
			iframe_SRCDOC : (function () {return JMVC.util.propinel('srcdoc', 'iframe'); })(),
			input_AUTOFOCUS : (function () {return JMVC.util.propinel('autofocus', 'input'); })(),
			input_PLACEHOLDER : (function () {return JMVC.util.propinel('placeholder', 'input'); })(),
			input_Type_Color : JMVC.util.checkinput('color'),
			input_Type_Email : JMVC.util.checkinput('email'),
			input_Type_Number : JMVC.util.checkinput('number'),
			input_Type_Range : JMVC.util.checkinput('range'),
			input_Type_Search : JMVC.util.checkinput('search'),
			input_Type_Tel : JMVC.util.checkinput('tel'),
			input_Type_Url : JMVC.util.checkinput('url'),
			input_Type_Date : JMVC.util.checkinput('date'),
			input_Type_Time : JMVC.util.checkinput('time'),
			input_Type_Datetime : JMVC.util.checkinput('datetime'),
			input_Type_DatetimeLocal : JMVC.util.checkinput('datetime-local'),
			input_Type_Month : JMVC.util.checkinput('month'),
			input_Type_Week : JMVC.util.checkinput('week'),
			meter : (function () {return JMVC.util.propinel('value', 'meter'); })(),
			output : (function () {return JMVC.util.propinel('value', 'output'); })(),
			progress : (function () {return JMVC.util.propinel('value', 'progress'); })(),
			time : (function () {return JMVC.util.propinel('valueAsDate', 'time'); })(),
			video : (function () {return !!JMVC.WD.createElement('video').canPlayType; })(),
			video_CAPTIONS : (function () {return JMVC.util.propinel('track', 'track'); })(),
			video_POSTER : (function () {return JMVC.util.propinel('poster', 'track'); })(),
			video_WEBm : (function () {var v = JMVC.WD.createElement('video'); return !!(v.canPlayType && v.canPlayType('video/webm; codecs="vp8,vorbis"').replace(/no/, '')); })(),
			video_H264 : (function () {var v = JMVC.WD.createElement('video'); return !!(v.canPlayType && v.canPlayType('video/mp4; codecs="avc1.42E01E,mp4a.40.2"').replace(/no/, '')); })(),
			video_Theora : (function () {var v = JMVC.WD.createElement('video'); return !!(v.canPlayType && v.canPlayType('video/ogg; codecs="theora,vorbis"').replace(/no/, '')); })()
		},



/*
<ul class="task-list">
	<li>
		Ambient Light API
		[<a href="http://www.w3.org/TR/ambient-light/">Specifications</a>]
		[<a href="http://flippinawesome.org/2014/05/27/introduction-to-the-ambient-light-api/">Article</a>]
		[<a href="http://caniuse.com/#feat=ambient-light">Support</a>]
		[<a href="http://aurelio.audero.it/demo/ambient-light-api-demo.html">Live demo</a>]
	</li>
	<li>
		Battery Status API
		[<a href="http://www.w3.org/TR/battery-status/">Specifications</a>]
		[<a href="http://code.tutsplus.com/tutorials/html5-battery-status-api--mobile-22795">Article</a>]
		[<a href="http://caniuse.com/#feat=battery-status">Support</a>]
		[<a href="http://aurelio.audero.it/demo/battery-status-api-demo.html">Live demo</a>]
	</li>
	<li>
		classList API
		[<a href="http://dom.spec.whatwg.org/#dom-element-classlist">Specifications</a>]
		[<a href="http://www.sitepoint.com/exploring-classlist-api/">Article</a>]
		[<a href="http://caniuse.com/#feat=classlist">Support</a>]
		[<a href="http://aurelio.audero.it/demo/classlist-api-demo.html">Live demo</a>]
	</li>
	<li>
		Dataset API
		[<a href="http://www.w3.org/TR/html5/dom.html#dom-dataset">Specifications</a>]
		[<a href="http://www.sitepoint.com/managing-custom-data-html5-dataset-api/">Article</a>]
		[<a href="http://caniuse.com/#feat=dataset">Support</a>]
		[<a href="http://aurelio.audero.it/demo/dataset-api-demo.html">Live demo</a>]
	</li>
	<li>
		Device Orientation API
		[<a href="http://www.w3.org/TR/orientation-event/">Specifications</a>]
		[<a href="http://code.tutsplus.com/tutorials/an-introduction-to-the-device-orientation-api--cms-21067">Article</a>]
		[<a href="http://caniuse.com/#feat=deviceorientation">Support</a>]
		[<a href="http://aurelio.audero.it/demo/device-orientation-api-demo.html">Live demo</a>]
	</li>
	<li>
		Geolocation API
		[<a href="http://www.w3.org/TR/geolocation-API/">Specifications</a>]
		[<a href="http://code.tutsplus.com/tutorials/an-introduction-to-the-geolocation-api--cms-20071">Article</a>]
		[<a href="http://caniuse.com/#feat=geolocation">Support</a>]
		[<a href="http://aurelio.audero.it/demo/geolocation-api-demo.html">Live demo</a>]
	</li>
	<li>
		getUserMedia API
		[<a href="http://dev.w3.org/2011/webrtc/editor/getusermedia.html">Specifications</a>]
		[<a href="http://www.sitepoint.com/introduction-getusermedia-api/">Article</a>]
		[<a href="http://caniuse.com/#feat=stream">Support</a>]
		[<a href="http://aurelio.audero.it/demo/getusermedia-api-demo.html">Live demo</a>]
	</li>
	<li>
		High Resolution Time API
		[<a href="http://www.w3.org/TR/hr-time/">Specifications</a>]
		[<a href="http://www.sitepoint.com/discovering-the-high-resolution-time-api/">Article</a>]
		[<a href="http://caniuse.com/#feat=high-resolution-time">Support</a>]
		[<a href="http://aurelio.audero.it/demo/high-resolution-time-api-demo.html">Live demo</a>]
	</li>
	<li>
		Page Visibility API
		[<a href="http://www.w3.org/TR/page-visibility/">Specifications</a>]
		[<a href="http://www.sitepoint.com/introduction-to-page-visibility-api/">Article</a>]
		[<a href="http://caniuse.com/#feat=pagevisibility">Support</a>]
		[<a href="http://aurelio.audero.it/demo/page-visibility-api-demo.html">Live demo</a>]
	</li>
	<li>
		Proximity API
		[<a href="http://www.w3.org/TR/proximity/">Specifications</a>]
		[<a href="http://www.sitepoint.com/introducing-proximity-api/">Article</a>]
		[<a href="http://caniuse.com/#feat=proximity">Support</a>]
		[<a href="http://aurelio.audero.it/demo/proximity-api-demo.html">Live demo</a>]
	</li>
	<li>
		Speech Synthesis API
		[<a href="https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html#tts-section">Specifications</a>]
		[<a href="http://www.sitepoint.com/talking-web-pages-and-the-speech-synthesis-api/">Article</a>]
		[<a href="http://aurelio.audero.it/demo/speech-synthesis-api-demo.html">Live demo</a>]
	</li>
	<li>
		User Timing API
		[<a href="http://www.w3.org/TR/user-timing/">Specifications</a>]
		[<a href="http://www.sitepoint.com/discovering-user-timing-api/">Article</a>]
		[<a href="http://caniuse.com/#feat=user-timing">Support</a>]
		[<a href="http://aurelio.audero.it/demo/user-timing-api-demo.html">Live demo</a>]
	</li>
	<li>
		Vibration API
		[<a href="http://www.w3.org/TR/vibration/">Specifications</a>]
		[<a href="http://code.tutsplus.com/tutorials/html5-vibration-api--mobile-22585">Article</a>]
		[<a href="http://caniuse.com/#feat=vibration">Support</a>]
		[<a href="http://aurelio.audero.it/demo/vibration-api-demo.html">Live demo</a>]
	</li>
	<li>
		Web Notification API
		[<a href="http://www.w3.org/TR/notifications/">Specifications</a>]
		[<a href="http://www.sitepoint.com/introduction-web-notifications-api/">Article</a>]
		[<a href="http://caniuse.com/#feat=notifications">Support</a>]
		[<a href="http://aurelio.audero.it/demo/web-notifications-api-demo.html">Live demo</a>]</li>
	<li>
		Web Speech API
		[<a href="https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html">Specifications</a>]
		[<a href="http://www.sitepoint.com/introducing-web-speech-api/">Article</a>]
		[<a href="http://caniuse.com/#feat=web-speech">Support</a>]
		[<a href="http://aurelio.audero.it/demo/web-speech-api-demo.html">Live demo</a>]
	</li>
</ul>
*/



		assets : {
			audioAPI : 'AudioContext' in window || 'webkitAudioContext' in window,
			battery : 'battery' in window.navigator || 'mozBattery' in window.navigator,

			/**
			 * add(String), remove(String), toggle(String), item(Integer), length, contains(String, toString())
			 */
			classAPI : 'classList' in document.body,

			/**
			 * Event
			 * compassneedscalibration
			 */
			compassCalibration : 'oncompassneedscalibration' in window,

			contentEditable : JMVC.util.propinel('isContentEditable', 'span'),
			crossDocMessaging : !!window.postMessage,

			/**
			 * dataset, setAttribute(String), getAttribute(String), removeAttribute(String)
			 * String should be 'foo' for data-foo attribute
			 */
			datasetAPI : 'dataset' in document.body,
			deviceLight : 'ondevicelight' in window,

			/**
			 * DeviceMotionEvent {
			 * 	acceleration : {x: , y: , z:}, // in m/s^2
			 * 	accelerationIncludingGravity: //same as before
			 * 	rotationRate : {alfa: , beta: , gamma:},
			 * 	interval: integer// interval for get data, once set cannot be modified
			 * }
			 */
			orientationAPI : 'DeviceOrientationEvent' in window,


			dragAndDrop : JMVC.util.propinel('draggable', 'span'),
			fileAPI : typeof FileReader !== 'undefined',
			geolocation : !!window.navigator.geolocation,
			history : !!(window.history && window.history.pushState && window.history.replaceState),
			localStorage : ('localStorage' in window) && window['localStorage'] !== null,
			microdata : !!JMVC.WD.getItems,
			offline : !!window.appicationCache,
			serverEvents : typeof EventSource !== 'undefined',
			sessionStorage : ('sessionStorage' in window) && window['sessionStorage'] !== null,
			svg : !!(document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")),
			//svg : !!(JMVC.WD.creatElementNS && JMVC.WD.createElementNS('http://www.w3.org/2000/svg','svg').createSVGRect),
			svg_TEXT_HTML : (function () { var e = JMVC.WD.createElement('div'); e.innerHTML = '<svg></svg>'; return !!(window.SVGSVGElement && e.firstChild instanceof window.SVGSVGElement); })(),
			touchDevice : 'ontouchstart' in window // works on most browsers 
				      || 'onmsgesturechange' in window, // works on ie10
			webSimpleDB : !!window.indexedDB,
			webSockets : !!window.WebSocket,
			webSQLDatabase : !!window.openDatabase,
			webWorkers : 'Worker' in window,
			undo : typeof UndoManager !== 'undefined'
		}

	},
	browser : {
		name : 'not found',
		version : 'not found'
	},
	os : {
		name : 'not found'
	},
	device : {
		name : 'not found'
	}
});


