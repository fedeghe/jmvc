JMVC.require(
    'core/lib/widgzard/widgzard',
    'core/screen/screen',
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
            offset = 40,
            //
            // wrap
            wrap = JMVC.dom.wrap(body);

        JMVC.css.style(wrap, {
            zIndex : 100,
            position:'relative'
            //,overflow : 'hidden'
        });

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
                
                var node = this,
                    n = node.getNode(drwID);

                JMVC.events.drag.on(body, {
                    move : function (e, data) { 
                        var left = JMVC.events.coord(e)[0];

                        if (left > dim.width - offset) {
                            JMVC.events.preventDefault(e);
                            return false;
                        } else if (!visible && data.orientation == 'e') {
                            JMVC.css.style(n, 'width', left + 'px');
                            JMVC.css.style(wrap, 'left', left + 'px');
                        } else if (visible && data.orientation == 'o') {
                            JMVC.css.style(n, 'width', left + 'px');
                            JMVC.css.style(wrap, 'left', left + 'px');
                        }
                    },
                    end : function (e, data) {
                        var left = JMVC.events.coord(e)[0];

                        if (!visible && data.orientation == 'e') {
                            if (left > dim.width/2) {

                                JMVC.css.style(n, 'width', (dim.width - offset) + 'px');
                                JMVC.css.style(wrap, 'left', (dim.width - offset) + 'px');
                                visible = true; 
                            } else {
                            
                                JMVC.css.style(n, 'width', '0px');
                                JMVC.css.style(wrap, 'left', '0px');
                                visible = false;
                            }
                        } else if (visible && data.orientation == 'o') {
                            if (left < dim.width/2) {
                            
                                JMVC.css.style(n, 'width', '0px');
                                JMVC.css.style(wrap, 'left', '0px');
                                visible = false; 
                            } else {
                                JMVC.css.style(n, 'width', (dim.width - offset) + 'px');
                                JMVC.css.style(wrap, 'left', (dim.width - offset) + 'px');
                                visible = true;
                            }
                        } else {
                            
                            JMVC.css.style(n, 'width', (visible ? dim.width - offset : 0) + 'px');
                            JMVC.css.style(wrap, 'left', (visible ? dim.width - offset : 0) + 'px');
                        }
                    }
                });
            },
            content : [{
                target : wrap,
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
                    var node = this;
                    JMVC.events.on(node, 'click', function () {
                        var n = node.getNode(drwID),
                            
                            st = parseInt(JMVC.css.style(n, 'width'), dim.width + 'px');

                        
                        if (st) {
                            visible = false;
                            
                            JMVC.css.style(n, 'width', '0px');    
                            JMVC.css.style(wrap, 'left', '0px');    
                            
                        } else {
                            visible = true;
                                                       
                            JMVC.css.style(n, 'width', (dim.width - offset) + 'px');                            
                            JMVC.css.style(wrap, 'left', (dim.width - offset) + 'px');                            
                            
                        }
                        
                    });
                    node.done();  
                    
                }
            },{
                target : wrap,
                wid : drwID,
                attrs : {'class': 'JMVC-drawer resp_mobi respfixed'},
                style : {
                    position: 'fixed',
                    top : '0px',
                    left:'0px',
                    minHeight:'100%',
                    overflow : 'scroll',
                    //width: (dim.width - 40 ) + 'px',
                    width : '0px',
                    zIndex : 1
                },
                content : [{
                    attrs : {'class':'cnt'},
                    tag : 'ul',
                    content : cnt
                }]
            }]
        };    
    }
    
    /*
    [{
        label : 'label1',
        href : 'asdas/asdasd/'
        content
    }]
    */
    function Drawer(list) {
        this.list = list;
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