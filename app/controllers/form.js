JMVC.controllers.form = function () {
	'use strict';
	this.action_index = function () {
		
		JMVC.events.loadify(500);
		
		JMVC.require('core/fvalidation/fvalidation');
		
		
		var index = JMVC.getView('form'),
			rules = {
				'name' : 'string',
				'option' : 'string',
				'tarea' : 'string'
			};
			
			
		index.render(function () {
			
			var submit = JMVC.dom.find('#save');
			
			JMVC.events.bind(submit, 'click', function (e) {
				!JMVC.fvalidation.validate(rules) && JMVC.events.preventDefault(e);
			});
			
			JMVC.require('iscroll/iscroll');
			JMVC.iscroll.create(JMVC.dom.find('#tarea'), 'urle', 2);
			
		});
	};
	
	
	
	
	this.action_validation = function () {
		JMVC.events.loadify(500);
		JMVC.require('core/validation/validation');

		var index = JMVC.getView('form');

		index.render(function () {
			var submit = JMVC.dom.find('#save'),
				validator = JMVC.validation.create();
			
			//validator.add(rules);
			
			JMVC.events.bind(submit, 'click', function (e) {
				validator.check();
				JMVC.events.preventDefault(e);
			});
			
			JMVC.require('iscroll/iscroll');
			JMVC.iscroll.create(JMVC.dom.find('#tarea'), 'urle', 2);

		});
	};
	
};