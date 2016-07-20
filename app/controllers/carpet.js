JMVC.controllers.carpet = function () {
	'use strict';

	/* default action */
	this.action_index = function (f) {

		/* get lib & view */
		JMVC.require(
			'core/color/color',
			'core/lib/carpet/carpet',
			'core/screen/screen'
		);

		JMVC.head.title('Infinite Carpet');


		var index = JMVC.getView('zero'),
			size = null,
			jmap = false,
			dims = JMVC.screen.getViewportSize(),
			Ww = size || dims.width,
			Wh = size || dims.height,
			that = this;

		/* top = left = 100 from default css */

		index.render(function () {
			/* cssmargin5 * sides2 +border1 */
			jmap = JMVC.carpet.create(JMVC.dom.body(), {
				w : Ww - 11,
				h : Wh - 11,
				s : 3,
				tileWidth : 300,
				tileHeight: 300
				// ,enabled : {
				// 	oriz : false
				// }
			});

			that.set('jmap', jmap);

			f && typeof f === 'function' && f();

			if (JMVC.p.debug === 'true') {
				jmap.beforeAdd(function (i) {console.debug('adding ID: ' + i); });
				jmap.afterAdd(function (i) {console.debug('added ID: ' + i); });
				jmap.beforeRemove(function (i) {console.debug('removing ID: ' + i); });
				jmap.afterRemove(function (i) {console.debug('removed ID: ' + i); });
			}
			
			// jmap.enableSpeed(4.2);
		});

	};

	this.action_logo = function () {

		var that = this;
		this.action_index(function () {
			
			var jmap = that.get('jmap');
			jmap.beforeAdd(function (i) {console.debug('adding ID: ' + i); });
			jmap.afterAdd(function (i) {console.debug('added ID: ' + i); });
			jmap.beforeRemove(function (i) {console.debug('removing ID: ' + i); });
			jmap.afterRemove(function (i) {console.debug('removed ID: ' + i); });
			JMVC.debug(jmap);
		});

	};
};