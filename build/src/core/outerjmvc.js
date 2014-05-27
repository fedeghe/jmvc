/*--------
JMVC outer
--------*/
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
    hash : dispatched.hash,
    controllers : {},
    models : {},
    views : {},
    interfaces : {},
    vars : {
        baseurl:    dispatched.baseurl + dispatched.port,
        extensions : dispatched.baseurl + dispatched.port + PATH.ext, //'/app/extensions',
        devurl : DEV_URL,
        produrl : PROD_URL,
        devurlstatic : DEV_URLstatic,
        produrlstatic : PROD_URLstatic,
        version : JMVC_VERSION,
        review :  JMVC_REVIEW,
        date : JMVC_DATE,
        time :  JMVC_TIME,
        last_modified : WD.lastModified,
        starttime : 0,
        rendertime : 0,
        endtime : 0,
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
    //
    modules : Modules,
    nsCheck : jmvc.ns.check,
    nsMake : jmvc.ns.make,
    //
    // Constructors
    Channel : Channel,
    Event : Event,
    Errors : Errors,
    Interface : Interface,
    FunctionQueue : FunctionQueue,
    Pipe : Pipe,
    Promise : Promise,
    //
    parseLang : jmvc.parseLang,
    //
    hookCheck : jmvc.hook_check,
    //
    debug : jmvc.debug,
    delegate : jmvc.delegate,
    extend : jmvc.extend,
    factory:    jmvc.factory_method,
    inherit : jmvc.inherit,
    multinherit : jmvc.multi_inherit,
    //
    preload : preload,
    //
    check : jmvc.check,
    hook : jmvc.hook,
    hooks : hooks,
    jeval : jmvc.jeval,
    prototipize : jmvc.prototipize,
    purge : jmvc.purge,
    parse : Parser.parse,
    render: jmvc.render, // !api
    require : jmvc.require,
    lang : jmvc.lang,
    //
    set : jmvc.set,
    get : jmvc.get,
    del : jmvc.del,
    //
    //experimental
    set2 : jmvc.set2,
    get2 : jmvc.get2,
    del2 : jmvc.del2,
    //
    htmlChars : jmvc.htmlChars,
    htmlCharsDecode : jmvc.htmlCharsDecode,
    //
    gc : function () {
        var i = 0,
            a = arguments,
            l = a.length;
        for (null; i < l; i += 1) {
            a[i] = null;
        }
    },
    getView : function (n) {
        return jmvc.factory_method('view', n);
    },
    getModel : function (n, params) {
        return jmvc.factory_method('model', n, params);
    },
    loadInterfaces : function (n, params) {
        return jmvc.factory_method('interface', n, params);
    },
    //
    implement : jmvc.implement,
    //getController :   function(n) {return jmvc.factory_method('controller', n); }
    //
    // really really bad
    each : jmvc.each,
    //
    /**
     * [console description]
     * @return {[type]} [description]
     */
    console : function (opts) {
        opts = opts || {};
        if (!('core/console/console' in $JMVC.extensions)) {
            $JMVC.require('core/console/console');
        }
        JMVC.console.toggle(opts.h, opts.j, opts.c, opts.tab);
    },

    /**
     * [xdoc description]
     * @param  {[type]} ext [description]
     * @return {[type]}     [description]
     *
     * look at core/screen/screen.xml
     */
     xdoc : function (ext) {

        // maybe the register must be created
        !('elements' in JMVC.xdoc) && (JMVC.xdoc.elements = {});

        // maybe xdoc is not loaded yet 
        //
        $JMVC.require('core/xdoc/xdoc');

        // if has been loaded before, it would be found in the registry
        // otherwise get it!
        // 
        if (!(ext in JMVC.xdoc.elements)) {
            
            // try to get the extension xml
            //
            try {
                JMVC.io.getXML(
                    JMVC.vars.baseurl + '/app/extensions/' + ext + '.xml',

                    // success
                    //
                    function (doc) {
                        
                        // save into the xdoc elements registry
                        //
                        JMVC.xdoc.elements[ext] = doc;

                        // toggle the view
                        //
                        JMVC.xdoc.toggle(ext);
                    },

                    // notify the user that no documentation has been found
                    //
                    function (xhr) {
                        alert([
                            '[ JMVC WARNING ]',
                            'The document',
                            ('/app/extensions/' + ext + '.xml').replace(/\//g, " / "),
                            'CANNOT be found!'
                        ].join('\n\n'));
                        xhr.abort();
                        return false;
                    }
                );
            }catch (e){}

        } else {

            // ok the extension specification xml has been previously loaded
            // thus is in the registry ready to be used
            //
            JMVC.xdoc.toggle(ext);
        }
    },

    /**
     * [loading description]
     * @param  {[type]} intperc [description]
     * @param  {[type]} msg     [description]
     * @return {[type]}         [description]
     */
    loading : function (intperc, msg) {
        /*
        MARKUP NEEDED to use that function:
        to make it work move the jmvc.js at the end of the body
        <div style="width:30%;margin:0 auto;margin-top:10px;display:none" id="JMVCisloading">
            <div id="JMVCloadingmessage" style="text-align:center;font-size:10px;font-family:Verdana, sans serif; color:#aaa"></div>
            <div style="background-color:#f5f5f5;margin-top:5px;border:1px solid #aaa;">
                <div style="width:0px;background-color:#8f8;height:3px" id="JMVCloading"></div>
            </div>
        </div>
         */
        try {
            document.getElementById('JMVCisloading').style.display = 'block';
            document.getElementById('JMVCloading').style.width =  ~~intperc + '%';
            if (msg) {
                document.getElementById('JMVCloadingmessage').innerHTML = msg;
            }
        } catch (e) {}
    }
};
//-----------------------------------------------------------------------------