/*--------------
ARRAY sub-module
--------------*/
// private section
_.array = {
    /**
     * [op description]
     * @param  {[type]} a  [description]
     * @param  {[type]} op [description]
     * @return {[type]}    [description]
     */
    op : function (a, op) {
        var ret = NaN;
        try {
            ret = (new Function('return ' + a.join(op) + ';'))();
        } catch (e) {}
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
        return [].concat.call(arr);
    },
    /**
     * Safely converts a collection to an array
     * @param  {[type]} coll [description]
     * @return {[type]}      [description]
     */
    coll2array : function (coll) {
        var ret = [],
            i = 0;
        try {
            ret = [].slice.call(coll, 0);
        } catch (e) {
            // what if coll[i] element is false? loop breaks
            // but this is not the case since collection has no falsy values
            for (null; coll[i]; i++) {
                ret[i] = coll[i];
            }
        }
        return ret;
    },
    /**
     * Empties an array
     * @param  {Array} arr the array to be emptied
     * @return {undefined}
     */
    empty : function (arr) {
        // second param (deleteCount) would not be necessary
        // but in the buggIE
        [].splice.call(arr, 0, arr.length);
    },
    /**
     * Cross-Façade function to check if an array contains or not a value
     * @param  {Array}  arr     the array to search in 
     * @param  {[type]} myvar [description]
     * @return {[type]}       [description]
     */
    find : function (arr, mvar) {
        //IE6,7,8 fail here
        
        if ('indexOf' in arr) {
            return arr.indexOf(mvar);
        }
        var l = arr.length - 1;
        while (arr[l] !== mvar) {l--; }
        return l;
    },
    /**
     * [ description]
     * @param  {[type]} arr [description]
     * @param  {[type]} v   [description]
     * @return {[type]}     [description]
     */
    findRich : function (arr, v) {
        var i = 0,
            is_obj_or_array = false,
            len = arr.length;
        for (null; i < len; i += 1) {
            is_obj_or_array = {}.toString.call(arr[i]).match(/\[object\s(Array|Object)\]/);
            if (
                (is_obj_or_array && JSON.stringify(arr[i]) === JSON.stringify(v)) ||
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
     * @source http://stackoverflow.com/questions/5767325/remove-specific-element-from-an-array
     * [remove description]
     * @param  {[type]} arr  [description]
     * @param  {[type]} item [description]
     * @return {[type]}      [description]
     */
    remove : function (arr, item) {
        var i = arr.length;
        while (i--) {
            arr[i] === item && arr.splice(i, 1);
        }
        return arr;
    },
    /**
     * [shuffle description]
     * @param  {[type]} arr [description]
     * @return {[type]}     [description]
     */
    shuffle : function (arr) {
        return arr.sort(function () {
            return 0.5 - Math.random();
        });
    },
    /**
     * [sum description]
     * @param  {[type]} a [description]
     * @return {[type]}   [description]
     */
    sum : function (a) {
        return _.array.op(a, '+');
    },

    /**
     * [unique description]
     * @param  {[type]} a [description]
     * @return {[type]}   [description]
     */
    unique2 : function (a) {
        var r = [],
            l = a.length,
            i = 0, j;
        for (i = 0; i < l; i++) {
            for (j = i + 1; j < l; j++) 
                if (a[i] == a[j]) j = ++i;
            r.push(a[i]);
        }
        return r;
    },
/*
[1,2,3,4,5,6,7,8,9]
 i
 j
 */
    unique : function (a) {    
        var r = [],
            l = a.length,
            i = 0, j;
        for (i = 0; i < l; i++) {
            for (j = i + 1; j < l; j++) 
                if (a[i] === a[j]) j = ++i;
            r.push(a[i]);
        }
        return r;
    }
};
//-----------------------------------------------------------------------------