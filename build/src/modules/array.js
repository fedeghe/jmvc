// ----------------+
// ARRAY sub-module |
// ----------------+

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
     * [clean description]
     * @return {[type]} [description]
     */
    clean : function (arr) {
        var i = -1,
            l = arr.length; 

        while (++i < l) {
            
            if (
                undefined == arr[i]
                ||
                (typeof arr[i] == 'number' && isNaN(arr[i]))
            ) {
                arr.splice(i--, 1);
                l--;
            }
        }
        return arr;
    },

    /**
     * Clone an existing array
     * @param {Array} arr the array that should be cloned
     * @return {Array} the cloned array
     */
    clone : function (arr) {
        return Array.prototype.slice.call(arr, 0);
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
     * [compare description]
     * @param  {[type]} a1 [description]
     * @param  {[type]} a2 [description]
     * @return {[type]}    [description]
     *
     * @source http://stackoverflow.com/questions/3115982/how-to-check-javascript-array-equals
     */
    compare : function (a, b, onlyPresence) {
        if (a === b) {
            return true;
        }
        if (a === null || b === null || a.length !== b.length) {
            return false;
        }

        // If you don't care about the order of the elements inside
        // the array, you should sort both arrays here.
        // 
        if (typeof onlyPresence !== 'undefined') {
            a = a.sort();
            b = b.sort();
        }
        if (JSON && 'stringify' in JSON) {
            return JSON.stringify(a) === JSON.stringify(b);
        }
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
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
     * @param  {Array}  arr    the array to search in 
     * @param  {Mixed}  myvar  the element searched
     * @return {Integer}       the index of the first occurrence or -1
     */
    find : function (arr, mvar) {
        //IE6,7,8 fail here
        if (arr instanceof Array && 'indexOf' in arr) {
            return arr.indexOf(mvar);
        }
        var l = arr.length - 1;
        while (l >= 0 && arr[l] !== mvar) {l--; }
        return l;
    },

    /**
     * Find all the occourcences indexes of an element in a array
     * @param  {Array} arr   the array to search in 
     * @param  {Mixed} mvar  the element searched
     * @return {Mixed}       the Array of occourrencies or -1
     */
    findAll : function (arr, mvar) {
        var res = [],
            sum = 0,
            tmp;
        while (true) {
            tmp = this.find(arr, mvar);
            // not found exit
            if (tmp < 0) {break; }
            // track position, cause of slicing
            sum += tmp + 1;
            res.push(sum - 1);
            arr = arr.slice(tmp + 1);
        }
        return res.length ? res : -1;
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
     * [fromArguments description]
     * @param  {[type]} a [description]
     * @return {[type]}   [description]
     */
    fromArguments : function (a) {
        return Array.prototype.slice.call(a, 0);
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
    mean : function (a) {return this.sum(a) / a.length; },

    /**
     * [min description]
     * @param  {[type]} a) {return      Math.min.apply(null, a [description]
     * @return {[type]}    [description]
     */
    min : function (a) {return Math.min.apply(null, a); },
    
    /**
     * [mult description]
     * @param  {[type]} a [description]
     * @return {[type]}   [description]
     */
    mult : function (a) {return _.array.op(a, '*'); },

    /**
     * [rand description]
     * @param  {[type]} a [description]
     * @return {[type]}   [description]
     */
    rand : function (a) {return a[Math.floor(Math.random() * a.length)]; },

    /**
     * [range description]
     * @param  {[type]} min [description]
     * @param  {[type]} max [description]
     * @return {[type]}     [description]
     */
    range : function (min, max) {
        var out = [];
        while (min <= max) out.push(min++);
        return out; 
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
        var l = arr.length,   
            i = 0,
            rnd, tmp;
        while (i < l) {
            rnd = ~~(l * Math.random());
            tmp = arr[i];
            arr[i++] = arr[rnd];
            arr[rnd] = tmp;
        }
        return arr;
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