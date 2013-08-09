JMVC.controllers.info = function () {
	//
	//
	//
	this.action_index = function () {
		//
		JMVC.events.loadify(500);
		JMVC.require(
			'core/codeview/script'
			,'vendors/google/analytics'
			,'core/sniffer'
			,'core/mobile'
			,'core/dim'
			,'core/css'
		);
		var main  = JMVC.getView('home/info'),
			readme = JMVC.getView('home/readme'),
			features = JMVC.getView('home/features'),
			doc_tpl = JMVC.getView('api/doctpl'),
			apioutro = JMVC.getView('api/apioutro'),
			doc = JMVC.getModel('api/function'),
			ret='',
			h = '',
			fr = '<b class="index">&#9758;</b>',
			f,
			k, k2, t,
			len, l2,
			tmp;


		

		JMVC.set('my_table_style', 'padding:2px; background-color:#ccc');
		JMVC.head.addstyle(JMVC.vars.baseurl + '/media/css/info.css', true);// parsed

		//favicon
		JMVC.head.link('icon', {type : "image/vnd.microsoft.icon", href : JMVC.vars.baseurl + "/media/favicon.ico"});

		features.set({
			'fr' : fr,
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

		//JMVC.require('trial');
		//JMVC.mac.titlesay();

		main.parse().render(function(){
			JMVC.mobile.topHide();
			JMVC.head.title('JMVC :: info');
		});
	};
};
