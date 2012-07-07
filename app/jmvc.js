/* 
 JMVC Javascript module
Version: 0.5
Date : 15-06-2012
Copyright (c) 2008, Federico Ghedina <fedeghe@gmail.com>
All rights reserved.

This code is distributed under the terms of the BSD licence

Redistribution and use of this software in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions
	and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of
	conditions and the following disclaimer in the documentation and/or other materials provided
	with the distribution.
* The names of the contributors to this file may not be used to endorse or promote products
	derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/


(function (W) {	
	
	// this is due !!! :D 
	'use strict';
	
	var JMVC = (
		function () {
						
			//			returning object, will be JMVC
			var $jmvc,
			
			//			literal to contain url mvc components
			dispatched,
			
			//			MVC objects constructors
			Controller,
			Model,
			View,
			
			//			modules to load always, none
			Modules = [],
			
			//			set here your crazy ones
			url_allowed_extensions = ['html','htm','jsp','php','js','jmvc','j','mvc','fg'],
			
			//			hooks
			hooks={},
			
			jmvc_default = {
				controller : 'index', 
				action : 'index'
			},
			
			//			get initial time
			time_begin = new Date,
			
			//			make jmvc public with ?exp=true ?
			make_public = false;
			
			
			
			
			
			//			***********
			//			CONTROLLER 
			//			***********
		   
			//			parent controller
			Controller = function () {};
			
			//			for storing url vars 
			Controller.prototype.vars = {};
			Controller.prototype.index = function () {
				alert('Default index action');
			};
			Controller.prototype.relocate = function (uri, ms) {
				W.setTimeout(
					function(){
						document.location.href = '' + uri;
					}, ~~(1 * ms) || 0
					);
			};
			Controller.prototype.render = function(content, cback) {
				var tmp_v = new View(content);
				tmp_v.render(typeof cback === 'function'?{
					cback :cback
				} : null);
				return this;
			};
			Controller.prototype.reset = function() {
				this.vars = {};
				
				return this;
			};


			//			******
			//			MODEL
			//			******
			Model = function () {};
			Model.prototype.vars = {};
			Model.prototype.reset = function() {
				this.vars = {};
				
				return this;
			};
			Model.prototype.constructor = 'model';

			//			********
			//			* VIEW *
			//			********

			//			directly instantiated assinging content
			View = function (cnt) {
				//				original content
				this.ocontent = cnt || 'content'; 
				this.content = cnt || 'content';
				this.vars = {
					'baseurl':$jmvc.vars.baseurl
				};
			};
			
			
			//			meat to receive a model, all $name$
			//			placeholders in the view content
			//			will be replaced with the model
			//			variable value if exists
			View.prototype.parse = function(obj) {
				var j;
				if(obj) {
					for(j in obj.vars) {
						this.content = this.content.replace('$'+j+'$', obj.get(j));
					}					
				}
				//				now jmvc parse vars
				for(j in $jmvc.vars) {
					this.content = this.content.replace('$'+j+'$', $jmvc.vars[j]);
				}
				
				//				allow chain
				return this;
			};
			
			
			//			reset content to orginal (unparsed) value
			//			and reset all vars
			View.prototype.reset = function() {
				this.content = this.ocontent;
				this.vars = {};
				//				allow chain
				return this;
			};
			
			
			View.prototype.set_from_url = function(vname, alt){
				this.set(''+vname, $jmvc.controllers[$jmvc.c].get(vname) || (alt || 'unset'));
				//				allow chain
				return this;
			};
			
			
			//			render the view parsing for variable&view placeholders
			View.prototype.render = function() {
				var arg = arguments[0] || {},
				//					maybe a callback is passed
				cback = arg.cback || false,	
				//					and maybe some args must be passed to the callback
				argz = arg.argz || null,
					
				//					You may specify a string with an id,
				//					that's where the content will be loaded,
				//					note that here dom is not loaded so you
				//					cannot pass an element
				target = arg.target || false,
				//					for binding this context in the callback
				that = this,
				//					the view content
				cont = that.content,
				//					for variables
				pattvar = new RegExp("\\$(.[^\\$}]*)\\$",'gm'),
				//					variables found
				resvar,
				//					a loop temporary variable
				t;
					
				//				parse for other views or $jmvc.vars
				cont = jmvcparse(cont);

				//				look for / substitute  vars
				//				in the view (these belongs to the view)
				while (true) {
					resvar = pattvar.exec(cont);
					if (resvar) {
						t = this.get(resvar[1]);	
						cont = cont.replace('$' + resvar[1] + '$', t);
					} else {
						break;
					}
				}
				
				that.content = cont;
				
				//				render in body or elsewhere
				$jmvc.events.bind(W, 'load', function () {
					var targ = (typeof target === 'string' && document.getElementById(target))	?
					document.getElementById(target)	:	document.body ;
					$jmvc.dom.html(targ, that.content);
						
						
					$jmvc.vars.rendertime = (new Date).getTime() - time_begin.getTime();
						
					//						may be a callback? 
					if (cback) {
						argz = !!argz ? argz : [];							
						cback.apply(this, argz);
					}
					$jmvc.events.endrender();
				}				
				);
				//				allow chain
				return this;
			};
						

			
			//			getter, setter and "deleter" for mvc classes
			View.prototype.get = Model.prototype.get = Controller.prototype.get = function (n) {
				return ( !! this.vars[n]) ? this.vars[n] : false;
			};			
			View.prototype.set = Model.prototype.set = Controller.prototype.set = function (vname, vval, force) {
				var i ;
				switch(typeof vname) {
					case 'string':
						if(!this.vars[vname] || force) {
							this.vars[vname] = vval;
						}
						break;
					case 'object':
						for(i in vname) {
							if(!this.vars[i] || vval || force) {
								this.vars[i] = vname[i];
							}
						}
						break;
				}
				return this;
			};
			View.prototype.del = Model.prototype.del = Controller.prototype.del = function (n) {
				if( !! this.vars[n] ) {
					delete this.vars[n];
				}
			};





			//			for basic inheritance
			function basic_inherit(Child, Parent) {				
				Child.prototype = new Parent();			   
			};
			
			//			for extending with modules
			function extend() {
				var trg = arguments[0];				
				if(! $jmvc[trg]) {
					$jmvc[trg] = {};				
			}				
			var arr_func_obj = arguments[1] || {};				
			for(var i in arr_func_obj) {
				//					$jmvc won`t let You override
				if(typeof $jmvc[trg][i] === 'undefined' /* && typeof arr_func_obj[i] === 'function' */) {
					$jmvc[trg][i] = arr_func_obj[i];
						
				}
			}
			//maybe init
			if(typeof $jmvc[trg]['init'] == 'function'){
				$jmvc[trg]['init']();
			}
		};
			
		//			ensure ucfirst controller name
		function normalize(n) {
			return n.charAt(0).toUpperCase() + n.substr(1).toLowerCase();
		};

		//			type can be only 'view' or 'model'
		function factory_method(type, name) {
				
			//				using namespace ?
			var pieces = name.split('/'), path=false;
			if(pieces.length >1){
				name = pieces.pop();
				path = pieces.join('/');
			}
		
			var path_absolute = $jmvc.vars.baseurl+'/app/'+type+'s/'+(path?path+'/':'')+name, r;

			switch(type) {
				case 'view':
					path_absolute += '.html';
					break;
				case 'model': case 'controller':
					path_absolute += '.js';
					break;
				default:
					type = false;
					break;
			}

			if(!type) {
				return false;
			}
			//				ajax get script content and return it
			return get(path_absolute, type, name);
		}
			

		//			instance new view content or eval a model or controller
		function get(path, type, name) {
				
			var ret = false, o;
				
			switch(true) {
				//					exists
				case type==='view' && typeof $jmvc.views[name] == 'function':
					ret = $jmvc.views[name];
				break;
				case type==='model' && typeof $jmvc.models[name] == 'function':
					o = new $jmvc.models[name]();
					o.vars = {};
					ret = o;
				break;

				//					do not exists
				default :
					$jmvc.io.get(
						path,
						function cback(res) {
							switch(type) {
								case 'view':
									$jmvc.views[name] = new View(res);
									ret =  $jmvc.views[name];
									break;
								case 'controller':
									res = res.replace(/^(\s*)\/\/(.*)[\n]/g,'/*$1*/\n');
									eval(res); /* ######### EVIL IS HERE############ */
									basic_inherit($jmvc[type+'s'][name], Controller);
									break;
								case 'model':
									eval(res); /* ######### EVIL IS HERE############ */
									basic_inherit($jmvc[type+'s'][name], Model);
									o = new $jmvc.models[name]();
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




		//			render function
		function render() {
				
			var ctrl, i;
				
			//				 "import" the controller (eval ajax code)
			$jmvc.factory('controller',$jmvc.c);

			//				if the constructor has been evalued correctly
			if($jmvc.controllers[$jmvc.c]) {
				//					grant basic ineritance from parent Controller
				basic_inherit($jmvc.controllers[$jmvc.c], Controller);

				//					make an instance
				ctrl = new $jmvc.controllers[$jmvc.c]();
					
				//					store it
				$jmvc.controllers[$jmvc.c] = ctrl;
					
				//					manage routes
				if(ctrl['_routes']) {
					$jmvc.a = ctrl['_routes'][$jmvc.a] || $jmvc.a;
				}

				//					parameters are set to controller
				for(i in $jmvc.p) {
					ctrl.set(i,  decodeURI($jmvc.p[i]) );
				}
					
				//					call action
				if(ctrl[$jmvc.a] && typeof ctrl[$jmvc.a] === 'function') {
					ctrl[$jmvc.a]();
				}else{
					if($jmvc.a.toLowerCase() !== jmvc_default.action){
						document.location.href = '/404/msg/act/'+$jmvc.a;
					}
				}
			}else{
				if($jmvc.c.toLowerCase() !== jmvc_default.controller){
					document.location.href = '/404/msg/cnt/'+$jmvc.c;
				}
			//document.location.href = '/404/msg/cnt/'+$jmvc.c;
			}

		}
			
			
		//			this is the only external snippet embedded in $jmvc
		function tpl(cont){
			//				MIT licence
			//				based on the work of John Resig
			//				thank you John
			//				http://ejohn.org/blog/javascript-micro-templating/
			return (cont.match(/\<%/)) ? 
			(function(str){

				var fn = new Function('obj',
					"var p=[]; p.push('" +
					str.replace(/[\r\t\n]/g, " ")
					.split("<%").join("\t")
					.replace(/((^|%>)[^\t]*)'/g, "$1\r")
					.replace(/\t=(.*?)%>/g, "',$1,'")
					.split("\t").join("');")
					.split("%>").join("p.push('")
					.split("\r").join("\\'") + "');  return p.join('');"
					);

				return fn(str);
			})(cont)
			:
			cont;
		}
			
			

			
		//			This function get a content and substitute jmvc.vars
		//			and direct view placeholders like {{viewname .... }}
		//			returns parsed content
			
		function jmvcparse(content){
			//				hook
			check_hook('onBeforeParse', [content]);
				
			//				the view content
			var cont = content,
			//					for hunting view placeholders
			//patt = new RegExp("{{(.[^\\$}]*)}}",'gm'),
			patt = new RegExp("{{(.[^\\}]*)}}",'gm'),
			//					for getting explicit params passed within view placeholders
			pattpar = new RegExp("\\s(.[A-z]*)=`(.[^/`]*)`",'gm'),
			//					for variables
			pattvar = new RegExp("\\$(.[^\\$}]*)\\$",'gm'),
			//					results of view hunt 
			res,
			//					variables found
			resvar,
			//					the view instance
			myview,
			//					two temporary variables for regexp results
			tmp1, tmp2,
			//					some loop counters
			i=0, t, k,
			//					recursion limit for replacement
			limit=100,
			//					only the view name
			viewname,
			//					original content of {{}} stored for final replacement
			orig,
			//					to store inner variables found in the placeholder
			register;
				
				
			while (true && i++<limit) {
				//					res = patt.exec(cont);
				res = new RegExp("{{(.[^\\}]*)}}",'gm').exec(cont);
				//					res = /{{(.[^\\}]*)}}/gm.exec(cont); // works
				//					JMVC.log(res)
				if (res) {
						
					viewname = orig = res[1];						
					register = false;
						
					//						got params within ?
					if(pattpar.test(res[1])) {
						//							register becomes an object and flags result for later check
						register = {};
							
						//							get only the view name, ingoring parameters
						tmp2  = (new RegExp("^(.[A-z]*)\\s")).exec(res[1]);
						viewname = tmp2[1];
							
						tmp2 = res[1];
						while (true) {
							//								this is exactly pattpar but if I use it does not work
							tmp1 = (new RegExp("\\s(.[A-z]*)=`(.[^/`]*)`",'gm')).exec(tmp2);
							
							if (tmp1) {
								//									add to temporary register
								register[tmp1[1]] = tmp1[2];
								tmp2 = tmp2.replace(' '+tmp1[1]+'=`'+tmp1[2]+'`', "" );
							
							}else{
								break;
							}
						}
							
					}
						
					//						if not loaded give an alert
					if (!$jmvc.views[viewname]) {
						//							here the view is requested but not explicitly loaded with the $jmvc.getView method.
						//							You should use that method, and you'll do for sure if You mean to use View's variable
						//							but if You just load a view as a simple chunk with {{myview}} placeholder inside another one
						//							then $jmvc will load it automatically (take care to not loop, parsing stops after 100 replacements)
							
						/*
							alert('`'+viewname+'` view not loaded.\nUse Factory in the controller to get it. \n\njmvc will'+
								' load it for you but variables are\n lost and will not be replaced.');
							*/
						$jmvc.factory('view',viewname);
					} 
					myview = $jmvc.views[viewname];
						
					//						in case there are some vars in placeholder
					//						register will hold values obtained above
					//						and we give'em to the view, the parse method
					//						will do the rest
						
					if(register !== false) {
						for(k in register) {
							myview.set(k, register[k]);
						}
					}
	
					//						before view substitution,
					//						look for variables, these have to be set with set method on view instance,
					//						(and that cannot be done using {{viewname}} placeholder )
					while (true) {
						//tmp1 = pattvar.exec(myview.content);
						tmp1 = new RegExp("\\$(.[^\\$}]*)\\$",'gm').exec(myview.content);
						if (tmp1) {
							myview.content = myview.content.replace('$'+tmp1[1]+'$', myview.get(tmp1[1]) )   ;
						}else{
							break;
						}
					}
					//						now the whole view
					cont = cont.replace('{{'+orig+'}}', myview.content);					
				}else{
					break;
				}
			}
				
			//				now $jmvc.vars parse
			for(var j in $jmvc.vars) {
				cont = cont.replace(new RegExp("\\$"+j+"\\$", 'g'), $jmvc.vars[j]);
			}
				
			cont = tpl(cont);
				

			check_hook('onAfterParse', [cont]);
			
			return cont;
		//return cont;
		}

			
			
			
			
			
		//			setter unsetter $jmvc vars
		function jmvcset(name, content){
			$jmvc.vars[name] = content;
		}
		function jmvcdel(name){
			if($jmvc.vars[name]){
				delete $jmvc.vars[name];
			}
		}
			
	//			require
	function jmvcrequire() {
		for(var i = 0, l=arguments.length ; i<l ; i++) {
			if(!$jmvc.extensions[arguments[i]]){
				$jmvc.io.get(
					'/app/extensions/'+arguments[i]+'.js',
					function cback(res){
						eval(res);
					}
					);
				$jmvc.extensions[arguments[i]] = arguments[i];
			}
		}
	}

	//			hooking
	function jmvchook(obj, force){
		var allowed = ['onBeforeRender','onAfterRender','onBeforeParse','onAfterParse'];
				
		for(var f in obj){
			try{
				if($jmvc.util.inArray(allowed, f )>0 || force){
					hooks[f]=obj[f];
				}else{
					throw {
						message:'EXCEPTION : You`re trying to hook unallowed function "'+f+'"'
					};
				}
			}catch(e){
				alert(e.message);
			}
		}
	}
			
	//ninja
	function log() {
		try {
			console.log.apply(console, arguments);
		}catch(e) {
			try {
				opera.postError.apply(opera, arguments);
			}catch(e){
				alert(Array.prototype.join.call( arguments, " "));
			}
		}
	}
			
	//			hook utility
	function check_hook(hookname, param){
		if(hooks[hookname]){
			hooks[hookname].apply(null, param);
		}
	}
	//			
	//			Dispatch url getting controller, action and parameters
	//			
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
					
		//					adjust extensions
		els = mid.path.replace(new RegExp('\\.'+url_allowed_extensions.join('|\\.'),'gm'), '').substr(1).split('/');
					
		if(l.hostname=='localhost'){
			els.shift();
		}	
		var	controller = els.shift() || jmvc_default.controller,
		action = els.shift() || jmvc_default.action,
		//					extra params
		params = {},
		lab_val,
		ret,
		i,len=els.length;		
			
		//				now if els has non zero size, these are extra path params
		for(i = 0; i+1 < len;i+=2) {
			params[els[i]] = els[i+1];
		}
				

				
		//				even hash for GET params
		if(mid.hash !== '') {
			//					spliting an empty string give
			//					an array with one empty string
			els = mid.hash.substr(1).split('&');
					
			for(i = 0, len = els.length; i<len; i++) {
				lab_val = els[i].split('=');
				//						do not override extra path params
				if(!params[lab_val[0]]) {
					params[lab_val[0]] = lab_val[1];
				}
			}
		}
				
		//				check if jmvc must be public
		if(params['exp'] && params['exp']=='true'){
			make_public = true;
		}else{
			//					check script tag, works only if jmvc is the first script in head
			var src = document.getElementsByTagName('script')[0].src;
			if(src.search('exp=true') !== -1){
				make_public = true;
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
			
			
			
			

	//			
	//			BASE model
	//			
	$jmvc = {
		c : dispatched.controller || jmvc_default.controller,
		a : dispatched.action || jmvc_default.action,
		p : dispatched.params || {},
		controllers : {},
		models : {},
		views : {},
		vars : {
			baseurl:	dispatched.baseurl,
			rendertime : 0
		},
		set :	jmvcset,
		del : jmvcdel,
		require : jmvcrequire,
		extensions : {},
				
		hook : jmvchook,
		checkhook : check_hook,
				
		render:	render,
		factory:	factory_method,
		extend : extend,
		modules : Modules,
				
		parse : jmvcparse,
				
		log : log,
				
		getView :	function(n) {
			return factory_method('view', n);
		},
		getModel :	function(n) {
			return factory_method('model', n);
		}
	//getController :	function(n) {return factory_method('controller', n); }
	};
			
	//			maybe JMVC needs to be public
	if(make_public){
		W.JMVC = $jmvc;
	}
			
	//			here we are $jmvc is DONE
	return $jmvc;
}
)();
		

	
	
	
	
	
	
	// now many utility function are added to JMVC
		
		
	JMVC.util = {
		isSet : function(e) {
			return typeof e !== 'undefined';
		},
		inArray : function(arr, myvar) {
			var res = -1;
			for(var i = 0, len = arr.length; i<len; i++) {
				if(myvar === arr[i]) {
					res = i;
					break;
				}
			}
			return res;
		},
		isArray : function(o) {
			return Object.prototype.toString.call( o ) === '[object Array]';
		},
		istTpeOf : function(el, type) {
			return typeof el === type;
		},
		getType : function(el) {
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
			return min +  ~~(Math.random()*(max-min + 1));
		},
		replaceall : function(tpl , o, pre, post){
			var _p = pre || '%',
			p_ = post || '%',
			reg = new RegExp( _p+'([A-z]*)'+p_, 'g' );
			return  tpl.replace( reg, function(str, $1) {
				return  o[$1];
			} ); 
		},
		obj2attr : function(o){
			var ret = '';
			for(var i in o){
				ret += ' '+i+'"'+o[i]+'"';
			}
			return ret;
		},
		obj2qs : function(o){
			var ret = '';
			for(var i in o){
				ret += (ret?'&':'?')+i+'='+encodeURI(o[i])+'';
			}
			return ret;
		},
		rad2deg : function(r){
			return 180*r/Math.PI;
		},
		deg2rad : function(d){
			return Math.PI* d/180;
		},
		//funzione di iterazione
		each : function(that, fn) {
			for ( var i = 0, len = that.length; i < len; ++i ) { 
				if(that[i]){
					that[i] = fn.call(that, that[i]); 
				}
			}
			return that; 
		},
		reload : function(){
			document.location.href = document.location.href;
		},
		now : function(){
			return (new Date).getTime();
		},
		json2css : function(json){
			var out = '';
			for(var i in json){
				out+= i +'{'+json[i]+'}'+"\n";
			}
			return out;
		}

	};	
	
	/*
	*
	*
	*	ajax utility
	*/
	JMVC.io = (function(){
		var pool = [],
		getxhr = function(){
			var xhr, IEfuckIds = ['MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
			
			try {
				xhr = new XMLHttpRequest();
			}catch (e) {
				try{
					for (var i = 0, len = IEfuckIds.length; i < len; i+=1) {
						try{
							xhr = new ActiveXObject(IEfuckIds[i]);
						}catch(e) {} 
					}
				}catch (e) {}
			}
			return xhr;
		}
		
		var call = function(uri, options){
			var xhr = getxhr(),
				method = (options && options.method) || 'POST',
				cback = (options && options.cback),
				sync = (options && options.sync),
				data = (options && options.data) || {},
				type = (options && options.type),
				cache = (options && options.cache!== undefined) ? options.cache : true,
				targetType = (type=='xml')? 'responseXML' : 'responseText';
			
			//prepare data
			if(!cache)data['C'] = JMVC.util.now();
			data = JMVC.util.obj2qs(data).substr(1);
			
			xhr.onreadystatechange = function() {
				switch(true){
					case xhr.readyState=="complete" || (xhr.readyState==4 && xhr.status==200 ) :
						if(cback){cback(xhr[targetType]);}
						return xhr[targetType];
					break;
				}
			};
			switch(method){
				case 'POST':
					try{
						xhr.open('POST', uri, sync);
						xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');

						if (xhr.overrideMimeType){
							xhr.setRequestHeader("Connection", "close");
						}
						xhr.send(data || true);
					}catch(e) {}
				break;
				case 'GET':
					try{
						uri = uri + ((data)?'?'+data:'');
						xhr.open('GET', uri, sync);
						if(type=='xml' &&  xhr.overrideMimeType){
							xhr.overrideMimeType('text/xml');
						}
						xhr.send(null);
					}catch(e) {}
				break;
			}
			try{
				return xhr[targetType];
			}catch(e){}
			return false;
		}
		
		var post = function(uri, cback, sync, data, cache){
			return call(uri, {cback : cback, method : 'POST', sync : sync, data : data, cache : cache});
		};
		
		var get = function(uri, cback, sync, data, cache){
			return call(uri, {cback : cback, method : 'GET', sync : sync, data : data, cache : cache});
		};
		var getJson = function (uri){
			return (W.JSON && W.JSON.parse) ? JSON.parse(get(uri)) : eval( '(' + get(uri) + ')');
		}
		var getXML = function(uri){
			return call(uri, {method : 'GET', sync : false, type : 'xml'});
		}
		
		return {
			get : get,
			post : post,
			getJson : getJson
		}
	})();
	
	
	

	/*
	* inner html utility
	*/
	JMVC.dom = {
		body : function(){
			return document.body;
		},
		append : function(where, what) {
			where.appendChild(what);
		},
		addClass : function(el, addingClass){
			var now = this.attr(el, 'class'),
			spacer = (now!=='')?' ':'';
			this.attr(el, 'class',now+spacer+addingClass);
		},
		//legge e scrive attributi
		attr : function(elem, name, value) { 

			if(elem.nodeType == 3 || elem.nodeType == 8) return 'undefined';

			// Make sure that avalid name was provided 
			if ( !name || name.constructor !== String ) return ''; 
			// Figure out if the name is one of the weird naming cases 
			//name = {'for': 'htmlFor', 'class': 'className'}[name] || name; 
			
			// If the user is setting a value, also 
			if ( typeof value != 'undefined' ) { 
				// Set the quick way first 
				
				elem[{
					'for': 'htmlFor', 
					'class': 'className'
				}
				[name] || name] = value; 
				// If we can, use setAttribute 

				if ( elem.setAttribute ) 
					elem.setAttribute(name,value); 
			}
			// Return the value of the attribute
			if(typeof value == 'undefined'){

				return elem[name] || elem.getAttribute(name) || ''; 
			}
			else{
				return elem;
			}
		},
		//prepend : function(where, what){var f = this;},
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
			var n = this.create(tag,attrs,inner);
			this.append(where, n);
			return n;
		},
		html : function(el, html) {
			if(!el) return this;
			var t = "";
			//alert(el);
			if(typeof html !== 'undefined') {
				if(el){
					try{
						el.innerHTML = html+'';
					}catch(e){}
				}
				return this;
			}else{
				t = (el.nodeType === 1) ? el.innerHTML : el;
			}
			return t.trim(); 
		},
		find : function(sel){
			return document.getElementById(sel);
		},
		//ha un attributo?
		hasAttribute : function(el, name) {
			return el.getAttribute(name) != null; 
		},

		hasClass : function(el, classname){
			return el.className.match(new RegExp('(\\s|^)'+classname+'(\\s|$)'));
		},
		insertBefore : function(node, referenceNode){
			var p = referenceNode.parentNode;
			p.insertBefore(node, referenceNode);
			return node;
		},
		insertAfter : function(node, referenceNode){
			var p = referenceNode.parentNode;
			p.insertBefore(node, referenceNode.nextSibling);
			return node;
		},
		nthchild : function(node, num, types){

			var childs = node.childNodes,
			//			filtered	
			tagChilds = [],
			//			original length
			len = childs.length,
			//			a counter
			i=0,
			//			elements filtered, default keeps only Element Node
			type2consider = types || ['TEXT_NODE'] ;
			//			clean text ones
			while(len--){
				if( JMVC.util.inArray(type2consider,   this.nodeTypeString(childs[i++])  ) ){
					tagChilds.push(childs[i-1]);
				}
			}
			len = tagChilds.length;

			return (num<len)?tagChilds[num] : false;
		},
		nodeTypeString : function(node){
			var types = ['ELEMENT_NODE','ATTRIBUTE_NODE','TEXT_NODE',
			'CDATA_SECTION_NODE','ENTITY_REFERENCE_NODE','ENTITY_NODE',
			'PROCESSING_INSTRUCTION_NODE','COMMENT_NODE','DOCUMENT_NODE',
			'DOCUMENT_TYPE_NODE','DOCUMENT_FRAGMENT_NODE','NOTATION_NODE'
			];
			return types[node.nodeType-1];
		},
		preloadImage : function(src){
			var i = new Image();
			i.src = src;
			return i;
		},
		parent : function(node){
			return node.parentNode;
		},
		prepend : function(where, what){
			var c = where.childNodes[0];
			where.insertBefore(what, c);
			return what;
		},
		
		
		
		
		remove : function(el){
			var parent = el.parentNode;
			parent.removeChild(el);
			return parent;
		},
		removeAttribute : function(el, valore){
			el.removeAttribute(valore);
			return el;
		},
		removeClass : function(el, cls){
			if (this.hasClass(el,cls)) {
				var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
				el.className=el.className.replace(reg,' ');
			}
			return this;
		},
		switchClass : function(el,oldclass, newclass){
			if(this.hasClass(el, oldclass))this.removeClass(el, oldclass);
			if(! this.hasClass(el, newclass))
				this.addClass(el, newclass);
			return el;
		}


	};

	/*
	* basic event utility
	*/
	JMVC.events = {
		bindings :{},
		onedone : false,
		_end : [],
		bind : function(el,tipo,fun) {
			
			
			
			if (W.addEventListener) { 
				el.addEventListener(tipo, fun, false); 
			}else if (W.attachEvent) {
				var f = function() {
					fun.call(el, W.event)
					};
				el.attachEvent('on'+tipo, f);
			}else{
				el['on'+tipo] = function() {
					fun.call(el, W.event)
					};
			}
		//if(!this.bindings[el]){this.bindings[el]={};}
		//this.bindings[el][tipo] = fun;
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
			var newf = function() {
				if(! this.onedone)fn();
				this.onedone = true;
			};
			this.bind(what,type, newf);
		},		
		ready : function(func) {
			return this.bind(W, 'load', func);
		},
		eventTarget : function(e) {
			e = e || window.event;
			return e.target || e.srcElement;
		},
		end : function(f){
			this._end.push(f);
		},
		endrender : function(){
			for(var i=0,l=this._end.length;i<l; i++){
				this._end[i]();
			}
		}
	};


	


	JMVC.head = {
		addscript: function(src, parse, explicit) {

			var script, head, tmp, that = this, postmode = true, async = true;
			if(parse){
				if(explicit){
					var script_content = JMVC.parse(src /* in this case is mean to be the content */);
					script_content = JMVC.parse(script_content,true);
					script = JMVC.dom.create('script', {
						type:'text/javascript'
					}, script_content);
					head = that.element;
					head.appendChild(script);
				}else{
					/* get css content, async */
					tmp = JMVC.io.get(src, function(script_content){
						script_content = JMVC.parse(script_content,true);
						script = JMVC.dom.create('script', {
							type:'text/javascript'
						}, script_content);
						head = that.element;
						head.appendChild(script);
					}, postmode, async);
				}
			}else{
				script = (explicit)?
				JMVC.dom.create('script', {
					type:'text/javascript'
				}, src)
				:
				JMVC.dom.create('script', {
					type:'text/javascript',
					src:src
				}, ' ');
				head = this.element;
				head.appendChild(script);
			}
		},
		addstyle : function(src, parse, explicit) {
			var style, head, tmp, that = this, postmode = true, async = false, rules;
			if(parse){
				if(explicit){
					/* in this case src is meant to be the content */
					var csscontent = JMVC.parse(src , true);

					head = that.element;
					style = document.createElement('style');
					rules = document.createTextNode(''+csscontent);

					style.type = 'text/css';
					if(style.styleSheet)
						style.styleSheet.cssText = rules.nodeValue;
					else style.appendChild(rules);
					head.appendChild(style);

				}else{
					/* get css content, async */
					//JMVC.log(src);
					tmp = JMVC.io.get(src, function(csscontent){
						csscontent = JMVC.parse(csscontent,true);


						head = that.element;
						style = document.createElement('style');
						rules = document.createTextNode(''+csscontent);

						style.type = 'text/css';
						if(style.styleSheet)
							style.styleSheet.cssText = rules.nodeValue;
						else style.appendChild(rules);
						head.appendChild(style);

					}, postmode, async);
				}
			}else{
				style = JMVC.dom.create('link', {
					type:'text/css', 
					rel:'stylesheet', 
					href:src
				});
				head = this.element;
				head.appendChild(style);
			}

		},
		title : function(t) {
			if(! t ) {
				return document.title;
			}
			document.title = t;
			return true;
		},

		meta : function(name, value){
			//get last meta if exists
			var meta = this.element.getElementsByTagName('meta'),
			newmeta = JMVC.dom.create('meta', {
				name:name, 
				content:value
			}),
			len = meta.length;
			if(len){

				JMVC.dom.insertAfter(newmeta, meta.item(len-1));
			}else{
				this.element.appendChild(newmeta);
			}
		},

		element : document.getElementsByTagName('head').item(0)
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
	 * by default JMVC is not exposed but could be useful
	 * to use it from console or elsewhere
	 * 
	 */
	// W.JMVC = JMVC;
	/*
	 *
	 * now render
	 * 
	 */
	JMVC.render();	

})(this);
