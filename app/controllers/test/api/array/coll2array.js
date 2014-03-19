JMVC.controllers.coll2array = function() {
    this.action_index = function(){
        JMVC.events.loadify(1000);
        
        this.render(function test(){
            "use strict";

            function test () {
                var meta = document.getElementsByTagName("meta"),
                    metaArr = JMVC.array.coll2array(meta),
                    against = [];
                for (var i = 0, l = meta.length; i < l; i++) {
                    against.push(meta.item(i));
                }
                return [against, metaArr];
            }   

            var res = test();

            
            
            JMVC.test.initialize(true);
            JMVC.test.startAll();
            
            JMVC.test.describe('Get meta tag collection with getElementsByTagName function, loop on that creating an array with indexed item function, and match against the result of JMVC.array.coll2array');
            JMVC.test.code(test.toString() + "\n" + 'var res = test();' );
            
            JMVC.test.testAssertion('test', function () {return res[0].toString() == res[1].toString(); });

            JMVC.test.finishAll();
        });
    };
};