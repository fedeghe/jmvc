Event = (function () {
    /*
    Event JMVC object
    use mainly for observers
    */
    var _event = function (sender) {
        this.sender = sender;
        this.listeners = [];
    };
    _event.prototype = {
        /**
         * [ description]
         * @param  {[type]} listener [description]
         * @return {[type]}          [description]
         */
        attach: function (listener) {
            this.listeners.push(listener);
            return this;
        },
        /**
         * [ description]
         * @param  {[type]} args [description]
         * @return {[type]}      [description]
         */
        notify: function (args) {
            var i = 0,
                l = this.listeners.length;
            while (i < l) {
                this.listeners[i++](this.sender, args);
            }
            return this;
        }
    };
    return {
        create: function (s) {
            return new _event(s);
        }
    };
})();
// -----------------------------------------------------------------------------
