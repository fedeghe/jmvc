JMVC.controllers.define = function () {
    this.action_index = function () {

        JMVC.events.loadify(500);
        
        this.render(function () {
            "use strict";

            JMVC.test.initialize(true);
            JMVC.test.startAll();
            JMVC.test.describe('Use define to create a new element with injected modules');

            JMVC.test.message('no param');

            var t = JMVC.define(
                'xxx.sss',
                ['def.xxx', 'def.yyy'],
                function (x, y) {
                    return {
                        name : 'xy injected',
                        one : function () {return y.getName() + ' son of ' + x.name;},
                        two : function () {return "hello world";},
                        three : function () {return this.name;} 
                    }
                }
            );

            JMVC.test.code(`var t = JMVC.define("xxx.sss",
                ["def.xxx", "def.yyy"],
                function (x, y) {
                    return {
                        name : 'xy injected',
                        one : function () {return y.getName() + ' son of ' + x.name;},
                        two : function () {return "hello world";},
                        three : function () {return this.name;} 
                    };
                }
            );`);

            JMVC.test.testValue("t.one();", function(){return t.one(); }, 'Gabriele son of Federico');
            JMVC.test.testValue("t.two();", function(){return t.two(); }, 'hello world');
            JMVC.test.testValue("t.three();", function(){return t.three(); }, 'xy injected');

            JMVC.test.finishAll();

        });
    };
};