JMVC.require('core/css');
JMVC.extend('tabs', {
	counter : 0,
	vert_css : false,
	oriz_css : false,

	init : function () {},

	tab : function (mode, vertlabel) {
		JMVC.tabs.counter += 1;
		var bid = '_' + JMVC.tabs.counter,
			direction = {'v' : 'v', 'o' : 'o'}[mode] || 'o',
			that = this;

		this.tabs = {};
		this.num = 0;
		this.els2render = [];
		this.elements = {'li' : [], 'div' : []};

		this.add = function (label, content) {
			this.tabs[label] = content;
			this.num += 1;
		};

		this.render = function (idcontainer, idul, show) {

			//utility function to hide all tabs
			function hideall () {
				//his é JMVC.tabs, quindi glielo passo sotto con la call
				for (var i = 0, l = that.elements['div'].length; i < l; i += 1) {
					JMVC.css.style(that.elements['div'][i], 'display', 'none');
					JMVC.dom.switchClass(that.elements['li'][i], 'sel', 'unsel');
				}
			}
			function verticalize (str) {
				return str.split('').join('<br />');
			}
			
			
			
			
			var num2show = show || 0,
				ul_id = idul + bid,
				anchorName = JMVC.util.uniqueid + '',
				anchor = JMVC.dom.create('a', {name : anchorName}),
				ul = JMVC.dom.create('ul', {id : ul_id, 'class' : 'tablabels_' + direction}),
				tabcontainer = JMVC.dom.create('div', {'class' : 'tabcontainer_' + direction, 'data-ul' : ul_id}),
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

			//add an end event to inject a css that take care of vertical dimensions for min-height of tabs

			
			
			
			
			//set bindings
			for(i = 0, l = that.elements['li'].length; i < l; i += 1){
				JMVC.events.bind(that.elements['li'][i], 'click', function(e){

					document.location.hash = anchorName;

					//hide all tabs
					hideall();

					var target = JMVC.events.eventTarget(e),
						//show tab
						id_orig = JMVC.dom.attr(target, 'id'),
						id_tab2show = id_orig.replace('jvmc_tb', 'jvmc_cont');

					//JMVC.css.style(JMVC.dom.find('#'+id_tab2show), 'display', 'block');
					JMVC.css.show(JMVC.dom.find('#' + id_tab2show));

					JMVC.dom.switchClass(target, 'unsel', 'sel');

				
					//fix content height
					JMVC.tabs.fixheight();


				});
			}
			

			JMVC.tabs.fixheight();
			return ids2return;
		};
		
	},
	fixheight : function () {
		
		var tc = JMVC.dom.find('.tabcontainer_v');
	
		JMVC.each(tc, function (el, i) {
			var ulid = JMVC.dom.attr(el, 'data-ul'),
				ul = JMVC.dom.find('#' + ulid),
				h = ~~(JMVC.css.height(ul));
			if (h) {
				JMVC.css.style(el, 'minHeight', h + 'px');
			}
		});
	},
	render : function () {
		
		JMVC.events.end(function () {
			var border3 = '-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;',
				colors = {
					oriz : {
						base : '#aaa',
						selected : '#fff',
						hover : '#ddd',
						border : '#888',
						text : '#000',
						textselected : '#000',
						texthover : '#000',
						containerbg : '#fff',
						textcontent : '#000' 
					},
					vert : {
						base : '#aaa',
						selected : '#fff',
						hover : '#ddd',
						border : '#888',
						text : '#000',
						textselected : '#000',
						texthover : '#000',
						containerbg : '#fff',
						textcontent : '#000' 
					}
				},
				sizes = {
					oriz : {border : 2, round : 5},
					vert : {border : 2, round : 5}
				},
				styles = {
					'ul.tablabels_o':'overflow:hidden; list-style:none;margin:0px;padding:0px;',
					'ul.tablabels_o li':'color:' + colors.oriz.text + ';float:left; line-height:1;font-size:100%;padding:0px;margin:0px;border:0px;background-color:' + colors.oriz.base + ';padding:5px; cursor:pointer;margin-left:5px;'+
						'border:solid ' + sizes.oriz.border + 'px ' + colors.oriz.border + ';-moz-border-radius-topleft: ' + sizes.oriz.round + 'px;-moz-border-radius-topright:' + sizes.oriz.round + 'px;-moz-border-radius-bottomleft:0px;-moz-border-radius-bottomright:0px;'+
						'-webkit-border-top-left-radius:' + sizes.oriz.round + 'px;-webkit-border-top-right-radius:' + sizes.oriz.round + 'px;-webkit-border-bottom-left-radius:0px;-webkit-border-bottom-right-radius:0px;'+
						'border-top-left-radius:' + sizes.oriz.round + 'px;border-top-right-radius:' + sizes.oriz.round + 'px;border-bottom-left-radius:0px;border-bottom-right-radius:0px;',
					'ul.tablabels_o li:hover':'color:' + colors.oriz.texthover + ';background-color:' + colors.oriz.hover + ';',
					'ul.tablabels_o li.sel':'color:' + colors.oriz.textselected + ';border:' + sizes.oriz.border + 'px solid ' + colors.oriz.border + ';border-bottom:none; background-color:' + colors.oriz.selected + '; z-index:10;position:relative;bottom:-1px; ',
					'div.tabcontainer_o' : 'color:' + colors.oriz.textcontent +';background-color:' + colors.oriz.containerbg +';' + border3 + 'line-height:1;font-size:100%;padding:0px;margin:0px;border:0px;border:' + sizes.oriz.border + 'px solid ' + colors.oriz.border + ';position:relative;top:-3px;z-index:5;padding:5px;',
					///////////////////////////////////////////////////////////////////////
					'ul.tablabels_v':'color:' + colors.vert.text + ';float:left;list-style:none;margin:0px;padding:0px;',
					'ul.tablabels_v li':'display:block; text-align:right;line-height:1;font-size:100%;padding:0px;margin:0px;border:0px;background-color:' + colors.vert.base + ';padding:5px; cursor:pointer;margin-top:5px;left:' + sizes.vert.round + 'px;padding-right:' + 2 * sizes.vert.round + 'px;position:relative;' +
							'border:solid ' + sizes.vert.border + 'px ' + colors.vert.border + ';-moz-border-radius-topleft: ' + sizes.vert.round + 'px;-moz-border-radius-topright:0px;-moz-border-radius-bottomleft:' + sizes.vert.round + 'px;-moz-border-radius-bottomright:0px;'+
							'-webkit-border-top-left-radius:' + sizes.vert.round + 'px;-webkit-border-top-right-radius:0px;-webkit-border-bottom-left-radius:' + sizes.vert.round + 'px;-webkit-border-bottom-right-radius:0px;'+
							'border-top-left-radius:' + sizes.vert.round + 'px;border-top-right-radius:0px;border-bottom-left-radius:' + sizes.vert.round + 'px;border-bottom-right-radius:0px;',
					'ul.tablabels_v li:hover':'color:' + colors.vert.texthover + ';background-color:' + colors.vert.hover + ';',
					'ul.tablabels_v li.sel':'color:' + colors.vert.textselected + ';border:' + sizes.vert.border + 'px solid ' + colors.vert.border + ';border-right:none; background-color:' + colors.vert.selected + '; z-index:10;position:relative;left:1px',
					'div.tabcontainer_v' : 'color:' + colors.vert.textcontent +';background-color:' + colors.vert.containerbg +';' + border3 + 'min-height:250px;overflow:hidden; position:relative;line-height:1;font-size:100%;padding:0px;margin:0px;border:0px;border:' + sizes.vert.border + 'px solid ' + colors.vert.border + ';left:-1px;z-index:5; padding:5px;'
				};
			
			JMVC.head.addstyle(JMVC.css.json2css(styles), true, true);			
		});
	}
});
