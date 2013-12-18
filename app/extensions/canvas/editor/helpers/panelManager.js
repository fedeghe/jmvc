JMVC.canvas.editor.panelManager = function (instance) {

    var self = instance,
        size_pos = {
            width : 300,
            height : self.height,
            topClosed : 30 - self.height,
            rightClosed : 30 - 300
        },
        template = '<div><h3>Tools</h3><ul id="panelTools"></ul><hr/><h4>Options</h4><ul id="toolOptions"></ul></div>';
    return {
        init : function () {
            
            JMVC.debug('Initializing panel');

            self.panel = JMVC.dom.create('div', {
                id : 'panel',
                style : JMVC.object.toStr({
                    position : 'absolute',
                    width : size_pos.width + 'px',
                    height : size_pos.height +'px',
                    top : size_pos.topClosed +'px',
                    right : size_pos.rightClosed + 'px'
                })
            }, template);
            return this;
        },

        render : function () {
            JMVC.debug('Rendering panel');

            JMVC.dom.append(self.node, self.panel);

            var dst = JMVC.dom.find('#panelTools');

            for (var i in JMVC.canvas.editor.tools) {
                var tmp = JMVC.dom.add(dst, 'li',{}, i);

                (function(el, tool){
                    JMVC.events.bind(el, 'click', function (){
                        JMVC.dom.removeClass(JMVC.dom.find('li', dst), 'active');

                        JMVC.dom.addClass(this, 'active');
                        self.changeTool(tool);

                    });
                })(tmp, JMVC.canvas.editor.tools[i]);
            }
            JMVC.dom.append(dst, JMVC.dom.clearer());
            return this;
        },

        bind : function () {
            JMVC.debug('Binding panel');
            
            self.changeTool(JMVC.canvas.editor.tools.neighbour_points);

            JMVC.events.bind(self.panel, 'mouseenter', self.panelManager.showPanel);
            JMVC.events.bind(self.panel, 'mouseleave', self.panelManager.hidePanel);
            return this;
        },

        showPanel : function () {
            JMVC.fx.animate(self.panel, 'top', 0, 100);
            JMVC.fx.animate(self.panel, 'right', 0, 100);
        },

        hidePanel : function () {
            JMVC.fx.animate(self.panel, 'top', size_pos.topClosed, 100);
            JMVC.fx.animate(self.panel, 'right', size_pos.rightClosed, 100);
        }
    }
};