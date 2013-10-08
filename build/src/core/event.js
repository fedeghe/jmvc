/*
-----
EVENT
-----
*/
Event = function (sender) {
    this.sender = sender;
    this.listeners = [];
};
Event.prototype = {
    /**
     * [ description]
     * @param  {[type]} listener [description]
     * @return {[type]}          [description]
     */
    'attach' : function (listener) {
        this.listeners.push(listener);
    },

    /**
     * [ description]
     * @param  {[type]} args [description]
     * @return {[type]}      [description]
     */
    'notify' : function (args) {
        var i = 0,
            l = this.listeners.length;
        for (null; i < l; i++) {
            this.listeners[i](this.sender, args);
        }
    }
};