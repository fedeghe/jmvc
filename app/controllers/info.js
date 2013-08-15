JMVC.controllers.info = function () {
	this.action_index = function () {
		JMVC.events.loadify(500);
		JMVC.require(
			'core/codeview/script'
			,'vendors/google/analytics'
			,'core/sniffer'
			,'core/mobile'
			,'core/dim'
			,'core/css'
			,'vendors/github/forkme'
		);
		var main  = JMVC.getView('home/info'),
			readme = JMVC.getView('home/readme'),
			features = JMVC.getView('home/features'),
			doc_tpl = JMVC.getView('api/doctpl'),
			apioutro = JMVC.getView('api/apioutro'),
			doc = JMVC.getModel('api/function'),
			ret='',
			h = '',
			f,
			k, k2, t,
			len, l2,
			tmp;

		JMVC.head.addstyle(JMVC.vars.baseurl + '/media/css/info.css', true);// parsed

		//favicon
		JMVC.head.favicon("/media/favicon.ico");

		features.set({
			'fr' : '<b class="index">&#9758;</b>',
			'clearer' : '<br class="clearer" />'
		});

		readme.set({
			'api': '{{apioutro}}',
			'githublink' : 'https://github.com/fedeghe/jmvc',
			'version' : JMVC.vars.version,
			'review' : JMVC.vars.review,
			'last_modified' : JMVC.vars.last_modified,
			'legend': '<b>*</b> : mandatory parameter'
		});

		main.parse().render(function(){
			JMVC.github.forkme('fedeghe');
			JMVC.mobile.topHide();
			JMVC.head.title('JMVC :: info');
		});
	};
};