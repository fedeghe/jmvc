JMVC.canvas.editor.layerManager = function (instance) {

    var self = instance,
        layers = [],
        activeLayer = null,
        activeLayerIndex = 0;

    return {
        getCurrent : function () {
            return activeLayer;
        },

        add : function () {
            var cnv = JMVC.dom.create('canvas', {
                id : JMVC.util.uniqueid,
                width : self.width,
                height: self.height,
                style : self.style,
                draggable : 'false',
                onselectstart : 'return false;'
            });
            layers.push({
                id : JMVC.util.uniqueid,
                cnv : cnv,
                ctx : cnv.getContext('2d')
            });
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

            JMVC.events.bind(activeLayer.cnv, "mousemove", function (e) { e.preventDefault(); });
        },
        // getter / setter
        opacity : function () {
            
        },
        lock : function () {
            
        },
        unlock : function () {
            
        }
    }
}