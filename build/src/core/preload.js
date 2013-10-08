/*
-------
PRELOAD
-------
*/                                
preload = function (url) {
    W.setTimeout(function () {
        //make 1*1 iframe and load url
        var p = new Promise(),
            ifr = null,
            cleanup = function (i) {JMVC.dom.remove(i); };
        p.then(cleanup);
        (function (pr){
            ifr = JMVC.dom.add(JMVC.dom.body(), 'iframe', {src : url, width : 1, height : 1});
            ifr.contentWindow.onload = function () {
                JMVC.debug('preloaded ' + url);
                pr.done(ifr);
            };
        })(p);
    }, 0);
};