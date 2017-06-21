{
	tag : "p",
	html : "#PARAM{content}",
	style : {color:'orange'},
	content : '#PARAM{inner}',
	data : {
		obj : '#PARAM{obj}'
	},
	init : function () {
		console.debug('init');
		return true;
	},
	cb : function () {
		console.debug(this.data.obj.sayHello())
		this.done();
	},
	end : function () {
		console.debug('deine mutter')
	}
}