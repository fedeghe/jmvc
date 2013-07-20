JMVC.extend('hpub',{
	'init' : function () {
		console.debug('hpub initialized');
	},
	'create' : function () {
		var targetEvents = ['abort', 'blur', 'change', 'click', 'dblclick', 'error', 'focus', 'keydown', 'keypress', 'keyup', 'load', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'reset', 'select', 'submit', 'unload'],
			Area;

		Area = function (node, attrAct, attrPar) {
			var self = this;
			this.node = node;
			this.attrAct = attrAct;
			this.attrPar = attrPar;
			this.map = {};
			this.binded = false;
			this.listening = true;
			this.areas = [];
			this.bindings = [];
			
			
			
			this.listen = function (eventType, func, action) {
				this.map[eventType] || (this.map[eventType] = {});
				if(this.map[eventType]){
					
						this.map[eventType][action] || (this.map[eventType][action] = []);
						this.map[eventType][action].push(func);
					
					console.debug('> listening to real `' + eventType + '` events fired by nodes with an attribute '+attrAct+'="' + action + '|..."');
				}
				return this;
			};
			this.clean = function (eventType, action) {
				if (
					this.map[eventType] &&
					this.map[eventType][action] &&
					this.map[eventType][action]
				) {
					delete this.map[eventType][action];
				}
			};

			this.enable = function () {
				this.listening = true;
				console.debug('(this area is now enabled)');
			}
			this.disable = function () {
				this.listening = false;
				console.debug('(this area is now disabled)');
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
			this.bind = function () {
				if (!self.binded) {		
					JMVC.each(targetEvents, function (el) {

						JMVC.events.bind(node, el, function (e) {
							if (!self.listening) {return false; }

							var trg = JMVC.events.eventTarget(e),
								realtrg = e.currentTarget,
								eventType = e.type,
								act = JMVC.dom.attr(trg, self.attrAct),
								par = JMVC.dom.attr(trg, self.attrPar);

							act = act.length ? act.split('|') : false; 
							
							// par = (par == 'this') ? {'node' : trg, 'event' : e} : par.length ? getParams(par) : false;
							
							// if (!(act && par) || !self.listening) {return false; }

							par = {'event' : e, 'node' : trg, 'realtaget' : realtrg, 'params' : par.length ? getParams(par) : false };
								
							if (!act) {return false; }



							//if (!self.listening) {return false; }


							

							JMVC.each(act, function (a) {
								self.map[eventType] &&
								self.map[eventType][a] &&
								(function (el, p) {
									JMVC.each(el, function (fn) {
										fn.apply(null, [p]);
									});
								})(self.map[eventType][a], par);
							});
						});
					});
					this.binded = true;
				}
			};
			console.debug('added area for ', node , 'using params `'+attrAct+'` and `'+attrPar+'`');
		};
		return {
			'list' : [],
			'add' : function (node, attrAct, attrPar) {
				var newarea = new Area(node, attrAct, attrPar);
				this.list.push(newarea);
				return newarea;
			},
			'disable' : function () {
				JMVC.each(this.list, function (e) {
					e.disable();
				});
			},
			'enable' : function () {
				JMVC.each(this.list, function (e) {
					e.enable();
				});
			}
		};	
	}	
});
