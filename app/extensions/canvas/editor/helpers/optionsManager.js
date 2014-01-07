JMVC.canvas.Editor.getOptionsManager = function () {

    var options = {};

    return {

        loadToolOptions : function (tool, layerManager) {

            var i, j,
                node,
                layer = layerManager.getCurrent();

            //unbindall
            for (j in options) {
                if ('unbind' in options[j]) {
                    options[j].unbind();
                }
            }
            options = {};

            // empty tools
            JMVC.dom.html(JMVC.dom.find('#toolOptions'), '');

            // get options and  show  all
            if ('options' in tool) {
                for (i in tool.options){
                    node = JMVC.dom.create('li', {}, i);

                    JMVC.dom.append(JMVC.dom.find('#toolOptions'), node);

                    if (i === 'color') { 
                        options[i] = JMVC.canvas.Editor.fields.colorpicker.create({
                            ctx : layer.ctx,
                            node : node,
                            hueZero : tool.options.color.hueZero,
                            alpZero : tool.options.color.alpZero,
                            lumZero : tool.options.color.lumZero,
                            satZero : tool.options.color.satZero
                        });
                        options[i].render();
                        options[i].onChange(function (c){
                            tool.options.color.value = c;
                        });
                    }
                    if (i == 'radius') {
                        options[i] = JMVC.canvas.Editor.fields.integerinput.create({
                            ctx : layer.ctx,
                            node : node,
                            value:tool.options.radius.value,
                            min : tool.options.radius.min,
                            max : tool.options.radius.max,
                            step : tool.options.radius.step 
                        });
                        options[i].render();
                        options[i].onChange(function (c){ tool.options.radius.value = c; });   
                    }
                    if (i == 'density') {
                        options[i] = JMVC.canvas.Editor.fields.integerinput.create({
                            ctx : layer.ctx,
                            node : node,
                            value:tool.options.density.value,
                            min : tool.options.density.min,
                            max : tool.options.density.max,
                            step : tool.options.density.step 
                        });
                        options[i].render();
                        options[i].onChange(function (c){ tool.options.density.value = c; });   
                    }
                    if (i == 'distance') {
                        options[i] = JMVC.canvas.Editor.fields.integerinput.create({
                            ctx : layer.ctx,
                            node : node,
                            value : tool.options.distance.value,
                            min : tool.options.distance.min,
                            max : tool.options.distance.max,
                            step : tool.options.distance.step 
                        });
                        options[i].render();
                        options[i].onChange(function (c){ tool.options.distance.value = c; });   
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