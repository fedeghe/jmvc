Promise = (function() {
    var _Promise = function() {
            this.cbacks = [];
            this.solved = false;
            this.result = null;
        },
        proto = _Promise.prototype;
    /**
     * [then description]
     * @param  {[type]} func [description]
     * @param  {[type]} ctx  [description]
     * @return {[type]}      [description]
     */
    proto.then = function(func, ctx) {
        var self = this,
            f = function() {
                self.solved = false;
                func.apply(ctx || self, [ctx || self, self.result]);
            };
        if (this.solved) {
            f();
        } else {
            this.cbacks.push(f);
        }
        return this;
    };

    /**
     * [done description]
     * @return {Function} [description]
     */
    proto.done = function() {
        var r = [].slice.call(arguments, 0);
        this.result = r;
        this.solved = true;
        if (!this.cbacks.length) {
            return this.result;
        }
        this.cbacks.shift()(r);
    };

    /**
     * [chain description]
     * @param  {[type]} funcs [description]
     * @param  {[type]} args  [description]
     * @return {[type]}       [description]
     */
    function chain(funcs, args) {

        var p = new _Promise();
        var first = (function() {

                funcs[0].apply(p, [p].concat([args]));
                return p;
            })(),
            tmp = [first];

        for (var i = 1, l = funcs.length; i < l; i++) {
            tmp.push(tmp[i - 1].then(funcs[i]));
        }
        return p;
    }

    /**
     * [join description]
     * @param  {[type]} pros [description]
     * @param  {[type]} args [description]
     * @return {[type]}      [description]
     */
    function join(pros, args) {
        var endP = new _Promise(),
            res = [],
            stack = [],
            i = 0,
            l = pros.length,
            limit = l,
            solved = function (remainder) {
                !remainder && endP.done.apply(endP, res);
            };

        for (null; i < l; i++) {
            (function (k) {
                stack[k] = new _Promise();

                // inside every join function the context is a Promise, and
                // is possible to return it or not 
                var _p = pros[k].apply(stack[k], [stack[k], args]);
                (_p instanceof _Promise ? _p : stack[k])
                .then(function (p, r) {
                    res[k] = r;
                    solved(--limit);
                });
            })(i);
        }
        return endP;
    }

    /* returning module
    */
    return {
        create: function() {
            return new _Promise();
        },
        chain: chain,
        join: join
    };
})();