JMVC.controllers.tabs = function () {
	'use strict';

	this.action_index = this.index = function () {
		JMVC.require(
			'core/responsive/basic/basic',
			'widget/tabs/tabs',
			'core/sniffer/sniffer',
			'core/i18n/i18n'
		);

		var index = JMVC.getView('home/index'),
			tab = new JMVC.tabs.tab(),
			tab2 = new JMVC.tabs.tab(),
			ids;

		JMVC.lang('jp', 'en');

		JMVC.responsive.onChange(
			function (w) {
				if (w < 800) {
					JMVC.dom.addClass(JMVC.WD.body, 'mini');
					//JMVC.responsive.allow('resp_mobi');
				} else {
					JMVC.dom.removeClass(JMVC.WD.body, 'mini');
					//JMVC.responsive.allow('resp_dskt');
				}
			}
		);

		index.setFromUrl('i_say', 'No one');
		//
		tab.add('Basic', 'Contenuto di prova1<br/><br/><br/><br/><br/><br/>kk');
		tab.add('Logo', '<iframe width="100%" height="300px" frameborder="0" src="' + JMVC.vars.baseurl + '/demo/logo"></iframe>');
		tab.add('view', '{{sv goal=`mygoal`}}<br/><br/><br/>');
		 //
		tab2.add('Direct2', 'Contenuto di prova2');
		tab2.add('Param view', '{{sv goal=`mygoal`}}');
		tab2.add('Prova Flag', '<iframe width="100%" height="600px" frameborder="0" src="' + JMVC.vars.baseurl + '/demo/flag"></iframe>');
		//
		index.render({cback : function () {
			ids = tab.render('cent', 'ciccio');
			JMVC.dom.add(JMVC.dom.find('#cent'), 'br', {'style' : 'line-height:30px'});
			tab2.render(ids[2], 'ciccio2');
			// JMVC.tabs.render();
		}});
	};
};