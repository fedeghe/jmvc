JMVC.extend('canvas.editor.tools.timespray', {
    use : function (instance) {
        var self = this,
            el = instance.cnv,
            ctx = instance.ctx,
            clientX, clientY, timeout,
            density = 50;

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        el.onmousedown = function(e) {

            ctx.fillStyle = self.options.color.value;

            ctx.lineJoin = ctx.lineCap = 'round';
            clientX = e.clientX;
            clientY = e.clientY;

            timeout = setTimeout(function draw() {
                for (var i = density; i--; ) {
                    var radius = 30;
                    var offsetX = getRandomInt(-radius, radius);
                    var offsetY = getRandomInt(-radius, radius);
                    if (offsetX * offsetX + offsetY * offsetY < radius * radius) {
                        ctx.fillRect(clientX + offsetX, clientY + offsetY, 1, 1);
                    }
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
            type : 'int'
        },
        color : {
            value : 'rgba(0, 0, 0, 0.5)',
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
