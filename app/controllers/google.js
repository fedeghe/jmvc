JMVC.controllers.google = function () {
	'use strict';
	this.action_index = function () {
		JMVC.events.loadify(1000);
		JMVC.require('plotter/plotter', 'core/obj/bucket/bucket');
		JMVC.head.meta('generator', 'jmvc resident in your machine');
		JMVC.head.addStyle(JMVC.vars.baseurl + '/media/css/logoogle.css');

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
				g = new JMVC.plotter.symbol('g', 43, 193),
				l = new JMVC.plotter.symbol('l', 437, 64),
				e = new JMVC.plotter.symbol('e', 48, 260);
				//t = new JMVC.plotter.letter('t', 108, 360);
				//
			JMVC.dom.addClass(newlogo, 'respfixed');

			var off = {x:-72, y:-67};

			G.arc(3, 0, 76, 68, M.PI / 27, M.PI/2, 34);
			G.line(12, 67, 53, 58, 3);
			G.line(53, 58, 53, 23,  3);
			G.line(53, 23, 59, 16, 0);
			G.line(59, 16, 18, 16, 4);
			G.line(18, 16, 12, 22, 0);
			G.line(12, 22, 34, 22, 2);
			G.line(34, 22, 34, 54, 3);
			G.arc(3, 0, 62, 54, -M.PI / 24, -5*M.PI/8 , 33, M.PI/3);
			
			G.line(46, -48, 36, -37, 1);

				//G.rotate(M.PI)
				//
			o1.arc(0,0,45,45, M.PI/20, 0, 40);
			o1.arc(0,0,28,38, M.PI/16, 0, 32);
			o1.rotate(-M.PI/12);
			
			//o1.rotate(M.PI/2);
			o2.clone(o1);

			l.line(-12,-60,16,-60, 2);
			l.line(16,-60, 10, -54, 0);
			l.line(10, -54, 10, 60, 12);
			l.line(10, 60, 21, 62, 1);
			l.line(21, 62, 17, 66, 0);
			l.line(17, 66, -15, 66, 3);
			l.line(-15, 66, -9, 60, 0);
			l.line(-9, 60, -9,-52, 12);
			l.line(-9,-52, -18, -52, 0);

			//l.rotate(M.PI/2);
			
			
			var scale = 1;
			
			G.plot(newlogo, scale);
			o1.plot(newlogo, scale);
			o2.plot(newlogo, scale);
			g.plot(newlogo, scale);
			l.plot(newlogo, scale);
			e.plot(newlogo, scale);
			
			
			
			/*
			var animate = true, a, i, T1, T2, nums, bucket, t, c, s, dotsize, maxsize,
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
					var trg;
					if (that.get('flash')) {
						trg = i;
					} else {
						if (!bucket.hasMore()) {
							if (aberrate) {
								dotsize = (dotsize < maxsize) ? dotsize + 1 : maxsize;
							}
							bucket.recover();
						}
						trg =  bucket.next() || 1;
					}

					try {c = a.item(trg).style.color, s = a.item(trg).style.fontSize; } catch (e) {}

					window.setTimeout(
						function (t1) {
							a.item(t1).style.color = 'white';
							a.item(t1).style.fontSize = aberrate ? dotsize * 2 + 'px' : '10px';
							window.setTimeout(
								function (t2) {
									a.item(t2).style.color = c;
									a.item(t2).style.fontSize = dotsize + 'px';
								}, T1, t1
							);
						}, 0, trg
					);
					if (that.get('flash')) {
						i = (i + 1) % (a.length);
						i = i ? i : 1;
					}
				}, T2);

			}*/
			
		});
	};
};