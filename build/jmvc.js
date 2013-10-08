$$src/head.js$$

!function (W, undefined) {
	'use strict';
	var WD = W.document,	// reference for rdocument
		WDL = WD.location,	// reference for current location
		i, j, l,			// some counters

	// JMVC object, globalized
	JMVC = W.JMVC = (
		/*
		* this function returns the JMVC object after doing some stuff
		* @return {object literal} $JMVC inner object 
		*/
		function () {
			'use strict';
			$$src/core/init.js$$
			$$src/core/innerjmvc.js$$
			$$src/core/preload.js$$
			$$src/core/errors.js$$
			$$src/core/parser.js$$
			$$src/core/event.js$$
			$$src/core/promise.js$$
			$$src/core/interface.js$$
			$$src/core/controller.js$$
			$$src/core/model.js$$
			$$src/core/view.js$$
			$$src/core/dispatched.js$$
			$$src/core/outerjmvc.js$$
			$$src/core/cleanup.js$$
			return $JMVC;
		}
	)();
	/** mandatory modules **/
	$$src/modules/io.js$$
	$$src/modules/util.js$$
	$$src/modules/dom.js$$
	$$src/modules/events.js$$
	$$src/modules/head.js$$
	$$src/modules/array.js$$
	$$src/modules/string.js$$
	$$src/modules/object.js$$
	$$src/modules/match.js$$
	$$src/modules/num.js$$
	$$src/core/render.js$$
	//
}(this);

