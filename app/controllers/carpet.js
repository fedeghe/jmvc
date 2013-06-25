JMVC.controllers.carpet = function () {
	"use strict";
	//default action
	this.index = function () {

		// get lib & view 
		JMVC.require('lib/carpet/carpet');

		var index = JMVC.getView('zero'),
			jmap = false;
		
		index.render(function(){

			jmap = JMVC.carpet.create(JMVC.dom.body(), 800, 300, 3);

			if (JMVC.p.debug == 'true') {		
				jmap.beforeAdd(function (i) {console.debug('adding ID: '+i); });
				jmap.afterAdd(function (i) {console.debug('added ID: '+i); });
				jmap.beforeRemove(function (i) {console.debug('removing ID: '+i); });
				jmap.afterRemove(function (i) {console.debug('removed ID: '+i); });
			}
			//carpet.toggleDir('oriz', false);
			jmap.enableSpeed(4.2);
			
			//console.dir(jmap.carpet.actualNodes);
			//carpet.move(1,1)
			//console.dir(jmap.carpet.actualNodes);
		});

	};

}
