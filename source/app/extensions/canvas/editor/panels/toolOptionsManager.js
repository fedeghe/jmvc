JMVC.canvas.Editor.getToolOptionsManager = function (instance) {
    var panel = new JMVC.canvas.Editor.Panel(),
        options = {};

    return {
        init: function () {
            panel.html('options');
        },
        panel: panel,
        loadToolOptions: function (optionsNode, tool, layerManager) {
            var i, j,
                node,
                layer = layerManager.getCurrent(),
                optionsList = JMVC.dom.create('ul'),
                name, type;

            // unbindall
            for (j in options) {
                if ('unbind' in options[j]) {
                    options[j].unbind();
                }
            }
            options = {};

            // empty tools
            JMVC.dom.html(optionsNode, '');
            JMVC.dom.append(optionsNode, optionsList);

            console.dir(tool);

            // get options and  show  all
            if ('options' in tool) {
                for (i in tool.options) {
                    node = JMVC.dom.create('li', {});

                    JMVC.dom.add(node, 'span', {}, i);

                    JMVC.dom.append(optionsList, node);

                    name = tool.options[i].name;
                    type = tool.options[i].type;

                    if (type === 'color') {
                        options[name] = JMVC.canvas.Editor.fields.colorpicker.create({
                            ctx: layer.ctx,
                            node: node,
                            hueZero: tool.options[i].hueZero,
                            alpZero: tool.options[i].alpZero,
                            lumZero: tool.options[i].lumZero,
                            satZero: tool.options[i].satZero
                        });
                        options[name].render();
                        options[name].onChange(function (c) {
                            tool.options[i].value = c;
                        });
                    }
                    /**
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
                        }
                    */
                    if (type === 'int') {
                        options[name] = JMVC.canvas.Editor.fields.integerinput.create({
                            ctx: layer.ctx,
                            node: node,
                            value: tool.options[i].value,
                            min: tool.options[i].min,
                            max: tool.options[i].max,
                            step: tool.options[i].step
                        });
                        options[name].render();
                        options[name].onChange(function (c) {
                            tool.options[i].value = c;
                            console.debug(tool);
                        });
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
