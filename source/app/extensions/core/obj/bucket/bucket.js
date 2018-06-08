// type : FACTORY_METHOD
//

JMVC.extend('bucket', {
	create : function (arr) {
		"use strict";
		function bucket(a) {
			a = a || [];
			this.arr = JMVC.array.clone(a);
			this.r = false,
			this.l = a.length,
			this.fix = JMVC.array.clone(this.arr);
			this._current = null;
			
		}
		bucket.prototype = {

			current : function () {
				return this._current;
			},
			empty : function () {
				this.arr = [];
				this.r = false;
				this.l = 0;
			},
			fill : function (arr) {
				this.arr = JMVC.array.clone(arr);
				this.r = false;
				this.l = arr.length;
				this.fix = JMVC.array.clone(this.arr);
			},
			hasMore : function () {return !!this.l; },
			merge : function (b) {
				this.arr = [].concat.call(this.arr, b.arr);
				this.l = this.arr.length;
			},
			next : function () {

				if (this.l == 0) {return null; } 
				this.r = this.arr.splice(JMVC.util.rand(0, this.l - 1), 1);
				this.l -= 1;

				this._current = this.r.pop();
				return this._current;
			},
			recover : function () {
				this.l = this.fix.length;
				this.arr = JMVC.array.clone(this.fix);
			},
			show : function () {
				return this.arr.toString();
			},
			shuffle : function (t) {
				if (t) while (t--) this.shuffle();
				this.arr = JMVC.array.shuffle(this.arr);
				//this.arr.sort(function (a, b) {return .5 - Math.random(); });
			},
			size : function () {return this.l; },
			unfill : function (n) {
				this.arr = this.arr.slice(0, n < this.l ? this.l - n : 0);
				this.l = this.arr.length;
			},
			walk : function (f) {
				var that = this;
				for (var i = 0, l = this.l; i < l; i += 1) {
					~function (j){
						that.arr[j] = f(that.arr[j]);
					}(i);
				}
			}
		};
		return new bucket(arr);
	}
});
