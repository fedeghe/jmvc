JMVC.extend('bucket', {
	init : function(){},
	create : function (arr) {
		"use strict";
		var that = this;
		arr = arr || [];

		this.arr = JMVC.array.clone(arr);
		this.r = false,
		this.l = arr.length,
		this.fix = JMVC.array.clone(this.arr);

		return {
			next : function () {
				if (that.l == 0) {return null; } 
				that.r = that.arr.splice(JMVC.util.rand(0, that.l - 1), 1);
				that.l -= 1;
				return that.r.pop();
			},
			recover : function () {
				that.l = that.fix.length;
				that.arr = JMVC.array.clone(that.fix);
			},
			size : function () {return that.l; },
			fill : function (arr) {
				that.arr = JMVC.array.clone(arr);
				that.r = false;
				that.l = arr.length;
				that.fix = JMVC.array.clone(that.arr);
			},
			empty : function () {
				that.arr = [];
				that.r = false;
				that.l = 0;
			},
			hasMore : function () {return !!that.l; }
		};
	}
});
