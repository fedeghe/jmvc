JMVC.extend('dim', {

	'getViewportSize' : function () {
		var size = {'width' : 0, 'height' : 0}; 
		if (typeof JMVC.W.innerWidth != 'undefined') {
			size.width = JMVC.W.innerWidth;
			size.height = JMVC.W.innerHeight; 
		} else {
			if (typeof JMVC.WD.documentElement != 'undefined' &&
				typeof JMVC.WD.documentElement.clientWidth != 'undefined' &&
				JMVC.WD.documentElement.clientWidth != 0
			) {
				size.width = JMVC.WD.documentElement.clientWidth;
				size.height = JMVC.WD.documentElement.clientHeight;
			} else {
				size.width = JMVC.WD.getElementsByTagName('body')[0].clientWidth;
				size.height = JMVC.WD.getElementsByTagName('body')[0].clientHeight; 
			}
		}
		return size; 
	},
	
	'bodySize' : function () {
		var body = JMVC.WD.body,
			html = JMVC.WD.documentElement;
		return [ 
			JMVC.WD.getElementsByTagName('html')[0].clientWidth, 
			Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight ) 
		];
	},
	
	'getScreenData' : function () {
		var clientWidth = this.f_filterResults (
				JMVC.W.innerWidth ? JMVC.W.innerWidth : 0,
				JMVC.WD.documentElement ? JMVC.WD.documentElement.clientWidth : 0,
				JMVC.WD.body ? JMVC.WD.body.clientWidth : 0
			),
			clientHeight = this.f_filterResults (
				JMVC.W.innerHeight ? JMVC.W.innerHeight : 0,
				JMVC.WD.documentElement ? JMVC.WD.documentElement.clientHeight : 0,
				JMVC.WD.body ? JMVC.WD.body.clientHeight : 0
			),
			scrollLeft = this.f_filterResults (
				JMVC.W.pageXOffset ? JMVC.W.pageXOffset : 0,
				JMVC.WD.documentElement ? JMVC.WD.documentElement.scrollLeft : 0,
				JMVC.WD.body ? JMVC.WD.body.scrollLeft : 0
			),
			scrollTop = this.f_filterResults (
				JMVC.W.pageYOffset ? JMVC.W.pageYOffset : 0,
				JMVC.WD.documentElement ? JMVC.WD.documentElement.scrollTop : 0,
				JMVC.WD.body ? JMVC.WD.body.scrollTop : 0
			);
		return {
			clientWidth : clientWidth,
			clientHeight : clientHeight,
			scrollLeft :scrollLeft,
			scrollTop : scrollTop
		};
	},
	
	'f_filterResults' : function (n_win, n_docel, n_body) {
		var n_result = n_win ? n_win : 0;
		if (n_docel && (!n_result || (n_result > n_docel))) {
			n_result = n_docel;
		}
		return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
	},
	
	'no_frames' : function () {
		if (JMVC.W.top.location != JMVC.W.location){JMVC.W.top.location.href = JMVC.WD.location.href;}
	},
	
	'window' : function () {
		var myWidth = 0,
			myHeight = 0;
		if( typeof( JMVC.W.innerWidth ) == 'number') {
			//Non-IE
			myWidth = JMVC.W.innerWidth;
			myHeight = JMVC.W.innerHeight;
		} else if (JMVC.WD.documentElement && ( JMVC.WD.documentElement.clientWidth || JMVC.WD.documentElement.clientHeight)) {
			//IE 6+ in 'standards compliant mode'
			myWidth = JMVC.WD.documentElement.clientWidth;
			myHeight = JMVC.WD.documentElement.clientHeight;
		} else if ( JMVC.WD.body && ( JMVC.WD.body.clientWidth || JMVC.WD.body.clientHeight)) {
			//IE 4 compatible
			myWidth = JMVC.WD.body.clientWidth;
			myHeight = JMVC.WD.body.clientHeight;
		}
		
		return {
			'width' : myWidth,
			'height' : myHeight
		};
	},
	
	'screen' : function () {
		return {
			'width' : JMVC.W.innerWidth,
			'height' : JMVC.W.innerHeight
		};
	},
	
	'page' : function () {
		
		var d = {
				'width' : JMVC.WD.width !== undefined ? JMVC.WD.width : JMVC.WD.body.offsetWidth,
				'height' : JMVC.WD.height !== undefined ? JMVC.WD.height : JMVC.WD.body.offsetHeight
			},
			wp = JMVC.dim.screen();
			
		/**
		 *if body is taller than viewport the page height assumes viewport height 
		 */
		return {
			'width' : d.width,
			'height' : wp.height > d.height ? wp.height : d.height
		};
	},
	
	'scroll' : function () {
		return {
			'left' : JMVC.dim.f_filterResults (
				JMVC.W.pageXOffset ? JMVC.W.pageXOffset : 0,
				JMVC.WD.documentElement ? JMVC.WD.documentElement.scrollLeft : 0,
				JMVC.WD.body ? JMVC.WD.body.scrollLeft : 0
			),
			'top' : JMVC.dim.f_filterResults (
				JMVC.W.pageYOffset ? JMVC.W.pageYOffset : 0,
				JMVC.WD.documentElement ? JMVC.WD.documentElement.scrollTop : 0,
				JMVC.WD.body ? JMVC.WD.body.scrollTop : 0
			)
		}
	},
	
	/**
	 * take the dimensions of the square that needs to be centerer
	 * returns the upper-left absolute position to be used
	 */
	'centerHelper' : function (w, h) {
		var win = JMVC.dim.window(),
			page = JMVC.dim.page(),
			scroll = JMVC.dim.scroll();
		return {
			'left' : scroll['left'] + (win['width'] - w) / 2, 
			'top' : scroll['top'] + (win['height'] - h) / 2
		}	
	}
});