JMVC.controllers.iscroll = function(){
	this.action_index = function () {
		JMVC.require('iscroll/iscroll');
		JMVC.getView('scroll').render(function () {	
			JMVC.iscroll.create(JMVC.dom.find('#divnode'));
		});
	};

}