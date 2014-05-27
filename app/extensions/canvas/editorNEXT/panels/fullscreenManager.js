JMVC.canvas.Editor.getFullscreenManager = function (instance) {

    var self = instance,
        panel = new JMVC.canvas.Editor.Panel();

    return {
        launch : function () {
            JMVC.screen.launchFullscreen();
        },
        panel : panel
    };
};