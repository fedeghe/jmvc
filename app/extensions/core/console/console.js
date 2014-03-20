JMVC.require(
	'core/dim/dim',
	'core/lib/grind/grind',
	'event_scroll/event_scroll'
);

JMVC.extend('console', {

	init : function () {
		JMVC.head.meta("generator", "jmvc resident in your machine");
		JMVC.console._ = {
			status : false,
			scroll : 0,
			tpl : '<!DOCTYPE html>'+
				'<html>'+
					'<head>'+
						'<style type="text/css">body{background-color:white} html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:"";content:none}table{border-collapse:collapse;border-spacing:0}</style>'+
						'<style type="text/css">%style%</style>'+
					'</head>'+
					'<body>%body%</body>'+
				'</html>',
			options : '<div class="pad20">'+
					'<legend>Load external<legend>'+
					'<select id ="fw">'+
						'<option value="" selected="selected">No libraries</options>'+
						'<optgroup label="jQuery">'+
							'<option value="http://codeorigin.jquery.com/jquery-1.10.2.min.js">jQuery 1.10.2</option>'+
							'<option value="http://codeorigin.jquery.com/jquery-1.9.1.min.js">jQuery 1.9.1</option>'+
						'</optgroup>'+
					'</select>'+
				'</div>'
		}
	},
	
	toggle : function () {
		var fsmode = false,
			title = JMVC.head.title();

		if (JMVC.console._.status) {

			JMVC.dom.remove(JMVC.dom.find('#jmvc-console'));
			JMVC.events.enable_scroll();
			JMVC.W.scrollTo(0, JMVC.console._.scroll);

		} else {

			var jmvc_iframe_file = 'jmvc.min.js',
				dims = JMVC.dim.getViewportSize(),
				border_size = 0,
				margin = -1,
				top_height = 10,
				foot_height = 100,
				screendata = JMVC.dim.getScreenData(),
				scrollTop = screendata.scrollTop,
				triBrdCol = '#606060',

				// main container
				container = JMVC.dom.create(
					'div',{
						'id' : 'jmvc-console',
						'class' : 'jmvc-console',
						'style' : 'left:' + margin + 'px;right:' + margin + 'px;top:' + margin + 'px;bottom:' + margin + 'px;border:' + border_size + 'px solid black'
					}
				),

				content = {
					h : JMVC.p.h ? decodeURIComponent(JMVC.p.h) : "<div id='hw'>hello world</div>",
					j : JMVC.p.j ? decodeURIComponent(JMVC.p.j) : "var t = document.getElementById('hw');\nt.onclick = function () {t.innerHTML='clicked'; };",
					c : JMVC.p.c ? decodeURIComponent(JMVC.p.c) : "#hw{\n\tcolor:red;\n\tfont-family:arial, sans-serif;\n\tpadding:20px;\n\tfont-size:20px\n}"
				},
				// triangle = {
				// 	 tag : "div",
				// 	 "float" : "right",
				// 	 style  : {"height":"0px","width":"0px","borderBottom":"30px solid " + triBrdCol,"borderLeft":"20px solid #333", "marginTop":"-10px"}
				// },
				brd = '<div class=" gbox" style="float: right; height: 0px; width: 0px; border-bottom: 30px solid rgb(96, 96, 96); border-left: 20px solid rgb(51, 51, 51); margin-top: -10px;"></div>',
				version = 0.3,
				defaults = {
					h : '<!-- no html content -->',
					j : '/* no javascript content */',
					c : '/* no css content */'
				},
				config  = [
					{
						"target" : '#jmvc-console',
						"tag" : "div",
						"class" : "console-head",
						"inner" : [
							{
								"tag":"div",
								"float":"left",
								"html" : "<a href='" + JMVC.vars.baseurl + "'><img src='/media/img/jmvc_m1.svg' width='60'/></a>",
								"style" : {"marginTop":"12px", "marginLeft":"10px"}
							},{
								"tag":"h5",
								"float":"left",
								"html":"web console v." + version,
								"style" : {"color":"#888", "paddingLeft":"10px"}
							},{
								"tag":"button",
								"float":"left",
								"html":"GET URL",
								"attrs" : {"id":"get-url"},
								"class" : "round4"
							},{
								"tag":"button",
								"float":"left",
								"html":"FullScreen",
								"attrs" : {"id":"go-fs"},
								"class" : "round4"
							},

							////////////////////////////////////////

							{
								"tag":"a",
								"attrs" : {"id" : "options", "href":"#options"},
								"class" : "ablock",
								"float":"right",
								"inner" : [
									{
										"tag":"div",
										"class":"round4 roundtop text",
										"float":"right"
									},{
										"tag":"div",
										"float":"right",
										"class":"tri"
									}
								]
							},{
								"tag":"a",
								"attrs" : {"id" : "preview", "href":"#preview"},
								"class" : "ablock",
								"float":"right",
								"inner" : [
									{
										"tag":"div",
										"class":"round4 roundtop text",
										"float":"right"
									},{
										"tag":"div",
										"float":"right",
										"class":"tri"
									}
								]
							},{
								"tag":"a",
								"attrs" : {"id" : "css", "href":"#css"},
								"class" : "ablock",
								"float":"right",
								"inner" : [
									{
										"tag":"div",
										"class":"round4 roundtop text",
										"float":"right",
										"html":"CSS"
									},{
										"tag":"div",
										"float":"right",
										"class":"tri"
									}
								]
							},{
								"tag":"a",
								"attrs" : {"id" : "javascript", "href":"#javascript"},
								"class" : "ablock",
								"float":"right",
								"inner" : [
									{
										"tag":"div",
										"class":"round4 roundtop text",
										"float":"right",
										"html":"JAVASCRIPT"
									},{
										"tag":"div",
										"float":"right",
										"class":"tri"
									}
								]
							},{
								"tag":"a",
								"attrs" : {"id" : "html", "href":"#html"},
								"class" : "ablock",
								"float":"right",
								"inner" : [
									{
										"tag":"div",
										"class":"round4 roundtop text",
										"float":"right",
										"html":"HTML"
									},{
										"tag":"div",
										"float":"right",
										"class":"tri"
									}
								]
							},
							"clearer"
						]
					},{
						"tag" : "div",
						"target" : "#jmvc-console",
						"class" : "input-divs",
						"inner" : [
							{
								"tag" : "div",
								"attrs" : {"id" : "in-html"},
								"class" : "in-html inputdiv",
								"inner": [{
									"tag" : "textarea",
									"attrs" : {"id":"content-html"},
									"style" : {"height" : (dims.height - 60) + "px", "border":"none"},
									"html" : content.h
								}]
							},{
								"tag" : "div",
								"attrs" : {"id" : "in-javascript"},
								"class" : "in-javascript inputdiv",
								"inner": [{
									"tag" : "textarea",
									"attrs" : {"id":"content-javascript"},
									"style" : {"height" : (dims.height - 60) + "px", "border":"none"},
									"html" : content.j
								}]
							},{
								"tag" : "div",
								"attrs" : {"id" : "in-css"},
								"class" : "in-css inputdiv",
								"inner": [{
									"tag" : "textarea",
									"attrs" : {"id":"content-css"},
									"style" : {"height" : (dims.height - 60) + "px", "border":"none"},
									"html" : content.c
								}]
							},{
								"tag" : "div",
								"attrs" : {"id" : "in-preview"},
								"class" : "in-preview inputdiv",
								"inner": [{
									"tag":"iframe",
									//"style" : {"position":"fixed", "top":"0px", "left":"0px", "bottom":"0px", "right":"0px", "width":"100%", "height":"100%", "border":"none", "margin":"0", "padding":"0", "overflow":"hidden", "zIndex":999999},
									"attrs":{"id":"outarea", "width":"100%","height":(dims.height - 60) + "px"}
								}]
							},{
								"tag" : "div",
								"attrs" : {"id" : "in-options"},
								"class" : "in-options inputdiv",
								"html": JMVC.console._.options
							}
						]
					}
				],
				hash = false;

			function getUrl() {
				var vals = getValues(),
					url = [JMVC.vars.baseurl, JMVC.c, JMVC.a].join(JMVC.US) + JMVC.object.toQs({
						h : vals[0] || defaults.h,
						j : vals[1] || defaults.j,
						c : vals[2] || defaults.c,
						l : JMVC.dom.find('#fw').value
					}) + (hash ? "#" + hash : '');
				prompt("Copy the following url", url);
			}

			function getValues() {
				return [
					JMVC.dom.find('#content-html').value,
					JMVC.dom.find('#content-javascript').value,
					JMVC.dom.find('#content-css').value
				];
			}
			function appenderCode (src) {
				return  '(function() {'+
					'var l = document.createElement("script");' +
					'l.type = "text/javascript";' +
					'l.src = "' + src + '";' +
					'var s = document.getElementsByTagName("head")[0];' +
					's.appendChild(l);' +
				'})();'
			}
			
			function update(){
				var vals = getValues(),
					h = vals[0] || defaults.h,
					j = vals[1] || defaults.j,
					c = vals[2] || defaults.c,
					iframe = JMVC.dom.find('#outarea'),
					lib = JMVC.dom.find('#fw').value;

				JMVC.dom.find('#outarea').contentDocument.documentElement.innerHTML = JMVC.string.replaceall(
					JMVC.console._.tpl, {
						'style' : c,
						'body' : h,
						'options' : JMVC.console._.options
					}
				);

				//exit fullscreen
				JMVC.dom.find('#outarea').contentWindow.document.onkeyup =  function (e) {
					if (fsmode && e.keyCode == 27) {
						JMVC.head.title(title);
						JMVC.css.style(JMVC.dom.find('#outarea'),{'position':'relative'});
						fsmode = false;
					};
				}
				try {
					var dl = JMVC.WD.location;
					iframe.contentWindow.eval('var JMVCshut = true; ')
					iframe.contentWindow.eval(appenderCode( '/app/' + jmvc_iframe_file));
					!!lib && iframe.contentWindow.eval(appenderCode(lib));
					iframe.contentWindow.eval(j);
				}catch(e){
					console.error(e);
				}
			}

			function gofs(){
				JMVC.head.title('Press esc to exit preview');
				JMVC.css.style(JMVC.dom.find('#outarea'), {
					position : 'absolute',
					top :'0px',
					left :'0px',
					width :'100%',
					height :'100%'
				});
				JMVC.dom.find('#outarea').contentDocument.documentElement.focus();
				fsmode = true;
			}



			//save scroll vertical position
			JMVC.console._.scroll = scrollTop;

			//scroll to top
			JMVC.W.scrollTo(0, 1);

			//disable scroll
			JMVC.events.disable_scroll();

			JMVC.set('height', dims.height - 60);
			JMVC.head.addstyle(JMVC.vars.baseurl + '/app/extensions/core/console/console.css', true);
			JMVC.dom.append(JMVC.dom.body(), container);
			JMVC.grind.render(config);

			//lib
			if(JMVC.p.l) {
				JMVC.dom.find('#fw').value = decodeURIComponent(JMVC.p.l);
			}

			if (JMVC.hash.match(/html|css|javascript|preview|options/)) {
				JMVC.dom.addClass(JMVC.dom.find('#' + JMVC.hash), 'active');
				JMVC.css.show(JMVC.dom.find('#in-' + JMVC.hash));
				hash = JMVC.hash;
			} else {
				JMVC.dom.addClass(JMVC.dom.find('#html'), 'active');
				JMVC.css.show(JMVC.dom.find('#in-html'));
			}

			if (hash == 'preview') {
				JMVC.css.show(JMVC.dom.find('#go-fs'));
			}



			JMVC.events.bind(JMVC.dom.find('.ablock'), 'click', function (e) {
				var butt = JMVC.dom.find(this),
					id =  JMVC.dom.attr(butt, 'id') || 'xxx';
				butt.blur();

				JMVC.each(JMVC.dom.find('.ablock'), function (elbutt){
					JMVC.dom.removeClass(elbutt, 'active');
				});
				JMVC.dom.addClass(butt, 'active');
				hash = id;

				JMVC.each(JMVC.dom.find('.inputdiv'), function (el){
					JMVC.css.style(el, 'display', 'none');
				});
				JMVC.css.style(JMVC.dom.find('#in-' + id), 'display', 'block');

				if (id == 'preview') {
					JMVC.css.show(JMVC.dom.find('#go-fs'));
				} else {
					JMVC.css.hide(JMVC.dom.find('#go-fs'));
				}

			});

			//enable tab on textareas
			JMVC.each(JMVC.dom.find('textarea'), function (el) {
				el.onkeydown = function (e) {
					var textarea = this,
						input,
						remove,
						posstart,
						posend,
						compensateForNewline,
						before,
						after,
						selection,
						val;

					if (e.keyCode == 9) { // tab
						input = textarea.value; // as shown, `this` would also be textarea, just like e.target
						remove = e.shiftKey;
						posstart = textarea.selectionStart;
						posend = textarea.selectionEnd;

						// if anything has been selected, add one tab in front of any line in the selection
						if (posstart != posend) {
							posstart = input.lastIndexOf('\n', posstart) + 1;
							compensateForNewline = input[posend - 1] == '\n';
							before = input.substring(0, posstart);
							after = input.substring(posend - (~~compensateForNewline));
							selection = input.substring(posstart, posend);

							// now add or remove tabs at the start of each selected line, depending on shift key state
							// note: this might not work so good on mobile, as shiftKey is a little unreliable...
							if (remove) {
								if (selection[0] == '\t') {
									selection = selection.substring(1);
								}
								selection = selection.split('\n\t').join('\n');
							} else {
								selection = selection.split('\n');
								if (compensateForNewline){
									selection.pop();	
								} 
								selection = '\t'+selection.join('\n\t');
							}

							// put it all back in...
							textarea.value = before+selection+after;
							// reselect area
							textarea.selectionStart = posstart;
							textarea.selectionEnd = posstart + selection.length;
						} else {
							val = textarea.value;
							textarea.value = val.substring(0,posstart) + '\t' + val.substring(posstart);
							textarea.selectionEnd = textarea.selectionStart = posstart + 1;
						}
						e.preventDefault(); // dont jump. unfortunately, also/still doesnt insert the tab.
					}
				}
			});

			JMVC.events.bind(JMVC.dom.find('#get-url'), 'click', getUrl);
			JMVC.events.bind(JMVC.dom.find('#go-fs'), 'click', gofs);
			JMVC.events.bind(JMVC.dom.find('#preview'), 'click', update);


			JMVC.events.delay(function () {update(); }, 0);

			//fullscreen ?
			JMVC.p.fullscreen && gofs();
		}
		JMVC.console._.status = !JMVC.console._.status;
	}
});	