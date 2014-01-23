/*----
RENDER
----*/
l = JMVC.modules.length;
if (l) {
    i = 0;
    while (i < l) {
        JMVC.require(JMVC.modules[i]);
        i += 1;
    }
}
if (JMVC.p.lang) {
    JMVC.cookie.set('lang', JMVC.p.lang);
}
if (!W.JMVCshut) {
    JMVC.render();
}
//-----------------------------------------------------------------------------