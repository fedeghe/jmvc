JMVC.require('core/dim/dim', 'event_scroll/event_scroll', 'widget/tabs/tabs');

JMVC.extend('xdoc', {
	init : function () {
		//JMVC.head.meta("generator", "jmvc resident in your machine");
		JMVC.xdoc.otitle = JMVC.head.title();
		JMVC.head.title(JMVC.xdoc.etitle);
	},
	otitle : '',
	etitle : 'Xdoc',

	_status : false,

	scroll : 0,

	toggle : function (ext) {

		
		JMVC.require(ext.replace('.', '/'));


		JMVC.debug(JMVC.nsCheck(ext, JMVC));

		if (JMVC.xdoc._status) {
			JMVC.dom.remove(JMVC.dom.find('#jmvc_xdoc'));
			JMVC.events.enable_scroll();
			JMVC.W.scrollTo(0, JMVC.xdoc.scroll);

		} else {

			var dims = JMVC.dim.getViewportSize(),
				border_size = 0,
				margin = -1,
				top_height = 10,
				foot_height = 100,
				scrollTop = JMVC.dim.getScreenData().scrollTop;
				
				// main container
				container = JMVC.dom.create(
					'div', {
						'id' : 'jmvc_xdoc',
						'class' : 'jmvc_xdoc',
						'style':'left:' + margin + 'px;right:' + margin + 'px;top:' + margin + 'px;bottom:' + margin + 'px;border:' + border_size + 'px solid black'
					}
				);

			//save scroll vertical position
			JMVC.xdoc.scroll = scrollTop;

			//scroll to top
			JMVC.W.scrollTo(0, 1);

			//disable scroll
			JMVC.events.disable_scroll();

			JMVC.set('height', (dims.height-70) / 2);
			JMVC.head.addstyle(JMVC.vars.baseurl + '/app/extensions/core/xdoc/xdoc.css', true);
			JMVC.dom.append(JMVC.dom.body(), container);


		}
		JMVC.xdoc._status = !JMVC.xdoc._status;
		JMVC.head.title(JMVC.xdoc._status ? JMVC.xdoc.etitle : JMVC.xdoc.otitle);
	}
});	