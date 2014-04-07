// AMD friendly, if shutup mode
if (typeof JMVCshut !== 'undefined') {
    (function(m) {
        if (typeof define === "function" && define.amd) {
            define(function() {
                return JMVC;
            });
        }
    })(JMVC);
}