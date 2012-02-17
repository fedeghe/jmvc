JMVC.controllers.Index = function(){

	this.index = function(){
		/*alert('index controller, index action');*/
		
		var index = JMVC.getView('index');
		
		// add link tag
		JMVC.head.addstyle(JMVC.baseurl+'/media/css/style.css');
		
		// edit title
		JMVC.head.title('JS base');
		
		
		var n = this.get('name') || 'Federico';
		
		index.set('nome', n);
		index.set('i_say', 'be seo-unfriendly');
		
		//JMVC.views['index'].set('baseurl', JMVC.baseurl);
		

		index.render({
			cback:function(){
				var link = JMVC.dom.create('a',{href:JMVC.baseurl+'/info', title:'more info'},'&infin;');
				JMVC.events.bind(link, 'click',function(){this.blur();});
				JMVC.dom.append(document.getElementById('cent'), link);
				//see the pool
				console.debug(JMVC.io.x);
			}
		});
		
	};
	this.index2 = function(){
		/*alert('index controller, index action');*/
		
		var index = JMVC.getView('index');
		var hello = JMVC.getView('hello');
		
		// add link tag
		JMVC.head.addstyle(JMVC.baseurl+'/media/css/style.css');
		
		// edit title
		JMVC.head.title('JS base');
		
		
		var n = this.get('name') || 'Federico';
		
		index.set('nome', n);
		index.set('i_say', 'be seo-unfriendly');
		
		index.render({
			cback:function(){
				var link = JMVC.dom.create('a',{href:JMVC.baseurl+'/info', title:'more info'},'&infin;');
				JMVC.events.bind(link, 'click',function(){this.blur();});
				JMVC.dom.append(document.getElementById('cent'), link);
			},
			target:'trial'
		});
		//
		// now index is loaded and contains a #cent div
		// we try to substitute the content with the hello view content
		// and give value to a var in it
		hello.set('name', 'My guest');
		hello.render({target:'cent'});
		
	};
	
	
	
	this.index3 = function(){
		//directly render some code
		this.render('<b>yupeeee</b>');
	};
	
	
};
