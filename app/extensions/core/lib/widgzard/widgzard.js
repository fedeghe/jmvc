
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
        //if (conf == 'clearer') {
        //    tag = 'br';
        //}

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
        // node that in his configuration has a 'wid' value
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

    Node.prototype.setAttrs = function (node, attrs) {
        // if set, append all attributes (*class)
        // 
        if (typeof attrs !== 'undefined') { 
            for (var j in attrs) {
                if (j !== 'class') {
                    node.setAttribute(j, attrs[j]);
                } else {
                    node.className = attrs[j];
                }
            }
        }
    };

    Node.prototype.setStyle = function (node, style) {
        // if set, append all styles (*class)
        //
        if (typeof style !== 'undefined') { 
            for (var j in style) {
                node.style[j.replace(/^float$/, 'cssFloat')] = style[j];
            }
        }
    };
    
    /**
     * add method for the Node
     */
    Node.prototype.add = function () {

        var conf = this.node.conf,
            node = this.node,
            j;

        // set attributes
        // 
        this.setAttrs(node, conf.attrs);

        // set styles
        //
        this.setStyle(node, conf.style);

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
        typeof conf.wid !== 'undefined' && (this.map[conf.wid] = node);

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

        return this.node;
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
        // 
        target.innerHTML = '';
        
        // initialize the root node to reflect what will be done
        // by the Node contstructor to every build node: 
        // 
        // - len : the lenght of the content array
        // - cb : exactly the callback
        // 
        target.len = params.content.length;
        target.cb = params.cb;

        // allow to use getNode from root
        // 
        target.getNode = inner.getNode;

        // start recursion
        // 
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
        })(params, target);
    }
    
    return {render:render};
}); 