JMVC.head.addstyle(JMVC.vars.baseurl + '/app/extensions/core/console/console.css', true);
JMVC.require('css', 'dim', 'lib/grind/grind');
JMVC.extend('console', {
	'init' : function () {
		JMVC.head.meta("generator", "jmvc resident in your machine");
	},
	'_status' : false,
	'toggle' : function () {
		if (JMVC.console._status) {
			JMVC.dom.remove(JMVC.dom.find('#jmvc_console'));
		} else {
			var dims = JMVC.dim.getScreenData(),
				border_size = 2,
				margin = 4,
				top_height = 10,
				foot_height = 100,
				// create the main container
				container = JMVC.dom.create(
					'div',{
						'id' : 'jmvc_console',
						'class' : 'jmvc_console round10',
						'style':'left:' + margin + 'px;right:' + margin + 'px;top:' + margin + 'px;bottom:' + margin + 'px;border:' + border_size + 'px solid black'
					}
				),
				config  = [
					{
						"target" : '#jmvc_console',
						"attrs" : {"id" : "head"},
						"class" : "round10 roundup",
						"style" : {"backgroundColor" : "red", "height":"40px"}
					},
					{
						"target" : '#jmvc_console',
						"attrs" : {"id" : "panel"},
						"float" : "left",
						"class" : "p25"
					},
					{
						"target" : '#jmvc_console',
						"attrs" : {"id" : "consolecnt"},
						"float" : "left",
						"class" : "p75",
						"inner" : [
							{
								"attrs" : {"id" : "html"},
								"float" : "left",
								"class" : "p50",
								"inner" : [{
									"class" : "innerbox round4",
									"tag":"textarea",
									"style" : {"width": "95%"}
								}]
							},
							{
								"attrs" : {"id" : "css"},
								"float" : "left",
								"class" : "p50",
								"inner" : [{
									"class" : "innerbox round4",
									"tag":"textarea",
									"style" : {"width": "95%"}
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
									"style" : {"width": "95%"}
								}]
							},
							{
								"attrs" : {"id" : "result"},
								"float" : "left",
								"class" : "p50",
								"inner" : [{
									"class" : "innerbox round4",
									"tag":"textarea",
									"style" : {"width": "95%"}
								}]
							},
							"clearer"
						]
					},
					"clearer"
				];
			JMVC.dom.append(JMVC.dom.body(), container);

			JMVC.grind.render(config);
		}
		JMVC.console._status = !JMVC.console._status;
	}/*,
	'initold' : function () {
		//get some page dimensions
		var dims = JMVC.dim.getScreenData(),
			border_size = 5,
			margin = 20,
			top_height = 20,
			foot_height = 100,
			// create the main container
			container = JMVC.dom.create(
				'div',{
					'class' : 'jmvc_console',
					'style':'left:' + margin + 'px;right:' + margin + 'px;top:' + margin + 'px;bottom:' + margin + 'px;border:' + border_size + 'px solid black'
				}
			),
			cnsl1 = JMVC.dom.create('textarea', {'class' : 'console_textarea'}),
			cnsl2 = JMVC.dom.clone(cnsl1),
			cnsl3 = JMVC.dom.clone(cnsl2),
			head = JMVC.dom.create('div', {'class' : 'jmvc_console_head', 'style' : 'height:' + top_height + 'px'}),
			edit = JMVC.dom.create('div', {'class' : 'jmvc_console_edit', 'style' : 'height:' + (dims.clientHeight - 2 * (border_size + margin) - foot_height - top_height) + 'px'}),
			edit_html = JMVC.dom.create('div', {'class' : 'jmvc_console_edit_html', 'style' : 'height:' + (dims.clientHeight - 2 * (border_size + margin) - foot_height - top_height) + 'px'}, cnsl1),
			edit_js = JMVC.dom.create('div', {'class' : 'jmvc_console_edit_js', 'style' : 'height:' + (dims.clientHeight - 2 * (border_size + margin) - foot_height - top_height) + 'px'}, cnsl2),
			edit_css = JMVC.dom.create('div', {'class' : 'jmvc_console_edit_css', 'style' : 'height:' + (dims.clientHeight - 2 * (border_size + margin) - foot_height - top_height) + 'px'}, cnsl3),
			foot = JMVC.dom.create('div', {'class' : 'jmvc_console_foot', 'style' : 'height:' + foot_height + 'px'});

		JMVC.dom.append(edit, [edit_html, edit_js, edit_css, JMVC.css.clearer]);
		
		
		JMVC.dom.append(container, head);	
		JMVC.dom.append(container, edit);
		JMVC.dom.append(container, foot);
		JMVC.css.style(container, {'width' :(dims.clientWidth - (margin + border_size) * 2) + 'px'});
		JMVC.dom.append(JMVC.dom.body(), container);
	}*/
});	