JMVC.extend('plotter', {
	
	symbol : function (letter, top, left, character) {
		
		var mod,
			that = this,
			M = Math;

		mod = {
			adddot : function (x, y) {
				that.arr.push([x, y]);
				return that;
			},
			addarc : function (centerx, centery, radiusx, radiusy, radstep, radfrom, howmany, rad) {
				var i = 0,
					x,
					y,
					iarr = [],
					l;
				while (howmany) {
					x = radiusx * M.cos(radfrom + i * radstep);
					y = radiusy * M.sin(radfrom + i * radstep);
					i += 1;
					iarr.push([x, y]);
					howmany -= 1;
				}

				if (rad) {
					JMVC.each(iarr, function (elem ,indx) {
						x = elem[0];
						y = elem[1];
						elem[0] = x * M.cos(rad) - y * M.sin(rad);
						elem[1] = x * M.sin(rad) + y * M.cos(rad);
					});
				}
				JMVC.each(iarr, function (elem, indx) {
					elem[0] = elem[0] + centerx;
					elem[1] = elem[1] + centery;
				});
				that.arr = that.arr.concat(iarr);
				return that;
			},
			beizer : function (x1, y1,  x2, y2,  x3, y3,  x4, y4,  hm) {
				var B1 = function (t) {return t * t * t; },
					B2 = function (t) {return 3 * t * t * (1 - t); },
					B3 = function (t) {return 3 * t * (1 - t) * (1 - t); },
					B4 = function (t) {return (1 - t) * (1 - t) * (1 - t); },
					prcnt = 0,
					step = 1 / (hm || 10);
				
				for (null; prcnt <= 1; prcnt += step) {
					that.arr.push([
						x1 * B1(prcnt) + x2 * B2(prcnt) + x3 * B3(prcnt) + x4 * B4(prcnt),
						y1 * B1(prcnt) + y2 * B2(prcnt) + y3 * B3(prcnt) + y4 * B4(prcnt)
					]);
				}
				return that;
			},
			addline : function (x1, y1, x2, y2, howmany) {
				var hm = howmany + 1,
					distance = M.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)),
					tx = (x2 - x1) / hm,
					ty = (y2 - y1) / hm,
					i = 1;
				that.arr.push([x1, y1]);
				while (howmany) {
					that.arr.push([x1 + tx * i, y1 + ty * i]);
					i += 1;
					howmany -= 1;
				}
				that.arr.push([x2, y2]);
				return that;
			},
			plot : function (node, positions, character, left, top) {
				for (var i = 0, l = positions.length; i < l; i ++) {
					JMVC.gra.plotarr(node, positions[i], i, character, left, top);
				}
				return that;
			},
			plotarr : function (node, positions, letter, character, left, top, scale) {
				var i = 0,
					l = positions.length,
					tmp;
				typeof scale == 'undefined' && (scale = 1);
				
				for (null; i < l; i++) {
					tmp = JMVC.dom.create('span', {
							'class' : 'point ' + letter,
							'style' : JMVC.string.replaceAll('top:%top%px;left:%left%px', {
								left : ~~ (positions[i][0] + left) * scale,
								top : ~~ (positions[i][1] + top) * scale
							})
						}, character);
					JMVC.dom.append(node, tmp);
				}
				return that;
			},
			rotate : function (rad) {
				var x, y;

				JMVC.each(that.arr, function (el, i) {
					x = el[0];
					y = el[1];
					el[0] = x * M.cos(rad) - y * M.sin(rad);
					el[1] = x * M.sin(rad) + y * M.cos(rad);
				});
				return that;
			},
			clone : function (inst) {
				that.arr = Array.prototype.slice.call(inst.arr, 0);
				return that;
			}
		};


		this.arr = [];
		this['char'] = character || '&bull;';
		this.left = left;
		this.top = top;
		this.dot = mod.adddot;
		this.arc = mod.addarc;
		this.beizer = mod.beizer;
		this.line = mod.addline;
		this.plot = function (node ,scale) {mod.plotarr(node, this.arr, letter, this['char'], this.top, this.left, scale); };
		this.rotate = mod.rotate;
		this.clone = mod.clone;
		this.setChar = function (c) {this['char'] = c; };
		
	}
});
