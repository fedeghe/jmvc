JMVC.require(
    'canvas/editor/editor',
    'core/lib/image/image'
);

JMVC.controllers.canvaseditor = function () {
    'use strict';
    
    var editorContainerId = 'canvasEditorContainerId';

    this.action_index = function (p) {
        JMVC.events.loadify(1000);
        JMVC.head.title('Canvas editor');
        JMVC.getView('vacuum')
            .set({
                style : JMVC.object.toStr({
                    'font-family' : 'verdana',
                    margin : '0 auto',
                    border : '0px',
                    padding : '0px',
                    position : 'relative',
                    overflow : 'hidden',
                    top : '0px'
                }),
                id : editorContainerId
            })
            .render(function () {
                new JMVC.canvas.Editor({
                    node : JMVC.dom.find('#' + editorContainerId)
                    //,width: 300
                    //,height: 400
                });
            });
    };
};