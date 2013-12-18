JMVC.extend('canvas.editor.tools.neighbour_points', {

    use : function (instance) {

        var self = this,
            el = instance.cnv,
            ctx = instance.ctx,
            len = 0;

        el.onmousedown = el.onmousemove = el.onmousemove = null;

        ctx.lineWidth = 1;
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.strokeStyle = self.options.color.value;
        

        var isDrawing, points = [ ];

        el.onmousedown = function(e) {
            points = [ ];
            isDrawing = true;
            points.push({ x: e.clientX, y: e.clientY });
        };

        el.onmousemove = function(e) {
            if (!isDrawing) return;
            ctx.strokeStyle = self.options.color.value;

            //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            points.push({ x: e.clientX, y: e.clientY });

            len = points.length;

            ctx.beginPath();
            ctx.moveTo(points[len - 2].x, points[len - 2].y);
            ctx.lineTo(points[len - 1].x, points[len - 1].y);
            ctx.stroke();

            for (var i = 0, len = len; i < len; i++) {
                dx = points[i].x - points[len-1].x;
                dy = points[i].y - points[len-1].y;
                d = dx * dx + dy * dy;

                if (d < self.options.distance.value) {
                    ctx.beginPath();
                    
                    ctx.moveTo( points[len-1].x + (dx * 0.2), points[len-1].y + (dy * 0.2));
                    ctx.lineTo( points[i].x - (dx * 0.2), points[i].y - (dy * 0.2));
                    ctx.stroke();
                }
            }
        };

        el.onmouseup = function() {
            isDrawing = false;
            points.length = 0;
        };


    },
    options : {
        distance : {
            value : 1000,
            name : 'distance',
            type : 'int'

        },
        color : {
            value : 'rgba(255,0,0,0.1)',
            name : 'color',
            type : 'color'
        }

    }
});




