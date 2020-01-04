JMVC.require('core/screen/screen');

JMVC.canvas.Editor.getLayerManager = function (instance) {
    var self = instance,
        panel = new JMVC.canvas.Editor.Panel(),
        layers = [],
        activeLayer = null,
        activeLayerIndex = 0;
    return {
        init: function () {
            panel.html('layers');
        },
        panel: panel,

        getCurrent: function () { return activeLayer; },

        add: function () {
            var cnv = JMVC.dom.create('canvas', {
                    id: JMVC.util.uniqueid,
                    width: self.width,
                    height: self.height,
                    style: 'margin:0px; padding:0px; background-color:white;',
                    draggable: 'false',
                    onselectstart: 'return false;',
                    cursor: 'crosshair'
                }),
                ctx = cnv.getContext('2d'),
                l = {
                    id: JMVC.util.uniqueid,
                    cnv: cnv,
                    ctx: ctx,
                    opacity: 1
                };

            this.clean(l);
            layers.push(l);
            return this;
        },
        clean: function (l) {
            l.ctx.save();
            // l.ctx.width = l.ctx.width;
            l.ctx.fillStyle = '#fff'; // hsla(0,100%, 100%, 100)';
            l.ctx.fillRect(0, 0, self.width, self.height);
            window.setTimeout(function () { l.ctx.restore(); }, 100);
        },
        remove: function (index) {
            if (!(index < layers.length)) {
                throw new Error('Impossible to remove non existent layer indexed ' + index);
            }
            [].splice.call(layers, index, 1);
        },
        resize: function () {
            var sSize = JMVC.screen.getViewportSize(),
                tmpCnv,
                tmpCtx,
                i = 0,
                l = layers.length;
            self.width = sSize.width;
            self.height = sSize.height - 1;
            for (null; i < l; i++) {
                tmpCnv = document.createElement('canvas');
                tmpCtx = tmpCnv.getContext('2d');
                tmpCnv.width = layers[i].cnv.width;
                tmpCnv.height = layers[i].cnv.height;
                tmpCtx.drawImage(layers[i].cnv, 0, 0);

                layers[i].cnv.width = self.width;
                layers[i].cnv.height = self.height;

                layers[i].ctx.drawImage(tmpCnv, 0, 0);
            }
        },

        activate: function (index) {
            activeLayerIndex = index || 0;
            activeLayer = layers[activeLayerIndex];

            self.node.appendChild(activeLayer.cnv);
            JMVC.events.on(activeLayer.cnv, 'mousemove', function (e) { e.preventDefault(); });
        },

        createThumb: function (index, width, height) {
            var canvasOrig = layers[index],
                dataurl = canvasOrig.toDataURL('image/png'),
                canvasDest = JMVC.dom.create('canvas'),
                ctxDest = canvasDest.getContext('2d'),
                img = new Image(),
                w = width || 400,
                h = height || 300;

            img.onload = function () {
                canvasDest.width = w;
                canvasDest.height = h;
                ctxDest.drawImage(img, 0, 0, w, h);
            };
            img.src = dataurl;
            img.width = w;
            img.height = h;
            return img;
        },
        // getter / setter
        opacity: function () { },
        lock: function () { },
        unlock: function () { }
    };
};
