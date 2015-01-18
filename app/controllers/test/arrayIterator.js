JMVC.controllers.arrayIterator = function() {
    this.action_index = function() {

        JMVC.events.loadify(500);

        //JMVC.head.lib('jquery');

        this.render(function test() {
            "use strict";

            JMVC.test.initialize(true);
            JMVC.test.startAll();
            JMVC.test.describe('Looping over some arrays or/and literals');

            var size = 1E6,
                times = 1,
                big = [],

                iter = function(arr) {
                    var a = array_input_iterator(arr),
                        sum = 0,
                        tmp;
                    while (1) {
                        tmp = a.next();
                        if (tmp.done) break;
                        sum += tmp.value;
                    }


                    function done() {
                        return {
                            done: true
                        };
                    }

                    function value(e) {
                        return {
                            done: false,
                            value: e
                        };
                    }

                    function array_input_iterator(array) {
                    	
                        var i = 0;

                        function next() {
                            if (i < array.length) {
                                return value(array[i++]);
                            } else {
                                return done();
                            }
                        }
                        return {
                            next: next
                        };
                    }
                    return sum;
                },

                nativeforarray = function(arr) {
                    var res = 0,
                        i = 0,
                        l = arr.length;
                    for (null; i < l; i++) {
                        res += arr[i];
                    }
                    return res;
                },
                j = 0;

            for (null; j < size; j += 1) {
                big.push(JMVC.util.rand(-1E6, 1E6));
            }





            JMVC.test.finishAll();


            JMVC.test.describe('With Array');

            JMVC.test.testTime('native for (array)', nativeforarray, times, [big]);
            JMVC.test.testTime('iter (array)', iter, times, [big]);

            // JMVC.test.describe('With Object literal');
            // JMVC.test.testTime('native for (obj literal)', nativeforobj, times, [obig]);
            //  //JMVC.test.testTime('jQuery.each (obj literal)', jqueryeach, times, [obig]);
            // JMVC.test.testTime('JMVC.each (obj literal)', jmvceach, times, [obig]);


            // JMVC.test.describe('Avoid using any <i>each</i> function is the best choice you can take!');

        });
    }
};
