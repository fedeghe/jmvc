//first extend JMVC.array
JMVC.extend('array', {

    //ben nadel http://www.bennadel.com/blog/2600-Implementing-Java-s-Collections-Shuffle-In-JavaScript.htm
    // Define our collection object with exposed methods.
    BenNadel: (function() {

        // I generate a random integer between the min and max, both of which are
        // inclusive in the range. If the "min" argument is omitted, the range is
        // assumed to be zero-to-max.
        function randRange(min, max) {
            // If only one argument, assumed to be Max.
            if (arguments.length === 1) {
                max = arguments[0];
                min = 0;
            }
            var range = (max - min + 1);
            var offset = Math.floor(range * Math.random());
            return (min + offset);
        }

        // I shuffle the collection using the given rand-range implementation. If
        // no implementation is provided, the default implementation is used.
        // --
        // NOTE: Uses the Fisher-Yates shuffle algorithm.
        function shuffle(collection, randRangeImplementation) {
            //debugger;
            // If a rand-range implementation is not provided, use the default.
            if (!randRangeImplementation) {
                randRangeImplementation = randRange;
            }
            var length = collection.length;
            var i = length;
            // Loop backwards through the list, randomly swapping indices.
            while (--i) {
                var j = randRangeImplementation(i);
                if (i !== j) {
                    swap(collection, i, j);
                }
            }
            return collection;

        }
        // I swap the value at the given indices in the given collection.
        function swap(collection, i, j) {

            var tempValue = collection[i];

            collection[i] = collection[j];
            collection[j] = tempValue;

        }
        // Return the public API.
        return ({
            shuffle: shuffle
        });
    })(),

    mid: function(a) {
        var l = a.length,
            i = 0,
            k1,
            k2;

        while (i < l) {
            k1 = ~~ (l * Math.random());
            k2 = ~~ (l * Math.random());
            tmp = a[k1];
            a[k1] = a[k2];
            a[k2] = tmp;
            i += 2;
        }
        tmp = a[l - 1];
        a[l - 1] = a[l - 2];
        a[l - 2] = tmp;
        return a;
    },
    
    mid2: function(a) {
        var l = a.length,
            i = 0,
            k1,
            k2,
            rnd = ~~ (l * Math.random());

        while (i < l) {
            tmp = a[i];
            a[i] = a[rnd];
            a[rnd] = tmp;
            rnd = ~~ (l * Math.random());
            i += 2;
        }
        return a;
    },

    FisherYates: function(a) {
        var l = a.length,
            i = 0,
            rnd, tmp;
        //skip the last one
        while (--l) {
            rnd = Math.floor(l * Math.random());
            tmp = a[l];
            a[l] = a[rnd];
            a[rnd] = tmp;
        }
        return a;
    },

    FisherYates2: function(a) {
        var l = a.length,
            i = 0,
            rnd, tmp;
        //skip the last one
        while (--l) {
            rnd = ~~(l * Math.random());
            tmp = a[l];
            a[l] = a[rnd];
            a[rnd] = tmp;
        }
        return a;
    },

    FisherYates3: function(a) {
        
        var l = a.length,
            i = 0,
            rnd, tmp;
        //skip the last one
        while (--l) {
            rnd = ~~(l * Math.random());
            l !== rnd && a.splice(rnd, 0, a.splice(l,1)[0]);
        }
        return a;
    },

    // http://bost.ocks.org/mike/shuffle/
    //
    shuffleX1: function(array) {
        var copy = [],
            n = array.length,
            i;

        while (n--) {
            i = Math.floor(Math.random() * array.length);
            if (i in array) {
                copy.push(array.splice(i, 1)[0]);;
            }
        }
        return copy;
    },

    shuffleX2: function(array) {
        var copy = [],
            n = array.length,
            i;
        while (n--) {
            i = Math.floor(Math.random() * array.length);
            if (i in array) {
                copy.push(array.splice(i, 1)[0]);
            }
        }
        return copy;
    },

    shuffleX3: function(array) {
        var copy = [],
            n = array.length,
            i;
        while (n) {
            i = Math.floor(Math.random() * n--);
            copy.push(array.splice(i, 1)[0]);
        }
        return copy;},
    //
    //

    blackMjck: function (arr) {
        var m = arr.length,
            t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = arr[m];
            arr[m] = arr[i];
            arr[i] = t;
        }
        return arr;
    },

    naiveShuffle: function(a) {
        return a.sort(function() {
            return 0.5 - Math.random();
        });
    },

    daveoncode : function (arr) {
        var ret = [],
            l = arr.length;

        while (l) {
            ret.push(
                arr.splice(~~(Math.random() * (l--)), 1)[0]
            );
        }
        return ret;
    },

    // SOME UTILITYIES FOR THE TEST
    // 
    // utility function to check distribution
    checkShuffle: function(a, func) {
        var clone = JMVC.array.clone(a),
            res = func(a),
            matching = 0,
            dist = 0,
            l = clone.length;
        for (var i = 0; i < l; i++) {
            if (clone[i] == res[i]) {
                matching++;
            }
            if (i < l - 1) {
                dist += Math.abs(res[i] - res[i + 1]);
            }
        }
        return {
            match: 100 * matching / l,
            dist : dist / (l - 1)
        };
    },
    generateOrderedArray : function (n) {
        var ret = [],
            i = 0;
        while (i < n) {
            ret.push(i++);
        }
        return ret;
    }
});



