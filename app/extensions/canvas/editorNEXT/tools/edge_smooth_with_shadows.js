JMVC.extend('canvas.editortools.edge_smooth_with_shadows', {

    use : function (instance) {

        var self = this,
            el = instance.cnv,
            ctx = instance.ctx,
            isDrawing = false;

        el.onmousedown = el.onmousemove = el.onmouseup = null;

        ctx.lineWidth = self.options.lineWidth.value;

        el.onmousedown = function(e) {
            isDrawing = true;
            
            ctx.lineWidth = self.options.lineWidth.value;
            ctx.lineJoin = ctx.lineCap = 'round';

            ctx.shadowBlur = self.options.shadowBlur.value;
            ctx.shadowColor = self.options.shadowColor.value;//'rgb(0, 0, 0)';
            ctx.moveTo(e.clientX, e.clientY);
        };
        el.onmousemove = function(e) {
            if (isDrawing) {
                ctx.lineTo(e.clientX, e.clientY);
                ctx.stroke();
            }
        };
        el.onmouseup = function() {
            JMVC.canvas.Editor.undoredoManager.save();
            isDrawing = false;
        };
    },

    options : {
        lineWidth : {
            name : 'lineWidth',
            type : 'int',
            value : 10,
            min : 5,
            max : 100,
            step : 1
        },
        shadowBlur : {
            name : 'shadowBlur',
            type : 'int',
            value : 10,
            min : 5,
            max : 100,
            step : 1
        },
        color : {
            value : '',
            hueZero : 1,
            satZero : 1,
            lumZero : 0,

            alpZero : 0.1,

            name : 'color',
            type : 'color'
        },
        shadowColor : {
            value : '',
            hueZero : 1,
            satZero : 1,
            lumZero : 0,

            alpZero : 0.1,

            name : 'shadowColor',
            type : 'color'
        },
        width : {
            name : 'width',
            type : 'int'
        }

    }

});
