JMVC.require(
	'core/sniffer/sniffer',
	'core/obj/date/date',
	'core/i18n/i18n',
	'core/responsive/basic/basic',
	'core/mobile/mobile',
	'core/color/color',
	'core/screen/screen',
	'vendors/google/analytics/analytics',
	'core/fx/fx',
	'widget/lang/lang',
	'vendors/github/forkme/forkme',
	'core/lib/widgzard/widgzard'
	// ,'core/lib/cookieMonster/cookieMonster'
);

JMVC.controllers.index = function () {
	'use strict';

	JMVC.css.autoHeadings();

	this.action_none = function () {};

	this.action_index = function () {



		if (!JMVC.sniffer.features.assets.touchDevice) {
			JMVC.require('core/fx/3DaniLogo');
		}
		
		var logoimg = 'jmvc_n2.png',
			ctrl = this;

		JMVC.dom.preloadImage(
			JMVC.vars.baseurl + '/media/img/' + logoimg
			/*, function (i){console.debug(i, 'loaded')}*/
		);
		
		JMVC.events.loadify(500);
		JMVC.head.title('JMVC');
		JMVC.lang.apply(null, JMVC.util.getParameters('jmvcscript').langs || ['en', 'de', 'it']);

		/*
		JMVC.head.addScript(JMVC.vars.baseurl+"/media/js/plus_one.js");
		see plus_one view
		add a explicit style parsed from a view
		*/
		//JMVC.head.addStyle('{{style fontweight=`bold` txtalign=`center` margin=`0px` padding=`0px`}}', true, true);
		JMVC.head.meta('description', 'A true pure javascript model view controller framework', true);
		JMVC.head.meta('keywords', 'jmvc,javascript mvc,pure javascript mvc,pure javascript');
		JMVC.head.meta('generator', 'jmvc resident in your machine');

		//JMVC.head.addStyle(JMVC.vars.baseurl + '/media/css/core/jmvc-night.min.css', true);
		JMVC.head.addStyle(JMVC.vars.baseurl + '/media/css/core/jmvc-day.min.css', true);

		/*
		u can namespace views in folders
		var index = JMVC.getView('xxx/index');
		*/
		var index = JMVC.getView('home/index');
		//
		//index.set('nome', this.get('name') || 'Federico');
		index.set('i_say', '[L[pure javascript mvc framework]]');
		
		index.parse().render(
			function () {

				
				// JMVC.preload(JMVC.vars.baseurl + '/info');
				// JMVC.preload(JMVC.vars.baseurl + '/api');
				
			
				JMVC.github.forkme('fedeghe');

				JMVC.mobile.topHide();

				JMVC.widget.langs.create(JMVC.dom.find('#topbar'));
/*
				JMVC.responsive.onChange(
					function (w) {
						if (w < 800) {
							JMVC.responsive.allow('resp_mobi');
						} else {
							JMVC.responsive.allow('resp_dskt');
						}
					}
				);
*/
				JMVC.head.lastModified();

				var el = document.getElementById('cent'),
					links = JMVC.dom.create('h2'),
					morelink = JMVC.dom.create('a', {'class' : 'homelinks', href : JMVC.vars.baseurl + '/info.jmvc', title : 'get more info'}, JMVC.parseLang('[L[more]]')),
					sourcelink = JMVC.dom.create('a', {'class' : 'homelinks', href : 'https://github.com/fedeghe/jmvc', title : 'get code from github!', target : '_blank'}, JMVC.parseLang('[L[source]]')),
					demolink = JMVC.dom.create('a', {'class' : 'homelinks', href : JMVC.vars.baseurl + '/demo.jmvc', title : 'some demos'}, JMVC.parseLang('[L[demos]]')),
					apilink = JMVC.dom.create('a', {'class' : 'homelinks', href : JMVC.vars.baseurl + '/api.jmvc', title : 'basic documentation'}, JMVC.parseLang('[L[api]]')),
					logo, newlogo,
					dims,
					mapid,
					body,
					today = new Date(),
					todayMonth = today.getMonth();

				JMVC.dom.append(links,  [morelink, apilink, demolink, sourcelink]);
				JMVC.dom.append(el, links);

				JMVC.events.on([morelink, apilink, demolink, sourcelink], 'click', function () {this.blur(); });


				logo = JMVC.dom.find('#extralogo');
				newlogo = JMVC.dom.create('img', {src : JMVC.vars.baseurl + '/media/img/' + logoimg});
			
				JMVC.dom.append(logo, JMVC.dom.create('div', {'class':'resp_mobi', style:'height:20px'}, '&nbsp;'));
				JMVC.dom.append(logo, newlogo);
				
				
				if (JMVC.p.map && JMVC.p.map === 'true') {
				
					JMVC.require('vendors/google/gmap2/gmap2');
					dims = JMVC.screen.getViewportSize();
					mapid = 'map';
					body = JMVC.dom.body();
					JMVC.dom.append(body, JMVC.dom.create('div', {id : mapid, style : 'opacity:0.8;position:absolute;z-index:1;top:0px;left:0px;width:' + dims.width + 'px;height:' + dims.height + 'px'}));
					
					JMVC.gmap2.initialize(function () {
						JMVC.gmap2.mapme('Dällikerstrasse 35, Regensdorf, Svizzera', function (latlng) {
							var mapDiv = document.getElementById(mapid),
								map = new google.maps.Map(mapDiv, {
									center : new google.maps.LatLng(latlng.lat(), latlng.lng()),
									zoom : 4,
									mapTypeId : google.maps.MapTypeId.SATELLITE,
									tilt : 45,
									styles : [{featureType : 'water', stylers : [{lightness : 0}, {saturation : 100}, {hue : '#000000'}, {gamma : 0.2}], elementType : 'geometry'}]
								});

							JMVC.gmap2.animator(map, [


								/* Greenland */
								// {location : [24.1829108,-76.4570398], speed : 20, duration : 20, streetView : {heading : 270, zoom : -2}},
								{location : [64.2005707,-51.6272116], speed : 20, duration : 20, streetView : {heading : 270, zoom : -2}},
								
								/* Iceland */
								{location : [64.8914217,-15.3190167], speed : 20, duration : 20, streetView : {heading : 270, zoom : -2}},
								
								/* Nepal */
								{location : [27.9399118,86.7012209], speed : 20, duration : 20, streetView : {heading : 230, zoom : -2}},

								/* Mauritius */
								{location : [-20.4441618,57.7045834], speed : 20, duration : 20, streetView : {heading : 230, zoom : -2}},

								/* NYC */
								{location : [40.764087, -73.973104], speed : 20, duration : 20, streetView : {heading : 90, zoom : -2}},
								
								/* JAPO */
								{location : [34.3828365,133.8191008], speed : 20, duration : 20, streetView : {heading : 270, zoom : -2}},

								/* Mauritius 2 */
								{location : [-20.1595542,57.7559532], speed : 20, duration : 20, streetView : {heading : 230, zoom : -2}},

								/* ELEPHANTS */
								{location : [0.576755, 37.545038], speed : 20, duration : 20, streetView : {heading : 270, zoom : -2}},

								/* Cortina */
								{location : [46.545509, 12.135808], speed : 20, duration : 20, streetView : {heading : 180, pitch : 15, zoom : 0}},
								



								{location : 'prato della valle, Padova Italia', speed : 20, duration : 10, streetView : {heading : 230, pitch : 0, zoom : -2}},

								/* Amsterdam : piazza dam */
								{location : [52.372652, 4.893193], speed : 20, duration : 20, streetView : {heading : 270, zoom : -2}},

								/* Zürich */
								{location : [47.369227, 8.543485], speed : 20, duration : 20, streetView : {heading : 195, zoom : -2}},

								/* heron island underwater */
								{location : [-23.443045, 151.906744], speed : 20, duration : 30, streetView : {heading : 270, pitch : 0, zoom : -5}},

								/* Mayan Ruins in Mexico */
								{location : [20.682504, -88.56879], speed : 20, duration : 20, streetView : {heading : 0, pitch : 0, zoom : -5}}
							]);
						});
					}, {sensor : 'false'});
				}
				
				// stil opera unfriendly somehow, must dig it!
				
				JMVC.sniffer.browser.name !== 'Opera'
				&& (
					JMVC.array.find([9, 10, 11, 0, 1, 2, 3, 4], todayMonth) > -1
					&&
					(JMVC.p.snow && JMVC.p.snow === 'true' || ctrl.get('snow'))
				)
				&& JMVC.require('widget/snow/snow/snow', function () {
					JMVC.css.style(JMVC.WDB, {'backgroundColor': '#eef'});
					JMVC.snow.start(JMVC.dom.body());
				});
				
				
				if (!JMVC.sniffer.features.assets.touchDevice) {
					JMVC.fx.threeDaniLogo(newlogo);
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
			});

		index.set('i_say', 'Sample Video');

		index.render(function () {
			JMVC.dom.append(JMVC.dom.find('#cent'), video);
		});
	};

	this.action_audio = function () {
		JMVC.require('core/html5/html5');
		var index = JMVC.getView('home/index'),
			audio = JMVC.html5.audio({
				type : 'ogv',
				src : 'http://techslides.com/demos/sample-videos/small.ogv',
				autoplay : 'autoplay',
				controls : true
			});
		
		index.set('i_say', 'Sample audio');
		index.render({cback : function () {
			JMVC.dom.append(JMVC.dom.find('#cent'), audio);
		}});
	};

	this.action_index3 = function () {
		/* directly render something */
		this.render('<div id="space">Direct render</div>');
	};

	this.action_codesNoworkers = function () {
		var content = '';
		if (confirm('That may hang your browser! ...continue?')) {
			var i = 10;
			for (null; i < 2<<15; i += 1) {
				content += i + ' : &#' + i + ';<br />';
			}
			this.render(content, function () {
				var t = [10367, 10431, 10491, 10493, 10494, 10487, 10479, 10463],
					i = 0,
					l = t.length;
				window.setInterval(
					function () {JMVC.head.title(String.fromCharCode(t[i])); i = (i + 1) % l; },
					100
				);
			});
		} else {
			this.render(':D');
			window.setTimeout(
				function () {window.document.location.href = JMVC.vars.baseurl; },
				3000
			);
		}
	};

	this.action_codes = function () {

		//check webWorkers
		if (!JMVC.sniffer.features.assets.webWorkers) {
			JMVC.head.goto(JMVC.c, 'codesNoworkers');
		}
		
		var content = '',
			self = this;

		// clean body
		this.render(content, function () {
			var t = [10367, 10431, 10491, 10493, 10494, 10487, 10479, 10463],
				i = 0,
				l = t.length;
			window.setInterval(
				//function (){JMVC.head.title(String.fromCharCode(JMVC.util.rand(10240, 10495)))},
				function () {JMVC.head.title(String.fromCharCode(t[i])); i = (i + 1) % l; },
				100
			);
		});

		// create a inline worker
		var blobURL = window.URL.createObjectURL(
				new Blob([
					"var i = 0, l = 2<<15,"+
						"loop = setInterval(function () {"+
							"self.postMessage(i + ' : ' + String.fromCharCode('0x'  + (i++).toString(16)) + '<br />');	"+
							
							"if (i == l) {"+
								"clearInterval(loop);"+
							"}"+
						"}, 5);"
				])
			),
			worker = new Worker(blobURL);

		worker.onmessage = function (e) {
			JMVC.dom.append(self.view.container, JMVC.dom.create('span', {}, e.data));
		};
	};

	this.action_ascii = function () {
		var content = '', i = 0;
		for (null; i < 256; i += 1) {
			content += i + ' : ' + String.fromCharCode(i) + '<br />';
		}
		this.render(content);
	};

	this.action_gmaps = function () {
		JMVC.require('vendors/google/gmap2/gmap2', 'core/screen/screen');
		this.render(function () {
			var dims = JMVC.screen.getViewportSize(),
				mapid = 'map',
				b = JMVC.dom.body();

			JMVC.dom.append(b, JMVC.dom.create('div', {id : mapid, style : 'opacity:0.8;position:absolute;z-index:1;top:0px;left:0px;width:' + dims.width + 'px;height:' + dims.height + 'px'}));
			
			JMVC.gmap2.initialize(function () {
				JMVC.gmap2.mapme('via Maggio 18, Lugano, Svizzera', function (latlng) {
					var mapDiv = document.getElementById(mapid),
						map = new google.maps.Map(mapDiv, {
							center : new google.maps.LatLng(latlng.lat(), latlng.lng()),
							zoom : 4,
							mapTypeId : google.maps.MapTypeId.SATELLITE,
							tilt : 45,
							styles : [{
								featureType : 'water',
								stylers : [{lightness : 0}, {saturation : 100}, {hue : '#000000'}, {gamma : 0.2}],
								elementType : 'geometry'
							}]
						});
					JMVC.events.delay(function () {
						JMVC.gmap2.animator(map, [
							{location : [46.545509, 12.135808], speed : 20, duration : 20, streetView : {heading : 180, pitch : 15, zoom : -2}},
							{location : 'prato della valle, Padova Italia', speed : 20, duration : 20, streetView : {heading : 180, pitch : 15, zoom : -2}},
							{location : [47.366923, 8.543597], speed : 20, duration : 20, streetView : {heading : 270, pitch : 15, zoom : -2}},
							{location : '767 5th Avenue, New York USA', speed : 20, duration : 20, streetView : {heading : 90, pitch : 15, zoom : -2}},
							{location : [-23.443045, 151.906744], speed : 20, duration : 30, streetView : {heading : 270, pitch : 15, zoom : -2}},
							{location : [20.682504, -88.56879], speed : 20, duration : 10, streetView : {heading : 0, pitch : 15, zoom : -2}}
						]);
					}, 0);
				});
				
			}, {sensor : 'false'});
		});
	};

	this.action_console = function () {
		JMVC.events.loadify(500);
		this.render(function () {
			JMVC.console();
		});
	};
};