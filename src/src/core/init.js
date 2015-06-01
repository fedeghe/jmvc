/*- INIT -*/
/**
 * Override window.onerror enhancement
 * 
 * thx to Venerons
 * https://gist.github.com/Venerons/f54b7fbc17f9df4302cf
 */
(function (previousOnError) {
    // uh!...want to do something with previousOnError?
    // ...really?
 


    function reportError(error, message) {
        //console.debug(arguments);
        message = message || '';
        JMVC.debug(
            'ERROR: ' + message + ' [' + error.toString() + ']\n' +
            '\nName:\t\t' + (error.name || '-') +
            '\nMessage:\t' + (error.message || '-') +
            '\nFile:\t\t\t' + (error.fileName || '-') +
            '\nSource:\t\t' + ((error.toSource && error.toSource()) || '-') +
            '\nLine #:\t\t' + (error.lineNumber || '-') +
            '\nColumn #:\t' + (error.columnNumber || '-') +
            '\n\nStack:\n\n' + (error.stack || '-')
        );
    }
     
    window.onerror = function (message, filename, lineno, colno, error) {
        
        try{
            error.message = error.message || message || null;
            error.fileName = error.fileName || filename || null;
            error.lineNumber = error.lineNumber || lineno || null;
            error.columnNumber = error.columnNumber || colno || null;
        }catch (e){

        }
        reportError(error, 'Uncatched Exception');
        JMVC.Errors.notify(error);
    };

})(W.onerror);




// store starting time, that's not truly the starting time but 
// it's really next to the real value
var time_begin = +new Date(),

    // the returning object created in that function,
    // global JMVC will take the $JMVC ref
    $JMVC,

    // version (vars.json)
    JMVC_VERSION = '$version$',

    // review (vars.json)
    JMVC_REVIEW = '$review$',

    // review (vars.json)
    JMVC_DATE = '__DATE__',

    // review (vars.json)
    JMVC_TIME = '__TIME__',

    // experimental (ignore it)
    JMVC_PACKED = '$packed$', //'.min' 

    // inner jmvc literal, will contain almost all the functions used to 
    // compose the $JMVC object and thus the returning JMVC
    jmvc = {},

    // url separator
    US = '/',

    /*
    in some cases is useful to automatically distinguish between a
    developing url and production url (ex: analytics extension)
    will be returned in a var container accessible from the JMVC object
    through JMVC.vars.baseurl & JMVC.vars.devurl
    */
    DEV_URL = WDL.protocol + US + US + 'www.jmvc.dev',
    PROD_URL = WDL.protocol + US + US + 'www.jmvc.org',
    DEV_URLstatic = WDL.protocol + US + US + 'static.jmvc.dev',
    PROD_URLstatic = WDL.protocol + US + US + 'static.jmvc.org',

    /**
     * paths for
     * extensions: used as basepath by JMVC.require
     * test: tests
     * lang: lang files
     * @type {Object}
     */
    PATHS = {

        /**
         * extensions path, used as base path in the JMVC.require function
         * @type {[type]}
         */
        ext  : US + 'app' + US + 'extensions' + US,

        /**
         * test suite path, every controller matching "test_foocontroller"
         * will automatically load the test suite and
         *
         * foocontroller.js will be 
         * searched into the /app/controller/test directory
         * @type {[type]}
         */
        test : US + 'app' + US + 'testsuite' + US,

        /**
         * path for lang files, loaded with the JMVC.lang function
         * @type {[type]}
         */
        lang : US + 'app' + US + 'i18n' + US,

        /**
         * path for engy component files, engy requires widgzard v.2
         * @type {[type]}
         */
        engyComponents : US + 'app' + US + 'eComp' + US
    },
    //
    JMVC_EXT = {
        'controller' : (JMVC_PACKED || '') + '.js',
        'model' : (JMVC_PACKED || '') + '.js',
        'view' : '.html',
        'interface' : '.interface' + (JMVC_PACKED || '') + '.js'
    },

    /*
     * all these extensions can be used in the url
     * pay attention to the order
     *
     * @type {Array}
     */
    URL_ALLOWED_EXTENSIONS = [
        'asp', 'do', 'exe', 'html', 'htm', 'jmvc',  'jsp', 'js', 'jeti', 'j', 'ninja',  'mvc', 'ohmygod', 'omg', 'php', 'wtf', 'whathafuck', 'trojan'
        //
        // ... seriously I should find someone able to help me!!!
        //  
    ],
    //
    /**
     * default values for controller & action
     * @type {Object}
     */
    JMVC_DEFAULT = {
        controller : 'index',
        action : 'index'
    },

    /**
     * dispather function result
     * here will be stored relevant results returned from the dispather function
     * used to parse the current url for getting all is needed to now how to get
     * the right response
     */
    dispatched,

    /* MVC basic constructors */
    Controller,
    Model,
    View,
    Interface,

    /**
     * the parser object, used for replacing all available placeholders
     * (views, views variables, chunks, snippets)
     */
    Parser,

    // Some useful constructors
    Pipe,
    Event,
    Promise,
    Errors,
    Channel,
    Extension,
    FunctionQueue,

    // in case some modules need to be always
    // loaded here's the place to set them
    Modules = [
        'vendors/google/analytics/analytics'
        //'core/cookie/cookie'
    ],

    // preloader
    preload,

    // hooks literal used to execute callbacks as far as some relevant event are fired
    // starting fron the request and ending with the document rendering end
    hooks = {},

    // a literal to store loaded lang files
    defaultlang = 'en',

    currentlang = defaultlang,

    //undefined string for typeof
    undef = 'undefined',

    //
    // getmode used in the require function
    // ajax         : use xhr to get the source and evals
    // script       : creates a script tag with the right url to the source, unsafe sync
    // scriptghost  : same as script but removes all injected script from the DOM after load, same problem
    // NOTE > it seems like script mode load faster but ...
    getmode = 'ajax', // {ajax, script, scriptghost}
    //
    // ===========================================
    //
    returnTrue = function () {return true; },
    returnFalse = function () {return false; };
    //-----------------------------------------------------------------------------