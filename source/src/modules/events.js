// -----------------+
// EVENTS sub-module |
// -----------------+

// private section
_.events = {
    /**
     * storage literal to speed up unbinding
     * @type {Object}
     */
    bindings: {},

    /**
     * store wrapped callbacks
     * @type {Array}
     */
    cbs: [],

    /**
     * wired function queue fired
     * at the beginning of render function
     * @type {Array}
     */
    Estart: [],

    /**
     * wired function queue fired
     * at the end of render function
     * @type {Array}
     */
    Eend: [],

    /**
     * map used to get back a node from an id
     * @type {Object}
     */
    //nodeidMap : {},
    disabledRightClick: false,

    /**
     * [wwdb_bindings description]
     * @type {Object}
     */
    wwdb_bindings : {},

    /**
     * [wwdb_channel description]
     * @type {[type]}
     */
    wwdb_channel : JMVC.Channel('wwdb'),

    /**
     * bind exactly one domnode event to a function
     * @param  {DOM node}   el the dom node where the event must be attached
     * @param  {String}   evnt the event
     * @param  {Function} cb   the callback executed when event is fired on node
     * @return {undefined}
     */
    bind: (function() {
        var fn;

        function store(el, evnt, cb) {

            var nid = JMVC.dom.idize(el); // _.events.nodeid(el);
            !(evnt in _.events.bindings) && (_.events.bindings[evnt] = {});

            !(nid in _.events.bindings[evnt]) && (_.events.bindings[evnt][nid] = []);
            //store for unbinding
            _.events.bindings[evnt][nid].push(cb);
            return true;
        }
        if ('addEventListener' in W) {
            fn = function(el, evnt, cb) {
                // cb = _.events.fixCurrentTarget(cb, el);
                el.addEventListener.apply(el, [evnt, cb, false]);
                store(el, evnt, cb);
            };
        } else if ('attachEvent' in W) {
            fn = function(el, evnt, cb) {
                // cb = _.events.fixCurrentTarget(cb, el);
                el.attachEvent.apply(el, ['on' + evnt, cb]);
                store(el, evnt, cb);
            };
        } else {
            fn = function() {
                throw new Error('No straight way to bind an event');
            };
        }
        return fn;
    })(),

    /**
     * [fixCurrentTarget description]
     * @return {[type]} [description]
     */
    fixCurrentTarget: function(f, el) {
        var wrapf = function(e) {
            // currentTarget (the node where binding has been done) is the core of
            // event delegation
            // it would be nice to fix currentTarget
            // leak in (fuckin)IE7 and (fuckin)IE8
            // with something like
            // e.currentTarget || (e.currentTarget = el);
            //
            // a bad WORKING workaround is to pass the current target
            // to the
            // callback as second parameter and let it to be the context 
            return f.call(el, e, el);
        },
            i = JMVC.array.find(_.events.cbs, wrapf);
        if (i > -1) {
            return _.events.cbs[i];
        } else {
            _.events.cbs.push(wrapf);
        }
        return wrapf;
    },

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
    unbind: function(el, evnt, cb) {
        function unstore(evnt, nodeid, index) {
            Array.prototype.splice.call(_.events.bindings[evnt][nodeid], index, 1);
        }

        //cb && (cb = this.fixCurrentTarget(cb, el));

        var nodeid = JMVC.dom.idize(el), //_.events.nodeid(el),
            index, tmp, l;
        try {
            tmp = _.events.bindings[evnt][nodeid];
        } catch (e) {
            //JMVC.debug(evnt + ': binding not found');
            return false;
        }

        //
        //  loop if a function is not given
        if (typeof cb === 'undefined') {
            tmp = _.events.bindings[evnt][nodeid];
            if (!tmp) {
                return false;
            }
            l = tmp.length;
            /*the element will be removed at the end of the real unbind*/
            while (l--) {
                _.events.unbind(el, evnt, tmp[l]);
            }
            return true;
        }

        //JMVC.W.exp = _.events.bindings;
        index = JMVC.array.find(_.events.bindings[evnt][nodeid], cb);

        if (index === -1) {
            return false;
        }

        if (el.removeEventListener) {
            el.removeEventListener(evnt, cb, false);
        } else if (el.detachEvent) {
            el.detachEvent('on' + evnt, cb);
        }

        //remove it from private bindings register
        unstore(evnt, nodeid, index);
        return true;
    },
    getElementDeterminant : function (el) {
        var tname = el.tagName;
        return (tname.match(/input|textarea/i)) ? 'value' : 'innerHTML';
    }
};

