JMVC.extend('canvas.editor.tools.fur_neighbour', {
    use : function (instance) {
        var self = this,
            el = instance.cnv,
            ctx = instance.ctx,
            clientX, clientY, timeout,
            density = 40;

        el.onmousedown = el.onmousemove = el.onmousemove = null;

        ctx.fillStyle = self.options.color.value;

        





        ctx.lineWidth = 1;
        ctx.lineJoin = ctx.lineCap = 'round';

        var isDrawing, points = [ ];

        el.onmousedown = function(e) {
            points = [ ];
            isDrawing = true;
            points.push({ x: e.clientX, y: e.clientY });
        };

        el.onmousemove = function(e) {
            if (!isDrawing) return;

            //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            points.push({ x: e.clientX, y: e.clientY });

            ctx.beginPath();
            ctx.moveTo(points[points.length - 2].x, points[points.length - 2].y);
            ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
            ctx.stroke();

            for (var i = 0, len = points.length; i < len; i++) {
                dx = points[i].x - points[points.length-1].x;
                dy = points[i].y - points[points.length-1].y;
                d = dx * dx + dy * dy;

                if (d < 2000 && Math.random() > d / 2000) {
                    ctx.beginPath();
                    ctx.strokeStyle = self.options.color.value;
                    ctx.moveTo( points[points.length-1].x + (dx * 0.5), points[points.length-1].y + (dy * 0.5));
                    ctx.lineTo( points[points.length-1].x - (dx * 0.5), points[points.length-1].y - (dy * 0.5));
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
        radius : {
            name : 'radius',
            type : 'int'
        },
        color : {
            value : 'rgba(0, 255, 0, 0.1)',
            name : 'color',
            type : 'color'
        },
        pressure : {
            name : 'pressure',
            type : 'int'
        },
        density : {
            name : 'density',
            type : 'int'
        }

    }
});








