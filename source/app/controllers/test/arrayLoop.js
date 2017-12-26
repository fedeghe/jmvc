JMVC.controllers.arrayLoop = function() {

	this.action_index = function(){
		
		
		JMVC.events.loadify(1000);
		
		this.render(function test(){
			"use strict";
			
			var JT = JMVC.test,
				size = 1E6,
				s = (function () {
					var r = [], i = 0;
					while (i++ < size) r.push(Math.random());
					return r;
				})(),
				i = 0,
				times = 10,
				res = [],
				utility = {};
			
			JMVC.test.initialize();
			JMVC.test.startAll();
			JMVC.test.describe(`
Test array loops:<br/>

Simply loop over a pseudorandom array of integer of ${size} elements to sum up (${times} times for precision purposes),<br/>check result matching among 
different core loops and compare execution times
`);
			
			function _forEach(a) {
				var res = 0;
				a.forEach(function (el) {res += el});
				return res;
			}

			function _for(a) {
				var res = 0, l = a.length, i = 0;
				for (null; i < l; i++) res += a[i]; 
				return res;
			}

			function _for_invert(a) {
				var res = 0, l = a.length;
				for (null; l--; null) res += a[l]; 
				return res;
			}

			function _while(a) {
				var res = 0, l = a.length, i = 0;
				while (i < l) res += a[i++]; 
				return res;
			}

			function _while_invert(a) {
				var res = 0, l = a.length;
				while (l--) res += a[l]; 
				return res;
			}

			function _forIn(a) {
				var res = 0,i;
				for (i in a) 
					if (a.hasOwnProperty(i)) res += a[i];
				return res;
			}

			function _forOf(a) {
				var res = 0, i;
				for (i of a) res += i;
				return res;
			}

			function _map(a) {
				var res = 0;
				a.map(function (el) {res += el;});
				return res;
			}

			function _iter(a) {
				var res = 0,
					entry,
					items = a.entries();
				while (!(entry = items.next()).done) {
					res += entry.value[1];
				}
				return res;
			}

			function _eval(a) {
				var res =  eval(a.join('+'))
				return res;
			}

			function _red(a) {
				var res =  a.reduce(function (r, item) {
					return r + item;
				}, 0);
				return res;
			}

			/**
			 * utility functions for storing and then being able to check results
			 */
			utility = {
				run : function (fun, n) {
					return function () {
						res[n] = fun(s);
					};
				},
				doTest : function (label, fun, n) {
					JT.hr();
					JT.message(label);
					JT.code(fun.toString());
					JT.testTime(label, this.run(fun, n), times, [s]);
				},
				check : function () {
					var r = true,
						i = 0,
						len = res.length - 1;
					for (null; i < len; i++) {
						r = r && res[i] === res[i + 1];
					}
					return r;
				}
			};

			utility.doTest('forEach',_forEach, 0);
			utility.doTest('for',_for, 1);
			utility.doTest('for inverted',_for_invert, 2);
			utility.doTest('while',_while, 3);
			utility.doTest('while inverted',_while_invert, 4);
			utility.doTest('for in',_forIn, 5);
			utility.doTest('for of',_forOf, 6);
			utility.doTest('iterator', _iter, 7);
			utility.doTest('reduce', _red, 8);
			JT.describe('What about abusing....')
			utility.doTest('map abuse', _map, 9);
			utility.doTest('crazy eval', _eval, 10);

			JT.testValue("check results matches", utility.check, true);

			JT.timeSummary();
			JT.finishAll();
		});
	}
};