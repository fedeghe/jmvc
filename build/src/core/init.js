// returning object created in that function, here $JMVC will be JMVC
var $JMVC,
    JMVC_VERSION = $version$,
    JMVC_REVIEW = $review$,
    JMVC_PACKED = false,

    /**
     * inner jmvc literal, will contain almost all the functions used to 
     * compose the $JMVC object and thus the returning JMVC
     * @type {Object}
     */
    jmvc = {},

    // url separator
    US = '/',

    /**
    * in some cases is useful to automatically distinguish between a
    * developing url and
    * production url
    * will be returned in a var container accessible from the JMVC object
    */
    DEV_URL = WDL.protocol + US + US + 'www.jmvc.dev',
    PROD_URL = WDL.protocol + US + US + 'www.jmvc.org',

    /*
     * two paths for
     * > extensions, used as basepath by JMVC.require
     * > test
     * > langs
     */
    PATH = {
        /**
         * extensions path, used as base path in the JMVC.require function
         * @type {string}
         */
        ext  : US + 'app' + US + 'extensions' + US,

        /**
         * test suite path, every controller matching "test_foocontroller"
         * will automatically load the test suite and
         *  
         * foocontroller.js will be 
         * searched into the /app/controller/test directory
         * to use test suite a require('test') is needed until TODO is done
         * @type {string}
         */
        test : US + 'app' + US + 'testsuite' + US,

        /**
         * path for lang files, loaded with the JMVC.lang function
         * @type {string}
         */
        lang : US + 'app' + US + 'i18n' + US
    },

    JMVC_EXT = {
        controller : '.js',
        model : '.js',
        view : '.html',
        'interface' : '.interface.js'
    },

    /**
     * all these extensions can be used just after the action
     * @type {Array}
     */
    URL_ALLOWED_EXTENSIONS = ['html', 'htm', 'jsp', 'php', 'js', 'jmvc', 'j', 'mvc', 'do', 'asp'],

    /**
     * default values for controller & action
     * @type {Object}
     */
    JMVC_DEFAULT = {
        controller : 'index',
        action : 'index'
    },

    // dispather function result
    /**
     * here will be stored relevant results returned from the dispather function
     * used to parse the current url for getting all is needed to now how to get
     * the right response
     */
    dispatched,

    /**
     * MVC basic constructors
     */
    Controller,
    Model,
    View,
    Interface,

    /**
     * the parser object, used for replacing all available placeholders
     * (views, views variables, chunks, snippets)
     */
    Parser,

    

    /**
     * some useful constructors 
     */
    Event,
    Promise,
    Errors,

    /**
     * in case some modules need to be always loaded here's the place to set them
     * @type {Array}
     */
    Modules = ['vendors/google/analytics', 'core/cookie'],



    /**
     * preloader
     */
    preload,


    /**
     * hooks literal used to execute callbacks as far as some relevant event are fired
     * starting fron the request and ending with the document rendering end
     * @type {Object}
     */
    hooks = {},

    /**
     * a literal to store loaded lang files
     * @type {Object}
     */
    langs = {},
    defaultlang = 'en',
    currentlang = defaultlang,

    // store starting time, that's not truly the starting time but 
    // it's really next to the real value
    time_begin = +new Date,

    //undefined string for typeof
    undef = 'undefined',

    // getmode used in the require function
    // ajax   : use xhr to get the source and evals
    // script : creates a script tag with the right url to the source
    // note : seems like script mode load faster but
    getmode = 'ajax'; // script or ajax
