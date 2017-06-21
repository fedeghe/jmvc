JMVC.controllers.each = function() {
	this.action_index = function(){
		
		JMVC.events.loadify(500);


		JMVC.head.lib('jQuery');
		
		this.render(function test(){
			"use strict";
			
			JMVC.test.initialize(true);
			JMVC.test.startAll();
			JMVC.test.describe('Looping over some arrays or/and literals');

			var o = {
					name : 'federico',
					surname : 'ghedina'
				},
				a = ['zero', 'one', 'two', 'three', 'four', 'five'],
				big = [],
				obig = {},
				loop = function (el) {
					var res = '';
					JMVC.each(el, function (e, i) {
						res += '(' + i + ':' + e + ')';
					});
					return res;
				},
				destroy = function (el) {
					return JMVC.each(el, function (e, i) {
						return i + ':' + e;
					})
				},
				times = 750,
				size = 3000,
				jmvceach  = function (arr) {
					var res = 0;
					JMVC.each(arr, function (e, i) {
						res += e;
					});
					return res;
				},
				nativeforeach = 'forEach' in Array.prototype ? 
					function (arr) {
						var res = 0;
						arr.forEach(function (e, i) {
							res += e;
						})
						return res;
					}
					:
					function () {JMVC.test.message('no forEach implementation in that browser');
				},
				jqueryeach = function (arr) {
					var res = 0;
					jQuery.each(arr, function (i, e) {
						res += e;
					});
					return res;
				},
				nativeforarray = function (arr) {
					var res = 0,
						i = 0,
						l = arr.length;
					for (null; i < l; i++) {
						res += arr[i];
					}
					return res;
				},
				nativeforobj = function (obj) {
					var res = 0,
						i = 0;
					for (i in obj) {
						res += obj[i];
					}
					return res;
				},
				j = 0;

			for (null; j < size; j += 1) {
				big.push(JMVC.util.rand(-1E6, 1E6));
				obig['k' + j]  = JMVC.util.rand(-1E6, 1E6);
			}

			JMVC.test.testValue("loop(o);", function(){return loop(o); }, '(name:federico)(surname:ghedina)');
			JMVC.test.testValue("destroy(a);", function(){return destroy(a).toString(); }, '0:zero,1:one,2:two,3:three,4:four,5:five');
			JMVC.test.testValue("JMVC.each == nativeforarray;", function(){return jmvceach(big) == nativeforarray(big); }, true);
			JMVC.test.testValue("JMVC.each == jQuery.each;", function(){return jmvceach(big) == jqueryeach(big); }, true);
			JMVC.test.testValue("JMVC.each == nativeforobj;", function(){return jmvceach(obig) == nativeforobj(obig); }, true);
			

			
			JMVC.test.finishAll();		

			JMVC.test.describe('<p>What about <i>JMVC.each</i> times against <strong>pure loop</strong>' +
				//' or <i>jQuery.each</i>' +
				'?</p><a name="times"></a><h1>Times comparison</h1>here some implementation of the each function are executed '+times+' times with the same random array sized '+ size + ' with elements between -1E6 and 1E6\nand compared to a native loop implementation.');
			
			JMVC.test.describe('With Array');
			
			JMVC.test.testTime('native for (array)', nativeforarray, times, [big]);
			JMVC.test.testTime('native forEach (array)', nativeforeach, times, [big]);
			JMVC.test.testTime('jQuery.each (array)', jqueryeach, times, [big]);
			JMVC.test.testTime('JMVC.each (array)', jmvceach, times, [big]);

			
			JMVC.test.describe('With Object literal');
			JMVC.test.testTime('native for (obj literal)', nativeforobj, times, [obig]);
			JMVC.test.testTime('jQuery.each (obj literal)', jqueryeach, times, [obig]);
			JMVC.test.testTime('JMVC.each (obj literal)', jmvceach, times, [obig]);
			
			
			JMVC.test.describe('Avoid using any <i>each</i> function is the best choice you can take!');

		});
	}
};