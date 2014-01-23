JMVC.extend('fx',{
	speed : 10,
	
	show : function(elem) { 
		JMVC.css.style(elem, 'display', 'block'); 
	},

	hide : function(elem) { 
		JMVC.css.style(elem, 'display', 'none'); 
	},
	
	toggle : function(elem){
		var disp = JMVC.css.style(elem, 'display'),
			hidd = (disp === 'none' || disp === '');
		this[hidd ? 'show' : 'hide'](elem);
		return this;
	},
	
	animate : function (el, prop, to, delta, cb) {
		(function () {
			var from = JMVC.num.getNum(JMVC.css.style(el, prop)),
				versus = from < to,
				end = false,
				t = JMVC.W.setInterval(
					function () {
						if (versus && from < to) {
							from += delta;
							end = from >= to;
							if (from > to) {
								from = to;
							}
						}
						if (!versus && from > to) {
							from -= delta;
							end = from <= to;
							if (from < to) {
								from = to;
							}
						} 
						
						JMVC.css.style(el, prop , from + 'px');
						if (end) {
							cb && cb();
							from = to;
							JMVC.W.clearInterval(t);
						}
					},
					25
				);
		})();
	},
	
	close : function (el, prop, str, inc, cb) {
		var timeout_me = function () {
			JMVC.W.setTimeout(
				function () {
					if (prop > 0) {
						prop = prop - inc;
					}
					JMVC.css.style(el, str , prop + 'px');
					
					if (prop <= 0) {
					
						JMVC.css.style(el, str, '0px');
						if(cb){cb();}
					} else {
						timeout_me();
					}
				}, 15
			);
		};
		timeout_me();
	},

	open : function (el, prop, str, inc, cb) {
		var self = this,
			base = 0,
			timeout_me = function () {
				JMVC.W.setTimeout(
					function () {
						if (base < prop) { 
							base = base + inc;
						}
						JMVC.css.style(el, str, base + 'px');
						if (base >= prop) {
							JMVC.css.style(el, str, prop + 'px');
							cb && cb();
						} else {
							timeout_me();
						}
					}, 15
				);
			};
		timeout_me();
	},
	//
	// used to remember sizes
	nodes_sizes : {},
	slideUp : function (el, v) {
		var height = JMVC.num.getNum(JMVC.css.style(el, 'height')),
			paddingTop = JMVC.num.getNum(JMVC.css.style(el, 'paddingTop')),
			paddingBottom = JMVC.num.getNum(JMVC.css.style(el, 'paddingBottom')),
			marginTop = JMVC.num.getNum(JMVC.css.style(el, 'marginTop')),
			marginBottom = JMVC.num.getNum(JMVC.css.style(el, 'marginBottom')),
			self = JMVC.fx;
		if (v && typeof v == 'number') {
			self.speed = v;
		}
		JMVC.css.style(el, 'overflow', 'hidden');
		
		this.nodes_sizes[el] = {
			height : isNaN(height) ? 0 : height,
			paddingTop : isNaN(paddingTop) ? 0 : paddingTop,
			paddingBottom : isNaN(paddingBottom) ? 0 : paddingBottom,
			marginTop : isNaN(marginTop) ? 0 : marginTop,
			marginBottom : isNaN(marginBottom) ? 0 : marginBottom
		};
		
		self.close(el, paddingTop, 'paddingTop',  paddingTop/self.speed);
		self.close(el, paddingBottom, 'paddingBottom',  paddingBottom/self.speed);
		self.close(el, marginTop, 'marginTop',  marginTop/self.speed);
		self.close(el, marginBottom, 'marginBottom',  marginBottom/self.speed);
		self.close(el, height, 'height',  height/self.speed, function(){self.hide(el); });
		
		return this;
	},

	slideDown : function (el, v) {
		var target = this.nodes_sizes[el],
			height = 0,
			paddingTop = 0,
			paddingBottom = 0,
			marginTop = 0,
			marginBottom = 0,
			self = JMVC.fx;

		if (v && typeof v =='number') {
			self.speed = v;
		}
		if (!target) {
			
			height = JMVC.num.getNum(JMVC.css.style(el, 'height'));
			paddingTop = JMVC.num.getNum(JMVC.css.style(el, 'paddingTop'));
			paddingBottom = JMVC.num.getNum(JMVC.css.style(el, 'paddingBottom'));
			marginTop = JMVC.num.getNum(JMVC.css.style(el, 'marginTop'));
			marginBottom = JMVC.num.getNum(JMVC.css.style(el, 'marginBottom'));
			
			this.nodes_sizes[el] = {
				height : isNaN(height) ? 0 : height,
				paddingTop : isNaN(paddingTop) ? 0 : paddingTop,
				paddingBottom : isNaN(paddingBottom) ? 0 : paddingBottom,
				marginTop : isNaN(marginTop) ? 0 : marginTop,
				marginBottom : isNaN(marginBottom) ? 0 : marginBottom
			};
			target = this.nodes_sizes[el];
			JMVC.css.style(el, 'height', '0px');
			JMVC.css.style(el, 'paddingTop', '0px');
			JMVC.css.style(el, 'paddingBottom', '0px');
			JMVC.css.style(el, 'marginTop', '0px');
			JMVC.css.style(el, 'marginBottom', '0px');
		}
		height = target['height'];
		paddingTop = target['paddingTop'];
		paddingBottom = target['paddingBottom'];
		marginTop = target['marginTop'];
		marginBottom = target['marginBottom'];
		
		self.show(el);
		
		self.open(el, marginTop, 'marginTop', marginTop/self.speed);
		self.open(el, paddingTop, 'paddingTop', paddingTop/self.speed);
		self.open(el, marginBottom, 'marginBottom',marginBottom/ self.speed);
		self.open(el, paddingBottom, 'paddingBottom', paddingBottom/self.speed);
		
		self.open(el, height, 'height', height/self.speed);
		return this;
	},

	slideToggle : function (el, v) {
		var vis = JMVC.css.style(el, 'display'),
			self = JMVC.fx;

		if (v && JMVC.util.isTypeOf(v, 'number')) {
			self.speed = v;
		}

		if (vis === 'none') {
			self.slideDown(el);
		} else {
			self.slideUp(el);
		}
	},
	
	fadeIn : function (el) {
		var opacity = 0.0,
			targets = {opacity : 1};
		JMVC.css.style(el, 'opacity', 0);

		this.show(el);	
		
		var timeout_me = function () {
			var timeout_up = JMVC.W.setTimeout(
				function () {
					if (opacity < targets.opacity) {
						opacity = parseFloat(opacity + 0.05);
					}
					JMVC.css.style(el,'opacity',opacity);	

					if (opacity >= targets.opacity) {
						JMVC.css.style(el, 'opacity',opacity);	
					} else {
						timeout_me();
					}
				},
				20
			);
		};
		timeout_me();	
		return this;
		
	},

	fadeOut : function (el) {
		var opacity = JMVC.css.getComputedStyle(el, 'opacity');
		this.nodes_sizes[el] = {opacity : 1};
		
		var timeout_me = function () {
			var timeout_up = JMVC.W.setTimeout(
				function () {
					if (opacity > 0) {
						opacity = opacity - 0.05;
					}
					
					JMVC.css.style(el,'opacity', opacity);

					if (opacity <= 0) {
						JMVC.css.style(el, 'opacity', 0);
					} else {
						timeout_me();
					}
				},
				20
			);
		};
		timeout_me();
		return this;
	}	
});
