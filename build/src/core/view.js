/*--
VIEW
--*/

// directly instantiated assinging content
/**
 * [View description]
 * @param {[type]} cnt [description]
 */
View = function (cnt) {
    // original content
    
    this.ocontent = cnt || '';
    this.content = cnt || '';

    this.vars = {'baseurl' : $JMVC.vars.baseurl};
};

//
// meat to receive a model, all $name$
// placeholders in the view content
// will be replaced with the model
// variable value if exists
/**
 * [parse description]
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
View.prototype.parse = function (obj) {
    var j;
    if (!!this.content) {
        if (obj) {
            for (j in obj.vars) {
                if (obj.vars.hasOwnProperty(j)) {
                    this.content = this.content.replace(new RegExp("\\$" + j + "\\$", 'g'), obj.get(j) || '');
                }
            }
        }
        // now jmvc parse vars
        for (j in $JMVC.vars) {
            if ($JMVC.vars.hasOwnProperty(j)) {
                this.content = this.content.replace(new RegExp("\\$" + j + "\\$", 'gm'), $JMVC.vars[j] || '');
            }
        }
    }
    // allow chain
    return this;
};

//
// reset content to orginal (unparsed) value
// and reset all vars
/**
 * [reset description]
 * @return {[type]} [description]
 */
View.prototype.reset = function () {
    this.content = this.ocontent;
    this.vars = {};
    // allow chain
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


// render the view parsing for variable&view placeholders
/**
 * [render description]
 * @param  {[type]} pars [description]
 * @return {[type]}      [description]
 */
View.prototype.render = function (pars) {
    
    

    var arg = pars || {},
        //
        // maybe a callback is passed   
        cback = arg.cback || false,
        //
        // and maybe some args must be passed
        // to the callback
        argz = arg.argz || null,
        //
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
        pattvar = "\\$(.[^\\$\\s}]*)\\$",

        // variables found
        resvar,

        // a loop temporary variable
        t,

        trg,
        may_trg;

    

    //let pars be the callback function
    if (typeof pars === 'function') {
        cback = pars;
    }

    // parse for other views or $JMVC.vars
    
    //cont = Parser.parse(cont);
    
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


    if(!$JMVC.loaded){

        // books rendering in body or elsewhere, on load
        $JMVC.events.bind(W, 'load', function () {
            
            //call before render
            $JMVC.events.startRender();

            $JMVC.loaded = true;
            may_trg = target ? $JMVC.dom.find(target) : false;
            trg = may_trg || WD.body;


            $JMVC.vars.rendertime = +new Date() - time_begin;
            
            // before render
            that.content = jmvc.hook_check('onBeforeRender', [that.content]) || that.content;

            // render
            $JMVC.dom.html(trg, that.content);

            // after render
            jmvc.hook_check('onAfterRender', [that.content]);

            // may be a callback? 
            cback && cback.apply(this, argz || []);
            //trigger end of render queue
            $JMVC.events.endRender();
        });
    // yet loaded
    //happend after load... so can render a view from a render cback 
    //of a main view
    } else {
        may_trg = target ? $JMVC.dom.find(target) : false;
        trg = may_trg || WD.body;
        $JMVC.dom.html(trg, that.content);
        cback && cback.apply(this, !!argz ? argz : []);
    }
    // allow chain
    // 
    
    
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
            if (vname.hasOwnProperty(i) && (!this.vars[i] || vval || force)) {
                this.vars[i] = vname[i];
            }
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
    if (!!this.vars[n]) {this.vars[n] = null; }
    return this;
};
//////////////////////

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