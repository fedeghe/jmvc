/*--------------
EVENT sub-module
--------------*/
/*
// in jmvc home try
var l = JMVC.dom.find('#extralogo'),
    f1 = function (e){console.debug(e); alert(1); },
    f2 = function (){alert(2); };
JMVC.events.bind([
    [l, 'click', f1],
    [l, 'click', f2]
]);
JMVC.events.unbind([
    [l, 'dblclick', f1],
    [l, 'click', f2]
]);
 */
// private section
_.events = {
    /**
     * storage literal to speed up unbinding
     * @type {Object}
     */
    bindings : {},
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
     * property name used for indexind functions
     * attached to a node starting form event
     * in bindings
     * bindings[event][node__ownid__] = [func1, func2, ...]
     * @type {String}
     */
    nodeAttrForIndex : '__ownid__',
    /**
     * map used to get back a node from an id
     * @type {Object}
     */
    nodeidMap : {},
    /**
     * function used to get back node from id
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    nodeidInverse : function (id) {
        return id in _.events.nodeidMap ? _.events.nodeidMap[id] : false;
    },
    /**
     * obtain a uniqueid for a node if not assigned
     * or the previously one assigned
     * @param  {DOM node} el the node for which the id is requested
     * @return {String} unique id for the DOM node
     */
    nodeid : function (el) {
        if (!el.hasOwnProperty(_.events.nodeAttrForIndex)) {
            var nid = JMVC.util.uniqueid + '';
            el[_.events.nodeAttrForIndex] = nid;
            // store for inverse search
            _.events.nodeidMap[nid] = el;
        }
        return el[_.events.nodeAttrForIndex];
    },
    /**
     * bind exactly one domnode event to a function
     * @param  {DOM node}   el the dom node where the event must be attached
     * @param  {String}   evnt the event 
     * @param  {Function} cb   the callback executed when event is fired on node
     * @return {undefined}
     */
    /*
    bind : function (el, evnt, cb) {
        //basic delegation
        var nid = _.events.nodeid(el); 

        if (W.addEventListener) {
            el.addEventListener(evnt, cb, false);
        } else if (W.attachEvent) {
            el.attachEvent('on' + evnt, cb);
        } else {
            el['on' + evnt] = cb;
        }

        if (!(evnt in _.events.bindings)) {
            _.events.bindings[evnt] = {};
        }
        if (!(nid in _.events.bindings[evnt])) {
            _.events.bindings[evnt][nid] = [];
        }
        //store for unbinding
        _.events.bindings[evnt][nid].push(cb);
        return true;
    },*/
    bind : (function (){
        function loopcall(el, cback, args){
            if (el instanceof Array) {
                for (var i = 0, l = el.length; i < l; i += 1) {
                    el[i][cback].apply(el[i], args || []);
                }
            } else {
                el[cback].apply(el, args || []);
            }
        }
        function store(el, evnt, cb) {
            var nid = _.events.nodeid(el); 
            if (!(evnt in _.events.bindings)) {
                _.events.bindings[evnt] = {};
            }
            if (!(nid in _.events.bindings[evnt])) {
                _.events.bindings[evnt][nid] = [];
            }
            //store for unbinding
            _.events.bindings[evnt][nid].push(cb);
            return true;
        }
        if ('addEventListener' in W) {
            return function (el, evnt, cb) {
                loopcall(el, 'addEventListener', [evnt, cb, false]);
                store(el, evnt, cb);
            };
        } else if ('attachEvent' in W) {
            return function (el, evnt, cb) {
                loopcall(el, 'attachEvent', ['on' + evnt, cb]);
                store(el, evnt, cb);
            };
        } else {
            throw new Error('No straight way to bind an event');
        }
    })(),
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
        var nodeid = _.events.nodeid(el),
            index, tmp, l;
        try {
            var ___ = _.events.bindings[evnt][nodeid];
        }catch(e){
            JMVC.debug(evnt + ': binding not found');
            return false;
        }
        //
        //  loop if a function is not given
        if (typeof cb === 'undefined') {
            tmp = _.events.bindings[evnt][nodeid];
            l = tmp.length;
            /*the element will be removed at the end of the real unbind*/
            while (l--) {
                _.events.unbind(el, evnt, tmp[l]);
            }
            return true;
        }
        index = JMVC.array.find(_.events.bindings[evnt][nodeid], cb);
        if (index == -1) {
            return false;
        }
        if (el.removeEventListener) {
            el.removeEventListener(evnt, cb, false);
        } else if (el.detachEvent) {
            el.detachEvent("on" + evnt, cb);
        }
        //remove it from private bindings register
        Array.prototype.splice.call(_.events.bindings[evnt][nodeid], index, 1);
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
                if (el[i] instanceof Array) {
                    res = res & _.events.bind(el[i][0], el[i][1], el[i][2]);
                } else {
                    res = res & _.events.bind(el[i], tipo, fn);
                }
            }
            return res;
        }
        return _.events.bind(el, tipo, fn);
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
    clickout : function (el, cb) {
        var self = this,
            root = JMVC.dom.body();
        this.bind(root, 'click', function (e) {
            var trg = self.eventTarget(e);
            while (trg !== el) {
                trg = JMVC.dom.parent(trg);
                if (trg == root) {
                    self.unbind(root, 'click');
                    return cb();
                }
            }
        });
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
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    eventTarget : function (e) {
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
        if (e.stopPropagation) {
            e.stopPropagation();
            e.preventDefault();
        }
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
    ready : function (func) {
        // if called when the dom is already loaded
        // execute immediately
        if (JMVC.loaded) {
            return func.call();
        }
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
     * @param  {[type]} el   [description]
     * @param  {[type]} tipo [description]
     * @return {[type]}      [description]
     */
    unbind : function (el, tipo, fn) {
        //as for binding
        if (el instanceof Array) {
            for (var i = 0, l = el.length; i < l; i++) {
                if (el[i] instanceof Array) {
                    _.events.unbind(el[i][0], el[i][1], el[i][2]);
                } else {
                    _.events.unbind(el[i], tipo, fn);
                }
            }
            return ;
        }
        _.events.unbind(el, tipo, fn);
    },
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
    startRender : function () {
        var i = 0,
            l = _.events.Estart.length;
        for (null; i < l; i += 1) {
            _.events.Estart[i]();
        }
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
     * [ description]
     * @param  {[type]} f [description]
     * @param  {[type]} t [description]
     * @return {[type]}   [description]
     */
    delay : function (f, t) {
        W.setTimeout(f, t);
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
    touch : function (e) {
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
//-----------------------------------------------------------------------------