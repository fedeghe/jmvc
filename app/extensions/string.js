JMVC.extend('string',{
	hide : function(txt, write){
		var out = [];
		for(var i in txt){
			out.push(txt.charCodeAt(i));
		}
		///manca che crei il document.write
		if(write){
			return '['+out.join(',')+']';
		}
		return out;
	},
	unhide : function(arr){
		return String.fromCharCode.apply(null, arr);
	}
});


