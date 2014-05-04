
JMVC.extend('core/widgzard', function () {
    "use strict";

    JMVC.head.addstyle(JMVC.vars.extensions + 'core/lib/widgzard/widgzard.min.css');

    /**
     * Main object constructor represeting any node created
     * @param {[type]} conf the object that has the information about the node
     *                      that will be created
     * @param {[type]} trg  the DomNODE where the element will be appended to
     * @param {[type]} mapcnt an object used to allow the access from any node
     *                        to every node that has the gindID attribute
     */
    function Node(conf, trg, mapcnt) {

        // save a reference to the instance
        // 
        var self = this,

            // the tag used for that node can be specified in the conf
            // otherwise will be a div (except for 'clearer') 
            tag = conf.tag || "div";
        
        // handle special case when one element is simply specified as
        // 'clearer', in that case the tag used will be a br
        // 
        if (conf == 'clearer') {
            tag = 'br';
        }

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
        this.node.conf = conf;

        // save a reference to the node callback if speficied
        // otherwise create a function that do nothing but
        // freeing the parent promise from waiting
        //
        this.node.cb = conf.cb || function () {
            // autoresolve
            self.node.resolve();
        };

        // save a reference to a brand new Promise
        // the Promise.node() will be called as far as
        // all the child elements cb have called 
        // this.done OR this.resolve
        // 
        this.node.promise = new JMVC.Promise();

        // When called Promise.done means that 
        // the parent callback can be called
        // delegating the parent context
        //
        this.node.promise.then(trg.cb, trg);

        // as said at the begibbibg every node keeps a reference
        // to a function that allow to get a reference to any
        // node that in his configuration has a grindID values
        // specified
        //
        this.map = mapcnt.map;
        this.node.getNode = mapcnt.getNode;

        // how many elements are found in the content field?
        // that counter is fundamental for calling this node
        // callback only when every child callback has done
        // 
        this.node.len = conf.content ? conf.content.length : 0;

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
            --self.target.len == 0 && self.node.promise.done();
        };
    }
    
    /**
     * add method for the Node
     */
    Node.prototype.add = function () {

        var conf = this.node.conf,
            node = this.node,
            j;

        // if set, append all attributes (*class)
        // 
        if (typeof conf.attrs !== 'undefined') { 
            for (j in conf.attrs) {
                if (j !== 'class') {
                    node.setAttribute(j, conf.attrs[j]);
                } else {
                    node.className = conf.attrs[j];
                }
            }
        }

        // if set, append all styles (*class)
        //
        if (typeof conf.style !== 'undefined') { 
            for (j in conf.style) {
                node.style[j.replace(/^float$/,'cssFloat')] = conf.style[j];
            }
        }

        // if `html` key is found on node conf 
        // inject its value
        //
        typeof conf.html !== 'undefined' && (node.innerHTML = conf.html);
        
        // save a reference back to json
        //
        //// this.conf.node = this.node;

        // if the node configuration has a `grindID` key
        // (and a String value), the node can be reached 
        // from all others callback invoking
        // this.getNode(keyValue)
        //
        typeof conf.grindID !== 'undefined' && (this.map[conf.grindID] = node);

        // if the user specifies a node the is not the target 
        // passed to the constructor we use it as destination node
        // (node that in the constructor the node.target is always
        // the target passed)
        // 
        (conf.target || this.target).appendChild(node);

        // if the node configuration do not declares content array
        // then the callback is executed.
        // in the callback the user is asked to explicitly declare
        // that the function has finished the work invoking
        // this.done() OR this.resolve()
        // this is the node itself, those functions are attached
        // 
        !conf.content && node.cb.call(node);
    };



    /**
     * Public function to render Dom from Json
     * @param  {Object} params the configuration json that contains all the 
     *                         information to build the dom within the target
     *                         node, and to manage the callback tree
     * @param  {[type]} target the root DOMnode where the structure
     *                         will be attached
     * @return {undefined}
     */
    function render (params, target) {

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

        
        // first literal must have a
        // target specified within
        target.innerHTML = '';
        
        // initialize the root node to reflect what will be done
        // by the Node contstructor to every build node: 
        // 
        // - len : the lenght of the content array
        // - promise : the promise that calls, when honoured, the node callback
        // - cb : exactly th ecallback
        // - resolve : the method that must be called within childs callbacks
        // - node : a reference to the node
        // - node.conf : and to its configuration json sub-section
        // 
        target.len = params.content.length;
        target.promise = new JMVC.Promise();
        target.promise.then(params.cb, target);
        target.cb = params.cb;
        target.resolve = function () {
            target.len--;
            !target.len && target.promise.resolve();
        };
        target.node = target;
        target.node.conf = params;
        

        // start recursion
        // 
        (function recur(cnf, trg){
            
            // change the class if the element is simply a "clearer" String
            // 
            if (cnf === 'clearer') {
                
                trg.className = 'clearer';

            // otherwise maybe it`s not a leaf node
            //
            } else if (cnf.content) {

                // recur on every content node, after adding it
                // in the right place
                //
                for (var i = 0, l = cnf.content.length; i < l; i++) {

                    var n = new Node(cnf.content[i], trg, inner);
                    n.add();
                    recur(cnf.content[i], n.node);
                }
            }
            
        })(params, target);
    }
    
    return {render:render};
}); 