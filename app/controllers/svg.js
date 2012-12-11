JMVC.controllers.svg = function () {
	//
	this.index = function () {
		//
		JMVC.events.loadify(50);
		JMVC.require('lib/svg','dim');
		JMVC.head.meta("generator", "jmvc resident in your machine");
		var v = JMVC.getView('vacuum'),
			that = this,
			dims,
			mapid,
			b;

		v.set({'style' : 'font-family:verdana;', 'content' : '&nbsp;', 'id' : 'extralogo'});

		v.render({cback : function () {
			var svg = JMVC.svg.create(400,400);
			svg.rect(300, 100, '#fede76');
			svg.circle(50, 50 ,30 ,'#fe0e76');
			svg.line(10, 10 ,80,110 ,'#fe0e76');
			
			
			svg.render(JMVC.dom.body());
		}});
	};
}