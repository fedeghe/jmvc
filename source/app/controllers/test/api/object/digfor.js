JMVC.controllers.digfor = function () {

    this.action_index = function () {
        
        
        this.render(false, function test() {
            "use strict";
            JMVC.test.initialize(true);
            JMVC.test.startAll();


            var keyObj = {
                "#PARAM{k0}" : {a : 1},
                "k2" : ["#PARAM{v2}", "name"],
                "k3" : [{
                    "#PARAM{k1}" : {a : 1},
                    "k2" : "v2",
                    "#PARAM{k2}" : {a : 1},
                    "k4" : {
                        "k5" : {
                            "#PARAM{k5}" : {o : 1}
                        }
                    }
                },{
                    "#PARAM{k3}" : {a : 1},
                    "#PARAM{k4}" : {a : 1}
                }]
            };


            JMVC.test.code('\
var keyObj = {\n\
    "#PARAM{k0}" : {a : 1},\n\
    "k2" : ["#PARAM{v2}", "name"],\n\
    "k3" : [{\n\
        "#PARAM{k1}" : {a : 1},\n\
        "k2" : "v2",\n\
        "#PARAM{k2}" : {a : 1},\n\
        "k4" : {\n\
            "k5" : {\n\
                "#PARAM{k5}" : {o : 1}\n\
            }\n\
        }\n\
    },{\n\
        "#PARAM{k3}" : {a : 1},\n\
        "#PARAM{k4}" : {a : 1}\n\
    }]\n\
};');
            var keyRes = JMVC.object.digForKey(keyObj, /#PARAM{([^}]*)}/),
                hmKeys = 6;
            JMVC.test.testValue('Keys found with /#PARAM{([^}]*)}/ are '+hmKeys, function () {return keyRes.length; }, hmKeys); 
            JMVC.test.message('trying to replace an object through parent reference')
            var ref = JMVC.nsCheck(keyRes[3].parentContainer, keyObj);
            ref[keyRes[3].parentKey] = {'obj' : 'replaced'};
            JMVC.test.testValue('Check substitution ', function () {return keyObj.k3[0].k4.k5.obj; }, 'replaced');


            


            var valObj = {
                "#PARAM{k0}" : {a : "#PARAM{v0}"},
                "k2" : ["#PARAM{v1}", "name"],
                "k3" : [{
                    "#PARAM{k1}" : {a : 1},
                    "k2" : "#PARAM{v2}",
                    "#PARAM{k2}" : {a : "#PARAM{v3}"},
                    "k4" : {
                        "k5" : {
                            "#PARAM{k5}" : {o : "#PARAM{v4}"}
                        }
                    }
                },{
                    "#PARAM{k3}" : {a : 1},
                    "#PARAM{k4}" : {a : 1, b: 1, c: {
                        d: {
                            e: {
                                f: [1,2,3,"#PARAM{v5}"]
                            }
                        }
                    }}
                }, "#PARAM{v6}"]
            };

            JMVC.test.code('\
var valObj = {\n\
    "#PARAM{k0}" : {a : "#PARAM{v0}"},\n\
    "k2" : ["#PARAM{v1}", "name"],\n\
    "k3" : [{\n\
            "#PARAM{k1}" : {a : 1},\n\
            "k2" : "#PARAM{v2}",\n\
            "#PARAM{k2}" : {a : "#PARAM{v3}"},\n\
            "k4" : {\n\
                "k5" : {\n\
                    "#PARAM{k5}" : {o : "#PARAM{v4}"}\n\
                }\n\
            }\n\
        },{\n\
            "#PARAM{k3}" : {a : 1},\n\
            "#PARAM{k4}" : {\n\
                a : 1,\n\
                b: 1,\n\
                c: {\n\
                    d: {\n\
                        e: {\n\
                            f: [1,2,3,"#PARAM{v5}"]\n\
                        }\n\
                    }\n\
                }\n\
            }\n\
        },\n\
        "#PARAM{v6}"\n\
    ]\n\
};');

            var valRes = JMVC.object.digForValue(valObj, /#PARAM{(v[^}]*)}/),
                hmVals = 7;
            JMVC.test.testValue('Values found with /#PARAM{(v[^}]*)}/ are '+hmVals, function () {return valRes.length; }, hmVals); 
 //           console.dir(valRes);

            
            JMVC.test.message('trying to replace an object through parent reference')
            JMVC.nsCheck(valRes[0].parentContainer, valObj)[valRes[0].parentKey] = {'obj' : 'replaced'};
            JMVC.test.testValue('Check substitution ', function () {return valObj["#PARAM{k0}"].obj; }, 'replaced');





            //console.debug(JMVC.object.digForKey(obj, /#KEY{([^}]*)}/ ));
            // JMVC.test.testValue('Bucket is empty', function () {return a.size(); }, 0);
            // JMVC.test.message('fill with ' + howmany + ' elements a0, a1, ... a' + (howmany - 1));

            // JMVC.test.testValue('Bucket has ' + howmany + ' elements', function () {return a.size(); }, howmany);
            // JMVC.test.message('one element out');

            // JMVC.test.testValue('Bucket has ' + (howmany - 1) + ' elements', function () {return a.size(); }, howmany - 1);
            // JMVC.test.message(hmout + ' elements out');

            // JMVC.test.testValue('Bucket has ' + (oldsize-hmout) + ' elements', function () {return a.size(); }, oldsize - hmout);
            // JMVC.test.testValue('Bucket has more elements', function () {return !!a.hasMore(); }, true);
            // JMVC.test.message('after wiping out all');

            // JMVC.test.testValue('Bucket is empty', function () {return !!a.hasMore(); }, false);
            // JMVC.test.message('fill it again with 10 elements a0, ... a9');
            // JMVC.test.message(a.show());    
            // JMVC.test.message('create another b0, ... b19, merge`em and shuffle');
            // JMVC.test.message(a.show());
            JMVC.test.finishAll();

        });
    }
    
};
