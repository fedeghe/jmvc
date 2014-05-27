// type : LIB
// 

/**
 * this extension sucks
 * urges a strong refactor
 */

JMVC.extend('core.color', {
	getRandomColor : function (wsafe) {
		'use strict';
		var ret = '#',
			websafe = !!wsafe,
			wsafearr = ['00', '33', '66', '99', 'CC', 'FF'];
		if (!websafe) {
			ret += (Math.random() * 0xFFFFFF << 0).toString(16).toUpperCase();
		} else {
			ret += wsafearr[JMVC.util.rand(0, 5)] + wsafearr[JMVC.util.rand(0, 5)] + wsafearr[JMVC.util.rand(0, 5)];
		}
		return ret;
	},
	hex2rgb : function (hex) {
		var strhex = '' + hex,
			more = (strhex.charAt(0) == '#') ? 1 : 0;
		return {
			r : parseInt(strhex.substr(more, 2), 16),
			g : parseInt(strhex.substr(more + 2, 2), 16),
			b : parseInt(strhex.substr(more + 4, 2), 16)
		};
	},
	rgb2hex : function (obj) {
		var r, g, b, a;
		if (typeof obj === 'object') {
			r = obj.r;
			g = obj.g;
			b = obj.b;
			a = obj.a || 255;
		}else if (typeof obj === 'string') {
			var arr_rgb = obj.split(',');
			r = parseInt(arr_rgb[0], 10);
			g = parseInt(arr_rgb[1], 10);
			b = parseInt(arr_rgb[2], 10);
			a = arr_rgb.length == 4 ? parseInt(arr_rgb[3], 10) : 255;
		}
		return '#' + JMVC.string.padme(r.toString(16), 0, 'pre') +
			JMVC.string.padme(g.toString(16), 0, 'pre') +
			JMVC.string.padme(b.toString(16), 0, 'pre') +
			JMVC.string.padme(a.toString(16), 0, 'pre');
	},
//	conversion formula from
//	http://local.wasp.uwa.edu.au/~pbourke/texture_colour/convert/
	rgb2yiq : function (rgb) {
		return {
			y : ~~(rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.144),
			i : ~~(rgb.r * 0.596 - rgb.g * 0.274 - rgb.b * 0.322),
			q : ~~(rgb.r * 0.212 - rgb.g * 0.523 + rgb.b * 0.311)
		};
	},
	yiq2rgb : function (yiq) {
		return {
			r : ~~(yiq.y * 1 + yiq.i * 0.956 + yiq.q * 0.621),
			g : ~~(yiq.y * 1 - yiq.i * 0.272 - yiq.q * 0.647),
			b : ~~(yiq.y * 1 - yiq.i * 1.105 + yiq.q * 1.702)
		};
	},


	//next 4 functions
	// https://gist.github.com/mjijackson/5311256
	/**
	* Converts an RGB color value to HSL. Conversion formula
	* adapted from http://en.wikipedia.org/wiki/HSL_color_space.
	* Assumes r, g, and b are contained in the set [0, 255] and
	* returns h, s, and l in the set [0, 1].
	*
	* @param Number r The red color value
	* @param Number g The green color value
	* @param Number b The blue color value
	* @return Array The HSL representation
	*/
	rgb2hsl : function (r, g, b) {
		r /= 255, g /= 255, b /= 255;
	 
		var max = Math.max(r, g, b),
			min = Math.min(r, g, b),
			h,
			s,
			l = (max + min) / 2,
			d;
	 	if (max == min) {
	 		h = s = 0; // achromatic
		} else {
			d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	 
			switch (max) {
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4; break;
			}
	 
			h /= 6;
		}
	 
		return [ h, s, l ];
	},
 
	/**
	* Converts an HSL color value to RGB. Conversion formula
	* adapted from http://en.wikipedia.org/wiki/HSL_color_space.
	* Assumes h, s, and l are contained in the set [0, 1] and
	* returns r, g, and b in the set [0, 255].
	*
	* @param Number h The hue
	* @param Number s The saturation
	* @param Number l The lightness
	* @return Array The RGB representation
	*/
	hsl2rgb : function (h, s, l) {
		var r, g, b;
		 
		if (s == 0) {
			r = g = b = l; // achromatic
		} else {

			function hue2rgb(p, q, t) {
				if (t < 0) t += 1;
				if (t > 1) t -= 1;
				if (t < 1/6) {
					return p + (q - p) * 6 * t;
				}
				if (t < 1/2) {
					return q;
				}
				if (t < 2/3) {
					return p + (q - p) * (2/3 - t) * 6;
				}
				return p;
			}
			 
			var q = l < 0.5 ? l * (1 + s) : l + s - l * s,
				p = 2 * l - q;
			 
			r = hue2rgb(p, q, h + 1/3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1/3);
		}
		 
		return [~~(r * 255), ~~(g * 255), ~~(b * 255)];
	},
 
	/**
	* Converts an RGB color value to HSV. Conversion formula
	* adapted from http://en.wikipedia.org/wiki/HSV_color_space.
	* Assumes r, g, and b are contained in the set [0, 255] and
	* returns h, s, and v in the set [0, 1].
	*
	* @param Number r The red color value
	* @param Number g The green color value
	* @param Number b The blue color value
	* @return Array The HSV representation
	*/
	rgb2hsv : function (r, g, b) {
		r /= 255, g /= 255, b /= 255;
		 
		var max = Math.max(r, g, b), min = Math.min(r, g, b);
		var h, s, v = max;
		 
		var d = max - min;
		s = max == 0 ? 0 : d / max;
		 
		if (max == min) {
			h = 0; // achromatic
		} else {
			switch (max) {
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4; break;
			}
			 
			h /= 6;
		}
		 
		return [ h, s, v ];
	},
 
	/**
	* Converts an HSV color value to RGB. Conversion formula
	* adapted from http://en.wikipedia.org/wiki/HSV_color_space.
	* Assumes h, s, and v are contained in the set [0, 1] and
	* returns r, g, and b in the set [0, 255].
	*
	* @param Number h The hue
	* @param Number s The saturation
	* @param Number v The value
	* @return Array The RGB representation
	*/
	hsv2rgb : function (h, s, v) {
		var r, g, b;
		 
		var i = Math.floor(h * 6);
		var f = h * 6 - i;
		var p = v * (1 - s);
		var q = v * (1 - f * s);
		var t = v * (1 - (1 - f) * s);
		 
		switch (i % 6) {
			case 0: r = v, g = t, b = p; break;
			case 1: r = q, g = v, b = p; break;
			case 2: r = p, g = v, b = t; break;
			case 3: r = p, g = q, b = v; break;
			case 4: r = t, g = p, b = v; break;
			case 5: r = v, g = p, b = q; break;
		}
		 
		return [~~(r * 255), ~~(g * 255), ~~(b * 255)];
	},

	// http://codeitdown.com/hsl-vs-hsb-vs-hsv/
	hsv2hsl : function (hsv){
		// determine the lightness in the range [0,100]
		var l = (2 - hsv.s / 100) * hsv.v / 2;

		// store the HSL components
		hsl = {
			h : hsv.h,
			s : hsv.s * hsv.v / (l < 50 ? l * 2 : 200 - l * 2),
			l : l
		};

		// correct a division-by-zero error
		if (isNaN(hsl.s)) hsl.s = 0;
		return hsl;
	},

	hsl2hsv : function (hsl){
		// determine the brightness in the range [0,100]
		var v = hsl.l + hsl.s * (hsl.l < 50 ? hsl.l * 2 : 200 - hsl.l * 2) / 200;

		// store the HSV components
		hsv = {
			h : hsl.h,
			s : 200 * (1 - hsl.l / v),
			v : v
		};

		// correct a division-by-zero error
		if (isNaN(hsv.s)) hsv.s = 0;
		return hsv;
	},

	test2col : function (rgb1, rgb2) {
		var m = Math,
			brigth_diff = m.abs((rgb1.r * 299 + rgb1.g * 587 + rgb1.b * 114) - (rgb2.r * 299 + rgb2.g * 587 + rgb2.b * 114 )) / 1000,
			color_diff = (m.max(rgb1.r, rgb2.r) - m.min(rgb1.r, rgb2.r)) + (m.max(rgb1.g, rgb2.g) - m.min(rgb1.g, rgb2.g)) + (m.max(rgb1.b, rgb2.b) - m.min(rgb1.b, rgb2.b));
		return brigth_diff > 125 && color_diff > 500 ;
	},

	invert : function (color) {
		var c = this.hex2rgb(color);
		return this.rgb2hex({r : 255 - c.r , g : 255 - c.g, b : 255 - c.b});
	},

	luminance : function (r, g, b) {		
    	return {
    		standrd : (0.2126 * r) + (0.7152 * g) + (0.0722 * b),
    		perceived1 : 0.299 * r + 0.587 * g + 0.114 * b,
    		perceived2 : Math.sqrt( 0.241 * r * r + 0.691 * g * g + 0.068 * b * b )
		};
	},
	checkpound : function (color) {
		return color.charAt(0) == '#' ? color.substr(1) : color;
	},
	getGradientArray : function (color1, color2, num) {
		var ret = [],
			int1,
			int2,
			diffs,
			components1,
			components2,
			components,
			i,
			j,
			operator,
			steps,
			signs;
		num += 1;
		color1 = this.checkpound(color1);
		color2 = this.checkpound(color2);
		
		int1 = JMVC.util.hex2int(color1);
		int2 = JMVC.util.hex2int(color2);
	
		num = Math.min(Math.abs(int1 - int2), num);

		diffs = {};
		steps = {};
		signs = {
			'+' : function (a, b) {return a == b ? a : a + b; },
			'-' : function (a, b) {return a == b ? a : a - b; }
		};
		components1 = this.hex2rgb(color1);
		components2 = this.hex2rgb(color2);
			
		components = {r : 0, g : 0, b : 0};
		for (i in components) {
			diffs[i] = Math.abs(parseInt(components1[i], 10) - parseInt(components2[i], 10));
			steps[i] = diffs[i] / num;
		}
		for (i = 0; i < num; i += 1) {
			for (j in components) {
				operator = (parseInt(components1[j], 10) < parseInt(components2[j], 10)) ? '+' : '-';
				components[j] = JMVC.string.padme(
					JMVC.util.int2hex(signs[operator](parseInt(components1[j], 10) , steps[j] * i)),
					0,
					'pre'
				);
			}
			ret[i] = '#' + components.r + components.g + components.b;
		}
		ret[num] = '#' + color2;	
		return ret;	
	},
	
	getWebColors : function () {
        'use strict';
        var ret = [],
            hash = '#',
            wsafearr = ['00', '33', '66', '99', 'CC', 'FF'],
            l = wsafearr.length,
            i = 0, j = 0, k = 0;

        for (i = 0; i < l; i += 1)
            for (j = 0; j < l; j += 1)
                for (k = 0; k < l; k += 1)
                    ret.push(hash + wsafearr[i] + wsafearr[j] + wsafearr[k]);
        return ret;
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

