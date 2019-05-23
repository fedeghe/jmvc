// RENDER
(function () {
    var i = 0,
        l = JMVC.modules.length;
    if (!W.JMVCshut) {
        while (i < l) {
            JMVC.require(JMVC.modules[i++]);
        }
        JMVC.p.lang && JMVC.cookie.set('lang', JMVC.p.lang);
    }
    try {
        if (W.JMVCshut) {
            JMVC.loaded = true;
        } else {
            JMVC.render();
        }
    } catch (e) {
        return JMVC.Errors.notify(e);
    }
})();
// ==========================================
