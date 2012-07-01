JMVC.controllers.Test = function() {
	
	/* test a route */ 
	this._routes = {
		swiss : 'flag',
		f : 'flag'
	};

	this.index = function(){
		var content = '<h3>TESTS</h3>';
		content+='<a href="'+JMVC.vars.baseurl+'/test/model">Model</a><br />'+
			'<a href="'+JMVC.vars.baseurl+'/test/controller">Controller</a><br />'+
			'<a href="'+JMVC.vars.baseurl+'/test/view">View</a><br />'+
			'<a href="'+JMVC.vars.baseurl+'/test/flag">Some fun</a><br />'+
			'<a href="'+JMVC.vars.baseurl+'/test/tabs/i_say/Hello%20my%20Guest">Tabs</a><br />'+
			'<a href="'+JMVC.vars.baseurl+'/test/logo">Logo</a><br />';
		
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
				console.debug('simple callback on render!');
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
		
		JMVC.require('plotter');
		var M = Math;
		
		var v = JMVC.getView('vacuum');
		
		v.set({'style':'font-family:verdana;margin:0 auto;width:450px;height:150px;margin-top:80px;position:relative','content':'&nbsp;','id':'extralogo'});
		
		JMVC.head.addstyle(JMVC.vars.baseurl+'/media/css/logo.css');
		
		v.render({cback:function(){
			var newlogo = document.getElementById('extralogo');
			var j = new JMVC.graf.letter('j', 40, 22),
				m = new JMVC.graf.letter('m',110,22),
				v = new JMVC.graf.letter('v',260, 22),
				c = new JMVC.graf.letter('c',320, 22);

			j.line(4,0, 4,22, 2);
			j.line(4,0, 26,0, 2);
			j.line(26,0, 26, 22, 2);
			j.line(4,22, 26,22, 2);
			j.line(36,0,56,0, 2);
			j.line(36,0,36,30, 3);
			j.line(56,0,56,30, 3);
			j.line(0,87,1,107, 2);
			j.arc(-16,38, 72,72, M.PI/26	, 0, 12);
			j.arc(-16,38, 52,52, M.PI/20	, 0	, 9);
			j.plot(newlogo);

			m.line(0,0, 24,0, 2);
			m.line(0,0, 0,60, 7);
			m.line(24,0, 24,60, 7);
			m.line(0,60, 24,60, 2);
			m.arc(34,60, 53,53, M.PI/20	, -M.PI/2	, 11	);
			m.arc(34,60, 30,30, M.PI/10	, -M.PI/2	, 6	);
			m.arc(84,60, 53,53, M.PI/20	, -JMVC.util.deg2rad(108)	, 13	);
			m.arc(84,60, 30,30, M.PI/12	, -JMVC.util.deg2rad(90)	, 7	);
			m.line(64,60, 87,60, 2);
			m.line(114,60, 137,60, 2);
			m.plot(newlogo);

			v.line(45,0, 69,0, 2);
			v.line(45,0, 45,45, 4);
			v.line(69,0, 69,45, 4);
			v.arc(23,45, 22,22, M.PI/8	, 0	, 3	);
			v.arc(23,45, 46,46, M.PI/18	, 0	, 8	);
			v.line(38,60, 38,88, 2);
			v.line(28,60, 28,88, 2);
			v.line(0,60, 28,88, 3);
			v.line(0,60, 12,48, 1);
			v.line(28,60, 12,48, 1);
			v.plot(newlogo);

			c.line(80,0,80,22,2);
			c.line(80,0,58,0,2);
			c.line(80, 22,58,22,2);
			c.arc(58,36, 12,12, M.PI/6	, M.PI	, 3	);
			c.arc(58,36, 36,36, M.PI/14	, M.PI	, 7	);
			c.line(22,44,22,51,0);
			c.line(46,44,46,51,0);
			c.line(22,58,46,58,2);
			c.line(22,66,66,66,5);
			c.line(66,66,66,88,2);
			c.line(44,88,66,88,2);
			c.arc(44,66, 22,22, M.PI/8		, M.PI/2	, 4	);
			c.plot(newlogo);

			var a = newlogo.childNodes;
			var i = 0;
			
			var t = window.setInterval(function(){
				var trg = JMVC.util.rand(1,a.length-1);
					try{var c = a[trg].style.color;}catch(e){
						//console.debug(trg);
					}

				window.setTimeout(
					function(t1){
						a[t1].style.color = 'white';
						window.setTimeout(
							function(t2){a[t2].style.color = c;},50, t1
						);
					},0, trg);

			},70);
		}});
	};
	
	this.xmlparser = function(){
		JMVC.require('xmlparser');
		JMVC.require('xxx/xxx');
		
		var d = new JMVC.xmlparser.load('<?xml version="1.0" encoding="UTF-8" ?><root><el><name sex="M">federico</name><surname>ghedina</surname><struct><a>A</a><b>B</b></struct></el><el><name>federico2</name><surname>ghedina2</surname></el></root>'),
			t=false;
		d.extractor(function(node){return {name:JMVC.xmlparser._text(node.childNodes[0]), surname : JMVC.xmlparser._text(node.childNodes[1]), sex : JMVC.xmlparser._attribute(node.childNodes[0],'sex')}});
		t = d.extractor(0);
		console.debug(t);
		console.debug(d.xmlDoc.getElementsByTagName('struct')[0]);
		
		d.extractor(function(node){console.debug(2, node);return {a:JMVC.xmlparser._text(node)};},true);
		d.pointer(d.xmlDoc.getElementsByTagName('struct')[0]);
		
		t = d.extractor(0);
		console.debug(t);
		t = d.extractor(1);
		console.debug(t);
		//JMVC.yes.prova();
	};
	
	this.docs = function(){
		JMVC.require('xmlparser');
		var doc = JMVC.io.get(JMVC.vars.baseurl+'/media/documentation.xml',function(doc){
			
			var parser = new JMVC.xmlparser.load(doc);

			parser.extractor(function(node){
				//console.debug('node is ',node);
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
				
			
			console.debug(parser.root());
			console.debug(JMVC.xmlparser.toJson(parser.root()));
			console.debug(JMVC.xmlparser.toJson(parser.xmlDoc.getElementsByTagName('dom')[0] ));
			
			
			var r = parser.extractor(0);
			//console.debug(r);
			
			var all = parser.extractall();
			//console.debug(all);
			
			//step into model
			parser.pointer(parser.xmlDoc.getElementsByTagName('model')[0]);
			r = parser.extractor(0);
			//console.debug(r);
		},true,true);
		
	}
	
	this.tabs = function(){
		JMVC.require('tabs');
		var index = JMVC.getView('index');
		//JMVC.getView('superview');
		//JMVC.getView('sv');
		
		index.set_from_url('i_say', 'No one');
		
		var tab = new JMVC.tabs.tab();
		tab.add('Direct1', 'conteuto di prova1');
		tab.add('Param view', '{{sv goal=`mygoal`}}');
		tab.add('Prova LOGO', '<iframe width="100%" height="300px" frameborder="0" src="http://www.jmvc.dev/test/logo"></iframe> ');
		
		var tab2 = new JMVC.tabs.tab();
		tab2.add('Direct2', 'conteuto di prova2');
		tab2.add('Param view', '{{sv goal=`mygoal`}}');
		tab2.add('Prova Flag', '<iframe width="100%" height="600px" frameborder="0" src="http://www.jmvc.dev/test/flag"></iframe> ');
		
		index.render({cback: function(){
			tab.render('cent', 'ciccio');
			tab2.render('cent', 'ciccio2');
		}});
	};
	
};
