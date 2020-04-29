JMVC.canvas.Editor.getFileManager = function (instance) {
    var W = instance.width,
        H = instance.height,
        created = false,
        visible = false,
        panel = null,
        mup = {
            content: [{
                wid: 'modalPanel',
                style: {
                    position: 'absolute',
                    left: W / 4 + 'px',
                    top: H / 4 + 'px',
                    width: W / 2 + 'px',
                    height: H / 2 + 'px'
                },
                attrs: { 'class': 'modalPanel round', 'id': 'xxxxxxxxxxxxxxx' },
                content: [{
                    tag: 'p',
                    attrs: { 'class': 'modalHeader group' },
                    content: [{
                        style: { float: 'left' },
                        html: 'File Manager'
                    }, {
                        style: { float: 'right' },
                        attrs: { 'class': 'pointer', 'data-action': 'close' },
                        html: 'X',
                        cb: function () {
                            var self = this;
                            JMVC.events.on(self.node, 'click', function () {
                                panel = self.getNode('modalPanel').node;
                                JMVC.css.style(panel, 'display', 'none');
                                visible = false;
                            });
                            self.done();
                        }
                    }]
                }, {
                    html: 'content',
                    style: { padding: '10px' }
                }
                ]
            }]
        };

    return {
        init: function () {
            console.debug('initilized');
        },
        open: function () {
            if (visible) {
                return false;
            }
            if (created) {
                JMVC.css.style(panel, 'display', 'block');
            } else {
                visible = created = true;
                JMVC.core.widgzard.render(mup);
            }
        },
        save: function () {
            // pubsave();
        },
        load: function () {
            // pubload();
        }
    };
};
