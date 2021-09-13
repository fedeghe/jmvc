JMVC.controllers.array = function () {
    this.action_index = function () {
        JMVC.require('core/lib/array/array');
        JMVC.events.loadify(1000);
        this.render(function test () {
            'use strict';
            var s = [-3.33E30, -10.2, 1, 20, 30, 40, 50, 60, 70, 80, 90, 95.3, 110, 120, 130, 140, 300, 1E4],
                times = 5000,
                n = s = 10000,
                rn = JMVC.util.rand(-s, s) + 0.3456,
                a = [];
            JMVC.test.initialize(true);
            JMVC.test.startAll();
            JMVC.test.describe(
                'First part of test checks a function that receives as input a number and an ordered ' +
                'array or numbers.<br />The wanted output is the value in the array nearest to the value ' +
                'passed as first parameter.<br /><br />Will be compared 4 functions<br />most is about correctness but\n ' +
                'at the end there is an execution <a href="#times">time comparison</a>:');

            JMVC.test.code('var s = [' + s.toString() + '];');

            function pool (f) {
                JMVC.test.testValue('f(1.2, s) = 1', function () { return f(1.2, s); }, 1);
                JMVC.test.testValue('f(-3.33E31, s) = -3.33E30', function () { return f(-3.33E31, s); }, -3.33E30);
                JMVC.test.testValue('f(-100, s) = -10.2', function () { return f(-100, s); }, -10.2);
                JMVC.test.testValue('f(2, s) = 1', function () { return f(2, s); }, 1);
                JMVC.test.testValue('f(10, s) = 1', function () { return f(10, s); }, 1);
                JMVC.test.testValue('f(11, s) = 20', function () { return f(11, s); }, 20);
                JMVC.test.testValue('f(19, s) = 20', function () { return f(19, s); }, 20);
                JMVC.test.testValue('f(20, s) = 20', function () { return f(20, s); }, 20);
                JMVC.test.testValue('f(21, s) = 20', function () { return f(21, s); }, 20);
                JMVC.test.testValue('f(25, s) = 30', function () { return f(25, s); }, 30);
                JMVC.test.message('next two test a milli bound');
                JMVC.test.testValue('f(92.649, s) = 90', function () { return f(92.649, s); }, 90);
                JMVC.test.testValue('f(92.65, s) = 95.3', function () { return f(92.65, s); }, 95.3);
                JMVC.test.testValue('f(130, s) = 130', function () { return f(130, s); }, 130);
                JMVC.test.testValue('f(219, s) = 140', function () { return f(219, s); }, 140);
                JMVC.test.testValue('f(221, s) = 300', function () { return f(221, s); }, 300);
                JMVC.test.testValue('f(9E3, s) = 1E4', function () { return f(9E3, s); }, 1E4);
                JMVC.test.testValue('f(9E5, s) = 1E4', function () { return f(9E5, s); }, 1E4);
                JMVC.test.testValue('f(9E10, s) = 1E4', function () { return f(9E10, s); }, 1E4);
                JMVC.test.testValue('f(Infinity, s) = 1E4', function () { return f(Infinity, s); }, 1E4);
            }
            JMVC.test.message('O(n)');
            JMVC.test.code(JMVC.array.nearestElement.toString());
            pool(JMVC.array.nearestElement);

            JMVC.test.pause();

            JMVC.test.describe('Now the binary version');
            JMVC.test.message('O(log n)');
            JMVC.test.code(JMVC.array.bNearestElement.toString());

            pool(JMVC.array.bNearestElement);

            JMVC.test.pause();

            JMVC.test.describe('The original Baroncelli version');
            JMVC.test.message('O(log n)');
            JMVC.test.code(JMVC.array.origNearest.toString());

            // JMVC.test.code('var t = \'feder ico\';');
            // JMVC.test.code('var t = "feder ico";');

            pool(JMVC.array.origNearest);

            JMVC.test.pause();

            JMVC.test.describe('Now the quickest (among previous)');
            JMVC.test.message('O(log n)');
            JMVC.test.code(JMVC.array.fastNearest.toString());

            pool(JMVC.array.fastNearest);

            while (n--) { a.push(JMVC.util.rand(-s, s)); }
            a.sort(function (x, y) { return x - y; });

            JMVC.test.describe('<a name="times"></a><h1>Times comparison</h1>here the 4 functions are executed ' + times + ' times with the same random array sized ' + s + ' with elements between -1E6 and 1E6');

            JMVC.test.testTime('JMVC.array.nearestElement', JMVC.array.nearestElement, times, [rn, a]);
            JMVC.test.testTime('JMVC.array.bNearestElement', JMVC.array.bNearestElement, times, [rn, a]);
            JMVC.test.testTime('JMVC.array.origNearest', JMVC.array.origNearest, times, [rn, a]);
            JMVC.test.testTime('JMVC.array.fastNearest', JMVC.array.fastNearest, times, [rn, a]);

            JMVC.test.timeSummary();

            JMVC.test.finishAll();
        });
    };
};
