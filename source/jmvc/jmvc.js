
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
			$$core/init.js$$
			$$core/innerjmvc.js$$
			$$core/preload.js$$
			$$core/constructors/errors.js$$
			$$core/constructors/event.js$$
			$$core/constructors/channel.js$$
			$$core/constructors/extension.js$$
			$$core/constructors/promise.js$$
			$$core/constructors/interface.js$$
			$$core/constructors/functionqueue.js$$
			$$core/constructors/controller.js$$
			$$core/constructors/model.js$$
			$$core/constructors/view.js$$   
			$$core/constructors/mvc_common.js$$
			$$core/parser.js$$
			$$core/dispatched.js$$
			$$core/outerjmvc.js$$
			$$core/cleanup.js$$
			// what should be ever returned?
            return $JMVC;
		})();
	

	//***********************//
	//
	// MANDATORY MODULES START
	//
	$$core/private.js$$
	$$modules/cookie.js$$
	$$modules/io.js$$
	$$modules/util.js$$
	$$modules/dom.js$$
	$$modules/bom.js$$
	$$modules/events.js$$
	$$modules/head.js$$
	$$modules/css.js$$
	$$modules/array.js$$
	$$modules/string.js$$
	$$modules/object.js$$
	$$modules/match.js$$
	$$modules/num.js$$
	$$modules/dnd.js$$
	$$modules/minishim.js$$
	//
	// MANDATORY MODULES END
	// 
	//********************//

	//***********************//
	//
	// TIME TO RENDER
	$$core/render.js$$
	$$amd.js$$
//
}(this);
$$foot.js$$
/* the endline */