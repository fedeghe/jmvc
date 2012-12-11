JMVC.require('cookie');
//
JMVC.events.end(function () {
	//
	//################## 
	// set here your UA
	var ua = 'UA-29571830-1',
	//##################
	//
	//
	//
	do_ga = function () {
		JMVC.head.addscript("{{analytics ua=`"+ua+"`}}", true, true);
	};
	//
	//right domain, only production
	if (JMVC.vars.baseurl === JMVC.vars.produrl){
		//ga é in QS e ha un valore 'true' o 'false''
		var t =/(^true$|^false$)/i;
		if (JMVC.util.isSet(JMVC.p.ga) && t.test(JMVC.p.ga)) {
			//JMVC.debug('in QS a true o false');
			// 'true''
			if (JMVC.p.ga === 'true') {
				//JMVC.debug('true:', 'cookie deleted');
				//del cookie, may not exists
				JMVC.cookie.del('jmvc_ga');
				do_ga();
			} else {
				//JMVC.debug('false:', 'cookie set');
				//set cookie
				JMVC.cookie.set('jmvc_ga', 'false');
			}
		} else {
			//JMVC.debug('no ga in QS');
			//is not in QS or is set but is not 'true'||'false', so include ga but if the cookie is not preset
		 	if (!JMVC.cookie.get('jmvc_ga')) {
				do_ga();
			} else {
				//JMVC.debug('but cookie is set, no do_ga() :D');
			}
		}
	}
});