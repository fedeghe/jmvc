JMVC.controllers.Info = function() {
	this.index = function() {
		
		
		var jsondoc = JMVC.io.ejson(JMVC.vars.baseurl+'/media/documentation.json'),
			main  = JMVC.getView('info'),
			readme = JMVC.getView('readme'),
			features = JMVC.getView('features'),
			doc_tpl = JMVC.getView('doctpl'),
			doc = JMVC.getModel('Doc'),
			ret='',
			h = '',
			tmp;
		
		JMVC.set('my_table_style', 'border:2px solid #ddd; padding:2px; background-color:#aaa');
		JMVC.head.addstyle(JMVC.vars.baseurl+'/media/css/info.css', true);// parsed
		
		
		//main.set('nome', this.get('nome') || 'Guest');
		// can be shorted to
		main.setFromUrl('nome', 'Guest');
		
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
		/*
		readme.set('desc', ret);
		readme.set('version', '0.4');
		readme.set('legend', '<b>*</b> : mandatory parameter');
		*/
		readme.set({'desc':ret,'version':'0.4','legend':'<b>*</b> : mandatory parameter'});
		this.require('trial');
		JMVC.mac.titlesay();

		main.parse().render();
	};
};
