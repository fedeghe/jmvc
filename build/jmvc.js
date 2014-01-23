$$src/head.js$$
(function (W) {
    // one for all the build
    'use strict';
    //
    var WD = W.document,    // local reference for window.document
        WDL = WD.location,  // local reference for current window.document.location
        i, j, //
        k, l, // some counters
        //
        //
        // this function returns the JMVC object, globalized, after doing some stuff
        // @return {object literal} $JMVC inner object 
        JMVC = W.JMVC = (function () {
            $$src/core/init.js$$
            $$src/core/innerjmvc.js$$
            $$src/core/preload.js$$
            $$src/core/constructors/errors.js$$
            $$src/core/parser.js$$
            $$src/core/constructors/event.js$$
            $$src/core/constructors/channelpipe.js$$
            $$src/core/constructors/extension.js$$
            $$src/core/constructors/promise.js$$
            $$src/core/constructors/interface.js$$
            $$src/core/constructors/functionqueue.js$$
            $$src/core/controller.js$$
            $$src/core/model.js$$
            $$src/core/view.js$$
            $$src/core/dispatched.js$$
            $$src/core/outerjmvc.js$$
            $$src/core/cleanup.js$$
            return $JMVC;
        })(),
        _ = {}; // private ns for modules
    //
    // mandatory modules
    $$src/modules/io.js$$
    $$src/modules/util.js$$
    $$src/modules/dom.js$$
    $$src/modules/bom.js$$
    $$src/modules/events.js$$
    $$src/modules/head.js$$
    $$src/modules/css.js$$
    $$src/modules/array.js$$
    $$src/modules/string.js$$
    $$src/modules/object.js$$
    $$src/modules/match.js$$
    $$src/modules/num.js$$
    $$src/core/render.js$$
    $$src/foot.js$$
})(this);