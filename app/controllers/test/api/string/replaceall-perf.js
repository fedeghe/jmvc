JMVC.controllers['replaceall-perf'] = function() {
    this.action_index = function(){

        JMVC.events.loadify(1000);


        //switch based
        function f1(tpl, o, dD, Dd, cb) {
            dD || (dD = '%');
            Dd || (Dd = '%');
            var reg = new RegExp(dD + '([A-z0-9-_]*)' + Dd, 'g'),
                str;
            cb = cb || false;
            return tpl.replace(reg, function (str, $1) {
                switch (true) {
                    case typeof o === 'function' : return o($1); break;
                    case $1 in o : return o[$1]; break;
                }
                return cb || dD + $1 + Dd;
            });
        }

        //ternary op based
        function f2(tpl, o, dD, Dd, cb) {
            dD || (dD = '%');
            Dd || (Dd = '%');
            var reg = new RegExp(dD + '([A-z0-9-_]*)' + Dd, 'g'),
                str;
            cb = cb || false;
            return tpl.replace(reg, function (str, $1) {
                return typeof o === 'function' ? o($1) : $1 in o ? o[$1] : cb || dD + $1 + Dd;
            });
        }
        
        
        
        this.render(function test(){
            "use strict";

            var tpl = "%a% %b% %c% %d% %e% %f% %g% %h% %i% %j% %k% %l% %m% %n% %o% %p% %q% %r% %s% %t% %u% %v% %w% %x% %y% %z% ",
                o = {
                    a : 1, b : 2, c : 3, d : 4, e : 5, f: 6,
                    g : 7, h : 8, i : 9, j : 10, k : 11, l : 12,
                    m : 13, n : 14, o : 15, p : 16, q : 17, r : 18,
                    s : 19, t : 20, u : 21, v : 22, w : 23, x : 24,
                    y : 25, z : 26
                },
                nEls = 1000; //351
                // 351 * 1000

            tpl = JMVC.string.trim(JMVC.string.repeat(tpl, nEls)).replace(/\s/g, '+');
            
            

            JMVC.test.initialize(true);
            
            JMVC.test.startAll();
            
            JMVC.test.describe(
                'First part of test checks a function that receives as input a number and an ordered '+
                'array or numbers.<br />The wanted output is the value in the array nearest to the value '+
                'passed as first parameter.<br /><br />Will be compared 4 functions<br />most is about correctness but\n'+
                'at the end there is an execution <a href="#times">time comparison</a>:');
            
            
            
            function pool(f) {
                JMVC.test.testValue("eval(f1(tpl, o)) = 35100", function(){return eval(f1(tpl, o));}, 1000 * 26 * 27 / 2);
                // JMVC.test.testValue("f(-3.33E31, s) = -3.33E30", function(){return f(-3.33E31, s);}, -3.33E30);
                // JMVC.test.testValue("f(-100, s) = -10.2", function(){return f(-100, s);}, -10.2);
                // JMVC.test.testValue("f(2, s) = 1", function(){return f(2, s);}, 1);
                // JMVC.test.testValue("f(10, s) = 1", function(){return f(10, s);}, 1);
                // JMVC.test.testValue("f(11, s) = 20", function(){return f(11, s);}, 20);
                // JMVC.test.testValue("f(19, s) = 20", function(){return f(19, s);}, 20);
                // JMVC.test.testValue("f(20, s) = 20", function(){return f(20, s);}, 20);
                // JMVC.test.testValue("f(21, s) = 20", function(){return f(21, s);}, 20);
                // JMVC.test.testValue("f(25, s) = 30", function(){return f(25, s);}, 30);
                // JMVC.test.message('next two test a milli bound');
            }
            JMVC.test.message('f1');
            JMVC.test.code(f1.toString());
            pool(f1);

            JMVC.test.pause();
            
            
            JMVC.test.message('f2');
            JMVC.test.code(f2.toString());
            
            
            pool(f2);
            
            
            var times = 100;
            
            
            JMVC.test.describe('<a name="times"></a><h1>Times comparison</h1>here the 4 functions are executed '+times+' times with the same random array sized  with elements between -1E6 and 1E6');
            
            JMVC.test.testTime('f1', f1, times, [tpl, o]);
            JMVC.test.testTime('f2', f2, times, [tpl, o]);
            
            
            JMVC.test.finishAll();          
            
        });


    }
};