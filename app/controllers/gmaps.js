JMVC.controllers.gmaps = function () {

	this.action_index = function () {

		JMVC.events.loadify(1000);
		JMVC.require('vendors/google/gmap/gmap','core/dim/dim');
		JMVC.head.meta("generator", "jmvc resident in your machine");
		var v = JMVC.getView('vacuum'),
			that = this,
			dims,
			mapid,
			b;

		v.set({'style' : 'font-family:verdana;margin:0 auto;width:285px;height:105px;margin-top:80px;position:relative', 'content' : '&nbsp;', 'id' : 'extralogo'});

		v.render(function () {

				dims = JMVC.dim.getViewportSize();
				mapid = 'map';
				b = JMVC.dom.body();
				JMVC.dom.append(b, JMVC.dom.create('div', {id : mapid, style : 'position:absolute;z-index:1;top:0px;left:0px;width:' + dims.width + 'px;height:' + dims.height + 'px'}));

			
				
				JMVC.gmap.initialize(function () {
					

					
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
						
						/*
						var cl = new google.maps.weather.CloudLayer();
						cl.setMap(map);
						*/
						
						JMVC.gmap.marker(map, [47.366923, 8.543597], '<h1>Yeahhh</h1>');
						
					});
					
					
					
				},
				{
					sensor : false
				}
			);
		});
	};
}