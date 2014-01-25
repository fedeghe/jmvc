/*----
RENDER
----*/
(function () {
    var i = 0,
        l = JMVC.modules.length;
    
    while (i < l) {
        JMVC.require(JMVC.modules[i]);
        i += 1;
    }
    
    if (JMVC.p.lang) {
        JMVC.cookie.set('lang', JMVC.p.lang);
    }
    !W.JMVCshut && JMVC.render();
})();
//-----------------------------------------------------------------------------