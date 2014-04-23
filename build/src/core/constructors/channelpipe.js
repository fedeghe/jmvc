/**
 * [Channel description]
 * @param {[type]} n [description]
 */
Channel = (function () {
    var channels = {},

        // function added to free completely
        // that object from dependencies
        // 
        findInArray = function (arr, mvar) {
            //IE6,7,8 would fail here
            if ('indexOf' in arr) {
                return arr.indexOf(mvar);
            }
            var l = arr.length - 1;
            while (arr[l] !== mvar) l--;
            return l;
        },

        P_Channel = function () {
            this.topic2cbs = {};
            this.enabled = true;
        };

    /**
     * [prototype description]
     * @type {Object}
     */
    P_Channel.prototype = {
        /**
         * enable cb execution on publish
         * @return {undefined}
         */
        enable : function () {
            this.enabled = true;
        },
        //
        /**
         * disable cb execution on publish
         * @return {undefined}
         */
        disable : function () {
            this.enabled = false;
        },
        //
        /**
         * publish an event on that channel
         * @param  {String} topic
         *                  the topic that must be published
         * @param  {Array} args
         *                 array of arguments that will be passed
         *                 to every callback
         * @return {undefined}
         */
        pub : function (topic, args) {
            var i = 0,
                l;
            if (!(topic in this.topic2cbs) || !this.enabled) {
                return false;
            }
            for (l = this.topic2cbs[topic].length; i < l; i += 1) {
                this.topic2cbs[topic][i].apply(null, [topic].concat(args));
            }
            return true;
        },
        //
        /**
         * add a callback to a topic
         * @param {String} topic
         *                 the topic that must be published
         * @param {Function} cb
         *                   the callback will receive as first
         *                   argument the topic, the others follow
         * @return {undefined}
         */
        sub : function (topic, cb, force) {
            var i = 0,
                l;
            if (topic instanceof Array) {
                for (l = topic.length; i < l; i += 1) {
                    this.sub(topic[i], cb);
                }
            }

            if (!(topic in this.topic2cbs) || !this.enabled) {
                this.topic2cbs[topic] = [];
            }

            if (!force && findInArray(this.topic2cbs[topic], cb) >= 0) {
                return this;
            }

            this.topic2cbs[topic].push(cb);
        },

        /**
         * removes an existing booked callback from the topic list
         * @param  {[type]}   topic [description]
         * @param  {Function} cb    [description]
         * @return {[type]}         [description]
         */
        unsub : function (topic, cb) {
            var i = 0,
                l;
            if (topic instanceof Array) {
                for (l = topic.length; i < l; i += 1) {
                    this.unsub(topic[i], cb);
                }
            }
            if (topic in this.topic2cbs) {
                i = findInArray(this.topic2cbs[topic], cb);
                if (i >= 0) {
                    this.topic2cbs[topic].splice(i, 1);
                }
            }
            return this;
        },
        
        /**
         * one shot sub with auto unsub after first shot
         * @param  {[type]}   topic [description]
         * @param  {Function} cb    [description]
         * @return {[type]}         [description]
         */
        once : function (topic, cb){
            var self = this,
                cb2 = function () {
                    cb.apply(null, Array.prototype.concat(arguments));
                    self.unsub(topic, cb2);
                };
            this.sub(topic, cb2);
        },

        //
        /**
         * Removes all callbacks for one or more topic
         * @param [String] ...
         *                 the topic queues that must  be emptied
         * @return [Channel] the instance
         */
        reset : function () {
            var ts = Array.prototype.slice.call(arguments, 0),
                l = ts.length,
                i = 0;
            if (!l) {
                this.topic2cbs = {};
                return this;
            }
            for (null; i < l; i += 1) {
                ts[i] in this.topic2cbs && (this.topic2cbs[ts[i]] = []);
            }
            return this;
        }
    };




    /**
     * returning function
     */
    return function (name) {
        if (name in channels) {
            return channels[name];
        }
        channels[name] = new P_Channel();
        return channels[name];
    };
})();



/*
var colorsPalette = JMVC.Channel('colorsPalette'),
    optionsPalette = new JMVC.Channel('optionsPalette');

colorsPalette.sub('getNewColor', function (topic, c){
    console.debug('got color :' + c);
});
colorsPalette.sub('invert', function (topic, c){
   console.debug('trying to invert color ' + c + ' ... '); 
});
optionsPalette.sub(['opened', 'closed'], function (topic){
    console.debug('The option palette has been ' + topic);
});

colorsPalette.pub('getNewColor', ['#fede76']);

colorsPalette.pub('invert', ['#232323']);
optionsPalette.pub('opened');
optionsPalette.pub('closed');

//////// THE GOOD THING IS THAT IT WORKS EVEN IN DIRECT MODE


JMVC.Channel('colorsPalette').sub('getNewColor', function (topic, c){
    console.debug('got color :' + c);
});
JMVC.Channel('colorsPalette').sub('invert', function (topic, c){
   console.debug('trying to invert color ' + c + ' ... '); 
});
JMVC.Channel('optionsPalette').sub(['opened', 'closed'], function (topic){
    console.debug('The option palette has been ' + topic);
});

JMVC.Channel('colorsPalette').pub('getNewColor', ['#fede76']);

JMVC.Channel('colorsPalette').pub('invert', ['#232323']);
JMVC.Channel('optionsPalette').pub('opened');
JMVC.Channel('optionsPalette').pub('closed');



*/
//
//
//
/**
 * Pipe pub sub singleton module
 * the non singleton named version is the Channel object
 * @return {Object} The Pipe object with pub, sub, reset, enable, disable
 */
Pipe = (function () {
    return Channel('JMVC');
})();
/*
JMVC.Pipe.reset();

JMVC.Pipe.sub('news', function (){
    alert(JMVC.array.coll2array(arguments).join(' '));
});
JMVC.Pipe.sub('alarm', function (){
    alert(JMVC.array.coll2array(arguments).join(' '));
});
JMVC.Pipe.sub(['alarm', 'news'], function (){
    alert('double ' + JMVC.array.coll2array(arguments).join(' '));
});

JMVC.Pipe.pub('news', ['World is sold out!']);

JMVC.Pipe.pub('alarm', ['Bomb in the hole,','runaway!!!']);
 */
//-----------------------------------------------------------------------------