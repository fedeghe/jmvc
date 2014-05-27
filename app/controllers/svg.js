JMVC.controllers.svg = function () {
	'use strict';
	this.action_index = function () {
		JMVC.events.loadify(50);
		JMVC.require('core/lib/svg/svg', 'core/screen/screen');
		
		JMVC.getView('vacuum')
		.set({'style' : 'font-family:verdana;', 'content' : '&nbsp;', 'id' : 'extralogo'})
		.render({cback : function () {
			var svg = JMVC.svg.create(400, 400);
			svg.rect(300, 100, '#fede76');
			svg.circle(50, 50, 30, '#fe0e76');
			svg.line(10, 10, 80, 110, '#fe0e76');
			svg.render(JMVC.dom.body());
		}});
	};
};