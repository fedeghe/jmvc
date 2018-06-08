JMVC.extend('canvas.editortools.timespray', {
    use : function (instance) {
        var self = this,
            el = instance.cnv,
            ctx = instance.ctx,
            clientX, clientY, timeout,
            density = self.options.density.value,
            tout = 50,
            radius = self.options.radius.value;

        el.onmousedown = el.onmousemove = el.onmouseup = null;


        ctx.fillStyle =  JMVC.string.replaceAll('hsla({h}, {s}%, {l}%, {a})',{
            h : self.options.color.hueZero,
            s : self.options.color.satZero * 100,
            l : self.options.color.lumZero * 100,
            a : self.options.color.alpZero
        }, {delim:['{', '}']});

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        el.onmousedown = function(e) {

ctx.fillStyle = self.options.color.value;

            //ctx.fillStyle = 'hsla('+self.options.color.hueZero+', ' + (self.options.color.satZero * 100) + '% ,' + (self.options.color.lumZero * 100) + '%, ' + (self.options.color.alpZero) + ')'; 
            
            density = self.options.density.value;

            ctx.lineJoin = ctx.lineCap = 'round';
            clientX = e.clientX;
            clientY = e.clientY;

            timeout = setTimeout(function draw() {
                for (var i = density; i--; ) {
                    radius = self.options.radius.value;
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
            //clearTimeout(timeout);
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
            min : 1,
            max : 100,
            step : 1
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
            value : 10,
            min : 5,
            max : 200,
            step : 5
        }
    }
});
