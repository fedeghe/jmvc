JMVC.canvas.Editor.getToolManager = function (instance, tools) {

    var self = instance,
        panel = new JMVC.canvas.Editor.Panel(),
        currentTool,
        toolObjs,
        toolnodes,
        tools_files = tools,
        optionsManager = JMVC.canvas.Editor.getOptionsManager();

    function loadTools() {
        JMVC.debug('Loading tools');
        for (var i = 0, l = tools_files.length; i < l; i += 1) {
            JMVC.require(tools_files[i]);
        }
    }

    return {
        panel : panel,

        init : function () {
            panel.html('tools');
            loadTools();
            return this;
        },

        render : function (dst) {
            
            this.changeTool(JMVC.canvas.editortools.neighbour_points);
/*
            var i, tmp,
                that = this;

            toolObjs = JMVC.canvas.editortools;

            for (i in toolObjs) {
                tmp = JMVC.dom.add(dst, 'li',{}, i);
                (function(el, tool){
                    JMVC.events.bind(el, 'click', function (){
                        JMVC.dom.removeClass(JMVC.dom.find('li', dst), 'active');

                        JMVC.dom.addClass(this, 'active');
                        that.changeTool(tool);

                    });
                })(tmp, toolObjs[i]);
            }
            dst.appendChild(JMVC.dom.clearer());
  */          
            return this;
        },

        bind : function () {
            return this;
        },
        
        changeTool : function (tool) {
            // iniject the layer (canvas, context, ... )
            // and let che tool decide
            tool.use(self.panelManager.getLayerManager().getCurrent());

            // load the options
            // found on the tool
            //optionsManager.loadToolOptions(JMVC.dom.find('#toolOptions'), tool, self.panelManager.layerManager);
            currentTool = tool;
        },

        save : function () {
            var name = prompt('Name for file?');
            
            if (name) {
                JMVC.dom.add(self.node, 'a', {
                    download : name + '.png',
                    href : self.panelManager.getLayerManager().getCurrent().cnv.toDataURL("image/png"),
                    style : 'display:none'
                }).click();
            }
        },

        clear : function () {
            var lm = self.panelManager.getLayerManager(); 
            var l = lm.getCurrent();
            lm.clean(l);
            JMVC.Channel('canvaseditor').pub('EDITOR_CLEANED');
        },

        pickColor : function (x, y) {
            var pixel = self.getLayerManager().getCurrent().ctx.getImageData(x, y, 1, 1);
            return {
                r: pixel.data[0],
                g: pixel.data[1],
                b: pixel.data[2],
                a: pixel.data[3]
            };
        }
    };  
    
};
