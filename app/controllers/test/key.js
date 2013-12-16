JMVC.require('key/key');
		
JMVC.controllers.key = function() {
	
	this.action_index = function(s){
		this.render(false,function test(){
			"use strict";
			
			JMVC.test.initialize(true);
			JMVC.test.startAll();
			//JMVC.test.describe('<time datetime="2012-09-20">2012-09-20</time>');
			
			JMVC.test.finishAll();
		});
	};
	
};
