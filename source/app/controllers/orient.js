JMVC.require('core/lib/cookieMonster/cookieMonster');
JMVC.controllers.orient = function() {

	'use strict';

	var self = this;

    this.before = function() {
		//JMVC.events.loadify(1000);
		self.startController = JMVC.util.now();
		JMVC.debug(-2)
	};

	this.before_index = this.before_flag = function() {
		self.startAction = JMVC.util.now();
		JMVC.debug(-1)
	};

	this.after_index = this.after_flag = function() {
		self.endAction = JMVC.util.now();
		JMVC.debug(1)
	};



	this.action_drawer = function (){
		JMVC.require(
			'core/mobile/drawer/drawer',
			'core/lorem'
		);
		
		JMVC.getView('vacuum')
		.set({
			style: '',
			id: 'container',
			'content': ''
		})
		.render(function() {

			document.body.style.backgroundColor = 'red';

			document.body.style.padding = '50px';

			document.body.innerHTML = JMVC.string.lorem(500);
			
			var drawer = JMVC.mobile.drawer.create([{
		        label : 'JMVC logo',
		        href : '/demo/logo.html'
		    },{
		        label : 'Google logo plotted',
		        href : '/google.jmvc'
		    },{
		        label : 'Google logo plotted flash',
		        href : '/google.jmvc?flash'
		    },{
		        label : 'Google logo plotted aberration',
		        href : '/google.jmvc?aberrate'
		    }]);

		    drawer.render();
		});
	};

	this.action_shadow = function (){
		var that = this;
		JMVC.require(
			'core/mobile/drawer/drawer',
			'core/lorem',
			'plotter/shadowMatrix'
		);

		JMVC.head.title('JMVC plotter example');
		
		JMVC.getView('vacuum')
		.set({
			style: 'padding:0px 10px 50px',
			id: 'container'
		})
		.render(function() {

			
			var size = that.get('size') || 5,
				cnt = JMVC.dom.find('#container'),
				flag = JMVC.dom.create('div', {id:'flag'}),
				space1 = JMVC.dom.create('div', {id:'space1'}),
				space2 = JMVC.dom.create('div', {id:'space2'}),
				space3 = JMVC.dom.create('div', {id:'space3'}),
				space4 = JMVC.dom.create('div', {id:'space4'}),
				space5 = JMVC.dom.create('div', {id:'space5'}),
				mario = JMVC.dom.create('div', {id:'mario'}),
				pacman = JMVC.dom.create('div', {id:'pacman'}),
				dimonni = JMVC.dom.create('div', {id:'dimonni'}),

				ul = JMVC.dom.create('div'),
				li0 = JMVC.dom.add(ul, 'div', {style:'margin:20px'}),
				li1 = JMVC.dom.add(ul, 'div', {style:'margin:20px'}),
				li2 = JMVC.dom.add(ul, 'div', {style:'margin:20px'}),
				li3 = JMVC.dom.add(ul, 'div', {style:'margin:20px'}),
				li4 = JMVC.dom.add(ul, 'div', {style:'margin:20px'}),
				li5 = JMVC.dom.add(ul, 'div', {style:'margin:20px'}),
				li6 = JMVC.dom.add(ul, 'div', {style:'margin:20px'}),
				li7 = JMVC.dom.add(ul, 'div', {style:'margin:20px'}),
				li8 = JMVC.dom.add(ul, 'div', {style:'margin:20px'});

			JMVC.css.style(JMVC.WDB, {padding : '50px'});

			JMVC.dom.append(li0, flag);
			JMVC.dom.append(li1, space1);
			JMVC.dom.append(li2, space2);
			JMVC.dom.append(li3, space3);
			JMVC.dom.append(li4, space4);
			JMVC.dom.append(li5, space5);
			JMVC.dom.append(li6, mario);
			JMVC.dom.append(li7, pacman);
			JMVC.dom.append(li8, dimonni);
			JMVC.dom.append(cnt, ul);
			JMVC.dom.append(JMVC.WDB, cnt);

			var sm0 = JMVC.shadowMatrix({
					scale : size,
					matrix : [
						'.,.,.,.,.,.,.,.,.,.,.,.,.,.',
						'.,.,.,.,.,.,.,.,.,.,.,.,.,.',
						'.,.,.,.,.,.,O,O,.,.,.,.,.,.',
						'.,.,.,.,.,.,O,O,.,.,.,.,.,.',
						'.,.,.,.,O,O,O,O,O,O,.,.,.,.',
						'.,.,.,.,O,O,O,O,O,O,.,.,.,.',
						'.,.,.,.,.,.,O,O,.,.,.,.,.,.',
						'.,.,.,.,.,.,O,O,.,.,.,.,.,.',
						'.,.,.,.,.,.,.,.,.,.,.,.,.,.',
						'.,.,.,.,.,.,.,.,.,.,.,.,.,.',
					],
					colorMap : {
						'O' : 'transparent',
						'.' : 'red'
					}
				}),
				sm1 = JMVC.shadowMatrix({
					scale : size,
					matrix : [
						' , ,L,#,#,R, , ',
						' ,L,#,#,#,#,R, ',
						'L,#,#,#,#,#,#,R',
						'#,#, ,#,#, ,#,#',
						'#,#,#,#,#,#,#,#',
						' ,#, ,#,#, ,#, ',
						'#, , , , , , ,#',
						' ,#, , , , ,#, '
					],
					colorMap :  {
						'L' : [JMVC.shadowMatrix.triUL, {color : '#'}],
						'R' : [JMVC.shadowMatrix.triUR, {color : '#'}],
						'#' : '#0a0',
						' ' : 'transparent'
					}
				}),
				sm2 = JMVC.shadowMatrix({
					scale : size,
					matrix : [
						' , ,#, , , , , ,#, , ',
						' , , ,#, , , ,#, , , ',
						' , ,#,#,#,#,#,#,#, , ',
						' ,#,#, ,#,#,#, ,#,#, ',
						'#,#,#,#,#,#,#,#,#,#,#',
						'#, ,#,#,#,#,#,#,#, ,#',
						'#, ,#, , , , , ,#, ,#',
						' , , ,#,#, ,#,#, , , '
					],
					colorMap : {
						'#' : '#008',
						' ' : 'transparent'
					}
				}),
				sm3 = JMVC.shadowMatrix({
					scale : size,
					matrix : [
						' , , , ,#,#,#,#, , , , ',
						' ,#,#,#,#,#,#,#,#,#,#, ',
						'#,#,#,#,#,#,#,#,#,#,#,#',
						'#,#,#, , ,#,#, , ,#,#,#',
						'#,#,#,#,#,#,#,#,#,#,#,#',
						' , ,#,#,#, , ,#,#,#, , ',
						' ,#,#, , ,#,#, , ,#,#, ',
						' , ,#,#, , , , ,#,#, , '
					],
					colorMap : {
						'#' : '#DD127D',
						' ' : 'transparent'
					}
				}),
				sm4 = JMVC.shadowMatrix({
					scale : size,
					matrix : [
						' , , , , ,#,#,#,#,#,#, , , , , ',
						' , , ,#,#,#,#,#,#,#,#,#,#, , , ',
						' , ,#,#,#,#,#,#,#,#,#,#,#,#, , ',
						' ,#,#, ,#,#, ,#,#, ,#,#, ,#,#, ',
						'#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#',
						' , ,#,#,#, , ,#,#, , ,#,#,#, , ',
						' , , ,#, , , , , , , , ,#, , , '
					],
					colorMap : {
						'#' : '#ffdd00',
						' ' : 'transparent'
					}
				}),
				sm5 = JMVC.shadowMatrix({
					scale : size,
					matrix : [
						' , , , , , , ,#, , , , , , , ',
						' , , , , , ,#,#,#, , , , , , ',
						' , , , , , ,#,#,#, , , , , , ',
						' ,#,#,#,#,#,#,#,#,#,#,#,#,#, ',
						'#,#,#,#,#,#,#,#,#,#,#,#,#,#,#',
						'#,#,#,#,#,#,#,#,#,#,#,#,#,#,#',
						'#,#,#,#,#,#,#,#,#,#,#,#,#,#,#',
						'#,#,#,#,#,#,#,#,#,#,#,#,#,#,#'
					],
					colorMap : {
						'#' : '#0f0',
						' ' : 'transparent'
					}
				}),
				sm6 = JMVC.shadowMatrix({
					scale : size,
					matrix : [
						' , , ,#,#,#,#,#, , , , ',
						' , ,#,#,#,#,#,#,#,#,#, ',
						' , ,@,@,@,$,$,@,$, , , ',
						' ,@,$,@,$,$,$,@,$,$,$, ',
						' ,@,$,@,@,$,$,$,@,$,$,$',
						' ,@,@,$,$,$,$,@,@,@,@, ',
						' , , ,$,$,$,$,$,$,$, , ',
						' , ,@,@,#,@,@,@, , , , ',
						' ,@,@,@,#,@,@,#,@,@,@, ',
						'@,@,@,@,#,#,#,#,@,@,@,@',
						'$,$,@,#,$,#,#,$,#,@,$,$',
						'$,$,$,#,#,#,#,#,#,$,$,$',
						'$,$,#,#,#,#,#,#,#,#,$,$',
						' , ,#,#,#, , ,#,#,#, , ',
						' ,@,@,@, , , , ,@,@,@, ',
						'@,@,@,@, , , , ,@,@,@,@'
					],
					colorMap : {
						'#' : '#db0102',// red
						'$' : '#f8aa00',// skin
						'@' : '#706700',// hair
						' ' : 'transparent'
					}
				}),
				sm7 = JMVC.shadowMatrix({
					scale : size,
					matrix : [
						' , , ,y,y,y,y,y, , , , , , , , , , , , , , , , ,p,p,p,p, , , , , , , , , , , , , , , , , ,c,c,c,c, , , , , ',
						' ,y,y,y,y,y,y,y,y,y, , , , , , , , , , , , ,p,p,p,p,p,p,p,p, , , , , , , , , , , , , ,c,c,c,c,c,c,c,c, , , ',
						'y,y,y,y,y,y,y,y,y,y,y, , , , , , , , , , ,p,p,p,p,p,p,p,p,p,p, , , , , , , , , , , ,c,c,c,c,c,c,c,c,c,c, , ',
						'y,y,y,y,y,y,y,y,y,y,y, , , , , , , , , ,p,p,p, , ,p,p,p,p, , ,p, , , , , , , , , ,c,c, , ,c,c,c,c, , ,c,c, ',
						' , ,y,y,y,y,y,y,y,y,y,y, , , , , , , , ,p,p, , , , ,p,p, , , , , , , , , , , , , ,c, , , , ,c,c, , , , ,c, ',
						' , , , , , ,y,y,y,y,y,y, , , , , , , , ,p,p, , ,E,E,p,p, , ,E,E, , , , , , , , , ,c, ,E,E, ,c,c, ,E,E, ,c, ',
						' , , , , , , , ,y,y,y,y, , , , , , , ,p,p,p, , ,E,E,p,p, , ,E,E,p, , , , , , , ,c,c, ,E,E, ,c,c, ,E,E, ,c,c',
						' , , , , , ,y,y,y,y,y,y, , , , , , , ,p,p,p,p, , ,p,p,p,p, , ,p,p, , , , , , , ,c,c,c, , ,c,c,c,c, , ,c,c,c',
						' , ,y,y,y,y,y,y,y,y,y,y, , , , , , , ,p,p,p,p,p,p,p,p,p,p,p,p,p,p, , , , , , , ,c,c,c,c,c,c,c,c,c,c,c,c,c,c',
						'y,y,y,y,y,y,y,y,y,y,y, , , , , , , , ,p,p,p,p,p,p,p,p,p,p,p,p,p,p, , , , , , , ,c,c,c,c,c,c,c,c,c,c,c,c,c,c',
						'y,y,y,y,y,y,y,y,y,y,y, , , , , , , , ,p,p,p,p,p,p,p,p,p,p,p,p,p,p, , , , , , , ,c,c,c,c,c,c,c,c,c,c,c,c,c,c',
						' ,y,y,y,y,y,y,y,y,y, , , , , , , , , ,p,p, ,p,p,p, , ,p,p,p, ,p,p, , , , , , , ,c,c, ,c,c,c, , ,c,c,c, ,c,c',
						' , , ,y,y,y,y,y, , , , , , , , , , , ,p, , , ,p,p, , ,p,p, , , ,p, , , , , , , ,c, , , ,c,c, , ,c,c, , , ,c'
					],
					colorMap : {
						' ' : 'transparent',
						'y' : '#ff0',// red
						'r' : '#f00', // skin
						'p' : '#faa', //hair
						'a' : '#aaf', //hair
						'c' : 'coral', //hair
						'o' : '#f83',
						'E' : '#005'
					}
				}),
				sm8 = JMVC.shadowMatrix({
	                scale : size,
	                matrix : [
	                    ' , , , , , , , , , , , , , , , , , , , , , , , ',
	                    ' , , , , , , , , , , , , , , , , , , , , , , , ',
	                    ' , , , , , ,O,-,O,-,O,-,O,-,O,-,b, , , , , , , ',
	                    ' , , , , ,B,-,-,-,-,-,-,-,-,-,-,B, , , , , , , ',
	                    ' , , , , ,B,-,-,-,-,-,-,-,-,O,-,O, , , , , , , ',
	                    ' , , , ,B,-,-,-,-,-,-,-,-,-,-,-,-,B, , , , , , ',
	                    ' , , , ,B,-,-,-,-,-,-,-,-,-,-,-,O,B,B, , , , , ',
	                    ' , , , ,B,-,-,-,-,-,-,-,-,-,-,-,-,-,B, , , , , ',
	                    ' , , , ,B,-,-,-,-,-,-,-,-,-,-,-,-,-,B, , , , , ',
	                    ' , , , ,B,B,-,-,-,-,B,B,-,-,-,-,-,-,B, , , , , ',
	                    ' , , , ,O,B, ,O,O,O,O,B, , ,O,-,-,-,-,B, , , , ',
	                    ' , , , ,O, , ,O,O, ,O, , , ,O,-,-,-,-,B, , , , ',
	                    ' , , , ,B,O,O,-,-,-,-,O,O,O,-,-,-,-,-,B, , , , ',
	                    ' , , , ,B,-,-,B,B,-,-,-,-,-,-,-,-,-,-,B, , , , ',
	                    ' , , , , ,B,-,-,-,-,-,-,-,-,-,-,-,B,B, , , , , ',
	                    ' , , , , ,B,-,-,-,-,-,B,-,-,-,-,-,B, , , , , , ',
	                    ' , , , , ,B,-,-,B,B,B,-,-,-,-,-,B,B, , , , , , ',
	                    ' , , , ,B,+,B,-,-,-,-,-,-,-,B,B,+,+,B,B,B, , , ',
	                    ' , , , ,B,+,+,B,B,-,-,B,B,B,B,+,+,+,B,-,B, , , ',
	                    ' , ,B,B,-,+,+,+,+,B,B,+,+,+,+,+,B,B,B,-,-,B, , ',
	                    'B,B,-,-,-,+,+,+,+,+,+,+,+,+,+,+,B,-,-,-,-,B,B, ',
	                    'B,-,-,-,-,B,B,+,+,+,+,+,+,+,+,+,B,B,B,-,-,-,B, ',
	                    'B,-,-,-,B, ,B,+,+,+,c,c,+,+,+,B, , ,B,-,-,B,B, ',
	                    ' ,B,B,B, , ,B,+,+,c,+,+,x,+,+,B, , , ,B,-,B, , ',
	                    ' , , , , , ,B,+,+,c,+,+,y,+,+,B,B, , ,B,B,B, , ',
	                    ' , , , , , ,B,+,+,+,c,c,+,+,+,+,B,B, , , , , , '
	                ],
	                colorMap : {
	                    ' ' : 'transparent',
	                    'B' : '#000',
	                    '-' : '#f0d6b5', //pink
	                    'O' : '#5f3006', //marrone
	                    '+' : '#a8e00d', //green
	                    'c' : '#7b78e3', //celeste c
	                    'x' : '#928398', //riga1
	                    'y' : '#845500' //riga1
	                }
	            });

			sm0.draw({node : flag});
			sm1.draw({node : space1});
			sm2.draw({node : space2});
			sm3.draw({node : space3});
			sm4.draw({node : space4});
			sm5.draw({node : space5});
			sm6.draw({node : space5});
			sm7.draw({node : pacman});
			sm8.draw({node : dimonni});

			window.setInterval(function (){
				sm6.mirror();
			}, 500);
						
		});
	};

	this.action_pixelplotter =function (){
		var that = this;
		JMVC.require(
			'core/mobile/drawer/drawer',
			'core/lorem',
			'plotter/shadowMatrix'
		);
		
		JMVC.getView('vacuum')
		.set({
			style: 'padding:0px 10px 50px',
			id: 'container'
		})
		.render(function() {

			
			var size = that.get('size') || 5,
				cnt = JMVC.dom.find('#container'),
				to = window.setInterval(function(){}, 1E6),
				go = function () {},
				character = 'mario',
				characters = {};

			characters = {
				spiderman : {
					pixelMap : [
						' , , , , , , , ,x,x,x,x,x,x, , , , , , , ',
						' , , , , , , ,x,o,o,o,o,o,o,x, , , , , , ',
						' , , , , , ,x,o,o,o,o,o,o,o,o,x, , , , , ',
						' , , , , , ,x,o,o,x,x,x,o,o,o,x, , , , , ',
						' , , , , ,x,o,o,x,.,.,.,x,o,x,.,x, , , , ',
						' , , , , ,x,o,x,.,.,.,.,x,x,.,.,x, , , , ',
						' , , , , ,x,o,x,.,.,.,.,.,.,.,.,x, , , , ',
						' , , , , ,x,o,x,.,.,.,.,.,.,.,.,x, , , , ',
						' , , , , ,x,o,x,.,.,.,.,x,x,.,.,x, , , , ',
						' , , , , , ,x,o,x,.,.,x,o,o,x,.,x, , , , ',
						' , , , ,x,x,o,x,o,x,x,o,o,o,o,x, , , , , ',
						' , , ,x,o,i,i,o,x,o,o,o,o,o,x,o,x,x, , , ',
						' , ,x,o,i,i,i,i,o,x,x,x,x,x,o,i,i,o,x, , ',
						' ,x,o,i,i,i,i,i,i,o,o,o,o,o,i,i,i,i,o,x, ',
						' ,x,o,i,x,x,x,i,i,i,i,i,i,i,x,x,x,i,o,x, ',
						' ,x,o,o,o,x,x,o,o,o,o,o,o,o,x,x,o,o,o,x, ',
						' ,x,o,o,o,x,x,o,o,o,o,o,o,o,x,x,o,o,o,x, ',
						' , ,x,x,x, ,x,i,i,i,i,i,i,i,x, ,x,x,x, , ',
						' , , , , ,x,i,i,i,i,i,i,i,i,i,x, , , , , ',
						' , , , ,x,i,i,i,i,i,x,i,i,i,i,i,x, , , , ',
						' , , ,x,i,i,i,i,i,x, ,x,i,i,i,i,i,x, , , ',
						' ,x,x,o,o,o,o,o,x, , , ,x,o,o,o,o,o,x,x, ',
						'x,o,o,o,o,o,o,o,x, , , ,x,o,o,o,o,o,o,o,x',
						'x,x,x,x,x,x,x,x,x, , , ,x,x,x,x,x,x,x,x,x'
					],
					colorMap : {'x':'#000', 'o':'#f00', 'i':'#1065D0', '.':'#fff', ' ':'transparent'}
				},
				mario : {
					pixelMap : [
						' , , ,#,#,#,#,#, , , , ',
						' , ,#,#,#,#,#,#,#,#,#, ',
						' , ,i,i,i,O,O,i,O, , , ',
						' ,i,O,i,O,O,O,i,O,O,O, ',
						' ,i,O,i,i,O,O,O,i,O,O,O',
						' ,i,i,O,O,O,O,i,i,i,i, ',
						' , , ,O,O,O,O,O,O,O, , ',
						' , ,i,i,#,i,i,i, , , , ',
						' ,i,i,i,#,i,i,#,i,i,i, ',
						'i,i,i,i,#,#,#,#,i,i,i,i',
						'O,O,i,#,O,#,#,O,#,i,O,O',
						'O,O,O,#,#,#,#,#,#,O,O,O',
						'O,O,#,#,#,#,#,#,#,#,O,O',
						' , ,#,#,#, , ,#,#,#, , ',
						' ,i,i,i, , , , ,i,i,i, ',
						'i,i,i,i, , , , ,i,i,i,i'
					],
					colorMap : {'#':'#db0102', 'O':'#f8aa00', 'i':'#706700', ' ':'transparent'}
				}
			};

			JMVC.css.style(JMVC.WDB, {padding : '50px', backgroundColor : '#ddd'});

			JMVC.core.widgzard.render({
				target : cnt,
				content : [{
					// gauge
					tag : 'input',
					attrs : {
						'class' : 'floatl',
						type : 'range',
						min : 1,
						max : 50,
						step : 1,
						value : size
					},
					style : {margin : '20px'},
					cb : function () {
						var self = this,
							$elf = self.node;
						JMVC.events.on($elf, 'input', function () {
							size = $elf.value;
							go();
						});
						self.done();
					}
				},{
					tag : 'select',
					'class' : 'floatl',
					style : {margin : '20px'},
					content : [{
						tag : 'option',
						attrs : {value : 'mario'},
						html : 'mario'
					},{
						tag : 'option',
						attrs : {value : 'spiderman'},
						html : 'spiderman'
					}],
					cb : function () {
						var self = this,
							$elf = self.node;
						JMVC.events.on($elf, 'change', function () {
							character = $elf.value;
							go();
						});
						self.done();
					}
				},
				'clearer',
				{
					content : [{
						style : {
							height : 50 * size + 'px'
						},
						content : [{
							style : {margin:'50px'},
							wid : 'target'
						}]
					}]
				}],
				cb : function () {
					var target = this.getNode('target').node;
					go = function () {
						window.clearInterval(to);

						var sm0 = JMVC.shadowMatrix({
							scale : size,
							matrix : characters[character].pixelMap,
							colorMap : characters[character].colorMap
						});
						sm0.draw({node : target});
						to = window.setInterval(function (){
							sm0.mirror();
						}, 500);
					};
					go();
				}
			});
		});
	};



	this.action_shadowJMVC = function (){
		var that = this;
		JMVC.require(
			'core/mobile/drawer/drawer',
			'core/lorem',
			'plotter/shadowMatrix'
		);
		
		JMVC.head.title('JMVC shadow css');
		
		JMVC.getView('vacuum')
		.set({
			style: 'padding:0px 10px 50px',
			id: 'container'
		})
		.render(function() {

			
			var size = that.get('size') || 1,
				JMVCdomCreate = JMVC.dom.create,
				cnt = JMVC.dom.find('#container'),
				input = JMVCdomCreate('input', {type:'text', id:'imgurl'}),
				butt = JMVCdomCreate('input', {type:'button', value:'get it'}),
				exportHtml = JMVCdomCreate('input', {type:'button', value:'get html'}),
				pestCss = JMVCdomCreate('input', {type:'button', value:'pest css'}),
				size1 = JMVCdomCreate('input', {type:'button', value:'size 1'}),
				size2 = JMVCdomCreate('input', {type:'button', value:'size 2'}),
				size3 = JMVCdomCreate('input', {type:'button', value:'size 3'}),
				size4 = JMVCdomCreate('input', {type:'button', value:'size 4'}),
				download = JMVCdomCreate('input', {type:'button', value:'download'}),
				logo = JMVCdomCreate('div', {id:'logo', style:'margin-top:10px'}),
				images = [
					JMVCdomCreate('a', {href:'javascript:;', alt:'/media/img/shad/js.jpg'}, 'js'),
					JMVCdomCreate('a', {href:'javascript:;', alt:'/media/img/shad/code.jpg'}, 'code'),
					JMVCdomCreate('a', {href:'javascript:;', alt:'/media/img/shad/javascript-save-all.jpg'}, 'will save us all'),
					JMVCdomCreate('a', {href:'javascript:;', alt:'/media/img/shad/Maurizio.png'}, 'java won`t'),
					JMVCdomCreate('a', {href:'javascript:;', alt:'/media/img/shad/raja.jpg'}, 'what about Raja?'),
					JMVCdomCreate('a', {href:'javascript:;', alt:'/media/img/shad/mememe.jpg'}, '&Lucas?'),
					JMVCdomCreate('a', {href:'javascript:;', alt:'/media/img/shad/verkstedt.png'}, 'verkstedt')
				];

			JMVC.css.style(JMVC.WDB, {padding : '50px'});
			JMVC.css.mappedStyle('xxx', 'a{margin-left:5px}');

			
			JMVC.dom.append(cnt, [input, butt, pestCss, exportHtml, size1, size2, size3, size4, download].concat(images, logo));
			JMVC.dom.append(JMVC.WDB, cnt);

			JMVC.events.on(butt, 'click', function (){
				if (!input.value) {
					document.location.search = '?size=1';	
				} else {
					go(input.value || 1);
				}

			});
			JMVC.events.on(exportHtml, 'click', function () {
				alert('check out the console to get the full html')
				console.log(logo.outerHTML.replace(/rgb\(/g, "\nrgb("));
			});
			JMVC.events.on(images, 'click', function (){
				go(JMVC.vars.baseurl + JMVC.dom.attr(this, 'alt'));
			});
			JMVC.events.on(size1, 'click', function (){
				JMVC.bom.qs({size : .5});
			});
			JMVC.events.on(size2, 'click', function (){
				JMVC.bom.qs({size : 1});
			});
			JMVC.events.on(size3, 'click', function (){
				JMVC.bom.qs({size : 1.5});
			});
			JMVC.events.on(size4, 'click', function (){
				JMVC.bom.qs({size : 2});
			});
			JMVC.events.on(pestCss, 'click', function (){
				JMVC.css.pest();
			});
			JMVC.events.on(download, 'click', function () {
				console.log(logo.outerHTML)
			});


			function go (img) {

				JMVC.shadowMatrix.getMatrixFromImage({
					size : size,
					// imgUrl : img || (JMVC.vars.baseurl + '/media/img/fgk.jpg')
					imgUrl : img || (JMVC.vars.baseurl + '/media/img/fedesmall.jpg')
				})
				// promise returned, done when image loaded and
				// matrix done
				.then(function(pro, result) {
					var sm = JMVC.shadowMatrix(pro.result[0]).draw({node : logo});
				});
			}
			
			go();

		});
	};



	this.action_animation = function (){
		var that = this;
		JMVC.require(
			'core/mobile/drawer/drawer',
			'core/lorem',
			'plotter/shadowMatrix'
		);
		
		JMVC.head.title('JMVC shadow css animation');

		JMVC.getView('vacuum')
		.set({
			style: 'padding:0px 10px 50px',
			id: 'container'
		})
		.render(function() {			
			var size = that.get('size') || 10,
				cnt = JMVC.dom.find('#container'),
				space = JMVC.dom.create('div', {id:'space', style:'margin:50px'});

			JMVC.css.style(JMVC.WDB, {padding : '50px'});

			JMVC.dom.append(cnt, space);
			JMVC.dom.append(JMVC.WDB, cnt);
			
			

			var sm = JMVC.shadowMatrix({
				scale : size,
				frames : [
					[
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , '
					],[
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						'o, , , , , , , , , , , , , ',
						'o, , , , , , , , , , , , , ',
						'o, , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , '
					],[
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						'o, , , , , , , , , , , , , ',
						' ,o, , , , , , , , , , , , ',
						' ,o, , , , , , , , , , , , ',
						' ,o, , , , , , , , , , , , ',
						'o, , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , '
					],[
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						'o, , , , , , , , , , , , , ',
						'.,o, , , , , , , , , , , , ',
						'.,.,o, , , , , , , , , , , ',
						'.,.,o, , , , , , , , , , , ',
						'.,.,o, , , , , , , , , , , ',
						'.,o, , , , , , , , , , , , ',
						'o, , , , , , , , , , , , , '
					],[
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						'o,o, , , , , , , , , , , , ',
						' , ,o, , , , , , , , , , , ',
						' , , ,o, , , , , , , , , , ',
						'X, , ,o, , , , , , , , , , ',
						' , , ,o, , , , , , , , , , ',
						' , ,o, , , , , , , , , , , ',
						'o,o, , , , , , , , , , , , '
					],[
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						'o,o,o, , , , , , , , , , , ',
						'.,.,.,o, , , , , , , , , , ',
						'.,.,.,.,o, , , , , , , , , ',
						'.,X,.,.,o, , , , , , , , , ',
						'.,.,.,.,o, , , , , , , , , ',
						'.,.,.,o, , , , , , , , , , ',
						'o,o,o, , , , , , , , , , , '
					],[
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' ,o,o,o, , , , , , , , , , ',
						'o, , , ,o, , , , , , , , , ',
						' , , , , ,o, , , , , , , , ',
						' , ,X, , ,o, , , , , , , , ',
						' , , , , ,o, , , , , , , , ',
						'o, , , ,o, , , , , , , , , ',
						' ,o,o,o, , , , , , , , , , '
					],[
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , ,o,o,o, , , , , , , , , ',
						' ,o,.,.,.,o, , , , , , , , ',
						'o,.,.,.,.,.,o, , , , , , , ',
						'o,.,.,X,.,.,o, , , , , , , ',
						'o,.,.,.,.,.,o, , , , , , , ',
						' ,o,.,.,.,o, , , , , , , , ',
						' , ,o,o,o, , , , , , , , , '
					],[
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , ,o,o,o, , , , , , , , ',
						' , ,o, , , ,o, , , , , , , ',
						' ,o, , , , , ,o, , , , , , ',
						' ,o, , ,X, , ,o, , , , , , ',
						' ,o, , , , , ,o, , , , , , ',
						' , ,o, , , ,o, , , , , , , ',
						' , , ,o,o,o, , , , , , , , '
					],[
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , ,o,o,o, , , , , , , ',
						' , , ,o,.,.,.,o, , , , , , ',
						' , ,o,.,.,.,.,.,o, , , , , ',
						' , ,o,.,.,X,.,.,o, , , , , ',
						' , ,o,.,.,.,.,.,o, , , , , ',
						' , , ,o,.,.,.,o, , , , , , ',
						' , , , ,o,o,o, , , , , , , '
					],[
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , ,o,o,o, , , , , , ',
						' , , , ,o, , , ,o, , , , , ',
						' , , ,o, , , , , ,o, , , , ',
						' , , ,o, , ,X, , ,o, , , , ',
						' , , ,o, , , , , ,o, , , , ',
						' , , , ,o, , , ,o, , , , , ',
						' , , , , ,o,o,o, , , , , , '
					],[
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , ,o,o,o, , , , , ',
						' , , , , ,o,.,.,.,o, , , , ',
						' , , , ,o,.,.,.,.,.,o, , , ',
						' , , , ,o,.,.,X,.,.,o, , , ',
						' , , , ,o,.,.,.,.,.,o, , , ',
						' , , , , ,o,.,.,.,o, , , , ',
						' , , , , , ,o,o,o, , , , , '
					],[
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , ,o,o,o, , , , ',
						' , , , , , ,o, , , ,o, , , ',
						' , , , , ,o, , , , , ,o, , ',
						' , , , , ,o, , ,X, , ,o, , ',
						' , , , , ,o, , , , , ,o, , ',
						' , , , , , ,o, , , ,o, , , ',
						' , , , , , , ,o,o,o, , , , '
					],[
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , ,o,o,o, , , ',
						' , , , , , , ,o,.,.,.,o, , ',
						' , , , , , ,o,.,.,.,.,.,o, ',
						' , , , , , ,o,.,.,X,.,.,o, ',
						' , , , , , ,o,.,.,.,.,.,o, ',
						' , , , , , , ,o,.,.,.,o, , ',
						' , , , , , , , ,o,o,o, , , '
					],[
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , ,o,o,o, , ',
						' , , , , , , , ,o, , , ,o, ',
						' , , , , , , ,o, , , , , ,o',
						' , , , , , , ,o, , ,X, , ,o',
						' , , , , , , ,o, , , , , ,o',
						' , , , , , , , ,o, , , ,o, ',
						' , , , , , , , , ,o,o,o, , '
					],[
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , ,o,o,o, ',
						' , , , , , , , , ,o,.,.,.,o',
						' , , , , , , , ,o,.,.,.,.,.',
						' , , , , , , , ,o,.,.,X,.,.',
						' , , , , , , , ,o,.,.,.,.,.',
						' , , , , , , , , ,o,.,.,.,o',
						' , , , , , , , , , ,o,o,o, '
					],[
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , ,o,o,o',
						' , , , , , , , , , ,o, , , ',
						' , , , , , , , , ,o, , , , ',
						' , , , , , , , , ,o, , ,X, ',
						' , , , , , , , , ,o, , , , ',
						' , , , , , , , , , ,o, , , ',
						' , , , , , , , , , , ,o,o,o'
					],[
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , ,o,o',
						' , , , , , , , , , , ,o,.,.',
						' , , , , , , , , , ,o,.,.,.',
						' , , , , , , , , , ,o,.,.,X',
						' , , , , , , , , , ,o,.,.,.',
						' , , , , , , , , , , ,o,.,.',
						' , , , , , , , , , , , ,o,o'
					],[
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , ,o',
						' , , , , , , , , , , , ,o, ',
						' , , , , , , , , , , ,o, , ',
						' , , , , , , , , , , ,o, , ',
						' , , , , , , , , , , ,o, , ',
						' , , , , , , , , , , , ,o, ',
						' , , , , , , , , , , , , ,o'
					],[
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , ,o',
						' , , , , , , , , , , , ,o,.',
						' , , , , , , , , , , , ,o,.',
						' , , , , , , , , , , , ,o,.',
						' , , , , , , , , , , , , ,o',
						' , , , , , , , , , , , , , '
					],[
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , ,o',
						' , , , , , , , , , , , , ,o',
						' , , , , , , , , , , , , ,o',
						' , , , , , , , , , , , , , ',
						' , , , , , , , , , , , , , '
					]
				],
				colorMap : {
					o : 'red',
					' ' : 'white',
					'.': 'coral'
				}
			});
			
			sm.animate({
				node : space,
				backAndForth : true
			}, 50);


			window.setTimeout(function () {
				sm.replaceMap({
					o : 'red',
					' ' : 'black',
					'.': 'white',
					'x' : 'white'
				});
			}, 3000);

			
		});
	};


	this.action_slideText = function () {
		var ctrl = this;
		JMVC.require('core/fx/txtSlide');

		JMVC.head.title('JMVC slide text');
		JMVC.getView('vacuum').set({
			style: 'padding:50px; background-color: black; color:red; font-size:5em;font-family:Verdana,sans',
			id: 'container'
		})
		.render(function() {
			var cnt = JMVC.dom.find('#container'),
				txt = ctrl.get('txt') || 'SWIPE ME',
				hello = JMVC.dom.create('div', {id:'space', style:'margin:50px'}, txt);			

			JMVC.dom.append(cnt, hello);
			JMVC.dom.append(JMVC.WDB, cnt);

			JMVC.fx.txtSlide.slide(hello, txt, {versus:'left', repeat : 3000});

			window.setTimeout(function () {
				console.debug('right');
				JMVC.fx.txtSlide.shut();
				JMVC.fx.txtSlide.slide(hello, txt, {versus:'right', repeat : 3000});
			},10000);
			window.setTimeout(function () {
				console.debug('both');
				JMVC.fx.txtSlide.shut();
				JMVC.fx.txtSlide.slide(hello, txt, {versus:'both', repeat : 3000});
			},20000);

		});
	};


	this.action_orientation = function () {

		//JMVC.require('vendors/twitter/twitter');

		JMVC.getView('demo/orientation')
			.set({
				style: '',
				id: 'container',
				'content': ''
			})
			.render(function() {

				// experimental
				 
				// JMVC.vendors.twitter.linkShare(document.body, {
				// 	//url : 'http://www.jmvc.org'
				// 	title : 'mytitle'
				// 	,text : 'testo del tweet'
				// 	//,via : 'via me'
				// 	//,size : 'large'
				// 	,related : '#javascript'
				// 	,hashtags : 'javascript, pure javascript'
				// });

				// JMVC.vendors.twitter.follow(document.body, {
				// 	'show-count' : false
				// 	,'size' : 'large'
				// 	,'show-screen-name' : true
				// });

				// JMVC.vendors.twitter.hashTag(document.body, {
				// 	size : 'large'
				// 	,related : 'purejmvc'
				// 	//,url : 'http://www.jmvc.dev'
				// 	//,button_hashtag : '#javascript'
				// 	,text : 'my text'
				// });

				// JMVC.vendors.twitter.mention(document.body, {
				// 	size : 'large'
				// 	,related : 'purejmvc'
				// 	,url : 'http://www.jmvc.dev'
				// 	,screen_name : 'purejmvc'
				// 	,text : 'my text'
				// });

				
				JMVC.head.addStyle(JMVC.vars.baseurl + '/app/views/demo/orientation.css', true);

				var $ = JMVC.dom.find,
					Mr = Math.round;

				if (!window.DeviceOrientationEvent) {
					$('#do-unsupported').classList.remove('hidden');
				} else {
					$('#do-info').classList.remove('hidden');
					window.addEventListener('deviceorientation', function(e) {
						e.absolute = true;
						$('#cube').style.webkitTransform = 
						$('#cube').style.transform = 'rotateX(' + e.beta + 'deg) ' + 'rotateY(' + e.gamma + 'deg) ' + 'rotateZ(' + e.alpha + 'deg)';
	 					$('#beta').innerHTML = Mr(e.beta);
	 					$('#gamma').innerHTML = Mr(e.gamma);
	 					$('#alpha').innerHTML = Mr(e.alpha);
	 					$('#is-absolute').innerHTML = e.absolute ? "true" : "false";
	 				});
         		}
         		if (!window.DeviceMotionEvent) {
         			$('#dm-unsupported').classList.remove('hidden');
     			} else {
     				$('#dm-info').classList.remove('hidden');
     				window.addEventListener('devicemotion', function(e) {
     					// e.interval = 5;
     					$('#acceleration-x').innerHTML = Mr(e.acceleration.x);
     					$('#acceleration-y').innerHTML = Mr(e.acceleration.y);
     					$('#acceleration-z').innerHTML = Mr(e.acceleration.z);
     					$('#acceleration-including-gravity-x').innerHTML = Mr(e.accelerationIncludingGravity.x);
     					$('#acceleration-including-gravity-y').innerHTML = Mr(e.accelerationIncludingGravity.y);
     					$('#acceleration-including-gravity-z').innerHTML = Mr(e.accelerationIncludingGravity.z);
						$('#rotation-rate-beta').innerHTML = Mr(e.rotationRate.beta);
						$('#rotation-rate-gamma').innerHTML = Mr(e.rotationRate.gamma);
						$('#rotation-rate-alpha').innerHTML = Mr(e.rotationRate.alpha);
						$('#interval').innerHTML = e.interval;
		            });
        		 }
                /*
				if (!('oncompassneedscalibration' in window)) {
					$('#cnc-unsupported').classList.remove('hidden');
				} else {
					window.addEventListener('compassneedscalibration', function(e) {
						alert('Compass needs calibrating! Wave your device in a figure-eight motion');
					});
				}
                */
			});
	};


	this.action_orientation2 = function () {

		//JMVC.require('vendors/twitter/twitter');
		JMVC.require('core/mobile/devicemotion');

		JMVC.getView('demo/orientation')
			.set({
				style: '',
				id: 'container',
				'content': ''
			})
			.render(function() {

				// experimental
				 
				// JMVC.vendors.twitter.linkShare(document.body, {
				// 	//url : 'http://www.jmvc.org'
				// 	title : 'mytitle'
				// 	,text : 'testo del tweet'
				// 	//,via : 'via me'
				// 	//,size : 'large'
				// 	,related : '#javascript'
				// 	,hashtags : 'javascript, pure javascript'
				// });

				// JMVC.vendors.twitter.follow(document.body, {
				// 	'show-count' : false
				// 	,'size' : 'large'
				// 	,'show-screen-name' : true
				// });

				// JMVC.vendors.twitter.hashTag(document.body, {
				// 	size : 'large'
				// 	,related : 'purejmvc'
				// 	//,url : 'http://www.jmvc.dev'
				// 	//,button_hashtag : '#javascript'
				// 	,text : 'my text'
				// });

				// JMVC.vendors.twitter.mention(document.body, {
				// 	size : 'large'
				// 	,related : 'purejmvc'
				// 	,url : 'http://www.jmvc.dev'
				// 	,screen_name : 'purejmvc'
				// 	,text : 'my text'
				// });

				
				JMVC.head.addStyle(JMVC.vars.baseurl + '/app/views/demo/orientation.css', true);

				var $ = JMVC.dom.find,
					Mr = Math.round;

				if (!window.DeviceOrientationEvent) {
					$('#do-unsupported').classList.remove('hidden');
				} else {
					$('#do-info').classList.remove('hidden');

					JMVC.mobile.devicemotion.deviceOrientation(function (je) {
						$('#cube').style.webkitTransform = 
						$('#cube').style.transform = 'rotateX(' + je.beta + 'deg) ' + 'rotateY(' + je.gamma + 'deg) ' + 'rotateZ(' + je.alpha + 'deg)';
	 					$('#beta').innerHTML = Mr(je.beta);
	 					$('#gamma').innerHTML = Mr(je.gamma);
	 					$('#alpha').innerHTML = Mr(je.alpha);
	 					$('#is-absolute').innerHTML = je.absolute ? "true" : "false";
					}, true);



         		}
         		if (!window.DeviceMotionEvent) {
         			$('#dm-unsupported').classList.remove('hidden');
     			} else {
     				$('#dm-info').classList.remove('hidden');

     				JMVC.mobile.devicemotion.deviceMotion(function (je) {
     					$('#acceleration-x').innerHTML = Mr(je.accX);
     					$('#acceleration-y').innerHTML = Mr(je.accY);
     					$('#acceleration-z').innerHTML = Mr(je.accZ);
     					$('#acceleration-including-gravity-x').innerHTML = Mr(je.accGX);
     					$('#acceleration-including-gravity-y').innerHTML = Mr(je.accGY);
     					$('#acceleration-including-gravity-z').innerHTML = Mr(je.accGZ);
						$('#rotation-rate-beta').innerHTML = Mr(je.accBeta);
						$('#rotation-rate-gamma').innerHTML = Mr(je.accGamma);
						$('#rotation-rate-alpha').innerHTML = Mr(je.accAlpha);
						$('#interval').innerHTML = je.interval;
     				});
                }
                /*
				if (!('oncompassneedscalibration' in window)) {
					$('#cnc-unsupported').classList.remove('hidden');
				} else {
					window.addEventListener('compassneedscalibration', function(e) {
						alert('Compass needs calibrating! Wave your device in a figure-eight motion');
					});
                }
                */

			});
	};

	this.action_inlineVideo = function () {
		JMVC.require('core/html5/inlineVideo');
		JMVC.css.fontAwesome();
		

		JMVC.head.title('JMVC inline mobile video');
		var mobile = JMVC.util.isMobile;
		JMVC.getView('vacuum')
			.set({
				style: 'padding:0px 10px 50px;',
				id: 'container'
			})
			.render(function() {

				JMVC.core.widgzard.render({
					target : document.getElementById('container'),
					content : [{
						tag : 'video',
						wid : 'wideo',
						attrs : {preload : 'preload'},
						style : {
							width:'300px',
							visibility:'hidden'
						},
						content : [{
							tag : 'source',
							attrs : {
								type : 'video/webm',
								src : 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.webm'
							}
						},{
							tag : 'source',
							attrs : {
								type : 'video/mp4',
								src : 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.mp4'
							}
						}]
					}],
					cb : function () {
						var $video = this.getNode('wideo').node,
							ev = mobile ? 'canplaythrough' : 'loadeddata';
						JMVC.events.on($video, mobile ? 'canplaythrough' : 'loadeddata', function () {
							var c = JMVC.html5.inlineVideo($video);
							c.canvas.style.border = '5px solid red';
							c.canvas.parentNode.style.margin = '20px';
						}, false);
						$video.load();
					}
				});
			});
	};
	this.action_previewVideo = function () {
		
		JMVC.require('core/html5/videoPreview');
		JMVC.css.fontAwesome();
		JMVC.head.title('JMVC inline mobile video preview');
		var mobile = JMVC.util.isMobile;

		JMVC.getView('vacuum')
		.set({
			style: 'padding:0px 10px 50px;',
			id: 'container'
		})
		.render(function() {
			JMVC.core.widgzard.render({
				target : document.getElementById('container'),
				content : [{
					tag : 'video',
					wid : 'wideo',
					attrs : {preload : 'preload'},
					style : {
						width:'300px'
					},
					content : [{
						tag : 'source',
						attrs : {
							type : 'video/webm',
							src : 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.webm'
						}
					},{
						tag : 'source',
						attrs : {
							type : 'video/mp4',
							src : 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.mp4'
						}
					}],
					end : function () {
						var $video = this.node,
							ev = mobile ? 'canplaythrough' : 'loadeddata';
						JMVC.events.one($video, mobile ? 'canplaythrough' : 'loadeddata', function () {
							// $elf.load();
							var c = JMVC.html5.videoPreview($video);
						}, false);
						$video.load();
					}
				}]
			});
		});
	};

	this.action_previewInlineVideo = function () {
		
		JMVC.require('core/html5/inlinePreviewVideo');
		JMVC.css.fontAwesome();
		
		var mobile = JMVC.util.isMobile;

		JMVC.getView('vacuum')
		.set({
			style: 'padding:0px 10px 50px;',
			id: 'container'
		})
		.render(function() {

			JMVC.core.widgzard.render({
				target : document.getElementById('container'),
				content : [{
					tag : 'video',
					wid : 'wideo',
					attrs : {preload : 'preload'},
					style : {
						width:'300px'
					},
					content : [{
						tag : 'source',
						attrs : {
							type : 'video/webm',
							src : 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.webm'
						}
					},{
						tag : 'source',
						attrs : {
							type : 'video/mp4',
							src : 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.mp4'
						}
					}],
					end : function () {

						var $video = this.node,
							ev = mobile ? 'canplaythrough' : 'loadeddata';
							
						// $video.addEventListener(ev, function () {
							
						JMVC.events.one($video, mobile ? 'canplaythrough' : 'loadeddata', function () {

							// $elf.load();
							var c = JMVC.html5.previewInlineVideo($video);

							
						}, false);
						/*
						JMVC.events.one($video,'loadeddata', function () {

							// $elf.load();
							var c = JMVC.html5.previewInlineVideo($video);

							
						}, false);
						*/
						$video.load();
					}
				}]
			});
		});
	};

	this.action_wwdb = function () {

		JMVC.css.fontAwesome();
		JMVC.head.title('JMVC two way data binding');
		var mobile = JMVC.util.isMobile;

		JMVC.getView('vacuum')
		.set({
			style: 'padding:0px 10px 50px;line-height:30px;font-family:Verdana, sans',
			id: 'container'
		})
		.render(function() {

			var t = {value : 'please edit me'},
				secToGo = 60;
			window.t = t;

			JMVC.core.widgzard.render({
				target : document.getElementById('container'),
				content : [{
					tag:'h1',
					html : 'Two way data binding'
				},{
					tag : 'p',
					html : 'The following fields are all 2wdb with <b>t.value</b> that you can edit/read from the console (after ' + secToGo + ' seconds will be unbinded)'
				},{
					tag : 'span',
					html : '1:'
				},{
					tag : 'input',
					attrs : {type : 'text'},
					style : {width : '300px'},
					wid : 'input1'
				},
				{tag:'br'},{tag : 'span', html : '2:'},
				{
					tag : 'input',
					attrs : {type : 'text'},
					style : {
						width:'300px'
					},
					wid : 'input2'
				},{tag:'br'},{tag : 'span', html : '3:'},{
					tag : 'span',
					wid : 'text'
				},{tag:'br'},{tag : 'span', html : '4:'},{
					tag : 'textarea',
					attrs : {rows:20, cols:"50"},
					wid : 'ta'
				},{
					style:{color:'red', fontWeight:'bold'},
					wid: 'debug'
				}],
				cb : function () {
					var self = this,						
						text = self.getNode('text').node,
						ta = self.getNode('ta').node,
						input1 = self.getNode('input1').node,
						input2 = self.getNode('input2').node,
						deb = self.getNode('debug').node,
						debFun = function (o) {console.log(o);};

					JMVC.events.wwon(t, 'value', input1, debFun);
					JMVC.events.wwon(t, 'value', input2, debFun);
					JMVC.events.wwon(t, 'value', text, debFun);
					JMVC.events.wwon(t, 'value', ta, debFun);
					
					window.setTimeout(function () {
						JMVC.events.wwoff(input1, input2, text, ta);
						deb.innerHTML = '2wdb stopped';
					}, secToGo * 1E3);
				}
			});
		});
	};
};