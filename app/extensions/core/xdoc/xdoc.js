// type : LIB
//

JMVC.require(
	'core/screen/screen'
	,'event_scroll/event_scroll'
	,'core/lib/widgzard/widgzard'
	,'core/xmlparser/xmlparser'
	,'widget/tooltip/tooltip'
);

JMVC.extend('xdoc', function () {

	JMVC.xdoc.otitle = JMVC.head.title();
	JMVC.head.title(JMVC.xdoc.etitle);
	JMVC.head.addStyle(JMVC.vars.baseurl + '/app/extensions/core/xdoc/xdoc.css', true);

	var otitle = '',
		etitle = 'Xdoc',
		_status = false,
		_id = JMVC.util.uniqueid + '',
		scroll = 0;

	function toggle(ext) {

		
		ext && JMVC.require(ext.replace('.', '/'));

		if (_status) {
			JMVC.dom.remove(JMVC.dom.find('#' + _id));
			JMVC.events.enable_scroll();
			JMVC.W.scrollTo(0, scroll);
		} else {

			var dims = JMVC.screen.getViewportSize(),
				border_size = 1,
				margin = 10,
				top_height = 10,
				foot_height = 100,
				scrollTop = JMVC.screen.getScreenData().scrollTop;
				
				// main container
				container = JMVC.dom.create(
					'div', {
						'id' : _id,
						'class' : 'jmvc_xdoc respfixed round8',
						'style' : 'left:' + margin + 'px;right:' + margin + 'px;top:' + margin + 'px;bottom:' + margin + 'px;'
					},
					'<div class="close respfixed" title="close" onclick="JMVC.xdoc.toggle()"><span class="txt">x</span></div>'
				);

			//save scroll vertical position
			scroll = scrollTop;

			//scroll to top
			JMVC.W.scrollTo(0, 1);

			//disable scroll
			JMVC.events.disable_scroll();

			JMVC.set('height', (dims.height - 70) / 2);
			
			JMVC.xdoc.show(ext, container);

			JMVC.dom.append(JMVC.dom.body(), container);
		}
		_status = !_status;
		JMVC.head.title(_status ? etitle : otitle);	
	}



	function show(ext, node) {
		
		// get the json from xml
		//
		var xmlparser = new JMVC.xmlparser.load(JMVC.xdoc.elements[ext], true),
			doc = xmlparser.toJson();

		JMVC.core.widgzard.render({
			target : node,
			content : [{
				attrs : {'class':'respfixed'},
				tag : 'h1',
				html : 'Description'
			},{
				tag : 'p',
				attrs : {'class':'round8', style :'background-color:#ddd'},
				html : doc.description['#text']
			},{
				html : 'world'
			}]
		})
		// var json = JMVC.xmlparser.toJson(JMVC.xdoc.elements[ext].childNodes[0]);
		// console.debug(json)
	
	}

	return {
		toggle : toggle,
		show : show
	};

});


	
	

	