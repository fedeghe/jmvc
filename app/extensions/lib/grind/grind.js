JMVC.extend('grind', {
	
	init : function () {
		"use strict";
		JMVC.head.addstyle(JMVC.vars.extensions + 'lib/grind/grind.css');
	},
	
	render : function (conf, bodyClass) {
		"use strict";
		bodyClass && JMVC.dom.addClass(document.body, bodyClass);
		this._render(conf);
	},

	_render : function render(conf, t, trg) {
		"use strict";
		var j = ~~t,
			i,
			c = conf[j],
			next = conf[j+1],
			tag = 'div',
			s,
			target = (c['target']&& JMVC.dom.find(c['target'])) || trg,
			//cnt = '&nbsp;';
			cnt = '';
		
		if (c === 'clearer') {
			tag = 'br';
			c = {"class":"clearer"};
			cnt = false;
		}
		c.tag && (tag = c.tag);

		s = document.createElement(tag);
		s.className =  (!!(c['class']) ? c['class'] : '') + (tag !== 'br' ? ' gbox' : '') ;
		
		if (typeof c["float"] !== 'undefined') {
			s.style.cssFloat = c["float"];
		}
		if (typeof c['attrs'] !== 'undefined') {
			for (i in c['attrs']) {
				s.setAttribute(i, c['attrs'][i]);
			}
		}
		if (c["style"] !== undefined && tag !== 'br') {
			for (i in c['style']) {
				s.style[i] = c['style'][i];
			}
		}
		target.appendChild(s);
		

		
		if (c.inner == undefined) {
			if (cnt !== false) {
				s.innerHTML = c.html || cnt;
			}
		} else {
			JMVC.grind._render(c.inner, 0, s);
		}
		next && (
			JMVC.grind._render(conf, j + 1, target)
		);
		
	}
});


