JMVC.extend('security', {

	seed : 3,

	crypt : function (msg, pwd) {
		var code_msg = JMVC.string.str2code(escape(msg)),
			code_pwd = JMVC.string.str2code(pwd),
			cout = [],
			lm = code_msg.length,
			lp = code_pwd.length,
			i = 0,
			j = 0,
			t;
		while (i < lm) {
			t = code_msg[i]  + code_pwd[j] + JMVC.security.seed;
			cout.push(t);
			i += 1;
			j = (j + 1) % lp;
		}
		return JMVC.string.code2str(cout);
		
	},
	decrypt : function (cmsg, pwd) {
		var code_cmsg = JMVC.string.str2code(cmsg),
			code_pwd = JMVC.string.str2code(pwd),
			out = [],
			lm = code_cmsg.length,
			lp = code_pwd.length,
			i = 0,
			j = 0,
			t;

		while(i < lm) {
			t = code_cmsg[i]  - code_pwd[j] - JMVC.security.seed;
			out.push(t);
			i += 1;
			j = (j + 1) % lp;
		}
		return unescape(JMVC.string.code2str(out));
	},
	//http://en.wikipedia.org/wiki/Data_URI_scheme#Web_browser_support
	
	
	
	javascrypt : function (code, pwd) {
		return  "(function (p) {" +
			"if (p) {" +
				"try {" +
					"eval(JMVC.security.decrypt('" + JMVC.security.crypt(code, pwd) + "', p));" +
				"} catch (e) {" +
					"console.debug(e);alert('Password invalid');" +
				"}" +
			"}" +
		"})(prompt('Insert passphrase please:'))";
	}
});
