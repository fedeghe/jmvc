JMVC.require('canvas','test');
		
JMVC.controllers.canvas = function() {
	
	this.index = function(s){
		
		this.render(false,function test(){
			"use strict";
			
			JMVC.test.initialize(true);
			JMVC.test.startAll();
			
			
			var cnv = JMVC.canvas.create(JMVC.test.vars.banner, 'mycanvas', 300, 500, '#0a0'),
				c = new JMVC.dd.Circle(
					new JMVC.dd.Point(1000,120),
					new JMVC.dd.Point(10,121)
				);

			c.set('radius', 200);
			
			cnv.grad_linear(
				0,0,100,500,
				[{perc: 0, color:"#aaf"},{perc: 0.3, color:"#fff"},{perc: 0.3, color:"#afa"},{perc: .5, color:"#fff"},{perc: 0.5, color:"#afa"},{perc: 1, color:"#fff"}],
				0,0,300,500
			).grad_radial(
				50,50,30,60,60,60,
				[{perc: 0, color:"#faf"},{perc: 0.5, color:"#fff"},{perc: 0.5, color:"#afa"},{perc: 1, color:"#fff"}]
				,10,10,100,100
			);
			
			var	sdim = new JMVC.dd.Dimension(6, 6),
				s1 = cnv.rect(50,10, 50 + sdim.w, 10 + sdim.h).draw(),
				c1 = cnv.circle(20, 50 ,30 ,'#ff0').draw(),
				c2 = cnv.circle(100, 100, 50, '#fff').draw(),
				l1 = cnv.line(100, 100, 130, 400, '#fede76').draw(),
				c3 = cnv.circle(100, 100, 30, '#f0f').draw();
			cnv.render();
			
			
			
			JMVC.events.bind(JMVC.dom.find('#mycanvas'), 'mousemove', function(e){
				var c = cnv.getCoord(e);
				s1.oregon.x = c[0] - sdim.w/2;
				s1.oregon.y = c[1] - sdim.h/2;
				cnv.redraw();
				cnv.render();
				s1.draw();
				
				c = null;
				
			});
			
			
			window.cnv = cnv;
			
			
			//c3.set('radius', 200);
			//c3.draw();
			
			JMVC.test.finishAll();
		});
	};
	
};
