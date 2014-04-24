JMVC.extend('grind', function () {
    "use strict";
    JMVC.head.addstyle(JMVC.vars.extensions + 'core/lib/grind/grind.min.css');

    function render(config, callback) {
        
        var mainTarget = config.target,
            gotContent = 'content' in config;

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
                    /*
                    // now in style
                     
                    if (typeof item['float'] !== 'undefined') { 
                        tag.style.cssFloat = item['float'];
                    }*/

                    if (typeof item.html !== 'undefined') { 
                        tag.innerHTML = item.html;
                    }
                    
                    parent.appendChild(tag);

                    //save a reference back to json
                    //
                    item.node = tag;

                    typeof item.cb === "function" && item.cb.call(tag);

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
        typeof callback === 'function' && callback.call();
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
