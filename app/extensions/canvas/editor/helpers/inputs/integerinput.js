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

                JMVC.events.bind(field, 'change', function (e) {
                    t = JMVC.events.eventTarget(e);
                    
                    onchange && onchange(field.value);
                });
            },
            unbind : function () {
                JMVC.events.unbind(field, 'change');
            },
            onChange : function (f){onchange = f; }
        };
        
    }
});