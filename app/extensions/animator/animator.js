/**
 * @author: Federico Ghedina
 */
JMVC.extend('animator', {

	init : function (){
		JMVC.require('core/css');	
	},

	//follow implicit path
	follow_ipath : function (that, func, prange, options) {
		
		var ani = {},
			parent,
			move;
		ani.timeout = JMVC.object.inObject(options, 'timeout') ? options.timeout : 25;
		ani.mode = JMVC.object.inObject(options, 'mode') ? options.mode : 'repeat';
		ani.step = JMVC.object.inObject(options, 'step') ? JMVC.num.getFloat(options.step) : 1;
		ani.range = prange ? prange : {from : 0, to : 300};
		ani.next = function () {};
		ani.operators = {
				'+' : function (a) {return a + ani.step; },
				'-' : function (a) {return a - ani.step; }
			};
		ani.op = ani.operators['+'];
		
		JMVC.css.style(that, 'position', 'absolute');
		
		parent = JMVC.dom.parent(that);
		
		JMVC.css.style(parent, 'position', 'relative');
		
		
		switch (ani.mode) {
			case 'repeat':
				ani.next = function (that, x ,f) {
					if (x < ani.range.to) {
						window.setTimeout(
							function () {move(that, x + ani.step, f); },
							ani.timeout 
						);
					} else {
						move(that, ani.range.from, f);
					}
				};
			break;
			case 'back':
				ani.next = function (that, x ,f) {
					if (ani.range.from <= x && x <= ani.range.to) {
						if (x <= ani.range.from) {
							x = ani.range.from;
							ani.op = ani.operators['+'];
						}
						if (x >= ani.range.to) {
							x = ani.range.to;
							ani.op = ani.operators['-'];
						}
						window.setTimeout(
							function () {
								move(that, ani.op(x), f);
							},
							ani.timeout
						); 
					}
				};
			break;
			case 'stop':
				ani.next = function (that, x ,f) {
					if (ani.range.from <= x && x <= ani.range.to) {
						window.setTimeout(
							function () {move(that, ani.op(x), f); },
							ani.timeout
						);
					} else {
						return false;
					}
				};
			break;
			default : break;
		}
		
		move = function (that, x, f) {

			JMVC.css.style(that, {'left' : x + 'px', 'top' : f(x) + 'px'});
			ani.next(that, x ,f);
			
		};
		move(that, ani.range.from, func);
		
	},
	
	
	//	
	
	
	/*
	 sample
	JMVC.animator.follow_ppath(JMVC.dom.find('#anibull'),
		function(i){return 40-50*Math.cos(i/10);},
		function(i){return 40-70*Math.sin(i/10);},
		{from:0, to:3600},
		{mode:'back',threeD:function(i){return Math.cos(i/10)}}
	);
	 **/
	
	//parametric version
	follow_ppath : function (that, funcx, funcy, prange, options) {
		
		var ani = {},
			parent,
			//save initial font-size
			fsize = JMVC.num.getNum(JMVC.css.getComputedStyle(JMVC.WD.body, 'font-size'));
		
		ani.timeout = JMVC.object.inObject(options, 'timeout') ? options.timeout : 25;
		ani.mode = JMVC.object.inObject(options, 'mode') ? options.mode : 'repeat';
		ani.threeD = JMVC.object.inObject(options, 'threeD') ? options.threeD : false;
		ani.range = (
				prange && JMVC.object.inObject(prange, 'from')
				&&
				JMVC.object.inObject(prange, 'to')
			) ?
			prange : {from : 0, to : 10000};
		ani.next = function () {};
		ani.operators = {
			'+' : function (a) {return a + 1; },	
			'-' : function (a) {return a - 1; }
		};
		ani.op = ani.operators['+'];
		
		
		if (ani.threeD) {
			ani.nextOpacity = function () {};
		}
		
		
		JMVC.css.style(that, 'position', 'absolute');
		
		parent = JMVC.dom.parent(that);
		
		
		JMVC.css.style(parent, 'position', 'relative');
		
		switch (ani.mode) {
			case 'repeat':
				ani.next = function (that, t ,fx, fy) {
					if (t < ani.range.to) {
						window.setTimeout(
							function () {
								move(that, t + 1, fx, fy);
							},
							ani.timeout
						);
					} else {
						move(that, ani.range.from, fx, fy);
					}
				};
				
			break;
			case 'back':
				ani.next = function (that, t ,fx, fy) {
					if (ani.range.from <= t && t <= ani.range.to) {
						if (t === ani.range.from) {
							ani.op = ani.operators['+'];
						}
						if (t === ani.range.to) {
							ani.op = ani.operators['-'];
						}
						window.setTimeout(
							function(){ move(that, ani.op(t), fx, fy); },
							ani.timeout
						);
					}
				};
			break;
			case 'stop':
				ani.next = function (that, t ,fx, fy) {
					if (ani.range.from <= t && t <= ani.range.to) {
						window.setTimeout(
							function () {move(that, ani.op(t), fx, fy); },
							ani.timeout
						);
					} else {
						return false;
					}
				};
			break;
			default : break;
		}
		
		
		
		function move(that, t, fx, fy){
			var more,
				n;
			JMVC.css.style(that, {
				'left' : fx(t) + 'px',
				'top' : fy(t) + 'px'
			});

			if (ani.threeD) {
				more = ani.threeD(t);
				n = JMVC.num.getNum(fsize + (fsize * (1 - more))) + 'px';
				
				JMVC.css.style(that, {
					'opacity' : more,
					'font-size' : n
				});
			}
			ani.next(that, t ,fx, fy);
		};
		move(that, ani.range.from, funcx, funcy);
	}
});
