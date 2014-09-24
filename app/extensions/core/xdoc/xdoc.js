// type : LIB
//


// CONSOLE SAMPLE:
// JMVC.xdoc('core/xmlparser/xmlparser')

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
		scroll = 0,
		margin = 10,
		
		scrollTop, container,

		templates = {
			LIB : {},
			FACTORY_METHOD : {},
			CONSTRUCTOR : {},
			CONSTRUCTORS : {}
		};

	function toggle(ext) {
		
		ext && JMVC.require(ext.replace('.', '/'));

		_status = !_status;

		JMVC.head.title(_status ? etitle : otitle);	

		if (!_status) {
			//remove the whole node
			JMVC.dom.remove(JMVC.dom.find('#' + _id));

			// enable back scroll
			JMVC.events.enable_scroll();

			// get back to the previous vertical scrolling
			JMVC.W.scrollTo(0, scroll);

		} else {

			// save scroll vertical position
			scroll = JMVC.screen.getScreenData().scrollTop;

			// scroll to top
			JMVC.W.scrollTo(0, 1);

			JMVC.events.disable_scroll();			

			//render with widgzard
			JMVC.xdoc.show(ext);
		}
	}

	function show(ext) {

		// get the json from xml
		//
		var xmlparser = new JMVC.xmlparser.load(JMVC.xdoc.elements[ext], true),
			doc = xmlparser.toJson(),
			rootTagName = xmlparser.root().tagName;

		JMVC.core.widgzard.render({
			target : JMVC.dom.body(),
			content : [{
					tag : 'div',
					attrs : {
						id : _id,
						'class' : 'jmvc_xdoc respfixed round8',
					},
					style : {
						left : margin + 'px',
						right : margin + 'px',
						top : margin + 'px',
						bottom : margin + 'px'
					},
					content : [{
							tag : 'div',
							attrs : {
								'class' : "close respfixed",
								title : 'close',
								onclick : "JMVC.xdoc.toggle()"
							},
							content : [{
								tag : 'span',
								attrs : {
									'class' : 'txt'
								},
								html : 'x'
							}]
						},{
							tag : 'div',
							content : [{
									attrs : {'class':'respfixed'},
									tag : 'h1',
									html : 'Description'
								},{
									tag : 'p',
									attrs : {'class':'round8'},
									style :{'background-color' : '#ddd'},
									html : 'xxx'//doc.description['#text']
								},{
									html : '....now get all info from xml2json and use the Widgzard'
								}
							]
						}
					]
				}
			]
		}, false);


/*
		JMVC.core.widgzard.render({
			target : node,
			content : [{
				attrs : {'class':'respfixed'},
				tag : 'h1',
				html : 'Description'
			},{
				tag : 'p',
				attrs : {'class':'round8'},
				style :{'background-color' : '#ddd'},

				html : doc.description['#text']
			},{
				html : '....now get all info from xml2json and use the Widgzard'
			}]
		});
*/
		
	}





	return {
		toggle : toggle,
		show : show
	};

});


	
	

	