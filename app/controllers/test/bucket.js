JMVC.controllers.bucket = function() {

	this.index = function(){
		JMVC.require('obj/bucket');
		
		var b = new JMVC.bucket.create();
		
		this.render(false,function test(){
			"use strict";
			
			JMVC.test.initialize(true);
			
			JMVC.test.startAll();
			
			
			JMVC.test.testValue("Bucket is empty", function(){return b.size();}, 0);
			//
			//
			var inArr = [];
			for (var i = 0, l = 100; i < l; i += 1){
				inArr.push('e'+i);
			}
			JMVC.test.message('fill with 100 elements e0, e1, ... e99');
			b.fill(inArr);
			//
			//
			JMVC.test.testValue("Bucket has 100 elements", function(){return b.size();}, 100);

			b.next();
			JMVC.test.message('one element out');
			//
			//
			JMVC.test.testValue("Bucket has 99 elements", function(){return b.size();}, 99);
			JMVC.test.testValue("Bucket has more elements", function(){return !!b.hasMore();}, true);
			
			b.empty();
			JMVC.test.message('wipe out all');
			
			JMVC.test.testValue("Bucket is empty", function(){return !!b.hasMore();}, false);
			
			
			
			JMVC.test.finishAll(test);			
			
		});
	}
	
};
