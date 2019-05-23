///////////////////////
// COMMON
// getter, setter and "deleter" for mvc classes

/**
 * [get description]
 * @param  {[type]} n [description]
 * @return {[type]}   [description]
 */
View.prototype.get =
Model.prototype.get =
Controller.prototype.get = function (n) {
    return this.vars[n] ? this.vars[n] : false;
};

/**
 * [set description]
 * @param {[type]} vname [description]
 * @param {[type]} vval  [description]
 * @param {[type]} force [description]
 */
View.prototype.set =
Model.prototype.set =
Controller.prototype.set = function (vname, vval, force) {
    var i;
    switch (typeof vname) {
    case 'string':
        if (!this.vars[vname] || force) {this.vars[vname] = vval; }
        break;
    case 'object':
        for (i in vname) {
            vname.hasOwnProperty(i) && (!this.vars[i] || vval || force) &&
            (this.vars[i] = vname[i]);
        }
        break;
    }
    return this;
};

/**
 * [del description]
 * @param  {[type]} n [description]
 * @return {[type]}   [description]
 */
View.prototype.del =
Model.prototype.del =
Controller.prototype.del = function (n) {
    !!this.vars[n] && (this.vars[n] = null);
    return this;
};