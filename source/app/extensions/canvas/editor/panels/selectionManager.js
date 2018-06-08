JMVC.canvas.Editor.getSelectionManager = function (instance) {

    var self = instance,
        area = {
            ul : {
                x : 0,
                y : 0
            },
            dr : {
                x : 0,
                y : 0
            }
        },
        getCurrentLayer = function () {
            return self.panelManager.getLayerManager().getCurrent();
        },
        tool,
        selection = false,

        creating = false;

        mousedown = function (e) {
            if (selection) {
                JMVC.dom.remove(selection);
            }
            selection = JMVC.dom.create('div', {'class':'selection'})


            creating = true;
            console.debug('down');
            var position = JMVC.events.getCoord(JMVC.WD.body, e);
            

            area.ul.x = position[0];
            area.ul.y = position[1];

            JMVC.css.style(selection, {left : area.ul.x + 'px', top : area.ul.y + 'px'});
            JMVC.dom.append(JMVC.WD.body, selection);
        },
        mousemove = function (e) {
            if (!creating) {console.debug('not moving'); return false; }

            var position = JMVC.events.getCoord(JMVC.WD.body, e);
            area.dr.x = position[0] -5;
            area.dr.y = position[1] -5;

            JMVC.css.style(selection, {
                left : area.ul.x + 'px',
                top : area.ul.y + 'px',
                width : (area.dr.x - area.ul.x) + 'px',
                height : (area.dr.y - area.ul.y) + 'px'
            });
            console.debug('moving');
        },
        mouseup = function () {
            console.debug(arguments)
            //JMVC.events.kill(e);
            console.debug('up');
            creating = false;
            JMVC.css.style(getCurrentLayer().cnv, 'cursor', 'crosshair');
        }

    return {
        init : function () {
            //alpha on the current layer
            //
            //enable cursor for start
            
            // get a reference to the toolsManager
            var toolsManager = self.panelManager.getToolsManager();

            cnv = getCurrentLayer().cnv;
            //
            //save the current tool
            tool = toolsManager.getCurrentTool();
            //
            // disable current tool
            toolsManager.noTool();
            //
            // style the cursor
            JMVC.css.style(cnv, 'cursor', 'cell');

            cnv.onmousedown = mousedown;
            cnv.onmousemove = mousemove;
            cnv.onmouseup = mouseup;

        },
        end : function () {

        },
        enable : function () {

        },
        disable : function () {

        },
        crop : function () {

        }
    };
};