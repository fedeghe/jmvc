JMVC.extend('xpub',{
	init : function () {
		console.debug('xpub initialized');
		this.xpub.els = ("abort|afterprint|beforeprint|beforeunload|blur|canplay|canplaythrough|change|click|"+
			"contextmenu|dblclick|drag|dragend|dragenter|dragleave|dragover|dragstart|drop|durationchange|emptied|"+
			"ended|error|focus|formchange|forminput|haschange|input|invalid|keydown|keypress|keyup|load|loadeddata|"+
			"loadedmetadata|loadstart|message|mousedown|mousemove|mouseout|mouseover|mouseup|mousewheel|offline|"+
			"online|pagehide|pageshow|pause|play|playing|popstate|progress|ratechange|readystatechangeseeked|redo|"+
			"reset|resize|scroll|seeking|select|stalled|storage|submit|suspend|timeupdate|undo|unload|volumechange|waiting"
		).split('|');
		this.xpub.areas = {};
		
	},
	create : function () {
		var Area,
			debug = false;
		function out(el) {
			debug && JMVC.debug(el);
		}

		Area = function (node) {
			var self = this;
			this.node = node;
			this.map = {};
			this.cbacks = {};
			
			this.binded = false;
			this.listening = true;
			this.bindings = [];
		};

		/**
		 * [ description]
		 * @param  {DOMeventType} eType the target dom event
		 * @param  {string} topic the topic for that event
		 * @return {[type]}       [description]
		 */
		Area.prototype.notify = function (eType, topic) {
			this.map[eType] || (this.map[eType] = []);
			this.map[eType].push(topic);
			return this;
		};

		/**
		 * [ description]
		 * @param  {[type]}   topic [description]
		 * @param  {Function} cb    [description]
		 * @return {[type]}         [description]
		 */
		Area.prototype.listen = function (topic, cb) {
			this.cbacks[topic] || (this.cbacks[topic] = []);
			this.cbacks[topic].push(cb);
			return this;
		};

		/**
		 * [ description]
		 * @return {[type]} [description]
		 */
		Area.prototype.resetListen = function () {
			this.cbacks = {};
			this.binded = false;
			JMVC.each(this.bindings, function (b) {
				JMVC.events.unbind(b.node, b.type);
			});
			this.bindings = [];
			return this;
		};

		/**
		 * [ description]
		 * @return {[type]} [description]
		 */
		Area.prototype.resetNotifications = function () {
			this.map = [];
			this.binded = false;
			return this;
		};

		Area.prototype.reset = function () {
			return this.resetListen().resetNotifications();
		};


		/**
		 * [ description]
		 * @return {[type]} [description]
		 */
		Area.prototype.enable = function () {
			this.listening = true;
			out('(this area is now enabled)');
		};

		/**
		 * [ description]
		 * @return {[type]} [description]
		 */
		Area.prototype.disable = function () {
			this.listening = false;
			out('(this area is now disabled)');
		};


		/**
		 * [ description]
		 * @return {[type]} [description]
		 */
		Area.prototype.bind = function () {

			//console.debug(self.map)
			if (!self.binded) {		
			
				// loop the map
				JMVC.each(self.map, function (topics, eType) {
					
					JMVC.each(topics, function (topic) {
						if (self.cbacks[topic] &&
							self.cbacks[topic] instanceof Array &&
							self.cbacks[topic].length
						) {
							JMVC.each(self.cbacks[topic], function (cback) {
								function f(e) {
									var trg = JMVC.events.eventTarget(e),
										realtrg = e.currentTarget,
										eventType = e.type;
									if (!self.listening) {return false; }
									cback.call(null, {'event' : e, 'node' : trg, 'realtaget' : realtrg});
								}
								JMVC.events.bind(self.node, eType, f);
								self.bindings.push({"node" : self.node, "type" : eType, "function" : f}); 
							});
						}
					});
				});
				this.binded = true;
			}
		};

		function stopBubble(e) {
			e.stopPropagation && e.stopPropagation();
				if (e.cancelBubble != null) {
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
			return ret;
		}
		
		return {
			list : [],
			add : function (node, name) {
				var newarea = new Area(node);
				this.list.push(newarea);
				if (!!name && name.length && !JMVC.xpub.areas[name]) {
					JMVC.xpub.areas[name] = newarea;
				}
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
