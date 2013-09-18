/**
 *	JMVC : A pure Javascript MVC framework
 *	======================================
 *
 *	@version :  3.0.1 (rev. 0)
 *	@copyright : 2013, Federico Ghedina <fedeghe@gmail.com>
 *	@author : Federico Ghedina <fedeghe@gmail.com>
 *	@url : http://www.jmvc.org
 *	@file : built with Malta http://www.github.com/fedeghe/malta on 19/9/2013 at 0:9:22
 *
 *
 *	All rights reserved.
 *
 *	This code is distributed under the terms of the BSD licence
 *
 *	Redistribution and use of this software in source and binary forms, with or without modification,
 *	are permitted provided that the following conditions are met:
 *
 *	> Redistributions of source code must retain the above copyright notice, this list of conditions
 *	and the following disclaimer.
 *	> Redistributions in binary form must reproduce the above copyright notice, this list of
 *	conditions and the following disclaimer in the documentation and/or other materials provided
 *	with the distribution.
 *	> The names of the contributors to this file may not be used to endorse or promote products
 *	derived from this software without specific prior written permission.
 *
 *	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
 *	WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 *	PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 *	ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 *	LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 *	INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
 *	TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 *	ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */


/**
 * main auto exec function
 * @param  window (through this ref)
 * @return 0:9:22
 */

