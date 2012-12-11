JMVC.extend('scheduler',{
	'create' : function(){
		this.scheduler = { events : {}};
		var that = this;
		return {
			'add' : function(date, action, r){
				var dat = new Date(),
					sets = {
						's' : typeof date.s === 'number',
						'i' : typeof date.i === 'number',
						'h' : typeof date.h === 'number',
						'd' : typeof date.d === 'number',
						'm' : typeof date.m === 'number',
						'y' : typeof date.y === 'number',
						'every' : date.every
					},
					repeat = r,
					func = JMVC.util.isTypeOf(action, 'function') ? action : function () {alert('no function booked'); },
					millis_event_abs = 0,//milliseconds of the new event from epoch
					millis_now_abs = 0,//milliseconds of now from epoch
					millis_remaining = 0;// time remaining in milliseconds

				dat.setYear(sets.y ? date.y : dat.getFullYear());
				dat.setMonth(sets.m ? date.m - 1 : dat.getMonth());
				dat.setDate(sets.d ? date.d : dat.getDate());
				dat.setHours(sets.h ? date.h : dat.getHours());
				dat.setMinutes(sets.i ? date.i : dat.getMinutes() + 1);
				dat.setSeconds(sets.s ? date.s : dat.getSeconds());
				
				
				millis_event_abs = dat.getTime();//milliseconds of the new event from epoch
				millis_now_abs = new Date().getTime();//milliseconds of now from epoch
				millis_remaining = millis_event_abs - millis_now_abs;// time remaining in milliseconds

				
				if(millis_remaining < 0){
					alert('ERROR: it seems futile to book an event in the past!');
					return;
				}
				//JMVC.debug(sets.every);
				that.scheduler.events[millis_event_abs] = (sets.every) ? window.setInterval(function(){func(new Date());}, ~~(sets.every)) : window.setTimeout(function(){func(new Date());}, millis_remaining);
				return that;
			},
			'delall' : function(){},
			'getall' : function(){},
			'del': function(el){
				delete this.events[el];
			},
			'list' : function(){
				JMVC.log(this.events);
			},
			'get' : function(){
				return this.events;
			}
		};
	}
});