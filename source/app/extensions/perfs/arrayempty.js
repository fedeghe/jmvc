/**
 * PERFORMANCES TEST
 * Abstract : get the fastest way to empty an array
 */

// JMVC.head.lib('jQuery');
JMVC.head.lib('underscore');
JMVC.head.lib('prototype');
JMVC.extend('array', {

    empty1: function (arr) {
        while (arr.length) {
            arr.pop();
        }
        return arr;
    },

    empty2: function (arr) {
        // all but references!!!
        arr = [];
        return arr;
    },
    empty3: function (arr) {
        // no strict!!!
        // here supposed to throw an error
        arr.length = 0;
        return arr;
    },
    empty4: function (arr) {
        var r = [];

        return r;
    }
});
