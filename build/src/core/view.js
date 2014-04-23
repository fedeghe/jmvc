/*--
VIEW
--*/
// directly instantiated assinging content
/**
 * [View description]
 * @param {String} cnt beginning content for the view
 */
View = function (cnt) {

    //the view container
    //
    this.container = false;

    // original content, not intended to be modified
    // 
    this.ocontent = cnt || '';

    // the content passed or empty
    // 
    this.content = cnt || '';

    // every view has a registry for the variables that will be used at reder time
    // 
    this.vars = {
        baseurl : $JMVC.vars.baseurl
    };
};
//
// meat to receive a model, all $name$
// placeholders in the view content
// will be replaced with the model
// variable value if exists
/**
 * [parse description]
 * @param  {[type]} obj [description]
 * @return {}     [description]
 */
View.prototype.parse = function (obj) {
    var j;
    if (!!this.content) {
        if (obj) {
            for (j in obj.vars) {
                obj.vars.hasOwnProperty(j) &&
                (this.content = this.content.replace(new RegExp('\\$' + j + '\\$', 'g'), obj.get(j) || ''));
            }
        }
        // now jmvc parse vars
        for (j in $JMVC.vars) {
            $JMVC.vars.hasOwnProperty(j) &&
            (this.content = this.content.replace(new RegExp('\\$' + j + '\\$', 'gm'), $JMVC.vars[j] || ''));
        }
    }
    // allow chain
    return this;
};


/**
 * reset content to orginal (unparsed) value
 * and reset all vars
 * @return {[type]} [description]
 */
View.prototype.reset = function () {
    // get back the original content
    //
    this.content = this.ocontent;

    // reset vars
    //
    this.vars = {};

    // chain
    return this;
};

/**
 * [setFromUrl description]
 * @param {[type]} vname [description]
 * @param {[type]} alt   [description]
 */
View.prototype.setFromUrl = function (vname, alt) {
    this.set(String(vname), $JMVC.controllers[$JMVC.c].get(vname) || alt || 'unset');
    // allow chain
    return this;
};

/*
 * [getFromUrl description]
 * @param {[type]} vname [description]
 * @param {[type]} alt   [description]
 */
View.prototype.getFromUrl = function (vname) {
    return $JMVC.controllers[$JMVC.c].get(vname) || false;
};

/**
 * render the view parsing for variable&view placeholders
 * @param  {[type]} pars [description]
 * @return {[type]}      [description]
 */
View.prototype.render = function (pars) {
    var arg = pars || {},
        
        // maybe a callback is passed   
        cback = arg.cback || false,
        
        // and maybe some args must be passed
        // to the callback
        argz = arg.argz || null,

        // You may specify a string with a selector or a node,
        // that's where the content will be loaded,
        // note that here dom is not loaded so you
        // cannot pass an element
        target = arg.target || false,
        
        // for binding this context in the callback
        that = this,
        
        // the view content
        cont = this.content,
        
        // regexp for variables, do NOT use here new RegExp
        pattvar = '\\$(.[^\\$\\s}]*)\\$',
        
        // variables found
        resvar,
        
        // a loop temporary variable
        t,
        trg,
        may_trg;

    //let pars be the callback function
    typeof pars === 'function' && (cback = pars);

    // look for / substitute  vars
    // in the view (these belongs to the view)
    resvar = 1;
    while (resvar) {
        resvar = new RegExp(pattvar, 'gm').exec(cont);
        if (resvar) {
            t = this.get(resvar[1]) || '';
            cont = cont.replace('$' + resvar[1] + '$', t);
        }
    }
    cont = Parser.parse(cont);
    this.content = cont;
    if (!$JMVC.loaded) {

        // books rendering in body or elsewhere, on load
        // @ @ //
        $JMVC.events.bind(W, 'load', function () {

            // call before render
            $JMVC.events.startRender();
            //
            $JMVC.loaded = true;
            may_trg = target ? $JMVC.dom.find(target) : false;
            trg = may_trg || WD.body;
            this.container = trg;

            // time
            $JMVC.vars.starttime = time_begin;
            $JMVC.vars.endtime = +new Date;


            $JMVC.vars.rendertime = $JMVC.vars.endtime - $JMVC.vars.starttime;

            // before render
            that.content = jmvc.hook_check('onBeforeRender', [that.content]) || that.content;

            // render
            $JMVC.dom.html(trg, that.content);

            // may be a callback? 
            cback && cback.apply(this, argz || []);

            // after render
            that.content = jmvc.hook_check('onAfterRender', [that.content]) || that.content;

            // trigger end of render queue
            $JMVC.events.endRender();
        // @ @ //
        });

    // happend after load... so can render a view from a render cback 
    // of a main view
    } else {
        may_trg = target ? $JMVC.dom.find(target) : false;
        trg = may_trg || WD.body;
        $JMVC.dom.html(trg, that.content);
        cback && cback.apply(this, !!argz ? argz : []);
    }
    // chain
    return this;
};
///////////////////////
// COMMON
// getter, setter and "deleter" for mvc classes
/**
 * [get description]
 * @param  {[type]} n [description]
 * @return {[type]}   [description]
 */
View.prototype.get = Model.prototype.get = Controller.prototype.get = function (n) {
    return (!!this.vars[n]) ? this.vars[n] : false;
};
/**
 * [set description]
 * @param {[type]} vname [description]
 * @param {[type]} vval  [description]
 * @param {[type]} force [description]
 */
View.prototype.set = Model.prototype.set = Controller.prototype.set = function (vname, vval, force) {
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
View.prototype.del = Model.prototype.del = Controller.prototype.del = function (n) {
    !!this.vars[n] && (this.vars[n] = null);
    return this;
};
/**
 * [clone description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
View.prototype.clone  = function (name) {
    var ret = false;
    if (typeof name !== 'undefined') {
        $JMVC.views[name] = new View(this.ocontent);
        ret = $JMVC.views[name];
    } else {
        ret = new View(this.ocontest);
    }
    return ret;
};
//-----------------------------------------------------------------------------