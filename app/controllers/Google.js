JMVC.controllers.Google = function () {
	//
	this.index = function () {
		//
		JMVC.events.loadify(1000);
		JMVC.require('plotter_new', 'obj/bucket');
		JMVC.head.meta("generator", "jmvc resident in your machine");
		JMVC.head.addstyle(JMVC.vars.baseurl + '/media/css/logoogle.css', true);
		//
		var M = Math,
			v = JMVC.getView('vacuum'),
			that = this;
		//
		v.set({'style' : 'font-family:verdana;margin:0 auto;width:285px;height:105px;margin-top:80px;position:relative', 'content' : '&nbsp;', 'id' : 'extralogo'});
		//
		v.render({cback : function () {
			var newlogo = document.getElementById('extralogo'),
				G = new JMVC.graf.letter('G', 22, 37),
				o1 = new JMVC.graf.letter('o1', 48, 97),
				o2 = new JMVC.graf.letter('o2', 48, 148),
				g = new JMVC.graf.letter('g', 43, 193),
				l = new JMVC.graf.letter('l', 10, 220),
				e = new JMVC.graf.letter('e', 48, 260),
				
				t = new JMVC.graf.letter('t', 108, 360);
			//
			//
			//
			G.arc(17, 3, 35, 38, -M.PI / 20, M.PI / 10, 28);
			G.arc(18, 6, 32, 27, -M.PI / 15, -M.PI * 0.13, 21, M.PI / 4);
			G.line(50, 14, 47, 30, 2);
			G.line(47, 30, 34, 30, 1);
			//G.line(34, 30, 27,32,  0);
			G.line(27, 32, 27, 14, 2);
			//G.line(27, 14, 31, 8, 0);
			G.line(31, 8, 31, 20, 1);
			G.line(31, 20, 42, 20, 1);
			G.line(-3, 22, -7, 29, 1);
			//
			//
			//
			o1.arc(0, 0, 22, 22, 2 * M.PI / 25, 0, 25);
			o1.arc(1, 1, 11, 16, 2 * M.PI / 17, 0, 17, -M.PI * 0.44);
			//
			o2.arc(0, 0, 22, 22, 2 * M.PI / 25, 0, 25);
			o2.arc(1, 1, 11, 16, 2 * M.PI / 17, 0, 17, -M.PI * 0.44);
			//
			//
			//
			g.arc(0, 0, 16, 18, M.PI / 10, 2 * M.PI * 0.1, 7);  // )
			g.arc(0, 0, 16, 18, -M.PI / 10, -2 * M.PI * 0.05, 10);  // (
			g.line(-16, 0, -16, 20, 2);
			g.line(-16, 20, -12, 10, 1);
			g.arc(0, 0, 9, 12, M.PI / 6, 0, 12, -M.PI * 0.4);
			//
			g.arc(38, 0, 10, 13, M.PI / 6, 0, 12, -M.PI);
			g.arc(38, 0, 15, 22, -2 * M.PI / 20, -M.PI / 2, 15, -M.PI);
			//g.arc(20,-50, 5,5, M.PI/2, 0.01, 3);
			g.dot(18, 0);
			g.dot(22, 2);
			g.beizer(12, 10, 17, 7, 20, 9, 31, 19, 6);   
			//
			//
			l.line(0, 1, 52, 1, 7);
			l.line(52, 1, 58, -4, 0);
			l.line(58, -4, 58, 15, 2);
			l.line(54, 19, 54, 11, 1);
			l.line(54, 11, 0, 11, 7);
			l.line(0, 11, -6, 14, 0);
			l.line(-6, 14, -6, 0, 1);
			l.dot(-4, -6);
			//
			//
			//
			e.arc(0, 0, 22, 22, -2 * M.PI / 25, 2 * M.PI * 0.13, 20);
			e.arc(-2, 5, 20, 17, -2 * M.PI / 22, 2 * M.PI * 0.04, 8, 2 * M.PI * 0.07);
			e.arc(1, 1, 20, 13, -2 * M.PI / 20, 2 * M.PI * 0.67, 8, 2 * M.PI * 0.07);
			e.line(-11, 7, -3, -13, 2);
			e.line(-10, 16, 0, -8, 3);//bassa
			//
			//
			//
			//
			//
			
			
			G.plot(newlogo);
			o1.plot(newlogo);
			o2.plot(newlogo);
			g.plot(newlogo);
			l.plot(newlogo);
			e.plot(newlogo);
			
			/*
			t.clone(e);
			t.rotate(M.PI);
			t.plot(newlogo);
			*/
			
			
			
			//
		/*o2.line(56,0,36,30, 3);
			o2.plot(newlogo);
			g.line(66,0,36,30, 3);
			g.plot(newlogo);
			l.line(76,0,36,30, 3);
			l.plot(newlogo);
			e.line(86,0,36,30, 3);
			e.plot(newlogo);
			*/
			var animate = true, a, i, T1, T2, nums, bucket, t, c, s, trg;
			if (animate) {
				a = newlogo.childNodes;
				i = 1;
				T1 = 10;
				T2 = 2;
				nums = JMVC.util.range(1, a.length - 1);
				bucket = new JMVC.bucket.create(nums);
				t = window.setInterval(function () {
					if (that.get('flash')) {
						var trg = i;
					} else {
						if (!bucket.hasMore()) {bucket.reset(); }
						trg =  bucket.next() || 1;//i;//JMVC.util.rand(1,a.length-1);
					}
					//
					try {c = a.item(trg).style.color, s = a.item(trg).style.fontSize; } catch(e){}
					//
					window.setTimeout(
						function (t1) {
							a.item(t1).style.color = 'white';
							a.item(t1).style.fontSize = '6px';
							window.setTimeout(
								function (t2) {a.item(t2).style.color = c;
									//a.item(t2).style.fontSize = s;
								}, T1, t1
							);
						},0, trg
					);
					if (that.get('flash')) {
						i = (i + 1)%(a.length);
						i = i ? i : 1;
					}
				}, T2);
			}
			//
		}});
	};
}