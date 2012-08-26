JMVC.extend('bucket', {
	create : function (arr) {
		"use strict";
		var that = this;
		this.arr = JMVC.util.array_clone(arr);
		this.r = false,
		this.l = arr.length,
		this.fix = JMVC.util.array_clone(this.arr);
		return {
			next : function () {
				if (that.l == 0) {return null;} 
				that.r = that.arr.splice(JMVC.util.rand(0, that.l - 1), 1);
				that.l -= 1;
				return that.r.pop();
			},
			reset : function () {
				that.l = that.fix.length;
				that.arr = JMVC.util.array_clone(that.fix);
			},
			hasMore : function(){return that.l;}
		};
	}
});
