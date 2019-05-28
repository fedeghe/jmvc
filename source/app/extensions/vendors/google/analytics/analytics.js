// JMVC.require('core/cookie/cookie');
//
JMVC.events.end(function () {
    //
    // ################
    // set here your UA
    // ################
    /* eslint-disable */
    var ua = $ganalytics_key$,
    /* eslint-enable */
        t = /(^true$|^false$)/i,
        doGa = function () {
            JMVC.head.addScript('{{core/vendors/google/analytics ua=`' + ua + '`}}', true, true);
        };

    // right domain, only production
    if (JMVC.vars.baseurl === JMVC.vars.produrl) {
        // ga is in QS and it's 'true' o 'false'
        if (JMVC.util.isSet(JMVC.p.ga) && t.test(JMVC.p.ga)) {
            if (JMVC.p.ga === 'true') {
                // remove cookie
                JMVC.cookie.del('jmvc_ga');
                doGa();
            } else {
                // add cookie
                JMVC.cookie.set('jmvc_ga', 'false');
            }
        } else {
            // is not in QS or is set but is not 'true'||'false',
            // thus include ga but if the cookie is not preset
            if (!JMVC.cookie.get('jmvc_ga')) {
                doGa();
            }
            // otherwise cookie is set and is false
        }
    }
});
