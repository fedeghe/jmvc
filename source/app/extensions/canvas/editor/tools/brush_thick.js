JMVC.extend('canvas.editortools.brush_thick', {
    use : function (instance) {
        var self = this,
            el = instance.cnv,
            ctx = instance.ctx;

        el.onmousedown = el.onmousemove = el.onmouseup = null;

        ctx.lineWidth = self.options.linewidth.value;

        ctx.strokeStyle = JMVC.string.replaceAll('hsla({h}, {s}%, {l}%, {a})',{
            h : self.options.color.hueZero,
            s : self.options.color.satZero * 100,
            l : self.options.color.lumZero * 100,
            a : self.options.color.alpZero
        }, {delim: ['{', '}']});
        ctx.lineJoin = ctx.lineCap = 'butt';

        var isDrawing, lastPoint;

        el.onmousedown = function(e) {
            isDrawing = true;
            lastPoint = { x: e.clientX, y: e.clientY };
        };

        el.onmousemove = function(e) {
            if (!isDrawing) return;

            ctx.lineWidth = self.options.linewidth.value;
            ctx.strokeStyle = self.options.color.value;

            ctx.beginPath();
            ctx.moveTo(lastPoint.x, lastPoint.y);
            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();

            ctx.moveTo(lastPoint.x - 5, lastPoint.y - 5);
            ctx.lineTo(e.clientX - 5, e.clientY - 5);
            ctx.stroke();

            lastPoint = { x: e.clientX, y: e.clientY };
        };

        el.onmouseup = function() {
            JMVC.canvas.Editor.undoredoManager.save();
            isDrawing = false;
        };
    },

    options : {
        linewidth : {
            value : 10,
            name : 'linewidth',
            type : 'int',
            min : 1,
            max : 250,
            step : 10
        },
        color : {
            value : '',
            hueZero : 1,
            satZero : 1,
            lumZero : 0,
            alpZero : 0.05,
            name : 'color',
            type : 'color'
        }
    }
});

