/**
 * based on http://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
 */
JMVC.extend('events', {
	
	vars : {
		cb : false
	},

	disable_scroll : function (node) {
		node = node || JMVC.WD.body; 
		this.vars.overflow = node.style['overflow'];
		JMVC.WD.body.style.overflow = 'hidden';
	},

	enable_scroll : function (node) {
		node = node || JMVC.WD.body;
		node.style['overflow'] = this.vars.overflow;
	},

	onScroll : function (el, cback) {

		JMVC.events.vars.cb = cback;
		
		JMVC.events.on(el, 'mouseover', function (e) {
			
			JMVC.W.addEventListener 
			&& JMVC.W.addEventListener('DOMMouseScroll', JMVC.events.vars.cb, false);

			JMVC.W.onmousewheel = JMVC.WD.onmousewheel = JMVC.events.vars.cb;
			
			JMVC.events.preventDefault(e);
		});
		JMVC.events.on(el, 'mouseout', function () {
			//JMVC.events.enable_scroll();
		});
		
	}
	
});

