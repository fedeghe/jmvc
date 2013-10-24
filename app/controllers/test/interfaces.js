JMVC.controllers.interfaces = function () {

	this.action_index = function () {

		JMVC.loadInterfaces('loader');

		var a = function () {console.debug(arguments)},
			//
			// three foo constructors
 			T1 = function () {
				this.load = this.unload = a;
			},
			T2 = function () {
				this.check = this.init = a;
			},
			T3 = function () {
				this.check = 
				this.init = 
				this.parse = 
				this.inwit = 
				this.love = 
				this.hate = 
				this.destroy = a;
			};

		console.debug(JMVC.Interface.checkImplements(new T1, JMVC.interfaces.loader));
		console.debug(JMVC.Interface.checkImplements(new T3, JMVC.interfaces.grep, JMVC.interfaces.mankind));
		// this would fail
		// console.debug(JMVC.Interface.checkImplements(new T2, JMVC.interfaces.loader))
	};
};