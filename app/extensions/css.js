JMVC.require('color', 'sniffer');
JMVC.extend('css',{
	style : function(el, prop, val) {
		
		var prop_is_obj = (typeof prop === 'object' && typeof val === 'undefined');
		if(!prop_is_obj && typeof val == 'undefined')return el.style[prop];
		
		var newval;
		
		if(prop_is_obj){
			for(var k in prop){
				if(new String(prop[k]).search(/rand/) != -1 ){
					newval = JMVC.color.getRandomColor();
					prop[k] =  prop[k].replace(/rand/, newval);
				}	
				if(  JMVC.util.inArray( this.css3_map, k)+1    ){
					el.style.cssText+=';'+k+':'+prop[k];
				}else{
					el.style[ this.css_propertymap[k] || k+"" ] = prop[k];
				}
			}
		}else if(typeof val !== 'undefined'){
			val = val.toString();
			if(val.search(/rand/) != -1 ){
				newval = JMVC.color.getRandomColor();
				val =  val.replace(/rand/, newval);
			}
			if( JMVC.util.inArray( this.css3_map, prop)+1 ){
				el.style.cssText+=';'+prop+':'+val;
			}else{
				el.style[ this.css_propertymap[prop] || prop+"" ] =  val;
				if (prop == 'opacity'){el.style['filter'] = 'alpha(opacity = '+(~~(100*JMVC.getFloat(val)))+')';}//ie
				
			}
		}
		
		return this; 
	},
	
	
	
	getComputedStyle : function(el, styleProperty){ 
		
		if(JMVC.sniffer.browser.name == 'Opera'){
			return  window.getComputedStyle(el, null).getPropertyValue(styleProperty);
		}
		var computedStyle = null;
		if (typeof el.currentStyle != "undefined"){ 
			computedStyle = el.currentStyle; 
		}else{
				computedStyle = document.defaultView.getComputedStyle(el, null);
		}
		return computedStyle[this.css_propertymap[styleProperty] || styleProperty]; 
	},
	css3_map : ['-o-transform','-moz-transform','-o-transform'],
	css_propertymap : {
		
		'background-attachment':'backgroundAttachment',
		'background-color':'backgroundColor',
		'background-image':'backgroundImage',
		'background-position':'backgroundPosition',
		'background-repeat':'backgroundRepeat',
		'border-bottom':'borderBottom',
		'border-bottom-color':'borderBottomColor',
		'border-bottom-style':'borderBottomStyle',
		'border-bottom-width':'borderBottomWidth',
		'border-color':'borderColor',
		'border-left':'borderLeft',
		'border-left-color':'borderLeftColor',
		'border-left-style':'borderLeftStyle',
		'border-left-width':'borderLeftWidth',
		'border-right':'borderRight',
		'border-right-color':'borderRightColor',
		'border-right-style':'borderRightStyle',
		'border-right-width':'borderRightWidth',
		'border-style':'borderStyle',
		'border-top':'borderTop',
		'border-top-color':'borderTopColor',
		'border-top-style':'borderTopStyle',
		'border-top-width':'borderTopWidth',
		'border-width':'borderWidth',
		'font-family':'fontFamily',
		'font-size':'fontSize',
		'font-variant':'fontVariant',
		'font-weight':'fontWeight',
		'letter-spacing':'letterSpacing',
		'line-height':'lineHeight',
		'list-style':'listStyle',
		'list-style-image':'listStyleImage',
		'list-style-position':'listStylePosition',
		'list-style-type':'listStyleType',
		'margin-bottom':'marginBottom',
		'margin-left':'marginLeft',
		'margin-right':'marginRight',
		'margin-top':'marginTop',
		'padding-bottom':'paddingBottom',
		'padding-left':'paddingLeft',
		'padding-right':'paddingRight',
		'padding-top':'paddingTop',
		'page-break-after':'pageBreakAfter',
		'page-break-before':'pageBreakBefore',
		'text-align':'textAlign',
		'text-decoration':'textDecoration',
		'text-indent':'textIndent',
		'text-transform':'textTransform',
		'vertical-align':'verticalAlign',
		'z-index ':'zIndex',
		'z-Index ':'zIndex'
	},
	reset : function(){
		var style = "/* http://meyerweb.com/eric/tools/css/reset/    v2.0 | 20110126   License: none (public domain)*/html, body, div, span, applet, object, iframe,h1, h2, h3, h4, h5, h6, p, blockquote, pre,a, abbr, acronym, address, big, cite, code,del, dfn, em, img, ins, kbd, q, s, samp,small, strike, strong, sub, sup, tt, var,b, u, i, center,dl, dt, dd, ol, ul, li,fieldset, form, label, legend,table, caption, tbody, tfoot, thead, tr, th, td,article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary,time, mark, audio, video {	margin: 0;	padding: 0;	border: 0;	font-size: 100%;	font: inherit;	vertical-align: baseline;}/* HTML5 display-role reset for older browsers */article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {display: block;}body {	line-height: 1;}ol, ul {	list-style: none;}blockquote, q {	quotes: none;}blockquote:before, blockquote:after,q:before, q:after {content: '';content: none;}table {border-collapse: collapse;border-spacing: 0;}"
		JMVC.head.addstyle(style, true, true);
	}
	
});
