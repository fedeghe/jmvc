JMVC.controllers.canvaseditor = function (){

    this.action_index = function () {
        
        var screen_size;

        JMVC.events.loadify(1000);

        JMVC.require(
            'canvas/editor/editor',
            'core/screen/screen',
            'core/lib/image/image'
        );
        JMVC.head.title('Canvas pure editor');

        //a minimal wrapper view
        JMVC.getView('vacuum')
        
        //set some style and the id
        .set({
            style : 'font-family:verdana;margin:0 auto;border:0px;padding:0px',
            id : 'canvasEditorContainer'
        })

        // render
        .render(function () {
            //get  viewport size
            screen_size = JMVC.screen.getViewportSize();
            
            //start the editor
            JMVC.W.editor =  JMVC.canvas.editor.create({

                //the container
                node : JMVC.dom.find('#canvasEditorContainer'),

                //sizes
                width : screen_size[0],
                height : screen_size[1]-3,

                // require.json based multirequire
                tools : ['canvas/editor/tools/']
            }).init().render();
            
        });
    };

};
