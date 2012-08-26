/*
 *	TEST SUITE
 *	basedon the work of Angus Croll checking pros/cons of strict mode 
 *	http://javascriptweblog.wordpress.com/2011/05/03/javascript-strict-mode/
 *	
 *	thank You Angus!
 *	
 */

JMVC.extend('test', {
	
	vars : {
		HTML_MODE : 1,
		CONSOLE_MODE : 2,
		mode : 1,//HTML
		banner : false,
		currentTestWidget : false,
		testsPassed : 0,
		totalTests : 0,
		css_path : JMVC.vars.baseurl+ '/app/test/css',
		start_time : 0,
		end_time : 0,
		loopTimes :31
	},
	
	init : function(){
		JMVC.require('sniffer');
	},
	
	initialize : function(){
		JMVC.head.addstyle(JMVC.test.vars.css_path + '/style.css');
		JMVC.test.vars.banner = JMVC.dom.add(JMVC.dom.body(), 'div', {id : 'results'});
	},
	
	testException : function(testName, code, expectedError){
		'use strict';
		JMVC.test.startTest(testName);
		var res = true, i = 0;
		for(null;i<JMVC.test.vars.loopTimes; i++){
			try {
				expectedError == SyntaxError ? eval(code) : code();
				res = false;
			} catch (e) {
				res = (e instanceof expectedError) ;
			}
		}
		JMVC.test.finishTest(res);
	},
	
	testValue : function(testName, fn, expectedValue, options){
		'use strict';
		var res = true, i=0;
		options = options || {};
		JMVC.test.startTest(testName);
		for(null;i<JMVC.test.vars.loopTimes; i++){
			res = (fn.apply(options.ctx, options.args || []) === expectedValue);
		}
		JMVC.test.finishTest(res);
	},
	
	startTest : function(testName){
		
		if (JMVC.test.vars.mode == JMVC.test.vars.CONSOLE_MODE) {
			JMVC.debug("testing..." + testName);
		} else {
			JMVC.test.vars.currentTestWidget = JMVC.dom.add(JMVC.test.vars.banner, 'div', {id:'test_'+JMVC.test.vars.cur_timer}, testName);
		}
		JMVC.test.vars.start_time = +new Date;
	},
	
	finishTest : function(passed){
		JMVC.test.vars.end_time = +new Date;
		
		var time = ( (JMVC.test.vars.end_time - JMVC.test.vars.start_time)/JMVC.test.vars.loopTimes ).toFixed(5);
		
		
		JMVC.test.vars.totalTests++;
		passed && JMVC.test.vars.testsPassed++;
		var result = passed ? "passed" : "failed";
		if (JMVC.test.vars.mode == JMVC.test.vars.CONSOLE_MODE) {
			JMVC.debug(result +' in '+JMVC.test.vars.all_times[JMVC.test.vars.cur_timer]+' ms');
		} else {
			JMVC.dom.attr(JMVC.test.vars.currentTestWidget, 'class', result);
			JMVC.dom.add(JMVC.test.vars.currentTestWidget, 'strong', {'class':'time'}, time+' ms' );
		}
		JMVC.test.vars.cur_timer ++;
	},
	
	startAll : function(){
		
		if (JMVC.test.vars.mode == JMVC.test.vars.HTML_MODE) {
			JMVC.dom.add(
				JMVC.test.vars.banner,
				'div',
				{id:'bro'},
				(JMVC.sniffer && JMVC.sniffer.os.name !== 'undefined') ? 
					JMVC.sniffer.os.name+ ' : '+ JMVC.sniffer.browser.name +' v.'+JMVC.sniffer.browser.version
					:
					window.navigator.userAgent
			);
		}
	},
	
	finishAll : function(){
		var result = ["","(", JMVC.test.vars.testsPassed, "out of", JMVC.test.vars.totalTests, "tests passed", ")"].join(' '),
			wholeResClass = JMVC.test.vars.testsPassed < JMVC.test.vars.totalTests ? 'failed' : 'passed',
			wholeResString = 'Test '+wholeResClass;
		if (JMVC.test.vars.mode == JMVC.test.vars.HTML_MODE) {
			JMVC.dom.add(JMVC.test.vars.banner, 'div', {id:'summary'}, result);
			JMVC.dom.add(JMVC.test.vars.banner, 'div', {id:'globalResult','class':wholeResClass}, wholeResString);
			
		} else if (JMVC.test.vars.mode == JMVC.test.vars.CONSOLE_MODE) {
			JMVC.debug(result);
			JMVC.debug(wholeResString);
		}
	}
	
});


