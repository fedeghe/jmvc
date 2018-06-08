{
    tag : "div",
    wid : "#PARAM{id}",   
    data : {
        cards:"#PARAM{cards}",
        index : 0,
        next : null, // cb creates it
        prev : null, // cb creates it
        id : JMVC.util.uniqueid + '',
        carouselID : JMVC.util.uniqueid,
        h : "#PARAM{layout.size.height}",
        w : "#PARAM{layout.size.width}",
        speed : "#PARAM{speed}",
        bgImage : "#PARAM{layout.bgImage}",
        bgLink : "#PARAM{link}",
        bgLinkOut : "#PARAM{linkOut}",
        orientation : "#PARAM{layout.orientation|orizontal}",
        ballList : "#PARAM{layout.ballList}"
    },
    style : {
        border : "#PARAM{layout.brd}",
        backgroundColor : "#PARAM{bgcolor|white}",
        padding : '#PARAM{layout.padding|0px}'
    },
    content : [{
        attrs : {"class": " carousel"},
        content : [{
            attrs : {"class" : "arrow arrowLeft round20 roundright respfixed"},
            html : "&nbsp;",
            data : {
                layout : "#PARAM{layout.button.theme|default}"
            },
            cb : function () {
                
                var self = this,
                    parent = self.climb(2),
                    len = parent.data.cards.length,
                    list;

                 // if vertical round on the correct side
                if (parent.data.orientation == 'vertical') {
                    JMVC.dom.removeClass(self.node, 'roundright');
                    JMVC.dom.addClass(self.node, 'roundtop');
                }

                if (self.data.layout) {
                    JMVC.dom.addClass(self.node, self.data.layout);
                } 

                JMVC.Channel(parent.data.id).sub('moved', function () {
                    if (parent.data.index > 0) {
                        JMVC.dom.removeClass(self.node, 'disabled');
                    } else {
                        JMVC.dom.addClass(self.node, 'disabled');       
                    }
                });
                self.node.addEventListener('click', function () {
                    parent.data.prev();
                }, false);
                this.done();
            }
        },{
            attrs : {"class" : "carouselListWrap round10 respfixed"},
            wid : 'carouselListWrap',
            content : [{
                tag : "ul",
                wid : 'carouselList',
                content : "#PARAM{cards}",
                style: {display:"none"},
                data  : {
                    w : "#PARAM{layout.size.width}",
                    h : "#PARAM{layout.size.height}"
                },
                cb : function () {
                    var self = this,
                        childs = self.childrens,
                        len =  childs.length,
                        orientation = self.climb(3).data.orientation;
                    if (orientation == 'orizontal') {
                        self.node.style.width = (len * 100) + '%';
                    } else if (orientation == 'vertical') {
                        self.node.style.width = '100%';
                        //self.node.style.height = self.data.h;
                    }
                    
                    self.climb(2).node.style.height = self.data.h;

                    //adjust parent dimensions
                    self.parent.node.style.width = self.data.w;
                    self.parent.node.style.height = self.data.h;

                    for (var i = 0; i < len; i++){
                        JMVC.dom.addClass(childs[i].node, orientation);
                        childs[i].node.setAttribute('data-num', i);
                        childs[i].node.style.width =  (orientation == 'vertical')? '100%' : ((100 / len) + '%');//self.data.w;
                        childs[i].node.style.height =  self.data.h;
                    }
                    this.done();
                }
            }]
        },{
            attrs : {"class" : "arrow arrowRight round20 roundright respfixed"},
            html : "&nbsp;",
            data : {
                layout : "#PARAM{layout.button.theme|default}"
            },
            cb : function () {
                this.done();
                var self = this,
                    parent = self.climb(2),
                    len = parent.data.cards.length,
                    list;

                // if vertical round on the correct side
                if (parent.data.orientation == 'vertical') {
                    JMVC.dom.removeClass(self.node, 'roundright');
                    JMVC.dom.addClass(self.node, 'roundtop');
                }

                if (self.data.layout) {
                    JMVC.dom.addClass(self.node, self.data.layout);
                } 
                JMVC.Channel(parent.data.id).sub('moved', function () {
                    if (parent.data.index < len - 1) {
                        JMVC.dom.removeClass(self.node, 'disabled');
                    } else {
                        JMVC.dom.addClass(self.node, 'disabled');       
                    }
                });
                self.node.addEventListener('click', function () {
                    parent.data.next();
                }, false);
            }
        },{
            tag : "br",
            attrs : {"class" : "clearer"}
        }],
        cb : function () {
            var self = this;
            JMVC.dom.addClass(self.node, self.parent.data.orientation);
            self.done();
        }
    }],
    cb : function (){
        
        var self = this,
            data = self.data,
            previous = data.index,
            len = data.cards.length,
            speed = data.speed || .5,
            ul = self.getNode('carouselList').node,
            width = data.w,
            height = data.h,
            orientation = data.orientation;

        data.next = function () {
            JMVC.Channel(data.id).pub('move', 1);
        };
        data.prev = function () {
            JMVC.Channel(data.id).pub('move', -1);
        };


        JMVC.Channel(data.id).sub('moved', function (topic, from, to) {
            previous = to;
        });

        // set background image
        self.node.style.backgroundImage = 'url(' + data.bgImage + ')';
        
        JMVC.dom.addClass(self.node ,'coverBgHigh');

        self.node.addEventListener('click', function (e) {
            if (JMVC.events.eventTarget(e).parentNode == self.node) {

                // link needs _blank target ?
                //
                data.bgLinkOut ?
                    window.open(data.bgLink, '_blank').focus()
                    :
                    (document.location.href = data.bgLink);
            }
        }, false);

        // show it
        ul.style.display = '';
        ul.style['transition']=
        ul.style['-webwit-transition']=
        ul.style['-moz-transition']=
        ul.style['-o-transition']= 'All ' + speed + 's ease 0s';

        JMVC.Channel(data.id).sub('move', function (topic, dir) {

            var transX, transY;
            
            if (data.index + dir >= 0 && data.index + dir < len) {

                data.index += dir;

                if (orientation == 'orizontal') {
                    transX = - ((100/len) * data.index) +'%'; //(-parseInt(width,10) * data.index) + 'px';
                    transY = '0px';
                } else if (orientation == 'vertical') {
                    transX = '0px';
                    transY = (-parseInt(height,10) * data.index) + 'px';
                }

                ul.style['transform'] =
                ul.style['-webkit-transform'] =
                ul.style['-moz-transform'] =
                ul.style['-o-transform'] =
                ul.style['-ms-transform'] = 'translate(' + transX + ', ' + transY + ')';
             
            }

            JMVC.Channel(data.id).pub('moved', [previous, self.data.index]);

        });
        JMVC.Channel(data.id).pub('moved', [previous, self.data.index]);

        if (data.ballList) {
            var carouselListWrap = self.getNode('carouselListWrap').node,
                childs = self.getNode('carouselList').childrens,
                l = childs.length;
            JMVC.core.widgzard.render({
                target : carouselListWrap,
                content : [{
                    style : {
                        position:'absolute',
                        bottom:'10px',
                        width:'100%',
                        textAlign:'center',
                        zIndex:900,
                        color:'red',
                        margin : '0 auto'
                    },
                    content : [{
                        tag : 'ul',
                        cb : function () {
                            var self = this;
                            for (var i = 0, tmp; i < l; i++) {
                                tmp = document.createElement('li');
                                tmp.className = 'inline pointer ball ' + (!!i ? '' : 'active');
                                tmp.innerHTML = '&bull;';
                                tmp.setAttribute('data-num', i);
                                self.node.appendChild(tmp);
                            }
                            JMVC.events.on(self.node, 'click', function (e) {
                                var trg = JMVC.events.eventTarget(e),
                                    n,
                                    move;

                                JMVC.dom.removeClass(self.node.children.item(data.index), 'active');
                                if (trg.tagName.match(/^li$/i)) {
                                    n = parseInt(trg.getAttribute('data-num'), 10);
                                    move = data.index < n ? data.next : data.prev; 
                                }
                                
                                while (data.index != n) {
                                    move();
                                }
                            
                                JMVC.dom.addClass(self.node.children.item(n), 'active');
                            });

                            JMVC.Channel(data.id).sub('moved', function (topic, from, to) {
                                JMVC.dom.removeClass(self.node.children.item(from), 'active');
                                JMVC.dom.addClass(self.node.children.item(to), 'active');
                            });

                            self.done();
                        }
                        //html : '<ul><li class="inline">a</li><li class="inline">b</li></ul>'
                    }]
                }]
            })
        }
        
        console.log('WIDGZARD END ');

        
        
    }
}
