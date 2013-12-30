/*------------
Function queue
------------*/
FunctionQueue = function () {
    this.queue = [];
};
FunctionQueue.prototype.add = function (f) {
    this.queue.push(f)
};
FunctionQueue.prototype.run = function() {
    var i = 0,
        l = this.queue.length,
        args = [].slice.call(arguments, 0),
        f;
    while (i < l){
        f = this.queue[i++];
        (args instanceof Array) || (args = [args]);
        args = f.apply(null, args);
    }
    return args;    
};
FunctionQueue.prototype.reset = function () {
    this.queue.length = 0;
}
//-----------------------------------------------------------------------------