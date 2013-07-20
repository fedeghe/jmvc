JMVC.require('core/dim', 'core/css', 'event_scroll');
JMVC.extend('modal',{
	'id' : 0,
	'open' : function(content, title, width, height, options){
		var bgcolor = options && options.bgcolor ? options.bgcolor : 'red',
			shadow = options && options.shadow;
	
		
		title = title || '';
		this.id++;
		
		JMVC.events.disable_scroll(JMVC.WD.body);
		
		var scrData = JMVC.dim.getScreenData(),
			bg,
			modal,
			bodysize = JMVC.dim.bodySize(),
			screenSize = JMVC.dim.getScreenData(),
			viewportSize = JMVC.dim.getViewportSize(),
			viewHeight = viewportSize[1];
		//console.debug(bodysize[1]);
		//console.debug(viewportSize[1]);
		//console.debug(viewHeight);
		//console.debug(height);
		
		//create bg
		bg = JMVC.dom.create(
			'div',
			{
				'class' : 'jmvc_modal_content_bg',
				'style' : 'width:'+bodysize[0]+'px;height:'+bodysize[1]+'px;background-color:'+bgcolor+';'
			}
		);
		
		//get style
		JMVC.head.addstyle(JMVC.vars.baseurl + '/app/extensions/widget/modal/modal.css', true);
		
		JMVC.dom.append(JMVC.dom.body(), bg);
		
		
		//now create real content
		// a div with topbar and content passsed
		var modal = JMVC.dom.create('div', {'class':'jmvc_modal_content'+(shadow ? ' shadow' : '')}),
			mod_pos = JMVC.dim.centerHelper(width, height);
		
		
		JMVC.css.style(modal, {'width': width+'px','height': height + 'px', 'left' : mod_pos['left'] + 'px', 'top':mod_pos['top'] + 'px'});
		
		var topbar = JMVC.dom.add(modal, 'div', {'class':'topbar'} );
		
		var tit = JMVC.dom.create('div', {'class':'jmvc_modal_title'}, title),
			close = JMVC.dom.create('div', {'class':'jmvc_modal_close', 'title':'close'}, 'x');
		
		JMVC.dom.append(topbar, tit);
		JMVC.dom.append(topbar, close);
		JMVC.dom.append(topbar, JMVC.dom.create('br',{'class':'clearer'}));
		
		JMVC.events.bind(close, 'click', function(){JMVC.modal.close(close); });
		
		var given_content_container = JMVC.dom.create('div' , {'class': 'given_content_container'}, content);
		JMVC.css.style(given_content_container, {'height': (height-50)+'px'});
		
		JMVC.dom.append(modal, given_content_container);
		JMVC.dom.append(JMVC.dom.body(), modal);
		
		
		//JMVC.debug(scrData);
		//JMVC.debug(this.id);
	},
	'close' : function (element) {

		JMVC.events.unbind(element, 'click');
		JMVC.dom.remove(JMVC.dom.find('.jmvc_modal_content'));
		JMVC.dom.remove(JMVC.dom.find('.jmvc_modal_content_bg'));
		JMVC.events.enable_scroll();
		
	}
});