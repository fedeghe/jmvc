//
//
// TODO: MUST BE REWRITTEN AS A REAL OBJECT !!!!
//
//
JMVC.extend('tabs', {
	counter : 0,
	vert_css : false,
    oriz_css : false,
    
    style: '/app/extensions/widget/tabs/style.css',
    init: function () {
        JMVC.head.addStyle(JMVC.vars.baseurl + JMVC.tabs.style, true);
    },
	tab : function (options) {
		JMVC.tabs.counter += 1;
		options = options || {};

		var bid = '_' + JMVC.tabs.counter,
			vertlabel = options.vertlabel || false,
			direction = {'v' : 'v', 'o' : 'o'}[options.mode || 'o'],
			tbId = options.tbId || false,
			that = this;

		this.tabs = {};
		this.num = 0;
		this.els2render = [];
		this.elements = {'li' : [], 'div' : []};

		this.add = function (label, content) {
			this.tabs[label] = content;
			this.num += 1;
		};

		this.current = null;
		this.render = function (idcontainer, idul, show) {
			//utility function to hide all tabs
			function hideall () {
				for (var i = 0, l = that.elements['div'].length; i < l; i += 1) {
					JMVC.css.style(that.elements['div'][i], 'display', 'none');
					JMVC.dom.switchClass(that.elements['li'][i], 'sel', 'unsel');
				}
            }
            
			function verticalize (str) {
				return str.split('').join('<br />');
			}
			
			var self = this,
				num2show = show || 0,
				ul_id = idul + bid,
				anchorName = JMVC.util.uniqueid + '',
				anchor = JMVC.dom.create('a', {name : anchorName}),
				ul = JMVC.dom.create('ul', {id : ul_id, 'class' : 'tablabels_' + direction}),
				tabcontainer = JMVC.dom.create('div', {'class' : 'respfixed tabcontainer_' + direction, 'data-ul' : ul_id}),
				i = 0,
				j = 0,
				l = 0,
				li,
				div,
				ids2return = [],
				clearer = JMVC.dom.create('br', {'style' : 'clear:both; line-height:0px; height:0px'}),
				border3 = '-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;',
				container = JMVC.dom.find('#' + idcontainer);

			for(j in that.tabs){
				var mayhide = (i !== num2show) ? 'none' : 'block',
					liclass = (i !== num2show) ? 'unsel' : 'sel',
					id = 'jvmc_cont' + i + bid;
				ids2return.push(id);
				var more = (i == that.num - 1) ? '<br style="clear:both; line-height:0px; height:0px" />' : '';
				li = JMVC.dom.create(
					'li',
					{'class' : 'tablabel ' + liclass,
						'id': 'jvmc_tb' + i + bid
					},
					(direction=='v' && vertlabel) ? verticalize(j) : j + more
				);
				that.elements['li'].push(li);
				JMVC.dom.append(ul, li);
				
				div = JMVC.dom.create('div', {'class' : 'tab', 'id' : id, 'style' : 'display:' + mayhide}, JMVC.parse(that.tabs[j]));
				that.elements['div'].push(div);
				JMVC.dom.append(tabcontainer, div);
				i += 1;
			}
			
			//append the clearer br to the inside the last li if oriz
			//if(direction == 'o'){JMVC.dom.append(li, clearer);}
			this.els2render.push(ul);
			this.els2render.push(tabcontainer);
			//append the clearer br after the container the last li if vert
			if (direction == 'v') {
				this.els2render.push(clearer);
			}
			JMVC.dom.append(container, anchor);
			for (i = 0, l = that.els2render.length; i < l; i += 1) {
				JMVC.dom.append(container, that.els2render[i]);
			}

			//set bindings
			for(i = 0, l = that.elements['li'].length; i < l; i += 1){
				JMVC.events.on(that.elements['li'][i], 'click', function(e){
					//anchor up
					document.location.hash = anchorName;
					//hide all tabs
					hideall();
					var target = JMVC.events.eventTarget(e),
						//show tab
						id_orig = JMVC.dom.attr(target, 'id'),
						id_tab2show = id_orig.replace('jvmc_tb', 'jvmc_cont');

					self.current = '#' + id_tab2show;
					JMVC.css.show(JMVC.dom.find(self.current));

					JMVC.dom.switchClass(target, 'unsel', 'sel');

					//fix content height
					JMVC.tabs.fixheight();
				});
			}

			JMVC.events.delay(function () {JMVC.tabs.fixheight(); }, 0);
			return ids2return;
		};	
    },
    
	fixheight : function () {
		var tc = JMVC.dom.find('.tabcontainer_v');
		JMVC.each(tc, function (el, i) {
			var ulid = JMVC.dom.attr(el, 'data-ul'),
				ul = JMVC.dom.find('#' + ulid),
				h = ~~(JMVC.css.height(ul));
			h && JMVC.css.style(el, 'minHeight', h + 'px');
		});
    }
});
