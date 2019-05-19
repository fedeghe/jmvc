JMVC.canvas.Editor.getToolOptionsManager = function (instance) {

    var self = instance,
        panel = new JMVC.canvas.Editor.Panel(),
        options = {};

    return {
        init : function () {
            panel.html('options');
        },
        panel : panel,
        loadToolOptions : function (optionsNode, tool, layerManager) {

            var i, j,
                node,
                layer = layerManager.getCurrent(),
                optionsList = JMVC.dom.create('ul');

            //unbindall
            for (j in options) {
                if ('unbind' in options[j]) {
                    options[j].unbind();
                }
            }
            options = {};

            // empty tools
            JMVC.dom.html(optionsNode, '');
            JMVC.dom.append(optionsNode, optionsList);

            // get options and  show  all
            if ('options' in tool) {

                for (i in tool.options) {
                    node = JMVC.dom.create('li', {});   
                    JMVC.dom.add(node, 'span', {}, i);
                    JMVC.dom.append(optionsList, node);

                    var type = tool.options[i].type
                    if (type === 'color') {
                        (function (j, lay){
                            var name = tool.options[j].name;
                            options[name] = JMVC.canvas.Editor.fields.colorpicker.create({
                                ctx : lay.ctx,
                                node : node,
                                hueZero : tool.options[j].hueZero,
                                alpZero : tool.options[j].alpZero,
                                lumZero : tool.options[j].lumZero,
                                satZero : tool.options[j].satZero
                            });
                            options[name].render();

                            options[name].onChange(function (c){
                                tool.options[j].value = c;
                            });
                        })(i, layer);

                    }/*
                    if (type == 'radius') {
                        options[name] = JMVC.canvas.Editor.fields.integerinput.create({
                            ctx : layer.ctx,
                            node : node,
                            value : tool.options[i].value,
                            min : tool.options[i].min,
                            max : tool.options[i].max,
                            step : tool.options[i].step 
                        });
                        options[name].render();
                        options[name].onChange(function (c){ tool.options[i].value = c; });   
                    }
                    if (type == 'density') {
                        options[name] = JMVC.canvas.Editor.fields.integerinput.create({
                            ctx : layer.ctx,
                            node : node,
                            value : tool.options[i].value,
                            min : tool.options[i].min,
                            max : tool.options[i].max,
                            step : tool.options[i].step 
                        });
                        options[name].render();
                        options[name].onChange(function (c){ tool.options[i].value = c; });   
                    }*/
                    if (type === 'int') {
                        (function (j, lay){
                            var name = tool.options[j].name;
                            options[name] = JMVC.canvas.Editor.fields.integerinput.create({
                                ctx : lay.ctx,
                                node : node,
                                value : tool.options[j].value,
                                min : tool.options[j].min,
                                max : tool.options[j].max,
                                step : tool.options[j].step 
                            });
                            options[name].render();
                            options[name].onChange(function (c){
                                tool.options[j].value = c;
                            }); 
                        })(i, layer); 
                    }
                }
            }
        }
    };
};
