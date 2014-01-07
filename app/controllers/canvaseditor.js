JMVC.controllers.canvaseditor = function () {
    
    this.action_index = function (p) {

        var editor = p['old'] ? 'canvas/editor/editor' : 'canvas/editorNEW/editor',
            screen_size,
            editorContainerId = 'canvasEditorContainerId';

        JMVC.require(
            editor,
            'core/screen/screen',
            'core/lib/image/image'
        );

        JMVC.events.loadify(1000);
        JMVC.head.title('Canvas pure editor');
        //
        // a minimal wrapper view
        JMVC.getView('vacuum')
            //
            // set some style and the id
            .set({
                style : JMVC.object.toStr({
                    'font-family' : 'verdana',
                    margin : '0 auto',
                    border : '0px',
                    padding : '0px',
                    position : 'relative',
                    overflow : 'hidden'
                }),
                id : editorContainerId
            })
            //
            // render
            .render(function () {
                //
                // now it`s time to get viewport size
                screen_size = JMVC.screen.getViewportSize();
                //
                // create initialize and start the editor
                new JMVC.canvas.Editor({
                    node : JMVC.dom.find('#' + editorContainerId),
                    width : screen_size[0],
                    height : screen_size[1]-1
                }).init().render();
                
            });
    };
};