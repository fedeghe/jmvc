JMVC.controllers.index = function () {

	this.index = function () {
		JMVC.require(
			'obj/date'
			, 'core/i18n'
			,'responsive/basic'
			, 'mobile'
			, 'color'
			, 'css'
			, 'dim'
			, 'cookie'
			, 'google/analytics'
			, 'fx'
			, 'google/gmap'
		);
		
		JMVC.responsive.onChange(
			function (w) {
				if (w < 800) {
					//JMVC.dom.addClass(JMVC.WD.body, 'mini');
					JMVC.responsive.allow('mobi')
				} else {
					//JMVC.dom.removeClass(JMVC.WD.body, 'mini');
					JMVC.responsive.allow('dskt')
				}
			}
		);
		
		// preload logo
		JMVC.dom.preloadImage(JMVC.vars.baseurl + "/media/img/jmvc_m1.png"
			//, function (i){console.debug(i, 'loaded')}
		);

		//
		JMVC.events.loadify(500);

		//
		JMVC.head.title('JMVC');

		//

		
		// load two lang files
		JMVC.lang('jp', 'en', 'it');
		
		//
		JMVC.head.link('icon', {type : "image/vnd.microsoft.icon", href : JMVC.vars.baseurl + "/media/favicon.ico"});

		//
		// JMVC.head.addscript(JMVC.vars.baseurl+"/media/js/plus_one.js");
		// see plus_one view
		// add a explicit style parsed from a view
		//
		JMVC.head.addstyle('{{style fontweight=`bold` txtalign=`center` margin=`0px` padding=`0px`}}', true, true);
		JMVC.head.meta("description", "A true pure javascript model view controller framework");
		JMVC.head.meta("keywords", "jmvc,javascript mvc,pure javascript mvc,pure javascript");
		JMVC.head.meta("generator", "jmvc resident in your machine");
		JMVC.head.addstyle(JMVC.vars.baseurl + '/media/css/style.css', true);

		//
		// u can namespace views in folders
		//var index = JMVC.getView('xxx/index');
		var index = JMVC.getView('index'),
			n = this.get('name') || 'Federico';
		//
		index.set('nome', n);
		index.set('i_say', '[L[pure javascript mvc framework]]');
		//
		
		
		//JMVC.events.ready(function (){console.debug('DOM loaded');});
		
		
		
		index.parse().render(
			function () {




				
				JMVC.head.lastmodified();
				var el = document.getElementById('cent'),
					link,
					downlink,
					logo,
					newlogo,
					dims,
					mapid,
					b;
				//
				link = JMVC.dom.create('a', {href : JMVC.vars.baseurl + '/info.jmvc', title : 'get more info'}, JMVC.parselang('&laquo; [L[more]] &raquo;'));
				
				//JMVC.mobile.topHide();
				
				JMVC.events.bind(link, 'click', function () {this.blur();});
				JMVC.dom.append(el, link);
				//
				//
				//
				JMVC.dom.add(el, 'br');
				//
				//view rendertime in title
				//JMVC.head.title('TTR: '+JMVC.vars.rendertime+' ms');
				//
				downlink = JMVC.dom.create('a', {href : 'https://github.com/fedeghe/jmvc', title : 'get code from github!', target : '_blank'}, JMVC.parselang('&laquo; [L[source]] &raquo;'));
				JMVC.events.bind(downlink, 'click', function () {this.blur(); });
				//
				JMVC.dom.append(el, downlink);
				//see the pool
				//JMVC.debug(JMVC.io.x);
				logo = JMVC.dom.find('#extralogo');
				newlogo = JMVC.dom.create('img', {src : JMVC.vars.baseurl + '/media/img/jmvc_m1.png'});
				//
				//
				JMVC.dom.append(logo, newlogo);
				//
				//
				//
				//
				// try gmap
				//
				
				
				if (JMVC.p.map && JMVC.p.map == 'true') {
				
					JMVC.require('google/gmap');
					dims = JMVC.dim.getViewportSize();
					mapid = 'map';
					b = JMVC.dom.body();
					JMVC.dom.append(b, JMVC.dom.create('div', {id : mapid, style : 'opacity:0.8;position:absolute;z-index:1;top:0px;left:0px;width:' + dims.width + 'px;height:' + dims.height + 'px'}));
					//
				
					
					JMVC.gmap.initialize(function () {
							
						
						JMVC.gmap.mapme('via Maggio 18, Lugano, Svizzera', function(latlng){
							
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
							JMVC.gmap.animator(map, [
								//http://maps.google.com/maps?q=cortina+d%27ampezzo&hl=en&ll=46.545509,12.135808&spn=0.001018,0.002519&sll=37.0625,-95.677068&sspn=38.365962,82.529297&hnear=Cortina+d%27Ampezzo,+Province+of+Belluno,+Veneto,+Italy&t=h&z=19&layer=c&cbll=46.545509,12.135808&panoid=AK2j0F5pNJw6qwjw5UuG3w&cbp=12,232.07,,0,0.26
								{location : [46.545509,12.135808], speed : 2, duration :20, streetView : {heading : 215, pitch : 15, zoom:-2}}
								,{location : 'prato della valle, Padova Italia', speed : 20, duration : 20, streetView : {heading : 230, pitch : 0, zoom:-2}}
								,{location : [47.366923, 8.543597], speed : 20, duration : 10, streetView : {heading : 180, zoom:-2}}
								,{location : '767 5th Avenue, New York USA', speed : 20, duration : 10, streetView : {heading : 80, zoom:-2}}
								
								//
								// heron island underwater
								//https://maps.google.com/maps?q=heron+island+resort&hl=en&ll=-23.443045,151.906744&spn=0.001358,0.002519&sll=-23.442794,151.915555&layer=c&cid=17997865933213515154&panoid=CWskcsTEZBNXaD8gG-zATA&cbp=13,332.33,,0,11.68&gl=us&hq=heron+island+resort&t=m&cbll=-23.442896,151.906584&z=19
								,{location : [-23.443045,151.906744], speed : 20, duration : 30, streetView : {heading : 270, pitch : 0, zoom:-5}}	
								
								// south pole telescope
								//https://maps.google.com/maps?hl=en-US&ll=-84.999999,-44.656316&spn=0.000516,0.010074&sll=-85.000000,-44.656416&layer=c&cid=3987634083228589274&panoid=uZ7YCXJGSbyDxIbY-wPWow&cbp=13,200.62,,0,11.16&gl=US&t=h&cbll=-84.999999,-44.656316&z=17
								//,{location : [-84.999999,-44.656316], speed : 20, duration : 20, streetView : {heading : 270, pitch : 0, zoom:-10}}	
								
								//Amazon rain forest
								//https://maps.google.com/?ll=-3.137759,-60.493355&spn=0.047308,0.080595&t=h&layer=c&cbll=-3.137759,-60.493355&panoid=1ci-8iBT_UuG1dlrUy1vzg&cbp=12,154.19,,0,-2.8&z=14
								//,{location : [-3.137759,-60.493355], speed : 20, duration : 20, streetView : {heading : 270, pitch : 0, zoom:-10}}	
								
								//Mayan Ruins in Mexico
								//http://maps.google.com/maps?q=20.681145,-88.570944&hl=en&ie=UTF8&ll=20.682504,-88.56879&spn=0.005541,0.010074&sll=20.681145,-88.570944&sspn=0.005541,0.010074&hnear=Chichen+Itza,+Carretera+Merida+-+Puerto+Juarez+Km.120,+Tinum,+97757+Piste,+Yucat%C3%A1n,+Mexico&t=m&layer=c&cbll=20.682504,-88.56879&panoid=LaEFKiRNgawDJ_V5GcEmDw&cbp=12,19.56,,0,-3.53&z=17
								,{location : [20.682504,-88.56879], speed : 20, duration : 20, streetView : {heading : 0, pitch : 0, zoom:-5}}	
								
								
								
								
								
								//
								//
								

								//cortina ,{location : [46.545150, 12.135968], speed : 20, duration : 20, streetView : {heading : 275, pitch : 15, zoom:-2}}
								//,{location : 'prato della valle, Padova Italia', speed : 20, duration : 20, streetView : {heading : 270, pitch : 0, zoom:-2}}
								//,{location : '767 5th Avenue, New York USA', speed : 20, duration : 10, streetView : {heading : 80, zoom:-2}}
								//,{location : [47.366923, 8.543597], speed : 20, duration : 10, streetView : {heading : 180, zoom:-2}}
								//,{location : [37.331889, -122.030747], speed : 20, duration : 10, streetView : {heading : 180, zoom:-2}}
							]);
							
							
							
						});
						
					},{sensor:'false'});
				}
			   
				
			}
		);
	};
	
	this.video = function () {
		JMVC.require('html5');
		var index = JMVC.getView('index'),
			video = JMVC.html5.video({w : 240, h : 180, uri : 'http://techslides.com/demos/sample-videos/small.ogv', autoplay : 'autoplay', controls : true}),
			progress = JMVC.html5.progress(35);

		index.set('i_say', 'Federico');

		index.render({cback : function () {
			JMVC.dom.html(JMVC.dom.find('#cent'), video + '<br />' + progress);
		}});
	};




	this.index2 = function () {
		var index = JMVC.getView('index'),
			hello = JMVC.getView('hello'),
			n;
		//
		// add link tag
		JMVC.head.addstyle(JMVC.vars.baseurl + '/media/css/style.css');
		//
		// edit title
		JMVC.head.title('JS base');
		//
		//
		n = this.get('name') || 'Guest';
		hello.set('name', n);
		index.set('i_say', 'be seo-unfriendly');
		//
		
		index.render({
			cback : function (n, c) {
				var link = JMVC.dom.create('a', {href : JMVC.vars.baseurl + '/info', title : 'more info'}, '&infin;' + n + c);
				JMVC.events.bind(link, 'click', function () {this.blur();});
				JMVC.dom.append(document.getElementById('cent'), link);
				
				// remove the spinner
				JMVC.dom.remove(JMVC.dom.find('p')[0]);
				
			},
			argz : [' or what ', 'else?'],
			target : '#trial'
		});
		
	
		//
		// now index is loaded and contains a #cent div
		// we try to substitute the content with the hello view content
		// and give value to a var in it
		///hello.set('name', this.get('name'));
		
		hello.render({target : '#cent'});
	};
	//
	//
	//
	this.index3 = function () {
		//directly render some code
		this.render('<b>yupeeee</b>');
	};
	this.codes = function () {
		if (confirm('That may hang your browser! ...continue?')) {
			var content = '',
				i = 10;
			for (null; i < 10000; i += 1) {
				content += i + ' : &#' + i + ';<br />';
			}
			this.render(content);
		}else{
			this.render(':D');
		}
	};
	this.ascii = function () {
		var content = '', i =0;
		for (null; i < 256; i += 1) {
			content += '"' + i +'" : "'+ String.fromCharCode(i) + '",<br />';
		}
		this.render(content);
	};
	

};