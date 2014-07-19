JMVC.extend('canvas.Editor.fields.integerinput', {

    create : function (options) {
        
        if (!options.node) {
            throw new Error('ERROR: required node');
        }
        var ctx = options.ctx,
            field,
            value = options.value || 0,
            node = options.node,
            min = options.min || 0,
            max = options.max || 100,
            step = options.step || 10,
            onchange = null;

        return {

            render : function () {

                field = JMVC.dom.create('input', {
                    type : 'range',
                    min : min,
                    max : max,
                    step : step,
                    value : value
                });

                JMVC.dom.append(node, field);

                var change = function (e) {
                    var t = JMVC.events.eventTarget(e);
                    onchange && onchange(field.value);
                };

                JMVC.events.on(field, 'change', change);
                JMVC.events.on(field, 'click', change);
            },
            unbind : function () {
                JMVC.events.off(field, 'change');
                JMVC.events.off(field, 'click');
            },
            onChange : function (f) {onchange = f; }
        };
        
    }
});