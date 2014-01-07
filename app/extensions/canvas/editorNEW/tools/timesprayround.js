JMVC.extend('canvas.editortools.timesprayround', {
    use : function (instance) {
        var self = this,
            el = instance.cnv,
            ctx = instance.ctx,
            clientX, clientY, timeout,
            density = 50;

        

        function getRandomFloat(min, max) {
            return Math.random() * (max - min) + min;
        }

        el.onmousedown = function(e) {
            ctx.lineJoin = ctx.lineCap = 'round';
            clientX = e.clientX;
            clientY = e.clientY;

            timeout = setTimeout(function draw() {
                for (var i = density; i--; ) {
                    var angle = getRandomFloat(0, Math.PI*2);
                    var radius = getRandomFloat(0, 20);
                    ctx.fillRect(
                        clientX + radius * Math.cos(angle),
                        clientY + radius * Math.sin(angle), 
                        1, 1
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
