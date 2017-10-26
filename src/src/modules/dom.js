// --------------+
// DOM sub-module |
// --------------+

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
        var n = JMVC.dom.create(tag, attrs, inner);
        JMVC.dom.append(where, n);
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
        
        // Make sure that avalid name was provided, here cannot be an object
        // 
        if (!name || name.constructor !== String) {
            return '';
        }
        
        // If the user is setting a value
        // 
        if (typeof value !== 'undefined') {
            
            // Set the quick way first 
            // 
            elem[{'for': 'htmlFor', 'class': 'className'}[name] || name] = value;
            
            // If we can, use setAttribute
            // 
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
    childs : function (node, only_elements) {
        return only_elements? node.children : node.childNodes;
    },

    /**
     * returns a crearer node
     * @return {[type]} [description]
     */
    clearer : function () {
        return JMVC.dom.create('br', {'class': 'clearer'});
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
                JMVC.dom.append(node, inner);
            } else {
                JMVC.dom.html(node, inner);
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
     * consider only elements (in fact uses children)
     * 
     * @return {[type]}
     */
    descendant : function () {
        var args = Array.prototype.slice.call(arguments, 0),
            i = 0,
            res = args.shift(),
            l = args.length;
        if (!l) return res;
        while (i < l) {
            res = res.children.item(~~args[i++]);
        }
        return res;
    },


    /**
     * [domStats description]
     * @return {[type]} [description]
     */
    domStats : function () {
        var allnodes = JMVC.array.coll2array(document.getElementsByTagName('*')),
            anLength = allnodes.length;
        return {
            numberOfNodes : anLength,
            KBytes : parseFloat((document.documentElement.outerHTML.split('').length / (2<<9)).toFixed(2), 10)
        };
    },

    /**
     * [ description]
     * @param  {[type]} el [description]
     * @return {[type]}    [description]
     */
    empty : function (el) {
        //el.innerHTML = '';
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    },

    /**
     * [ description]
     * @param  {[type]} el [description]
     * @return {[type]}    [description]
     */
    empty2 : function (el) {
        el.innerHTML = '';
    },

    /**
     * [eulerWalk description]
     * @param  {[type]} root [description]
     * @param  {[type]} func [description]
     * @param  {[type]} mode [description]
     * @return {[type]}      [description]
     */
    /*
    eulerWalk : function (root, func, mode) {
        mode = {pre : 'pre', post : 'post'}[mode] || 'post';
        var nope = function () {},
            pre = mode === 'pre' ? func : nope,
            post = mode === 'post' ? func : nope,
            walk = (function () {
                return function (node, _n) {
                    pre(node);
                    _n = node.firstChild;
                    while (_n) {
                        walk(_n);
                        _n = _n.nextSibling;
                    }
                    post(node);
                };
            })();
        walk(root);
    },*/

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
        if (a == '*') {
            return document.getElementsByTagName('*');
        }
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
        // return (isArr && ret.length === 1) ? ret : ret;
        return ret;
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



    gebtn : function (n, name) {
        return Array.prototype.slice.call(n.getElementsByTagName(name), 0);
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
        return !!(el.className.match(new RegExp('(\\s|^)' + classname + '(\\s|$)')));
    },

    /**
     * [ description]
     * @param  {[type]} el   [description]
     * @param  {[type]} html [description]
     * @return {[type]}      [description]
     */
    html : function (el, html) {
        if (!el) {
            return JMVC.dom;
        }
        var t = '';
        if (typeof html !== 'undefined') {
            if (el) {
                try {
                    JMVC.dom.empty(el);
                    if (JMVC.dom.isElement(html)) {
                        JMVC.dom.append(el, html);
                    } else {
                        el.innerHTML = html + '';
                    }
                    
                } catch (e) {}
            }
            return JMVC.dom;
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
        var p = referenceNode.parentNode,
            ns = referenceNode.nextSibling;
        !!ns ? p.insertBefore(node, ns) : p.appendChild(node);
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
            if (JMVC.array.find(type2consider, JMVC.dom.nodeTypeString(childs[i]))) {
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
        
        typeof el === 'string' && (el = JMVC.dom.find(el));

        if (JMVC.util.isArray(el)) {
            for (var i  = 0, l = el.length, r = true; i < l; i++) {
                r &= JMVC.dom.remove(el[i]);
            }
            return r;
        }
        parent = el.parentNode;
        parent && parent.removeChild(el);
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
        if (el.className) el.className = el.className.replace(reg, '');
        return JMVC.dom;
    },

    /**
     * [swap description]
     * @param  {[type]} going  [description]
     * @param  {[type]} coming [description]
     * @return {[type]}        [description]
     */
    replace : function (going, coming) {
        var display = coming.style.display;
        coming.style.display = 'none';
        JMVC.dom.insertAfter(coming, going);
        JMVC.dom.remove(going) && (coming.style.display = display);
    },



    /**
     * [ description]
     * @param  {[type]} elem        [description]
     * @param  {[type]} addingClass [description]
     * @return {[type]}             [description]
     */
    setClass : function (elem, classes) {
        if (JMVC.util.isArray(elem)) {
            for (var i = 0, l = elem.length; i < l; i++) {
                JMVC.dom.setClass(elem[i], classes);
            }
            return;
        }    
        elem.className = classes;
    },


    /**
     * Swap two existing nodes
     * @param  {[type]} elm1 [description]
     * @param  {[type]} elm2 [description]
     * @return {[type]}      [description]
     */
    swap : function (elm1, elm2) {
        var parent1 = elm1.parentNode,
            next1 = elm1.nextSibling,
            parent2 = elm2.parentNode,
            next2 = elm2.nextSibling;
        parent1.insertBefore(elm2, next1);
        parent2.insertBefore(elm1, next2);
    },

    /**
     * [ description]
     * @param  {[type]} el       [description]
     * @param  {[type]} oldclass [description]
     * @param  {[type]} newclass [description]
     * @return {[type]}          [description]
     */
    switchClass : function (el, oldclass, newclass) {
        if (JMVC.dom.hasClass(el, oldclass)) {
            JMVC.dom.removeClass(el, oldclass);
            !JMVC.dom.hasClass(el, newclass) && JMVC.dom.addClass(el, newclass);
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
        var ret = JMVC.dom.hasClass(el, cls); 
        JMVC.dom[ret ? 'removeClass' : 'addClass'](el, cls);
        return ret;
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
    /*
    walk : function (node, func) {
        func(node);                 // What does this do?, it's a fucking preorder
                                    // must test, cause eulerWalk do even postorder
        node = node.firstChild;
        while (node) {
            JMVC.dom.walk(node, func);
            node = node.nextSibling;
        }
    },*/

    walk : function (root, func, mode) {
        mode = {pre : 'pre', post : 'post'}[mode] || 'post';
        var nope = function () {},
            pre = mode === 'pre' ? func : nope,
            post = mode === 'post' ? func : nope,
            walk = (function () {
                return function (node, _n) {
                    pre(node);
                    _n = node.firstChild;
                    while (_n) {
                        walk(_n);
                        _n = _n.nextSibling;
                    }
                    post(node);
                };
            })();
        walk(root);
    },


    /**
     * [wrapIn description]
     * @param  {[type]} node  [description]
     * @param  {[type]} attrs [description]
     * @return {[type]}       [description]
     */
    wrap : function (node, tag, attrs) {
        var wrap = JMVC.dom.create(tag || 'div', attrs || {});
        JMVC.dom.insertAfter(wrap, node);
        wrap.appendChild(node);     
        return wrap;
    },

    /**
     * [wrapIn description]
     * @param  {[type]} node  [description]
     * @param  {[type]} attrs [description]
     * @return {[type]}       [description]
     */
    wrapIn : function (node, attrs) {
        var n = JMVC.dom.create('div', attrs || {});
        n.innerHTML = node.innerHTML;
        node.innerHTML = '';
        node.appendChild(n);
        return n;
    }
};
//-----------------------------------------------------------------------------