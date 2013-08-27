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

	'scroll' : 0,

	'tpl' : '<!DOCTYPE html><html><head><style type="text/css">%style%</style><script type="text/javascript">window.onload = function () {%script%};</script></head><body>%body%</body></html>',

	'toggle' : function () {

		if (JMVC.console._status) {

			JMVC.dom.remove(JMVC.dom.find('#jmvc_console'));
			JMVC.events.enable_scroll();
			JMVC.W.scrollTo(0, JMVC.console.scroll);

		} else {

			var dims = JMVC.dim.getViewportSize(),
				border_size = 0,
				margin = -1,
				top_height = 10,
				foot_height = 100,
				scrollTop = JMVC.dim.getScreenData().scrollTop;
				
				// main container
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
						"style" : {"height" : "25px", "lineHeight" : "25px", "textAlign" : "center"},
						"inner" : [
							{
								"tag" : "input",
								"attrs" : {"type" : "button", "id" : "go", "value" : "update"},
								"style" : {"textAlign" : "center"}
							}
						]
					},
					{
						"target" : '#jmvc_console',
						"attrs" : {"id" : "consolecnt"},
						"class" : "p100",
						"inner" : [
							{
								"attrs" : {"id" : "html"},
								"float" : "left",
								"class" : "p33",
								"inner" : [{
									"attrs" : {"id" : "htmlarea"},
									"class" : "innerbox round4",
									"tag":"textarea",
									"style" : {"width": "99%"}
								}]
							},
							{
								"attrs" : {"id" : "js"},
								"float" : "left",
								"class" : "p33",
								"inner" : [{
									"attrs" : {"id" : "jsarea"},
									"class" : "innerbox round4",
									"tag":"textarea",
									"style" : {"width": "99%"}
								}]
							},
							{
								"attrs" : {"id" : "css"},
								"float" : "left",
								"class" : "p33",
								"inner" : [{
									"attrs" : {"id" : "cssarea"},
									"class" : "innerbox round4",
									"tag":"textarea",
									"style" : {"width": "99%"}
								}]
							},
							"clearer",
							{
								"attrs" : {"id" : "out"},
								"class" : "p100",
								"inner" : [{
									"class" : "innerbox round4",
									"tag":"iframe",
									"attrs" : {
										"id" : "outarea",
										"width":"100%",
										"height":"300"
									},
									"style" : {"width": "100%"}
								}]
							}
						]
					},
				];

			//save scroll vertical position
			JMVC.console.scroll = scrollTop;

			//scroll to top
			JMVC.W.scrollTo(0, 1);

			//disable scroll
			JMVC.events.disable_scroll();

			JMVC.set('height', (dims.height-70) / 2);
			JMVC.head.addstyle(JMVC.vars.baseurl + '/app/extensions/core/console/console.css', true);
			JMVC.dom.append(JMVC.dom.body(), container);
			JMVC.grind.render(config);


			JMVC.dom.html(JMVC.dom.find('#htmlarea'), JMVC.htmlspecialchars("<h1 id='hi'>hello</h1>"));
			JMVC.dom.html(JMVC.dom.find('#jsarea'), JMVC.htmlspecialchars("var foo = document.getElementById('hi');\nconsole.debug(foo);"));
			JMVC.dom.html(JMVC.dom.find('#cssarea'), JMVC.htmlspecialchars("body{\n\tbackground-color:#fede76;\n}"));


			JMVC.events.bind(JMVC.dom.find('#go'), 'click', function () {update(); });

			function update(){
				
				var h = JMVC.htmlspecialchars_decode(JMVC.dom.find('#htmlarea').value),
					j = JMVC.htmlspecialchars_decode(JMVC.dom.find('#jsarea').value),
					c = JMVC.dom.find('#cssarea').value;

				JMVC.dom.find('#outarea').contentDocument.documentElement.innerHTML = JMVC.string.replaceall(JMVC.console.tpl, {
					'style' : c,
					'script' : j,
					'body' : h
				});

				
				try {
					JMVC.dom.find('#outarea').contentWindow.eval(j);
				}catch(e){}
			}
			JMVC.events.delay(function () {update(); }, 0);
			


		}
		JMVC.console._status = !JMVC.console._status;
	}
});	