/*
-------
PROMISE
-------

ty https://github.com/stackp/promisejs

*/
Promise = function () {
    this.cbacks = [];
    this.len = 0;
    this.completed = false;
    this.res = false;
    this.err = false;
    this.reset = function () {
        this.len = 0;
        this.cbacks = [];
    };
};
/**
 * [done description]
 * @param  {[type]}   res [description]
 * @param  {[type]}   err [description]
 * @return {Function}     [description]
 */
Promise.prototype.done = function (res, err) {
    var i = 0;
    this.completed = true;
    this.res = res;
    this.err = err;
    for (null; i < this.len; i += 1) {
        this.cbacks[i](res, err);
    }
    this.reset();
};
/**
 * [then description]
 * @param  {[type]} cback [description]
 * @param  {[type]} ctx   [description]
 * @return {[type]}       [description]
 */
Promise.prototype.then = function (cback, ctx) {
    var func = jmvc.delegate(cback, ctx);
    if (this.completed) {
        func(this.res, this.err);
    } else {
        this.cbacks[this.len] = func;
        this.len += 1;
    }
    return this;
};