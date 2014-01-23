JMVC.canvas.Editor.getSettingsManager = function (instance) {

    var self = instance,
        panel = new JMVC.canvas.Editor.Panel(),
        options = {};

    return {
        init : function () {
            panel.html('settings');
        },
        panel : panel
    };
};