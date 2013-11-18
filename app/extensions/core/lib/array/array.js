JMVC.extend('array', {
	/**
	 * O(n)
	 * c = 0.5
	 * 
     * Note : exact middle (15, [10,20])
     * ceils to 20 if the last return uses >=
     * floos to 10 if uses >
	 */
	
	/**
	 * [nearestElement description]
	 * @param  {[type]} v   [description]
	 * @param  {[type]} arr [description]
	 * @return {[type]}     [description]
	 */
	nearestElement : function (v, arr) {
		//add locally two big bounds
		var steps = Array.prototype.concat(-Infinity, arr, Infinity),
			len = steps.length,           // cache length
			m = len >> 1,					// go near to the middle
			dir = v < steps[m],         // discover direction
			i = dir ? m - 1 : m;        // get first index
		if (len === 2) return !1;
		// shift indexes while correct bounds are not found
		// not considering false bounds (+/- Infinity)
		while (!(steps[i] <= v && v <= steps[i + 1]) && i > 1 && i + 1 < len - 2) {
			i += dir ? - 1 : 1;
		}
		// return element with nearest bound index
		return steps[i + (v - steps[i] >= steps[i + 1] - v)];
	},

	/**
	 * [bNearestElement description]
	 * @param  {[type]} v     [description]
	 * @param  {[type]} steps [description]
	 * @return {[type]}       [description]
	 */
	bNearestElement : function f(v, steps) {
		var len = steps.length, m, dir, r1, r2;
		if (len === 2) {
			return v - steps[0] < steps[1] - v ? steps[0] : steps[1];
		}
		m = len >> 1;				// go near to the middle
		dir = v < steps[m];         // discover direction
		r1 = dir ? 0 : m;
		r2 = dir ? m + 1 : len;
		
		return f(v, steps.slice(r1, r2));
	},
	
	/**
	 * [fastNearest description]
	 * @param  {[type]} v     [description]
	 * @param  {[type]} steps [description]
	 * @return {[type]}       [description]
	 */
	fastNearest : function (v, steps) {
		var len = steps.length,
			lindex = 0,
			hindex = len-1,
			mindex = (lindex + hindex) >> 1;
		if (!len) {return 0; }
		while (lindex < hindex) {
			mindex = (lindex + hindex) >> 1;
			if (v < steps[mindex]) {
				hindex = mindex;
			} else if (v > steps[mindex]) {
				lindex = mindex;
			} else {
				return steps[mindex];
			}
			if(lindex == hindex-1){
				return v-steps[lindex] < steps[hindex]-v ? steps[lindex] : steps[hindex];
			}	
		}
		
	},

	/**
	 * [origNearest description]
	 * @param  {[type]} value        [description]
	 * @param  {[type]} sortedValues [description]
	 * @return {[type]}              [description]
	 */
	origNearest : function (value, sortedValues) {
		if (sortedValues.length > 0) {
			var lowIndex = 0, highIndex = sortedValues.length, middleIndex = -1;

			while (lowIndex < highIndex) {
				middleIndex = Math.floor((lowIndex + highIndex)/2);
				if (value < sortedValues[middleIndex]) {
					highIndex = middleIndex;
				} else if (value > sortedValues[middleIndex]) {
					lowIndex = middleIndex + 1;
				} else {
					return sortedValues[middleIndex];
				}
			}
			
			function findMinDistanceIndex(low, item, high) {
				return findMinIndex(item - low, high - item);
			}

			function findMinDistanceIndex1(low, item, medium, high) {
				return findMinIndex(item - low, Math.abs(medium - item), high - item);
			}

			function findMinIndex() {
				var minIndex = 0;
				for (var i = 1, lArg = arguments.length; i < lArg; i++) {
					//with < round down, with <= round up
					if (arguments[i] <= arguments[minIndex]) {
						minIndex = i;
					}
				}
				return minIndex;
			}

			var closestIndex =
				middleIndex > 0 && middleIndex < sortedValues.length - 1 ? middleIndex - 1 + findMinDistanceIndex1(sortedValues[middleIndex - 1], value, sortedValues[middleIndex], sortedValues[middleIndex + 1])
				:
				middleIndex == 0 ? findMinDistanceIndex(sortedValues[middleIndex], value, sortedValues[middleIndex + 1])
				:
				middleIndex - 1 + findMinDistanceIndex(sortedValues[middleIndex - 1], value, sortedValues[middleIndex]);

			return sortedValues[closestIndex];
		} else {
			return null;
		}
	}
	
});

/*

 0 1 2 3 4 5 6 7 8 9 10
           A
 -----------
			 ----------

L = 11
M = 5


R [0, M+1] slice
L [M+1, L-(M+1)] slice


**/
