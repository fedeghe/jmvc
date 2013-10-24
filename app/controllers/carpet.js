JMVC.controllers.carpet = function () {
	"use strict";
	/* default action */
	this.action_index = function (f) {

		/* get lib & view */
		JMVC.require('core/lib/carpet', 'core/dim');

		JMVC.head.title('Carpet');


		var index = JMVC.getView('zero'),
			jmap = false,
			dims = JMVC.dim.getViewportSize(),
			Ww = dims.width,
			Wh = dims.height,
			that = this;

		/* top = left = 100 from default css */

		index.render(function(){
			/* cssmargin5 * sides2 +border1 */
			jmap = JMVC.carpet.create(JMVC.dom.body(), Ww-11, Wh-11, 3);

			that.set('jmap', jmap);

			if (JMVC.p.debug == 'true') {		
				jmap.beforeAdd(function (i) {console.debug('adding ID: '+i); });
				jmap.afterAdd(function (i) {console.debug('added ID: '+i); });
				jmap.beforeRemove(function (i) {console.debug('removing ID: '+i); });
				jmap.afterRemove(function (i) {console.debug('removed ID: '+i); });
			}
			
			jmap.enableSpeed(4.2);
			
			//maybe callback
			f && f();
		});

	};

	this.action_logo = function () {
		var that = this;

		this.action_index(function () {
			//console.debug(that);
			var jmap = that.get('jmap');
				jmap.beforeAdd(function (i) {console.debug('adding ID: '+i); });
				jmap.afterAdd(function (i) {console.debug('added ID: '+i); });
				jmap.beforeRemove(function (i) {console.debug('removing ID: '+i); });
				jmap.afterRemove(function (i) {console.debug('removed ID: '+i); });
			console.debug(jmap);	
		});
		

	};

}
