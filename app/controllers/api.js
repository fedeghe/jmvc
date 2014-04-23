JMVC.controllers.api = function () {

	'use strict';

	this.action_index = function () {
		JMVC.require(
			'widget/tabs/tabs',
			'core/codeview/script/script',
			'core/xmlparser/xmlparser',
			'core/mobile/mobile',
			'core/responsive/basic/basic',
			'widget/countdown/countdown',
			'vendors/github/forkme/forkme'
		);
		JMVC.events.loadify(500);
		JMVC.head.addstyle(JMVC.vars.baseurl + '/media/css/core/api.css', true, false);// parsed
		JMVC.head.favicon('/media/favicon.ico');
		
		var main  = JMVC.getView('vacuum'),
			doc_tpl = JMVC.getView('api/doctpl'),
			apintro = JMVC.getView('api/apintro'),
			func_model = JMVC.getModel('api/function'),
			//field_model = JMVC.getModel('api/field'),
			tab_ext = new JMVC.tabs.tab(/*'o'*/),
			tabs_inner = {},
			sections = [
				'jmvc', 'constructors', 'model', 'view',
				'controller', 'dom', 'events', 'head',
				'io', 'array', 'object', 'string',
				'util', 'match'
			];
			
			
		main.set('id', 'desc');

		JMVC.io.get(JMVC.vars.baseurl + '/media/documentation.xml', function (doc) {

			/* get a parser */
			var parser = new JMVC.xmlparser.load(doc),

				add_all = function (section, strsection) {
				
					var params = '',
						sample = false,
						testlink = false,
						default_param_val = false,
						runlabel = '&#8227;',
						i = 0, t = 0, len = 0,
						els = section['function'] instanceof Array ?
							section['function']
							:
							[section['function']],
						trialbutt;



					for (i in section['function']) {
						// prepare content
						func_model.reset();
						func_model.set({
							'func' : section['function'][i].signature['#text'],
							'description' : section['function'][i].description['#text'],
							'status' : section['function'][i].status ? section['function'][i].status['#text'] : 'undefined'
						});
						
						
						//func_model.set({bg1 : 'bg1', bg2 : 'bg2'});
						
						// reset params
						params = '';
						default_param_val = false;
						testlink = section['function'][i].testlink ? section['function'][i].testlink['#text'] : false;
						sample = 'no sample code given yet';
						trialbutt = '<button class="trynow round8 roundbottom" onclick="%docode%">' + runlabel + '</button>';
						

						if (section['function'][i].params.param instanceof Array) {
							for (t = 0, len = section['function'][i].params.param.length; t < len; t += 1) {
								section['function'][i].params.param[t]['@attributes'].default && (default_param_val = section['function'][i].params.param[t]['@attributes'].default);

								params += '<label>' +
									section['function'][i].params.param[t]['@attributes'].name +
									'</label> : ' +
									section['function'][i].params.param[t]['#text'] +
									(default_param_val ? '&nbsp;(default: ' + default_param_val + ')' : '') +
								'<br />';

								default_param_val = false;
							}
						} else {
							params += '<label>' + section['function'][i].params.param['@attributes'].name + '</label> : ' + section['function'][i].params.param['#text'] + '<br />';
						}
						if (section['function'][i].sample) {
							sample = '<pre class="code round6 roundright">' + section['function'][i].sample['#text'] + '</pre>';
							if (section['function'][i].code) {
								sample += JMVC.string.replaceall(trialbutt, {docode :  section['function'][i].code['#text']});
							}
						}
						
						func_model.set({
							testlink : testlink ? '<a target="_blank" class="testLink" href="' + JMVC.vars.baseurl + JMVC.US + testlink + '">test</a>' : false,
							parameters : params,
							returns : section['function'][i].returns['#text']
						});

						sample && func_model.set('sample', sample);
						
						tabs_inner[strsection].add(
							section['function'][i].signature['@attributes'].name,
							doc_tpl.reset().parse(func_model).content
						);
					}
				};

			JMVC.each(sections, function (t) {
				var y;
				parser.pointer(parser.xmlDoc.getElementsByTagName(t)[0]);
				y = JMVC.xmlparser.toJson(parser.pointer());
				tabs_inner[t] = new JMVC.tabs.tab('v');
				tab_ext.add(t, '');
				add_all(y, t);
			});
			
			main.setFromUrl('nome', 'Guest');

		}, false);
		
		apintro.set('postmessage', 'Thank You');
		main.set('content', '{{apintro}}<p class="rendertime">Rendering time: <strong>[[JMVC.vars.rendertime]]</strong> ms</p>');
		/* main.set('content', '{{apintro postmessage=`hello`}}<p style="color:#fff">Rendering time: <strong>[[JMVC.vars.rendertime]]</strong> ms</p>'); */
		
	
		main.parse().render(function () {
			var i = tab_ext.render('desc', JMVC.util.uniqueid);
			JMVC.head.title('JMVC API');
			JMVC.mobile.topHide();

			JMVC.github.forkme('fedeghe');
			
			JMVC.widget.countdown.start('#countdown', new Date(2014, 4, 27));
			
			JMVC.events.delay(function () {
				for (var j = 0, l = sections.length;  j < l; j++) {
					tabs_inner[sections[j]].render(i[j], JMVC.util.uniqueid);
				}
			}, 0);

			JMVC.tabs.render();
		});
	};
};