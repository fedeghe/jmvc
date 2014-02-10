JMVC.extend('gmaps', {
    create : function () {
        return {

            map : false,
            initialize: function (cback, options) {
                // append main gmaps script,
                // make public the callback
                JMVC.W.cb = cback;
                var params = {callback : 'cb', v : '3.exp'};//, key : 'AIzaSyCGPE1UyhBMvPx9RcrgwjmoYmNJDHYdP30'};

                //FFfix
                JMVC.head.addstyle(JMVC.vars.extensions + 'vendors/google/gmaps-v.3.14/gmap.css');
                
                //extend options with those passed
                params = JMVC.object.extend(params, options);
                
                //JMVC.head.addscript('https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=cb');
                JMVC.head.addscript('https://maps.google.com/maps/api/js' + JMVC.object.toQs(params));
                //console.debug('http://maps.google.com/maps/api/js' + JMVC.object.toQs(params));
            },

            render : function (node, options) {
                var self = this;

                //google.maps.event.addDomListener(window, 'load', function () {

                self.map = new google.maps.Map(node,  {
                    zoom: 8,
                    center: new google.maps.LatLng(-34.397, 150.644)
                });
                //});
            }
        };      
    }
});