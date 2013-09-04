/**


------------------------------------------------------

        _/_/_/  _/  _/_/  _/  _/_/    _/_/_/  _/    _/   
     _/    _/  _/_/      _/_/      _/    _/  _/    _/    
    _/    _/  _/        _/        _/    _/  _/    _/     
     _/_/_/  _/        _/          _/_/_/    _/_/_/      
                                                _/       
                                           _/_/

------------------------------------------------------

**/
JMVC.array = {
    /**
     * [ description]
     * @param  {[type]} arr) {return      arr.concat( [description]
     * @return {[type]}      [description]
     */
    'arrayClone' : function (arr) {
        return arr.concat();
    },

    /**
     * [ description]
     * @param  {[type]} coll [description]
     * @return {[type]}      [description]
     */
    'coll2array' : function (coll) {
        var i = 0,
            a = [],
            len = coll.length;
        for (null; i < len; i += 1) {
            a[i] = coll[i];
        }
        return a;
    },

    /**
     * [ description]
     * @param  {[type]} arr   [description]
     * @param  {[type]} myvar [description]
     * @return {[type]}       [description]
     */
    'inArray' : function (arr, mvar) {
        var i = arr.length;
        while (i-- && arr[i] !== mvar);
        return i;
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
