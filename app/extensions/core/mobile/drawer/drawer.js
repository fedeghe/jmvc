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
            dim = JMVC.screen.getViewportSize();

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
                JMVC.events.drag.on(document.body, {
                    // start : function (e, data) { 
                    //     console.dir(data);
                    //     var n = JMVC.dom.create('div', {'style': 'width:3px;height:3px;background-color:black;position:absolute;top:'+data.start[1]+'px;left:'+data.start[0]+'px;'}, '&nbsp;');
                    //     JMVC.dom.append(document.body, n);
                    // },
                    move : function (e, data) { 
                        
                        if (!visible && data.orientation == 'e') {
                            
                            JMVC.css.style(n, 'left', (-dim.width + data.distance) + 'px');
                        }
                        if (visible && data.orientation == 'o') {
                            
                            JMVC.css.style(n, 'left', (-data.distance) + 'px');
                        }
                    },
                    end : function (e, data) {
                        if (!visible && data.orientation == 'e') {
                            if (data.distance > dim.width/2) {
                                JMVC.css.style(n, 'left', '0px');
                                visible = true; 
                            } else {
                                JMVC.css.style(n, 'left', -dim.width + 'px');   
                                visible = false;
                            }
                        } else if (visible && data.orientation == 'o') {
                            if (data.distance > dim.width/2) {
                                JMVC.css.style(n, 'left', -dim.width + 'px');
                                visible = false; 
                            } else {
                                JMVC.css.style(n, 'left', '0px');   
                                visible = true;
                            }
                        } else {
                            JMVC.css.style(n, 'left', (visible ? 0 : -dim.width) + 'px');
                        } 
                        
                    }
                });
                
                
            },
            content : [{
                attrs : {'class':'JMVC-drawer-hamburger round8 resp_mobi'},
                style  : {color : 'white', fontSize:'20px', padding:'4px 8px'},
                html : JMVC.core.widgzard.htmlspecialchars('>'),
                cb : function () {
                    var node = this;
                    JMVC.events.bind(node, 'click', function () {
                        var n = node.getNode(drwID),
                            st = parseInt(JMVC.css.style(n, 'left'), 10);
                        if (!st) {
                            visible = false;
                            JMVC.css.style(n, 'left', -dim.width + 'px');    
                            
                        } else {
                            visible = true;
                            JMVC.css.style(n, 'left', '0px');                            
                            
                        }
                        
                    });
                    node.done();  
                    
                }
            },{
                wid : drwID,
                attrs : {'class': 'JMVC-drawer resp_mobi respfixed'},
                style : {
                    position: 'fixed',
                    top : '0px',
                    left: '-100%',
                    bottom: '0px',
                    overflow : 'scroll',
                    padding : '10px',
                    width: (dim.width - 40 ) + 'px'
                },
                content : [{
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