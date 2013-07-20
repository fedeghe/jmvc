JMVC.controllers['404'] = function () {
	"use strict";
	this.action_msg = function () {		
		var f0f = JMVC.getView('core/404'),
			d = new Date();
		JMVC.head.addstyle(JMVC.vars.baseurl + JMVC.US + 'media' + JMVC.US + 'css' + JMVC.US + 'core' + JMVC.US + 'jmvc.css');
		//	
		if (this.get('act')) { 
			f0f.set('msg', 'action `' + this.get('act') + '` not found');
		}
		if (this.get('cnt')) { 
			f0f.set('msg', 'controller `' + this.get('cnt') + '` not found');
		}
		f0f.set('date', d.getFullYear() + '/' + d.getMonth() + '/' + d.getDay() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds());
		f0f.set('url', JMVC.WD.referrer);
		f0f.set('agent', JMVC.W.navigator.userAgent);
		f0f.render();

		JMVC.head.title('404 PAGE NOT FOUND');
		window.setTimeout(function () {document.location.href = '/'; }, 5000);
	};
};
