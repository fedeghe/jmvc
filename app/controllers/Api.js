JMVC.require('tabs');

JMVC.controllers.Api = function(){	
	this.index = function(){
		var main  = JMVC.getView('info'),
			doc_tpl = JMVC.getView('doctpl'),
			doc_model = JMVC.getModel('Doc');
		
		JMVC.head.addstyle(JMVC.vars.baseurl+'/media/css/info.css', true);// parsed
		
		JMVC.require('xmlparser');
		var tab_ext,
			tabs_inner = {};
		JMVC.io.get(JMVC.vars.baseurl+'/media/documentation.xml',function(doc){
			
			var parser = new JMVC.xmlparser.load(doc);

			parser.extractor(function(node){
				//JMVC.debug('node is ',node);
				var ret = {
					signature: JMVC.xmlparser._text(node.childNodes[0]),
					description:JMVC.xmlparser._text(node.childNodes[1]),
					params : {},
					returns : {
						type : JMVC.xmlparser._text(node.childNodes[3]),
						hint : JMVC.xmlparser._attribute(node.childNodes[3], 'hint')
					}
				};
				for(var j = 0, l= node.childNodes[2].childNodes.length; j<l; j++){
					ret.params[  JMVC.xmlparser._attribute(node.childNodes[2].childNodes[j], 'name')  ]  =  JMVC.xmlparser._text(node.childNodes[2].childNodes[j]);					
				}
				return ret;
			});
			var jmvc,model,view,controller,dom,events,head,util,io;
			//move to jmvc section
			parser.pointer(parser.xmlDoc.getElementsByTagName('jmvc')[0]);
			jmvc = JMVC.xmlparser.toJson(parser.pointer());
			
			parser.pointer(parser.xmlDoc.getElementsByTagName('model')[0]);
			model = JMVC.xmlparser.toJson(parser.pointer());
			
			parser.pointer(parser.xmlDoc.getElementsByTagName('view')[0]);
			view = JMVC.xmlparser.toJson(parser.pointer());
			
			parser.pointer(parser.xmlDoc.getElementsByTagName('controller')[0]);
			controller = JMVC.xmlparser.toJson(parser.pointer());
			
			parser.pointer(parser.xmlDoc.getElementsByTagName('dom')[0]);
			dom = JMVC.xmlparser.toJson(parser.pointer());
			
			parser.pointer(parser.xmlDoc.getElementsByTagName('events')[0]);
			events = JMVC.xmlparser.toJson(parser.pointer());
			
			parser.pointer(parser.xmlDoc.getElementsByTagName('head')[0]);
			head = JMVC.xmlparser.toJson(parser.pointer());
			
			parser.pointer(parser.xmlDoc.getElementsByTagName('util')[0]);
			util = JMVC.xmlparser.toJson(parser.pointer());
			
			parser.pointer(parser.xmlDoc.getElementsByTagName('io')[0]);
			io = JMVC.xmlparser.toJson(parser.pointer());
			//jmvc = parser.extractall();
			
			
			var add_all = function(section, strsection){
				
				for (var i in section['function']) {
					//prepare content
					doc_model.reset();
					doc_model.set('func', section['function'][i].signature['#text']);
					doc_model.set('description', section['function'][i].description['#text']);
					//prepare params
					var params ='';
					for(var t=0, len = section['function'][i].params.param.length; t<len; t++) {
						params += '<label>' + section['function'][i].params.param[t]['@attributes'].name +'</label> : ' + section['function'][i].params.param[t]['#text'] + '<br />';
					}
					doc_model.set('parameters', params);
					doc_model.set('returns', section['function'][i].returns['#text']);
					tabs_inner[strsection].add(
						section['function'][i].signature['@attributes'].name,
						doc_tpl.reset().parse(doc_model).content
					);
				}
			};
			
			tab_ext = new JMVC.tabs.tab();
			tabs_inner['jmvc'] = new JMVC.tabs.tab('v');
			tabs_inner['model'] = new JMVC.tabs.tab('v');
			tabs_inner['view'] = new JMVC.tabs.tab('v');
			tabs_inner['controller'] = new JMVC.tabs.tab('v');
			tabs_inner['dom'] = new JMVC.tabs.tab('v');
			tabs_inner['events'] = new JMVC.tabs.tab('v');
			tabs_inner['head'] = new JMVC.tabs.tab('v');
			tabs_inner['util'] = new JMVC.tabs.tab('v');
			tabs_inner['io'] = new JMVC.tabs.tab('v');
			tab_ext.add('jmvc','');
			add_all(jmvc, 'jmvc');
			
			tab_ext.add('model','');
			add_all(model, 'model');
			
			tab_ext.add('view','');
			add_all(view, 'view');
			
			tab_ext.add('controller','');
			add_all(controller,'controller');
			
			tab_ext.add('dom','');
			add_all(dom,'dom');
			
			tab_ext.add('events','');
			add_all(events,'events');
			
			tab_ext.add('head','');
			
			tab_ext.add('util','');
			add_all(util,'util');
			
			tab_ext.add('io','');
			add_all(io,'io');
			
			main.set_from_url('nome', 'Guest');	
		},true);
		
		
		
		main.render({cback:function(){
				var i = tab_ext.render('desc', '');
				tabs_inner['jmvc'].render(i[0], '');
				tabs_inner['model'].render(i[1], '');
				tabs_inner['view'].render(i[2], '');
				tabs_inner['controller'].render(i[3], '');
				tabs_inner['dom'].render(i[4], '');
				tabs_inner['events'].render(i[5], '');
				tabs_inner['head'].render(i[6], '');
				tabs_inner['util'].render(i[7], '');
				tabs_inner['io'].render(i[8], '');

			}});
		
	};
	
	
	
	this.trial = function(){
		//load api xml
		
		
		
		
		//this.render('hello');
		
		JMVC.require('xmlparser');
		JMVC.io.getXML(JMVC.vars.baseurl+'/media/documentation.xml', function(content){
			
			
			JMVC.debug (content);
			
			// TODO UHHHHHHHHHHHHHH
			
			var t = JMVC.xmlparser.toJson(content);
			console.debug(t);
			
		});
		
	}
}
