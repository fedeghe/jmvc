JMVC.models.Persona2 = function() {
	this.name = 'Fede';
	this.hello = function(name) {return 'Hello I`m '+(name || this.name) ;};
};