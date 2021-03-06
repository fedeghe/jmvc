(function () {
    return function (what, obj, target, limit) {
        if (!what.match(/key|value|keyvalue/)) {
            throw new JMVC.Errors.BadParams('Bad param for JMVC._.object.digFor');
        }
        limit = ~~limit;

        var found = 0,
            matches = {
                key: function (k1, k2, key) {
                    return (JMVC.util.isString(k1) && key instanceof RegExp)
                        ? k1.match(key)
                        : JMVC.object.jCompare(k1, key);
                },
                value: function (k1, k2, val) {
                    return (JMVC.util.isString(k2) && val instanceof RegExp)
                        ? k2.match(val)
                        : JMVC.object.jCompare(k2, val);
                },
                keyvalue: function (k1, k2, keyval) {
                    return (
                        (JMVC.util.isString(k1) && keyval.key instanceof RegExp)
                            ? k1.match(keyval.key)
                            : JMVC.object.jCompare(k1, keyval.key)
                    ) && (
                        (JMVC.util.isString(k2) && keyval.value instanceof RegExp)
                            ? k2.match(keyval.value)
                            : JMVC.object.jCompare(k2, keyval.value)
                    );
                }
            }[what],

            res = [],

            maybeDoPush = function (path, index, key, obj, level) {
                var p = [].concat.call(path, [index]),
                    tmp = matches(index, obj[index], key);
                if (tmp) {
                    res.push({
                        obj: obj,
                        value: obj[index],
                        key: p[p.length - 1],
                        parentKey: p[p.length - 2],
                        path: p.join('/'),
                        container: p.slice(0, p.length - 1).join('/'),
                        parentContainer: p.slice(0, p.length - 2).join('/'),
                        regexp: tmp,
                        level: level
                    });
                    found++;
                }
                dig(obj[index], key, p, level + 1);
            },

            dig = function (o, k, path, level) {
                // if is a domnode must be avoided
                // if (isNode(o) || isElement(o)) return;
                var i, l;

                if (o instanceof Array) {
                    for (i = 0, l = o.length; i < l; i++) {
                        maybeDoPush(path, i, k, o, level);
                        if (limit && limit === found) break;
                    }
                } else if (typeof o === 'object') {
                    for (i in o) {
                        maybeDoPush(path, i, k, o, level);
                        if (limit && limit === found) break;
                    }
                }
            };
        dig(obj, target, [], 0);
        return res;
    };
// eslint-disable-next-line semi
})()
