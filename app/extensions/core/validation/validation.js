
JMVC.nsCheck('JMVC.validation');

JMVC.validation = function () {
	
	var messages = {
		nonempty : 'field should not be empty',
		color : 'please enter a color [RRGGBB]',
		string : 'field should contain a string',
		integer : 'field should contain an integer',
		email : 'field should contain a valid email address',
		checked : 'field should be checked',
		url : 'field should contain a valid url'
	}
	
	var validate = {
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
			return !!v.match(/^[\d\.]+$/);
		},
		email : function (v){			
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return null !== v.value.match(re);
		},
		checked : function (v) {
			return v.value.is(':checked');
		},
		url : function () {
			// from http://forums.devshed.com/javascript-development-115/javascript-url-validation-349330.html
			var urlregex = /http:\/\/[A-Za-z0-9\.-]{3,}\.[A-Za-z]{3}/;
			return urlregex.test(valore);
		}
	};
	
	
	function Validator(o) {
		this.options = o || {};
		this.elements = {};
	}
	
	function notify(el) {
		var id = JMVC.dom.attr(JMVC.dom.find(el), 'id');
		JMVC.dom.insertAfter(JMVC.dom.create('span', {"title":"", "class":"jmvc_notify_err"}, '&laquo;'), el);
		//else 
		//	JMVC.dom.remove('#'+id+'_img');

	}
	function clearAll() {
		JMVC.dom.remove(JMVC.dom.find('.jmvc_notify_err'));
	}
	
	function clear(el) {
		var id = JMVC.dom.attr(JMVC.dom.find(el), 'id');
		JMVC.dom.remove(el);
	}
	
	Validator.prototype = {
		
		
		
		add : function (el, rules) {
			if (el in this.elements) {
				
			} else {
				this.elements[el] = rules;
			}
		},
		remove : function (el, rules) {},
		enable : function (el, rules) {},
		disable : function (el, rules) {},
		enableAll : function (el) {},
		disableAll : function (el) {},
		check : function () {
			var res = true,	
				el, i, l, r;
			
			clearAll();
			
			for (el in this.elements) {
				for (i = 0, l = this.elements[el].rules; i < l; i++) {
					if (! this.elements[el].rules[i] in validate) {
						throw new Error('Rule not applicable');
					}
					r = validate[this.elements[el].rules[i]](el);
					(r ? 'clear' : 'notify').call(null, el);
					res &= r;
				}
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


