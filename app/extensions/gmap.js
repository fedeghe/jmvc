JMVC.extend('gmap',{
	initialize: function(cback){
		// append main gmaps script
		window.cb = cback;
		JMVC.head.addscript('http://maps.google.com/maps/api/js?sensor=false&callback=cb');
	},
	mapme : function(address, cback){
		window.geo = window.geo ? window.geo : new  google.maps.Geocoder();
		geo.geocode({address:address},function(result, status){
			
			var r = (status == 'OK') ? result[0].geometry.location : false;
			cback(r);
		});		
	}
});

