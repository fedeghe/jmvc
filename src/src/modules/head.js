// ---------------+
// HEAD sub-module |
// ---------------+


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
    addScript : function (src, parse, explicit) {
        //
        var script,
            head,
            tmp,
            that = JMVC.head,
            //postmode = true,
            sync = true,
            script_content;
        if (parse) {
            if (explicit) {
                //script_content = JMVC.parse(src/* in this case is mean to be the content */);
                script_content = JMVC.parse(src, true);
                script = JMVC.dom.create('script', {type: 'text/javascript'}, script_content);
                head = that.element;
                head.appendChild(script);
            } else {
                /* get css content, async */
                tmp = JMVC.io.get(src, function (script_content) {
                    script_content = JMVC.parse(script_content, true);
                    script = JMVC.dom.create('script', {type: 'text/javascript'}, script_content);
                    head = that.element;
                    head.appendChild(script);
                }, /*postmode,*/ sync);
            }
        } else {
            script = explicit ?
                JMVC.dom.create('script', {type: 'text/javascript'}, src)
                :
                JMVC.dom.create('script', {type: 'text/javascript', src: src}, ' ');
            head = JMVC.head.element;
            head.appendChild(script);
        }
        return script;
    },
    /**
     * [ description]
     * @param  {[type]} src      [description]
     * @param  {[type]} parse    [description]
     * @param  {[type]} explicit [description]
     * @return {[type]}          [description]
     */
    addStyle : function (src, parse, explicit, idn) {
        var style,
            head,
            tmp,
            that = JMVC.head,
            //postmode = true,
            sync = true,
            rules,
            csscontent;
        if (parse) {
            if (explicit) {
                /* in this case src is meant to be the content */
                csscontent = JMVC.parse(src, true);

                head = that.element;
                style = WD.createElement('style');
                rules = WD.createTextNode("" + csscontent);

                style.type = 'text/css';
                if (style.styleSheet) {
                    style.styleSheet.cssText = rules.nodeValue;
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
                    rules = WD.createTextNode("" + csscontent);
                    //
                    style.type = 'text/css';
                    if (style.styleSheet) {
                        style.styleSheet.cssText = rules.nodeValue
                    } else {
                        style.appendChild(rules);
                    }
                    idn && JMVC.dom.attr(style, 'id', idn);
                    head.appendChild(style);
                    //
                }, /*postmode, */sync);
            }
        } else {
            style = JMVC.dom.create('link', {
                type : 'text/css',
                rel : 'stylesheet',
                href : src
            });
            head = JMVC.head.element;
            head.appendChild(style);
        }
        return style;
    },
    /**
     * [denyiXrame description]
     * @return {[type]} [description]
     */
    denyiXrame : function () {
        return W.top !== W.self && (W.top.location = JMVC.vars.baseurl);
    },
    /**
     * [favicon description]
     * @param  {[type]} file [description]
     * @return {[type]}      [description]
     */
    favicon : function (file) {
        JMVC.head.link('icon', {
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
    lastModified : function (d) {
        var meta = JMVC.head.element.getElementsByTagName('meta'),
            newmeta = JMVC.dom.create(
                'meta',
                {'http-equiv': 'last-modified', 'content': (d || JMVC.vars.last_modified || new Date()).toString()}
            ),
            len = meta.length;
        if (len) {
            JMVC.dom.insertAfter(newmeta, meta.item(len - 1));
        } else {
            JMVC.head.element.appendChild(newmeta);
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
            'prototype' : 'https://ajax.googleapis.com/ajax/libs/prototype/1.7.0.0/prototype.js',
            dropbox : 'https://www.dropbox.com/static/api/dropbox-datastores-1.0-latest.js'
        };
        l in libs && JMVC.head.addScript(libs[l]);
    },
    /**
     * [link description]
     * @param  {[type]} rel   [description]
     * @param  {[type]} attrs [description]
     * @return {[type]}       [description]
     */
    link : function (rel, attrs) {
        attrs.rel = rel;
        JMVC.dom.add(JMVC.head.element, 'link', attrs);
    },

    /**
     * [linkin description]
     * @return {[type]} [description]
     */
    linkin : function () {

        if(("standalone" in window.navigator) && window.navigator.standalone){
            JMVC.events.on(document, 'click', function(event) {
                var trg = event.target;
                while(trg.nodeName !== "A" && trg.nodeName !== "HTML") {
                    trg = trg.parentNode;
                }
                if ('href' in trg){
                    event.preventDefault();
                    document.location.href = trg.href;
                }
            });

            // # Now add bottom navigation
            // 
            // 
            // 
            // add body margin-bottom
            JMVC.css.style(JMVC.WDB, 'margin-bottom', '15px');
            //
            // create navigation
            var d = document.createElement('div'),
                secLeft = document.createElement('div'),
                secCenter = document.createElement('div'),
                secRight = document.createElement('div'),
                linkBack = document.createElement('div'),
                linkReload = document.createElement('div'),
                linkForward = document.createElement('div');
            JMVC.dom.addClass(d, 'jmvc-spa-bottom-navigation group');
            JMVC.dom.addClass(secLeft, 'back cnt respfixed');
            JMVC.dom.addClass(secCenter, 'reload cnt respfixed');
            JMVC.dom.addClass(secRight, 'forward cnt respfixed');
            JMVC.dom.append(secLeft, linkBack);
            JMVC.dom.append(secCenter, linkReload);
            JMVC.dom.append(secRight, linkForward);
            JMVC.dom.append(d, secLeft);
            JMVC.dom.append(d, secCenter);
            JMVC.dom.append(d, secRight);
            //
            // bind events
            JMVC.events.on(linkBack, 'click', function(){history.back();});
            JMVC.events.on(linkReload, 'click', function(){document.location.href = document.location.href;});
            JMVC.events.on(linkForward, 'click', function(){history.forward();});
            //
            // append it to body
            JMVC.dom.append(JMVC.WDB, d);
        }
    },

    /**
     * [meta description]
     * @param  {[type]} name    [description]
     * @param  {[type]} value   [description]
     * @param  {[type]} rewrite [description]
     * @return {[type]}         [description]
     */
    meta : function (name, value, rewrite) {

        

        var metas = JMVC.head.metas(),
            maybeExisting = JMVC.dom.findByAttribute('name', name, metas);

        // ensure bool
        rewrite = !!rewrite;
            
        if (!!maybeExisting.length) {
            // exit if rewrite is not set and the meta name already exists
            if (!rewrite) {
                return false;
            }
            JMVC.dom.remove(maybeExisting[0]);
        }
        // get last meta if exists
        //
        var meta = JMVC.head.element.getElementsByTagName('meta'),
            newmeta = JMVC.dom.create('meta', {'name' : name, 'content' : value}),
            len = meta.length;
        return len ? JMVC.dom.insertAfter(newmeta, meta.item(len - 1)) : JMVC.head.element.appendChild(newmeta);
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
     * [removeMeta description]
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    removeMeta : function (name) {
        var maybeExisting = JMVC.dom.findByAttribute('name', name, JMVC.head.metas());
        !!maybeExisting.length && JMVC.dom.remove(maybeExisting[0]);
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