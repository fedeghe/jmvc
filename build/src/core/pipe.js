/**
 * Pipe pub sub singleton module
 * @return {Object} The Pipe object with pub, sub, reset, enable, disable
 */
Pipe = (function () {

    var topic2cbs = {},
        enabled = true;

    return {
        pub : function (topic, args) {
            if (!(topic in topic2cbs) || !enabled) {
                return false;
            }
            for (var i = 0, l = topic2cbs[topic].length; i < l; i++) {
                topic2cbs[topic][i].apply(null, args);
            }    
        },
        sub : function (topic, cb) {
            if (topic instanceof Array) {
                for (var i = 0, l = topic.length; i < l; i++) {
                    this.sub(topic[i], cb);
                }
            }
            if (!(topic in topic2cbs) || !enabled) {
                topic2cbs[topic] = [];
            }
            topic2cbs[topic].push(cb);
        },
        reset : function () {
            var ts = Array.prototype.slice.call(arguments, 0),
                l = ts.length,
                i = 0;
            if (!!l) {
                for (null;   i < l; i++) {
                    if (ts[i] in topic2cbs) {
                        topic2cbs[ts[i]] = [];
                    }   
                }
            } else {
                topic2cbs = {};
            }
        },
        enable : function () {enabled = true;},
        disable : function () {enabled = false;}
    }
})();
/**
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