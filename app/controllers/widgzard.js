
// http://www.jmvc.dev/json2dom/index/draw/true

JMVC.require(
    'core/lib/border/border',
    'widget/snow/snow',
    'core/lorem'
);
JMVC.controllers.widgzard = function () {
    "use strict";

    var drawText = !JMVC.p.draw,
        link = drawText ?
            [JMVC.vars.baseurl, JMVC.c].join(JMVC.US)
            :
            [JMVC.vars.baseurl, JMVC.c, 'index', 'draw', 'true'].join(JMVC.US);
    
    function lorem(n) {
        return drawText ? JMVC.string.lorem(n) : '';
    }

    this.action_index = function (){
        JMVC.events.loadify(1000);
        JMVC.require(
            'core/lib/widgzard/widgzard',
            'core/dim/dim',
            'core/responsive/basic/basic'
        );
        JMVC.head.meta('generator', 'jmvc resident in your machine');

        document.body.className = 'resp';

        function getConfig() {
            return {
                cb : function (){
                    JMVC.dom.addClass(document.body, 'b960');
                    JMVC.debug('end RENDER MAIN');
                    console.debug(this.getNode('tree'))
                },
                content : [
                    {
                        attrs : {
                            id : 'head',
                            'class' : 'round12 roundtop pad5'
                        },
                        style : {
                            backgroundColor : '#ff0000',
                            marginTop : '5px'
                        },
                        html : '<h1>' + lorem(3) + '</h1>'
                        
                    }, {
                        attrs : {id : 'prova1', 'class' : 'p100 pad10 round8 roundbottomleft'},
                        style : {'backgroundColor' : 'hsla(0, 0%, 93.5%, 1)' /* #EEE */, 'float' : 'left'},
                        html : lorem(30)
                    }, {
                        attrs : {'id' : 'prova2', 'class' : 'p100'},
                        style : {'float' : 'left'},
                        content : [
                            {
                                attrs : {'id' : 'prova3', 'class' : 'p30'},
                                style : {'float' : 'left'},
                                sameHeight : true,
                                content : [
                                    {
                                        tag : 'style',
                                        html : '.tongue{'+
                                                'border-bottom:1px solid #ccc;'+
                                                'background-color:#aaa;'+
                                                'padding:5px;'+
                                                'margin-right:5px;'+
                                                'cursor:pointer}'+
                                            '.tongue.active{'+
                                                'border-bottom:1px solid #fff;'+
                                                'background-color:white;'+
                                                'cursor:default'+
                                            '}'+
                                            '.tongue:hover{'+
                                                'background-color:#ddd'+
                                            '}'+
                                            '.tongue.active:hover{'+
                                                'background-color:white'+
                                            '}'+
                                            '.cnt{'+
                                                'background-color:white;'+
                                                'padding:5px'+
                                            '}'
                                    },
                                    {
                                        style : {
                                            marginTop : '5px',
                                            backgroundColor : 'green'
                                        },
                                        attrs : {'class' : 'pad10 round8'},
                                        content : [{
                                            content : [{
                                                wid : 'tb1',
                                                attrs : {'class':'tongue round8 roundtop active'},
                                                html : drawText ? lorem(1) : '',
                                                style : {'float':'left'}
                                            }, {
                                                wid : 'tb2',
                                                attrs : {'class':'tongue round8 roundtop'},
                                                html : drawText ? lorem(2).split(/\s/).pop() : '',
                                                style : {'float':'left'}
                                            }, {
                                                wid : 'tb3', 
                                                attrs : {'class':'tongue round8 roundtop'},
                                                html : drawText ? lorem(3).split(/\s/).pop() : '',
                                                style : {'float':'left'}
                                            },
                                            'clearer'
                                        ]}, {
                                            attrs : {'class':'cnt round8 roundnotopleft'},
                                            content : [{
                                                content : [{
                                                    wid : 'cnt1',
                                                    html : lorem(50)
                                                }, {
                                                    wid : 'cnt2',
                                                    style : {display : 'none'},
                                                    html : lorem(100)
                                                }, {
                                                    wid : 'cnt3',
                                                    style : {display : 'none'},
                                                    html : lorem()
                                                }]    
                                            }]
                                        }],
                                        cb : function () {
                                            var tb1 = this.getNode('tb1'),
                                                tb2 = this.getNode('tb2'),
                                                tb3 = this.getNode('tb3'),
                                                cnt1 = this.getNode('cnt1'),
                                                cnt2 = this.getNode('cnt2'),
                                                cnt3 = this.getNode('cnt3');
                                            function clear() {
                                                cnt1.style.display = 'none';
                                                cnt2.style.display = 'none';
                                                cnt3.style.display = 'none';
                                                JMVC.dom.removeClass(tb1, 'active');
                                                JMVC.dom.removeClass(tb2, 'active');
                                                JMVC.dom.removeClass(tb3, 'active');
                                            }
                                            JMVC.events.bind(tb1, 'click', function () {
                                                clear();
                                                JMVC.dom.addClass(tb1, 'active');
                                                cnt1.style.display = '';
                                            });
                                            JMVC.events.bind(tb2, 'click', function () {
                                                clear();
                                                JMVC.dom.addClass(tb2, 'active');
                                                cnt2.style.display = '';
                                            });
                                            JMVC.events.bind(tb3, 'click', function () {
                                                clear();
                                                JMVC.dom.addClass(tb3, 'active');
                                                cnt3.style.display = '';
                                            });

                                            this.done();
                                        }
                                    }, {
                                        style : {
                                            marginTop : '5px',
                                            backgroundColor : 'green'
                                        },
                                        attrs : {'class' : 'pad10 round8'},
                                        html : lorem(50)
                                    }, {
                                        style : {
                                            margin : '5px 0px',
                                            backgroundColor : 'green'
                                        },
                                        attrs : {'class' : 'pad10 round8'},
                                        html : lorem(70)
                                    }
                                ]
                            }, {
                                attrs : {id : 'prova4', 'class' : 'p50'},
                                style : {'float' : 'left'},
                                content : [
                                    {
                                        style : {
                                            backgroundColor : 'red',
                                            margin : '5px',
                                            marginBottom : '0px'
                                        },
                                        attrs : {'class' : 'pad10 round8'},
                                        html : lorem(50)
                                    }, {
                                        style : {
                                            backgroundColor : 'red',
                                            margin : '5px',
                                            marginBottom : '0px'
                                        },
                                        attrs : {'class' : 'pad10 round8'},
                                        html : lorem(30)
                                    }, {
                                        style : {margin : '5px'},
                                        content : [
                                            {
                                                style : {'float' : 'left',width:'33.3%'},
                                                content : [{
                                                    style : {backgroundColor : '#777', marginRight:'5px'},
                                                    attrs : {'class' : 'round8 pad10'},
                                                    html : lorem(60)
                                                }]
                                            }, {
                                                style : {'float' : 'left',width:'33.3%'},
                                                content : [{
                                                    style : {backgroundColor : '#999', marginRight:'5px'},
                                                    attrs : {'class' : 'round8 pad10'},
                                                    html : lorem(40)
                                                }]
                                            }, {
                                                style : {'float' : 'left',width:'33.3%'},
                                                content : [{
                                                    style : {backgroundColor : '#bbb'},
                                                    attrs : {'class' : 'round8 pad10'},
                                                    html : lorem(20)
                                                }]
                                            },
                                            'clearer'
                                        ]
                                    }
                                ]
                            }, {
                                attrs : { 'class' : 'p20 pad10'},
                                style : {
                                    'float' : 'left',
                                    minHeight : '140px',
                                    backgroundColor : '#eee'
                                },
                                html : lorem()

                            },
                            'clearer'
                        ]
                    },
                    'clearer',
                    {
                        wid : 'tree',
                        attrs : {id : 'prova5'},
                        sameHeight : true,
                        content : [
                            {
                                attrs : {id : 'brd1', 'class' : 'p25 round12 roundleft pad5'},
                                style : {'float' : 'left',backgroundColor : '#eee'},
                                html : lorem(10)
                            }, {
                                attrs : {id : 'brd2', 'class' : 'p50 pad5'},
                                style : {'float' : 'left',backgroundColor : '#eee'},
                                html : lorem(20)
                            }, {
                                attrs : {id : 'brd3', 'class' : 'p25 round12 roundbottomright pad5'},
                                style : {'float' : 'left',backgroundColor : '#eee'},
                                html : lorem(10)
                            },
                            'clearer'
                        ]

                    },
                    'clearer',
                    {
                        attrs : {'id' : 'prova6', 'class':'round8'},
                        style : {backgroundColor : 'gainsboro', margin : '5px 0px'},
                        content : [{
                            html : 'gainsboro',
                            style : {padding : '10px', fontSize:'10px'}
                        }],
                        wid : 'footer',
                        cb : another
                    },
                    {
                        //target: document.body,
                        style:{position:'absolute', top:'0px', left:'5px', color:'white'},
                        content : [{
                            
                            tag : 'span',
                            style : {cursor:'pointer', color:'white', textDecoration : 'none', fontFamily: 'verdana', fontSize:'10px'},
                            html : drawText ? 'hide text' : 'show text'
                        }]
                        ,cb : toggleText
                    }
                ]
            };
        }

        function another () {
            var self = this,
                footer = self.getNode('footer');

            JMVC.core.widgzard.render({
                cb : function () {
                    self.done(); // this is the root resolve ande resolves 'another'
                },
                content : [{
                    tag : 'p',
                    html : drawText ? 'WTF license ' + (new Date).getFullYear() : '',
                    style : {
                        fontSize:'10px',
                        lineHeight:'10px',
                        padding:'5px',
                        color: 'red',
                        fontWeight:'bold'
                    },
                    cb : function () { JMVC.debug('inner 1'); this.done();}
                }]
            }, footer);
            
        }

        function toggleText (){
            
            JMVC.events.one(this, 'click', function () {
                drawText = !drawText;
                JMVC.core.widgzard.render(getConfig(), JMVC.dom.find('#extralogo'));
            });
            
           this.done();
        }

        JMVC.getView('vacuum')
            .set({
                'style' : 'font-family:verdana;',
                'id' : 'extralogo'
            }).render(function () {
                JMVC.css.style(JMVC.dom.body(), 'backgroundColor', '#444');
                JMVC.core.widgzard.render(getConfig(), JMVC.dom.find('#extralogo'));
            });
    };




};