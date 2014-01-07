JMVC.extend('canvas.Editor.fields.integerinput', {

    create : function (options) {
        
        if (!options.node) {
            throw new Error('ERROR: required node');
        }
        var field,
            value = options.value || 0,
            node = options.node,
            onchange = null;

        return {

            render : function () {

                field = JMVC.dom.create('input', {type : 'range', min : 0, max : 100, step : 0.5, value : value});

                JMVC.dom.append(node, field);

                JMVC.events.bind(field, 'change', function (e) {
                    t = JMVC.events.eventTarget(e);
                    
                    onchange && onchange(field.value);
                });
            },
            onChange : function (f){onchange = f; }
        };
        
    }
});