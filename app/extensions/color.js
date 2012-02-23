JMVC.extend('util',{
	getRandomColor : function() {
		var ret = '#';
		for(var i = 0; i < 6; i++) {
			var num = Math.floor((Math.random()*100) % 16);

			var temp = num.toString(16);
			ret += ''+temp;
		}
		return ret;
	},	
	
	hex2rgb : function(hex) {
		var strhex = ''+hex;
		var more = (strhex.charAt(0)=='#')?1:0;
		//alert(hex);
		return {
			r : parseInt(strhex.substr(more,2),16),
			g : parseInt(strhex.substr(more+2,2),16),
			b : parseInt(strhex.substr(more+4,2),16)
		};
	},

	rgb2hex : function(obj) {
		var r,g,b;
		if(typeof obj === 'object') {
			r = obj.r;g = obj.g;b = obj.b;
		}else
		if(typeof obj === 'string') {
			var arr_rgb = obj.split(',');
			r = parseInt(arr_rgb[0],10);
			g = parseInt(arr_rgb[1],10);
			b = parseInt(arr_rgb[2],10);
			//	alert(r+' '+g+' '+b);
		}
		return '#'+JMVC.util.padme(r.toString(16),0,'pre')+JMVC.util.padme(g.toString(16),0,'pre')+JMVC.util.padme(b.toString(16),0,'pre');
	}
});
