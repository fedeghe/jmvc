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
    on: function(el, tipo, fn) {
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
     * [coord description]
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    coord : function (e) {
        var x,
            y;
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

    loadifyCalled : false,

    /**
     * [ description]
     * @param  {[type]} ms [description]
     * @return {[type]}    [description]
     */
    loadify: function(ms) {

        var self = JMVC.events;
        self.loadifyCalled = true;
        self.start(function() {
            //otherwise some browser hangs (opera)
            self.delay(function() {
                WD.body.style.opacity = 0;
                WD.body.style.filter = 'alpha(opacity=0)';
            }, 0);
        });
        self.end(function() {
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
        });
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
    one: function(el, tipo, fn) {
        var self = JMVC.events;
        if (el instanceof Array) {
            for (var i = 0, l = el.length; i < l; i++) {
                self.one(el[i], tipo, fn);
            }
            return;
        }
        self.on(el, tipo, function f(e) {
            fn(e); 
            self.off(el, tipo, f);
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
    onEventOut: function(evnt, el, cb) {
        var self = JMVC.events,
            root = JMVC.dom.body();

        self.on(root, evnt, function f(e) {
            var trg = self.eventTarget(e);
            while (trg !== el) {
                trg = JMVC.dom.parent(trg);
                if (trg === root) {
                    self.off(root, evnt, f);
                    return cb();
                }
            }
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

    /**
     * [onRight description]
     * @param  {[type]} el [description]
     * @param  {[type]} f  [description]
     * @return {[type]}    [description]
     */
    onRight: function(el, f) {
        JMVC.events.disableRightClick();
        JMVC.events.on(el, 'mousedown', function(e) {

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
     * [unload description]
     * @return {[type]} [description]
     */
    unload: function (){
        JMVC.events.on(W, 'beforeunload', function (e) {
            
            var confirmationMessage = /\//;//'Are you sure to leave or reload this page?';//"\o/";
            (e || window.event).returnValue = confirmationMessage;     //Gecko + IE
            return confirmationMessage; 
            
            
        });
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