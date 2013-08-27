JMVC.require('core/lib/border', 'widget/snow/snow', 'core/css', 'core/dim');

JMVC.controllers.cubic = function () {
	"use strict";
	this.action_index = function () {
		JMVC.events.loadify(500);
		JMVC.head.addstyle(
			'body{background-color:#222; color:white;}'+
			'div.gbox{margin:50px;height:200px;width:200px;top:0px;position:relative;}'+
			'div.lett{'+
				'position:absolute;'+
				'text-align:center;'+
				'margin:0 auto;'+
				'font-size:250px;'+
				'font-family:Lucida Grande,​Lucida Sans Unicode,​sans-serif'+
			'}'+
			'div.lJ {left:68px;top:-100px}'+
			'div.lM {left:-7px;top:-50px}'+
			'div.lV {left:18px;top:-52px}'+
			'div.lC {left:12px;top:-51px}'+
			'td.space {height:0px;font-size:0px;}'
		, true, true);
		
		
		var t = JMVC.getView('test/indextbl'),
			that = this;
	
		/* console.debug(t.content) */
		t.render(function(){
			
			var lett = false,
				J = JMVC.dom.create('div',{'class':'gbox', 'style':'background-color:#e00'},lett?'<div class="lett lJ">J</div>':''),
				M = JMVC.dom.create('div',{'class':'gbox', 'style':'background-color:#0e0'},lett?'<div class="lett lM">M</div>':''),
				V = JMVC.dom.create('div',{'class':'gbox', 'style':'background-color:#00e'},lett?'<div class="lett lV">V</div>':''),
				C = JMVC.dom.create('div',{'class':'gbox', 'style':'background-color:#ee0'},lett?'<div class="lett lC">C</div>':'');
			
			
			
			
			
			JMVC.dom.append(JMVC.dom.find('#cellJ'), [J]);
			JMVC.dom.append(JMVC.dom.find('#cellM'), [M]);
			JMVC.dom.append(JMVC.dom.find('#cellV'), [V]);
			JMVC.dom.append(JMVC.dom.find('#cellC'), [C]);
			
			JMVC.dom.append(J, JMVC.border.xbottom(20,200, 50,30,'#a00'));
			JMVC.dom.append(J, JMVC.border.xright(200,30, 70,20,'#600'));
			
			JMVC.dom.append(M, JMVC.border.xbottom(30,200, -50,-100,'#0a0'));
			JMVC.dom.append(M, JMVC.border.xleft(200,50, 70,30,'#060'));
			
			JMVC.dom.append(V, JMVC.border.xtop(10,200, 80,50,'#00a'));
			JMVC.dom.append(V, JMVC.border.xright(200,50, -10,-70,'#006'));
			
			JMVC.dom.append(C, JMVC.border.xtop(10,200, -50,-80,'#aa0'));
			JMVC.dom.append(C, JMVC.border.xleft(200,50, -10,-70,'#660'));
			
			
			
			/* console.dir(JMVC.dim.window()) */
			
			JMVC.snow.start(JMVC.dom.body());
			
		});
		
	}
};

