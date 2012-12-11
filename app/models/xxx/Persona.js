JMVC.models.Persona = function() {
	this.name = 'Federico';
	this.hello = function(name) {return 'Hello I`m '+(name || this.name) ;};
};

JMVC.models.Persona.prototype.talk = function (s){console.debug('Saying '+s);};