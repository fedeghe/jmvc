
JMVC.extend('ddd', {
	'Point' : function (x, y, z) {
		this.x  = x;
		this.y  = y;
		this.z  = z;
	},
	'Line' : function (p1, p2) {
		this.p1 = p1;
		this.p2 = p2;
	},
	'Triangle' : function (p1, p2, p3) {
		this.p1 = p1;
		this.p2 = p2;
		this.p3 = p3;
	}
});

JMVC.prototipize(
	JMVC.ddd.Point,
	{
		'distance2Point' : function (p) {
			return Math.sqrt(
				(this.x -p.x)*(this.x -p.x) +
				(this.y -p.y)*(this.y -p.y) +
				(this.z -p.z)*(this.z -p.z)
			);
		},
		'distance2Line' : function () {
			
		}
		
	}
);
	
JMVC.debug(JMVC.ddd.Point.distance)