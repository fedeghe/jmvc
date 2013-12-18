JMVC.nsMake('JMVC.canvas');

JMVC.require(
    'core/css/css',
    'core/fx/fx',
    'core/color/color'
);

// create ns for options fields
JMVC.nsMake('JMVC.canvas.Editor.fields');

// load editor helpers
JMVC.require('canvas/editor/helpers/');

// style
JMVC.head.addstyle(JMVC.vars.baseurl + '/app/extensions/canvas/editor/editor.css', true);


var self,
    toolsRootPath = [JMVC.vars.baseurl, ].join(JMVC.US),
    fieldsNs = JMVC.nsCheck('JMVC.canvas.Editor.fields'),
    proto;

JMVC.canvas.Editor = function (options) {
    self = this;
    this.panel = null;
    this.node = options.node;
    this.width = options.width;
    this.height = options.height;
    this.style = JMVC.object.toStr({
        '-webkit-user-select':'none',
        '-moz-user-select': 'none',
        'user-select': 'none',
        'background-color':'white',
        'cursor':'crosshair',
        'border':'0px',
        'margin':'0px',
        'padding':'0px',
        'line-height':'0px'}) + (options.style || '');
    this.tools_files = options.tools || [];
    this.tools = {};
    this.currentTool = null;

    this.layerManager = JMVC.canvas.editor.layerManager(this);
    this.panelManager = JMVC.canvas.editor.panelManager(this);
};

proto = JMVC.canvas.Editor.prototype;

/**
 * creates the canvas and append it to the 
 * destination node
 * @return {[type]} [description]
 */
proto.init = function () {

    JMVC.css.style(this.node, {position : 'relative', overflow : 'hidden'});

    self.layerManager.add();
    self.layerManager.activate();
    
    //load tool, interface
    self.loadTools();
    this.panelManager.init().render().bind();

    return self;
};

proto.render = function (){
    JMVC.dom.append(self.node, self.layerManager.getCurrent().cnv);
    //styleup
    JMVC.css.style(self.layerManager.getCurrent().cnv, {margin : '0px', padding: '0px'});
    return self;
};

proto.save = function () {
    JMVC.dom.add(self.node, 'a', {
        download : 'filename.png',
        href : self.activeLayer.cnv.toDataURL("image/png"),
        style:'display:none'
    }).click();
};

proto.clear = function () {
    self.activeLayer.cnv.width = self.activeLayer.cnv.width;
};

proto.changeTool = function (tool) {
    // iniject the layer(convas, context, ... )
    // and let che tool decide
    tool.use(self.layerManager.getCurrent());

    //load the options found on the tool
    self.loadToolsOptions(tool);
    self.currentTool = tool;
};

proto.loadToolsOptions = function (tool) {
    // empty tools
    JMVC.dom.html(JMVC.dom.find('#toolOptions'), '');

    // get options and  show  all
    if ('options' in tool) {
        for(var i in tool.options){
            var node = JMVC.dom.create('li',{}, i);
            JMVC.dom.append(JMVC.dom.find('#toolOptions'), node);
            if (i === 'color') { 
                var cp = JMVC.canvas.editor.fields.colorpicker.create({node:node});
                cp.render();
                cp.onChange(function (c){ self.currentTool.options.color.value = c; });
            }
        }
    }
};

proto.pickColor = function (x, y) {
    var pixel = self.activeLayer.ctx.getImageData(x, y, 1, 1);
    return {
        r: pixel.data[0],
        g: pixel.data[1],
        b: pixel.data[2],
        a: pixel.data[3]
    };
};

proto.loadTools = function () {
    JMVC.debug('Loading tools');
    for (var i = 0, l = self.tools_files.length; i < l; i += 1) {
        JMVC.require(self.tools_files[i]);
    }
};








