JMVC.controllers.deque = function() {

	this.index = function(){
		'use strict';
		
		JMVC.require('obj/deque','test');
		
		var d1 = new JMVC.deque.create(),
			d2 = new JMVC.deque.create();
		
		this.render(false,function test(){
			
			JMVC.test.initialize(true);
			
			JMVC.test.startAll();
			
			JMVC.test.testValue("Deque is empty", function(){return d1.size();}, 0);
			//
			//
			for (var i = 0, l = 100; i < l; i += 1){
				d1.insertLast({o:'element' + i});
			}
			
			JMVC.test.message('fill with 100 elements , from  {o:"element0"} to {o:"element99"}');
			
			JMVC.test.testValue("Deque has 100 elements", function(){return d1.size();}, 100);
			
			JMVC.test.message('checking bounds');
			
			//JMVC.test.testAssertion("First element contains 'element0'", d1.first()['o']=='element0');
			JMVC.test.testValue("First element contains 'element0'", function(){return d1.first()['o'];}, 'element0');
			JMVC.test.testValue("Last element contains 'element99'", function(){return d1.last()['o'];}, 'element99');
			JMVC.test.message('removing bounds and check size');
			d1.removeFirst();
			d1.removeLast();
			
			JMVC.test.testValue("Deque has 98 elements", function(){return d1.size();}, 98);
			
			JMVC.test.message('checking bounds again');
			JMVC.test.testValue("First element contains 'element1'", function(){return d1.first()['o'];}, 'element1');
			JMVC.test.testValue("Last element contains 'element98'", function(){return d1.last()['o'];}, 'element98');
			
			
			JMVC.test.message('removing last 50 elements');
			var t = 50;
			while(t--){d1.removeLast();}
			
			JMVC.test.testValue("Deque has 48 elements", function(){return d1.size();}, 48);
			JMVC.test.message('the first remains "element1"');
			
			JMVC.test.testValue("First element contains 'element1'", function(){return d1.first()['o'];}, 'element1');
			JMVC.test.message('the last becomes "element48"');
			JMVC.test.testValue("First element contains 'element48'", function(){return d1.last()['o'];}, 'element48');
			
			
			
			JMVC.test.finishAll(test);		
			
		});
	}
	
};
