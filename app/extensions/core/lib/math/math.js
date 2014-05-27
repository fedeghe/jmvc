// type : LIB
//


JMVC.extend('math',{
	math : JMVC.M, 
	isSquare : function (n) {
		var tmp = JMVC.M.sqrt(n);
		return tmp === ~~tmp;
	},
	squareX : function (n, s) {
		return JMVC.M.pow(n, 1/s);
	},
	dirac : function (i) {
		return ((i % 2) ? -1 : 1);
	}
});
