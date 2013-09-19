/**
 * ARRAY sub-module
 */

JMVC.array = {
    /**
     * Clone an existing array
     * @param {Array} arr the array that should be cloned
     * @return {Array} the cloned array
     */
    'arrayClone' : function (arr) {
        return arr.concat();
    },

    /**
     * Safely converts a collection to an array
     * @param  {[type]} coll [description]
     * @return {[type]}      [description]
     */
    'coll2array' : function (coll) {
        var a = [], i = 0;
        // what if coll[i] element is false? loop breaks
        // but this is not the case since collection has no falsy values
        for (null; coll[i]; a[i] = coll[i++]);
        return a;
    },

    /**
     * Check if an array contains or not a value
     * @param  {Array} arr the array 
     * @param  {[type]} myvar [description]
     * @return {[type]}       [description]
     */
    'inArray' : function (arr, mvar) {
        /*
        var i = arr.length;
        while (i-- && arr[i] !== mvar);
        return i;
        */
        var l = arr.length;
        for (null; l-- && arr[l] !== mvar; null);
        return l;
    },

    /**
     * [ description]
     * @param  {[type]} arr [description]
     * @param  {[type]} v   [description]
     * @return {[type]}     [description]
     */
    'inArrayRich' : function (arr, v) {
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
    }
};
