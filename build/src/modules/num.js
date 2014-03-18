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
    //mFloor : function (n) {return ~~n; },
	mFloor : function (n) {return n >> 0; },
    mCeil : function (n) {return (n + (n > 0 && !!(n % 1))) >> 0; },
	//mCeil : function (n) {return (n >> 0) + (n > 0 ? 1 : -1); },
	num : function (n) {return parseFloat(n.toFixed(10), 10); },
    dec2Bin : function (dec){
        if(dec > 0) return dec.toString(2)>>>0;
        dec = Math.abs(dec);
        var res = dec ^ parseInt((new Array(dec.toString(2).length+1)).join("1"),2);
        return (res+1).toString(2)>>>0;
    },
    bin2Dec : function (b) {return parseInt(b>>>0, 2); }
};
//-----------------------------------------------------------------------------