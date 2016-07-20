{
	tag : "p",
	html : "#PARAM{content}",
	style : {color:'orange'},
	content : '#PARAM{inner}',
	data : {
		obj : '#PARAM{obj}'
	},
	cb : function () {
		console.debug(this.data.obj.sayHello())
		this.done();
	}
}