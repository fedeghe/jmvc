/*--------------
ARRAY sub-module
--------------*/

// private section
_.array = {
    op : function (a, op) {
        var ret = NaN;
        try {
            ret = (new Function('return ' + a.join(op) + ';'))();
        }catch(e){}
        return ret;
    }
};

// public section
JMVC.array = {
    /**
     * Clone an existing array
     * @param {Array} arr the array that should be cloned
     * @return {Array} the cloned array
     */
    clone : function (arr) {
        return arr.concat();
    },  

    /**
     * Safely converts a collection to an array
     * @param  {[type]} coll [description]
     * @return {[type]}      [description]
     */
    coll2array : function (coll) {
        var ret = [];
        try{
            ret = Array.prototype.slice.call(coll, 0);
        } catch(e){
            // what if coll[i] element is false? loop breaks
            // but this is not the case since collection has no falsy values
            for (var i = 0; coll[i]; ret[i] = coll[i++]);    
        }
        return ret;
    },

    /**
     * [empty description]
     * @param  {[type]} a [description]
     * @return {[type]}   [description]
     */
    empty : function (a) {
        // second param (deleteCount) would not be necessary
        // but in the buggIE
        a.splice(0, a.length);
    },

    /**
     * Cross-Façade function to check if an array contains or not a value
     * @param  {Array} arr the array 
     * @param  {[type]} myvar [description]
     * @return {[type]}       [description]
     */
    inArray : function (arr, mvar) {
        //IE6,7,8 fail here
        if ('indexOf' in arr) {
            return arr.indexOf(mvar);
        }
        for (var l = arr.length; l-- && arr[l] !== mvar; null);
        return l;
    },

    /**
     * [ description]
     * @param  {[type]} arr [description]
     * @param  {[type]} v   [description]
     * @return {[type]}     [description]
     */
    inArrayRich : function (arr, v) {
        var i = 0,
            is_obj_or_array = false,
            len = arr.length;

        for (null; i < len; i += 1) {

            is_obj_or_array = {}.toString.call(arr[i]).match(/\[object\s(Array|Object)\]/);
            
            if (
                (is_obj_or_array && JSON.stringify(arr[i]) === JSON.stringify(v))
                ||
                (!is_obj_or_array && arr[i].toString() === v.toString())
            ) {
                return i;
            }
        }
        return -1;
    },

    /**
     * [max description]
     * @param  {[type]} a) {return      Math.max.apply(null, a [description]
     * @return {[type]}    [description]
     */
    max : function (a) {
        return Math.max.apply(null, a);
    },

    /**
     * [mean description]
     * @param  {[type]} a [description]
     * @return {[type]}   [description]
     */
    mean : function (a) {
        return this.sum(a) / a.length;
    },
    /**
     * [min description]
     * @param  {[type]} a) {return      Math.min.apply(null, a [description]
     * @return {[type]}    [description]
     */
    min : function (a) {
        return Math.min.apply(null, a);
    },

    /**
     * [mult description]
     * @param  {[type]} a [description]
     * @return {[type]}   [description]
     */
    mult : function (a) {
        return _.array.op(a, '*');
    },

    /**
     * [rand description]
     * @param  {[type]} a [description]
     * @return {[type]}   [description]
     */
    rand : function (a) {
        var m = Math;
        return a[m.floor(m.random() * a.length)];
    },

    /**
     * [shuffle description]
     * @param  {[type]} arr [description]
     * @return {[type]}     [description]
     */
    shuffle : function (arr) {
        var mr = Math.random;
        return arr.sort(function(){return mr() - .5; });
    },

    /**
     * [sum description]
     * @param  {[type]} a [description]
     * @return {[type]}   [description]
     */
    sum : function (a) {return _.array.op(a, '+');}
};
