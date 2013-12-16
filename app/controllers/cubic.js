JMVC.require(
	'core/lib/border/border',
	'widget/snow/snow/snow',
	'core/css/css',
	'core/dim/dim'
);
JMVC.controllers.cubic = function () {
	"use strict";
	this.action_index = function () {
		JMVC.events.loadify(500);
		
		JMVC.head.addstyle(
			JMVC.object.toCss({
				body : {
					'background-color' : '#222'
				},
				'div.gbox' : {
					margin : '50px',
					height : '200px',
					width : '200px',
					top : '0px',
					position : 'relative'
				}
			}),
			true,
			true
		);
		
		var t = JMVC.getView('test/indextbl'),
			that = this;
	
		t.render(function () {
			
			var baseAttrs = {'class' : 'gbox'},
				J = JMVC.dom.add(JMVC.dom.find('#cellJ'), 'div', JMVC.object.extend(baseAttrs, {'style' : 'background-color:#e00'}), ''),
				M = JMVC.dom.add(JMVC.dom.find('#cellM'), 'div', JMVC.object.extend(baseAttrs, {'style' : 'background-color:#0e0'}), ''),
				V = JMVC.dom.add(JMVC.dom.find('#cellV'), 'div', JMVC.object.extend(baseAttrs, {'style' : 'background-color:#00e'}), ''),
				C = JMVC.dom.add(JMVC.dom.find('#cellC'), 'div', JMVC.object.extend(baseAttrs, {'style' : 'background-color:#ee0'}), '');

			JMVC.dom.append(J, [JMVC.border.xbottom(20, 200, 50, 30, '#a00'), JMVC.border.xright(200, 30, 70, 20, '#600')]);
			JMVC.dom.append(M, [JMVC.border.xbottom(30, 200, -50, -100, '#0a0'), JMVC.border.xleft(200, 50, 70, 30, '#060')]);
			JMVC.dom.append(V, [JMVC.border.xtop(10, 200, 80, 50, '#00a'), JMVC.border.xright(200, 50, -10, -70, '#006')]);
			JMVC.dom.append(C, [JMVC.border.xtop(10, 200, -50, -80, '#aa0'), JMVC.border.xleft(200, 50, -10, -70, '#660')]);
			
			JMVC.snow.start(JMVC.dom.body());
		});	
	}
};

