/*--------------
EVENT sub-module
--------------*/
// private section
_.events = {
    /**
     * storage literal to speed up unbinding
     * @type {Object}
     */
    bindings : {},
    /**
     * store wrapped callbacks
     * @type {Array}
     */
    cbs : [],
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
     * map used to get back a node from an id
     * @type {Object}
     */
    //nodeidMap : {},
    disabledRightClick : false,
    /**
     * bind exactly one domnode event to a function
     * @param  {DOM node}   el the dom node where the event must be attached
     * @param  {String}   evnt the event 
     * @param  {Function} cb   the callback executed when event is fired on node
     * @return {undefined}
     */
    bind : (function () {
        var fn;

        function store(el, evnt, cb) {

            var nid = JMVC.dom.idize(el);// _.events.nodeid(el);
            !(evnt in _.events.bindings) && (_.events.bindings[evnt] = {});

            !(nid in _.events.bindings[evnt]) && (_.events.bindings[evnt][nid] = []);
            //store for unbinding
            _.events.bindings[evnt][nid].push(cb);
            return true;
        }
        if ('addEventListener' in W) {
            fn = function (el, evnt, cb) {
                // cb = _.events.fixCurrentTarget(cb, el);
                el.addEventListener.apply(el, [evnt, cb, false]);
                store(el, evnt, cb);
            };
        } else if ('attachEvent' in W) {
            fn = function (el, evnt, cb) {
                // cb = _.events.fixCurrentTarget(cb, el);
                el.attachEvent.apply(el, ['on' + evnt, cb]);
                store(el, evnt, cb);
            };
        } else {
            fn = function () {
                throw new Error('No straight way to bind an event');
            };
        }
        return fn;
    })(),

    /**
     * [fixCurrentTarget description]
     * @return {[type]} [description]
     */
    fixCurrentTarget : function (f, el) {
        var wrapf = function (e) {
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
    
    unbind : function (el, evnt, cb) {
        function unstore(evnt, nodeid, index) {
            Array.prototype.splice.call(_.events.bindings[evnt][nodeid], index, 1);
        }

        //cb && (cb = this.fixCurrentTarget(cb, el));

        var nodeid = JMVC.dom.idize(el),//_.events.nodeid(el),
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
            if (!tmp) {return false; }
            l = tmp.length;
            /*the element will be removed at the end of the real unbind*/
            while (l--) {
                _.events.unbind(el, evnt, tmp[l]);
            }
            return true;
        }
        
        JMVC.W.exp = _.events.bindings;
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
                res = res & _.events.bind(el[i], tipo, fn);
                //res = res & _.events.bind(el[i], tipo, _.events.fixCurrentTarget(fn, el[i]));
            }
            return res;
        }
        return _.events.bind(el, tipo, fn);
        //return _.events.bind(el, tipo, _.events.fixCurrentTarget(fn, el));
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
     * @param  {[type]} f [description]
     * @param  {[type]} t [description]
     * @return {[type]}   [description]
     */
    delay : function (f, t) {
        W.setTimeout(f, t);
    },
    /**
     * [disableRightClick description]
     * @return {[type]} [description]
     */
    disableRightClick : function () {
        if (_.events.disabledRightClick) {return false; }
        _.events.disabledRightClick = true;
        var self = this;
        JMVC.dom.attr(JMVC.WD.body, 'oncontextmenu', 'return false');
        this.bind(JMVC.WD, 'mousedown', function (e) {
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
    end : function (f) {
        _.events.Eend.push(f);
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
     * [eventTarget description]
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    eventTarget : function (e) {
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
    fire : function (el, evnt) {
        var evt = el[evnt];
        typeof evt === 'function' && (el[evnt]());
    },
    /**
     * [free description]
     * @param  {[type]} node [description]
     * @return {[type]}      [description]
     */
    free : function (node, evnt) {
        node = node || JMVC.WD;
        if (typeof evnt === 'undefined') {
            for (var j in _.events.bindings) {
                this.free(node, j);
            }
            return true;
        }
        JMVC.dom.walk(node, function (n) {
            JMVC.events.unbind(n, evnt);
        });
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
                        if (j >= top || isNaN(j)) {
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
     * Very experimental function to bind a function to
     * a click triggered outside of a node tree 
     * @param  {[type]}   el [description]
     * @param  {Function} cb [description]
     * @return {[type]}      [description]
     * @sample http://www.jmvc.dev
     * || var tr = JMVC.dom.find('#extralogo');
     * || JMVC.events.clickout(tr, function (){console.debug('out')});
     */
    onEventOut : function (evnt, el, cb) {
        var self = this,
            root = JMVC.dom.body();

        this.bind(root, evnt, function f(e) {
            var trg = self.eventTarget(e);
            while (trg !== el) {
                trg = JMVC.dom.parent(trg);
                if (trg === root) {
                    self.unbind(root, evnt, f);
                    return cb();
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
    onRight : function (el, f) {
        this.disableRightClick();
        this.bind(el, 'mousedown', function (e) {

            if (~~(e.button) === 2) {
                f.call(el, e);
            }
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
        'stopPropagation' in e && e.stopPropagation() && e.preventDefault();
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
    readyold : function (f) {
        // if called when the dom is already loaded
        // execute immediately
        if (JMVC.loaded) {
            return f.call();
        }
        if (WD.addEventListener) {
            return WD.addEventListener('DOMContentLoaded', f, false);
        } else if (W.addEventListener) {
            return W.addEventListener('load', f, false);
        } else if (WD.attachEvent) {
            return WD.attachEvent('onreadystatechange', f);
        } else if (W.attachEvent) {
            return W.attachEvent('onload', f);
        }
        return e;
    },
    ready : (function () {
        function may_go(f) {
            return JMVC.loaded ? f.call() : false;
        }
        if (WD.addEventListener) {
            return function (f) {
                return may_go(f) || WD.addEventListener('DOMContentLoaded', f, false);
            };
        } else if (W.addEventListener) {
            return function (f) {
                return may_go(f) || W.addEventListener('load', f, false);
            };
        } else if (WD.attachEvent) {
            return function (f) {
                return may_go(f) || WD.attachEvent('onreadystatechange', f);
            };
        } else if (W.attachEvent) {
            return function (f) {
                return may_go(f) || W.attachEvent('onload', f);
            };
        }
    })(),
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
     * [stopBubble description]
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    stopBubble : function (e) {
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
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    touch : function (e) {
        var touches = [],
            i = 0,
            ect = e.touches,
            l = ect.length;
            
        for (null; i < l; i += 1) {
            touches.push({
                x : ect[i].pageX,
                y : ect[i].pageY
            });
        }
        return touches;
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
                _.events.unbind(el[i], tipo, fn);
            }
            return;
        }
        _.events.unbind(el, tipo, fn);
    }
};
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
JMVC.events.bind(el, 'click', cb1);
JMVC.events.bind(el, 'click', cb2);
JMVC.events.bind(el, 'mouseenter', cb3);
JMVC.events.unbind(el, 'click', cb2);

JMVC.events.free(JMVC.WD.body);

 */