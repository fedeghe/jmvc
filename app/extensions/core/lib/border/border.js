JMVC.require('core/css');
JMVC.extend('border', {
	init : function () {
		JMVC.head.addstyle(JMVC.vars.extensions + 'core/lib/border/default.css', true, false);
	},
	/**
	 **
	 ** ALL METHODS RETURN A NODE THAT MUST BE APPENDED IN A RELATIVE POSITIONED NODE !!!
	 **
	 **
	 */
	
	/*
	 * left > 0 => /
	 * left < 0 => \
	 * 
	 * right > 0 => /
	 * right < 0 => \
	 */				   
	xtop : function (height , width, left, right, color) {
		
		var node, dleft, dright, br,
			brdsize = height,
			left_style, right_style;
			
		node = JMVC.dom.create('div', {'class' : 'babs', 'style' : 'top:' + -brdsize + 'px'});

		switch (true) {
			//    /-------\
			case left >= 0 && right <= 0 :
				left_style = 'width:' + (width / 2 - left) + 'px;' +
							'left:0px;top:0px;' +
							'border-left:' + left + 'px solid transparent;'+
							'border-bottom:' + brdsize + 'px solid ' + color + ';';
				right_style = 'width:' + (width / 2 + right) + 'px;' +
							'left:0px;top:0px;' +
							'border-right:' +  -right  + 'px solid transparent;' +
							'border-bottom:' + brdsize + 'px solid ' + color + ';';
			break;
			//    /-------/
			case left >= 0 && right >= 0 :
				left_style = 'width:' + (width / 2 - left) + 'px;' +
							'left:0px;top:0px;' +
							'border-left:' + left + 'px solid transparent;' +
							'border-bottom:' + brdsize + 'px solid ' + color + ';';
				right_style = 'width:' + (width / 2) +'px;' +
							'right:' + -right + 'px;' +
							'top:' + -brdsize + 'px;' +
							'border-right:' + right + 'px solid transparent;' +
							'border-top:' + brdsize + 'px solid ' + color + ';';
			break;
			//    \-------\
			case left <= 0 && right <= 0 :
				left_style = 'width:' + (width / 2) + 'px;' +
							'left:' + left + 'px;' +
							'top:0px;' +
							'border-left:' + -left + 'px solid transparent;' +
							'border-top:' + brdsize + 'px solid ' + color + ';';
				right_style = 'width:' + (width / 2 + right) + 'px;' +
							'top:' + -brdsize + 'px;' +
							'right:0px;' +
							'border-right:' + -right + 'px solid transparent;' +
							'border-bottom:' + brdsize + 'px solid ' + color + ';';
			break;
		}

		dleft = JMVC.dom.create('div', {'style' : left_style, 'class' : 'fleft zerofsize brel'}, '&nbsp;');
		dright = JMVC.dom.create('div', {'style' : right_style, 'class' : 'fright zerofsize brel'}, '&nbsp;');
		br = JMVC.dom.create('br', {'class':'bclear'});
		
		return JMVC.dom.append(node, [dleft, dright, br]);
	},
	
	xbottom : function (height, width, left, right, color) {
		var node, dleft, dright, br,
			brdsize = height,
			left_style, right_style;
			
		node = JMVC.dom.create('div', {'class' : 'babs', 'style' : 'bottom:'+ (-2 * brdsize) + 'px'});
		switch(true){
			//    /-------\
			case left >= 0 && right <= 0 :
				left_style = 'width:' + (width / 2 - left) + 'px;' +
							'left:0px;top:0px;' +
							'border-left:' + left + 'px solid transparent;' +
							'border-top:' + brdsize + 'px solid ' + color + ';';
				right_style = 'width:' + (width / 2 + right) + 'px;' +
							'left:0px;top:0px;' +
							'border-right:' + -right + 'px solid transparent;' +
							'border-top:' + brdsize + 'px solid ' + color + ';';
			break;
			//    /-------/
			case left >= 0 && right >= 0 :
				left_style = 'width:' + (width / 2 - left) + 'px;' +
							'left:0px;top:0px;' +
							'border-left:' + left + 'px solid transparent;' +
							'border-top:' + brdsize + 'px solid ' + color + ';';
				right_style = 'width:' + (width / 2) + 'px;' +
							'right:' + -right + 'px;' +
							'top:' + -brdsize + 'px;' +
							'border-right:' + right + 'px solid transparent;' +
							'border-bottom:' + brdsize + 'px solid ' + color + ';';
			break;
			//    \-------\
			case left <= 0 && right <= 0 :
				left_style = 'width:' + (width / 2) + 'px;' +
							'left:' + left + 'px;' +
							'top:0px;' +
							'border-left:' + -left + 'px solid transparent;' +
							'border-bottom:' + brdsize + 'px solid ' + color + ';';				
				right_style = 'width:' + (width / 2 + right) + 'px;' +
							'top:' + -brdsize + 'px;' +
							'right:0px;' +
							'border-right:' + -right + 'px solid transparent;' +
							'border-top:' + brdsize + 'px solid ' + color + ';';				
			break;
		}		
		dleft = JMVC.dom.create('div', {'style':left_style, 'class':'fleft zerofsize brel'}, '&nbsp;');
		dright = JMVC.dom.create('div', {'style':right_style, 'class':'fright zerofsize brel'}, '&nbsp;');
		br = JMVC.dom.create('br',{'class':'bclear'});

		return JMVC.dom.append(node,[dleft, dright, br]);
	},
	
	
	
	/*
	 * top > 0 => /
	 * top < 0 => \
	 * 
	 * bottom > 0 => /
	 * bottom < 0 => \
	 */
	xleft : function (height, width, top, bottom, color) {
		var node, dtop, dbottom,
			brdsize = width,
			top_style, bottom_style;
			
		node = JMVC.dom.create('div', {'class':'babs', 'style': 'left:-'+brdsize+'px'});
		switch(true){
			//		
			//		/
			//		|
			//		|
			//		\
			case top >= 0 && bottom <= 0 :
				top_style = 'height:'+(height/2 - top)+'px;' +
							'left:0px;top:0px;' +
							'border-top:'+top+'px solid transparent;' +
							'border-right:'+brdsize+'px solid '+color+';';
				bottom_style = 'height:'+(height/2 + bottom)+'px;' +
							'left:0px;top:0px;' +
							'border-bottom:'+(-bottom)+'px solid transparent;' +
							'border-right:'+brdsize+'px solid '+color+';';
			break;
			//		
			//		/
			//		|
			//		|
			//		/
			case top >= 0 && bottom >= 0 :
				top_style = 'height:'+(height/2 - top)+'px;' +
							'left:0px;top:0px;' +
							'border-top:'+top+'px solid transparent;' +
							'border-right:'+brdsize+'px solid '+color+';';
				bottom_style = 'height:'+(height/2)+'px;' +
							'left:0px;top:0px;' +
							'border-bottom:'+(bottom)+'px solid transparent;' +
							'border-left:'+brdsize+'px solid '+color+';';
	
			break;
			//		
			//		\
			//		|
			//		|
			//		\
			case top <= 0 && bottom <= 0 :
				top_style = 'height:'+(height/2)+'px;' +
							'left:0px;top:'+top+'px;' +
							'border-top:'+(-top)+'px solid transparent;' +
							'border-left:'+brdsize+'px solid '+color+';';
				bottom_style = 'height:'+(height/2 + bottom)+'px;' +
							'left:0px;top:'+top+'px;' +
							'border-bottom:'+(-bottom)+'px solid transparent;' +
							'border-right:'+brdsize+'px solid '+color+';';
			break;
		}		
		dtop = JMVC.dom.create('div', {'style':top_style, 'class':'zerofsize brel'}, '&nbsp;');
		dbottom = JMVC.dom.create('div', {'style':bottom_style, 'class':'zerofsize brel'}, '&nbsp;');

		return JMVC.dom.append(node, [dtop, dbottom]);
	},

	xright : function (height, width, top, bottom, color) {
		var node, dtop, dbottom,
			brdsize = width,
			top_style, bottom_style;
			
		node = JMVC.dom.create('div', {'class':'babs', 'style': 'right:-'+brdsize+'px'});
		switch(true){
			//		
			//		\
			//		|
			//		|
			//		/
			case top >= 0 && bottom <= 0 :
				top_style = 'height:'+(height/2 - top)+'px;left:0px;top:0px;border-top:'+top+'px solid transparent;border-left:'+brdsize+'px solid '+color+';';
				bottom_style = 'height:'+(height/2 + bottom)+'px;left:0px;top:0px;border-bottom:'+(-bottom)+'px solid transparent;border-left:'+brdsize+'px solid '+color+';';
			break;
			//		
			//		\
			//		|
			//		|
			//		\
			case top >= 0 && bottom >= 0 :
				top_style = 'height:'+(height/2 - top)+'px;left:0px;top:0px;border-top:'+top+'px solid transparent;border-left:'+brdsize+'px solid '+color+';';
				bottom_style = 'height:'+(height/2)+'px;left:0px;top:0px;border-bottom:'+(bottom)+'px solid transparent;border-right:'+brdsize+'px solid '+color+';';
	
			break;
			//		
			//		/
			//		|
			//		|
			//		/
			case top <= 0 && bottom <= 0 :
				top_style = 'height:'+(height/2)+'px;' +
							'left:0px;' +
							'top:'+top+'px;' +
							'border-top:'+(-top)+'px solid transparent;' +
							'border-right:'+brdsize+'px solid '+color+';';
				bottom_style = 'height:'+(height/2 + bottom)+'px;' +
							'left:0px;' +
							'top:'+top+'px;' +
							'border-bottom:'+(-bottom)+'px solid transparent;' +
							'border-left:'+brdsize+'px solid '+color+';';
			break;
		}		
		dtop = JMVC.dom.create('div', {'style':top_style, 'class':'zerofsize brel'}, '&nbsp;');
		dbottom = JMVC.dom.create('div', {'style':bottom_style, 'class':'zerofsize brel'}, '&nbsp;');
		
		return JMVC.dom.append(node,[dtop, dbottom]);
	},
	
	///////
	//////
	/////
	////
	///
	//
	top : function(color, bgcolor, w, size){
		return JMVC.dom.create(
			'div',
			{
				"class":"border oriz",
				"style" : JMVC.string.replaceall(
					"border-left : %brdBG%; border-bottom:%brdFG%; border-right:%brdBG%;width:%w%px;",
					{"brdFG" : size + 'px solid ' + color, "brdBG" : size + 'px solid ' + bgcolor, "w" : w}
				)
			},
			'&nbsp;'
		);
	},

	right : function(color, bgcolor, h, size){
		return JMVC.dom.create(
			'div',
			{
				"class":"border vert",
				"style" : JMVC.string.replaceall(
					"border-left : %brdFG%; border-top:%brdBG%; border-bottom:%brdBG%;height:%h%px; float:right;",
					{"brdFG" : size + 'px solid ' + color, "brdBG" : size + 'px solid ' + bgcolor, "h" : h}
				)
			},
			'&nbsp;'
		);
	},

	bottom : function(color, bgcolor, w, size){
		return JMVC.dom.create(
			'div',
			{
				"class":"border oriz",
				"style" : JMVC.string.replaceall(
					"border-left : %brdBG%; border-top:%brdFG%; border-right:%brdBG%;width:%w%px;",
					{"brdFG" : size + 'px solid ' + color, "brdBG" : size + 'px solid ' + bgcolor, "w" : w}
				)
			},
			'&nbsp;'
		);
	},

	left : function(color, bgcolor, h, size){
		return JMVC.dom.create(
			'div',
			{
				"class":"border vert",
				"style" : JMVC.string.replaceall(
					"border-right : %brdFG%; border-top:%brdBG%; border-bottom:%brdBG%;height:%h%px; float:left;",
					{"brdFG" : size + 'px solid ' + color, "brdBG" : size + 'px solid ' + bgcolor, "h" : h}
				)
			},
			'&nbsp;'
		);
	},
	
	vert : function (width, height, top, down, pos, color, bgcolor) {

		var vertical_style_top = 'border-' + (top > 0 ? 'right' : 'left') + ':' + width + 'px solid ' + color+';',
			vertical_style_bottom = 'border-' + (down > 0 ? 'right' : 'left') + ':' + width + 'px solid ' + color + ';',
			style_top = 'border-top:' + Math.abs(top) + 'px solid ' + bgcolor + ';',
			style_bottom = 'border-bottom:' + Math.abs(down) + 'px solid ' + bgcolor + ';',
			div_top = JMVC.dom.create('div', {
				style : 'position:absolute;' + (top < 0 ? 'top:' + top + 'px;' : '') + 'border:0px;' + style_top + vertical_style_top + 'height:' + (height / 2 - (top > 0 ? top : 0)) + 'px;'
			}),

			div_bottom = JMVC.dom.create('div', {
				'style' : 'position:absolute;top:' + (height / 2) + 'px;border:0px;' + style_bottom + vertical_style_bottom + 'height:' + (height / 2 - (down > 0 ? down : 0) ) + 'px;'
			}),

			container = JMVC.dom.create('div', {
				'class' : 'border',
				'style' : 'float:' + pos + ';position:relative;width:' + width + 'px;height:' + height + 'px;'
			})
		
		JMVC.dom.append(container, [div_top, div_bottom]);
		
		return container;
	}
});

