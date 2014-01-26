JMVC.controllers.svg = function () {
	'use strict';
	this.action_index = function () {
		JMVC.events.loadify(50);
		JMVC.require('core/lib/svg/svg', 'core/dim/dim');
		JMVC.head.meta('generator', 'jmvc resident in your machine');
		var v = JMVC.getView('vacuum');

		v.set({'style' : 'font-family:verdana;', 'content' : '&nbsp;', 'id' : 'extralogo'});

		v.render({cback : function () {
			var svg = JMVC.svg.create(400, 400);
			svg.rect(300, 100, '#fede76');
			svg.circle(50, 50, 30, '#fe0e76');
			svg.line(10, 10, 80, 110, '#fe0e76');
			svg.render(JMVC.dom.body());
		}});
	};
};