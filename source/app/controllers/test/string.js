JMVC.controllers.string = function () {
    this.action_index = function () {
        function es5endsWith (str, end) {
            return !!(str.match(new RegExp(end + '$', 'i')));
        }
        function es5startsWith (str, start) {
            return !!(str.match(new RegExp('^' + start, 'i')));
        }
        function es6endsWith (str, end) {
            return str.endsWith(end);
        }
        function es6startsWith (str, start) {
            return str.startsWith(start);
        }

        // es6startssWith
        //
        this.render(function test () {
            'use strict';
            var JT = JMVC.test,
                times = 1E2;

            JT.initialize(true);
            JT.startAll();
            JMVC.events.loadify(500);
            JT.describe('ES5 vs. ES6 endsWith/startsWith comparison');

            JT.message('es5endsWith');
            JT.code(es5endsWith.toString());
            JT.message('es5startsWith');
            JT.code(es5startsWith.toString());

            JT.message('es6endsWith');
            JT.code(es6endsWith.toString());
            JT.message('es6startsWith');
            JT.code(es6startsWith.toString());

            // JT.testTime('es5endsWith', es5endsWith, times, ["hello world", "ld"]);
            // JT.testTime('es5startsWith', es5startsWith, times, ["hello world", "he"]);
            // JT.testTime('es6endsWith', es6endsWith, times, ["hello world", "ld"]);
            // JT.testTime('es6startsWith', es6startsWith, times, ["hello world", "he"]);

            function generateEnd () { return [ 'Hello', 'lo' ]; }
            function generateStart () { return [ 'Hello', 'He' ]; }
            JT.testTime('es5endsWith', es5endsWith, times, generateEnd);
            JT.testTime('es5startsWith', es5startsWith, times, generateStart);
            JT.testTime('es6endsWith', es6endsWith, times, generateEnd);
            JT.testTime('es6startsWith', es6startsWith, times, generateStart);

            JT.timeSummary();
            JT.finishAll();
        });
    };
};
