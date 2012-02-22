JMVC.controllers.Info = function(){
	this.index = function(){
		
		//JMVC.head.addstyle(JMVC.baseurl+'/media/css/info.css');
		
		var main  = JMVC.getView('info');
		var readme = JMVC.getView('readme');
		main.set('nome', this.get('name') || 'Guest');
		readme.set('fr', '<b style="font-size:26px;position:relative;top:8px;color:green;font-weight:bold">&#9758;</b>');
		
		JMVC.mac.titlesay();
		/*
		//load the model
		JMVC.factory('model','Persona');
		//get model instance
		var p = new JMVC.models.Persona('Federico');
		p.set('myname', 'Federicosss');		
		var d =  +new Date();
		
		var john = JMVC.factory('view','john');
		var f = JMVC.factory('view','federico');
		var sample = JMVC.factory('view','sample');
		
		john.set('what', 'Ninja');
		f.set('data', -d);
		sample.set('data', d);
		
		var maybe_par = this.get('name') || ' try to write a /name/your_name_here !!!'+p.get('myname');
		
		sample.set('hello_from_persona', p.hello() + ' --- '+maybe_par);
		sample.render();
		*/
		main.render();
	};
};