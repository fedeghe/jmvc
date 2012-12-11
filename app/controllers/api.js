JMVC.require('tabs');

JMVC.controllers.api = function(){
	//
	// index action
	this.index = function(){
		var main  = JMVC.getView('info'),
			doc_tpl = JMVC.getView('doctpl'),
			readme = JMVC.getView('readme'),
			features = JMVC.getView('features'),
			doc_model = JMVC.getModel('Doc');
		
		//note that readme is a view that is only mentioned as chunk INTO info view :D
		readme.set('desc', 'XML based documentation');
		//in the same way set fr
		features.set('fr', '<b style="font-size:26px;position:relative;top:0px;color:green;font-weight:bold">&#9758;</b>');
		//
		
		
		JMVC.head.addstyle(JMVC.vars.baseurl+'/media/css/info.css', true);// parsed
		
		JMVC.require('xmlparser');
		var tab_ext = new JMVC.tabs.tab('o'),
			tabs_inner = {};
			
			
			
		JMVC.io.get(JMVC.vars.baseurl+'/media/documentation.xml',function(doc){
			
			var parser = new JMVC.xmlparser.load(doc);

			parser.extractor(function (node) {
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
					ret.params[JMVC.xmlparser._attribute(node.childNodes[2].childNodes[j], 'name')]  =  JMVC.xmlparser._text(node.childNodes[2].childNodes[j]);					
				}
				return ret;
			});
			
			
			var add_all = function(section, strsection){
				
				var params = '';
				
				//more functions =>array of function objects
				if(JMVC.util.isArray(section['function'])){
					for (var i in section['function']) {
						//prepare content
						doc_model.reset();
						doc_model.set('func', section['function'][i].signature['#text']);
						doc_model.set('description', section['function'][i].description['#text']);
						
						//reset params
						params = '';

						if (JMVC.util.isArray(section['function'][i].params.param)) {
							for(var t=0, len = section['function'][i].params.param.length; t<len; t++) {
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
							for(var t=0, len = section['function'].params.param.length; t<len; t++) {
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
			
			JMVC.util.each(['jmvc','model','view','controller','dom','events','head','util','io'], function(t){
				parser.pointer(parser.xmlDoc.getElementsByTagName(t)[0]);
				var y = JMVC.xmlparser.toJson(parser.pointer());
				tabs_inner[t] = new JMVC.tabs.tab('v');
				tab_ext.add(t,'');
				add_all(y, t);
			});
			
			main.set_from_url('nome', 'Guest');	
			
		},true);
		
		
		
		
		
		
		main.render({cback : function(){

			
			var i = tab_ext.render('desc', 'ulidONE');
			//console.debug(i)
			
			JMVC.events.delay(function(){
				tabs_inner['jmvc'].render(i[0], 'ulidTWO');
				tabs_inner['model'].render(i[1], 'ulidTWO');
				tabs_inner['view'].render(i[2], 'ulidTWO');
				tabs_inner['controller'].render(i[3], 'ulidTWO');
				tabs_inner['dom'].render(i[4], 'ulidTWO');
				tabs_inner['events'].render(i[5], 'ulidTWO');
				tabs_inner['head'].render(i[6], 'ulidTWO');
				tabs_inner['util'].render(i[7], 'ulidTWO');
				tabs_inner['io'].render(i[8], 'ulidTWO');
			}, 500);
			
		}});
		
		
		
	};
	
	
	
	this.trial = function(){
		//load api xml
		
		//this.render('hello');
		
		JMVC.require('xmlparser');
		
		JMVC.io.getXML(JMVC.vars.baseurl + '/media/documentation2.xml', function(content){
			
			
			JMVC.debug (content);
			
			// TODO UHHHHHHHHHHHHHH
			
			//var t = JMVC.xmlparser.toJson(content);
			//console.debug(t);
			
		});
		
	}
}
