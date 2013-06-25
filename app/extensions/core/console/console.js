JMVC.head.addstyle(JMVC.vars.baseurl + '/app/extensions/core/console/console.css', true);
JMVC.require('css', 'dim');
JMVC.extend('console', {
	'init' : function () {
		//get some page dimensions
		var dims = JMVC.dim.getScreenData(),
			border_size = 5,
			margin = 20,
			top_height = 20,
			foot_height = 100,
			// create the main container
			container = JMVC.dom.create(
				'div',{
					'class' : 'jmvc_console',
					'style':'left:' + margin + 'px;right:' + margin + 'px;top:' + margin + 'px;bottom:' + margin + 'px;border:' + border_size + 'px solid black'
				}
			),
			cnsl1 = JMVC.dom.create('textarea', {'class' : 'console_textarea'}),
			cnsl2 = JMVC.dom.clone(cnsl1),
			cnsl3 = JMVC.dom.clone(cnsl2),
			head = JMVC.dom.create('div', {'class' : 'jmvc_console_head', 'style' : 'height:' + top_height + 'px'}),
			edit = JMVC.dom.create('div', {'class' : 'jmvc_console_edit', 'style' : 'height:' + (dims.clientHeight - 2 * (border_size + margin) - foot_height - top_height) + 'px'}),
			edit_html = JMVC.dom.create('div', {'class' : 'jmvc_console_edit_html', 'style' : 'height:' + (dims.clientHeight - 2 * (border_size + margin) - foot_height - top_height) + 'px'}, cnsl1),
			edit_js = JMVC.dom.create('div', {'class' : 'jmvc_console_edit_js', 'style' : 'height:' + (dims.clientHeight - 2 * (border_size + margin) - foot_height - top_height) + 'px'}, cnsl2),
			edit_css = JMVC.dom.create('div', {'class' : 'jmvc_console_edit_css', 'style' : 'height:' + (dims.clientHeight - 2 * (border_size + margin) - foot_height - top_height) + 'px'}, cnsl3),
			foot = JMVC.dom.create('div', {'class' : 'jmvc_console_foot', 'style' : 'height:' + foot_height + 'px'});

		JMVC.dom.append(edit, [edit_html, edit_js, edit_css, JMVC.css.clearer]);
		
		
		JMVC.dom.append(container, head);	
		JMVC.dom.append(container, edit);
		JMVC.dom.append(container, foot);
		JMVC.css.style(container, {'width' :(dims.clientWidth - (margin + border_size) * 2) + 'px'});
		JMVC.dom.append(JMVC.dom.body(), container);
	}
});	