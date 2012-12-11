JMVC.extend('mobile', {
	'noZoom' : function(){
		JMVC.head.meta('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0');
	},
	topHide : function () {
		JMVC.W.scrollTo(0, 100);
	}
});