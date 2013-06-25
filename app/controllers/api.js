JMVC.require('tabs');

JMVC.controllers.api = function () {
	"use strict";
	//
	// index action
	this.index = function () {


		JMVC.events.loadify(500);

		var main  = JMVC.getView('vacuum'),
			doc_tpl = JMVC.getView('doctpl'),
			//readme = JMVC.getView('readme'),
			//features = JMVC.getView('features'),
			doc_model = JMVC.getModel('Doc');
		

		main.set('id', 'desc')

		//note that readme is a view that is only mentioned as chunk INTO info view :D
		//readme.set('desc', 'XML based documentation');
		//in the same way set fr
		//features.set('fr', '<b style="font-size:26px;position:relative;top:0px;color:green;font-weight:bold">&#9758;</b>');
		//
		
		
		JMVC.head.addstyle(JMVC.vars.baseurl + '/media/css/api.css', true);// parsed
		
		JMVC.require('xmlparser');
		var tab_ext = new JMVC.tabs.tab('o'),
			tabs_inner = {};
			
			
			
		JMVC.io.get(JMVC.vars.baseurl + '/media/documentation.xml', function (doc) {
		//JMVC.io.getXML(JMVC.vars.baseurl+'/media/documentation.xml', function(doc){
			
			//get a parser
			var parser = new JMVC.xmlparser.load(doc),
				add_all;
			//var parser = new JMVC.xmlparser.load(doc, true);
			
			// define the extractor function
			parser.extractor(function (node) {
				var ret = {
						signature: JMVC.xmlparser._text(node.childNodes[0]),
						description:JMVC.xmlparser._text(node.childNodes[1]),
						params : {},
						returns : {
							type : JMVC.xmlparser._text(node.childNodes[3]),
							hint : JMVC.xmlparser._attribute(node.childNodes[3], 'hint')
						}
					},
					i = 0,
					j = 0;

				for (i = 0, l = node.childNodes[2].childNodes.length; j < l; j += 1) {
					ret.params[JMVC.xmlparser._attribute(node.childNodes[2].childNodes[j], 'name')] = JMVC.xmlparser._text(node.childNodes[2].childNodes[j]);					
				}
				return ret;
			});
			
			
			add_all = function(section, strsection){
				
				var params = '',
					i = 0,
					t = 0,
					len = 0;
				
				//more functions =>array of function objects
				if(JMVC.util.isArray(section['function'])){
					for (i in section['function']) {
						//prepare content
						doc_model.reset();
						doc_model.set('func', section['function'][i].signature['#text']);
						doc_model.set('description', section['function'][i].description['#text']);
						
						//reset params
						params = '';

						if (JMVC.util.isArray(section['function'][i].params.param)) {
							for (t=0, len = section['function'][i].params.param.length; t < len; t += 1) {
								params += '<label>' + section['function'][i].params.param[t]['@attributes'].name + '</label> : ' + section['function'][i].params.param[t]['#text'] + '<br />';
							}
						} else {
							params += '<label>' + section['function'][i].params.param['@attributes'].name + '</label> : ' + section['function'][i].params.param['#text'] + '<br />';
						}


						doc_model.set('parameters', params);
						doc_model.set('returns', section['function'][i].returns['#text']);
						tabs_inner[strsection].add(
							section['function'][i].signature['@attributes'].name,
							doc_tpl.reset().parse(doc_model).content
						);
					}
					
				//one function => one function object
				} else if (JMVC.util.isObject(section['function'])) {
					//prepare content
						doc_model.reset();
						doc_model.set('func', section['function'].signature['#text']);
						doc_model.set('description', section['function'].description['#text']);
						
						//reset params
						params ='';

						if (JMVC.util.isArray(section['function'].params.param)) {
							for(t = 0, len = section['function'].params.param.length; t < len; t += 1) {
								params += '<label>' + section['function'].params.param[t]['@attributes'].name + '</label> : ' + section['function'].params.param[t]['#text'] + '<br />';
							}
						} else {
							params += '<label>' + section['function'].params.param['@attributes'].name + '</label> : ' + section['function'].params.param['#text'] + '<br />';
						}

						doc_model.set('parameters', params);
						doc_model.set('returns', section['function'].returns['#text']);
						tabs_inner[strsection].add(
							section['function'].signature['@attributes'].name,
							doc_tpl.reset().parse(doc_model).content
						);
				}
			};
			
			JMVC.each(['jmvc', 'model', 'view', 'controller', 'dom', 'events', 'head', 'util', 'io'], function (t) {
				parser.pointer(parser.xmlDoc.getElementsByTagName(t)[0]);
				var y = JMVC.xmlparser.toJson(parser.pointer());
				tabs_inner[t] = new JMVC.tabs.tab('v');
				tab_ext.add(t, '');
				add_all(y, t);
			});
			
			main.set_from_url('nome', 'Guest');	
			
		}, true);
		
		
		
		
		
		main.render(function () {
			var i = tab_ext.render('desc', 'ulidONE');

			JMVC.events.delay(function () {
				tabs_inner['jmvc'].render(i[0], 'ulidTWO');
				tabs_inner['model'].render(i[1], 'ulidTWO');
				tabs_inner['view'].render(i[2], 'ulidTWO');
				tabs_inner['controller'].render(i[3], 'ulidTWO');
				tabs_inner['dom'].render(i[4], 'ulidTWO');
				tabs_inner['events'].render(i[5], 'ulidTWO');
				tabs_inner['head'].render(i[6], 'ulidTWO');
				tabs_inner['util'].render(i[7], 'ulidTWO');
				tabs_inner['io'].render(i[8], 'ulidTWO');
			}, 10);

		});
		
		
		
	};
	
	
	
	this.trial = function () {
		//load api xml
		
		//this.render('hello');
		
		JMVC.require('xmlparser');
		JMVC.io.getXML(JMVC.vars.baseurl + '/media/documentation.xml', function (content) {
			JMVC.debug(content.getElementsByTagName("jmvc"));
			JMVC.debug (content);
			// TODO UHHHHHHHHHHHHHH
			//var t = JMVC.xmlparser.toJson(content);
			//console.debug(t);
		});
		
	}
}
