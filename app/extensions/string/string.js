JMVC.extend('string',{
	hide : function(txt){
		var out = [],
			i;
		for (i in txt){
			out.push(txt.charCodeAt(i));
		}
		return out;
	},
	unhide : function(arr){
		return String.fromCharCode.apply(null, arr);
	}
});  //sadasd