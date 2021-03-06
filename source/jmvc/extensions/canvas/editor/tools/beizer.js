JMVC.extend('canvas.editortools.beizer', {
    use: function (instance) {
        var self = this,
            el = instance.cnv,
            ctx = instance.ctx,
            isDrawing, points = [];

        el.onmousedown = el.onmousemove = el.onmouseup = null;

        function midPointBtw (p1, p2) {
            return {
                x: p1.x + (p2.x - p1.x) / 2,
                y: p1.y + (p2.y - p1.y) / 2
            };
        }
        ctx.lineWidth = self.options.size.value;
        ctx.strokeStyle = JMVC.string.replaceAll('hsla({h}, {s}%, {l}%, {a})', {
            h: self.options.color.hueZero,
            s: self.options.color.satZero * 100,
            l: self.options.color.lumZero * 100,
            a: self.options.color.alpZero
        }, { delim: ['{', '}'] });
        ctx.lineJoin = ctx.lineCap = 'round';

        el.onmousedown = function (e) {
            isDrawing = true;
            points.push({ x: e.clientX, y: e.clientY });
        };

        el.onmousemove = function (e) {
            if (!isDrawing) return;

            ctx.lineWidth = self.options.size.value;
            ctx.strokeStyle = self.options.color.value;
            points.push({ x: e.clientX, y: e.clientY });
            // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            var p1 = points[0],
                p2 = points[1],
                i = 1,
                len = points.length,
                midPoint;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);

            for (null; i < len; i++) {
                // we pick the point between pi+1 & pi+2 as the
                // end point and p1 as our control point
                midPoint = midPointBtw(p1, p2);
                ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
                p1 = points[i];
                p2 = points[i + 1];
            }
            // Draw last line as a straight line while
            // we wait for the next point to be able to calculate
            // the bezier control point
            ctx.lineTo(p1.x, p1.y);
            ctx.stroke();
        };

        el.onmouseup = function () {
            JMVC.canvas.Editor.undoredoManager.save();
            isDrawing = false;
            points.length = 0;
        };
    },

    options: {
        size: {
            value: 10,
            name: 'linewidth',
            type: 'int',
            min: 1,
            max: 250,
            step: 10
        },
        color: {
            value: '',
            hueZero: 1,
            satZero: 1,
            lumZero: 0,
            alpZero: 0.01,
            name: 'color',
            type: 'color'
        }
    }
});
