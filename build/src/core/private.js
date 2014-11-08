// private ns for modules
_ = {};
_.common = {
    digFor : function (what, obj, target) {
        if(!what.match(/key|value/)) {
            throw new JMVC.Errors.BadParams('Bad param for JMVC._.object.digFor');
        }
        var matches = {
                key : function (k1, k2, v) {return JMVC.object.jCompare(k1, v);},
                value : function (k1, k2, v) {return JMVC.object.jCompare(k2, v);}
            }[what],
            res = [];

        function dig(o, k, path) {
            var i, l, p,
                deepIt = function (i, el) {
                    p = [].concat.call(path, [i]);
                    if(matches(i, el, k)) {
                        res.push({value: el, path : p.join('/')});
                    }
                    dig (el, k, p);
                } ;
            if (typeof o === 'object') {
                for (i in o) {
                    deepIt(i, o[i]);
                }
            } else if (o instanceof Array) {                
                for (i = 0, l = o.length; i < l; i++) {
                    deepIt(i, o[i]);
                }
            } else {
                return;
            }
        }
        dig(obj, target, []);
        return res;
    }
};