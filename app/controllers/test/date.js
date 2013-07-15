JMVC.require('obj/date');
		
JMVC.controllers.date = function() {
	this.action_i = function(){
		JMVC.date.week2range(1,2009);
	};
	
	this.action_sunday = function(){
		this.index(true);
	}
	this.action_monday =  function(){
		this.index(false);
	}
	
	this.action_index = function(sunday){
		sunday = !!sunday;
		this.render(false,function test(){
			"use strict";
			
			JMVC.test.initialize(true);
			JMVC.test.startAll();
			
			JMVC.events.loadify(1000);
			
			var //now = new Date(),
				y = 2012,//now.getFullYear();
				trg = !!sunday ? 'monday' : 'sunday';
			//set date extension to consider a special day to start the week tested correcty for 0 and 1
			JMVC.date.setStart(~~(!!!sunday));
			
			
			JMVC.test.describe('The test is done telling the date extension to consider <u>'+JMVC.date.vars.time_formats['en-us'].days[~~!!JMVC.date.vars.START]+'</u>'+
				' as the first day of the week.'+'<br/>'+
				'Test with <a href="'+JMVC.vars.baseurl+'/test_date/'+trg+'">'+trg+'</a> as first day');
			
			
			JMVC.test.message('sat');
			JMVC.test.testValue("31 Dec "+(y-1)+ ' is in the week '+52, function(){return JMVC.date.day2week(new Date(y-1,11,31));}, 52);
			
			
			
			JMVC.test.message('sun');
			JMVC.test.testValue("1 Jan "+y+ ' is in the week '+(sunday?1:52), function(){return JMVC.date.day2week(new Date(y,0,1));}, sunday?1:52);
			
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
			JMVC.test.testValue("8 Jan "+y+ ' is in the week '+(sunday?2:1), function(){return JMVC.date.day2week(new Date(y,0,8));}, sunday?2:1);
			
			JMVC.test.message('mon');
			JMVC.test.testValue("9 Jan "+y+ ' is in the week '+2, function(){return JMVC.date.day2week(new Date(y,0,9));}, 2);
			
			JMVC.test.message('tue');
			JMVC.test.testValue("10 Jan "+y+ ' is in the week '+2, function(){return JMVC.date.day2week(new Date(y,0,10));}, 2);
			
			JMVC.test.describe('Now test the end of the year');
			
			JMVC.test.message('fri');
			JMVC.test.testValue("28 Dec "+y+ ' is in the week ' + 52, function(){return JMVC.date.day2week(new Date(y,11,28));}, 52);
			JMVC.test.message('sat');
			JMVC.test.testValue("29 Dec "+y+ ' is in the week '+52, function(){return JMVC.date.day2week(new Date(y,11,29));}, 52);
			JMVC.test.message('sun');
			JMVC.test.testValue("30 Dec "+y+ ' is in the week '+( sunday?1:52), function(){return JMVC.date.day2week(new Date(y,11,30));}, sunday?1:52);
			
			JMVC.test.message('mon');
			JMVC.test.testValue("31 Dec "+y+ ' is in the week '+1, function(){return JMVC.date.day2week(new Date(y,11,31));}, 1);
			JMVC.test.message('tue');
			JMVC.test.testValue("1 Jan "+(y+1)+ ' is in the week '+1, function(){return JMVC.date.day2week(new Date(y+1,0,1));}, 1);
			JMVC.test.message('wed');
			JMVC.test.testValue("2 Jan "+(y+1)+ ' is in the week '+1, function(){return JMVC.date.day2week(new Date(y+1,0,2));}, 1);
			
			
			
			
			
			// JMVC.date.setStart(4);
			var res = sunday ?
				/*sun*/{"1980":53,"1981":52,"1982":52,"1983":52,"1984":52,"1985":52,"1986":53,"1987":52,"1988":52,"1989":52,"1990":52,"1991":52,"1992":53,"1993":52,"1994":52,"1995":52,"1996":52,"1997":53,"1998":52,"1999":52,"2000":52,"2001":52,"2002":52,"2003":53,"2004":52,"2005":52,"2006":52,"2007":52,"2008":53,"2009":52,"2010":52,"2011":52,"2012":52,"2013":52,"2014":53,"2015":52,"2016":52,"2017":52,"2018":52,"2019":52,"2020":53,"2021":52,"2022":52,"2023":52,"2024":52,"2025":53,"2026":52,"2027":52,"2028":52,"2029":52,"2030":52,"2031":53,"2032":52,"2033":52,"2034":52,"2035":52,"2036":53,"2037":52,"2038":52,"2039":52,"2040":52,"2041":52,"2042":53,"2043":52,"2044":52,"2045":52,"2046":52,"2047":52,"2048":53,"2049":52,"2050":52,"2051":52,"2052":52,"2053":53,"2054":52,"2055":52,"2056":52,"2057":52,"2058":52,"2059":53,"2060":52,"2061":52,"2062":52,"2063":52,"2064":53,"2065":52,"2066":52,"2067":52,"2068":52,"2069":52,"2070":53,"2071":52,"2072":52,"2073":52,"2074":52,"2075":52,"2076":53,"2077":52,"2078":52,"2079":52,"2080":52}
				:
				/*mon*/{"1980":52,"1981":53,"1982":52,"1983":52,"1984":52,"1985":52,"1986":52,"1987":53,"1988":52,"1989":52,"1990":52,"1991":52,"1992":53,"1993":52,"1994":52,"1995":52,"1996":52,"1997":52,"1998":53,"1999":52,"2000":52,"2001":52,"2002":52,"2003":52,"2004":53,"2005":52,"2006":52,"2007":52,"2008":52,"2009":53,"2010":52,"2011":52,"2012":52,"2013":52,"2014":52,"2015":53,"2016":52,"2017":52,"2018":52,"2019":52,"2020":53,"2021":52,"2022":52,"2023":52,"2024":52,"2025":52,"2026":53,"2027":52,"2028":52,"2029":52,"2030":52,"2031":52,"2032":53,"2033":52,"2034":52,"2035":52,"2036":52,"2037":53,"2038":52,"2039":52,"2040":52,"2041":52,"2042":52,"2043":53,"2044":52,"2045":52,"2046":52,"2047":52,"2048":53,"2049":52,"2050":52,"2051":52,"2052":52,"2053":52,"2054":53,"2055":52,"2056":52,"2057":52,"2058":52,"2059":52,"2060":53,"2061":52,"2062":52,"2063":52,"2064":52,"2065":53,"2066":52,"2067":52,"2068":52,"2069":52,"2070":52,"2071":53,"2072":52,"2073":52,"2074":52,"2075":52,"2076":53,"2077":52,"2078":52,"2079":52,"2080":52}
				;
			JMVC.test.describe('weekInYear');
			JMVC.test.code('var res = ['+JSON.stringify(res)+'];');
			var ok =0,
				nok = 0;
			for(var i in res){
				var z = JMVC.date.weekInYear(i);
				if(z !== res[i]){
					nok++;
				}else{
					ok++;
				}
			}
			JMVC.test.testValue("Correct # of week in years tested in [1980, 2080]", function(){return ok;}, 101);
			
			
			
			
			
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


	this.action_day2week = function(){
		
		
		this.render(false,function test(){
			"use strict";
			
			JMVC.events.loadify(500);
			
			JMVC.test.initialize(true);
			
			JMVC.test.startAll();
			
			
			
			
			
			
			
			
			JMVC.date.vars.START_ON_SUN = false;
			
			
			
			
			
			
			
			var ret = true;
ret &= (JMVC.date.day2week(new Date(2012,0,1)) === 1 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,2)) === 1 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,3)) === 1 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,4)) === 1 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,5)) === 1 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,6)) === 1 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,7)) === 1 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,8)) === 2 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,9)) === 2 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,10)) === 2 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,11)) === 2 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,12)) === 2 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,13)) === 2 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,14)) === 2 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,15)) === 3 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,16)) === 3 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,17)) === 3 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,18)) === 3 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,19)) === 3 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,20)) === 3 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,21)) === 3 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,22)) === 4 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,23)) === 4 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,24)) === 4 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,25)) === 4 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,26)) === 4 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,27)) === 4 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,28)) === 4 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,29)) === 5 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,30)) === 5 ) ;
ret &= (JMVC.date.day2week(new Date(2012,0,31)) === 5 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,1)) === 5 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,2)) === 5 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,3)) === 5 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,4)) === 5 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,5)) === 6 ) ;



			JMVC.test.testValue("day2week is php compatible", function(){return ret;}, 1);
			
