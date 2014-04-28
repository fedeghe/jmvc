
// http://www.jmvc.dev/grind/index/draw/true

JMVC.require(
	'core/lib/border/border',
	'widget/snow/snow',
	'core/lorem'
);
JMVC.controllers.grind = function () {
	"use strict";

	var drawText = !!JMVC.p.draw,
		link = drawText ?
			[JMVC.vars.baseurl, JMVC.c].join(JMVC.US)
			:
			[JMVC.vars.baseurl, JMVC.c, 'index', 'draw', 'true'].join(JMVC.US);
	
	function lorem(n) {
		return drawText ? JMVC.string.lorem(n) : '';
	}

	this.action_index = function (){
		JMVC.events.loadify(1000);
		JMVC.require(
			'core/lib/grind/grind',
			'core/dim/dim',
			'core/responsive/basic/basic'
		);
		JMVC.head.meta('generator', 'jmvc resident in your machine');

		document.body.className = 'resp';

		function getConfig() {
			return {
				target : "#extralogo",
				content : [
					{
						attrs : {
							id : 'head',
							'class' : 'round12 roundtop pad5'
						},
						style : {
							backgroundColor : 'red',
							marginTop : '5px'
						},
						html : '<h1>' + lorem(3) + '</h1>'
					}, {
						attrs : {id : 'prova1', 'class' : 'p100 pad10 round8 roundbottomleft'},
						style : {'backgroundColor' : '#EEE', 'float' : 'left'},
						html : lorem(30)
					}, {
						attrs : {'id' : 'prova2', 'class' : 'p100'},
						style : {'float' : 'left'},
						content : [
							{
								attrs : {'id' : 'prova3', 'class' : 'p30'},
								style : {'float' : 'left'},
								content : [
									{
										style : {
											marginTop : '5px',
											backgroundColor : 'green'
										},
										attrs : {'class' : 'pad10 round8'},
										html : lorem(30)
									}, {
										style : {
											marginTop : '5px',
											backgroundColor : 'green'
										},
										attrs : {'class' : 'pad10 round8'},
										html : lorem(30),



										cb : function () {
											var p = this.promise;
											setTimeout(function () {
												JMVC.debug(2)
												p.done();
											}, 2000);
										}
									}, {
										style : {
											marginTop : '5px',
											backgroundColor : 'green'
										},
										attrs : {'class' : 'pad10 round8'},
										html : lorem(30),



										cb : function () {
											var p = this.promise;
											setTimeout(function () {
												JMVC.debug(3)
												p.done();
											}, 3000);
										}


									}
								]
							}, {
								attrs : {id : 'prova4', 'class' : 'p50'},
								style : {'float' : 'left'},
								content : [
									{
										style : {
											backgroundColor : 'red',
											margin : '5px',
											marginBottom : '0px'
										},
										attrs : {'class' : 'pad10 round8'},
										html : lorem(5)
									}, {
										style : {
											backgroundColor : 'red',
											margin : '5px',
											marginBottom : '0px'
										},
										attrs : {'class' : 'pad10 round8'},
										html : lorem(5)
									}, {
										style : {margin : '5px'},
										content : [
											{
												style : {'float' : 'left',width:'33.3%'},
												content : [{
													style : {backgroundColor : '#777', marginRight:'5px'},
													attrs : {'class' : 'round8 pad10'},
													html : lorem(60)
												}]
											}, {
												style : {'float' : 'left',width:'33.3%'},
												content : [{
													style : {backgroundColor : '#999', marginRight:'5px'},
													attrs : {'class' : 'round8 pad10'},
													html : lorem(40)
												}]
											}, {
												style : {'float' : 'left',width:'33.3%'},
												content : [{
													style : {backgroundColor : '#bbb'},
													attrs : {'class' : 'round8 pad10'},
													html : lorem(20)
												}]
											},
											'clearer'
										]
									}
								]
							}, {
								attrs : { 'class' : 'p20 pad10'},
								style : {
									'float' : 'left',
									minHeight : '140px',
									backgroundColor : '#eee'
								},
								html : lorem()

							},
							'clearer'
						]
					},
					'clearer',
					{
						attrs : {id : 'prova5'},
						content : [
							{
								attrs : {id : 'brd1', 'class' : 'p25 round12 roundleft pad5'},
								style : {'float' : 'left',backgroundColor : '#eee'},
								html : lorem(10)
							}, {
								attrs : {id : 'brd2', 'class' : 'p50 pad5'},
								style : {'float' : 'left',backgroundColor : '#eee'},
								html : lorem(20)
							}, {
								attrs : {id : 'brd3', 'class' : 'p25 round12 roundbottomright pad5'},
								style : {'float' : 'left',backgroundColor : '#eee'},
								html : lorem(10)
							},
							'clearer'
						]
					},
					'clearer',
					{
						attrs : {'id' : 'prova6'},
						style : {backgroundColor : 'magenta'}
					},
					{
						target:'body',
						style:{position:'absolute', top:'0px', left:'5px', color:'white'},
						content : [{
							grindID : 'txtButt',
							tag : 'span',
							style : {cursor:'pointer', color:'white', textDecoration : 'none', fontFamily: 'verdana', fontSize:'10px'},
							html : 'toggle text'
						}],
						cb : toggleText
					}
				]
			};
		}
		
		var config = getConfig();


		function toggleText (){
			this.promise.done();
			JMVC.events.bind(this, 'click', function () {
				drawText = !drawText;
				JMVC.grind.render(getConfig(), false, 'b960');
			});
		}

		JMVC.getView('vacuum')
			.set({
				'style' : 'font-family:verdana;',
				'id' : 'extralogo'
			}).render(function () {
				JMVC.css.style(JMVC.dom.body(), 'backgroundColor', '#444');
				JMVC.grind.render(config, function (){
					JMVC.debug('end');
				}, 'b960');
			});
	};





	this.action_direct = function () {
		JMVC.events.loadify(500);
		JMVC.require('core/lib/grind/grind', 'core/dim/dim');
		JMVC.head.meta('generator', 'jmvc resident in your machine');

		var config  = {
			target : 'body',
			content : [
				{
					attrs : {
						id : 'head',
						'class' : 'round12 roundtop pad5'
					},
					style : {
						marginTop : '5px'
					},
					html : '<h1>' + lorem(3) + '</h1>'
				}, {
					attrs : {id : 'prova1', 'class' : 'p100 pad10 round8 roundbottomleft'},
					style : {'float' : 'left'},
					html : lorem(30)
				}, {
					attrs : {'id' : 'prova2', 'class' : 'p100'},
					style : {'float' : 'left'},
					content : [
						{
							attrs : {'id' : 'prova3', 'class' : 'p30'},
							style : {'float' : 'left'},
							content : [
								{
									style : {
										marginTop : '5px'
									},
									attrs : {'class' : 'pad10 round8'},
									html : lorem(30)
								}, {
									style : {
										marginTop : '5px'
									},
									attrs : {'class' : 'pad10 round8'},
									html : lorem(30)
								}, {
									style : {
										marginTop : '5px'
									},
									attrs : {'class' : 'pad10 round8'},
									html : lorem(30)
								}
							]
						}, {
							attrs : {id : 'prova4', 'class' : 'p50'},
							style : {'float' : 'left'},
							content : [
								{
									style : {
										margin : '5px',
										marginBottom : '0px'
									},
									attrs : {'class' : 'pad10 round8'},
									html : lorem(5)
								}, {
									style : {
										margin : '5px',
										marginBottom : '0px'
									},
									attrs : {'class' : 'pad10 round8'},
									html : lorem(5)
								}, {
									style : {margin : '5px'},
									content : [
										{
											attrs : {'class' : 'p33'},
											style : {'float' : 'left'},
											content : [{
												style : {marginRight:'5px'},
												attrs : {'class' : 'round8 pad10'},
												html : lorem(60)
											}]
										}, {
											attrs : {'class' : 'p33'},
											style : {'float' : 'left'},
											content : [{
												style : {marginRight:'5px'},
												attrs : {'class' : 'round8 pad10'},
												html : lorem(40)
											}]
										}, {
											attrs : {'class' : 'p33'},
											style : {'float' : 'left'},
											content : [{
												attrs : {'class' : 'round8 pad10'},
												html : lorem(20)
											}]
										},
										'clearer'
									]
								}
							]
						}, {
							attrs : { 'class' : 'p20 pad10'},
							style : {
								'float' : 'left',
								minHeight : '140px'
							},
							html : lorem()

						},
						'clearer'
					]
				},
				'clearer',
				{
					attrs : {id : 'prova5'},
					content : [
						{
							attrs : {id : 'brd1', 'class' : 'p25 round12 roundleft pad5'},
							style : {'float' : 'left'},
							html : lorem(10)
						}, {
							attrs : {id : 'brd2', 'class' : 'p50 pad5'},
							style : {'float' : 'left'},
							html : lorem(20)
						}, {
							attrs : {id : 'brd3', 'class' : 'p25 round12 roundbottomright pad5'},
							style : {'float' : 'left'},
							html : lorem(10)
						},
						'clearer'
					]
				},
				'clearer',
				{
					attrs : {'id' : 'prova6'}
				}
			]
		};

		this.render(function () {
			JMVC.grind.render(config, function (){JMVC.debug('free'); }, 'b960');
			JMVC.grind.colorize();
		});
	};
};