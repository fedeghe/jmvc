JMVC.extend('mobile', {
	'onEvent' : function () {
		(function (cb) {
			var _cb = function (e) {cb.call(this, e); };
			window.addEventListener('click', _cb, false);
			window.addEventListener('mouseover', _cb, false);
			window.addEventListener('mousemove', _cb, false);
			window.addEventListener('keyup', _cb, false);
			window.addEventListener('keydown', _cb, false);
			window.addEventListener('keypress', _cb, false);
			/////....eccc
		})(function (e) {console.debug(e); });	
	}
});