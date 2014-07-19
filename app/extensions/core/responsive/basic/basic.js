// type : LIB
//

/**
 * Basic responsive extension
 *
 * Based on resize event, rewrites some global css rules
 */
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
		JMVC.events.on(JMVC.W, 'resize', JMVC.responsive.wChange);

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
		'resp_mobi' : {
			'.resp_mobi' : {'display' : '""'},
			'.resp_dskt' : {'display' : 'none'},
			'.resp_all' : {'display' : '""'}
		},
		'resp_dskt' : {
			'.resp_mobi' : {'display' : 'none'},
			'.resp_dskt' : {'display' : '""'},
			'.resp_all' : {'display' : '""'}
		},
		'resp_all' : {
			'.resp_mobi' : {'display' : '""'},
			'.resp_dskt' : {'display' : '""'},
			'.resp_all' : {'display' : '""'},
			'body' : {'padding' : '0px 5px'}
		}
	},

	/**
	 * by default change function is noop
	 */
	_change : function () {},

	/**
	 * [description]
	 * @param  {function} f the user resize function strategy
	 * @return undefined
	 */
	onChange : function (f) {
		JMVC.responsive._change = f;
	},

	/**
	 * Can be called directly to force a set of rules to override previous ones
	 * @param  {string} lab must be a key of the _rulez literal
	 * @return undefined
	 */
	allow : function (lab) {
		JMVC.responsive._rulez[lab] && JMVC.css.mappedStyle(
			'__jmvc__basicresponsive',
			JMVC.object.toCss(JMVC.responsive._rulez[lab])
		);
	},

	/**
	 * The callback that wraps the user callback 
	 * @param  {Native Event} e will be always a resize event
	 * undefined
	 */
	wChange : function (e) {
		var trg = JMVC.events.eventTarget(e),
			w = parseInt(trg.outerWidth || trg.innerWidth, 10),
			h = parseInt(trg.outerHeight || trg.innerHeight, 10);
		JMVC.responsive._change(w, e, trg);
	}
});