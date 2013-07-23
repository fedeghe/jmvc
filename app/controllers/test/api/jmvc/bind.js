JMVC.controllers.bind = function() {
	this.action_index = function(){
		
		JMVC.events.loadify(1000);
		
		this.render(function test(){
			"use strict";
				
			JMVC.test.initialize(true);
			
			JMVC.test.startAll();



			var o = {
					name : 'objectFoo',
					makes : 'noise'
				},
				f = function () {return 'is making ' + this.makes; },
				of = JMVC.bind(f, o);


			
			
			JMVC.test.describe('Simple test: an object <i>o</i> is binded with a function, and ');
			JMVC.test.code('var o = {name : "objectFoo", makes : "noise"},\n'+
				'    f = function f(){return "making " + this.makes; },\n'+
				'    of = JMVC.bind(f, o);');
			JMVC.test.testValue("of();", function(){return of();}, 'is making noise');
			
			
			
			JMVC.test.finishAll();			
			
		});
	}
};