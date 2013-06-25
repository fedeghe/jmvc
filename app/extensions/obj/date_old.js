JMVC.extend('date', {
	'vars' : {
		'DAYMS' : 1E5 * 36 * 24,
		'WEEKMS' : 1E5 * 36 * 24 * 7,
		'START' : 1,
		'START_ON_SUN' : true,
		'time_formats' : {
			'en-us' :{
				format : '%DD%, %MM% %D%, %YYYY% %H12% : %I% : %S% %APM%',
				days : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturnday'],
				months : ['January','February','March','April','May','June','July','August','September','October','November','December']
			}
		}
	},
	
	
	
	
	
	/**
	 * 
	 * 6012345 6012345 6012345
	 * ....... ....... .......
	 *  ###### #
	 *  
	 * #######     
	 *              
	 *      ## #####
	 * dlmmgvs dlmmgvs dlmmgvs dlmmgvs dlmmgvs dlmmgvs
	 * 
	 */
	//
	// http://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
	'day2week' : function (d) {
		//
		//
		"use strict";
		var thatD = (d !== undefined && d instanceof Date) ? d : new Date(),
			yearStart;
		
		if (JMVC.date.vars.START_ON_SUN) {
			thatD = new Date(thatD.getFullYear(), thatD.getMonth(), thatD.getDate() +1 );
		}

		thatD.setHours(0, 0, 0, 0);
		// Set to nearest Thursday: current date + 4 - current day number
		// Make Sunday's day number 7
		thatD.setDate(thatD.getDate() + 4 - (thatD.getDay() || 7));
		// Get first day of year
		yearStart = new Date(thatD.getFullYear(), 0, 1);
		// Calculate full weeks to nearest Thursday
		return Math.ceil((((thatD - yearStart) / JMVC.date.vars.DAYMS) + 1) / 7);
	},
	'week2range' : function (w, y) {
		var thatY = JMVC.date.tools.ensureYear(y),
			from,
			to,
			week_start = JMVC.date.vars.START_ON_SUN ? 0 : 1,

			//get the first thrusday .... http://en.wikipedia.org/wiki/ISO_week_date#First_week .... ISO 8601
			jan1 = new Date(thatY, 0, 1, 0),
			djan1 = jan1.getDay(),
			tmp = 1 + 4 - djan1,
			FirstThursday = tmp > 0 ? tmp : tmp + 7,
			from = JMVC.date.vars.START_ON_SUN ? -4 : -3,
			to = JMVC.date.vars.START_ON_SUN ? 2 : 3,
			//
			//ok FirstThursday
			//now get bounds, now add (w-1)*this.vars.WEEKMS
			tmp = new Date(new Date(thatY, 0, FirstThursday + (w-1)*7, 0));// + (w-1) * this.vars.WEEKMS);
		tmp.setHours(0, 0, 0, 0);
		//
		return {
			'from' : new Date(tmp.getFullYear(), tmp.getMonth(), tmp.getDate() + from, 0, 0, 0, 0),
			'to' : new Date(tmp.getFullYear(), tmp.getMonth(), tmp.getDate() + to , 0, 0, 0, 0)
		};
	},
	'weekInYear' : function (y) {
		var thatY = JMVC.date.tools.ensureYear(y);
		
		var jan1 = new Date(thatY, 0, 1, 0),
			djan1 = jan1.getDay(),
			tmp = 1 + 4 - djan1,
			FirstThursday = tmp > 0 ? tmp : tmp + 7;
		//the 4th of january is always on the first,
		// so the 28 or december is always on the last week
		return this.day2week(new Date(new Date(thatY, 0, FirstThursday -7, 0)));
	},
	/**
	 *
	 */
	'distance' : function (d1, d2, u) {
		var t1 = (d1 instanceof Date) ? d1 : d1 instanceof Array ? new Date(d1[0], d1[1], d1[2]) : new Date(),
			t2 = (d2 instanceof Date) ? d2 : d2 instanceof Array ? new Date(d2[0], d2[1], d2[2]) : new Date(),
			unit = JMVC.util.isSet(u) ? 10 : this.vars.DAYMS;
		t1.setHours(0, 0, 0, 0);
		t2.setHours(0, 0, 0, 0);
		return ~~((t2  - t1) / this.vars.DAYMS);			
	},
	//
	'tools' : {
		'ensureYear' : function (y) {
			return (y !== undefined && /^\d{4}$/.test(y) ) ? y : (new Date()).getFullYear();
		},
		'checkDate' : function (y, m, d) {
			var r = new Date(y, m, d);
			return !(r.getDate() - d + r.getMonth() - m + r.getFullYear() - y); 
		},
		'isLeap' : function (y) {
			return new Date(y, 1, 29).getMonth() === 1;
		},
		'nextDay' : function (d0, day, mult) {
			
			var d = d0 instanceof Date ? d0 : new Date(),
				m = mult != undefined ? mult : 0, 
				ggw = d.getDay(),
				dd = d.getDate(),
				tmp = dd - ggw + day - 7 * m,
				r = tmp > dd ? tmp : tmp + 7;
			return new Date(d.getFullYear(), d.getMonth(), r);
			
		},
		'prevDay' : function (d0, day, mult) {
			
			var d = d0 instanceof Date ? d0 : new Date(),
				m = mult != undefined ? mult : 0,
				ggw = d.getDay(),
				dd = d.getDate(),
				tmp = dd - ggw + day - 7 * m,
				r = tmp < dd ? tmp : tmp - 7;
			return new Date(d.getFullYear(), d.getMonth(), r);
		},
		// JMVC.date.tools.prevDay(new Date(2012,8,20), 1, 1878)
		'format' : function (dt, f) {
			
			var l = JMVC.date.vars.time_formats['en-us'],
				d = dt instanceof Date ? dt : new Date(),
				format = f || "%YYYY%.%M2%.%D2% %H24%:%I%:%S%",
				h = d.getHours(),
				H12 = (h > 12) ? h-12 : h,
				APM = (h > 12) ? 'PM':'AM',
				H24 = h,
				I = d.getMinutes(),
				S = d.getSeconds(),
				D = d.getDate(),
				M = d.getMonth() + 1,
				D2 = D > 9 ? D : '0' + D,
				M2 = M > 9 ? M : '0' + M,
				YYYY = d.getFullYear(),
				YY = (YYYY + '').substr(1),
				DD = l.days[d.getDay()],
				MM = l.months[M - 1];		
			return  JMVC.util.replaceall(format, {APM:APM,H12:H12,H24:H24, I:I, S:S, YY:YY, YYYY:YYYY, M:M, D:D, M2:M2, D2:D2, MM:MM, DD:DD}, '%', '%');
		}

	}
	
	
});
