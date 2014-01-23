JMVC.canvas.Editor.getToolManager = function (instance, tools) {

    var self = instance,
        panel = new JMVC.canvas.Editor.Panel(),
        currentTool,
        toolObjs,
        toolnodes,
        tools_files = tools,
        toolOptionsManager = JMVC.canvas.Editor.getToolOptionsManager(),
        getCurrentLayer = function () {
            return self.panelManager.getLayerManager().getCurrent();
        };

    function loadTools() {
        JMVC.debug('Loading tools');
        for (var i = 0, l = tools_files.length; i < l; i += 1) {
            JMVC.require(tools_files[i]);
        }
    }

    return {
        panel : panel,

        optionsNode : null,

        init : function () {
            panel.html('tools');
            JMVC.css.style(panel.node, {'width': '365px'});
            loadTools();
            return this;
        },

        render : function () {
            
            var that = this,
                dst = panel.getInnerNode(),
                list = JMVC.dom.create('ul', {'class' : 'tools'}),
                i, tmp;

            this.optionsNode = JMVC.dom.create('div', {'id' : 'toolOptions'});

            toolObjs = JMVC.canvas.editortools;

            for (i in toolObjs) {

                tmp = JMVC.dom.add(list, 'li',{title : i}, '');

                JMVC.widget.Tooltip(
                    tmp,
                    false,
                    {},
                    {follow : true}
                );

                (function (el, tool) {
                    JMVC.events.bind(el, 'click', function () {
                        JMVC.dom.removeClass(JMVC.dom.find('li', dst), 'active');
                        JMVC.dom.addClass(this, 'active');
                        that.changeTool(tool);
                    });
                })(tmp, toolObjs[i]);
            }
            JMVC.dom.append(dst, [list, JMVC.dom.clearer(), that.optionsNode]);
           
            return this;
        },

        bind : function () {
            this.changeTool(JMVC.canvas.editortools.neighbour_points);
            return this;
        },
        
        changeTool : function (tool) {
            var layer = getCurrentLayer();
            JMVC.css.style(layer.cnv, 'cursor', 'crosshair');
            // iniject the layer (canvas, context, ... )
            // and let che tool decide
            tool.use(layer);

            // load the options
            // found on the tool
            toolOptionsManager.loadToolOptions(
                this.optionsNode,
                tool,
                self.panelManager.getLayerManager()
            );
            currentTool = tool;
        },

        getCurrentTool : function () {
            return currentTool;
        },

        noTool : function () {
            var el = getCurrentLayer().cnv;
            el.onmousedown = el.onmousemove = el.onmouseup = null;
        },

        clear : function () {
            var lm = self.panelManager.getLayerManager(),
                l = lm.getCurrent();
            lm.clean(l);
            JMVC.Channel('canvaseditor').pub('EDITOR_CLEANED');
        },

        pickColor : function (x, y) {
            var pixel = getCurrentLayer().ctx.getImageData(x, y, 1, 1);
            return {
                r: pixel.data[0],
                g: pixel.data[1],
                b: pixel.data[2],
                a: pixel.data[3]
            };
        }
    };  
    
};
