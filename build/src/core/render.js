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
JMVC.p.lang && JMVC.cookie.set('lang', JMVC.p.lang);
W.JMVCshut || JMVC.render();
//-----------------------------------------------------------------------------