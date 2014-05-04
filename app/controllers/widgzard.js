
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
                },
                content : [
                    {
                        attrs : {
                            id : 'head',
                            'class' : 'round12 roundtop pad5'
                        },
                        style : {
                            backgroundColor : 'hsla(360, 80%, 50%, 1)',
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
                                content : [
                                    {
                                        style : {
                                            marginTop : '5px',
                                            backgroundColor : 'green'
                                        },
                                        attrs : {'class' : 'pad10 round8'},
                                        html : lorem(30)
                                    }, {
                                        style : {
                                            marginTop : '5px',
                                            backgroundColor : 'green'
                                        },
                                        attrs : {'class' : 'pad10 round8'},
                                        html : lorem(30),
                                        cb : function () {
                                            //this.resolve();
                                            
                                            var p = this;
                                            setTimeout(function () {
                                                JMVC.debug(2)
                                                p.done();
                                            }, 500);
                                            
                                        }
                                    }, {
                                        style : {
                                            marginTop : '5px',
                                            backgroundColor : 'green'
                                        },
                                        attrs : {'class' : 'pad10 round8'},
                                        html : lorem(30),
                                        cb : function () {
                                            //this.resolve();
                                            
                                            var p = this;
                                            setTimeout(function () {
                                                JMVC.debug(3)
                                                p.done();
                                            }, 1000);
                                            
                                        }
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
                        attrs : {id : 'prova5'},
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
                        grindID : 'footer',
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