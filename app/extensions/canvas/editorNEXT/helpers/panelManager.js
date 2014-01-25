/**
 * [panelManager description]
 * @param  {[type]} instance [description]
 * @param  {[type]} options  [description]
 * @return {[type]}          [description]
 */

JMVC.require('widget/tooltip/tooltip');

JMVC.canvas.Editor.getPanelManager = function (instance) {

    var self = instance,
        mainPanel,
        currentPanel,
        panelID = 'jmvcCEpanel',
        sectionsContainer,
        sections = [],
        getCommand = function (obj) {
            var o = {'class' : 'icon ' + obj['class']};
            obj.title && (o.title = obj.title);
            //obj.data && (o['data-act'] = obj.data);
            var ret = JMVC.dom.create('strong', o);

            JMVC.widget.Tooltip(
                ret,
                false,
                {},
                {follow : true}
            );
            return ret;
        },
        //
        // declare panel managers, each one will be instantiated here at init time
        
        toolsManager,
        undoredoManager, //***
        layerManager,
        filterManager,
        exportManager,
        settingsManager,
        infoManager,

        selectionManager = null,


        commands = [
            {'class' : 'tools active', title : 'tool manager', data : 'toolmanager', hasPanel : true, manager : function () { return toolsManager; }},
            {'class' : 'undo unactive', name : 'undo', title : 'undo', data : 'undo'},
            {'class' : 'redo unactive', name : 'redo', title : 'redo', data : 'redo'},
            {'class' : 'layers active', title : 'layer manager', data : 'layermanager', hasPanel : true, manager : function () { return layerManager;}},
            {'class' : 'filters active', title : 'filters', data : 'filtersmanager', hasPanel : true, manager : function () { return filterManager;}},
            //{'class' : 'selection active', title : 'selection', data : 'selection'},
            {'class' : 'separator'},
            {'class' : 'clean active', title : 'clean canvas', data : 'cleancanvas'},
            {'class' : 'separator'},
            {'class' : 'export active', title : 'export image', data : 'exportimage', hasPanel : true, manager : function () { return exportManager;}},
            {'class' : 'settings active', title : 'settings', data : 'optionsmanager', hasPanel : true, manager : function () { return settingsManager;}},
            {'class' : 'info active', title : 'usage info', data : 'getinfo', hasPanel : true, manager : function () { return infoManager;}}
        ],
        commandsNodes = {};

    JMVC.Channel('canvaseditor').sub('UNDOREDO_EVENT', function (topic, elem, status) {

        JMVC.dom.removeClass(commandsNodes[elem], ['active','unactive']);
        JMVC.dom.addClass(commandsNodes[elem], status ? 'active' : 'unactive');
    });

    JMVC.Channel('canvaseditor').sub('PANEL_EVENT', function (topic, action, el, positions, size) {
        // maybe a panel is required
        if (el.hasPanel) {
            if (currentPanel) {
                currentPanel.hide();
            }
            currentPanel = el.manager().panel;
            currentPanel.render();
            currentPanel.show(size, positions[0]);
            
            (function (cp) {
                // when a panel is opened, close it as a click or a
                // mousedown event is fired from outside the panel
                JMVC.events.onEventOut('click', cp.node, function () {cp.hide(); });
                JMVC.events.onEventOut('mousedown', cp.node, function () {cp.hide(); });
            })(currentPanel);

        } else if (currentPanel) {
            currentPanel.hide();
        }

        //
        // direct actions
        switch (action) {
            case 'cleancanvas':
                self.panelManager.getToolsManager().clear();
            break;
            case 'undo':
                JMVC.canvas.Editor.undoredoManager.back();
            break;
            case 'redo':
                JMVC.canvas.Editor.undoredoManager.forth();
            break;
            case 'selection':
                selectionManager.init();
            break;
        }
    });

    //define a global spinner
    JMVC.canvas.Editor.Spinner = JMVC.dom.create('div', {'class':'loadingspinner'});
    JMVC.canvas.Editor.Spinner.isVisible = false;
    JMVC.canvas.Editor.Spinner.show = function () {
        JMVC.canvas.Editor.Spinner.isVisible = true;
        JMVC.css.show(JMVC.canvas.Editor.Spinner);
    };
    JMVC.canvas.Editor.Spinner.hide = function () {
        JMVC.canvas.Editor.Spinner.isVisible = false;
        JMVC.css.hide(JMVC.canvas.Editor.Spinner);
    };
    JMVC.canvas.Editor.Spinner.toggle = function () {
        JMVC.canvas.Editor.Spinner[JMVC.canvas.Editor.Spinner.isVisible ? 'hide' : 'show']();
    };

    return {
        getToolsManager : function () {return toolsManager; },
        getLayerManager : function () {return layerManager; },
        getFilterManager : function () {return filterManager; },
        getExportManager : function () {return exportManager; },
        getSettingsManager : function () {return settingsManager; },
        getInfoManager : function () {return infoManager; },

        init : function () {

            JMVC.require('canvas/editorNEXT/panels/');
            //
            // what about that time ?
            //
            toolsManager = JMVC.canvas.Editor.getToolManager(self, ['canvas/editorNEXT/tools/']);
            layerManager = JMVC.canvas.Editor.getLayerManager(self);
            filterManager = JMVC.canvas.Editor.getFilterManager(self);
            exportManager = JMVC.canvas.Editor.getExportManager(self);
            settingsManager = JMVC.canvas.Editor.getSettingsManager(self);
            infoManager = JMVC.canvas.Editor.getInfoManager(self);
            //
            // manager for selection tool
            selectionManager = JMVC.canvas.Editor.getSelectionManager(self);
            
            //
            // add first layer and activete it
            layerManager.add().activate();

            //
            // initialize the undo-redo manager
            JMVC.canvas.Editor.undoredoManager = JMVC.canvas.Editor.getUndoredoManager(self);
            JMVC.canvas.Editor.undoredoManager.init();



            mainPanel = JMVC.dom.create('div', {id : panelID});
            
            for (var i = 0, l = commands.length; i < l; i += 1) {
                var n = getCommand(commands[i]),
                    sec;
                if ('name' in commands[i]) {
                    commandsNodes[commands[i].name] = n;
                }

                sec = JMVC.dom.create('li', {'data-act' : commands[i].data}, n );
                if (commands[i].hasPanel) {
                    
                    sec.hasPanel = true;
                    
                    sec.manager = commands[i].manager;
                }
                sections.push(sec);
            }

            toolsManager.init();
            layerManager.init();
            filterManager.init();
            exportManager.init();
            settingsManager.init();
            infoManager.init();

            sections.push(JMVC.dom.clearer());
            sectionsContainer = JMVC.dom.create('ul');
            return this;
        },

        render : function () {
            JMVC.dom.append(sectionsContainer, sections);
            JMVC.dom.append(mainPanel, sectionsContainer);
            JMVC.dom.append(self.node, mainPanel);
            toolsManager.render();
            filterManager.render();

            JMVC.dom.append(mainPanel, JMVC.canvas.Editor.Spinner);
            return this;
        },

        bind : function () {
            toolsManager.bind();
            exportManager.bind();

            JMVC.events.bind(sections, 'click', function (e) {

                var trg = this,// JMVC.events.eventTarget(e),
                    trgPos = JMVC.css.getPosition(trg),
                    trgWidth = parseInt(JMVC.css.getComputedStyle(trg, 'width'), 10),
                    trgHeight = parseInt(JMVC.css.getComputedStyle(trg, 'height'), 10);
 
                // break if is unactive
                if (JMVC.dom.hasClass(trg, 'unactive')) {
                    return false;
                }
                JMVC.Channel('canvaseditor').pub(
                    'PANEL_EVENT',
                    [
                        JMVC.dom.attr(trg, 'data-act'),
                        trg,
                        trgPos,
                        trgWidth
                    ]
                );
                JMVC.events.kill(e)
            });
            return this;
        },

        export : function (name) {            
            if (name) {
                var tmp = JMVC.dom.add(self.node, 'a', {
                    download : name + '.png',
                    href : layerManager.getCurrent().cnv.toDataURL("image/png"),
                    style : 'display:none'
                }).click();
                JMVC.dom.remove(tmp);
            }
        }
    };
};