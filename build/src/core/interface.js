

/**
 * INTERFACE
 * =========
 * [Interface description]
 * @param {[type]} name [description]
 * @param {[type]} a    [description]
 */
Interface = function (name, a) {
    this.name = name;
    this.mthds = [];
    if (!(a instanceof Array)){
        throw new Error('An array of strings must be passed to the Interface constructor');
    }
    for (var i = 0, l = a.length; i < l; i++) {
        (typeof a[i] === 'string') && this.mthds.push(a[i]);
    }
};

/**
 * [checkImplements description]
 * @param  {[type]} obj    [description]
 * @param  {[type]} intrfc [description]
 * @return {[type]}        [description]
 */
Interface.checkImplements = function (obj) {
    var m,
        i = 0,
        arg = Array.prototype.slice.call(arguments);
        l = arg.length;

    while (++i < l){
        for (m in arg[i].mthds) {
            if (typeof obj[arg[i].mthds[m]] !== 'function') {
                throw new Error("Function Interface.checkImplements: object "
                  + "does not implement the " + arg[i].name
                  + " interface. Method " + arg[i].mthds[m] + " was not found.");
            }
        }
    }

    return obj;
};  