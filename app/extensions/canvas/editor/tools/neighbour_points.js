JMVC.extend('canvas.editortools.neighbour_points', {

    use : function (instance) {

        var self = this,
            el = instance.cnv,
            ctx = instance.ctx,
            len = 0,
            dis = 0.2;

        el.onmousedown = el.onmousemove = el.onmousemove = null;

        ctx.lineWidth = 1;
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.strokeStyle = JMVC.string.replaceall('hsla({h}, {s}%, {l}%, {a})',{
            h : self.options.color.hueZero,
            s : self.options.color.satZero * 100,
            l : self.options.color.lumZero * 100,
            a : self.options.color.alpZero
        }, '{', '}');
        
        var isDrawing, points = [ ];

        el.onmousedown = function(e) {
            points = [ ];
            isDrawing = true;
            points.push({ x: e.clientX, y: e.clientY });
        };

        el.onmousemove = function(e) {

            if (!isDrawing) return;
            ctx.strokeStyle = self.options.color.value;

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
                    ctx.moveTo( points[len-1].x + (dx * dis), points[len-1].y + (dy * dis));
                    ctx.lineTo( points[i].x - (dx * dis), points[i].y - (dy * dis));
                    ctx.stroke();
                }
            }
        };

        el.onmouseup = function () {
            isDrawing = false;
            points.length = 0;
        };
    },

    options : {
        distance : {
            value : 1000,
            name : 'distance',
            type : 'int',
            min : 500,
            max : 100000,
            step : 10
        },
        color : {
            value : '',
            hueZero : 1,
            satZero : 1,
            lumZero : 0,
            alpZero : 0.1,
            name : 'color',
            type : 'color'
        }

    }
});




