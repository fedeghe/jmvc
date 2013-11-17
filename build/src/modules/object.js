/*---------------
OBJECT sub-module
---------------*/

// private section
_.object = {
    
};

// public section
JMVC.object = {
    /**
     * Clones an object
     * 
     * @param Literal obj
     * @returns cloned Object
     */
    clone : function (obj) {
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
    objCompare : function (obj1, obj2, ret, i) {
        "use strict";
        (ret == undefined) && (ret = true);
        if (!ret) {return 0; }
        if (obj1+'' != obj2+'') {
            return false;
        }
        for (i in obj1) {
            ret = ret && obj2[i] && this.objCompare(obj1[i], obj2[i], ret);
            if (!ret) {return false; }
        }
        for (i in obj2) {
            ret = ret && obj1[i] && this.objCompare(obj2[i], obj1[i], ret);
            if (!ret) {return false; }
        }
        return ret;
    },

    /**
     * [ description]
     * @param  {[type]} obj1 [description]
     * @param  {[type]} obj2 [description]
     * @return {[type]}      [description]
     */
    objJCompare : function (obj1, obj2) {
        "use strict";
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    },

    /**
     * [ description]
     * @param  {[type]} obj    [description]
     * @param  {[type]} field) {return      (typeof obj === 'object' && obj[field] [description]
     * @return {[type]}        [description]
     */
    inObject : function (obj, field) {
        return (typeof obj === 'object' && obj[field]);
    },

    /**
     * [ description]
     * @param  {[type]} o [description]
     * @return {[type]}   [description]
     */
    obj2attr : function (o) {
        var ret = '', i;
        for (i in o) {
            if (o.hasOwnProperty(i)) {
                ret += ' ' + i + (o[i] ? '="' + o[i] + '"' : '');
            }
        }
        return ret;
    },

    /**
     * [ description]
     * @param  {[type]} o [description]
     * @return {[type]}   [description]
     */
    obj2css : function (o) {
        var ret = '', i, j;
        for (i in o) {
            if (o.hasOwnProperty(i)) {
                ret += i + '{';
                for (j in o[i]) {
                    if (o[i].hasOwnProperty(j)) {
                        ret += j + ':' + o[i][j] + ';';
                    }
                }
                ret += '} ';
            }
        }
        return ret;
    },

    /**
     * [ description]
     * @param  {[type]} o [description]
     * @return {[type]}   [description]
     */
    obj2qs : function (o) {
        var ret = '', i;
        for (i in o) {
            if (o.hasOwnProperty(i)) {
                ret += String((ret ? '&' : '?') + i + '=' + encodeURIComponent(o[i]));
            }
        }
        return ret;
    }
};
