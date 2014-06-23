JMVC.controllers.arrayOp = function() {

	this.action_index = function(){
		
		
		
		JMVC.events.loadify(1000);
		
		
		function afunc() {alert('hei'); }
		
		
		this.render(false,function test(){
			"use strict";
			
			var arr = [
				[1,[1,[1,[1,2]]]],			//0
				2,							//1
				true,						//2
				'hei',						//3
				"YOU",						//4
				Infinity,					//5
				{"o" : "s", 'd':[1,2,3]},	//6
				new RegExp(/\s/),			//7
				{},							//8
				function(){alert('hei');},	//9
				[{a:1},{b:2},{c:3},{d:{a:{b:{d:1000}}}}], //10
				afunc
			];
			
			JMVC.test.initialize(true);
			
			JMVC.test.startAll();
			
			//JMVC.test.describe('');
			
			JMVC.test.code(afunc.toString()+'\n\
'+'\
var arr = [\n\
	[1, [1, [1, [1, 2]]]],			// 0\n\
	2,					// 1\n\
	true,					// 2\n\
	\'hei\',					// 3\n\
	\'YOU\',					// 4\n\
	Infinity,				// 5\n\
	{\'o\' : \'s\', \'d\' : [1, 2, 3]},		// 6\n\
	new RegExp(/\s/),			// 7\n\
	{},					// 8\n\
	function () {alert(\'hei\'); },	// 9\n\
	[{a : 1}, {b : 2}, {c : 3}, {d : {a : {b : {d : 1000}}}}],// 10\n\
	afunc					// 11\n\
];\n\
\n\
'+JMVC.array.findRich.toString());
			
			JMVC.test.message('these return a valid index');
			JMVC.test.testValue("f(arr, [1,[1,[1,[1,2]]]]) = 0", function(){return JMVC.array.findRich(arr, arr[0]);}, 0);
			JMVC.test.testValue("f(arr, {}) = 8", function(){return JMVC.array.findRich(arr, arr[8]);}, 8);
			JMVC.test.testValue("f(arr, 'hei') = 3", function(){return JMVC.array.findRich(arr, arr[3]);}, 3);
			JMVC.test.testValue("f(arr, \"YOU\") = 4", function(){return JMVC.array.findRich(arr, arr[4]);}, 4);
			JMVC.test.testValue("f(arr, {\"o\" : \"s\", 'd':[1,2,3]}) = 6", function(){return JMVC.array.findRich(arr, arr[6]);}, 6);
			JMVC.test.testValue("f(arr, [{a:1},{b:2},{c:3},{d:{a:{b:{d:1000}}}}]) = 10", function(){return JMVC.array.findRich(arr, arr[10]);}, 10);
			JMVC.test.testValue("f(arr, function(){alert('hei');}) = 9", function(){return JMVC.array.findRich(arr, arr[9]);}, 9);
			JMVC.test.testValue("f(arr, new RegExp(/\s/)) = 7", function(){return JMVC.array.findRich(arr, arr[7]);}, 7);
			JMVC.test.testValue("f(arr, afunc) = 11", function(){return JMVC.array.findRich(arr, arr[11]);}, 11);
			
			JMVC.test.message('these DO NOT return a valid index');
			JMVC.test.testValue("f(arr, [{www:1},{b:2},{c:3},{d:{a:{b:{d:1000}}}}]) = -1", function(){return JMVC.array.findRich(arr, [{www:1},{b:2},{c:3},{d:{a:{b:{d:1000}}}}]);}, -1);
			JMVC.test.testValue("f(arr, function(){alert('hei YOU');}) = -1", function(){return JMVC.array.findRich(arr, function(){alert('hei YOU');});}, -1);
			JMVC.test.testValue("f(arr, [1,[1,[1,[1,3]]]]) = -1", function(){return JMVC.array.findRich(arr, [1,[1,[1,[1,3]]]]);}, -1);
			JMVC.test.testValue("f(arr, 'hei YOU') = -1", function(){return JMVC.array.findRich(arr, 'hei YOU');}, -1);
			JMVC.test.testValue("f(arr, {\"o\" : \"s\", 'd':[1,2,3,4]}) = -1", function(){return JMVC.array.findRich(arr, {"o" : "s", 'd':[1,2,3,4]});}, -1);
			//JMVC.test.testValue("f(arr, {\"o\" : \"e\", 'd':[1,2,3]}) = -1", function(){return JMVC.array.findRich(arr, {"o" : "e", 'd':[1,2,3,4]});}, -1);

			JMVC.test.testValue("f(arr, {}) = 8", function(){return JMVC.array.findRich(arr, {});}, 8);
			
			//JMVC.test.describe('<a name="times"></a><h1>Times comparison</h1>here the 4 functions are executed '+times+' times with the same random array sized '+ s + ' with elements between -1E6 and 1E6');
			
			//JMVC.test.testTime('JMVC.array.nearestElement', JMVC.array.nearestElement, times, [rn, a]);
			//JMVC.test.testTime('JMVC.array.bNearestElement', JMVC.array.bNearestElement, times, [rn, a]);
			//JMVC.test.testTime('JMVC.array.origNearest', JMVC.array.origNearest, times, [rn, a]);
			//JMVC.test.testTime('JMVC.array.fastNearest', JMVC.array.fastNearest, times, [rn, a]);
			
			
			JMVC.test.finishAll();			
			
		});
	}
	
};
