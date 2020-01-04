
!function (W, undefined) {

	// one for all the build
	'use strict';

	// local reference for window.document
	// local reference for current window.document.location
	var WD = W.document,
		WDL = WD.location,
        WDB = WD.body,

        // the returning object created in that function,
        // global JMVC will take the $JMVC ref
        $JMVC,

		// this function returns the JMVC object, globalized, after doing some stuff
		// @return {object literal} $JMVC inner object
		// 
		JMVC = W.JMVC = (function () {
			$$jmvc/core/init.js$$
			$$jmvc/core/innerjmvc.js$$
			$$jmvc/core/preload.js$$
			$$jmvc/core/constructors/errors.js$$
			$$jmvc/core/constructors/event.js$$
			$$jmvc/core/constructors/channel.js$$
			$$jmvc/core/constructors/extension.js$$
			$$jmvc/core/constructors/promise.js$$
			$$jmvc/core/constructors/interface.js$$
			$$jmvc/core/constructors/functionqueue.js$$
			$$jmvc/core/constructors/controller.js$$
			$$jmvc/core/constructors/model.js$$
			$$jmvc/core/constructors/view.js$$   
			$$jmvc/core/constructors/mvc_common.js$$
			$$jmvc/core/parser.js$$
			$$jmvc/core/dispatched.js$$
			$$jmvc/core/outerjmvc.js$$
			$$jmvc/core/cleanup.js$$
			// what should be ever returned?
            return $JMVC;
		})();
	

	//***********************//
	//
	// MANDATORY MODULES START
	//
	$$jmvc/core/private.js$$
	$$jmvc/modules/cookie.js$$
	$$jmvc/modules/io.js$$
	$$jmvc/modules/util.js$$
	$$jmvc/modules/dom.js$$
	$$jmvc/modules/bom.js$$
	$$jmvc/modules/events.js$$
	$$jmvc/modules/head.js$$
	$$jmvc/modules/css.js$$
	$$jmvc/modules/array.js$$
	$$jmvc/modules/string.js$$
	$$jmvc/modules/object.js$$
	$$jmvc/modules/match.js$$
	$$jmvc/modules/num.js$$
	$$jmvc/modules/dnd.js$$
	$$jmvc/modules/minishim.js$$
	//
	// MANDATORY MODULES END
	// 
	//********************//

	//***********************//
	//
	// TIME TO RENDER
	$$jmvc/core/render.js$$
	$$jmvc/amd.js$$
//
}(this);
$$jmvc/foot.js$$
/* the endline */