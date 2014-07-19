JMVC.extend('canvas.editortools.timesprayround', {
    use : function (instance) {
        var self = this,
            el = instance.cnv,
            ctx = instance.ctx,
            clientX, clientY, timeout,
            density = parseInt(self.options.density.value, 10);

        el.onmousedown = el.onmousemove = el.onmouseup = null;

        function getRandomFloat(min, max) {
            return Math.random() * (max - min) + min;
        }

        el.onmousedown = function(e) {
            density = parseInt(self.options.density.value, 10);
            ctx.fillStyle = self.options.color.value;
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
            JMVC.canvas.Editor.undoredoManager.save();
            clearTimeout(timeout);
        };  
    },

    
    options : {
        radius : {
            value : 20,
            name : 'radius',
            type : 'int',
            min : 5,
            max : 1000,
            step : 5
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
        pressure : {
            name : 'pressure',
            type : 'int'
        },
        density : {
            name : 'density',
            type : 'int',
            value : 50,
            min : 1,
            max : 1000,
            step : 10
        }

    }
});
