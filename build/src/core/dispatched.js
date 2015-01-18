/*--------
DISPATCHED
--------*/

// Dispatch url getting controller, action and parameters
// automatically books the test module loading when the
// controller name starts with 'test_'
//          
dispatched = (function () {
    var mid = {
            url : WDL.protocol + US + US + WDL.hostname + WDL.pathname + WDL.search,
            proto : WDL.protocol,
            host : WDL.hostname,
            path : WDL.pathname,
            search : WDL.search,
            hash : WDL.hash.substr(1),
            port : WDL.port ? ':' + WDL.port : ''
        },

        // adjust extensions allowed
        // 
        els = mid.path.replace(new RegExp('\\.' + URL_ALLOWED_EXTENSIONS.join('|\\.'), 'gm'), '').substr(1).split(US),
        
        controller = false,
        action = false,
        params = {},

        controller_prepath = '',
        controller_prepath_parts = [],
        controller_splitter = /_|-/,
        lab_val,
        baseurl = WDL.protocol + US + US + WDL.hostname,
        i, len;

    // maybe is the case to load testsuite
    // 
    els[0].match(/^test_/) && Modules.push('testsuite');

    // controller
    // 
    controller = els.shift() || JMVC_DEFAULT.controller;

    // check extrapath for controller
    // 
    if (!!controller.match(controller_splitter)) {
        controller_prepath_parts = controller.split(controller_splitter);
        controller = controller_prepath_parts.pop();
        controller_prepath = controller_prepath_parts.join(US) + US;
    }

    action = els.shift() || JMVC_DEFAULT.action;
    len = els.length;

    // now if els has non zero size,
    // these are extra path params
    // 
    for (i = 0; i + 1 < len; i += 2) {
        params[els[i]] = els[i + 1];
    }

    // even hash for GET params
    // 
    if (mid.search !== '') {

        // splitting an empty string give an array with one empty string
        // 
        els = mid.search.substr(1).split('&');

        for (i = 0, len = els.length; i < len; i += 1) {
            lab_val = els[i].split('=');

            // do not override extra path params
            // 
            !params[lab_val[0]] && (params[lab_val[0]] = lab_val[1]);
        }
    }

    // ckeck jmvcgoto
    // 
    if ('jmvcgoto' in params) {
        document.location.href = W.decodeURIComponent(params.jmvcgoto);
        return false;
    }
    
    // dispatched result
    // 
    return {
        controller : controller.replace(/\//g, ''),
        controller_prepath : controller_prepath,
        action : action.replace(/\//g, ''),
        params : params,
        baseurl : baseurl,
        port : mid.port,
        search : mid.search,
        hash : mid.hash
    };
})();
//-----------------------------------------------------------------------------