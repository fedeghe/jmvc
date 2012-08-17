JMVC.extend('screen',{
	getViewportSize : function(){
		var size = [0, 0]; 
		if (typeof window.innerWidth != 'undefined'){
			size = [ 
			window.innerWidth, 
			window.innerHeight 
			]; 
		}
		else
		if(typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0){
			size = [ 
			document.documentElement.clientWidth, 
			document.documentElement.clientHeight 
			]; 
		}else{
			size = [ 
			document.getElementsByTagName('body')[0].clientWidth, 
			document.getElementsByTagName('body')[0].clientHeight 
			]; 
		}
		return size; 
	},
	bodySize : function(){
		return [ 
			document.getElementsByTagName('html')[0].clientWidth, 
			document.getElementsByTagName('body')[0].clientHeight 
		];
	},
	getScreenData : function(){
		var clientWidth = this.f_filterResults (
			window.innerWidth ? window.innerWidth : 0,
			document.documentElement ? document.documentElement.clientWidth : 0,
			document.body ? document.body.clientWidth : 0
		),
		clientHeight = this.f_filterResults (
			window.innerHeight ? window.innerHeight : 0,
			document.documentElement ? document.documentElement.clientHeight : 0,
			document.body ? document.body.clientHeight : 0
		),
		scrollLeft = this.f_filterResults (
			window.pageXOffset ? window.pageXOffset : 0,
			document.documentElement ? document.documentElement.scrollLeft : 0,
			document.body ? document.body.scrollLeft : 0
		),
		scrollTop = this.f_filterResults (
			window.pageYOffset ? window.pageYOffset : 0,
			document.documentElement ? document.documentElement.scrollTop : 0,
			document.body ? document.body.scrollTop : 0
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
		window.moveTo(0, 0);
		if (document.all) {
			top.window.resizeTo(screen.availWidth, screen.availHeight);
		}

		else if (document.layers || document.getElementById) {
			if (top.window.outerHeight < screen.availHeight || top.window.outerWidth < screen.availWidth) {
				top.window.outerHeight = screen.availHeight;
				top.window.outerWidth = screen.availWidth;
			}
		}
	},
	no_frames : function(){
		if (top.location != location){top.location.href = document.location.href;}
	}

});
