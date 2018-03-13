JMVC.extend('gmap2', {
	'initialize': function (cback, options) {
		// append main gmaps script,
		// make public the callback
		JMVC.W.cb = cback;
		var params = {callback : 'cb', v : '3.exp', key : '$gmaps_key$'};

		//FFfix
		JMVC.head.addStyle(JMVC.vars.extensions + 'vendors/google/gmap2/gmap.css');
		
		//extend options with those passed
		params = JMVC.object.extend(params, options);
		
		//JMVC.head.addScript('https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=cb');
		JMVC.head.addScript('https://maps.google.com/maps/api/js' + JMVC.object.toQs(params));
		//console.debug('http://maps.google.com/maps/api/js' + JMVC.object.toQs(params));
	},
	
	'mapme' : function (address, cback) {
		var r;
		if (JMVC.util.isArray(address)) {
			cback(new google.maps.LatLng(address[0], address[1]));
		} else {
			JMVC.W.geo = JMVC.W.geo || new  google.maps.Geocoder();
			geo.geocode({address : address}, function(result, status){
				r = (status == 'OK') ? result[0].geometry.location : false;
				cback(r);
			});
		}
	},
	
	'marker' : function (map, latLngArr, content) {
		var marker = new google.maps.Marker({
				position: new google.maps.LatLng(latLngArr[0], latLngArr[1]),
				map: map
			}),
			infoWindow;
		if (typeof content != undefined) {
			infowindow = new google.maps.InfoWindow({content: content});
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map, marker);
			});
		}
		
	},


	'animator' : function (map, points) {
		//array of {location, speed, duration, *zoom, streetView:{heading: , pitch: ,zoom: } }
		var i = 0,
			j = 0,
			latlngs=[],
			points_length = points.length,
			that = this,
			mapType = map.getMapTypeId(),
			panorama = map.getStreetView(),
			t;
		
		//
		//
		function handleMapType(t) {
			(t !== mapType) && map.setMapTypeId(t ? t : mapType);
		}


		function move_heading(p) {
			var ii = 0,
				top = 100,
				pov,
				//active = true,
				duration = p.duration,
				speed = ~~(p.speed),
				zoom = JMVC.nsCheck('streetView.zoom', p) || -5,
				heading = JMVC.nsCheck('streetView.heading', p) || 0;
				pitch = JMVC.nsCheck('streetView.pitch', p) || 0;


			panorama.setPov({
				'heading' : heading,
				'pitch' : pitch,
				'zoom' : zoom
			});


			//JMVC.W.setTimeout(function () {active = false;}, duration * 1E3);

			function inner(yy){
				t = JMVC.W.setTimeout(

					function () {
						
						pov = panorama.getPov();
						panorama.setPov({
							'heading' : pov.heading + 0.01 *speed,
							'pitch' : pov.pitch,
							'zoom' : pov.zoom
						});
						if (yy < duration *1E3){
							inner(ii++);
						}
					},				
					speed
				);
			};
			inner(ii++);
			

			ii = 0;
			
			heading = 0;
		}

		
		function go(n) {
			
			JMVC.W.clearTimeout(t);
			

			//
			if (!JMVC.util.isSet(points[n].location) && points[n].zoom) {
				handleMapType(points[n].mapTypeId);
				map.setZoom(points[n].zoom);
				panorama.setVisible(false);	
			} else if (points[n].streetView) {

				that.mapme(points[n].location, function (r) {
					panorama.setVisible(true);
					panorama.setPosition(r);
					panorama.setPov({
							heading : points[n].streetView.heading,
							pitch : points[n].streetView.pitch || 0,
							zoom : points[n].streetView.zoom || 1
						});
					// in case move
					points[n].speed && move_heading(points[n]);

					
				});
			} else {
				panorama.setVisible(false);
				that.mapme(points[n].location, function (r) {
					handleMapType(points[n].mapTypeId);
					map.panTo(r);
					if (points[n].zoom) {
						map.setZoom(points[n].zoom);
					}
				
				});
			}






			JMVC.W.setTimeout(
				function (){
					go((n + 1) % points_length);
				},
				points[n].duration * 1E3
			);
		}

		go(0);

		
	}
});
