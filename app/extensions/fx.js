JMVC.require('css');
JMVC.extend('fx',{
	show : function(elem) { 
		JMVC.css.style(elem, 'display', 'block'); 
	},

	hide : function(elem) { 
		JMVC.css.style(elem, 'display', 'none'); 
	},
	
	toggle : function(elem){
		var h = JMVC.css.style(elem, 'display') === 'none';
		this[h?'show':'hide'](elem);
		return this;
	},
	//
	// used to remember sizes
	nodes_sizes : {},
	slideUp : function(el){
		var height = JMVC.getNum(JMVC.css.getComputedStyle(el, 'height')),
			line_height =JMVC.getNum(JMVC.css.getComputedStyle(el, 'line-height')),
			width = JMVC.getNum(JMVC.css.getComputedStyle(el, 'width')),
			sizetext = JMVC.getNum(JMVC.css.getComputedStyle(el, 'font-size')),
			border_width = JMVC.getNum(JMVC.css.getComputedStyle(el, 'border-width')),
			border = JMVC.css.getComputedStyle(el, 'border'),
			padding = JMVC.css.getComputedStyle(el, 'padding'),
			margin = JMVC.css.getComputedStyle(el, 'margin'),
			//j.log(height+' '+width );

			propo = width/height;

		this.nodes_sizes[el] = {
			height : height,
			line_height: line_height,
			width : width,
			sizetext : sizetext,
			border_width : border_width,
			border : border,
			padding : padding,
			margin : margin,
			propo : propo
		};
		
		var timeout_me = function(){
			var timeout_up = window.setTimeout(
				function(){
					if(height > 0)height = height-1;
					if(width > 0)width = height*propo;
					if(sizetext > 0)sizetext = sizetext-1;
					if(line_height > 0)line_height = line_height-1;
					if(margin > 0)margin = margin-1;
					if(border_width > 0 )border_width = border_width-1;
					if(padding > 0)padding = padding-1;
					JMVC.css.style(el, {
						'height':height+'px',
						'line-height':line_height+'px',
						'width':width+'px',
						'font-size':sizetext+'px',
						'padding':padding+'px',
						'border-width':border_width+'px',
						'margin':margin+'px'
						
					});
				
					if(
						(
							height === 0
							||
							width === 0
							||
							line_height === 0
						)
						&&
						sizetext === 0
					){
						JMVC.css.style(el,{
							'height':'0px',
							'line-height':'0px',
							'width':'0px',
							'font-size':'0px',
							'padding':'0px',
							'border-width':'0px',
							'border':'none',
							'margin':'0px'

						});
						this.hide(el);
					}else{
						timeout_me();
					}
				},
				20
			);
		};
		timeout_me();	
		return this;
	},
	
	
	slideDown : function(el){
		var height = 0,
			width = 0,
			sizetext = 0,
			line_height = 0,
			padding = 0,
			border_width = 0,
			margin = 0,
			targets = this.nodes_sizes[el];
		if(!targets)return;
		var timeout_me = function(){
			var timeout_up = window.setTimeout(
				function(){
					if(height < targets.height)height = height+1;
					if(width < targets.width)width = height*targets.propo;
					if(sizetext < targets.sizetext)sizetext = sizetext+1;
					if(line_height < targets.line_height)line_height = line_height+1;
					
					if(padding < targets.padding)padding = padding+1;
					if(border_width < targets.border_width)border_width = border_width+1;
					if(margin < targets.margin)margin = margin+1;
					
					
					//debug(height+' '+width+' '+sizetext);
					
					JMVC.css.style(el, {
						'height':height+'px',
						'line-height':line_height+'px',
						'width':width+'px',
						'fontSize':sizetext+'px',
						'padding':padding+'px',
						'border-width':border_width+'px',
						'margin':margin+'px'
					});

					
					if(
						(
							height === targets.height
							||
							width === targets.width
							||
							line_height === targets.line_height
						)
						&&
						(
							sizetext === targets.sizetext
						)
					){

						JMVC.css.style(el, {
							'height':targets.height+'px',
							'line-height':targets.line_height+'px',
							'width':targets.width+'px',
							'font-size':targets.sizetext+'px',
							'padding':targets.padding+'px',
							'border-width':targets.border_width+'px',
							'border':targets.border,
							'margin':targets.margin+'px'

						});	
						this.show(el);
					}else{
						timeout_me();
					}
				},
				20
			);
		};
		timeout_me();
		return this;
	},
	
	
	fadeIn : function(el){
		var opacity = 0.0,
			targets = {opacity:1};
		JMVC.css.style(el,'opacity',0);	
		this.show(el);	
		
		var timeout_me = function(){
			var timeout_up = window.setTimeout(
				function(){
					if(opacity < targets.opacity)opacity = parseFloat(opacity+0.05);
					
					JMVC.css.style(el,'opacity',opacity);	

					if(opacity >= targets.opacity){
						JMVC.css.style(el, 'opacity',opacity);	
					}else{
						timeout_me();
					}
				},
				20
			);
		};
		timeout_me();	
		return this;
		
	},
	fadeOut : function(el){
		var opacity = JMVC.css.getComputedStyle(el, 'opacity');
		this.nodes_sizes[el] = {opacity : 1};
		
		var timeout_me = function(){
			var timeout_up = window.setTimeout(
				function(){
					if(opacity > 0)opacity = opacity-0.05;
					
					JMVC.css.style(el,'opacity', opacity);

					if(opacity <= 0){
						JMVC.css.style(el,'opacity',0);	
					}else{
						timeout_me();
					}
				},
				20
			);
		};
		timeout_me();
		return this;
	}
	
	
		
});
