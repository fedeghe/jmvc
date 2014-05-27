JMVC.controllers.widget = function () {
	this.action_index = function () {
		//
		JMVC.events.loadify(1000);
		JMVC.require(
			'widget/modal/modal',
			'widget/slider/slider',
			'widget/accordion/accordion',
			'core/form/form',
			'event_scroll/event_scroll'
		);
		JMVC.head.meta("generator", "JMVC widget");
		JMVC.head.addStyle(JMVC.vars.baseurl + '/media/css/widget.css', true);
		//
		var M = Math,
			v = JMVC.getView('vacuum'),
			that = this;
		//
		
		v.set({
			'style' : 'font-family:verdana; margin:0 auto; margin-top:10px; width:600px;',
			'content' : '&nbsp;',
			'id' : 'content'
		});
			
		
		
		
	
		// JMVC.require('iscroll/iscroll');
		// var vs = JMVC.getView('scroll');
		
		
	
		
		
		
		v.render({cback : function () {
			
			
			//modal
			var container = JMVC.dom.find('#content'),
				butt = JMVC.dom.create('input', {type:'button',value:'open modal', id: 'openmodal', style:'cursor:pointer'});
			
			
			
			
			JMVC.dom.append(container, butt);
			JMVC.events.bind(JMVC.dom.find('#openmodal'), 'click', function () {
				var t = JMVC.dom.create('span', {}, 'Here is some content');
				JMVC.modal.open(t, {title: 'Modal title', width: 600, height : 400, bgcolor:'#777', shadow : true});
			});
			
			
			JMVC.dom.add(container, 'hr');
			var inputxt = JMVC.dom.create('input', {"type":"text", 'id':'dbgtxt'});
			JMVC.dom.append(container, inputxt);
			JMVC.form.slidenum(inputxt, 50, {from:-100, to:1000,step:10});
			
			
			JMVC.dom.add(container, 'hr');
			
			
			
			//slider
			var slider1 = new JMVC.widget.Slider(JMVC.dom.add(container, 'div', {id:'slider1', style:'margin-top:10px'}), 300),
				out1 = JMVC.dom.add(container, 'span', {id:'out1', style:'padding-left:10px'}),
				slider2 = new JMVC.widget.Slider(JMVC.dom.add(container, 'div', {id:'slider2', style:'margin-top:10px'})),
				out2 = JMVC.dom.add(container, 'span', {id:'out2', style:'padding-left:10px'}),
				slider3 = new JMVC.widget.Slider(JMVC.dom.add(container, 'div', {id:'slider3', style:'margin-top:10px'})),
				out3 = JMVC.dom.add(container, 'span', {id:'out3', style:'padding-left:10px'});

			var btn1 = JMVC.dom.create('input', {type:'button',value:'m1'}),
				btn2 = JMVC.dom.create('input', {type:'button',value:'m2'}),
				btn3 = JMVC.dom.create('input', {type:'button',value:'m3'});
			

			
			slider1.init([-1000,2000], 140, false, 20);
			slider1.onChange(function(v){JMVC.dom.html(out1, v.up);});
			slider1.setListening(true);
			
			slider2.init([100,1000], 400, 220, 10);
			slider2.onChange(function(v){JMVC.dom.html(out2, '[' + v.down + ', ' + v.up + ']');});
			slider2.setListening(true);
			
			slider3.init([-2000,10000], 7000, -350, 50);
			slider3.onChange(function(v){JMVC.dom.html(out3, '[' + v.down + ', ' + v.up + ']');});
			slider3.setListening(true);
			
			JMVC.dom.add(container, 'br');
			JMVC.dom.add(container, 'br');
			JMVC.dom.append(container, btn1);
			JMVC.dom.append(container, btn2);
			JMVC.dom.append(container, btn3);

			JMVC.events.bind(btn1, 'click', function () {slider3.setValue(1000, -2000);} );
			JMVC.events.bind(btn2, 'click', function () {slider3.setValue(7000, 1000);} );
			JMVC.events.bind(btn3, 'click', function () {slider3.setValue(10000, 7000);} );

			JMVC.W.s1 = slider1;
			JMVC.W.s2 = slider2;
			JMVC.W.s3 = slider3;
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			JMVC.dom.add(container, 'hr');
			
			//accordion
			var contAcc = JMVC.dom.add(container, 'div', {'id':'waccord','style':'width:200px;margin-top:20px'});
			
			
			var acc = new JMVC.widget.Accordion(150, true, 'black');
			acc.addElement('prova1', '<h2>contenuto</h2><p>testo di prova 1</p>');
			acc.addElement('prova2', '<h2>contenuto</h2><p>testo di prova 2</p>');
			acc.addElement('prova3', '<h2>contenuto</h2><p>testo di prova 3</p>');
			acc.addElement('prova4', '<h2>contenuto</h2><p>testo di prova 4</p><p>testo di prova 4</p><p>testo di prova 4</p>');
			acc.addElement('prova5', '<h2>contenuto</h2><p>testo di prova 5</p>');
			acc.addElement('prova6', '<h2>contenuto</h2><p>testo di prova 6</p>');
			acc.addElement('prova7', '<h2>contenuto</h2><p>testo di prova 7</p>');
			acc.addElement('prova8', '<h2>contenuto</h2><p>testo di prova 8</p>');
			acc.addElement('prova9', '<h2 data-act="azionex" data-par="parx" >contenuto</h2><p data-actz="azioney" data-parz="pary" >testo di prova 9</p>');
			acc.render(contAcc, 2, 'acc1');

			JMVC.dom.add(container, 'hr');



			
		}});
	};


};
