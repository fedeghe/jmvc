JMVC.controllers.interfaces = function() {

	this.action_index = function(){
		JMVC.loadInterfaces('loader');
		var t1 = function () {
			this.load = function (x) {console.debug(x)};
			this.unload = function (x) {console.debug(x)};
		},
		t2 = function () {
			this.check = function (x) {console.debug(x)};
			this.init = function (x) {console.debug(x)};
		},
		t3 = function () {
			this.check = function (x) {console.debug(x)};
			this.init = function (x) {console.debug(x)};
			this.parse = function (x) {console.debug(x)};
			this.inwit = function (x) {console.debug(x)};
		};
		console.debug(JMVC.interfaces.loader.check(t1));
		console.debug(JMVC.interfaces.grep.check(t2))
		console.debug(JMVC.interfaces.grep.check(t3));
	};
};