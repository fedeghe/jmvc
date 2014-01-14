JMVC.require('core/color/color');
JMVC.extend('canvas.Editor.fields.colorpicker', {

    create : function (options) {
        
        if (!options.node) {
            throw new Error('ERROR: required node');
        }
        var ctx = options.ctx,
            wrap,
            field,
            huewrap,
            hue, hueVal = options.hueZero,
            ul,
            lisat, sat, satVal = options.satZero,
            lilum, lum, lumVal = options.lumZero,
            lialp, alp, alpVal = options.alpZero,
            colwrap, col,
            clear,
            

            node = options.node,
            onchange = null,

            updatecolor = function () {
                hueVal = hue.value / 360;

                satVal = parseFloat(sat.value, 10);
                lumVal = parseFloat(lum.value, 10);
                alpVal = parseFloat(alp.value, 10);
                
                field.value = 'rgba(' + JMVC.core.color.hsl2rgb(hueVal, satVal, lumVal).join(',') + ',' + alpVal + ')';

                JMVC.css.style(col, 'background-color', field.value);
                onchange && onchange(field.value);
            },

            bind = function () {
                JMVC.events.bind([hue, sat, lum, alp], 'click', updatecolor);
                JMVC.events.bind([hue, sat, lum, alp], 'change', updatecolor);
            };


        /*
        div.wrap

            field (hidden)

            hue (div.picker)

            +[ul]-+ +div----+
            | sat | |       |
            | lum | | COLOR |
            | alp | |       |
            +-----+ +-------+
         */


        return {
            render : function (){
                wrap = JMVC.dom.create('div', {'class' : 'colorpicker'});

                field = JMVC.dom.create('input', {type : 'hidden', value : ''});
                
                huewrap = JMVC.dom.create('div', {'class' : 'hue'});
                for (var i = 0, s = 360; i < s; i += 1) {
                    JMVC.dom.add(huewrap, 'div', {'class' : 'huethick', style:'background-color:hsl(' + i + ', 100%, 50%)'});
                }
                hue = JMVC.dom.add(huewrap, 'input', {'class' : 'huerange', type : 'range', min : 0, max : 360, step : 2});


                ul = JMVC.dom.create('ul');

                lisat = JMVC.dom.create('li');
                JMVC.dom.add(lisat, 'h5', {}, 'Saturation');
                sat = JMVC.dom.add(lisat, 'input', {type : 'range', min : 0, max : 1, step : 0.05});

                lilum = JMVC.dom.create('li');
                JMVC.dom.add(lilum, 'h5', {}, 'Luminance');
                lum = JMVC.dom.add(lilum, 'input', {type : 'range', min : 0, max : 1, step : 0.05});

                // list item for alpha range
                lialp = JMVC.dom.create('li');
                JMVC.dom.add(lialp, 'h5', {}, 'Alpha');
                alp = JMVC.dom.add(lialp, 'input', {type : 'range', min : 0.1, max : 1, step : 0.05});

                colwrap = JMVC.dom.create('div', {'class' : 'colorwrap'});
                col = JMVC.dom.add(colwrap, 'div', {'class' : 'color'});

                hue.value = hueVal;
                sat.value = satVal;
                lum.value = lumVal;
                alp.value = alpVal;

                JMVC.dom.append(ul, [lisat, lilum, lialp]);
                JMVC.dom.append(wrap, [
                    JMVC.dom.create('h5', {}, 'Hue'),
                    huewrap,
                    ul,
                    colwrap,
                    JMVC.dom.clearer(),
                    field
                ]);

                JMVC.dom.append(node, wrap);
                
                bind();
                updatecolor();
            },

            unbind : function () {
                JMVC.events.unbind([hue, sat, lum, alp], 'click');
                JMVC.events.unbind([hue, sat, lum, alp], 'change');
            },

            onChange : function (f){onchange = f; }
        };
    }
});