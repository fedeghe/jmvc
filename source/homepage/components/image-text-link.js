// eslint-disable-next-line no-unused-vars
var ___ = {
    tag: 'li',
    style: {
        height: 'inherit',
        width: '100%',
        backgroundColor: '#PARAM{bgcolor|white}'
    },
    attrs: { 'class': 'round8' },
    content: [{
        attrs: {
            'class': 'innerwrap'
        },
        style: {
            height: 'inherit',
            width: '100%'
        },
        content: [{
            tag: 'h5',
            html: '#PARAM{text}'
        }, {
            tag: 'a',
            attrs: {
                href: '#PARAM{link}',
                target: '_blank'
            },
            content: [{
                tag: 'img',
                attrs: {
                    src: '#PARAM{imageUrl}'
                },
                style: {
                    width: '100%',
                    paddingTop: '20px'
                },
                cb: function () {
                    var self = this;
                    self.node.onload = function () {
                        self.done();
                    };
                }
            }],
            cb: function () {
                this.node.addEventListener('click', function () {
                    this.blur();
                }, false);
                this.done();
            }
        }]
    }]
};
