JMVC.require('core/lib/cookieMonster/cookieMonster');
JMVC.controllers.orient = function() {

	'use strict';

	var self = this;

    this.before = function() {
		//JMVC.events.loadify(1000);
		self.startController = JMVC.util.now();
		JMVC.debug(-2)
	};

	this.before_index = this.before_flag = function() {
		self.startAction = JMVC.util.now();
		JMVC.debug(-1)
	};

	this.after_index = this.after_flag = function() {
		self.endAction = JMVC.util.now();
		JMVC.debug(1)
	};




	this.action_orientation = function () {

		//JMVC.require('vendors/twitter/twitter');

		JMVC.getView('vacuum')
			.set({
				style: '',
				id: 'container',
				'content': ''
			})
			.render(function() {

				// experimental
                let laSensor = new LinearAccelerationSensor({frequency: 60});
                laSensor.addEventListener('reading', e => {
                    console.log("Linear acceleration along the X-axis " + laSensor.x);
                    console.log("Linear acceleration along the Y-axis " + laSensor.y);
                    console.log("Linear acceleration along the Z-axis " + laSensor.z);
                });
                laSensor.start();	
       
			});
	};
};