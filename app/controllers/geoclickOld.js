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
	'core/lib/widgzard/widgzard',
	'vendors/google/gmap2/gmap2'
);

JMVC.controllers.geoclickOld = function () {
	'use strict';

	JMVC.css.autoHeadings();

	this.action_none = function () {};

	this.action_index = function () {

		


		
		JMVC.events.loadify(500);
		JMVC.head.title('GeoClick');
		

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
		JMVC.head.addStyle(JMVC.vars.baseurl + '/media/css/geoclick.css', true);

		/*
		u can namespace views in folders
		var index = JMVC.getView('xxx/index');
		*/
		var index = JMVC.getView('vacuum'),
			georefUrl = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=%lat%,%lng%&sensor=true',
			geoCoder, map,
			pubsub = JMVC.Channel('gc'),
			GeoClick = {
				map : false,
				states : (function () {
					var states = ["Russia", "China", "Iran", "Pakistan", "Oman", "Yemen", "Saudi Arabia", "Egypt", "Libya", "Libya", "Algeria", "Algeria", "Mauritania", "Mauritania", "Mali", "Niger", "Ethiopia", "Sudan", "Sudan", "Cameroon", "Nigeria", "Burkina Faso", "Mali", "Liberia", "Côte d'Ivoire", "Benin", "Nigeria", "Congo", "Democratic Republic of the Congo", "Angola", "Angola", "Angola", "Democratic Republic of the Congo", "Democratic Republic of the Congo", "Kenya", "Ethiopia", "Tanzania", "Tanzania", "Democratic Republic of the Congo", "Malawi", "Zambia", false, false, "Botswana", "Namibia", "South Africa", "South Africa", "South Africa", "Mozambique", "Madagascar", "India", "Sri Lanka", "India", "India", "China", "China", "China", "Tajikistan", "Turkmenistan", "Turkmenistan", "Turkmenistan", "Uzbekistan", "Kazakhstan", "Uzbekistan", "Kazakhstan", "Kazakhstan", "Kazakhstan", "Kazakhstan", "Russia", "Russia", "Russia", "Turkey", "Turkey", "Turkey", "Greece", "Greece", "Greece", "Greece", "Greece", "Albania", "Albania", "Albania", "Serbia", "Montenegro", "Montenegro", "Greece", "Bulgaria", false, "Serbia", "Serbia", "Serbia", "Montenegro", "Serbia", "Serbia", "Serbia", "Bosnia and Herzegovina", "Bosnia and Herzegovina", "Croatia", "Bosnia and Herzegovina", "Serbia", "Croatia", "Bosnia and Herzegovina", "Croatia", "Croatia", "Croatia", "Hungary", "Slovenia", "Slovenia", "Italy", "Italy", "France", "France", "France", "France", "Spain", "Spain", "Portugal", "Italy", "France", "United Kingdom", "United Kingdom", "United Kingdom", "Ireland", "Sweden", "Denmark", "Germany", "Germany", "Belgium", "Germany", "Poland", "Poland", "Poland", "Russia", "Russia", "Russia", "Finland", "Russia", "Russia", "Russia", "Finland", "Norway", "Sweden", "Sweden", "Norway", "Norway", "Norway", "Norway", "Sweden", "Sweden", "Sweden", "Sweden", "Denmark", "Iceland", "Canada", "United States", "Mexico", "Mexico", "Mexico", "Mexico", "Guatemala", "Honduras", "Nicaragua", "Nicaragua", "Mexico", "Guatemala", "Honduras", "Honduras", "Nicaragua", "Costa Rica", "Costa Rica", "Panama", "Colombia", "Colombia", "Dominican Republic", "Cuba", "United States", false, "Bermuda", "Canada", "Canada", "Venezuela", "Guyana", "Suriname", "Venezuela", "Colombia", "Colombia", "Ecuador", "Ecuador", "Colombia", "Brazil", "Brazil", "Brazil", "Brazil", "Brazil", "Brazil", "Brazil", "Peru", "Peru", "Brazil", "Peru", "Peru", "Peru", "Bolivia", "Bolivia", "Bolivia", "Chile", "Chile", "Argentina", "Paraguay", "Brazil", "Brazil", "Brazil", "Paraguay", "Argentina", "Uruguay", "Argentina", "Argentina", "Chile", "Argentina", "Argentina", "Argentina", "Chile", "Argentina", "Argentina", "Argentina", "Chile", "Chile", "Chile", "Falkland Islands (Islas Malvinas)", "Argentina", "Argentina", "Argentina"].sort(function (a,b) { return Math.random() >= 0.5 ? -1 : 1} ),
						subSetSize = 5,
						subSet = [],
						current = 0;
					// while (subSet.length < subSetSize) {

					// }
					subSet = states;
					return {
						getNext : function () {
							current = (current + 1) % subSet.length;
							return subSet[current];
						},
						current : function () {
							return subSet[current];
						}
					};
				})(),
				getState : function (lat, lng) {
					var p = JMVC.Promise.create(),
						url = JMVC.string.replaceAll(georefUrl, {
							lat : lat,
							lng : lng
						});
					JMVC.io.getJson(url, function (res) {
						if (res.results.length == 0) {
							p.done(false);
							return;
						}
						console.dir(res);
						// dig the result to find out the record that contains "country" and "political"
						//
						var addressComponents = res.results[0].address_components,
							i = 0,
							l = addressComponents.length,
							out = false;
						for (null; i < l && out === false; i++) {
							if (JMVC.array.find(addressComponents[i].types, "country") >=0 && JMVC.array.find(addressComponents[i].types, "political") >=0) {
								out = addressComponents[i].long_name;
							}
						}
						p.done(out);
					});
					return p;
				},

				listen : function () {
					var inputs = [];
					google.maps.event.addListener(GeoClick.map, 'click', function(e) {
						var latLng = e.latLng,
							lat = latLng.lat(),
							lng = latLng.lng();
							
						
						GeoClick.getState(lat, lng).then(function (p, args) {
							var userInput = args[0] || false;
							inputs.push(userInput);
							console.debug(inputs);

							if (userInput && userInput == GeoClick.states.current()) {
								pubsub.pub('score', [10]);
							} else {
								pubsub.pub('score', [-1]);
							}
							pubsub.pub('doNext');
						});
					});

				},

				init : function (map) {
					
					GeoClick.map = map;
					// drawpanel
					JMVC.core.widgzard.render({
						content : [{
							style : {
								position : "absolute",
								right:"10px",
								top : "10px",
								padding : "10px",
								border: "1px solid #aaa",
								backgroundColor: "white",
								zIndex : "999"
							},
							content : [{
								tag : "h3",
								html : "GeoClick v.1"
							},{
								tag : "button",
								html : "start a new game",
								wid : "new Button",
								cb : function () {
									var self = this,
										$elf = self.node;

									JMVC.events.on($elf, 'click', function () {
										JMVC.css.style($elf, 'display', 'none');
										self.getNode('onGamePanel').node.style.display = 'block';
										
										GeoClick.listen();

									});
									this.done();
								}
							},{
								wid : "onGamePanel",
								style : {
									display: "none"
								},
								content : [{
									html : "click into : "	
								}, {
									html : "not set",
									cb : function () {
										var self = this;
										pubsub.sub('doNext', function() {
											JMVC.dom.html(self.node, GeoClick.states.getNext());
										})

										JMVC.dom.html(this.node, GeoClick.states.current());
										this.done();
									}
								},{
									tag : "hr"
								},{
									tag : "strong",
									content : [{
										tag : "strong",
										html : 'Score: '
									}, {
										tag : "span",
										html : 0,
										data : {
											score : 0
										},
										cb : function () {
											var self = this;
											pubsub.sub('score', function (t, a) {
												
												self.data.score += ~~a;
												self.node.innerHTML = self.data.score;
											});
											self.done();
										}
									}]
									
								}]
							},{
								tag : "hr"
							},{
								tag : "h6",
								html : "All rights reserved to GeoClick.com"
							}]
						}]
					});
				},
				startGame : function () {

				},
				endGame : function () {

				}
			}
		//
		//index.set('nome', this.get('name') || 'Federico');
		index.set('i_say', '[L[pure javascript mvc framework]]');
		
		index.parse().render(
			function () {

				JMVC.github.forkme('fedeghe');

				JMVC.mobile.topHide();
				
				var  dims = JMVC.screen.getViewportSize(),
					mapid = 'map',
					body = JMVC.dom.body();

				JMVC.dom.append(body, JMVC.dom.create('div', {id : mapid, style : 'opacity:0.8;position:absolute;z-index:1;top:0px;left:0px;width:' + dims.width + 'px;height:' + dims.height + 'px'}));
				
				JMVC.gmap2.initialize(function () {
					JMVC.gmap2.mapme('Dällikerstrasse 35, Regensdorf, Svizzera', function (latlng) {
						var mapDiv = document.getElementById(mapid);
						geoCoder = new google.maps.Geocoder();
						map = new google.maps.Map(mapDiv, {
							center : new google.maps.LatLng(latlng.lat(), latlng.lng()),
							zoom : 4,
							mapTypeId : google.maps.MapTypeId.SATELLITE,
							tilt : 45,
							disableDefaultUI: true,
							styles : [{featureType : 'water', stylers : [{lightness : 0}, {saturation : 100}, {hue : '#000000'}, {gamma : 0.2}], elementType : 'geometry'}]
						});
						GeoClick.init(map);	
					});
					
				}, {sensor : 'false'});

			}
		);
	};
};