JMVC.controllers.test = function () {
	
	/* test a route */ 
	this.addRoutes({
		'swiss' : 'flag',
		f : 'flag'
	});

	this.action_index = function () {
		
		JMVC.require('vendors/google/analytics', 'core/responsive/basic');
		JMVC.events.loadify(500);
	
		//JMVC.require('widget/slider');
		
		var content = '<h3>TESTS</h3>',//<div id="bar"></div>',
			bu = JMVC.vars.baseurl,
			v = JMVC.getView('vacuum'),
			links = {
				'Model' : 'test/model',
				'Controller' : 'test/controller',
				'View' : 'test/view',
				'Tabs' : 'tabs/one/i_say/Hello%20my%20Guest',
				'Some fun' : 'test/flag',
				'Logo' : 'test/logo',
				'Google' : 'google.jmvc',
				'Observer' : 'test/observer.jmvc',
				'Sheduler' : 'test/scheduler.jmvc',
				'Effects' : 'test/fx.jmvc',
				'Key' : 'test_key',
				'* strict' : 'test_strict',
				'* obj/bucket' : 'test_bucket',
				'* obj/deque' : 'test_deque',
				'* obj/date' : 'test_date',
				'canvas ext using 2d lib' : 'test_canvas',
				'* lib/array' : 'test_array',
				'* JMVC.util.inArrayRich' : 'test_arrayOp',
				'* lib/crypt' : 'test_crypt',
				'modal' : 'test_modal',
				'widget' : 'test_widget',
				'cubic' : 'cubic',
				'map_animator' : '?map=true',
				'carpet' : 'carpet'
			},
			style = {
				'body' : {
					'background-color' : '#fff',
					'color' : '#000'
				},
				'ul' : {
					'list-style-type' : 'none',
					'padding' : '0px',
					'margin' : '0px',
					'border' : '0px'
				},
				'a' : {
					'color' : '#AAA',
					'padding-left' : '1px',
					'text-decoration' : 'none',
					'line-height' : '20px'
				},
				'a:hover' : {
					'color' : 'red'
				}
			},
			tpl = '<li><a href="%base_url%/%path%">$index$ %label%</a></li>',
			out = '',
			i;

		
		for (i in links) {
			out += JMVC.string.replaceall(tpl, {'base_url' : bu, 'path' : links[i], 'label' : i});
		}	
			
		content += '<ul>' + out + '</ul>';
		//
		content += '<br /><b>* real test</b>';
		
		
		

		JMVC.head.addstyle(JMVC.object.obj2css(style), true, true);
		
		v.set({
			'id' : 'content',
			'style' : 'font-family:Verdana, sans-serif; font-size:12px;',
			'content' : content,
			'index' : '&#9826;'
		});
		v.render(/*{cback : function () {
			// JMVC.require('affix');	
			// JMVC.affix.add({html:'<h4>Content</h4>', init : 200, min : 100, style:'height:800px;background-color:red;padding:10px;right:100px;border:1px solid black'});
		}}*/);
		
		
		/*
		v.render({cback : function(){
			var slider = new JMVC.Slider(JMVC.dom.find('#bar') );
			slider.init([50,200], 180, 70, 10);
		}});
		*/		
	};


	// test a VIEW	
	this.action_view = function () {
		var v = JMVC.getView('test'),
			v1= JMVC.factory('view', 'test1'),
			v2= JMVC.factory('view', 'test2');
		v1.set('result', 'ok1');
		v2.set('result', 'ok2');
		v2.set('result2', 'ok2bis');
		v.render();
	};
	
	
	
	// test some MODELs
	this.action_model = function() {
		var _p1 = JMVC.getModel('xxx/Persona'),
			_p2 = JMVC.getModel('Persona2'),
			_p3 = JMVC.getModel('Persona2'),
			tpl,
			al = '',
			v = JMVC.getView('vacuum');

		//get model instance
		//_p1.set('cognome','Ghedina').set('n',1);
		_p1.set({'cognome' : 'Ghedina', 'n' : 1});//.set('cognome','Spaceman',true);
		_p2.set('cognome', 'Ghedi').set('n', 2);
		_p3.set('cognome', 'Ghe').set('n', 3);
		
		//	console.debug(_p1);
		tpl = 'Modello n°%n%: %nome% %cognome%<br />';
		al += tpl.replace('%n%', _p1.get('n')).replace('%nome%', _p1.name).replace('%cognome%', _p1.get('cognome'));
		al += tpl.replace('%n%', _p2.get('n')).replace('%nome%', _p2.name).replace('%cognome%', _p2.get('cognome'));
		al += tpl.replace('%n%', _p3.get('n')).replace('%nome%', _p3.name).replace('%cognome%', _p3.get('cognome'));
		
		
		v.set('content', al);
		//console.debug(v);
		//v.set('id', 'nerd');
		v.set('style', 'padding:5px; border:5px solid red; font-size:12px; width:280px; background-color:white; color:green; font-weight:bold; font-family:verdana, sans-serif');
		v.render();
	};

	this.action_modelviewparse = function() {
		var p = JMVC.getModel('Persona'),
			v = JMVC.getView('parse');
		p.set('name', 'Fredrich');
		v.parse(p).render();
	};

	// test a CONTROLLER
	this.action_controller = function() {
		this.set('nome','Federico');
		alert(this.get('nome'));
	};
	this.action_controller2 = function() {
		this.set('nome','Federico2');
		alert(this.get('nome'));
	};
	
	
	// just to celebrate a good start
	this.action_flag = function() {
		// color extension is needed
		JMVC.require('core/color');
		
		JMVC.head.title('CH beat');
		JMVC.head.addstyle(JMVC.vars.baseurl+'/media/css/flag.css');

		var v = JMVC.getView('flag'),
			mode = 'grow',
			box_size=1,
			factor = 0.8,
			top_fact = 80,
			els_top = [],
			i = 0,
			l = 5 * 7,
			recall = function() {
				for(null; i<l; i++) {
					els_top[i] = JMVC.util.rand(10, top_fact-5);
				}
			},
			back = false;
			
		recall();
		
		back = function(s) {
			var basesize = s || box_size,
				f = document.getElementById('flag'),
				boxes = [],
				tmp, i, j, l,
				fact,
				opac = Math.sqrt(basesize/(box_size*top_fact));
			f.style.width = (basesize * 7.5) + 'px'; // damnIE
			f.style.height = (basesize * 5.5) + 'px';// damnIE
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
					((JMVC.array.inArray([10,16,17,18,24], i)>=0)? 'white':'red')
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
	
	this.action_direct = function() {
		JMVC.head.title('Swiss beat');
		JMVC.head.addstyle(JMVC.vars.baseurl+'/media/css/flag.css');
		this.render(
			'<b style="color:green">hello</b>',
			function() {
				JMVC.debug('simple callback on render!');
			}
		);
	}
	
	this.action_viewplus = function() {
		JMVC.head.title('Hello');
		JMVC.getView('superview');
		var _v = JMVC.getView('sv');
		_v.set('hello', ', I said hellooooooo !!!');
		_v.render();
		
	};
	
	
	
	

	this.action_logo = function(){
		JMVC.events.loadify(1000);
		JMVC.require('plotter', 'core/obj/bucket');
		var M = Math;
		var v = JMVC.getView('vacuum');
		
		v.set({'style':'font-family:verdana;margin:0 auto;width:450px;height:150px;margin-top:80px;position:relative','content':'&nbsp;','id':'extralogo'});
		
		JMVC.head.addstyle(JMVC.vars.baseurl+'/media/css/logo.css');
		
		v.render({cback:function(){
			var newlogo = document.getElementById('extralogo');
			var j = new JMVC.graf.letter('j', 22, 40),
				m = new JMVC.graf.letter('m', 22, 110),
				v = new JMVC.graf.letter('v', 22, 260),
				c = new JMVC.graf.letter('c', 22, 320);

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

			v.line(0,45,0,69, 2);
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
				if(!bucket.hasMore()){bucket.recover();}
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
		//JMVC.util.denyXframe();
	};
	
	this.action_xmlparser = function(){
		JMVC.require('core/xmlparser');
		
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
	
	this.action_docs = function(){
		JMVC.require('core/xmlparser');
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
				/*
				for(var j = 0, l= node.childNodes[2].childNodes.length; j<l; j++){
					ret.params[  JMVC.xmlparser._attribute(node.childNodes[2].childNodes[j], 'name')  ]  =  JMVC.xmlparser._text(node.childNodes[2].childNodes[j]);					
				}
				*/
				JMVC.each(node.childNodes[2].childNodes, function (el, i) {
					ret.params[  JMVC.xmlparser._attribute(el, 'name')]  =  JMVC.xmlparser._text(el);					
				});
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
	
	this.action_scheduler = function () {
		JMVC.require('scheduler');
		var s = new JMVC.scheduler.create();
		s.add({every : 3000}, function (d) {JMVC.debug(d); });
		//console.debug(s);
	};
	
	
	this.action_observer = function () {
		JMVC.require('core/codeview/html');
		var list = JMVC.getModel('List', ['Item0', 'Item1', 'Item2', 'Item3']),
			v = JMVC.getView('vacuum'),
			explain = 'Use buttons to add/remove items to the list (constructed with some elements)<br />' +
				'<[H[' +
					'var list = JMVC.getModel(\'List\', [\'Item0\', \'Item1\', \'Item2\', \'Item3\']);' +
				']H]>';
		
		
		//JMVC.debug(list.getItems());
		v.set({style : 'background-color:red; color:white;padding:10px;margin-bottom:10px;', id : 'prova'});
		v.set('content', explain);
		//JMVC.debug(v);
		
		list.setBuildStrategy(function (ul) {
			JMVC.dom.empty(ul);
			JMVC.each(list.getItems(), function (el, i) {
				JMVC.dom.append(ul, JMVC.dom.create('li', {}, i + ' : ' + el));
			});
		});
		
		v.render({
			cback : function () {
				var butt_plus = JMVC.dom.add(JMVC.dom.body(), 'input', {type : 'button', value : '+', id : 'butt_plus'}),
					butt_minus = JMVC.dom.add(JMVC.dom.body(), 'input', {type : 'button', value : '-', id : 'butt_minus'}),
					ulist = JMVC.dom.add(JMVC.dom.body(), 'ul', {style : 'list-style-type:none;padding:10px;border:1px solid gray;width:200px;background-color:#eee;', id : 'mylist'}),
					item,
					render;

				JMVC.events.bind(butt_plus, 'click', function () {
					item = prompt('Item to add');
					if (item !== null && item !== '') {
						list.addItem(item);
					}
				});
				JMVC.events.bind(butt_minus, 'click', function () {
					item = prompt('Item index to be removed');
					if (item !== null && item !== '' && !isNaN(item)) {
						list.removeItemAt(item);
					} else {
						alert('Noitem with index ' + item);
					}
				});

				//or simply
				list.listModified.attach(function () {list.build(ulist); });

				//first time build
				list.build(ulist);
			}
		});
		
		
	}
	
	this.action_fx = function () {
		JMVC.require('core/fx', 'animator', 'core/obj/calendar', 'timer');
		//
		var v = JMVC.getView('vacuum');
		v.set({style : 'background-color:red', id : 'prova'});
		v.set('content', 'hello u');
		v.render({
			cback : function () {
				JMVC.dom.add(JMVC.dom.body(), 'span', {id : 'bull'}, '&bull;');
				var trg = JMVC.dom.add(JMVC.dom.body(), 'div', {id : 'timer'}),
					cal = JMVC.dom.add(JMVC.dom.body(), 'div', {id : 'cal'}),
					calInst;

				JMVC.css.style(cal, {
					'border' : '5px solid gray',
					'padding' : '10px',
					'margin' : '20px',
					'background-color' : 'pink'
				});
				
				calInst = new JMVC.calendar.create();
				calInst.getMonthMap(7, 2012);
				calInst.getContour(7, 2012);
				
				JMVC.dom.html(cal, calInst.render());
				
				new JMVC.timer.create({target : trg});
				
				JMVC.fx.fadeIn(JMVC.dom.find('#prova'));
				JMVC.animator.follow_ipath(
					JMVC.dom.find('#bull'),
					function (i) {return Math.abs(20 * Math.cos(i / 10)); },
					{from : 0, to : 400},
					{step : 2, mode : 'back'}
				);
			}
		});
	}





	
};
