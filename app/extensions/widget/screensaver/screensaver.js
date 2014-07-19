JMVC.require('core/screen/screen', 'event_scroll/event_scroll');
JMVC.extend('screensaver', {
    
    init : function () {
        
        var self = JMVC.screensaver,
            baseStyle = '';
            
        

        self.outer = JMVC.dom.add(JMVC.WD.body, 'div', {'style' : 'display:none;z-index:900;position:absolute;left:0px;right:0px;top:0px;bottom:0px'});
        self.inner = JMVC.dom.add(self.outer, 'div', {'style' : 'z-index:999;position:relative;height:100%;width:100%'});

        self.top = JMVC.dom.add(self.inner, 'div', {'style' : baseStyle + 'border-bottom:1px solid white;background-color:black;z-index:900;top:0px;left:0px;right:0px;position:absolute'});
        self.bottom = JMVC.dom.add(self.inner, 'div', {'style': baseStyle + 'border-top:1px solid white;background-color:black;z-index:900;bottom:0px;left:0px;right:0px;position:absolute'});
        
        self._modH = function (j){
            JMVC.css.style(self.top, {height : j + 'px'});                                 
            JMVC.css.style(self.bottom, {height : j + 'px'});
        };
        
    },

    _shut : function () {
        
        JMVC.events.disable_scroll();
        
        JMVC.screensaver.scrolltop = JMVC.screen.getScreenData().scrollTop;
        JMVC.screensaver.height = ~~JMVC.screen.getViewportSize().height;

        var done = false,
            self = JMVC.screensaver,
            targetH = self.height / 2,
            i = 0,
            to; 

        JMVC.css.show(self.outer);
        //adjust for scrolling
        JMVC.css.style(self.top, {top : self.scrolltop + 'px', 'border-color' : 'white'});
        JMVC.css.style(self.bottom, {bottom : -self.scrolltop + 'px', 'border-color' : 'white'});
        
        to = JMVC.W.setTimeout(function x(j) {
            
            self._modH(j);
            if (j < targetH) {
                j += 10;
                JMVC.W.setTimeout(x, 0, j);
            } else if (j > targetH) {
                self._modH(targetH);
                JMVC.W.setTimeout(function () {
                    JMVC.css.style(self.top, 'border-color', 'black');
                    JMVC.css.style(self.bottom, 'border-color', 'black');
                }, 50);
            }
        }, i, i);
    },
    
    _up : function () {
        
        var self = JMVC.screensaver;
        JMVC.events.enable_scroll();
        self._modH(0);
        JMVC.css.hide(self.outer);
    },
    off : function () {
        this._up();
    },
    on : function (timeout) {

        timeout = ~~timeout || 5000;
        var self = this,
            to,
            setT = function () {
                to = JMVC.W.setTimeout(function () {
                    self._shut();    
                }, timeout);
            },
            backT = function (){
                self._up();
                JMVC.W.clearTimeout(to);
                setT();
            };
        setT();
        JMVC.events.on(JMVC.WD.body, 'mousemove', backT);
        JMVC.events.on(JMVC.WD.body, 'click', backT);
        JMVC.events.on(JMVC.WD.body, 'keyup', backT);
        JMVC.events.on(JMVC.W, 'scroll', backT);
    }

});

/*

JMVC.require('widget/screensaver/screensaver');
JMVC.screensaver.shut();
window.setTimeout(function (){
JMVC.screensaver.up();
}, 5000);

*/