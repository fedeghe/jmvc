/**
 * Base don the work of Binny
 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
 */

JMVC.extend('key', {
	'all_shortcuts' : {},//All the shortcuts are stored in this array
	'add': function (shortcut_combination, callback, opt) {

		'use strict';

		//Provide a set of default options
		var default_options = {
				'type' : 'keydown',
				'propagate' : false,
				'disable_in_input' : false,
				'target' : JMVC.WD,
				'keycode' : false
			},
			ele,
			dfo,
			func;
			
		if (!opt) {
			opt = default_options;
		} else {
			for (dfo in default_options) {
				if (typeof opt[dfo] === 'undefined') {
					opt[dfo] = default_options[dfo];
				}
			}
		}

		ele = opt.target;
		if (typeof opt.target === 'string') {
			ele = JMVC.WD.getElementById(opt.target);
		}
		//var ths = this;
		shortcut_combination = shortcut_combination.toLowerCase();

		//The function to be called at keypress
		func = function (e) {
			var element,
				character,
				code,
				keys,
				kp,
				shift_nums,
				special_keys,
				modifiers,
				i,
				l,
				k;
			e = e || JMVC.W.event;
			
			if (opt.disable_in_input) {//Don't enable shortcut keys in Input, Textarea fields
				if (e.target) {
					element = e.target;
				} else if (e.srcElement) {
					element = e.srcElement;
				}
				if (element.nodeType === 3) {
					element = element.parentNode;
				}

				if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
					return;
				}
			}

			//Find Which key is pressed
			if (e.keyCode) {
				code = e.keyCode;
			} else if (e.which) {
				code = e.which;
			}
			character = String.fromCharCode(code).toLowerCase();

			if (code === 188) {
				character = ","; //If the user presses , when the type is onkeydown
			}
			if (code === 190) {
				character = "."; //If the user presses , when the type is onkeydown
			}

			keys = shortcut_combination.split("+");
			//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
			kp = 0;

			//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
			shift_nums = {
				"`" : " ~",
				"1" : "!",
				"2" : "@",
				"3" : "#",
				"4" : "$",
				"5" : "%",
				"6" : "^",
				"7" : "&",
				"8" : "*",
				"9" : "(",
				"0" : ")",
				"-" : "_",
				"=" : "+",
				";" : ":",
				"'" : "\"",
				"," : "<",
				"." : ">",
				"/" : "?",
				"\\" : "|"
			};
			//Special Keys - and their codes
			special_keys = {
				'esc' : 27,
				'escape' : 27,
				'tab' : 9,
				'space' : 32,
				'return' : 13,
				'enter' : 13,
				'backspace' : 8,

				'scrolllock' : 145,
				'scroll_lock' : 145,
				'scroll' : 145,
				'capslock' : 20,
				'caps_lock' : 20,
				'caps' : 20,
				'numlock' : 144,
				'num_lock' : 144,
				'num' : 144,

				'pause' : 19,
				'break' : 19,

				'insert' : 45,
				'home' : 36,
				'delete' : 46,
				'end' : 35,

				'pageup' : 33,
				'page_up' : 33,
				'pu' : 33,

				'pagedown' : 34,
				'page_down' : 34,
				'pd' : 34,

				'left' : 37,
				'up' : 38,
				'right' : 39,
				'down' : 40,

				'f1' : 112,
				'f2' : 113,
				'f3' : 114,
				'f4' : 115,
				'f5' : 116,
				'f6' : 117,
				'f7' : 118,
				'f8' : 119,
				'f9' : 120,
				'f10' : 121,
				'f11' : 122,
				'f12' : 123//,
				
				//'mela' : 224
			};

			modifiers = {
				shift : { wanted : false, pressed : false},
				ctrl : { wanted : false, pressed : false},
				alt  : { wanted : false, pressed : false},
				meta : { wanted : false, pressed : false}	//Meta is Mac specific
			};

			if (e.ctrlKey) {
				modifiers.ctrl.pressed = true;
			}
			if (e.shiftKey) {
				modifiers.shift.pressed = true;
			}
			if (e.altKey) {
				modifiers.alt.pressed = true;
			}
			if (e.metaKey) {
				modifiers.meta.pressed = true;
			}

			for (i = 0, l = keys.length; k = keys[i], i < l; i += 1) {

				switch (k) {
				case 'ctrl':
				case 'control':
					kp += 1;
					modifiers.ctrl.wanted = true;
					break;
				case 'shift':
					kp += 1;
					modifiers.shift.wanted = true;
					break;
				case 'alt':
					kp += 1;
					modifiers.alt.wanted = true;
					break;
				case 'meta':
					kp += 1;
					modifiers.meta.wanted = true;
					break;
				default:
					if (k.length > 1) { //If it is a special key
						if (special_keys[k] === code) {
							kp += 1;
						}

					} else if (opt.keycode) {
						if (opt.keycode === code) {
							kp += 1;
						}

					} else { //The special keys did not match
						if (character === k) {
							kp += 1;
						} else {
							if (shift_nums[character] && e.shiftKey) {//Stupid Shift key bug created by using lowercase
								character = shift_nums[character];
								if (character === k) {
									kp += 1;
								}
							}
						}
					}
					break;
				}

			}

			if (kp === keys.length &&
						modifiers.ctrl.pressed === modifiers.ctrl.wanted &&
						modifiers.shift.pressed === modifiers.shift.wanted &&
						modifiers.alt.pressed === modifiers.alt.wanted &&
						modifiers.meta.pressed === modifiers.meta.wanted) {
				callback(e);

				if (!opt.propagate) {
					JMVC.events.kill(e);
				}
			}
		};
		this.all_shortcuts[shortcut_combination] = {
			'callback' : func,
			'target' : ele,
			'event' : opt.type
		};
		//Attach the function with the event
		JMVC.events.bind(window, opt.type, func);
	},

	//Remove the shortcut - just specify the shortcut and I will remove the binding
	'remove' : function (shortcut_combination) {

		'use strict';

		var binding,
			type,
			ele,
			callback;
		shortcut_combination = shortcut_combination.toLowerCase();
		binding = this.all_shortcuts[shortcut_combination];
		delete this.all_shortcuts[shortcut_combination];
		if (!binding) {
			return;
		}
		type = binding.event;
		ele = binding.target;
		callback = binding.callback;

		JMVC.events.unbind(window, type);
		ele['on' + type] = false;
	}
});

