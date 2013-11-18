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
				'Firefox' : function () {return navigator.userAgent.match(/firefox\/([^\s]*)/i); },
				'Opera' : function () {return navigator.userAgent.match(/opera\/([^\s]*)/i); },
				'IE' : function () {return document.all && !(navigator.userAgent.match(/opera/i)); },
				'Chrome' : function () {return navigator.userAgent.match(/chrome\/([^\s]*)/i); },
				'Safari' : function () {return navigator.userAgent.match(/safari\/([^\s]*)/i); },
				'iCab' : function () {return navigator.userAgent.match(/icab\/([^\s]*)/i); }
			},
			ocheck = {
				'Android' : function () {return navigator.platform.match(/android/i); },
				'MacOS' : function () {return navigator.appVersion.match(/mac/i); },
				'Win' : function () {return navigator.appVersion.match(/win/i); },
				'Linux' : function () {return navigator.userAgent.match(/linux/i); },
				'Unix' : function () {return navigator.appVersion.match(/x11/i); }
			},
			dcheck = {
				'iDevice' : function () {return navigator.userAgent.match(/iPhone|iPad|iPod/i);}
			},
			bro,
			os,
			r;
		JMVC.each(bcheck, function f(fn, nm) {
			r = fn();
			if (r) {
				JMVC.sniffer.browser.name = nm;
				JMVC.sniffer.browser.version = r[1];
				f.break();

			}
		});
		JMVC.each(ocheck, function f(fn, nm) {
			r = fn();
			if (r) {
				JMVC.sniffer.os.name = nm;
				f.break();
			} else {
				JMVC.sniffer.os.name = navigator.platform;
			}
		});
		JMVC.each(dcheck, function f(fn, nm) {
			r = fn();
			if (r) {
				JMVC.sniffer.device.name = nm;
				switch (nm) {
					case 'iPad' :
						if (JMVC.W.screen.availWidth === 768 && JMVC.W.screen.availHeight === 1004) {
							nm = 'iPadMini';
						}
					break;
					default:break;
				}
				f.break();
			}
		});
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
		assets : {
			battery : 'battery' in JMVC.W.navigator || 'mozBattery' in JMVC.W.navigator,
			contentEditable : JMVC.util.propinel('isContentEditable', 'span'),
			crossDocMessaging : !!JMVC.W.postMessage,
			dragAndDrop : JMVC.util.propinel('draggable', 'span'),
			fileAPI : typeof FileReader !== 'undefined',
			geolocation : !!JMVC.W.navigator.geolocation,
			history : !!(JMVC.W.history && JMVC.W.history.pushState && JMVC.W.history.popState),
			localStorage : ('localStorage' in JMVC.W) && JMVC.W['localStorage'] !== null,
			microdata : !!JMVC.WD.getItems,
			offline : !!JMVC.W.appicationCache,
			serverEvents : typeof EventSource !== 'undefined',
			sessionStorage : ('sessionStorage' in JMVC.W) && JMVC.W['sessionStorage'] !== null,
			svg : !!(JMVC.WD.creatElementNS && JMVC.WD.createElementNS('http://www.w3.org/2000/svg','svg').createSVGRect),
			svg_TEXT_HTML : (function () { var e = JMVC.WD.createElement('div'); e.innerHTML = '<svg></svg>'; return !!(JMVC.W.SVGSVGElement && e.firstChild instanceof JMVC.W.SVGSVGElement); })(),
			webSimpleDB : !!JMVC.W.indexedDB,
			webSockets : !!JMVC.W.WebSocket,
			webSQLDatabase : !!JMVC.W.openDatabase,
			webWorkers : !!JMVC.W.Worker,
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


