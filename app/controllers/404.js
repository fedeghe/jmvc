JMVC.require('core/color/color', 'core/dim/dim');

JMVC.controllers['404'] = function () {
	'use strict';
	this.action_msg = function () {
		var seconds2redirection = 5,
			V404 = JMVC.getView('core/404'),
			d = new Date(),
			format = '%Y%/%m%/%d% %H%:%i%:%s%',
			data = {
				date : JMVC.string.replaceall(format, {
					Y : d.getFullYear(),
					m : 1 + d.getMonth(),
					d : d.getDay(),
					H : d.getHours(),
					i : d.getMinutes(),
					s : d.getSeconds()
				}),
				url : JMVC.WD.referrer,
				agent : JMVC.W.navigator.userAgent,
				secToRedir : seconds2redirection
			},
			cnt = this.get('cnt'),
			act = this.get('act');

		act && (data.msg =  'action `' + this.get('act') + '` not found');
		cnt && (data.msg = 'controller `' + this.get('cnt') + '` not found');
		
		JMVC.head.title('404 PAGE NOT FOUND');
		JMVC.events.delay(function () {JMVC.head.goto(); }, seconds2redirection * 1000);
		
		// meant to be passed at the view render
		//
		function bubble(){

			//<canvas id="cnv" width="" height="" style=""></canvas>
			var cnv = JMVC.dom.create('canvas'),
				dim = JMVC.dim.getViewportSize(),
				mainContext = cnv.getContext('2d'),
				canvasWidth = dim.width,
				canvasHeight = dim.height,
				angle = 0,
				requestAnimationFrame = window.requestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.msRequestAnimationFrame;

			JMVC.dom.attr(cnv, {width : canvasWidth + 'px', height : canvasHeight + 'px'});
			JMVC.css.style(cnv, {
				opacity: 0.2,
				position : 'absolute',
				top: 0,
				left: 0,
				zIndex : -1
			});

			JMVC.dom.append(JMVC.dom.find('#err404'), cnv);		

			function getRndPoint() {
				return {
					x : ~~(Math.random() * canvasWidth),
					y : ~~(Math.random() * canvasHeight),
					radius : ~~(200 * Math.random())
				}
			}

			mainContext.clearRect(0, 0, canvasWidth, canvasHeight);
			mainContext.fillStyle = "#fff";
			mainContext.fillRect(0, 0, canvasWidth, canvasHeight);

			function drawCircle() {
			    var point = getRndPoint();
			    mainContext.beginPath();
			    mainContext.arc(point.x, point.y, point.radius, 0, Math.PI * 2, false);
			    mainContext.closePath();
			    mainContext.fillStyle = JMVC.core.color.getRandomColor();
			    mainContext.fill();
			    requestAnimationFrame(drawCircle);
			}
			function draw404() {
			    var point = getRndPoint();
			    mainContext.rotate(2 * Math.PI * Math.random());
			    mainContext.fillStyle = JMVC.core.color.getRandomColor();
			    mainContext.strokeStyle = 'black';
			    mainContext.font = "bold " + point.radius + "px sans-serif";
			    mainContext.fillText("404",point.x, point.y);
			    mainContext.strokeText("404",point.x, point.y);
			    mainContext.fill();
			    mainContext.stroke();
			    requestAnimationFrame(draw404);
			}
			draw404();
			//drawCircle();
		}


		V404.set(data).render(bubble);
	};
	
};
