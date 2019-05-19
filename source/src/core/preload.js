// preloading function
// fill cache with a request on a 1X1 iframe that
// will be deleted as soon as everything is loaded                          
preload = function (url) {
    W.setTimeout(function () {
        // get a new Promise
        var p = Promise.create(),
            // the iframe where preloading will take place
            ifr = null,
            // a function used to remove the imframe once
            // everything is loaded, hence cached
            cleanup = function (pro, i) {JMVC.dom.remove(i); };
        // when `done` will be called on the promise
        // cleanup will be called, params follows the chain
        p.then(cleanup);
        // now a function is executed dereferencing the promise
        (function (pr) {
            // make 1*1 iframe and load url
            ifr = JMVC.dom.add(JMVC.dom.body(), 'iframe', {src : url, width : 1, height : 1});
            // as far as the iframe is loaded,
            // call done on the promise
            ifr.contentWindow.onload = function () {pr.done(ifr); };
        })(p);
    }, 0);
};
//-----------------------------------------------------------------------------