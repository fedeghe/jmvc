/**
 * [description]
 * @return {[type]} [description]
 */
JMVC.extend('grind', function () {

    "use strict";
    
    JMVC.head.addstyle(JMVC.vars.extensions + 'core/lib/grind/grind.min.css');

    function render(config, callback, pro) {
        
        var mainTarget = config.target,
            gotContent = 'content' in config,
            promises = pro || [],
            resolve = function () {
                promises.length && promises.shift();
                if (promises.length == 0) {
                    if (typeof callback === 'function') {

                        // prevent inner Grind to call again their root when is a leaf of a 
                        // parent Grind
                        if (!mainTarget._called) {
                            callback.call();
                            mainTarget._called = true;
                        }
                    }
                }
            };

        if (gotContent) {
            config.content.map = {};
            config.content.getNode = function (id) {
                return id in config.content.map ? config.content.map[id] : false;
            }
        }

        (JMVC.dom.isNode(mainTarget) ?
            mainTarget
            :
            JMVC.dom.find(mainTarget)).innerHTML = '';

        for (var i = 0, l = config.content.length; i < l; i++) {

            (function recur(item, parent) {

                var tag,
                    j = 0;

                if (!parent) {
                    parent = (JMVC.dom.isNode(mainTarget) ?
                        mainTarget
                        :
                        JMVC.dom.find(item.target || mainTarget)
                    ) || document.body;                
                }

                if (item == 'clearer') {

                    tag = document.createElement("br");
                    tag.className = 'clearer';
                    parent.appendChild(tag);
                    
                } else {
                    
                    tag = document.createElement(item.tag || "div");
                    
                    if (typeof item.attrs !== 'undefined') { 
                        for (j in item.attrs) {
                            if (j !== 'class') {
                                tag.setAttribute(j, item.attrs[j]);
                            } else {
                                tag.className = item.attrs[j];
                            }
                        }
                    }
                    if (typeof item.style !== 'undefined') { 
                        for (j in item.style) {
                            tag.style[j.replace(/^float$/,'cssFloat')] = item.style[j];
                        }
                    }

                    if (typeof item.html !== 'undefined') { 
                        tag.innerHTML = item.html;
                    }
                    
                    parent.appendChild(tag);

                    //save a reference back to json
                    //
                    item.node = tag;

                    if (typeof item.cb === "function") {
                        tag.promise = new JMVC.Promise();
                        tag.promise.then(resolve);
                        promises.push(tag.promise);
                        item.cb.call(tag);
                    }

                    if (item.content) {
                        for (var k = 0, h = item.content.length; k < h; k++) {
                            recur(item.content[k], tag);
                        }
                    }

                    if ('grindID' in item) {
                       config.content.map[item.grindID] = tag;
                    }
                }
            })(config.content[i]);
        }   
        !promises.length && resolve();
        
    }


    return {
        render: function(conf, cb, bodyClass) {
            bodyClass && JMVC.dom.addClass(document.body, bodyClass);
            render(conf, cb);
        },
        colorize : function () {
            JMVC.head.addstyle(JMVC.vars.extensions + 'core/lib/grind/color.css');  
        }
    };

});
