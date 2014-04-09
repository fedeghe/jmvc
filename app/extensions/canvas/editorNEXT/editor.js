JMVC.nsMake('JMVC.canvas');

JMVC.require(
    'core/fx/fx',
    'core/color/color'
);
//
// init a channel for editor level
JMVC.Channel('canvaseditor');

/**
 * Basic constuctor for editor
 * @param {[type]} options [description]
 */
JMVC.canvas.Editor = function (options) {
    // reference for callbacks
    var self = this;

    /**
     * check if a node is passed as options, it is necessay
     * too see where to rendere the editor
     */
    if (!('node' in options)) {
        throw new Error('A node is needed to create a Editor in it');
        return false;
    }

    /**
     * Bas path for the editor
     * @type {String}
     */
    this.basepath = JMVC.vars.baseurl + '/app/extensions/canvas/editorNEXT/';

    /**
     * Configuration that will be taken from config.json
     * @type {Object}
     */
    this.config = {};

    /**
     * The node where the editor will be created
     * @type {DOMnode}
     */
    this.node = options.node;

    /**
     * Width for the editor, in px
     * @type {Integer}
     */
    this.width = options.width || 200;

    /**
     * Height for the editor
     * @type {Integer}
     */
    this.height = options.height || 200;

    /**
     * every editor has a panelManager
     * @type {Object}
     */
    this.panelManager = null;

    /**
     * get the configuration
     */
    JMVC.io.getJson(this.basepath + 'config.json', function (json) {
        self.config = json;
    });
};
/**
 * Editor prototype definition
 * @type {Object}
 */
JMVC.canvas.Editor.prototype = {

    /**
     * Init function 
     * @return {[type]} [description]
     */
    init: function () {
        // Basic editor style
        // 
        JMVC.head.addstyle(this.basepath + 'css/editor.css', true);
        JMVC.head.addstyle(this.basepath + 'css/tooltip.css', true);
        JMVC.head.addstyle(this.basepath + 'css/' + this.config.sprite, true);  
        
        // create and initialize the panelMAnager
        // 
        this.panelManager = JMVC.canvas.Editor.getPanelManager(this);
        this.panelManager.init();

        // disable right click
        //
        JMVC.events.disableRightClick();

        // chain
        // 
        return this;
    },
    render: function () {
        // render the panel 
        // 
        this.panelManager.render();

        // chain
        // 
        return this;
    },
    bind : function () {
        // bind the panel
        // 
        this.panelManager.bind();

        // chain
        return this;
    }
};
//
// load almost anything else (check canvas/editorNEW/helpers/require.json)
JMVC.require('canvas/editorNEXT/helpers/');
//
JMVC.nsMake('JMVC.canvas.Editor.fields');
