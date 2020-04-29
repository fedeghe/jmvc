// eslint-disable-next-line no-unused-vars
var ___ = {
    data: {
        appendMode: true
    },
    content: [{
        style: {
            position: 'absolute',
            margin: '0 auto',
            height: '80%',
            width: '80%',
            left: '10%',
            top: '10%',
            zIndex: 900,
            backgroundColor: 'white'
        },
        attrs: {
            'class': 'round10'
        },
        content: [{
            html: '#PARAM{html}',
            style: {
                padding: '10px'
            }
        }, {
            html: 'x',
            style: {
                color: 'white',
                position: 'absolute',
                backgroundColor: '#555',
                width: '20px',
                height: '20px',
                lineHeight: '16px',
                left: '-10px',
                top: '-10px',
                fontSize: '17px',
                cursor: 'pointer',
                textAlign: 'center'
            },
            attrs: {
                'class': 'round10'
            },
            cb: function () {
                var self = this;
                JMVC.events.on(self.node, 'click', function () {
                    JMVC.dom.remove(self.parent.node);
                });
                self.done();
            }
        }
        ]
    }]
};
