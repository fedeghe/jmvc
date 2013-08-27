JMVC.controllers.jmaps = function () {
	this.action_index = function () {
		JMVC.require('core/lib/jmap');
		var index = JMVC.getView('zero'),
			jmap = false;
		index.render({cback : function(){
			var body = JMVC.dom.body();
			jmap = JMVC.jmap.create(body, 400, 250, 3);
		}});

	};

}
