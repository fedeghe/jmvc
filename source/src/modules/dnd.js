/* eslint-disable no-undef */

_.events.drag = {
    gd1: false,
    getDirection: function (e) {
        var gd1 = this.gd1,
            gd2 = JMVC.events.coord(e),
            d,
            directions = [
                'o', 'no', 'no',
                'n', 'n', 'ne', 'ne',
                'e', 'e', 'se', 'se',
                's', 's', 'so', 'so',
                'o'
            ];
        d = parseFloat((Math.atan2(gd2[1] - gd1[1], gd2[0] - gd1[0]) * 180 / (Math.PI)).toFixed(3), 10);
        if (d < 0) d += 360;
        JMVC.events.drag.direction = d;
        JMVC.events.drag.orientation = directions[~~(((d + 180) % 360) / 22.5)];
        return true;
    }
};

JMVC.events.drag = {
    direction: false,
    orientation: false,
    on: function (el, fn) {
        var fStart = fn.start || function () {},
            fMove = fn.move || function () {},
            fEnd = fn.end || function () {},
            mmove = function (e) {
                _.events.drag.getDirection(e);

                var tmp = JMVC.events.coord(e),
                    dst = Math.sqrt(
                        (tmp[1] - _.events.drag.gd1[1]) * (tmp[1] - _.events.drag.gd1[1]) +
                        (tmp[0] - _.events.drag.gd1[0]) * (tmp[0] - _.events.drag.gd1[0])
                    );
                fMove.call(e, e, {
                    start: _.events.drag.gd1,
                    current: tmp,
                    direction: JMVC.events.drag.direction,
                    orientation: JMVC.events.drag.orientation,
                    distance: dst
                });
            },
            mup = function (e) {
                JMVC.events.off(el, 'mousemove');
                JMVC.events.off(el, 'touchmove');
                var tmp = JMVC.events.coord(e),
                    dst = Math.sqrt(
                        (tmp[1] - _.events.drag.gd1[1]) * (tmp[1] - _.events.drag.gd1[1]) +
                        (tmp[0] - _.events.drag.gd1[0]) * (tmp[0] - _.events.drag.gd1[0])
                    );

                fEnd.call(e, e, {
                    start: _.events.drag.gd1,
                    current: JMVC.events.coord(e),
                    direction: JMVC.events.drag.direction,
                    orientation: JMVC.events.drag.orientation,
                    distance: dst
                });
            };

        JMVC.events.on(el, 'mousedown', function (e) {
            _.events.drag.gd1 = JMVC.events.coord(e);
            fStart.call(e, e, { start: _.events.drag.gd1 });
            JMVC.events.on(el, 'mousemove', mmove);
        });

        JMVC.events.on(el, 'mouseup', mup);
        JMVC.events.on(el, 'touchstart', function (e) {
            _.events.drag.gd1 = JMVC.events.coord(e);
            fStart.call(e, e, { start: _.events.drag.gd1 });
            JMVC.events.on(el, 'touchmove', mmove);
        });
        JMVC.events.on(el, 'touchend', mup);
    },

    off: function (el, f) {
        JMVC.events.on(el, 'mouseup', f);
        JMVC.events.on(el, 'touchend', f);
    }
};
