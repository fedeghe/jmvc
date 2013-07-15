JMVC.controllers.form = function () {
	this.action_index = function () {
		
		JMVC.events.loadify(500);
		
		JMVC.require('fvalidation');
		
		
		var index = JMVC.getView('form');
			
		index.render(function () {
			var submit = JMVC.dom.find('#save');
			JMVC.events.bind(submit, 'click', function (e) {
				
				
				
				var ret =  JMVC.fvalidation.validate({
					'name':'string',
					'option':'string',
					'tarea':'string'
				});
				
				if(!ret){
					JMVC.events.preventDefault(e);
				}
	
			});



			JMVC.require('iscroll');
			JMVC.iscroll.create(JMVC.dom.find('#tarea'), 'urle', 2);




		});
	};
};