JMVC.controllers.gmaps = function () {
	//
	this.action_index = function () {
		//
		JMVC.events.loadify(1000);
		JMVC.require('vendors/google/gmap','core/dim');
		JMVC.head.meta("generator", "jmvc resident in your machine");
		var v = JMVC.getView('vacuum'),
			that = this,
			dims,
			mapid,
			b;

		v.set({'style' : 'font-family:verdana;margin:0 auto;width:285px;height:105px;margin-top:80px;position:relative', 'content' : '&nbsp;', 'id' : 'extralogo'});

		v.render(function () {
			//JMVC.require('gmap');
				dims = JMVC.dim.getViewportSize();
				mapid = 'map';
				b = JMVC.dom.body();
				JMVC.dom.append(b, JMVC.dom.create('div', {id : mapid, style : 'position:absolute;z-index:1;top:0px;left:0px;width:' + dims.width + 'px;height:' + dims.height + 'px'}));
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
						
						/*
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
						*/
						//var cl = new google.maps.weather.CloudLayer();
						//cl.setMap(map);
						
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