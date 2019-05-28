JMVC.controllers.find = function () {
    this.action_index = function () {
        JMVC.events.loadify(1000);
        this.render(function test () {
            'use strict';
            var s = [
                [1, 2, 3, 4],
                'asdasda',
                [1, 2, 3],
                [1, 2],
                1, 2, 3, 4, 5,
                false,
                'asdasda',
                3, 4, 5,
                false,
                'asdasda',
                4, 3,
                'hellp',
                'y',
                true,
                true,
                function () { alert('hello'); }
            ];

            JMVC.test.initialize(true);
            JMVC.test.startAll();

            JMVC.test.describe('Try to find some elements in a little array');
            JMVC.test.code('var s = ' + JSON.stringify(s) + ';');

            JMVC.test.testValue('JMVC.array.find(s, 4)', function () {
                return JMVC.array.find(s, 4);
            }, 7);
            JMVC.test.testValue('JMVC.array.find(s, "asdasda")', function () {
                return JMVC.array.find(s, 'asdasda');
            }, 1);
            JMVC.test.testValue('JMVC.array.find(s, "sss")', function (a, v) {
                return JMVC.array.find(a, v);
            }, -1, { args: [s, 'sss'] });

            JMVC.test.finishAll();
        });
    };
};
