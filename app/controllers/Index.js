JMVC.controllers.Index = function() {
	this.index = function() {

		// edit title
		JMVC.head.title('JMVC');
	
		JMVC.require('color', 'css', 'screen','cookie','tabs');

		//include analytics in the right domain
		if(JMVC.vars.baseurl=='http://www.jmvc.org'){
			JMVC.head.addscript("{{analytics}}", true, true);
		}

		
		//JMVC.head.addscript(JMVC.vars.baseurl+"/media/js/plus_one.js");
		// see plus_one view

		///add a explicit style parsed from a view
		JMVC.head.addstyle('{{style fontweight=`bold` txtalign=`center` margin=`0px` padding=`0px`}}', true, true);
				JMVC.head.meta("description", "A true pure javascript model view controller framework");
		JMVC.head.meta("keywords", "jmvc,javascript mvc,pure javascript mvc,pure javascript");
		JMVC.head.addstyle(JMVC.vars.baseurl+'/media/css/style.css', true);
		//preload logo
		JMVC.dom.preloadImage(JMVC.vars.baseurl+'media/img/jmvc_m1.png');
		
		// u can namespace views in folders
		//var index = JMVC.getView('xxx/index');
		var index = JMVC.getView('index');
				
		//JMVC.set('bgcolor', JMVC.color.getRandomColor());
		//var rndcolor = JMVC.color.getRandomColor(true),
		//	opposite = JMVC.color.getOpposite(rndcolor);
		//JMVC.set('bgcolor', rndcolor);
		//JMVC.set('color', opposite);
			
		///add a parsed css
		

		

		var n = this.get('name') || 'Federico';

		index.set('nome', n);
		index.set('i_say', 'The pure javascript mvc framework');

		index.render({
			cback:function() {
				
				
				var el = document.getElementById('cent');
				//
				//JMVC.css.style(el,{'background-color':'#fede76'});

				var link = JMVC.dom.create('a',{href:JMVC.vars.baseurl+'/info.jmvc', title:'get more info'},'&laquo; MORE &raquo;');
				JMVC.events.bind(link, 'click',function() {this.blur();});
				JMVC.dom.append(el, link);
				
				
				
				JMVC.dom.add(el, 'br');
				//JMVC.dom.append(el, gg);
				
				//view rendertime in title
				//JMVC.head.title('TTR: '+JMVC.vars.rendertime+' ms');

				var downlink = JMVC.dom.create('a',{href:'https://github.com/fedeghe/jmvc', title:'get code from github!', target:'_blank'},'&laquo; SOURCE &raquo;');
				JMVC.events.bind(downlink, 'click',function() {this.blur();});
				
				JMVC.dom.append(el, downlink);
				//see the pool
				//console.debug(JMVC.io.x);
				var logo = JMVC.dom.find('extralogo');
				var newlogo = JMVC.dom.create('img', {width:476, height:136,src:JMVC.vars.baseurl+'/media/img/jmvc_m1.png'});
				
				
				JMVC.dom.append(logo, newlogo);
				
				
				
				
				// try gmap
				
				JMVC.require('gmap');
				var dims = JMVC.screen.getViewportSize(), mapid = 'map';
				var b = JMVC.dom.body();
				JMVC.dom.append(b, JMVC.dom.create('div',{id:mapid,style:'opacity:0.5;position:absolute;z-index:1;top:0px;left:0px;width:'+dims[0]+'px;height:'+dims[1]+'px'}) );
				
				JMVC.gmap.initialize(
					function() {
						JMVC.gmap.mapme('via Maggio 18, Lugano, Svizzera',function(latlng){
							var mapDiv = document.getElementById(mapid);
							var map = new google.maps.Map(mapDiv, {
								center: new google.maps.LatLng(latlng.lat(), latlng.lng()),
								zoom: 13,
								mapTypeId: google.maps.MapTypeId.TERRAIN
							});
						});
						
						
					}  
				);
				

			}
		});

		


	};
	this.video = function(){
		JMVC.require('html5');
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

		hello.set('name', n);
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
		///hello.set('name', this.get('name'));
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
