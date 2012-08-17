JMVC.require('css');
JMVC.extend('tabs',{
	tabs : {},
	els2render : [],
	styles : {},
	elements : {'li':[],'div':[]},
	init:function(){
		this.tabs = {};
		this.styles = {
			'ul.tablabels':'height:30px; list-style:none;margin:0px;padding:0px;',
			'ul.tablabels li':'line-height:1;font-size:100%;padding:0px;margin:0px;border:0px;border:1px solid black;background-color:#eee;padding:5px; cursor:pointer;margin-left:5px;',
			'ul.tablabels li:hover':'background-color:white;',
			'ul.tablabels li.sel':'border:1px solid black;;border-bottom:none; background-color:white; z-index:10;position:relative;top:1px',
			'div.tabcontainer':'line-height:1;font-size:100%;padding:0px;margin:0px;border:0px;border:1px solid black;position:relative;top:-3px;z-index:5; padding:5px'			
		};
		//JMVC.debug(JMVC.util.json2css(this.styles));
		
	},
	add : function(label, content){
		this.tabs[label] = content;
	},
	render : function(idcontainer, idul, show){
		JMVC.head.addstyle(JMVC.util.json2css(this.styles), true, true);
		var num2show = show || 0;
		var ul = JMVC.dom.create('ul', {id:idul, 'class':'tablabels'});
		var tabcontainer = JMVC.dom.create('div',{'class':'tabcontainer'});
		var i = 0, li, div;
		for(var j in this.tabs){
			var mayhide = (i !== num2show)? 'none' : 'block',
				liclass = (i !== num2show)? 'unsel' : 'sel';
			
			li = JMVC.dom.create('li', {'class':'tablabel '+liclass, 'id': 'jvmc_tb'+i, 'style':'float:left'}, j);
			this.elements['li'].push(li);
			JMVC.dom.append(ul, li);
			div = JMVC.dom.create('div', {'class':'tab', 'id': 'jvmc_cont'+i,'style':'display:'+mayhide}, JMVC.parse( this.tabs[j] ));
			this.elements['div'].push(div);
			JMVC.dom.append(tabcontainer, div);
			i++;
		}
		//create and append the clearer br to the inside the last li
		JMVC.dom.append(li, JMVC.dom.create('br', {'style':'clear:both; line-height:0px; height:0px'}));
		
		this.els2render.push(ul);
		this.els2render.push(tabcontainer);
		
		var container = JMVC.dom.find(idcontainer);
		for(var i=0, l=this.els2render.length; i<l; i++){
			JMVC.dom.append(container, this.els2render[i]);
		}
		
		function hideall(){
			//his é JMVC.tabs, quindi glielo passo sotto con la call
			for(var i = 0, l=this.elements['div'].length; i<l; i++){
				JMVC.css.style(this.elements['div'][i], 'display', 'none');
				JMVC.dom.switchClass(this.elements['li'][i], 'sel', 'unsel');
				//JMVC.css.style(this.elements['li'][i], 'display', 'none');
			}

		}
		
		
		//set bindings
		for(var i =0, l= this.elements['li'].length; i<l; i++){
			JMVC.events.bind(this.elements['li'][i], 'click', function(e){
				
				//hide all tabs
				hideall.call(JMVC.tabs);
				
				var target = JMVC.events.eventTarget(e);
				
				
				//show tha tab
				var id_orig = JMVC.dom.attr(target, 'id');
				var id_tab2show = id_orig.replace('jvmc_tb','jvmc_cont');
				
				JMVC.css.style(JMVC.dom.find(id_tab2show), 'display', 'block');
				JMVC.dom.switchClass(target, 'unsel', 'sel');
			
			});
		}
	},
	reset : function(){
		this.init();
	}
});

