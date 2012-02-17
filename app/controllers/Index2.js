JMVC.controllers.Index2 = function(){

	this.index = function(){
		/*alert('index controller, index action');*/
		
		JMVC.factory('view','main/index');
			
		// add link tag
		JMVC.head.addstyle(JMVC.baseurl+'/media/css/style.css');
			
		// edit title
		JMVC.head.title('JS base');
		
		
		var n = this.get('name') || 'Federico';
			
		JMVC.views['main/index'].set('nome', n);
			
		//JMVC.views['index'].set('baseurl', JMVC.baseurl);
			

		JMVC.views['main/index'].render(
			function(){
				var link = JMVC.dom.create('a',{href:JMVC.baseurl+'/info', title:'more info'},'&infin;');
				JMVC.events.bind(link, 'click',function(){this.blur();});
				JMVC.dom.append(document.getElementById('cent'), link);
			}
		);

	};


};
