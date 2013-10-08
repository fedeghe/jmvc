/*
---------
INTERFACE
---------
*/
Interface = function (a) {
    this.mthds = a;
};

/**
 * [prototype description]
 * @type {Object}
 */
Interface.prototype = {
    /**
     * [addMethod description]
     * @param {[type]} mthd [description]
     */
    addMethod : function (mthd) {
        this.mthds[mthd.name] || (this.mthds[mthd.name] = mthd);
    },
    /**
     * [removeMethod description]
     * @param  {[type]} mthd [description]
     * @return {[type]}      [description]
     */
    removeMethod : function (mthd) {
        this.mthds[mthd] && (this.mthds[mthd] = null);
    },
    /**
     * [check description]
     * @param  {[type]} o [description]
     * @return {[type]}   [description]
     */
    check : function (o) {
        var m,
            i = 0,
            l = this.mthds.length,
            obj = new o();
        for (m in this.mthds) {
            if (typeof obj[this.mthds[m]] !== 'function') {
                return false;
            }
        }
        obj = null;
        return true;
    }
};