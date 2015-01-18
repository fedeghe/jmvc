JMVC.extend('timer',{
	
	create : function(options){
		
		var time_formats = {
				'en-us' :{
					'format' : '%DD%, %MM% %D%, %YYYY% %H12% : %I% : %S% %APM%',
					'days' : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
					'months' : ['January','February','March','April','May','June','July','August','September','October','November','December']
				},
				'it' :{
					'format' : '%DD%, %D% %MM% %YYYY% %H24% : %I% : %S%',
					//format : '%H24% : %I% : %S% ~ %D% / %M% / %YY% %DD% %MM%',
					'days' : ['Domenica','Lunedí','Martedí','Mercoledí','Giovedí','Venerdí','Sabato'],
					'months' : ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'] 
				}
			},
			timer = function (o) {
				this.target = o.target;
				this.lang = o.lang in time_formats ? o.lang : 'it';
				this.l = time_formats[this.lang];
				this.format = o.format ||  "%H24% : %I% : %S%"; 
			};

		timer.prototype.updateTime = function () {
			var self = this;
			window.setTimeout(function () {self.init(); }, 1000);
		};

		timer.prototype.getTime = function () {
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
				DD = this.l.days[d.getDay()],
				MM = this.l.months[M-1];

			return JMVC.string.replaceAll(
				this.format,
				{APM : APM, H12 : H12, H24 : H24, I : I, S : S, YY : YY, YYYY : YYYY, M : M, D : D, MM : MM, DD : DD}
			);
		};
		timer.prototype.init =  function () {
			JMVC.dom.html(this.target, this.getTime());
			this.updateTime();
			return this;
		} 
		
		return (new timer(options)).init();
	}
});

