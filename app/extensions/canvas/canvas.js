JMVC.require('core/lib/math/dd/dd');

JMVC.extend('canvas', {
	create : function (container, id, w, h, bgcolor) {
		
		// create basic canvas to draw in
		// 
		var canvas = JMVC.dom.create('canvas', {id : id, width : w, height : h},' '),
			ctx = canvas.getContext('2d'),
			elements = {},
			el_id_prefix = 'cnvel_',
			el_id_postfix = 0,
			retObj = false;

		ctx.fillStyle = bgcolor;
		ctx.fillRect(0, 0, w, h);
		
		
		
		
		
		/**
		 * Canvas extension augment prototipes from dd
		 * 
		 */
		
		JMVC.prototipize(JMVC.dd.Rect, {
			draw : function () {
				ctx.fillRect(this.oregon.x, this.oregon.y, this.width, this.height);
				return this;
			},
			clear : function () {
				
			}
		});
		JMVC.prototipize(JMVC.dd.Circle, {
			draw : function () {
				ctx.beginPath();
				ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
				ctx.fill();
				return this;
			}
		});
		JMVC.prototipize(JMVC.dd.Line, {
			draw : function () {
				ctx.beginPath();
				ctx.moveTo(this.p1.x, this.p1.y);
				ctx.lineTo(this.p2.x, this.p2.y);
				ctx.stroke();
				return this;
			}
		});
		
		function queueElement(func, args) {
			elements[el_id_prefix + el_id_postfix] = [func, args];
			el_id_postfix += 1;
		}
		function redraw() {
			ctx.clearRect(1, 1, w - 2, h - 2);
		}
		
		/**
		 * Now returns his Api taking advantage of
		 * dd scaffold objects augmented above
		 * with methods peroer for canvas extension
		 */
		retObj = {
			elements : elements,
			redraw : redraw,
			getCoord : function (e) {return JMVC.events.getCoord(canvas, e); },
			reset : function () {canvas.width = canvas.width; },
			/**
			 * vect :  direction vector
			 * steps : array of literals [{perc: , color}, ....]
			 * rect : fillarea
			 */
			grad_linear : function (v1x, v1y, v2x, v2y, steps, r1x, r1y, r2x, r2y) {
				queueElement('grad_linear', arguments);
				var vect = new JMVC.dd.Vector(new JMVC.dd.Point(v1x, v1y), new JMVC.dd.Point(v2x, v2y)),
					rect = new JMVC.dd.Rect(new JMVC.dd.Point(r1x, r1y), new JMVC.dd.Point(r2x, r2y)),
					cg = ctx.createLinearGradient(vect.p1.x, vect.p1.y, vect.p2.x, vect.p2.y),
					i,
					l = steps.length;
				for (i = 0; i < l; i += 1){
					cg.addColorStop(steps[i].perc, steps[i].color);
				}
				ctx.fillStyle = cg;
				ctx.fillRect(rect.oregon.x, rect.oregon.y, rect.oregon.x + rect.width, rect.oregon.y + rect.height);
				return this;
			},
			grad_radial : function (r1x, r1y, r1, r2x, r2y, r2, steps, rect1x, rect1y, rect2x, rect2y) {
				queueElement('grad_radial', arguments);
				var c1 = new JMVC.dd.Circle(new JMVC.dd.Point(r1x, r1y), r1),
					c2 = new JMVC.dd.Circle(new JMVC.dd.Point(r2x, r2y), r2),
					
					rect = new JMVC.dd.Rect(new JMVC.dd.Point(rect1x, rect1y), new JMVC.dd.Point(rect2x, rect2y)),
					
					cg = ctx.createRadialGradient(
						c1.center.x, c1.center.y, c1.radius,
						c2.center.x, c2.center.y, c2.radius
					),
					i,
					l = steps.length;
				for (i = 0; i < l; i += 1){
					cg.addColorStop(steps[i].perc, steps[i].color);
				}
				ctx.fillStyle = cg;
				ctx.fillRect(rect.oregon.x, rect.oregon.y, rect.oregon.x + rect.width, rect.oregon.y + rect.height);
				return this;
			},
			rect : function (P1x, P1y, P2x, P2y) {
				queueElement('rect', arguments);
				var s = new JMVC.dd.Rect(
					new JMVC.dd.Point(P1x, P1y),
					new JMVC.dd.Point(P2x, P2y)
				);
				ctx.fillStyle = '#f00';
				return s;
			},
			circle : function (Ox, Oy, radius, color) {
				queueElement('circle', arguments);
				var c = new JMVC.dd.Circle(new JMVC.dd.Point(Ox, Oy), radius);
				ctx.fillStyle = color;
				return c;
			},
			line : function (P1x, P1y, P2x, P2y, color) {
				queueElement('line', arguments);
				var l = new JMVC.dd.Line(
					new JMVC.dd.Point(P1x, P1y),
					new JMVC.dd.Point(P2x, P2y)
				);
				ctx.strokeStyle = color || '#000';
				return l;
			},
			render : function () {
				JMVC.dom.append(container, canvas);
				return this;
			}
		};
		return retObj;
	}
});
