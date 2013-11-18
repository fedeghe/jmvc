JMVC.extend('zpub',{
	init : function () {
		console.debug('zpub initialized');
		this.zpub.els = ("abort|afterprint|beforeprint|beforeunload|blur|canplay|canplaythrough|change|click|"+
			"contextmenu|dblclick|drag|dragend|dragenter|dragleave|dragover|dragstart|drop|durationchange|emptied|"+
			"ended|error|focus|formchange|forminput|haschange|input|invalid|keydown|keypress|keyup|load|loadeddata|"+
			"loadedmetadata|loadstart|message|mousedown|mousemove|mouseout|mouseover|mouseup|mousewheel|offline|"+
			"online|pagehide|pageshow|pause|play|playing|popstate|progress|ratechange|readystatechangeseeked|redo|"+
			"reset|resize|scroll|seeking|select|stalled|storage|submit|suspend|timeupdate|undo|unload|volumechange|waiting"
		).split('|');
		this.zpub.areas = {};
		
	},
	create : function (attr) {
		var Area,
			debug = false;
		function out(el) {
			debug && JMVC.debug(el);
		}

		Area = function (node) {
			var self = this;
			this.node = node;
			this.attr = attr || 'data-id';
			this.map = {};
			this.cbacks = {};
			this.binded = false;
			this.listening = true;
			this.bindings = [];
			//this.areas = [];
			
			// JMVC.each(targetEvents, function (e) {
			// 	self.map[e] = {};
			// });
			
			this.notify = function (eType, topic) {
				this.map[eType] || (this.map[eType] = []);
				this.map[eType].push(topic);
				return this;
			};

			this.listen = function (topic, id, cb) {
				this.cbacks[topic] || (this.cbacks[topic] = {});
				this.cbacks[topic][id] || (this.cbacks[topic][id] = []);
				this.cbacks[topic][id].push(cb);
				return this;
			};

			this.resetListen = function () {
				this.cbacks = {};
				this.unbind();
				return this;
			};
			this.resetNotifications = function () {
				this.map = [];
				this.binded = false;
				return this;
			};
			this.reset = function () {return this.resetListen().resetNotifications(); };
			this.enable = function () {this.listening = true; return this; }
			this.disable = function () {this.listening = false; return this; }

			this.unbind = function () {
				this.binded = false;
				JMVC.each(this.bindings, function (b) {
					JMVC.events.unbind(b.node, b.type);
				});
				this.bindings = [];
			};

			this.bind = function (swi) {

				if (!self.binded) {		
					// loop the map
					JMVC.each(self.map, function (topics, eType) {

						JMVC.each(topics, function (topic) {

							if (self.cbacks[topic]) {

								JMVC.each(self.cbacks[topic], function (cbacks, id) {

									JMVC.each(cbacks, function (cback) {
										
										function f(e) {
											if (!self.listening) {return false; }	
											var trg = JMVC.events.eventTarget(e),
												realtrg = e.currentTarget,
												eventType = e.type,
												a = (JMVC.dom.attr(trg, self.attr) || '').split('|');

											//if (a === id) {
											
											if (JMVC.array.inArray(a, id) >= 0) {
												cback.call(null, {'event' : e, 'node' : trg, 'realtaget' : realtrg});
											} else {
												console.debug('no is match: '+ a + ' | ' + id);
											}
										}
										JMVC.events.bind(self.node, eType, f);
										self.bindings.push({"node" : self.node, "type" : eType, "function" : f}); 
									});
								});
							}
						});
					});
					this.binded = true;
				}
			};



			function stopBubble(e) {
				//console.debug('stopping bubble for ', e);
				
				if (e.stopPropagation) {
					e.stopPropagation();
				}
 				if (e.cancelBubble!=null) {
 					e.cancelBubble = true;
 				}
			}
			function getParams(att) {

				var ret = {},
					spl = att.split('|');

				if (!!att) {
					JMVC.each(spl, function (el) {
						var d = el.split(':');
						ret[d[0]] = d[1];
					});
				}
				//console.debug(ret)
				return ret;
			} 	
			
			
		};
		return {
			list : [],
			add : function (node, name) {
				var newarea = new Area(node);
				this.list.push(newarea);
				if(!!name && name.length && !JMVC.zpub.areas[name])JMVC.zpub.areas[name] = newarea;
				return newarea;
			},
			disable : function () {
				JMVC.each(this.list, function (e) {
					e.disable();
				});
			},
			enable : function () {
				JMVC.each(this.list, function (e) {
					e.enable();
				});
			}
		};	
	}	
});
