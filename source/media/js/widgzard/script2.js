JMVC.head.addStyle('/media/css/widgzard/sample2.css');

(function (){


    JMVC.W.cb = function (){
        var common = {
            width:'100%',
            height : '400px',
            border: '2px solid black',
            marginTop : '20px'
        },
        cb = function () {loadMap.call(this); };

        JMVC.core.widgzard.render({

            style : {
                width : '80%',
                margin : '0 auto',
                backgroundColor : '#5a5',
                marginBottom : '50px'
            },
            target : document.getElementById('container'),
            
            cb : function () {
                console.log('THE END');
                document.body.style.backgroundColor = 'green';
                
            },
            
            content : [{
                    content:[{
                        tag : 'button',
                        html : 'back',
                        cb : function () {
                            var self = this;
                            JMVC.events.on(self.node, 'click', function () {
                                JMVC.head.goto('widgzard', 'sample');
                            });
                            this.done();
                        }
                    }]
                },{
                    wid : 'map1',
                    cb : cb,
                    data : {
                        position : {
                            lat : 40.721952,
                            lng : -74.004476,
                            zoom : 13
                        }
                    },
                    style : common
                },{
                    wid : 'map2',
                    cb : cb,
                    data : {
                        position : {
                            lat : 41.9100711,
                            lng : 12.5359979,
                            zoom : 6
                        }
                    },
                    style : common
                },
                {
                    wid : 'map3',
                    cb : cb,
                    data : {
                        position : {
                            lat : 39.964676,
                            lng : 116.3713664,
                            zoom : 8
                        }
                    },
                    style : common
                },{
                    wid : 'map4',
                    cb : cb,
                    data : {
                        position : {
                            lat : 34.0204989,
                            lng : -118.4117325,
                            zoom : 6
                        }
                    },
                    style : common
                }
            ]
        }, true);

        function loadMap (n){
            
            var self = this;
            
            function initialize() {
                var mapOptions = {
                        center: new google.maps.LatLng(self.data.position.lat, self.data.position.lng),
                        zoom: self.data.position.zoom
                    },
                    map = new google.maps.Map(self.node, mapOptions);
                google.maps.event.addListenerOnce(map, 'idle', function(){
                    self.done();
                });
                
            };
            
            initialize();
        }            
    };





    var params = { callback: 'cb', v: '3.exp', key: 'AIzaSyCbG5ULXNEjcVHZ6yWyK2V9HBjHtLtNp6A'};

    //FFfix
    JMVC.head.addStyle(JMVC.vars.extensions + 'vendors/google/gmap/gmap.css');

    //extend options with those passed
    //params = JMVC.object.extend(params, options);

    JMVC.head.addScript('https://maps.google.com/maps/api/js' + JMVC.object.toQs(params));
    
})();