JMVC.extend('affix', {
	'init' : function () {
		JMVC.require('dim', 'css');
		JMVC.affix.vars = {
			index : 0,
			pool : {}
		};
		JMVC.events.end(function () {
			JMVC.events.bind(JMVC.W, 'scroll', function () {
				var c = JMVC.dim.getScreenData(),
					t = c.scrollTop,
					j;
				for (j in JMVC.affix.vars.pool) {
					if (t > JMVC.affix.vars.pool[j].top - JMVC.affix.vars.pool[j].mintop) {
						JMVC.css.style(JMVC.affix.vars.pool[j].node, 'top', (t + JMVC.affix.vars.pool[j].mintop) + 'px');
					} else {
						JMVC.css.style(JMVC.affix.vars.pool[j].node, 'top', JMVC.affix.vars.pool[j].top + 'px');
					} 
				}
			});
		});
		
		
	},
	'add' : function () {
		
		function El () {
			var a = arguments[0];
			this.html = a.html ||'no content';
			this.top = a.init || 100;
			this.mintop = a.min || 10;
			this.style = a.style || '';
			this.node = JMVC.dom.create(
				'div',
				{
					'style' : 'position:absolute;top:' + this.top + 'px;' + this.style
				},
				this.html
			);
		}
		
		JMVC.affix.vars.index += 1;
		
		var tmp = new El(arguments[0]);
		
		JMVC.affix.vars.pool[JMVC.affix.vars.index] = tmp;
		
		JMVC.dom.append(JMVC.dom.body(), tmp.node);
	},
	'remove' : function () {}
});


