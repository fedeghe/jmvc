/**
 * [panelManager description]
 * @param  {[type]} instance [description]
 * @param  {[type]} options  [description]
 * @return {[type]}          [description]
 */

JMVC.canvas.Editor.getPanelManager = function (instance, options) {

    options = options || {};
    var self = instance,
        panel,
        openWidth = 400,
        closedSquareSize = 30,
        size_pos = {
            width : openWidth,
            height : self.height,
            topClosed : closedSquareSize - self.height,
            rightClosed : closedSquareSize - openWidth
        },
        buttons = {
            'export' : JMVC.dom.create('button', {}, 'Export'),
            'import' : JMVC.dom.create('button', {}, 'Import'),
            'clear' : JMVC.dom.create('button', {}, 'Clear')
        },

        wrapper = JMVC.dom.create('div', {'class' : 'wrapper'}),

        dstId = 'panelTools',
        moving = false,
        toolsManager = null,
        optionsManager = null;

    JMVC.dom.append(wrapper, [
        buttons['export'],
        buttons['import'],
        buttons['clear'],
        JMVC.dom.create('hr'),
        JMVC.dom.create('h4', {}, 'Tools'),
        JMVC.dom.create('ul', {id : 'panelTools'}, ''),
        JMVC.dom.create('hr'),
        JMVC.dom.create('h4', {}, 'Options'),
        JMVC.dom.create('ul', {id : 'toolOptions'}, '')]
    );

    return {
        init : function () {
            JMVC.debug('Initializing panel');
            toolsManager = JMVC.canvas.Editor.getToolsManager(self, ['canvas/editor/tools/']);
            optionsManager = JMVC.canvas.Editor.getOptionsManager(self);
            panel = JMVC.dom.create('div', {
                id : 'panel',
                style : JMVC.object.toStr({
                     width : size_pos.width + 'px',
                     height : size_pos.height +'px',
                     top : size_pos.topClosed +'px',
                     right : size_pos.rightClosed + 'px'
                })
            });
            panel.appendChild(wrapper);
            return this;
        },

        render : function () {
            JMVC.debug('Rendering panel'); 
            JMVC.dom.append(self.node, panel);
            
            toolsManager.init().render(JMVC.dom.find('#' + dstId));
            return this;
        },

        bind : function () {
            JMVC.debug('Binding panel');
            
            JMVC.events.bind(buttons['clear'], 'click', function () {
                toolsManager.clear();
            });
            JMVC.events.bind(buttons['export'], 'click', function () {
                toolsManager.save();
            });

            JMVC.events.bind(panel, 'mouseenter',
                function () {
                    JMVC.css.style(panel, {top : '0px', right : '0px'});
                }
            );
/*
            JMVC.events.bind(panel, 'mouseleave',
                function () {
                    JMVC.css.style(panel, {top : size_pos.topClosed + 'px', right : size_pos.rightClosed + 'px'});
                }
            );
  */          
            return this;
        }

    };
};