JMVC.extend('html5',{
	video : function(o) {
		o.mime = o.mime || o.uri.split('.').pop();
		o.controls = o.controls ? ' controls="controls"' :'';
		o.autoplay = o.autoplay ? ' autoplay="autoplay"' :'';
		var tpl = '<video width="%w%" height="%h%"%controls%%autoplay%><source src="%uri%" type="video/%mime%" /></video>';
		return JMVC.util.allreplace(tpl, o);
	},
	audio : function(){},
	progress : function(progress, attr){
		if(!JMVC.util.isSet(attr)){var attr = {};}
		if(!attr.max){attr.max = 100;}
		return '<progress '+JMVC.util.obj2attr(attr)+' value="'+progress+'"></progress>';
	}
});