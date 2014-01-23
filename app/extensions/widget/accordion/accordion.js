// load widget style related
JMVC.head.addstyle(JMVC.vars.baseurl + '/app/extensions/widget/accordion/accordion.css', true);

JMVC.require('core/fx/fx', 'core/cookie/cookie');

JMVC.widget.Accordion = function (h, slide, theme) {
	this.theme = theme || 'default'
	this.eff = slide || 'default';
	this.els = [];
	this.height = h || 300;	
};
JMVC.widget.Accordion.prototype.addElement = function (title, content) {
	this.els.push({
		title : title,
		content : content,
		dom : []
	});
};
JMVC.widget.Accordion.prototype.removeElement = function (n) {
	this.els[n] && this.els.splice(n, 1);
};

JMVC.widget.Accordion.prototype.render = function (container, open_index, rem) {
	
	var ul = JMVC.dom.create('ul', {'class' : 'accordionContainer ' + this.theme}),
		attrs,
		self = this,
		cookie_rem_name = rem ? 'jmvc_accordion_' + rem : null,
		cookie_val,
		show_func = this.eff === 'default' ? 'show' : 'slideDown',
		hide_func = this.eff === 'default' ? 'hide' : 'slideUp',
		viewtmp,
		li,
		i,
		len;

	open_index = open_index || 0;

	viewtmp = open_index;

	if (rem) {
		cookie_val = JMVC.num.getNum(JMVC.cookie.get(cookie_rem_name));
		open_index = cookie_val >= 0 ? cookie_val : open_index;
	}

	JMVC.cookie.set(cookie_rem_name, open_index);

	JMVC.dom.append(container, ul);
	
	for(i = 0, len = this.els.length, li = false; i < len; i += 1) {
		li = JMVC.dom.add(ul, 'li', {'class' : 'accordionElement ' + this.theme});
		attrs = {'class' : 'content ' + this.theme, 'style':'minHeight:' + this.height + 'px'};
		
		if (i !== open_index) {
			attrs.style = 'display:none';
		}
		//console.debug('open_index : '+ open_index );
		this.els[i].dom = [
			JMVC.dom.create('div', {'class' : this.theme  + ' title' + (i == open_index ? ' selected' : '')}, this.els[i].title),
			JMVC.dom.create('div', attrs, this.els[i].content)
		];

		JMVC.dom.append(li, this.els[i].dom[0]);
		JMVC.dom.append(li, this.els[i].dom[1]);

		(function (j) {			
			JMVC.events.bind(
				self.els[j].dom[0],
				'click',
				function (e) {
					var y = JMVC.cookie.get(cookie_rem_name);
					
					if (y == j) {
						return false;
					}
					
					JMVC.fx[hide_func](self.els[y].dom[1], 10);
					JMVC.fx[show_func](self.els[j].dom[1], 10);	
					JMVC.dom.removeClass(self.els[y].dom[0], 'selected');
					JMVC.dom.addClass(self.els[j].dom[0], 'selected');
					viewtmp = j;
					JMVC.cookie.set(cookie_rem_name , j);

				}
			);
		})(i);
	}
};
