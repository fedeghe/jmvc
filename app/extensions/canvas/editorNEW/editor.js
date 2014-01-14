JMVC.nsMake('JMVC.canvas');
JMVC.require(
    'core/css/css',
    'core/fx/fx',
    'core/color/color'
);
//
// init a channel for editor level
JMVC.Channel('canvaseditor');

/**
 * [Editor description]
 * @param {[type]} options [description]
 */
JMVC.canvas.Editor = function (options) {
    var self = this;
    if (!options.hasOwnProperty('node')) {
        throw new Error('A node is needed to create a Editor in it');
        return false;
    }
    this.basepath = JMVC.vars.baseurl + '/app/extensions/canvas/editorNEW/';
    this.config = {};
    this.node = options.node;
    this.width = options.width || 200;
    this.height = options.height || 200;
    this.layerManager = null;
    this.panelManager = null;

    JMVC.canvas.Editor.eventManager = JMVC.canvas.Editor.getEventManager(this);
    
    JMVC.io.getJson(this.basepath + 'config.json', function (json) {
        self.config = json;
    });
};
/**
 * [prototype description]
 * @type {Object}
 */
JMVC.canvas.Editor.prototype = {
    init: function () {
        // Basic editor style
        JMVC.head.addstyle(this.basepath + 'css/editor.css', true);  
        JMVC.head.addstyle(this.basepath + 'css/' + this.config.sprite, true);  
        
        this.layerManager = JMVC.canvas.Editor.getLayerManager(this);
        this.panelManager = JMVC.canvas.Editor.getPanelManager(this);
        
        JMVC.events.disableRightClick();

        return this;
    },
    render: function (){
        // ask layermanager to add first layer and activate it
        this.layerManager.add().activate();
        // ad the panel
        this.panelManager.init().render().bind();

        JMVC.canvas.Editor.eventManager.init();
        return this;
    }
};
//
// load almost anything else (check canvas/editorNEW/helpers/require.json)
JMVC.require('canvas/editorNEW/helpers/');
//
JMVC.nsMake('JMVC.canvas.Editor.fields');