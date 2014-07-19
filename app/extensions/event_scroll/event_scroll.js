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
		/*
		if (JMVC.W.addEventListener) {
			JMVC.W.addEventListener('DOMMouseScroll', JMVC.events.preventDefault, false);
		}
		JMVC.W.onmousewheel = JMVC.WD.onmousewheel = JMVC.events.preventDefault;
		JMVC.WD.onkeydown = function(e) {
			///arrow codes
			var k = [37, 38, 39, 40],
				i = k.length
			while (i--) {
				if (e.keyCode === k[i]) {
					JMVC.events.preventDefault(e);
					return;
				}
			}
		};
		*/
	   //JMVC.W.onmousewheel = JMVC.WD.onmousewheel = JMVC.events.preventDefault;
	},
	enable_scroll : function (node) {
		node = node || JMVC.WD.body;
		node.style['overflow'] = this.vars.overflow;
		


		/*
		if (JMVC.events.vars.cb) {
			JMVC.W.removeEventListener('DOMMouseScroll', JMVC.events.vars.cb, false);
		}*/

		/*
		if (JMVC.W.removeEventListener) {
			JMVC.W.removeEventListener('DOMMouseScroll', JMVC.events.preventDefault, false);
			if(JMVC.events.vars.cb){
				JMVC.W.removeEventListener('DOMMouseScroll', JMVC.events.vars.cb, false);
			}
		}
		*/
	   //JMVC.W.onmousewheel = JMVC.WD.onmousewheel = JMVC.WD.onkeydown = null;
		
	   //JMVC.WD.body.style.overflow = 'visible';
	},
	onScroll : function (el, cback) {
		JMVC.events.vars.cb = function (e) {
			cback(e);
			//JMVC.events.preventDefault;
		}
		
		JMVC.events.on(el, 'mouseover', function (e) {
			//JMVC.events.disable_scroll();
			
			if (JMVC.W.addEventListener) {
				JMVC.W.addEventListener('DOMMouseScroll', JMVC.events.vars.cb, false);
			}
			JMVC.W.onmousewheel = JMVC.WD.onmousewheel = JMVC.events.vars.cb;
			
			JMVC.events.preventDefault(e);
		});
		JMVC.events.on(el, 'mouseout', function () {
			//JMVC.events.enable_scroll();
		});
		
	}
	
});

