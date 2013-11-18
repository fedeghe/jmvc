JMVC.extend('bin', {
	bin2String : function (array) {
		var result = "";
		for (var i = 0; i < array.length; i++) {
			result += String.fromCharCode(parseInt(array[i], 2));
		}
		return result;
	},
	string2Bin : function (str) {
		var result = [],
			t;
		for (var i = 0; i < str.length; i++) {
			t = str.charCodeAt(i).toString(2);
			while(t.length < 8) {t = '0'+t;}

			result.push(t);
		}
		return result;
	},
	binsplit : function (bs) {
		return bs.match(/.{8}/g);
	},

	string2binString : function (s) {
		return JMVC.bin.string2Bin(s).join('');
	},

	binString2String : function (bs) {
		//console.debug(bs.length, JMVC.bin.binsplit(bs).length);
		return JMVC.bin.bin2String(JMVC.bin.binsplit(bs));
	},
	eval : function (ccode) {
		return eval(JMVC.bin.bin2String(JMVC.bin.binsplit(eval(ccode))));
	},

	code2cry : function (code) {
		var bin = JMVC.bin.string2binString(code),
			map = ['(+[])', '(+!![])'],
			out = '',
			i = 0,
			l = bin.length;
			
		while (i < l) {
			out += '+' + map[~~(bin[i])];
			i += 1;
		}
		return "''" + out;
	}
});


/*
JMVC.require('core/lib/bin')
var bin = JMVC.bin.string2binString('foo');
console.debug(bin)
JMVC.bin.binString2String(bin);



JMVC.require('core/lib/bin');
var code = JMVC.bin.code2cry('(function (n){alert("hello " + n); })("JMVC")');
console.debug(code);
JMVC.bin.eval(code)


//END
JMVC.require('core/lib/bin');
var arrcode = JMVC.bin.code2cry('alert("hello");');
console.debug(arrcode);
JMVC.bin.eval(arrcode)

 */