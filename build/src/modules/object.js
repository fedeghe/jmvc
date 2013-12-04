/*---------------
OBJECT sub-module
---------------*/

/**
 * [object description]
 * @type {Object}
 */
_.object = {
    /**
     * [walkout description]
     * @param  {[type]}   o  [description]
     * @param  {Function} fn [description]
     * @return {[type]}      [description]
     */
    walkout : function (o, fn) {
        "use strict";
        var ret = '', j;
        for (j in o) {
            if (o.hasOwnProperty(j)) {
                ret += fn(o, j, ret);
            }
        }
        return ret;
    }
};

/**
 * [object description]
 * @type {Object}
 */
JMVC.object = {
    /**
     * Clones an object
     * 
     * @param Literal obj
     * @returns cloned Object
     */
    clone : function (obj) {
        "use strict";
        var temp,
            key;
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        temp = obj.constructor();

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                temp[key] = this.clone(obj[key]);
            }
        }
        return temp;
    },

    /**
     * [ description]
     * @param  {[type]} obj1 [description]
     * @param  {[type]} obj2 [description]
     * @param  {[type]} ret  [description]
     * @param  {[type]} i    [description]
     * @return {[type]}      [description]
     */
    compare : function (obj1, obj2, ret, i) {
        "use strict";
        (ret == undefined) && (ret = true);
        if (!ret) {return 0; }
        if (obj1+'' != obj2+'') {
            return false;
        }
        for (i in obj1) {
            ret = ret && obj2[i] && this.compare(obj1[i], obj2[i], ret);
            if (!ret) {return false; }
        }
        for (i in obj2) {
            ret = ret && obj1[i] && this.compare(obj2[i], obj1[i], ret);
            if (!ret) {return false; }
        }
        return ret;
    },

    /**
     * [ description]
     * @param  {[type]} obj    [description]
     * @param  {[type]} field) {return      (typeof obj === 'object' && obj[field] [description]
     * @return {[type]}        [description]
     */
    contains : function (obj, field) {
        "use strict";
        return (typeof obj === 'object' && filed in obj);
    },

    /**
     * [ description]
     * @param  {[type]} obj [description]
     * @param  {[type]} ext [description]
     * @return {[type]}     [description]
     */
    extend : function (o, ext) {
        "use strict";
        var obj = this.clone(o), j;
        for (j in ext) {
            if (ext.hasOwnProperty(j) && !(j in obj)) {
                obj[j] = ext[j];
            }
        }
        return obj;
    },

    /**
     * [ description]
     * @param  {[type]} obj1 [description]
     * @param  {[type]} obj2 [description]
     * @return {[type]}      [description]
     */
    jCompare : function (obj1, obj2) {
        "use strict";
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    },

    /**
     * [ description]
     * @param  {[type]} o [description]
     * @return {[type]}   [description]
     */
    toAttr : function (obj) {
        "use strict";
        return _.object.walkout(obj, function (o, i) {
            return ' ' + i + (o[i] ? '="' + o[i] + '"' : '');
        });
    },

    /**
     * [ description]
     * @param  {[type]} o [description]
     * @return {[type]}   [description]
     */
    toCss : function (obj) {
        "use strict";
        return _.object.walkout(obj, function (ob, i) {
            return i + ' {' + _.object.walkout(ob[i], 
                function (o, j){
                    return j + ':' + o[j] + ';';
                }
            ) + '} ';
        });
    },

    /**
     * [ description]
     * @param  {[type]} o [description]
     * @return {[type]}   [description]
     */
    toQs : function (obj) {
        "use strict";
        return _.object.walkout(obj, function (o, i, r) {
            return (r ? '&' : '?') + encodeURIComponent(i) + '=' + encodeURIComponent(o[i]);
        });
    },

    /**
     * [obj2str description]
     * @param  {[type]} obj [description]
     * @return {[type]}     [description]
     */
    toStr : function (obj) {
        "use strict";
        return _.object.walkout(obj, function (o, i) {
            return i + ':' + o[i] + ';';
        });
    }

};
