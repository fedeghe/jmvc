JMVC.controllers.console = function () {
    'use strict';
	this.action_index = function () {
		JMVC.events.loadify(500);
		this.render(function () {
			JMVC.console();
		});

	};
};
