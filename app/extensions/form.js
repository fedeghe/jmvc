JMVC.extend('form', {
	"slidenum" : function(n, val, opts) {
		if(n.tagName === 'INPUT' && n.type === "text" ){
			JMVC.dom.attr(n, 'value', val);
			JMVC.events.onScroll(n, function(e){
				var nowv = ~~JMVC.dom.attr(n, 'value'),
					detail = -e.detail || e.wheelDelta,
					incr = detail>0 ? 1 : -1;
				
				
				if((opts && opts.from != undefined && nowv + incr < opts.from)
					||
					(opts && opts.to != undefined && nowv+incr > opts.to)){
					void(0);
				} else {
					JMVC.dom.attr(n, 'value', nowv + incr*(opts.step || 1));
				}
				//console.dir(e);
			});
		}
	}
});