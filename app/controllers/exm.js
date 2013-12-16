JMVC.controllers.exm = function () {
	"use strict";
	this.action_index = function () {
		JMVC.events.loadify(1000);
		JMVC.require('plotter/plotter', 'core/obj/bucket/bucket');
		var //M = Math,
			that = this,
			v = JMVC.getView('vacuum');
		
		v.set({
			'style' : 'font-family:verdana;margin:0 auto;width:215px;height:112px;margin-top:80px;position:relative',
			'content' : '&nbsp;',
			'id' : 'extralogo'
		});
		
		JMVC.head.addstyle(JMVC.vars.baseurl + '/media/css/logoexm.css', true, false);
		
		v.render(function () {
			var newlogo = document.getElementById('extralogo'),
				e = new JMVC.plotter.symbol('e', 8, 0),
				x = new JMVC.plotter.symbol('x', 8, 71),
				m = new JMVC.plotter.symbol('m', 22, 260),
				a = newlogo.childNodes,
				i = 1,
				t,
				T1 = 20,
				T2 = 10,
				bucket = new JMVC.bucket.create(JMVC.util.range(0, a.length - 1));
				
			e.line(0, 14, 0, 65, 10);
			e.line(10, 14, 10, 65, 10);
			e.line(59, 14, 59, 65, 10);
			e.line(69, 14, 69, 65, 10);
			e.plot(newlogo);
			
			x.line(0,0,35,27,7);
			x.line(35,27,69,0,7);
			x.plot(newlogo);

			
			
			t = window.setInterval(function () {
				var trg,
					c;
				if (that.get('flash')) {
					trg = i;
				} else {
					if (!bucket.hasMore()) {bucket.recover(); }
					trg =  bucket.next() || 1;/*i; JMVC.util.rand(1,a.length-1); */
				}
				
				
				try {c = a[trg].style.color; } catch (e) {JMVC.debug(trg); }

				window.setTimeout(
					function (t1) {
						a[t1].style.color = 'white';
						a[t1].style.fontSize = '8px';
						window.setTimeout(
							function (t2) {a[t2].style.color = c; }, T1, t1
						);
					}, 0, trg
				);
				if (that.get('flash')) {
					i = (i + 1) % a.length;
					i = i || 1;
				}

			}, T2);
			
		});
	};
};


