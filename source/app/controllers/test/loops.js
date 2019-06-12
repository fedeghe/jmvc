JMVC.controllers.loops = function () {
    this.action_index = function () {
        function straightDumbForLoop (n) {
            for (var i = 0, res = 0; i <= n; i++) {
                res += i;
            }
            return res;
        }
        function straightNotSoDumbForLoop (n) {
            var res = 0,
                i = 0;
            for (null; i <= n; i++) {
                res += i;
            }
            return res;
        }
        function straightForLoop (n) {
            var res = 0,
                i = 0;
            for (null; i <= n; null) {
                res += i++;
            }
            return res;
        }
        function straightWhileLoop (n) {
            var res = 0,
                i = 0;
            while (i <= n) {
                res += i++;
            }
            return res;
        }

        this.render(function test () {
            'use strict';
            var JT = JMVC.test,
                times = 1,
                top = 1E8,
                res = top * (top + 1) / 2;

            JT.initialize(true);
            JT.startAll();

            JMVC.events.loadify(500);

            JT.describe('sumSquares inner function and inline call time comparison');

            JT.message('straightDumbForLoop');
            JT.code(straightDumbForLoop.toString());

            JT.message('straightNotSoDumbForLoop');
            JT.code(straightNotSoDumbForLoop.toString());

            JT.message('straightForLoop');
            JT.code(straightForLoop.toString());

            JT.message('straightWhileLoop');
            JT.code(straightWhileLoop.toString());

            JT.testValue('Test  straightDumbForLoop', function () {
                return straightDumbForLoop(top);
            }, res);
            JT.testValue('Test  straightNotSoDumbForLoop', function () {
                return straightNotSoDumbForLoop(top);
            }, res);
            JT.testValue('Test  straightForLoop', function () {
                return straightForLoop(top);
            }, res);
            JT.testValue('Test  straightWhileLoop', function () {
                return straightWhileLoop(top);
            }, res);

            JT.describe('<h2>Times comparison</h2>here the 2 functions are executed ' + times + ' times with the same input : ' + top);

            JT.testTime('straightDumbForLoop', straightDumbForLoop, times, [top]);
            JT.testTime('straightNotSoDumbForLoop', straightNotSoDumbForLoop, times, [top]);
            JT.testTime('straightForLoop', straightForLoop, times, [top]);
            JT.testTime('straightWhileLoop', straightWhileLoop, times, [top]);

            JT.timeSummary();

            JT.finishAll();
        });
    };
};
