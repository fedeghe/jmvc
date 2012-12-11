JMVC.require('obj/date','test');
		
JMVC.controllers.date = function() {
	this.i = function(){
		JMVC.date.week2range(1,2009);
	};
	
	this.sunday = function(){
		this.index(true);
	}
	this.monday =  function(){
		this.index();
	}
	
	this.index = function(s){
		this.render(false,function test(){
			"use strict";
			
			JMVC.test.initialize(true);
			JMVC.test.startAll();
			
			JMVC.events.loadify(1000);
			
			var //now = new Date(),
				y = 2012,//now.getFullYear();
				trg = s ? 'monday' : 'sunday';
			//set date extension to consider a special day to start the week tested correcty for 0 and 1
			JMVC.date.vars.START_ON_SUN = !!s;
			
			
			JMVC.test.describe('The test is done telling the date extension to consider <u>'+JMVC.date.vars.time_formats['en-us'].days[~~!JMVC.date.vars.START_ON_SUN]+'</u>'+
				' as the first day of the week.'+'<br/>'+
				'Test with <a href="'+JMVC.vars.baseurl+'/test_date/'+trg+'">'+trg+'</a> as first day');
			
			
			
			
			
			JMVC.test.message('sun');
			JMVC.test.testValue("1 Jan "+y+ ' is in the week '+(s?1:52), function(){return JMVC.date.day2week(new Date(y,0,1));}, s?1:52);
			
			JMVC.test.message('mon');
			JMVC.test.testValue("2 Jan "+y+ ' is in the week '+1, function(){return JMVC.date.day2week(new Date(y,0,2));}, 1);
			
			JMVC.test.message('tue');
			JMVC.test.testValue("3 Jan "+y+ ' is in the week '+1, function(){return JMVC.date.day2week(new Date(y,0,3));}, 1);
			
			JMVC.test.message('wed');
			JMVC.test.testValue("4 Jan "+y+ ' is in the week '+1, function(){return JMVC.date.day2week(new Date(y,0,4));}, 1);
			
			JMVC.test.message('thu');
			JMVC.test.testValue("5 Jan "+y+ ' is in the week '+1, function(){return JMVC.date.day2week(new Date(y,0,5));}, 1);
			
			JMVC.test.message('fri');
			JMVC.test.testValue("6 Jan "+y+ ' is in the week '+1, function(){return JMVC.date.day2week(new Date(y,0,6));}, 1);
			
			JMVC.test.message('sat');
			JMVC.test.testValue("7 Jan "+y+ ' is in the week '+1, function(){return JMVC.date.day2week(new Date(y,0,7));}, 1);
			
			JMVC.test.message('sun');
			JMVC.test.testValue("8 Jan "+y+ ' is in the week '+(s?2:1), function(){return JMVC.date.day2week(new Date(y,0,8));}, s?2:1);
			
			JMVC.test.message('mon');
			JMVC.test.testValue("9 Jan "+y+ ' is in the week '+2, function(){return JMVC.date.day2week(new Date(y,0,9));}, 2);
			
			JMVC.test.describe('Now test the end of the year');
			
			JMVC.test.message('fri');
			JMVC.test.testValue("28 Dec "+y+ ' is in the week ' + 52, function(){return JMVC.date.day2week(new Date(y,11,28));}, 52);
			JMVC.test.message('sat');
			JMVC.test.testValue("29 Dec "+y+ ' is in the week '+52, function(){return JMVC.date.day2week(new Date(y,11,29));}, 52);
			JMVC.test.message('sun');
			JMVC.test.testValue("30 Dec "+y+ ' is in the week '+(s?1:52), function(){return JMVC.date.day2week(new Date(y,11,30));}, s?1:52);
			JMVC.test.message('mon');
			JMVC.test.testValue("31 Dec "+y+ ' is in the week '+1, function(){return JMVC.date.day2week(new Date(y,11,31));}, 1);
			JMVC.test.message('tue');
			JMVC.test.testValue("1 Jan "+y+ ' is in the week '+1, function(){return JMVC.date.day2week(new Date(y+1,0,1));}, 1);
			JMVC.test.message('wed');
			JMVC.test.testValue("2 Jan "+y+ ' is in the week '+1, function(){return JMVC.date.day2week(new Date(y+1,0,2));}, 1);
			
			
			
			
			JMVC.test.message('check console!!!');
			
			
			var more = 100;
			
			console.debug('Range of the first week of '+ (y + more));
			console.dir(JMVC.date.week2range(1, y + more));
			
			console.debug('How many weeks in '+(y + more)+'?');
			var hmanyinyear = JMVC.date.weekInYear(y + more);
			console.debug('answer: '+hmanyinyear);
			console.debug('see it ');
			console.dir(JMVC.date.week2range(hmanyinyear, y + more));
			
			console.debug('The first one of '+(y+1 + more)+ ' is :');
			console.dir(JMVC.date.week2range(1, y+1 + more));
			
			
			JMVC.test.finishAll();
		});
	};


	this.day2week = function(){
		
		
		this.render(false,function test(){
			"use strict";
			
			JMVC.test.initialize(true);
			
			JMVC.test.startAll();
			
			
			
			
			
			
			
			
			JMVC.date.vars.START_ON_SUN = false;
			
			
			
			
			
			
			
			var ret = true;
ret &= (JMVC.date.day2week(new Date(2012,0,1)) === 52 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,2)) === 1 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,3)) === 1 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,4)) === 1 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,5)) === 1 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,6)) === 1 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,7)) === 1 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,8)) === 1 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,9)) === 2 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,10)) === 2 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,11)) === 2 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,12)) === 2 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,13)) === 2 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,14)) === 2 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,15)) === 2 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,16)) === 3 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,17)) === 3 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,18)) === 3 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,19)) === 3 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,20)) === 3 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,21)) === 3 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,22)) === 3 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,23)) === 4 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,24)) === 4 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,25)) === 4 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,26)) === 4 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,27)) === 4 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,28)) === 4 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,29)) === 4 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,30)) === 5 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,31)) === 5 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,1)) === 5 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,2)) === 5 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,3)) === 5 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,4)) === 5 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,5)) === 5 ) ;



			JMVC.test.testValue("day2week is php compatible", function(){return ret;}, 1);
			
