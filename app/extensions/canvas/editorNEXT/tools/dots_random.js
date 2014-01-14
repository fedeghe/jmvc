JMVC.extend('canvas.editortools.dots_random', {
    use : function (instance) {
        var self = this,
            el = instance.cnv,
            ctx = instance.ctx,
            clientX, clientY, timeout,
            density = 40;

        el.onmousedown = el.onmousemove = el.onmousemove = null;

        ctx.fillStyle = self.options.color.value;

        function getRandomFloat(min, max) {
            return Math.random() * (max - min) + min;
        }

        el.onmousedown = function (e) {

            ctx.fillStyle = self.options.color.value;

            ctx.lineJoin = ctx.lineCap = 'round';
            clientX = e.clientX;
            clientY = e.clientY;

            timeout = setTimeout(function draw() {
                for (var i = density; i--; ) {
                    var angle = getRandomFloat(0, Math.PI * 2),
                        radius = getRandomFloat(0, self.options.radius.value);
                    ctx.globalAlpha = Math.random();
                    ctx.fillRect(
                        clientX + radius * Math.cos(angle),
                        clientY + radius * Math.sin(angle), 
                        getRandomFloat(1, 2),
                        getRandomFloat(1, 2)
                    );
                }
                if (!timeout) return;
                timeout = setTimeout(draw, 50);
            }, 50);
        };

        el.onmousemove = function(e) {
            clientX = e.clientX;
            clientY = e.clientY;
        };

        el.onmouseup = function() {
            clearTimeout(timeout);
        };
    },

    
    options : {
        radius : {
            name : 'radius',
            type : 'int',
            value : 30
        },
        color : {
            value : 'rgba(0, 0, 255, 1)',
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