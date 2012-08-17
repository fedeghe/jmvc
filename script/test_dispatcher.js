var W = window,
    WD = W.document,
    WDL = WD.location,
url_allowed_extensions = ['html', 'htm', 'jsp', 'php', 'js', 'jmvc', 'j', 'mvc', 'fg'],
jmvc_default = {controller : 'index', action : 'index'},
localhost = false;

function jmvc_normalize(n) {return n.charAt(0).toUpperCase() + n.substr(1).toLowerCase();}

function dispatch() {
	var	mid = {
			url : WDL.protocol + '//' + WDL.hostname + WDL.pathname + WDL.search,
			proto : WDL.protocol,
			host : WDL.hostname,
			path : WDL.pathname,
			hash : WDL.search
		},
		//url = mid,
		//
		// adjust extensions
		els = mid.path.replace(new RegExp('\\.' + url_allowed_extensions.join('|\\.'), 'gm'), "").substr(1).split('/'),
		controller = false,
		action = false,
		params = {},
		lab_val,
		ret,
		i,
		src,
		len = 0;
	//
	//
	//
	//
	if (WDL.hostname === 'localhost') {
		els.shift();
	}
	controller = els.shift() || jmvc_default.controller;
	action = els.shift() || jmvc_default.action;
	len = els.length;
	//
	// now if els has non zero size, these are extra path params
	for (i = 0; i + 1 < len; i += 2) {
		params[els[i]] = els[i + 1];
	}
	//
	// even hash for GET params
	if (mid.hash !== "") {
		// splitting an empty string give an array with one empty string
		els = mid.hash.substr(1).split('&');
		//
		for (i = 0, len = els.length; i < len; i += 1) {
			lab_val = els[i].split('=');
			// do not override extra path params
			if (!params[lab_val[0]]) {params[lab_val[0]] = lab_val[1]; }
		}
	}
	//
	// check if jmvc must be public
	/*
	if (params.exp && params.exp === 'true') {
		make_public = true;
	} else {
		// check script tag, works only if jmvc is the first script in head
		src = WD.getElementsByTagName('script')[0].src;
		if (src.search('exp=true') !== -1) {make_public = true; }
	}
	*/
	//
	ret = {
		controller : controller.replace(/\//g, ""),
		action : action.replace(/\//g, ""),
		params : params,
		baseurl : WDL.protocol + '//' + WDL.hostname
	};
	ret.controller = jmvc_normalize(ret.controller);
	return ret;
}
console.debug(dispatch());