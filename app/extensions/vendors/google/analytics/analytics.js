// JMVC.require('core/cookie/cookie');
//
JMVC.events.end(function () {
	//
	// ################
	// set here your UA
	// ################
	var ua = 'UA-29571830-1',
		t =/(^true$|^false$)/i,
		do_ga = function () {
			JMVC.head.addScript("{{core/vendors/google/analytics ua=`" + ua + "`}}", true, true);
		};

	// right domain, only production
	// 
	if (JMVC.vars.baseurl === JMVC.vars.produrl) {

		// ga is in QS and it's 'true' o 'false'
		// 
		if (JMVC.util.isSet(JMVC.p.ga) && t.test(JMVC.p.ga)) {
			//
			if (JMVC.p.ga === 'true') {

				// remove cookie
				// 
				JMVC.cookie.del('jmvc_ga');
				do_ga();
			} else {

				// add cookie
				// 
				JMVC.cookie.set('jmvc_ga', 'false');
			}
		} else {

			// is not in QS or is set but is not 'true'||'false',
			// thus include ga but if the cookie is not preset
			// 
		 	if (!JMVC.cookie.get('jmvc_ga')) {
				do_ga();
			}
			// otherwise cookie is set and is false
		}
	}
});