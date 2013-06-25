/**
 * 
 * @param function f
 * @returns Object
 * 
 * @sample
var p1 ={
        'a' : 1,
        'b' : 2,
        'c' : 3,
        'd' : 4,
        'e' : 5
    },
    p2 = [1,2,3,4,5,6],
    s1 = 0,
    s2 = 0;
p1.forEach(function(e){s1 += ~~e;});
p2.forEach(function(e){s2 += ~~e;});
console.debug(s1, s2);
 *	
 */
Object.prototype.forEach = function (f, self, i) {
    self = this;
    for (i in self) {
        self.hasOwnProperty(i) && f.call(self, self[i]);
    }
};