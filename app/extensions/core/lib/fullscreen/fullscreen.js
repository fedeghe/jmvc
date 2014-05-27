// type : LIB
// 

JMVC.extend('fullscreen', {
    up : function (element) {
        var ret = false;
        if(element.requestFullscreen) {
            ret = element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
            ret = element.mozRequestFullScreen();
        } else if(element.webkitRequestFullscreen) {
            ret = element.webkitRequestFullscreen();
        } else if(element.msRequestFullscreen) {
            ret = element.msRequestFullscreen();
        }
        return ret;
    },
    down : function () {
        var ret = false;
        if(document.exitFullscreen) {
            ret = document.exitFullscreen();
        } else if(document.mozCancelFullScreen) {
            ret = document.mozCancelFullScreen();
        } else if(document.webkitExitFullscreen) {
            ret = document.webkitExitFullscreen();
        }
        return ret;
    },
    
    el : document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement,
    enabled : document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled
});