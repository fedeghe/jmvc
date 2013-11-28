JMVC.controllers.bucket = function () {

	this.action_index = function () {
		JMVC.require('core/obj/bucket');
		
		var a = new JMVC.bucket.create();
		
		this.render(false, function test() {
			"use strict";

			var howmany = 1E3;
			
			JMVC.test.initialize(true);
			
			JMVC.test.startAll();
			
			JMVC.test.testValue('Bucket is empty', function () {return a.size(); }, 0);
			//
			//
			var inArr = [];
			for (var i = 0, l = howmany; i < l; i += 1){
				inArr.push('a' + i);
			}
			JMVC.test.message('fill with ' + howmany + ' elements a0, a1, ... a' + (howmany - 1));
			a.fill(inArr);
			//
			a.shuffle(10);
			//
			JMVC.test.testValue('Bucket has ' + howmany + ' elements', function () {return a.size(); }, howmany);

			a.next();
			JMVC.test.message('one element out');
			//
			//
			JMVC.test.testValue('Bucket has ' + (howmany - 1) + ' elements', function () {return a.size(); }, howmany - 1);


			var oldsize = a.size(),
				hmout = JMVC.util.rand(10, oldsize-10);
			
			JMVC.test.message(hmout + ' elements out');
			for (var i = 0; i < hmout; i++) {
				a.next();
			}

			JMVC.test.testValue('Bucket has ' + (oldsize-hmout) + ' elements', function () {return a.size(); }, oldsize - hmout);


			JMVC.test.testValue('Bucket has more elements', function () {return !!a.hasMore(); }, true);
			
			a.empty();
			JMVC.test.message('after wiping out all');
			
			JMVC.test.testValue('Bucket is empty', function () {return !!a.hasMore(); }, false);

			JMVC.test.message('fill it again with 10 elements a0, ... a9');
			inArr.splice(0, inArr.length);

			for (var i = 0, l = 10; i < l; i += 1){
				inArr.push('a' + i);
			}
			a.fill(inArr);
			JMVC.test.message(a.show());	
			JMVC.test.message('create another b0, ... b19, merge`em and shuffle');
			var b = new JMVC.bucket.create();
			inArr.splice(0, inArr.length);	
			for (var i = 0, l = 20; i < l; i += 1){
				inArr.push('b' + i);
			}

			b.fill(inArr);

			a.merge(b);
			a.shuffle(102);
			JMVC.test.message(a.show());

			
			//JMVC.test.finishAll(test);
			JMVC.test.finishAll();
		});
	}
	
};
