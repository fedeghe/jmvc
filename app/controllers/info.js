JMVC.controllers.info = function () {
	'use strict';
	this.action_index = function () {

		JMVC.css.autoHeadings();

		JMVC.events.loadify(500);
		
		JMVC.require(
			'core/codeview/script/script',
			//,'core/responsive/basic/basic',
			'vendors/google/analytics/analytics',
			'core/sniffer/sniffer',
			'core/mobile/mobile',
			'core/screen/screen',
			'vendors/github/forkme/forkme'
		);
		var main  = JMVC.getView('info/info'),
			readme = JMVC.getView('info/readme'),
			features = JMVC.getView('info/features'),
			info_intro = JMVC.getView('info/info_intro'),
			infoutro = JMVC.getView('info/info_outro'),
			backtotop = '<a href="#top">go to top</a>',
			toplinks = [],
			toplinksdata = {
				intro : 'Introduction',
				req : 'Requirements',
				started : 'Get started',
				howiw : 'How it works',
				features : 'Features',
				urlstruc : 'Url structure',
				samples : 'Samples',
				api : 'Api',
				coredoc : 'Core doc',
				extdoc : 'Extension doc',
				testsuite : 'Test suite',
				why : 'Why'
			},
			t;

		for (t in toplinksdata) {
			toplinks.push('<a href="#' + t + '" class="round4">' + toplinksdata[t] + '</a>');
		}

		JMVC.head.addStyle(JMVC.vars.baseurl + '/media/css/info.css', true);// parsed

		features.set({
			fr : '<b class="index">&#9758;</b>',
			clearer : '<br class="clearer" />',
			backtotop : backtotop
		});

		readme.set({
			'api': '{{info_outro}}',
			'githublink' : 'https://github.com/fedeghe/jmvc',
			'legend': '<b>*</b> : mandatory parameter',
			'backtotop' : backtotop,
			'toplinks' : toplinks.join(' ~ '),
			'logo' : 'jmvc_m1.png'
		});
		info_intro.set({
			'review' : JMVC.vars.review,
			'version' : JMVC.vars.version,
			'last_modified' : JMVC.vars.date + ' @ ' + JMVC.vars.time,//JMVC.vars.last_modified,
			'gmt' : 'GMT+' + -(new Date().getTimezoneOffset() / 60),
			'backtotop' : backtotop
		});
		infoutro.set({
			'backtotop' : backtotop
		});

		main.parse().render(function () {

			JMVC.head.lastModified();
			JMVC.github.forkme('fedeghe');
			JMVC.mobile.topHide();
			JMVC.head.title('JMVC :: info');
		});
	};
};