Interface = (function (){
    var _interface = function (name, a) {
        var i = 0,
            l;
        this.name = name;
        this.mthds = [];
        if (!(a instanceof Array)) {
            throw new Error('An array of strings must be passed to the Interface constructor');
        }
        l = a.length;
        for (null; i < l; i += 1) {
            typeof a[i] === 'string' && (this.mthds.push(a[i]));
            //console.debug(checkInterface(a[i]));
        }
    };

    return {
        create : function (_n, _a) {
            return new _interface(_n, _a);
        }
    };
})();

/**
 * [checkInterface description]
 * @param  {[type]} f [description]
 * @return {[type]}   [description]
 */
/*
function checkInterface(f) {
    var r = f.toString()
        .match(/function\s(.*)\((.*)\)\s?{return\s[\'\"]?(.*)[\'\"]?;}/);
    return r instanceof Array && r.length === 4 ? {
        name : r[1],
        params : !!r[2] ? r[2].replace(/\s/g, '').split(',') : false,
        ret : !!r[3] ? r[3]  : false
    } : false;
}
*/

/**
 * Static method to check if an instance implements one or more Interfaces
 * @param  {[type]} obj    [description]
 * @param  {[type]} intrfc [description]
 * @return {[type]}        [description]
 */
Interface.checkImplements = function (obj) {
    var m,
        i = 0,
        arg = Array.prototype.slice.call(arguments),
        l = arg.length,
        ret = true,
        msg = '';

    //skip 0 being it obj
    while (++i < l) {
        for (m in arg[i].mthds) {
            if (typeof obj[arg[i].mthds[m]] !== 'function') {
                ret = false;
                msg += 'Function Interface.checkImplements: object ' +
                'does not implement the `' + arg[i].name +
                '` interface : method ' + arg[i].mthds[m] + ' was not found.' + "\n";
            }
        }
    }
    if (!ret) {
        JMVC.debug(msg);
    }
    return ret;
};
/*
function tee(func, obj, str) {return 'obj';}

function checkInterface(f) {
    var r = f.toString()
        .match(/function\s(.*)\((.*)\)\s?{return\s[\'\"]?(.*)[\'\"]?;}/);
    return r instanceof Array && r.length == 4? {
        name : r[1],
        params : !!r[2] ? r[2].replace(/\s/g, '').split(',') : false,
        ret : r[3]
    } : false;
}

console.dir(checkInterface(tee));
 */
//-----------------------------------------------------------------------------