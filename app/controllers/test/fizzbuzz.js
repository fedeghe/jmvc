JMVC.controllers.fizzbuzz = function() {

    this.action_index = function(sunday){

        function fb1(n) {
            var res = '',
                max = n || 1E5,
                inner = function (j) {
                    return (j % 3 ? '' : 'Fizz') + (j % 5 ? '' : 'Buzz') || j;
                }
            for (var i = 1, out = ''; i < max; i++, out = '') {
                inner(i);
            }
            return true;
        }

        function fb2(n) {
            var acc = 810092048,
                top = n || 1E5,
                number = 1,
                bitwiseFizzBuzz = function (i) {
                    var c = acc & 3,
                        a = 'FizzBuzz';
                    if (c === 0) {
                        a = i;
                    } else if (c === 1) {
                        a = 'Fizz';
                    } else if (c === 2) {
                        a = 'Buzz';
                    }
                    acc = acc >> 2 | c << 28;
                    return a;
                },
                end;
             
            while (number <= top) {
              bitwiseFizzBuzz(number)
              number++;
            }
            return true;
        }

        function fb3(n) {
            var messages = [null, "Fizz", "Buzz", "FizzBuzz"],
                acc = 810092048, //11 00 00 01 00 10 01 00 00 01 10 00 01 00 00
                c = 0,
                result,
                i = 0;
            for (; i <= n; i++)  {
                c = acc & 3;
                result += (c > 0) ? messages[c] : i + ", ";
                acc = acc >> 2 | c << 28;
            }
        }

        this.render(function test(){
            "use strict";
            var JT = JMVC.test;
            
            JT.initialize(true);
            JT.startAll();
            
            JMVC.events.loadify(1000);
            
            JT.describe('FizzBuzz time comparison');

            JT.message('First version');
            JT.code(fb1.toString());

            JT.message('Fast version');
            JT.code(fb2.toString());

            JT.message('X version');
            JT.code(fb3.toString());

            var times = 10,
                top = 1E5;
            JT.describe('<h2>Times comparison</h2>here the 2 functions are executed ' + times + ' times with the same input : '+ top);

            JT.testTime('fb1', fb1, times, [top]);
            JT.testTime('fb2', fb2, times, [top]);
            JT.testTime('fb3', fb3, times, [top]);

            JT.timeSummary();
            
            JT.finishAll();
        });
    };
};