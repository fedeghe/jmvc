    
// read this : http://stackoverflow.com/questions/1915341/whats-wrong-with-adding-properties-to-dom-element-objects


/**
 * Widgzard module
 * 
 * Create an arbitrary dom tree json based allowing for each node to 
 * specify a callback that will be called only when either
 *   > the node is appended (in case the node is a leaf)
 * ||
 *   > every child has finished (explicitly calling the done function on his context)
 *
 * @author Federico Ghedina <fedeghe@gmail.com>
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
        autoclean = true,
        debug = true,
        Wproto = Wnode.prototype,
        Promise = JMVC.Promise,
        htmlspecialchars = JMVC.htmlChars,
        delegate = JMVC.delegate,
        eulerWalk = JMVC.dom.walk,
        noop = function () {};

    /**
     * Main object constructor represeting any node created
     * @param {[type]} conf the object that has the information about the node
     *                      that will be created
     * @param {[type]} trg  the DomNODE where the element will be appended to
     * @param {[type]} mapcnt an object used to allow the access from any node
     *                        to every node that has the gindID attribute
     */
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


        //this.target.childrens = [];


        // save a reference to the node configuration
        // will be useful on append to append to conf.target
        // if specified
        //
        this.conf = conf;

        // save a reference to the node callback if speficied
        // otherwise create a function that do nothing but
        // freeing the parent promise from waiting
        //
        this.WIDGZARD_cb = conf.cb || function () {
            debug && console.log('autoresolving  ', self.node);
            // autoresolve
            self.resolve();
        };

        
        // a reference the the root
        //
        this.root = mapcnt.root;

        // save a reference to the parent
        // 
        this.parent = trg;

        // save a reference to a brand new Promise
        // the Promise.node() will be called as far as
        // all the child elements cb have called 
        // this.done OR this.resolve
        // 
        this.WIDGZARD_promise = Promise.create();

        // When called Promise.done means that 
        // the parent callback can be called
        // delegating the parent context
        //
        this.WIDGZARD_promise.then(self.WIDGZARD_cb, self);

        // as said at the beginning every node keeps a reference
        // to a function that allow to get a reference to any
        // node that in his configuration has a `nodeIdentifier` value
        // specified
        //
        this.map = mapcnt.map;



        //function to abort all
        this.abort = mapcnt.abort;

        // publish in the node the getNode fucntion that allows for
        // getting any node produced from the same json having a 
        // `nodeIdentifier` with a valid value
        this.getNode = mapcnt.getNode;


        // get all nodes mapped
        this.getNodes = mapcnt.getNodes;

        // how many elements are found in the content field?
        // that counter is fundamental for calling this node
        // callback only when every child callback has done
        // 
        this.WIDGZARD_len = conf.content ? conf.content.length : 0;

        // through these two alias from within a callback
        // (where the DOMnode is passed as context)
        // the have to declare that has finished
        // if the count is nulled it means that the promise 
        // is done, thus it`s safe to call its callback
        //
        this.done = this.resolve = this.solve = function () {
          
            // if all the child has called done/resolve
            // it`s time to honour the node promise,
            // thus call the node callback
            //
            if (--self.target.WIDGZARD_len == 0) {
                if (self.target.WIDGZARD_promise) {
                    self.target.WIDGZARD_promise.done();
                } else {
                    self.target.WIDGZARD_cb();   
                }
            }

        };

        this.lateWid = mapcnt.lateWid;
    }


    /**
     * save a function to climb up n-parent
     * @param  {[type]} n [description]
     * @return {[type]}   [description]
     */
    Wproto.climb = function (n) {
        n = n || 1;
        var ret = this;
        while (n--) {
            ret = ret.parent;
        }
        return ret;
    };


    /**
     * and one to go down
     * @return {[type]} [description]
     */
    Wproto.descendant = function () {
        var self = this,
            args = Array.prototype.slice.call(arguments, 0),
            i = 0,
            res = self,
            l = args.length;
        if (!l) return res;
        while (i < l) {
            res = res.childrens[~~args[i++]];
        }
        return res;
    };

    /**
     * Set neo attributes
     * @param {DOMnode} node  the node
     * @param {Object} attrs  the hash of attributes->values
     */
    Wproto.setAttrs = function (node, attrs) {
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
    Wproto.setStyle = function (node, style) {
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
    Wproto.setData = function (el, data) {
        el.data = data || {};
        return this;
    };

    /**
     * [checkInit description]
     * @param  {[type]} el [description]
     * @return {[type]}    [description]
     */
    Wproto.checkInit = function (el, conf) {
        if ('init' in conf && typeof conf.init === 'function') {
            conf.init.call(el);
        }
        return this;
    }

    /**
     * [checkInit description]
     * @param  {[type]} el [description]
     * @return {[type]}    [description]
     */
    Wproto.checkEnd = function (el, conf) {
        if ('end' in conf && typeof conf.end === 'function') {
            this.root.endFunctions.push(function () {conf.end.call(el);});
        }
        return this;
    }
    
    /**
     * add method for the Wnode
     */
    Wproto.add = function () {

        var conf = this.conf,
            node = this.node;

        // set attributes and styles
        // 
        this.setAttrs(node, conf.attrs)
            .setStyle(node, conf.style)
            .setData(this, conf.data)
            .checkInit(this, conf)
            .checkEnd(this, conf);

        // if `html` key is found on node conf 
        // inject its value
        //
        typeof conf.html !== 'undefined' && (node.innerHTML = conf.html);

        // if the node configuration has a `nodeIdentifier` key
        // (and a String value), the node can be reached 
        // from all others callback invoking
        // this.getNode(keyValue)
        //
        
        if (typeof conf[nodeIdentifier] !== 'undefined') {
            this.map[conf[nodeIdentifier]] = this;
        }
        

        // if the user specifies a node the is not the target 
        // passed to the constructor we use it as destination node
        // (node that in the constructor the node.target is always
        // the target passed)
        // 
        (conf.target || this.target.node).appendChild(node);

        if (!('childrens' in (conf.target || this.target))) {
            (conf.target || this.target).childrens = [];
        }
        (conf.target || this.target).childrens.push(this);
        this.WIDGZARD = true;

        // if the node configuration do not declares content array
        // then the callback is executed.
        // in the callback the user is asked to explicitly declare
        // that the function has finished the work invoking
        // this.done() OR this.resolve()
        // this is the node itself, those functions are attached
        // 
        (!conf.content || conf.content.length == 0) && this.WIDGZARD_cb.call(this);

        // chain
        return this;
    };


    function cleanupWnode(trg) {
        var node = trg.node,
            removeNode = function (t) {
                t.parentNode.removeChild(t);
                return true;
            },
            nodesToBeCleaned = [],
            keys = [
                'WIDGZARD', 'WIDGZARD_cb', 'WIDGZARD_promise', 'WIDGZARD_length',
                'parent', 'getNode', 'climb', 'root', 'done', 'resolve', 'data'
            ],
            kL = keys.length,
            i = 0, j = 0, k = 0,
            n = null;
        
        // pick up postorder tree traversal
        eulerWalk(node, function (n) {
            //skip root & text nodes
            n !== node && n.nodeType != 3 && nodesToBeCleaned.push(n) && k++;
        }, 'post');
        
        while (j < k) {
            n = nodesToBeCleaned[j++];
            while (i < kL) n[keys[i++]] = null;
            removeNode(n);
        }

        nodesToBeCleaned = null, keys = null;

        return true;
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

        var target = {
                node : params.target || document.body,
                endFunctions : []
            },
            targetFragment = {
                node : document.createDocumentFragment('div')
            },
            active = true;

        // debug ? 
        debug = !!params.debug;

        // maybe cleanup previous
        //
        autoclean && target.WIDGZARD && cleanupWnode(target)

        if (!params) {
            throw new Exception('ERROR : Check parameters for render function');
        }

        // a literal used to save a reference 
        // to all the elements that need to be 
        // reached afterward calling this.getNode(id)
        // from any callback
        // 
        var mapcnt = {
            root : target,
            map : {},
            getNode : function (id) {
                return mapcnt.map[id] || false;
            },
            getNodes : function () {
                return mapcnt.map;
            },
            abort : function () {
                active = false;
                return false;
            },
            lateWid : function (wid) {
                mapcnt.map[wid] = this;
            }
        };

        // rape Node prototype funcs
        // to set attributes & styles
        // and check init function 
        // 
        Wproto
            .setAttrs(target.node, params.attrs)
            .setStyle(target.node, params.style)
            .setData(target, params.data)
            .setData(targetFragment, params.data);


        target.descendant = Wproto.descendant;
        targetFragment.descendant = Wproto.descendant;
        // maybe clean
        // 
        if (!!clean) target.node.innerHTML = '';

        // maybe a raw html is requested before treating content
        // 
        if (typeof params.html !== 'undefined') {
            target.node.innerHTML = params.html;
        }
        
        // initialize the root node to respect what is needed
        // by the childs node Promise 
        // 
        // - len : the lenght of the content array
        // - cb : exactly the end callback
        // 
        target.WIDGZARD_len = params.content ? params.content.length : 0;
        targetFragment.WIDGZARD_len = params.content ? params.content.length : 0;

        targetFragment.WIDGZARD_cb = target.WIDGZARD_cb = function () {
            active 
            &&
            target.node.appendChild(targetFragment.node)
            &&
            params.cb && params.cb.call(target);

            //ending functions
            //
            if (target.endFunctions.length) {
                for (var i = 0, l = target.endFunctions.length; i < l; i++) {
                    target.endFunctions[i]();
                }
            }
        };

        // flag to enable cleaning
        //
        target.WIDGZARD = true;

        // allow to use getNode & getNodes from root
        // 
        target.getNode = targetFragment.getNode = mapcnt.getNode;
        target.getNodes = targetFragment.getNodes = mapcnt.getNodes;
        target.abort = targetFragment.abort = function () {
            target.node.innerHTML = '';
        };


        // what about a init root function?
        // 
        Wproto.checkInit(targetFragment, params);

        // start recursion
        //
        (function recur(cnf, trg){
            if (!active) {
                return false;
            }
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
        
                    recur(cnf.content[i], new Wnode(cnf.content[i], trg, mapcnt).add());
                }
            }
            
        })(params, targetFragment);
    }

    // MY WONDERFUL Promise Implementation
    // 
    Promise = (function() {
        var _Promise = function() {
                this.cbacks = [];
                this.solved = false;
                this.result = null;
            },
            proto = _Promise.prototype;
        /**
         * [then description]
         * @param  {[type]} func [description]
         * @param  {[type]} ctx  [description]
         * @return {[type]}      [description]
         */
        proto.then = function(func, ctx) {
            var self = this,
                f = function() {
                    self.solved = false;
                    func.apply(ctx || self, [ctx || self, self.result]);
                };
            if (this.solved) {
                f();
            } else {
                this.cbacks.push(f);
            }
            return this;
        };

        /**
         * [done description]
         * @return {Function} [description]
         */
        proto.done = function() {
            var r = [].slice.call(arguments, 0);
            this.result = r;
            this.solved = true;
            if (!this.cbacks.length) {
                return this.result;
            }
            this.cbacks.shift()(r);
        };

        /**
         * [chain description]
         * @param  {[type]} funcs [description]
         * @param  {[type]} args  [description]
         * @return {[type]}       [description]
         */
        function chain(funcs, args) {

            var p = new _Promise();
            var first = (function() {

                    funcs[0].apply(p, [p].concat([args]));
                    return p;
                })(),
                tmp = [first];

            for (var i = 1, l = funcs.length; i < l; i++) {
                tmp.push(tmp[i - 1].then(funcs[i]));
            }
            return p;
        }

        /**
         * [join description]
         * @param  {[type]} pros [description]
         * @param  {[type]} args [description]
         * @return {[type]}      [description]
         */
        function join(pros, args) {
            var endP = new _Promise(),
                res = [],
                stack = [],
                i = 0,
                l = pros.length,
                limit = l,
                solved = function (remainder) {
                    !remainder && endP.done.apply(endP, res);
                };

            for (null; i < l; i++) {
                (function (k) {
                    stack[k] = new _Promise();

                    // inside every join function the context is a Promise, and
                    // is possible to return it or not 
                    var _p = pros[k].apply(stack[k], [stack[k], args]);
                    (_p instanceof _Promise ? _p : stack[k])
                    .then(function (p, r) {
                        res[k] = r;
                        solved(--limit);
                    });
                })(i);
            }
            return endP;
        }

        /* returning module
        */
        return {
            create: function() {
                return new _Promise();
            },
            chain: chain,
            join: join
        };
    })();

    /**
     * [get description]
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    function get (params) {
        var r = document.createElement('div');
        params.target = r;
        render(params);
        return r;
    }


    function cleanup(trg){
        render({target : trg, content : [{html : "no content"}]}, true);
    }
    
    // Widgzard.load('js/_index.js');
    function load (src) {
        var s = document.createElement('script');
        document.getElementsByTagName('head')[0].appendChild(s);
        s.src = src;
        
        // when finished remove the script tag
        s.onload = function () {
            s.parentNode.removeChild(s);
        }
    };

    /**
     * [eulerWalk description]
     * @param  {[type]} root [description]
     * @param  {[type]} func [description]
     * @param  {[type]} mode [description]
     * @return {[type]}      [description]
     */
    eulerWalk = function (root, func, mode) {
        mode = {pre : 'pre', post : 'post'}[mode] || 'post';
        var nope = function () {},
            pre = mode === 'pre' ? func : nope,
            post = mode === 'post' ? func : nope,
            walk = (function () {
                return function (n_, _n) {
                    pre(n_);
                    _n = n_.firstChild;
                    while (_n) {
                        walk(_n);
                        _n = _n.nextSibling;
                    }
                    post(n_);
                };
            })();
        walk(root);
    };

    /**
     * Dummy delegation function 
     * @param  {[type]} func [description]
     * @param  {[type]} ctx  [description]
     * @return {[type]}      [description]
     */
    delegate = function (func, ctx) {
    
        // get relevant arguments
        // 
        var args = Array.prototype.slice.call(arguments, 2);
        
        // return the function
        //
        return function() {
            return func.apply(
                ctx || window,
                [].concat(args, Array.prototype.slice.call(arguments))
            );
        };
    };

    /**
     * [htmlspecialchars description]
     * @param  {[type]} c [description]
     * @return {[type]}   [description]
     */
    htmlspecialchars = function (c) {
        return '<pre>' +
            c.replace(/&(?![\w\#]+;)/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;'); +
        '</pre>';
    };

    // publish module
    return {
        render : render,
        cleanup : cleanup,
        get : get,
        load : load,
        htmlspecialchars : htmlspecialchars,
        Promise : Promise
    };

});