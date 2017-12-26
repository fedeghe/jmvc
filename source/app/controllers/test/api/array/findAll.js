JMVC.controllers.findAll = function () {
    this.action_index = function () {
        JMVC.events.loadify(1000);
        
        this.render(function test(){
            "use strict";
            var s = [
                [1,2,3,4],
                "asdasda",
                [1,2,3],
                [1,2],
                1,2,3,4,5,
                false,
                "asdasda",
                3,4,5,
                false,
                "asdasda",
                4,3,
                'hello',
                'y',
                true,
                true,
                [1,2,3]
            ];
            
            JMVC.test.initialize(true);
            JMVC.test.startAll();
            
            JMVC.test.describe('Try to find some elements in a little array');
            JMVC.test.code('var s = ' + JSON.stringify(s) + ';');
            
            JMVC.test.testAssertion('JMVC.array.findAll(s, 4)', function () {
                var found = JMVC.array.findAll(s, 4);
                return JMVC.array.compare(found, [7,12,16]);
            });

            JMVC.test.testValue('JMVC.array.findAll(s, "asdasda")', function () {
                var found = JMVC.array.findAll(s, "asdasda");
                return JMVC.array.compare(found, [1,10,15]);
            }, 1);

            JMVC.test.testValue('JMVC.array.findAll(s, "sss")', function (a, v) {
                return JMVC.array.findAll(a, v);
            }, -1, {args : [s, 'sss']});

            JMVC.test.testValue('JMVC.array.findAll(s, true)', function () {
                var found = JMVC.array.findAll(s, true);
                return JMVC.array.compare(found, [20, 21]);
            }, 1);

            JMVC.test.testValue('JMVC.array.findAll(s, false)', function () {
                var found = JMVC.array.findAll(s, false);
                return JMVC.array.compare(found, [9, 14]);
            }, 1);

            JMVC.test.testValue('JMVC.array.findAll(s, [1, 2, 3])', function () {
                var found = JMVC.array.findAll(s[0], 2);
                return JMVC.array.compare(found, [1]);
            }, 1);

            

            JMVC.test.finishAll();
        });
    }
};