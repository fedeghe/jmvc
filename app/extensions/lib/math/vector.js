JMVC.extend('vector', {
	'Kvector' : function(){
		var that = this; 
		this._ = Array.prototype.splice.call(arguments[0], 0);
		this.dim = this._.length;
		
		this.lenght = ( function () {
			var r = 0,
				i = 0;
			for (null; i < that.dim; i += 1) {
				r += that._[i] * that._[i];
			}
			return JMVC.M.sqrt(r);
		})();
	}
});


/**
 * Description
 *
 */
JMVC.prototipize(JMVC.vector.Kvector, {
	
	'print' : function () {
		console.debug('[' + this._.join(', ') + ']');
	},
	
	'map' : function (fn) {
		var that = this;
		JMVC.util.each(this._, function (el) {return fn(el); });
	},	
	
	/**
	 * Perform dot Product 
	 * 
	 */
	'dotP' : function (vec) {
		if (vec.dim !== this.dim) {
			console.warn('Unmatching dmensions for dot product');
			return false;
		}
		var res = 0,
			i = 0;
		for (null; i < vec.dim; i += 1) {
			res += JMVC.num(vec._[i] * this._[i]);
		}
		return res;
	},

	/**
	 * @description Scalar product
	 * 
	 */
	'scalP' : function (a) {
		var newV = [];
		for(var i = 0; i < this.dim; i += 1){
			newV.push(JMVC.num(this._[i] * a));
		}
		return new JMVC.vector.Kvector(newV);
	},

	/**
	 * Vector product
	 * in  : v
	 * out : this x v
	 */
	'vecP' : function (vec) {
		if (this.dim !== 3 || vec.dim !== 3) {
			console.warn('Vector product can be done in 3 dimensions only');
			return false;
		}
		var c = this._,
			v = vec._;		
		return new JMVC.vector.Kvector([
			JMVC.num(c[1] * v[2] - c[2] * v[1]),
			JMVC.num(-c[0] * v[2] + v[0] * c[2]),
			JMVC.num(c[0] * v[1] - v[0] * c[1])
		]); 
	},
	'sum' : function (v, sign) {
		if (this.dim !== v.dim) {
			console.warn('Vector sum/sub can be done only between vectors within the same dimension space');
			return false;
		}
		var _ = [],
			i = 0;
		sign = sign || 1;
		for (null; i < this.dim; i += 1) {
			_.push(this._[i] + sign * v._[i]);
		}
		return new JMVC.vector.Kvector(_);
	},
	
	'sub' : function (v) {
		return this.sum(v, -1);
	},
	
	'angle' : function (vec) {
		return 2 * JMVC.M.PI + JMVC.M.acos(this.dotP(vec) / (this.lenght * vec.lenght));
	},
	
	'parallelTo' : function (v) {
		return !(this.angle(v) % JMVC.M.PI);
	},

	'antiParallelTo' : function (v) {
		//console.debug(this.angle(v));
		return (this.angle(v) % (3*JMVC.M.PI) === 0);
	},
	
	'orthogonalTo' : function (v) {
		return this.dotP(v) === 0;
		//return  !!(this.angle(v) % JMVC.M.PI/2) && (this.angle(v) % JMVC.M.PI != 0);
	}
	
});
/*
JMVC.require('lib/math/vector');
var v1 = new JMVC.vector.Kvector([1,2,3]),
	v2 = new JMVC.vector.Kvector([4,5,6]);
v2.sub(v1).print()
 **/


/*
JMVC.require('lib/math/vector');
var v1 = new JMVC.vector.Kvector([1,0,0,0]),
    v2 = new JMVC.vector.Kvector([61,0,0,0]),
    v3 = new JMVC.vector.Kvector([-61,0,0,0]),
    v4 = new JMVC.vector.Kvector([-61,3,0,0]);

console.debug(v1.antiParallelTo(v3));
console.debug(v1.parallelTo(v2));
console.debug(v3.orthogonalTo(v4));
 **/
