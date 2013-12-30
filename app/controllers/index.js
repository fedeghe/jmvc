JMVC.controllers.index = function () {
	
	this.action_none = function () {};

	

	this.action_index = function () {

		

		var nowh = (new Date()).getHours(),
			logoimg = 'jmvc_m1.svg';
		JMVC.require(
			/*'core/sniffer',*/
			'core/obj/date/date'
			, 'core/i18n/i18n'
			, 'core/responsive/basic/basic'
			, 'core/mobile/mobile'
			, 'core/color/color'
			, 'core/css/css'
			, 'core/dim/dim'
			, 'core/cookie/cookie'
			, 'vendors/google/analytics/analytics'
			, 'core/fx/fx'
			, 'widget/lang/lang'
			, 'vendors/github/forkme/forkme'
		);
		
		

		JMVC.dom.preloadImage(JMVC.vars.baseurl + "/media/img/" + logoimg
			/*, function (i){console.debug(i, 'loaded')}*/
		);

		
		JMVC.events.loadify(500);
		JMVC.head.title('JMVC');
		JMVC.lang.apply(null, JMVC.util.getParameters('jmvcscript').langs || ['en', 'de', 'it']);
		JMVC.head.favicon("/media/favicon.ico");


		/*
		JMVC.head.addscript(JMVC.vars.baseurl+"/media/js/plus_one.js");
		see plus_one view
		add a explicit style parsed from a view
		*/
		JMVC.head.addstyle('{{style fontweight=`bold` txtalign=`center` margin=`0px` padding=`0px`}}', true, true);
		JMVC.head.meta("description", "A true pure javascript model view controller framework", true);
		JMVC.head.meta("keywords", "jmvc,javascript mvc,pure javascript mvc,pure javascript");
		JMVC.head.meta("generator", "jmvc resident in your machine");
		JMVC.head.addstyle(JMVC.vars.baseurl + '/media/css/homestyle.css', true);


		/*
		u can namespace views in folders
		var index = JMVC.getView('xxx/index');
		*/
		var index = JMVC.getView('home/index'),
			n = this.get('name') || 'Federico';
		//
		index.set('nome', n);
		index.set('i_say', '[L[pure javascript mvc framework]]');
		//
		

		
		index.parse().render(
			function () {
				/*
				JMVC.preload(JMVC.vars.baseurl + '/info');
				JMVC.preload(JMVC.vars.baseurl + '/api');
				*/
				JMVC.github.forkme('fedeghe');

				JMVC.mobile.topHide();
				JMVC.widget.langs.create(JMVC.dom.find('#topbar'));

				JMVC.responsive.onChange(
					function (w) {
						if (w < 800) {
							/*JMVC.dom.addClass(JMVC.WD.body, 'mini');*/
							JMVC.responsive.allow('mobi')
						} else {
							/*JMVC.dom.removeClass(JMVC.WD.body, 'mini');*/
							JMVC.responsive.allow('dskt')
						}
					}
				);

				JMVC.head.lastmodified();

				var el = document.getElementById('cent'),
					links = JMVC.dom.create('h1'),
					morelink = JMVC.dom.create('a', {'class' : 'homelinks', href : JMVC.vars.baseurl + '/info.jmvc', title : 'get more info'}, JMVC.parselang('[L[more]]')),
					sourcelink = JMVC.dom.create('a', {'class' : 'homelinks', href : 'https://github.com/fedeghe/jmvc', title : 'get code from github!', target : '_blank'}, JMVC.parselang('[L[source]]')),
					apilink = JMVC.dom.create('a', {'class' : 'homelinks', href : JMVC.vars.baseurl + '/api.jmvc', title : 'basic documentation'}, JMVC.parselang('[L[api]]')),
					logo,
					newlogo,
					dims,
					mapid,
					b;

				JMVC.dom.append(links,  [morelink, apilink, sourcelink]);
				JMVC.dom.append(el, links);

				JMVC.events.bind([morelink, apilink, sourcelink], 'click', function () {this.blur(); });


				logo = JMVC.dom.find('#extralogo');
				newlogo = JMVC.dom.create('img', {src : JMVC.vars.baseurl + '/media/img/' + logoimg});
				JMVC.dom.append(logo, newlogo);
				
				
				if (JMVC.p.map && JMVC.p.map == 'true'
				/* || JMVC.sniffer.browser.name.toLowerCase().match(/opera|chrome/)*/) {
				
					JMVC.require('vendors/google/gmap2/gmap2');
					dims = JMVC.dim.getViewportSize();
					mapid = 'map';
					b = JMVC.dom.body();
					JMVC.dom.append(b, JMVC.dom.create('div', {id : mapid, style : 'opacity:0.8;position:absolute;z-index:1;top:0px;left:0px;width:' + dims.width + 'px;height:' + dims.height + 'px'}));
					
					JMVC.gmap2.initialize(function () {
						JMVC.gmap2.mapme('via Maggio 18, Lugano, Svizzera', function(latlng){
							var mapDiv = document.getElementById(mapid),
								map = new google.maps.Map(mapDiv, {
									center : new google.maps.LatLng(latlng.lat(), latlng.lng()),
									zoom : 4,
									mapTypeId : google.maps.MapTypeId.SATELLITE,
									tilt : 45,
									styles : [{featureType : "water", stylers : [{lightness : 0}, {saturation : 100}, {hue : "#000000"}, {gamma : .2}], elementType : "geometry"}]
								}),
								origZoom = map.getZoom();
						
							/*
							
							https://maps.google.com/maps?q=heron+island+resort&hl=en&ll=-23.443045,151.906744&spn=0.001358,0.002519&sll=-23.442794,151.915555&layer=c&cid=17997865933213515154&panoid=CWskcsTEZBNXaD8gG-zATA&cbp=13,332.33,,0,11.68&gl=us&hq=heron+island+resort&t=m&cbll=-23.442896,151.906584&z=19

							 
							JMVC.gmap.animator(map, [
								//{zoom:15,duration:3},
								//{location : 'via battisti 2, albignasego,italia', speed : 20, duration : 3, mapTypeId : google.maps.MapTypeId.ROADMAP}
								//,{location : [46.545201, 12.135968], speed : 20, duration : 3, mapTypeId : google.maps.MapTypeId.TERRAIN}
								//{location : [46.545203, 12.135968], speed : 20, duration : 20, streetView : {heading : 275, pitch : 15, zoom:-2}}
								{location : [46.545150, 12.135968], speed : 20, duration : 20, streetView : {heading : 275, pitch : 15, zoom:-2}}
								,{location : 'prato della valle, Padova Italia', speed : 20, duration : 20, streetView : {heading : 270, pitch : 0, zoom:-2}}
								,{location : '767 5th Avenue, New York USA', speed : 20, duration : 10, streetView : {heading : 80, zoom:-2}}
								,{location : [47.366923, 8.543597], speed : 20, duration : 10, streetView : {heading : 180, zoom:-2}}
								
								//,{location : 'via Maggio 18, Lugano, Svizzera', speed : 20, duration : 3}
								
								//https://maps.google.com/maps?q=cupertino+apple&hl=it&ll=37.331889,-122.030747&spn=0.004231,0.010568&client=ubuntu&channel=fs&oe=utf-8&hq=apple&hnear=Cupertino,+Contea+di+Santa+Clara,+California&t=h&fll=37.330942,-122.027936&fspn=0.004231,0.010568&z=17&layer=c&cbll=37.331779,-122.03075&panoid=V4c0V3qT_mlMqWLS3YUQCg&cbp=12,112.5,,0,-2.38
								,{location : [37.331889, -122.030747], speed : 20, duration : 10, streetView : {heading : 180, zoom:-2}}
							]);*/
							JMVC.gmap2.animator(map, [
								//http://maps.google.com/maps?q=cortina+d%27ampezzo&hl=en&ll=46.545509,12.135808&spn=0.001018,0.002519&sll=37.0625,-95.677068&sspn=38.365962,82.529297&hnear=Cortina+d%27Ampezzo,+Province+of+Belluno,+Veneto,+Italy&t=h&z=19&layer=c&cbll=46.545509,12.135808&panoid=AK2j0F5pNJw6qwjw5UuG3w&cbp=12,232.07,,0,0.26
								{location : [46.545509,12.135808], speed : 20, duration :20, streetView : {heading : 180, pitch : 15, zoom:0}}
								,{location : 'prato della valle, Padova Italia', speed : 20, duration : 10, streetView : {heading : 230, pitch : 0, zoom:-2}}
								//piazza dam
								//https://maps.google.com/maps?hl=en&ll=52.372652,4.893193&spn=0.002067,0.005037&t=m&z=18&layer=c&cbll=52.372652,4.893193&panoid=mzbA1vt87ilTOJDAl90Eyw&cbp=12,353.64,,0,-4.75
								,{location : [52.372652,4.893193], speed : 20, duration : 20, streetView : {heading : 270, zoom:-2}}
								//zurigo ponte
								//,{location : [47.366923, 8.543597], speed : 20, duration : 20, streetView : {heading : 180, zoom:-2}}
								//zurigo
								////https://maps.google.com/maps?q=zurich&hl=en&ll=47.369227,8.543485&spn=0.004556,0.010074&sll=52.372652,4.893193&sspn=0.002067,0.005037&hnear=Zurich,+Canton+of+Zurich,+Switzerland&t=m&z=17&layer=c&cbll=47.369227,8.543485&panoid=VY2rgUeHf9tPBIWMo4-Dmw&cbp=12,231.49,,0,0.26
								,{location : [47.369227,8.543485], speed : 20, duration : 20, streetView : {heading : 195, zoom:-2}}
								,{location : '767 5th Avenue, New York USA', speed : 20, duration : 20, streetView : {heading : 90, zoom:-2}}
								
								/*
								heron island underwater
								https://maps.google.com/maps?q=heron+island+resort&hl=en&ll=-23.443045,151.906744&spn=0.001358,0.002519&sll=-23.442794,151.915555&layer=c&cid=17997865933213515154&panoid=CWskcsTEZBNXaD8gG-zATA&cbp=13,332.33,,0,11.68&gl=us&hq=heron+island+resort&t=m&cbll=-23.442896,151.906584&z=19
								*/
								,{location : [-23.443045,151.906744], speed : 20, duration : 30, streetView : {heading : 270, pitch : 0, zoom:-5}}	
								
								/* south pole telescope
								https://maps.google.com/maps?hl=en-US&ll=-84.999999,-44.656316&spn=0.000516,0.010074&sll=-85.000000,-44.656416&layer=c&cid=3987634083228589274&panoid=uZ7YCXJGSbyDxIbY-wPWow&cbp=13,200.62,,0,11.16&gl=US&t=h&cbll=-84.999999,-44.656316&z=17
								,{location : [-84.999999,-44.656316], speed : 20, duration : 20, streetView : {heading : 270, pitch : 0, zoom:-10}}	
								*/
								
								/*Amazon rain forest
								https://maps.google.com/?ll=-3.137759,-60.493355&spn=0.047308,0.080595&t=h&layer=c&cbll=-3.137759,-60.493355&panoid=1ci-8iBT_UuG1dlrUy1vzg&cbp=12,154.19,,0,-2.8&z=14
								,{location : [-3.137759,-60.493355], speed : 20, duration : 20, streetView : {heading : 270, pitch : 0, zoom:-10}}	
								*/
							
								/*Mayan Ruins in Mexico
								http://maps.google.com/maps?q=20.681145,-88.570944&hl=en&ie=UTF8&ll=20.682504,-88.56879&spn=0.005541,0.010074&sll=20.681145,-88.570944&sspn=0.005541,0.010074&hnear=Chichen+Itza,+Carretera+Merida+-+Puerto+Juarez+Km.120,+Tinum,+97757+Piste,+Yucat%C3%A1n,+Mexico&t=m&layer=c&cbll=20.682504,-88.56879&panoid=LaEFKiRNgawDJ_V5GcEmDw&cbp=12,19.56,,0,-3.53&z=17
								*/
								,{location : [20.682504,-88.56879], speed : 20, duration : 20, streetView : {heading : 0, pitch : 0, zoom:-5}}	
								
								
								

								/*
								cortina ,{location : [46.545150, 12.135968], speed : 20, duration : 20, streetView : {heading : 275, pitch : 15, zoom:-2}}
								,{location : 'prato della valle, Padova Italia', speed : 20, duration : 20, streetView : {heading : 270, pitch : 0, zoom:-2}}
								,{location : '767 5th Avenue, New York USA', speed : 20, duration : 10, streetView : {heading : 80, zoom:-2}}
								,{location : [47.366923, 8.543597], speed : 20, duration : 10, streetView : {heading : 180, zoom:-2}}
								,{location : [37.331889, -122.030747], speed : 20, duration : 10, streetView : {heading : 180, zoom:-2}}
								*/
							]);
							
							
							
						});
						
					},{sensor:'false'});
				}
			   
				
			}
		);
	};
	
	
	this.action_video = function () {
		JMVC.require('core/html5/html5');
		var index = JMVC.getView('home/index'),
			video = JMVC.html5.video({
				width : 240,
				height : 180,
				src : 'http://techslides.com/demos/sample-videos/small.ogv',
				autoplay : 'autoplay',
				controls : true
			}),
			progress = false; //JMVC.html5.progress(35);

		index.set('i_say', 'Federico');

		index.render({cback : function () {
			JMVC.dom.append(JMVC.dom.find('#cent'), video); // + '<br />' + progress);
		}});
	};


	this.action_audio = function () {
		JMVC.require('core/html5/html5');
		var index = JMVC.getView('home/index'),
			audio = JMVC.html5.audio({
				type:'ogv',
				src : 'http://techslides.com/demos/sample-videos/small.ogv',
				autoplay : 'autoplay',
				controls : true
			}),
			progress = false; //JMVC.html5.progress(35);

		console.debug(audio);

		index.set('i_say', 'Federico');

		index.render({cback : function () {
			JMVC.dom.append(JMVC.dom.find('#cent'), audio); // + '<br />' + progress);
		}});
	};


	//
	//
	//
	this.action_index3 = function () {
		/* directly render some code */
		this.render('<b>yupeeee</b>');
	};

	this.action_codes = function () {
		if (confirm('That may hang your browser! ...continue?')) {
			var content = '',
				i = 10;
			for (null; i < 2<<15; i += 1) {
				//content += i + ' : &#' + i + ';<br />';
				content += i + ' : ' + String.fromCharCode(i) + '<br />';
			}
			this.render(content, function (){
				var t = [10367,10431,10491,10493,10494,10487,10479,10463],
					i = 0,
					l = t.length;
				window.setInterval(
					//function (){JMVC.head.title(String.fromCharCode(JMVC.util.rand(10240, 10495)))},
					function (){JMVC.head.title(String.fromCharCode(t[i])); i = (i+1)%l; },
					100
				);
			});
		}else{
			this.render(':D');
			window.setTimeout(
				function () {window.document.location.href = JMVC.vars.baseurl; },
				3000
			);
		}


	};
	this.action_ascii = function () {
		var content = '', i =0;
		for (null; i < 256; i += 1) {
			content += '"' + i +'" : "'+ String.fromCharCode(i) + '",<br />';
		}
		this.render(content);
	};


	this.action_gmaps = function () {	
		JMVC.require('vendors/google/gmap2/gmap2', 'core/dim/dim');
		this.render(function (){
			
			var dims = JMVC.dim.getViewportSize(),
				mapid = 'map',
				b = JMVC.dom.body();

			JMVC.dom.append(b, JMVC.dom.create('div', {id : mapid, style : 'opacity:0.8;position:absolute;z-index:1;top:0px;left:0px;width:' + dims.width + 'px;height:' + dims.height + 'px'}));
			
			JMVC.gmap2.initialize(function () {
				JMVC.gmap2.mapme('via Maggio 18, Lugano, Svizzera', function(latlng){
					var mapDiv = document.getElementById(mapid),
						map = new google.maps.Map(mapDiv, {
							center : new google.maps.LatLng(latlng.lat(), latlng.lng()),
							zoom : 4,
							mapTypeId : google.maps.MapTypeId.SATELLITE,
							tilt : 45,
							styles : [{featureType : "water", stylers : [{lightness : 0}, {saturation : 100}, {hue : "#000000"}, {gamma : .2}], elementType : "geometry"}]
						}),
						origZoom = map.getZoom();
				
					/*
					
					https://maps.google.com/maps?q=heron+island+resort&hl=en&ll=-23.443045,151.906744&spn=0.001358,0.002519&sll=-23.442794,151.915555&layer=c&cid=17997865933213515154&panoid=CWskcsTEZBNXaD8gG-zATA&cbp=13,332.33,,0,11.68&gl=us&hq=heron+island+resort&t=m&cbll=-23.442896,151.906584&z=19

					 
					JMVC.gmap.animator(map, [
						//{zoom:15,duration:3},
						//{location : 'via battisti 2, albignasego,italia', speed : 20, duration : 3, mapTypeId : google.maps.MapTypeId.ROADMAP}
						//,{location : [46.545201, 12.135968], speed : 20, duration : 3, mapTypeId : google.maps.MapTypeId.TERRAIN}
						//{location : [46.545203, 12.135968], speed : 20, duration : 20, streetView : {heading : 275, pitch : 15, zoom:-2}}
						{location : [46.545150, 12.135968], speed : 20, duration : 20, streetView : {heading : 275, pitch : 15, zoom:-2}}
						,{location : 'prato della valle, Padova Italia', speed : 20, duration : 20, streetView : {heading : 270, pitch : 0, zoom:-2}}
						,{location : '767 5th Avenue, New York USA', speed : 20, duration : 10, streetView : {heading : 80, zoom:-2}}
						,{location : [47.366923, 8.543597], speed : 20, duration : 10, streetView : {heading : 180, zoom:-2}}
						
						//,{location : 'via Maggio 18, Lugano, Svizzera', speed : 20, duration : 3}
						
						//https://maps.google.com/maps?q=cupertino+apple&hl=it&ll=37.331889,-122.030747&spn=0.004231,0.010568&client=ubuntu&channel=fs&oe=utf-8&hq=apple&hnear=Cupertino,+Contea+di+Santa+Clara,+California&t=h&fll=37.330942,-122.027936&fspn=0.004231,0.010568&z=17&layer=c&cbll=37.331779,-122.03075&panoid=V4c0V3qT_mlMqWLS3YUQCg&cbp=12,112.5,,0,-2.38
						,{location : [37.331889, -122.030747], speed : 20, duration : 10, streetView : {heading : 180, zoom:-2}}
					]);*/


					// duration ok
 					// top speed 50, otherwise scatters

 					JMVC.events.delay(function (){


						JMVC.gmap2.animator(map, [
							//http://maps.google.com/maps?q=cortina+d%27ampezzo&hl=en&ll=46.545509,12.135808&spn=0.001018,0.002519&sll=37.0625,-95.677068&sspn=38.365962,82.529297&hnear=Cortina+d%27Ampezzo,+Province+of+Belluno,+Veneto,+Italy&t=h&z=19&layer=c&cbll=46.545509,12.135808&panoid=AK2j0F5pNJw6qwjw5UuG3w&cbp=12,232.07,,0,0.26
							{location : [46.545509,12.135808], speed : 20, duration :20, streetView : {heading : 180, pitch : 15, zoom:-2}}
							,{location : 'prato della valle, Padova Italia', speed : 20, duration : 20, streetView : {heading : 180, pitch : 15, zoom:-2}}
							,{location : [47.366923, 8.543597], speed : 20, duration : 20, streetView : {heading : 270, pitch : 15, zoom:-2}}
							,{location : '767 5th Avenue, New York USA', speed : 20, duration : 20, streetView : {heading : 90, pitch : 15, zoom:-2}}
							
							/*
							heron island underwater
							https://maps.google.com/maps?q=heron+island+resort&hl=en&ll=-23.443045,151.906744&spn=0.001358,0.002519&sll=-23.442794,151.915555&layer=c&cid=17997865933213515154&panoid=CWskcsTEZBNXaD8gG-zATA&cbp=13,332.33,,0,11.68&gl=us&hq=heron+island+resort&t=m&cbll=-23.442896,151.906584&z=19
							*/
							,{location : [-23.443045,151.906744], speed : 20, duration : 30, streetView : {heading : 270, pitch : 15, zoom:-2}}	
							
							/* south pole telescope
							https://maps.google.com/maps?hl=en-US&ll=-84.999999,-44.656316&spn=0.000516,0.010074&sll=-85.000000,-44.656416&layer=c&cid=3987634083228589274&panoid=uZ7YCXJGSbyDxIbY-wPWow&cbp=13,200.62,,0,11.16&gl=US&t=h&cbll=-84.999999,-44.656316&z=17
							,{location : [-84.999999,-44.656316], speed : 20, duration : 20, streetView : {heading : 270, pitch : 0, zoom:-10}}	
							*/
							
							/*Amazon rain forest
							https://maps.google.com/?ll=-3.137759,-60.493355&spn=0.047308,0.080595&t=h&layer=c&cbll=-3.137759,-60.493355&panoid=1ci-8iBT_UuG1dlrUy1vzg&cbp=12,154.19,,0,-2.8&z=14
							,{location : [-3.137759,-60.493355], speed : 20, duration : 20, streetView : {heading : 270, pitch : 0, zoom:-10}}	
							*/
						
							/*Mayan Ruins in Mexico
							http://maps.google.com/maps?q=20.681145,-88.570944&hl=en&ie=UTF8&ll=20.682504,-88.56879&spn=0.005541,0.010074&sll=20.681145,-88.570944&sspn=0.005541,0.010074&hnear=Chichen+Itza,+Carretera+Merida+-+Puerto+Juarez+Km.120,+Tinum,+97757+Piste,+Yucat%C3%A1n,+Mexico&t=m&layer=c&cbll=20.682504,-88.56879&panoid=LaEFKiRNgawDJ_V5GcEmDw&cbp=12,19.56,,0,-3.53&z=17
							*/
							,{location : [20.682504,-88.56879], speed : 20, duration : 10, streetView : {heading : 0, pitch : 15, zoom:-2}}	
							
							
							

							/*
							cortina ,{location : [46.545150, 12.135968], speed : 20, duration : 20, streetView : {heading : 275, pitch : 15, zoom:-2}}
							,{location : 'prato della valle, Padova Italia', speed : 20, duration : 20, streetView : {heading : 270, pitch : 0, zoom:-2}}
							,{location : '767 5th Avenue, New York USA', speed : 20, duration : 10, streetView : {heading : 80, zoom:-2}}
							,{location : [47.366923, 8.543597], speed : 20, duration : 10, streetView : {heading : 180, zoom:-2}}
							,{location : [37.331889, -122.030747], speed : 20, duration : 10, streetView : {heading : 180, zoom:-2}}
							*/
						]);
					}, 0);
					
					
				});
				
			},{sensor:'false'});
		});
	};

	this.action_console = function () {
		JMVC.events.loadify(500);
		this.render(function (){
			JMVC.console();
		});
	};
	

};
