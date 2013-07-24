JMVC.controllers['404'] = function () {
	
	"use strict";
	
	this.action_msg = function () {		
		
		JMVC.head.title('404 PAGE NOT FOUND');
		JMVC.head.addstyle(JMVC.vars.baseurl + JMVC.US + 'media' + JMVC.US + 'css' + JMVC.US + 'core' + JMVC.US + 'jmvc.css');
		JMVC.events.delay(function () {JMVC.head.goto(); }, 5000);

		var f0f = JMVC.getView('core/404'),
			d = new Date(),
			data = {
				date :  d.getFullYear() + '/' + d.getMonth() + '/' + d.getDay() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(),
				url : JMVC.WD.referrer,
				agent : JMVC.W.navigator.userAgent
			};

		this.get('act') && (data.msg =  'action `' + this.get('act') + '` not found');
		this.get('cnt') && (data.msg = 'controller `' + this.get('cnt') + '` not found');

		f0f.set(data).render();
	};
	
};
