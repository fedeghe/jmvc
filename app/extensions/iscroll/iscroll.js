JMVC.extend('iscroll', {
	init : function () {
		JMVC.require('event_scroll/event_scroll', 'core/fx/fx');
		console.debug('infinite scroll initialized')
	},
	create : function (node, ajurl, num) {
		var active  = true,
			waitnode,
			triggerPadd = 50,
			mode = 1,
			height = 0,
			appended = false,
			timeout = false;
			// 1 limit before append
			// 2 

		function append(where){
			console.debug(where)
			var cnt = {top : '&uArr;', bottom : '&dArr;'};
			if(!cnt[where]) {return false; }
			waitnode = JMVC.dom.create('div', {'id' : 'JMVC_waitnodeiscroll', 'style':'text-align:center;height:0px; background-color:gray;line-height:0px;color:white;text-size:0px'}, cnt[where]);
			if(where == 'top') {
				JMVC.dom.prepend(node, waitnode);
				return true;
			} else if (where == 'bottom') {
				JMVC.dom.append(node, waitnode);
				return true;
			}
			return false;

		}

		JMVC.events.onScroll(node, function (e) {

			if (!active) {return false; }
			//
			var detail = -e.detail || e.wheelDelta,
				incr = detail>0 ? 1 : -1;

			var de, se, st, ch;
			switch (node) {
				case JMVC.WD.body :
					de = JMVC.WD.documentElement;
					se = de.scrollHeight;
					st = de.scrollTop || window.pageYOffset;
					ch = de.clientHeight;
				break;
				default :
					se = node.scrollHeight;
					st = node.scrollTop;
					ch = node.clientHeight; 
				break;
			}

			//after bottom
			if (st > 0 && se == (st + ch) && incr < 0) {
				switch (mode) {
					case 1 :
						!appended && (appended = append('bottom'));
						
						//var tmpnode = JMVC.dom.find('#JMVC_waitnodeiscroll');
						timeout && JMVC.W.clearTimeout(timeout);
						
						height += 2;
						JMVC.css.style(waitnode,{
							'height' :  height + 'px',
							'fontSize' : height + 'px',
							'lineHeight' : height + 'px'
						});
						//JMVC.css.style(waitnode, 'fontSize', height + 'px');
						//JMVC.css.style(waitnode, 'lineHeight', height + 'px');
						if (height == triggerPadd){
							JMVC.W.clearTimeout(timeout);
							mode = 2;
							appended = false;
							console.debug('now unactive');
							height = 0;
						} else {
							timeout = JMVC.W.setTimeout(
								function () {
									JMVC.fx.animate(waitnode, 'height', 0, 5, function () {
										height = 0;
										JMVC.W.clearTimeout(timeout);
										active = true;
										appended = false;
										JMVC.dom.remove(waitnode);
										mode = 1;
									});
								},
								1000
							);
						}
					break;
					case 2 :
						active = false;
						console.debug('cb');
						window.setTimeout(function () {
							console.debug('now active');
							active = true;
							appended = false;
							JMVC.dom.remove(waitnode);
							mode = 1;
						}, 3000);
					break;
				}



				
			//over top
			} else if(st == 0 && incr > 0){



				switch(mode){
					case 1 :
						!appended && (appended = append('top'));
						//var tmpnode = JMVC.dom.find('#JMVC_waitnodeiscroll');
						timeout && JMVC.W.clearTimeout(timeout);
						
						
						height += 2;
						JMVC.css.style(waitnode,{
							'height' :  height + 'px',
							'fontSize' : height + 'px',
							'lineHeight' : height + 'px'
						});
						if (height == triggerPadd){
							JMVC.W.clearTimeout(timeout);
							mode = 2;
							appended = false;
							console.debug('now unactive');
							height = 0;
						
						} else {
							timeout = JMVC.W.setTimeout(
								function () {
									JMVC.fx.animate(waitnode, 'height', 0, 5, function () {
										height = 0;
										JMVC.W.clearTimeout(timeout);
										active = true;
										appended = false;
										JMVC.dom.remove(waitnode);
										mode = 1;
									});
								},
								1000
							);
						}
					break;
					case 2 :
						
						active = false;
						console.debug('cb');
						window.setTimeout(function () {
							console.debug('now active');
							active = true;
							appended = false;
							JMVC.dom.remove(waitnode);
							mode = 1;
						}, 3000);
						
					break;
				}














				
			}
		})
	}
});




