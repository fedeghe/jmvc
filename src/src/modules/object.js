// -----------------+
// OBJECT sub-module |
// -----------------+

/**
 * [object description]
 * @type {Object}
 */
_.object = {
    /**
     * [reduce description]
     * @param  {[type]}   o  [description]
     * @param  {Function} fn [description]
     * @return {[type]}      [description]
     */
    reduce: function(o, fn) {
        var ret = '',
            j;
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
    _clone: function(obj) {
        var temp,
            key;
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        temp = obj.constructor();
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                temp[key] = JMVC.object.clone(obj[key]);
            }
        }
        return temp;
    },
    // http://stackoverflow.com/questions/728360/most-elegant-way-to-clone-a-javascript-object
    clone: function(obj) {
        var self = JMVC.object,
            copy,
            i, l;
        // Handle the 3 simple types, and null or undefined
        if (null === obj || "object" !== typeof obj) {
            return obj;
        }

        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (i = 0, l = obj.length; i < l; i++) {
                copy[i] = self.clone(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (i in obj) {
                if (obj.hasOwnProperty(i)) {
                    copy[i] = self.clone(obj[i]);
                }
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    },
    /**
     * [ description]
     * @param  {[type]} obj1 [description]
     * @param  {[type]} obj2 [description]
     * @param  {[type]} ret  [description]
     * @param  {[type]} i    [description]
     * @return {[type]}      [description]
     */
    compare: function(obj1, obj2, ret, i) {
        
        if (typeof ret === 'undefined') {
            ret = true;
        }
        if (!ret) {
            return 0;
        }
        if (obj1 + '' !== obj2 + '') {
            return false;
        }
        if (obj1 === obj2) {
            return true;
        }
        for (i in obj1) {
            ret = ret && obj2[i] && JMVC.object.compare(obj1[i], obj2[i], ret);
            if (!ret) {
                return false;
            }
        }
        for (i in obj2) {
            ret = ret && obj1[i] && JMVC.object.compare(obj2[i], obj1[i], ret);
            if (!ret) {
                return false;
            }
        }
        return ret;
    },
    /**
     * [ description]
     * @param  {[type]} obj    [description]
     * @param  {[type]} field) {return      (typeof obj === 'object' && obj[field] [description]
     * @return {[type]}        [description]
     */
    contains: function(obj, field) {
        return (typeof obj === 'object' && field in obj);
    },

    /**
     * [digForKeys description]
     * @param  {[type]} o [description]
     * @param  {[type]} k [description]
     * @return {[type]}   [description]
     */
    digForKey : function (o, k) {
        return _.common.digFor('key', o, k);
    },

    /**
     * [digForValues description]
     * @param  {[type]} o [description]
     * @param  {[type]} k [description]
     * @return {[type]}   [description]
     */
    digForValue : function (o, k) {
        return _.common.digFor('value', o, k);
    },

    /**
     * [ description]
     * @param  {[type]} obj [description]
     * @param  {[type]} ext [description]
     * @return {[type]}     [description]
     */
    extend: function(o, ext, force) {
        var obj = JMVC.object.clone(o),
            j;
        for (j in ext) {
            if (ext.hasOwnProperty(j) && (!(j in obj) || force)) {
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
    jCompare: function(obj1, obj2) {
        return typeof JSON !== 'undefined' ? JSON.stringify(obj1) === JSON.stringify(obj2) : obj1 == obj2;
    },
    /**
     * [keys description]
     * @param  {[type]} obj [description]
     * @return {[type]}     [description]
     */
    keys: function(obj) {
        var res = [],
            i;
        for (i in obj) {
            res.push(i);
        }
        return res;
    },

    /**
     * [order description]
     * @param  {[type]} obj [description]
     * @return {[type]}     [description]
     */
    order: function(obj) {
        var k = [],
            i, j, l,
            out = {};
        for (i in obj) {
            k.push(i);
        }
        k.sort();
        for (j = 0, l = k.length; j < l; j++) {
            out[k[j]] = obj[k[j]];
        }
        return out;
    },
    /**
     * [orderBy description]
     * @param  {[type]} obj    [description]
     * @param  {[type]} key    [description]
     * @param  {[type]} versus [description]
     * @return {[type]}        [description]
     */
    orderBy : function (obj, key , versus) {
        function f(v) {
            var tov = typeof v;
            if (tov == 'number') {
                return v;
            } else if (tov == 'string') {
                return v.toLowerCase()
            }
            return v;
        }
        versus = versus ? function (v) {return !!v;} : function (v) {return !v;}
        return obj.sort(function (a, b) {
            return versus(f(a[key]) > f(b[key]));
        });
    },
    /**
     * [ description]
     * @param  {[type]} o [description]
     * @return {[type]}   [description]
     */
    toAttr: function(obj) {
        return _.object.reduce(obj, function(o, i) {
            return ' ' + i + (o[i] ? '="' + o[i] + '"' : '');
        });
    },
    /**
     * [ description]
     * @param  {[type]} o [description]
     * @return {[type]}   [description]
     */
    toCss: function(obj, straight) {
        return _.object.reduce(obj, function(ob, i) {
            return !!straight ?
                i + '{' + ob[i] + '} ' :
                i + ' {' + _.object.reduce(ob[i],
                    function(o, j) {
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
    toQs: function(obj) {
        return _.object.reduce(obj, function(o, i, r) {
            return ((r ? '&' : '?') + encodeURIComponent(i) + '=' + encodeURIComponent(o[i])).replace(/\'/g, '%27');
        });
    },
    /**
     * [obj2str description]
     * @param  {[type]} obj [description]
     * @return {[type]}     [description]
     */
    toStr: function(obj) {
        return _.object.reduce(obj, function(o, i) {
            return i + ':' + o[i] + ';';
        });
    },
    /**
     * [values description]
     * @param  {[type]} obj [description]
     * @return {[type]}     [description]
     */
    values: function(obj) {
        var res = [],
            i;
        for (i in obj) {
            res.push(obj[i]);
        }
        return res;
    }
};
//-----------------------------------------------------------------------------