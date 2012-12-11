JMVC.extend('string',{
	'hide' : function(txt){
		var out = [];
		for(var i in txt){
			out.push(txt.charCodeAt(i));
		}
		return out;
	},
	'unhide' : function(arr){
		return String.fromCharCode.apply(null, arr);
	}
});




//window.addEvent('domready',function(){
//	var e = String.fromCharCode.apply(null, [105,110,102,111,64,101,120,109,97,99,104,105,110,97,46,99,104]);
//	$('contactemail').set('html', e).setProperty('href','mailto:'+e);
//});