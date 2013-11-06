/*
----------------
ARRAY sub-module
----------------
*/
//private section
_.array = {};

//public section
JMVC.array = {
    /**
     * Clone an existing array
     * @param {Array} arr the array that should be cloned
     * @return {Array} the cloned array
     */
    arrayClone : function (arr) {
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
            var i = 0;
            // what if coll[i] element is false? loop breaks
            // but this is not the case since collection has no falsy values
            for (null; coll[i]; ret[i] = coll[i++]);    
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
     * [shuffle description]
     * @param  {[type]} arr [description]
     * @return {[type]}     [description]
     */
    shuffle : function (arr) {
        return arr.sort(function(){return  Math.random() - .5; });
    }
};
