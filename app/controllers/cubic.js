JMVC.require(
	'core/lib/border/border',
	'widget/snow/snow/snow',
	'core/dim/dim'
);
JMVC.controllers.cubic = function () {
	'use strict';
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
		
		var t = JMVC.getView('test/indextbl');

		t.render(function () {
			
			var baseAttrs = {'class' : 'gbox'},
				A = JMVC.dom.add(JMVC.dom.find('#cellA'), 'div', JMVC.object.extend(baseAttrs, {'style' : 'background-color:#e00'}), ''),
				B = JMVC.dom.add(JMVC.dom.find('#cellB'), 'div', JMVC.object.extend(baseAttrs, {'style' : 'background-color:#0e0'}), ''),
				C = JMVC.dom.add(JMVC.dom.find('#cellC'), 'div', JMVC.object.extend(baseAttrs, {'style' : 'background-color:#00e'}), ''),
				D = JMVC.dom.add(JMVC.dom.find('#cellD'), 'div', JMVC.object.extend(baseAttrs, {'style' : 'background-color:#ee0'}), ''),
				E = JMVC.dom.add(JMVC.dom.find('#cellE'), 'div', JMVC.object.extend(baseAttrs, {'style' : 'background-color:#e0e'}), ''),
				F = JMVC.dom.add(JMVC.dom.find('#cellF'), 'div', JMVC.object.extend(baseAttrs, {'style' : 'background-color:#0ee'}), '');

			JMVC.dom.append(A, [JMVC.border.xbottom(40, 200, 50, 30, '#a00'), JMVC.border.xright(200, 30, 100, 40, '#600')]);
			JMVC.dom.append(B, [JMVC.border.xbottom(30, 200, -30, -100, '#0a0'), JMVC.border.xleft(200, 30, 70, 30, '#060')]);

			JMVC.dom.append(C, [JMVC.border.xright(200, 30, 20, -20, '#00a')]);
			JMVC.dom.append(D, [JMVC.border.xleft(200, 30, 20, -20, '#aa0')]);

			JMVC.dom.append(E, [JMVC.border.xtop(10, 200, 80, 30, '#a0a'), JMVC.border.xright(200, 30, -10, -70, '#606')]);
			JMVC.dom.append(F, [JMVC.border.xtop(10, 200, -30, -80, '#0aa'), JMVC.border.xleft(200, 30, -10, -70, '#066')]);
			
			//JMVC.snow.start(JMVC.dom.body());
		});
	};
};