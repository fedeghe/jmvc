JMVC.canvas.Editor.getFilterManager = function (instance) {
    var self = instance,
        panel = new JMVC.canvas.Editor.Panel();

    return {
        init : function () {
            panel.html('filters');
        },
        panel : panel
    };
};