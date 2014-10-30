JMVC.controllers.google = function () {
	'use strict';
	this.action_index = function () {
		JMVC.events.loadify(1000);
		JMVC.require('plotter/plotter', 'core/obj/bucket/bucket');
		JMVC.head.meta('generator', 'jmvc resident in your machine');
		JMVC.head.addStyle(JMVC.vars.baseurl + '/media/css/logoogle.css');

		JMVC.head.title('Google logo plotted');

		var M = Math,
			v = JMVC.getView('vacuum'),
			that = this;

		document.body.style.paddingTop = '100px';
		v.set({
			'style' : 'font-family:verdana;margin:0 auto;width:538px;height:190px;position:relative;' + (JMVC.p.back ? ';background-image:url(' + JMVC.vars.baseurl + '/media/img/google.png);' : ''),
			'content' : '&nbsp;',
			'id' : 'extralogo'
		});

		/* JMVC.p.real && JMVC.head.lib('jsapi'); */
		
		v.render(function () {

			var newlogo = JMVC.dom.find('#extralogo'),
				G = new JMVC.plotter.symbol('G', 72, 67),
				o1 = new JMVC.plotter.symbol('o1', 185, 90),
				o2 = new JMVC.plotter.symbol('o2', 283, 90),
				g = new JMVC.plotter.symbol('g', 330, 40),
				l = new JMVC.plotter.symbol('l', 437, 64),
				e = new JMVC.plotter.symbol('e', 460, 48);
				//t = new JMVC.plotter.letter('t', 108, 360);
				//
			JMVC.dom.addClass(newlogo, 'respfixed');

			var off = {x:-72, y:-67};

			G.arc(3, 0, 76, 68, M.PI / 27, M.PI/2, 34)
				.line(12, 67, 53, 58, 3)
				.line(53, 58, 53, 23,  3)
				.line(53, 23, 59, 16, 0)
				.line(59, 16, 18, 16, 4)
				.line(18, 16, 12, 22, 0)
				.line(12, 22, 34, 22, 2)
				.line(34, 22, 34, 54, 3)
				.arc(3, 0, 62, 54, -M.PI / 24, -5*M.PI/8 , 33, M.PI/3)
				.line(46, -48, 36, -37, 1);

			o1.arc(0,0,45,45, M.PI/20, 0, 40)
				.arc(0,0,28,38, M.PI/16, 0, 32)
				.rotate(-M.PI/12);

			o2.clone(o1);

			g.arc(45, 38, 20, 26, M.PI/8, 0, 16, -M.PI/8)
				.arc(45, 38, 36, 32, M.PI/10, M.PI/2 + M.PI/12, 9)
				.arc(45, 38, 36, 32, -M.PI/10, M.PI/3, 7)
				.line(44, 6, 86, 6, 3)
				.line(80, 12, 80, 12)
				.arc(45, 116, 30, 21, M.PI/8, 0, 14)
				.arc(43, 117, 43, 29, M.PI/10, 0 + M.PI/12, 15, -M.PI/20)
				.arc(80, 72, 23, 14, -M.PI/6, M.PI, 3)
				.arc(80, 72, 38, 24, -M.PI/10, M.PI, 3)
				.line(62, 97, 72, 110, 1)
				.arc(43, 107, 43, 29, -M.PI/10, 0, 3);

			l.line(-12,-60,16,-60, 2)
				.line(16,-60, 10, -54, 0)
				.line(10, -54, 10, 60, 12)
				.line(10, 60, 21, 62, 1)
				.line(21, 62, 17, 66, 0)
				.line(17, 66, -15, 66, 3)
				.line(-15, 66, -9, 60, 0)
				.line(-9, 60, -9,-52, 12)
				.line(-9,-52, -18, -52, 0);

			e.line(16,36, 52, 22, 3)
				.line(18, 44, 67, 23, 4)
				.arc(41, 44, 42, 44, -M.PI / 14, 0 , 23, -M.PI/5)
				.arc(53, 41, 34, 36, -M.PI / 14, M.PI , 10, -M.PI/10)
				.arc(43, 41, 24, 36, -M.PI / 10, -M.PI/5, 7, -M.PI/10);

			//l.rotate(M.PI/2);
			
			
			var scale = 1;
			
			G.plot(newlogo, scale);
			o1.plot(newlogo, scale);
			o2.plot(newlogo, scale);
			g.plot(newlogo, scale);
			l.plot(newlogo, scale);
			e.plot(newlogo, scale);

			var animate = true,
				a, i, T1, T2, nums, bucket, t, c, s, dotsize, maxsize,
				aberrate = that.get('aberrate'),
				flash = that.get('flash');
			if (animate) {
				a = newlogo.childNodes;
				i = 1;
				T1 = 50;
				T2 = 10;
				
				dotsize = aberrate ? 4 : 6;
				
				maxsize = 300;
				
				nums = JMVC.util.range(1, a.length - 1);
				
				bucket = new JMVC.bucket.create(nums);

				t = window.setInterval(function () {
					var trg;
					if (flash) {
						trg = i;
					} else {
						if (!bucket.hasMore()) {
							if (aberrate) {
								dotsize = (dotsize < maxsize) ? dotsize + 2 : maxsize;
							}
							bucket.recover();
						}
						trg =  bucket.next() || 1;
					}

					try {
						c = a.item(trg).style.color,
						s = a.item(trg).style.fontSize;
					} catch (e) {}

					window.setTimeout(
						function (t1) {
							a.item(t1).style.color = 'white';
							a.item(t1).style.fontSize = aberrate ? dotsize * 2 + 'px' : '10px';
							a.item(t1).style.zIndex = 200;
							window.setTimeout(
								function (t2) {
									a.item(t2).style.color = c;
									a.item(t2).style.fontSize = dotsize + 'px';
									a.item(t1).style.zIndex = 1;
								}, T1, t1
							);
						}, 0, trg
					);
					if (that.get('flash')) {
						i = (i + 1) % (a.length);
						i = i ? i : 1;
					}
				}, T2);
			}
		});
	};
};