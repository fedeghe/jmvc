JMVC.canvas.Editor.getLayerManager = function (instance) {
    var self = instance,
        layers = [],
        activeLayer = null,
        activeLayerIndex = 0;
    return {
        getCurrent : function () {return activeLayer; },
        add : function () {
            var cnv = JMVC.dom.create('canvas', {
                    id : JMVC.util.uniqueid,
                    width : self.width,
                    height: self.height,
                    style : 'margin:0px; padding:0px; background-color:white;',
                    draggable : 'false',
                    onselectstart : 'return false;'
                }),
                ctx = cnv.getContext('2d'),
                l = {
                    id : JMVC.util.uniqueid,
                    cnv : cnv,
                    ctx : ctx
                };

            this.clean(l);
            layers.push(l);
            return this;
        },
        clean : function (l) {
            l.ctx.save();
            l.ctx.width = l.ctx.width;
            l.ctx.fillStyle = '#FFFFFF';
            l.ctx.fillRect(0, 0, self.width, self.height);
            l.ctx.restore();
        },
        remove : function (index) {
            if (!(index < layers.length)) {
                throw new Error('Impossible to remove non existent layer indexed ' + index);
            }
            [].splice.call(layers, index, 1);
        },
        activate : function (index) {
            activeLayerIndex = index || 0;
            activeLayer = layers[activeLayerIndex];
            self.node.appendChild(activeLayer.cnv);
            JMVC.events.bind(activeLayer.cnv, "mousemove", function (e) { e.preventDefault(); });
        },
        // getter / setter
        opacity : function () {},
        lock : function () {},
        unlock : function () {}
    };
};