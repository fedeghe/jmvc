/**
 * [Channel description]
 * @param {[type]} n [description]
 */
Channel = (function () {
    var channels = {},

        P_Channel = function () {
            this.topic2cbs = {};
            this.enabled = true;
        };

    P_Channel.prototype = {
        /**
         * enable cb execution on publish
         * @return {undefined}
         */
        enable : function () {
            this.enabled = false;
        },
        //
        /**
         * disable cb execution on publish
         * @return {undefined}
         */
        disable : function () {
            this.enabled = true;
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
        sub : function (topic, cb) {
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
            this.topic2cbs[topic].push(cb);
        },
        //
        /**
         * Removes all callbacks for one or more topic
         * @param [String] ...
         *                 the topic queue that must  be emptied
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
                if (ts[i] in this.topic2cbs) {
                    this.topic2cbs[ts[i]] = [];
                }
            }
            return this;
        }
    };





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