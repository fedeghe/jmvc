JMVC.require('core/lib/border', 'widget/snow');
JMVC.controllers.grind = function () {

	this.action_index = function () {
		JMVC.events.loadify(500);
		JMVC.require('core/lib/grind', 'core/dim');
		JMVC.head.meta("generator", "jmvc resident in your machine");
		
		var config  = [
			{
				"target" : '#extralogo',
				"attrs" : {"id" : "head"},
				"style" : {"backgroundColor" : "red", "marginTop":"5px"},
				"class" : "round12 roundtop"
			},
			{
				"target" : '#extralogo',
				"attrs" : {"id" : "prova1"},
				"float" : "left",
				"class" : "p100",
				"style" : {"backgroundColor" : "#EEE"}
			},
			{
				"target" : '#extralogo',
				"attrs" : {"id" : "prova2"},
				"float" : "left",
				"class" : "p100",
				"inner" : [
					{
						"attrs" : {"id" : "prova3"},
						"float" : "left",
						"class" : "p30",
						"inner" : [
							{"style" : {"marginBottom" : "50px", "backgroundColor" : "green"}},
							{"style" : {"marginBottom" : "50px", "backgroundColor" : "green"}},
							{"style" : {"backgroundColor" : "green"}}
						]
					},
					{
						"attrs" : {"id" : "prova4"},
						"float" : "left",
						"class" : "p50",
						"inner" : [
							{"style":{"backgroundColor":"red", "margin":"5px", "marginBottom":"0px"}},
							{"style":{"backgroundColor":"red", "margin":"5px"}},
							{"inner" : [
									{"class" : "p30 round8 roundleft", "float" : "left", "style" : { "margin" : "2.5%", "marginRight":"0px", "backgroundColor" : "#888"}},
									{"class" : "p30 round4", "float" : "left", "style" : {"margin" : "2.5%", "marginRight":"0px", "backgroundColor" : "#888"}},
									{"class" : "p30 round8 roundright",	"float" : "left", "style" : {"margin" : "2.5%", "backgroundColor" : "#888"}},
									"clearer"
								]
							}
						]
					},
					{"class" : "p20", "float" : "left", "style" : {"height" : "140px"}},
					"clearer"
				]
			},
			"clearer",
			{
				"target" : '#extralogo',
				"attrs" : {"id" : "prova5"},
				"inner" : [
					{"attrs" : {"id" : "brd1"}, "class" : "p25 round12 roundbottomright", "float" : "right"},
					{"attrs" : {"id" : "brd2"},"class" : "p25 round12 roundbottomleft", "float" : "left", "style" : {"backgroundColor" : "none"}},
					{"attrs" : {"id" : "brd3"},"class" : "p30", "float" : "right"},
					"clearer"
				]
			},
			"clearer",
			{
				"target" : '#extralogo',
				"attrs" : {"id" : "prova6"}
			}
		];

		JMVC.getView('vacuum')
			.set({
				'style' : 'font-family:verdana;'
				, 'id' : 'extralogo'
			}).render(function () {
				JMVC.css.style(JMVC.dom.body(), 'backgroundColor', '#444');
				JMVC.grind.render(config, 'b960');
			});
	};

	this.action_direct = function () {
		JMVC.events.loadify(500);
		JMVC.require('core/lib/grind', 'core/dim');
		JMVC.head.meta("generator", "jmvc resident in your machine");

				

		var config  = [
			{
				"target" : 'body',
				"attrs" : {"id" : "head"},
				"class" : "",
				"style" : {"backgroundColor" : "red"}
			},
			{
				"target" : 'body',
				"attrs" : {"id" : "prova1"},
				"float" : "left",
				"class" : "p25"
			},
			{
				"target" : 'body',
				"attrs" : {"id" : "prova2"},
				"float" : "left",
				"class" : "p75",
				"inner" : [
					{
						"attrs" : {"id" : "prova3"},
						"float" : "left",
						"class" : "p30",
						"inner" : [
							{"class" : "", "style" : {"marginBottom" : "50px"}},
							{"class" : "", "style" : {"marginBottom" : "50px"}},
							{"class" : ""}
						]
					},
					{
						"attrs" : {"id" : "prova4"},
						"float" : "left",
						"class" : "p60",
						"inner" : [
							{"class" : ""},
							{"class" : ""},
							{
								"inner" : [
									{"class" : "p30", "style" : {"marginRight" : "5%"}, "float" : "left"},
									{"class" : "p30", "style" : {"marginRight" : "5%"}, "float" : "left"},
									{"class" : "p30",	"float" : "left"},
									"clearer"
								]
							}
						]
					},
					{"class" : "p10", "float" : "left", "style":{"height":"100px"}},
					"clearer"
				]
			},
			"clearer",
			{
				"target" : 'body',
				"attrs" : {"id" : "prova5"},
				"inner" : [
					{"attrs" : {"id" : "brd1"}, "class" : "p25", "float" : "right"},
					{"attrs" : {"id" : "brd2"}, "class" : "p25", "float" : "left", "style" : {"backgroundColor" : "none"}},
					{"attrs" : {"id" : "brd3"}, "class" : "p25", "float" : "right"},
					"clearer"
				]
			},
			"clearer",
			{
				"target" : 'body',
				"attrs" : {"id" : "prova6"},
				"style": {'position':'relative'}
			}
		];

		this.render(function () {JMVC.grind.render(config, 'b960'); });
	};
};