ret &= (JMVC.date.day2week(new Date(2012,1,1)) === 5 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,2)) === 5 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,3)) === 5 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,4)) === 5 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,5)) === 6 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,6)) === 6 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,7)) === 6 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,8)) === 6 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,9)) === 6 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,10)) === 6 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,11)) === 6 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,12)) === 7 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,13)) === 7 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,14)) === 7 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,15)) === 7 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,16)) === 7 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,17)) === 7 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,18)) === 7 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,19)) === 8 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,20)) === 8 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,21)) === 8 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,22)) === 8 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,23)) === 8 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,24)) === 8 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,25)) === 8 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,26)) === 9 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,27)) === 9 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,28)) === 9 ) ;
ret &= (JMVC.date.day2week(new Date(2012,1,29)) === 9 ) ;
ret &= (JMVC.date.day2week(new Date(2012,2,1)) === 9 ) ;
ret &= (JMVC.date.day2week(new Date(2012,2,2)) === 9 ) ;
ret &= (JMVC.date.day2week(new Date(2012,2,3)) === 9 ) ;
ret &= (JMVC.date.day2week(new Date(2012,2,4)) === 10 ) ;
ret &= (JMVC.date.day2week(new Date(2012,2,5)) === 10 ) ;
ret &= (JMVC.date.day2week(new Date(2012,2,6)) === 10 ) ;
ret &= (JMVC.date.day2week(new Date(2012,2,7)) === 10 ) ;



			JMVC.test.testValue("day2week is php compatible", function(){return ret;}, 1);


			
ret &= (JMVC.date.day2week(new Date(2012,11,1)) === 48 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,2)) === 49 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,3)) === 49 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,4)) === 49 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,5)) === 49 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,6)) === 49 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,7)) === 49 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,8)) === 49 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,9)) === 50 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,10)) === 50 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,11)) === 50 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,12)) === 50 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,13)) === 50 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,14)) === 50 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,15)) === 50 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,16)) === 51 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,17)) === 51 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,18)) === 51 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,19)) === 51 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,20)) === 51 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,21)) === 51 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,22)) === 51 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,23)) === 52 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,24)) === 52 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,25)) === 52 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,26)) === 52 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,27)) === 52 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,28)) === 52 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,29)) === 52 ) ;
ret &= (JMVC.date.day2week(new Date(2012,11,30)) === 1 ) ;
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
