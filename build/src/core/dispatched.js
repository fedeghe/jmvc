// 
//
//             _/  _/                                  _/                _/                            
//        _/_/_/        _/_/_/  _/_/_/      _/_/_/  _/_/_/_/    _/_/_/  _/_/_/      _/_/    _/  _/_/   
//     _/    _/  _/  _/_/      _/    _/  _/    _/    _/      _/        _/    _/  _/_/_/_/  _/_/        
//    _/    _/  _/      _/_/  _/    _/  _/    _/    _/      _/        _/    _/  _/        _/           
//     _/_/_/  _/  _/_/_/    _/_/_/      _/_/_/      _/_/    _/_/_/  _/    _/    _/_/_/  _/            
//                          _/                                                                         
//                         _/                                      
//
// Dispatch url getting controller, action and parameters
//          
dispatched = (function () {
    var mid = {
            'url' : WDL.protocol + US + US + WDL.hostname + WDL.pathname + WDL.search,
            'proto' : WDL.protocol,
            'host' : WDL.hostname,
            'path' : WDL.pathname,
            'hash' : WDL.search
        },

        // adjust extensions
        els = mid.path.replace(new RegExp('\\.' + URL_ALLOWED_EXTENSIONS.join('|\\.'), 'gm'), "").substr(1).split(US),
        controller = false,
        controller_prepath = '',
        controller_prepath_parts = [],
        action = false,
        params = {},
        lab_val,
        ret,
        i,
        src,
        len = 0,
        baseurl = WDL.protocol + US + US + WDL.hostname;



    //maybe is the case to load testsuite
    if (els[0].match(/test_/)) {
        Modules.push('testsuite');
    }

    if (WDL.hostname === 'localhost') {
        els.shift();
    }

    controller = els.shift() || JMVC_DEFAULT.controller;
    
    //check extrapath for controller
    if (!!controller.match(/_/)) {
        controller_prepath_parts = controller.split('_');
        controller = controller_prepath_parts.pop();
        controller_prepath = controller_prepath_parts.join(US) + US;

    }
    action = els.shift() || JMVC_DEFAULT.action;
    len = els.length;

    // now if els has non zero size, these are extra path params
    for (i = 0; i + 1 < len; i += 2) {
        params[els[i]] = els[i + 1];
    }

    // even hash for GET params
    if (mid.hash !== "") {
        // splitting an empty string give an array with one empty string
        els = mid.hash.substr(1).split('&');

        for (i = 0, len = els.length; i < len; i += 1) {
            lab_val = els[i].split('=');
            // do not override extra path params
            if (!params[lab_val[0]]) {params[lab_val[0]] = lab_val[1]; }
        }
    }
    

    ret = {
        'controller' : controller.replace(/\//g, ""),
        'controller_prepath' : controller_prepath,
        'action' : action.replace(/\//g, ""),
        'params' : params,
        'baseurl' : baseurl
    };
    //ret.controller = jmvc_normalize(ret.controller);
    return ret;
})();