JMVC.controllers.Test = function() {
	
	/* test a route */ 
	this.addRoutes( {
		swiss : 'flag',
		f : 'flag'
	});

	this.index = function(){
		var content = '<h3>TESTS</h3>';
		content+='<a href="'+JMVC.vars.baseurl+'/test/model">Model</a><br />'+
			'<a href="'+JMVC.vars.baseurl+'/test/controller">Controller</a><br />'+
			'<a href="'+JMVC.vars.baseurl+'/test/view">View</a><br />'+
			'<a href="'+JMVC.vars.baseurl+'/tabs/one/i_say/Hello%20my%20Guest">Tabs</a><br />'+
			'<a href="'+JMVC.vars.baseurl+'/test/flag">Some fun</a><br />'+
			'<a href="'+JMVC.vars.baseurl+'/test/logo">Logo</a><br />'+
			'<a href="'+JMVC.vars.baseurl+'/google.jmvc">Google</a><br />'+
			'<a href="'+JMVC.vars.baseurl+'/test/observer.jmvc">Observer</a><br />'+
			'<a href="'+JMVC.vars.baseurl+'/test/scheduler.jmvc">Scheduler</a><br />'+
			'<a href="'+JMVC.vars.baseurl+'/test/fx.jmvc">Effects</a><br />';
		
		var v = JMVC.getView('vacuum');
		v.set('style','');
		v.set('content',content);
		v.render();		
	};


	// test a VIEW	
	this.view = function() {
		var v = JMVC.getView('test'),
			v1= JMVC.factory('view','test1'),
			v2= JMVC.factory('view','test2');
			
		v1.set('result', 'ok1');
		v2.set('result', 'ok2');
		v2.set('result2', 'ok2bis');
		v.render();
	};
	
	
	
	// test some MODELs
	this.model = function() {
		var _p1 = JMVC.getModel('xxx/Persona'),
			_p2 = JMVC.getModel('Persona2'),
			_p3 = JMVC.getModel('Persona2'),tpl,v, al = '';

		//get model instance
		//_p1.set('cognome','Ghedina').set('n',1);
		_p1.set({'cognome':'Ghedina', 'n':1});//.set('cognome','Spaceman',true);
		_p2.set('cognome','Ghedi').set('n',2);
		_p3.set('cognome','Ghe').set('n',3);
		
		tpl = 'Modello n°%n%: %nome% %cognome%<br />';
		al += tpl.replace('%n%', _p1.get('n')).replace('%nome%', _p1.name).replace('%cognome%', _p1.get('cognome'));
		al += tpl.replace('%n%', _p2.get('n')).replace('%nome%', _p2.name).replace('%cognome%', _p2.get('cognome'));
		al += tpl.replace('%n%', _p3.get('n')).replace('%nome%', _p3.name).replace('%cognome%', _p3.get('cognome'));
		
		var v = JMVC.getView('vacuum');
		v.set('content', al);
		v.set('style', 'padding:5px; border:5px solid red; font-size:12px; width:280px; background-color:white; color:green; font-weight:bold; font-family:verdana, sans-serif');
		v.render();
	};

	this.modelviewparse = function() {
		var _p = JMVC.getModel('Persona');
		_p.set('name', 'Fredrich');
		var _v = JMVC.getView('parse');
		_v.parse(_p).render();
	};

	// test a CONTROLLER
	this.controller = function() {
		this.set('nome','Federico');
		alert(this.get('nome'));
	};
	this.controller2 = function() {
		this.set('nome','Federico2');
		alert(this.get('nome'));
	};
	
	
	// just to celebrate a good start
	this.flag = function() {
		// color extension is needed
		JMVC.require('color');
		
		JMVC.head.title('CH beat');
		JMVC.head.addstyle(JMVC.vars.baseurl+'/media/css/flag.css');

		var v = JMVC.getView('flag'),
			mode = 'grow',
			box_size=1,
			factor = 0.8,
			top_fact = 80,
			els_top = [];
		
		var recall = function() {
			for(var i=0, l=5*7; i<l; i++) {
				els_top[i] = JMVC.util.rand(10, top_fact-5);
			}
		};
		recall();
		
		var back = function(s) {
			var basesize = s || box_size,
				f = document.getElementById('flag'),
				boxes = [],
				tmp, i, j, l,
				fact,
				opac = Math.sqrt(basesize/(box_size*top_fact));
			f.style.width = (basesize*7.5)+'px'; // damnIE
			f.style.height = (basesize*5.5)+'px';// damnIE
			f.style.margin = '0 auto';
			f.style.zoom = 1;// damnIE
			f.style.opacity = opac;
			f.style['-ms-filter'] ="progid:DXImageTransform.Microsoft.Alpha(Opacity="+(~~(100*opac))+")"; // damnIE
			f.style.filter = "alpha(opacity="+(~~(100*opac))+")";// damnIE
			f.style.marginTop = (basesize)+'px';
			j=0;
			for(i=0, l=5*7; i<l; i++) {
				j++;					
				tmp = JMVC.dom.create('div',{'style':'width:'+basesize+'px; height:'+basesize+'px;', 'class':'box'},'&nbsp;');
				JMVC.dom.append(f, tmp);
				tmp.style.backgroundColor = (basesize > els_top[i]) ?
					((JMVC.util.inArray([10,16,17,18,24], i)>=0)? 'white':'red')
					:
					JMVC.color.getRandomColor(true);
				if(j%7 == 0) {
					tmp = JMVC.dom.create('div',{'class':'clearer'},'&nbsp;');
					JMVC.dom.append(f, tmp);
				}
			}

			if(basesize>box_size*top_fact) {				
				mode='shrink';
				recall();
			}
			if(basesize<box_size) {
				mode='grow';					
				recall();
			}				
			fact = (mode == 'grow')?factor:-factor;
			
			window.setTimeout(
				function() {
					f.innerHTML = '';
					back(basesize+fact);
				},
				25
			);
		};
		
		v.render({cback : back});
		
	};
	
	this.direct = function() {
		JMVC.head.title('Swiss beat');
		JMVC.head.addstyle(JMVC.vars.baseurl+'/media/css/flag.css');
		this.render(
			'<b style="color:green">hello</b>',
			function() {
				JMVC.debug('simple callback on render!');
			}
		);
	}
	
	this.viewplus = function() {
		JMVC.head.title('Hello');
		JMVC.getView('superview');
		var _v = JMVC.getView('sv');
		_v.set('hello', ', I said hellooooooo !!!');
		_v.render();
		
	};
	
	
	
	

	this.logo = function(){
		JMVC.events.loadify(1000);
		JMVC.require('plotter', 'obj/bucket');
		var M = Math;
		var v = JMVC.getView('vacuum');
		
		v.set({'style':'font-family:verdana;margin:0 auto;width:450px;height:150px;margin-top:80px;position:relative','content':'&nbsp;','id':'extralogo'});
		
		JMVC.head.addstyle(JMVC.vars.baseurl+'/media/css/logo.css');
		
		v.render({cback:function(){
			var newlogo = document.getElementById('extralogo');
			var j = new JMVC.graf.letter('j', 22, 40),
				m = new JMVC.graf.letter('m',22,110),
				v = new JMVC.graf.letter('v',22, 260),
				c = new JMVC.graf.letter('c',22, 320);

			j.line(0,4, 22,4, 2);
			j.line(0,4, 0,26, 2);
			j.line(0,26, 22, 26, 2);
			j.line(22,4, 22,26, 2);
			j.line(0,36,0,56, 2);
			j.line(0,36,30,36, 3);
			j.line(0,56,30,56, 3);
			j.line(87,0,107,1, 2);
			j.arc(38,-16, 72,72,  -M.PI/26	, M.PI/2, 12);
			j.arc(38,-16, 52,52,  -M.PI/20	, M.PI/2	, 9);
			//j.rotate(Math.PI/3);
			j.plot(newlogo);

			m.line(0,0, 0,24, 2);
			m.line(0,0, 60,0, 7);
			m.line(0,24, 60,24, 7);
			m.line(60,0, 60,24, 2);
			m.arc(60,34, 53,53, -M.PI/20	, -M.PI	, 11	);
			m.arc(60,34, 30,30, -M.PI/10	, -M.PI	, 6	);
			m.arc(60,84, 53,53, -M.PI/20	, -JMVC.util.deg2rad(163)	, 12	);
			m.arc(60,84, 30,30, -M.PI/12	, -M.PI	, 7	);
			m.line(60,64, 60,87, 2);
			m.line(60,114, 60,137, 2);
			m.plot(newlogo);

			v.line(0,45, 2,69, 2);
			v.line(0,45, 45,45, 4);
			v.line(0,69, 45,69, 4);
			v.arc(45,23, 22,22, -M.PI/8	, M.PI/2	, 3	);
			v.arc(45,23, 46,46, -M.PI/18	, M.PI/2	, 8	);
			v.line(60,38, 88, 38, 2);
			v.line(60,28, 88,28, 2);
			v.line(60,0, 88,28, 3);
			v.line(60,0, 48,12, 1);
			v.line(60,28, 48,12, 1);
			v.plot(newlogo);

			c.line(0,80,22,80,2);
			c.line(0,80,0,58,2);
			c.line(22, 80,22,58,2);
			c.arc(36,58, 12,12, -M.PI/6	, M.PI*3/2	, 3	);
			c.arc(36,58, 36,36, -M.PI/14	, M.PI*3/2	, 7	);
			c.line(44,22,51,22,0);
			c.line(44,46,51,46,0);
			c.line(58,22,58,46,2);
			c.line(66,22,66,66,5);
			c.line(66,66,88,66,2);
			c.line(88,44,88,66,2);
			c.arc(66,44, 22,22, -M.PI/8		, 0	, 4	);
			c.plot(newlogo);

			var a = newlogo.childNodes;
			var i = 0;
			
			var T1=20, T2 =10;
			
			var bucket = new JMVC.bucket.create(JMVC.util.range(0,a.length-1));
			
			var t = window.setInterval(function(){
				//var trg = JMVC.util.rand(1,a.length-1);
				if(!bucket.hasMore()){bucket.reset();}
				var trg =  bucket.next() || 1;
				try{var c = a[trg].style.color;}catch(e){JMVC.debug(trg);}

				window.setTimeout(
					function(t1){
						a[t1].style.color = 'white';
						a[t1].style.fontSize = '8px';
						window.setTimeout(
							function(t2){a[t2].style.color = c;},T1, t1
						);
					},0, trg
				);

			},T2);
			
		}});
		//
		// if enabled will not allow that logo to be se in a frame or iframe
		//JMVC.util.denyframe();
	};
	
	this.xmlparser = function(){
		JMVC.require('xmlparser');
		
		var d = new JMVC.xmlparser.load('<?xml version="1.0" encoding="UTF-8" ?><root><el><name sex="M">federico</name><surname>ghedina</surname><struct><a>A</a><b>B</b></struct></el><el><name>federico2</name><surname>ghedina2</surname></el></root>'),
			t=false;
		d.extractor(function(node){return {name:JMVC.xmlparser._text(node.childNodes[0]), surname : JMVC.xmlparser._text(node.childNodes[1]), sex : JMVC.xmlparser._attribute(node.childNodes[0],'sex')}});
		t = d.extractor(0);
		JMVC.debug(t);
		JMVC.debug(d.xmlDoc.getElementsByTagName('struct')[0]);
		
		d.extractor(function(node){JMVC.debug(2, node);return {a:JMVC.xmlparser._text(node)};},true);
		d.pointer(d.xmlDoc.getElementsByTagName('struct')[0]);
		
		t = d.extractor(0);
		JMVC.debug(t);
		t = d.extractor(1);
		JMVC.debug(t);
		//JMVC.yes.prova();
	};
	
	this.docs = function(){
		JMVC.require('xmlparser');
		JMVC.io.get(JMVC.vars.baseurl+'/media/documentation.xml',function(doc){
			
			var parser = new JMVC.xmlparser.load(doc);

			parser.extractor(function(node){
				//JMVC.debug('node is ',node);
				var ret = {
					signature: JMVC.xmlparser._text(node.childNodes[0]),
					description:JMVC.xmlparser._text(node.childNodes[1]),
					params : {},
					returns : {
						type : JMVC.xmlparser._text(node.childNodes[3]),
						hint : JMVC.xmlparser._attribute(node.childNodes[3], 'hint')
					}
				};
				for(var j = 0, l= node.childNodes[2].childNodes.length; j<l; j++){
					ret.params[  JMVC.xmlparser._attribute(node.childNodes[2].childNodes[j], 'name')  ]  =  JMVC.xmlparser._text(node.childNodes[2].childNodes[j]);					
				}
				return ret;
			});
			parser.pointer(parser.xmlDoc.getElementsByTagName('dom')[0]);
				
			
			JMVC.debug(parser.root());
			JMVC.debug(JMVC.xmlparser.toJson(parser.root()));
		
		
		
		//	JMVC.debug(JMVC.xmlparser.toJson(parser.xmlDoc.getElementsByTagName('dom')[0] ));
			
			
			//var r = parser.extractor(0);
			//var all = parser.extractall();
			//JMVC.debug(all);
			
			//step into model
			//parser.pointer(parser.xmlDoc.getElementsByTagName('model')[0]);
			//r = parser.extractor(0);
			
			//JMVC.debug(r);
		},true);	
	};
	
	this.scheduler = function () {
		JMVC.require('scheduler');
		var s = new JMVC.scheduler.create();
		s.add({every : 3000}, function (d) {JMVC.debug(d);} );
		//console.debug(s);
	};
	
	
	this.observer = function(){
		var list = JMVC.getModel('List',['federico']);
		list.addItem({num:'1'});
		//JMVC.debug(list.getItems());
		var v = JMVC.getView('vacuum');
		v.set({style:'background-color:red',id:'prova'});
		v.set('content','hello u');
		//JMVC.debug(v);
		
		
		v.render({
			cback:function(){
				var butt_plus = JMVC.dom.add(JMVC.dom.body(), 'input', {type:'button',value:'+',id:'butt_plus'});
				var butt_minus = JMVC.dom.add(JMVC.dom.body(), 'input', {type:'button',value:'-',id:'butt_minus'});
				var ulist = JMVC.dom.add(JMVC.dom.body(), 'ul', {style:'list-style-type:none;padding:10px;border:1px solid gray;width:200px;background-color:#eee;',id:'mylist'});
				JMVC.events.bind(butt_plus, 'click', function(){
					var item = prompt('Item to add');
					list.addItem(item);
				});
				list.itemAdded.attach(function(){
					alert('added an item');
					//JMVC.debug(list.getItems());
				});
				list.itemAdded.attach(function(){
					alert('yessss .... an item has been added.... ');
				});
			}
		});
		
		
	}
	
	this.fx = function(){
		JMVC.require('fx','animator', 'obj/calendar', 'timer');
		var v = JMVC.getView('vacuum');
		v.set({style:'background-color:red',id:'prova'});
		v.set('content','hello u');
		v.render({
			cback:function(){
				
				
				
				JMVC.dom.add(JMVC.dom.body(), 'span', {id:'bull'}, '&bull;');
				var trg = JMVC.dom.add(JMVC.dom.body(), 'div', {id:'timer'});
				var cal = JMVC.dom.add(JMVC.dom.body(), 'div', {id:'cal'});
				
				var c = new JMVC.calendar.create();
c.getMonthMap(7,2012);
c.getContour(7,2012);
JMVC.dom.html(cal,c.render());
				
				new JMVC.timer.create({target : trg});
				
				//JMVC.fx.hide(JMVC.dom.find('prova'));
				JMVC.fx.fadeIn(JMVC.dom.find('prova'));

				JMVC.animator.follow_ipath(
					JMVC.dom.find('bull'),
					function(i){return Math.abs(20*Math.cos(i/10));},
					{from:0,to:400},
					{step:2,mode:'back'}
				);
			}
		});
	}
	
	this.test = function(){
		JMVC.require('test');
		this.render(false,function(){
			JMVC.test.initialize();
			
			
			
			
			
			
JMVC.test.startAll();

  // A conforming implementation, when processing strict mode code, may not extend the
  //syntax of NumericLiteral (7.8.3) to include OctalIntegerLiteral as described in B.1.1.
  JMVC.test.testException("no octal literals", '012', SyntaxError);

  // A conforming implementation, when processing strict mode code (see 10.1.1), may not
  //extend the syntax of EscapeSequence to include OctalEscapeSequence as described in B.1.2.
  JMVC.test.testException("no octal escape sequence", '"\\012"', SyntaxError);

  // Assignment to an undeclared identifier or otherwise unresolvable reference does not
  //create a property in the global object. When a simple assignment occurs within strict
  //mode code, its LeftHandSide must not evaluate to an unresolvable Reference. If it does
  //a ReferenceError exception is thrown (8.7.2).
  JMVC.test.testException(
    "no implied globals",
    function () {'use strict'; x = 3;},
    ReferenceError
  );

  //The LeftHandSide also may not be a reference to a data property with the attribute
  //value {[[Writable]]:false}, to an accessor property with the attribute value
  //{[[Set]]:undefined}, nor to a non-existent property of an object whose [[Extensible]]
  //internal property has the value false. In these cases a TypeError exception is thrown
  //(11.13.1).
  var assignToNonWritable = function () {
      'use strict';
      var obj = {};
      Object.defineProperty(obj, "name", {
          writable: false
      });
      obj.name = "octopus";
  }

  JMVC.test.testException("can't assign to non-writable properties", assignToNonWritable, TypeError);

  var assignWhenSetterUndefined = function () {
      'use strict';
      var obj = {};
      Object.defineProperty(obj, "name", {
          set: undefined
      });
      obj.name = "cuttlefish";
  }

  JMVC.test.testException("can't assign when setter undefined", assignWhenSetterUndefined, TypeError);

  var assignToNonExtensible = function () {
      'use strict';
      var obj = {};
      Object.preventExtensions(obj);
      obj.name = "jellyfish";
  }

 JMVC.test.testException("can't assign to non extensible", assignToNonExtensible, TypeError);

  //The identifier eval or arguments may not appear as the LeftHandSideExpression of an
  //Assignment operator (11.13) or of a PostfixExpression (11.13) or as the UnaryExpression
  //operated upon by a Prefix Increment (11.4.4) or a Prefix Decrement (11.4.5) operator.
  JMVC.test.testException("can't assign to eval", "eval=3", SyntaxError);
  JMVC.test.testException("can't assign to arguments", "arguments=3", SyntaxError);
  JMVC.test.testException("can't postfix eval", "eval++", SyntaxError);
  JMVC.test.testException("can't postfix arguments", "arguments++", SyntaxError);
  JMVC.test.testException("can't prefix eval", "++eval", SyntaxError);
  JMVC.test.testException("can't prefix arguments", "++arguments", SyntaxError);

  //Arguments objects for strict mode functions define non-configurable accessor properties
  //named "caller" and "callee" which throw a TypeError exception on access (10.6).
  JMVC.test.testException(
    "can't use arguments.caller",
    function () {'use strict'; arguments.caller;},
    TypeError
  );

  JMVC.test.testException(
    "can't use arguments.callee",
    function () {'use strict'; arguments.callee},
    TypeError
  );

  //Arguments objects for strict mode functions do not dynamically share their array indexed
  //property values with the corresponding formal parameter bindings of their functions. (10.6).
  var assignToArguments = function (x) {
    'use strict';
    arguments[0] = 3;
    return x;
  }

  JMVC.test.testValue(
    "arguments not bound to formal params",
    assignToArguments,
    5,
    {args: [5]}
  );

  //For strict mode functions, if an arguments object is created the binding of the local
  //identifier arguments to the arguments object is immutable and hence may not be the
  //target of an assignment expression. (10.5).
  var assignToFormalParams = function (x) {
      'use strict';
      x = 3;
      return arguments[0];
  }

  JMVC.test.testValue(
    "arguments object is immutable",
    assignToFormalParams,
    5,
    {args: [5]}
  );

  //It is a SyntaxError if strict mode code contains an ObjectLiteral with more than one
  //definition of any data property (11.1.5).
  JMVC.test.testException("no duplicate properties", "({a:1, a:2})", SyntaxError);

  //It is a SyntaxError if the Identifier "eval" or the Identifier "arguments occurs as the
  //Identifier in a PropertySetParameterList of a PropertyAssignment that is contained in
  //strict code or if its FunctionBody is strict code (11.1.5).
  JMVC.test.testException(
    "eval not allowed in propertySetParameterList",
    "({set a(eval){ }})",
    SyntaxError
  );

  JMVC.test.testException(
    "arguments not allowed in propertySetParameterList",
    "({set a(arguments){ }})",
    SyntaxError
  );

  //Strict mode eval code cannot instantiate variables or functions in the variable environment
  //of the caller to eval. Instead, a new variable environment is created and that environment
  //is used for declaration binding instantiation for the eval code (10.4.2).
  JMVC.test.testException(
    "eval cannot create var in calling context",
    function () {'use strict'; eval('var a = 99'); a},
    ReferenceError
  );

  //If this is evaluated within strict mode code, then the this value is not coerced to an object.
  //A this value of null or undefined is not converted to the global object and primitive values
  //are not converted to wrapper objects. The this value passed via a function call (including
  //calls made using Function.prototype.apply and Function.prototype.call) do not coerce the
  //passed this value to an object (10.4.3, 11.1.1, 15.3.4.3, 15.3.4.4).
  var getThis = function () {
      'use strict';
      return this;
  }

  JMVC.test.testValue(
    "this is not coerced",
    getThis,
    4,
    {ctx: 4}
  );

  JMVC.test.testValue(
    "no global coercion for null",
    getThis,
    null,
    {ctx: null}
  );

  //When a delete operator occurs within strict mode code, a SyntaxError is thrown if its
  //UnaryExpression is a direct reference to a variable, function argument, or function name
  //(11.4.1).
  JMVC.test.testException("can't delete variable directly", "var a = 3; delete a", SyntaxError);
  JMVC.test.testException("can't delete argument", "function(a) {delete a}", SyntaxError);
  JMVC.test.testException("can't delete function by name", "function fn() {}; delete fn", SyntaxError);

  //When a delete operator occurs within strict mode code, a TypeError is thrown if the
  //property to be deleted has the attribute { [[Configurable]]:false } (11.4.1).
  var deleteNonConfigurable = function () {
      'use strict';
      var obj = {};
      Object.defineProperty(obj, "name", {
          configurable: false
      });
      delete obj.name;
  }

  JMVC.test.testException("error when deleting non configurable", deleteNonConfigurable, TypeError);

  //It is a SyntaxError if a VariableDeclaration or VariableDeclarationNoIn occurs within
  //strict code and its Identifier is eval or arguments (12.2.1).
  JMVC.test.testException("can't use eval as var name", "var eval;", SyntaxError);
  JMVC.test.testException("can't use arguments as var name", "var arguments;", SyntaxError);

  //Strict mode code may not include a WithStatement. The occurrence of a WithStatement
  //in such a context is an SyntaxError (12.10).
  JMVC.test.testException("can't use with", "with (Math) {round(sqrt(56.67))}", SyntaxError);

  //It is a SyntaxError if a TryStatement with a Catch occurs within strict code and the
  //Identifier of the Catch production is eval or arguments (12.14.1)
  JMVC.test.testException("can't use eval as catch id", "try {'cake'} catch(eval) {}", SyntaxError);
  JMVC.test.testException("can't use arguments as catch id", "try {'cake'} catch(arguments) {}", SyntaxError);

  //It is a SyntaxError if the identifier eval or arguments appears within a
  //FormalParameterList of a strict mode FunctionDeclaration or FunctionExpression (13.1)
  JMVC.test.testException("can't use eval as formal param", "function(eval) {}", SyntaxError);
  JMVC.test.testException("can't use arguments as formal param", "function(arguments) {}", SyntaxError);

  //A strict mode function may not have two or more formal parameters that have the same
  //name. An attempt to create such a function using a FunctionDeclaration, FunctionExpression,
  //or Function constructor is a SyntaxError (13.1, 15.3.2).
  JMVC.test.testException("can't duplicate formal params", "function(me, me, me) {}", SyntaxError);

  //An implementation may not associate special meanings within strict mode functions to
  //properties named caller or arguments of function instances. ECMAScript code may not
  //create or modify properties with these names on function objects that correspond to
  //strict mode functions (13.2).
  JMVC.test.testException(
    "can't use caller obj of function",
    function () {'use strict'; (function () {}).caller},
    TypeError
  );

  //It is a SyntaxError to use within strict mode code the identifiers eval or arguments as
  //the Identifier of a FunctionDeclaration or FunctionExpression or as a formal parameter
  //name (13.1). Attempting to dynamically define such a strict mode function using the
  //Function constructor (15.3.2) will throw a SyntaxError exception.
  JMVC.test.testException("can't use eval as function name", "function eval() {}", SyntaxError);
  JMVC.test.testException("can't use arguments as function name", "function arguments() {}", SyntaxError);

  var functionConstructorStr = "new Function('eval', 'use strict')";
  JMVC.test.testException("can't use eval as param name via constructor", functionConstructorStr, SyntaxError);

JMVC.test.testValue('just fails!!!',function(){return 1}, 2);


  JMVC.test.finishAll();			
			
			
			
			
			
			
			
		});
	}
	
};
