//
// for filters
JMVC.require('core/lib/image/image');

JMVC.canvas.Editor.getFilterManager = function (instance) {
    var self = instance,
        panel = new JMVC.canvas.Editor.Panel(),
        getFilter = function () {
            var layer = instance.panelManager.getLayerManager().getCurrent(),
                flt = JMVC.image.createFilter(layer.cnv);
            
            flt.setBeforeFilter(function () {
                JMVC.canvas.Editor.Spinner.show();
            });

            flt.setAfterFilter(function () {
                JMVC.canvas.Editor.Spinner.hide();
            });

            return flt;
        },
        filter,
        filters,
        list = false;

    return {
        //
        panel : panel,
        //
        init : function () {
            panel.html('filters');
            filter = getFilter();
            filters = filter.filters;
            list = JMVC.dom.create('ul', {'class' : 'effectlist'});

            for (var l in filters) {
                var el = JMVC.dom.add(list, 'li', {'class':'effect round'}, l);
                (function (eff, flt) {
                    JMVC.events.bind(eff, 'click', function () {
                        
                        filter.prepare();
                        filter.filterImage(flt);
                        filter.replace();

                        //save status 
                        JMVC.canvas.Editor.undoredoManager.save();
                        
                    });
                })(el, filters[l]);
            }
        },
        //
        // 
        render : function () {
            !!list && JMVC.dom.append(this.panel.getInnerNode(), list);
        }
    };
};
/**
var flt = JMVC.image.createFilter(JMVC.dom.find('#JMVCID2'));

flt.filterImage(flt.filters.laplace);
flt.replace();

 */