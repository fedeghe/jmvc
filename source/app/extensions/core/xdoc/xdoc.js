// type : LIB
//


// CONSOLE SAMPLE:
// JMVC.xdoc('core/xmlparser/xmlparser')

JMVC.require(
	'core/screen/screen'
	,'event_scroll/event_scroll'
	,'core/lib/widgzard/widgzard'
	,'core/lib/widgzard/engy'
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
			// remove the whole node
			// 
			JMVC.xdoc.hide();

			// enable back scroll
			// 
			JMVC.events.enable_scroll();

			// get back to the previous vertical scrolling
			// 
			JMVC.W.scrollTo(0, scroll);

		} else {

			// save scroll vertical position
			// 
			scroll = JMVC.screen.getScreenData().scrollTop;

			//render with widgzard
			//
			JMVC.xdoc.show(ext);

			// disable scroll
			// 
			JMVC.events.disable_scroll();

			// scroll to top
			// 
			JMVC.W.scrollTo(0, 1);
		}
	}

	function hide() {
		// if called directly
		// 
		_status = false;	

		JMVC.dom.remove(JMVC.dom.find('#' + _id));	
	}

	function show(ext) {

		// if called directly
		// 
		_status = true;

		// get the json from xml
		//
		var xmlparser = new JMVC.xmlparser.load(JMVC.xdoc.elements[ext], true),
			doc = xmlparser.toJson(),
			rootTagName = xmlparser.root().tagName,
			out = {
				target : JMVC.dom.body(),
				content : [{
					cb : function (){
						console.log('done');
						console.debug(doc);
						this.done();
					},
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
									attrs : {
										'class' : 'respfixed'
									},
									tag : 'h1',
									html : 'COMPONENT: ' + doc.component.name['#text'] + '<small>(v. ' + doc.component.version['#text'] + ')</small>'
								},{
									content : [{
										tag : 'p',
										html : 'Dependencies: ',
										cb : function () {
											var l = 0,
												dep, deps = [];
											if ('dependency' in doc.dependencies) {
												for (dep in doc.dependencies.dependency) {
													deps.push(doc.dependencies.dependency[dep]['#text']);
													l++;
												}	
											}
											
											if (l) {
												this.node.innerHTML += deps.join(', ');
											} else {
												this.node.innerHTML += 'no dependencies found';
											}
											this.done();
										}
									}]
								},{
									tag : 'p',
									attrs : {
										'class':'round8'
									},
									style : {
										'background-color' : '#ddd'
									},
									html : doc.description['#text']
								},{
									html : '....now get all info from xml2json and use the Widgzard or even better the Engy',
									cb : function (){
										console.log('in');
										this.solve();
										//solve(this);
									}
								}
							]
						}
					]
				}]
			};
		/*
		JMVC.core.engy.process({a:1}).then(function (a) {
			alert('sss')
			console.debug(a);
		});
		*/

		JMVC.core.widgzard.render(out, false);
	}

	function solve(inst) {
		console.log('solving');
		window.setTimeout(function () {
			inst.done();
		}, 3000);
	}


	//
	// Module return
	//
	return {
		hide : hide,
		show : show,
		toggle : toggle
	};

});


	
	

	