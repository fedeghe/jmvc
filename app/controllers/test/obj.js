JMVC.controllers.obj = function() {

	this.action_index = function(){
		
		
		
		JMVC.events.loadify(1000);
		
		this.render(false, function test(){
			"use strict";
			
			var o0 = [1,2,function(){alert('x')}, {a:{d:3}}],
				o1 = [1,2,function(){alert('x')}, {a:{d:2}}],
				o2 = [1,2,function(){alert('x')}, {a:{d:3}}, 1],
				o3 = [1,2,function(){alert('x')}, {a:{d:3}}, 1],
				o4 = [1,2,function(){alert('x')}, {a:{d:3}}, 2],
				o5 = [1,2,2,3,4],
				o6 = [1,2,2,3,4],
				o7 = {a:1,b:2},
				o8 = {a:1, b:2},
				o9 = {a:1, b:3},
				o10 = {a:[1,2,function(){alert('x')}, {a:{d:3}}],b:2},
				o11 = {a:[1,2,function(){alert('x')}, {a:{d:3}}],b:2},
				o12 = {a:[1,2,function(){alert('x')}, {a:{d:3}}],b:2, s:'w'},
				o13 = {a:[1,2,function(){alert('x')}, {a:{d:3}}],b:2, s:{s:1}},
				o14 = {a:[1,2,function(){alert('x')}, {a:{d:3}}],b:2, s:{s:1}},
				o15 = {a:[1,2,function(){alert('x')}, {a:{d:3}}],b:2, s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{}}}}}}}}}}}}}}}}}}}},
				o16 = {a:[1,2,function(){alert('x')}, {a:{d:3}}],b:2, s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{d:1}}}}}}}}}}}}}}}}}}}},
				o17 = {a:[1,2,function(){alert('x')}, {a:{d:3}}],b:2, s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{d:1}}}}}}}}}}}}}}}}}}}},
				o18 = {a:[1,2,function(){alert('x')}, {a:{d:3}}],b:2, s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{s:{W:{s:{s:{s:{d:1}}}}}}}}}}}}}}}}}}}};
			
			JMVC.test.initialize(true);
			
			JMVC.test.startAll();
			
			JMVC.test.describe('Testing a function for comparing Object without JSON object');
			
			JMVC.test.code('var o0 = ['+JSON.stringify(o0)+'],'+"\n"+
					'	o1 = '+JSON.stringify(o1)+','+"\n"+
					'	o2 = '+JSON.stringify(o2)+','+"\n"+
					'	o3 = '+JSON.stringify(o3)+','+"\n"+
					'	o4 = '+JSON.stringify(o4)+','+"\n"+
					'	o5 = '+JSON.stringify(o5)+','+"\n"+
					'	o6 = '+JSON.stringify(o6)+','+"\n"+
					'	o7 = '+JSON.stringify(o7)+','+"\n"+
					'	o8 = '+JSON.stringify(o8)+','+"\n"+
					'	o9 = '+JSON.stringify(o9)+','+"\n"+
					'	o10 = '+JSON.stringify(o10)+','+"\n"+
					'	o11 = '+JSON.stringify(o11)+','+"\n"+
					'	o12 = '+JSON.stringify(o12)+','+"\n"+
					'	o13 = '+JSON.stringify(o13)+';'+"\n"+
					'	o14 = '+JSON.stringify(o14)+';'+"\n"+
					'	o15 = '+JSON.stringify(o15)+';'+"\n"+
					'	o16 = '+JSON.stringify(o16)+';'+"\n"+
					'	o17 = '+JSON.stringify(o17)+';'+"\n"+
					'	o18 = '+JSON.stringify(o18)+';');
			
			JMVC.test.testValue("compare(o0, o1) = false", function () {return JMVC.object.compare(o0, o1); }, false);
			JMVC.test.testValue("compare(o1, o2) = false", function () {return JMVC.object.compare(o1, o2); }, false);
			JMVC.test.testValue("compare(o2, o3) = true", function () {return JMVC.object.compare(o2, o3); }, true);
			
			JMVC.test.testValue("compare(o3, o4) = true", function () {return JMVC.object.compare(o3, o4); }, false);
			JMVC.test.testValue("compare(o4, o5) = true", function () {return JMVC.object.compare(o4, o5); }, false);
			JMVC.test.testValue("compare(o5, o6) = true", function () {return JMVC.object.compare(o5, o6); }, true);
			JMVC.test.testValue("compare(o6, o7) = true", function () {return JMVC.object.compare(o6, o7); }, false);
			JMVC.test.testValue("compare(o7, o8) = true", function () {return JMVC.object.compare(o7, o8); }, true);
			JMVC.test.testValue("compare(o8, o9) = true", function () {return JMVC.object.compare(o8, o9); }, false);
			JMVC.test.testValue("compare(o9, o10) = true", function () {return JMVC.object.compare(o9, o10); }, false);
			JMVC.test.testValue("compare(o10, o11) = true", function () {return JMVC.object.compare(o10, o11); }, true);
			JMVC.test.testValue("compare(o11, o12) = true", function () {return JMVC.object.compare(o11, o12); }, false);
			JMVC.test.testValue("compare(o12, o13) = true", function () {return JMVC.object.compare(o12, o13); }, false);

			JMVC.test.testValue("compare(o13, o14) = true", function () {return JMVC.object.compare(o13, o14); }, true);
			JMVC.test.testValue("compare(o14, o15) = true", function () {return JMVC.object.compare(o14, o15); }, false);
			JMVC.test.testValue("compare(o15, o16) = true", function () {return JMVC.object.compare(o15, o16); }, false);
			JMVC.test.testValue("compare(o16, o17) = true", function () {return JMVC.object.compare(o16, o17); }, true);
			JMVC.test.testValue("compare(o17, o18) = true", function () {return JMVC.object.compare(o17, o18); }, false);
			
			
			JMVC.test.testTime('JMVC.object.compare', JMVC.object.compare, 100, [o13, o14]);
			
			// -------------------		
			JMVC.test.finishAll();			
			
		});
	}
};
