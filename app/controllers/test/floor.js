JMVC.controllers.floor = function() {

    this.action_index = function(){

        function floor_native(f) {
            return Math.floor(f);
        }
        function floor2NotBw(f) {
            return ~~f;
        }
        function floor_Bw(f) {
            return f >> 0;
        }

        function floor_OR(f) {
            return f | 0;
        }


        this.render(function test(){
            "use strict";
            var JT = JMVC.test;
            
            JT.initialize(true);
            JT.startAll();
            
            JMVC.events.loadify(1000);
            
            JT.describe('Floor fast');

            JT.message('Native version');
            JT.code(floor_native.toString());

            JT.message('Double not bitwise version');
            JT.code(floor2NotBw.toString());

            JT.message('Bitwise 0 shift version');
            JT.code(floor_Bw.toString());

            JT.message('OR version');
            JT.code(floor_OR.toString());

            var times = 1E4,
                f = function () {return [JMVC.util.range(1,1000) + Math.random()]; };
            JT.describe('<h2>Times comparison</h2>here the 4 functions are executed ' + times + ' times with the same input');

            JT.testTime('floor_native', floor_native, times, f);
            JT.testTime('floor2NotBw', floor2NotBw, times, f);
            JT.testTime('floor_bw', floor_Bw, times, f);
            JT.testTime('floor_OR', floor_OR, times, f);

            JT.timeSummary();
            
            JT.finishAll();
        });
    };
};