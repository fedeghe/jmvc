JMVC.extend('canvas.editortools.timespray', {
    use : function (instance) {
        var self = this,
            el = instance.cnv,
            ctx = instance.ctx,
            clientX, clientY, timeout,
            density = parseInt(self.options.density.value, 10),
            tout = 50;


        ctx.fillStyle = self.options.color.value;

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        el.onmousedown = function(e) {

            ctx.fillStyle = self.options.color.value;
            density = parseInt(self.options.density.value, 10);

            ctx.lineJoin = ctx.lineCap = 'round';
            clientX = e.clientX;
            clientY = e.clientY;

            timeout = setTimeout(function draw() {
                for (var i = density; i--; ) {
                    var radius = self.options.radius.value;
                    var offsetX = getRandomInt(-radius, radius);
                    var offsetY = getRandomInt(-radius, radius);
                    if (offsetX * offsetX + offsetY * offsetY < radius * radius) {
                        ctx.fillRect(clientX + offsetX, clientY + offsetY, 1, 1);
                    }
                }
                if (!timeout) return;
                timeout = setTimeout(draw, tout);
            }, tout);
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
            value : 20
        },
        color : {
            value : '',

            hueZero : 1,
            satZero : 1,
            lumZero : 0.5,

            alpZero : 0.5,

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
            value : 50 
        }
    }
});
