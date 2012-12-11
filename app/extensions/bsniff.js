

































































































































JMVC.extend('util', {
	checkinput : function (tipo) { var i = document.createElement('input'); i.setAttribute('type', tipo); return i.type !== 'text'; },
	propinel : function (prop, el) {return prop in document.createElement(el); }
});
JMVC.extend('sniff', {
	init : function () {
		var bcheck = {
				Firefox : "navigator.userAgent.match(/firefox\\\/([^\\\s]*)/i)",
				Opera : "navigator.userAgent.match(/opera\\\/([^\\\s]*)/i)",
				IE : "document.all && !(navigator.userAgent.match(/opera/i))",
				Chrome : "navigator.userAgent.match(/chrome\\\/([^\\\s]*)/i)",
				Safari : "navigator.userAgent.match(/safari\\\/([^\\\s]*)/i)",
				iCab : "navigator.userAgent.match(/icab\\\/([^\\\s]*)/i)"
			},
			ocheck = {
				MacOS : "navigator.appVersion.match(/mac/i)",
				Win : "navigator.appVersion.match(/win/i)",
				Linux : "navigator.userAgent.match(/linux/i)",
				Unix : "navigator.appVersion.match(/x11/i)"
			},
			bro,
			os,
			r;
		for (bro in bcheck) {
			r = eval(bcheck[bro]);
			if (r){
				JMVC.sniff.browser.name = bro;
				JMVC.sniff.browser.version = r[1];
				break;
			}
		}
		for (os in ocheck) {
			r = eval(ocheck[os]);
			if (r){
				JMVC.sniff.os.name = os;
				break;
			}
		}		
	},
	
	features : {
		tags : {
			audio : (function () {return !!document.createElement('audio').canPlayType; })(),
			audio_MP3 : (function () {var a = document.createElement('audio'); return !!(a.canPlayType('audio/mpeg;').replace(/no/, '')); })(),
			audio_VORBIS : (function () {var a = document.createElement('audio'); return !!(a.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, '')); })(),
			audio_WAV : (function () {var a = document.createElement('audio'); return !!(a.canPlayType('audio/wav; codecs="1"').replace(/no/, '')); })(),
			audio_AAC : (function () {var a = document.createElement('audio'); return !!(a.canPlayType('audio/mp4; codecs="mp4a.40.2"').replace(/no/, '')); })(),
			canvas : (function () {return !!document.createElement('canvas').getContext; })(),
			canvas_txtAPI : (function () {var c = document.createElement('canvas'); return c.getContext && typeof c.getContext('2d').fillText == 'function'; })(),
			command : (function () {return JMVC.util.propinel('type', 'command'); })(),
			datalist : (function () {return JMVC.util.propinel('options', 'datalist'); })(),
			details : (function () {return JMVC.util.propinel('open', 'details'); })(),
			device : (function () {return JMVC.util.propinel('type', 'device'); })(),
			form_VALIDATION : (function () {return JMVC.util.propinel('noValidate', 'form'); })(),
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
			video : (function () {return !!document.createElement('video').canPlayType; })(),
			video_CAPTIONS : (function () {return JMVC.util.propinel('track', 'track'); })(),
			video_POSTER : (function () {return JMVC.util.propinel('poster', 'track'); })(),
			video_WEBm : (function () {var v = document.createElement('video'); return !!(v.canPlayType && v.canPlayType('video/webm; codecs="vp8,vorbis"').replace(/no/, '')); })(),
			video_H264 : (function () {var v = document.createElement('video'); return !!(v.canPlayType && v.canPlayType('video/mp4; codecs="avc1.42E01E,mp4a.40.2"').replace(/no/, '')); })(),
			video_Theora : (function () {var v = document.createElement('video'); return !!(v.canPlayType && v.canPlayType('video/ogg; codecs="theora,vorbis"').replace(/no/, '')); })()
		},
		assets : {
			contentEditable : (function () {return JMVC.util.propinel('isContentEditable', 'span'); })(),
			crossDocMessaging : (function () {return !!window.postMessage; })(),
			dragAndDrop : (function () {return JMVC.util.propinel('draggable', 'span'); })(),
			fileAPI : (function () {return typeof FileReader !== 'undefined'; })(),
			geolocation : (function () {return !!navigator.geolocation; })(),
			history : (function () {return !!(window.history && window.history.pushState && window.history.popState); })(),
			localStorage : (function () {return ('localStorage' in window) && window['localStorage'] !== null; })(),
			microdata : (function () {return !!document.getItems; })(),
			offline : (function () {return !!window.appicationCache; })(),
			serverEvents : (function () {return typeof EventSource !== 'undefined'; })(),
			sessionStorage : (function () {try {return ('sessionStorage' in window) && window['sessionStorage'] !== null; } catch (e) {return false; }})(),
			svg : (function () {return !!(document.creatElementNS && document.createElementNS('http://www.w3.org/2000/svg','svg').createSVGRect); })(),
			svg_TEXT_HTML : (function () { var e = document.createElement('div'); e.innerHTML = '<svg></svg>'; return !!(window.SVGSVGElement && e.firstChild instanceof window.SVGSVGElement); })(),
			webSimpleDB : (function () {return !!window.indexedDB; })(),
			webSockets : (function () {return !!window.WebSocket; })(),
			webSQLDatabase : (function () {return !!window.openDatabase; })(),
			webWorkers : (function () {return !!window.Worker; })(),
			undo : (function () {return typeof UndoManager !== 'undefined'; })()
		}
	},
	browser : {
		name : 'not found',
		version: 'not found'
	},
	os:{
		name : 'not found'
	}
});


