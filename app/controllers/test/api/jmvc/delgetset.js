JMVC.controllers.delgetset = function () {
    this.action_index = function () {

        JMVC.events.loadify(500);
        
        this.render(function test(){
            "use strict";
                
            JMVC.test.initialize(true);
            
            JMVC.test.startAll();

            


            function trial(name, value, where, storage) {
                
                JMVC.test.describe('Set, get and del a named item in ' + where + '.');

                JMVC.test.message('set an item and check the value inserted recovering it');
                JMVC.test.code("JMVC.set('" + name + "', '" + JSON.stringify(value) + "'" + (storage ? ', ' + where : '') + ");");
                JMVC.set(name, value, storage);
                
                JMVC.test.testValue(
                    "JMVC.get('" + name + "'" + (storage ? ', ' + where : '') + ");",
                    function () {
                        return JMVC.get(name, storage);
                    },
                    value
                );



                JMVC.test.message('delete the item, and check that is no more defined');
                JMVC.test.code("JMVC.del('" + name + "'" + (storage ? ', ' + where : '') + ");");
                
                JMVC.del(name, storage);
                
                JMVC.test.testValue(
                    "JMVC.get('" + name + "'" + (storage ? ', ' + where : '') + ");",
                    function () {
                        return JMVC.get(name, storage);
                    },
                    undefined
                );

            }

            trial('name', 'Achille', 'page registry');
            trial('name', 'Achille', 'localStorage', localStorage);
            trial('name', 'Achille', 'sessionStorage', sessionStorage);

            trial('person', {name : 'Achille', nick : 'Pieveloce'}, 'sessionStorage', sessionStorage);

            JMVC.test.finishAll();
        });
    };
};