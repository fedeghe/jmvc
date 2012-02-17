JMVC.models.Persona = function(){
	this.name = 'Federico';
	this.hello = function(name){return 'Hello I`m '+(name || this.name) ;};
};