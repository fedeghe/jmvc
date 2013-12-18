JMVC.extend('canvas.editor.fields.colorpicker', {

    create : function (options){
        
        if (!options.node) {
            throw new Error('ERROR: required node');
        }
        var field,
            value = options.value || 0,
            cpicker,
            alpha,
            node = options.node,
            colors = JMVC.core.color.getWebColors(),
            picksize = 5,
            pickWindowSize = [36, 6], // 12 * 18  = 216 = 6 * 6 * 6
            onchange = null;



        return {
            render : function () {

                field = JMVC.dom.create('input', {type : 'text', value : value});

                cpicker = JMVC.dom.create('div',{
                    style : 'width:' + (pickWindowSize[0] * picksize) + 'px;height:' + (pickWindowSize[1] * picksize) + 'px'
                });
                alpha = JMVC.dom.create('input', {type : 'text', value : 1});



                for (var i = 0, w = 0; w < pickWindowSize[0]; w += 1) {
                    for (var h = 0; h < pickWindowSize[ 1]; h += 1, i += 1) {
                        JMVC.dom.add(cpicker, 'div', {"class" : "ccolor", "style" :'background-color:' + colors[i] + ';height:' + picksize + 'px; width:' + picksize + 'px;float:left'}, '&nbsp;')
                    }
                }
                JMVC.dom.append(node, [field, cpicker, alpha]);
                JMVC.events.bind(cpicker, 'click', function (e) {
                    var t = JMVC.events.eventTarget(e);
                    field.value = JMVC.css.style(t, 'backgroundColor');
                    JMVC.css.style(field, 'background-color', field.value);
                    onchange && onchange(field.value);
                });
            },
            onChange : function (f){onchange = f; }
        };
        
    }
});