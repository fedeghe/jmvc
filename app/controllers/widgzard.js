
// http://www.jmvc.dev/json2dom/index/draw/true

JMVC.require(
    'core/lib/border/border',
    'widget/snow/snow',
    'core/lorem'
    //,'core/captcha/captcha'
    //,'vendors/dropbox/dropbox'
);
JMVC.controllers.widgzard = function () {
    "use strict";

    JMVC.css.autoHeadings();

    var drawText = !JMVC.p.draw,
        link = drawText ?
            [JMVC.vars.baseurl, JMVC.c].join(JMVC.US)
            :
            [JMVC.vars.baseurl, JMVC.c, 'index', 'draw', 'true'].join(JMVC.US);
    
    function lorem(n) {
        return drawText ? JMVC.string.lorem(n) : '';
    }


    // this.before = function () {
    //     JMVC.debug('before');
    // };

    // this.after = function () {
    //     JMVC.debug('after');
    // };

    /**
     * [action_index description]
     * @return {[type]} [description]
     */
    this.action_index = function (){
        
        JMVC.events.loadify(1000);

        JMVC.require(
            'core/lib/widgzard/widgzard'
            ,'core/screen/screen'
            ,'core/captcha/captcha'
        );

        JMVC.css.autoHeadings();

        JMVC.css.beResponsive();

        function getConfig() {
            return {
                target : JMVC.dom.find('#extralogo'),
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
                                            '.tongue:hover{background-color:#ddd}'+
                                            '.tongue.active:hover{background-color:white}'+
                                            '.cnt{background-color:white;padding:5px}'
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
                                                attrs : {'class':'tongue round8 roundtop active respfixed'},
                                                html : drawText ? lorem(1) : '',
                                                style : {'float':'left'}
                                            }, {
                                                wid : 'tb2',
                                                attrs : {'class':'tongue round8 roundtop respfixed'},
                                                html : drawText ? lorem(2).split(/\s/).pop() : '',
                                                style : {'float':'left'}
                                            }, {
                                                wid : 'tb3',
                                                attrs : {'class':'tongue round8 roundtop respfixed'},
                                                html : drawText ? 'Cptch' : '',
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
                                                    cb : drawText ? doCaptcha : function () {this.done(); }
                                                }]    
                                            }]
                                        }],
                                        cb : function () {
                                            var tb1 = this.getNode('tb1').node,
                                                tb2 = this.getNode('tb2').node,
                                                tb3 = this.getNode('tb3').node,
                                                cnt1 = this.getNode('cnt1').node,
                                                cnt2 = this.getNode('cnt2').node,
                                                cnt3 = this.getNode('cnt3').node,
                                                clear = function () {
                                                    cnt1.style.display = 
                                                    cnt2.style.display = 
                                                    cnt3.style.display = 'none';
                                                    JMVC.dom.removeClass(tb1, 'active');
                                                    JMVC.dom.removeClass(tb2, 'active');
                                                    JMVC.dom.removeClass(tb3, 'active');
                                                }
                                            JMVC.events.on(tb1, 'click', function () {
                                                clear();
                                                JMVC.dom.addClass(tb1, 'active');
                                                cnt1.style.display = '';
                                            });
                                            JMVC.events.on(tb2, 'click', function () {
                                                clear();
                                                JMVC.dom.addClass(tb2, 'active');
                                                cnt2.style.display = '';
                                            });
                                            JMVC.events.on(tb3, 'click', function () {
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
                                        sameHeight : true,
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
                            html : (drawText ? 'hide' : 'show') + ' content'
                        }],
                        cb : toggleText
                    }
                ]
            };
        }

        function doCaptcha() {
            JMVC.core.captcha.create(this.node);
            this.done();
        }

        function another () {
            var self = this,
                footer = self.getNode('footer').node;

            JMVC.core.widgzard.render({
                    target : footer,
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
                }, true
            );
            
        }


        function toggleText (){
            
            JMVC.events.one(this.node, 'click', function () {
                drawText = !drawText;
                JMVC.core.widgzard.render(getConfig(), true);
            });
            
           this.done();
        }

        JMVC.getView('vacuum')
            .set({
                'style' : 'font-family:verdana;',
                'id' : 'extralogo'
            }).render(function () {
                JMVC.css.style(JMVC.dom.body(), 'backgroundColor', '#444');
                JMVC.core.widgzard.render(getConfig(), true);
            });
    };

    /**
     * [action_sample description]
     * @return {[type]} [description]
     */
    this.action_sample = function (){

        JMVC.require(
            'core/lib/widgzard/widgzard'
            ,'core/screen/screen'
        );

        JMVC.head.addStyle(location.protocol + '//fonts.googleapis.com/css?family=Luckiest+Guy');
        

        //JMVC.events.loadify(1000);

        
        JMVC.head.addStyle('/media/css/widgzard.css');
        JMVC.head.title('Widgzard dom creator, postorder callback execution');

        //JMVC.dom.addClass(JMVC.WD.body, 'resp');
        JMVC.css.beResponsive();

        var incr = 5,
            time = 2,
            color0 = '#FFFFFF',
            color1 = '#FF8800',
            color1a = '#FF8800',
            color2 = '#008800',
            color2a = '#008800',
            color3 = '#DDDDDD',
            black = '#000000',
            spaPX = 5,
            padPX = 10,
            spacing = spaPX + 'px',
            margin = 2 * spaPX + 'px',
            padding = '10px',
            shrinkFonts = function (t) {
                var self = this,
                    node = self.node,
                    n = 0;
                (function g (){
                    window.setTimeout(function () {
                        var c = parseInt(node.style.letterSpacing, 10),
                            tInd = parseInt(node.style.textIndent, 10);
                        c -= incr;
                        node.style.letterSpacing = c + 'px';
                        if (t) node.style.textIndent = (tInd - incr) + 'px';
                        c > incr && g();

                    }, time);
                })();
                this.done();
            },
            li = function (msg) {
                return {
                    tag : 'li',
                    attrs : {'class':'round8'},
                    style : {fontSize : '16px', margin : margin + ' 0px', padding:padding, border:'1px solid black', backgroundColor:color2, color:color0},
                    html  : msg
                };
            };

        JMVC.core.widgzard.render({

            cb : function (){
                // var self = this,
                    // dbox = JMVC.vendors.dropbox.create();
                // 
                // dbox.login(function (){
                    // dbox.getFileContent('hw.html', function (err, cnt) {
                        // self.getNode('db').innerHTML = cnt;
                    // });
                // });
               console.debug('end')
               //this.getNode('db').innerHTML = '<b>not FINISHED</b>';
            }, 
            style : {backgroundColor: color2},
            content : [{
                wid : 'first',
                data : {who : 'The Widgzard'},
                attrs : {'class' : 'round respfixed'},
                style : {
                    backgroundColor : color1,
                    padding : '40px',
                    margin : margin + ' 0px',
                    fontSize : '56px',
                    lineHeight : '50px',
                    height:'105px',
                    fontWeight:'bold',
                    overflow : 'hidden',
                    fontFamily: "'Luckiest Guy', cursive"
                },
                content : [{
                    style : {textAlign : 'right', 'float':'left', width: '50%',letterSpacing : '600px', textIndent:'-2000px', fontSize : '80px'},
                    html : 'Widg',
                    tag : 'span'
                    ,cb : function () {shrinkFonts.call(this, false);}
                },{
                    style : {textAlign : 'left', 'float':'left', width: '50%', letterSpacing : '600px', textIndent:'600px', fontSize : '80px'},
                    html : 'Zard',
                    tag : 'span'
                    ,cb : function () {shrinkFonts.call(this, true);}
                },'clearer']

            },{
                attrs : {'class':'round respfixed'},
                style : {textAlign:'center', margin : '0 auto', backgroundColor : 'white', padding:'20px '+padding, border:'5px solid '+color1, fontSize:'30px'},
                    
                content : [{
                    style : {'float':'left', width : '30%', padding:padding + ' 0px'},
                    html : '{JSON}'
                },{
                    style : {'float':'left', width : '5%', padding:padding + ' 0px'},
                    html : '<span class="resp_mobi">&darr;</span><span class="resp_dskt">&rarr;</span>' 
                },{
                    attrs : {'class':'round'},
                    style : {'float':'left', width : '30%',backgroundColor : color2, color : color0, height : '52px', padding:padding + ' 0px', fontFamily: "'Luckiest Guy', cursive", fontSize:'45px'},
                    html : 'Widgzard'
                },{
                    style : {'float':'left', width : '5%', padding:padding + ' 0px'},
                    html : '<span class="resp_mobi">&darr;</span><span class="resp_dskt">&rarr;</span>' 
                },{
                    style : {'float':'left', width : '30%', padding:padding + ' 0px'},
                    html : 'HTML & JS & CSS'
                },'clearer']

            },{

                attrs : {'class':'round'},
                style : {
                    margin : margin +' 0px',
                    backgroundColor:color0,
                    width:'100%'
                    
                },
                content : [{
                    attrs : {'class':'respfixed'},
                    style : {padding:spacing},
                    content : [{
                        style : {width:'20%' ,'float':'left'},
                        content : [{
                            attrs : {'class':'round respfixed', id : 'getsamples'},
                            style : {margin:spacing, backgroundColor:color3},
                            content : [{
                                data : {what : 'rulez'},
                                style : {padding:padding, cursor:'pointer', textTransform : 'uppercase'},
                                html : 'load some samples',
                                cb : function () {
                                    JMVC.events.on(this.node, 'click', function () {
                                        JMVC.core.widgzard.load('/media/js/widgzard/samples.js');
                                    });
                                    this.done();
                                    
                                    if (
                                        this.parent === this.climb()
                                        &&
                                        this.parent.node.parentNode === this.climb(2).node
                                        &&
                                        this.root.node === document.body
                                    ) {

                                        console.debug(this.getNode('first').data.who + '® ' + this.data.what);
                                    }   
                                    // console.debug(this.climb(2));
                                    // console.debug(this.climb(3));
                                    // console.debug(this.climb(4));
                                }
                            }]
                            
                        }]    
                    },{
                        style : {width:'80%' ,'float':'left'},
                        content : [{
                            style : {padding:padding, fontSize:'25px', margin : spacing + ' 0px'},
                            attrs : {'class':'respfixed'},
                            tag : 'h3',
                            html : 'Widgzard javascript module allows to'
                        }, {
                            attrs : {'class':'round respfixed'},
                            style : {margin:spacing, backgroundColor: color1a, padding:padding, lineHeight:'1.6em'},
                            html : '<h3>PREORDER creation</h3>Inject an arbitrary Dom tree within a DOMnode. For every created DOMnode You can specify attributes, child nodes and a callback that for leaf nodes is executed at creation.'
                        }, {
                            attrs : {'class':'round respfixed'},
                            style : {margin:spacing, backgroundColor: color1a, padding:padding, lineHeight:'1.6em'},
                            html : '<h3>POSTORDER callbacks</h3>Create a chain of resolving callback, where the tree leaves are called immediately after being appended. Leaf DOMnode ancestors callback will be called only when all childs callbacks explicitly declare to have finished their work.'
                        },{
                            style : {padding:padding, fontSize:'25px', margin : spacing + ' 0px'},
                            attrs : {'class':'respfixed'},
                            tag : 'h3',
                            html : 'just using a object literal!'
                        }]    
                    },'clearer']    
                }]
                
                
            },{
                attrs : {'class':'round'},
                style : {
                    margin : margin +' 0px',
                    backgroundColor:color0,
                    width:'100%'
                    
                },
                content : [{
                    attrs : {'class':'respfixed'},
                    style : {padding:spacing},
                    content : [{
                        style : {width:'44%' ,'float':'left'},
                        content : [{
                            attrs : {'class':'round respfixed'},
                            style : {margin:spacing, backgroundColor:'black', color:color1},
                            content : [{
                                style : {padding:padding},
                                html : JMVC.core.widgzard.htmlspecialchars(
                                    "var $ = document.getElementById; \n"+
                                    "Widgzard.render({\n"+
                                    "   target : $('cnt'),\n" +
                                    "   cb : function() {\n"+
                                    "       console.log('all done');\n"+
                                    "   },\n" +
                                    "   content : [{\n" +
                                    "       html : 'hello',\n" +
                                    "       style : {color:'red'}\n"+
                                    "   }, {\n" +
                                    "       html : 'world',\n"+
                                    "       style : {\n"+
                                    "           color:'green',\n"+
                                    "       }\n"+
                                    "   }]\n" +
                                    "});"
                                , true)
                            }]
                        }]    
                    },{
                        style : {width:'4%' ,'float':'left', fontSize:'30px', textAlign:'center',lineHeight:'40px'},
                        html : '<span class="resp_mobi">&darr;</span><span class="resp_dskt">&rarr;</span>' 
                    },{
                        
                        style : {width:'4%' ,'float':'left', textAlign:'center',lineHeight:'40px'},
                        content : [{
                            attrs : {'class':'round respfixed'},
                            style : {margin:spacing,backgroundColor: color1, fontFamily: "'Luckiest Guy', cursive", fontSize:'20px',lineHeight:'55px',height:'50px'},  
                            html : '<span class="resp_dskt">W</span><span class="resp_mobi">WIDGZARD</span>'
                       }]
                    },{
                       style : {width:'4%' ,'float':'left', fontSize:'30px', textAlign:'center',lineHeight:'40px'},
                       html : '<span class="resp_mobi">&darr;</span><span class="resp_dskt">&rarr;</span>' 
                    },{
                        style : {width:'44%' ,'float':'left'},
                        content : [{
                            attrs : {'class':'round respfixed'},
                            style : {margin:spacing, color:color3, backgroundColor:color2a, padding:padding},
                            content : [{
                                
                                content : [{
                                    html : JMVC.core.widgzard.htmlspecialchars('<div id="cnt">', true)
                                },{

                                    attrs : {'class':'round'},
                                    style : { backgroundColor:color2a, color:color0},
                                    html : JMVC.core.widgzard.htmlspecialchars(
                                        "  <div style='color:red'>hello</div>\n" + 
                                        "  <div style='color:green'>world</div>"
                                    ,true) 
                                },{
                                   html : JMVC.core.widgzard.htmlspecialchars('</div>', true) 
                                }]  
                            }]
                        }]    
                    },
                    'clearer',{
                        tag:'hr',
                        style : {margin : padding + ' ' + spacing}
                    },{
                        attrs : {'class':'round respfixed'},
                        style : {backgroundColor: color2a, margin : spacing, padding:padding, color : color0},
                        html : '<p>It smells a lot like <strong>overhead</strong> that`s clear! Fortunately that`s not all.<br/>'+
                            '<strong>What about the callbacks chain?</strong> I try to introduce it from a common point of view.<br />'+
                            'Even thinking about a single little section of a webpage (maybe a widget) let`s try to get an answer to the following question:</p>',
                        content : [{
                            attrs : {'class':'round respfixed'},
                            style : {fontWeight:'bold',backgroundColor: color1, padding:padding, color : black, lineHeight:'1.6em', textAlign:'center'},
                            html : 'How to trigger some postorder callbacks while creating the tree in preorder?'
                        }]
                    }]
                }]  
            },{
                attrs : {'class':'round'},
                style : {
                    margin : margin +' 0px',
                    backgroundColor:color0,
                    width:'100%'
                },
                content : [{
                    attrs : {'class':'respfixed'},
                    style : {padding:spacing},
                    content : [{
                        attrs : {'class':'round respfixed'},
                        style : {padding:padding, margin:spacing, backgroundColor:color1, color:black, border:'1px solid '+ color2},
                        html : 'The node information are contained in an Object literal like the following:',
                        content : [{
                            attrs : {'class':'round8'},
                            style : {fontWeight:'bold',margin : margin + ' 0px', padding:padding, border:'1px solid black', backgroundColor:'white'},
                            html : JMVC.core.widgzard.htmlspecialchars(
                                "{\n"+
                                "   target : aDOMnode,\n" +
                                "   attrs : {},\n" +
                                "   style : {},\n" +
                                "   cb : function() {\n" +
                                "       ... \n" +
                                "       this.done();\n" +
                                "   },\n" +
                                "   html : '<h1>Title</h1>',\n" +
                                "   content : [\n" +
                                "       ...other\n" +
                                "       nodes here\n" +
                                "   ]\n" +
                                "});", true
                            )
                        },{
                            content : [{
                                tag: 'strong',
                                html : 'where'
                            },{
                                tag : 'ul',
                                content : [
                                    li('either <i>html</i> or <i>content</i> are mandatory, and can be used togheter, <i>html</i> will come before <i>content</i>'),
                                    li('<b>target</b><br/>is optional, if not specified for the root will be used document.body while other nodes will be appended to the parent'),
                                    li('<b>attrs</b><br/>is optional, specify attributes for that node'),
                                    li('<b>style</b><br/>is optional, specify style for that node'),
                                    li('<b>cb</b><br/>is optional,specify a callback, ending with this.done()'),
                                    li('<b>html</b><br/>is optional, specify the html content of the node, the content will come before the content nodes array'),
                                    li('<b>content</b><br/>is optional, an array of nodes like that')
                                ]
                            }]
                        }]
                    }]
                }]
            },{
                attrs : {'class':'round'},
                style : {
                    margin : margin +' 0px',
                    backgroundColor:color0,
                    width:'100%',
                    padding : padding
                },
                content : [{
                    tag : 'h1',
                    style: {fontSize : '30px'},
                    html : 'The previous sample was a joke'
                },{
                    tag : 'p',
                    html : 'let`s try to stress the Widgzard function with something more interesting'
                },{
                    tag:'hr',
                    style : {margin : padding + ' ' + spacing}
                }]
            },{
                attrs : {'class' : 'round respfixed'},
                html : 'WTF licence ~ Federico Ghedina ~ ' + (new Date).getFullYear() ,
                style : {
                    backgroundColor : 'white',
                    padding : padding,
                    margin : margin + ' 0px'
                }
            }]
        }, true);
    };

    /**
     * [action_engy description]
     * @return {[type]} [description]
     */
    this.action_engy = function () {

        var timeStart = +new Date,
            timeEnd;

        document.body.style.fontFamily = 'Verdana, sans';
            
        JMVC.require('core/lib/widgzard/engy', function () {
            JMVC.core.engy.process({
                component: "carousel",
                params: {
                    id: "d23q2qdd2q243",
                    layout: {
                        bgImage :'http://static.stailamedia.com/svp/interactive/images/1/1/800/526/http%253A%252F%252F25.media.tumblr.com%252Fec1ecfbc92e8673eeb18f9df2fb029a0%252Ftumblr_n2wsdoydBx1qkegsbo1_1280.jpg',

                        size: {
                            width: "462px",
                            height: "230px"
                        }

                        // brd: "0px solid black",

                        ,padding : '10px'
                        // ,button : {theme : 'default'}
                        // ,button : {theme : 'darkDefault'}
                        // ,button : {theme : 'whiteRound'}
                        // ,button : {theme : 'darkRound brdWhite'}
                        // ,orientation : 'vertical'
                        // ,ballList : true
                    },
                    
                    link : "http://www.jmvc.dev",
                    linkOut : true,
                    speed : .2,
                    cards: [
                        {
                            component: "video",
                            params: {
                                oggUrl: "http://www.w3schools.com/html/mov_bbb.ogg"
                                ,mp4Url: "http://www.w3schools.com/html/mov_bbb.mp4"
                                ,autoplay : false
                                ,controls : true
                                
                                // ,onEnd : {
                                //     content : [{
                                //         tag : 'p',
                                //         html : 'The end',
                                //         style : {
                                //             color:'red',
                                //             textAlign :'center',
                                //             fontSize : '100px',
                                //             textTransform : 'uppercase'
                                //         }
                                //     }]
                                // }
                                
                                // ,onEnd : {
                                //     component: "contactBasic",
                                //     params: {
                                //         submitUrl: "http://www.sm.dev/post.php"
                                //     }
                                // }
                                
                                // ,onEnd : {
                                //     component : "modal",
                                //     params : {
                                //         html : '<h1>Hello World</h1><p>This is a simple description</p>'
                                //     }
                                // }
                            }
                        },


                        {
                            component: "image-link",
                            params: {
                                imageUrl: "http://www.jmvc.org/media/img/jmvc_n2.png",
                                link: "http://www.jmvc.org?ga=false"
                            }
                        },


                        {
                            component: "image-text-link",
                            params: {
                                imageUrl: "http://www.stailamedia.com/wp-content/themes/staila/images/logo4.svg",
                                text: "Greetings from",
                                link: "http://www.stailamedia.com"
                            }
                        },


                        {
                            component: "video-text",
                            params: {
                                oggUrl: "http://www.w3schools.com/html/mov_bbb.ogg",
                                mp4Url: "http://www.w3schools.com/html/mov_bbb.mp4",
                                autoplay : true,
                                heading : "Let`s dance?",
                                text : "Google announces project Tango"
                            }
                        },


                        {
                            component: "video",
                            params: {
                                mp4Url: "http://banner.stailamedia.com/interactive/Lidl/ON-01445/su12/de/movie.mp4"
                                ,oggUrl: "http://banner.stailamedia.com/interactive/Lidl/ON-01445/su12/de/movie.webm"
                                 //// ???????? WAT ...hahahahah ogg !== webm
                                 ///
                                ,autoplay : false
                                ,controls : true
                            }
                        },


                        {
                            component : 'fb',
                            params : {
                                fbPageUrl: "https:\/\/www.facebook.com\/lidlch",
                                scrolling : 'yes',
                                colorscheme : 'light'
                            }
                        },


                        {
                            component: "contactBasic",
                            params: {
                                submitUrl: "http://www.sm.dev/post.php"
                            }
                        },


                        {
                            component: "poll",
                            params: {
                                submitUrl: "http://www.sm.dev/poll.php",
                                questionsAnswers: [{
                                    name : 'rateType',
                                    question : 'Do you charge on an hourly or project basis?',
                                    multi : true,
                                    answers :[
                                        'I charge hourly',
                                        'I charge flat project fees',
                                        'A mix of both'
                                    ]
                                },{
                                    name : 'hourlyRate',
                                    question : 'What is your hourly rate?',

                                    answers :[
                                        '$10-$49/hour',
                                        '$50-$99/hour',
                                        '$100-$149/hour',
                                        '+$150/hour'
                                    ] 
                                },{
                                    name : 'yearIncome',
                                    question : 'What is your income per year?',
                                    answers :[
                                        '$50K-$100K/y',
                                        '$100K-$150K/y',
                                        '$150K-$250K/y',
                                        '+$250K/y'
                                    ] 
                                }]
                            }
                        }
                    ]
                }
            }).then(function(p, r) {

                // Add a target, if not body is used
                // and
                // all scripts tag will be removed
                // 
                // then unleash the Widgzard
                // using the engy generated config
                //
                var doCleanUpTheWholeTarget = true;
                JMVC.core.widgzard.render(
                    r[0],
                    doCleanUpTheWholeTarget
                );

            });

        });

    };



    this.action_extreme = function () {
        JMVC.require(
            'core/lib/widgzard/widgzard'
            ,'core/screen/screen'
        );
        JMVC.head.addStyle(location.protocol + '//fonts.googleapis.com/css?family=Luckiest+Guy');
        JMVC.head.addStyle('/media/css/widgzard.css');
        JMVC.dom.addClass(JMVC.WDB, 'resp');

        JMVC.core.widgzard.render({
            content : [{
                html : '<h1>Hello world</h1>',
                style : {
                    fontFamily:'"Luckiest Guy",cursive',
                    fontSize : '30px',
                    marginTop : '20px'
                }
            }, {
                tag : 'p',
                html : JMVC.string.lorem(JMVC.util.rand(100, 500))
            }]
        }, true);

    };



};