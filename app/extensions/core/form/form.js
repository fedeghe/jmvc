JMVC.require('event_scroll');


JMVC.extend('form', {
	slidenum : function (n, val, opts) {
		if (n.tagName === 'INPUT' && n.type === "text" ) {
			JMVC.dom.attr(n, 'value', val);

			JMVC.events.bind(n, 'mouseover', function () {
				JMVC.events.disable_scroll(n);
			});
			
			JMVC.events.bind(n, 'mouseout', function () {
				JMVC.events.enable_scroll(n);
			});

			JMVC.events.onScroll(n, function (e) {

				var nowv = ~~JMVC.dom.attr(n, 'value'),
					detail = -e.detail || e.wheelDelta,
					incr = detail > 0 ? 1 : -1;				
				
				if ((opts && opts.from != undefined && nowv + incr < opts.from)
					||
					(opts && opts.to != undefined && nowv + incr > opts.to)) {
					void(0);
				} else {
					JMVC.dom.attr(n, 'value', nowv + incr * (opts.step || 1));
				}
			});
		}
	}
});