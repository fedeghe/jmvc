JMVC.controllers.bucket = function () {

	this.action_index = function () {
		JMVC.require('core/obj/bucket');
		
		var b = new JMVC.bucket.create();
		
		this.render(false, function test() {
			"use strict";

			var howmany = 10E1;
			
			JMVC.test.initialize(true);
			
			JMVC.test.startAll();
			
			JMVC.test.testValue("Bucket is empty", function () {return b.size(); }, 0);
			//
			//
			var inArr = [];
			for (var i = 0, l = howmany; i < l; i += 1){
				inArr.push('e' + i);
			}
			JMVC.test.message('fill with ' + howmany + ' elements e0, e1, ... e' + (howmany - 1));
			b.fill(inArr);
			//
			b.shuffle(10);
			//
			JMVC.test.testValue("Bucket has ' + howmany + ' elements", function () {return b.size(); }, howmany);

			b.next();
			JMVC.test.message('one element out');
			//
			//
			JMVC.test.testValue("Bucket has ' + howmany + ' - 1 elements", function () {return b.size(); }, howmany - 1);
			JMVC.test.testValue("Bucket has more elements", function () {return !!b.hasMore(); }, true);
			
			b.empty();
			JMVC.test.message('wipe out all');
			
			JMVC.test.testValue("Bucket is empty", function () {return !!b.hasMore(); }, false);
			
			//JMVC.test.finishAll(test);
			JMVC.test.finishAll();
		});
	}
	
};
