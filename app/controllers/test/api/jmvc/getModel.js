JMVC.controllers.getModel = function() {
    this.action_index = function(){
        JMVC.events.loadify(500);
        this.render(function test(){
            "use strict";
            JMVC.test.initialize(true);
            JMVC.test.startAll();
            JMVC.test.describe('JMVC.getModel function');
            var triangle = JMVC.getModel('test/Shape', ['Triangle']),
                square = JMVC.getModel('test/Shape', ['Square']);
            JMVC.test.testValue("triangle.name;", function(){return triangle.name; }, 'Triangle');
            JMVC.test.testValue("square.name;", function(){return square.name; }, 'Square');
            JMVC.test.finishAll();
        });
    }
};