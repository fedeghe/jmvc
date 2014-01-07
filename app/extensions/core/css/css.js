JMVC.require(
	'core/color/color',
	'core/sniffer/sniffer'
);

JMVC.extend('css', {

	init : function () {
		/*
		if css is not loaded by default or in the index.html can be loaded manually calling
		JMVC.css.reset();
		*/
		JMVC.head.addstyle(JMVC.vars.baseurl + '/media/css/core/jmvc.css');
	},

	_mappedStyles : {/* id : node */},

	mappedStyle : function (id, style) {
		var t = JMVC.dom.find('#' + id);
		t && JMVC.dom.remove(t);
		JMVC.css._mappedStyles[id] = JMVC.dom.create('style', {'id' : id, 'type' : 'text/css'}, style);
		JMVC.dom.append(JMVC.head.element, JMVC.css._mappedStyles[id]);
	},

	style : function (el, prop, val) {

		var prop_is_obj = (typeof prop === 'object' && typeof val === 'undefined'),
			ret = false,
			newval,
			k;

		if (!prop_is_obj && typeof val == 'undefined') {
			/* opera may use currentStyle or getComputedStyle */
			ret = (el.currentStyle) ? el.currentStyle[this.css_propertymap[prop] || prop + ""] : el.style[prop]; 
			return ret == '' || ret == 'auto' ? JMVC.css.getComputedStyle(el, prop) : ret;
		}
		
		if (prop_is_obj) {
			for (k in prop) {
				if (new String(prop[k]).search(/rand/) != -1) {
					newval = JMVC.core.color.getRandomColor();
					prop[k] =  prop[k].replace(/rand/, newval);
				}
				if (JMVC.array.find(this.css3_map, k) + 1) {
					el.style.cssText += ';' + k + ' : ' + prop[k];
				} else {
					el.style[this.css_propertymap[k] || k + ""] = prop[k];
				}
			}
		} else if (typeof val !== 'undefined') {
			val += "";
			if (val.search(/rand/) != -1) {
				newval = JMVC.core.color.getRandomColor();
				val =  val.replace(/rand/, newval);
			}
			if (JMVC.array.find( this.css3_map, prop) + 1) {
				el.style.cssText += ';' + prop + ' : ' + val;
			} else {
				el.style[this.css_propertymap[prop] || prop + ""] = val;
				if (prop == 'opacity') {
					el.style['filter'] = 'alpha(opacity = ' + (~~(100 * JMVC.num.getFloat(val))) + ')';
				}/* IE */
			}
		}
		return this; 
	},

	show : function (el) {
		if (el instanceof Array) {
			for(var i = 0, l = el.length; i < l; i += 1) {
				this.show(el[i]);
			}
			return;
		}
		JMVC.css.style(el, 'display', 'block');
	},

	hide : function (el) {
		if (el instanceof Array) {
			for(var i = 0, l = el.length; i < l; i += 1) {
				this.hide(el[i]);
			}
			return;
		}
		JMVC.css.style(el, 'display', 'none');
	},
	
	width : function (el) {
		return el.offsetWidth || el.scrollWidth || JMVC.css.getComputedStyle(el ,'width');
	},
	
	height : function (el) {
		return el.offsetHeight || el.scrollHeight || JMVC.css.getComputedStyle(el ,'height');
	},
	
	getComputedStyle : function (el, styleProperty) { 
		if (JMVC.sniffer.browser.name == 'Opera') {
			return  JMVC.W.getComputedStyle(el, null).getPropertyValue(styleProperty);
		}
		var computedStyle = null;
		if (typeof el.currentStyle != "undefined") { 
			computedStyle = el.currentStyle; 
		} else {
			computedStyle = JMVC.WD.defaultView.getComputedStyle(el, null);
		}
		return computedStyle[this.css_propertymap[styleProperty] || styleProperty]; 
	},

	// 
	// http://www.quirksmode.org/js/findpos.html
	// 
	getPosition : function (el) {
		var curleft = 0,
			curtop = 0;
		if (el.offsetParent) {
			do {
				curleft += el.offsetLeft;
				curtop += el.offsetTop;
			} while (el = el.offsetParent);
		}
		return [curleft, curtop];
	},

	css3_map : ['-o-transform', '-moz-transform'],

	css_propertymap : {
		'background-attachment' : 'backgroundAttachment',
		'background-color' : 'backgroundColor',
		'background-image' : 'backgroundImage',
		'background-position' : 'backgroundPosition',
		'background-repeat' : 'backgroundRepeat',
		'border-bottom' : 'borderBottom',
		'border-bottom-color' : 'borderBottomColor',
		'border-bottom-style' : 'borderBottomStyle',
		'border-bottom-width' : 'borderBottomWidth',
		'border-color' : 'borderColor',
		'border-left' : 'borderLeft',
		'border-left-color' : 'borderLeftColor',
		'border-left-style' : 'borderLeftStyle',
		'border-left-width' : 'borderLeftWidth',
		'border-right' : 'borderRight',
		'border-right-color' : 'borderRightColor',
		'border-right-style' : 'borderRightStyle',
		'border-right-width' : 'borderRightWidth',
		'border-style' : 'borderStyle',
		'border-top' : 'borderTop',
		'border-top-color' : 'borderTopColor',
		'border-top-style' : 'borderTopStyle',
		'border-top-width' : 'borderTopWidth',
		'border-width' : 'borderWidth',
		'font-family' : 'fontFamily',
		'font-size' : 'fontSize',
		'font-variant' : 'fontVariant',
		'font-weight' : 'fontWeight',
		'letter-spacing' : 'letterSpacing',
		'line-height' : 'lineHeight',
		'list-style' : 'listStyle',
		'list-style-image' : 'listStyleImage',
		'list-style-position' : 'listStylePosition',
		'list-style-type' : 'listStyleType',
		'margin-bottom' : 'marginBottom',
		'margin-left' : 'marginLeft',
		'margin-right' : 'marginRight',
		'margin-top' : 'marginTop',
		'padding-bottom' : 'paddingBottom',
		'padding-left' : 'paddingLeft',
		'padding-right' : 'paddingRight',
		'padding-top' : 'paddingTop',
		'page-break-after' : 'pageBreakAfter',
		'page-break-before' : 'pageBreakBefore',
		'text-align' : 'textAlign',
		'text-decoration' : 'textDecoration',
		'text-indent' : 'textIndent',
		'text-transform' : 'textTransform',
		'vertical-align' : 'verticalAlign',
		'z-index ' : 'zIndex',
		'z-Index ' : 'zIndex'
	},

	reset : function () {
		var style = "/* http://meyerweb.com/eric/tools/css/reset/    v2.0 | 20110126   License: none (public domain)*/html, body, div, span, applet, object, iframe,h1, h2, h3, h4, h5, h6, p, blockquote, pre,a, abbr, acronym, address, big, cite, code,del, dfn, em, img, ins, kbd, q, s, samp,small, strike, strong, sub, sup, tt, var,b, u, i, center,dl, dt, dd, ol, ul, li,fieldset, form, label, legend,table, caption, tbody, tfoot, thead, tr, th, td,article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary,time, mark, audio, video {	margin: 0;	padding: 0;	border: 0;	font-size: 100%;	font: inherit;	vertical-align: baseline;}/* HTML5 display-role reset for older browsers */article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {display: block;}body {	line-height: 1;}ol, ul {	list-style: none;}blockquote, q {	quotes: none;}blockquote:before, blockquote:after,q:before, q:after {content: '';content: none;}table {border-collapse: collapse;border-spacing: 0;}"
		JMVC.head.addstyle(style, true, true);
	},
/*
	json2css : function (json) {
		var out = '',
			i;
		for (i in json) {
			if (json.hasOwnProperty(i)) {
				out += i + '{' + json[i] + '}' + "\n";
			}
		}
		return out;
	},
*/	
	clearer : JMVC.dom.create('br', {'class' : 'clearer'})
});




/*
DISABLE/ENABLE TEXT SELECTION in a element

      disableSelection : function(target) {
        if (typeof target.onselectstart != "undefined") { //IE route
          target.onselectstart=function(){return false; }
        }
        else if (typeof target.style.MozUserSelect!="undefined") { //Firefox route
          target.style.MozUserSelect = "none";
        }
        else{ //All other route (ie: Opera)
          target.onmousedown=function(){return false; }
        }
        target.style.cursor = "default";
      },
enableSelection : function(target) {
        if (typeof target.onselectstart != "undefined") { //IE route
          target.onselectstart=function(){}
        }
        else if (typeof target.style.MozUserSelect!="undefined") { //Firefox route
          target.style.MozUserSelect = "default";
        }
        else{ //All other route (ie: Opera)
          target.onmousedown=function(){ }
        }
        target.style.cursor = "default";
      },


 */




