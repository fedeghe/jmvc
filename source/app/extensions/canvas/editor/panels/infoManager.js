JMVC.canvas.Editor.getInfoManager = function (instance) {

    var self = instance,
        panel = new JMVC.canvas.Editor.Panel();

    return {
        init : function () {
            JMVC.core.widgzard.render({
                target : panel.inner,
                content : [{
                    tag : 'strong',
                    html:'hello'
                }]
            });
        },
        panel : panel
    };
};