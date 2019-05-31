JMVC.canvas.Editor.getSettingsManager = function (instance) {
    var panel = new JMVC.canvas.Editor.Panel();

    return {
        init: function () {
            panel.html('settings');
        },
        panel: panel
    };
};
