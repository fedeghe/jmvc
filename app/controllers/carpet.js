JMVC.controllers.carpet = function () {

	//default action
	this.index = function () {

		// get lib & view 
		JMVC.require('lib/carpet/carpet');
		var index = JMVC.getView('zero'),
			carpet = false;
		
		index.render({cback : function(){

			var body = JMVC.dom.body();
			
			carpet = JMVC.carpet.create(body, 800, 400, 3);
			
//			carpet.beforeAdd(function (i) {console.debug('adding ID: '+i); });
//			carpet.afterAdd(function (i) {console.debug('added ID: '+i); });
//			carpet.beforeRemove(function (i) {console.debug('removing ID: '+i); });
//			carpet.afterRemove(function (i) {console.debug('removed ID: '+i); });
			
			//carpet.toggleDir('oriz', false);
			carpet.enableSpeed(1.2);
			
			//console.dir(jmap.carpet.actualNodes);
			//carpet.move(1,1)
			//console.dir(jmap.carpet.actualNodes);
		}});

	};

}
