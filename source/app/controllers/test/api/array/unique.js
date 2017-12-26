//include perfs file
JMVC.require('perfs/arrayunique');

JMVC.controllers.unique = function() {
    this.action_index = function(){

        
        
        JMVC.events.loadify(1000);
        
        this.render(function test(){
            "use strict";
            
            var s = [[1,2,3,4],[1,2,3,4],[1,2,3,4], 1,2,3,4,5, false, "asdasda",3,4,5, false, "asdasda",3,4,5, false, "asdasda",3,4,5, false, "asdasda",3,4,5, false, "asdasda",3,4,5, false, "asdasda",3,4,5, false, "asdasda",3,4,5, false, "asdasda",3,4,5, false, "asdasda",3,4,5, false, "asdasda",3,4,5, false, "asdasda",3,4,5, false, "asdasda",3,4,5, false, "asdasda",3,4,5, false, "asdasda",3,4,5, false, "asdasda",3,4,5, false, "asdasda",3,4,5, false, "asdasda",3,4,5, false, "asdasda",3,4,5, false, "asdasda", 4,3, 'hellp', 'y', true, true, function (){alert('hello')}, function (){alert('hello')}];
            
            
            
            JMVC.test.initialize(true);
            
            JMVC.test.startAll();
            
            JMVC.test.describe(
                'First part of test checks a function that receives as input a number and an ordered '+
                'array or numbers.<br />The wanted output is the value in the array nearest to the value '+
                'passed as first parameter.<br /><br />Will be compared 4 functions<br />most is about correctness but\n\
at the end there is an execution <a href="#times">time comparison</a>:');
            
/*
            JMVC.test.code('var s = ['+s.toString()+'];');
            
            JMVC.test.describe('Now the binary version');
            JMVC.test.code(JMVC.array.nearestElement.toString());
            JMVC.test.pause();
            
            JMVC.test.describe('Now the binary version');
            JMVC.test.code(JMVC.array.bNearestElement.toString());
            JMVC.test.pause();
            
            JMVC.test.describe('The original Baroncelli version');
            JMVC.test.code(JMVC.array.origNearest.toString());
            JMVC.test.pause();
            
            JMVC.test.describe('Now the quickest (among previous)');
            JMVC.test.code(JMVC.array.fastNearest.toString());
            JMVC.test.pause();
 */           
            var times = 5000,
                n = 10000;

            JMVC.test.describe('<a name="times"></a><h1>Times comparison</h1>here the 4 functions are executed '+times+' times with the same random array sized '+ s + ' with elements between -1E6 and 1E6');
            
            
            JMVC.test.describe('JMVC.array.Mottie_Claudill');
            JMVC.test.code(JMVC.array.Mottie_Claudill.toString());
            JMVC.test.testTime('JMVC.array.Mottie_Claudill', JMVC.array.Mottie_Claudill, times, [s]);

            JMVC.test.describe('JMVC.array.Rafael_Claudill');
            JMVC.test.code(JMVC.array.Rafael_Claudill.toString());
            JMVC.test.testTime('JMVC.array.Rafael_Claudill', JMVC.array.Rafael_Claudill, times, [s]);

            JMVC.test.describe('JMVC.array.Darshan');
            JMVC.test.code(JMVC.array.Darshan.toString());
            JMVC.test.testTime('JMVC.array.Darshan', JMVC.array.Darshan, times, [s]);
            
            JMVC.test.describe('JMVC.array.Bhattacharya');
            JMVC.test.code(JMVC.array.Bhattacharya.toString());
            JMVC.test.testTime('JMVC.array.Bhattacharya', JMVC.array.Bhattacharya, times, [s]);
            
            JMVC.test.describe('JMVC.array.unique');
            JMVC.test.code(JMVC.array.unique.toString());
            JMVC.test.testTime('JMVC.array.unique', JMVC.array.unique, times, [s]);
            
            // JMVC.test.describe('JMVC.array.unique2');
            // JMVC.test.code(JMVC.array.unique2.toString());
            // JMVC.test.testTime('JMVC.array.unique2', JMVC.array.unique2, times, [s]);
            
            JMVC.test.describe('JMVC.array.fast');
            JMVC.test.code(JMVC.array.fast.toString());
            JMVC.test.testTime('JMVC.array.fast', JMVC.array.fast, times, [s]);


            JMVC.test.timeSummary();
            

            //JMVC.test.testTime('JMVC.array.lib.underscore', JMVC.array.lib.underscore, times, [s]);
            //JMVC.test.testTime('JMVC.array.lib.jQuery', JMVC.array.lib.jQuery, times, [s]);
            //JMVC.test.testTime('JMVC.array.lib.prototype', JMVC.array.lib.prototype, times, [s]);
            
            
            JMVC.test.finishAll();
        });
    }
};

/*
var a = [1,2,3,4,5,4,3, 'hellp', 'y', true, true, function (){alert('hello')}, function (){alert('hello')}];
console.debug(JMVC.array.unique(a));
console.debug(JMVC.array.Mottie_Claudill(a));
console.debug(JMVC.array.Rafael_Claudill(a));
console.debug(JMVC.array.Darshan(a));
console.debug(JMVC.array.Bhattacharya(a));
console.debug(JMVC.array.lib.underscore(a));
console.debug(JMVC.array.lib.jQuery(a));
console.debug(JMVC.array.lib.prototype(a));
*/