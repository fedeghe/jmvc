JMVC.extend('canvas.editortools.fur_neighbour', {

    use : function (instance) {

        var self = this,
            el = instance.cnv,
            ctx = instance.ctx,
            clientX, clientY, timeout,
            density = 40,
            radius = self.options.radius.value;

        el.onmousedown = el.onmousemove = el.onmouseup = null;

        //ctx.fillStyle = self.options.color.value;
        ctx.strokeStyle = 'hsla('+self.options.color.hueZero+', ' + (self.options.color.satZero * 100) + '% ,' + (self.options.color.lumZero * 100) + '%, ' + (self.options.color.alpZero) + ')'; 

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

            radius = self.options.radius.value;

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

                if (d < radius && Math.random() > d / radius) {
                    ctx.beginPath();
                    ctx.strokeStyle = self.options.color.value;

                    ctx.moveTo( points[points.length-1].x + (dx * 0.5), points[points.length-1].y + (dy * 0.5));
                    ctx.lineTo( points[points.length-1].x - (dx * 0.5), points[points.length-1].y - (dy * 0.5));
                    ctx.stroke();
                }
            }
        };

        el.onmouseup = function() {
            JMVC.canvas.Editor.undoredoManager.save();
            isDrawing = false;
            points.length = 0;
        };
        
    },

    
    options : {
        radius : {
            name : 'radius',
            type : 'int',
            value : 2000,
            min : 1000,
            max : 100000,
            step : 100
        },
        color : {
            value : '',
            hueZero : 1,
            satZero : 1,
            lumZero : 0.5,

            alpZero : 0.1,

            name : 'color',
            type : 'color'
        },
        width : {
            name : 'width',
            type : 'int'
        }

    }
});








