JMVC.canvas.Editor.getOptionsManager = function () {

    return {

        loadToolOptions : function (tool) {

            // empty tools
            JMVC.dom.html(JMVC.dom.find('#toolOptions'), '');

            // get options and  show  all
            if ('options' in tool) {
                for(var i in tool.options){
                    var node = JMVC.dom.create('li',{}, i);

                    JMVC.dom.append(JMVC.dom.find('#toolOptions'), node);

                    if (i === 'color') { 
                        var cp = JMVC.canvas.Editor.fields.colorpicker.create({node : node, value : tool.options.color.value});
                        cp.render();
                        cp.onChange(function (c){ tool.options.color.value = c; });
                    }
                    if (i == 'radius') {
                        var cp = JMVC.canvas.Editor.fields.integerinput.create({node : node, value:tool.options.radius.value});
                        cp.render();
                        cp.onChange(function (c){ tool.options.radius.value = c; });   
                    }
                    if (i == 'density') {
                        var cp = JMVC.canvas.Editor.fields.integerinput.create({node : node, value:tool.options.density.value});
                        cp.render();
                        cp.onChange(function (c){ tool.options.density.value = c; });   
                    }
                    // ....
                    // 
                    // 
                    // 
                    // 
                    // 
                }
            }
        }
    };
};