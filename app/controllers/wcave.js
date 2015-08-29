JMVC.controllers.wcave = function () {

	'use strict';

	this.action_index = function () {

		JMVC.require('games/wcave/wcave');

		JMVC.head.title('Wcave game');

		JMVC.events.loadify(500);

		var v = JMVC.getView('vacuum'),
			containerID = 'container';
		
		v.set({'id' : containerID}).render(function () {
			Wcave.call(JMVC.W, {
				'id' : containerID,
				'size' : 'auto'
			});
		});
	};
};