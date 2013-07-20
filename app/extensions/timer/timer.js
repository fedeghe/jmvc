JMVC.extend('timer',{
	
	'create' : function(options){
		
		var time_formats = {
			'en-us' :{
				'format' : '%DD%, %MM% %D%, %YYYY% %H12% : %I% : %S% %APM%',
				'days' : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturnday'],
				'months' : ['January','February','March','April','May','June','July','August','September','October','November','December']
			},
			'it' :{
				'format' : '%DD%, %D% %MM% %YYYY% %H24% : %I% : %S%',
				//format : '%H24% : %I% : %S% ~ %D% / %M% / %YY% %DD% %MM%',
				'days' : ['Domenica','Lunedí','Martedí','Mercoledí','Giovedí','Venerdí','Sabato'],
				'months' : ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'] 
			}
		};
		
		this.target = options.target;
		this.lang = options.lang || 'it';
		this.l = time_formats[this.lang];
		this.format = options.format ||  "%H24% : %I% : %S%"; 
		var self = this;
		function updateTime(){
			window.setTimeout(function(){
				init();
			}, 1000);
		};

		function getTime(){
			var d = new Date(),
				h = d.getHours(),
				H12 = (h > 12) ? h-12 : h,
				APM = (h > 12) ? 'PM':'AM',
				H24 = d.getHours(),
				I = d.getMinutes(),
				S = d.getSeconds(),
				D = d.getDate(),
				M = d.getMonth()+1,
				YYYY = d.getFullYear(),
				YY = (d.getFullYear()+'').substr(1),
				DD = self.l.days[d.getDay()],
				MM = self.l.months[M-1];

			return JMVC.string.replaceall(self.format, {APM:APM,H12:H12,H24:H24, I:I, S:S, YY:YY, YYYY:YYYY, M:M, D:D, MM:MM, DD:DD});
		};
		function init(){
			JMVC.dom.html(self.target, getTime());
			updateTime();
		} 
		init();
		return self;
	}
});

