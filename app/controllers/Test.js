JMVC.controllers.Test = function() {
	
	/* test a route */ 
	this._routes = {
		swiss : 'flag',
		f : 'flag',
		angelo : 'flag'
	};

	this.index = function(){
		var content = '<h3>tests</h3>';
		content+='<a href="test/model">Model</a><br />'+
			'<a href="test/controller">Controller</a><br />'+
			'<a href="test/view">View</a><br />'+
			'<a href="test/flag">Some fun</a><br />';
		
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
		var _p1 = JMVC.getModel('Persona'),
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
		this.require('color');
		
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
				fact;
			f.style.width = (basesize*7.5)+'px'; // damnIE
			f.style.height = (basesize*5.5)+'px';// damnIE
			f.style.margin = '0 auto';
			f.style.marginTop = (basesize)+'px';
			j=0;
			for(i=0, l=5*7; i<l; i++) {
				j++;					
				tmp = JMVC.dom.create('div',{'style':'width:'+basesize+'px; height:'+basesize+'px;', 'class':'box'},'&nbsp;');
				JMVC.dom.append(f, tmp);
				tmp.style.backgroundColor = (basesize > els_top[i]) ?
					((JMVC.util.in_array([10,16,17,18,24], i)>=0)? 'white':'red')
					:
					JMVC.util.getRandomColor();
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
			//if(basesize<50) {
			window.setTimeout(
				function() {
					f.innerHTML = '';
					back(basesize+fact);
				},
				25
			);
		};
		
		v.render({cback : back });
		
		
		
		
		
	};
	
	this.direct = function() {
		JMVC.head.title('Swiss beat');
		JMVC.head.addstyle(JMVC.baseurl+'/media/css/flag.css');
		this.render(
			'<b style="color:white">hello</b>',
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
};
