JMVC.controllers.bind = function() {
	this.action_index = function(){
		
		JMVC.events.loadify(1000);
		
		this.render(function test(){
			"use strict";
				
			JMVC.test.initialize(true);
			
			JMVC.test.startAll();


			JMVC.test.describe('Various objects are binded with a function, and expected results are checked.');


			var o = {
					name : 'objectFoo',
					makes : 'noise'
				},
				f1 = function () {return 'is making ' + this.makes; },
				of1 = JMVC.bind(f1, o);

			JMVC.test.code('var o = {name : "objectFoo", makes : "noise"},\n'+
				'    f = function f(){return "making " + this.makes; },\n'+
				'    of1 = JMVC.bind(f, o);');
			JMVC.test.testValue("of();", function(){return of1();}, 'is making noise');





			var Cnt = new function () {
					this.name = 'content';
					this.say = function () {return 'hello ' + this.name + ' here'; }
				},
				f2 = function (n) {this.name = n; },
				of2 = JMVC.bind(f2, Cnt);

			JMVC.test.code('var Cnt = new function () {\n' +
				'        this.name = "content";\n' +
				'        this.say = function () {return "hello " + this.name + " here"; };\n' +
				'    },\n'+
				'    f = function (n) {this.name = n;}\n' +
				'    of2 = JMVC.bind(f, Cnt);');
			JMVC.test.testValue("of2('jmvc'); Cnt.name;", function(){of2('jmvc'); return Cnt.name; }, 'jmvc');
			


			var f3 = function (){ return this.vars;},
				of3 = JMVC.bind(f3);
			JMVC.test.code('var f = function () {return this.vars; },\n' +
				'    of3 = JMVC.bind(f); // no object, default JMVC' );
			JMVC.test.testValue("of3();", function(){return of3(); }, JMVC.vars);


			JMVC.test.message('Now try to bind a function to an array');
			var a = [0, 1, 2, 3, 4, 5, 6, 7],
				oa = JMVC.bind(function () {return this.length; }, a);
			JMVC.test.code('var a = [0, 1, 2, 3, 4, 5, 6, 7],\n' +
				'    oa = JMVC.bind(function (){return this.length; }, a);' );
			JMVC.test.testValue("oa();", function(){return oa(); }, 8);
			

			JMVC.test.message('Now try to bind a function to a function');
			var f = function foofunction () {return 10; },
				ofunc = JMVC.bind(function () {return this.name; }, f);
			JMVC.test.code('var f = function foofunction () {return 10; },\n' +
				'    ofunc = JMVC.bind(function (){return this.name; }, f);' );
			JMVC.test.testValue("ofunc();", function(){return ofunc(); }, 'foofunction');



			JMVC.test.message('Now try to bind a function to a constructor, in particular we try to get a factory_method for the object');
			var fc = function Foofunction () {this.x = 10; },
				oc = JMVC.bind(function () {return new this(); }, fc);
			JMVC.test.code('var fc = function Foofunction () {this.x = 10; },\n' +
				'    oc = JMVC.bind(function () {return new this(); }, f);\n'+
				'                                       // crazy !!!, but works' );
			JMVC.test.testValue("oc();", function(){return oc().x; }, 10);
			



			JMVC.test.finishAll();			
			
		});
	}
};