/**
 * PERFORMANCES TEST
 * implementations from
 * http://stackoverflow.com/questions/1960473/unique-values-in-an-array
 *
 * between all the solutions will be excluded those who rely on
 * - indexof and/or filter functions
 * - foreach
 * - JSON.parse
 * 
 * here many functions pollute the Array prototype, but in this test
 * there will be the clean function
 *
 *
 * for curiosity and completeness will be included
 * underscore and jQuery based solutions
 */

//JMVC.head.lib('jQuery');
JMVC.head.lib('underscore');
JMVC.head.lib('prototype');

JMVC.extend('array', {
    fast : function(arr) {
        var o = {}, i, l = arr.length, r = [];
        for(i=0; i<l;i+=1) o[arr[i]] = arr[i];
        for(i in o) r.push(o[i]);
        return r;
    },

    Mottie_Claudill : function (arr) {
        var o = {}, a = [], i, e;
        for (i = 0; e = arr[i]; i++) {o[e] = 1};
        for (e in o) {a.push (e)};
        return a;
    },

    Rafael_Claudill : function (arr) {
        var u = {}, a = [];
        for (var i = 0, l = arr.length; i < l; ++i) {
            if (u.hasOwnProperty(arr[i])) {
                continue;
            }
            a.push(arr[i]);
            u[arr[i]] = 1;
        }
        return a;
    },
    
    Darshan : function (a) {
        var b = [a[0]], i, j, tmp;
        for (i = 1; i < a.length; i++) {
            tmp = 1;
            for (j = 0; j < b.length; j++) {
                if (a[i] == b[j]) {
                    tmp = 0;
                    break;
                }
            }
            if (tmp) {
                b.push(a[i]);
            }
        }
        return b;
    },
    // http://www.shamasis.net/2009/09/fast-algorithm-to-find-unique-items-in-javascript-array/
    // mentioned by Frosty Z
    Bhattacharya : function(arr) {
        var a = [], l = arr.length;
        for(var i=0; i<l; i++) {
            for(var j=i+1; j<l; j++)
                if (arr[i] === arr[j]) j = ++i;
            a.push(arr[i]);
        }
        return a;
    },

    lib : {
        underscore : function (a) {
            return _.uniq(a);
        },
        'prototype' : function (a) {
            return a.uniq();
        }
    }

});