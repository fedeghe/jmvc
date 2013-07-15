/**
 * Basic responsive extension
 *
 * Based on resize event, rewrites some global css rules
 */
JMVC.require('css');
JMVC.extend('responsive', {

	/**
	 * executed after load
	 * 
	 * @return void
	 */
	init : function () {
		/**
		 * bind inner wChange (user cb) passing current window width
		 */
		JMVC.events.bind(JMVC.W, 'resize', JMVC.responsive.wChange);

		/**
		 * on dom ready trigger onchange passing current window width
		 */
		JMVC.events.end(function(){
			JMVC.responsive._change(JMVC.W.outerWidth || JMVC.W.innerWidth);
		});
	},

	/**
	 * basc set of rules
	 * @type {Object}
	 */
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

	/**
	 * by default change function is nope
	 */
	_change : function () {},

	/**
	 * [ description]
	 * @param  {function} f the user resize function strategy
	 * @return undefined
	 */
	onChange : function (f) {
		JMVC.responsive._change  = f;
	},

	/**
	 * Can be called directly to force a set of rules to override previous ones
	 * @param  {string} lab must be a key of the _rulez literal
	 * @return undefined
	 */
	allow : function (lab) {
		if (JMVC.responsive._rulez[lab]) {
			JMVC.css.mappedStyle('__jmvc__basicresponsive', JMVC.object.obj2css(JMVC.responsive._rulez[lab]));
		}
	},

	/**
	 * The callback that wraps the user callback 
	 * @param  {Native Event} e will be always a resize event
	 * undefined
	 */
	wChange : function (e) {
		var trg = JMVC.events.eventTarget(e),
			w = parseInt(trg.outerWidth || trg.innerWidth, 10);
		JMVC.responsive._change(w);
	}
});