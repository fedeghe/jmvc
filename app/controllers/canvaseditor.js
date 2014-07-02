JMVC.controllers.canvaseditor = function () {
    'use strict';
    this.action_index = function (p) {

        JMVC.events.loadify(1000);
        JMVC.head.title('Canvas editor');


        var default_version = 0,
            version = p.v || 0,
            editors = [
                'canvas/editorNEXT/editor',
                //'canvas/editorNEW/editor',
                'canvas/editor/editor'
            ],
            screen_size,
            editorContainerId = 'canvasEditorContainerId';

        if (version >= editors.length) {
            alert('out of versions, loading version ' + default_version);
            version = default_version;
        }

        JMVC.require(
            editors[version],
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