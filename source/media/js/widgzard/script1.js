
JMVC.head.addStyle('/media/css/widgzard/sample1.css');

JMVC.core.widgzard.render({
    style: { paddingTop: '30px' },
    cb: function () {
        console.log('THE END');
        document.body.style.backgroundColor = 'gainsboro';
    },
    content: [{
        content: [{
            tag: 'button',
            html: 'back',
            cb: function () {
                var self = this;
                JMVC.events.on(self.node, 'click', function () {
                    JMVC.head.goto('widgzard', 'sample');
                });
                this.done();
            }
        }]
    }, {
        content: [
            {
                html: 'tab one',
                wid: 'tb1',
                attrs: { 'class': 'tongue active respfixed' }
            }, {
                html: 'tab two',
                wid: 'tb2',
                attrs: { 'class': 'tongue respfixed' }
            }, {
                html: 'tab three',
                wid: 'tb3',
                attrs: { 'class': 'tongue respfixed' }
            },
            'clearer'
        ]
    }, {
        attrs: { 'class': 'tab' },
        content: [
            {
                html: 'one',
                wid: 'cnt1'
            }, {
                style: { 'display': 'none' },
                html: 'two',
                wid: 'cnt2'
            }, {
                style: { 'display': 'none' },
                html: 'three',
                wid: 'cnt3'
            }
        ],
        cb: function () {
            var cnt1 = this.getNode('cnt1').node,
                cnt2 = this.getNode('cnt2').node,
                cnt3 = this.getNode('cnt3').node,
                tng1 = this.getNode('tb1').node,
                tng2 = this.getNode('tb2').node,
                tng3 = this.getNode('tb3').node;

            function hide(cnt, tng) {
                cnt.style.display = 'none';
                tng.className = 'tongue respfixed';
            }
            function show(cnt, tng) {
                cnt.style.display = 'block';
                tng.className = 'tongue active respfixed';
            }

            function hideall() {
                hide(cnt1, tng1);
                hide(cnt2, tng2);
                hide(cnt3, tng3);
            }
            JMVC.events.on(tng1, 'click', function () {
                hideall();
                show(cnt1, tng1);
            });
            JMVC.events.on(tng2, 'click', function () {
                hideall();
                show(cnt2, tng2);
            });
            JMVC.events.on(tng3, 'click', function () {
                hideall();
                show(cnt3, tng3);
            });
            this.done();
        }
    }]
}, true);
