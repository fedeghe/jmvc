JMVC.extend('gmap', {
	'initialize': function (cback, options) {
		// append main gmaps script,
		// make public the callback
		JMVC.W.cb = cback;
		var params = {callback : 'cb'};
		
		//extend options with those passed
		JMVC.util.extend(params, options);
		
		JMVC.head.addscript('http://maps.google.com/maps/api/js' + JMVC.object.toQs(params));
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
	'animator' : function (map, points, loop) {
		//array of {location, speed, duration, *zoom, streetView:{heading: , pitch: ,zoom: } }
		var i = 0,
			j = 0,
			latlngs=[],
			points_length = points.length,
			that = this,
			mapType = map.getMapTypeId();
		//
		//
		function handleMapType(t) {
			if (t !== mapType) {
				map.setMapTypeId(t ? t : mapType);
			}
		}
		
		function loop() {
			var panorama = map.getStreetView();
			j = (i - 1 + points_length) % points_length;
			function do_loop() {
				i = (i + 1) % points_length;
				loop();
			}
			//
			function move_heading() {
				var i = 0,
					top = 900,
					p,
					h;
				while (i < top) {
					JMVC.W.setTimeout(
						function () {
							p = panorama.getPov();
							h = p.heading;
							panorama.setPov({
								heading : h + 0.05,
								pitch : p.pitch,
								zoom : p.zoom
							});
						},				
						(i + 1) * 100
					);
					i += 1;
				}
			}
			//
			JMVC.W.setTimeout(function () {
				//
				panorama.setVisible(false);
				//
				if (!JMVC.util.isSet(points[i].location) && points[i].zoom) {
					handleMapType(points[i].mapTypeId);
					map.setZoom(points[i].zoom);
					do_loop();
				} else if (points[i].streetView) {
					that.mapme(points[i].location, function (r) {
						panorama.setPosition(r);
						panorama.setPov({
							heading : points[i].streetView.heading,
							pitch : points[i].streetView.pitch || 0,
							zoom : points[i].streetView.zoom || 1
						});
						panorama.setVisible(true);
						move_heading();
						do_loop();
					});
				} else {
					that.mapme(points[i].location, function (r) {
						handleMapType(points[i].mapTypeId);
						map.panTo(r);
						if (points[i].zoom) {
							map.setZoom(points[i].zoom);
						}
						do_loop();
					});
				}
			}, points[j].duration * 1000);
		}
		loop();
	}
});
