JMVC.extend('canvas.editor', {
    init : function () {
        JMVC.require(
            'core/css/css',
            'canvas/editor/toolinterface/toolinterface',
            'core/fx/fx'
        );
        JMVC.head.addstyle(JMVC.vars.baseurl + '/app/extensions/canvas/editor/editor.css', true);
    },
    create : function (opt) {
        "use strict";


        var self,
            toolsRootPath = [JMVC.vars.baseurl, ].join(JMVC.US);

        function editor(options) {
            self = this;

            this.panel = null;
            this.node = options.node;
            this.width = options.width;
            this.height = options.height;
            this.style = 'background-color:white; cursor:crosshair; border:0px; margin:0px; padding:0px; line-height:0px;' + (options.style || '');
            this.tools_files = options.tools || [];
            this.tools = {};

            this.layers = [];
            this.activeLayer = null;
            this.activeLayerIndex = null;
        }

        editor.prototype = {
            /**
             * creates the canvas and append it to the 
             * destination node
             * @return {[type]} [description]
             */
            init : function () {

                JMVC.css.style(this.node, {position : 'relative', overflow : 'hidden'});

                //create first layer
                var tmpid = JMVC.util.uniqueid,
                    tmpcnv = JMVC.dom.create('canvas', {
                        id : JMVC.util.uniqueid,
                        width : self.width,
                        height: self.height,
                        style : self.style
                    }),
                    tmpctx = tmpcnv.getContext('2d');

                self.panelTool.size_pos = {
                    width : 300,
                    height : self.height,
                    topClosed : 30 - self.height,
                    rightClosed : 30 - 300
                };

                self.layers.push({
                    id : tmpid,
                    cnv : tmpcnv,
                    ctx : tmpctx
                });
                self.activeLayerIndex = 0;
                self.activeLayer = self.layers[self.activeLayerIndex];

                
                //load tool, interface
                self.loadTools();
                self.panelTool.init(); 
                self.panelTool.render();
                self.panelTool.bind();

                return self;
            },

            render : function (){
                JMVC.dom.append(self.node, self.activeLayer.cnv);
                //styleup
                JMVC.css.style(self.activeLayer.cnv, {margin : '0px', padding: '0px'});
                return self;
            },

            save : function () {
                //var strDataURI = self.cnv.toDataURL("image/png;base64");
                JMVC.dom.add(self.node, 'a', {
                    download : 'filename.png',
                    href : self.activeLayer.cnv.toDataURL("image/png"),
                    style:'display:none'
                }).click();
            },

            clear : function () {
                self.activeLayer.cnv.width = self.activeLayer.cnv.width;
            },

            changeTool : function (tool) {

                // iniject the layer(convas, context, ... )
                // and let che tool decide
                tool.use(self.activeLayer);

                //load the options found on the tool
                self.loadToolsOptions(tool);
            },

            loadToolsOptions : function (tool) {
                
                // empty tools
                JMVC.dom.html(JMVC.dom.find('#toolOptions'), '');

                // get options and  show  all
                if ('options' in tool) {
                    for(var i in tool.options){
                        JMVC.dom.append(JMVC.dom.find('#toolOptions'), JMVC.dom.create('li',{}, i));
                    }
                }
            },

            pickColor : function (x, y) {
                var pixel = self.activeLayer.ctx.getImageData(x, y, 1, 1);
                return {
                    r: pixel.data[0],
                    g: pixel.data[1],
                    b: pixel.data[2],
                    a: pixel.data[3]
                };
            },

            loadTools : function () {
                JMVC.debug('Loading tools');
                for (var i = 0, l = self.tools_files.length; i < l; i += 1) {
                    JMVC.require(self.tools_files[i]);
                }
            },

            layer : {
                add : function () {

                },
                remove : function (index) {
                    if (!(index < self.layers.length)) {
                        throw new Error('Impossible to remove non existent layer indexed ' + index);
                    }
                    [].splice.call(self.layers, index, 1);
                },
                activate : function (index) {
                    
                },
                setOpacity : function () {
                    
                },
                lock : function () {
                    
                },
                unlock : function () {
                    
                }
            },

            panelTool : {
                size_pos : {},
                template : '<div><h3>Tools</h3><ul id="panelTools"></ul><hr/><h4>Options</h4><ul id="toolOptions"></ul></div>',
                init : function () {
                    
                    JMVC.debug('Initializing panel');


                    self.panel = JMVC.dom.create('div', {
                        id : 'panel',
                        style : 'position:absolute;  width:' + self.panelTool.size_pos.width + 'px; height:' + self.panelTool.size_pos.height +
                            'px; top:' + (self.panelTool.size_pos.topClosed) +
                            'px; right:' + (self.panelTool.size_pos.rightClosed) + 'px'
                    }, self.panelTool.template);


                    //JMVC.canvas.editor.tools.neighbour_points.use(self.activeLayer);
                    

                },
                render : function () {
                    JMVC.debug('Rendering panel');

                    JMVC.dom.append(self.node, self.panel);

                    var dst = JMVC.dom.find('#panelTools');

                    for (var i in JMVC.canvas.editor.tools) {
                        var tmp = JMVC.dom.add(dst, 'li',{}, i);

                        (function(el, tool){
                            JMVC.events.bind(el, 'click', function (){
                                JMVC.dom.removeClass(JMVC.dom.find('li', dst), 'active');

                                JMVC.dom.addClass(this, 'active');
                                self.changeTool(tool);

                            });
                        })(tmp, JMVC.canvas.editor.tools[i]);
                    }
                },

                bind : function () {
                    JMVC.debug('Binding panel');
                    
                    self.changeTool(JMVC.canvas.editor.tools.neighbour_points);

                    JMVC.events.bind(self.panel, 'mouseenter', self.panelTool.showPanel);
                    JMVC.events.bind(self.panel, 'mouseleave', self.panelTool.hidePanel);
                },

                showPanel : function () {
                    JMVC.fx.animate(self.panel, 'top', 0, 100);
                    JMVC.fx.animate(self.panel, 'right', 0, 100);
                },

                hidePanel : function () {
                    JMVC.fx.animate(self.panel, 'top', self.panelTool.size_pos.topClosed, 100);
                    JMVC.fx.animate(self.panel, 'right', self.panelTool.size_pos.rightClosed, 100);
                },
            }
            
        };

        return new editor(opt);

    }
});