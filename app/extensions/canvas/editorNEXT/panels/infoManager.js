JMVC.canvas.Editor.getInfoManager = function (instance) {

    var self = instance,
        panel = new JMVC.canvas.Editor.Panel();

    return {
        init : function () {
            panel.html('made with love');
        },
        panel : panel
    };
};