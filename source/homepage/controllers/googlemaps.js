JMVC.controllers.googlemaps = function () {
    'use strict';

    this.action_3_14 = function () {
        JMVC.require('vendors/google/gmaps-v.3.14/gmaps-v.3.14');
        var v = JMVC.getView('vacuum'),
            gm = JMVC.gmaps.create(),
            container;
        v.set({
            'style': 'font-family:verdana, sans-serif;margin-top:80px;width:800px; height:400px;',
            'content': '&nbsp;',
            'id': 'container'
        }).render(function () {
            container = JMVC.dom.find('#container');
            gm.initialize(function () {
                gm.render(container);
            }, {
                sensor: false
            });
        });
    };

    this.action_index = function () {
        JMVC.events.loadify(1000);
        JMVC.require('vendors/google/gmap/gmap', 'core/screen/screen');
        JMVC.head.meta('generator', 'jmvc resident in your machine');
        JMVC.head.title('Google maps');
        var v = JMVC.getView('vacuum'),
            dims,
            mapid,
            b;

        v.set({
            'style': 'font-family:verdana;margin:0 auto;width:285px;height:105px;margin-top:80px;position:relative',
            'content': '&nbsp;',
            'id': 'extralogo'
        }).render(function () {
            dims = JMVC.screen.getViewportSize();
            mapid = 'map';
            b = JMVC.dom.body();

            JMVC.dom.append(b, JMVC.dom.create('div', {
                id: mapid,
                style: 'position:absolute;z-index:1;top:0px;left:0px;width:' + dims.width + 'px;height:' + dims.height + 'px'
            }));

            JMVC.gmap.initialize(
                function () {
                    JMVC.gmap.mapme('via Maggio 18, Lugano, Svizzera', function (latlng) {
                        var mapDiv = JMVC.dom.find('#' + mapid),
                            map = new google.maps.Map(mapDiv, {
                                center: new google.maps.LatLng(latlng.lat(), latlng.lng()),
                                zoom: 6,
                                mapTypeId: google.maps.MapTypeId.SATELLITE,
                                tilt: 45,
                                styles: [{ featureType: 'water', stylers: [{ lightness: 0 }, { saturation: 100 }, { hue: '#000000' }, { gamma: 1.0 }], elementType: 'geometry' }]
                            });

                        JMVC.gmap.marker(map, [52.3747158, 4.8986166], '<p>Amsterdam</p>');
                        JMVC.gmap.marker(map, [47.366923, 8.543597], '<p>Zürich</p>');
                    });
                }, {
                    sensor: false
                }
            );
        });
    };
};
