JMVC.controllers.canvaseditor = function (){

    JMVC.require(
        'canvas/editor/editor',
        'core/screen/screen',
        'core/lib/image/image'
    );

    this.action_index = function () {
        
        var screen_size,
            editorContainerId = 'canvasEditorContainerId';

        JMVC.events.loadify(1000);

        JMVC.head.title('Canvas pure editor');

        //a minimal wrapper view
        JMVC.getView('vacuum')
        
            //set some style and the id
            .set({
                style : 'font-family:verdana;margin:0 auto;border:0px;padding:0px',
                id : editorContainerId
            })

            // render
            .render(function () {
                //get  viewport size
                screen_size = JMVC.screen.getViewportSize();
                
                //start the editor
                var editor =  new JMVC.canvas.Editor({

                    //the container
                    node : JMVC.dom.find('#' + editorContainerId),

                    //sizes
                    width : screen_size[0],
                    height : screen_size[1]-3,

                    // require.json based multirequire
                    tools : ['canvas/editor/tools/']
                });
                editor.init().render();
                
            });
    };

};
