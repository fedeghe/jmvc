JMVC.models.Persona = function() {
	this.name = 'Federic';
	this.hello = function(name) {return 'Hello I`m '+(name || this.name) ;};
};