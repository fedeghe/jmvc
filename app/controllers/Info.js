JMVC.controllers.Info = function() {
	this.index = function() {

		if(JMVC.vars.baseurl=='http://www.jmvc.org'){
			JMVC.head.addscript("{{analytics}}", true, true);
		}


		var jsondoc = JMVC.io.ejson(JMVC.vars.baseurl+'/media/documentation.json'),
			main  = JMVC.getView('info'),
			readme = JMVC.getView('readme'),
			features = JMVC.getView('features'),
			doc_tpl = JMVC.getView('doctpl'),
			doc = JMVC.getModel('Doc'),
			ret='',
			h = '',
			tmp;

		JMVC.set('my_table_style', 'padding:2px; background-color:#ccc');
		//JMVC.set('my_table_style', 'padding:2px; background-color:#000');

		JMVC.head.addstyle(JMVC.vars.baseurl+'/media/css/info.css', true);// parsed


		//main.set('nome', this.get('nome') || 'Guest');
		// can be shorted to
		main.set_from_url('nome', 'Guest');

		features.set('fr', '<b style="font-size:26px;position:relative;top:0px;color:green;font-weight:bold">&#9758;</b>');





		/* yeah, that`s pretty ugly, but You'll surely find a better way to do that,!...so, let me know please */
		//console.debug(jsondoc.doc.functions.length);
		for(var k in jsondoc.doc.functions) {
			ret+='<h3 class="apisection">'+jsondoc.doc.functions[k]['name']+'</h3>';

			var f = jsondoc.doc.functions[k]['functions'];

			if(f.length){

				for(var t=0, len = f.length; t<len; t++) {
					//adjust parameters
					var h = '';
					if(f[t]['params']){
						if(! f[t]['params']['param'].length ) {
							h += '<label>' + f[t]['params']['param']['name']+'</label> : ' + f[t]['params']['param']['desc'];
						}else{
							if(f[t]['params']){
								for(var k2 =0, l2 = f[t]['params']['param'].length; k2<l2; k2++) {
									h += '<label>'+f[t]['params']['param'][k2]['name']+'</label> : '+ f[t]['params']['param'][k2]['desc']+'<br />';
								}
							}
						}
						doc.set('parameters',h,true);
						doc.set(f[t],true);
						doc.set('bg1', 'cl1_'+jsondoc.doc.functions[k]['name']);
						doc.set('bg2', 'cl2_'+jsondoc.doc.functions[k]['name']);
						ret += doc_tpl.reset().parse(doc).content;
						doc.reset();
					}
				}
			}else{
				//adjust parameters
				var h = '';
				if(f['params']){

					if(! f['params']['param'].length ) {
						h += '<label>'+f['params']['param']['name']+'</label> : '+f['params']['param']['desc'];
					}else{
						for(var k2 =0, l2 =f['params']['param'].length; k2<l2; k2++) {
							h += '<label>'+f['params']['param'][k2]['name']+'</label> : '+f['params']['param'][k2]['desc']+'<br />';
						}
					}
				}
				doc.set('parameters',h,true);
				doc.set(f,true);
				doc.set('bg1', 'cl1_'+jsondoc.doc.functions[k]['name']);
				doc.set('bg2', 'cl2_'+jsondoc.doc.functions[k]['name']);
				ret += doc_tpl.reset().parse(doc).content;
				doc.reset();
			}
			ret+='<p>$legend$</p>';
			
			
			
		}

		readme.set('desc', ret);
		readme.set('version', 0.5);
		readme.set('legend', '<b>*</b> : mandatory parameter');

		JMVC.require('trial');
		JMVC.mac.titlesay();

		main.parse().render({cback:function(){JMVC.head.title('TTR: '+JMVC.vars.rendertime+' ms');}});
	};
	
	
	this.info2 = function(){
		var main  = JMVC.getView('info');
		
		JMVC.head.addstyle(JMVC.vars.baseurl+'/media/css/info.css', true);// parsed
		
		JMVC.require('xmlparser');
		var doc = JMVC.io.get(JMVC.vars.baseurl+'/media/documentation.xml',function(doc){
			
			var parser = new JMVC.xmlparser.load(doc);

			parser.extractor(function(node){
				//console.debug('node is ',node);
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
			
			//move to jmvc section
			//parser.pointer(parser.xmlDoc.getElementsByTagName('jmvc')[0]);
			parser.pointer(JMVC.xmlparser._tag(parser.xmlDoc,'jmvc',0));
			console.debug('func', JMVC.xmlparser._tag(parser.pointer(), 'function', 2));
			var r = parser.extractor(0);
			//console.debug(r);
			console.debug(JMVC.xmlparser.toJson(parser.pointer()));
			var all = parser.extractall();
			//console.debug(all);
			
			//step into model
			parser.pointer(parser.xmlDoc.getElementsByTagName('model')[0]);
			r = parser.extractor(0);
			
			
			
			main.set_from_url('nome', 'Guest');	
			
			console.debug('endinner');
			
		},true,true);
		
		main.render();
		console.debug('end');
		
	};
	
	
};
