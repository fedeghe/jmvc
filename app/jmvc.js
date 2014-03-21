/*
[MALTA] /src/head.js
*/
/**
 * 
 * JMVC : A pure Javascript MVC framework
 * ======================================
 *
 * @version :  3.3.6 (rev. 5) build: 587
 * @copyright : 2014, Federico Ghedina <fedeghe@gmail.com>
 * @author : Federico Ghedina <fedeghe@gmail.com>
 * @url : http://www.jmvc.org
 * @file : built with Malta v.1.0.13 & a love heap
 *         glued with 35 files on 21/3/2014 at 1:24:19
 *
 * All rights reserved.
 *
 * This code is distributed under the terms of the BSD licence
 *
 * Redistribution and use of this software in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * > Redistributions of source code must retain the above copyright notice, this list of conditions
 * and the following disclaimer.
 * > Redistributions in binary form must reproduce the above copyright notice, this list of
 * conditions and the following disclaimer in the documentation and/or other materials provided
 * with the distribution.
 * > The names of the contributors to this file may not be used to endorse or promote products
 * derived from this software without specific prior written permission.
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
 */
//
//
(function (W) {
    // 
    // one for all the build
    'use strict';
    //
    // local reference for window.document
    // local reference for current window.document.location
    var WD = W.document,
        WDL = WD.location,
        //
        // this function returns the JMVC object, globalized, after doing some stuff
        // @return {object literal} $JMVC inner object 
        JMVC = W.JMVC = (function () {
            /*
            [MALTA] /src/core/init.js
            */
            /*--
            INIT
            --*/
            //
            // the returning object created in that function,
            // global JMVC will take the $JMVC ref
            var $JMVC,
                //
                // version (vars.json)
                JMVC_VERSION = '3.3.6',
                //
                // review (vars.json)
                JMVC_REVIEW = '5',
                //
                // experimental (ignore it)
                JMVC_PACKED = '', //'.min' 
                //
                // inner jmvc literal, will contain almost all the functions used to 
                // compose the $JMVC object and thus the returning JMVC
                // @type {Object}
                jmvc = {},
                //
                // url separator
                US = '/',
                //
                // in some cases is useful to automatically distinguish between a
                // developing url and production url
                // will be returned in a var container accessible from the JMVC object
                // through JMVC.vars.baseurl & JMVC.vars.devurl
                DEV_URL = WDL.protocol + US + US + 'www.jmvc.dev',
                PROD_URL = WDL.protocol + US + US + 'www.jmvc.org',
                DEV_URLstatic = WDL.protocol + US + US + 'static.jmvc.dev',
                PROD_URLstatic = WDL.protocol + US + US + 'static.jmvc.org',
                //
                // paths for
                // extensions: used as basepath by JMVC.require
                // test: tests
                // lang: lang files
                PATH = {
                    //
                    // extensions path, used as base path in the JMVC.require function
                    // @type {string}
                    ext  : US + 'app' + US + 'extensions' + US,
                    //
                    // test suite path, every controller matching "test_foocontroller"
                    // will automatically load the test suite and
                    //  
                    // foocontroller.js will be 
                    // searched into the /app/controller/test directory
                    // to use test suite a require('test') is needed until TODO is done
                    // @type {string}
                    test : US + 'app' + US + 'testsuite' + US,
                    //
                    // path for lang files, loaded with the JMVC.lang function
                    // @type {string}
                    lang : US + 'app' + US + 'i18n' + US
                },
                //
                JMVC_EXT = {
                    'controller' : (JMVC_PACKED || '') + '.js',
                    'model' : (JMVC_PACKED || '') + '.js',
                    'view' : '.html',
                    'interface' : '.interface' + (JMVC_PACKED || '') + '.js'
                },
                //
                /**
                 * all these extensions can be used just after the action
                 * @type {Array}
                 */
                URL_ALLOWED_EXTENSIONS = ['html', 'htm', 'jsp', 'php', 'js', 'jmvc', 'j', 'mvc', 'do', 'asp'],
                //
                /**
                 * default values for controller & action
                 * @type {Object}
                 */
                JMVC_DEFAULT = {
                    controller : 'index',
                    action : 'index'
                },
                //
                // dispather function result
                /**
                 * here will be stored relevant results returned from the dispather function
                 * used to parse the current url for getting all is needed to now how to get
                 * the right response
                 */
                dispatched,
                //
                /**
                 * MVC basic constructors
                 */
                Controller,
                Model,
                View,
                Interface,
                //
                /**
                 * the parser object, used for replacing all available placeholders
                 * (views, views variables, chunks, snippets)
                 */
                Parser,
                //
                /**
                 * some useful constructors 
                 */
                Pipe,
                Event,
                Promise,
                Errors,
                Channel,
                Extension,
                FunctionQueue,
                //
                /**
                 * in case some modules need to be always loaded here's the place to set them
                 * @type {Array}
                 */
                Modules = ['vendors/google/analytics/analytics', 'core/cookie/cookie'],
                //
                /**
                 * preloader
                 */
                preload,
                //
                /**
                 * hooks literal used to execute callbacks as far as some relevant event are fired
                 * starting fron the request and ending with the document rendering end
                 * @type {Object}
                 */
                hooks = {},
                //
                /**
                 * a literal to store loaded lang files
                 * @type {Object}
                 */
                defaultlang = 'en',
                currentlang = defaultlang,
                //
                // store starting time, that's not truly the starting time but 
                // it's really next to the real value
                time_begin = +new Date(),
                //
                //undefined string for typeof
                undef = 'undefined',
                //
                // getmode used in the require function
                // ajax         : use xhr to get the source and evals
                // script       : creates a script tag with the right url to the source
                // scriptghost  : same as script but removes all injected script from the DOM after load
                // NOTE > it seems like script mode load faster but ...
                getmode = 'ajax'; // {ajax, script, scriptghost}
                //
                // ===========================================
                //
                //-----------------------------------------------------------------------------
            /*
            [MALTA] /src/core/innerjmvc.js
            */
            /*--------
            JMVC inner
            --------*/
            jmvc = {
                /**
                 * the self-proclaimed ninja debug fucntion SUCKS
                 *                                          -----
                 * @return {[type]} [description]
                 */
                debug : function (m) {
                    try {
                        W.console.log(m);
                    } catch (e1) {
                        try {
                            W.opera.postError(m);
                        } catch (e2) {
                            W[W.hasOwnProperty('log') ? 'log' : 'alert'](m);
                        }
                    }
                },
                /**
                 * [description]
                 * @param  {[type]} name [description]
                 * @return {[type]}      [description]
                 */
                del : function (name) {
                    if ($JMVC.vars.hasOwnProperty(name)) {
                        $JMVC.vars[name] = null;
                    }
                    return $JMVC;
                },
                /**
                 * Returns a new function having as context the passed object
                 * @param  {[type]} func [description]
                 * @param  {[type]} ctx  [description]
                 * @return {[type]}      [description]
                 */
                delegate : function (func, ctx) {
                    // get relevant arguments
                    var args = Array.prototype.slice.call(arguments, 2);
                    return function () {
                        return func.apply(ctx || $JMVC, [].concat(args, Array.prototype.slice.call(arguments)));
                    };
                },
                /**
                 * Every each implementation is really bad compared to a native loop,
                 * so, if possible , do not ever use that function.
                 * @param  {[type]} o    [description]
                 * @param  {[type]} func [description]
                 * @return {[type]}      [description]
                 */
                each : function (o, func) {
                    var type = ({}).toString.call(o).match(/\s([a-zA-Z]+)/)[1].toLowerCase(),
                        i,
                        l,
                        ret;
                    func.Obreak = false;
                    func.Ocontinue = false;
                    func['break'] = /*func.exit = */function () {func.Obreak = true; };
                    func['continue'] = /*func.skip = */function () {func.Ocontinue = true; };
            
                    if (type === 'array') {
                        ret = [];
                        i = 0;
                        l = o.length;
                        for (null; i < l; i += 1) {
                            if (func.Ocontinue) {func.Ocontinue = false; continue; }
                            if (func.Obreak) {break; }
                            ret.push(func.call(o, o[i], i));
                        }
                    } else if (type === 'object') {
                        ret = {};
                        for (i in o) {
                            if (o.hasOwnProperty(i)) {
                                if (func.Ocontinue) {func.Ocontinue = false; continue; }
                                if (func.Obreak) {break; }
                                (function (j) {ret[j] = func.call(o, o[j], j); })(i);
                            }
                        }
                    } else {
                        ret = func(o);
                    }
                    return ret;
                },
                /**
                 * Basic function for extending an object
                 * only under JMVC ns
                 * @param  {String} label the label under which JMVC will be extended,
                 *                        here can even be used dots to subspace
                 * @param  {[type]} obj   [description]
                 * @return {Object|false} The 
                 */
                extend : function (label, obj) {
                    //
                    // ensures that the target namespace exists 
                    var trg = jmvc.ns.make('JMVC.' + label);
                    //
                    //let the literal straigth inherith from Extension Object
                    Extension.call(trg);
                    //
                    // if is a function return its execution
                    if (typeof obj === 'function') {
                        trg = obj();
                        //jmvc.ns.make('JMVC.' + label, trg);
                        jmvc.extend(label, trg);
                        return trg;
                    }
                    //
                    // and set a flag, that can be switched off as far as
                    // if the object passed has a initCheck function
                    // the extension will take place only if the initCheck
                    // return truly value
                    // 
                    if (typeof obj.initCheck === 'function') {
                        if (!obj.initCheck.call($JMVC)) {
                            return false;
                        }
                        trg.initCheck = null;
                    }
                    //
                    (function (t, o) {
                        var j;
                        for (j in o) {
                            o.hasOwnProperty(j) && t[j] === undefined && (t[j] = o[j]);
                        }
                    })(trg, obj);
                    //
                    //maybe init, in case call it
                    if (typeof trg.init === 'function') {
                        trg.init.call($JMVC);
                        //and clean
                        trg.init = null;
                    }
                    //
                    return trg;
                },
                /**
                 * [factory_method description]
                 * @param  {[type]} type   [description]
                 * @param  {[type]} name   [description]
                 * @param  {[type]} params [description]
                 * @return {[type]}        [description]
                 */
                factory_method : function (type, name, params) {
                    // using namespace ?
                    var pieces = name.split('/'),
                        path = false,
                        path_absolute =  $JMVC.vars.baseurl + US + 'app' + US + type + 's/',
                        t = type,
                        ret;
                    if (pieces.length > 1) {
                        name = pieces.pop();
                        path = pieces.join(US);
                    }
                    //
                    // need to do this because of the special case when a c_prepath is used
                    type === 'controller' && (path_absolute += $JMVC.c_prepath);
            
                    path_absolute += (path ? path + US : '') + name;
                    t = t.match(/(view|model|controller|interface)/);
            
                    if (!t || t[0] !== type) {
                        return false;
                    }
                    path_absolute += JMVC_EXT[type];
                    //
                    // ajax get script content and return it
                    ret = jmvc.xhrget(path_absolute, type, name, params);
                    return ret;
                },
                /**
                 * [get description]
                 * @param  {[type]} name [description]
                 * @return {[type]}      [description]
                 */
                get : function (name) {
                    return $JMVC.vars[name] || undefined;
                },
                /**
                 * [globalize description]
                 * @param  {[type]} obj  [description]
                 * @param  {[type]} name [description]
                 * @return {[type]}      [description]
                 */
                globalize : function (obj, name) {
                    JMVC.W[name] = obj;
                },
                /**
                 * [hook description]
                 * @param  {[type]} obj   [description]
                 * @param  {[type]} force [description]
                 * @return {[type]}       [description]
                 */
                hook : function (obj, force) {
                    var allowed = ['onBeforeRender', 'onAfterRender', 'onBeforeParse', 'onAfterParse'],
                        f = 0;
                    for (f in obj) {
                        if (obj.hasOwnProperty(f)) {
                            try {
                                if ($JMVC.array.find(allowed, f) > -1 || force) {
                                    if (!(hooks.hasOwnProperty(f)) || !(hooks[f] instanceof Array)) {
                                        hooks[f] = [];
                                    }
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
                 * hook utility
                 * @param  {[type]} hookname [description]
                 * @param  {[type]} param    [description]
                 * @return {[type]}          [description]
                 */
                hook_check : function (hookname, params) {
                    var dyn = params instanceof Array ? params : false,
                        i;
                    if (dyn && hookname in hooks) {
                        for (i in hooks[hookname]) {
                            dyn = hooks[hookname][i].apply(null, dyn);
                            //be sure is an array for next one
                            !(dyn instanceof Array) && (dyn = [dyn]);
                        }
                    }
                    return dyn;
                },
                /**
                 * [htmlspecialchars description]
                 * @param  {[type]} text [description]
                 * @return {[type]}      [description]
                 */
                htmlchars : function (text) {
                    return text
                        .replace(/&(?![\w\#]+;)/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#039;');
                },
                /**
                 * [htmlspecialchars_decode description]
                 * @param  {[type]} html [description]
                 * @return {[type]}      [description]
                 */
                htmlchars_decode : function (html) {
                    return html
                        .replace(/&amp;/g, '&')
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .replace(/&quot;/g, '"')
                        .replace(/&#039;/g, '\'');
                },
                /**
                 * [description]
                 * @param  {[type]} o      [description]
                 * @param  {[type]} interf [description]
                 * @param  {[type]} s      [description]
                 * @return {[type]}        [description]
                 */
                implement : function (o, interf) {
                    var i = 0,
                        l = interf.length;
            
                    for (null; i < l; i += 1) {
                        if (!(
                            (o.prototype && interf[i] in o.prototype && typeof o.prototype[interf[i]] === 'function')
                            ||
                            (interf[i] in o && typeof o[interf[i]] === 'function')
                        )) {
                            return false;
                        }
                    }
                    return true;
                },
                /**
                 * [ description]
                 * @param  {[type]} Child  [description]
                 * @param  {[type]} Parent [description]
                 * @return {[type]}        [description]
                 */
                inherit : function (Child, Parent) {
                    function T() {}
                    T.prototype = Parent.prototype;
                    Child.prototype = new T();
                    Child.prototype.constructor = Child;
                    Child.superClass = Parent.prototype;
                    Child.baseConstructor = Parent;
                },
                /**
                 * eval function wrap
                 * @param  string   code to be evalued
                 * @return void
                 */
                jeval : function (r) {
                    //r = r.replace(/(\/\/.*\n)/gm, '');
                    try {
                        return JMVC.W.eval(r);
                    } catch (e) {}
                    return false;
                },
                /**
                 * lang loader
                 * @return {[type]} [description]
                 */
                lang : function () {
                    var lng = Array.prototype.slice.call(arguments, 0),
                        i = 0,
                        l = lng.length;
                    while (i < l) {
                        !JMVC.i18n[lng[i]] && (JMVC.i18n[lng[i]] = true);
                        i += 1;
                    }
                },
                /**
                 * just for models
                 * @param  {[type]} m [description]
                 * @return {[type]}   [description]
                 */
                model_inherit : function (m) {
                    m.prototype.get = Model.prototype.get;
                    m.prototype.set = Model.prototype.set;
                    m.prototype.del = Model.prototype.del;
                    m.prototype.vars = Model.prototype.vars;
                    m.prototype.reset = Model.prototype.reset;
                    m.prototype.constructor = Model.prototype.constructor;
                },
                /**
                 * [ description]
                 * @param  {obejct literal} Childs [description]
                 * @param  {[type]} Parent [description]
                 * @return {[type]}        [description]
                 */
                multi_inherit : function (Childs, Parent) {
                    jmvc.each(Childs, function (ch) {
                        jmvc.inherit(ch, Parent);
                    });
                },
                /**
                 * [ns description]
                 * @type {Object}
                 */
                ns : {
                    /**
                     * creates a namespace
                     * @param  {[type]} str [description]
                     * @param  {[type]} obj [description]
                     * @param  {[type]} ctx [description]
                     * @return {[type]}     [description]
                     */
                    make : function (str, obj, ctx) {
                        var chr = '.',
                            els = str.split(/\.|\//),
                            l = els.length,
                            ret;
                        typeof ctx === undef && (ctx = W);
                        typeof obj === undef && (obj = {});
                        //
                        if (!ctx[els[0]]) {
                            ctx[els[0]] = (l === 1) ? obj : {};
                        }
                        ret = ctx[els[0]];
                        return (l > 1) ? jmvc.ns.make(els.slice(1).join(chr), obj, ctx[els[0]]) : ret;
                    },
                    /**
                     * check if a namespace already exists
                     * @param  {[type]} ns  namesoace dot glued
                     * @param  {[type]} ctx [description]
                     * @return {[type]}     [description]
                     */
                    check : function (ns, ctx) {
                        var els = ns.split(/\.|\//),
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
                 * [parselang description]
                 * @param  {[type]} cnt [description]
                 * @return {[type]}     [description]
                 */
                parselang : function (cnt) {
                    var RXlng = '\\[L\\[([\\S\\s]*?)\\]\\]',
                        lang = true,
                        tmp,
                        limit = 1E5,
                        def_lang = $JMVC.cookie.get('lang') || defaultlang;
                    JMVC.vars.currentlang = def_lang;
                    $JMVC.lang(JMVC.vars.currentlang);
                    //
                    if (JMVC.i18n[JMVC.vars.currentlang] === true) {
                        $JMVC.io.get(
                            JMVC.vars.baseurl + PATH.lang + JMVC.vars.currentlang + (JMVC_PACKED || '') + '.js',
                            function (ln) {
                                jmvc.jeval(ln);
                            },
                            false
                        );
                    }
                    //
                    // check for [[js code]], es. [[JMVC.vars.baseurl]] will be rendered as the value of baseurl
                    while (limit) {
                        lang = new RegExp(RXlng, 'gm').exec(cnt);
                        tmp = '';
                        if (!!lang) {
                            tmp = ($JMVC.i18n[JMVC.vars.currentlang] && $JMVC.i18n[JMVC.vars.currentlang][lang[1]]) || lang[1];
                            cnt = cnt.replace(lang[0], tmp);
                        } else {
                            break;
                        }
                        lang = !!lang;
                        limit -= 1;
                    }
                    return cnt;
                },
                /**
                 * [prototipize description]
                 * @param  {[type]} el  [description]
                 * @param  {[type]} obj [description]
                 * @return {[type]}     [description]
                 */
                prototipize : function (el, obj) {
                    var p, l,
                        i = 0;
                    if (el instanceof Array) {
                        for (l = el.length; i < l; i += 1) {
                            jmvc.prototipize(el[i], obj);
                        }
                    }
                    for (p in obj) {
                        if (obj.hasOwnProperty(p)) {
                            el.prototype[p] = obj[p];
                        }
                    }
                },
                /**
                 * [purge description]
                 * @param  {[type]} o [description]
                 * @return {[type]}   [description]
                 */
                purge : function (o) {
                    var t;
                    try {
                        for (t in o) {
                            o[t] = null;
                            delete o[t];
                        }
                    } catch (e) {}
                },
                /**
                 * render function
                 * @param  {[type]} cback [description]
                 * @return {[type]}       [description]
                 */
                render : function (cback) {
                    var ctrl,
                        i;
                    //
                    // "import" the controller (eval ajax code)
                    $JMVC.factory('controller', $JMVC.c);
                    //
                    // if the constructor has been evalued correctly
                    if ($JMVC.c in $JMVC.controllers) {
                        //
                        // grant basic ineritance from parent Controller
                        jmvc.inherit($JMVC.controllers[$JMVC.c], Controller);
                        //
                        // make an instance
                        ctrl = new $JMVC.controllers[$JMVC.c]();
                        //
                        // store it
                        $JMVC.controllers[$JMVC.c] = ctrl;
                        //
                        // manage routes
                        'jmvc_routes' in ctrl && ($JMVC.a = ctrl.jmvc_routes[$JMVC.a] || $JMVC.a);
                        //
                        // parameters are set as variables of the controller
                        for (i in $JMVC.p) {
                            $JMVC.p.hasOwnProperty(i) && (ctrl.set(i, decodeURI($JMVC.p[i])));
                        }
                        /***************************/
                        // BEFORE HOOKS?
                        // 
                        // @global hook
                        if ('before' in ctrl && typeof ctrl.before === 'function') {
                            ctrl.before($JMVC.p); 
                        }
                        //
                        // @action hook
                        if ('before_' + $JMVC.a in ctrl && typeof ctrl['before_' + $JMVC.a] === 'function') {
                            ctrl['before_' + $JMVC.a]($JMVC.p);
                        }
                        /***************************/
                        // REAL ACTION
                        // check actual action
                        if ('action_' + $JMVC.a in ctrl && typeof ctrl['action_' + $JMVC.a] === 'function') {
                            ctrl['action_' + $JMVC.a]($JMVC.p);
                        } else if ('action' in ctrl && typeof ctrl.action === 'function') {
                            ctrl.action($JMVC.a, $JMVC.p, $JMVC.p);
                        } else if ($JMVC.a.toLowerCase() !== JMVC_DEFAULT.action) {
                            WDL.replace(US + '404' + US + 'msg' + US + 'act' + US + $JMVC.a);
                        }
            
                        /***************************/
                        // AFTER HOOKS?
                        //
                        // @action hook 
                        if ('after_' + $JMVC.a in ctrl && typeof ctrl['after_' + $JMVC.a] === 'function') {
                            ctrl['after_' + $JMVC.a]($JMVC.p);
                        }
                        //
                        // @global hook
                        if ('after' in ctrl && typeof ctrl.after === 'function') {
                            ctrl.after($JMVC.p);
                        }
            
                        //////////////////////////
                    } else {
                        $JMVC.c.toLowerCase() !== JMVC_DEFAULT.controller && WDL.replace(US + '404' + US + 'msg' + US + 'cnt' + US + $JMVC.c);
                    }
                    if (cback && typeof cback === 'function') {
                        cback.call($JMVC);
                    }
                    $JMVC.loaded = true;
                },
                /**
                 * 'test' is an exception, if passed then the path will be /app/test
                 * @param {String} none [description]
                 * @return {void} undefined
                 */
                require : function () {
                    var path, extNS, extNSlength, extname, s,
                        i = 0,
                        arg = arguments,
                        lArg = arg.length,
                        head = JMVC.WD.getElementsByTagName('head').item(0),
                        cb = null;
                    //
                    while (i < lArg) {
                        if (typeof arg[i] === 'function') {
                            cb = arg[i];
                        }
                        if (typeof arg[i] === 'string' && !$JMVC.extensions[arg[i]]) {
                            // check if the required end with /, in this case
                            // 
                            if (arg[i].match(/\/$/)) {
                                $JMVC.io.getJson(JMVC.vars.baseurl + PATH.ext + arg[i] + 'require.json', function (json) {
                                    for (var j in json.require) {
                                        jmvc.require(arg[i] + json.require[j]);
                                    }
                                }, false);
                            } else {
                                extNS = arg[i].split(US);
                                extNSlength = extNS.length;
                                extname = extNS[extNSlength - 1];
                                path = JMVC.vars.baseurl +
                                    PATH[(arg[i] === 'testsuite' ? 'test' : 'ext')] +
                                    arg[i] + (JMVC_PACKED || '') + '.js';
            
                                if (getmode === 'ajax') {
                                    $JMVC.io.get(path, function (jres) {
                                        jmvc.jeval(jres);
                                    }, false);
                                } else if (getmode.match(/script/)) {
                                    s = JMVC.WD.createElement('script');
                                    s.type = 'text/javascript';
                                    s.src = path;
                                    head.appendChild(s);
                                    getmode === 'scriptghost' && head.removeChild(s);
                                }
                                $JMVC.extensions[arg[i]] = arg[i];
                            }
                        }
                        i += 1;
                    }
                    cb && cb();
                },
                /* 
                * setter, getter, unsetter for $JMVC vars
                */
                /**
                 * [set description]
                 * @param {[type]} name    [description]
                 * @param {[type]} content [description]
                 */
                set : function (name, content) {
                    if (JMVC.util.isObject(name)) {
                        for (var i in name) {
                            $JMVC.set(i, name[i]);
                        }
                        return $JMVC;
                    }
                    $JMVC.vars[name] = content;
                    return $JMVC;
                },
                /**
                 * instance new view content or eval a model or controller
                 * @param  {[type]} path   [description]
                 * @param  {[type]} type   [description]
                 * @param  {[type]} name   [description]
                 * @param  {[type]} params [description]
                 * @return {[type]}        [description]
                 */
                xhrget : function (path, type, name, params) {
                    var ret = false,
                        o;
                    if (type === 'view' && typeof $JMVC.views[name] === 'function') {
                        ret = $JMVC.views[name];
                    } else if (type === 'model' && typeof $JMVC.models[name] === 'function') {
                        o = new $JMVC.models[name]();
                        if (params) {
                            $JMVC.models[name].apply(o, params);
                        }
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
                                    jmvc.jeval(res);
                                    jmvc.inherit($JMVC[type + 's'][name], Controller);
                                    break;
                                case 'model':
                                    jmvc.jeval(res);
                                    jmvc.model_inherit($JMVC[type + 's'][name]);
                                    o = new $JMVC.models[name]();
                                    params && $JMVC.models[name].apply(o, params);
                                    o.vars = {};
                                    ret = o;
                                    break;
                                case 'interface':
                                    !(name in JMVC.interfaces) && jmvc.jeval(res);
                                    break;
                                }
                            },
                            false // be asynchronous
                        );
                    }
                    return ret;
                },
                get2 : function (ns) {return jmvc.ns.check(ns, JMVC.vars); },
                set2 : function (ns, val) {jmvc.ns.make(ns, val, JMVC.vars); },
                del2 : function (ns) {jmvc.purge(jmvc.get2(ns)); }
            };
            //-----------------------------------------------------------------------------
            /*
            [MALTA] /src/core/preload.js
            */
            //
            // preloadign function                                
            preload = function (url) {
                W.setTimeout(function () {
                    //
                    // get a new Promise
                    var p = new Promise(),
                        //
                        // the iframe where preloading will take place
                        ifr = null,
                        //
                        // a function used to remove the imframe once
                        // everything is loaded, hence cached
                        cleanup = function (i) {JMVC.dom.remove(i); };
                    //
                    // when `done` will be called on the promise
                    // cleanup will be called, params follows the chain
                    p.then(cleanup);
                    //
                    // now a function is executed dereferencing the promise
                    (function (pr) {
                        //
                        // make 1*1 iframe and load url
                        ifr = JMVC.dom.add(JMVC.dom.body(), 'iframe', {src : url, width : 1, height : 1});
                        //
                        // as far as the iframe is loaded,
                        // call done on the promise
                        ifr.contentWindow.onload = function () {pr.done(ifr); };
                    })(p);
            
                }, 0);
            };
            //-----------------------------------------------------------------------------
            /*
            [MALTA] /src/core/constructors/errors.js
            */
            /*----
            ERRORS
            ------
            
            specific classes that will extend the built-in Error Onject
            */
            Errors = {
                'Network' : function (msg) {
                    this.name = 'Network';
                    this.msg = msg || this.name + ' error';
                },
                'BadParams' : function (msg) {
                    this.name = 'BadParams';
                    this.msg = msg || this.name + ' error';
                },
                'BadName' : function (msg) {
                    this.name = 'BadName';
                    this.msg = msg || this.name + ' error';
                },
                'BadImplement' : function (msg) {
                    this.name = 'BadImplement';
                    this.msg = msg || this.name + ' error';
                },
                'ControllerNotFound' : function (msg) {
                    this.name = 'ControllerNotFound';
                    this.msg = msg ||  this.name + ' error';
                },
                'ActionNotFound' : function (msg) {
                    this.name = 'ActionNotFound';
                    this.msg = msg ||  this.name + ' error';
                }
            };
            jmvc.multi_inherit(Errors, Error);
            //-----------------------------------------------------------------------------
            /*
            [MALTA] /src/core/constructors/event.js
            */
            /*
            Event JMVC object
            use mainly for observers
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
                attach : function (listener) {
                    this.listeners.push(listener);
                },
                /**
                 * [ description]
                 * @param  {[type]} args [description]
                 * @return {[type]}      [description]
                 */
                notify : function (args) {
                    var i = 0,
                        l = this.listeners.length;
                    while (i < l) {
                        this.listeners[i++](this.sender, args);
                    }
                }
            };
            //-----------------------------------------------------------------------------
            /*
            [MALTA] /src/core/constructors/channelpipe.js
            */
            /**
             * [Channel description]
             * @param {[type]} n [description]
             */
            Channel = (function () {
                var channels = {},
            
                    P_Channel = function () {
                        this.topic2cbs = {};
                        this.enabled = true;
                    };
            
                P_Channel.prototype = {
                    /**
                     * enable cb execution on publish
                     * @return {undefined}
                     */
                    enable : function () {
                        this.enabled = false;
                    },
                    //
                    /**
                     * disable cb execution on publish
                     * @return {undefined}
                     */
                    disable : function () {
                        this.enabled = true;
                    },
                    //
                    /**
                     * publish an event on that channel
                     * @param  {String} topic
                     *                  the topic that must be published
                     * @param  {Array} args
                     *                 array of arguments that will be passed
                     *                 to every callback
                     * @return {undefined}
                     */
                    pub : function (topic, args) {
                        var i = 0,
                            l;
                        if (!(topic in this.topic2cbs) || !this.enabled) {
                            return false;
                        }
                        for (l = this.topic2cbs[topic].length; i < l; i += 1) {
                            this.topic2cbs[topic][i].apply(null, [topic].concat(args));
                        }
                        return true;
                    },
                    //
                    /**
                     * add a callback to a topic
                     * @param {String} topic
                     *                 the topic that must be published
                     * @param {Function} cb
                     *                   the callback will receive as first
                     *                   argument the topic, the others follow
                     * @return {undefined}
                     */
                    sub : function (topic, cb) {
                        var i = 0,
                            l;
                        if (topic instanceof Array) {
                            for (l = topic.length; i < l; i += 1) {
                                this.sub(topic[i], cb);
                            }
                        }
                        if (!(topic in this.topic2cbs) || !this.enabled) {
                            this.topic2cbs[topic] = [];
                        }
                        this.topic2cbs[topic].push(cb);
                    },
                    //
                    /**
                     * Removes all callbacks for one or more topic
                     * @param [String] ...
                     *                 the topic queue that must  be emptied
                     * @return [Channel] the instance
                     */
                    reset : function () {
                        var ts = Array.prototype.slice.call(arguments, 0),
                            l = ts.length,
                            i = 0;
                        if (!l) {
                            this.topic2cbs = {};
                            return this;
                        }
                        for (null; i < l; i += 1) {
                            ts[i] in this.topic2cbs && (this.topic2cbs[ts[i]] = []);
                        }
                        return this;
                    }
                };
            
            
            
            
            
                return function (name) {
                    if (name in channels) {
                        return channels[name];
                    }
                    channels[name] = new P_Channel();
                    return channels[name];
                };
            })();
            
            
            
            /*
            var colorsPalette = JMVC.Channel('colorsPalette'),
                optionsPalette = new JMVC.Channel('optionsPalette');
            
            colorsPalette.sub('getNewColor', function (topic, c){
                console.debug('got color :' + c);
            });
            colorsPalette.sub('invert', function (topic, c){
               console.debug('trying to invert color ' + c + ' ... '); 
            });
            optionsPalette.sub(['opened', 'closed'], function (topic){
                console.debug('The option palette has been ' + topic);
            });
            
            colorsPalette.pub('getNewColor', ['#fede76']);
            
            colorsPalette.pub('invert', ['#232323']);
            optionsPalette.pub('opened');
            optionsPalette.pub('closed');
            
            //////// THE GOOD THING IS THAT IT WORKS EVEN IN DIRECT MODE
            
            
            JMVC.Channel('colorsPalette').sub('getNewColor', function (topic, c){
                console.debug('got color :' + c);
            });
            JMVC.Channel('colorsPalette').sub('invert', function (topic, c){
               console.debug('trying to invert color ' + c + ' ... '); 
            });
            JMVC.Channel('optionsPalette').sub(['opened', 'closed'], function (topic){
                console.debug('The option palette has been ' + topic);
            });
            
            JMVC.Channel('colorsPalette').pub('getNewColor', ['#fede76']);
            
            JMVC.Channel('colorsPalette').pub('invert', ['#232323']);
            JMVC.Channel('optionsPalette').pub('opened');
            JMVC.Channel('optionsPalette').pub('closed');
            
            
            
            */
            //
            //
            //
            /**
             * Pipe pub sub singleton module
             * the non singleton named version is the Channel object
             * @return {Object} The Pipe object with pub, sub, reset, enable, disable
             */
            Pipe = (function () {
                return Channel('JMVC');
            })();
            /*
            JMVC.Pipe.reset();
            
            JMVC.Pipe.sub('news', function (){
                alert(JMVC.array.coll2array(arguments).join(' '));
            });
            JMVC.Pipe.sub('alarm', function (){
                alert(JMVC.array.coll2array(arguments).join(' '));
            });
            JMVC.Pipe.sub(['alarm', 'news'], function (){
                alert('double ' + JMVC.array.coll2array(arguments).join(' '));
            });
            
            JMVC.Pipe.pub('news', ['World is sold out!']);
            
            JMVC.Pipe.pub('alarm', ['Bomb in the hole,','runaway!!!']);
             */
            //-----------------------------------------------------------------------------
            /*
            [MALTA] /src/core/constructors/extension.js
            */
            /*
            Extension
            This is intended to be the base class for any element loaded via the require function.
            Now empty
            */
            Extension = function () {
                this._ = {};
            };
            Extension.prototype = {};
            //-----------------------------------------------------------------------------
            /*
            [MALTA] /src/core/constructors/promise.js
            */
            /*-----
            PROMISE
            -----*/
            // ty https://github.com/stackp/promisejs
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
                var func = jmvc.delegate(cback, ctx);
                if (this.completed) {
                    func(this.res, this.err);
                } else {
                    this.cbacks[this.len] = func;
                    this.len += 1;
                }
                return this;
            };
            //-----------------------------------------------------------------------------
            /*
            [MALTA] /src/core/constructors/interface.js
            */
            /**
             * [checkInterface description]
             * @param  {[type]} f [description]
             * @return {[type]}   [description]
             */
            function checkInterface(f) {
                var r = f.toString()
                    .match(/function\s(.*)\((.*)\)\s?{return\s[\'\"]?(.*)[\'\"]?;}/);
                return r instanceof Array && r.length === 4 ? {
                    name : r[1],
                    params : !!r[2] ? r[2].replace(/\s/g, '').split(',') : false,
                    ret : !!r[3] ? r[3]  : false
                } : false;
            }
            
            /**
             * INTERFACE
             * =========
             * [Interface description]
             * @param {[type]} name [description]
             * @param {[type]} a    [description]
             */
            Interface = function (name, a) {
                var i = 0,
                    l;
                this.name = name;
                this.mthds = [];
                if (!(a instanceof Array)) {
                    throw new Error('An array of strings must be passed to the Interface constructor');
                }
                l = a.length;
                for (null; i < l; i += 1) {
                    typeof a[i] === 'string' && (this.mthds.push(a[i]));
                    //console.debug(checkInterface(a[i]));
                }
            };
            /**
             * Static method to check if an instance inplements one or more Interfaces
             * @param  {[type]} obj    [description]
             * @param  {[type]} intrfc [description]
             * @return {[type]}        [description]
             */
            Interface.checkImplements = function (obj) {
                var m,
                    i = 0,
                    arg = Array.prototype.slice.call(arguments),
                    l = arg.length;
            
                //skip 0 being it obj
                while (++i < l) {
                    for (m in arg[i].mthds) {
                        if (typeof obj[arg[i].mthds[m]] !== 'function') {
                            throw new Error('Function Interface.checkImplements: object ' +
                            'does not implement the ' + arg[i].name +
                            ' interface. Method ' + arg[i].mthds[m] + ' was not found.');
                        }
                    }
                }
                return obj;
            };
            /*
            function tee(func, obj, str) {return 'obj';}
            
            function checkInterface(f) {
                var r = f.toString()
                    .match(/function\s(.*)\((.*)\)\s?{return\s[\'\"]?(.*)[\'\"]?;}/);
                return r instanceof Array && r.length == 4? {
                    name : r[1],
                    params : !!r[2] ? r[2].replace(/\s/g, '').split(',') : false,
                    ret : r[3]
                } : false;
            }
            
            console.dir(checkInterface(tee));
             */
            //-----------------------------------------------------------------------------
            /*
            [MALTA] /src/core/constructors/functionqueue.js
            */
            /*------------
            Function queue
            ------------*/
            FunctionQueue = function () {
                this.queue = [];
            };
            FunctionQueue.prototype.add = function (f) {
                this.queue.push(f);
            };
            FunctionQueue.prototype.run = function () {
                var i = 0,
                    l = this.queue.length,
                    args = [].slice.call(arguments, 0),
                    f;
                while (i < l) {
                    f = this.queue[i++];
                    !(args instanceof Array) && (args = [args]);
                    args = f.apply(null, args);
                }
                return args;
            };
            FunctionQueue.prototype.reset = function () {
                this.queue.length = 0;
            };
            //-----------------------------------------------------------------------------
            /*
            [MALTA] /src/core/parser.js
            */
            /*----
            PARSER
            ----*/
            Parser = {
                /**
                 * microtemplating function
                 * Based on the work of a self-professed javascript ninja 
                 * http://ejohn.org/blog/javascript-micro-templating/
                 * 
                 * Parses a string looking for  
                 * @param  {string} content the content that must be parsed
                 * @return {string}         parsed content
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
                /**
                 * This function get a content and substitute jmvc.vars
                 * and direct view placeholders like {{viewname .... }}
                 * returns parsed content
                 * 
                 * @param  {[type]} content [description]
                 * @return {[type]}         [description]
                 */
                parse : function (content) {
                    if (typeof content === undef) {
                        return '';
                    }
                    //
                    // the view content
                    var cont = content,
                        RX = {
                            //
                            // for hunting view placeholders
                            patt : '{{(.[^\\}]*)}}',
                            //
                            // for getting explicit params passed within view placeholders
                            pattpar : '\\s(.[A-z]*)=`(.[^/`]*)`',
                            //
                            // for variables
                            pattvar : '\\$(.[^\\$\\s}]*)\\$',
                            //
                            // for getting only the viewname
                            viewname : '^(.[A-z_\/]*)\\s'
                        },
                        //
                        // some loop counters
                        i = 0, j, k,
                        //
                        // recursion limit for replacement
                        limit = 100,
                        //
                        // flag to stop parsing
                        go_ahead = true,
                        //
                        // only the view name
                        viewname,
                        //
                        // original content of {{}} stored for final replacement
                        orig,
                        //
                        // to store inner variables found in the placeholder
                        register,
                        //
                        // results of view hunt 
                        res,
                        //
                        // the view instance
                        myview,
                        //
                        // two temporary variables for regexp results
                        tmp1, tmp2;
                    //
                    // check
                    // beforeParse hook
                    jmvc.hook_check('onBeforeParse', [cont]);
                    //
                    while (i < limit) {
                        i += 1;
                        res = new RegExp(RX.patt, 'gm').exec(cont);
                        //   
                        if (res) {
                            viewname = orig = res[1];
                            register = false;
                            //
                            // got params within ?
                            if (new RegExp(RX.pattpar, 'gm').test(res[1])) {
                                // register becomes an object and flags result for later check
                                register = {};
                                //
                                // get only the view name, ingoring parameters
                                tmp2  = (new RegExp(RX.viewname)).exec(res[1]);
                                viewname = tmp2[1];
                                tmp2 = res[1];
                                while (go_ahead) {
                                    // this is exactly pattpar but if I use it does not work
                                    tmp1 = (new RegExp(RX.pattpar, 'gm')).exec(tmp2);
                                    //
                                    if (tmp1) {
                                        // add to temporary register
                                        register[tmp1[1]] = tmp1[2];
                                        tmp2 = tmp2.replace(' ' + tmp1[1] + '=`' + tmp1[2] + '`', '');
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
                                myview = $JMVC.factory('view', viewname);
                            } else {
                                myview = $JMVC.views[viewname];
                            }
                            //
                            // in case there are some vars in placeholder
                            // register will hold values obtained above
                            // and we give'em to the view, the parse method
                            // will do the rest
                            if (register !== false) {
                                for (k in register) {
                                    register.hasOwnProperty(k) && myview.set(k, register[k]);
                                }
                            }
                            //
                            // before view substitution,
                            // look for variables, these have to be set with set method on view instance,
                            // (and that cannot be done using {{viewname}} placeholder )
                            tmp1 = true;
                            while (tmp1) {
                                tmp1 = new RegExp(RX.pattvar, 'gm').exec(myview.content);
                                tmp1 && (myview.content = myview.content.replace('$' + tmp1[1] + '$', myview.get(tmp1[1])));
                            }
                            //
                            // now the whole view
                            cont = cont.replace('{{' + orig + '}}', myview.content);
                        } else {
                            i = limit;
                        }
                    }
                    // now $JMVC.vars parse
                    for (j in $JMVC.vars) {
                        $JMVC.vars.hasOwnProperty(j) &&
                        (cont = cont.replace(new RegExp('\\$' + j + '\\$', 'g'), $JMVC.vars[j]));
                    }
                    //
                    // use Resig microtemplating function on final content
                    cont = Parser.tpl(cont);
                    //
                    // afterParse hook
                    jmvc.hook_check('onAfterParse', [cont]);
                    return cont;
                }
            };
            //
            // END PARSER
            //
            //-----------------------------------------------------------------------------
            /*
            [MALTA] /src/core/controller.js
            */
            /*--------
            CONTROLLER          
            --------*/
            // parent controller
            Controller = function () {
            };
            // for storing vars 
            Controller.prototype.vars = {};
            // this has no sense and must be removed
            Controller.prototype.jmvc_routes = {};
            /**
             * [index description]
             * @return {[type]} [description]
             */
            Controller.prototype.index = function () {
                W.alert('Default index action, write down a controller with at least an index action');
            };
            /**
             * [addRoutes description]
             * @param {[type]} name [description]
             * @param {[type]} val  [description]
             */
            Controller.prototype.addRoutes = function (name, val) {
                var j;
                
                typeof name === 'string' && (this.jmvc_routes[name] = val);
            
                if (typeof name === 'object') {
                    for (j in name) {
                        name.hasOwnProperty(j) && this.addRoutes(j, name[j]);
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
                    function () {WDL.href = String(uri); },
                    ~~ms || 0
                );
            };
            /**
             * [render description]
             * @param  {[type]} content [description]
             * @param  {[type]} cback   [description]
             * @return {[type]}         [description]
             */
            Controller.prototype.render = function (content, cback) {
                // allow only cback 
                if (typeof content === 'function') {
                    cback = content;
                    content = false;
                }
            
                var tmp_v = new View(content);
                tmp_v.render(cback && typeof cback === 'function' ? {cback : cback} : null);
            
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
            //-----------------------------------------------------------------------------
            /*
            [MALTA] /src/core/model.js
            */
            /*---
            MODEL
            ---*/
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
            //-----------------------------------------------------------------------------
            /*
            [MALTA] /src/core/view.js
            */
            /*--
            VIEW
            --*/
            // directly instantiated assinging content
            /**
             * [View description]
             * @param {[type]} cnt [description]
             */
            View = function (cnt) {
                // original content
                this.ocontent = cnt || '';
                this.content = cnt || '';
                this.vars = {
                    baseurl : $JMVC.vars.baseurl
                };
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
                            obj.vars.hasOwnProperty(j) &&
                            (this.content = this.content.replace(new RegExp('\\$' + j + '\\$', 'g'), obj.get(j) || ''));
                        }
                    }
                    // now jmvc parse vars
                    for (j in $JMVC.vars) {
                        $JMVC.vars.hasOwnProperty(j) &&
                        (this.content = this.content.replace(new RegExp('\\$' + j + '\\$', 'gm'), $JMVC.vars[j] || ''));
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
             * [setFromUrl description]
             * @param {[type]} vname [description]
             * @param {[type]} alt   [description]
             */
            View.prototype.setFromUrl = function (vname, alt) {
                this.set(String(vname), $JMVC.controllers[$JMVC.c].get(vname) || alt || 'unset');
                // allow chain
                return this;
            };
            /*
             * [getFromUrl description]
             * @param {[type]} vname [description]
             * @param {[type]} alt   [description]
             */
            View.prototype.getFromUrl = function (vname) {
                return $JMVC.controllers[$JMVC.c].get(vname) || false;
            };
            // render the view parsing for variable&view placeholders
            /**
             * [render description]
             * @param  {[type]} pars [description]
             * @return {[type]}      [description]
             */
            View.prototype.render = function (pars) {
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
                    //
                    // for binding this context in the callback
                    that = this,
                    //
                    // the view content
                    cont = this.content,
                    //
                    // regexp for variables, do NOT use here new RegExp
                    pattvar = '\\$(.[^\\$\\s}]*)\\$',
                    //
                    // variables found
                    resvar,
                    //
                    // a loop temporary variable
                    t,
                    trg,
                    may_trg;
                //let pars be the callback function
                typeof pars === 'function' && (cback = pars);
                // look for / substitute  vars
                // in the view (these belongs to the view)
                //
                resvar = 1;
                while (resvar) {
                    resvar = new RegExp(pattvar, 'gm').exec(cont);
                    if (resvar) {
                        t = this.get(resvar[1]) || '';
                        cont = cont.replace('$' + resvar[1] + '$', t);
                    }
                }
                cont = Parser.parse(cont);
                this.content = cont;
                if (!$JMVC.loaded) {
                    //
                    // books rendering in body or elsewhere, on load
                    // @ @ //$JMVC.events.bind(W, 'load', function () {
                        //  
                        // call before render
                        $JMVC.events.startRender();
                        //
                        $JMVC.loaded = true;
                        may_trg = target ? $JMVC.dom.find(target) : false;
                        trg = may_trg || WD.body;
                        //
                        $JMVC.vars.rendertime = +new Date() - time_begin;
                        //
                        // before render
                        that.content = jmvc.hook_check('onBeforeRender', [that.content]) || that.content;
                        //
                        // render
                        $JMVC.dom.html(trg, that.content);
                        //
                        // may be a callback? 
                        cback && cback.apply(this, argz || []);
                        //
                        // after render
                        that.content = jmvc.hook_check('onAfterRender', [that.content]) || that.content;
                        // 
                        // trigger end of render queue
                        $JMVC.events.endRender();
                    // @ @ //});
                //
                // happend after load... so can render a view from a render cback 
                // of a main view
                } else {
                    may_trg = target ? $JMVC.dom.find(target) : false;
                    trg = may_trg || WD.body;
                    $JMVC.dom.html(trg, that.content);
                    cback && cback.apply(this, !!argz ? argz : []);
                }
                // allow chain
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
                        vname.hasOwnProperty(i) && (!this.vars[i] || vval || force) &&
                        (this.vars[i] = vname[i]);
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
                !!this.vars[n] && (this.vars[n] = null);
                return this;
            };
            /**
             * [clone description]
             * @param  {[type]} name [description]
             * @return {[type]}      [description]
             */
            View.prototype.clone  = function (name) {
                var ret = false;
                if (typeof name !== 'undefined') {
                    $JMVC.views[name] = new View(this.ocontent);
                    ret = $JMVC.views[name];
                } else {
                    ret = new View(this.ocontest);
                }
                return ret;
            };
            //-----------------------------------------------------------------------------
            /*
            [MALTA] /src/core/dispatched.js
            */
            /*--------
            DISPATCHED
            --------*/
            
            // Dispatch url getting controller, action and parameters
            //          
            dispatched = (function () {
                var mid = {
                        url : WDL.protocol + US + US + WDL.hostname + WDL.pathname + WDL.search,
                        proto : WDL.protocol,
                        host : WDL.hostname,
                        path : WDL.pathname,
                        search : WDL.search,
                        hash : WDL.hash.substr(1),
                        port : WDL.port ? ':' + WDL.port : ''
                    },
                    //
                    // adjust extensions
                    els = mid.path.replace(new RegExp('\\.' + URL_ALLOWED_EXTENSIONS.join('|\\.'), 'gm'), '').substr(1).split(US),
                    controller = false,
                    controller_prepath = '',
                    controller_prepath_parts = [],
                    action = false,
                    params = {},
                    lab_val,
                    i,
                    len = 0,
                    baseurl = WDL.protocol + US + US + WDL.hostname;
                // maybe is the case to load testsuite
                els[0].match(/test_/) && Modules.push('testsuite');
            
                //
                controller = els.shift() || JMVC_DEFAULT.controller;
                //
                // check extrapath for controller
                if (!!controller.match(/_/)) {
                    controller_prepath_parts = controller.split('_');
                    controller = controller_prepath_parts.pop();
                    controller_prepath = controller_prepath_parts.join(US) + US;
                }
                //
                action = els.shift() || JMVC_DEFAULT.action;
                len = els.length;
                //
                // now if els has non zero size, these are extra path params
                for (i = 0; i + 1 < len; i += 2) {
                    params[els[i]] = els[i + 1];
                }
                //
                // even hash for GET params
                if (mid.search !== '') {
                    // splitting an empty string give an array with one empty string
                    els = mid.search.substr(1).split('&');
            
                    for (i = 0, len = els.length; i < len; i += 1) {
                        lab_val = els[i].split('=');
                        // do not override extra path params
                        !params[lab_val[0]] && (params[lab_val[0]] = lab_val[1]);
                    }
                }
                //
                return {
                    controller : controller.replace(/\//g, ''),
                    controller_prepath : controller_prepath,
                    action : action.replace(/\//g, ''),
                    params : params,
                    baseurl : baseurl,
                    port : mid.port,
                    search : mid.search,
                    hash : mid.hash
                };
            })();
            //-----------------------------------------------------------------------------
            /*
            [MALTA] /src/core/outerjmvc.js
            */
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
                parselang : jmvc.parselang,
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
                htmlchars : jmvc.htmlchars,
                htmlchars_decode : jmvc.htmlchars_decode,
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
                    if (!('core/console' in $JMVC.extensions)) {
                        $JMVC.require('core/console/console');
                    }
                    JMVC.console.toggle(opts.h, opts.j, opts.c, opts.tab);
                },
                /**
                 * [xdoc description]
                 * @param  {[type]} ext [description]
                 * @return {[type]}     [description]
                 */
                xdoc : function (ext) {
                    !('elements' in JMVC.xdoc) && (JMVC.xdoc.elements = {});
                    !('core/xdoc/xdoc' in $JMVC.extensions) && $JMVC.require('core/xdoc/xdoc');
                    if (!(ext in JMVC.xdoc.elements)) {
                        try {
                            JMVC.io.ajcall(
                                JMVC.vars.baseurl + '/app/extensions/' + ext + '/xdoc.xml', {
                                    method : 'GET',
                                    type : 'xml',
                                    cback : function (doc) {
                                        JMVC.xdoc.elements[ext] = doc;
                                        //JMVC.debug('doc : ' + doc);
                                    },
                                    error : function () {alert('errore'); }
                                }
                            );
                        } catch (e) {}
                    }
                    JMVC.xdoc.toggle(ext);
                },
                //
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
            /*
            [MALTA] /src/core/cleanup.js
            */
            // $JMVC is DONE, clean up
            $JMVC.gc(
                DEV_URL,
                PROD_URL,
                URL_ALLOWED_EXTENSIONS,
                JMVC_VERSION,
                JMVC_REVIEW,
                dispatched,
                Controller, Model, View,
                Event, Modules,
                JMVC_DEFAULT,
                time_begin
            );
            //-----------------------------------------------------------------------------
            /*
            [MALTA] /src/core/end.js
            */
            return $JMVC;
        })(),
        //
        // private ns for modules
        _ = {};
    //
    // mandatory modules
    /*
    [MALTA] /src/modules/io.js
    */
    /*-------------
    AJAX sub-module
    -------------*/
    // private section
    _.io = {
        /**
         * Façade for getting the xhr object
         * @return {object} the xhr
         */
        getxhr : function () {
            JMVC.io.xhrcount += 1;
            var xhr,
                IEfuckIds = ['Msxml2.XMLHTTP', 'Msxml3.XMLHTTP', 'Microsoft.XMLHTTP'],
                len = IEfuckIds.length,
                i = 0;
            try {
                xhr = new W.XMLHttpRequest();
            } catch (e1) {
                for (null; i < len; i += 1) {
                    try {
                        xhr = new W.ActiveXObject(IEfuckIds[i]);
                    } catch (e2) {continue; }
                }
                !xhr && JMVC.debug('No way to initialize XHR');
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
        ajcall : function (uri, options) {
            var xhr = _.io.getxhr(),
                method = (options && options.method) || 'POST',
                cback = options && options.cback,
                cb_opened = (options && options.opened) || function () {},
                cb_loading = (options && options.loading) || function () {},
                cb_error = (options && options.error) || function () {},
                cb_abort = (options && options.abort) || function () {},
                sync = options && options.sync,
                data = (options && options.data) || false,
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
            data = JMVC.object.toQs(data).substr(1);
            xhr.onreadystatechange = function () {
                var tmp;
                if (state === xhr.readyState) {
                    return false;
                }
                state = xhr.readyState;
                if (xhr.readyState === 'complete' || (xhr.readyState === 4 && xhr.status === 200)) {
                    complete = true;
                    if (cback) {
                        res = xhr[targetType];
                        (function () {cback(res); })(res);
                    }
                    ret = xhr[targetType];
                    //IE leak ?????
                    W.setTimeout(function () {
                        JMVC.io.xhrcount -= 1;
                        //JMVC.purge(xhr);
                    }, 50);
                    return ret;
                } else if (xhr.readyState === 3) {
                    //loading data
                    cb_loading(xhr);
                } else if (xhr.readyState === 2) {
                    //headers received
                    cb_opened(xhr);
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
                                xml : 'text/xml',
                                html : 'text/html',
                                json : 'application/json'
                            }[type] || 'text/html';
    
                            xhr.setRequestHeader('Accept', tmp + '; charset=utf-8');
                            xhr.send(null);
                        } catch (e2) {}
                        break;
                    default :
                        alert(method);
                        xhr.send(null);
                        break;
                    }
                }
                return true;
            };
            xhr.onerror = function () {
                cb_error && cb_error.apply(null, arguments);
            };
            xhr.onabort = function () {
                cb_abort && cb_abort.apply(null, arguments);
            };
            //open request
            xhr.open(method, (method === 'GET') ? (uri + ((data) ? '?' + data: '')) : uri, sync);
            //thread abortion
            W.setTimeout(function () {
                if (!complete) {
                    complete = true;
                    xhr.abort();
                }
            }, timeout);
            try {
                return (targetType === 'responseXML') ? xhr[targetType].childNodes[0] : xhr[targetType];
            } catch (e3) {}
            return true;
        }
    };
    //
    // public section
    JMVC.io = {
        xhrcount : 0,
        getxhr : _.io.getxhr,
        /**
         * [ description]
         * @param  {[type]} uri   [description]
         * @param  {[type]} cback [description]
         * @param  {[type]} sync  [description]
         * @param  {[type]} data  [description]
         * @param  {[type]} cache [description]
         * @return {[type]}       [description]
         */
        post : function (uri, cback, sync, data, cache, err) {
            return _.io.ajcall(uri, {
                cback : cback,
                method : 'POST',
                sync : sync,
                data : data,
                cache : cache,
                error: err
            });
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
        get : function (uri, cback, sync, data, cache, err) {
            return _.io.ajcall(uri, {
                cback : cback || function () {},
                method : 'GET',
                sync : sync,
                data : data,
                cache : cache,
                error : err
            });
        },
        /**
         * [delete description]
         * @param  {[type]} uri   [description]
         * @param  {[type]} cback [description]
         * @param  {[type]} sync  [description]
         * @param  {[type]} data  [description]
         * @param  {[type]} cache [description]
         * @param  {[type]} err   [description]
         * @return {[type]}       [description]
         */
        'delete' : function (uri, cback, sync, data, cache, err) {
            return _.io.ajcall(uri, {
                cback : cback || function () {},
                method : 'DELETE',
                sync : sync,
                data : data,
                cache : cache,
                error : err
            });
        },
        /**
         * [ description]
         * @param  {[type]} uri   [description]
         * @param  {[type]} cback [description]
         * @param  {[type]} data  [description]
         * @return {[type]}       [description]
         */
        getJson : function (uri, cback, data) {
            return _.io.ajcall(uri, {
                type : 'json',
                method: 'GET',
                sync : false,
                cback : function (r) {
                    var j = (W.JSON && W.JSON.parse) ? JSON.parse(r) : JMVC.jeval('(' + r + ')');
                    cback(j);
                },
                data : data
            });
        },
        /**
         * [ description]
         * @param  {[type]} uri   [description]
         * @param  {[type]} cback [description]
         * @return {[type]}       [description]
         */
        getXML : function (uri, cback) {
            return _.io.ajcall(uri, {
                method : 'GET',
                sync : false,
                type : 'xml',
                cback : cback || function () {}
            });
        }
    };
    //-----------------------------------------------------------------------------
    /*
    [MALTA] /src/modules/util.js
    */
    /*-------------
    UTIL sub-module
    -------------*/
    /**
     * private section
     * @type {Object}
     */
    _.util = {};
    /**
     * public section
     * @type {Object}
     */
    JMVC.util = {
        /**
         * [ description]
         * @param  {[type]} d [description]
         * @return {[type]}   [description]
         */
        deg2rad : function (d) {return JMVC.M.PI * d / 180; },
        /**
         * [getLink description]
         * @param  {[type]} cnt  [description]
         * @param  {[type]} act  [description]
         * @param  {[type]} prms [description]
         * @return {[type]}      [description]
         */
        getLink : function (cnt, act, prms) {
            var path = [];
            if (cnt) {path.push(cnt); }
            if (act) {path.push(act); }
            if (prms) {path.push(prms); }
            return JMVC.vars.baseurl + JMVC.US + path.join(JMVC.US);
        },
        /**
         * [ description]
         * @param  {[type]} scriptname [description]
         * @return {[type]}            [description]
         */
        getParameters : function (scriptid, pname) {
            var script = document.getElementById(scriptid),
                p = false,
                parameters = false;
            pname = pname || 'data-params';
            p = script.getAttribute(pname);
            parameters = p ? eval('(' + p + ')') : {};
            return parameters;
        },
        //http://stackoverflow.com/questions/7390426/better-way-to-get-type-of-a-javascript-variable
        /**
         * [ description]
         * @param  {[type]} o [description]
         * @return {[type]}   [description]
         */
        getType : function (o) {
            return ({}).toString.call(o).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
        },
        /**
         * [ description]
         * @param  {[type]} hex [description]
         * @return {[type]}     [description]
         */
        hex2int : function (hex) {
            return parseInt(hex, 16);
        },
        /**
         * [ description]
         * @param  {[type]} i [description]
         * @return {[type]}   [description]
         */
        int2hex : function (i) {
            return parseInt(i, 10).toString(16);
        },
        /**
         * [ description]
         * @param  {[type]} o [description]
         * @return {[type]}   [description]
         */
        isArray : function (o) {
            var y = Array.isArray && Array.isArray(o), t1, t2;
            if (y) {return true; }
            t1 = String(o) !== o;
            t2 = {}.toString.call(o).match(/\[object\sArray\]/);
            return t1 && !!(t2 && t2.length);
        },
        /**
         * [isFunction description]
         * @param  {[type]}  f [description]
         * @return {Boolean}   [description]
         */
        isFunction : function (f) {
            return typeof f === 'function';
        },
        /**
         * [ description]
         * @param  {[type]} o [description]
         * @return {[type]}   [description]
         */
        isObject : function (o) {
            var t1 = String(o) !== o,
                t2 = {}.toString.call(o).match(/\[object\sObject\]/);
            return t1 && !!(t2 && t2.length);
        },
        /**
         * [ description]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        isSet : function (e) {
            return typeof e !== 'undefined';
        },
        /**
         * [ description]
         * @param  {[type]} el   [description]
         * @param  {[type]} type [description]
         * @return {[type]}      [description]
         */
        isTypeOf : function (el, type) {
            return typeof el === type;
        },
        /**
         * [ description]
         * @param  {[type]} ) {return      +new Date( [description]
         * @return {[type]}   [description]
         */
        now : function () {
            return +new Date();
        },
        /**
         * [ description]
         * @param  {[type]} min  [description]
         * @param  {[type]} max) {return      min + ~~(JMVC.M.random() * (max - min + 1) [description]
         * @return {[type]}      [description]
         */
        rand : function (min, max) {
            return min + ~~(JMVC.M.random() * (max - min + 1));
        },
        /**
         * [ description]
         * @param  {[type]} r [description]
         * @return {[type]}   [description]
         */
        rad2deg : function (r) {
            return 180 * r / JMVC.M.PI;
        },
        /**
         * [ description]
         * @param  {[type]} start [description]
         * @param  {[type]} end   [description]
         * @return {[type]}       [description]
         */
        range : function (start, end) {
            if (start > end) {
                throw new JMVC.Errors.BadParams('ERROR: JMVC.util.range function #badparams (' + start + ', ' + end + ')');
            }
            var ret = [];
            while (end - start + 1) {
                ret.push((start += 1) - 1);
            }
            return ret;
        },
        /**
         * [description]
         * @return {[type]} [description]
         */
        uniqueid : new function () {
            var count = 0,
                self = this;
            this.prefix = 'JMVCID';
            this.toString = function () {
                ++count;
                return  self.prefix + count;
            };
        }
    };
    //-----------------------------------------------------------------------------
    /*
    [MALTA] /src/modules/dom.js
    */
    /*------------
    DOM sub-module
    ------------*/
    // private section
    _.dom = {
        qsall : function (a) {
            return ('querySelectorAll' in JMVC.WD) ? JMVC.WD.querySelectorAll(a) : false;
        },
        nodeidMap : {},
        nodeAttrForIndex : '__ownid__'
    };
    
    // public section
    JMVC.dom = {
        /**
         * [ description]
         * @param  {[type]} where [description]
         * @param  {[type]} tag   [description]
         * @param  {[type]} attrs [description]
         * @param  {[type]} inner [description]
         * @return {[type]}       [description]
         */
        add : function (where, tag, attrs, inner) {
            var n = this.create(tag, attrs, inner);
            this.append(where, n);
            return n;
        },
        /**
         * [ description]
         * @param  {[type]} elem        [description]
         * @param  {[type]} addingClass [description]
         * @return {[type]}             [description]
         */
        addClass : function (elem, addingClass) {
            if (JMVC.util.isArray(elem)) {
                for (var i = 0, l = elem.length; i < l; i++) {
                    JMVC.dom.addClass(elem[i], addingClass);
                }
                return;
            }
            var cls = !!(elem.className) ? elem.className.split(' ') : [];
            if (JMVC.array.find(cls, addingClass) < 0) {
                cls.push(addingClass);
                elem.className = cls.join(' ');
            }
        },
        /**
         * [ description]
         * @param  {[type]} where [description]
         * @param  {[type]} what  [description]
         * @return {[type]}       [description]
         */
        append : function (where, what) {
            if (JMVC.util.isArray(what)) {
                for (var i = 0, l = what.length; i < l; i++) {
                    where.appendChild(what[i]);
                }
            } else {
                where.appendChild(what);
            }
            return where;
        },
        /**
         * [ description]
         * @param  {[type]} elem  [description]
         * @param  {[type]} name  [description]
         * @param  {[type]} value [description]
         * @return {[type]}       [description]
         */
        attr : function (elem, name, value) {
            if (!elem) {
                return '';
            }
            if (!('nodeType' in elem)) {
                return false;
            }
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return undefined;
            }
    
            var attrs = false,
                l = false,
                i = 0,
                result,
                is_obj = false;
    
            is_obj = JMVC.util.isObject(name);
            
            if (is_obj && elem.setAttribute) {
                for (i in name) {
                    elem.setAttribute(i, name[i]);
                }
                return true;
            }
            //
            // Make sure that avalid name was provided, here cannot be an object
            if (!name || name.constructor !== String) {
                return '';
            }
            //
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
         * @return {[type]} [description]
         */
        body : function () {
            return WD.body;
        },
        /**
         * [childs description]
         * @param  {[type]} node [description]
         * @return {[type]}      [description]
         */
        childs : function (node) {
            return node.childNodes;
        },
        /**
         * returns a crearer node
         * @return {[type]} [description]
         */
        clearer : function () {
            return this.create('br', {'class': 'clearer'});
        },
        /**
         * [ description]
         * @param  {[type]} n    [description]
         * @param  {[type]} deep [description]
         * @return {[type]}      [description]
         */
        clone : function (n, deep) {
            return n.cloneNode(!!deep);
        },
        /**
         * [ description]
         * @param  {[type]} tag   [description]
         * @param  {[type]} attrs [description]
         * @param  {[type]} inner [description]
         * @return {[type]}       [description]
         */
        create : function (tag, attrs, inner) {
            if (!tag) {W.alert('no tag'); return false; }
            var node = JMVC.WD.createElement(tag),
                att;
            attrs = attrs || {};
            for (att in attrs) {
                attrs.hasOwnProperty(att) && node.setAttribute(String(att), String(attrs[att]));
            }
            if (typeof inner !== 'undefined') {
                if (inner.nodeType && inner.nodeType === 1) {
                //if (Object.prototype.hasOwnProperty.call(inner, 'nodeType') && inner.nodeType === 1) {
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
        createText : function (text) {
            return JMVC.WD.createTextNode(text);
        },
        /**
         * [ description]
         * @param  {[type]} ns   [description]
         * @param  {[type]} name [description]
         * @return {[type]}      [description]
         */
        createNS : function (ns, name) {
            return JMVC.WD.createElementNS(ns, name);
        },
        /**
         * [ description]
         * @param  {[type]} el [description]
         * @return {[type]}    [description]
         */
        empty : function (el) {
            el.innerHTML = '';
        },
        /**
         * [ description]
         * @param  {[type]} a [description]
         * @param  {[type]} b [description]
         * @return {[type]}   [description]
         */
        find : function (a, b) {
            var sel = 'getElement',
                toArr = true,
                ret = false,
                isArr = false;
            if (a.nodeType === 1) {
                return a;
            }
            if (!ret) {
                //look for no word before something consistent
                a = a.match(/^(\W)?([A-z0-9-_]*)/);
                switch (a[1] || '=') {
                case '#':
                    sel += 'ById';
                    toArr = false;
                    break;
                case '.':
                    sel += 'sByClassName';
                    break;
                case '@':
                    sel += 'sByName';
                    break;
                case '=':
                    sel += 'sByTagName';
                    break;
                default:
                    return [];
                }
                ret = (b || JMVC.WD)[sel](a[2]);
            }
            ret = toArr ? JMVC.array.coll2array(ret) : ret;
            isArr = ret instanceof Array;
            return (isArr && ret.length === 1) ? ret[0] : ret;
        },
        find2 : function (a, b) {
            if (a.nodeType === 1) {return a; }
            var sel = 'getElement',
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
            return ret instanceof Array ?  (ret.length === 1 ? ret[0] :  ret) : ret;
        },
        /**
         * [ description]
         * @param  {[type]} ctx   [description]
         * @param  {[type]} cname [description]
         * @return {[type]}       [description]
         */
        findInnerByClass : function (ctx, cname) {
            var a = [],
                re = new RegExp('\\b' + cname + '\\b'),
                els = ctx.getElementsByTagName('*'),
                i = 0,
                l = els.length;
            for (null; i < l; i += 1) {
                re.test(els[i].className) && a.push(els[i]);
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
        findByAttribute : function (attr, value, root) {
            var ret = [],
                whole = [],
                val,
                tof = (value === undefined),
                isRootArray = root instanceof Array,
                i;
            root = isRootArray ? root : root || JMVC.WD.body;
            whole = isRootArray ? root : root.all ? root.all : root.getElementsByTagName('*');
            for (i = whole.length; i--;) {
                val = whole[i].getAttribute(attr);
                if (typeof val === 'string' && (tof || val === value)) {
                    ret.push(whole[i]);
                }
            }
            return ret;
        },
        /**
         * [firstAncestor description]
         * @param  {[type]} el      [description]
         * @param  {[type]} tagName [description]
         * @return {[type]}         [description]
         */
        firstAncestor : function (el, tagName) {
            do {
                el = el.parentNode;
            }
            while (el && el.tagName !== tagName.toUpperCase());
            return el;
        },
        /**
         * [getPosition description]
         * @param  {[type]} node [description]
         * @return {[type]}      [description]
         */
        getPosition : function (node) {
            var res = {x : 0, y : 0};
            if (node.offsetParent) {
                while (1) {
                    res.x += node.offsetLeft;
                    res.y += node.offsetTop;
                    if (!node.offsetParent) {break; }
                    node = node.offsetParent;
                }
            } else {
                node.x && (res.x += node.x);
                node.y && (res.y += node.y);
            }
            return res;
        },
        /**
         * [ description]
         * @param  {[type]} el   [description]
         * @param  {[type]} name [description]
         * @return {[type]}      [description]
         */
        hasAttribute : function (el, name) {
            return el.getAttribute(name) !== null;
        },
        /**
         * [ description]
         * @param  {[type]} el        [description]
         * @param  {[type]} classname [description]
         * @return {[type]}           [description]
         */
        hasClass : function (el, classname) {
            return el.className.match(new RegExp('(\\s|^)' + classname + '(\\s|$)'));
        },
        /**
         * [ description]
         * @param  {[type]} el   [description]
         * @param  {[type]} html [description]
         * @return {[type]}      [description]
         */
        html : function (el, html) {
            if (!el) {
                return this;
            }
            var t = '';
            if (typeof html !== 'undefined') {
                if (el) {
                    try {
                        if (this.isElement(html)) {
                            this.empty(el);
                            this.append(el, html);
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
        /**
         * [idize description]
         * @param  {[type]} el   [description]
         * @param  {[type]} prop [description]
         * @return {[type]}      [description]
         */
        idize : function (el, prop) {
            prop = prop || _.dom.nodeAttrForIndex;
            //if (!el.hasOwnProperty(prop)) {
            if (!(prop in el)) {
                var nid = JMVC.util.uniqueid + '';
                el[prop] = nid;
                //save inverse
                _.dom.nodeidMap[nid] = el;
            }
            return el[prop];
        },
        /**
         * [ description]
         * @param  {[type]} node          [description]
         * @param  {[type]} referenceNode [description]
         * @return {[type]}               [description]
         */
        insertAfter : function (node, referenceNode) {
            var p = referenceNode.parentNode;
            p.insertBefore(node, referenceNode.nextSibling);
            return node;
        },
        /**
         * [ description]
         * @param  {[type]} node          [description]
         * @param  {[type]} referenceNode [description]
         * @return {[type]}               [description]
         */
        insertBefore : function (node, referenceNode) {
            var p = referenceNode.parentNode;
            p.insertBefore(node, referenceNode);
            return node;
        },
        //Returns true if it is a DOM element    
        /**
         * [ description]
         * @param  {[type]} o [description]
         * @return {[type]}   [description]
         */
        isElement : function (o) {
            return (
                typeof HTMLElement === 'object' ?
                    o instanceof HTMLElement
                : //DOM2
                    o && typeof o === 'object' &&
                    typeof o.nodeType !== undefined && o.nodeType === 1 &&
                    typeof o.nodeName === 'string'
            );
        },
        /**
         * [isNodeList description]
         * @param  {[type]}  el [description]
         * @return {Boolean}    [description]
         */
        isNodeList : function (el) {
            return !('value' in el)
            && (typeof el.length == 'number')
            && (typeof el.item == 'function');
        },
        //thx to http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
        //for the following 2 mthds
        //Returns true if it is a DOM node
        /**
         * [ description]
         * @param  {[type]} o [description]
         * @return {[type]}   [description]
         */
        isNode : function (o) {
            return (
                typeof Node === 'object' ? o instanceof Node
                :
                o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string'
            );
        },
        nodeFromId : function (id) {
            return _.dom.nodeidMap[id];
        },
        /**
         * [ description]
         * @param  {[type]} node [description]
         * @return {[type]}      [description]
         */
        nodeTypeString : function (node) {
            return ['ELEMENT_NODE', 'ATTRIBUTE_NODE', 'TEXT_NODE', 'CDATA_SECTION_NODE',
                'ENTITY_REFERENCE_NODE', 'ENTITY_NODE', 'PROCESSING_INSTRUCTION_NODE', 'COMMENT_NODE',
                'DOCUMENT_NODE', 'DOCUMENT_TYPE_NODE', 'DOCUMENT_FRAGMENT_NODE', 'NOTATION_NODE'
            ][node.nodeType - 1] || undefined;
        },
        /**
         * [ description]
         * @param  {[type]} node  [description]
         * @param  {[type]} num   [description]
         * @param  {[type]} types [description]
         * @return {[type]}       [description]
         */
        nthchild : function (node, num, types) {
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
                if (JMVC.array.find(type2consider, this.nodeTypeString(childs[i]))) {
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
         * @param  {[type]} src [description]
         * @return {[type]}     [description]
         */
        preloadImage : function (src, fn) {
            var i = new W.Image();
            typeof fn === 'function' && (i.onload = fn(i));
            i.src = src;
            return i;
        },
        /**
         * [ description]
         * @param  {[type]} node [description]
         * @return {[type]}      [description]
         */
        parent : function (node) {
            return (node.parentNode && node.parentNode.nodeType !== 11) ?
                node.parentNode : false;
        },
        /**
         * [ description]
         * @param  {[type]} where [description]
         * @param  {[type]} what  [description]
         * @return {[type]}       [description]
         */
        prepend : function (where, what) {
            var c = where.childNodes[0];
            where.insertBefore(what, c);
            return what;
        },
        /**
         * [ description]
         * @param  {[type]} el [description]
         * @return {[type]}    [description]
         */
        remove : function (el, afterFreeMem) {
            if (!el) {
                return false;
            }
    
            afterFreeMem && JMVC.events.free(el);
    
            var parent;
            typeof el === 'string' && (el = this.find(el));
    
            if (JMVC.util.isArray(el)) {
                for (var i  = 0, l = el.length; i < l; i++) {
                    this.remove(el[i]);
                }
                return true;
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
        removeAttribute : function (el, valore) {
            el.removeAttribute(valore);
            return el;
        },
        /**
         * [ description]
         * @param  {[type]} el  [description]
         * @param  {[type]} cls [description]
         * @return {[type]}     [description]
         */
        removeClass : function (el, cls) {
            var i,
                l;
            if (JMVC.util.isArray(el)) {
                for (i = 0, l = el.length; i < l; i++) {
                    JMVC.dom.removeClass(el[i], cls);
                }
                return;
            }
            if (JMVC.util.isArray(cls)) {
                for (i = 0, l = cls.length; i < l; i++) {
                    JMVC.dom.removeClass(el, cls[i]);
                }
                return;
            }
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            el.className = el.className.replace(reg, ' ');
            return this;
        },
        swap : function (going, coming) {
            var display = coming.style.display;
            coming.style.display = 'none';
            this.insertAfter(coming, going);
            this.remove(going) && (coming.style.display = display);
        },
        /**
         * [ description]
         * @param  {[type]} el       [description]
         * @param  {[type]} oldclass [description]
         * @param  {[type]} newclass [description]
         * @return {[type]}          [description]
         */
        switchClass : function (el, oldclass, newclass) {
            if (this.hasClass(el, oldclass)) {
                this.removeClass(el, oldclass);
                !this.hasClass(el, newclass) && this.addClass(el, newclass);
            }
            return el;
        },
        /**
         * [toggleClass description]
         * @param  {[type]} el  [description]
         * @param  {[type]} cls [description]
         * @return {[type]}     [description]
         */
        toggleClass : function (el, cls) {
            this[this.hasClass(el, cls) ? 'removeClass' : 'addClass'](el, cls);
        },
        /**
         * [ description]
         * @param  {[type]} el [description]
         * @return {[type]}    [description]
         */
        val : function (el) {
            return el.value;
        },
        /**
         * :D :D :D 
         * from http://stackoverflow.com/questions/6969604/recursion-down-dom-tree
         * @param  {[type]} node [description]
         * @param  {[type]} func [description]
         * @return {[type]}      [description]
         */
        walk : function (node, func) {
            func(node);                     //What does this do?
            node = node.firstChild;
            while (node) {
                this.walk(node, func);
                node = node.nextSibling;
            }
        }
    };
    //-----------------------------------------------------------------------------
    /*
    [MALTA] /src/modules/bom.js
    */
    _.bom = {
    
    };
    JMVC.bom = {
        'document' : JMVC.WD,
        'frames' : JMVC.W.frames,
        'history' : JMVC.W.history,
        'location' : JMVC.W.location,
        'navigator' : JMVC.W.navigator
    };
    /*
    [MALTA] /src/modules/events.js
    */
    /*--------------
    EVENT sub-module
    --------------*/
    // private section
    _.events = {
        /**
         * storage literal to speed up unbinding
         * @type {Object}
         */
        bindings : {},
        /**
         * store wrapped callbacks
         * @type {Array}
         */
        cbs : [],
        /**
         * wired function queue fired 
         * at the beginning of render function
         * @type {Array}
         */
        Estart : [],
        /**
         * wired function queue fired 
         * at the end of render function
         * @type {Array}
         */
        Eend : [],
        /**
         * map used to get back a node from an id
         * @type {Object}
         */
        //nodeidMap : {},
        disabledRightClick : false,
        /**
         * bind exactly one domnode event to a function
         * @param  {DOM node}   el the dom node where the event must be attached
         * @param  {String}   evnt the event 
         * @param  {Function} cb   the callback executed when event is fired on node
         * @return {undefined}
         */
        bind : (function () {
            var fn;
    
            function store(el, evnt, cb) {
    
                var nid = JMVC.dom.idize(el);// _.events.nodeid(el);
                !(evnt in _.events.bindings) && (_.events.bindings[evnt] = {});
    
                !(nid in _.events.bindings[evnt]) && (_.events.bindings[evnt][nid] = []);
                //store for unbinding
                _.events.bindings[evnt][nid].push(cb);
                return true;
            }
            if ('addEventListener' in W) {
                fn = function (el, evnt, cb) {
                    // cb = _.events.fixCurrentTarget(cb, el);
                    el.addEventListener.apply(el, [evnt, cb, false]);
                    store(el, evnt, cb);
                };
            } else if ('attachEvent' in W) {
                fn = function (el, evnt, cb) {
                    // cb = _.events.fixCurrentTarget(cb, el);
                    el.attachEvent.apply(el, ['on' + evnt, cb]);
                    store(el, evnt, cb);
                };
            } else {
                fn = function () {
                    throw new Error('No straight way to bind an event');
                };
            }
            return fn;
        })(),
    
        /**
         * [fixCurrentTarget description]
         * @return {[type]} [description]
         */
        fixCurrentTarget : function (f, el) {
            var wrapf = function (e) {
                    // currentTarget (the node where binding has been done) is the core of
                    // event delegation
                    // it would be nice to fix currentTarget
                    // leak in (fuckin)IE7 and (fuckin)IE8
                    // with something like
                    // e.currentTarget || (e.currentTarget = el);
                    //
                    // a bad WORKING workaround is to pass the current target
                    // to the
                    // callback as second parameter and let it to be the context 
                    return f.call(el, e, el);
                },
                i = JMVC.array.find(_.events.cbs, wrapf);
            if (i > -1) {
                return _.events.cbs[i];
            } else {
                _.events.cbs.push(wrapf);
            }
            return wrapf;
        },
        /**
         * unbind the passed cb or all function 
         * binded to a node-event pair 
         * 
         * @param  {DOM node}   el   the node 
         * @param  {String}   tipo   the event
         * @param  {Function|undefined} cb the function that must be unbinded
         *                                 if not passed all functions attached
         *                                 will be unattached
         * @return {boolean}    whether the unbinding succeded
         */
        
        unbind : function (el, evnt, cb) {
            function unstore(evnt, nodeid, index) {
                Array.prototype.splice.call(_.events.bindings[evnt][nodeid], index, 1);
            }
    
            //cb && (cb = this.fixCurrentTarget(cb, el));
    
            var nodeid = JMVC.dom.idize(el),//_.events.nodeid(el),
                index, tmp, l;
            try {
                tmp = _.events.bindings[evnt][nodeid];
            } catch (e) {
                //JMVC.debug(evnt + ': binding not found');
                return false;
            }
    
            //
            //  loop if a function is not given
            if (typeof cb === 'undefined') {
                tmp = _.events.bindings[evnt][nodeid];
                if (!tmp) {return false; }
                l = tmp.length;
                /*the element will be removed at the end of the real unbind*/
                while (l--) {
                    _.events.unbind(el, evnt, tmp[l]);
                }
                return true;
            }
            
            JMVC.W.exp = _.events.bindings;
            index = JMVC.array.find(_.events.bindings[evnt][nodeid], cb);
            
    
            if (index === -1) {
                return false;
            }
            
    
            if (el.removeEventListener) {
                el.removeEventListener(evnt, cb, false);
            } else if (el.detachEvent) {
                el.detachEvent('on' + evnt, cb);
            }
    
            //remove it from private bindings register
            unstore(evnt, nodeid, index);
            return true;
        }
    };
    //
    // PUBLIC section
    JMVC.events = {
        /**
         * [ description]
         * @param  {[type]}   el   [description]
         * @param  {[type]}   tipo [description]
         * @param  {Function} fn   [description]
         * @return {[type]}        [description]
         */
        bind : function (el, tipo, fn) {
            var res = true;
            if (el instanceof Array) {
                for (var i = 0, l = el.length; i < l; i++) {
                    res = res & _.events.bind(el[i], tipo, fn);
                    //res = res & _.events.bind(el[i], tipo, _.events.fixCurrentTarget(fn, el[i]));
                }
                return res;
            }
            return _.events.bind(el, tipo, fn);
            //return _.events.bind(el, tipo, _.events.fixCurrentTarget(fn, el));
        },
        /**
         * [code description]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        code : function (e) {
            if (e.keyCode) {
                return e.keyCode;
            } else if (e.charCode) {
                return e.charCode;
            } else if (e.which) {
                return e.which;
            }
            return false;
        },
        /**
         * [ description]
         * @param  {[type]} f [description]
         * @param  {[type]} t [description]
         * @return {[type]}   [description]
         */
        delay : function (f, t) {
            W.setTimeout(f, t);
        },
        /**
         * [disableRightClick description]
         * @return {[type]} [description]
         */
        disableRightClick : function () {
            if (_.events.disabledRightClick) {return false; }
            _.events.disabledRightClick = true;
            var self = this;
            JMVC.dom.attr(JMVC.WD.body, 'oncontextmenu', 'return false');
            this.bind(JMVC.WD, 'mousedown', function (e) {
                if (~~(e.button) === 2) {
                    self.preventDefault(e);
                    return false;
                }
            });
        },
        /**
         * [ description]
         * @param  {[type]} f [description]
         * @return {[type]}   [description]
         */
        end : function (f) {
            _.events.Eend.push(f);
        },
        /**
         * [ description]
         * @return {[type]} [description]
         */
        endRender : function () {
            var i = 0,
                l = _.events.Eend.length;
            for (null; i < l; i += 1) {
                _.events.Eend[i]();
            }
        },
        /**
         * [eventTarget description]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        eventTarget : function (e) {
            e = e ? e : JMVC.W.event;
            var targetElement = e.currentTarget || (typeof e.target !== 'undefined') ? e.target : e.srcElement;
            if (!targetElement) {
                return false;
            }
    
            while (targetElement.nodeType === 3 && targetElement.parentNode !== null) {
                targetElement = targetElement.parentNode;
            }
            
            return targetElement;
        },
        /**
         * NOCROSS
         * @param  {[type]} el   [description]
         * @param  {[type]} evnt [description]
         * @return {[type]}      [description]
         */
        fire : function (el, evnt) {
            var evt = el[evnt];
            typeof evt === 'function' && (el[evnt]());
        },
        /**
         * [free description]
         * @param  {[type]} node [description]
         * @return {[type]}      [description]
         */
        free : function (node, evnt) {
            node = node || JMVC.WD;
            if (typeof evnt === 'undefined') {
                for (var j in _.events.bindings) {
                    this.free(node, j);
                }
                return true;
            }
            JMVC.dom.walk(node, function (n) {
                JMVC.events.unbind(n, evnt);
            });
        },
        /**
         * [ description]
         * @param  {[type]} el [description]
         * @param  {[type]} e  [description]
         * @return {[type]}    [description]
         */
        getCoord : function (el, e) {
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
         * @param  {[type]} ms [description]
         * @return {[type]}    [description]
         */
        loadify : function (ms) {
            var self = this;
            this.start(function () {
                //otherwise some browser hangs (opera)
                self.delay(function () {
                    WD.body.style.opacity = 0;
                    WD.body.style.filter = 'alpha(opacity=0)';
                }, 0);
            });
            this.end(function () {
                var i = 0,
                    step = 0.05,
                    top = 1,
                    to;
                while (i <= top) {
                    to = W.setTimeout(
                        function (j) {
                            WD.body.style.opacity = j;
                            WD.body.style.filter = 'alpha(opacity=' + (j * 100) + ')';
                            if (j >= top || isNaN(j)) {
                                WD.body.style.opacity = 1;
                                WD.body.style.filter = 'alpha(opacity=' + 100 + ')';
                                //W.clearTimeout(to);
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
         * @param  {[type]}   el   [description]
         * @param  {[type]}   tipo [description]
         * @param  {Function} fn   [description]
         * @return {[type]}        [description]
         */
        one : function (el, tipo, fn) {
            var self = this;
            if (el instanceof Array) {
                for (var i = 0, l = el.length; i < l; i ++) {
                    this.one(el[i], tipo, fn);
                }
                return;
            }
            this.bind(el, tipo, function f(e) {
                fn(e);
                self.unbind(el, tipo, f);
            });
        },
        /**
         * Very experimental function to bind a function to
         * a click triggered outside of a node tree 
         * @param  {[type]}   el [description]
         * @param  {Function} cb [description]
         * @return {[type]}      [description]
         * @sample http://www.jmvc.dev
         * || var tr = JMVC.dom.find('#extralogo');
         * || JMVC.events.clickout(tr, function (){console.debug('out')});
         */
        onEventOut : function (evnt, el, cb) {
            var self = this,
                root = JMVC.dom.body();
    
            this.bind(root, evnt, function f(e) {
                var trg = self.eventTarget(e);
                while (trg !== el) {
                    trg = JMVC.dom.parent(trg);
                    if (trg === root) {
                        self.unbind(root, evnt, f);
                        return cb();
                    }
                }
            });
        },
        /**
         * [onRight description]
         * @param  {[type]} el [description]
         * @param  {[type]} f  [description]
         * @return {[type]}    [description]
         */
        onRight : function (el, f) {
            this.disableRightClick();
            this.bind(el, 'mousedown', function (e) {
    
                if (~~(e.button) === 2) {
                    f.call(el, e);
                }
            });
        },
        /**
         * [ description]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        kill : function (e) {
            if (!e) {
                e = W.event;
                e.cancelBubble = true;
                e.returnValue = false;
            }
            'stopPropagation' in e && e.stopPropagation() && e.preventDefault();
            return false;
        },
        /**
         * [ description]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        preventDefault : function (e) {
            e = e || W.event;
    
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
        },
        /**
         * [ description]
         * @param  {[type]} func [description]
         * @return {[type]}      [description]
         */
        readyold : function (f) {
            // if called when the dom is already loaded
            // execute immediately
            if (JMVC.loaded) {
                return f.call();
            }
            if (WD.addEventListener) {
                return WD.addEventListener('DOMContentLoaded', f, false);
            } else if (W.addEventListener) {
                return W.addEventListener('load', f, false);
            } else if (WD.attachEvent) {
                return WD.attachEvent('onreadystatechange', f);
            } else if (W.attachEvent) {
                return W.attachEvent('onload', f);
            }
            return e;
        },
        ready : (function () {
            function may_go(f) {
                return JMVC.loaded ? f.call() : false;
            }
            if (WD.addEventListener) {
                return function (f) {
                    return may_go(f) || WD.addEventListener('DOMContentLoaded', f, false);
                };
            } else if (W.addEventListener) {
                return function (f) {
                    return may_go(f) || W.addEventListener('load', f, false);
                };
            } else if (WD.attachEvent) {
                return function (f) {
                    return may_go(f) || WD.attachEvent('onreadystatechange', f);
                };
            } else if (W.attachEvent) {
                return function (f) {
                    return may_go(f) || W.attachEvent('onload', f);
                };
            }
        })(),
        /**
         * [ description]
         * @param  {[type]} f [description]
         * @return {[type]}   [description]
         */
        start : function (f) {
            _.events.Estart.push(f);
        },
        /**
         * [ description]
         * @return {[type]} [description]
         */
        startRender : function () {
            var i = 0,
                l = _.events.Estart.length;
            for (null; i < l; i += 1) {
                _.events.Estart[i]();
            }
        },
        /**
         * [stopBubble description]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        stopBubble : function (e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            if (e.cancelBubble !== null) {
                e.cancelBubble = true;
            }
        },
        /**
         * [ description]
         * @param  {[type]} left [description]
         * @param  {[type]} top  [description]
         * @return {[type]}      [description]
         */
        scrollBy : function (left, top) {
            this.delay(function () {
                W.scrollBy(left, top);
            }, 1);
        },
        /**
         * [ description]
         * @param  {[type]} left [description]
         * @param  {[type]} top  [description]
         * @return {[type]}      [description]
         */
        scrollTo : function (left, top) {
            this.delay(function () {
                W.scrollTo(left, top);
            }, 1);
        },
        /**
         * [ description]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        touch : function (e) {
            var touches = [],
                i = 0,
                ect = e.touches,
                l = ect.length;
                
            for (null; i < l; i += 1) {
                touches.push({
                    x : ect[i].pageX,
                    y : ect[i].pageY
                });
            }
            return touches;
        },
        /**
         * [ description]
         * @param  {[type]} el   [description]
         * @param  {[type]} tipo [description]
         * @return {[type]}      [description]
         */
        unbind : function (el, tipo, fn) {
            //as for binding
            if (el instanceof Array) {
                for (var i = 0, l = el.length; i < l; i++) {
                    _.events.unbind(el[i], tipo, fn);
                }
                return;
            }
            _.events.unbind(el, tipo, fn);
        }
    };
    if (!Event.prototype.preventDefault) {
        Event.prototype.preventDefault = function() {
            this.returnValue = false;
        };
    }
    if (!Event.prototype.stopPropagation) {
        Event.prototype.stopPropagation = function() {
            this.cancelBubble = true;
        };
    }
    //-----------------------------------------------------------------------------
    // in home
    /*
    var el = JMVC.dom.find('#extralogo'),
        cb1 = function () {
            console.debug('1', arguments);
        },
        cb2 = function () {
            console.debug('2', arguments);
        },
        cb3 = function () {
            console.debug('3', arguments);
            console.debug(JMVC.dom.nodeFromId('JMVCID6'));
        };
    JMVC.events.free(el);
    JMVC.events.bind(el, 'click', cb1);
    JMVC.events.bind(el, 'click', cb2);
    JMVC.events.bind(el, 'mouseenter', cb3);
    JMVC.events.unbind(el, 'click', cb2);
    
    JMVC.events.free(JMVC.WD.body);
    
     */
    /*
    [MALTA] /src/modules/head.js
    */
    /*-------------
    HEAD sub-module
    -------------*/
    // private section
    _.head = {};
    // public section
    JMVC.head = {
        /**
         * 
         */
        element : WD.getElementsByTagName('head').item(0),
        /**
         * [ description]
         * @param  {[type]} src      [description]
         * @param  {[type]} parse    [description]
         * @param  {[type]} explicit [description]
         * @return {[type]}          [description]
         */
        addscript : function (src, parse, explicit) {
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
                    script = JMVC.dom.create('script', {type: 'text/javascript', defer: 'defer'}, script_content);
                    head = that.element;
                    head.appendChild(script);
                } else {
                    /* get css content, async */
                    tmp = JMVC.io.get(src, function (script_content) {
                        script_content = JMVC.parse(script_content, true);
                        script = JMVC.dom.create('script', {type: 'text/javascript', defer: 'defer'}, script_content);
                        head = that.element;
                        head.appendChild(script);
                    }, postmode, async);
                }
            } else {
                script = explicit ?
                    JMVC.dom.create('script', {type: 'text/javascript', defer: 'defer'}, src)
                    :
                    JMVC.dom.create('script', {type: 'text/javascript', defer: 'defer', src: src}, ' ');
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
        addstyle : function (src, parse, explicit, idn) {
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
    
                    head = that.element;
                    style = WD.createElement('style');
                    rules = WD.createTextNode(String(csscontent));
    
                    style.type = 'text/css';
                    if (style.styleSheet) {
                        style.styleSheet.cssText = rules.value;
                    } else {
                        style.appendChild(rules);
                    }
                    idn && JMVC.dom.attr(style, 'id', idn);
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
                        idn && JMVC.dom.attr(style, 'id', idn);
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
         * [denyiXrame description]
         * @return {[type]} [description]
         */
        denyiXrame : function () {
            return W.top !== W.self &&  (W.top.location = JMVC.vars.baseurl);
        },
        /**
         * [favicon description]
         * @param  {[type]} file [description]
         * @return {[type]}      [description]
         */
        favicon : function (file) {
            this.link('icon', {
                rel : 'shortcut icon',
                href : JMVC.vars.baseurl + file
            });
        },
        /**
         * [goto description]
         * @param  {[type]} cnt  [description]
         * @param  {[type]} act  [description]
         * @param  {[type]} prms [description]
         * @return {[type]}      [description]
         */
        'goto' : function (cnt, act, prms) {
            var path = [];
            cnt && path.push(cnt);
            act && path.push(act);
            prms && path.push(prms);
            
            WD.location.href = JMVC.vars.baseurl + JMVC.US + path.join(JMVC.US);
        },
        /**
         * [lastmodified description]
         * @param  {[type]} d [description]
         * @return {[type]}   [description]
         */
        lastmodified : function (d) {
            var meta = this.element.getElementsByTagName('meta'),
                newmeta = JMVC.dom.create(
                    'meta',
                    {'http-equiv': 'last-modified', 'content': (d || JMVC.vars.last_modified || new Date()).toString()}
                ),
                len = meta.length;
            if (len) {
                JMVC.dom.insertAfter(newmeta, meta.item(len - 1));
            } else {
                this.element.appendChild(newmeta);
            }
        },
        /**
         * [lib description]
         * @param  {[type]} l [description]
         * @return {[type]}   [description]
         */
        lib : function (l) {
            var libs = {
                jQuery : '//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js',
                jsapi : 'https://www.google.com/jsapi',
                underscore : 'http://underscorejs.org/underscore-min.js',
                'prototype' : 'https://ajax.googleapis.com/ajax/libs/prototype/1.7.0.0/prototype.js'
            };
            l in libs && this.addscript(libs[l]);
        },
        /**
         * [link description]
         * @param  {[type]} rel   [description]
         * @param  {[type]} attrs [description]
         * @return {[type]}       [description]
         */
        link : function (rel, attrs) {
            attrs.rel = rel;
            JMVC.dom.add(this.element, 'link', attrs);
        },
        /**
         * [meta description]
         * @param  {[type]} name    [description]
         * @param  {[type]} value   [description]
         * @param  {[type]} rewrite [description]
         * @return {[type]}         [description]
         */
        meta : function (name, value, rewrite) {
            rewrite = !!rewrite;
            var metas = this.metas(),
                maybeExisting = JMVC.dom.findByAttribute('name', name, metas);
            if (!!maybeExisting.length) {
                //exit if rewrite is not set and the meta name already exists
                if (!rewrite) {
                    return false;
                }
                JMVC.dom.remove(maybeExisting[0]);
            }
            //get last meta if exists
            var meta = this.element.getElementsByTagName('meta'),
                newmeta = JMVC.dom.create('meta', {'name' : name, 'content' : value}),
                len = meta.length;
            return len ? JMVC.dom.insertAfter(newmeta, meta.item(len - 1)) : this.element.appendChild(newmeta);
        },
        /**
         * return all document meta tags
         * @return {[type]} [description]
         */
        metas : function () {
            return JMVC.array.coll2array(JMVC.WD.getElementsByTagName('meta'));
        },
        /**
         * [ description]
         * @return {[type]} [description]
         */
        reload : function () {
            var n = JMVC.WD.location.href;
            WD.location.href = n;
            //that do not cause wierd IE alert
        },
        /**
         * [ description]
         * @param  {[type]} t [description]
         * @return {[type]}   [description]
         */
        title : function (t) {
            if (typeof t === 'undefined') {
                return WD.title;
            }
            WD.title = t;
            return WD.title;
        }
    };
    //-----------------------------------------------------------------------------
    /*
    [MALTA] /src/modules/css.js
    */
    _.css = {
        opera : navigator.userAgent.match(/opera\/([^\s]*)/i),
        mappedStyles : {},
        css2js_rule : function (s) {
            'use strict';
            return s[0] === '-' ? s : s.replace(/-(\w)/g, function (str, $1) {return $1.toUpperCase(); });
        }
    };
    /*,
    css_propertymap : {
    'background-attachment' : 'backgroundAttachment',
    'background-color' : 'backgroundColor',
    'background-image' : 'backgroundImage',
    'background-position' : 'backgroundPosition',
    'background-repeat' : 'backgroundRepeat',
    'border-bottom' : 'borderBottom',
    'border-bottom-color' : 'borderBottomColor',
    'border-bottom-style' : 'borderBottomStyle',
    'border-bottom-width' : 'borderBottomWidth',
    'border-color' : 'borderColor',
    'border-left' : 'borderLeft',
    'border-left-color' : 'borderLeftColor',
    'border-left-style' : 'borderLeftStyle',
    'border-left-width' : 'borderLeftWidth',
    'border-right' : 'borderRight',
    'border-right-color' : 'borderRightColor',
    'border-right-style' : 'borderRightStyle',
    'border-right-width' : 'borderRightWidth',
    'border-style' : 'borderStyle',
    'border-top' : 'borderTop',
    'border-top-color' : 'borderTopColor',
    'border-top-style' : 'borderTopStyle',
    'border-top-width' : 'borderTopWidth',
    'border-width' : 'borderWidth',
    'font-family' : 'fontFamily',
    'font-size' : 'fontSize',
    'font-variant' : 'fontVariant',
    'font-weight' : 'fontWeight',
    'letter-spacing' : 'letterSpacing',
    'line-height' : 'lineHeight',
    'list-style' : 'listStyle',
    'list-style-image' : 'listStyleImage',
    'list-style-position' : 'listStylePosition',
    'list-style-type' : 'listStyleType',
    'margin-bottom' : 'marginBottom',
    'margin-left' : 'marginLeft',
    'margin-right' : 'marginRight',
    'margin-top' : 'marginTop',
    'padding-bottom' : 'paddingBottom',
    'padding-left' : 'paddingLeft',
    'padding-right' : 'paddingRight',
    'padding-top' : 'paddingTop',
    'page-break-after' : 'pageBreakAfter',
    'page-break-before' : 'pageBreakBefore',
    'text-align' : 'textAlign',
    'text-decoration' : 'textDecoration',
    'text-indent' : 'textIndent',
    'text-transform' : 'textTransform',
    'vertical-align' : 'verticalAlign',
    'z-index ' : 'zIndex',
    'z-Index ' : 'zIndex'
    },*/
    
    
    JMVC.css = {
    
        addRule : function (sheet, selector, rules, index) {
            if (sheet.insertRule) {
                sheet.insertRule(selector + '{' + rules + '}', index);
            } else {
                sheet.addRule(selector, rules, index);
            }
        },
    
        mappedStyle : function (idn, style) {
            var t = JMVC.dom.find('#' + idn);
            if (t) {
                JMVC.dom.remove(t);
            }
            _.css.mappedStyles[idn] = JMVC.dom.create('style', {'id' : idn, type : 'text/css'}, style);
            JMVC.dom.append(JMVC.head.element, _.css.mappedStyles[idn]);
        },
    
        style : function (el, prop, val) {
    
            var prop_is_obj = (typeof prop === 'object' && typeof val === 'undefined'),
                ret = false,
                newval,
                k;
    
            if (!prop_is_obj && typeof val === 'undefined') {
                /* opera may use currentStyle or getComputedStyle */
                //ret = (el.currentStyle) ? el.currentStyle[_.css.css_propertymap[prop] || prop + ""] : el.style[prop]; 
                ret = (el.currentStyle) ? el.currentStyle[_.css.css2js_rule(prop)] : el.style[prop];
                return (ret === '' || ret === 'auto') ? JMVC.css.getComputedStyle(el, prop) : ret;
            }
    
            if (prop_is_obj) {
                for (k in prop) {
                    if ((prop[k] + '').search(/rand/) !== -1) {
                        newval = JMVC.nsCheck('JMVC.core.color') ?
                            JMVC.core.color.getRandomColor() : '#000000';
                        prop[k] =  prop[k].replace(/rand/, newval);
                    }
                    if (JMVC.array.find(this.css3_map, k) + 1) {
                        el.style.cssText += ';' + k + ' : ' + prop[k];
                    } else {
                        //el.style[_.css.css_propertymap[k] || k + ""] = prop[k];
                        el.style[_.css.css2js_rule(k)] = prop[k];
                    }
                }
            } else if (typeof val !== 'undefined') {
                val += '';
                if (val.search(/rand/) !== -1) {
                    newval = JMVC.nsCheck('JMVC.core.color') ?
                       JMVC.core.color.getRandomColor() : '#000000';
                    val =  val.replace(/rand/, newval);
                }
                if (JMVC.array.find(this.css3_map, prop) + 1) {
                    el.style.cssText += ';' + prop + ' : ' + val;
                } else {
                    //el.style[_.css.css_propertymap[prop] || prop + ""] = val;
                    el.style[_.css.css2js_rule(prop)] = val;
                    
                    if (prop === 'opacity') {
                        el.style.filter = 'alpha(opacity = ' + (~~(100 * JMVC.num.getFloat(val))) + ')';
                    }/* IE */
                }
            }
            return this;
        },
    
        show : function (el) {
            if (el instanceof Array) {
                for (var i = 0, l = el.length; i < l; i += 1) {
                    this.show(el[i]);
                }
                return;
            }
            JMVC.css.style(el, 'display', 'block');
        },
    
        hide : function (el) {
            if (el instanceof Array) {
                for (var i = 0, l = el.length; i < l; i += 1) {
                    this.hide(el[i]);
                }
                return;
            }
            JMVC.css.style(el, 'display', 'none');
        },
    
        width : function (el) {
            return el.offsetWidth || el.scrollWidth || JMVC.css.getComputedStyle(el, 'width');
        },
    
        height : function (el) {
            return el.offsetHeight || el.scrollHeight || JMVC.css.getComputedStyle(el, 'height');
        },
    
        getComputedStyle : function (el, styleProperty) {
            if (_.css.opera) {
                return  JMVC.W.getComputedStyle(el, null).getPropertyValue(styleProperty);
            }
            var computedStyle = typeof el.currentStyle !== 'undefined' ? el.currentStyle : JMVC.WD.defaultView.getComputedStyle(el, null);
            
            //return computedStyle[_.css.css_propertymap[styleProperty] || styleProperty]; 
            return computedStyle[_.css.css2js_rule(styleProperty)];
        },
    
        //
        // http://www.quirksmode.org/js/findpos.html
        //
        getPosition : function (el) {
            var curleft = 0,
                curtop = 0;
            if (el.offsetParent) {
                do {
                    curleft += el.offsetLeft;
                    curtop += el.offsetTop;
                    el = el.offsetParent;
                } while (el);
    
                //} while (el = el.offsetParent);
            }
            return [curleft, curtop];
        },
    
        css3_map : ['-o-transform', '-moz-transform'],
        //
        reset : function () {
            // http://meyerweb.com/eric/tools/css/reset/
            var style = 'html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;}' +
            'article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block;}' +
            'body{line-height:1;}' +
            'ol,ul{list-style:none;}' +
            'blockquote,q{quotes:none;}' +
            'blockquote:before,blockquote:after,q:before,q:after{content:\'\';content:none;}' +
            'table{border-collapse:collapse;border-spacing:0;}';
            JMVC.head.addstyle(style, true, true);
        },
        clearer : JMVC.dom.create('br', {'class' : 'clearer'})
    };
    
    /*
    DISABLE/ENABLE TEXT SELECTION in a element
    
    disableSelection : function(target) {
    if (typeof target.onselectstart != "undefined") { //IE route
    target.onselectstart=function(){return false; }
    }
    else if (typeof target.style.MozUserSelect!="undefined") { //Firefox route
    target.style.MozUserSelect = "none";
    }
    else{ //All other route (ie: Opera)
    target.onmousedown=function(){return false; }
    }
    target.style.cursor = "default";
    },
    enableSelection : function(target) {
    if (typeof target.onselectstart != "undefined") { //IE route
    target.onselectstart=function(){}
    }
    else if (typeof target.style.MozUserSelect!="undefined") { //Firefox route
    target.style.MozUserSelect = "default";
    }
    else{ //All other route (ie: Opera)
    target.onmousedown=function(){ }
    }
    target.style.cursor = "default";
    }
    */
    
    
    
    
    
    /*
    [MALTA] /src/modules/array.js
    */
    /*--------------
    ARRAY sub-module
    --------------*/
    // private section
    _.array = {
        /**
         * [op description]
         * @param  {[type]} a  [description]
         * @param  {[type]} op [description]
         * @return {[type]}    [description]
         */
        op : function (a, op) {
            var ret = NaN;
            try {
                ret = (new Function('return ' + a.join(op) + ';'))();
            } catch (e) {}
            return ret;
        }
    };
    
    // public section
    JMVC.array = {
        /**
         * Clone an existing array
         * @param {Array} arr the array that should be cloned
         * @return {Array} the cloned array
         */
        clone : function (arr) {
            return [].concat.call(arr);
        },
    
        /**
         * Safely converts a collection to an array
         * @param  {[type]} coll [description]
         * @return {[type]}      [description]
         */
        coll2array : function (coll) {
            var ret = [],
                i = 0;
            try {
                ret = [].slice.call(coll, 0);
            } catch (e) {
                // what if coll[i] element is false? loop breaks
                // but this is not the case since collection has no falsy values
                for (null; coll[i]; i++) {
                    ret[i] = coll[i];
                }
            }
            return ret;
        },
    
        /**
         * [compare description]
         * @param  {[type]} a1 [description]
         * @param  {[type]} a2 [description]
         * @return {[type]}    [description]
         *
         * @source http://stackoverflow.com/questions/3115982/how-to-check-javascript-array-equals
         */
        compare : function (a, b, onlyPresence) {
            if (a === b) return true;
            if (a == null || b == null) return false;
            if (a.length != b.length) return false;
    
            // If you don't care about the order of the elements inside
            // the array, you should sort both arrays here.
            if (typeof onlyPresence !== 'undefined') {
                a = a.sort();
                b = b.sort();
            }
            if (JSON && 'stringify' in JSON) {
                return JSON.stringify(a) === JSON.stringify(b);
            }
    
            for (var i = 0; i < a.length; ++i) {
                if (a[i] !== b[i]) return false;
            }
            return true;
        },
    
        /**
         * Empties an array
         * @param  {Array} arr the array to be emptied
         * @return {undefined}
         */
        empty : function (arr) {
            // second param (deleteCount) would not be necessary
            // but in the buggIE
            [].splice.call(arr, 0, arr.length);
        },
    
        /**
         * Cross-Façade function to check if an array contains or not a value
         * @param  {Array}  arr    the array to search in 
         * @param  {Mixed}  myvar  the element searched
         * @return {Integer}       the index of the first occurrence or -1
         */
        find : function (arr, mvar) {
            //IE6,7,8 fail here
            
            if ('indexOf' in arr) {
                return arr.indexOf(mvar);
            }
            var l = arr.length - 1;
            while (arr[l] !== mvar) {l--; }
            return l;
        },
    
        /**
         * Find all the occourcences indexes of an element in a array
         * @param  {Array} arr   the array to search in 
         * @param  {Mixed} mvar  the element searched
         * @return {Mixed}       the Array of occourrencies or -1
         */
        findAll : function (arr, mvar) {
            var res = [],
                sum = 0,
                tmp;
    
            while (true) {
                tmp = this.find(arr, mvar);
                // not found exit
                if (tmp < 0) {break; }
                // track position, cause of slicing
                sum += tmp + 1;
                res.push(sum - 1);
                arr = arr.slice(tmp + 1);
            }
            return res.length ? res : -1;
        },
    
        /**
         * [ description]
         * @param  {[type]} arr [description]
         * @param  {[type]} v   [description]
         * @return {[type]}     [description]
         */
        findRich : function (arr, v) {
            var i = 0,
                is_obj_or_array = false,
                len = arr.length;
            for (null; i < len; i += 1) {
                is_obj_or_array = {}.toString.call(arr[i]).match(/\[object\s(Array|Object)\]/);
                if (
                    (is_obj_or_array && JSON.stringify(arr[i]) === JSON.stringify(v)) ||
                    (!is_obj_or_array && arr[i].toString() === v.toString())
                ) {
                    return i;
                }
            }
            return -1;
        },
    
        /**
         * [max description]
         * @param  {[type]} a) {return      Math.max.apply(null, a [description]
         * @return {[type]}    [description]
         */
        max : function (a) {
            return Math.max.apply(null, a);
        },
    
        /**
         * [mean description]
         * @param  {[type]} a [description]
         * @return {[type]}   [description]
         */
        mean : function (a) {
            return this.sum(a) / a.length;
        },
    
        /**
         * [min description]
         * @param  {[type]} a) {return      Math.min.apply(null, a [description]
         * @return {[type]}    [description]
         */
        min : function (a) {
            return Math.min.apply(null, a);
        },
        
        /**
         * [mult description]
         * @param  {[type]} a [description]
         * @return {[type]}   [description]
         */
        mult : function (a) {
            return _.array.op(a, '*');
        },
    
        /**
         * [rand description]
         * @param  {[type]} a [description]
         * @return {[type]}   [description]
         */
        rand : function (a) {
            var m = Math;
            return a[m.floor(m.random() * a.length)];
        },
    
        /**
         * @source http://stackoverflow.com/questions/5767325/remove-specific-element-from-an-array
         * [remove description]
         * @param  {[type]} arr  [description]
         * @param  {[type]} item [description]
         * @return {[type]}      [description]
         */
        remove : function (arr, item) {
            var i = arr.length;
            while (i--) {
                arr[i] === item && arr.splice(i, 1);
            }
            return arr;
        },
    
        /**
         * [shuffle description]
         * @param  {[type]} arr [description]
         * @return {[type]}     [description]
         */
        shuffle : function (arr) {
            return arr.sort(function () {
                return 0.5 - Math.random();
            });
        },
    
        /**
         * [sum description]
         * @param  {[type]} a [description]
         * @return {[type]}   [description]
         */
        sum : function (a) {
            return _.array.op(a, '+');
        },
    
        /**
         * [unique description]
         * @param  {[type]} a [description]
         * @return {[type]}   [description]
         */
        unique2 : function (a) {
            var r = [],
                l = a.length,
                i = 0, j;
            for (i = 0; i < l; i++) {
                for (j = i + 1; j < l; j++) 
                    if (a[i] == a[j]) j = ++i;
                r.push(a[i]);
            }
            return r;
        },
    
        /*
        [1,2,3,4,5,6,7,8,9]
        i
        j
        */
        unique : function (a) {    
            var r = [],
                l = a.length,
                i = 0, j;
            for (i = 0; i < l; i++) {
                for (j = i + 1; j < l; j++) 
                    if (a[i] === a[j]) j = ++i;
                r.push(a[i]);
            }
            return r;
        }
    };
    //-----------------------------------------------------------------------------
    /*
    [MALTA] /src/modules/string.js
    */
    /*---------------
    STRING sub-module
    ---------------*/
    // private section
    _.string = {
        charToEntity : {},
        entities : { __proto__: null,
            apos: 0x0027, quot: 0x0022, amp: 0x0026, lt: 0x003C, gt: 0x003E, nbsp: 0x00A0, iexcl: 0x00A1, cent: 0x00A2, pound: 0x00A3,
            curren: 0x00A4, yen: 0x00A5, brvbar: 0x00A6, sect: 0x00A7, uml: 0x00A8, copy: 0x00A9, ordf: 0x00AA, laquo: 0x00AB,
            not: 0x00AC, shy: 0x00AD, reg: 0x00AE, macr: 0x00AF, deg: 0x00B0, plusmn: 0x00B1, sup2: 0x00B2, sup3: 0x00B3,
            acute: 0x00B4, micro: 0x00B5, para: 0x00B6, middot: 0x00B7, cedil: 0x00B8, sup1: 0x00B9, ordm: 0x00BA, raquo: 0x00BB,
            frac14: 0x00BC, frac12: 0x00BD, frac34: 0x00BE, iquest: 0x00BF, Agrave: 0x00C0, Aacute: 0x00C1, Acirc: 0x00C2, Atilde: 0x00C3,
            Auml: 0x00C4, Aring: 0x00C5, AElig: 0x00C6, Ccedil: 0x00C7, Egrave: 0x00C8, Eacute: 0x00C9, Ecirc: 0x00CA, Euml: 0x00CB,
            Igrave: 0x00CC, Iacute: 0x00CD, Icirc: 0x00CE, Iuml: 0x00CF, ETH: 0x00D0, Ntilde: 0x00D1, Ograve: 0x00D2, Oacute: 0x00D3,
            Ocirc: 0x00D4, Otilde: 0x00D5, Ouml: 0x00D6, times: 0x00D7, Oslash: 0x00D8, Ugrave: 0x00D9, Uacute: 0x00DA, Ucirc: 0x00DB,
            Uuml: 0x00DC, Yacute: 0x00DD, THORN: 0x00DE, szlig: 0x00DF, agrave: 0x00E0, aacute: 0x00E1, acirc: 0x00E2, atilde: 0x00E3,
            auml: 0x00E4, aring: 0x00E5, aelig: 0x00E6, ccedil: 0x00E7, egrave: 0x00E8, eacute: 0x00E9, ecirc: 0x00EA, euml: 0x00EB,
            igrave: 0x00EC, iacute: 0x00ED, icirc: 0x00EE, iuml: 0x00EF, eth: 0x00F0, ntilde: 0x00F1, ograve: 0x00F2, oacute: 0x00F3,
            ocirc: 0x00F4, otilde: 0x00F5, ouml: 0x00F6, divide: 0x00F7, oslash: 0x00F8, ugrave: 0x00F9, uacute: 0x00FA, ucirc: 0x00FB,
            uuml: 0x00FC, yacute: 0x00FD, thorn: 0x00FE, yuml: 0x00FF, OElig: 0x0152, oelig: 0x0153, Scaron: 0x0160, scaron: 0x0161,
            Yuml: 0x0178, fnof: 0x0192, circ: 0x02C6, tilde: 0x02DC, Alpha: 0x0391, Beta: 0x0392, Gamma: 0x0393, Delta: 0x0394,
            Epsilon: 0x0395, Zeta: 0x0396, Eta: 0x0397, Theta: 0x0398, Iota: 0x0399, Kappa: 0x039A, Lambda: 0x039B, Mu: 0x039C,
            Nu: 0x039D, Xi: 0x039E, Omicron: 0x039F, Pi: 0x03A0, Rho: 0x03A1, Sigma: 0x03A3, Tau: 0x03A4, Upsilon: 0x03A5,
            Phi: 0x03A6, Chi: 0x03A7, Psi: 0x03A8, Omega: 0x03A9, alpha: 0x03B1, beta: 0x03B2, gamma: 0x03B3, delta: 0x03B4,
            epsilon: 0x03B5, zeta: 0x03B6, eta: 0x03B7, theta: 0x03B8, iota: 0x03B9, kappa: 0x03BA, lambda: 0x03BB, mu: 0x03BC,
            nu: 0x03BD, xi: 0x03BE, omicron: 0x03BF, pi: 0x03C0, rho: 0x03C1, sigmaf: 0x03C2, sigma: 0x03C3, tau: 0x03C4,
            upsilon: 0x03C5, phi: 0x03C6, chi: 0x03C7, psi: 0x03C8, omega: 0x03C9, thetasym: 0x03D1, upsih: 0x03D2, piv: 0x03D6,
            ensp: 0x2002, emsp: 0x2003, thinsp: 0x2009, zwnj: 0x200C, zwj: 0x200D, lrm: 0x200E, rlm: 0x200F, ndash: 0x2013,
            mdash: 0x2014, lsquo: 0x2018, rsquo: 0x2019, sbquo: 0x201A, ldquo: 0x201C, rdquo: 0x201D, bdquo: 0x201E, dagger: 0x2020,
            Dagger: 0x2021, bull: 0x2022, hellip: 0x2026, permil: 0x2030, prime: 0x2032, Prime: 0x2033, lsaquo: 0x2039, rsaquo: 0x203A,
            oline: 0x203E, frasl: 0x2044, euro: 0x20AC, image: 0x2111, weierp: 0x2118, real: 0x211C, trade: 0x2122, alefsym: 0x2135,
            larr: 0x2190, uarr: 0x2191, rarr: 0x2192, darr: 0x2193, harr: 0x2194, crarr: 0x21B5, lArr: 0x21D0, uArr: 0x21D1,
            rArr: 0x21D2, dArr: 0x21D3, hArr: 0x21D4, forall: 0x2200, part: 0x2202, exist: 0x2203, empty: 0x2205, nabla: 0x2207,
            isin: 0x2208, notin: 0x2209, ni: 0x220B, prod: 0x220F, sum: 0x2211, minus: 0x2212, lowast: 0x2217, radic: 0x221A,
            prop: 0x221D, infin: 0x221E, ang: 0x2220, and: 0x2227, or: 0x2228, cap: 0x2229, cup: 0x222A, 'int': 0x222B,
            there4: 0x2234, sim: 0x223C, cong: 0x2245, asymp: 0x2248, ne: 0x2260, equiv: 0x2261, le: 0x2264, ge: 0x2265,
            sub: 0x2282, sup: 0x2283, nsub: 0x2284, sube: 0x2286, supe: 0x2287, oplus: 0x2295, otimes: 0x2297, perp: 0x22A5,
            sdot: 0x22C5, lceil: 0x2308, rceil: 0x2309, lfloor: 0x230A, rfloor: 0x230B, lang: 0x2329, rang: 0x232A, loz: 0x25CA,
            spades: 0x2660, clubs: 0x2663, hearts: 0x2665, diams: 0x2666
        }
    };
    // public section
    JMVC.string = {
        /**
         * [ description]
         * @param  {Array[int]} code [description]
         * @return {[type]}      [description]
         */
        code2str : function (code) {
            return String.fromCharCode.apply(null, code);
        },
    
        /**
         * [ description]
         * @param  {[type]} s){return s.replace(/^\s+/g [description]
         * @param  {[type]} ''         [description]
         * @return {[type]}            [description]
         */
        ltrim : function (s) {return s.replace(/^\s+/g, ''); },
        /**
         * [multireplace description]
         * @param  {[type]} cnt [description]
         * @param  {[type]} o   [description]
         * @return {[type]}     [description]
         */
        multireplace : function (cnt, o) {
            for (var i in o) {
                cnt = cnt.replace(o[i], i);
            }
            return cnt;
        },
        /**
         * [nl2br description]
         * @param  {[type]} str [description]
         * @return {[type]}     [description]
         */
        nl2br : function (str) {
            return str.replace(/\/n/gm, '<br />');
        },
        /**
         * [padme description]
         * @param  {[type]} val [description]
         * @param  {[type]} el  [description]
         * @param  {[type]} pos [description]
         * @param  {[type]} len [description]
         * @return {[type]}     [description]
         */
        padme : function (val, el, pos, len) {
            var l = val.length;
            len = len || 2;
            pos = pos || 'post';
            if (len <= l) {
                return val;
            }
            el = new Array(len + 1 - l).join(el) + '';
            return String({
                pre     : el + val,
                post    : val + el
            }[pos]) || val;
        },
        /**
         * [regEscape description]
         * @param  {[type]} str [description]
         * @return {[type]}     [description]
         *
         * http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
         */
        regEscape : function (str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
        },
        /**
         * [ description]
         * @param  {[type]} str [description]
         * @param  {[type]} n   [description]
         * @return {[type]}     [description]
         */
        repeat : function (str, n) {
            return new Array(n + 1).join(str);
        },
        /** 
         * [ description]
         * @param  {string} tpl      the template
         * @param  {literal or function} a literal for substitution or a function that will
         *                               return the substitution given as parameter a string
         * @param  {string} start       optional- the opening placeholder delimitator (%)
         * @param  {string} end       optional- the closing placeholder delimitator (%)
         * @param  {string} fallback optional- a fallback value in case an element is not found
         * @return {string}          the resulting string with replaced values
         *
         * this allows
        var tpl = 'a%x%g',
           o = {
               x : 'b%y%f',
               y:'c%z%e',
               z : 'd'
           };
        JMVC.string.replaceall(tpl, o); // abcdefg
         * 
         */
        replaceall : function (tpl, obj, start, end, fb) {
            if (!start) {start = '%'; }
            if (!end) {end = '%'; }
            //start = this.regEscape(start);
            //end = this.regEscape(end);
            var reg = new RegExp(start + '([A-z0-9-_]*)' + end, 'g'),
                straight = true,
                str, tmp;
            //fb = fb || false;
            while (straight) {
                if (!(tpl.match(reg))) {
                    return tpl;
                }
                tpl = tpl.replace(reg, function (str, $1) {
                    switch (true) {
                        // 
                    case typeof obj === 'function' :
                        // avoid silly infiloops
                        tmp = obj($1);
                        return (tmp !== start + $1 + end) ? obj($1)  : $1;
                        // the label matches a obj literal element
                        // use it
                    case $1 in obj :
                        return obj[$1];
                        /**
                         * not a function and not found in literal
                         * use fallback if passed or get back the placeholder
                         * switching off before returning
                         */
                    default:
                        straight = false;
                        return fb || start + $1 + end;
    
                    }
                });
            }
            return tpl;
        },/*
        replaceallold : function (tpl, o, dD, Dd, cb) {
            dD || (dD = '%');
            Dd || (Dd = '%');
            var reg = new RegExp(dD + '([A-z0-9-_]*)' + Dd, 'g'),
                str;
            cb = cb || false;
    
            return tpl.replace(reg, function (str, $1) {
    
                switch (true) {
                    case typeof o === 'function' : return o($1); break;
                    case $1 in o : return o[$1]; break;
                }
                return cb || dD + $1 + Dd;
                // The switch above is functionally identical to the next line, but
                // is for sure more readable, the real question is : which one is the fastest?
                // try it out loading the following testfrom console: JMVC.head.goto('test_api_string_replaceall-perf')
                //return typeof o === 'function' ? o($1) : $1 in o ? o[$1] : cb || dD + $1 + Dd;
            });
        },
        */
        //
        //
        //
        /**
         * [ description]
         * @param  {[type]} s){return s.replace(/\s+$/g [description]
         * @param  {[type]} ''         [description]
         * @return {[type]}            [description]
         */
        rtrim : function (s) {return s.replace(/\s+$/g, ''); },
        /**
         * [ description]
         * @param  {[type]} str [description]
         * @param  {[type]} pwd [description]
         * @return {[type]}     [description]
         */
        str2code : function (str) {
            var out = [],
                i = 0,
                l = str.length;
            while (i < l) {
                out.push(str.charCodeAt(i));
                i += 1;
            }
            return out;
        },
        /**
         * [ description]
         * @param  {[type]} s){return s.replace(/^\s+|\s+$/g [description]
         * @param  {[type]} ''         [description]
         * @return {[type]}            [description]
         */
        trim : function (s) {return s.replace(/^\s+|\s+$/g, ''); },
        /**
         * [ucFirst description]
         * @param  {[type]} str [description]
         * @return {[type]}     [description]
         */
        ucFirst : function (str) {
            return str.replace(/^\w/, function (chr) {return chr.toUpperCase(); });
        },
        /**
         * [UnescapeEntities description]
         * @param {[type]} str [description]
         */
        UnescapeEntities : function (str) {
            return str.replace(/&(.+?);/g,
                function (str, ent) {
                    return String.fromCharCode(ent[0] !== '#' ? _.string.entities[ent] : ent[1] === 'x' ? parseInt(ent.substr(2), 16): parseInt(ent.substr(1), 10));
                }
            );
        },
        /**
         * [EscapeEntities description]
         * @param {[type]} str [description]
         */
        EscapeEntities : function (str) {
            return str.replace(/[^\x20-\x7E]/g,
                function (str) {
                    return _.string.charToEntity[str] ? '&' + _.string.charToEntity[str] + ';' : str;
                }
            );
        }
    };
    for (var entityName in _.string.entities ) {
        _.string.charToEntity[String.fromCharCode(_.string.entities[entityName])] = entityName;
    }
    //-----------------------------------------------------------------------------
    /*
    [MALTA] /src/modules/object.js
    */
    /*---------------
    OBJECT sub-module
    ---------------*/
    /**
     * [object description]
     * @type {Object}
     */
    _.object = {
        /**
         * [map description]
         * @param  {[type]}   o  [description]
         * @param  {Function} fn [description]
         * @return {[type]}      [description]
         */
        map : function (o, fn) {
            var ret = '', j;
            for (j in o) {
                o.hasOwnProperty(j) && (ret += fn(o, j, ret));
            }
            return ret;
        }
    };
    /**
     * [object description]
     * @type {Object}
     */
    
    JMVC.object = {
        /**
         * Clones an object
         * 
         * @param Literal obj
         * @returns cloned Object
         */
        clone : function (obj) {
            var temp,
                key;
            if (obj === null || typeof obj !== 'object') {
                return obj;
            }
            temp = obj.constructor();
            for (key in obj) {
                obj.hasOwnProperty(key) && (temp[key] = this.clone(obj[key]));
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
        compare : function (obj1, obj2, ret, i) {
            if (typeof ret === 'undefined') {ret = true; }
            if (!ret) {return 0; }
            if (obj1 + '' !== obj2 + '') {
                return false;
            }
            for (i in obj1) {
                ret = ret && obj2[i] && this.compare(obj1[i], obj2[i], ret);
                if (!ret) {return false; }
            }
            for (i in obj2) {
                ret = ret && obj1[i] && this.compare(obj2[i], obj1[i], ret);
                if (!ret) {return false; }
            }
            return ret;
        },
        /**
         * [ description]
         * @param  {[type]} obj    [description]
         * @param  {[type]} field) {return      (typeof obj === 'object' && obj[field] [description]
         * @return {[type]}        [description]
         */
        contains : function (obj, field) {
            return (typeof obj === 'object' && field in obj);
        },
        /**
         * [ description]
         * @param  {[type]} obj [description]
         * @param  {[type]} ext [description]
         * @return {[type]}     [description]
         */
        extend : function (o, ext) {
            var obj = this.clone(o), j;
            for (j in ext) {
                ext.hasOwnProperty(j) &&
                !(j in obj) &&
                (obj[j] = ext[j]);
            }
            return obj;
        },
        /**
         * [ description]
         * @param  {[type]} obj1 [description]
         * @param  {[type]} obj2 [description]
         * @return {[type]}      [description]
         */
        jCompare : function (obj1, obj2) {
            return JSON.stringify(obj1) === JSON.stringify(obj2);
        },
        /**
         * [keys description]
         * @param  {[type]} obj [description]
         * @return {[type]}     [description]
         */
        keys : function (obj) {
            var res = [],
                i;
            for (i in obj) res.push(i);
            return res;
        },
    
        order : function (obj) {
            var k = [],
                i,
                out = {};
            for (i in obj) k.push(i);
            k.sort();
            for (var j = 0, l = k.length; j < l; j++) {
                out[k[j]] = obj[k[j]];
            }
            return out;
        },
        /**
         * [ description]
         * @param  {[type]} o [description]
         * @return {[type]}   [description]
         */
        toAttr : function (obj) {
            return _.object.map(obj, function (o, i) {
                return ' ' + i + (o[i] ? '="' + o[i] + '"' : '');
            });
        },
        /**
         * [ description]
         * @param  {[type]} o [description]
         * @return {[type]}   [description]
         */
        toCss : function (obj, straight) {
            return _.object.map(obj, function (ob, i) {
                return !!straight ?
                    i + '{' + ob[i] + '} '
                :
                    i + ' {' + _.object.map(ob[i],
                        function (o, j) {
                            return j + ':' + o[j] + ';';
                        }
                    ) + '} ';
            });
        },
        /**
         * [ description]
         * @param  {[type]} o [description]
         * @return {[type]}   [description]
         */
        toQs : function (obj) {
            return _.object.map(obj, function (o, i, r) {
                //return (r ? '&' : '?') + encodeURIComponent(JMVC.htmlchars(i)) + '=' + encodeURIComponent(JMVC.htmlchars(o[i]));
                return ((r ? '&' : '?') + encodeURIComponent(i) + '=' + encodeURIComponent(o[i])).replace(/\'/g, '%27');
            });
        },
        /**
         * [obj2str description]
         * @param  {[type]} obj [description]
         * @return {[type]}     [description]
         */
        toStr : function (obj) {
            return _.object.map(obj, function (o, i) {
                return i + ':' + o[i] + ';';
            });
        },
        /**
         * [values description]
         * @param  {[type]} obj [description]
         * @return {[type]}     [description]
         */
        values : function (obj) {
            var res = [], i;
            for (i in obj) {
                res.push(obj[i]);
            }
            return res;
        }
    };
    //-----------------------------------------------------------------------------
    /*
    [MALTA] /src/modules/match.js
    */
    /*--------------
    MATCH sub-module
    --------------*/
    // private section
    _.match = {
        rex : {
            email : new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
            url : new RegExp(/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i),
            alfa : new RegExp(/^[A-z]*$/),
            numint : new RegExp(/^[0-9]*$/),
            floatnum : new RegExp(/^[0-9\.]*$/),
            alfanum : new RegExp(/^[A-z0-9]*$/)
        }
    };
    // public section
    JMVC.match = {
        email : function (str) {
            return str.match(_.match.rex.email);
        },
        url : function (str) {
            return str.match(_.match.rex.url);
        },
        alfa : function (str, min, max) {
            max && min > max && (max = min);
            return str.match(new RegExp('^[A-z\s]' + (~~min ? '{' + min + ',' + (~~max ? max : '') + '}' : '*') + '$'));
        },
        alfanum : function (an) {
            return an.match(_.match.rex.alfanum);
        },
        floatnum : function (fn) {
            return (fn + '').match(_.match.rex.floatnum);
        }
    };
    //-----------------------------------------------------------------------------
    /*
    [MALTA] /src/modules/num.js
    */
    /*------------
    NUM sub-module
    ------------*/
    // private section
    _.num = {};
    // public section
    JMVC.num = {
    	getNum : function (str) {return parseInt(str, 10); },
    	getFloat : function (str) {return parseFloat(str, 10); },
    	pFloat : function (f) {return 1 * f; },
    	pInt : function (i) {return i >> 0; },
    	mRound : function (n) {return (n + 0.5) >> 0; },
        //mFloor : function (n) {return ~~n; },
    	mFloor : function (n) {return n >> 0; },
        mCeil : function (n) {return (n + (n > 0 && !!(n % 1))) >> 0; },
    	//mCeil : function (n) {return (n >> 0) + (n > 0 ? 1 : -1); },
    	num : function (n) {return parseFloat(n.toFixed(10), 10); },
        dec2Bin : function (dec){
            if(dec > 0) return dec.toString(2)>>>0;
            dec = Math.abs(dec);
            var res = dec ^ parseInt((new Array(dec.toString(2).length+1)).join("1"),2);
            return (res+1).toString(2)>>>0;
        },
        bin2Dec : function (b) {return parseInt(b>>>0, 2); }
    };
    //-----------------------------------------------------------------------------
    //
    // render
    /*
    [MALTA] /src/core/render.js
    */
    /*----
    RENDER
    ----*/
    (function () {
        var i = 0,
            l = JMVC.modules.length;
        
        while (i < l) {
            JMVC.require(JMVC.modules[i]);
            i += 1;
        }
        
        if (JMVC.p.lang) {
            JMVC.cookie.set('lang', JMVC.p.lang);
        }
        !W.JMVCshut && JMVC.render();
    })();
    //-----------------------------------------------------------------------------
    /*
    [MALTA] /src/foot.js
    */
    /**
     * [onerror description]
     * @param  {[type]} errorMsg   [description]
     * @param  {[type]} url        [description]
     * @param  {[type]} lineNumber [description]
     * @return {[type]}            [description]
     */
    JMVC.W.onerror = function (errorMsg, url, lineNumber) {
        JMVC.debug("Uncaught error " + errorMsg + " in " + url + ", lines " + lineNumber);
    };
    //-------------------------------------------------------------------------[ THE END ]
    

//
})(this);
//