/* eslint-disable no-undef */
/**
DISPATCHED
*/

// Dispatch url getting controller, action and parameters
// automatically books the test module loading when the
// controller name starts with 'test_'
dispatched = (function () {
    var mid = {
            url: WDL.protocol + US + US + WDL.hostname + WDL.pathname + WDL.search,
            proto: WDL.protocol,
            host: WDL.hostname,
            path: WDL.pathname,
            search: WDL.search,
            hash: WDL.hash.substr(1),
            port: WDL.port ? ':' + WDL.port : ''
        },

        // adjust extensions allowed
        els = mid.path.replace(new RegExp('\\.' + URL_ALLOWED_EXTENSIONS.join('|\\.'), 'gm'), '').substr(1).split(US),
        controller = false,
        action = false,
        params = {},

        controllerPrepath = '',
        controllerPrepathParts = [],
        controllerSplitter = /_|-/,
        labVal,
        baseurl = WDL.protocol + US + US + WDL.hostname,
        i, len;

    // maybe is the case to load testsuite
    els[0].match(/^test_/) && Modules.push('testsuite');
    controller = els.shift() || JMVC_DEFAULT.controller;
    // check extrapath for controller
    if (controller.match(controllerSplitter)) {
        controllerPrepathParts = controller.split(controllerSplitter);
        controller = controllerPrepathParts.pop();
        controllerPrepath = controllerPrepathParts.join(US) + US;
    }

    action = els.shift() || JMVC_DEFAULT.action;
    len = els.length;

    // now if els has non zero size,
    // these are extra path params
    for (i = 0; i + 1 < len; i += 2) {
        params[els[i]] = els[i + 1];
    }

    // even hash for GET params
    if (mid.search !== '') {
        // splitting an empty string give an array with one empty string
        els = mid.search.substr(1).split('&');
        for (i = 0, len = els.length; i < len; i += 1) {
            labVal = els[i].split('=');
            // do not override extra path params
            !params[labVal[0]] && (params[labVal[0]] = labVal[1]);
        }
    }

    // ckeck jmvcgoto
    if ('jmvcgoto' in params) {
        document.location.href = W.decodeURIComponent(params.jmvcgoto);
        return false;
    }
    // dispatched result
    return {
        controller: controller.replace(/\//g, ''),
        controllerPrepath: controllerPrepath,
        action: action.replace(/\//g, ''),
        params: params,
        baseurl: baseurl,
        port: mid.port,
        search: mid.search,
        hash: mid.hash
    };
})();
/* eslint-enable no-undef */
// -----------------------------------------------------------------------------
