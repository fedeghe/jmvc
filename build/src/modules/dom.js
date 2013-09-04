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