JMVC.core.widgzard && JMVC.hook({"onAfterRender" : function(cnt){
	var Wid = JMVC.core.widgzard,
		done = JMVC.cookie.get('EUlaw');

	!done && Wid.render({
		content : [{
			wid : 'cookieEU',
			style : {
				position:'fixed',
				bottom : '0px',
				padding : '10px',
				margin : '1%',
				left:'0px',
				backgroundColor:'#ddd',
				width:'98%',
				zIndex:999
			},
			attrs : {'class':'round8 group'},
			content : [{
				attrs : {'class':'floatl'},
				style : {
					width:'95%'
				},
				html : 'This site uses cookies'
			},{
				attrs : {'class':'floatr round8'},
				style : {
					width:'5%',
					textAlign : 'center',
					color:'white',
					backgroundColor:'black',
					width : '20px',
					height : '20px',
					fontSize : '20px',
					lineHeight:'18px',
					cursor : 'pointer'
				},
				html : '&times;',
				cb : function () {
					var self = this,
						$elf = self.node;
					JMVC.events.on($elf, 'click', function (){
						JMVC.dom.remove(self.getNode('cookieEU').node);
					});
					self.done();
				}
			},{
				attrs : {
					'class':'floatr round8'
				},
				style : {
					marginRight : '10px',
					color:'green',
					cursor : 'pointer'
				},
				html : 'ACCEPT',
				
				cb : function () {
					var self = this,
						$elf = self.node;
					JMVC.events.on($elf, 'click', function (){
						JMVC.dom.remove(self.getNode('cookieEU').node);
						var oneYearMilliseconds = 1000 * 60 * 60 * 24 * 365;
						JMVC.cookie.set('EUlaw', 'approved', oneYearMilliseconds, '/', document.location.host.replace('www.', ''));
						done = true;
					});
					this.done();
				}
			}]

		}]
	});

}});