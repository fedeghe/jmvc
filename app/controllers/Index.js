JMVC.controllers.Index = function () {
	this.index = function () {
		//
		JMVC.events.loadify(1000);
		//
		// edit title
		JMVC.head.title('JMVC');
		//
		JMVC.require('color', 'css', 'screen', 'cookie', 'analytics');
		
		//
		//
		//JMVC.css.reset();
		//
		//JMVC.head.addscript(JMVC.vars.baseurl+"/media/js/plus_one.js");
		// see plus_one view
		//
		///add a explicit style parsed from a view
		JMVC.head.addstyle('{{style fontweight=`bold` txtalign=`center` margin=`0px` padding=`0px`}}', true, true);
		JMVC.head.meta("description", "A true pure javascript model view controller framework");
		JMVC.head.meta("keywords", "jmvc,javascript mvc,pure javascript mvc,pure javascript");
		JMVC.head.meta("generator", "jmvc resident in your machine");
		JMVC.head.addstyle(JMVC.vars.baseurl + '/media/css/style.css', true);
		//preload logo
		JMVC.dom.preloadImage(JMVC.vars.baseurl + '/media/img/jmvc_m1.png');
		//
		// u can namespace views in folders
		//var index = JMVC.getView('xxx/index');
		var index = JMVC.getView('index'),
			n = this.get('name') || 'Federico';
		//
		index.set('nome', n);
		index.set('i_say', 'The pure javascript mvc framework');
		//
		index.render({
			cback : function () {
				//
				//JMVC.screen.fullscreen();
				//
				var el = document.getElementById('cent'),
					link,
					downlink,
					logo,
					newlogo,
					dims,
					mapid,
					b;
				//
				link = JMVC.dom.create('a', {href : JMVC.vars.baseurl + '/info.jmvc', title : 'get more info'}, '&laquo; MORE &raquo;');
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
				downlink = JMVC.dom.create('a', {href : 'https://github.com/fedeghe/jmvc', title : 'get code from github!', target : '_blank'}, '&laquo; SOURCE &raquo;');
				JMVC.events.bind(downlink, 'click', function () {this.blur();});
				//
				JMVC.dom.append(el, downlink);
				//see the pool
				//JMVC.debug(JMVC.io.x);
				logo = JMVC.dom.find('extralogo');
				newlogo = JMVC.dom.create('img', {width : 476, height : 136, src : JMVC.vars.baseurl + '/media/img/jmvc_m1.png'});
				//
				//
				JMVC.dom.append(logo, newlogo);
				//
				//
				//
				//
				// try gmap
				//
				/*
				JMVC.require('gmap');
				dims = JMVC.screen.getViewportSize();
				mapid = 'map';
				b = JMVC.dom.body();
				JMVC.dom.append(b, JMVC.dom.create('div', {id : mapid, style : 'opacity:0.6;position:absolute;z-index:1;top:0px;left:0px;width:' + dims[0] + 'px;height:' + dims[1] + 'px'}));
				//
				
				JMVC.gmap.initialize(function () {
					JMVC.gmap.mapme('via Maggio 18, Lugano, Svizzera', function(latlng){
					//JMVC.gmap.mapme('via battisti , Albignasego, Italia',function(latlng){
						var mapDiv = document.getElementById(mapid),
							map = new google.maps.Map(mapDiv, {
								center : new google.maps.LatLng(latlng.lat(), latlng.lng()),
								zoom : 6,
								mapTypeId : google.maps.MapTypeId.SATELLITE,
								tilt : 45,
								styles : [{featureType : "water", stylers : [{lightness : 0}, {saturation : 100}, {hue : "#000000"}, {gamma : 1.0}], elementType : "geometry"}]
							}),
							origZoom = map.getZoom();
						
						JMVC.gmap.animator(map, [
							//{zoom:15,duration:3},
							{location : 'via battisti 2, albignasego,italia', speed : 20, duration : 3, mapTypeId : google.maps.MapTypeId.ROADMAP},
							{location : [46.545201, 12.135968], speed : 20, duration : 3, mapTypeId : google.maps.MapTypeId.TERRAIN},
							{location : [46.545201, 12.135968], speed : 20, duration : 20, streetView : {heading : 275, pitch : 15}},
							{location : 'prato della valle, Padova Italia', speed : 20, duration : 20, streetView : {heading : 15, pitch : 0}},
							{location : '767 5th Avenue, New York USA', speed : 20, duration : 10, streetView : {heading : 80}},
							{location : 'via Maggio 18, Lugano, Svizzera', speed : 20, duration : 3}
						]);
					
						//var cl = new google.maps.weather.CloudLayer();
						//cl.setMap(map);
						
					});
				});
				
				*/
			}
		});
	};
	this.video = function () {
		JMVC.require('html5');
		var index = JMVC.getView('index'),
			video = JMVC.html5.video({w : 240, h : 180, uri : 'http://html5demos.com/assets/dizzy.webm', autoplay : false, controls : true}),
			progress = JMVC.html5.progress(35);
		index.set('i_say', 'Federico');
		index.render({cback : function () {
			JMVC.dom.html(document.getElementById('cent'), video + '<br />' + progress);
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
		n = this.get('name') || 'Federico';
		hello.set('name', n);
		index.set('i_say', 'be seo-unfriendly');
		//
		index.render({
			cback : function (n, c) {
				var link = JMVC.dom.create('a', {href : JMVC.vars.baseurl + '/info', title : 'more info'}, '&infin;' + n + c);
				JMVC.events.bind(link, 'click', function () {this.blur();});
				JMVC.dom.append(document.getElementById('cent'), link);
			},
			argz : [' or what ', 'else?'],
			target : 'trial'
		});
		//
		// now index is loaded and contains a #cent div
		// we try to substitute the content with the hello view content
		// and give value to a var in it
		///hello.set('name', this.get('name'));
		hello.render({target : 'cent'});
	};
	//
	//
	//
	this.index3 = function () {
		//directly render some code
		this.render('<b>yupeeee</b>');
	};
	this.codes = function () {
		if (confirm('That may hang your browser!.. continue ? ')) {
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
};
