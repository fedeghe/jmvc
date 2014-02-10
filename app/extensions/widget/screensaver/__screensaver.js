JMVC.require('core/screen/screen', 'event_scroll/event_scroll');
JMVC.extend('screensaver', {
    init : function () {
        var styles = {
            'body':'-webkit-transition: -webkit-transform 3s;' +
                '-moz-transition: -moz-transform 3s;' +
                '-o-transition: -o-transform 3s;' +
                'transition: transform 3s;' +
                '-webkit-transform-style: preserve-3d;' +
                '-moz-transform-style: preserve-3d;' +
                '-o-transform-style: preserve-3d;' +
                'transform-style: preserve-3d;' +
                '-webkit-transform-origin: right center;' +
                '-moz-transform-origin: right center;' +
                '-o-transform-origin: right center;' +
                'transform-origin: right center;',
            'body.flipped' : '-webkit-transform: translateX( -100% ) rotateY( -180deg );'+
                '-moz-transform: translateX( -100% ) rotateY( -180deg );'+
                '-o-transform: translateX( -100% ) rotateY( -180deg );'+
                'transform: translateX( -100% ) rotateY( -180deg );'
        };
        JMVC.head.addstyle(JMVC.object.toCss(styles, true), true, true);

    },
    shut : function () {
        JMVC.events.disable_scroll();
        JMVC.dom.addClass(JMVC.WD.body, 'flipped');

    },
    up : function () {
        JMVC.events.enable_scroll();
        JMVC.dom.removeClass(JMVC.WD.body, 'flipped');

    }
});

/*

JMVC.require('widget/screensaver/screensaver');
JMVC.screensaver.shut();
window.setTimeout(function (){
JMVC.screensaver.up();
}, 5000);

*/