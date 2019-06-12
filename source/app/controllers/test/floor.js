JMVC.controllers.floor = function () {
    this.action_index = function () {
        function floorNative (f) {
            return Math.floor(f);
        }
        function floor2NotBw (f) {
            return ~~f;
        }
        function floorBw (f) {
            return f >> 0;
        }

        function floorOr (f) {
            return f | 0;
        }

        this.render(function test () {
            'use strict';
            var JT = JMVC.test,
                times = 1E4,
                f = function () { return [JMVC.util.range(1, 1000) + Math.random()]; };

            JT.initialize(true);
            JT.startAll();

            JMVC.events.loadify(1000);

            JT.describe('Floor fast');

            JT.message('Native version');
            JT.code(floorNative.toString());

            JT.message('Double not bitwise version');
            JT.code(floor2NotBw.toString());

            JT.message('Bitwise 0 shift version');
            JT.code(floorBw.toString());

            JT.message('OR version');
            JT.code(floorOr.toString());

            JT.describe('<h2>Times comparison</h2>here the 4 functions are executed ' + times + ' times with the same input');

            JT.testTime('floorNative', floorNative, times, f);
            JT.testTime('floor2NotBw', floor2NotBw, times, f);
            JT.testTime('floor_bw', floorBw, times, f);
            JT.testTime('floorOr', floorOr, times, f);

            JT.timeSummary();

            JT.finishAll();
        });
    };
};
