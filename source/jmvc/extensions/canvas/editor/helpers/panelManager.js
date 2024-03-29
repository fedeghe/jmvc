/**
 * [panelManager description]
 * @param  {[type]} instance [description]
 * @param  {[type]} options  [description]
 * @return {[type]}          [description]
 */

JMVC.require('widget/tooltip/tooltip');

JMVC.require('canvas/editor/panels/');

JMVC.canvas.Editor.getPanelManager = function (editor) {
    var mainPanel,
        currentPanel,
        panelID = 'jmvcCEpanel',
        sectionsContainer,
        sections = [],
        getCommand = function (obj) {
            var o = { 'class': 'icon ' + obj['class'] },
                ret = JMVC.dom.create('strong', o);
            obj.title && (o.title = obj.title);
            // obj.data && (o['data-act'] = obj.data);
            // avoid tooltip if no title is given
            if (obj.title) {
                // debugger;
                JMVC.widget.Tooltip(
                    ret,
                    obj.title,
                    { color: '#f60', backgroundColor: '#000', border: '1px solid #f60' },
                    { follow: true }
                );
            }
            return ret;
        },

        Channel = JMVC.Channel('canvaseditor'),

        //
        // declare panel managers, each one will be
        // instantiated here at init time
        toolsManager,
        // undoredoManager,
        layerManager,
        filterManager,
        exportManager,
        settingsManager,
        fullscreenManager,
        fileManager,
        infoManager,

        selectionManager = null,

        commands = [
            {
                'class': 'tools active',
                title: 'tool manager',
                data: 'toolmanager',
                hasPanel: true,
                manager: function () { return toolsManager; }
            }, {
                'class': 'undo unactive',
                name: 'undo',
                title: 'undo',
                data: 'undo'
            }, {
                'class': 'redo unactive',
                name: 'redo',
                title: 'redo',
                data: 'redo'
            }, {
                'class': 'layers active',
                title: 'layer manager',
                data: 'layermanager',
                hasPanel: true,
                manager: function () { return layerManager; }
            }, {
                'class': 'filters active',
                title: 'filters',
                data: 'filtersmanager',
                hasPanel: true,
                manager: function () { return filterManager; }
            }, {
                'class': 'separator'
            }, {
                'class': 'clean active',
                title: 'clean canvas',
                data: 'cleancanvas'
            }, {
                'class': 'selection active',
                title: 'select area',
                data: 'selection'
            }, {
                'class': 'fullscreen active',
                title: 'full screen',
                data: 'fullscreen'
            }, {
                'class': 'separator'
            }, {
                'class': 'export active',
                title: 'export image',
                data: 'exportimage',
                hasPanel: true,
                manager: function () { return exportManager; }
            }, {
                'class': 'file active',
                title: 'save',
                data: 'file'
            }, {
                'class': 'separator'
            }, {
                // cntClass : 'fright',
                'class': 'settings active',
                title: 'settings',
                data: 'optionsmanager',
                hasPanel: true,
                manager: function () { return settingsManager; }
            }, {
                // cntClass : 'fright',
                'class': 'info active',
                title: 'usage info',
                data: 'getinfo',
                hasPanel: true,
                manager: function () { return infoManager; }
            }
        ],
        commandsNodes = {};

    Channel.sub('UNDOREDO_EVENT', function (topic, elem, status) {
        JMVC.dom.removeClass(commandsNodes[elem], ['active', 'unactive']);
        JMVC.dom.addClass(commandsNodes[elem], status ? 'active' : 'unactive');
    });

    Channel.sub('PANEL_EVENT', function (topic, action, el, positions, size) {
        // maybe a panel is required
        //
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
                //
                JMVC.events.onEventOut(cp.node, 'click', function () { cp.hide(); });
                JMVC.events.onEventOut(cp.node, 'mousedown', function () { cp.hide(); });
            })(currentPanel);
        } else if (currentPanel) {
            currentPanel.hide();
        }

        //
        // direct actions
        switch (action) {
        case 'cleancanvas':
            editor.panelManager.getToolsManager().clear();
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
        case 'fullscreen':
            fullscreenManager.launch();
            break;
        case 'file':
            fileManager.open();
            break;
        }
    });

    // define a global spinner
    JMVC.canvas.Editor.Spinner = JMVC.dom.create('div', { 'class': 'loadingspinner' });

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
        getToolsManager: function () { return toolsManager; },
        getLayerManager: function () { return layerManager; },
        getFilterManager: function () { return filterManager; },
        getFileManager: function () { return fileManager; },
        getExportManager: function () { return exportManager; },
        getSettingsManager: function () { return settingsManager; },
        getInfoManager: function () { return infoManager; },
        getFullscreenManager: function () { return fullscreenManager; },

        /**
         * [init description]
         * @return {[type]} [description]
         */
        init: function () {
            // get all managers!!!
            //
            toolsManager = JMVC.canvas.Editor.getToolManager(editor, ['canvas/editor/tools/']);
            layerManager = JMVC.canvas.Editor.getLayerManager(editor);
            filterManager = JMVC.canvas.Editor.getFilterManager(editor);
            fileManager = JMVC.canvas.Editor.getFileManager(editor);
            exportManager = JMVC.canvas.Editor.getExportManager(editor);
            settingsManager = JMVC.canvas.Editor.getSettingsManager(editor);
            infoManager = JMVC.canvas.Editor.getInfoManager(editor);
            fullscreenManager = JMVC.canvas.Editor.getFullscreenManager(editor);

            // manager for selection tool
            //
            selectionManager = JMVC.canvas.Editor.getSelectionManager(editor);

            // add first layer and activate it
            //
            layerManager.add().activate();

            // initialize the undo-redo manager
            //
            JMVC.canvas.Editor.undoredoManager = JMVC.canvas.Editor.getUndoredoManager(editor);

            JMVC.canvas.Editor.undoredoManager.init();

            mainPanel = JMVC.dom.create('div', { id: panelID });
            var i = 0,
                l = commands.length,
                n, sec, liattrs;
            for (null; i < l; i += 1) {
                n = getCommand(commands[i]);
                liattrs = { 'data-act': commands[i].data };
                if ('name' in commands[i]) {
                    commandsNodes[commands[i].name] = n;
                }
                if ('cntClass' in commands[i]) {
                    liattrs['class'] = commands[i].cntClass;
                }

                sec = JMVC.dom.create('li', liattrs, n);

                if (commands[i].hasPanel) {
                    sec.hasPanel = true;
                    sec.manager = commands[i].manager;
                }
                sections.push(sec);
            }

            toolsManager.init();
            layerManager.init();
            filterManager.init();
            fileManager.init();
            exportManager.init();
            settingsManager.init();
            infoManager.init();

            sections.push(JMVC.dom.clearer());
            sectionsContainer = JMVC.dom.create('ul');
            return this;
        },

        /**
         * [render description]
         * @return {[type]} [description]
         */
        render: function () {
            JMVC.dom.append(sectionsContainer, sections);
            JMVC.dom.append(mainPanel, sectionsContainer);
            JMVC.dom.append(editor.node, mainPanel);
            toolsManager.render();
            filterManager.render();

            JMVC.dom.append(mainPanel, JMVC.canvas.Editor.Spinner);
            return this;
        },

        /**
         * [bind description]
         * @return {[type]} [description]
         */
        bind: function () {
            toolsManager.bind();
            exportManager.bind();

            /*
                        JMVC.events.on(mainPanel, 'mouseover', function () {
                            JMVC.css.style(mainPanel, 'top', '0px');
                        });
                        JMVC.events.on(mainPanel, 'mouseout', function () {
                            JMVC.css.style(mainPanel, 'top', '-25px');
                        });
            */
            JMVC.events.on(sections, 'click', function (e) {
                var trg = this,
                    trgPos = JMVC.css.getPosition(trg),
                    trgWidth = parseInt(JMVC.css.getComputedStyle(trg, 'width'), 10);
                    // trgHeight = parseInt(JMVC.css.getComputedStyle(trg, 'height'), 10);

                // break if is unactive
                if (JMVC.dom.hasClass(trg, 'unactive')) {
                    return false;
                }
                Channel.pub(
                    'PANEL_EVENT',
                    [
                        JMVC.dom.attr(trg, 'data-act'),
                        trg,
                        trgPos,
                        trgWidth
                    ]
                );
                JMVC.events.kill(e);
            });
            return this;
        },

        /**
         * [export description]
         * @param  {[type]} name [description]
         * @return {[type]}      [description]
         */
        export: function (name) {
            if (name) {
                var tmp = JMVC.dom.add(editor.node, 'a', {
                    download: name + '.png',
                    href: layerManager.getCurrent().cnv.toDataURL('image/png'),
                    style: 'display:none'
                }).click();
                JMVC.dom.remove(tmp);
            }
        }
    };
};