ret &= (JMVC.date.day2week(new Date(2012,1,1)) === 5 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,2)) === 5 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,3)) === 5 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,4)) === 5 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,5)) === 5 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,6)) === 6 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,7)) === 6 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,8)) === 6 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,9)) === 6 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,10)) === 6 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,11)) === 6 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,12)) === 6 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,13)) === 7 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,14)) === 7 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,15)) === 7 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,16)) === 7 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,17)) === 7 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,18)) === 7 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,19)) === 7 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,20)) === 8 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,21)) === 8 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,22)) === 8 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,23)) === 8 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,24)) === 8 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,25)) === 8 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,26)) === 8 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,27)) === 9 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,28)) === 9 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,29)) === 9 ) ;
ret &= (JMVC.date.day2week(new Date(2012,2,1)) === 9 ) ;
ret &= (JMVC.date.day2week(new Date(2012,2,2)) === 9 ) ;
ret &= (JMVC.date.day2week(new Date(2012,2,3)) === 9 ) ;
ret &= (JMVC.date.day2week(new Date(2012,2,4)) === 9 ) ;
ret &= (JMVC.date.day2week(new Date(2012,2,5)) === 10 ) ;
ret &= (JMVC.date.day2week(new Date(2012,2,6)) === 10 ) ;
ret &= (JMVC.date.day2week(new Date(2012,2,7)) === 10 ) ;



			JMVC.test.testValue("day2week is php compatible", function(){return ret;}, 1);


			
ret &= (JMVC.date.day2week(new Date(2012,11,1)) === 48 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,2)) === 48 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,3)) === 49 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,4)) === 49 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,5)) === 49 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,6)) === 49 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,7)) === 49 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,8)) === 49 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,9)) === 49 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,10)) === 50 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,11)) === 50 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,12)) === 50 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,13)) === 50 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,14)) === 50 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,15)) === 50 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,16)) === 50 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,17)) === 51 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,18)) === 51 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,19)) === 51 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,20)) === 51 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,21)) === 51 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,22)) === 51 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,23)) === 51 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,24)) === 52 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,25)) === 52 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,26)) === 52 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,27)) === 52 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,28)) === 52 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,29)) === 52 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,30)) === 52 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,31)) === 1 ) ;
ret &= (JMVC.date.day2week(new Date(2013,0,1)) === 1 ) ;
ret &= (JMVC.date.day2week(new Date(2013,0,2)) === 1 ) ;
ret &= (JMVC.date.day2week(new Date(2013,0,3)) === 1 ) ;
ret &= (JMVC.date.day2week(new Date(2013,0,4)) === 1 ) ;
ret &= (JMVC.date.day2week(new Date(2013,0,5)) === 1 ) ;

		
			
			
			JMVC.test.testValue("day2week is php compatible", function(){return ret;}, 1);
			
			
			
			

			
			
			JMVC.test.finishAll();			
			
		});
	}
	
};
