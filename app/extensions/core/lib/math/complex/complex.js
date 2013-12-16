JMVC.require('core/lib/math/math');
JMVC.extend('complex', {
	Complex : function (re, im) {
		this._re = re;
		this._im = im;
		this._rho = JMVC.math.squareX(re * re + im * im, 2);
		this._theta = Math.atan2(im, re);
		this._mod = null;
	}
});
JMVC.prototipize(JMVC.complex.Complex, {
	mod : function () {
		this._mod = Math.sqrt(this._re * this._re + this._im * this._im);
		return this._mod; 
	}
});