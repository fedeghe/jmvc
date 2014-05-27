JMVC.require(
    'core/fx/fx',
    'core/color/color'
);
JMVC.nsMake('JMVC.canvas');
//
// Basic editor style
JMVC.head.addStyle(JMVC.vars.baseurl + '/app/extensions/canvas/editor/editor.css', true);
/**
 * [Editor description]
 * @param {[type]} options [description]
 */
JMVC.canvas.Editor = function (options) {
    if (!options.hasOwnProperty('node')) {
        throw new Error('A node is needed to create a Editor in it');
        return false;
    }
    this.node = options.node;
    this.width = options.width || 200;
    this.height = options.height || 200;
    this.layerManager = null;
    this.panelManager = null;
};
/**
 * [prototype description]
 * @type {Object}
 */
JMVC.canvas.Editor.prototype = {
    init: function () {
        JMVC.css.style(this.node, {position : 'relative', overflow : 'hidden'});
        this.layerManager = JMVC.canvas.Editor.getLayerManager(this);
        this.panelManager = JMVC.canvas.Editor.getPanelManager(this);
        return this;
    },
    render: function (){
        // ask layermanager to add first layer and activate it
        this.layerManager.add().activate();
        // ad the panel
        this.panelManager.init().render().bind();
        return this;
    },
    bind : function (){}
};

JMVC.events.disableRightClick();

// load almost anything else (check canvas/editor/require.json)
JMVC.require('canvas/editor/helpers/');

JMVC.nsMake('JMVC.canvas.Editor.fields');