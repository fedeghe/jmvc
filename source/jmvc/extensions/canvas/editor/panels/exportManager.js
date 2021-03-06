JMVC.canvas.Editor.getExportManager = function (instance) {
    var panel = new JMVC.canvas.Editor.Panel(),
        label,
        inputName,
        exportButton;
    panel.onBeforeOpen = function () {
        inputName.value = '';
    };
    panel.onAfterOpen = function () {
        inputName.focus();
    };
    return {
        init: function () {
            label = JMVC.dom.create('label', { 'class': 'strong' }, 'File name : ');
            inputName = JMVC.dom.create('input', { type: 'text', placeholder: 'filename here' });
            exportButton = JMVC.dom.create('button', { 'class': 'round-right' }, 'EXPORT');
            JMVC.dom.append(panel.getInnerNode(), [label, inputName, exportButton]);
            // panel.html('export');
        },
        bind: function () {
            JMVC.events.on(exportButton, 'click', function () {
                var name = inputName.value;
                if (name) {
                    instance.panelManager.export(name);
                }
            });
        },
        panel: panel
    };
};
