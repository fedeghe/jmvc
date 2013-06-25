/**
 * Accepts a single callback
 */
JMVC.require('css');
JMVC.extend('responsive', {
	 init : function () {
	 	JMVC.events.bind(JMVC.W, 'resize', JMVC.responsive.wChange);
	 	JMVC.events.ready(function(){
	 		JMVC.responsive._change(JMVC.W.outerWidth || JMVC.W.innerWidth);
	 	});
	 },
	 _rulez : {
	 	'mobi' : {
	 		'.dev_mobi' : {'display' : '""'},
	 		'.dev_dskt' : {'display' : 'none'},
	 		'.dev_all' : {'display' : '""'}
	 	},
	 	'dskt' : {
	 		'.dev_mobi' : {'display' : 'none'},
	 		'.dev_dskt' : {'display' : '""'},
	 		'.dev_all' : {'display' : '""'}
	 	},
	 	'all' : {
	 		'.dev_mobi' : {'display' : '""'},
	 		'.dev_dskt' : {'display' : '""'},
	 		'.dev_all' : {'display' : '""'},
	 		'body' : {'padding' : '0px 5px'}
	 	}
	 },
	 _change : function () {},
	 onChange : function (f) {
	 	JMVC.responsive._change  = f;
	 },
	 allow : function (lab) {
	 	if (JMVC.responsive._rulez[lab]) {
	 		JMVC.css.mappedStyle('__jmvc__basicresponsive', JMVC.util.obj2css(JMVC.responsive._rulez[lab]));
	 	}
	 },
	 wChange : function (e) {
	 	var trg = JMVC.events.eventTarget(e),
	 		w = parseInt(trg.outerWidth || trg.innerWidth, 10);
	 	JMVC.responsive._change(w);
	 }
});