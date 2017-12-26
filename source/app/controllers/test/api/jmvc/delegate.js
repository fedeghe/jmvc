JMVC.controllers.delegate = function() {
	this.action_index = function(){
		
		JMVC.events.loadify(500);
		
		this.render(function test(){
			"use strict";
				
			JMVC.test.initialize(true);
			
			JMVC.test.startAll();


			JMVC.test.describe('Here some functions will be delegated to various object');

			JMVC.test.message('Delegation to an object literal');
			var o = {
					name : 'objectFoo',
					makes : 'noise'
				},
				f1 = function () {return 'is making ' + this.makes; },
				of1 = JMVC.delegate(f1, o);

			JMVC.test.code(`
				var o = {
					name : "objectFoo",
					makes : "noise"
				},
				f = function f(){return "making " + this.makes; },
				of1 = JMVC.delegate(f, o);
			`);

			JMVC.test.testValue("of();", function(){return of1();}, 'is making noise');




			JMVC.test.message('Delegation to an object built from a one time constructor');
			var Cnt = new function () {
					this.name = 'content';
					this.say = function () {return 'hello ' + this.name + ' here'; }
				},
				f2 = function (n) {this.name = n; },
				of2 = JMVC.delegate(f2, Cnt),
				changedName = of2('jmvc');

			JMVC.test.code(`var Cnt = new function () {
					this.name = "content";
					this.say = function () {return "hello " + this.name + " here"; };
				},
				f = function (n) {this.name = n;},
				of2 = JMVC.delegate(f, Cnt), 
				of2("jmvc");`);

			JMVC.test.testValue("Cnt.name;", function(){return Cnt.name; }, 'jmvc');
			
			JMVC.test.message('Now try to delegate a function to an array');
			var a = [0, 1, 2, 3, 4, 5, 6, 7],
				oa = JMVC.delegate(function () {return this.length; }, a);

			JMVC.test.code(`
				var a = [0, 1, 2, 3, 4, 5, 6, 7],
					oa = JMVC.delegate(function (){return this.length; }, a);
			`);

			JMVC.test.testValue("oa();", function(){return oa(); }, 8);
			


			JMVC.test.message('Now try to delegate a function to another function');
			var f = function foofunction () {return 10; },
				ofunc = JMVC.delegate(function () {return this.name; }, f),
				name = ofunc();


			JMVC.test.code(`
				var f = function foofunction () {return 10; },
					ofunc = JMVC.delegate(function (){return this.name; }, f),
					name = ofunc();
			`);

			JMVC.test.testValue("ofunc();", function(){return name; }, 'foofunction');



			JMVC.test.message('Now try to delegate a function to a constructor (factory method)');
			var fc = function Foofunction () {this.x = 10; },
				oc = JMVC.delegate(function () {return new this(); }, fc),
				factoryObject = oc();

			JMVC.test.code(`
				var fc = function Foofunction () {this.x = 10; },
					oc = JMVC.delegate(function () {return new this(); }, fc),
					factoryObject = oc();
			`);

			JMVC.test.testValue("factoryObject.x;", function(){return factoryObject.x; }, 10);

			JMVC.test.finishAll();			
			
		});
	}
};