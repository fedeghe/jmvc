// --------------+
// CSS sub-module |
// --------------+

_.css = {
    opera: navigator.userAgent.match(/opera\/([^\s]*)/i),
    mappedStyles: {},
    css2js_rule: function(s) {
        return s[0] === '-' ? s : s.replace(/-(\w)/g, function(str, $1) {
            return $1.toUpperCase();
        });
    },
    css3_map: ['-o-transform', '-moz-transform', '-webkit-transform', '-ms-transform']
};

JMVC.css = {
    /**
     * [clearer description]
     * @type {[type]}
     */
    clearer: function() {
        return JMVC.dom.create('br', {
            'class': 'clearer'
        });
    },

    /**
     * [addRule description]
     * @param {[type]} sheet    [description]
     * @param {[type]} selector [description]
     * @param {[type]} rules    [description]
     * @param {[type]} index    [description]
     */
    addRule: function(sheet, selector, rules, index) {
        if (JMVC.dom.isNode(sheet)) {
            sheet = sheet.sheet ? sheet.sheet : sheet.styleSheet;
        }
        if (sheet.insertRule) {
            sheet.insertRule(selector + '{' + rules + '}', index);
        } else {
            sheet.addRule(selector, rules, index);
        }
    },

    /**
     * [autoHeadings description]
     * @return {[type]} [description]
     */
    autoHeadings: function() {
        JMVC.head.addStyle(
            'h1{font-size:24px !important; line-height:48px !important; padding:12px 0px 12px !important;}' +
            'h2{font-size:20px !important; line-height:36px !important; padding:9px 0px 9px !important;}' +
            'h3{font-size:16px !important; line-height:28px !important; padding:7px 0px 7px !important;}' +
            'h4{font-size:12px !important; line-height:24px !important; padding:6px 0px 6px !important;}' +
            'h5{font-size:10px !important; line-height:20px !important; padding:5px 0px 5px !important;}' +
            'h6{font-size:8px !important; line-height:16px !important; padding:4px 0px 4px !important;}', true, true);
    },

    /**
     * [beResponsive description]
     * @return {[type]} [description]
     */
    beResponsive: function(on) {
        JMVC.dom[typeof on === 'undefined' || !!on ? 'addClass' : 'removeClass'](JMVC.WDB, 'resp');
    },

    /**
     * [fontAwesome description]
     * @return {[type]} [description]
     */
    fontAwesome : function () {
        JMVC.head.addStyle("https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css");
    },

    /**
     * [getComputedStyle description]
     * @param  {[type]} el            [description]
     * @param  {[type]} styleProperty [description]
     * @return {[type]}               [description]
     */
    getComputedStyle: function(el, styleProperty) {
        if (_.css.opera) {
            return JMVC.W.getComputedStyle(el, null).getPropertyValue(styleProperty);
        }
        var computedStyle = typeof el.currentStyle !== 'undefined' ?
            el.currentStyle :
            JMVC.WD.defaultView.getComputedStyle(el, null);

        return styleProperty ?
            computedStyle[_.css.css2js_rule(styleProperty)] :
            computedStyle;
    },

    //
    // http://www.quirksmode.org/js/findpos.html
    //
    /**
     * [getPosition description]
     * @param  {[type]} el [description]
     * @return {[type]}    [description]
     */
    getPosition: function(el, rel) {
        var curleft = 0,
            curtop = 0,
            sT = JMVC.WD.body.scrollTop + JMVC.WD.documentElement.scrollTop,
            sL = JMVC.WD.body.scrollLeft + JMVC.WD.documentElement.scrollLeft;
        if (el.offsetParent) {
            do {
                curleft += el.offsetLeft;
                curtop += el.offsetTop;
                el = el.offsetParent;
            } while (el);
        }
        return [!!rel ? curleft - sL : curleft, !!rel ? curtop - sT : curtop];
    },

    /**
     * [height description]
     * @param  {[type]} el [description]
     * @return {[type]}    [description]
     */
    height: function(el) {
        return el.offsetHeight || el.scrollHeight || JMVC.css.getComputedStyle(el, 'height');
    },

    /**
     * [hide description]
     * @param  {[type]} el [description]
     * @return {[type]}    [description]
     */
    hide: function(el) {
        if (el instanceof Array) {
            for (var i = 0, l = el.length; i < l; i += 1) {
                JMVC.css.hide(el[i]);
            }
            return;
        }
        JMVC.css.style(el, 'display', 'none');
    },

    /**
     * [mappedStyle description]
     * @param  {[type]} idn   [description]
     * @param  {[type]} style [description]
     * @return {[type]}       [description]
     */
    mappedStyle: function(idn, style) {
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

    mappedStyleRemove: function(idn) {
        idn in _.css.mappedStyles &&
            JMVC.dom.remove(_.css.mappedStyles[idn]);
    },

    /**
     * [pest description]
     * @param  {[type]} mode [description]
     * @return {[type]}      [description]
     */
    pest: function() {
        var tmp = JMVC.dom.find('#pest-css'),
            tmpinfo = JMVC.dom.find('#pest-css-info');

        if (tmp && tmpinfo) {
            JMVC.events.off(JMVC.WD, 'mousemove', fnshow);
            JMVC.dom.remove(tmpinfo);
            JMVC.css.mappedStyleRemove('pest-css');
            return;
        }


        var info = JMVC.dom.create('div', {
                id: 'pest-css-info'
            }),
            positionCookie = 'pestPanelPosition',
            initialPosition = ~~JMVC.cookie.get(positionCookie) || 0,
            positions = ['tr', 'br', 'bl', 'tl'],

            fnshow = function(e) {
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
                    li,
                    styleList = document.createElement('ul'),
                    addToList = function(list, lab, val) {
                        li = document.createElement('li');
                        li.innerHTML = (lab ? ('<strong>' + lab + '</strong> : ') : '') + val;
                        list.appendChild(li);
                    },
                    tree;

                if (trg === info) {
                    return;
                }
                info.innerHTML = '';

                for (var s in cstyle) {
                    s in filter && addToList(styleList, s, cstyle[s]);
                }
                info.appendChild(styleList);

                info.appendChild(document.createElement('hr'));

                if (!!trg.id || !!trg.className) {
                    if (trg.id) {
                        addToList(styleList, 'ID', trg.id);
                    }
                    if (trg.className) {
                        addToList(styleList, 'CLASS', trg.className);
                    }
                    info.appendChild(styleList);
                }
                info.appendChild(document.createElement('hr'));

                tree = document.createElement('ul');


                while (!!trg && trg.tagName) {
                    addToList(tree, false, trg.tagName);
                    trg = trg.parentNode;
                }

                info.appendChild(tree);
            },
            fnhide = function() {
                JMVC.dom.remove(info);
            };


        info.className = 'report respfixed ' + positions[initialPosition];

        info.style.position = 'fixed';
        info.style.zIndex = 999;

        JMVC.events.on(info, 'mouseover', function() {
            var old = initialPosition;
            initialPosition = (++initialPosition) % positions.length;
            JMVC.dom.switchClass(info, positions[old], positions[initialPosition]);
            JMVC.cookie.set(positionCookie, initialPosition);
        });

        JMVC.WD.body.appendChild(info);
        JMVC.css.mappedStyle(
            'pest-css',
            '* {outline : 1px dotted black !important; opacity : .7}' +
            '*:hover {outline : 1px solid red !important; opacity:1 }' +
            '.report {padding:10px; position:fixed; margin:10px; border:1px solid #333;}' +
            '.report, .report *{opacity:1; line-height:14px; font-family:verdana, sans; font-size:9px; outline:0 !important; background-color:white;}' +
            '.report.tl{top:0px; left:0px;}' +
            '.report.tr{top:0px; right:0px;}' +
            '.report.bl{bottom:0px; left:0px;}' +
            '.report.br{bottom:0px; right:0px;}' +
            'html , body , .report, .report *{opacity: 1}'
        );
        JMVC.events.on(JMVC.WD, 'mousemove', fnshow);
    },

    /**
     * [reset description]
     * @return {[type]} [description]
     */
    reset: function() {
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
     * [rotate description]
     * @param  {[type]} el  [description]
     * @param  {[type]} rot [description]
     * @return {[type]}     [description]
     */
    rotate: function(el, rot) {
        JMVC.css.style(el, {
            '-webkit-transform': 'rotate(' + rot + 'deg)',
            '-moz-transform': 'rotate(' + rot + 'deg)',
            '-o-transform': 'rotate(' + rot + 'deg)'
        });
    },

    /**
     * [show description]
     * @param  {[type]} el [description]
     * @return {[type]}    [description]
     */
    show: function(el) {
        if (el instanceof Array) {
            for (var i = 0, l = el.length; i < l; i += 1) {
                JMVC.css.show(el[i]);
            }
            return;
        }
        JMVC.css.style(el, 'display', 'block');
    },

    /**
     * [style description]
     * @param  {[type]} el   [description]
     * @param  {[type]} prop [description]
     * @param  {[type]} val  [description]
     * @return {[type]}      [description]
     */
    style: function(el /*DOMNode*/ , prop /*String|Object*/ , val /*String*/ ) {

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
                if (JMVC.array.find(_.css.css3_map, k) + 1) {
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
            if (JMVC.array.find(_.css.css3_map, prop) + 1) {
                el.style.cssText += ';' + prop + ' : ' + val;
            } else {
                //el.style[_.css.css_propertymap[prop] || prop + ""] = val;
                el.style[_.css.css2js_rule(prop)] = val;

                if (prop === 'opacity') {
                    el.style.filter = 'alpha(opacity = ' + (~~(100 * JMVC.num.getFloat(val))) + ')';
                } /* IE */
            }
        }
        return JMVC.css;
    },

    /**
     * [unselectable description]
     * @param  {[type]} n [description]
     * @return {[type]}   [description]
     */
    unselectable: function(n) {
        JMVC.css.style(n, {
            '-moz-user-select': 'none',
            '-webkit-user-select': 'none',
            '-ms-user-select': 'none',
            'user-select': 'none'
        });
        JMVC.dom.attr(n, {
            'unselectable': 'on',
            'onselectstart': 'return false;',
            'onmousedown': 'return false;'
        });


    },

    /**
     * [width description]
     * @param  {[type]} el [description]
     * @return {[type]}    [description]
     */
    width: function(el) {
        return el.offsetWidth || el.scrollWidth || JMVC.css.getComputedStyle(el, 'width');
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