//
// PUBLIC section
JMVC.events = {

    innerKill : function (e) {
        e.preventDefault();
        _.events.kill(e);
    },

    enableScroll : function () {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', JMVC.events.preventDefault, false);
        window.onmousewheel = document.onmousewheel = null; 
        window.onwheel = null; 
        window.ontouchmove = null;  
        document.onkeydown = null;

        _.events.unbind(window, 'touchmove', JMVC.events.innerKill);
    },
    
    disableScroll : function () {
        //
        // http://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
        //

        // left: 37, up: 38, right: 39, down: 40,
        // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
        var keys = {37: 1, 38: 1, 39: 1, 40: 1};


        function preventDefaultForScrollKeys(e) {
            if (keys[e.keyCode]) {
                JMVC.events.preventDefault(e);
                return false;
            }
        }

        window.addEventListener // older FF
        && window.addEventListener('DOMMouseScroll', JMVC.events.preventDefault, false);
        window.onwheel = JMVC.events.preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = JMVC.events.preventDefault; // older browsers, IE
        window.ontouchmove  = JMVC.events.preventDefault; // mobile
        document.onkeydown  = preventDefaultForScrollKeys;

        _.events.bind(window, 'touchmove', JMVC.events.innerKill);


        /*
        _.events.bind(window,'touchstart', function() {
            var top = el.scrollTop,
                totalScroll = el.scrollHeight,
                currentScroll = top + el.offsetHeight
            if(top === 0) {
                el.scrollTop = 1
            } else if(currentScroll === totalScroll) {
                el.scrollTop = top - 1
            }
        })*/
    },



    blurAllAnchorClicks : function () {
        JMVC.events.on(JMVC.W, 'click', function (e) {
            var target = JMVC.events.eventTarget(e); 
            target.tagName && target.tagName.toLowerCase() == 'a' && target.blur();
        });
    },

    /**
     * [click description]
     * @param  {[type]} el [description]
     * @return {[type]}    [description]
     */
    click : function (el) {
        JMVC.events.fire(el, 'click');
    },

    /**
     * [code description]
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    code: function(e) {
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
     * [coord description]
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    coord : function (ev) {
        var x,
            y,
            e;

        // if is a touch take the first finger
        e = (ev.touches && ev.touches.length) ? ev.touches[0] : ev;

        if (e.pageX || e.pageY) {
            x = e.pageX;
            y = e.pageY;
        } else {
            x = e.clientX + JMVC.WD.body.scrollLeft + JMVC.WD.documentElement.scrollLeft;
            y = e.clientY + JMVC.WD.body.scrollTop + JMVC.WD.documentElement.scrollTop;
        }
        return [x, y];
    },

    /**
     * [ description]
     * @param  {[type]} f [description]
     * @param  {[type]} t [description]
     * @return {[type]}   [description]
     */
    delay: function(f, t) {
        W.setTimeout(f, t);
    },

    /**
     * [disableRightClick description]
     * @return {[type]} [description]
     */
    disableRightClick: function() {
        if (_.events.disabledRightClick) {
            return false;
        }
        _.events.disabledRightClick = true;
        var self = JMVC.events;
        JMVC.dom.attr(JMVC.WD.body, 'oncontextmenu', 'return false');
        self.on(JMVC.WD, 'mousedown', function(e) {
            if (~~(e.button) === 2) {
                self.preventDefault(e);
                return false;
            }
        });
    },

    /**
     * [ description]
     * @param  {[type]} f [description]
     * @return {[type]}   [description]
     */
    end: function(f) {
        _.events.Eend.push(f);
    },

    /**
     * [ description]
     * @return {[type]} [description]
     */
    endRender: function() {
        var i = 0,
            l = _.events.Eend.length;
        for (null; i < l; i += 1) {
            _.events.Eend[i]();
        }
    },

    /**
     * [eventTarget description]
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    eventTarget: function(e) {
        e = e ? e : JMVC.W.event;
        var targetElement = e.currentTarget || (typeof e.target !== 'undefined') ? e.target : e.srcElement;
        if (!targetElement) {
            return false;
        }

        while (targetElement.nodeType === 3 && targetElement.parentNode !== null) {
            targetElement = targetElement.parentNode;
        }

        return targetElement;
    },

    /**
     * NOCROSS
     * @param  {[type]} el   [description]
     * @param  {[type]} evnt [description]
     * @return {[type]}      [description]
     */
    fire: function(el, evnt) {
        var evt = el[evnt];
        typeof evt === 'function' && (el[evnt]());
    },

    /**
     * [free description]
     * @param  {[type]} node [description]
     * @return {[type]}      [description]
     */
    free: function(node, evnt) {
        node = node || JMVC.WD;
        if (typeof evnt === 'undefined') {
            for (var j in _.events.bindings) {
                JMVC.events.free(node, j);
            }
            return true;
        }
        JMVC.dom.walk(node, function(n) {
            JMVC.events.off(n, evnt);
        }, 'pre');
    },

    /**
     * [ description]
     * @param  {[type]} el [description]
     * @param  {[type]} e  [description]
     * @return {[type]}    [description]
     */
    getCoord: function(el, e) {
        var coord = JMVC.events.coord(e)
        coord[0] -= el.offsetLeft;
        coord[1] -= el.offsetTop;
        return coord;
    },

    getOffset: function (e, trg) {
        e = e || window.event;

        var target = trg || e.target || e.srcElement,
            coord = JMVC.events.coord(e),
            rect = target.getBoundingClientRect(),
            // offsetX = e.clientX - rect.left,
            // offsetY = e.clientY - rect.top,
            offsetX = coord[0] - rect.left,
            offsetY = coord[1] - rect.top;
        return [offsetX, offsetY];
    },

    loadifyCalled : false,

    /**
     * [ description]
     * @param  {[type]} ms [description]
     * @return {[type]}    [description]
     */
    loadify: function(ms) {

        var self = JMVC.events,
            p = null;
        
        ms = ms || 1000;

        if (self.loadifyCalled) {
            p = JMVC.Promise.create();
            start();
            p.then(end);
        }

        function start() {
            // otherwise some browser hangs (opera)
            //
            self.delay(function() {
                WD.body.style.opacity = 0;
                WD.body.style.filter = 'alpha(opacity=0)';
                p && p.done();
            }, 0);

        }

        function end() {    
            var i = 0,
                step = 0.05,
                top = 1,
                to;
            while (i <= top) {
                to = W.setTimeout(
                    function(j) {
                        WD.body.style.opacity = j;
                        WD.body.style.filter = 'alpha(opacity=' + (j * 100) + ')';
                        if (j >= top || isNaN(j)) {
                            WD.body.style.opacity = 1;
                            WD.body.style.filter = 'alpha(opacity=100)';
                        }
                    },
                    ms * i,
                    i + step
                );
                i += step;
            }
        }
        self.loadifyCalled = true;
        self.start(start);
        self.end(end);
    },

    /**
     * [ description]
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    kill: function(e) {
        if (!e) {
            e = W.event;
            e.cancelBubble = true;
            e.returnValue = false;
        }
        'stopPropagation' in e && e.stopPropagation() && e.preventDefault();
        return false;
    },

    /**
     * [ description]
     * @param  {[type]} el   [description]
     * @param  {[type]} tipo [description]
     * @return {[type]}      [description]
     */
    off: function(el, tipo, fn) {
        //as for binding
        if (el instanceof Array) {
            for (var i = 0, l = el.length; i < l; i++) {
                _.events.unbind(el[i], tipo, fn);
            }
            return;
        }
        _.events.unbind(el, tipo, fn);
    },

    /**
     * [ description]
     * @param  {[type]}   el   [description]
     * @param  {[type]}   tipo [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    on: function(el, tipo, fn) {
        var res = true;
        if (el instanceof Array) {
            for (var i = 0, l = el.length; i < l; i++) {
                res = res & _.events.bind(el[i], tipo, fn);
                //res = res & _.events.bind(el[i], tipo, _.events.fixCurrentTarget(fn, el[i]));
            }
            return res;
        }
        if (tipo instanceof Array) {
            for (var i = 0, l = tipo.length; i < l; i++) {
                res = res & _.events.bind(el, tipo[i], fn);
            }
            return res;
        }
        return _.events.bind(el, tipo, fn);
        //return _.events.bind(el, tipo, _.events.fixCurrentTarget(fn, el));
    },

    /**
     * [ description]
     * @param  {[type]}   el   [description]
     * @param  {[type]}   tipo [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    one: function(el, tipo, fn) {
        var self = JMVC.events;
        if (el instanceof Array) {
            for (var i = 0, l = el.length; i < l; i++) {
                self.one(el[i], tipo, fn);
            }
            return;
        }
        self.on(el, tipo, function f(e) {
            fn.call(e, e);
            self.off(el, tipo, f);
        });
    },



    /**
     * [onEsc description]
     * @param  {Function} cb [description]
     * @param  {[type]}   w  [description]
     * @return {[type]}      [description]
     */
    onEsc: function (cb, w) {
        w = w || JMVC.W;
        JMVC.events.on(w.document, 'keyup', function (e) {
            if (e.keyCode == 27) {
                cb.call(w, e);
            }
        });
    },

    onElementSizeChange : function(elm, callback, dim, to) {
        to = to || 200;

        var lastHeight = elm.clientHeight,
            newHeight,
            lastWidth = elm.clientWidth,
            newWidth,
            reactToHeight = typeof dim === 'undefined' || dim.match(/height/),
            reactToWidth = typeof dim === 'undefined' || dim.match(/width/);

        (function run() {

            newHeight = elm.clientHeight;
            newWidth = elm.clientWidth;

            if (
                (reactToHeight && lastHeight != newHeight) ||
                (reactToWidth && lastWidth != newWidth)
            ) callback();

            lastHeight = newHeight;
            lastWidth = newWidth;

            elm.onElementHeightChangeTimer && clearTimeout(elm.onElementHeightChangeTimer);
            elm.onElementHeightChangeTimer = setTimeout(run, to);
        })();
    },

    /**
     * Very experimental function to bind a function to
     * a click is triggered outside of a node tree
     * @param  {[type]}   el [description]
     * @param  {Function} cb [description]
     * @return {[type]}      [description]
     * @sample http://www.jmvc.dev
     * || var tr = JMVC.dom.find('#extralogo');
     * || JMVC.events.onEventOut(tr, 'click', function (){console.debug('out')});
     */
    onEventOut: function(el, evnt, cb) {
        
        var self = JMVC.events,
            root = window.document; //JMVC.dom.body();

        self.on(root, evnt, function f(e) {
            var trg = self.eventTarget(e);

            while (trg !== el) {
                
                trg = JMVC.dom.parent(trg);
                if (trg === root) {
                    self.off(root, evnt, f);
                    return cb(e);
                }
            }
        });
    },

    /**
     * [onUnevent description]
     * @param  {[type]} el [description]
     * @param  {[type]} f  [description]
     * @param  {[type]} t  [description]
     * @return {[type]}    [description]
     */
    onNoEvent : function (el, f, t) {
        t = t || 3000;
        var to,
            self = JMVC.events;
        function inner(e) {
            to && window.clearTimeout(to);
            to = window.setTimeout(function () { f(e); }, t);
        }
        self.on(el, 'mousemove', inner);
        self.on(el, 'click', inner);
        self.on(el, 'touchstart', inner);
    },

    /**
     * Very experimental function to bind a function to
     * a event is triggered outside of a node tree
     * @param  {[type]}   el [description]
     * @param  {Function} cb [description]
     * @return {[type]}      [description]
     * @sample http://www.jmvc.dev
     * || var tr = JMVC.dom.find('#extralogo');
     * || JMVC.events.clickout(tr, 'click', function (){console.debug('out')});
     */
    onEventOut_old: function(el, evnt, cb) {
        
        var self = JMVC.events,
            root = JMVC.dom.body();

        self.on(root, evnt, function f(e) {
            var trg = self.eventTarget(e);
            while (trg !== el) {
                trg = JMVC.dom.parent(trg);
                if (trg === root) {
                    self.off(root, evnt, f);
                    return cb(e);
                }
            }
        });
    },

    /**
     * [onRight description]
     * @param  {[type]} el [description]
     * @param  {[type]} f  [description]
     * @return {[type]}    [description]
     */
    onRight: function(el, f) {
        JMVC.events.disableRightClick();
        JMVC.events.on(el, 'mousedown', function(e) {
            ~~(e.button) === 2 && f.call(el, e);
        });
    },

    /**
     * [ description]
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    preventDefault: function(e) {
        e = e || W.event;
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    },

    /**
     * ready façade
     * @return {[type]} [description]
     */
    readyOLD: (function() {
        function may_go(f) {
            return JMVC.loaded ? f.call() : false;
        }
        if (WD.addEventListener) {
            return function(f) {
                return may_go(f) || WD.addEventListener('DOMContentLoaded', f, false);
            };
        } else if (W.addEventListener) {
            return function(f) {
                return may_go(f) || W.addEventListener('load', f, false);
            };
        } else if (WD.attachEvent) {
            return function(f) {
                return may_go(f) || WD.attachEvent('onreadystatechange', f);
            };
        } else if (W.attachEvent) {
            return function(f) {
                return may_go(f) || W.attachEvent('onload', f);
            };
        }
    })(),

    /**
     * [description]
     */
    ready : (function () {
        var cb = [],
            readyStateCheckInterval = setInterval(function() {
                if (document.readyState === "complete") {
                    JMVC.loaded = true;
                    clearInterval(readyStateCheckInterval);
                    for (var i = 0, l = cb.length; i < l; i++) {
                        cb[i].call(this);
                    }
                }
            }, 10);
        return function (c) {
            if (document.readyState === "complete") {
                c.call(this);
            } else {
                cb.push(c);
            }
        };
    })(),

    /**
     * [ description]
     * @param  {[type]} f [description]
     * @return {[type]}   [description]
     */
    start: function(f) {
        _.events.Estart.push(f);
    },

    /**
     * [ description]
     * @return {[type]} [description]
     */
    startRender: function() {
        var i = 0,
            l = _.events.Estart.length;
        for (null; i < l; i += 1) {
            _.events.Estart[i]();
        }
    },

    /**
     * [stopBubble description]
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    stopBubble: function(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        if (e.cancelBubble !== null) {
            e.cancelBubble = true;
        }
    },

    /**
     * [ description]
     * @param  {[type]} left [description]
     * @param  {[type]} top  [description]
     * @return {[type]}      [description]
     */
    scrollBy: function(left, top) {
        JMVC.events.delay(function() {
            W.scrollBy(left, top);
        }, 1);
    },

    /**
     * [ description]
     * @param  {[type]} left [description]
     * @param  {[type]} top  [description]
     * @return {[type]}      [description]
     */
    scrollTo: function(left, top) {
        JMVC.events.delay(function() {
            W.scrollTo(left, top);
        }, 1);
    },

    /**
     * [ description]
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    touch: function(e) {
        var touches = [],
            i = 0,
            ect = e.touches,
            l = ect.length;

        for (null; i < l; i += 1) {
            touches.push({
                x: ect[i].pageX,
                y: ect[i].pageY
            });
        }
        return touches;
    },

    /**
     * [trigger description]
     * @param  {[type]} elem [description]
     * @param  {[type]} ev   [description]
     * @return {[type]}      [description]
     */
    trigger : function (elem, ev) {
        if ("createEvent" in document) {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent(ev, false, true);
            elem.dispatchEvent(evt);
        } else {
            var e = document.createEventObject();
            e.eventType = ev;
            elem.fireEvent('on' + e.eventType, e);
        }
    },

    /**
     * [unload description]
     * @return {[type]} [description]
     */
    unload: function (){
        JMVC.events.on(W, 'beforeunload', function (e) {
            
            var confirmationMessage = /\//;//'Are you sure to leave or reload this page?';//"\o/";
            (e || window.event).returnValue = confirmationMessage;     //Gecko + IE
            return confirmationMessage; 
            
            
        });
    },

    /**
     * [wwon description]
     * @param  {[type]} obj   [description]
     * @param  {[type]} field [description]
     * @param  {[type]} el    [description]
     * @return {[type]}       [description]
     */
    wwon : function (obj, field,  el, debugobj) {
        var objLock = false,
            elLock = false,
            elDet = _.events.getElementDeterminant(el),
            elOldVal = el[elDet],
            objOldVal = obj[field],
            lock = function(m) {
                objLock = elLock = !!m;
            };
        // debugobj = !!debugobj;

        el.wwdbID = "_" + JMVC.util.uniqueid;


        // obj
        // when object changes -> element changes
        // 
        _.events.wwdb_bindings[el.wwdbID] = window.setInterval(function () {
            if (objLock) return;
            lock(true);
            if (objOldVal != obj[field]) {
                elOldVal = obj[field];
                objOldVal = elOldVal;
                el[elDet] = elOldVal;
                debugobj && debugobj(obj);
            }
            lock(false);
        }, 25);
        
        
        // input
        //
        JMVC.events.on(el, 'keyup', function () {
            if (elLock) return;
            lock(true);
            if (this[elDet] != obj[field]) {
                obj[field] = this[elDet];
                elOldVal = this[elDet];
                objOldVal = this[elDet];
                debugobj && debugobj(obj);
            }
            lock(false);
        });
        el[elDet] = objOldVal;
    },

    /**
     * [wwoff description]
     * @return {[type]} [description]
     */
    wwoff : function () {
        var els = [].slice.call(arguments, 0),
            l = els.length;
        while (l-- > 0) {
            JMVC.events.off(els[l], 'keyup');
            window.clearInterval(_.events.wwdb_bindings[els[l].wwdbID]);    
        }
    }
};

