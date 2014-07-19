/**
 * [panelManager description]
 * @param  {[type]} instance [description]
 * @param  {[type]} options  [description]
 * @return {[type]}          [description]
 */

JMVC.require('widget/tooltip/tooltip');

JMVC.require('canvas/editorNEXT/panels/');

JMVC.canvas.Editor.getPanelManager = function (editor) {

    var mainPanel,
        currentPanel,
        panelID = 'jmvcCEpanel',
        sectionsContainer,
        sections = [],
        getCommand = function (obj) {
            var o = {'class' : 'icon ' + obj['class']};
            obj.title && (o.title = obj.title);
            //obj.data && (o['data-act'] = obj.data);
            var ret = JMVC.dom.create('strong', o);

            // avoid tooltip if no title is given
            if (obj.title) {
                JMVC.widget.Tooltip(
                    ret,
                    false,
                    {color:'#f60', backgroundColor:'#000', border : '1px solid #f60'},
                    {follow : true}
                );
            }
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
        fullscreenManager,
        infoManager,

        selectionManager = null,


        commands = [
            {
                'class' : 'tools active',
                title : 'tool manager',
                data : 'toolmanager',
                hasPanel : true,
                manager : function () { return toolsManager; }
            },
            {
                'class' : 'undo unactive',
                name : 'undo',
                title : 'undo',
                data : 'undo'
            },
            {
                'class' : 'redo unactive',
                name : 'redo',
                title : 'redo',
                data : 'redo'
            }, {
                'class' : 'layers active',
                title : 'layer manager',
                data : 'layermanager',
                hasPanel : true,
                manager : function () { return layerManager;}
            }, {
                'class' : 'filters active',
                title : 'filters',
                data : 'filtersmanager',
                hasPanel : true,
                manager : function () { return filterManager;}
            },
            //{'class' : 'selection active', title : 'selection', data : 'selection'},
            {
                'class' : 'separator'
            }, {
                'class' : 'clean active',
                title : 'clean canvas',
                data : 'cleancanvas'
            }, {
                'class' : 'separator'
            }, {
                'class' : 'export active',
                title : 'export image',
                data : 'exportimage',
                hasPanel : true,
                manager : function () { return exportManager;}
            }, {
                'class' : 'settings active',
                title : 'settings',
                data : 'optionsmanager',
                hasPanel : true,
                manager : function () { return settingsManager;}
            }, {
                'class' : 'fullscreen active',
                title : 'full screen',
                data : 'fullscreen'
            },{
                'class' : 'info active',
                title : 'usage info',
                data : 'getinfo',
                hasPanel : true,
                manager : function () { return infoManager;}
            }
        ],
        commandsNodes = {};

    JMVC.Channel('canvaseditor').sub('UNDOREDO_EVENT', function (topic, elem, status) {
        JMVC.dom.removeClass(commandsNodes[elem], ['active','unactive']);
        JMVC.dom.addClass(commandsNodes[elem], status ? 'active' : 'unactive');
    });

    JMVC.Channel('canvaseditor').sub('PANEL_EVENT', function (topic, action, el, positions, size) {

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
        getFullscreenManager : function () {return fullscreenManager; },

        /**
         * [init description]
         * @return {[type]} [description]
         */
        init : function () {

            

            // what about that time ?
            //
            toolsManager = JMVC.canvas.Editor.getToolManager(editor, ['canvas/editorNEXT/tools/']);
            layerManager = JMVC.canvas.Editor.getLayerManager(editor);
            filterManager = JMVC.canvas.Editor.getFilterManager(editor);
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

        /**
         * [render description]
         * @return {[type]} [description]
         */
        render : function () {
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
        bind : function () {

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

        /**
         * [export description]
         * @param  {[type]} name [description]
         * @return {[type]}      [description]
         */
        export : function (name) {            
            if (name) {
                var tmp = JMVC.dom.add(editor.node, 'a', {
                    download : name + '.png',
                    href : layerManager.getCurrent().cnv.toDataURL("image/png"),
                    style : 'display:none'
                }).click();
                JMVC.dom.remove(tmp);
            }
        }
    };
};






