JMVC.controllers.pub = function () {
	'use strict';
	this.action_index = function () {

		JMVC.require(
			'core/codeview/codehl/codehl',
			'core/codeview/script/script',
			'core/pub/xvents/xvents'
		);

		JMVC.head.addStyle(JMVC.vars.baseurl + '/media/css/pub.css');
		JMVC.head.addStyle('http://fonts.googleapis.com/css?family=Freckle+Face');
		JMVC.head.title('Observers');

		JMVC.events.loadify(500);
		
		var content = '' +
				'<div style="position:relative; height:140px">' +
					'<span id="e2" style="position:absolute;z-index:1;top:26px;left:151px;font-size:62px; color:#0f0">&bull;</span>' +
					'<span id="e1" style="position:absolute;z-index:2;top:46px;left:161px;font-size:32px">&bull;</span>' +
					'<h1 style="z-index:20;position:absolute">around <font style="font-size:100px;">O</font>BSERVERS</h1>' +
				'</div>',
			v = JMVC.getView('vacuum'),
			links = {
				xvents : JMVC.vars.baseurl + '/pub/xvents'
			},
			views = {
				xvents : JMVC.getView('pub/info/xvents')
			},
			footer = JMVC.getView('pub/info/footer'),
			xe = JMVC.xvents.create();

		JMVC.each(views, function (view, label) {
			view.set('link', links[label]);
			view.set('label', label);
			view.set('end', '<hr /><hr /><hr />');
			content += view.render().content;
		});

		content += footer.render().content;

		v.set({
			'id' : 'content',
			'style' : 'font-family:Verdana, sans-serif;',
			'content' : content,
			'index' : '&#9826;'
		});

		v.render(function () {
			xe.add(JMVC.WD)
				.listen('click', function (e, el, real) {
					JMVC.debug(e, el, real);
				})
				.bind();
		});
	};









	this.action_xvents = function () {

		JMVC.events.loadify(500);

		JMVC.require('core/pub/xvents/xvents');

		var v = JMVC.getView('pub/xvents'),
			xvents0 = JMVC.xvents.create(),
			xvents1 = JMVC.xvents.create();
			//xvents2 = JMVC.xvents.create(),
			//xvents3 = JMVC.xvents.create();

		xvents0.add(JMVC.W)
			.listen('load', function () {
				console.debug('dom loaded');
				xvents0.add(JMVC.WD)
					.listen('click', function (e) {console.debug('one click on window', e); })
					.listen('click', function (e) {console.debug('... sure, on window', e); })
					.listen('dblclick', function (e) {console.debug('2click', e); })
					.bind();
			}).bind();

		// globalize
		JMVC.W.xvents = [xvents0];
		v.render(function () {

			xvents1.add(JMVC.dom.find('#area1'), 'data-act', 'data-par')
				.listen('click', function (p) {JMVC.debug('click alert', p); }, 'alert')
				.listen('click', function (p) {JMVC.debug('click alert 2', p); }, 'alert')
				//.listen('mousemove', function (p) {JMVC.debug(p); }, 'alert')
				.listen('dblclick', function (p) {JMVC.debug('dblclick', p); }, 'alert2')
				
				.listen('mouseover', function (p) {JMVC.debug('over ', p); }, 'overout')
				.listen('mouseout', function (p) {JMVC.debug('out ', p); }, 'overout')
				.listen('change', function (p) {JMVC.debug(p.node.value); }, 'sel')
				.bind();

			xvents1.add(JMVC.dom.find('#area2'), 'data-act2', 'data-par')
				.listen('mousemove', function (p) {JMVC.debug(p.event); }, 'getpos')
				.listen('click', function (p) {JMVC.debug(p.event); }, 'notify', true)
				.bind();

			xvents1.add(JMVC.dom.find('#area'),	'data-act0', 'data-par')
				.listen('click', function (p) {JMVC.debug(p); }, 'hello', true)
				.bind();

			xvents1.add(JMVC.dom.find('#innerarea'), 'data-act-inner', 'data-par-inner')
				.listen('click', function (p) {JMVC.debug(p); }, 'hellosuper')
				.bind();
		});
	};
};