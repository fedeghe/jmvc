JMVC.extend('html5', {
	"mimemap" : {
		'ogv' : 'ogg' 
	},


	"video" : function (o) {
		o.mime = o.mime || o.uri.split('.').pop();
		o.mime = JMVC.html5.mimemap[o.mime] || o.mime;
		o.controls = o.controls ? ' controls="controls"' :'';
		o.autoplay = o.autoplay ? ' autoplay="autoplay"' :'';
		var tpl = '<video width="%w%" height="%h%"%controls%%autoplay%><source src="%uri%" type="video/%mime%" /></video>';
		return JMVC.string.replaceall(tpl, o);
	},
	"audio" : function () {},
	"progress" : function(progress, attr){
		if(!JMVC.util.isSet(attr)){attr = {};}
		if(!attr.max){attr.max = 100;}
		return '<progress '+JMVC.object.obj2attr(attr)+' value="'+progress+'"></progress>';
	}
});