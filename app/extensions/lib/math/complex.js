JMVC.require('lib/math');
JMVC.extend('complex', {
	'Complex' : function (re, im) {
		this.re = re;
		this.im = im;
		this.rho = JMVC.math.squareX(re * re + im * im, 2);
		this.theta = Math.atan2(im, re);
	}
});