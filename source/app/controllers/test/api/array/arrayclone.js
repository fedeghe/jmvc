JMVC.controllers.arrayclone = function () {

	this.action_index = function(){
        JMVC.events.loadify(1000);
        this.render(function test(){
            "use strict";
            var s = [
                [1,2,3,4],
                [1,2,3],
                [1,2],
                1,2,3,4,5,
                false,
                "asdasda",
                3,4,5,
                false,
                "asdasda",
                4,3,
                'hellp',
                'y',
                true,
                true,
                function (){alert('hello')}
            ];

            JMVC.test.initialize(true);
            JMVC.test.startAll();

            JMVC.test.describe('Clone an array, the clone assertion id based on the JSON.stringify function');
            JMVC.test.code('var s = ' + JSON.stringify(s) + ';');

            JMVC.test.testAssertion('clone1', function () {
				return s.toString() == JMVC.array.clone(s).toString();
			});
            JMVC.test.testAssertion('clone2', function () {
				return s[1].toString() == JMVC.array.clone(s[1]).toString();
			});

            JMVC.test.finishAll();
        });
	};
};
