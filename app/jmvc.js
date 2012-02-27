/*
       ___     ____  __  ____ 
      (_) \   / /  \/  |/ ___|
      | |\ \ / /| |\/| | |    
      | | \ V / | |  | | |___ 
     _/ |  \_/  |_|  |_|\____|
    |__/                      

Description: jmvc module


Author: Federico Ghedina
Version: 0.1
Date : 26-01-2012


*/

(function () {
	
	'use strict';
	
	var JMVC = (
		function () {
			
			var url,	/* current url */
				route,	/* returning JMVC object */
				basic_inherit,	/* minimal dummy function for granting basic inheritance */				
				dispatched,	/* literal to contain url mvc components */
				Controller, Model, View, /* MVC objects constructors */
				extend, /* basic function to add modules */	
				load_ext, /* function to load modules on demand */
				Modules = [], /* modules to load always, none */
				pathname_allowed_extensions = ['html','htm','jmvc','j','mvc','fg'];

			/*
			**************
			* CONTROLLER *
			**************
		    */
			/* parent controller */
			Controller = function () {};
			
			/* for storing url vars */
			Controller.prototype.vars = {};
			Controller.prototype.index = function () {alert('Default index action'); };
			Controller.prototype.relocate = function (uri) {document.location.href = '' + uri; };
			Controller.prototype.render = function(content,cback) {
				var tmp_v = new View(content);
				tmp_v.render(typeof cback === 'function'?{cback:cback} : null);
				return this;
			};
			Controller.prototype.reset = function() {this.vars = {};return this; };
			Controller.prototype.require = function() {
				var exts = arguments;
				for(var i = 0, l=exts.length ; i<l ; i++) {
					JMVC.io.get(
						'/app/extensions/'+exts[i]+'.js',
						function cback(res) {
							eval(res); /* ##################### */
						}
					);
				}
			};
			

			/*
			*********
			* MODEL *
			*********
		    */
			Model = function () {};
			Model.prototype.vars = {};
			Model.prototype.reset = function() {this.vars = {};return this; };
			Model.prototype.constructor = 'model';	
	

			/*
			********
			* VIEW *
			********
		    */
			/* directly instantiated assinging content */
			View = function (cnt) {
				this.ocontent = cnt || 'content'; /*original content*/
				this.content = cnt || 'content';
				this.vars = {
					'baseurl':JMVC.vars.baseurl
				};
			};
			
			/*
			 * meat to pass a model, all %name%
			 * placeholders in the view content
			 * will be replaced with the model
			 * variable value if exists
			 */
			View.prototype.parse = function(obj) {
				if(obj) {
					for(var j in obj.vars) {
						this.content = this.content.replace('$'+j+'$', obj.get(j));
					}
				}
				// jmvc parse
				for(var j in JMVC.vars) {
					this.content = this.content.replace('$'+j+'$', JMVC.vars[j]);
				}
				return this; /* allow chain */
			};
			
			/*
			 * reset content to orginal (unparsed) value
			 * and reset all vars
			 */
			View.prototype.reset = function() {
				this.content = this.ocontent;
				this.vars = {};
				return this;
			};
			
			/*
			 * render the view parsing for variable&view placeholders
			 */
			View.prototype.render = function() {
				
				var arg = arguments[0] || {},
					cback = arg.cback || false,	/* maybe a callback is passed */
					argz = arg.argz || null,	/* and maybe some args must be passed to the callback */
					
					/* You may specify a string with an id,
					 * that's where the content will be loaded,
					 * note that here dom is not loaded so you
					 * cannot pass an element
					 */
					target = arg.target || false,
					that = this,	/* for binding this context in the callback */
					cont = that.content,	/* the view content */
					patt = new RegExp("{{(.[^\\$}]*)}}",'gm'),	/* for hunting view placeholders */
					pattpar = new RegExp("\\s(.[A-z]*)=`(.[^/`]*)`",'gm'),	/* for getting explicit params passed within view placeholders */
					pattvar = new RegExp("\\$(.[^\\$}]*)\\$",'gm'),	/* for variables */
					res,		/* results of view hunt */
					resvar,		/* variables found */
					myview,		/* the view instance */
					tmp1, tmp2,	/* two temporary variables for regexp results */
					i=0, t, k,	/* some loop counters */
					limit=100,	/* recursion limit for replacement */
					viewname,	/* only the view name */
					orig,		/*original content of {{}} stored for final replacement*/
					register;	/* to store inner variables found in the placeholder */
					
				while (true && i++<limit) {
					res = patt.exec(cont);
					if (res) {
						
						viewname = orig = res[1];
						
						register = false;
						
						/* got params within ? */
						if(pattpar.test(res[1])) {
							/* register becomes an object and flags result for later check */
							register = {};
							
							/* get only the view name, ingoring parameters*/
							tmp2  = (new RegExp("^(.[A-z]*)\\s")).exec(res[1]);
							viewname = tmp2[1];
							
							tmp2 = res[1];
							while (true) {
								/* this is exactly pattpar but if I use it does not work */
								tmp1 = (new RegExp("\\s(.[A-z]*)=`(.[^/`]*)`",'gm')).exec(tmp2);
								
								if (tmp1) {
									/* add to temporary register */
									register[tmp1[1]] = tmp1[2];
									tmp2 = tmp2.replace(' '+tmp1[1]+'=`'+tmp1[2]+'`', "" );
								}else{
									break;
								}
							}
						}
						
						/* if not loaded give an alert */
						if (!JMVC.views[viewname]) {
							/* here the view is requested but not explicitly loaded with the JMVC.getView method.
							 * You should use that method, and you'll do for sure if You mean to use View's variable
							 * but if You just load a view as a simple chunk with {{myview}} placeholder inside another one
							 * then JMVC will load it automatically (take care to not loop, parsing stops after 100 subsitutions)
							 */
							/*
							alert('`'+viewname+'` view not loaded.\nUse Factory in the controller to get it. \n\njmvc will'+
								' load it for you but variables are\n lost and will not be replaced.');
							*/
							JMVC.factory('view',viewname);
						} 
						myview = JMVC.views[viewname];
						
						/*
						 * in case there are some vars in placeholder
						 * register will hold values obtained above
						 * and we give'em to the view, the parse method
						 * will do the rest
						 */
						if(register !== false) {
							for(k in register) {
								myview.set(k, register[k]);
							}
						}
	
						/*
						 * before view substitution,
						 * look for variables
						 */
						while (true) {
							tmp1 = pattvar.exec(myview.content);
							if (tmp1) {
								myview.content = myview.content.replace('$'+tmp1[1]+'$', myview.get(tmp1[1]) );
							}else{
								break;
							}
						}
						/* now the whole view */
						cont = cont.replace('{{'+orig+'}}', myview.content);					
					}else{
						break;
					}
				}

				/* look for / substitute  vars
				 * in the main view
				 */
				while (true) {
					resvar = pattvar.exec(cont);
					if (resvar) {
						t = this.get(resvar[1]);	
						cont = cont.replace('$'+resvar[1]+'$', t  );
					} else {
						break;
					}
				}			
				that.content = cont;			
				JMVC.events.bind(window, 'load', function () {
						var targ = (typeof target === 'string' && document.getElementById(target))	?
							document.getElementById(target)	:	document.body ;
						JMVC.dom.html(targ, that.content);
						/* may be a callback? */
						if (cback) {
							argz = !!argz ? argz : [];							
							cback.apply(this, argz);
						}
					}				
				);
				return this; /* allow chain */
			};
			
			//for basic inheritance
			basic_inherit = function(Child, Parent) {				
				Child.prototype = new Parent();			   
			};
			
			// for extending with modules
			extend = function() {
				var target = arguments[0];				
				if(! route[target]) {route[target] = {}; }				
				var arr_func_obj = arguments[1] || {};				
				for(var i in arr_func_obj) {
					/* it won`t let You override */
					if(typeof route[target][i] === 'undefined' && typeof arr_func_obj[i] === 'function') {
						if(typeof arr_func_obj[i] === 'function') {
							route[target][i] = arr_func_obj[i];
						}
					}
				}				
			};


			/*
			 * getter, setter and "deleter" for mvc classes
			 */
			View.prototype.get = Model.prototype.get = Controller.prototype.get = function (vname) {
				return ( !! this.vars[vname]) ? this.vars[vname] : false;
			};
			View.prototype.set = Model.prototype.set = Controller.prototype.set = function (vname, vval, force) {
				var i ;
				switch(typeof vname) {
					case 'string':
						if(!this.vars[vname] || force) {this.vars[vname] = vval; }
					break;
					case 'object':
						for(i in vname) {
							if(!this.vars[i] || vval || force) {this.vars[i] = vname[i]; }
						}
					break;
				}
				 return this;
			};
			View.prototype.del = Model.prototype.del = Controller.prototype.del = function (vname) {
				if( !! this.vars[vname] ) {delete this.vars[vname]; }
			};



			
			/* ensure ucfirst controller name */
			var normalize = function(n) {return n.charAt(0).toUpperCase() + n.substr(1).toLowerCase(); };


			/* type can be only 'view' or 'model' */
			function factory_method(type, ename) {
				var path_absolute = '/app/'+type+'s/'+ename, r;
				switch(type) {
					case 'view':path_absolute += '.html';break;
					case 'model': case 'controller':path_absolute += '.js';break;
					default:type = false;break;
				}
				if(!type) {return false; }
				/* ajax get script content and return it */
				return get(path_absolute, type, ename);
				/* return type=='view' ? JMVC.views[name] : r; */
			}
			

			/* instance new view content or eval a model or controller */
			function get(path, type, name) {
				
				var ret = false, o;
				
				switch(true) {
					case type==='view' && typeof JMVC.views[name] == 'function':
						ret = JMVC.views[name];
					break;
					case type==='model' && typeof JMVC.models[name] == 'function':
						o = new JMVC.models[name]();
						o.vars = {};
						ret = o;
					break;
					default :
						JMVC.io.get(
							path,
							//type,
							function cback(res) {
								switch(type) {
									case 'view':
										JMVC.views[name] = new View(res);
										ret =  JMVC.views[name];
									break;
									case 'controller':
										res = res.replace(/^(\s*)\/\/(.*)[\n]/g,'/*$1*/\n');
										eval(res); /* ##################### */
										basic_inherit(JMVC[type+'s'][name], Controller);
									break;
									case 'model':
										eval(res); /* ##################### */
										basic_inherit(JMVC[type+'s'][name], Model);
										o = new JMVC.models[name]();
										o.vars = {};
										ret = o;
									break;
								}
							}
						);
					break;
				}
				return ret;
			}

			/*
			 * Dispatch url getting controller, action and parameters
			 */
			dispatched = (function dispatch() {
				var l = document.location,
					mid = {
						url : l.protocol+'//'+l.hostname+l.pathname+l.search,
						proto : l.protocol, 
						host : l.hostname,
						path : l.pathname,
						hash : l.search
					},
					url = mid,
					
					/* adjust extensions, them all*/
					els = mid.path.replace(new RegExp('.'+pathname_allowed_extensions.join('|.')), '').substr(1).split('/'),
								
					controller = els.shift() || 'index',
					action = els.shift() || 'index',
					params = {}, /* extra params */
					lab_val,
					ret,
					i,len=els.length;
				
				/* now if els has non zero size, these are extra path params*/
				for(i = 0; i+1 < len;i+=2) {
					params[els[i]] = els[i+1];
				}

				/* even hash for GET params */
				if(mid.hash !== '') {
					/* spliting an empty string give
					 * an array with one empty string
					 */
					els = mid.hash.substr(1).split('&');
					
					for(i = 0, len = els.length; i<len; i++) {
						lab_val = els[i].split('=');
						/* do not override extra path params */
						if(!params[lab_val[0]]) {
							params[lab_val[0]] = lab_val[1];
						}
					}
				}
				ret = {
					controller : controller.replace(/\//g,''),
					action : action.replace(/\//g,''),
					params : params,
					baseurl : l.protocol+'//'+l.hostname
				};
				ret.controller = normalize(ret.controller);
				
				return ret;
			})();



			/* render function */
			function render() {

				var controller, i;

				/* "import" the controller (eval ajax code) */
				JMVC.factory('controller',route.c);

				/* if the constructor has been evalued correctly */
				if(JMVC.controllers[route.c]) {

					/* grant basic ineritance from parent Controller */
					basic_inherit(JMVC.controllers[route.c], Controller);

					/* make an instance */
					controller = new JMVC.controllers[route.c]();
					
					/* manage routes */
					if(controller['_routes']) {
						route.a = controller['_routes'][route.a] || route.a;
					}

					for(i in route.p) {
						controller.set(i,  decodeURI(route.p[i]) );
					}

					/* call action */
					if(controller[route.a] && typeof controller[route.a] === 'function') {
						controller[route.a]();
					}else{
						document.location.href = '/404/msg/act/'+route.a;
					}
				}else{
					document.location.href = '/404/msg/cnt/'+route.c;
				}

			}


			
			/* setter unsetter JMVC vars */
			function set(name, content){
				JMVC.vars[name] = content;
			}
			function del(name){
				if(JMVC.vars[name]){delete JMVC.vars[name];}
			}
			/*
			 *DO NOT return directly, route is used above
			 */
			route = {
				c : dispatched.controller || 'index',
				a : dispatched.action || 'index',
				p : dispatched.params || {},
				
				controllers : {},
				models : {},
				views : {},

				vars :{
					baseurl:	dispatched.baseurl
				},
				set : set,
				del : del,
				
				render:		render,
				factory:	factory_method,
				extend : extend,
				modules : Modules,
				
				parse: function(content){
					// jmvc parse
					for(var j in JMVC.vars) {
						content = content.replace(new RegExp("\\$"+j+"\\$", 'g'), JMVC.vars[j]);
					}
					return content;
				},
				
				getView :	function(n) {return factory_method('view', n); },
				getModel :	function(n) {return factory_method('model', n); },
				getController :	function(n) {return factory_method('controller', n); }
			};
			/* return JMVC */
			return route;
		}
	)();
	
	/*
	ajax utility
	*/
	JMVC.io = {
		
		/* requests pool */
		x : [],
		
		get : function(u, cback, p, sync) {
			
			var id = JMVC.io.x.length;
			var IEfuckIds = ['MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'],
			/* be synchronous, otherwise eval is late */
				dosync = sync || false;
			
			try {
				JMVC.io.x[id] = new XMLHttpRequest();
			}catch (e) {
				try{
					for (var i = 0, len = IEfuckIds.length; i < len; i++) {
						try{JMVC.io.x[id] = new ActiveXObject(IEfuckIds[i]); }catch(e) {} 
					}
				}catch (e) {}
			}

			JMVC.io.x[id].onreadystatechange=function() {
				if(JMVC.io.x[id].readyState==4 && JMVC.io.x[id].status==200 && cback) {
					cback(JMVC.io.x[id].responseText);
				}
				return '';
			};
			if(p) {
				try{
					JMVC.io.x[id].open('POST',u,dosync);
					JMVC.io.x[id].setRequestHeader('Content-type','application/x-www-form-urlencoded');
					if (JMVC.io.x[id].overrideMimeType) {JMVC.io.x[id].setRequestHeader("Connection", "close"); }
					JMVC.io.x[id].send(p);
				}catch(e) {}
			}else{
				try{
					JMVC.io.x[id].open('GET',u,dosync);
					JMVC.io.x[id].send(null);
				}catch(e) {}
			}
			return JMVC.io.x[id].responseText;
		}
	};	

	JMVC.basic_inherit = function() {
		var what = arguments[0],
			arr_func_obj = arguments[1] || {};
		for(var i in arr_func_obj) {

			if(typeof what[i] === 'undefined' && (typeof arr_func_obj[i] === 'function' || typeof arr_func_obj[i] === 'object' )) {

				switch(true) {
					case typeof arr_func_obj[i] === 'function' :
						what.method(i,arr_func_obj[i]);
					break;
					case typeof arr_func_obj[i] === 'object' :
						j[i] = arr_func_obj[i];
					break;
					default:break;
				}

			}
		}
	};

	/*
	 * inner html utility
	 */
	JMVC.dom = {
		append : function(where, what) {
			where.appendChild(what);
		},
		create : function(tag, attrs, inner) {
			var node = document.createElement(tag);
			attrs = attrs || {};
			for(var att in attrs) {
				node.setAttribute(''+att, ''+attrs[att]);
			}
			if(typeof inner !== 'undefined') {
				this.html(node, inner);
			}
			return node;
		},
		/* create and append */
		add : function(where, tag, attrs, inner) {
			this.append(where, this.create(tag,attrs,inner));
		},
		html : function(el, html) { 
			var t = ""; 
			if(typeof html !== 'undefined') {
				el.innerHTML = html;
				return this;
			}else{
				t = (el.nodeType === 1) ? el.innerHTML : el;
			}
			return t.trim(); 
		}
	};

	/*
	 * basic event utility
	 */
	JMVC.events = {
		bindings :{},
		onedone : false,
		bind : function(el,tipo,fun) { 
			if (window.addEventListener) { 
				el.addEventListener(tipo, fun, false); 
			}else if (window.attachEvent) {
				var f = function() {fun.call(el, window.event)};
				el.attachEvent('on'+tipo, f)
			}else{
				el['on'+tipo] = function() {fun.call(el, window.event)};
			}
			if(!this.bindings[el]){this.bindings[el]={};}
			this.bindings[el][tipo] = fun;
		},
		unbind : function(el, tipo){			
			if(el == null)return;
			if(el.removeEventListener){
				el.removeEventListener(tipo, this.bindings[el][tipo], false);
			}else if(el.detachEvent){
				el.detachEvent("on" + tipo, this.bindings[el][tipo]);
			}
			delete this.bindings[el][tipo];			
		},
		one : function(what, type, fn) {
			var newf = function() {if(! this.onedone)fn();this.onedone = true; };
			this.bind(what,type, newf);
		},		
		ready : function(func) {
			return this.bind(window, 'load',func);
		}
	};
	JMVC.util = {
		isSet : function(e) {return typeof e !== 'undefined'; },
		in_array : function(arr, nome) {
			var res = -1;
			for(var i = 0, len = arr.length; i<len; i++) {
				if(nome === arr[i]) {res = i;break; }
			}
			return res;
		},
		is_array : function(o) {
			return o instanceof Array;
		},
		istypeOf : function(el, type) {
			return typeof el === type;
		},
		gettype : function(el) {
			return typeof el;
		},
		padme : function(val,el,pos,len) {
			len = len || 2;
			while((val+'').length<len) {
				switch(pos) {
					case 'pre':
						val = ''+el+val;
					break;
					case 'post':
						val = ''+val+el;
					break;
				}
			}
			return val;
		},
		rand : function(min,max) {
			return min+Math.floor(Math.random()*(max-min + 1));
		}
	};

	JMVC.head = {
		addscript: function(src, parse) {
			
			var script, head, tmp, that = this, postmode = true, async = true;
			if(parse){
				/* get css content, async */
				tmp = JMVC.io.get(src, function(script_content){
					script_content = JMVC.parse(script_content);
					script = JMVC.dom.create('script', {type:'text/javascript'}, script_content);
					head = that.element;
					head.appendChild(script);
				}, postmode, async);				
			}else{
				script = JMVC.dom.create('script', {type:'text/javascript',src:src}, ' ');
				head = this.element;
				head.appendChild(script);
			}
		},
		addstyle : function(src, parse) {
			var style, head, tmp, that = this, postmode = true, async = true;
			if(parse){
				/* get css content, async */
				tmp = JMVC.io.get(src, function(csscontent){
					csscontent = JMVC.parse(csscontent);
					style = JMVC.dom.create('style', {type:'text/css'}, csscontent);
					head = that.element;
					head.appendChild(style);
				}, postmode, async);				
			}else{
				style = JMVC.dom.create('link', {type:'text/css', rel:'stylesheet', href:src});
				head = this.element;
				head.appendChild(style);
			}
			
		},
		title : function(t) {
			if(! t ) {return document.title; }
			document.title = t;
			return true;
		},
		element : document.getElementsByTagName('head').item(0)
	};


	/* Basic Function extension to add a method to an object function */
	Function.prototype.method = function (name, fn) {
		if (name instanceof Array) {
			for (var n in name) {
				this.method(n, name[n]);
			}
		}
		this.prototype[name] = fn;
		return this;
	};
	
	/* before rendering, load requested extensions (must be set in the Modules var and the file must be in the extensions folder) */
	if(JMVC.modules.length > 0) {
		//aj load and eval
		for(var i = 0, l=JMVC.modules.length ; i<l ; i++) {
			JMVC.io.get(
				'/app/extensions/'+JMVC.modules[i]+'.js',
				function cback(res) {
					eval(res); /* ##################### */
				}
			);
		}
	}
	
	
	/*
	 *
	 * EXPOSE ?
	 * 
	 */
	// window.JMVC = JMVC;
	
	
	/*
	 *
	 * now render
	 * 
	 */
	JMVC.render();	

})();