// ok now the test controller
// 
JMVC.controllers.arrayShuffle = function() {



    this.action_index = function() {



        JMVC.events.loadify(1000);

        this.render(function test() {
            var JT = JMVC.test;

            "use strict";

            JT.initialize(true);

            JT.startAll();


            JT.describe('Shuffling arrays (do not forget to get a look <a href="http://jsperf.com/array-shuffle-comparator/5" target="_blank">here</a>)');

            JT.message('One of the most common na{t}ive way to shuffle [naiveShuffle]');
            JT.code(JMVC.array.naiveShuffle.toString());

            JT.message('A !naive !native way to shuffle<br />' + 'to see details visit <a href="http://www.bennadel.com/blog/2600-Implementing-Java-s-Collections-Shuffle-In-JavaScript.htm" target="_blank">http://www.bennadel.com/blog/2600-Implementing-Java-s-Collections-Shuffle-In-JavaScript.htm</a>');

            JT.message('One FisherYates implementation, using Math.round [FisherYates]');
            JT.code(JMVC.array.FisherYates.toString());

            JT.message('Another FisherYates implementation, with a self round [FisherYates2], just to compare round VS ~~');
            JT.code(JMVC.array.FisherYates2.toString());



            JT.message('Another implementation of FisherYates, from <a href="https://gist.github.com/blackmjck/8958066" target="_blank">blackmjck</a> mentioned on a response of the BenNadel post (see above)');
            JT.code(JMVC.array.blackMjck.toString());

            JT.message('Another implementation from <a href="http://www.daveoncode.com/2009/01/08/implementing-arrayshuffle-in-actionscript/">daveoncode</a>');
            JT.code(JMVC.array.daveoncode.toString());

            JT.pause();

            var times = 1000,
                n = 1E3,
                s = 1E7,
                rn = JMVC.util.rand(-s, s),
                i = 0,

                fnum = 8,
                arrz = JMVC.array.generateOrderedArray(n),
                v;
            
            JT.describe('<a name="times"></a><h1>Times comparison</h1>here the ' + fnum + ' functions are executed ' + times + ' times with the same random array sized ' + n + ' with elements between ' + (-s) + ' and ' + s);
            
            JT.testTime('JMVC.array.BenNadel.shuffle', JMVC.array.BenNadel.shuffle, times, [JMVC.array.clone(arrz)]);
            JT.testTime('JMVC.array.FisherYates', JMVC.array.FisherYates, times, [JMVC.array.clone(arrz)]);
            JT.testTime('JMVC.array.FisherYates2', JMVC.array.FisherYates2, times, [JMVC.array.clone(arrz)]);
            JT.testTime('JMVC.array.blackMjck', JMVC.array.blackMjck, times, [JMVC.array.clone(arrz)]);
            JT.testTime('JMVC.array.daveoncode', JMVC.array.daveoncode, times, [JMVC.array.clone(arrz)]);
            JT.testTime('JMVC.array.naiveShuffle', JMVC.array.naiveShuffle, times, [JMVC.array.clone(arrz)]);

            JT.timeSummary();

            JT.describe(
                'What about the mean distance between neighbour elements (which is 1 in the ordered +&#8469; prefilled array where n<sub>i+1</sub> = n<sub>i</sub> + 1 and i &#8714; [0, n]) ?'+
                '<br/><br/>Here I get the mean on 100 trials on a 100 sized array.<br/>The result shown is the percentage of elements that are not moved from their original place and the resulting mean distance.'
                );

            var arr = JMVC.array.generateOrderedArray(100),
                checks = {
                    'naiveShuffle' : checkShuffle(arr, JMVC.array.naiveShuffle),
                    'BenNadel' : checkShuffle(arr, JMVC.array.BenNadel.shuffle),
                    'FisherYates' : checkShuffle(arr, JMVC.array.FisherYates),
                    'FisherYates2' : checkShuffle(arr, JMVC.array.FisherYates2),
                    'blackMjck' : checkShuffle(arr, JMVC.array.blackMjck),
                    'daveoncode' : checkShuffle(arr, JMVC.array.daveoncode),
                },
                tpl = '[%name%] match: %match%%, dist: %dist%',
                j;
            for (j in checks) {
                JT.message(JMVC.string.replaceAll(tpl, {name : j, match : checks[j].match, dist : checks[j].dist.toFixed(2)}));    
            }

            function checkShuffle(a, strat) {
                var times = 100,
                    percSum = 0,
                    clone,
                    i = 0,
                    res = {match: 0, dist :0},
                    tmp;
                while (i++ < times) {
                    clone = JMVC.array.clone(a);
                    tmp = JMVC.array.checkShuffle(clone, strat);
                    res.match += tmp.match;
                    res.dist += tmp.dist;
                }
                res.match /= times;
                res.dist /= times;
                return res;
            }
            

            JT.finishAll();

        });
    }

};