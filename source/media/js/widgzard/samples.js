JMVC.core.widgzard.render({
    target: document.getElementById('getsamples'),
    // style : {padding : '20px'},
    content: [{
        style: { padding: '10px', position: 'relative' },
        html: 'Some samples',
        content: [{
            style: {
                position: 'absolute',
                right: '0px',
                top: '0px',
                width: '15px',
                height: '15px',
                lineHeight: '11px',
                fontSize: '10px',
                fontWeight: 'bold',
                backgroundColor: '#fff',
                color: '#888',
                margin: '10px',
                textAlign: 'center',
                cursor: 'pointer',
                overflow: 'hidden'
            },
            attrs: { 'class': 'round respfixed' },
            html: 'x',
            cb: function () {
                JMVC.events.on(this.node, 'click', function () {
                    JMVC.core.widgzard.load('/media/js/widgzard/samplesback.js');
                });
                this.done();
            }
        }]
    }, {
        tag: 'ul',
        style: { padding: '10px' },
        content: [
            {
                tag: 'li',
                content: [{
                    tag: 'a',
                    attrs: { href: 'javascript:;', 'class': 'round' },
                    content: [{
                        tag: 'span',
                        html: '&#9758;',
                        style: { fontSize: '30px', position: 'relative', top: '5px' }
                    }, {
                        tag: 'span',
                        style: { paddingLeft: '5px' },
                        html: 'tabs'
                    }],

                    cb: function () {
                        JMVC.events.on(this.node, 'click', function () {
                            JMVC.core.widgzard.load('/media/js/widgzard/script1.js');
                        });
                        this.done();
                    }
                }]
            }, {
                tag: 'li',
                content: [{
                    tag: 'a',
                    attrs: { href: 'javascript:;', 'class': 'round' },
                    content: [{
                        tag: 'span',
                        html: '&#9758;',
                        style: { fontSize: '30px', position: 'relative', top: '5px' }
                    }, {
                        tag: 'span',
                        style: { paddingLeft: '5px' },
                        html: '3Maps'
                    }],
                    cb: function () {
                        JMVC.events.on(this.node, 'click', function () {
                            JMVC.core.widgzard.load('/media/js/widgzard/script2.js');
                        });
                        this.done();
                    }
                }]
            }, {
                tag: 'li',
                content: [{
                    tag: 'a',
                    attrs: { href: 'javascript:;', 'class': 'round' },
                    content: [{
                        tag: 'span',
                        html: '&#9758;',
                        style: { fontSize: '30px', position: 'relative', top: '5px' }
                    }, {
                        tag: 'span',
                        style: { paddingLeft: '5px' },
                        html: 'chessboard'
                    }],
                    cb: function () {
                        JMVC.events.on(this.node, 'click', function () {
                            JMVC.core.widgzard.load('/media/js/widgzard/script3.js');
                        });
                        this.done();
                    }
                }]
            }
        ]
    }]
}, true);
