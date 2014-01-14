JMVC.canvas.Editor.getExportManager = function (instance) {
    var self = instance,
        panel = new JMVC.canvas.Editor.Panel();
    return {
        init : function () {
            panel.html('export');
        },
        panel : panel
    };
};