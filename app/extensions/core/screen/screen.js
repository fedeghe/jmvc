JMVC.extend('screen',{
	getViewportSize : function(){
		var size = [0, 0]; 
		if (typeof JMVC.W.innerWidth != 'undefined'){
			size = [ 
			JMVC.W.innerWidth, 
			JMVC.W.innerHeight 
			]; 
		}
		else
		if(typeof JMVC.WD.documentElement != 'undefined' &&
			typeof JMVC.WD.documentElement.clientWidth != 'undefined' &&
			JMVC.WD.documentElement.clientWidth != 0){
			size = [JMVC.WD.documentElement.clientWidth, JMVC.WD.documentElement.clientHeight];
		}else{
			size = [JMVC.WD.getElementsByTagName('body')[0].clientWidth, JMVC.WD.getElementsByTagName('body')[0].clientHeight]; 
		}
		return size; 
	},
	bodySize : function(){
		var body = JMVC.WD.body,
			html = JMVC.WD.documentElement;
		return [ 
			JMVC.WD.getElementsByTagName('html')[0].clientWidth, 
			Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight ) 
		];
	},
	getScreenData : function(){
		var clientWidth = this.f_filterResults (
			JMVC.W.innerWidth ? JMVC.W.innerWidth : 0,
			JMVC.WD.documentElement ? JMVC.WD.documentElement.clientWidth : 0,
			JMVC.WD.body ? JMVC.WD.body.clientWidth : 0
		),
		clientHeight = this.f_filterResults (
			JMVC.W.innerHeight ? JMVC.W.innerHeight : 0,
			JMVC.WD.documentElement ? JMVC.WD.documentElement.clientHeight : 0,
			JMVC.WD.body ? JMVC.WD.body.clientHeight : 0
		),
		scrollLeft = this.f_filterResults (
			JMVC.W.pageXOffset ? JMVC.W.pageXOffset : 0,
			JMVC.WD.documentElement ? JMVC.WD.documentElement.scrollLeft : 0,
			JMVC.WD.body ? JMVC.WD.body.scrollLeft : 0
		),
		scrollTop = this.f_filterResults (
			JMVC.W.pageYOffset ? JMVC.W.pageYOffset : 0,
			JMVC.WD.documentElement ? JMVC.WD.documentElement.scrollTop : 0,
			JMVC.WD.body ? JMVC.WD.body.scrollTop : 0
		);
		return {clientWidth : clientWidth, clientHeight : clientHeight, scrollLeft :scrollLeft, scrollTop : scrollTop};
	},
	f_filterResults : function(n_win, n_docel, n_body) {
		var n_result = n_win ? n_win : 0;
		if (n_docel && (!n_result || (n_result > n_docel)))
			n_result = n_docel;
		return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
	},
	fullscreen : function () {
		JMVC.W.moveTo(0, 0);
		if (JMVC.WD.all) {
			JMVC.W.top.window.resizeTo(screen.availWidth, screen.availHeight);
		}

		else if (JMVC.WD.layers || JMVC.WD.getElementById) {
			if (JMVC.W.top.window.outerHeight < screen.availHeight || JMVC.W.top.window.outerWidth < screen.availWidth) {
				JMVC.W.top.window.outerHeight = screen.availHeight;
				JMVC.W.top.window.outerWidth = screen.availWidth;
			}
		}
	},
	no_frames : function(){
		if (JMVC.W.top.location != location){JMVC.W.top.location.href = JMVC.WD.location.href;}
	},


	// http://www.sitepoint.com/html5-full-screen-api/	
	fs : function (obj, method) {
		
		var pfx = ["webkit", "moz", "ms", "o", ""],
			p = 0,
			l = pfx.length,
			m, t;
		while (p < l && !obj[m]) {
			m = method;
			if (pfx[p] == "") {
				m = m.substr(0,1).toLowerCase() + m.substr(1);
			}
			m = pfx[p] + m;
			t = typeof obj[m];
			if (t != "undefined") {
				pfx = [pfx[p]];
				return (t == "function" ? obj[m]() : obj[m]);
			}
			p++;
		}

	}


});
