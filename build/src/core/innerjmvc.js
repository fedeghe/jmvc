/*--------
JMVC inner
--------*/
jmvc = {
    check : function (f, p) {
        try {
            f.apply(null, p || []);
        } catch (e) {
            Errors.notify(e);
        }
    },

    /**
     * [code description]
     * @return {[type]} [description]
     */
    code  : function () {

        
        
// function code() {
//   var cnt = document.documentElement.outerHTML;

//   // remove comments
//   cnt = cnt.replace(/<!--.*?-->/g, '');

//   //remove spaces between tags

//   cnt = cnt.replace(/>[\s|\t]*</g, '><')
//     .replace(/[\n|\t|\r]/g, '')

//     .split(/(<[^>]+>)/ig)

  

//   return cnt;
// }

        var padding = 20,
            w = window.open("","","scrollbar=1,top=" + padding + ",left=" + padding + ",width=" + (window.innerWidth - padding * 2) ), //  + ",height=" + (window.innerHeight - padding * 2)),
            html = window.document.documentElement.outerHTML,
            out = jmvc.formatCode(html);

        w.document.body.style.overflow = 'scroll';
        w.document.body.innerHTML = '<pre style="overflow:scroll; height:100%">' + JMVC.htmlChars(out) + '</pre>';
        //window.document.documentElement.outerHTML
    },

    formatCode : function (mup) {
        var cnt = mup || document.documentElement.outerHTML,
            tb = 0,
            out = "",
            tabChar = "&nbsp;&nbsp;&nbsp;&nbsp;",
            nTab = function () {
                return "\n" + (tb>0 ? (new Array(tb + 1)).join(tabChar) : '');
            },
            RX = {
                open : /^<([^\/].*[^\/])>$/,    // starts with <; has no > within; do not ends with />; ends with >
                close : /^<\/(.*)>$/,           // starts with </; has no < within; ends with >
                autoclose : /^<[^>]*\/>$/,      // starts with >; has no > within; ends with />
                text : /^[^<]*$/,               // do not starts with <
                special : /<(meta|link|br|img|col)+(\s[^>]*|>)?\/?>/ // starts with <; is a meta of link or br
            },
            TYPE = {special:1, open:2, close:3, autoclose:4, text:5},
            checktype = function (t) {
                /*
                console.debug('TAG : ' + t);
                console.debug('special : ' + t.match(RX.special));
                console.debug('open : ' + t.match(RX.open));
                console.debug('close : ' + t.match(RX.close));
                console.debug('autoclose : ' + t.match(RX.autoclose));
                console.debug('text : ' + t.match(RX.text));
                console.debug('=================' + "\n\n\n");
                */
                if (t.match(RX.special)) {
                    return TYPE.special;
                } else if(t.match(RX.open)) {
                    return TYPE.open;
                } else if(t.match(RX.close)) {
                    return TYPE.close;
                } else if(t.match(RX.autoclose)) {
                    return TYPE.autoclose;
                } else if(t.match(RX.text)) {
                    return TYPE.text;
                }
            };
        // remove spaces between tags
        // comments
        // and get tags
        cnt = cnt.replace(/>[\s|\t]*</g, '><')
            // remove newline, carriage return, tabs
            .replace(/[\n|\t|\r]/g, '')
            .replace(/<!--([\s\S]*?)-->/mig, '')
            //split, one empty one full
            .split(/(<[^>]+>)/ig);

        // cleanup empty
        var els = [],
            i = 0, k = 0, l = cnt.length,
            tag;

        for (; i < l; i++) {
            if (!cnt[i]) continue;
            els.push(cnt[i]);           
        }
        
        for (i = 0, l = els.length; i < l; i++) {
            
            tag = els[i];
            t = checktype(tag);
            
          switch (t){
            case TYPE.special:
                out += nTab() + tag;

                break;
            case TYPE.open:
                out += nTab() + tag;
                tb++;
                break;
            case TYPE.close:
                tb--;
                out += nTab() + tag;
                break;
            case TYPE.autoclose:
                out += nTab() + tag;
                break;
            case TYPE.text: 
              out += tag;
              if ((i + 1) < l && checktype(els[i+1]) == TYPE.close) {
                out += els[i + 1];
                i++;
                tb--;
              }
            break;
          }
        }
        return out;
    },

    /**
     * [debug description]
     * @param  {[type]} msg [description]
     * @return {[type]}     [description]
     */
    debug: function (msg) {
        var now = +new Date(),
            diff = now - ($JMVC.vars.endtime || $JMVC.vars.starttime || now),
            ms = diff % 1000,
            s = ~~((diff % 60000) / 1000),
            m = ~~(diff / 60000),
            outmsg = '';


        outmsg += (m && (~~m + 'm')) +
            (s && (~~s + 's')) +
            ms + ' ms :: ';
        outmsg += msg;

        try {
            W.console.log(outmsg);
        } catch (e1) {
            try {
                W.opera.postError(outmsg);
            } catch (e2) {
                W[W.hasOwnProperty('log') ? 'log' : 'alert'](outmsg);
            }
        }
        return true;
    },

    /**
     * [description]
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    del: function (name, storage) {
        if (storage) {
            storage.removeItem(name);
        } else {
            if (name in $JMVC.vars) {
                $JMVC.vars[name] = null;
            }
        }
        return $JMVC;
    },

    /**
     * Returns a new function having as context the passed object
     * @param  {[type]} func [description]
     * @param  {[type]} ctx  [description]
     * @return {[type]}      [description]
     */
    delegate: function (func, ctx) {
        // get relevant arguments
        var args = Array.prototype.slice.call(arguments, 2);
        return function() {
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
    each: function (o, func) {
        //var type = ({}).toString.call(o).match(/\s([a-zA-Z]+)/)[1].toLowerCase(),
        // speed up
        var type = 'length' in o ? 'array' : 'object',
            i,
            l,
            ret;
        func._break = false;
        func._continue = false;
        func['break'] = /*func.exit = */ function() {
            func._break = true;
        };
        func['continue'] = /*func.skip = */ function() {
            func._continue = true;
        };

        if (type === 'array') {
            ret = [];
            i = 0;
            l = o.length;
            for (null; i < l; i += 1) {
                if (func._continue) {
                    func._continue = false;
                    continue;
                }
                if (func._break) {
                    break;
                }
                ret.push(func.call(o, o[i], i));
            }
        } else if (type === 'object') {
            ret = {};
            for (i in o) {
                if (o.hasOwnProperty(i)) {
                    if (func._continue) {
                        func._continue = false;
                        continue;
                    }
                    if (func._break) {
                        break;
                    }
                    (function(j) {
                        ret[j] = func.call(o, o[j], j);
                    })(i);
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
    extend: function(label, obj) {
        if(!label) {
            throw new JMVC.Errors.BadParams('Missing first parameter for extend');
        }
        if (!obj) {
            throw new JMVC.Errors.BadParams('Missing object parameter for extend');
        }
        //
        // ensures that the target namespace exists 
        var trg = jmvc.ns.make('JMVC.' + label);
        //
        //let the literal straigth inherith from Extension Object
        Extension.call(trg);
        //
        // if is a function return its execution
        if (typeof obj === 'function') {
            return jmvc.extend(label, obj());
        }

        (function(t, o) {
            var j;
            for (j in o) {
                o.hasOwnProperty(j) && t[j] === undefined && (t[j] = o[j]);
            }
        })(trg, obj);

        // and set a flag, that can be switched off as far as
        // if the object passed has a initCheck function
        // the extension will take place only if the initCheck
        // return truly value
        // 
        if (typeof obj.initCheck === 'function') {
            if (!obj.initCheck.call($JMVC)) {
                return false;
            }
            obj.initCheck = null;
        }
        //
        //maybe init, in case call it
        if (typeof obj.init === 'function') {
            obj.init.call($JMVC);
            //and clean
            obj.init = null;
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
    factory_method: function(type, name, params) {
        // using namespace ?
        var pieces = name.split('/'),
            path = false,
            path_absolute = $JMVC.vars.baseurl + US + 'app' + US + type + 's/',
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
    get: function(name, storage) {
        return storage ?
            JSON.parse(storage.getItem(name))
            :
            ($JMVC.vars[name] || undefined);
    },

    /**
     * [globalize description]
     * @param  {[type]} obj  [description]
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    globalize: function(obj, name) {
        JMVC.W[name] = obj;
    },

    /**
     * [hook description]
     * @param  {[type]} obj   [description]
     * @param  {[type]} force [description]
     * @return {[type]}       [description]
     */
    hook: function(obj, force) {
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
                            message: 'EXCEPTION : You`re trying to hook unallowed function "' + f + '"'
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
    hook_check: function(hookname, params) {
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
    htmlChars: function(text) {
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
    htmlCharsDecode: function(html) {
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
    implement: function(o, interf) {
        var i = 0,
            l = interf.length;

        for (null; i < l; i += 1) {
            if (!(
                (o.prototype && interf[i] in o.prototype && typeof o.prototype[interf[i]] === 'function') ||
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
    inherit: function(Child, Parent) {
        function T() {}
        T.prototype = Parent.prototype;
        Child.prototype = new T();
        Child.prototype.constructor = Child;
        Child.superClass = Parent.prototype;
        Child.baseConstructor = Parent;
        //Child.constructor = Child;
    },

    /**
     * eval function wrap
     * @param  string   code to be evalued
     * @return void
     */
    jeval: function(r) {
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
    lang: function() {
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
    model_inherit: function(m) {
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
    multi_inherit: function(Childs, Parent) {
        jmvc.each(Childs, function (ch) {
            jmvc.inherit(ch, Parent);
        });
    },

    /**
     * [ns description]
     * @type {Object}
     */
    ns: {

        /**
         * creates a namespace
         * @param  {[type]} str [description]
         * @param  {[type]} obj [description]
         * @param  {[type]} ctx [description]
         * @return {[type]}     [description]
         */
        make: function(str, obj, ctx) {
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
        check: function(ns, ctx) {
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
     * [parseLang description]
     * @param  {[type]} cnt [description]
     * @return {[type]}     [description]
     */
    parseLang: function(cnt) {
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
            lang = !! lang;
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
    prototipize: function (el, obj) {
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
    purge: function (o) {
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
    render: function (cback) {
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
            // 
            // the action exists in the controller
            if ('action_' + $JMVC.a in ctrl && typeof ctrl['action_' + $JMVC.a] === 'function') {
                ctrl['action_' + $JMVC.a]($JMVC.p);

            // maybe the action do not exists, but the controller contains a fallback
            // method called 'action', use it
            } else if ('action' in ctrl && typeof ctrl.action === 'function') {
                ctrl.action($JMVC.a, $JMVC.p);

            // otherwise use the 404 controller
            } else if ($JMVC.a.toLowerCase() !== JMVC_DEFAULT.action) {
                WDL.replace(US + '404' + US + 'msg' + US + 'act' + US + $JMVC.a);
            }

            /***************************/
            // AFTER HOOKS?
            //
            // @action hook 
            if ('after_' + $JMVC.a in ctrl && typeof ctrl['after_' + $JMVC.a] === 'function') {
                // ensure to happen after rendering
                $JMVC.hook({onAfterRender : function () {
                    ctrl['after_' + $JMVC.a]($JMVC.p);
                }});
            }
            //
            // @global hook
            if ('after' in ctrl && typeof ctrl.after === 'function') {
                // ensure to happen after rendering
                $JMVC.hook({onAfterRender : function () {
                    ctrl.after($JMVC.p);
                }});
            }

            //////////////////////////
        } else {
            $JMVC.c.toLowerCase() !== JMVC_DEFAULT.controller && WDL.replace(US + '404' + US + 'msg' + US + 'cnt' + US + $JMVC.c);
        }
        if (cback && typeof cback === 'function') {
            cback.call($JMVC);
        }
        if (!$JMVC.events.loadifyCalled) {
            WD.body.style.opacity = 1;
            WD.body.style.filter = 'alpha(opacity=100)';
        }
        $JMVC.loaded = true;
    },

    /**
     * 'test' is an exception, if passed then the path will be /app/test
     * @param {String} none [description]
     * @return {void} undefined
     */
    require: function() {
        var path, extNS, extNSlength, extname, s,
            i = 0,
            arg = arguments,
            lArg = arg.length,
            head = JMVC.WD.getElementsByTagName('head').item(0),
            cb = null,
            requireFileName = 'require.json';
        //
        while (i < lArg) {
            if (typeof arg[i] === 'function') {
                cb = arg[i];
            }
            if (typeof arg[i] === 'string' && !$JMVC.extensions[arg[i]]) {
                // check if the required end with /, in this case
                // 
                if (arg[i].match(/\/$/)) {

                    $JMVC.io.getJson(JMVC.vars.baseurl + PATH.ext + arg[i] + requireFileName, function (json) {
                        for (var j in json) {
                            jmvc.require(arg[i] + json[j]);
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

                        $JMVC.io.get(path, function(jres) {
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
            i++;
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
    set: function(name, content, storage) {
        
        if (JMVC.util.isObject(name)) {
            for (var i in name) {
                $JMVC.set(i, name[i], storage);
            }
            return $JMVC;
        }
        
        if (storage) {

            storage.setItem(name, JSON.stringify(content));
            
        } else {
            
            $JMVC.vars[name] = content;
        }
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
    xhrget: function(path, type, name, params) {
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
                            ret = $JMVC.views[name];
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

    // ignore these 3 functions
    get2: function(ns) {
        return jmvc.ns.check(ns, JMVC.vars);
    },

    set2: function(ns, val) {
        jmvc.ns.make(ns, val, JMVC.vars);
    },

    del2: function(ns) {
        jmvc.purge(jmvc.get2(ns));
    }
};
//-----------------------------------------------------------------------------