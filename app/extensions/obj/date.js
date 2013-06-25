JMVC.extend('date', {
	'init' : function(){
		JMVC.date.vars.END = (JMVC.date.vars.START + 6 ) % 7;
	},
	'vars' : {
		'DAYMS' : 1E5 * 36 * 24,
		'WEEKMS' : 1E5 * 36 * 24 * 7,
		'START' : 0,
		'END' : 0,
		'START_ON_SUN' : true,
		'DAYMAP' : [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturnday'
		],
		'time_formats' : {
			'en-us' :{
				format : '%DD%, %MM% %D%, %YYYY% %H12% : %I% : %S% %APM%',
				days : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturnday'],
				months : ['January','February','March','April','May','June','July','August','September','October','November','December']
			}
		}
	},
	'setStart' : function(d){
		JMVC.date.vars.START = d;
		JMVC.date.vars.END = (JMVC.date.vars.START + 6 ) % 7;
	},
	
	/*
	 * Given a date returns the belonging week bounds,
	 * standing on START and END of the week settings
	 */
	'weekBounds' : function (date) {
		var thatD = JMVC.date.tools.ensureDate(date),
			b1 = 0,
			b2 = 0,
			y = thatD.getFullYear(),
			m = thatD.getMonth(),
			d = thatD.getDate(),
			wd1 = thatD.getDay(),
			wd2 = wd1;
		while(wd1 != JMVC.date.vars.START){
			b1--;
			wd1 = (wd1 - 1 + 7) % 7;
		}
		while(wd2 != JMVC.date.vars.END){
			b2++;
			wd2 = (wd2 + 1 + 7) % 7;
		}
		return {
			'from' : new Date(y, m, d+b1, 0, 0, 0, 0),
			'to' : new Date(y, m, d+b2, 0, 0, 0, 0)
		}
	},
	
	/* 
	 * The 4th of each Year is always on the first week (ISO-8601)
	 */
	'firstW' : function (y) {	
		var referenceDay = new Date(y, 0, 4, 0, 0, 0, 0);
		return JMVC.date.weekBounds(referenceDay);	
	},
	
	'lastW' : function (y) {
		var referenceDay = new Date(y, 11, 28, 1, 0, 0, 0);
		return JMVC.date.weekBounds(referenceDay);		
	},
	
	'day2week' : function (date) {
		var thatD = JMVC.date.tools.ensureDate(date),
			thatY = thatD.getFullYear(),
			firstWeek = JMVC.date.firstW(thatY),
			firstWeekFirstDay = firstWeek.from,
			weeksInPrevYear = JMVC.date.weekInYear(thatY-1),
															//security bound hack +10 ms
			mayret = Math.ceil((thatD - firstWeekFirstDay +10 )/JMVC.date.vars.WEEKMS);
			
		if(thatD < firstWeekFirstDay){
			//console.debug('z')
			return weeksInPrevYear;
		}
		return (mayret > weeksInPrevYear) ? 1 : mayret;
	},
	
	
	'week2range' : function (w, Ny) {
		var thatW = w || 1,
			thatY = JMVC.date.tools.ensureYear(Ny),
			firstDayFirstWeek = JMVC.date.firstW(thatY).from,
			y = firstDayFirstWeek.getFullYear(),
			m = firstDayFirstWeek.getMonth(),
			d = firstDayFirstWeek.getDate();
		return JMVC.date.weekBounds(new Date(y, m, d + 7 * (thatW - 1), 0, 0, 0, 0));
	},
	
	
	'weekInYear' : function (y) {
		var firstDay = new Date(y, 0, 4, 0, 0, 0, 0),
			lastDay = new Date(y, 11, 28, 1, 0, 0, 0),
			firstBounds = JMVC.date.weekBounds(firstDay),
			lastBounds = JMVC.date.weekBounds(lastDay);
			
		//console.debug(lastBounds.to - firstBounds.from);
		return Math.ceil((lastBounds.to - firstBounds.from) / JMVC.date.vars.WEEKMS);
	},
	'distance' : function (d1, d2, u) {
		var t1 = (d1 instanceof Date) ? d1 : d1 instanceof Array ? new Date(d1[0], d1[1], d1[2]) : new Date(),
			t2 = (d2 instanceof Date) ? d2 : d2 instanceof Array ? new Date(d2[0], d2[1], d2[2]) : new Date(),
			unit = NYATT.util.isSet(u) ? 10 : this.vars.DAYMS;
		t1.setHours(0, 0, 0, 0);
		t2.setHours(0, 0, 0, 0);
		return ~~((t2  - t1) / this.vars.DAYMS);			
	},
	
	'tools' : {
		'ensureYear' : function (y) {
			return (y !== undefined && /^\d{4}$/.test(y) ) ? y : (new Date()).getFullYear();
		},
		'ensureDate' : function(date){
			return (date !== undefined && date instanceof Date) ? date : new Date();
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