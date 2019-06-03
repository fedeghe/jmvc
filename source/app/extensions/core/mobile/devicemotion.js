JMVC.extend('mobile/devicemotion', {
    deviceOrientation: function (f, absolute) {
        JMVC.events.on(window, 'deviceorientation', function (e) {
            e.absolute = typeof absolute !== 'undefined' ? absolute : false;
            f({
                alpha: e.alpha,
                beta: e.beta,
                gamma: e.gamma,
                e: e
            });
        });
    },
    deviceMotion: function (f) {
        JMVC.events.on(window, 'devicemotion', function (e) {
            f({
                accX: e.acceleration.x,
                accY: e.acceleration.y,
                accZ: e.acceleration.z,
                accGX: e.accelerationIncludingGravity.x,
                accGY: e.accelerationIncludingGravity.y,
                accGZ: e.accelerationIncludingGravity.z,
                accAlpha: e.rotationRate.alpha,
                accBeta: e.rotationRate.beta,
                accGamma: e.rotationRate.gamma,
                interval: e.interval,
                e: e
            });
        });
    }
});
