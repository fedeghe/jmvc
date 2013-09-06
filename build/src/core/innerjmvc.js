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
            //and delete
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
        if (hookname in hooks) {
            for (i in hooks[hookname]) {
                dyn = hooks[hookname][i].apply(null, dyn);
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
            jmvc.inherit($JMVC.controllers[$JMVC.c], Controller);
            // make an instance
            ctrl = new $JMVC.controllers[$JMVC.c]();
            // store it
            $JMVC.controllers[$JMVC.c] = ctrl;

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
        $JMVC.vars[name] && (delete $JMVC.vars[name]);
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
                path = JMVC.vars.baseurl + (arguments[i] === 'testsuite' ? PATH['test'] : PATH['ext'] + arguments[i] + US) + extname +  '.js';
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
                
                //.path = basepath;
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
        try {
            W.console.log.apply(W.console, arguments);
        } catch (e1) {
            try {
                W.opera.postError.apply(W.opera, arguments);
            } catch (e2) {
                W['log' in W ? 'log' : 'alert'](Array.prototype.join.call(arguments, " "));
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
            $JMVC.io.get(JMVC.vars.baseurl + PATH.lang + JMVC.vars.currentlang + '.js', function (ln) {
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