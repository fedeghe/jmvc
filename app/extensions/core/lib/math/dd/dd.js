// type : CONSTRUCTORS
//


JMVC.set('accessor', function () {});

JMVC.get('accessor').prototype = {
	get : function (f) {
		"use strict";
		return this[f];
	},
	set : function (e, f) {
		"use strict";
		this[e] = f; return this[e];
	}
};

/**
 *
 * Basic Constructors
 * 
 */
JMVC.extend('dd', {
	/**
	 * x int
	 * y int
	 */
	Point : function (x, y) {
		"use strict";
		this.x = x;
		this.y = y;
	},

	/**
	 * w int
	 * h int
	 */
	Dimension : function (w, h, l) {
		"use strict";
		this.w = w;
		this.h = h;
		this.l = l || 0;
	},

	/**
	 * p1 Point
	 * p2 Point
	 */
	Line : function (p1, p2) {
		"use strict";
		this.p1 = p1;
		this.p2 = p2;
		this.lenght = p1.distance(p2);
	},

	/**
	 * p1 Point
	 * p2 Point
	 * p3 Point
	 */
	Triangle : function (p1, p2, p3) {
		"use strict";
		this.p1 = p1;
		this.p2 = p2;
		this.p3 = p3;
	},

	/**
	 * p Point
	 * pi Point or integer
	 */
	Rect : function (p1, p2) {
		"use strict";
		this.oregon = p1;
		this.width = p2.x - p1.x;
		this.height = p2.y - p1.y;
	},

	Circle : function (c, dORp) {
		"use strict";
		var isPoint = dORp instanceof JMVC.dd.Point;
		this.center = c;
		this.radius = isPoint ? dORp.distance(c) : dORp;
	},
	Vector : function (p1, p2) {
		this.p1 = p1;
		this.p2 = p2;
		this.lenght = Math.abs(p2.distance(p1));
	},
	'Polygon' : function (points) {
		this.points = points || [];
		this.area = 0;
	}
});

JMVC.inherit(JMVC.dd.Rect, JMVC.get('accessor'));
JMVC.inherit(JMVC.dd.Circle, JMVC.get('accessor'));
JMVC.inherit(JMVC.dd.Point, JMVC.get('accessor'));
JMVC.inherit(JMVC.dd.Dimension, JMVC.get('accessor'));
JMVC.inherit(JMVC.dd.Line, JMVC.get('accessor'));
JMVC.inherit(JMVC.dd.Triangle, JMVC.get('accessor'));





/**
 *
 *
 *
 * Now augment prototipes
 * 
 */

/**
 *
 *	Point
 *
 **/
JMVC.prototipize(JMVC.dd.Point, {
	distance : function (p2) {
		"use strict";
		return Math.sqrt((p2.x - this.x) * (p2.x - this.x) + (p2.y - this.y) * (p2.y - this.y));
	}
});

/**
 *
 *	Triangle
 *
 **/
JMVC.prototipize(JMVC.dd.Triangle, {
	area : function () {
		"use strict";
		var a = this.p1.distance(this.p2),
			b = this.p2.distance(this.p3),
			c = this.p3.distance(this.p1);
		return (Math.sqrt((a + b + c) * (-a + b + c) * (a - b + c) * (a + b - c))) / 4;
	}
});

/**
 *
 *	Square
 *
 **/
JMVC.prototipize(JMVC.dd.Rect, {
	area : function () {
		"use strict";
		return this.width * this.height;
	}
});

/**
 *
 *	Circle
 *
 **/
JMVC.prototipize(JMVC.dd.Circle, {
	area : function () {
		"use strict";
		return 2 * this.radius * Math.PI;
	}
});



JMVC.prototipize(JMVC.dd.Polygon, {
	addPoint : function (p) {
		this.points.push(p);
	},
	delPoint : function (i) {
		var r = this.points[i];
		this.points.splice(i, 1);
	},
	getArea : function () {
		"use strict";
		var a = 0,
			i = 0,
			l = this.points.length;

		for (null; i < l-1; i += 1) {
			a += this.points[i].x * this.points[i+1].y - this.points[i + 1].x * this.points[1].y;
		}
		this.area = a / 2;
		a = null;
		return this.area;
	}
});



/*
JMVC.require('core/lib/dd/dd');

var p1 = new JMVC.dd.Point(0,0),
    p2 = new JMVC.dd.Point(10,0),
    p3 = new JMVC.dd.Point(10,10),
    p4 = new JMVC.dd.Point(0,10);
var p = new JMVC.dd.Polygon([p1,p2,p3]);

console.debug(p.getArea());
p.addPoint(p4);
console.debug(p.getArea());
p.delPoint(3);
console.debug(p.getArea());
p.points
 **/