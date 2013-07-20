JMVC.controllers.snow = function () {
	this.action_index = function () {
		
		JMVC.require('core/obj/date', 'widget/snow/snow');
		
		//preload logo
		JMVC.dom.preloadImage(JMVC.vars.baseurl + "/media/img/jmvc_m1.png");
		//
		JMVC.events.loadify(1000);
		//
		// edit title
		JMVC.head.title('JMVC');
		//
		JMVC.require('core/mobile', 'core/color', 'core/css', 'core/dim', 'core/cookie', 'vendors/google/analytics', 'core/fx', 'vendors/google/gmap');
		
		
		
		JMVC.head.link('icon', {type : "image/vnd.microsoft.icon", href : JMVC.vars.baseurl + "/media/favicon.ico"});

		
		
		//
		//
		JMVC.css.reset();
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

		//
		// u can namespace views in folders
		//var index = JMVC.getView('xxx/index');
		var index = JMVC.getView('index'),
			n = this.get('name') || 'Federico';
		//
		index.set('nome', n);
		index.set('i_say', 'pure javascript mvc framework');
		//
		
		
		
		
		
		
		index.parse().render({
			cback : function () {
				
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
				downlink = JMVC.dom.create('a', {href : 'https://github.com/fedeghe/jmvc', title : 'get code from github!', target : '_blank'}, '&laquo; SOURCE &raquo;');
				JMVC.events.bind(downlink, 'click', function () {this.blur();});
				//
				JMVC.dom.append(el, downlink);
				//see the pool
				//JMVC.debug(JMVC.io.x);
				logo = JMVC.dom.find('#extralogo');
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
				JMVC.require('vendors/google/gmap');
				dims = JMVC.dim.getViewportSize();
				mapid = 'map';
				b = JMVC.dom.body();
				JMVC.dom.append(b, JMVC.dom.create('div', {id : mapid, style : 'opacity:0.6;position:absolute;z-index:1;top:0px;left:0px;width:' + dims.width + 'px;height:' + dims.height + 'px'}));
				//
			
				
				JMVC.gmap.initialize(function () {
					
					//console.debug(dims);
					
					JMVC.gmap.mapme('via Maggio 18, Lugano, Svizzera', function(latlng){
						
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
							//{location : 'via battisti 2, albignasego,italia', speed : 20, duration : 3, mapTypeId : google.maps.MapTypeId.ROADMAP}
							//,{location : [46.545201, 12.135968], speed : 20, duration : 3, mapTypeId : google.maps.MapTypeId.TERRAIN}
							{location : [46.545201, 12.135968], speed : 20, duration : 20, streetView : {heading : 275, pitch : 15}}
							,{location : 'prato della valle, Padova Italia', speed : 20, duration : 20, streetView : {heading : 15, pitch : 0}}
							,{location : '767 5th Avenue, New York USA', speed : 20, duration : 10, streetView : {heading : 80}}
							,{location : [47.366923, 8.543597], speed : 20, duration : 10, streetView : {heading : 180}}
							//,https://maps.google.com/maps?hl=en&ll=47.366923,8.543597&spn=0.003575,0.010568&t=h&z=17&layer=c&cbll=47.366949,8.543742&panoid=c-WWbwfJiDKStCsFOR8zWg&cbp=12,165,,0,-1.01
							//,{location : 'via Maggio 18, Lugano, Svizzera', speed : 20, duration : 3}
						]);
						
						//var cl = new google.maps.weather.CloudLayer();
						//cl.setMap(map);
						
					});
				});
				*/
			   
				
				JMVC.snow.start(JMVC.dom.body());
			}
		});
	};

};