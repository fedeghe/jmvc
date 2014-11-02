
Promise = (function() {

    /**
     * [_promise description]
     * @return {[type]} [description]
     */
    var _promise = function() {
            this.cbacks = [];
            this.len = 0;
            this.solved = false;
            this.result = null;
        },
        proto = _promise.prototype;

    /**
     * [then description]
     * @param  {[type]} func [description]
     * @return {[type]}      [description]
     */
    proto.then = function(func, ctx) {
        var self = this,
            f = function () {
                self.solved = false;
                func.call(ctx || self, self, self.result);
            };
        if (this.solved) {
            f();
        } else {
            this.cbacks[this.len++] = f;
        }
        return this;
    };

    /**
     * [done description]
     * @param  {[type]}   r [description]
     * @return {Function}   [description]
     */
    proto.done =
    proto.resolve = function(r) {
        this.result = r;
        if (!this.len) {
            return this.result;
        }
        this.solved = true;
        this.cbacks.shift()(r);
        this.len--;
    };

    /**
     * [chain description]
     * @param  {[type]} funcs [description]
     * @param  {[type]} args  [description]
     * @return {[type]}       [description]
     */
    function chain(funcs, args) {
        var first = (function () {
                var p = new _promise();
                funcs[0].apply(p, args);
                return p;
            })(),
            tmp = [first];

        for (var i = 1, l = funcs.length;  i < l; i++) {
            tmp.push(tmp[i-1].then(funcs[i]));
        }
    }

    /**
     * [join description]
     * @param  {[type]} pros [description]
     * @return {[type]}      [description]
     */
    function join(pros) {
        var pros = [].splice.call(arguments, 0),
            p = new _promise(),
            res = [],
            i = 0,
            len = pros.length,
            lengthToGo = len;
        for (null; i < len; i++) {
            (function (j) {
                pros[j]().then(function (r) {
                    res[j] = r;
                    if (--lengthToGo == 0) {
                        p.done(res);
                    }
                });
            })(i);
        }
        return p;
    }

    
    return {
        create : function () {
            return new _promise();
        },
        chain : chain,
        join : join
    };
})();