/*--------------
EVENT sub-module
--------------*/

// private section
_.events = {
    bindings : {},
    Estart : [],
    Eend : [],
};

// public section
JMVC.events = {
    

    /**
     * [ description]
     * @param  {[type]}   el   [description]
     * @param  {[type]}   tipo [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    bind : function (el, tipo, fn) {
        if (el instanceof Array) {
            for (var i = 0, l = el.length; i < l; i++) {
                this.bind(el[i], tipo, fn);
            }
            return ;
        }

        //basic delegation
        var f = function (e) {fn.call(el, e || W.event); };

        if (W.addEventListener) {
            el.addEventListener(tipo, f, false);
        } else if (W.attachEvent) {
            el.attachEvent('on' + tipo, f);
        } else {
            el['on' + tipo] = f;
        }
        if (!_.events.bindings[el]) {   
            _.events.bindings[el] = {};
        }
        //store for unbinding
        _.events.bindings[el][tipo] = f;
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
     * @param  {[type]} el   [description]
     * @param  {[type]} tipo [description]
     * @return {[type]}      [description]
     */
    unbind : function (el, tipo) {
        if (el === null) {return; }
        if (el.removeEventListener) {
            el.removeEventListener(tipo, _.events.bindings[el][tipo], false);
        } else if (el.detachEvent) {
            el.detachEvent("on" + tipo, _.events.bindings[el][tipo]);
        }
        _.events.bindings[el][tipo] = null;
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
        
        this.bind(el, tipo, function (e) {
            fn(e);
            self.unbind(el, tipo);
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
     * @param  {[type]} func [description]
     * @return {[type]}      [description]
     */
    ready : function (func) {
        // if some event are booked when the dom is
        // already loaded execute immediately
        if (JMVC.loaded) {
            func.call();
            return;
        }
        //return this.bind(W, 'load', func);
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
