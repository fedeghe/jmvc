// --------------+
// CSS sub-module |
// --------------+

_.css = {
    opera: navigator.userAgent.match(/opera\/([^\s]*)/i),
    mappedStyles: {},
    css2js_rule: function (s) {
        return s[0] === '-' ? s : s.replace(/-(\w)/g, function (str, $1) {
            return $1.toUpperCase();
        });
    }
};

JMVC.css = {
    /**
     * [addRule description]
     * @param {[type]} sheet    [description]
     * @param {[type]} selector [description]
     * @param {[type]} rules    [description]
     * @param {[type]} index    [description]
     */
    addRule: function (sheet, selector, rules, index) {
        if (JMVC.dom.isNode(sheet)) {
            sheet = sheet.sheet ? sheet.sheet : sheet.styleSheet;
        }
        if (sheet.insertRule) {
            sheet.insertRule(selector + '{' + rules + '}', index);
        } else {
            sheet.addRule(selector, rules, index);
        }
    },

    autoHeadings : function () {
        JMVC.head.addStyle(
            'h1{font-size:24px; line-height:48px; padding:24px 0px 12px;}'+
            'h2{font-size:20px; line-height:36px; padding:18px 0px 9px;}'+
            'h3{font-size:16px; line-height:28px; padding:14px 0px 7px;}'+
            'h4{font-size:12px; line-height:24px; padding:12px 0px 6px;}'+
            'h5{font-size:10px; line-height:20px; padding:10px 0px 5px;}'+
            'h6{font-size:8px; line-height:16px; padding:8px 0px 4px;}', true, true);
    },


    /**
     * [mappedStyle description]
     * @param  {[type]} idn   [description]
     * @param  {[type]} style [description]
     * @return {[type]}       [description]
     */
    mappedStyle: function (idn, style) {
        var t = JMVC.dom.find('#' + idn);
        if (t) {
            JMVC.dom.remove(t);
        }
        _.css.mappedStyles[idn] = JMVC.dom.create('style', {
            'id': idn,
            type: 'text/css'
        }, style);
        JMVC.dom.append(JMVC.head.element, _.css.mappedStyles[idn]);
    },

    /**
     * [style description]
     * @param  {[type]} el   [description]
     * @param  {[type]} prop [description]
     * @param  {[type]} val  [description]
     * @return {[type]}      [description]
     */
    style: function (el, prop, val) {

        var prop_is_obj = (typeof prop === 'object' && typeof val === 'undefined'),
            ret = false,
            newval, k;

        if (!prop_is_obj && typeof val === 'undefined') {
            /* opera may use currentStyle or getComputedStyle */
            //ret = (el.currentStyle) ? el.currentStyle[_.css.css_propertymap[prop] || prop + ""] : el.style[prop]; 
            ret = el.currentStyle ? el.currentStyle[_.css.css2js_rule(prop)] : el.style[prop];
            return (ret === '' || ret === 'auto') ? JMVC.css.getComputedStyle(el, prop) : ret;
        }

        if (prop_is_obj) {
            for (k in prop) {

                if ((prop[k] + '').search(/rand/) !== -1) {
                    newval = JMVC.nsCheck('JMVC.core.color') ?
                        JMVC.core.color.getRandomColor() : '#000000';
                    prop[k] = prop[k].replace(/rand/, newval);
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
                val = val.replace(/rand/, newval);
            }
            if (JMVC.array.find(this.css3_map, prop) + 1) {
                el.style.cssText += ';' + prop + ' : ' + val;
            } else {
                //el.style[_.css.css_propertymap[prop] || prop + ""] = val;
                el.style[_.css.css2js_rule(prop)] = val;

                if (prop === 'opacity') {
                    el.style.filter = 'alpha(opacity = ' + (~~(100 * JMVC.num.getFloat(val))) + ')';
                } /* IE */
            }
        }
        return this;
    },

    /**
     * [show description]
     * @param  {[type]} el [description]
     * @return {[type]}    [description]
     */
    show: function (el) {
        if (el instanceof Array) {
            for (var i = 0, l = el.length; i < l; i += 1) {
                this.show(el[i]);
            }
            return;
        }
        JMVC.css.style(el, 'display', 'block');
    },

    /**
     * [hide description]
     * @param  {[type]} el [description]
     * @return {[type]}    [description]
     */
    hide: function (el) {
        if (el instanceof Array) {
            for (var i = 0, l = el.length; i < l; i += 1) {
                this.hide(el[i]);
            }
            return;
        }
        JMVC.css.style(el, 'display', 'none');
    },

    /**
     * [width description]
     * @param  {[type]} el [description]
     * @return {[type]}    [description]
     */
    width: function (el) {
        return el.offsetWidth || el.scrollWidth || JMVC.css.getComputedStyle(el, 'width');
    },

    /**
     * [height description]
     * @param  {[type]} el [description]
     * @return {[type]}    [description]
     */
    height: function (el) {
        return el.offsetHeight || el.scrollHeight || JMVC.css.getComputedStyle(el, 'height');
    },

    /**
     * [getComputedStyle description]
     * @param  {[type]} el            [description]
     * @param  {[type]} styleProperty [description]
     * @return {[type]}               [description]
     */
    getComputedStyle: function (el, styleProperty) {
        if (_.css.opera) {
            return JMVC.W.getComputedStyle(el, null).getPropertyValue(styleProperty);
        }
        var computedStyle = typeof el.currentStyle !== 'undefined' ? el.currentStyle : JMVC.WD.defaultView.getComputedStyle(el, null);

        return styleProperty ? computedStyle[_.css.css2js_rule(styleProperty)] : computedStyle;
    },

    //
    // http://www.quirksmode.org/js/findpos.html
    //
    /**
     * [getPosition description]
     * @param  {[type]} el [description]
     * @return {[type]}    [description]
     */
    getPosition: function (el) {
        var curleft = 0,
            curtop = 0;
        if (el.offsetParent) {
            do {
                curleft += el.offsetLeft;
                curtop += el.offsetTop;
                el = el.offsetParent;
            } while (el);
        }
        return [curleft, curtop];
    },

    css3_map: ['-o-transform', '-moz-transform'],

    reset: function () {
        // http://meyerweb.com/eric/tools/css/reset/
        var style = 'html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,' +
            'acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,' +
            'var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,' +
            'tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,' +
            'output,ruby,section,summary,time,mark,audio,video' +
            '{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;}' +
            'article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block;}' +
            'body{line-height:1;}' +
            'ol,ul{list-style:none;}' +
            'blockquote,q{quotes:none;}' +
            'blockquote:before,blockquote:after,q:before,q:after{content:\'\';content:none;}' +
            'table{border-collapse:collapse;border-spacing:0;}';
        JMVC.head.addStyle(style, true, true);
    },

    /**
     * [clearer description]
     * @type {[type]}
     */
    clearer: JMVC.dom.create('br', {
        'class': 'clearer'
    }),
    
    /**
     * [pest description]
     * @param  {[type]} mode [description]
     * @return {[type]}      [description]
     */
    pest: function (mode) {
        var tmp = JMVC.dom.find('#pest-css'),
            info = document.createElement('div'),
            enabled = true,

            fnshow = function (e) {
                if (!enabled) {
                    return;
                }
                var trg = JMVC.events.eventTarget(e),
                    cstyle = JMVC.css.getComputedStyle(trg),
                    filter = {
                        height: true,
                        width: true,
                        display: true,
                        cssFloat: true,
                        color: true,
                        backgroundColor: true,
                        fontSize: true
                    },
                    styleList = document.createElement('ul'),
                    c,
                    li,
                    tree;

                if (trg === info) {
                    return;
                }
                info.innerHTML = '';

                for (var s in cstyle) {
                    if (s in filter) {
                        c = document.createElement('li');
                        c.innerHTML = '<strong>' + s + '</strong> : ' + cstyle[s];
                        styleList.appendChild(c);
                    }
                }
                info.appendChild(styleList);

                info.appendChild(document.createElement('hr'));

                if (!! trg.id || !! trg.className) {
                    styleList = document.createElement('ul');
                    if (trg.id) {
                        li = document.createElement('li');
                        li.innerHTML = '<strong>ID</strong> : ' + trg.id;
                        styleList.appendChild(li);
                    }
                    if (trg.className) {
                        li = document.createElement('li');
                        li.innerHTML = '<strong>CLASS</strong> : ' + trg.className;
                        styleList.appendChild(li);
                    }
                    info.appendChild(styleList);
                }
                info.appendChild(document.createElement('hr'));

                tree = document.createElement('ul');

                while (!! trg.tagName) {
                    li = document.createElement('li');
                    li.innerHTML = trg.tagName;
                    tree.appendChild(li);
                    trg = trg.parentNode;
                }
                info.appendChild(tree);
            },
            fnhide = function () {
                JMVC.dom.remove(info);
            };
        info.className = 'report respfixed';
        info.style.position = 'fixed';
        info.style.top = '0px';
        info.style.left = '0px';

        
        JMVC.WD.body.appendChild(info);

        if (tmp) {
            JMVC.dom.remove(tmp);
            JMVC.events.unbind(JMVC.WD, 'mousemove', fnshow);
        } else {
            this.mappedStyle(
                'pest-css',
                '* {outline : 1px dotted black !important; opacity : .7}' +
                '*:hover {outline : 1px solid red !important; opacity:1 }' +
                '.report {padding:10px; position:fixed; margin:10px; border:1px solid #333;}' +
                '.report, .report *{opacity:1; line-height:14px; font-family:verdana, sans; font-size:9px; outline:0 !important; background-color:white;}' +
                'html , body , .report, .report *{opacity: 1}'
            );
            JMVC.events.bind(JMVC.WD, 'mousemove', fnshow);
            JMVC.events.bind(info, 'mouseenter', function () {
                enabled = false;
            });
            JMVC.events.bind(info, 'mouseout', function () {
                enabled = true;
            });
        }
    },
    rotate : function (el, rot) {
        JMVC.css.style(el, {
            '-webkit-transform': 'rotate(' + rot + 'deg)',
            '-moz-transform':'rotate(' + rot + 'deg)',
            '-o-transform':'rotate(' + rot + 'deg)'
        });
    }
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