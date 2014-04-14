JMVC.controllers.floor = function() {

    this.action_index = function(){

        function floor1(f) {
            return Math.floor(f);
        }
        function floor2(f) {
            return ~~f;
        }
        function floor3(f) {
            return f >> 0;
        }


        this.render(function test(){
            "use strict";
            var JT = JMVC.test;
            
            JT.initialize(true);
            JT.startAll();
            
            JMVC.events.loadify(1000);
            
            JT.describe('Floor fast');

            JT.message('First version');
            JT.code(floor1.toString());

            JT.message('Fast version');
            JT.code(floor2.toString());

            JT.message('X version');
            JT.code(floor3.toString());

            var times = 1E3,
                f = function () {return [JMVC.util.range(1,1000) + Math.random()]; };
            JT.describe('<h2>Times comparison</h2>here the 2 functions are executed ' + times + ' times with the same input : '+ top);

            JT.testTime('floor1', floor1, times, f);
            JT.testTime('floor2', floor2, times, f);
            JT.testTime('floor3', floor3, times, f);

            JT.timeSummary();
            
            JT.finishAll();
        });
    };
};