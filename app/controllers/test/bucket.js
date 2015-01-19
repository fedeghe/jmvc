JMVC.controllers.bucket = function () {

	this.action_index = function () {
		JMVC.require('core/obj/bucket/bucket');
		
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


			var refill1 = JMVC.util.rand(5, 10);
			JMVC.test.message('fill it again with ' + refill1 + ' elements a0, ... a9');
			inArr.splice(0, inArr.length);

			
			for (var i = 0, l = refill1; i < l; i += 1){
				inArr.push('a' + i);
			}
			a.fill(inArr);
			JMVC.test.testValue('Bucket has ' + refill1 + ' elements', function () {return a.size(); }, refill1);

			JMVC.test.message('create another b0, ... b19, merge`em and shuffle');

			
			var b = new JMVC.bucket.create(),
				refill2 = JMVC.util.rand(10, 100);

			inArr.splice(0, inArr.length);	
			for (var i = 0, l = refill2; i < l; i += 1){
				inArr.push('b' + i);
			}

			b.fill(inArr);

			JMVC.test.message(b.show());
			JMVC.test.testValue('New bucket has ' + refill2 + ' elements', function () {return b.size(); }, refill2);
			JMVC.test.message('Let`s merge`em');
			a.merge(b);
			a.shuffle(102);
			JMVC.test.testValue('Merged bucket has ' + (refill1 + refill2) + ' elements', function () {return a.size(); }, refill1 + refill2);
			JMVC.test.message(a.show());

			
			//JMVC.test.finishAll(test);
			JMVC.test.finishAll();
		});
	}
	
};
