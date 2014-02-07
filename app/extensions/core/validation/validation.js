JMVC.head.addstyle(JMVC.vars.baseurl + '/app/extensions/core/validation/style.css', true);

JMVC.validation = function () {
	
	var messages = {
			required : 'field required',
		    nonempty : 'field should not be empty',
		    color : 'please enter a color [RRGGBB]',
		    'string' : 'field should contain a string',
		    integer : 'field should contain an integer',
		    email : 'field should contain a valid email address',
		    checked : 'field should be checked',
		    url : 'field should contain a valid url',
		    min : '%n% is the minimum allowed value',
		    max : '%n% is the maximum allowed value'
		},
		validate = {
			required : function (v) {
				var ret = true;
				switch (v.type) {
					case 'checkbox':
						ret &= v.checked;
					break;
					default :
						ret &= !!v.value.trim().length;
				}
				return ret;
			},
			checkType : function (f, type) {
				switch (type) {
					case 'email':
						return this.email(f);
					case 'integer':
						return this.integer(f);
					default :
						return ({}).toString.call(f.value).match(/\s([a-zA-Z]+)/)[1].toLowerCase() == type;
				}
			},

			min : function (f, v) {
				return f.value && f.value >= v;
			},
			max : function (f, v) {
				return f.value && f.value <= v;
			},

			nonempty : function (m) {
				return !!m.value.trim().length;
			},
			color : function (v) {
				return (v.value.length == 6) && valore.match(/[0-9a-fxA-FX]{6}/);
			},
			string : function (v){
				return !!v.value.trim().length;
			},
			integer : function (v){
				return !!v.value.match(/^[\d\.]+$/);
			},
			email : function (v){			
				var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return null !== v.value.match(re);
			},
			checked : function (v) {
				return v.checked;
			},
			url : function (v) {
				// from http://forums.devshed.com/javascript-development-115/javascript-url-validation-349330.html
				var urlregex = /http:\/\/[A-Za-z0-9\.-]{3,}\.[A-Za-z]{3}/;
				return urlregex.test(v);
			}
		};
	
	function notify(El) {
		var n = JMVC.dom.create('span', {
			'title':'',
			'class':'jmvc_notify_err'
		}, '?');
		El.notification = n;
		JMVC.dom.insertAfter(n, El.element);
	}
	
	function clear(El) {
		if (El.notification) {
			JMVC.dom.remove(El.notification);
			El.notification = false;
		}
	}

	function Element(el) {
		this.element = el;
		this.notification = false;
		this.message = [];
		this.rules = [];
	}

	function pushMessage(elementMessages, userMessage, defaultMessage) {
		if (userMessage && !(elementMessages.length)) {
			elementMessages.push(userMessage);
		} else if (!userMessage) {
			elementMessages.push(defaultMessage);
		}
	}


	function val(elem, index) {
		var el = elem.rules[index],
			res = true,
			tmp;
		if (el.required) {
			tmp = validate.required(elem.element);
			if (!tmp) {
				pushMessage(elem.message, el.msg, messages.required);
				//elem.message.push(el.msg || messages.required);
			}
			res &= tmp;
		} else {
			//if empty ...do not validate 
			if (! validate.nonempty(elem.element)) {
				return true;
			}
		}

		if (el.type) {
			tmp = validate.checkType(elem.element, el.type);
			if (!tmp) {
				//elem.message.push(el.msg || messages[el.type]);
				pushMessage(elem.message, el.msg, messages[el.type]);
			}
			res &= tmp;
		}
		if (el.min) {

			tmp = validate.min(elem.element, el.min);
			if (!tmp) {
				//elem.message.push(el.msg || messages.min.replace(/%n%/, el.min));
				pushMessage(elem.message, el.msg, messages.min.replace(/%n%/, el.min));
			}
			res &= tmp;	
		}
		if (el.max) {
			tmp = validate.max(elem.element, el.max);

			if (!tmp) {
				//elem.message.push(el.msg || messages.max.replace(/%n%/, el.max));
				pushMessage(elem.message, el.msg, messages.max.replace(/%n%/, el.max));	
			}
			res &= tmp;	
		}
		/*
		if (rule.match) {
			res &= validate.checkMatch(el, rule.match);
		}
		if (rule.min) {
			res &= validate.checkMin(el, rule.min);
		}
		if (rule.max) {
			res &= validate.checkMin(el, rule.max);
		}*/
		return res;
	}
	
	Element.prototype = {
		add : function (rule) {
			if (JMVC.array.find(this.rules, rule) < 0) {
				this.rules.push(rule);
			}
		},
		remove : function (rule) {
			var i = JMVC.array.find(this.rules, rule);
			if (i >= 0) {
				JMVC.array.remove(this.rules, rule);
			}
		},
		validate : function () {
			var res = true,
				i, l;

			//reset element messages
			this.message.length = 0;

			for (i = 0, l = this.rules.length; i < l; i++) {
				res &= val(this, i);
			}

			if (!this.notification) {
				(res ? clear : notify).call(null, this);
			}
			
			if (this.notification) {
				JMVC.dom.attr(this.notification, 'title', this.message.join(', '));
			}
			return res;
		}
	};

	function Validator(o) {
		this.options = o || {};
		this.elements = {};
		this.active = true;
	}

	Validator.prototype = {
		add : function (el, rule) {
			var nid = JMVC.dom.idize(el);

			if (!(nid in this.elements)) {
				this.elements[nid] = new Element(el);
			}	
			this.elements[nid].add(rule);
		},
		remove : function (el, rule) {
			var nid = JMVC.dom.idize(el);
			if (!(nid in this.elements)) {
				throw new Error('element with no rules');
			}
			this.elements[nid].remove(rule);
		},

		enableAll : function () {this.active = true; },
		disableAll : function () {this.active = false; },

		enable : function (el, rule) {
			
		},
		disable : function (el, rule) {
			
		},
		
		validate : function () {
			if (!this.active) {
				return true;
			}
			var res = true,	
				nid;
			for (nid in this.elements) {
				clear(this.elements[nid]);
				res &= this.elements[nid].validate();
			}
			return res;
		}
	};
	
	return {
		create : function (options) {
			return new Validator(options);
		}
	};
}();


