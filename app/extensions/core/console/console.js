JMVC.require(
	'core/css'
	,'core/dim'
	,'core/lib/grind'
	,'event_scroll'
);
JMVC.extend('console', {
	'init' : function () {
		JMVC.head.meta("generator", "jmvc resident in your machine");
	},
	'_status' : false,
	'toggle' : function () {
		if (JMVC.console._status) {
			JMVC.dom.remove(JMVC.dom.find('#jmvc_console'));
			JMVC.events.enable_scroll();
		} else {
			JMVC.events.disable_scroll();
			var dims = JMVC.dim.getViewportSize(),
				border_size = 0,
				margin = 0,
				top_height = 10,
				foot_height = 100,
				// create the main container
				container = JMVC.dom.create(
					'div',{
						'id' : 'jmvc_console',
						'class' : 'jmvc_console',
						'style':'left:' + margin + 'px;right:' + margin + 'px;top:' + margin + 'px;bottom:' + margin + 'px;border:' + border_size + 'px solid black'
					}
				),
				config  = [
					{
						"target" : '#jmvc_console',
						"attrs" : {"id" : "head"},
						"style" : {"height":"20px"}
					},
					{
						"target" : '#jmvc_console',
						"attrs" : {"id" : "consolecnt"},
						"class" : "p100",
						"inner" : [
							{
								"attrs" : {"id" : "html"},
								"float" : "left",
								"class" : "p50",
								"inner" : [{
									"class" : "innerbox round4",
									"tag":"textarea",
									"style" : {"width": "99%"}
								}]
							},
							{
								"attrs" : {"id" : "css"},
								"float" : "left",
								"class" : "p50",
								"inner" : [{
									"class" : "innerbox round4",
									"tag":"textarea",
									"style" : {"width": "99%"}
								}]
							},
							"clearer",
							{
								"attrs" : {"id" : "javascript"},
								"float" : "left",
								"class" : "p50",
								"inner" : [{
									"class" : "innerbox round4",
									"tag":"textarea",
									"style" : {"width": "99%"}
								}]
							},
							{
								"attrs" : {"id" : "result"},
								"float" : "left",
								"class" : "p50",
								"inner" : [{
									"class" : "innerbox round4",
									"tag":"textarea",
									"style" : {"width": "99%"}
								}]
							},
							"clearer"
						]
					},
				];
			JMVC.set('height', (dims.height-70) / 2);
			JMVC.head.addstyle(JMVC.vars.baseurl + '/app/extensions/core/console/console.css', true);
			JMVC.dom.append(JMVC.dom.body(), container);

			JMVC.grind.render(config);
		}
		JMVC.console._status = !JMVC.console._status;
	}
});	