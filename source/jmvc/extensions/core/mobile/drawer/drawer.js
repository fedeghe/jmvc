JMVC.require(
    'core/lib/widgzard/widgzard',
    'core/screen/screen',
    'event_scroll/event_scroll',
    'core/fx/fx'
);

JMVC.extend('mobile.drawer', function () {

    JMVC.head.addStyle(JMVC.vars.extensions + 'core/mobile/drawer/drawer.css');

    var visible = false;

    function getJdom(list) {

        var cnt = [],
            i = 0,
            l = list.length,
            drwID = '' + JMVC.util.uniqueid,
            dim = JMVC.screen.getViewportSize(),
            body = document.body,
            offset = 40;

        JMVC.css.unselectable(body);

        for (var tmp; i < l; i++) {
            tmp = {
                tag : 'li',
                attrs : {'class':'lev1'},
                content : [{
                    tag : 'a',
                    html : list[i].label,
                    attrs : {href : list[i].href}
                }]
            };
            cnt.push(tmp);
        }

        return {
            cb : function () {
                
                var self = this,
                    n = self.getNode(drwID).node,
                    left,
                    moving = false,
                    moved = false,
                    hidden = function () {
                        JMVC.css.style(n, 'left', -dim.width + 'px');
                        visible = false; 
                        moving = false;
                    },
                    shown = function () {
                        JMVC.css.style(n, 'left', '0px');
                        visible = true;
                        moving = false;
                    },
                    preventDef = function (e){JMVC.events.preventDefault(e); return false;};

                JMVC.events.on(window, 'mouseleave',function () {
                    if (moving) {
                        (-left < dim.width/2) ? shown() : hidden();
                    }
                    moving = false;
                });
                
                JMVC.events.drag.on(JMVC.W, {
                    start : function (e, data){
                        moving = true;
                        JMVC.events.disable_scroll(JMVC.WDB);
                    },
                    move : function (e, data) { 
                        
                        if(!moving){
                            JMVC.events.enable_scroll(JMVC.WDB);
                            return false;
                        }
                        moved = true;
                        
                        left = JMVC.events.coord(e)[0];
                        
                        if (
                            (!visible && data.orientation == 'e') 
                            ||
                            (visible && data.orientation == 'o')
                        ){
                            JMVC.css.style(n, 'left', (left - dim.width) + 'px');
                        } else {
                            moving = false;
                            moved = false;
                            visible ? shown() : hidden();
                        }

                        
                    },
                    end : function (e, data) {
                        JMVC.events.enable_scroll(JMVC.WDB);
                        if (!moved) {return false;}
                        var left = JMVC.events.coord(e)[0];
                        
                        if (visible) {
                            left < dim.width/2 ? hidden() : shown();
                        } else{
                            left > dim.width/2 ? shown() : hidden();
                        }
                        moving = false;
                    }
                });
            },
            content : [{
                wid : drwID,
                attrs : {'class': 'JMVC-drawer resp_mobi respfixed'},
                style : {
                    position: 'fixed',
                    top : '0px',
                    left: -(dim.width - offset) + 'px',
                    minHeight:'100%',
                    overflow : 'scroll',
                    width: (dim.width - offset) + 'px',
                    height : dim.height + 'px',
                    zIndex : 1
                },
                content : [{
                    attrs : {'class':'cnt'},
                    tag : 'ul',
                    content : cnt
                },{
                    attrs : {'class':'JMVC-drawer-hamburger round8 resp_mobi'},
                    style  : {
                        color : 'white',
                        fontSize:'20px',
                        padding:'4px 8px',
                        position:'absolute',
                        left : (- parseInt(JMVC.css.style(document.body, 'paddingLeft'), 10)) + 'px',
                        top : (- parseInt(JMVC.css.style(document.body, 'paddingTop'), 10)) + 'px'
                    },
                    html : JMVC.core.widgzard.htmlspecialchars('>'),
                    cb : function () {
                        var self = this,
                            node = self.node;
                        JMVC.events.on(node, 'click', function () {
                            var n = node.getNode(drwID).node,
                                
                                st = parseInt(JMVC.css.style(n, 'width'), dim.width + 'px');

                            
                            if (st) {
                                visible = false;
                                
                                JMVC.css.style(n, 'width', '0px');    
                                //JMVC.css.style(wrap, 'left', '0px');    
                                
                            } else {
                                visible = true;
                                                           
                                JMVC.css.style(n, 'width', (dim.width - offset) + 'px');                            
                                //JMVC.css.style(wrap, 'left', (dim.width - offset) + 'px');                            
                                
                            }
                            
                        });
                        self.done();  
                        
                    }
                }]
            }]
        };    
    }
    
    function Drawer(list) {
        this.tpl = getJdom(list);
    }

    Drawer.prototype.render = function () {
        JMVC.core.widgzard.render(this.tpl);
    };

    return {
        create : function (l) {
            return new Drawer(l);
        }
    };

});