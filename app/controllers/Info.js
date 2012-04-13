JMVC.controllers.Info = function() {
	this.index = function() {
		
		
		var jsondoc = eval('('+JMVC.io.get(JMVC.vars.baseurl+'/media/documentation.json')+')');
			

		
		JMVC.set('my_table_style', 'border:2px solid #ddd; padding:2px; background-color:#aaa');
		JMVC.head.addstyle(JMVC.vars.baseurl+'/media/css/info.css', true);// parsed
		
		
		//console.debug(JMVC.vars);
		
		
		var main  = JMVC.getView('info');
		
		var readme = JMVC.getView('readme');
		//readme.set('version', 0.3);
		var features = JMVC.getView('features');
		
		//main.set('nome', this.get('nome') || 'Guest');
		// can be shorted to
		main.set_from_url('nome', 'Guest');
		
		features.set('fr', '<b style="font-size:26px;position:relative;top:0px;color:green;font-weight:bold">&#9758;</b>');
		
		
		var doc_tpl = JMVC.getView('doctpl'),
			doc = JMVC.getModel('Doc');
		
		var ret='', tmp;
		
		/* yeah, that`s pretty ugly, but You'll surely find a better way to do that,!...so, let me know please */
		//console.debug(jsondoc.doc.functions.length);
		for(var k in jsondoc.doc.functions) {
			ret+='<h3 class="apisection">'+jsondoc.doc.functions[k]['name']+'</h3>';
			if(jsondoc.doc.functions[k]['function'].length){
				for(var t=0, len = jsondoc.doc.functions[k]['function'].length; t<len; t++) {
					//adjust parameters
					var h = '';
					if(jsondoc.doc.functions[k]['function'][t]['params']){
						if(! jsondoc.doc.functions[k]['function'][t]['params']['param'].length ) {
							h += '<label>'+jsondoc.doc.functions[k]['function'][t]['params']['param']['name']+'</label> : '+jsondoc.doc.functions[k]['function'][t]['params']['param']['desc'];
						}else{
							if(jsondoc.doc.functions[k]['function'][t]['params']){
								for(var k2 =0, l2 =jsondoc.doc.functions[k]['function'][t]['params']['param'].length; k2<l2; k2++) {
									h += '<label>'+jsondoc.doc.functions[k]['function'][t]['params']['param'][k2]['name']+'</label> : '+jsondoc.doc.functions[k]['function'][t]['params']['param'][k2]['desc']+'<br />';
								}
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
			}else{
				//adjust parameters
				var h = '';
				if(jsondoc.doc.functions[k]['function']['params']){
				
					if(! jsondoc.doc.functions[k]['function']['params']['param'].length ) {
						h += '<label>'+jsondoc.doc.functions[k]['function']['params']['param']['name']+'</label> : '+jsondoc.doc.functions[k]['function']['params']['param']['desc'];
					}else{
						for(var k2 =0, l2 =jsondoc.doc.functions[k]['function']['params']['param'].length; k2<l2; k2++) {
							h += '<label>'+jsondoc.doc.functions[k]['function']['params']['param'][k2]['name']+'</label> : '+jsondoc.doc.functions[k]['function']['params']['param'][k2]['desc']+'<br />';
						}
					}
				}
				doc.set('parameters',h,true);
				doc.set(jsondoc.doc.functions[k]['function'],true);
				doc.set('bg1', 'cl1_'+jsondoc.doc.functions[k]['name']);
				doc.set('bg2', 'cl2_'+jsondoc.doc.functions[k]['name']);
				ret += doc_tpl.reset().parse(doc).content;
				doc.reset();
			}
			ret+='<p>$legend$</p>';
		}
		
		readme.set('desc', ret);
		
		readme.set('legend', '<b>*</b> : mandatory parameter');
		
		this.require('trial');
		JMVC.mac.titlesay();

		main.parse().render();
	};
};