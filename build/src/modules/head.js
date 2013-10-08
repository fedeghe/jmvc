/*
---------------
HEAD sub-module
---------------
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
