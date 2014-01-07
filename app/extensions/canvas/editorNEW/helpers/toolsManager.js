JMVC.canvas.Editor.getToolsManager = function (instance, tools) {

    var self = instance,
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

        init : function () {
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
            tool.use(self.layerManager.getCurrent());

            // load the options
            // found on the tool
            //optionsManager.loadToolOptions(tool);
            currentTool = tool;
        },

        save : function () {
            var name = prompt('Name for file?');
            
            if (name) {
                JMVC.dom.add(self.node, 'a', {
                    download : name + '.png',
                    href : self.layerManager.getCurrent().cnv.toDataURL("image/png"),
                    style : 'display:none'
                }).click();
            }
        },

        clear : function () {
            var c = self.layerManager.getCurrent().cnv;
            c.width = c.width;
        },

        pickColor : function (x, y) {
            var pixel = self.layerManager.getCurrent().ctx.getImageData(x, y, 1, 1);
            return {
                r: pixel.data[0],
                g: pixel.data[1],
                b: pixel.data[2],
                a: pixel.data[3]
            };
        }
    };  
    
};
