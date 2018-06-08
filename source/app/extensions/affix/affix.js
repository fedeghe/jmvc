// type : LIB
JMVC.extend('affix', {
	
	init : function () {
		JMVC.require('core/screen/screen');

		JMVC.affix.vars = {index : 0, pool : {}};
		
		JMVC.events.end(function () {

			function react() {
				var j, style,
					c = JMVC.screen.getScreenData(),
					t = c.scrollTop;

				for (j in JMVC.affix.vars.pool) {

					style = (t > JMVC.affix.vars.pool[j].top - JMVC.affix.vars.pool[j].mintop) ?
						{position : 'fixed', top : JMVC.affix.vars.pool[j].mintop + 'px'}
						:
						{position : 'absolute', top : JMVC.affix.vars.pool[j].top + 'px'};

					JMVC.css.style(JMVC.affix.vars.pool[j].node, style);
				}
			}

			JMVC.events.on(JMVC.W, 'scroll', react);
			
			JMVC.events.ready(react);
		});
	},
	
	add : function (options) {

		var tmp = new function (opt) {
			this.html = opt.html ||'no content';

			this.top = opt.init || 100;

			this.mintop = opt.min || 10;

			this.style = opt.style || '';

			this['class'] = opt['class'] || '';
			
			this.node = JMVC.dom.create('div', {
					//'style' : 'position:absolute;top:' + this.top + 'px;' + this.style,
					'style' : this.style,
					'class' : this.class
				},
				this.html
			);
		}(options);
			
		JMVC.affix.vars.index += 1;
		JMVC.affix.vars.pool[JMVC.affix.vars.index] = tmp;
		JMVC.dom.append(JMVC.dom.find(options.where) || JMVC.dom.body(), tmp.node);
	}
});
