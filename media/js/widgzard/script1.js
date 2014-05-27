
JMVC.head.addStyle('/media/css/widgzard/sample1.css');

JMVC.core.widgzard.render({
    
    style : {paddingTop : '30px'},

    cb : function () {
        console.log('THE END');
        document.body.style.backgroundColor = 'gainsboro';
    },
    
    content : [
        {
            content : [
                {
                    html : 'tab one',
                    wid : 'tb1',
                    attrs : {'class':'tongue active respfixed'}
                },{
                    html : 'tab two',
                    wid : 'tb2',
                    attrs : {'class':'tongue respfixed'}
                },{
                    html : 'tab three',
                    wid : 'tb3',
                    attrs : {'class':'tongue respfixed'}
                },
                'clearer'
            ]
        },{
            attrs : {'class':'tab'},
            content : [
                {
                    html : 'one',
                    wid : 'cnt1'
                },{
                    style : {'display':'none'},
                    html : 'two',
                    wid : 'cnt2'
                },{
                    style : {'display':'none'},
                    html : 'three',
                    wid : 'cnt3'
                }
            ],
            cb : function () {
                var cnt1 = this.getNode('cnt1'),
                    cnt2 = this.getNode('cnt2'),
                    cnt3 = this.getNode('cnt3'),
                    tng1 = this.getNode('tb1'),
                    tng2 = this.getNode('tb2'),
                    tng3 = this.getNode('tb3');

                function hide (cnt, tng) {
                    cnt.style.display = 'none';
                    tng.className = 'tongue respfixed';
                }
                function show (cnt, tng) {
                    cnt.style.display = 'block';
                    tng.className = 'tongue active respfixed';
                }

                function hideall(){
                    hide(cnt1, tng1);
                    hide(cnt2, tng2);
                    hide(cnt3, tng3);
                }

                JMVC.events.bind(tng1, 'click', function () {
                    hideall();
                    show(cnt1, tng1);
                });

                JMVC.events.bind(tng2, 'click', function () {
                    hideall();
                    show(cnt2, tng2);
                });

                JMVC.events.bind(tng3, 'click', function () {
                    hideall();
                    show(cnt3, tng3);
                });

                this.done();
            }
        }
    ]
}, true);

