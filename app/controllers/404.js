JMVC.controllers['404'] = function () {
	
	"use strict";
	
	this.action_msg = function () {		

		var seconds2redirection = 5,
			V404 = JMVC.getView('core/404'),
			d = new Date(),
			data = {
				date :  d.getFullYear() + '/' + d.getMonth() + '/' + d.getDay() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(),
				url : JMVC.WD.referrer,
				agent : JMVC.W.navigator.userAgent,
				secToRedir : seconds2redirection
			},
			cnt = this.get('cnt'),
			act = this.get('act');

		act && (data.msg =  'action `' + this.get('act') + '` not found');
		cnt && (data.msg = 'controller `' + this.get('cnt') + '` not found');
		
		JMVC.head.title('404 PAGE NOT FOUND');
		JMVC.head.addstyle([JMVC.vars.baseurl, 'media', 'css', 'core', 'jmvc.css'].join(JMVC.US));
		JMVC.events.delay(function () {JMVC.head.goto(); }, seconds2redirection * 1000);
		
		V404.set(data).render();
	};
	
};
