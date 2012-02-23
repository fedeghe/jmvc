JMVC.controllers.Info = function() {
	this.index = function() {
		
		/*  */
		this.require('xml2json');
		
		/* get doc from xml */
		var d =JMVC.io.get(JMVC.vars.baseurl+'/media/documentation.xml'),
			jsondoc = JMVC.xml2json.parser(d);
		console.debug(JMVC);
		
		
		JMVC.head.addstyle(JMVC.vars.baseurl+'/media/css/info.css');
		
		var main  = JMVC.getView('info');
		var readme = JMVC.getView('readme');
		main.set('nome', this.get('name') || 'Guest');
		readme.set('fr', '<b style="font-size:26px;position:relative;top:8px;color:green;font-weight:bold">&#9758;</b>');
		
		
		var doc_tpl = JMVC.getView('doctpl'),
			doc = JMVC.getModel('Doc');
		
		var ret='', tmp;
		
		
		for(var k in jsondoc.doc.functions) {
			ret+='<h3><u>'+jsondoc.doc.functions[k]['name']+'</u></h3>';
			for(var t=0, len = jsondoc.doc.functions[k]['function'].length; t<len; t++) {
				//adjust parameters
				var h = '';
				if(! jsondoc.doc.functions[k]['function'][t]['params']['param'].length ) {
					h += '<label>'+jsondoc.doc.functions[k]['function'][t]['params']['param']['name']+'</label> : '+jsondoc.doc.functions[k]['function'][t]['params']['param']['desc'];
				}else{
					for(var k2 =0, l2 =jsondoc.doc.functions[k]['function'][t]['params']['param'].length; k2<l2; k2++) {
						h += '<label>'+jsondoc.doc.functions[k]['function'][t]['params']['param'][k2]['name']+'</label> : '+jsondoc.doc.functions[k]['function'][t]['params']['param'][k2]['desc']+'<br />';
					}
				}
				doc.set('parameters',h,true);
				doc.set(jsondoc.doc.functions[k]['function'][t],true);
				doc.set('bg1', 'cl1_'+jsondoc.doc.functions[k]['name']);
				doc.set('bg2', 'cl2_'+jsondoc.doc.functions[k]['name']);
				ret += doc_tpl.reset().parse(doc).content;
				doc.reset();
			}
		}
		
		readme.set('desc', ret);
		
		JMVC.mac.titlesay();

		main.parse().render();
	};
};