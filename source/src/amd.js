/* eslint-disable no-undef */
// AMD friendly, if shutup mode
//
if (typeof JMVCshut !== 'undefined') {
    (function (m) {
        typeof define === 'function' &&
            define.amd &&
            define(function () { return JMVC; });
    })(JMVC);
}
