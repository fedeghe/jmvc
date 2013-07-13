/**
 * JMVC : Pure Javascript MVC framework
 * 
 * @version: 1.9.2
 * @date : 26-06-2013
 * @copyright (c) 2012, Federico Ghedina <fedeghe@gmail.com>
 * @author Federico Ghedina
 *
 * 
 * All rights reserved.
 * 
 * This code is distributed under the terms of the BSD licence
 * 
 * Redistribution and use of this software in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 * 
 * > Redistributions of source code must retain the above copyright notice, this list of conditions
 *   and the following disclaimer.
 * > Redistributions in binary form must reproduce the above copyright notice, this list of
 *   conditions and the following disclaimer in the documentation and/or other materials provided
 *   with the distribution.
 * > The names of the contributors to this file may not be used to endorse or promote products
 *   derived from this software without specific prior written permission.
 *   
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
 * TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 * 
 */


/**
 * main auto exec function
 * @param  window (through this ref)
 * @return undefined
 */
!function (W, undefined) {
    'use strict';
    /**
     * window.document & window.document.location
     * references
     * usable through the whole script
     */
    var WD = W.document,
        WDL = WD.location,  // reference for current location
        i,                  //
        j,                  // some counters
        l,                  //

        /**
         * JMVC object, globalized
         */
        JMVC = W.JMVC = (

            /**
             * this function returns the JMVC object after doing some stuff
             * @return {object literal} $JMVC inner object 
             */
            function () {

                // returning object created in that function, here $JMVC will be JMVC
                var $JMVC,
                    JMVC_VERSION = 1.9,
                    JMVC_REVIEW = 2,
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
                        test : US + 'app' + US + 'test' + US,

                        /**
                         * path for lang files, loaded with the JMVC.lang function
                         * @type {string}
                         */
                        lang : US + 'app' + US + 'i18n' + US
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
                     * used to parse the current url
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
                     * two useful constructors 
                     */
                    Event,
                    Promise,

                    /**
                     * in case some modules need to be always loaded here's the place to set them
                     * @type {Array}
                     */
                    Modules = ['google/analytics', 'cookie'],

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

                    // store starting time, that's not truly the starting time but 
                    // it's really next to the real value
                    time_begin = +new Date(),

                    //alias of undefined
                    undef = 'undefined',
                    //noop = function () {},

                    // getmode used in the require function
                    // ajax   : use xhr to get the source and evals
                    // script : creates a script tag with the right url to the source
                    // note : seems like script mode load faster but
                    getmode = 'ajax'; // script or ajax


                jmvc = {
                    /**
                     * globalize many variables, by default do not override existing ones,
                     * but using a truly value as second parameter it does
                     * @param  Object o    the literal containing all the elements to be published
                     * @param  {[type]} hard [description]
                     * @return void
                     */
                    "expose" : function (o, hard) {
                        hard = !!hard;
                        $JMVC.each(o, function (el, i) {
                            W[i] = hard ? el : W[i] || el;
                        });
                    },

                    /**
                     * eval function wrap
                     * @param  string   code to be evalued
                     * @return void
                     */
                    "jeval" : function (r) {
                        //W['ev' + 'al'](r);
                        (new Function(r))();
                    },


                    //
                    // for basic dummy inheritance
                    // function jmvc_basic_inherit(Child, Parent) {Child.prototype = new Parent(); }
                    //
                    //  true D.C.inheritance
                    /**
                     * [ description]
                     * @param  {[type]} Child  [description]
                     * @param  {[type]} Parent [description]
                     * @return {[type]}        [description]
                     */
                    "basic_inherit" : function (Child, Parent) {
                        //function T() {}
                        var T = new Function();
                        T.prototype = Parent.prototype;
                        Child.prototype = new T();
                        Child.prototype.constructor = Child;
                        Child.superClass = Parent.prototype;
                        Child.baseConstructor = Parent;
                    },


                    /**
                     * just for models
                     * @param  {[type]} m [description]
                     * @return {[type]}   [description]
                     */
                    "model_inherit" : function (m) {
                        m.prototype.get = Model.prototype.get;
                        m.prototype.set = Model.prototype.set;
                        m.prototype.del = Model.prototype.del;
                        m.prototype.vars = Model.prototype.vars;
                        m.prototype.reset = Model.prototype.reset;
                        m.prototype.constructor = Model.prototype.constructor;
                    },

                    /**
                     * Basic function for extending and object
                     * @param  {[type]} label [description]
                     * @param  {[type]} obj   [description]
                     * @param  {[type]} reqs  [description]
                     * @return {[type]}       [description]
                     */
                    "extend" : function (label, obj) {

                        // ensures that the target namespace exists 
                        var trg = jmvc.ns.make('JMVC.' + label);

                        // and set a flag, that can be switched off as far as
                        // if the object passed has a initCheck function
                        // the extension will take place only if the initCheck
                        // return truly value
                        if (typeof obj.initCheck === 'function') {
                            if (!obj.initCheck.call($JMVC)) {return false; }
                        }

                        (function (t, o) {
                            var j;
                            for (j in o) {
                                if (o.hasOwnProperty(j) && t[j] === undefined) {
                                    t[j] = o[j];
                                }
                            }
                        })(trg, obj);

                        //maybe init, in case call it
                        if (typeof trg.init === 'function') {
                            trg.init.call($JMVC);
                            //and delete
                            delete trg.init;
                        }
                    },

                    /**
                     * hook utility
                     * @param  {[type]} hookname [description]
                     * @param  {[type]} param    [description]
                     * @return {[type]}          [description]
                     */
                    "check_hook" : function (hookname, param) {
                        var dyn = param[0] || false;

                        if (hooks[hookname]) {
                            jmvc.each(hooks[hookname], function (f) {
                                dyn = f.apply(null, [dyn]);
                            });
                        }
                        return dyn;
                    },

                    /**
                     * instance new view content or eval a model or controller
                     * @param  {[type]} path   [description]
                     * @param  {[type]} type   [description]
                     * @param  {[type]} name   [description]
                     * @param  {[type]} params [description]
                     * @return {[type]}        [description]
                     */
                    "xhrget" : function (path, type, name, params) {
                        //
                        var ret = false, o;
                        if (type === 'view' && typeof $JMVC.views[name] === 'function') {

                            ret = $JMVC.views[name];

                        } else if (type === 'model' && typeof $JMVC.models[name] === 'function') {

                            o = new $JMVC.models[name]();
                            o.vars = {};
                            ret = o;

                        } else {

                            $JMVC.io.get(
                                path,
                                function cback(res) {
                                    switch (type) {
                                    case 'view':
                                        $JMVC.views[name] = new View(res);
                                        ret =  $JMVC.views[name];
                                        break;
                                    case 'controller':
                                        // res = res.replace(/^(\s*)\/\/(.*)[\n]/g, '/*$1*/')
                                        // res = res.replace(/(\/\*.*\*\/)/gm, '');
                                        // res = res.replace(/(\/\/.*)/g, '');
                                        // WARNING : removes only inlines;
                                        jmvc.jeval(res);
                                        jmvc.basic_inherit($JMVC[type + 's'][name], Controller);
                                        break;
                                    case 'model':
                                        jmvc.jeval(res);
                                        jmvc.model_inherit($JMVC[type + 's'][name]);
                                        o = new $JMVC.models[name]();
                                        if (params) {
                                            $JMVC.models[name].apply(o, params);
                                        }
                                        o.vars = {};
                                        ret = o;
                                        break;
                                    case 'interface':
                                        if (!JMVC.interfaces[name]) {
                                            jmvc.jeval(res);
                                            //JMVC.interfaces[name] = new Interface(JMVC.interfaces[name]);
                                        }
                                        break;
                                    }
                                },
                                false //sync
                            );
                        }

                        return ret;
                    },

                    /**
                     * type can be only 'view' or 'model'
                     * @param  {[type]} type   [description]
                     * @param  {[type]} name   [description]
                     * @param  {[type]} params [description]
                     * @return {[type]}        [description]
                     */
                    "factory_method" : function (type, name, params) {
                        // using namespace ?
                        var pieces = name.split('/'),
                            path = false,
                            //path_absolute =  $JMVC.vars.baseurl + US + 'app' + US + type + 's/' + $JMVC.c_prepath;
                            path_absolute =  $JMVC.vars.baseurl + US + 'app' + US + type + 's/',
                            ret;

                        if (pieces.length > 1) {
                            name = pieces.pop();
                            path = pieces.join(US);
                        }
                        //need to do this because of the special case when a c_prepath is used
                        if (type === 'controller') {
                            path_absolute += $JMVC.c_prepath;
                        }

                        path_absolute += (path ? path + US : "") + name;

                        switch (type) {
                        case 'view':
                            path_absolute += '.html';
                            break;
                        case 'model':
                        case 'controller':
                            path_absolute += '.js';
                            break;
                        case 'interface':
                            path_absolute += '.interfaces.js';
                            break;
                        default:
                            type = false;
                            break;
                        }
                        //console.debug(path_absolute)
                        if (!type) {return false; }
                        // ajax get script content and return it

                        ret = jmvc.xhrget(path_absolute, type, name, params);

                        return ret;
                    },

                    /**
                     * render function
                     * @param  {[type]} cback [description]
                     * @return {[type]}       [description]
                     */
                    "render" : function (cback) {
                        var ctrl, i;

                        // "import" the controller (eval ajax code)
                        $JMVC.factory('controller', $JMVC.c);

                        // if the constructor has been evalued correctly
                        if ($JMVC.controllers[$JMVC.c]) {

                            // grant basic ineritance from parent Controller
                            jmvc.basic_inherit($JMVC.controllers[$JMVC.c], Controller);
                            // make an instance
                            ctrl = new $JMVC.controllers[$JMVC.c]();
                            // store it
                            $JMVC.controllers[$JMVC.c] = ctrl;
                            // manage routes
                            if (ctrl.jmvc_routes) {
                                $JMVC.a = ctrl.jmvc_routes[$JMVC.a] || $JMVC.a;
                            }
                            // parameters are set to controller
                            for (i in $JMVC.p) {
                                if ($JMVC.p.hasOwnProperty(i)) {
                                    ctrl.set(i, decodeURI($JMVC.p[i]));
                                }
                            }
                            // call action
                            if (ctrl[$JMVC.a] && typeof ctrl[$JMVC.a] === 'function') {
                                ctrl[$JMVC.a]();
                            } else {
                                if ($JMVC.a.toLowerCase() !== JMVC_DEFAULT.action) {
                                    WDL.href = US + '404' + US + 'msg' + US + 'act' + US + $JMVC.a;
                                }
                            }
                        } else {
                            if ($JMVC.c.toLowerCase() !== JMVC_DEFAULT.controller) {
                                WDL.href = US + '404' + US + 'msg' + US + 'cnt' + US + $JMVC.c;
                            }
                        }
                        if (cback && typeof cback === 'function') {
                            cback.call($JMVC);
                        }
                        $JMVC.loaded = true;
                    },




                    //@DOC
                    // setter getter unsetter $JMVC vars
                    "set" : function (name, content) {
                        $JMVC.vars[name] = content;
                        return $JMVC;
                    },

                    //@DOC
                    "get" : function (name) {
                        return $JMVC.vars[name] || false;
                    },

                    //@DOC
                    "del" : function (name) {
                        $JMVC.vars[name] && (delete $JMVC.vars[name]);
                        return $JMVC;
                    },

                    //lambda function2context binding
                    "bind_old" : function (func, ctx) {
                        return function () {
                            return func.apply(ctx, arguments);
                        };
                    },

                    "bind" : function (func, ctx) {
                        // splice noIE8, slice è distruttivo, tolgo i primi due, formali 
                        // quindi tengo tutti quelli che non sono nella firma
                        var args = Array.prototype.slice.call(arguments, 2);
                        return function () {
                            func.apply(ctx || $JMVC, [].concat(args, Array.prototype.slice.call(arguments)));
                        };
                    },

                    // require, 'test' is an exception, if passed then the path will be /app/test
                    "require" : function () {
                        var i = 0,
                            l = arguments.length,
                            //curr = -1,
                            path,
                            head = JMVC.WD.getElementsByTagName('head').item(0),
                            s;

                        for (null; i < l; i += 1) {

                            if (typeof arguments[i] === 'string' && !$JMVC.extensions[arguments[i]]) {
                                //curr += 1;
                                // if the extension is named "test"
                                // then the path is changed to PATH['test']
                                path = PATH[arguments[i] === 'test' ? 'test' : 'ext'] + arguments[i] + '.js';
                                switch (getmode) {
                                case 'ajax':
                                    $JMVC.io.get(path, function (jres) {
                                        jmvc.jeval(jres);
                                    },  false);
                                    break;
                                case 'script':
                                    s = JMVC.WD.createElement('script');
                                    s.src = path;
                                    head.appendChild(s);
                                    break;
                                }
                                $JMVC.extensions[arguments[i]] = arguments[i];
                            }
                        }
                    },
                    "implement" : function (o, interf, s) {
                        var i = 0,
                            l = interf.length,
                            strict = true;
                        if (typeof s !== undefined) {strict = s; }
                        for (null; i < l; i += 1) {
                            if (
                                !(
                                    (o.prototype && o.prototype[interf[i]] && typeof o.prototype[interf[i]] === 'function')
                                    ||
                                    (!strict && (o[interf[i]] && typeof o[interf[i]] === 'function'))
                                )
                            ) {
                                return false;
                            }
                        }
                        return true;
                    },

                    "globalize" : function (obj, name) {
                        JMVC.W[name] = obj;
                    },

                    /**
                     * lang loader
                     * @return {[type]} [description]
                     */
                    "lang" : function () {
                        var lng = Array.prototype.slice.call(arguments, 0),
                            i = 0,
                            l = lng.length;

                        while (i < l) {
                            if (!langs[lng[i]]) {
                                $JMVC.io.get(PATH.lang + lng[i] + '.js', function (ln) {
                                    jmvc.jeval(ln);
                                },  false);
                                langs[lng[i]] = true;
                            }
                            i += 1;
                        }

                    },


                    /**
                     * [ description]
                     * @param  {[type]} obj   [description]
                     * @param  {[type]} force [description]
                     * @return {[type]}       [description]
                     */
                    "hook" : function (obj, force) {
                        var allowed = ['onBeforeRender', 'onAfterRender', 'onBeforeParse', 'onAfterParse'],
                            f = 0;
                        for (f in obj) {
                            if (obj.hasOwnProperty(f)) {
                                try {
                                    if ($JMVC.array.inArray(allowed, f) > -1 || force) {
                                        hooks[f] instanceof Array || (hooks[f] = []);
                                        hooks[f].push(obj[f]);
                                    } else {
                                        throw {
                                            message : 'EXCEPTION : You`re trying to hook unallowed function "' + f + '"'
                                        };
                                    }
                                } catch (e) {
                                    W.alert(e.message);
                                }
                            }
                        }
                    },

                    /**
                     * 
                     */
                    "ns" : {
                        /**
                         * [ description]
                         * @param  {[type]} str [description]
                         * @param  {[type]} obj [description]
                         * @param  {[type]} ctx [description]
                         * @return {[type]}     [description]
                         */
                        "make" : function (str, obj, ctx) {
                            var chr = '.',
                                els = str.split(chr),
                                ret;
                            (typeof ctx === undef) && (ctx = W);
                            (typeof obj === undef) && (obj = {});

                            if (!ctx[els[0]]) {
                                ctx[els[0]] = (els.length === 1) ? obj : {};
                            }
                            ret = ctx[els[0]];
                            return (els.length > 1) ? jmvc.ns.make(els.slice(1).join(chr), obj, ctx[els[0]]) : ret;
                        },

                        /**
                         * check if a namespace already exists
                         * @param  {[type]} ns  namesoace dot glued
                         * @param  {[type]} ctx [description]
                         * @return {[type]}     [description]
                         */
                        "check" : function (ns, ctx) {
                            var els = ns.split('.'),
                                i = 0,
                                l = els.length;
                            ctx = (ctx !== undefined) ? ctx : W;
                            for (null; i < l; i += 1) {
                                if (ctx[els[i]]) {
                                    ctx = ctx[els[i]];
                                } else { // break it
                                    return false;
                                }
                            }
                            return ctx;
                        }
                    },

                    /**
                     * [ description]
                     * @param  {[type]} o [description]
                     * @return {[type]}   [description]
                     */
                    "purge" : function (o) {
                        var a = o.attributes, i, l, n;
                        if (a) {
                            for (i = 0, l = a.length; i < l; i += 1) {
                                n = a[i].name;
                                if (typeof o[n] === 'function') {
                                    o[n] = null;
                                }
                            }
                        }
                        a = o.childNodes;
                        if (a) {
                            for (i = 0, l = a.length; i < l; i += 1) {
                                jmvc.purge(o.childNodes[i]);
                            }
                        }
                    },

                    /**
                     * [ description]
                     * @param  {[type]} el  [description]
                     * @param  {[type]} obj [description]
                     * @return {[type]}     [description]
                     */
                    "prototipize" : function (el, obj) {
                        var  p;
                        for (p in obj) {
                            if (obj.hasOwnProperty(p)) {
                                el.prototype[p] = obj[p];
                            }
                        }
                    },

                    /**
                     * [ description]
                     * @return {[type]} [description]
                     */
                    "debug" : function () {
                        try {
                            W.console.log.apply(W.console, arguments);
                        } catch (e1) {
                            try {
                                W.opera.postError.apply(W.opera, arguments);
                            } catch (e2) {
                                W.alert(Array.prototype.join.call(arguments, " "));
                            }
                        }
                    },

                    "htmlspecialchars" : function (text) {
                        return text
                            .replace(/&/g, "&amp;")
                            .replace(/</g, "&lt;")
                            .replace(/>/g, "&gt;")
                            .replace(/"/g, "&quot;")
                            .replace(/'/g, "&#039;");
                    },

                    "each" : function (o, func) {
                        var i, l, ret,/* t,*/ type;
                        type = ({}).toString.call(o).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
                        func.$break = false;
                        func.$continue = false;
                        func['break'] = func.exit = function () {func.$break = true; };
                        func['continue'] = func.skip = function () {func.$continue = true; };
                        //alert(type);
                        return type.match(/(array|object)/) ? {
                            'object' : function () {
                                var x;
                                ret = {};
                                for (i in o) {
                                    func.$continue = false;
                                    x = func.call(o, o[i], i);
                                    if (func.$continue) {continue; }
                                    if (func.$break) {break; }
                                    ret[i] = x;
                                }
                                return ret;
                            },
                            'array' : function () {
                                var x;
                                i = 0;
                                l = o.length;
                                ret = [];
                                for (null; i < l; i += 1) {
                                    func.$continue = false;
                                    x = func.call(o, o[i], i);
                                    if (func.$continue) {continue; }
                                    if (func.$break) {break; }
                                    ret.push(x);
                                }
                                return ret;
                            }
                        }[type]() : false;
                    },
                    /*
                    JMVC.each([1,2,3,4,5,6,7,8,9,10], function f(e) {
                        if (e % 2 == 0) {
                            f.skip();
                        }
                        return e;
                    });
                     */

                    // ty https://github.com/stackp/promisejs
                    /**
                     * 
                     */
                    "promise" : {
                        'create' : function () {return new Promise(); },
                        'join' : function () {},
                        'chain' : function () {}
                    },

                    "parselang" : function (cnt) {
                        var RXlng = "\\[L\\[([\\S\\s]*?)\\]([A-z]*?)\\]",
                            lang = true,
                            defaultlang = 'en',
                            tmp,
                            limit = 100000,
                            cookie_lang = $JMVC.p.lang || $JMVC.cookie.get('lang');
                        if ($JMVC.p.lang) {
                            $JMVC.cookie.set('lang', $JMVC.p.lang);
                        }

                        //console.debug(cookie_lang);

                        $JMVC.i18n || ($JMVC.i18n = {});


                        // check for [[js code]], es. [[JMVC.vars.baseurl]] will be rendered as the value of baseurl
                        while (limit) {
                            lang = new RegExp(RXlng, 'gm').exec(cnt);
                            tmp = '';
                            
                            if (!!lang) {
                                !lang[2] && (lang[2] = cookie_lang || defaultlang);
                                
                                tmp = lang[2] && $JMVC.i18n[lang[2]] && $JMVC.i18n[lang[2]][lang[1]] ? $JMVC.i18n[lang[2]][lang[1]] : lang[1];
                                cnt = cnt.replace(lang[0], tmp);

                            } else {
                                break;
                            }
                            lang = !!lang;
                            limit -= 1;
                        }
                        return cnt;
                    }
                };

                // ensure ucfirst controller name
                /*
                function jmvc_normalize(n) {
                    return n.charAt(0).toUpperCase() + n.substr(1).toLowerCase();
                }
                */
                ////



                Parser = {
                    /**
                     * [tpl description]
                     * @param  {[type]} content [description]
                     * @return {[type]}         [description]
                     */
                    tpl : function (content) {
                        return (content.match(/\<%/)) ?
                        (function (str) {
                            var fn = new Function('obj',
                                "var p=[]; p.push('" +
                                str.replace(/[\r\t\n]/g, " ")
                                .split("<%").join("\t")
                                .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                                .replace(/\t=(.*?)%>/g, "',$1,'")
                                .split("\t").join("');")
                                .split("%>").join("p.push('")
                                .split("\r").join("\\'") + "');  return p.join('');"
                                );
                            return fn(str);
                        })(content) : content;
                    },

                    // This function get a content and substitute jmvc.vars
                    // and direct view placeholders like {{viewname .... }}
                    // returns parsed content
                    /**
                     * [parse description]
                     * @param  {[type]} content [description]
                     * @return {[type]}         [description]
                     */
                    parse : function (content) {

                        // hook
                        var cont = content, // the view content
                            RX = {
                                'patt' : "{{(.[^\\}]*)}}", // for hunting view placeholders
                                'pattpar' : "\\s(.[A-z]*)=`(.[^/`]*)`", // for getting explicit params passed within view placeholders
                                'pattvar' : "\\$(.[^\\$\\s}]*)\\$", // for variables
                                'viewname' : "^(.[A-z]*)\\s" // for getting only the viewname
                            },
                            res, // results of view hunt 
                            //resvar, // variables found ##unused
                            myview, // the view instance
                            tmp1,
                            tmp2, // two temporary variables for regexp results
                            i = 0,
                            j,
                            k, // some loop counters
                            limit = 100, // recursion limit for replacement
                            viewname, // only the view name
                            orig, // original content of {{}} stored for final replacement
                            register, // to store inner variables found in the placeholder
                            go_ahead = true; //flag
                        
                        if (!!!content) {
                            return '';
                        }

                        while (i < limit) {
                            i += 1;
                            res = new RegExp(RX.patt, 'gm').exec(cont);

                            if (res) {
                                viewname = orig = res[1];
                                register = false;

                                // got params within ?
                                if (new RegExp(RX.pattpar, 'gm').test(res[1])) {
                                    // register becomes an object and flags result for later check
                                    register = {};

                                    // get only the view name, ingoring parameters
                                    tmp2  = (new RegExp(RX.viewname)).exec(res[1]);
                                    viewname = tmp2[1];

                                    tmp2 = res[1];
                                    while (go_ahead) {
                                        // this is exactly pattpar but if I use it does not work
                                        tmp1 = (new RegExp(RX.pattpar, 'gm')).exec(tmp2);

                                        if (tmp1) {
                                            // add to temporary register
                                            register[tmp1[1]] = tmp1[2];
                                            tmp2 = tmp2.replace(' ' + tmp1[1] + '=`' + tmp1[2] + '`', "");
                                        } else {
                                            go_ahead = false;
                                        }
                                    }
                                }
                                // if not loaded give an alert
                                if (!$JMVC.views[viewname]) {
                                    // here the view is requested but not explicitly loaded with the $JMVC.getView method.
                                    // You should use that method, and you'll do for sure if You mean to use View's variable
                                    // but if You just load a view as a simple chunk with {{myview}} placeholder inside another one
                                    // then $JMVC will load it automatically (take care to not loop, parsing stops after 100 replacements)
                                    /*
                                        alert('`'+viewname+'` view not loaded.\nUse Factory in the controller to get it. \n\njmvc will'+
                                            ' load it for you but variables are\n lost and will not be replaced.');
                                    */
                                    //console.debug(viewname)
                                    //$JMVC.factory('view', viewname);
                                    myview = $JMVC.factory('view', viewname);
                                } else {
                                    myview = $JMVC.views[viewname];
                                }

                                // in case there are some vars in placeholder
                                // register will hold values obtained above
                                // and we give'em to the view, the parse method
                                // will do the rest
                                if (register !== false) {
                                    for (k in register) {
                                        if (register.hasOwnProperty(k)) {
                                            myview.set(k, register[k]);
                                        }
                                    }
                                }

                                // before view substitution,
                                // look for variables, these have to be set with set method on view instance,
                                // (and that cannot be done using {{viewname}} placeholder )
                                tmp1 = true;
                                while (tmp1) {
                                    tmp1 = new RegExp(RX.pattvar, 'gm').exec(myview.content);
                                    if (tmp1) {
                                        myview.content = myview.content.replace('$' + tmp1[1] + '$', myview.get(tmp1[1]));
                                    }
                                }
                                // now the whole view
                                cont = cont.replace('{{' + orig + '}}', myview.content);
                            }
                        }
                        // now $JMVC.vars parse
                        for (j in $JMVC.vars) {
                            if ($JMVC.vars.hasOwnProperty(j)) {
                                cont = cont.replace(new RegExp("\\$" + j + "\\$", 'g'), $JMVC.vars[j]);
                            }
                        }
                        // use script on template function
                        cont = Parser.tpl(cont);
                        jmvc.check_hook('onAfterParse', [cont]);
                        return cont;
                    }
                };
                //END PARSER

                

                

                

                
                /**
                 * [Event description]
                 * @param {[type]} sender [description]
                 */
                Event = function (sender) {
                    this.sender = sender;
                    this.listeners = [];
                };
                Event.prototype = {
                    /**
                     * [ description]
                     * @param  {[type]} listener [description]
                     * @return {[type]}          [description]
                     */
                    'attach' : function (listener) {
                        this.listeners.push(listener);
                    },

                    /**
                     * [ description]
                     * @param  {[type]} args [description]
                     * @return {[type]}      [description]
                     */
                    'notify' : function (args) {
                        var i,
                            l;
                        for (i = 0, l = this.listeners.length; i < l; i += 1) {
                            this.listeners[i](this.sender, args);
                        }
                    }
                };


                /**
                 * [Promise description]
                 */
                Promise = function () {
                    this.cbacks = [];
                    this.len = 0;
                    this.completed = false;
                    this.res = false;
                    this.err = false;
                    this.reset = function () {
                        this.len = 0;
                        this.cbacks = [];
                    };
                };
                /**
                 * [done description]
                 * @param  {[type]}   res [description]
                 * @param  {[type]}   err [description]
                 * @return {Function}     [description]
                 */
                Promise.prototype.done = function (res, err) {
                    var i = 0;
                    this.completed = true;
                    this.res = res;
                    this.err = err;
                    for (null; i < this.len; i += 1) {
                        this.cbacks[i](res, err);
                    }
                    this.reset();
                };
                /**
                 * [then description]
                 * @param  {[type]} cback [description]
                 * @param  {[type]} ctx   [description]
                 * @return {[type]}       [description]
                 */
                Promise.prototype.then = function (cback, ctx) {
                    var func = jmvc.bind(cback, ctx);
                    if (this.completed) {
                        func(this.res, this.err);
                    } else {
                        this.cbacks[this.len] = func;
                        this.len += 1;
                    }
                    return this;
                };
                

                Interface = function (f) {
                    this.mthds = f;
                };
                Interface.prototype.addMethod = function (mthd) {
                    this.mthds[mthd.name] || (this.mthds[mthd.name] = mthd);
                };
                Interface.prototype.removeMethod = function (mthd) {
                    this.mthds[mthd] && (delete this.mthds[mthd]);
                };
                Interface.prototype.check = function (o) {
                    var m,
                        i = 0,
                        l = this.mthds.length,
                        obj = new o();
                    for(m in this.mthds){
                        if(typeof obj[this.mthds[m]] !== 'function'){
                            return false;
                        }
                    }
                    obj = null;
                    return true;
                };
                

                //
                // ***********
                // CONTROLLER 
                // ***********
                // 
                // parent controller
                Controller = function () {};
                // for storing url vars 
                Controller.prototype.vars = {};
                Controller.prototype.jmvc_routes = {};

                /**
                 * [index description]
                 * @return {[type]} [description]
                 */
                Controller.prototype.index = function () {
                    W.alert('Default index action, write down a controller with an');
                };

                /**
                 * [addRoutes description]
                 * @param {[type]} name [description]
                 * @param {[type]} val  [description]
                 */
                Controller.prototype.addRoutes = function (name, val) {
                    var j;
                    if (typeof name === 'string') {
                        this.jmvc_routes[name] = val;
                    }
                    if (typeof name === 'object') {
                        for (j in name) {
                            if (name.hasOwnProperty(j)) {
                                this.addRoutes(j, name[j]);
                            }
                        }
                    }
                };

                /**
                 * [relocate description]
                 * @param  {[type]} uri [description]
                 * @param  {[type]} ms  [description]
                 * @return {[type]}     [description]
                 */
                Controller.prototype.relocate = function (uri, ms) {
                    W.setTimeout(
                        function () {
                            WDL.href = String(uri);
                        },
                        ~~(1 * ms) || 0
                    );
                };

                /**
                 * [render description]
                 * @param  {[type]} content [description]
                 * @param  {[type]} cback   [description]
                 * @return {[type]}         [description]
                 */
                Controller.prototype.render = function (content, cback) {

                    ///allow only cback 
                    if (typeof content === 'function') {
                        cback = content;
                        content = false;
                    }
                    
                    var tmp_v = new View(content);

                    tmp_v.render(typeof cback === 'function' ? {cback : cback} : null);
                    return this;
                };

                /**
                 * [reset description]
                 * @return {[type]} [description]
                 */
                Controller.prototype.reset = function () {
                    this.vars = {};
                    return this;
                };

                //
                // ******
                // MODEL
                // ******
                //
                //
                Model = function () {};
                Model.prototype.vars = {};
                /**
                 * [reset description]
                 * @return {[type]} [description]
                 */
                Model.prototype.reset = function () {
                    this.vars = {};
                    return this;
                };

                /**
                 * [constructor description]
                 * @type {String}
                 */
                Model.prototype.constructor = 'model';

                //
                // ********
                // * VIEW *
                // ********
                // 
                // directly instantiated assinging content
                /**
                 * [View description]
                 * @param {[type]} cnt [description]
                 */
                View = function (cnt) {
                    // original content
                    
                    this.ocontent = cnt || '';
                    this.content = cnt || '';

                    this.vars = {'baseurl' : $JMVC.vars.baseurl};
                };

                //
                // meat to receive a model, all $name$
                // placeholders in the view content
                // will be replaced with the model
                // variable value if exists
                /**
                 * [parse description]
                 * @param  {[type]} obj [description]
                 * @return {[type]}     [description]
                 */
                View.prototype.parse = function (obj) {
                    var j;
                    if (!!this.content) {
                        if (obj) {
                            for (j in obj.vars) {
                                if (obj.vars.hasOwnProperty(j)) {
                                    this.content = this.content.replace(new RegExp("\\$" + j + "\\$", 'g'), obj.get(j));
                                }
                            }
                        }
                        // now jmvc parse vars
                        for (j in $JMVC.vars) {
                            if ($JMVC.vars.hasOwnProperty(j)) {
                                this.content = this.content.replace(new RegExp("\\$" + j + "\\$", 'gm'), $JMVC.vars[j]);
                            }
                        }
                    }
                    // allow chain
                    return this;
                };

                //
                // reset content to orginal (unparsed) value
                // and reset all vars
                /**
                 * [reset description]
                 * @return {[type]} [description]
                 */
                View.prototype.reset = function () {
                    this.content = this.ocontent;
                    this.vars = {};
                    // allow chain
                    return this;
                };

                /**
                 * [set_from_url description]
                 * @param {[type]} vname [description]
                 * @param {[type]} alt   [description]
                 */
                View.prototype.set_from_url = function (vname, alt) {
                    this.set(String(vname), $JMVC.controllers[$JMVC.c].get(vname) || (alt || 'unset'));
                    // allow chain
                    return this;
                };
                /*
                 * [get_from_url description]
                 * @param {[type]} vname [description]
                 * @param {[type]} alt   [description]
                 */
                View.prototype.get_from_url = function (vname) {
                    return $JMVC.controllers[$JMVC.c].get(vname) || false;
                };


                // render the view parsing for variable&view placeholders
                /**
                 * [render description]
                 * @param  {[type]} pars [description]
                 * @return {[type]}      [description]
                 */
                View.prototype.render = function (pars) {
                    
                    

                    //call before render
                    $JMVC.events.startrender();

                    var arg = pars || {},
                        //
                        // maybe a callback is passed   
                        cback = arg.cback || false,
                        //
                        // and maybe some args must be passed
                        // to the callback
                        argz = arg.argz || null,
                        //
                        // You may specify a string with a selector or a node,
                        // that's where the content will be loaded,
                        // note that here dom is not loaded so you
                        // cannot pass an element
                        target = arg.target || false,

                        // for binding this context in the callback
                        that = this,

                        // the view content
                        cont = this.content,

                        // regexp for variables, do NOT use here new RegExp
                        pattvar = "\\$(.[^\\$\\s}]*)\\$",

                        // variables found
                        resvar,

                        // a loop temporary variable
                        t,

                        trg,
                        may_trg;

                    

                    //let pars be the callback function
                    if (typeof pars === 'function') {
                        cback = pars;
                    }

                    // parse for other views or $JMVC.vars
                    
                    cont = Parser.parse(cont);
                    
                    // look for / substitute  vars
                    // in the view (these belongs to the view)
                    
                    resvar = 1;
                    while (resvar) {
                        resvar = new RegExp(pattvar, 'gm').exec(cont);
                        if (resvar) {
                            t = this.get(resvar[1]) || '';
                            cont = cont.replace('$' + resvar[1] + '$', t);
                        }
                    }
                    
                    this.content = cont;


                    if(!$JMVC.loaded){
                        // books rendering in body or elsewhere, on load
                        $JMVC.events.bind(W, 'load', function () {
                            
                            $JMVC.loaded = true;
                            may_trg = target ? $JMVC.dom.find(target) : false;
                            trg = may_trg || WD.body;


                            $JMVC.vars.rendertime = +new Date() - time_begin;
                            

                            that.content = jmvc.check_hook('onBeforeRender', [that.content]) || that.content;

                            //
                            $JMVC.dom.html(trg, that.content);
                            //
                            jmvc.check_hook('onAfterRender', [that.content]);

                            
                            

                            // may be a callback? 
                            cback && cback.apply(this, !!argz ? argz : []);
                            //trigger end of render
                            $JMVC.events.endrender();



                        });
                    // yet loaded
                    //happend after load... so can render a view from a render cback 
                    //of a main view
                    } else {
                        may_trg = target ? $JMVC.dom.find(target) : false;
                        trg = may_trg || WD.body;
                        $JMVC.dom.html(trg, that.content);
                        cback && cback.apply(this, !!argz ? argz : []);
                    }
                    // allow chain
                    // 
                    
                    
                    return this;
                    
                };



                ///////////////////////
                // COMMON
                // getter, setter and "deleter" for mvc classes
                /**
                 * [get description]
                 * @param  {[type]} n [description]
                 * @return {[type]}   [description]
                 */
                View.prototype.get = Model.prototype.get = Controller.prototype.get = function (n) {
                    return (!!this.vars[n]) ? this.vars[n] : false;
                };

                /**
                 * [set description]
                 * @param {[type]} vname [description]
                 * @param {[type]} vval  [description]
                 * @param {[type]} force [description]
                 */
                View.prototype.set = Model.prototype.set = Controller.prototype.set = function (vname, vval, force) {
                    var i;
                    switch (typeof vname) {
                    case 'string':
                        if (!this.vars[vname] || force) {this.vars[vname] = vval; }
                        break;
                    case 'object':
                        for (i in vname) {
                            if (vname.hasOwnProperty(i) && (!this.vars[i] || vval || force)) {
                                this.vars[i] = vname[i];
                            }
                        }
                        break;
                    }
                    return this;
                };

                /**
                 * [del description]
                 * @param  {[type]} n [description]
                 * @return {[type]}   [description]
                 */
                View.prototype.del = Model.prototype.del = Controller.prototype.del = function (n) {
                    if (!!this.vars[n]) {this.vars[n] = null; }
                    return this;
                };
                //////////////////////
                




                //          
                // Dispatch url getting controller, action and parameters
                //          
                dispatched = (function () {
                    var mid = {
                            'url' : WDL.protocol + US + US + WDL.hostname + WDL.pathname + WDL.search,
                            'proto' : WDL.protocol,
                            'host' : WDL.hostname,
                            'path' : WDL.pathname,
                            'hash' : WDL.search
                        },

                        //
                        // adjust extensions
                        els = mid.path.replace(new RegExp('\\.' + URL_ALLOWED_EXTENSIONS.join('|\\.'), 'gm'), "").substr(1).split(US),
                        controller = false,
                        controller_prepath = '',
                        controller_prepath_parts = [],
                        action = false,
                        params = {},
                        lab_val,
                        ret,
                        i,
                        src,
                        len = 0;

                    //maybe is the case to load testsuite
                    if (els[0].match(/test_/)) {
                        Modules.push('test');
                    }

                    if (WDL.hostname === 'localhost') {
                        els.shift();
                    }

                    controller = els.shift() || JMVC_DEFAULT.controller;
                    
                    //check extrapath for controller
                    if (!!controller.match(/_/)) {
                        controller_prepath_parts = controller.split('_');
                        controller = controller_prepath_parts.pop();
                        controller_prepath = controller_prepath_parts.join(US) + US;

                    }
                    action = els.shift() || JMVC_DEFAULT.action;
                    len = els.length;

                    // now if els has non zero size, these are extra path params
                    for (i = 0; i + 1 < len; i += 2) {
                        params[els[i]] = els[i + 1];
                    }

                    // even hash for GET params
                    if (mid.hash !== "") {
                        // splitting an empty string give an array with one empty string
                        els = mid.hash.substr(1).split('&');

                        for (i = 0, len = els.length; i < len; i += 1) {
                            lab_val = els[i].split('=');
                            // do not override extra path params
                            if (!params[lab_val[0]]) {params[lab_val[0]] = lab_val[1]; }
                        }
                    }

                    ret = {
                        'controller' : controller.replace(/\//g, ""),
                        'controller_prepath' : controller_prepath,
                        'action' : action.replace(/\//g, ""),
                        'params' : params,
                        'baseurl' : WDL.protocol + US + US + WDL.hostname
                    };
                    //ret.controller = jmvc_normalize(ret.controller);
                    return ret;
                })();

                //  
                // returning literal
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
                        retina : W.devicePixelRatio > 1
                    },
                    widget : {},
                    extensions : {},
                    extensions_params : {},
                    i18n : {},

                    modules : Modules,
                    Event : Event,
                    globalize : jmvc.globalize,
                    'interface' : Interface,
                    promise : jmvc.promise,

                    parselang : jmvc.parselang,

                    //checkhook : jmvc.check_hook,
                    bind : jmvc.bind,
                    debug : jmvc.debug,
                    extend : jmvc.extend,
                    expose : jmvc.expose,
                    factory:    jmvc.factory_method,
                    inherit : jmvc.basic_inherit,
                    make_ns : jmvc.ns.make,
                    check_ns : jmvc.ns.check,
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
                        if(! ('core/console/console' in $JMVC.extensions)){
                            $JMVC.require('core/console/console');
                        }
                        JMVC.console.toggle();
                    }
                };

                //
                // ok... spent some bytes to make it AMDfriendly
                // if (typeof define === "function" && define.amd && define.amd.JMVC) {define("JMVC", [], function () {return $JMVC; });}
                //

                //
                // $JMVC is DONE
                // clean up
                $JMVC.gc(
                    DEV_URL,
                    PROD_URL,
                    URL_ALLOWED_EXTENSIONS,
                    JMVC_VERSION,
                    JMVC_REVIEW,
                    dispatched,
                    Controller, Model, View,
                    Event, Modules,
                    //hooks,
                    JMVC_DEFAULT,
                    time_begin
                );
                return $JMVC;
            }
        )();
    

    // now enhanche JMVC with some basic utility functions;
    // big part of all these functions are necessary and cannot be moved to Modules
    //
    /******************
     * #
     * #  AJAX
     * #
     */
    JMVC.io = {

        'xhrcount' : 0,

        /**
         * [ description]
         * @return {[type]} [description]
         */
        'getxhr' : function () {
            JMVC.io.xhrcount += 1;
            var xhr,
                // IEfuckIds = ['MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'],
                // 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'
                IEfuckIds = ['Msxml2.XMLHTTP', 'Msxml3.XMLHTTP', 'Microsoft.XMLHTTP'],
                i = 0,
                len = IEfuckIds.length;

            try {
                xhr = new W.XMLHttpRequest();
            } catch (e1) {
                for (null; i < len; i += 1) {
                    try {
                        xhr = new W.ActiveXObject(IEfuckIds[i]);
                    } catch (e2) {JMVC.debug('No way to initialize hxr'); }
                }
            }
            JMVC.gc(IEfuckIds, i, len);
            return xhr;
        },

        /**
         * [ description]
         * @param  {[type]} uri     [description]
         * @param  {[type]} options [description]
         * @return {[type]}         [description]
         */
        'ajcall' : function (uri, options) {
            var xhr = JMVC.io.getxhr(),
                method = (options && options.method) || 'POST',
                cback = options && options.cback,
                cb_opened = (options && options.opened) || function () {},
                cb_loading = (options && options.loading) || function () {},
                cb_error = (options && options.error) || function () {},
                cb_abort = (options && options.error) || function () {},
                sync = options && options.sync,
                data = (options && options.data) || {},
                type = (options && options.type) || 'text/html',
                cache = (options && options.cache !== undefined) ? options.cache : true,
                targetType = type === 'xml' ?  'responseXML' : 'responseText',
                timeout = options && options.timeout || 3000,
                complete = false,
                res = false,
                ret = false,
                state = false;

            //prepare data, caring of cache
            if (!cache) {data.C = JMVC.util.now(); }
            data = JMVC.object.obj2qs(data).substr(1);

            xhr.onreadystatechange = function () {
                var tmp;
                if (state === xhr.readyState) {return false; }
                state = xhr.readyState;
                //JMVC.debug('called '+uri + ' ('+xhr.readyState+')');
                if (xhr.readyState === "complete" || (xhr.readyState === 4 && xhr.status === 200)) {
                    complete = true;
                    if (cback) {
                        //res = (targetType === 'responseXML') ?  xhr[targetType].childNodes[0] : xhr[targetType];
                        res = xhr[targetType];
                        (function () {cback(res); })(res);
                    }
                    ret = xhr[targetType];

                    //IE leak ?????
                    //window
                    W.setTimeout(function () {
                        JMVC.io.xhrcount -= 1;
                        JMVC.purge(xhr);
                    }, 50);

                    return ret;
                } else if (xhr.readyState === 3) {
                    cb_loading();
                } else if (xhr.readyState === 2) {
                    cb_opened();
                } else if (xhr.readyState === 1) {
                    switch (method) {
                    case 'POST':
                        try {
                            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                            xhr.send(data || true);
                        } catch (e1) {}
                        break;
                    case 'GET':
                        try {
                            tmp = {
                                'xml' : 'text/xml',
                                'html' : 'text/html',
                                'json' : 'application/json'
                            }[type];
                            xhr.setRequestHeader("Accept", tmp + "; charset=utf-8");
                            xhr.send(null);
                        } catch (e2) {}
                        break;
                    }
                }
            };

            xhr.onerror = function () {if (cb_error) {cb_error.apply(null, arguments); } };
            xhr.onabort = function () {if (cb_abort) {cb_abort.apply(null, arguments); } };

            //open request
            xhr.open(method, (method === 'GET') ? (uri + ((data) ? '?' + data : "")) : uri, sync);

            //thread abortion
            W.setTimeout(function () {if (!complete) {complete = true; xhr.abort(); } }, timeout);
            
            try {
                return (targetType === 'responseXML') ? xhr[targetType].childNodes[0] : xhr[targetType];
            } catch (e3) {}
        },

        /**
         * [ description]
         * @param  {[type]} uri   [description]
         * @param  {[type]} cback [description]
         * @param  {[type]} sync  [description]
         * @param  {[type]} data  [description]
         * @param  {[type]} cache [description]
         * @return {[type]}       [description]
         */
        'post' : function (uri, cback, sync, data, cache) {
            return JMVC.io.ajcall(uri, {cback : cback, method : 'POST', sync : sync, data : data, cache : cache});
        },

        /**
         * [ description]
         * @param  {[type]} uri   [description]
         * @param  {[type]} cback [description]
         * @param  {[type]} sync  [description]
         * @param  {[type]} data  [description]
         * @param  {[type]} cache [description]
         * @return {[type]}       [description]
         */
        'get' : function (uri, cback, sync, data, cache) {
            return JMVC.io.ajcall(uri, {cback : cback, method : 'GET', sync : sync, data : data, cache : cache});
        },

        /**
         * [ description]
         * @param  {[type]} uri   [description]
         * @param  {[type]} cback [description]
         * @param  {[type]} data  [description]
         * @return {[type]}       [description]
         */
        'getJson' : function (uri, cback, data) {
            var r = JMVC.io.ajcall(uri, {
                type : 'json',
                method: 'GET',
                sync : false,
                cback :cback,
                data : data
            });
            return (W.JSON && W.JSON.parse) ? JSON.parse(r) : JMVC.jeval('(' + r + ')');
        },

        /**
         * [ description]
         * @param  {[type]} uri   [description]
         * @param  {[type]} cback [description]
         * @return {[type]}       [description]
         */
        'getXML' : function (uri, cback) {
            return JMVC.io.ajcall(uri, {method : 'GET', sync : false, type : 'xml', cback : cback || function () {} });
        }
    };

    
    /**
     * [util description]
     * @type {Object}
     */
    JMVC.util = {

        
        
        

        /**
         * [ description]
         * @param  {[type]} obj [description]
         * @param  {[type]} ext [description]
         * @return {[type]}     [description]
         */
        'extend' : function (obj, ext) {
            var j;
            for (j in ext) {
                if (ext.hasOwnProperty(j)) {
                    obj[j] = ext[j];
                }
            }
        },

       

        

        /**
         * [ description]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        'isSet' : function (e) {return typeof e !== 'undefined'; },

        /**
         * [ description]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        'defined' : function (e) {return typeof e !== 'undefined'; },

        

        /**
         * [ description]
         * @param  {[type]} o [description]
         * @return {[type]}   [description]
         */
        'isArray' : function (o) {
            var y = Array.isArray && Array.isArray(o), t1, t2;
            if (y) {return true; }
            t1 = String(o) !== o;
            t2 = {}.toString.call(o).match(/\[object\sArray\]/);
            return t1 && !!(t2 && t2.length);
        },

        /**
         * [ description]
         * @param  {[type]} o [description]
         * @return {[type]}   [description]
         */
        'isObject' : function (o) {
            var t1 = String(o) !== o,
                t2 = {}.toString.call(o).match(/\[object\sObject\]/);
            return t1 && !!(t2 && t2.length);
        },

        /**
         * [ description]
         * @param  {[type]} el   [description]
         * @param  {[type]} type [description]
         * @return {[type]}      [description]
         */
        'isTypeOf' : function (el, type) {return typeof el === type; },

        
        //http://stackoverflow.com/questions/7390426/better-way-to-get-type-of-a-javascript-variable
        /**
         * [ description]
         * @param  {[type]} o [description]
         * @return {[type]}   [description]
         */
        'getType' : function (o) {
            return ({}).toString.call(o).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
        },

        

        /**
         * [ description]
         * @param  {[type]} min  [description]
         * @param  {[type]} max) {return      min + ~~(JMVC.M.random() * (max - min + 1) [description]
         * @return {[type]}      [description]
         */
        'rand' : function (min, max) {return min + ~~(JMVC.M.random() * (max - min + 1)); },

        

        

        
        /**
         * [ description]
         * @param  {[type]} r [description]
         * @return {[type]}   [description]
         */
        'rad2deg' : function (r) {return 180 * r / JMVC.M.PI; },

        /**
         * [ description]
         * @param  {[type]} d [description]
         * @return {[type]}   [description]
         */
        'deg2rad' : function (d) {return JMVC.M.PI * d / 180; },

        /**
         * [ description]
         * @param  {[type]} o    [description]
         * @param  {[type]} func [description]
         * @return {[type]}      [description]
         */
        //'each' : function (o, func) {return JMVC.each(o, func); },

        

        /**
         * [ description]
         * @param  {[type]} ) {return      +new Date( [description]
         * @return {[type]}   [description]
         */
        'now' : function () {return +new Date(); },

        

        /**
         * [ description]
         * @param  {[type]} start [description]
         * @param  {[type]} end   [description]
         * @return {[type]}       [description]
         */
        'range' : function (start, end) {
            var ret = [];
            while (end - start + 1) {
                ret.push((start += 1) - 1);
            }
            return ret;
        },

        /**
         * [ description]
         * @param  {[type]} d      [description]
         * @param  {[type]} start  [description]
         * @param  {[type]} end    [description]
         * @param  {[type]} strict [description]
         * @return {[type]}        [description]
         */
        'between' : function (d, start, end, strict) {
            return strict ? (d >= start && d <= end) : (d > start && d < end);
        },

        

        

        /**
         * [ description]
         * @param  {[type]} scriptname [description]
         * @return {[type]}            [description]
         */
        'getParameters' : function (scriptname) {
            var scripts = WD.getElementsByTagName("script"),
                cs = null,
                src = "",
                pattern = scriptname,
                p = "",
                parameters = false,
                i = 0,
                l = scripts.length;
            for(null; i < l; i += 1){
                cs = scripts[i];
                src = cs.src;
                if(src.indexOf(pattern) >= 0){
                    p = cs.getAttribute("params");
                    parameters = p ? eval("(" + p + ")") : {};
                }
            }
            return parameters;
        },

        

        /**
         * [ description]
         * @param  {[type]} hex [description]
         * @return {[type]}     [description]
         */
        'hex2int' : function (hex) {
            return parseInt(hex, 16);
        },

        /**
         * [ description]
         * @param  {[type]} i [description]
         * @return {[type]}   [description]
         */
        'int2hex' : function (i) {
            return parseInt(i, 10).toString(16);
        }
    };



    /**
     * [dom description]
     * @type {Object}
     */
    JMVC.dom = {

        /**
         * [ description]
         * @return {[type]} [description]
         */
        'body' : function () {
            return WD.body;
        },

        /**
         * [ description]
         * @param  {[type]} where [description]
         * @param  {[type]} what  [description]
         * @return {[type]}       [description]
         */
        'append' : function (where, what) {
            if (JMVC.util.isArray(what)) {
                JMVC.each(what, function (e) {
                    where.appendChild(e);
                });
            } else {
                where.appendChild(what);
            }
            return where;
        },

        /**
         * [ description]
         * @param  {[type]} elem        [description]
         * @param  {[type]} addingClass [description]
         * @return {[type]}             [description]
         */
        'addClass' : function (elem, addingClass) {
            var cls = !!(elem.className) ? elem.className.split(' ') : [];
            if (JMVC.array.inArray(cls, addingClass) < 0) {
                cls.push(addingClass);
                elem.className = cls.join(' ');
            }
        },

        /**
         * [ description]
         * @param  {[type]} elem  [description]
         * @param  {[type]} name  [description]
         * @param  {[type]} value [description]
         * @return {[type]}       [description]
         */
        'attr' : function (elem, name, value) {
            var attrs = false,
                l = false,
                i = 0,
                result,
                is_obj = false;
            try {elem.nodeType; } catch (e) {
                return false;
            }
            if (elem.nodeType === 3 || elem.nodeType === 8) {return 'undefined'; }

            is_obj = JMVC.util.isObject(name);
            
            if (is_obj && elem.setAttribute) {
                for (i in name) {
                    elem.setAttribute(i, name[i]);
                }
                return true;
            } 
            
            // Make sure that avalid name was provided, here cannot be an object
            if (!name || name.constructor !== String) {return ""; }
            
            // If the user is setting a value
            if (typeof value !== 'undefined') {
                // Set the quick way first 
                elem[{'for': 'htmlFor', 'class': 'className'}[name] || name] = value;
                // If we can, use setAttribute
                if (elem.setAttribute) {
                    elem.setAttribute(name, value);
                }
            } else {
                result = (elem.getAttribute && elem.getAttribute(name)) || 0;
                if (!result) {
                    attrs = elem.attributes;
                    l = attrs.length;
                    for (i = 0; i < l; i += 1) {
                        if (attrs[i].nodeName === name) {
                            //return attrs[i].nodeValue;
                            return attrs[i].value;
                        }
                    }
                }
                elem = result;
            }
            return elem;
        },

        /**
         * [ description]
         * @param  {[type]} n    [description]
         * @param  {[type]} deep [description]
         * @return {[type]}      [description]
         */
        'clone' : function(n, deep){
            return n.cloneNode(!!deep);
        },

        /**
         * [ description]
         * @param  {[type]} tag   [description]
         * @param  {[type]} attrs [description]
         * @param  {[type]} inner [description]
         * @return {[type]}       [description]
         */
        'create' : function (tag, attrs, inner) {
            if (!tag) {W.alert('no tag'); return; }
            var node = JMVC.WD.createElement(tag),
                att;
            attrs = attrs || {};
            for (att in attrs) {
                if (attrs.hasOwnProperty(att)) {
                    node.setAttribute(String(att),  String(attrs[att]));
                }
            }
            if (typeof inner !== 'undefined') {
                if (inner.nodeType === 1) {
                    this.append(node, inner);
                } else {
                    this.html(node, inner);
                }
            }
            return node;
        },

        /**
         * [ description]
         * @param  {[type]} text [description]
         * @return {[type]}      [description]
         */
        'createText' : function(text){
            return JMVC.WD.createTextNode(text);
        },

        /**
         * [ description]
         * @param  {[type]} ns   [description]
         * @param  {[type]} name [description]
         * @return {[type]}      [description]
         */
        'createNS' : function (ns, name) {
            return JMVC.WD.createElementNS(ns, name);
        },

        /**
         * [ description]
         * @param  {[type]} where [description]
         * @param  {[type]} tag   [description]
         * @param  {[type]} attrs [description]
         * @param  {[type]} inner [description]
         * @return {[type]}       [description]
         */
        'add' : function (where, tag, attrs, inner) {
            var n = this.create(tag, attrs, inner);
            this.append(where, n);
            return n;
        },

        /**
         * [ description]
         * @param  {[type]} el [description]
         * @return {[type]}    [description]
         */
        'empty' : function (el) {
            el.innerHTML = '';
        },
        
        /**
         * [ description]
         * @param  {[type]} a [description]
         * @param  {[type]} b [description]
         * @return {[type]}   [description]
         */
        'find' : function (a, b) {
            if (a.nodeType === 1) {return a; }
            var sel = "getElement",
                toArr = false,
                ret = false;

            //look for no word before something
            a = a.match(/^(\W)?([A-z0-9-_]*)/);

            switch (a[1] || '=') {
            case '#':
                sel += 'ById';
                break;
            case '.':
                sel += "sByClassName";
                toArr = true;
                break;
            case '@':
                sel += "sByName";
                toArr = true;
                break;
            case '=':
                sel += "sByTagName";
                toArr = true;
                break;
            default: return [];
            }
            
            ret = (b || JMVC.WD)[sel](a[2]);
            ret = toArr ? JMVC.array.coll2array(ret) : ret;
            
            return (ret instanceof Array && ret.length == 1) ? ret[0] : ret;
        },



        'find2' : function (a, b) {
            if (a.nodeType === 1) {return a; }
            var sel = "getElement",
                toArr = 0,
                ret = 0;
            //look for no word before something
            a = a.match(/^(\W)?([A-z0-9-_]*)/);
            a[1] = a[1] || '=';
            toArr = a[1] !== '#'; 
            ret = (b || JMVC.WD)[sel + ({
                '#' : 'ById',
                '.' : 'ByClassName',
                '@' : 'sByName',
                '=' : 'sByTagName'
            }[a[1]])](a[2]);
            ret = toArr ? JMVC.array.coll2array(ret) : ret;
            return ret instanceof Array ?  (ret.length == 1 ? ret[0] :  ret) : ret;
        },


        /**
         * [ description]
         * @param  {[type]} ctx   [description]
         * @param  {[type]} cname [description]
         * @return {[type]}       [description]
         */
        'findInnerByClass' : function (ctx, cname) {
            var a = [],
                re = new RegExp('\\b' + cname + '\\b'),
                els = ctx.getElementsByTagName("*"),
                i = 0,
                l = els.length;
            for (null; i < l; i += 1) {
                if (re.test(els[i].className)) {
                    a.push(els[i]);
                }
            }
            return a;
        },

        /**
         * [ description]
         * @param  {[type]} attr  [description]
         * @param  {[type]} value [description]
         * @param  {[type]} root  [description]
         * @return {[type]}       [description]
         */
        'findByAttribute' : function (attr, value, root) {
            var ret = [],
                whole = [],
                val,
                tof = value == undefined;
            root = root || JMVC.WD.body;
            whole = root.all ? root.all : root.getElementsByTagName('*');
    
            for(var i = whole.length; i--; ) {
                val = whole[i].getAttribute(attr);
                if (typeof val == "string" && (tof || val == value)) {
                  ret.push(whole[i]);
                }
            }
            return ret;
        },

        /**
         * [ description]
         * @param  {[type]} el   [description]
         * @param  {[type]} name [description]
         * @return {[type]}      [description]
         */
        'hasAttribute' : function (el, name) {
            return el.getAttribute(name) !== null;
        },

        /**
         * [ description]
         * @param  {[type]} el        [description]
         * @param  {[type]} classname [description]
         * @return {[type]}           [description]
         */
        'hasClass' : function (el, classname) {
            return el.className.match(new RegExp('(\\s|^)' + classname + '(\\s|$)'));
        },
        
        /**
         * [ description]
         * @param  {[type]} el   [description]
         * @param  {[type]} html [description]
         * @return {[type]}      [description]
         */
        'html' : function (el, html) {
            if (!el) {return this; }
            var t = "";
            //alert(el);
            if (typeof html !== 'undefined') {
                if (el) {
                    try {
                        if(JMVC.dom.isElement(html)){
                            JMVC.dom.empty(el);
                            JMVC.dom.append(el, html);
                        } else {
                            el.innerHTML = html + '';
                        }
                        
                    } catch (e) {}
                }
                return this;
            } else {
                t = (el.nodeType === 1) ? el.innerHTML : el;
            }
            JMVC.purge(el);
            return t.trim();
        },

        //thx to http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
        //for the following 2 mthds
        //Returns true if it is a DOM node
        /**
         * [ description]
         * @param  {[type]} o [description]
         * @return {[type]}   [description]
         */
        'isNode' : function (o) {
            return (
                typeof Node === "object" ? o instanceof Node : 
                o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
            );
        },

        //Returns true if it is a DOM element    
        /**
         * [ description]
         * @param  {[type]} o [description]
         * @return {[type]}   [description]
         */
        'isElement' : function (o) {
            return (
                typeof HTMLElement === "object" ?
                    o instanceof HTMLElement
                : //DOM2
                    o && typeof o === "object" && o.nodeType === 1 && typeof o.nodeName==="string"
            );
        },
        
        /**
         * [ description]
         * @param  {[type]} node          [description]
         * @param  {[type]} referenceNode [description]
         * @return {[type]}               [description]
         */
        'insertBefore' : function (node, referenceNode) {
            var p = referenceNode.parentNode;
            p.insertBefore(node, referenceNode);
            return node;
        },

        /**
         * [ description]
         * @param  {[type]} node          [description]
         * @param  {[type]} referenceNode [description]
         * @return {[type]}               [description]
         */
        'insertAfter' : function (node, referenceNode) {
            var p = referenceNode.parentNode;
            p.insertBefore(node, referenceNode.nextSibling);
            return node;
        },

        /**
         * [ description]
         * @param  {[type]} node  [description]
         * @param  {[type]} num   [description]
         * @param  {[type]} types [description]
         * @return {[type]}       [description]
         */
        'nthchild' : function (node, num, types) {
            var childs = node.childNodes,
                // filtered 
                tagChilds = [],
                // original length
                len = childs.length,
                // a counter
                i = 0,
                // elements filtered, default keeps only Element Node
                type2consider = types || ['TEXT_NODE'];
                // clean text ones
            while (len) {
                if (JMVC.array.inArray(type2consider, this.nodeTypeString(childs[i]))) {
                    tagChilds.push(childs[i]);
                    i += 1;
                }
                len -= 1;
            }
            len = tagChilds.length;
            //
            return (num < len) ? tagChilds[num] : false;
        },

        /**
         * [ description]
         * @param  {[type]} node [description]
         * @return {[type]}      [description]
         */
        'nodeTypeString' : function (node) {
            var types = [
                'ELEMENT_NODE', 'ATTRIBUTE_NODE', 'TEXT_NODE', 'CDATA_SECTION_NODE', 'ENTITY_REFERENCE_NODE',
                'ENTITY_NODE', 'PROCESSING_INSTRUCTION_NODE', 'COMMENT_NODE', 'DOCUMENT_NODE', 'DOCUMENT_TYPE_NODE',
                'DOCUMENT_FRAGMENT_NODE', 'NOTATION_NODE'];
            return types[node.nodeType - 1];
        },

        /**
         * [ description]
         * @param  {[type]} src [description]
         * @return {[type]}     [description]
         */
        'preloadImage' : function (src, fn) {
            var i = new W.Image();
            typeof fn === 'function' && (i.onload = fn(i));
            i.src = src;
            return i;
        },

        'childs' : function (node) {
            return node.childNodes;
        },

        /**
         * [ description]
         * @param  {[type]} node [description]
         * @return {[type]}      [description]
         */
        'parent' : function (node) {return node.parentNode; },

        /**
         * [ description]
         * @param  {[type]} where [description]
         * @param  {[type]} what  [description]
         * @return {[type]}       [description]
         */
        'prepend' : function (where, what) {
            var c = where.childNodes[0];
            where.insertBefore(what, c);
            return what;
        },


        /**
         * [ description]
         * @param  {[type]} el [description]
         * @return {[type]}    [description]
         */
        'remove' : function (el) {
            if (!el) {
                return;
            }

            var parent;
            if(typeof el === 'string'){
                el = JMVC.dom.find(el);
            }
            if(JMVC.util.isArray(el)){
                JMVC.each(el, function(e){
                    JMVC.dom.remove(e);
                });
                return;
            }
            parent = el.parentNode;
            parent.removeChild(el);
            return parent;
        },

        /**
         * [ description]
         * @param  {[type]} el     [description]
         * @param  {[type]} valore [description]
         * @param  {[type]} mode   [description]
         * @return {[type]}        [description]
         */
        'removeAttribute' : function (el, valore, mode) {
            el.removeAttribute(valore);
            return el;
        },

        /**
         * [ description]
         * @param  {[type]} el  [description]
         * @param  {[type]} cls [description]
         * @return {[type]}     [description]
         */
        'removeClass' : function (el, cls) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            el.className = el.className.replace(reg, '');
            return this;
        },

        /**
         * [ description]
         * @param  {[type]} el       [description]
         * @param  {[type]} oldclass [description]
         * @param  {[type]} newclass [description]
         * @return {[type]}          [description]
         */
        'switchClass' : function (el, oldclass, newclass) {
            if (this.hasClass(el, oldclass)) {
                this.removeClass(el, oldclass);
                if (!this.hasClass(el, newclass)) {
                    this.addClass(el, newclass);
                }
            }
            return el;
        },

        /**
         * [ description]
         * @param  {[type]} el [description]
         * @return {[type]}    [description]
         */
        'val' : function (el) {
            return el.value;
        }
    };

    /**
     * [events description]
     * @type {Object}
     */
    JMVC.events = {
        'bindings' : {},
        'onedone' : false,
        'Estart' : [],
        'Eend' : [],

        /**
         * [ description]
         * @param  {[type]}   el   [description]
         * @param  {[type]}   tipo [description]
         * @param  {Function} fn   [description]
         * @return {[type]}        [description]
         */
        'bind' : function (el, tipo, fn) {
            if (el instanceof Array) {
                JMVC.each(el, JMVC.events.bind, tipo, fn);
                return;
            }
            var f = function (e) {fn.call(el, e || W.event); };
            if (W.addEventListener) {
                el.addEventListener(tipo, fn, false);
            } else if (W.attachEvent) {
                el.attachEvent('on' + tipo, f);
            } else {
                el['on' + tipo] = f;
            }
            if (!JMVC.events.bindings[el]) {JMVC.events.bindings[el] = {}; }
            JMVC.events.bindings[el][tipo] = fn;
        },

        /**
         * [ description]
         * @param  {[type]} el   [description]
         * @param  {[type]} tipo [description]
         * @return {[type]}      [description]
         */
        'unbind' : function (el, tipo) {
            if (el === null) {return; }
            if (el.removeEventListener) {
                el.removeEventListener(tipo, JMVC.events.bindings[el][tipo], false);
            } else if (el.detachEvent) {
                el.detachEvent("on" + tipo, JMVC.events.bindings[el][tipo]);
            }
            JMVC.events.bindings[el][tipo] = null;
        },

        /**
         * [ description]
         * @param  {[type]}   el   [description]
         * @param  {[type]}   tipo [description]
         * @param  {Function} fn   [description]
         * @return {[type]}        [description]
         */
        'one' : function (el, tipo, fn) {
            if (el instanceof Array) {
                JMVC.each(el, JMVC.events.one, tipo, fn);
                return;
            }
            var newf = function (e) {
                if (!this.onedone) {fn(e); }
                this.onedone = true;
            };
            JMVC.events.bind(el, tipo, newf);
        },

        /**
         * [ description]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        'kill' : function (e) {
            if (!e) {
                e = W.event;
                e.cancelBubble = true;
                e.returnValue = false;
            }
            if (e.stopPropagation) {
                e.stopPropagation();
                e.preventDefault();
            }
            return false;
        },

        /**
         * [ description]
         * @param  {[type]} func [description]
         * @return {[type]}      [description]
         */
        'ready' : function (func) {
            // if some event are booked when the dom is
            // already loaded execute immediately
            if (JMVC.loaded) {
                func.call();
                return;
            }
            //return this.bind(W, 'load', func);
            var e = null;
            if(WD.addEventListener){
                e = WD.addEventListener('DOMContentLoaded', func, false);
            }else if(W.addEventListener){
                e = W.addEventListener('load', func, false )
            }else if(WD.attachEvent){
                e = WD.attachEvent("onreadystatechange", func);
            }else if(W.attachEvent){
                e = W.attachEvent("onload", func);
            }
            return e;
        },

        /**
         * [ description]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        'preventDefault' : function (e) {
            e = e || W.event;
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
        },

        /**
         * [ description]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        'eventTarget' : function (e) {
            var targetElement = (typeof e.target !== "undefined") ? e.target : e.srcElement;
            while (targetElement.nodeType == 3 && targetElement.parentNode != null) {
                targetElement = targetElement.parentNode;
            }
            return targetElement;
        },

        /**
         * [ description]
         * @param  {[type]} el [description]
         * @param  {[type]} e  [description]
         * @return {[type]}    [description]
         */
        'getCoord' : function (el, e) {
            var x,
                y;
            if (e.pageX || e.pageY) {
                x = e.pageX;
                y = e.pageY;
            } else {
                x = e.clientX + JMVC.WD.body.scrollLeft + JMVC.WD.documentElement.scrollLeft;
                y = e.clientY + JMVC.WD.body.scrollTop + JMVC.WD.documentElement.scrollTop;
            }
            x -= el.offsetLeft;
            y -= el.offsetTop;
            return [x, y];
        },

        /**
         * [ description]
         * @param  {[type]} f [description]
         * @return {[type]}   [description]
         */
        'start' : function (f) {
            this.Estart.push(f);
        },

        /**
         * [ description]
         * @param  {[type]} f [description]
         * @return {[type]}   [description]
         */
        'end' : function (f) {
            this.Eend.push(f);
        },

        /**
         * [ description]
         * @return {[type]} [description]
         */
        'startrender' : function () {
            var i = 0,
                l = this.Estart.length;
            for (null; i < l; i += 1) {
                this.Estart[i]();
            }
        },

        /**
         * [ description]
         * @return {[type]} [description]
         */
        'endrender' : function () {
            var i = 0,
                l = this.Eend.length;
            for (null; i < l; i += 1) {
                this.Eend[i]();
            }
        },

        /**
         * [ description]
         * @param  {[type]} f [description]
         * @param  {[type]} t [description]
         * @return {[type]}   [description]
         */
        'delay' : function (f, t) {
            W.setTimeout(f, t);
        },

        /**
         * [ description]
         * @param  {[type]} left [description]
         * @param  {[type]} top  [description]
         * @return {[type]}      [description]
         */
        'scrollBy' : function (left, top) {
            JMVC.events.delay(function () {
                W.scrollBy(left, top);
            }, 1);
        },

        /**
         * [ description]
         * @param  {[type]} left [description]
         * @param  {[type]} top  [description]
         * @return {[type]}      [description]
         */
        'scrollTo' : function (left, top) {
            JMVC.events.delay(function () {
                W.scrollTo(left, top);
            }, 1);
        },

        /**
         * [ description]
         * @param  {[type]} ms [description]
         * @return {[type]}    [description]
         */
        'loadify' : function (ms) {
            JMVC.events.start(function () {
                //otherwise some browser hangs (opera)
                JMVC.events.delay(function () {
                    WD.body.style.opacity = 0;
                    WD.body.style.filter = 'alpha(opacity=0)';
                }, 0);
            });
            JMVC.events.end(function () {
                var i = 0,
                    step = 0.05,
                    top = 1,
                    to;
                while (i <= top) {
                    to = W.setTimeout(
                        function (j) {
                            WD.body.style.opacity = j;
                            WD.body.style.filter = 'alpha(opacity=' + (j * 100) + ')';
                            if (j > top) {
                                WD.body.style.opacity = 1;
                                WD.body.style.filter = 'alpha(opacity=' + 100 + ')';
                                W.clearTimeout(to);
                            }
                        },
                        ms * i,
                        i + step
                    );
                    i += step;
                }
            });
        },

        /**
         * [ description]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        'touch' : function (e) {
            var touches = [],
                i = 0,
                ect = e.touches,
                len = ect.length;
                
            for (null; i < len; i += 1) {
                touches.push({
                    x : ect[i].pageX,
                    y : ect[i].pageY
                })
            }
            return touches;
        }
    };

    /**
     * [head description]
     * @type {Object}
     */
    JMVC.head = {
        /**
         * 
         */
        'element' : WD.getElementsByTagName('head').item(0),

        /**
         * [ description]
         * @param  {[type]} src      [description]
         * @param  {[type]} parse    [description]
         * @param  {[type]} explicit [description]
         * @return {[type]}          [description]
         */
        'addscript': function (src, parse, explicit) {
            //
            var script,
                head,
                tmp,
                that = this,
                postmode = true,
                async = true,
                script_content;
            if (parse) {
                if (explicit) {
                    //script_content = JMVC.parse(src/* in this case is mean to be the content */);
                    script_content = JMVC.parse(src, true);
                    script = JMVC.dom.create('script', {type : 'text/javascript', defer:'defer'}, script_content);
                    head = that.element;
                    head.appendChild(script);
                } else {
                    /* get css content, async */
                    tmp = JMVC.io.get(src, function (script_content) {
                        script_content = JMVC.parse(script_content, true);
                        script = JMVC.dom.create('script', {type : 'text/javascript', defer:'defer'}, script_content);
                        head = that.element;
                        head.appendChild(script);
                    }, postmode, async);
                }
            } else {
                script = explicit ?
                    JMVC.dom.create('script', {type : 'text/javascript', defer:'defer'}, src)
                    :
                    JMVC.dom.create('script', {type : 'text/javascript', defer:'defer', src : src}, ' ');
                head = this.element;
                head.appendChild(script);
            }
        },

        /**
         * [ description]
         * @param  {[type]} src      [description]
         * @param  {[type]} parse    [description]
         * @param  {[type]} explicit [description]
         * @return {[type]}          [description]
         */
        'addstyle' : function (src, parse, explicit, id) {
            var style,
                head,
                tmp,
                that = this,
                postmode = true,
                sync = false,
                rules,
                csscontent;
            if (parse) {
                if (explicit) {
                    /* in this case src is meant to be the content */
                    csscontent = JMVC.parse(src, true);
                    //
                    head = that.element;
                    style = WD.createElement('style');
                    rules = WD.createTextNode(String(csscontent));
                    //
                    style.type = 'text/css';
                    if (style.styleSheet) {
                        //style.styleSheet.cssText = rules.nodeValue;
                        style.styleSheet.cssText = rules.value;
                    } else {
                        style.appendChild(rules);
                    }
                    if (id) {
                        style.id = id;
                    }
                    head.appendChild(style);
                } else {
                    /* get css content, async */
                    tmp = JMVC.io.get(src, function (csscontent) {
                        csscontent = JMVC.parse(csscontent, true);
                        head = that.element;
                        style = WD.createElement('style');
                        rules = WD.createTextNode(String(csscontent));
                        //
                        style.type = 'text/css';
                        if (style.styleSheet) {
                            style.styleSheet.cssText = rules.value || rules.nodeValue;
                        } else {
                            style.appendChild(rules);
                        }
                        if (id) {
                            style.id = id;
                        }
                        head.appendChild(style);
                        //
                    }, postmode, sync);
                }
            } else {
                style = JMVC.dom.create('link', {
                    type : 'text/css',
                    rel : 'stylesheet',
                    href : src
                });
                head = this.element;
                head.appendChild(style);
            }
            return style;
        },
        /**
         * [ description]
         * @param  {[type]} ) {if          (W.top !== W.self [description]
         * @return {[type]}   [description]
         */
        'denyiXrame' : function () {if (W.top !== W.self) {W.top.location = JMVC.vars.baseurl; }},

        
        

        

        

        /**
         * [ description]
         * @param  {[type]} d [description]
         * @return {[type]}   [description]
         */
        'lastmodified' : function (d) {
            // <meta http-equiv="last-modified" content="Thu, 03 Jan 2013 14:56:54 +0000" />
            var meta = this.element.getElementsByTagName('meta'),
                newmeta = JMVC.dom.create('meta', {'http-equiv' : 'last-modified', content : (d || new Date()).toString()}),
                len = meta.length;
            if (len) {
                JMVC.dom.insertAfter(newmeta, meta.item(len - 1));
            } else {
                this.element.appendChild(newmeta);
            }
        },
        /**
         * [ description]
         * @param  {[type]} rel   [description]
         * @param  {[type]} attrs [description]
         * @return {[type]}       [description]
         */
        'link' : function (rel, attrs) {
            attrs.rel = rel;
            JMVC.dom.add(JMVC.head.element, 'link', attrs);
        },

        /**
         * [ description]
         * @param  {[type]} name  [description]
         * @param  {[type]} value [description]
         * @return {[type]}       [description]
         */
        'meta' : function (name, value) {
            //get last meta if exists
            var meta = this.element.getElementsByTagName('meta'),
                newmeta = JMVC.dom.create('meta', {name : name, content : value}),
                len = meta.length;
            if (len) {
                JMVC.dom.insertAfter(newmeta, meta.item(len - 1));
            } else {
                this.element.appendChild(newmeta);
            }
        },
        /**
         * [ description]
         * @return {[type]} [description]
         */
        'reload' : function () {
            var n = JMVC.WD.location.href;
            WD.location.href = n;//do not cause wierd alert
        },
        /**
         * [ description]
         * @param  {[type]} t [description]
         * @return {[type]}   [description]
         */
        'title' : function (t) {
            if (!t) {return WD.title; }
            WD.title = t;
            return true;
        }
        
    };


    JMVC.array = {
        /**
         * [ description]
         * @param  {[type]} arr) {return      arr.concat( [description]
         * @return {[type]}      [description]
         */
        'array_clone' : function (arr) {return arr.concat(); },
        /**
         * [ description]
         * @param  {[type]} coll [description]
         * @return {[type]}      [description]
         */
        'coll2array' : function (coll) {
            var i = 0,
                a = [],
                len = coll.length;
            for (null; i < len; i += 1) {
                a[i] = coll[i];
            }
            return a;
        },
        /**
         * [ description]
         * @param  {[type]} arr   [description]
         * @param  {[type]} myvar [description]
         * @return {[type]}       [description]
         */
        'inArray' : function (arr, myvar) {
            var r = -1;
            JMVC.each(arr, function f(e, i) {
                if (e === myvar) {
                    r = i;
                    f['break']();
                }
            });
            return r;
            
            var i = 0,
                len = arr.length;
            for (null; i < len; i += 1) {
                if (myvar === arr[i]) {
                    return i;
                }
            }
            return -1;
            
        },
        /**
         * [ description]
         * @param  {[type]} arr [description]
         * @param  {[type]} v   [description]
         * @return {[type]}     [description]
         */
        'inArrayRich' : function (arr, v) {
            var i = 0,
                is_obj_or_array = false,
                len = arr.length;

            for (null; i < len; i += 1) {
                is_obj_or_array = {}.toString.call(arr[i]).match(/\[object\s(Array|Object)\]/);
                if (
                    (is_obj_or_array && JSON.stringify(arr[i]) === JSON.stringify(v))
                    ||
                    (!is_obj_or_array && arr[i].toString() === v.toString())
                ) {
                    return i;
                }
            }
            return -1;
        }
    };
    JMVC.string = {
        /**
         * [ description]
         * @param  {[type]} val  [description]
         * @param  {[type]} el   [description]
         * @param  {[type]} pos  [description]
         * @param  {[type]} lngt [description]
         * @return {[type]}      [description]
         */
        'padme' : function (val, el, pos, lngt) {
            var len = lngt || 2;
            while ((String(val)).length < len) {
                switch (pos) {
                case 'pre':
                    val = String(el + val);
                    break;
                case 'post':
                    val = String(val + el);
                    break;
                }
            }
            return val;
        },
        /**
         * [ description]
         * @param  {[type]} s){return s.replace(/^\s+|\s+$/g [description]
         * @param  {[type]} ''         [description]
         * @return {[type]}            [description]
         */
        'trim' : function (s) {return s.replace(/^\s+|\s+$/g, ''); },

        /**
         * [ description]
         * @param  {[type]} s){return s.replace(/^\s+/g [description]
         * @param  {[type]} ''         [description]
         * @return {[type]}            [description]
         */
        'ltrim' : function (s) {return s.replace(/^\s+/g, ''); },

        /**
         * [ description]
         * @param  {[type]} s){return s.replace(/\s+$/g [description]
         * @param  {[type]} ''         [description]
         * @return {[type]}            [description]
         */
        'rtrim' : function (s) {return s.replace(/\s+$/g, ''); },
        /**
         * [ description]
         * @param  {[type]} str [description]
         * @param  {[type]} pwd [description]
         * @return {[type]}     [description]
         */
        'str2code' : function (str, pwd) {
            var out = [],
                i = 0,
                l = str.length;
            for (null; i < l; i += 1) {
                out.push(str.charCodeAt(i));
            }
            return out;
        },

        /**
         * [ description]
         * @param  {[type]} code [description]
         * @param  {[type]} pwd  [description]
         * @return {[type]}      [description]
         */
        'code2str' : function (code, pwd) {
            return String.fromCharCode.apply(null, code);
        },
        /** 
         * [ description]
         * @param  {string} tpl      the template
         * @param  {literal or function} o        
         * @param  {string} dD       [description]
         * @param  {string} Dd       [description]
         * @param  {string} fallback [description]
         * @return {[type]}          [description]
         */
        'replaceall' : function (tpl, o, dD, Dd, fback) {
            dD || (dD = '%');
            Dd || (Dd = '%');
            var reg = new RegExp(dD + '([A-z0-9-_]*)' + Dd, 'g'),
                str;
            return tpl.replace(reg, function (str, $1) {
                return (typeof o === 'function' ? o($1) : o[$1]) || fback || dD + $1 + Dd;
            });
        },


        'multireplace' : function (cnt, o) {
            JMVC.each(o, function (el, rx) {
                cnt = cnt.replace(rx, el);
            });
            return cnt;
        },
         /**
         * [ description]
         * @param  {[type]} html [description]
         * @return {[type]}      [description]
         */
        'htmlEntities' : function (html) {
            return html
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/&(?![\w\#]+;)/g, '&amp;');
        },
        /**
         * [ description]
         * @param  {[type]} str [description]
         * @param  {[type]} n   [description]
         * @return {[type]}     [description]
         */
        'str_repeat' : function (str, n) {
            var t = [];
            while (n-=1) {t.push(str.replace(/\%n\%/g, n)); }
            return t.reverse().join('');
        }
    };




    JMVC.object = {
        /**
         * Clones an object
         * 
         * @param Literal obj
         * @returns cloned Object
         */
        'clone' : function (obj) {
            var temp,
                key;
            if (obj === null || typeof obj !== 'object') {
                return obj;
            }
            temp = obj.constructor();

            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    temp[key] = this.clone(obj[key]);
                }
            }
            return temp;
        },
        /**
         * [ description]
         * @param  {[type]} obj1 [description]
         * @param  {[type]} obj2 [description]
         * @param  {[type]} ret  [description]
         * @param  {[type]} i    [description]
         * @return {[type]}      [description]
         */
        'objCompare' : function (obj1, obj2, ret, i) {
            "use strict";
            (ret == undefined) && (ret = true);
            if (!ret) {return 0; }
            if (obj1+'' != obj2+'') {
                return false;
            }
            for (i in obj1) {
                ret = ret && obj2[i] && JMVC.object.objCompare(obj1[i], obj2[i], ret);
                if (!ret) {return false; }
            }
            for (i in obj2) {
                ret = ret && obj1[i] && JMVC.object.objCompare(obj2[i], obj1[i], ret);
                if (!ret) {return false; }
            }
            return ret;
        },

        /**
         * [ description]
         * @param  {[type]} obj1 [description]
         * @param  {[type]} obj2 [description]
         * @return {[type]}      [description]
         */
        'objJCompare' : function (obj1, obj2) {
            "use strict";
            return JSON.stringify(obj1) === JSON.stringify(obj2);
        },
        /**
         * [ description]
         * @param  {[type]} obj    [description]
         * @param  {[type]} field) {return      (typeof obj === 'object' && obj[field] [description]
         * @return {[type]}        [description]
         */
        'in_object' : function (obj, field) {return (typeof obj === 'object' && obj[field]); },

        /**
         * [ description]
         * @param  {[type]} o [description]
         * @return {[type]}   [description]
         */
        'obj2attr' : function (o) {
            var ret = '', i;
            for (i in o) {
                if (o.hasOwnProperty(i)) {
                    ret += ' ' + i + (o[i] ? '="' + o[i] + '"' : '');
                }
            }
            return ret;
        },

        /**
         * [ description]
         * @param  {[type]} o [description]
         * @return {[type]}   [description]
         */
        'obj2css' : function (o) {
            var ret = '', i, j;
            for (i in o) {
                if (o.hasOwnProperty(i)) {
                    ret += i + '{';
                    for (j in o[i]) {
                        if (o[i].hasOwnProperty(j)) {
                            ret += j + ':' + o[i][j] + ';';
                        }
                    }
                    ret += '} ';
                }
            }
            return ret;
        },

        /**
         * [ description]
         * @param  {[type]} o [description]
         * @return {[type]}   [description]
         */
        'obj2qs' : function (o) {
            var ret = '', i;
            for (i in o) {
                if (o.hasOwnProperty(i)) {
                    ret += String((ret ? '&' : '?') + i + '=' + encodeURIComponent(o[i]));
                }
            }
            return ret;
        },

    };
    JMVC.num = {
        getNum : function (str) {return parseInt(str, 10); },
        getFloat : function (str) {return parseFloat(str, 10); },
        pFloat : function (f) {return 1 * f; },
        pInt : function (i) {return i >> 0; },
        mRound : function (n) {return (n + 0.5) >> 0; },
        mFloor : function (n) {(n > 0 ? n : n + 1) >> 0; },
        mCeil : function (n) {return (n + (n > 0 && !!(n % 1))) >> 0; },
        num : function (n) {return parseFloat(n.toFixed(10), 10); },
    };
    
    //
    //
    //
    //  ###  hooray ... RENDER
    // polling ajax finishing
    (
        /**
         * [r description]
         * @return {[type]} [description]
         */
        function () {
            //
            // before rendering, load requested extensions (must be set in the
            // Modules var and the file must be in the extensions folder)
            l = JMVC.modules.length;
            if (l > 0) {
                i = 0;
                for (null; i < l; i += 1) {
                    JMVC.require(JMVC.modules[i]);  
                }
            }
            JMVC.render();
            //JMVC.loaded = true;
        }
    )();
    
}(this);



JMVC.W.onerror = function(errorMsg, url, lineNumber) {
    alert("Uncaught error " + errorMsg + " in " + url + ", lines " + lineNumber);
};
