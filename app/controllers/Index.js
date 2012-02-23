JMVC.controllers.Index = function() {

	this.index = function() {
		/*alert('index controller, index action');*/
		
		var index = JMVC.getView('index');
		
		// add link tag
		JMVC.head.addstyle(JMVC.vars.baseurl+'/media/css/style.css');
		
		// edit title
		JMVC.head.title('JMVC');
		
		
		var n = this.get('name') || 'Federico';
		
		index.set('nome', n);
		index.set('i_say', '100% seo-unfriendly');
		
		//JMVC.views['index'].set('baseurl', JMVC.baseurl);
		

		index.render({
			cback:function() {
				
				var el = document.getElementById('cent');
				
				var link = JMVC.dom.create('a',{href:JMVC.vars.baseurl+'/info', title:'get more info'},'&#9406;');
				JMVC.events.bind(link, 'click',function() {this.blur();});
				JMVC.dom.append(el, link);
				
				//JMVC.dom.append(document.getElementById('cent'), JMVC.dom.create('br'));
				JMVC.dom.add(el, 'br');
				
				var downlink = JMVC.dom.create('a',{href:'https://github.com/fedeghe/jmvc', title:'get code from github!', target:'_blank'},'&#9416;');
				JMVC.events.bind(downlink, 'click',function() {this.blur();});
				JMVC.dom.append(el, downlink);
				//see the pool
				//console.debug(JMVC.io.x);
			}
		});
		
	};
	this.index2 = function() {
		/*alert('index controller, index action');*/
		
		var index = JMVC.getView('index');
		var hello = JMVC.getView('hello');
		
		// add link tag
		JMVC.head.addstyle(JMVC.vars.baseurl+'/media/css/style.css');
		
		// edit title
		JMVC.head.title('JS base');
		
		
		var n = this.get('name') || 'Federico';
		
		index.set('nome', n);
		index.set('i_say', 'be seo-unfriendly');
		
		index.render({
			cback:function(n, c) {
				var link = JMVC.dom.create('a',{href:JMVC.vars.baseurl+'/info', title:'more info'},'&infin;'+n+c);
				JMVC.events.bind(link, 'click',function() {this.blur();});
				JMVC.dom.append(document.getElementById('cent'), link);
				
			},
			argz : [' or what ', 'else?'],
			target:'trial'
		});
		//
		// now index is loaded and contains a #cent div
		// we try to substitute the content with the hello view content
		// and give value to a var in it
		hello.set('name', 'My JMVC guest');
		hello.render({target:'cent'});
		
	};
	
	
	
	this.index3 = function() {
		//directly render some code
		this.render('<b>yupeeee</b>');
	};
	this.codes = function() {
		var content = '';
		for(var i = 10; i<10000; i++) {
			content += i+' : &#'+i+';<br />';
			
		}
		this.render(content);
	};
	
};
