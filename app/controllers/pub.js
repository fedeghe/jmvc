JMVC.controllers.pub = function () {

	this.action_index = function () {

		JMVC.require(
			'core/codeview/codehl/codehl',
			'core/codeview/script/script',
			'core/pub/xvents/xvents'
		);

		JMVC.head.addstyle(JMVC.vars.baseurl + '/media/css/pub.css');
		JMVC.head.addstyle('http://fonts.googleapis.com/css?family=Freckle+Face');
		JMVC.head.title('Observers');

		JMVC.events.loadify(500);
		
		var content = ''+
				'<div style="position:relative; height:140px">'+
					'<span id="e2" style="position:absolute;z-index:1;top:26px;left:151px;font-size:62px; color:#0f0">&bull;</span>'+
					'<span id="e1" style="position:absolute;z-index:2;top:46px;left:161px;font-size:32px">&bull;</span>'+
					'<h1 style="z-index:20;position:absolute">around <font style="font-size:100px;">O</font>BSERVERS</h1>'+
				'</div>',
			bu = JMVC.vars.baseurl,
			v = JMVC.getView('vacuum'),
			links = {
				/*
				'zpub' : JMVC.vars.baseurl + '/pub/zpub',
				'xpub' : JMVC.vars.baseurl + '/pub/xpub',
				'hpub' : JMVC.vars.baseurl + '/pub/hpub',
				*/
				'xvents' : JMVC.vars.baseurl + '/pub/xvents'
			},
			views = {
				/*
				'hpub' : JMVC.getView('pub/info/hpub'),
				'xpub' : JMVC.getView('pub/info/xpub'),
				'zpub' : JMVC.getView('pub/info/zpub'),
				*/
				'xvents' : JMVC.getView('pub/info/xvents')
			},
			tpl = '<li><a href="%base_url%/%path%">$index$ %label%</a></li>',
			out = '',
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
			'style':'font-family:Verdana, sans-serif;',
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
			xvents1 = JMVC.xvents.create(),
			xvents2 = JMVC.xvents.create(),
			xvents3 = JMVC.xvents.create();

		xvents0.add(JMVC.W)
			.listen('load', function (e) {
				console.debug('dom loaded');
				xvents0.add(JMVC.WD)	
					.listen('click', function (e) {console.debug('one click on window', e); })
					.listen('click', function (e) {console.debug('... sure, on window', e); })
					.listen('dblclick', function (e) {console.debug('2click', e); })
					.bind();				
			}).bind();
			
		// globalize
		JMVC.W.xvents = [xvents0]
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
				.listen('click', function(p){JMVC.debug(p); }, 'hello', true)
				.bind();

			xvents1.add(JMVC.dom.find('#innerarea'), 'data-act-inner', 'data-par-inner')
				.listen('click', function(p){JMVC.debug(p); }, 'hellosuper')
				.bind();
		});
	};


	this.action_xpub = function () {

		JMVC.events.loadify(500);

		JMVC.require('core/pub/xpub/xpub');

		var v = JMVC.getView('pub/xpub'),
			xpub = JMVC.xpub.create();

		v.render(function () {
			xpub.add(JMVC.dom.find('#area1'), 'area1')
				.notify('click', 'topicx')
				.notify('mouseover', 'topicy')
				.listen('topicx', function (e) {console.debug('clikkkkk', e); })
				.listen('topicy',  function (e) {console.debug(e); })
				.listen('topicy',  function (e) {console.debug(e, 'yyyy'); })

				.bind();

			xpub.add(JMVC.dom.find('#sense'))
				.notify('mousemove', 'topicmove')
				.notify('mouseover', 'entermove')
				.notify('mouseout', 'exitmove')
				.listen('topicmove', function (e) {console.debug('moving around: ', e); })
				.listen('entermove', function (e) {console.debug('ENTER: ', e); })
				.listen('exitmove', function (e) {console.debug('EXIT: ', e); })
				.bind();
		});
	};




	this.action_zpub = function () {

		JMVC.events.loadify(500);
		JMVC.require('core/pub/zpub/zpub');

		var v = JMVC.getView('pub/zpub'),
			zpub = JMVC.zpub.create('data-id');

		v.render(function () {
			zpub.add(JMVC.dom.find('#area1'), 'area1')
				.notify('click', 'topicx')
				.listen('topicx', 'wat', function (e) {console.debug('cliked', e); })
				.bind();
			
			zpub.add(JMVC.dom.find('#sense'))
				.notify('mousemove', 'topicmove').listen('topicmove', 'move', function (e) {console.debug('moving around: ', e); })
				.notify('mouseover', 'entermove').listen('entermove', 'enter', function (e) {console.debug('ENTER: ', e); })
				.notify('mouseout', 'exitmove').listen('exitmove', 'exit', function (e) {console.debug('EXIT: ', e); })
				.bind();
		});
	};




/*
	this.hpub = function () {
		JMVC.events.loadify(500);
		JMVC.require('core/pub/hpub/hpub');
		JMVC.head.meta("generator", "jmvc resident in your machine");
		var v = JMVC.getView('pub/hpub');
		
		v.render(function () {
			var hpub1,
				hpub2,
				hpub3;
			 
			hpub1 = JMVC.hpub.create();
			hpub1.add(JMVC.dom.find('#area'), 'data-act0', 'data-par')
				.listen('click', function (p) {JMVC.debug(p); }, 'hello')
				.bind();
			hpub1.add(JMVC.dom.find('#innerarea'), 'data-act-inner', 'data-par-inner')
				.listen('click', function (p) {JMVC.debug(p); }, 'hellosuper')
				.bind();

			hpub2 = JMVC.hpub.create();
			hpub2.add(JMVC.dom.find('#area1'), 'data-act', 'data-par')
				.listen('click', function (p) {JMVC.debug('click', p); }, 'alert')
				.listen('dblclick', function (p) {JMVC.debug('dblclick', p); }, 'alert2')
				.listen('click', function (p) {JMVC.debug('click', p); }, 'alertrep')
				.listen('mouseover', function (p) {JMVC.debug('over ', p); }, 'overout')
				.listen('mouseout', function (p) {JMVC.debug('out ', p); }, 'overout')
				.listen('change', function (p) {JMVC.debug(p.node.value); }, 'sel')
				.bind();

			hpub3 = JMVC.hpub.create();
			hpub3.add(JMVC.dom.find('#area2'), 'data-act2', 'data-par')
				.listen('mousemove', function (p) {JMVC.debug(p.event); }, 'getpos')
				.listen('click', function (p) {JMVC.debug(p.event); }, 'notify')
				.bind();
			
			JMVC.W.hp = [hpub1, hpub2, hpub3];

		});

	};
*/

};