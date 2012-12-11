//blog.blazingcloud.net/2010/09/17/svg-scripting-with-javascript-part-1-simple-circle/
JMVC.extend('svg', {
	'vars' : {
		ns : "http://www.w3.org/2000/svg"
	},
	'create' : function (w, h) {
		var svg = JMVC.dom.createNS(JMVC.svg.vars.ns, "svg");
		JMVC.dom.attr(svg, {'version' : "1.2", 'baseProfile': "tiny", 'width':w+'px', 'height':h+'px'});
		return {
			'rect' : function(w, h, fill) {
				var r= JMVC.dom.createNS(JMVC.svg.vars.ns,"rect");
				r.width.baseVal.value=w;
				r.height.baseVal.value=h;
				r.style.fill=fill;

				//r.style.stroke= "#AA99FF";
				//r.style['stroke-width'] = "6";
				r.setAttribute("stroke", "#AA99FF");
				r.setAttribute("stroke-width", "7");
				svg.appendChild(r);
			},
			'circle':function(cx, cy, r, fill) {

				var c = JMVC.dom.createNS(JMVC.svg.vars.ns, "circle");
				c.setAttribute("cx", cx);
				c.setAttribute("cy", cy);
				c.setAttribute("r", r);
				c.setAttribute("fill", fill);
				c.setAttribute("stroke", "#AA99FF");
				c.setAttribute("stroke-width", "7");
				svg.appendChild(c);
			},
			'line' : function(x1,y1, x2, y2){
				var l = JMVC.dom.createNS(JMVC.svg.vars.ns, "line");
				l.setAttribute("x1", x1);
				l.setAttribute("x2", x2);
				l.setAttribute("y1", y1);
				l.setAttribute("y2", y2);
				l.style.stroke = '#f00';
				l.style['stroke-width'] = '3';
				svg.appendChild(l);
			},

			'render' : function (container) {
				container.appendChild(svg);
			}
		}
	}
	
	
});

