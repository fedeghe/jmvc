JMVC.controllers.jmaps = function () {

	//default action
	this.index = function () {

		// get lib & view 
		JMVC.require('lib/jmap/jmap');
		var index = JMVC.getView('zero'),
			jmap = false;
		
		index.render({cback : function(){

			var body = JMVC.dom.body();
			
			jmap = JMVC.jmap.create(body, 400, 250, 3);
			
			//console.dir(jmap.carpet.actualNodes);
			//jmap.move(1,1)
			//console.dir(jmap.carpet.actualNodes);
		}});

	};

}
