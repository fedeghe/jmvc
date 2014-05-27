JMVC.extend('mediaquery', {
	init : function () {
		"use strict";
		JMVC.set('mq_dsktp_lptp',"body, h1 {font-size:100px !important}");
		JMVC.head.addStyle(JMVC.vars.extensions + 'core/mediaquery/mediaquery.css', true);
	}
});