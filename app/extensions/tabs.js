JMVC.require('css');
JMVC.extend('tabs',{
	counter : 0,
	vert_css : false,
	oriz_css : false,
	
	init:function(){},	
	tab : function(mode, vertlabel){
		JMVC.tabs.counter++;
		var bid = '_'+JMVC.tabs.counter,
			direction = {'v':'v','o':'o'}[mode] || 'o';
		var that = this;
		this.tabs = {};
		this.num = 0;
		this.els2render = [];
		this.elements = {'li':[],'div':[]};
		
		this.add = function(label, content){
			this.tabs[label] = content;
			this.num += 1;
		};
		
		this.render = function(idcontainer, idul, show){
			
			//utility function to hide all tabs
			function hideall(){
				//his é JMVC.tabs, quindi glielo passo sotto con la call
				for(var i = 0, l=that.elements['div'].length; i<l; i++){
					JMVC.css.style(that.elements['div'][i], 'display', 'none');
					JMVC.dom.switchClass(that.elements['li'][i], 'sel', 'unsel');
				}
			}
			function verticalize(str){
				return str.split('').join('<br />');
			}
			
			
			
			var num2show = show || 0;
			var ul_id = idul+bid;
			var ul = JMVC.dom.create('ul', {id:ul_id, 'class':'tablabels_'+direction});
			var tabcontainer = JMVC.dom.create('div',{'class':'tabcontainer_'+direction});
			var i = 0, li, div, ids2return = [];
			for(var j in that.tabs){
				var mayhide = (i !== num2show)? 'none' : 'block',
					liclass = (i !== num2show)? 'unsel' : 'sel',
					id = 'jvmc_cont'+i+bid;
				ids2return.push(id);
				var more = (i==that.num-1) ? '<br style="clear:both; line-height:0px; height:0px" />' : '';
				li = JMVC.dom.create('li', {'class':'tablabel '+liclass, 'id': 'jvmc_tb'+i+bid}, (direction=='v' && vertlabel)?verticalize(j) : j+more);
				that.elements['li'].push(li);
				JMVC.dom.append(ul, li);
				
				div = JMVC.dom.create('div', {'class':'tab', 'id': id,'style':'display:'+mayhide}, JMVC.parse( that.tabs[j] ));
				that.elements['div'].push(div);
				JMVC.dom.append(tabcontainer, div);
				i++;
			}
			//create a clearer
			var clearer = JMVC.dom.create('br', {'style':'clear:both; line-height:0px; height:0px'});
			//append the clearer br to the inside the last li if oriz
			//if(direction == 'o'){JMVC.dom.append(li, clearer);}

			this.els2render.push(ul);
			this.els2render.push(tabcontainer);
			//append the clearer br after the container the last li if vert
			if(direction == 'v'){
				this.els2render.push(clearer);
			}
			
			var container = JMVC.dom.find(idcontainer);
			for(var i=0, l=that.els2render.length; i<l; i++){
				JMVC.dom.append(container, that.els2render[i]);
			}
			
			
			//add an end event to inject a css that take care of vertical dimensions for min-height of tabs
			JMVC.events.end(function(){
				var realheight = parseInt(JMVC.css.getComputedStyle(  JMVC.dom.find(ul_id), 'height'), 10)*2 ,
					styles = {};
				if(direction == 'o' && !JMVC.tabs.oriz_css){
					styles = {
						'ul.tablabels_o':'height:30px; list-style:none;margin:0px;padding:0px;',
						'ul.tablabels_o li':'float:left; line-height:1;font-size:100%;padding:0px;margin:0px;border:0px;background-color:#ddd;padding:5px; cursor:pointer;margin-left:5px;'+
							'border:solid 1px #000000;-moz-border-radius-topleft: 5px;-moz-border-radius-topright:5px;-moz-border-radius-bottomleft:0px;-moz-border-radius-bottomright:0px;'+
							'-webkit-border-top-left-radius:5px;-webkit-border-top-right-radius:5px;-webkit-border-bottom-left-radius:0px;-webkit-border-bottom-right-radius:0px;'+
							'border-top-left-radius:5px;border-top-right-radius:5px;border-bottom-left-radius:0px;border-bottom-right-radius:0px;',
						'ul.tablabels_o li:hover':'background-color:white;',
						'ul.tablabels_o li.sel':'border:1px solid black;;border-bottom:none; background-color:white; z-index:10;position:relative;top:1px',
						'div.tabcontainer_o':'line-height:1;font-size:100%;padding:0px;margin:0px;border:0px;border:1px solid black;position:relative;top:-3px;z-index:5; padding:5px'
					};
					JMVC.tabs.oriz_css = true;
					JMVC.head.addstyle(JMVC.util.json2css(styles), true, true);
				}
				if(direction == 'v' && !JMVC.tabs.vert_css){
					styles = {
						'ul.tablabels_v':'float:left;list-style:none;margin:0px;padding:0px;',
						'ul.tablabels_v li':'display:block; text-align:center;line-height:1;font-size:100%;padding:0px;margin:0px;border:0px;background-color:#ddd;padding:5px; cursor:pointer;margin-top:5px;'+
								'border:solid 1px #000000;-moz-border-radius-topleft: 5px;-moz-border-radius-topright:0px;-moz-border-radius-bottomleft:5px;-moz-border-radius-bottomright:0px;'+
								'-webkit-border-top-left-radius:5px;-webkit-border-top-right-radius:0px;-webkit-border-bottom-left-radius:5px;-webkit-border-bottom-right-radius:0px;'+
								'border-top-left-radius:5px;border-top-right-radius:0px;border-bottom-left-radius:5px;border-bottom-right-radius:0px;',
						'ul.tablabels_v li:hover':'background-color:white;',
						'ul.tablabels_v li.sel':'border:1px solid black;;border-right:none; background-color:white; z-index:10;position:relative;left:0px',
						'div.tabcontainer_v':'min-height:'+realheight+'px;overflow:hidden; position:relative;border:1px solid black;line-height:1;font-size:100%;padding:0px;margin:0px;border:0px;border:1px solid black;left:-1px;z-index:5; padding:5px'
					};
					JMVC.tabs.vert_css = true;
					JMVC.head.addstyle(JMVC.util.json2css(styles), true, true);
				}
				
				
				
			});
			
			//set bindings
			for(var i =0, l= that.elements['li'].length; i<l; i++){
				JMVC.events.bind(that.elements['li'][i], 'click', function(e){

					//hide all tabs
					hideall();//.call(JMVC.tabs);

					var target = JMVC.events.eventTarget(e);


					//show tha tab
					var id_orig = JMVC.dom.attr(target, 'id');
					var id_tab2show = id_orig.replace('jvmc_tb','jvmc_cont');

					JMVC.css.style(JMVC.dom.find(id_tab2show), 'display', 'block');
					JMVC.dom.switchClass(target, 'unsel', 'sel');

				});
			}

			return ids2return;
		};
		
		//JMVC.debug(JMVC.util.json2css(this.styles));
		
	}
	
});

