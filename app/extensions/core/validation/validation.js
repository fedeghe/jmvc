JMVC.head.addstyle(JMVC.vars.baseurl + '/app/extensions/core/validation/style.css', true);

JMVC.validation = function () {
	
	var messages = {
			'required' : 'field required',
			'nonempty' : 'field should not be empty',
			'color' : 'please enter a color [RRGGBB]',
			'string' : 'field should contain a string',
			'integer' : 'field should contain an integer',
			'email' : 'field should contain a valid email address',
			'checked' : 'field should be checked',
			'url' : 'field should contain a valid url',
			'min' : '%n% is the minimum allowed value',
			'max' : '%n% is the maximum allowed value'
		},
		validate = {
			required : function (v) {
				var ret = true;
				// radio case
				//console.debug(v);
				if (JMVC.dom.isNodeList(v)) {
				//	console.debug('is node')
					for (var i = 0; i < v.length; i++) {
				        if (v[i].checked){
				             return true;
				        }
				    }
				    return false;
				}
				//console.debug('is NOT node')
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
					case 'number':
						return this.number(f);
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
				return v.value.match(/[0-9a-fxA-FX]{6}/);
			},
			string : function (v){
				return !!v.value.trim().length;
			},
			integer : function (v){
				return !!v.value.match(/^[\dE]+$/);
			},
			number : function (v) {
				return !!v.value.match(/^[\d\.E]+$/);
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
				return /http:\/\/[A-Za-z0-9\.-]{3,}\.[A-Za-z]{3}/.test(v);
			}
		};

	function val(elem, index) {
		var el = elem.rules[index],
			res = true,
			tmp;

		if (el.required) {

			tmp = validate.required(elem.element);

			if (!tmp) {
				elem.pushMessage(el.msg, JMVC.validation.messages.required);
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
				elem.pushMessage(el.msg, JMVC.validation.messages[el.type]);
			}
			res &= tmp;
		}

		if (el.min) {
			tmp = validate.min(elem.element, el.min);
			if (!tmp) {
				elem.pushMessage(el.msg, JMVC.validation.messages.min.replace(/%n%/, el.min));
			}
			res &= tmp;	
		}

		if (el.max) {
			tmp = validate.max(elem.element, el.max);

			if (!tmp) {
				elem.pushMessage(el.msg, JMVC.validation.messages.max.replace(/%n%/, el.max));	
			}
			res &= tmp;	
		}

		return res;
	}

	/**
	 * [Element description]
	 * @param {[type]} el [description]
	 */
	function Element(el) {
		this.isNodeList = JMVC.dom.isNodeList(el),
		this.element = el;
		this.notification = false;
		this.message = [];
		this.rules = [];
	}
	/**
	 * [prototype description]
	 * @type {Object}
	 */
	Element.prototype = {
		pushMessage : function (userMessage, defaultMessage) {
			if (userMessage && !(this.message.length)) {
				this.message.push(userMessage);
			} else if (!userMessage) {
				this.message.push(defaultMessage);
			}
		},
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
				res ? this.clear() : this.notify();
			}
			
			if (this.notification) {
				JMVC.dom.attr(this.notification, 'title', this.message.join("\n"));
			}
			return res;
		},
		notify : function () {
			var n = JMVC.dom.create('span', {
				'title' : '',
				'class' : 'jmvc_notify_err'
			}, '?');
			this.notification = n;
			console.debug(this.isNodeList, this.isNodeList ? this.element[this.element.length - 1] : this.element)
			JMVC.dom.insertAfter(n, this.isNodeList ? this.element[this.element.length - 1] : this.element);
		},
		clear : function () {
			if (this.notification) {
				JMVC.dom.remove(this.notification);
				this.notification = false;
			}
		}
	};

	/**
	 * [Validator description]
	 * @param {[type]} o [description]
	 */
	function Validator(o) {
		this.options = o || {};
		this.elements = {};
		this.active = true;
	}
	/**
	 * [prototype description]
	 * @type {Object}
	 */
	Validator.prototype = {
		add : function (el, rule) {
			var nid = JMVC.dom.idize(el);
			if (!(nid in this.elements)) {
				this.elements[nid] = new Element(el);
			}	
			this.elements[nid].add(rule);
			return this;
		},
		remove : function (el, rule) {
			var nid = JMVC.dom.idize(el);
			if (!(nid in this.elements)) {
				throw new Error('element with no rules');
			}
			this.elements[nid].remove(rule);
			return this;
		},
		enableAll : function () {
			this.active = true;
			return this;
		},
		disableAll : function () {
			this.active = false;
			return this;
		},
		enable : function (el, rule) {},
		disable : function (el, rule) {},
		validate : function () {
			if (!this.active) {
				return true;
			}
			var res = true,	
				nid;
			for (nid in this.elements) {
				this.elements[nid].clear();
				res &= this.elements[nid].validate();
			}
			return res;
		}
	};
	
	return {
		create : function (options) {
			return new Validator(options);
		},
		messages : messages,
		get : function (form, name) {
			return form[name];
		}
	};
}();


