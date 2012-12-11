JMVC.extend('grind', {
	
	init : function () {
		JMVC.head.addstyle(JMVC.vars.extensions + 'lib/grind/default.css', true, false);
	},
	
	render : function render(conf, t, trg){
		
		var j = ~~t,
			c = conf[j],
			next = conf[j+1],
			s = document.createElement('div'),
			target = (c['target']&& JMVC.dom.find(c['target'])) || trg;
		//console.debug(typeof c)
		if(c === 'clear'){c = {"class":"gclear"};}
		if(typeof c["class"] !== undefined) {s.className = 'gbox ' + c['class']; }
		if(typeof c["float"] !== undefined) {s.style.cssFloat = c["float"]; }
		if(typeof c['attrs'] !== undefined) {
			for(var i in c['attrs']) {s.setAttribute(i, c['attrs'][i]); }
		}
		if(c["style"] != undefined) {
			for(var i in c['style']) {
				console.debug(i ,c['style'][i])
				s.style[i] = c['style'][i];
			}
		}
		target.appendChild(s);	
		
		if(c.inner == undefined){
			s.innerHTML = '&nbsp;';
		} else {
			JMVC.grind.render(c.inner, 0, s);
		}
		next && (
			JMVC.grind.render(conf, j+1, target)
		);
		
	}
});


