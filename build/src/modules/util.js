/*-------------
UTIL sub-module
-------------*/

/**
 * private section
 * @type {Object}
 */
_.util = {
    
};

/**
 * public section
 * @type {Object}
 */
JMVC.util = {

    /**
     * [ description]
     * @param  {[type]} d [description]
     * @return {[type]}   [description]
     */
    deg2rad : function (d) {return JMVC.M.PI * d / 180; },

    /**
     * [getLink description]
     * @param  {[type]} cnt  [description]
     * @param  {[type]} act  [description]
     * @param  {[type]} prms [description]
     * @return {[type]}      [description]
     */
    getLink : function (cnt, act, prms) {
        var path = [];
        cnt && path.push(cnt);
        act && path.push(act);
        prms && path.push(prms);
        
        return JMVC.vars.baseurl + JMVC.US + path.join(JMVC.US);
    },

    /**
     * [ description]
     * @param  {[type]} scriptname [description]
     * @return {[type]}            [description]
     */
    getParameters : function (scriptid, pname) {
        var script = document.getElementById(scriptid),
            p = false,
            parameters = false;
        pname = pname || 'data-params';
        p = script.getAttribute(pname);
        parameters = p ? eval('(' + p + ')') : {};
        return parameters;
    },

    //http://stackoverflow.com/questions/7390426/better-way-to-get-type-of-a-javascript-variable
    /**
     * [ description]
     * @param  {[type]} o [description]
     * @return {[type]}   [description]
     */
    getType : function (o) {
        return ({}).toString.call(o).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    },

    /**
     * [ description]
     * @param  {[type]} hex [description]
     * @return {[type]}     [description]
     */
    hex2int : function (hex) {
        return parseInt(hex, 16);
    },

    /**
     * [ description]
     * @param  {[type]} i [description]
     * @return {[type]}   [description]
     */
    int2hex : function (i) {
        return parseInt(i, 10).toString(16);
    },

    /**
     * [ description]
     * @param  {[type]} o [description]
     * @return {[type]}   [description]
     */
    isArray : function (o) {
        var y = Array.isArray && Array.isArray(o), t1, t2;
        if (y) {return true; }
        t1 = String(o) !== o;
        t2 = {}.toString.call(o).match(/\[object\sArray\]/);
        return t1 && !!(t2 && t2.length);
    },

    /**
     * [isFunction description]
     * @param  {[type]}  f [description]
     * @return {Boolean}   [description]
     */
    isFunction : function (f) {
        return typeof f === 'function';
    },

    /**
     * [ description]
     * @param  {[type]} o [description]
     * @return {[type]}   [description]
     */
    isObject : function (o) {
        var t1 = String(o) !== o,
            t2 = {}.toString.call(o).match(/\[object\sObject\]/);
        return t1 && !!(t2 && t2.length);
    },

    /**
     * [ description]
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    isSet : function (e) {
        return typeof e !== 'undefined';
    },

    /**
     * [ description]
     * @param  {[type]} el   [description]
     * @param  {[type]} type [description]
     * @return {[type]}      [description]
     */
    isTypeOf : function (el, type) {
        return typeof el === type;
    },

    /**
     * [ description]
     * @param  {[type]} ) {return      +new Date( [description]
     * @return {[type]}   [description]
     */
    now : function () {
        return +new Date();
    },

    /**
     * [ description]
     * @param  {[type]} min  [description]
     * @param  {[type]} max) {return      min + ~~(JMVC.M.random() * (max - min + 1) [description]
     * @return {[type]}      [description]
     */
    rand : function (min, max) {
        return min + ~~(JMVC.M.random() * (max - min + 1));
    },

    /**
     * [ description]
     * @param  {[type]} r [description]
     * @return {[type]}   [description]
     */
    rad2deg : function (r) {
        return 180 * r / JMVC.M.PI;
    },

    /**
     * [ description]
     * @param  {[type]} start [description]
     * @param  {[type]} end   [description]
     * @return {[type]}       [description]
     */
    range : function (start, end) {
        if (start > end) {
            throw new JMVC.Errors.BadParams('ERROR: JMVC.util.range function #badparams (' + start + ', ' + end + ')');
            return false;
        }
        var ret = [];
        while (end - start + 1) {
            ret.push((start += 1) - 1);
        }
        return ret;
    },

    /**
     * [description]
     * @return {[type]} [description]
     */
    uniqueid : new function () {
        var count = 0,
            self = this;
        this.prefix = 'JMVCID';
        this.toString = function () {
            return  self.prefix + ++count;
        }
    }

};
