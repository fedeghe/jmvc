JMVC.controllers.canvaseditor = function () {
    'use strict';
    this.action_index = function (p) {

        JMVC.events.loadify(1000);

        JMVC.head.title('Canvas editor');

        var screen_size,
            editorContainerId = 'canvasEditorContainerId';

        JMVC.require(
            'canvas/editor/editor',
            'core/lib/image/image'
        );
        
        //
        // a minimal wrapper view
        JMVC.getView('vacuum')

            // set some style and the id
            // 
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

            // render
            //
            .render(function () {

                // create initialize and start the editor
                //
                new JMVC.canvas.Editor({
                    node : JMVC.dom.find('#' + editorContainerId)
                    //,width: 300
                    //,height: 400
                });
            });
            
        //window.setTimeout(function() {JMVC.screen.launchFullscreen();}, 5000);
    };
};