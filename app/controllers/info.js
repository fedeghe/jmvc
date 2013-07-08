JMVC.controllers.info = function () {
	//
	//
	//
	this.index = function () {
		//
		JMVC.events.loadify(500);
		JMVC.require(
			'core/codeview/script',
			'google/analytics', 'sniffer', 'dim', 'css');
		var main  = JMVC.getView('info'),
			readme = JMVC.getView('readme'),
			features = JMVC.getView('features'),
			doc_tpl = JMVC.getView('api/doctpl'),
			doc = JMVC.getModel('api/function'),
			ret='',
			h = '',
			f,
			k, k2, t,
			len, l2,
			tmp,
			jsondoc = JMVC.io.getJson(JMVC.vars.baseurl + '/media/documentation.json');

		JMVC.set('my_table_style', 'padding:2px; background-color:#ccc');
		JMVC.head.addstyle(JMVC.vars.baseurl + '/media/css/info.css', true);// parsed
		//	
		//main.set('nome', this.get('nome') || 'Guest');	
		// can be shorted to
		main.set_from_url('nome', 'Guest');
		//
		//
		
		//
		features.set('fr', '<b class="index">&#9758;</b>');
		//
		//
		//
		//
		//
		//
		/* yeah, that`s pretty ugly, but You'll surely find a better way to do that,!...so, let me know please */
		//JMVC.debug(jsondoc.doc.functions.length);
		for (k in jsondoc.doc.functions) {
			ret += '<h3 class="apisection">' + jsondoc.doc.functions[k]['name'] + '</h3>';
			//
			f = jsondoc.doc.functions[k]['functions'];

			if (f.length) {
				for(t=0, len = f.length; t < len; t += 1) {
					//adjust parameters
					h = '';
					if (f[t]['params']) {
						if (!f[t]['params']['param'].length) {
							h += '<label>' + f[t]['params']['param']['name']+'</label> : ' + f[t]['params']['param']['desc'];
						} else {
							if (f[t]['params']) {
								for (k2 =0, l2 = f[t]['params']['param'].length; k2 < l2; k2 += 1) {
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
			} else {
				//adjust parameters
				h = '';
				if (f['params']) {

					if (!f['params']['param'].length ) {
						h += '<label>' + f['params']['param']['name'] + '</label> : '+f['params']['param']['desc'];
					}else{
						for(var k2 =0, l2 =f['params']['param'].length; k2<l2; k2++) {
							h += '<label>'+f['params']['param'][k2]['name']+'</label> : '+f['params']['param'][k2]['desc']+'<br />';
						}
					}
				}
				doc.set('parameters',h,true);
				doc.set(f,true);
				doc.set('bg1', 'cl1_' + jsondoc.doc.functions[k]['name']);
				doc.set('bg2', 'cl2_' + jsondoc.doc.functions[k]['name']);
				ret += doc_tpl.reset().parse(doc).content;
				doc.reset();
			}
			ret += '<p>$legend$</p>';
		}

		readme.set('desc', ret);
		readme.set('version', JMVC.vars.version);
		readme.set('review', JMVC.vars.review);
		readme.set('last_modified', JMVC.vars.last_modified);
		readme.set('legend', '<b>*</b> : mandatory parameter');

		//JMVC.require('trial');
		//JMVC.mac.titlesay();

		main.parse().render(function(){
			JMVC.head.title('JMVC :: info');
		});
	};
};
