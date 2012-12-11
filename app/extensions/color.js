JMVC.extend('color',{
	'getRandomColor' : function(wsafe){
		var ret = '#',
		websafe = !!wsafe,
		wsafearr = ['00','33','66','99','CC','FF'];
		if(!websafe){
			for(var i = 0; i < 6; i++) {
				var num = Math.floor((Math.random()*100) % 16);

				var temp = num.toString(16);
				ret += ''+temp;
			}
		}else{
			ret += wsafearr[JMVC.util.rand(0,5)]+wsafearr[JMVC.util.rand(0,5)]+wsafearr[JMVC.util.rand(0,5)];
		}
		return ret;
	},	
	
	'hex2rgb' : function(hex) {
		var strhex = ''+hex;
		var more = (strhex.charAt(0)=='#')?1:0;
		//alert(hex);
		return {
			r : parseInt(strhex.substr(more,2),16),
			g : parseInt(strhex.substr(more+2,2),16),
			b : parseInt(strhex.substr(more+4,2),16)
		};
	},

	'rgb2hex' : function(obj) {
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
	},
//	conversion formula from
//	http://local.wasp.uwa.edu.au/~pbourke/texture_colour/convert/
	'rgb2yiq':function(rgb){
		return {
			y:~~(rgb.r*0.299+rgb.g*0.587+rgb.b*0.144),
			i:~~(rgb.r*0.596-rgb.g*0.274-rgb.b*0.322),
			q:~~(rgb.r*0.212-rgb.g*0.523+rgb.b*0.311)
		};
	},
	'yiq2rgb':function(yiq){
		return {
			r:~~(yiq.y*1+yiq.i*0.956+yiq.q*0.621),
			g:~~(yiq.y*1-yiq.i*0.272-yiq.q*0.647),
			b:~~(yiq.y*1-yiq.i*1.105+yiq.q*1.702)
		};
	},
	'test2col' : function(rgb1, rgb2){
		var m = Math,
			brigth_diff = m.abs((rgb1.r*299 + rgb1.g * 587 + rgb1.b *114 )-(rgb2.r*299 + rgb2.g * 587 + rgb2.b *114 ))/1000,
			color_diff = (m.max(rgb1.r, rgb2.r) - m.min(rgb1.r, rgb2.r)) + (m.max(rgb1.g, rgb2.g) - m.min(rgb1.g, rgb2.g)) + (m.max(rgb1.b, rgb2.b) - m.min(rgb1.b, rgb2.b));
		return brigth_diff > 125 && color_diff > 500 ;
		
	},
	'getOpposite' : function(color){
		var c = this.hex2rgb(color);
		return  this.rgb2hex({r:c.r<128?255:0,g:c.g<128?255:0,b:c.b<128?255:0});
	},
	
	'luminance' : function (r, g, b) {		
    	return {
    		'standrd' : (0.2126 * r) + (0.7152 * g) + (0.0722 * b),
    		'perceived1' : 0.299 * r + 0.587 * g + 0.114 * b,
    		'perceived2' : Math.sqrt( 0.241 * r * r + 0.691 * g * g + 0.068 * b * b )
		};
	}
	
});

// http://www.visionaustralia.org.au/info.aspx?page=628
/*
Colour Brightness Formula (WCAG 1.0)

Colour brightness is determined by the following formula:

((Red value X 299) + (Green value X 587) + (Blue value X 114)) / 1000

The difference between the background brightness, and the foreground brightness should be greater than 125.

Note: This algorithm is taken from a formula for converting RGB values to YIQ values. This brightness value gives a perceived brightness for a colour.
Colour Difference Formula (WCAG 1.0)

Colour difference is determined by the following formula:

(maximum (Red value 1, Red value 2) - minimum (Red value 1, Red value 2)) + (maximum (Green value 1, Green value 2) - minimum (Green value 1, Green value 2)) + (maximum (Blue value 1, Blue value 2) - minimum (Blue value 1, Blue value 2))

The difference between the background colour and the foreground colour should be greater than 500.
*/

