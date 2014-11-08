Promise = (function() {

    var _Promise = function() {
            this.cbacks = [];
            this.solved = false;
            this.result = null;
        },
        proto = _Promise.prototype;

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
    proto.done = function() {
        var r = [].slice.call(arguments, 0);
        this.result = r;
        this.solved = true;
        if (!this.cbacks.length) {
            return this.result;
        }
        this.cbacks.shift()(r);
        
    };

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

    function join(pros, args) {
        var endP = new _Promise(),
            res = [],
            stack = [],
            i = 0,
            l = pros.length,
            limit = l,
            solved = function(remainder) {
                !remainder && endP.done.apply(endP, res);
            };

        for (null; i < l; i++) {
            (function(k) {
                stack[k] = new _Promise();
                pros[k].apply(stack[k], [stack[k], args]);
                stack[k].then(function(p, r) {
                    res[k] = r;
                    solved(--limit);
                });
            })(i);
        }
        return endP;
    }

    return {
        create: function() {
            return new _Promise();
        },
        chain: chain,
        join: join
    };

})();