JMVC.require(
	'core/sniffer/sniffer',
	'core/obj/date/date',
	'core/i18n/i18n',
	'core/responsive/basic/basic',
	'core/mobile/mobile',
	'core/color/color',
	'core/screen/screen',
	'vendors/google/analytics/analytics',
	'core/fx/fx',
	'widget/lang/lang',
	'vendors/github/forkme/forkme',
	'core/lib/widgzard/widgzard',
	'vendors/google/gmap2/gmap2'
);

JMVC.controllers.geoclickNew = function () {
	'use strict';

	JMVC.css.autoHeadings();

	this.action_none = function () {};

	this.action_index = function () {

		JMVC.events.loadify(500);

		JMVC.head.title('GeoClick');
		JMVC.head.addStyle(JMVC.vars.baseurl + '/media/css/core/jmvc-day.css', true);
		JMVC.head.addStyle(JMVC.vars.baseurl + '/media/css/geoclick.css', true);

		/*
		u can namespace views in folders
		var index = JMVC.getView('xxx/index');
		*/
		JMVC.getView('vacuum').render(
			function () {
				var  dims = JMVC.screen.getViewportSize(),
					mapid = 'map',
					body = JMVC.dom.body(),
					userLocation;

				

			}
		);
	};
};