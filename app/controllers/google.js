JMVC.controllers.google = function () {

	this.action_index = function () {

		JMVC.events.loadify(1000);
		JMVC.require('plotter/plotter', 'core/obj/bucket/bucket');
		JMVC.head.meta("generator", "jmvc resident in your machine");
		JMVC.head.addstyle(JMVC.vars.baseurl + '/media/css/logoogle.css');

		var M = Math,
			v = JMVC.getView('vacuum'),
			that = this;

		v.set({
			'style' : 'font-family:verdana;margin:0 auto;width:285px;height:105px;margin-top:80px;position:relative;',
			'content' : '&nbsp;',
			'id' : 'extralogo'
		});

		/* JMVC.p.real && JMVC.head.lib('jsapi'); */
		
		v.render(function () {

			var newlogo = JMVC.dom.find('#extralogo'),
				G = new JMVC.plotter.symbol('G', 22, 37),
				o1 = new JMVC.plotter.symbol('o1', 48, 97),
				o2 = new JMVC.plotter.symbol('o2', 48, 148),
				g = new JMVC.plotter.symbol('g', 43, 193),
				l = new JMVC.plotter.symbol('l', 10, 220),
				e = new JMVC.plotter.symbol('e', 48, 260);
				//t = new JMVC.plotter.letter('t', 108, 360);

			G.arc(17, 3, 35, 38, -M.PI / 20, M.PI / 10, 28);
			G.arc(18, 6, 32, 27, -M.PI / 15, -M.PI * 0.13, 21, M.PI / 4);
			G.line(50, 14, 47, 30, 2);
			G.line(47, 30, 34, 30, 1);

			G.line(27, 32, 27, 14, 2);

			G.line(31, 8, 31, 20, 1);
			G.line(31, 20, 42, 20, 1);

			G.line(-4,22, -8,29, 1);
			
			o1.arc(0, 0, 22, 22, 2 * M.PI / 25, 0, 25);
			o1.arc(1, 1, 11, 16, 2 * M.PI / 17, 0, 17, -M.PI * 0.44);
			
			
			o2.clone(o1);

			g.arc(0, 0, 16, 18, M.PI / 10, 2 * M.PI * 0.1, 7);
			g.arc(0, 0, 16, 18, -M.PI / 10, -2 * M.PI * 0.05, 10);
			g.line(-16, 0, -16, 20, 2);
			g.line(-16, 20, -12, 10, 1);
			g.arc(0, 0, 9, 12, M.PI / 6, 0, 12, -M.PI * 0.4);

			g.arc(38, 0, 10, 13, M.PI / 6, 0, 12, -M.PI);
			g.arc(38, 0, 15, 22, -2 * M.PI / 20, -M.PI / 2, 15, -M.PI);

			g.dot(18, 0);
			g.dot(22, 2);
			g.beizer(12, 10, 17, 7, 20, 9, 31, 19, 6);   


			l.line(0, 1, 52, 1, 7);
			l.line(52, 1, 58, -4, 0);
			l.line(58, -4, 58, 15, 2);
			l.line(54, 19, 54, 11, 1);
			l.line(54, 11, 0, 11, 7);
			l.line(0, 11, -6, 14, 0);
			l.line(-6, 14, -6, 0, 1);
			l.dot(-4, -6);

			e.arc(0, 0, 22, 22, -2 * M.PI / 25, 2 * M.PI * 0.13, 21);
			e.arc(-2, 5, 20, 17, -2 * M.PI / 22, 2 * M.PI * 0.04, 8, 2 * M.PI * 0.07);
			e.arc(1, 1, 20, 13, -2 * M.PI / 20, 2 * M.PI * 0.67, 8, 2 * M.PI * 0.07);
			e.line(-11, 7, -3, -13, 2);
			e.line(-10, 16, 0, -8, 3);
			
			
			var scale = 1;
			
			G.plot(newlogo, scale);
			o1.plot(newlogo, scale);
			o2.plot(newlogo, scale);
			g.plot(newlogo, scale);
			l.plot(newlogo, scale);
			e.plot(newlogo, scale);
			
			
			
			
			var animate = true, a, i, T1, T2, nums, bucket, t, c, s, trg, dotsize, maxsize,
				aberrate = that.get('aberrate');
			if (animate) {
				a = newlogo.childNodes;
				i = 1;
				T1 = 10;
				T2 = 1;
				dotsize = aberrate ? 2 : 6;
				maxsize = 300;
				nums = JMVC.util.range(1, a.length - 1);
				bucket = new JMVC.bucket.create(nums);
				t = window.setInterval(function () {
					if (that.get('flash')) {
						var trg = i;
					} else {
						if (!bucket.hasMore()) {
							if (aberrate) {
								dotsize = (dotsize < maxsize) ? dotsize + 1 : maxsize;
							}
							bucket.recover();
						}
						trg =  bucket.next() || 1;
					}

					try {c = a.item(trg).style.color, s = a.item(trg).style.fontSize; } catch(e){}

					window.setTimeout(
						function (t1) {
							a.item(t1).style.color = 'white';
							a.item(t1).style.fontSize = aberrate ? dotsize*2 + 'px' : '10px';	
							window.setTimeout(
								function (t2) {
									a.item(t2).style.color = c;
									a.item(t2).style.fontSize = dotsize + 'px';
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
			
		});
	};
}