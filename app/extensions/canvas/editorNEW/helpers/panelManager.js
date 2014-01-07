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
                false,{
                    'font-weight':'bold',
                    'font-family': 'inherit',
                    'font-size' : '10px',
                    'line-height' : '10px',
                    'padding' : '4px',
                    'color' : 'black',
                    'background-color' : '#aaa',
                    '-moz-border-radius': '5px',
                    '-webkit-border-radius': '5px',
                    'border-radius': '5px'
                },
                {follow : true}
            );
            return ret;
        },
        commands = [
            {'class' : 'tools active', title : 'tool manager', data : 'toolmanager', hasPanel : true},
            //{'class' : 'undo unactive', title : 'undo', data : 'undo'},
            //{'class' : 'redo unactive', title : 'redo', data : 'redo'},
            {'class' : 'layers active', title : 'layer manager', data : 'layermanager', hasPanel : true},
            {'class' : 'filters active', title : 'filters', data : 'filtersmanager', hasPanel : true},
            {'class' : 'separator'},
            {'class' : 'clean active', title : 'clean canvas', data : 'cleancanvas'},
            {'class' : 'separator'},
            {'class' : 'export active', title : 'export image', data : 'exportimage', hasPanel : true},
            {'class' : 'options active', title : 'options', data : 'optionsmanager', hasPanel : true},
            {'class' : 'info active', title : 'usage info', data : 'getinfo', hasPanel : true}
        ],
        
        toolsManager = JMVC.canvas.Editor.getToolsManager(self, ['canvas/editorNEW/tools/']),

        loadRightPanel = function (topic, action, el, positions, size){

            // maybe a panel is required
            if (el.hasPanel) {
                if (currentPanel) {currentPanel.hide();}
                currentPanel = JMVC.canvas.Editor[action];
                currentPanel.render();
                currentPanel.show(size, positions[0]);
                (function (cp) {
                    JMVC.events.clickout(cp.node, function () {cp.hide(); });
                })(currentPanel);
                

            }else if (currentPanel) {currentPanel.hide();}
            console.debug(arguments)
        };


    JMVC.Channel('canvaseditor').sub('PANEL_EVENT', loadRightPanel);

    



    return {
        init : function () {
            JMVC.debug('Initializing panel');

            toolsManager.init().render();

            mainPanel = JMVC.dom.create('div', {id : panelID});
            
            for (var i = 0, l = commands.length; i < l; i += 1) {
                var sec = JMVC.dom.create('li', {'data-act' : commands[i].data}, getCommand(commands[i]));
                if (commands[i].hasPanel) {
                    sec.hasPanel = true;
                    JMVC.canvas.Editor[commands[i].data] = new JMVC.canvas.Editor.Panel();
                }
                sections.push(sec);
            }
            //console.debug(sections);
            sections.push(JMVC.dom.clearer());
            sectionsContainer = JMVC.dom.create('ul');

            
            return this;
        },

        render : function () {
            JMVC.debug('Rendering panel'); 
            JMVC.dom.append(sectionsContainer, sections);
            JMVC.dom.append(mainPanel, sectionsContainer);
            JMVC.dom.append(self.node, mainPanel);
            return this;
        },

        bind : function () {
            JMVC.debug('Binding panel');

            JMVC.events.bind(sections, 'click', function (e) {
                
                var trg = this, //JMVC.events.eventTarget(e),
                    trgPos = JMVC.css.getPosition(trg),
                    trgWidth = parseInt(JMVC.css.getComputedStyle(trg, 'width'), 10),
                    trgHeight = parseInt(JMVC.css.getComputedStyle(trg, 'height'), 10);
 
                // console.debug(trg); 

                // break if is unactive
                if (JMVC.dom.hasClass(trg, 'unactive')) {
                    return false;
                }

                JMVC.Channel('canvaseditor').pub(
                    'PANEL_EVENT',
                    [JMVC.dom.attr(trg, 'data-act'),
                    trg,
                    trgPos,
                    trgWidth]
                );
                JMVC.events.kill(e)
            });
            return this;
        }
    };
};