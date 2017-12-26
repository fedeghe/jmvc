{
	tag : "li",
    data : {
    	autoplay : "#PARAM{autoplay|0}"
    },
    attrs : {'class':'round8'},
    style : {
    	backgroundColor : "#PARAM{bgcolor|white}"
    },
    content : [{
    	style : {height:"inherit", width:"100%",paddingTop:'20px'},
	    content : [{
			tag : "div",
			style : {height:"inherit", width:"100%"},
			content : [{
				tag : "video",
				style : {width:"50%", height:"auto", outline:"0 none", verticalAlign:"middle", backgroundColor:'transparent'},
				attrs : {controls : "", "class":"floatl"},
				content : [{
					tag : "source",
					attrs : {type:"video/mp4", src:"#PARAM{mp4Url}"}
				},{
					tag : "source",
					attrs : {type:"video/ogg", src:"#PARAM{oggUrl}"}
				}]
			},{
				style : {
					width:'50%'
				},
				attrs : {"class":"floatl"},
				content : [{
					style : {padding:'10px'},
					content : [{
						tag : 'h1',
						html : "#PARAM{heading}",
						style : {
							marginBottom : '10px'
						}
					},{
						tag : 'p',
						html : "#PARAM{text}"
					}]
				}]
			}, 'clearer']
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

		JMVC.Channel(cid).sub('move', moved);
		JMVC.Channel(cid).sub('moved', moved);
		

		self.done();
	}
}