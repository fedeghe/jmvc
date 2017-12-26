JMVC.controllers.hotBox = function () {
	'use strict';
	JMVC.css.autoHeadings();
	JMVC.css.fontAwesome();
	JMVC.require(
		'core/lib/hotBox/hotBox'
	);
	this.action_index = function () {
		var B = JMVC.WDB,
			els = [],
			num = 2000,
			squareSize = 50;
		while (num--) {
			els.push({
				attrs : {
					"class" : "respfixed fa fa-battery-empty"
				},
				style:{
					'float':'left',
					width: squareSize+'px',
					height:squareSize+'px',
					backgroundColor:'gray',
					outline :'1px solid gray',
					lineHeight:squareSize+'px',
					textAlign:'center',
					fontSize : squareSize / 2 + 'px'
				},
				data : {
					classes : [{
						cls : 'fa-battery-empty',
						col : '#000'
					},{
						cls:'fa-battery-1',
						col : '#030'
					},{
						cls : 'fa-battery-2',
						col : '#060'
					},{
						cls:'fa-battery-3',
						col : '#090'
					},{
						cls:'fa-battery-4',
						col : '#0b0'
					}]
				},
				// html : '<span class="fa fa-battery-empty"></span>',
				cb : function () {
					var self = this,
						c,
						speed = 100;
					JMVC.core.hotBox(
						self.node,
						function () {
							var n = this;
							for (var i = 0; i < 4; i++){
								setTimeout(function (j) {
									JMVC.dom.switchClass(n, self.data.classes[j].cls, self.data.classes[j + 1].cls);
									JMVC.css.style(n, {color : self.data.classes[j].col});
								}, speed * i, i);
							}
							setTimeout(function () {
								JMVC.dom.setClass(n, 'fa fa-battery-4');
								n.style.color = c = "#0b0";
							}, speed*5);
							
						},
						function () {
							var n = this;
							for (var i = 0; i < 4; i++){
								setTimeout(function (j) {
									JMVC.dom.switchClass(n, self.data.classes[j].cls, self.data.classes[j - 1].cls);
									JMVC.css.style(n, {color : self.data.classes[j].col});
								}, speed * i, 4-i);
							}
							setTimeout(function () {
								JMVC.dom.setClass(n, 'fa fa-battery-empty');
								n.style.color = c = '#000';
							}, speed*5);
							
						},
						false
					);
					JMVC.events.on(this.node, 'click', function () {
						var current = this.style.backgroundColor;

						this.style.backgroundColor = current == 'yellow' ? c : 'yellow';
					})
					self.done();
				}
			});
		}
		els.push({tag : 'br', style: {clear : 'both'}});

		

		JMVC.core.widgzard.render({
			target : B,
			style : {backgroundColor:'yellow',fontFamily:"Verdana"},
			cb : function () {
				
				console.debug('done')
			},
			content : [{
				content : [{
					tag : 'h1',
					style : {margin:'10px'},
					html : 'hotBox : react to visibility'
				},{
					tag : "p",
					style : {margin:'10px',lineHeight:"20px",width:"50%"},
					html : "All small squares would have a gray background, but as far as most of their area in visible in the viewport a fucntion for example change they background color to green. After that, when more than 50% of they area is hidden a function can for example turn their background color to red."
				}]
			},{
				content : els
			}]
		});
	}
};