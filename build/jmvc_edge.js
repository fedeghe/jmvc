+function (W, undefined) {

	var WD = W.document,

		WDL = WD.location,

		JMVC = W.JMVC = (function () {

			var US = '/',
				EXT = {
                    model : '.js',
                    view : '.html',
                    controller : '.js',
                    'interface' : '.interface.js'
                },
                URL_ALLOWED_EXTENSIONS = ['html', 'htm', 'jsp', 'php', 'js', 'jmvc', 'j', 'mvc', 'do', 'asp'],
                DEFAULTS = {
                   controller : 'index',
                    action : 'index'
                },


				Model, View, Controller,
				Interface,
				Dispatcher, Parser,
				Event, Promise, Errors,
				Request, Response,

				// will be returned partially through the module
				jmvc = {
					foo : function () {alert('hello Foo'); }
				};


				// this is the core JMVC object 
				return {
					hello : jmvc.foo
				};
		})();

		JMVC.io = {};
		JMVC.dom = {};
		JMVC.events = {};
		JMVC.head = {};
		JMVC.util = {};
		JMVC.array = {};
		JMVC.string = {};
		JMVC.object = {};
		JMVC.match = {};
		JMVC.num = {};

}(this);