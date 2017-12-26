// type : LIB
//

JMVC.extend('mobile', {
	noZoom : function(){
		//JMVC.head.meta('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0');
		//JMVC.head.meta('viewport', 'maximum-scale=1.0,width=deviceidth,initial-scale=1.0,user-scalable=0');
		JMVC.head.meta('viewport', 'width=device-width, user-scalable=0, initial-scale=1.0');
	},
	topHide : function () {
		//JMVC.W.scrollTo(0, 100);
		JMVC.head.meta('apple-mobile-web-app-capable', 'yes');
		JMVC.W.setTimeout(function(){
			// Hide the address bar!
			JMVC.W.scrollTo(0, 1);
		}, 0);
	}
});