JMVC.events.doTab = function (el) {
    el.onkeydown = function (e) {
        var textarea = this,
            input,
            remove,
            posstart,
            posend,
            compensateForNewline,
            before,
            after,
            selection,
            val;

        if (e.keyCode == 9) { // tab
            input = textarea.value; // as shown, `this` would also be textarea, just like e.target
            remove = e.shiftKey;
            posstart = textarea.selectionStart;
            posend = textarea.selectionEnd;

            // if anything has been selected, add one tab in front of any line in the selection
            if (posstart != posend) {
                posstart = input.lastIndexOf('\n', posstart) + 1;
                compensateForNewline = input[posend - 1] == '\n';
                before = input.substring(0, posstart);
                after = input.substring(posend - (~~compensateForNewline));
                selection = input.substring(posstart, posend);

                // now add or remove tabs at the start of each selected line, depending on shift key state
                // note: this might not work so good on mobile, as shiftKey is a little unreliable...
                if (remove) {
                    if (selection[0] == '\t') {
                        selection = selection.substring(1);
                    }
                    selection = selection.split('\n\t').join('\n');
                } else {
                    selection = selection.split('\n');
                    if (compensateForNewline){
                        selection.pop();    
                    } 
                    selection = '\t'+selection.join('\n\t');
                }

                // put it all back in...
                textarea.value = before+selection+after;
                // reselect area
                textarea.selectionStart = posstart;
                textarea.selectionEnd = posstart + selection.length;
            } else {
                val = textarea.value;
                textarea.value = val.substring(0,posstart) + '\t' + val.substring(posstart);
                textarea.selectionEnd = textarea.selectionStart = posstart + 1;
            }
            e.preventDefault(); // dont jump. unfortunately, also/still doesnt insert the tab.
        }
    }
};

// blur all clicks
JMVC.events.blurAllAnchorClicks();


if (!Event.prototype.preventDefault) {
    Event.prototype.preventDefault = function() {
        this.returnValue = false;
    };
}
if (!Event.prototype.stopPropagation) {
    Event.prototype.stopPropagation = function() {
        this.cancelBubble = true;
    };
}
//-----------------------------------------------------------------------------
// in home
/*
var el = JMVC.dom.find('#extralogo'),
    cb1 = function () {
        console.debug('1', arguments);
    },
    cb2 = function () {
        console.debug('2', arguments);
    },
    cb3 = function () {
        console.debug('3', arguments);
        console.debug(JMVC.dom.nodeFromId('JMVCID6'));
    };
JMVC.events.free(el);
JMVC.events.on(el, 'click', cb1);
JMVC.events.on(el, 'click', cb2);
JMVC.events.on(el, 'mouseenter', cb3);
JMVC.events.off(el, 'click', cb2);

JMVC.events.free(JMVC.WD.body);

 */