!function (W, undefined) {
    'use strict';
    var WD = W.document,
        /* reference for current location */
        WDL = WD.location,
        /* some counters */
        i, j, l,
        /* JMVC object, globalized */
        JMVC = W.JMVC = (
            /*
            * this function returns the JMVC object after doing some stuff
            * @return {object literal} $JMVC inner object 
            */
            function () {
                /*
                
                    _/            _/    _/      
                       _/_/_/        _/_/_/_/   
                  _/  _/    _/  _/    _/        
                 _/  _/    _/  _/    _/         
                _/  _/    _/  _/      _/_/ 
                
                */
                // returning object created in that function, here $JMVC will be JMVC
                var $JMVC,
                    JMVC_VERSION = "3.0.1",
                    JMVC_REVIEW = "0",
                    JMVC_PACKED = false, //'.min', 
                
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
                        controller : (JMVC_PACKED || '') + '.js',
                        model : JMVC_PACKED ? '.min.js' : '.js',
                        view : '.html',
                        'interface' : '.interface' + (JMVC_PACKED || '') + '.js'
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
                
                
                    // ===========================================
                
                
				/*
				
				         _/  _/      _/  _/      _/    _/_/_/      _/                                          
				        _/  _/_/  _/_/  _/      _/  _/                _/_/_/    _/_/_/      _/_/    _/  _/_/   
				       _/  _/  _/  _/  _/      _/  _/            _/  _/    _/  _/    _/  _/_/_/_/  _/_/        
				_/    _/  _/      _/    _/  _/    _/            _/  _/    _/  _/    _/  _/        _/           
				 _/_/    _/      _/      _/        _/_/_/      _/  _/    _/  _/    _/    _/_/_/  _/
				    
				*/
				jmvc = {
				
				
				    /**
				     * eval function wrap
				     * @param  string   code to be evalued
				     * @return void
				     */
				    "jeval" : function (r) {
				        //r = r.replace(/(\/\/.*\n)/gm, '');
				        try{
				            return JMVC.W.eval(r);
				            //return (new Function(r))();
				        }catch(e){/*console.log(r);*/}
				        //window.eval(r);
				        //ret =  ('execScript' in window) ? window.execScript('(' + r + ')','') : eval(r);
				        //return ret;
				    },
				
				
				
				    
				    /**
				     * [ description]
				     * @param  {[type]} Child  [description]
				     * @param  {[type]} Parent [description]
				     * @return {[type]}        [description]
				     */
				    "inherit" : function (Child, Parent) {
				        var T = new Function();
				        T.prototype = Parent.prototype;
				        Child.prototype = new T();
				        Child.prototype.constructor = Child;
				        Child.superClass = Parent.prototype;
				        Child.baseConstructor = Parent;
				    },
				
				    /**
				     * [ description]
				     * @param  {obejct literal} Childs [description]
				     * @param  {[type]} Parent [description]
				     * @return {[type]}        [description]
				     */
				    "multi_inherit" : function (Childs, Parent) {
				        for (var i in Childs) {
				            jmvc.inherit(Childs[i], Parent);
				        }
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
				            trg.initCheck = null;
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
				            //and clean
				            trg.init = null;
				        }
				    },
				
				    /**
				     * hook utility
				     * @param  {[type]} hookname [description]
				     * @param  {[type]} param    [description]
				     * @return {[type]}          [description]
				     */
				    "hook_check" : function (hookname, params) {
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
				     * instance new view content or eval a model or controller
				     * @param  {[type]} path   [description]
				     * @param  {[type]} type   [description]
				     * @param  {[type]} name   [description]
				     * @param  {[type]} params [description]
				     * @return {[type]}        [description]
				     */
				    "xhrget" : function (path, type, name, params) {
				        //
				        var ret = false,
				            o;
				        if (type === 'view' && typeof $JMVC.views[name] === 'function') {
				            ret = $JMVC.views[name];
				        } else if (type === 'model' && typeof $JMVC.models[name] === 'function') {
				            o = new $JMVC.models[name]();
				            params && $JMVC.models[name].apply(o, params);
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
				                false //sync
				            );
				        }
				        return ret;
				    },
				
				    /**
				     * @param  {[type]} type   [description]
				     * @param  {[type]} name   [description]
				     * @param  {[type]} params [description]
				     * @return {[type]}        [description]
				     */
				    "factory_method" : function (type, name, params) {
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
				
				        //need to do this because of the special case when a c_prepath is used
				        type === 'controller' && (path_absolute += $JMVC.c_prepath);
				
				        path_absolute += (path ? path + US : "") + name;
				        
				        t = t.match(/(view|model|controller|interface)/);
				        
				        if (!t || t[0] !== type) {
				            return false;
				        }
				        path_absolute += JMVC_EXT[type];
				        
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
				        var ctrl,
				            i;
				
				        // "import" the controller (eval ajax code)
				        $JMVC.factory('controller', $JMVC.c);
				
				        // if the constructor has been evalued correctly
				        if ($JMVC.c in $JMVC.controllers) {
				
				            // grant basic ineritance from parent Controller
				            jmvc.inherit(JMVC.controllers[JMVC.c], Controller);
				            // make an instance
				            ctrl = new JMVC.controllers[JMVC.c]();
				            // store it
				            JMVC.controllers[JMVC.c] = ctrl;
				
				            // manage routes
				            if ('jmvc_routes' in ctrl) {
				                $JMVC.a = ctrl.jmvc_routes[$JMVC.a] || $JMVC.a;
				            }
				
				            // parameters are set as variables of the controller
				            for (i in $JMVC.p) {
				                $JMVC.p.hasOwnProperty(i) && ctrl.set(i, decodeURI($JMVC.p[i]));
				            }
				
				            // BEFORE HOOKS?
				            // 
				            // @global hook
				            'before' in ctrl
				            && typeof ctrl.before === 'function'
				            && ctrl.before();
				            //
				            // @action hook
				            'before_' + $JMVC.a in ctrl
				            && typeof ctrl['before_' + $JMVC.a] === 'function'
				            && ctrl['before_' + $JMVC.a]();
				
				            // NOW    
				            // 
				            // call action
				             
				            ('action_' + $JMVC.a in ctrl && typeof ctrl['action_' + $JMVC.a] === 'function') ?
				               ctrl['action_' + $JMVC.a]()
				               :
				               /* maybe a action wild is in the controller */
				               ('action' in ctrl && typeof ctrl['action'] === 'function') ?
				               ctrl['action']($JMVC.a, $JMVC.p)
				               :
				               /* or go to 404 */
				               $JMVC.a.toLowerCase() !== JMVC_DEFAULT.action
				               && WDL.replace(US + '404' + US + 'msg' + US + 'act' + US + $JMVC.a);
				            
				            /* AFTER HOOKS?
				            *
				            * @action hook */
				            'after_' + $JMVC.a in ctrl
				            && typeof ctrl['after_' + $JMVC.a] === 'function'
				            && ctrl['after_' + $JMVC.a]();
				            /*
				            * @global hook */
				            'after' in ctrl
				            && typeof ctrl.after === 'function'
				            && ctrl.after();
				            
				        } else {
				            $JMVC.c.toLowerCase() !== JMVC_DEFAULT.controller
				            && WDL.replace(US + '404' + US + 'msg' + US + 'cnt' + US + $JMVC.c);
				        }
				        if (cback && typeof cback === 'function') {
				            cback.call($JMVC);
				        }
				        $JMVC.loaded = true;
				    },
				
				
				
				
				    /*
				    * 
				    * setter, getter, unsetter for $JMVC vars
				    */
				    /**
				     * [description]
				     * @param  {[type]} name    [description]
				     * @param  {[type]} content [description]
				     * @return {[type]}         [description]
				     */
				    "set" : function (name, content) {
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
				     * [description]
				     * @param  {[type]} name [description]
				     * @return {[type]}      [description]
				     */
				    "get" : function (name) {
				        return $JMVC.vars[name] || undefined;
				    },
				
				    /**
				     * [description]
				     * @param  {[type]} name [description]
				     * @return {[type]}      [description]
				     */
				    "del" : function (name) {
				        $JMVC.vars[name] && ($JMVC.vars[name] = null);
				        return $JMVC;
				    },
				
				    //lambda function2context binding
				    /**
				     * [description]
				     * @param  {[type]} func [description]
				     * @param  {[type]} ctx  [description]
				     * @return {[type]}      [description]
				     */
				    "bind_old" : function (func, ctx) {
				        return function () {
				            return func.apply(ctx, arguments);
				        };
				    },
				
				    /**
				     * [description]
				     * @param  {[type]} func [description]
				     * @param  {[type]} ctx  [description]
				     * @return {[type]}      [description]
				     */
				    "delegate" : function (func, ctx) {
				        var args = Array.prototype.slice.call(arguments, 2);
				        return function () {
				            return func.apply(ctx || $JMVC, [].concat(args, Array.prototype.slice.call(arguments)));
				        };
				    },
				
				    // require, 'test' is an exception, if passed then the path will be /app/test
				    /**
				     * [description]
				     * @return {[type]} [description]
				     */
				    "require" : function () {
				        var i = 0,
				            l = arguments.length,
				            //curr = -1,
				            path,
				            extNS,
				            extNSlength,
				            extname = '',
				            head = JMVC.WD.getElementsByTagName('head').item(0),
				            s;
				
				        for (null; i < l; i += 1) {
				            if (typeof arguments[i] === 'string' && !$JMVC.extensions[arguments[i]]) {
				                extNS = arguments[i].split(US);
				                extNSlength = extNS.length;
				                extname = extNS[extNSlength - 1];
				                path = JMVC.vars.baseurl +
				                    (arguments[i] === 'testsuite' ? PATH['test'] : PATH['ext'] + arguments[i] + US) +
				                    extname + (JMVC_PACKED || '') + '.js';
				                switch (getmode) {
				                case 'ajax':
				                    $JMVC.io.get(path, function (jres) {
				                        jmvc.jeval(jres);
				                    }, false);
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
				
				    /**
				     * [description]
				     * @param  {[type]} o      [description]
				     * @param  {[type]} interf [description]
				     * @param  {[type]} s      [description]
				     * @return {[type]}        [description]
				     */
				    "implement" : function (o, interf) {
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
				            if (!JMVC.i18n[lng[i]]) {
				                JMVC.i18n[lng[i]] = true;
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
				     * [ description]
				     * @param  {[type]} o [description]
				     * @return {[type]}   [description]
				     */
				    "purge" : function (o) {
				        o = {};
				        o = null;
				    },
				
				    /**
				     * [ description]
				     * @param  {[type]} el  [description]
				     * @param  {[type]} obj [description]
				     * @return {[type]}     [description]
				     */
				    "prototipize" : function prt(el, obj) {
				        var  p, i = 0, l;
				        if (el instanceof Array) {
				            for (l = el.length; i < l; i += 1) {
				                prt(el[i], obj);
				            }
				        }
				        
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
				        var arg = Array.prototype.slice.apply(arguments) || [];
				        try {
				            W.console.log.apply(W.console, arg);
				        } catch (e1) {
				            try {
				                W.opera.postError.apply(W.opera, arg);
				            } catch (e2) {
				                W['log' in W ? 'log' : 'alert'](Array.prototype.join.call(arg, " "));
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
				    "htmlspecialchars_decode" : function (html) {
				        return html
				            .replace(/&amp;/g, "&")
				            .replace(/&lt;/g, "<")
				            .replace(/&gt;/g, ">")
				            .replace(/&quot;/g, '"')
				            .replace(/&#039;/g, "'");
				    },
				
				    /**
				     * Every each implementation is really bad compared to a native loop,
				     * so, if possible , do not use that function.
				     * @param  {[type]} o    [description]
				     * @param  {[type]} func [description]
				     * @return {[type]}      [description]
				     */
				    "each" : function (o, func) {
				        var i, l, ret, type;
				        type = ({}).toString.call(o).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
				        func.$break = false;
				        func.$continue = false;
				        func['break'] = /*func.exit = */function () {func.$break = true; };
				        func['continue'] = /*func.skip = */function () {func.$continue = true; };
				        
				        if (type === 'array') {
				            ret = [];
				            i = 0;
				            l = o.length;
				            for (null; i < l; i++) {
				                if (func.$continue) {func.$continue = false; continue; }
				                if (func.$break) {break;}
				                //ret.push(func.call(o, o[i], i));
				                ret[i] = func.call(o, o[i], i);
				            }
				        } else if (type === 'object') {
				            ret = {};
				            for (i in o) {
				                if (o.hasOwnProperty(i)) {
				                    if (func.$continue) {func.$continue = false; continue; }
				                    if (func.$break) {break; }
				                    (function (j) {ret[j] = func.call(o, o[j], j); })(i);
				                }
				            }
				        } else {
				            ret = func(o);
				        }
				        return ret;
				    },
				
				    "promise" : {
				        'create' : function () {return new Promise(); },
				        'join' : function () {},
				        'chain' : function () {}
				    },
				
				    "parselang" : function (cnt) {
				
				        var RXlng = "\\[L\\[([\\S\\s]*?)\\]\\]",
				            lang = true,
				            tmp,
				            limit = 100000,
				            def_lang = $JMVC.cookie.get('lang') || defaultlang;
				        
				        JMVC.vars.currentlang = def_lang;
				
				        $JMVC.lang(JMVC.vars.currentlang);
				
				        if (JMVC.i18n[JMVC.vars.currentlang] === true) {
				            $JMVC.io.get(JMVC.vars.baseurl + PATH.lang + JMVC.vars.currentlang + (JMVC_PACKED || '') + '.js', function (ln) {
				                jmvc.jeval(ln);
				            },  false);
				        }
				
				        // check for [[js code]], es. [[JMVC.vars.baseurl]] will be rendered as the value of baseurl
				        while (limit) {
				            lang = new RegExp(RXlng, 'gm').exec(cnt);
				            tmp = '';
				            
				            if (!!lang) {
				                tmp = $JMVC.i18n[JMVC.vars.currentlang] && $JMVC.i18n[JMVC.vars.currentlang][lang[1]] ? $JMVC.i18n[JMVC.vars.currentlang][lang[1]] : lang[1];
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
				/*
				
				                                    _/                            _/   
				     _/_/_/    _/  _/_/    _/_/    _/    _/_/      _/_/_/    _/_/_/    
				    _/    _/  _/_/      _/_/_/_/  _/  _/    _/  _/    _/  _/    _/     
				   _/    _/  _/        _/        _/  _/    _/  _/    _/  _/    _/      
				  _/_/_/    _/          _/_/_/  _/    _/_/      _/_/_/    _/_/_/       
				 _/                                                                    
				_/
				
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
                /*
                
                    _/_/_/_/                                                    
                   _/        _/  _/_/  _/  _/_/    _/_/    _/  _/_/    _/_/_/   
                  _/_/_/    _/_/      _/_/      _/    _/  _/_/      _/_/        
                 _/        _/        _/        _/    _/  _/            _/_/     
                _/_/_/_/  _/        _/          _/_/    _/        _/_/_/ 
                
                */
                
                Errors = {
                    'Network' : function (msg) {
                        this.name = 'Network';
                        this.msg = msg || "";
                    },
                    'BadParams' : function (msg) {
                        this.name = 'BadParams';
                        this.msg = msg || "";
                    },
                    'BadName' : function (msg) {
                        this.name = 'BadName';
                        this.msg = msg || "";
                    },
                    'BadImplement' : function (msg) {
                        this.name = 'BadImplement';
                        this.msg = msg || "";  
                    },
                    'ControllerNotFound' : function (msg) {
                        this.name = 'ControllerNotFound';
                        this.msg = msg || "";  
                    },
                    'ActionNotFound' : function (msg) {
                        this.name = 'ActionNotFound';
                        this.msg = msg || "";  
                    }
                
                };
                jmvc.multi_inherit(Errors, Error);
                /*
                
                     _/_/_/      _/_/_/  _/  _/_/    _/_/_/    _/_/    _/  _/_/   
                    _/    _/  _/    _/  _/_/      _/_/      _/_/_/_/  _/_/        
                   _/    _/  _/    _/  _/            _/_/  _/        _/           
                  _/_/_/      _/_/_/  _/        _/_/_/      _/_/_/  _/            
                 _/                                                               
                _/  
                
                */
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
                                'viewname' : "^(.[A-z_\/]*)\\s" // for getting only the viewname
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
                        //beforeParse hook
                        jmvc.hook_check('onBeforeParse', [cont]);
                        
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
                            } else {
                                i = limit;
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
                
                        //afterParse hook
                        jmvc.hook_check('onAfterParse', [cont]);
                        return cont;
                    }
                };
                //END PARSER
                /*
                
                    _/_/_/_/                                    _/      
                   _/        _/      _/    _/_/    _/_/_/    _/_/_/_/   
                  _/_/_/    _/      _/  _/_/_/_/  _/    _/    _/        
                 _/          _/  _/    _/        _/    _/    _/         
                _/_/_/_/      _/        _/_/_/  _/    _/      _/_/
                
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
                /*
                
                    _/_/_/                                        _/                     
                   _/    _/  _/  _/_/    _/_/    _/_/_/  _/_/          _/_/_/    _/_/    
                  _/_/_/    _/_/      _/    _/  _/    _/    _/  _/  _/_/      _/_/_/_/   
                 _/        _/        _/    _/  _/    _/    _/  _/      _/_/  _/          
                _/        _/          _/_/    _/    _/    _/  _/  _/_/_/      _/_/_/ 
                
                
                
                ty https://github.com/stackp/promisejs
                
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
                    var func = jmvc.delegate(cback, ctx);
                    if (this.completed) {
                        func(this.res, this.err);
                    } else {
                        this.cbacks[this.len] = func;
                        this.len += 1;
                    }
                    return this;
                };
                /**
                 * [Interface description]
                 * @constructor
                 * @param {[type]} f [description]
                 */
                Interface = function (a) {
                    this.mthds = a;
                };
                
                /**
                 * [prototype description]
                 * @type {Object}
                 */
                Interface.prototype = {
                    /**
                     * [addMethod description]
                     * @param {[type]} mthd [description]
                     */
                    addMethod : function (mthd) {
                        this.mthds[mthd.name] || (this.mthds[mthd.name] = mthd);
                    },
                    /**
                     * [removeMethod description]
                     * @param  {[type]} mthd [description]
                     * @return {[type]}      [description]
                     */
                    removeMethod : function (mthd) {
                        this.mthds[mthd] && (this.mthds[mthd] = null);
                    },
                    /**
                     * [check description]
                     * @param  {[type]} o [description]
                     * @return {[type]}   [description]
                     */
                    check : function (o) {
                        var m,
                            i = 0,
                            l = this.mthds.length,
                            obj = new o();
                        for (m in this.mthds) {
                            if (typeof obj[this.mthds[m]] !== 'function') {
                                return false;
                            }
                        }
                        obj = null;
                        return true;
                    }
                };
                /*
                                                   _/                          _/  _/                      
                    _/_/_/    _/_/    _/_/_/    _/_/_/_/  _/  _/_/    _/_/    _/  _/    _/_/    _/  _/_/   
                 _/        _/    _/  _/    _/    _/      _/_/      _/    _/  _/  _/  _/_/_/_/  _/_/        
                _/        _/    _/  _/    _/    _/      _/        _/    _/  _/  _/  _/        _/           
                 _/_/_/    _/_/    _/    _/      _/_/  _/          _/_/    _/  _/    _/_/_/  _/            
                                                                                                  
                */
                
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
                /*
                
                                                    _/            _/   
                   _/_/_/  _/_/      _/_/      _/_/_/    _/_/    _/    
                  _/    _/    _/  _/    _/  _/    _/  _/_/_/_/  _/     
                 _/    _/    _/  _/    _/  _/    _/  _/        _/      
                _/    _/    _/    _/_/      _/_/_/    _/_/_/  _/
                
                */
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
                /*
                
                  _/      _/  _/                                
                 _/      _/        _/_/    _/      _/      _/   
                _/      _/  _/  _/_/_/_/  _/      _/      _/    
                 _/  _/    _/  _/          _/  _/  _/  _/       
                  _/      _/    _/_/_/      _/      _/
                
                */
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
                // meat to receive a model, all name
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
                                    this.content = this.content.replace(new RegExp("\\$" + j + "\\$", 'g'), obj.get(j) || '');
                                }
                            }
                        }
                        // now jmvc parse vars
                        for (j in $JMVC.vars) {
                            if ($JMVC.vars.hasOwnProperty(j)) {
                                this.content = this.content.replace(new RegExp("\\$" + j + "\\$", 'gm'), $JMVC.vars[j] || '');
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
                 * [setFromUrl description]
                 * @param {[type]} vname [description]
                 * @param {[type]} alt   [description]
                 */
                View.prototype.setFromUrl = function (vname, alt) {
                    this.set(String(vname), JMVC.controllers[JMVC.c].get(vname) || alt || 'unset');
                    // allow chain
                    return this;
                };
                /*
                 * [getFromUrl description]
                 * @param {[type]} vname [description]
                 * @param {[type]} alt   [description]
                 */
                View.prototype.getFromUrl = function (vname) {
                    return JMVC.controllers[JMVC.c].get(vname) || false;
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
                    
                    //cont = Parser.parse(cont);
                    
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
                    cont = Parser.parse(cont);
                    
                    this.content = cont;
                
                
                    if(!$JMVC.loaded){
                
                        // books rendering in body or elsewhere, on load
                        $JMVC.events.bind(W, 'load', function () {
                            
                            //call before render
                            $JMVC.events.startRender();
                
                            $JMVC.loaded = true;
                            may_trg = target ? $JMVC.dom.find(target) : false;
                            trg = may_trg || WD.body;
                
                
                            $JMVC.vars.rendertime = +new Date() - time_begin;
                            
                            // before render
                            that.content = jmvc.hook_check('onBeforeRender', [that.content]) || that.content;
                
                            // render
                            $JMVC.dom.html(trg, that.content);
                
                            // after render
                            jmvc.hook_check('onAfterRender', [that.content]);
                
                            // may be a callback? 
                            cback && cback.apply(this, argz || []);
                            //trigger end of render queue
                            $JMVC.events.endRender();
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
                /*
                
                             _/  _/                                  _/                _/                            
                        _/_/_/        _/_/_/  _/_/_/      _/_/_/  _/_/_/_/    _/_/_/  _/_/_/      _/_/    _/  _/_/   
                     _/    _/  _/  _/_/      _/    _/  _/    _/    _/      _/        _/    _/  _/_/_/_/  _/_/        
                    _/    _/  _/      _/_/  _/    _/  _/    _/    _/      _/        _/    _/  _/        _/           
                     _/_/_/  _/  _/_/_/    _/_/_/      _/_/_/      _/_/    _/_/_/  _/    _/    _/_/_/  _/            
                                          _/                                                                         
                                         _/                                      
                
                */
                // Dispatch url getting controller, action and parameters
                //          
                dispatched = (function () {
                    var mid = {
                            'url' : WDL.protocol + US + US + WDL.hostname + WDL.pathname + WDL.search,
                            'proto' : WDL.protocol,
                            'host' : WDL.hostname,
                            'path' : WDL.pathname,
                            'search' : WDL.search,
                            'hash' : WDL.hash.substr(1),
                            'port' : WDL.port ? ':' + WDL.port : ''
                        },
                
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
                        len = 0,
                        baseurl = WDL.protocol + US + US + WDL.hostname;
                
                
                
                    //maybe is the case to load testsuite
                    if (els[0].match(/test_/)) {
                        Modules.push('testsuite');
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
                    if (mid.search !== "") {
                        // splitting an empty string give an array with one empty string
                        els = mid.search.substr(1).split('&');
                
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
                        'baseurl' : baseurl,
                        'port' : mid.port,
                        "search" : mid.search,
                        'hash' : mid.hash
                    };
                    //ret.controller = jmvc_normalize(ret.controller);
                    return ret;
                })();
                /*
                
                         _/  _/      _/  _/      _/    _/_/_/                            _/                          
                        _/  _/_/  _/_/  _/      _/  _/              _/_/    _/    _/  _/_/_/_/    _/_/    _/  _/_/   
                       _/  _/  _/  _/  _/      _/  _/            _/    _/  _/    _/    _/      _/_/_/_/  _/_/        
                _/    _/  _/      _/    _/  _/    _/            _/    _/  _/    _/    _/      _/        _/           
                 _/_/    _/      _/      _/        _/_/_/        _/_/      _/_/_/      _/_/    _/_/_/  _/
                
                */          
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
                    
                    set : jmvc.set,
                    get : jmvc.get,
                    del : jmvc.del,
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
                /*
                
                $JMVC is DONE
                clean up
                */
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
                
                return $JMVC;
            }
        )();
    /** mandatory modules **/
    /**
    AJAX sub-module
    ---------------
    
    This is the experimental versionof ajax utilities
    */
    JMVC.ajax = {
        count : 0,
        types : {
            'xml' : 'text/xml',
            'html' : 'text/html',
            'json' : 'application/json'
        },
        getReq : function () {
            var xhr,
                IEfuckIds = ['Msxml2.XMLHTTP', 'Msxml3.XMLHTTP', 'Microsoft.XMLHTTP'],
                i = 0,
                len = IEfuckIds.length;
            try {
                xhr = new W.XMLHttpRequest();
            } catch (e1) {
                for (null; i < len; i += 1) {
                    try {
                        xhr = new ActiveXObject(IEfuckIds[i]);
                    } catch (e2) {continue; }
                }
                !xhr && JMVC.debug('No way to initialize hxr');
            }
            JMVC.gc(IEfuckIds, i, len);
            JMVC.ajax.count += 1;
            return xhr;
        },
        call : function (options) {
            var xhr = {
                req : JMVC.ajax.getReq(),
                uri : options && options.uri,
                method : options && 'method' in options ? options.method : 'POST',
                cback : options && 'cback' in options ? options.cback : function () {} ,
                cb_opened : options && 'opened' in options ? options.opened : function () {},
                cb_loading : options && 'loading' in options ? options.loading : function () {},
                cb_error : options && 'error' in options ? options.error : function () {},
                cb_abort : options && 'abort' in options ? options.abort : function () {},
                sync : options && options.sync,
                data : options && options.data || false,
                type : (options && options.type) || JMVC.ajax.types.html,
                cache : (options && options.cache !== undefined) ? options.cache : true,
                targetType : options.type === 'xml' ?  'responseXML' : 'responseText',
                timeout : options && options.timeout || 3000,
                complete : false,
                res : false,
                ret : false,
                state : false
            };
            xhr.req.onerror = function () {xhr.cb_error && xhr.cb_error.apply(null, arguments); };
            xhr.req.onabort = function () {xhr.cb_abort && xhr.cb_abort.apply(null, arguments); };
            xhr.req.onreadystatechange = function () {
                if (xhr.req.readyState == 1) {
                    switch (xhr.method) {
                        case 'POST':
                            try {
                                xhr.req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                                xhr.req.send(xhr.data || true);
                            } catch (e1) {}
                        break;
                        case 'GET':
                            try {
                                xhr.req.setRequestHeader("Accept", JMVC.ajax.types[xhr.type] + "; charset=utf-8");
                                xhr.req.send(null);
                            } catch (e2) {}
                        break;
                    }
                } else if (xhr.req.readyState == 2) {
                    console.debug('2');
                } else if (xhr.req.readyState == 3) {
                    console.debug('3');
                } else if (xhr.req.readyState == 4) {
    
                    if(xhr.req.status !== 200){
                        xhr.req.onerror();
                        xhr.complete = true;
                        return;
                    }
    
                    xhr.complete = true;
                    
                    xhr.ret = xhr.type == 'json' ? new Function("return " + xhr.req[xhr.targetType])() : xhr.req[xhr.targetType];
    
                    //cback
                    xhr.cback && (function (r) {xhr.cback(r); })(xhr.ret);
                    
                    //IE leak ?????
                    W.setTimeout(function () {
                        JMVC.ajax.count -= 1;
                        JMVC.purge(xhr.req);
                    }, 50);
    
                    return xhr.ret;
                }
            };
            xhr.req.open(xhr.method, (xhr.method === 'GET') ? (xhr.uri + ((xhr.data) ? '?' + xhr.data : "")) : xhr.uri, xhr.sync);
        },
        post : function () {},
        get : function () {},
        getJson : function () {},
        getXML : function () {}
    };
    
    /**
    
    
    ------------------
    
            _/           
                 _/_/    
          _/  _/    _/   
         _/  _/    _/    
        _/    _/_/ 
    
    ------------------
    
    **/
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
                        xhr = new ActiveXObject(IEfuckIds[i]);
                    } catch (e2) {continue; }
                }
                if (!xhr) {
                    JMVC.debug('No way to initialize hxr');
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
                cb_abort = (options && options.abort) || function () {},
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
                //console.dir(xhr)
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
        'get' : function (uri, cback, sync, data, cache, err) {
            return JMVC.io.ajcall(uri, {cback : cback, method : 'GET', sync : sync, data : data, cache : cache, error : err});
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
    
    -----------------------------
    
                   _/      _/  _/   
      _/    _/  _/_/_/_/      _/    
     _/    _/    _/      _/  _/     
    _/    _/    _/      _/  _/      
     _/_/_/      _/_/  _/  _/ 
    
    -----------------------------
    
    **/
    JMVC.util = {
        /**
         * [ description]
         * @param  {[type]} d [description]
         * @return {[type]}   [description]
         */
        'deg2rad' : function (d) {return JMVC.M.PI * d / 180; },
    
    
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
         * @param  {[type]} scriptname [description]
         * @return {[type]}            [description]
         */
        'getParameters' : function (scriptid, pname) {
                var script = JMVC.dom.find('#' + scriptid),
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
        'getType' : function (o) {
            return ({}).toString.call(o).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
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
        },
    
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
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        'isSet' : function (e) {return typeof e !== 'undefined'; },
    
    
        /**
         * [ description]
         * @param  {[type]} el   [description]
         * @param  {[type]} type [description]
         * @return {[type]}      [description]
         */
        'isTypeOf' : function (el, type) {return typeof el === type; },
    
        
        /**
         * [ description]
         * @param  {[type]} ) {return      +new Date( [description]
         * @return {[type]}   [description]
         */
        'now' : function () {return +new Date(); },
    
    
    
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
    
    
        'uniqueid' : new function () {
            var count = 0;
            this.toString = function () {
                return 'JMVCID' + ++count;
            }
        }
    
    };
    
    /**
    
    
    ---------------------------------------
    
                 _/                           
            _/_/_/    _/_/    _/_/_/  _/_/    
         _/    _/  _/    _/  _/    _/    _/   
        _/    _/  _/    _/  _/    _/    _/    
         _/_/_/    _/_/    _/    _/    _/
    
    ---------------------------------------
    
    **/
    JMVC.dom = {
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
         * @param  {[type]} where [description]
         * @param  {[type]} what  [description]
         * @return {[type]}       [description]
         */
        'append' : function (where, what) {
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
         * @return {[type]} [description]
         */
        'body' : function () {
            return WD.body;
        },
    
        'childs' : function (node) {
            return node.childNodes;
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
            
            return ((ret instanceof Array) && ret.length == 1) ? ret[0] : ret;
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
                tof = (value == undefined),
                isRootArray = root instanceof Array;
            
            root = isRootArray ? root : root || JMVC.WD.body;
            whole = isRootArray ? root : root.all ? root.all : root.getElementsByTagName('*');
    
            for(var i = whole.length; i--; ) {
                val = whole[i].getAttribute(attr);
            
                if (typeof val == "string" && (tof || val == value)) {
                  ret.push(whole[i]);
                }
            }
            return ret;
        },
    
    
    
        'firstAncestor' : function(el, tagName) {
            while(el = el.parentNode, el && (el.tagName != tagName.toUpperCase()));
            return el;
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
         * @param  {[type]} node          [description]
         * @param  {[type]} referenceNode [description]
         * @return {[type]}               [description]
         */
        'insertBefore' : function (node, referenceNode) {
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
        'isElement' : function (o) {
            return (
                typeof HTMLElement === "object" ?
                    o instanceof HTMLElement
                : //DOM2
                    o && typeof o === "object" && o.nodeType === 1 && typeof o.nodeName==="string"
            );
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
         * @param  {[type]} src [description]
         * @return {[type]}     [description]
         */
        'preloadImage' : function (src, fn) {
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
                for (var i  = 0, l = el.length; i < l; i++) {
                    JMVC.dom.remove(el[i]);
                }
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
            el.className = el.className.replace(reg, ' ');
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
    
    
    ------------------------------------------------------------------
    
                                                       _/                
            _/_/    _/      _/    _/_/    _/_/_/    _/_/_/_/    _/_/_/   
         _/_/_/_/  _/      _/  _/_/_/_/  _/    _/    _/      _/_/        
        _/          _/  _/    _/        _/    _/    _/          _/_/     
         _/_/_/      _/        _/_/_/  _/    _/      _/_/  _/_/_/ 
    
    ------------------------------------------------------------------
    
    **/
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
                for (var i =0, l = el.length; i < l; i++) {
                    JMVC.events.bind(el[i], tipo, fn);
                }
                return ;
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
                for (var i = 0, l = el.length; i < l; i ++) {
                    JMVC.events.one(el[i], tipo, fn);
                }
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
            
            e = e ? e : JMVC.W.event;
            var targetElement = e.currentTarget || (typeof e.target !== "undefined") ? e.target : e.srcElement;
            if (!targetElement) {
                return false;
            }
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
        'startRender' : function () {
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
        'endRender' : function () {
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
    
    
    -----------------------------------------------
    
            _/                                  _/   
           _/_/_/      _/_/      _/_/_/    _/_/_/    
          _/    _/  _/_/_/_/  _/    _/  _/    _/     
         _/    _/  _/        _/    _/  _/    _/      
        _/    _/    _/_/_/    _/_/_/    _/_/_/ 
    
    -----------------------------------------------
    
    **/
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
        'denyiXrame' : function () {
            return W.top !== W.self &&  (W.top.location = JMVC.vars.baseurl);
        },
        
        'favicon' : function (file) {
            JMVC.head.link('icon', {rel : "shortcut icon", href : JMVC.vars.baseurl + file});
        },
    
        /**
         * [ description]
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
         * [ description]
         * @param  {[type]} d [description]
         * @return {[type]}   [description]
         */
        'lastmodified' : function (d) {
            // <meta http-equiv="last-modified" content="Thu, 03 Jan 2013 14:56:54 +0000" />
            var meta = this.element.getElementsByTagName('meta'),
                newmeta = JMVC.dom.create(
                    'meta', {
                        'http-equiv' : 'last-modified',
                        'content' : (d || JMVC.vars.last_modified || new Date()).toString()
                    }
                ),
                len = meta.length;
            len ? JMVC.dom.insertAfter(newmeta, meta.item(len - 1)) : this.element.appendChild(newmeta);
            /*
            if (len) {
                JMVC.dom.insertAfter(newmeta, meta.item(len - 1));
            } else {
                this.element.appendChild(newmeta);
            }*/
        },
    
        'lib' : function (l) {
            var libs = {
                'jquery' : 'http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js',
                'jsapi' : 'https://www.google.com/jsapi'
            };
            (l in libs) && JMVC.head.addscript(libs[l]);
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
        'meta' : function (name, value, rewrite) {
            
            //exit if rewrite is not set and the meta name already exists
            rewrite = !!rewrite;
            var metas = this.metas(),
                maybeExisting = JMVC.dom.findByAttribute('name', name, metas),
                exists = maybeExisting.length;
            
            if (!rewrite && exists) {
                return false;
            }
    
            rewrite && exists && JMVC.dom.remove(maybeExisting[0]);
    
            //get last meta if exists
            var meta = this.element.getElementsByTagName('meta'),
                newmeta = JMVC.dom.create('meta', {'name' : name, 'content' : value}),
                len = meta.length;
            len ? JMVC.dom.insertAfter(newmeta, meta.item(len - 1)) : this.element.appendChild(newmeta);
        },
    
        /**
         * return all document meta tags
         * @return {[type]} [description]
         */
        'metas' : function () {
            return JMVC.array.coll2array(JMVC.WD.getElementsByTagName('meta'));
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
    
    /**
     *
     * ARRAY sub-module
     *
     */
    
    JMVC.array = {
        /**
         * Clone an existing array
         * @param {Array} arr the array that should be cloned
         * @return {Array} the cloned array
         */
        'arrayClone' : function (arr) {
            return arr.concat();
        },
    
        /**
         * Safely converts a collection to an array
         * @param  {[type]} coll [description]
         * @return {[type]}      [description]
         */
        'coll2array' : function (coll) {
            var a = [],
                i = 0;
            //what if coll[i] element is false? loop breaks
            //but this is not the case since collection has no falsy values
            for (null; coll[i]; a[i] = coll[i++]);
            return a;
        },
    
        /**
         * Check if an array contains or not a value
         * @param  {Array} arr the array 
         * @param  {[type]} myvar [description]
         * @return {[type]}       [description]
         */
        'inArray' : function (arr, mvar) {
            /*
            var i = arr.length;
            while (i-- && arr[i] !== mvar);
            return i;
            */
            var l = arr.length;
            for (null; l-- && arr[l] !== mvar; null);
            return l;
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
    
    /**
    
    -------------------------------------------------------
    
                    _/                _/                      
         _/_/_/  _/_/_/_/  _/  _/_/      _/_/_/      _/_/_/   
      _/_/        _/      _/_/      _/  _/    _/  _/    _/    
         _/_/    _/      _/        _/  _/    _/  _/    _/     
    _/_/_/        _/_/  _/        _/  _/    _/    _/_/_/      
                                                     _/       
                                                _/_/ 
    
    -------------------------------------------------------
    
    **/
    JMVC.string = {
        /**
         * [ description]
         * @param  {[type]} code [description]
         * @return {[type]}      [description]
         */
        'code2str' : function (code) {
            return String.fromCharCode.apply(null, code);
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
         * @param  {[type]} s){return s.replace(/^\s+/g [description]
         * @param  {[type]} ''         [description]
         * @return {[type]}            [description]
         */
        'ltrim' : function (s) {return s.replace(/^\s+/g, ''); },
    
        'multireplace' : function (cnt, o, i) {
            for (i in o) {
                cnt = cnt.replace(o[i], i);
            }
            return cnt;
        },
    
        /**
         * [ description]
         * @param  {[type]} val  [description]
         * @param  {[type]} el   [description]
         * @param  {[type]} pos  [description]
         * @param  {[type]} lngt [description]
         * @return {[type]}      [description]
         */
        'padme' : function (val, el, pos, len) {
            len = len || 2;
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
        'str2code' : function (str) {
            var out = [],
                i = 0,
                l = str.length;
            while (i < l) {
                out.push(str.charCodeAt(i));
                ++ i;   
            }
            return out;
        },
    
        /**
         * [ description]
         * @param  {[type]} str [description]
         * @param  {[type]} n   [description]
         * @return {[type]}     [description]
         */
        'strRepeat' : function (str, n) {
            var t = [];
            while (n -= 1) {t.push(str.replace(/\%n\%/g, n)); }
            return t.reverse().join('');
        },
    
        /**
         * [ description]
         * @param  {[type]} s){return s.replace(/^\s+|\s+$/g [description]
         * @param  {[type]} ''         [description]
         * @return {[type]}            [description]
         */
        'trim' : function (s) {return s.replace(/^\s+|\s+$/g, ''); }
    };
    
    /**
    
    ------------------------------------------------------
    
                 _/        _/                        _/      
        _/_/    _/_/_/          _/_/      _/_/_/  _/_/_/_/   
     _/    _/  _/    _/  _/  _/_/_/_/  _/          _/        
    _/    _/  _/    _/  _/  _/        _/          _/         
     _/_/    _/_/_/    _/    _/_/_/    _/_/_/      _/_/      
                      _/                                     
                   _/ 
    
    ------------------------------------------------------
    
    **/
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
        'inObject' : function (obj, field) {
            return (typeof obj === 'object' && obj[field]);
        },
    
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
        }
    };
    
    /**
    
    --------------------------------------------------------
    
                                    _/                _/       
       _/_/_/  _/_/      _/_/_/  _/_/_/_/    _/_/_/  _/_/_/    
      _/    _/    _/  _/    _/    _/      _/        _/    _/   
     _/    _/    _/  _/    _/    _/      _/        _/    _/    
    _/    _/    _/    _/_/_/      _/_/    _/_/_/  _/    _/ 
    
    --------------------------------------------------------
    
    **/
    JMVC.match = {
        email : function (str) {
            return !!str.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        },
        url : function (str) {
            return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(str);
        }
    };
    
    /**
    
    ------------------------------------
    
       _/_/_/    _/    _/  _/_/_/  _/_/    
      _/    _/  _/    _/  _/    _/    _/   
     _/    _/  _/    _/  _/    _/    _/    
    _/    _/    _/_/_/  _/    _/    _/ 
    
    ------------------------------------
    
    **/
    JMVC.num = {
    	getNum : function (str) {return parseInt(str, 10); },
    	getFloat : function (str) {return parseFloat(str, 10); },
    	pFloat : function (f) {return 1 * f; },
    	pInt : function (i) {return i >> 0; },
    	mRound : function (n) {return (n + 0.5) >> 0; },
    	mFloor : function (n) {(n > 0 ? n : n + 1) >> 0; },
    	mCeil : function (n) {return (n + (n > 0 && !!(n % 1))) >> 0; },
    	num : function (n) {return parseFloat(n.toFixed(10), 10); }
    };
    
    /*
    
        _/_/_/    _/_/_/_/  _/      _/  _/_/_/    _/_/_/_/  _/_/_/    
       _/    _/  _/        _/_/    _/  _/    _/  _/        _/    _/   
      _/_/_/    _/_/_/    _/  _/  _/  _/    _/  _/_/_/    _/_/_/      
     _/    _/  _/        _/    _/_/  _/    _/  _/        _/    _/     
    _/    _/  _/_/_/_/  _/      _/  _/_/_/    _/_/_/_/  _/    _/ 
    
    */
    
    l = JMVC.modules.length;
    if (l) {
        i = 0;
        while (i < l) {
            JMVC.require(JMVC.modules[i]);
            i += 1;
        }
    }
    
    JMVC.p.lang && JMVC.cookie.set('lang', JMVC.p.lang);
    
    JMVC.render();
    //
}(this);
JMVC.W.onerror = function(errorMsg, url, lineNumber) {
    JMVC.debug("Uncaught error " + errorMsg + " in " + url + ", lines " + lineNumber);
};
