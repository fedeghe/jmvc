JMVC.controllers.Index = function() {

	this.index = function() {
		
		/*analytics*/
		//JMVC.head.addscript("var gaq=gaq||[];gaq.push(['_setAccount', 'UA-29571830-1']);gaq.push(['_trackPageview']);(function(){var ga=document.createElement('script');ga.type='text/javascript';ga.async=true;ga.src=('https:'==document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s); })();", true, true);
		// or
		//JMVC.head.addscript("{{analytics}}", true, true);
		/*
		 * You could even use a $hello$ placeholder in your script
		 * it will be replaced
		 **/
		//JMVC.head.addscript("{{analytics hello=`Freddy`}}", true, true);
		
		JMVC.head.addstyle('{{style fontweight=`bold` talign=`center` color=`green`}}', true, true);
		
		var index = JMVC.getView('index');
		
		// add link tag
		JMVC.head.addstyle(JMVC.vars.baseurl+'/media/css/style.css');
		
		// edit title
		JMVC.head.title('JMVC');
				
		var n = this.get('name') || 'Federico';
		
		index.set('nome', n);
		index.set('i_say', '100% seo-unfriendly');
		
		
		
		index.render({
			cback:function() {
				
				var el = document.getElementById('cent');
				
				var link = JMVC.dom.create('a',{href:JMVC.vars.baseurl+'/info.jmvc', title:'get more info'},'&laquo; more &raquo;');
				JMVC.events.bind(link, 'click',function() {this.blur();});
				JMVC.dom.append(el, link);
				
				JMVC.dom.add(el, 'br');
				
				var downlink = JMVC.dom.create('a',{href:'https://github.com/fedeghe/jmvc', title:'get code from github!', target:'_blank'},'&laquo; source &raquo;');
				JMVC.events.bind(downlink, 'click',function() {this.blur();});
				JMVC.dom.append(el, downlink);
				//see the pool
				//console.debug(JMVC.io.x);
			}
		});
		
	};
	this.video = function(){
		this.require('html5');
		var index = JMVC.getView('index');
		index.set('i_say', 'Federico');
		var video = JMVC.html5.video({w:240, h:180, uri:'http://html5demos.com/assets/dizzy.webm', autoplay:false, controls:true}),
			progress = JMVC.html5.progress(35);
		index.render({cback:function(){
			JMVC.dom.html(document.getElementById('cent'), video+'<br />'+progress);
		}});
	};
	this.index2 = function() {
		
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
		hello.set('name', this.get('name'));
		hello.render({target:'cent'});
		
	};
	
	
	
	this.index3 = function() {
		//directly render some code
		this.render('<b>yupeeee</b>');
	};
	this.codes = function() {
		
		if(confirm('That may hang your browser!.. continue ? ')){
			var content = '';
			for(var i = 10; i<10000; i++) {
				content += i+' : &#'+i+';<br />';

			}
			this.render(content);
		}else{
			this.render(':D');
		}
		
	};
	
};
