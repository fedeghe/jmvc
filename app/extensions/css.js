JMVC.require('color');
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
			}
		}
		
		return this; 
	},
	
	
	
	getComputedStyle : function(el, styleProperty){ 
		var computedStyle = null;
		if (typeof el.currentStyle != "undefined"){ 
			computedStyle = el.currentStyle; 
		}else{
			computedStyle = document.defaultView.getComputedStyle(element, null);
		}
		return computedStyle[this.css_propertymap[styleProperty] || styleProperty]; 
	},
	css3_map : ['-o-transform','-moz-transform','-o-transform'],
	css_propertymap : {
		'background':'background',
		'background-attachment':'backgroundAttachment',
		'background-color':'backgroundColor',
		'background-image':'backgroundImage',
		'background-position':'backgroundPosition',
		'background-repeat':'backgroundRepeat',
		'border':'border',
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
		'clear':'clear',
		'clip':'clip',
		'color':'color',
		'cursor':'cursor',
		'display':'display',
		'filter':'filter',
		'font':'font',
		'font-family':'fontFamily',
		'font-size':'fontSize',
		'font-variant':'fontVariant',
		'font-weight':'fontWeight',
		'height':'height',
		'left':'left',
		'letter-spacing':'letterSpacing',
		'line-height':'lineHeight',
		'list-style':'listStyle',
		'list-style-image':'listStyleImage',
		'list-style-position':'listStylePosition',
		'list-style-type':'listStyleType',
		'margin':'margin',
		'margin-bottom':'marginBottom',
		'margin-left':'marginLeft',
		'margin-right':'marginRight',
		'margin-top':'marginTop',
		'overflow':'overflow',
		'padding':'padding',
		'padding-bottom':'paddingBottom',
		'padding-left':'paddingLeft',
		'padding-right':'paddingRight',
		'padding-top':'paddingTop',
		'page-break-after':'pageBreakAfter',
		'page-break-before':'pageBreakBefore',
		'position':'position',
		'float':'styleFloat',
		'text-align':'textAlign',
		'text-decoration':'textDecoration',
		'text-indent':'textIndent',
		'text-transform':'textTransform',
		'top':'top',
		'vertical-align':'verticalAlign',
		'visibility':'visibility',
		'width':'width',
		'z-index ':'zIndex',
		'z-Index ':'zIndex',
		'zindex ':'zIndex'
	}
	
});
