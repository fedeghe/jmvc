/*------------
NUM sub-module
------------*/

// private section
_.num = {};

// public section
JMVC.num = {
	getNum : function (str) {return parseInt(str, 10); },
	getFloat : function (str) {return parseFloat(str, 10); },
	pFloat : function (f) {return 1 * f; },
	pInt : function (i) {return i >> 0; },
	mRound : function (n) {return (n + 0.5) >> 0; },
	mFloor : function (n) {(n > 0 ? n : n + 1) >> 0; },
	mCeil : function (n) {return (n + (n > 0 && !!(n % 1))) >> 0; },
	num : function (n) {return parseFloat(n.toFixed(10), 10); }
};
