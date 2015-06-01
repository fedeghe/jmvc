JMVC.controllers.fcall = function() {

    this.action_index = function(){

        
function sumSquares1(n) {
	var res = 0;
    function square(t) { return t * t;}
    while (n--) {
    	res += square(n);
    }
    return res;
}
function sumSquares2(n) {
	var res = 0;
	while (n--) {
		res += n * n;
	}
	return res;
}

function sumSquares3(n) {
	var res = 0;
	while (n--) {
		res += Math.pow(n, 2);
	}
	return res;
}

        this.render(function test(){
            "use strict";
            var JT = JMVC.test;
            
            JT.initialize(true);
            JT.startAll();
            
            JMVC.events.loadify(1000);
            
            JT.describe('sumSquares inner function and inline call time comparison');

            JT.message('Inner function');
            JT.code(sumSquares1.toString());

            JT.message('Inline');
            JT.code(sumSquares2.toString());

            JT.message('Inline Math.pow based');
            JT.code(sumSquares3.toString());

            
            var times = 200,
                top = 1E7;

            JT.describe('<h2>Times comparison</h2>here the 2 functions are executed ' + times + ' times with the same input : '+ top);

            JT.testTime('sumSquares1', sumSquares1, times, [top]);
            JT.testTime('sumSquares2', sumSquares2, times, [top]);
            JT.testTime('sumSquares3', sumSquares3, times, [top]);

            JT.timeSummary();
            
            JT.finishAll();
        });
    };
};