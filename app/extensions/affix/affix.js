JMVC.extend('affix', {
	
	init : function () {
		JMVC.require('core/dim', 'core/css');

		JMVC.affix.vars = {
			index : 0,
			pool : {}
		};
		
		JMVC.events.end(function () {

			function react() {
				var j, top, doit,
					c = JMVC.dim.getScreenData(),
					t = c.scrollTop;

				for (j in JMVC.affix.vars.pool) {

					doit = (t > JMVC.affix.vars.pool[j].top - JMVC.affix.vars.pool[j].mintop);
					top = doit ? 
						t + JMVC.affix.vars.pool[j].mintop
						:
						JMVC.affix.vars.pool[j].top;

					JMVC.css.style(JMVC.affix.vars.pool[j].node, 'top', top + 'px');

					JMVC.css.style(
						JMVC.affix.vars.pool[j].node,
						doit ? {'position':'fixed', 'top' : JMVC.affix.vars.pool[j].mintop + 'px'} : {'position':'absolute'}
					);
				}
			}

			JMVC.events.bind(JMVC.W, 'scroll', react);
			JMVC.events.ready(react);
		});
	},
	
	add : function (where) {
		var tmp = new function () {
			var a = arguments[0];
			this.html = a.html ||'no content';
			this.top = a.init || 100;
			this.mintop = a.min || 10;
			this.style = a.style || '';
			this['class'] = a['class'] || '';
			this.node = JMVC.dom.create('div', {
					'style' : 'position:absolute;top:' + this.top + 'px;' + this.style,
					'class' : this.class
				},
				this.html
			);
		}(arguments[0]);
			
		JMVC.affix.vars.index += 1;
		JMVC.affix.vars.pool[JMVC.affix.vars.index] = tmp;
		JMVC.dom.append(JMVC.dom.find(arguments[0].where) || JMVC.dom.body(), tmp.node);
	}
});
