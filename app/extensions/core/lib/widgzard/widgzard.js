// type : LIB
//


/**
 * Widgzard extension
 * 
 * Create an arbitrary dom tree json based allowing for each node to 
 * specify a callback that will be called onky when every inner callback
 * will declare to have finished his work.
 *
 * @author Federico Ghedina
 */
JMVC.extend('core/widgzard', function () {
    "use strict";

    JMVC.head.addStyle(JMVC.vars.extensions + 'core/lib/widgzard/widgzard.min.css');

    // clearer class that should provide right
    // css float clearing
    // ex: TB uses `clearfix`, I don`t
    // 
    var clearerClassName = 'clearer',
        nodeIdentifier = 'wid',
        noop = function () {},
        delegate,
        eulerWalk = JMVC.dom.eulerWalk,
        autoclean = true,
        htmlspecialchars,
        load;

    /**
     * Main object constructor represeting any node created
     * @param {[type]} conf the object that has the information about the node
     *                      that will be created
     * @param {[type]} trg  the DomNODE where the element will be appended to
     * @param {[type]} mapcnt an object used to allow the access from any node
     *                        to every node that has the gindID attribute
     */
    function Wnode(conf, trg, mapcnt) {

        // save a reference to the instance
        // 
        var self = this,

            // the tag used for that node can be specified in the conf
            // otherwise will be a div (except for 'clearer') 
            tag = conf.tag || "div";

        // save a reference to the target parent for that node
        // by means of the callback promise chain, in fact the 
        // real parent for the node can even be different as 
        // specified in the conf.target value
        // 
        this.target = trg;

        // create the node
        // 
        this.node = document.createElement(tag);

        // save a reference toe the node configuration
        // will be useful on append to append to conf.target
        // if specified
        //
        this.conf = conf;

        // save a reference to the node callback if speficied
        // otherwise create a function that do nothing but
        // freeing the parent promise from waiting
        //
        this.node.WIDGZARD_cb = conf.cb || function () {
            // autoresolve
            self.node.resolve();
        };

        // save a reference to a brand new Promise
        // the Promise.node() will be called as far as
        // all the child elements cb have called 
        // this.done OR this.resolve
        // 
        this.node.WIDGZARD_promise = new JMVC.Promise();

        // When called Promise.done means that 
        // the parent callback can be called
        // delegating the parent context
        //
        this.node.WIDGZARD_promise.then(trg.WIDGZARD_cb, trg);

        // as said at the begibbibg every node keeps a reference
        // to a function that allow to get a reference to any
        // node that in his configuration has a `nodeIdentifier` value
        // specified
        //
        this.map = mapcnt.map;
        this.node.getNode = mapcnt.getNode;

        // how many elements are found in the content field?
        // that counter is fundamental for calling this node
        // callback only when every child callback has done
        // 
        this.node.WIDGZARD_len = conf.content ? conf.content.length : 0;

        // through these two alias from within a callback
        // (where the DOMnode is passed as context)
        // the have to declare that has finished
        // if the count is nulled it means that the promise 
        // is done, thus it`s safe to call its callback
        //
        this.node.done = this.node.resolve = function () {
          
            // if all the child has called done/resolve
            // it`s time to honour the node promise,
            // thus call the node callback
            // 
            !--self.target.WIDGZARD_len && self.node.WIDGZARD_promise.done();
        };
    }

    /**
     * Set neo attributes
     * @param {DOMnode} node  the node
     * @param {Object} attrs  the hash of attributes->values
     */
    Wnode.prototype.setAttrs = function (node, attrs) {
        // if set, append all attributes (*class)
        // 
        if (typeof attrs !== 'undefined') { 
            for (var j in attrs) {
                if (j !== 'class') {
                    if (j !== 'style') {
                        node.setAttribute(j, attrs[j]);
                    } else {
                        this.setStyle(node, attrs.style);
                    }
                } else {
                    node.className = attrs[j];
                }
            }
        }
        return this;
    };

    /**
     * Set node inline style
     * @param {DOMnode} node  the node
     * @param {Object} style  the hash of rules
     */
    Wnode.prototype.setStyle = function (node, style) {
        // if set, append all styles (*class)
        //
        if (typeof style !== 'undefined') {
            for (var j in style) {
                node.style[j.replace(/^float$/i, 'cssFloat')] = style[j];
            }
        }
        return this;
    };

    /**
     * Set node data
     * @param {DOMnode} node  the node
     * @param {Object} data   the hash of properties to be attached
     */
    Wnode.prototype.setData = function (node, data) {
        node.data = data || {};
        return this;
    };
    
    /**
     * add method for the Wnode
     */
    Wnode.prototype.add = function () {

        var conf = this.conf,
            node = this.node;

        // set attributes and styles
        // 
        this.setAttrs(node, conf.attrs)
            .setStyle(node, conf.style)
            .setData(node, conf.data);

        // if `html` key is found on node conf 
        // inject its value
        //
        typeof conf.html !== 'undefined' && (node.innerHTML = conf.html);
        
        // save a reference back to json
        //
        //// this.conf.node = this.node;

        // if the node configuration has a `nodeIdentifier` key
        // (and a String value), the node can be reached 
        // from all others callback invoking
        // this.getNode(keyValue)
        //
        typeof conf[nodeIdentifier] !== 'undefined' && (this.map[conf[nodeIdentifier]] = node);

        // if the user specifies a node the is not the target 
        // passed to the constructor we use it as destination node
        // (node that in the constructor the node.target is always
        // the target passed)
        // 
        (conf.target || this.target).appendChild(node);
        node.WIDGZARD = true;

        // if the node configuration do not declares content array
        // then the callback is executed.
        // in the callback the user is asked to explicitly declare
        // that the function has finished the work invoking
        // this.done() OR this.resolve()
        // this is the node itself, those functions are attached
        // 
        !conf.content && node.WIDGZARD_cb.call(node);

        return node;
    };

    /**
     * clean a tree from injected properties to avoid leaks,
     * intended to be used just before render involving current
     * dom section previously created from Widgzard
     * @param  {[type]} node [description]
     * @return {[type]}      [description]
     */
    function cleanup(node) {
        var removeNode = function (t) {

                t.parentNode.removeChild(t);
                return true;
            },
            nodesToBeCleaned = [],
            keys = [
                'WIDGZARD', 'WIDGZARD_cb', 'WIDGZARD_promise', 'WIDGZARD_length',
                'getNode', 'done', 'resolve', 'data'
            ],
            kL = keys.length,
            i = 0,
            //j = 0, k = 0,
            n = null;
        
        // pick up postorder tree traversal
        eulerWalk(node, function (n) {
            //skip root & text nodes
            n !== node && n.nodeType != 3 && nodesToBeCleaned.push(n); // && k++;
        }, 'post');
        /*
        while (j < k) {
            n = nodesToBeCleaned[j++];
            while (i < kL) n[keys[i++]] = null;
            removeNode(n);
        }*/

        while (nodesToBeCleaned.length) {
            n = nodesToBeCleaned.pop();
            while (i < kL) n[keys[i++]] = null;
            removeNode(n);
        }

        nodesToBeCleaned = keys = null;

        return true;
    }



    /**
     * Public function to render Dom from Json
     * @param  {Object} params the configuration json that contains all the 
     *                         information to build the dom within the target
     *                         node, and to manage the callback tree
     * @param  {[type]} target the root DOMnode where the structure
     *                         will be attached
     * @return {undefined}
     */
    function render______________ (config, clean) {

        if (!config) {
            throw new Error({message : 'ERROR : Check parameters for render function'});
        }

        // reference to the requested target, or body
        var target = config.target || document.body,
            inner;

        // a literal used to save a reference 
        // to all the elements that need to be 
        // reached afterward calling this.getNode(id)
        // from any callback
        // 
        inner = {
            map : {},
            getNode : function (id) {
                return inner.map[id] || false;
            }
        };


        // rape Wnode prototype funcs
        // to set attributes & styles
        // and attached data
        // 
        Wnode.prototype
            .setAttrs(target, config.attrs)
            .setStyle(target, config.style)
            .setData(target, config.data);
        
        // clean if required
        // 
        if (!!clean) {
            target.innerHTML = '';
        }
        
        // maybe a raw html is requested before treating content
        if (typeof config.html !== 'undefined') {
            target.innerHTML = config.html;
        }
        
        
        // initialize the root node to reflect what will be done
        // by the Node contstructor to every build node: 
        // 
        // - len : the lenght of the content array
        // - cb : exactly the callback
        // 
        target.len = config.content.length;
        target.cb = config.cb || noop;

        // allow to use getNode from root
        // 
        target.getNode = inner.getNode;

        // 
        // start recursion
        // 
        (function recur(cnf, trg){
            
            // change the class if the element is simply a "clearer" String
            // 
            if (cnf.content) {
                var nodes = [],
                    postpro = !!cnf.sameHeight,
                    h = 0,
                    skip = false;

                for (var n, i = 0, l = cnf.content.length; i < l; i++) {

                    if (cnf.content[i] === clearerClassName) {
                        skip = true;
                        cnf.content[i] = {
                            tag : 'br',
                            attrs : {'class' : clearerClassName}
                        };
                    }
                    n = new Wnode(cnf.content[i], trg, inner).add();
                    
                    if (postpro && !skip) {
                        nodes.push(n);
                        h = Math.max(h, JMVC.css.height(n));
                    }
                    
                    recur(cnf.content[i], n);
                }

                if (postpro) {
                    for (var j = 0, l = nodes.length; j < l; j++) {
                        nodes[j].style.height = h + 'px';
                    }
                }
            }
            
        })(config, target);


        /*
        REPLACE WITH THAT FUNCTION IF sameHeight IS NOT USEFUL
        
        (function recur(cnf, trg){
            
            // change the class if the element is simply a "clearer" String
            // 
            if (cnf.content) {

                for (var i = 0, l = cnf.content.length; i < l; i++) {

                    if (cnf.content[i] === 'clearer') {
                        cnf.content[i] = {
                            tag : 'br',
                            attrs : {'class':'clearer'}
                        };
                    }
                    
                    recur(
                        cnf.content[i],
                        new Node(cnf.content[i], trg, inner).add()
                    );
                }
            }
        })(config, target);
        */
    }


        /**
     * PUBLIC function to render Dom from Json
     * @param  {Object} params the configuration json that contains all the 
     *                         information to build the dom :
     *                         target : where to start the tree
     *                         content : what to create
     *                         {cb} : optional end callback
     *                         {style} : optional styles for the target Node
     *                         {attrs} : optionsl attributes to be added at the target Node
     *                         
     * @param  {boolean} clean whether or not the target node must be emptied before
     *                         creating the tree inside it.
     * @return {undefined}
     */
    function render (params, clean) {

        var target = params.target || document.body;

        // maybe cleanup previous
        //
        autoclean && target.WIDGZARD && cleanup(target);

        if (!params) {
            throw new Exception('ERROR : Check parameters for render function');
        }

        // a literal used to save a reference 
        // to all the elements that need to be 
        // reached afterward calling this.getNode(id)
        // from any callback
        // 
        var inner = {
            map : {},
            getNode : function (id) {
                return inner.map[id] || false;
            }
        };

        // rape Node prototype funcs
        // to set attributes & styles
        // 
        Wnode.prototype
            .setAttrs(target, params.attrs)
            .setStyle(target, params.style)
            .setData(target, params.data);

        // maybe clean
        // 
        if (!!clean) target.innerHTML = '';

        // maybe a raw html is requested before treating content
        if (typeof params.html !== 'undefined') {
            target.innerHTML = params.html;
        }
        
        // initialize the root node to respect what is needed
        // by the childs node Promise 
        // 
        // - len : the lenght of the content array
        // - cb : exactly the end callback
        // 
        target.WIDGZARD_len = params.content.length;
        target.WIDGZARD_cb = params.cb || function () {};

        //flag to enable cleaning
        target.WIDGZARD = true;

        // allow to use getNode from root
        // 
        target.getNode = inner.getNode;

        // start recursion
        // 
        /*
        
        REPLACE WITH THAT FUNCTION IF sameHeight IS NOT USEFUL
        
        (function recur(cnf, trg){
            
            // change the class if the element is simply a "clearer" String
            // 
            if (cnf.content) {
                for (var i = 0, l = cnf.content.length; i < l; i++) {
                    if (cnf.content[i] === clearerClassName) {
                        cnf.content[i] = {
                            tag : 'br',
                            attrs : {'class' : clearerClassName}
                        };
                    }
                    recur(cnf.content[i], new Wnode(cnf.content[i], trg, inner).add());
                }
            }
            
        })(params, target);
        */
        (function recur(cnf, trg){
            
            // change the class if the element is simply a "clearer" String
            // 
            if (cnf.content) {
                var nodes = [],
                    postpro = !!cnf.sameHeight,
                    h = 0,
                    skip = false;

                for (var n, i = 0, l = cnf.content.length; i < l; i++) {

                    if (cnf.content[i] === clearerClassName) {
                        skip = true;
                        cnf.content[i] = {
                            tag : 'br',
                            attrs : {'class' : clearerClassName}
                        };
                    }

                    n = new Wnode(cnf.content[i], trg, inner).add();
                    
                    if (postpro && !skip) {
                        nodes.push(n);
                        h = Math.max(h, JMVC.css.height(n));
                    }
                    recur(cnf.content[i], n);
                }

                if (postpro) {
                    for (var j = 0, l = nodes.length; j < l; j++) {
                        nodes[j].style.height = h + 'px';
                    }
                }
            }
            
        })(params, target);
    }



    load = function (src) {
        var s = document.createElement('script');
        document.getElementsByTagName('head')[0].appendChild(s);
        
        // when finished remove the script tag
        s.onload = function () {
            s.parentNode.removeChild(s);
        }
        s.src = src;
    };

    htmlspecialchars = function (c) {
        return '<pre>' +
                c.replace(/&(?![\w\#]+;)/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;') +
            '</pre>';
    };


    // publish module
    return {
        render : render,
        load : load,
        htmlspecialchars : htmlspecialchars
    };

}); 