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


			// cssmargin5 * sides2 +border1 
			jmap = JMVC.carpet.create(JMVC.dom.body(), Ww-11, Wh-11, 3);

			if (JMVC.p.debug == 'true') {		
				jmap.beforeAdd(function (i) {console.debug('adding ID: '+i); });
				jmap.afterAdd(function (i) {console.debug('added ID: '+i); });
				jmap.beforeRemove(function (i) {console.debug('removing ID: '+i); });
				jmap.afterRemove(function (i) {console.debug('removed ID: '+i); });
			}
			//carpet.toggleDir('oriz', false);
			jmap.enableSpeed(4.2);
			
			//console.dir(jmap.carpet.actualNodes);
			//jmap.move(-10,1)
			//console.dir(jmap.carpet.actualNodes);
		});

	};

}
