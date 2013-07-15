JMVC.controllers.carpet = function () {
	"use strict";
	//default action
	this.action_index = function () {

		// get lib & view 
		JMVC.require('lib/carpet/carpet', 'dim');

		JMVC.head.title('Carpet');


		var index = JMVC.getView('zero'),
			jmap = false,
			dims = JMVC.dim.getViewportSize(),
			Ww = dims.width,
			Wh = dims.height;

		//top = left = 100 from default css
		
		index.render(function(){



			jmap = JMVC.carpet.create(JMVC.dom.body(), Ww-10, Wh-10, 3);

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
