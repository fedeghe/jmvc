JMVC.controllers.jmaps = function () {
    'use strict';
	this.action_index = function () {
		JMVC.require('core/color/color', 'core/lib/jmap/jmap');
		var index = JMVC.getView('zero'),
			jmap = false;
		index.render({cback : function () {
			var body = JMVC.dom.body();
			jmap = JMVC.jmap.create(body, 400, 250, 3);
		}});
	};
};