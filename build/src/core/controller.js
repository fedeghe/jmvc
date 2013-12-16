/*--------
CONTROLLER          
--------*/

// parent controller
Controller = function () {};

// for storing vars 
Controller.prototype.vars = {};

// this has no sense and must be removed
Controller.prototype.jmvc_routes = {};

/**
 * [index description]
 * @return {[type]} [description]
 */
Controller.prototype.index = function () {
    W.alert('Default index action, write down a controller with at least an index action');
};

/**
 * [addRoutes description]
 * @param {[type]} name [description]
 * @param {[type]} val  [description]
 */
Controller.prototype.addRoutes = function (name, val) {
    var j;
    if (typeof name === 'string') {
        this.jmvc_routes[name] = val;
    }
    if (typeof name === 'object') {
        for (j in name) {
            name.hasOwnProperty(j) && this.addRoutes(j, name[j]);
        }
    }
};

/**
 * [relocate description]
 * @param  {[type]} uri [description]
 * @param  {[type]} ms  [description]
 * @return {[type]}     [description]
 */
Controller.prototype.relocate = function (uri, ms) {
    W.setTimeout(
        function () {WDL.href = String(uri); },
        ~~(1 * ms) || 0
    );
};

/**
 * [render description]
 * @param  {[type]} content [description]
 * @param  {[type]} cback   [description]
 * @return {[type]}         [description]
 */
Controller.prototype.render = function (content, cback) {
    ///allow only cback 
    if (typeof content === 'function') {
        cback = content;
        content = false;
    }
    
    var tmp_v = new View(content);
    tmp_v.render(cback && typeof cback === 'function' ? {cback : cback} : null);

    return this;
};

/**
 * [reset description]
 * @return {[type]} [description]
 */
Controller.prototype.reset = function () {
    this.vars = {};
    return this;
};