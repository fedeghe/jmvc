JMVC.require(
	'core/lib/math/math',
	'core/lib/math/vector/vector'
);

JMVC.extend('matrix', {
	
	KKmatrix : function () {
		//var _ = Array.prototype.splice.call(arguments[0], 0),
		var _ = Array.prototype.slice.call(arguments[0]),
			len = _.length,
			dim = JMVC.M.sqrt(len),
			self = this;
		if (!JMVC.math.isSquare(len)) {
			console.warn('Not square matrix '+ len);
			return false;
		}
		this._ = _;
		this.rows = [];
		this.cols = [];
		this.len = len;
		this.dim = dim;
		this.invertible = false;
		this.determinant = false;
		this.inverse = false;
		this.transposed = false;

		/**
		 * 
		 */
		(
			function () {
				var tmp = dim;
				while(tmp--){
					self.rows.push([]);
					self.cols.push([]);
				}
				for(var i = 0, r = 0, c = 0; i < len; i += 1, r = ~~(i / dim), c = i % dim){
					self.rows[r][c] = _[i];
					self.cols[c][r] = _[i];
				}
				
				for (var i = 0; i < dim; i += 1) {
					var r = new JMVC.vector.Kvector(self.rows[i]),
						c = new JMVC.vector.Kvector(self.cols[i]);
					self.rows[i] = r;
					self.cols[i] = c;
				}
			}
		)();
	},
	'I' : function (dim) {
		var _ = [],
			i = 0,
			j = 0;
		
		for (i = 0; i < dim; i += 1) {
			for (j = 0; j < dim; j += 1) {
				_.push(i === j ? 1 : 0);
			}
		}
		return new JMVC.matrix.KKmatrix(_);
	}
	
});
JMVC.prototipize(JMVC.matrix.KKmatrix, {
	constructor : 'KKmatrix',
	uncache : function () {
		//invalid cached values
		this.invertible = false;
		this.determinant = false;
		this.inverse = false;
		this.transposed = false;
	},
	print : function () {
		var out ='',
			i = 0;
		for (null; i < this.dim; i += 1) {
			out += "\n"+'|| ' + this.rows[i]._.join(' ') + ' ||';
		}
		JMVC.debug(out + "\n");
	},
	set : function (r, c, val) {
		if(r > (this.dim-1) || c > (this.dim-1)) {
			console.warn('Out of bounds'); return false;
		}
		// something has changed
		this.uncache();
		this.rows[r][c] = val;
		this.cols[c][r] = val;
	},
	get : function (r, c) {
		return this._[this.dim * r + c];
	},
	sum : function (m, sign) {
		var _ = [],
			i = 0;
		sign = sign || 1;
		for (null; i < this.len; i += 1) {
			_.push(this._[i] + m._[i] * sign);
		}
		return new JMVC.matrix.KKmatrix(_);
	},
	sub : function (m) {
		return this.sum(m, -1);
	},
	mult : function (m) {
		var _ = [],
			i = 0,
			j = 0,
			tmp;
		for (null; i < this.dim; i += 1) {
			tmp = 0;
			for (j=0; j < this.dim; j += 1) {
				_.push(this.rows[i].dotP(m.cols[j]));
			}
		}
		//console.debug(_);
		return new JMVC.matrix.KKmatrix(_);
	},
	det : function () {
		//check cache
		if (this.determinant !== false) {
			return this.determinant;
		}
		// try triangularization
		// and multipy diag
		
		
		
		//if not recur with basecase 2
		//	||a b||
		//	||c d||
		var i = 0,
			res = 0;
		switch (this.dim) {
			case 1 :
				res =  this._[0];
			break;
			/*
			case 2 :
				res = this.get(0, 0)* this.get(1, 1) - this.get(1, 0) * this.get(0, 1);
			break;*/
			default : 
				//use first row and recur
				for (null; i < this.dim; i += 1) {
					res += JMVC.math.dirac(i) * this.get(0, i) * this.subMat(0, i).det();
				}
			break;
		}
		this.determinant = res;
		this.invertible = !res;
		return res;
	},
	/// 3 * 3 determinant
	sarrus : function () {

		return this.get(0,0) * this.get(1,1) * this.get(2,2) + 
			this.get(0,1) * this.get(1,2) * this.get(2,0) + 
			this.get(0,2) * this.get(1,0) * this.get(2,1) - 
			this.get(2,0) * this.get(1,1) * this.get(0,2) - 
			this.get(2,1) * this.get(1,2) * this.get(0,0) - 
			this.get(2,2) * this.get(1,0) * this.get(0,1);
	},

	
	/**
	 * get submatrix leaving out from the original the whole column cOut and the whole row rOut
	 */
	subMat : function (rOut, cOut) {
		var _ = [],
			i = 0;
		if (rOut >= this.dim || cOut >= this.dim) {
			console.warn('Out of bounds'); return false;
		}
		for (null; i < this.len; i += 1) {
			if ((i % this.dim) !== cOut && (parseInt(i / this.dim, 10)) !== rOut) {
				_.push(this._[i]);
			}
		}
		return new JMVC.matrix.KKmatrix(_);
	},

	isInvertible : function () {
		this.determinant = this.det();
		if (this.determinant) {
			this.invertible = true;
		}
		return this.invertible;
	},

	invert : function () {
		var _ = [],
			d = this.dim,
			det = this.det(),
			r = 0,
			c = 0;
		for (r = 0; r < d; r += 1) {
			for (c = 0; c < d; c += 1) {
				//                                    sub mat inverted indexes
				_[r*d + c] = JMVC.math.dirac(r + c) * this.subMat(c, r).det() / det;
			}
		}
		return new JMVC.matrix.KKmatrix(_);
	},

	transpose : function () {
		var _ = [],
			i = 0;
		for (null; i < this.dim; i += 1) {
			_ = _.concat(this.cols[i]._);
		}
		return new JMVC.matrix.KKmatrix(_);
	}
	
});
/*
JMVC.require('core/lib/math/matrix/matrix');
JMVC.events.delay(function(){
	var m = new JMVC.matrix.KKmatrix([1,2,3,44,5,60,7,8,9]);
	console.debug(m.det(), m.sarrus());
	m.print();
},0);

*/

/*

JMVC.require('core/lib/math/matrix/matrix');
var m = new JMVC.matrix.KKmatrix([1,2,3,4,5,6,7,8,9]);
m.transpose()


 *
 *
 *
 *
 *
 *
JMVC.require('core/lib/matrix/matrix');
var m = new JMVC.matrix.KKmatrix([1,2,3,4,5,6,7,8,9]);
console.dir(m)
m.set(0,2, 100)
console.dir(m)
*
*
*
*
*
*
JMVC.require('core/lib/math/matrix/matrix');
var m1 = new JMVC.matrix.KKmatrix([1,2,1,4]);
//
var inv = m1.invert();

inv.print();
m1.mult(inv).print();

//JMVC.debug(m1.print());
//JMVC.debug(m2.print());
JMVC.matrix.unity(5).print()








*/
