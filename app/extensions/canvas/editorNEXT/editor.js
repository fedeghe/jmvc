JMVC.nsMake('JMVC.canvas');
JMVC.require(
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
    this.basepath = JMVC.vars.baseurl + '/app/extensions/canvas/editorNEXT/';
    this.config = {};
    this.node = options.node;
    this.width = options.width || 200;
    this.height = options.height || 200;

    this.panelManager = null;
    
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
        JMVC.head.addstyle(this.basepath + 'css/tooltip.css', true);
        JMVC.head.addstyle(this.basepath + 'css/' + this.config.sprite, true);  
        
        this.panelManager = JMVC.canvas.Editor.getPanelManager(this);
        this.panelManager.init();
        JMVC.events.disableRightClick();

        return this;
    },
    render: function () {
        // ad the panel
        this.panelManager.render();
        // JMVC.canvas.Editor.eventManager.init();
        return this;
    },
    bind : function () {
        this.panelManager.bind();
        return this;
    }
};
//
// load almost anything else (check canvas/editorNEW/helpers/require.json)
JMVC.require('canvas/editorNEXT/helpers/');
//
JMVC.nsMake('JMVC.canvas.Editor.fields');
//
//
//