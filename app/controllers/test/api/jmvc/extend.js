JMVC.controllers.extend = function() {
    this.action_index = function(){
        
        JMVC.events.loadify(500);

        
        
        this.render(function test(){
            "use strict";
            
            JMVC.test.initialize(true);
            JMVC.test.startAll();
            JMVC.test.describe('Extend JMVC');

            JMVC.test.code("JMVC.extend('JMVC.test.purpose', {\n"+
                    "   pow : function (n, e) {\n"+
                    "       return Math.pow(n, e);\n"+
                    "   },\n"+
                    "   pow2 : function (n) {\n"+
                    "       return 1 << n;\n"+
                    "   }\n"+
                "});");

            
            JMVC.extend('test.purpose', {
                pow : function (n, e) {
                    return Math.pow(n, e);
                },
                pow2 : function (n) {
                    return 1 << n;
                },
                sqrt : function (n) {
                    return Math.sqrt(n);
                }
            }, JMVC);
        
            

            

            JMVC.test.testValue("JMVC.test.purpose.pow(4, 3);", function(){return JMVC.test.purpose.pow(4, 3); }, 64);
            JMVC.test.testValue("JMVC.test.purpose.pow2(4);", function(){return JMVC.test.purpose.pow2(4); }, 16);
            JMVC.test.testValue("JMVC.test.purpose.sqrt(5);", function(){return JMVC.test.purpose.sqrt(5).toFixed(2); }, 2.24);
            
            JMVC.test.finishAll();
            
            JMVC.test.describe('Avoid using any <i>each</i> function is the best choice you can take!');

        });
    }
};