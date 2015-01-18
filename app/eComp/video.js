{
	tag : "li",
    data : {
    	autoplay : "#PARAM{autoplay}",
    	onEnd : "#PARAM{onEnd}",
    	controls : "#PARAM{controls}"
    },
    attrs : {'class':'round8'},
    style : {
    	backgroundColor : "#PARAM{bgcolor|white}"
    },
    content : [{
    	style : {height:"inherit", width:"100%"},
	    content : [{
			tag : "div",
			style : {
				// textAlign:"center",
				height:"inherit",
				width:"100%",
				position:'relative'
			},
			content : [{
				tag : "video",
				style : {width:"inherit", height:"inherit"},
				//attrs : {controls : ""},
				content : [{
					tag : "source",
					attrs : {type:"video/mp4", src:"#PARAM{mp4Url}"}
				},{
					tag : "source",
					attrs : {type:"video/ogg", src:"#PARAM{oggUrl}"}
				}],
				cb : function () {
					if(this.climb(3).data.controls) {
						this.node.setAttribute('controls', "");
					}
					this.done();
				}
			}]
		}]
	}],
	cb : function () {
		var self = this,
			// instead of self.parentNode.parentNode.parentNode.parentNode.data.id
			// 
			cid = self.climb(4).data.id,
			
			// instead of self.item(0).children.item(0).children.item(0);
			//
			v = self.descendant(0,0,0).node,

			timeOut = window.setTimeout(function () {}, 0),


			moved = function (topic, from, to) {
				window.clearTimeout(timeOut);
				if (v.played.length) {
					v.pause();
					v.load();
				}
				
				// autoplay ? 
				if (
					self.node.getAttribute('data-num') == to
					&&
					self.data.autoplay
				) {
					timeOut = window.setTimeout(function () {
						v.play();
					}, 500);
				}
			};

		
		if (self.data.onEnd) {
			JMVC.events.on(v, 'ended', function () {
				var onend = self.data.onEnd,
					replace =  true;
				if (onend.data && onend.data.appendMode) replace = false;
				onend.target = self.descendant(0,0).node;
				onend.cb = function () {
					JMVC.Channel(cid).unsub('moved', moved);
				};
				JMVC.core.widgzard.render(onend, replace);
			});
		}
		
		JMVC.Channel(cid).sub('move', moved);
		JMVC.Channel(cid).sub('moved', moved);
		
		self.done();
	}
}