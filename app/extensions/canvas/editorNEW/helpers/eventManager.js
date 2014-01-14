JMVC.canvas.Editor.getEventManager = function (instance) {

    var self = instance,
        maxLevels = 50,
        states = [],
        index = 0,
        currentLayer = function () {return self.layerManager.getCurrent(); },
        load = function (i) {
            var cPic = new Image();
            cPic.src = states[i];
            cPic.onload = function () {
                currentLayer().ctx.drawImage(cPic, 0, 0);
            };
        },
        dopub = function () {
            JMVC.Channel('canvaseditor').pub('UNDOREDO_EVENT', ['undo', index > 0] );
            JMVC.Channel('canvaseditor').pub('UNDOREDO_EVENT', ['redo', index < states.length - 1]);
        },
        loadFirstState = function () {
            self.layerManager.clean();
            index = -1;
            dopub();
        };

    JMVC.Channel('canvaseditor').sub('EDITOR_CLEANED', function () {
        JMVC.canvas.Editor.eventManager.clear();
    });
    

    //autoload first state
    

    return {
        init : function () {
            states.length = 0;
            index = 0;
            states.push(currentLayer().cnv.toDataURL());
        },
        save : function () {
            //
            // if some backspeps are made, and new edit are done,
            // backsteps are lost
            if (index < states.length - 1) {
                states = states.slice(0, index + 1);
            }
            //
            // if the maximum numbersof saves are reached, the states array
            // shift forward loosing oldest elements
            if (states.length == maxLevels + 1) {
                states.shift();
                index -= 1;
            }
            index += 1;
            states.push(currentLayer().cnv.toDataURL());
            dopub();
        },
        back : function () {
            if (index == 0) {return false; }
            index -= 1;
            load(index);
            dopub();
        },
        forth : function () {
            if (index == states.length - 1) {return false; }
            index += 1;
            load(index);
            dopub();
        },
        clear : function () {
            this.init();
            dopub();
        }
    };
};
/*
() () () () () () () () () ()
 */