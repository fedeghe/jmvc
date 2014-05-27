// type : CONSTRUCTOR
// 
JMVC.nsMake('JMVC.canvas');
JMVC.nsMake('JMVC.canvas.Editor.fields');

JMVC.require(
    'core/fx/fx',
    'core/color/color',
    'core/screen/screen',
    'core/lib/widgzard/widgzard'
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
    var self = this,
        screenSize;

    /**
     * check if a node is passed as options, it is necessay
     * too see where to render the editor
     */
    if (!('node' in options)) {
        throw new Error('A node is needed to create a Editor in it');
        return false;
    }

    // now it`s time to get viewport size
    screenSize = JMVC.screen.getViewportSize();

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
    this.width = options.width || screenSize.width;

    /**
     * Height for the editor
     * @type {Integer}
     */
    this.height = options.height || screenSize.height - 1;

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


    // on window resize tell the layermanager to resiza all layers
    // 
    JMVC.events.bind(JMVC.W, 'resize', function () {
        self.panelManager.getLayerManager().resize();
    });



    // get all the helpers:
    // PanelManager
    // ToolOptionsManager
    // Panel
    // Inputs: colorPicker
    // Inputs: integerInput
    // Inputs: floatInput
    //
    // AND then load styles
    JMVC.require('canvas/editorNEXT/helpers/', function () {
        // disable right click
        //
        JMVC.events.disableRightClick();
        console.log('loaded')

        // Basic editor style
        // 
        JMVC.head.addStyle(self.basepath + 'css/editor.css', true);
        JMVC.head.addStyle(self.basepath + 'css/tooltip.css', true);
        JMVC.head.addStyle(self.basepath + 'css/' + self.config.sprite, true);  
        
        // create and initialize the panelMAnager
        // 
        self.panelManager = JMVC.canvas.Editor.getPanelManager(self);

        // initialize, render and bind the panel manager
        //
        self.panelManager
            .init()
            .render()
            .bind();
    });
};
//
// load almost anything else (check canvas/editorNEW/helpers/require.json)

//

