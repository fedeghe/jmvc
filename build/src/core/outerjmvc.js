//
//
//
//
//
//
//
//
//
//
//
//
//             _/_/    _/    _/  _/_/_/_/_/            _/  _/      _/  _/      _/    _/_/_/   
//          _/    _/  _/    _/      _/                _/  _/_/  _/_/  _/      _/  _/          
//         _/    _/  _/    _/      _/                _/  _/  _/  _/  _/      _/  _/           
//        _/    _/  _/    _/      _/          _/    _/  _/      _/    _/  _/    _/            
//         _/_/      _/_/        _/            _/_/    _/      _/      _/        _/_/_/ 
//
//          
$JMVC = {
    loaded : false,
    W: W,
    WD: WD,
    WDL : WDL,
    US : US,
    M : Math,
    c_prepath : dispatched.controller_prepath,
    c : dispatched.controller || JMVC_DEFAULT.controller,
    a : dispatched.action || JMVC_DEFAULT.action,
    p : dispatched.params || {},
    controllers : {},
    models : {},
    views : {},
    interfaces : {},
    vars : {
        baseurl:    dispatched.baseurl,
        extensions : dispatched.baseurl + PATH.ext, //'/app/extensions',
        devurl : DEV_URL,
        produrl : PROD_URL,
        version : JMVC_VERSION,
        review :  JMVC_REVIEW,
        last_modified : WD.lastModified,
        rendertime : 0,
        retina : W.devicePixelRatio > 1,
        randcolor : new function () {
            var wsafearr = ['00', '33', '66', '99', 'CC', 'FF'];
            this.toString = function () {
                return '#' + wsafearr[JMVC.util.rand(0, 5)] + wsafearr[JMVC.util.rand(0, 5)] + wsafearr[JMVC.util.rand(0, 5)];
            };
        },
        currentlang : currentlang
    },
    widget : {},
    extensions : {},
    extensions_params : {},
    i18n : {},

    modules : Modules,
    nsCheck : jmvc.ns.check,
    nsMake : jmvc.ns.make,
    Event : Event,
    Errors : Errors,
    Interface : Interface,
    promise : jmvc.promise,

    parselang : jmvc.parselang,

    hookCheck : jmvc.hook_check,
    
    debug : jmvc.debug,
    delegate : jmvc.delegate,
    extend : jmvc.extend,
    factory:    jmvc.factory_method,
    inherit : jmvc.inherit,
    multinherit : jmvc.multi_inherit,

    preload : preload,


    hook : jmvc.hook,
    hooks : hooks,
    jeval : jmvc.jeval,
    prototipize : jmvc.prototipize,
    purge : jmvc.purge,
    parse : Parser.parse,
    render: jmvc.render,
    require : jmvc.require,
    lang : jmvc.lang,
    
    set : jmvc.set,//@@@@@@@@@@@@@@@@@@@@@@
    get : jmvc.get,//@@@@@@@@@@@@@@@@@@@@@@
    del : jmvc.del,//@@@@@@@@@@@@@@@@@@@@@@
    htmlspecialchars : jmvc.htmlspecialchars,
    htmlspecialchars_decode : jmvc.htmlspecialchars_decode,

    gc : function () {var i = 0, a = arguments, l = a.length; for (null; i < l; i += 1) {a[i] = null; } },
    getView : function (n) {return jmvc.factory_method('view', n); },
    getModel : function (n, params) {return jmvc.factory_method('model', n, params); },
    loadInterfaces : function (n, params) {return jmvc.factory_method('interface', n, params); },

    implement : jmvc.implement,
    //getController :   function(n) {return jmvc.factory_method('controller', n); }

    // getNum : function (str) {return parseInt(str, 10); },
    // getFloat : function (str) {return parseFloat(str, 10); },
    // pFloat : function (f) {return 1 * f; },
    // pInt : function (i) {return i >> 0; },
    // mRound : function (n) {return (n + 0.5) >> 0; },
    // mFloor : function (n) {(n > 0 ? n : n + 1) >> 0; },
    // mCeil : function (n) {return (n + (n > 0 && !!(n % 1))) >> 0; },
    // num : function (n) {return parseFloat(n.toFixed(10), 10); },
    //noop : function () {return noop; },

    
    /**
     * [each description]
     * @param  {[type]} o    [description]
     * @param  {[type]} func [description]
     * @return {[type]}      [description]
     */
    each : jmvc.each,
    
    /**
     * [console description]
     * @return {[type]} [description]
     */
    console : function(){
        if(! ('core/console' in $JMVC.extensions)){
            $JMVC.require('core/console');
        }
        JMVC.console.toggle();
    },
    /**
     * [xdoc description]
     * @param  {[type]} ext [description]
     * @return {[type]}     [description]
     */
    xdoc : function(ext){

        if (!('elements' in JMVC.xdoc)) {
            JMVC.xdoc.elements = {};
        }
        !('core/xdoc' in $JMVC.extensions) && $JMVC.require('core/xdoc');
        if (!(ext in JMVC.xdoc.elements)) {
            try {
                JMVC.io.ajcall(
                    JMVC.vars.baseurl + '/app/extensions/' + ext + '/xdoc.xml', {
                        method : 'GET',
                        type : 'xml',
                        cback : function (doc) {
                            JMVC.xdoc.elements[ext] = doc;
                            console.debug('doc : ' + doc)
                        },
                        error : function (e) {alert('errore'); }

                    }
                );/*
                JMVC.io.get(
                    JMVC.vars.baseurl + '/app/extensions/' + ext + '/xdoc.xml',
                    function (doc) {
                        JMVC.xdoc.elements[ext] = doc;
                        console.debug('doc : ' + doc)
                    },
                    false, {}, false,
                    function (e) {alert('errore'); }
                );*/
            } catch (e){}
        }
        JMVC.xdoc.toggle(ext);
    },
    loading : function (intperc, msg) {
        try {
            document.getElementById('JMVCisloading').style.display = 'block';
            document.getElementById('JMVCloading').style.width =  ~~intperc + '%';
            msg && (document.getElementById('JMVCloadingmessage').innerHTML = msg);
        } catch(e) {}
    }
};