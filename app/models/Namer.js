JMVC.models.Namer = function () {
	this.names = [
		'Alí','Angel',
		'Chu',
		'Frances',
		'Leon',
		'Jack', 'Javier', 'Joe',
		'Mohammed',
		'Sam','Sue'
	];
	this.pickaname = function() {
		return this.names[JMVC.util.rand(0, this.names.length - 1)];
	};
};