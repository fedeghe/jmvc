// type : FACTORY_METHOD
//
JMVC.extend('calendar', {
    vars: {
        css_path: JMVC.vars.extensions + '/calendar/styles',
        today: new Date(),
        dINm: [31, false, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    },
    init: function () {
        // JMVC.debug(this.vars.css_path);
        JMVC.head.addStyle(JMVC.calendar.vars.css_path + '/default.css');
    },

    create: function (options) {
        var self = JMVC.calendar,
            getDaysInMonth,
            getMonthMap,
            getContour,
            render,
            contourBefore = {},
            currentMap = false;
        getDaysInMonth = function (m, y) {
            // the fastest checkLeap ever : JMVC.head.goto('test_leap')
            var bis = !!(!(y % 4) && (y % 100 || !(y % 400)));
            return self.vars.dINm[m] || bis ? 29 : 28;
        };
        getMonthMap = function (m, y) {
            var d = new Date(),
                first,
                dim = getDaysInMonth(m, y),
                i = 1;
            currentMap = {};
            d.setFullYear(y);
            d.setMonth(m);
            d.setDate(i);
            first = d.getDay();
            do { currentMap[i] = (first++) % 7; } while (i++ < dim);
            return currentMap;
        };
        getContour = function (m, y) {
            var mdown = (m - 1) % 12,
                ydown = (mdown !== m) ? y-- : y,
                previousCount = getDaysInMonth(mdown, ydown),
                first = currentMap[1], i = 0;

            if (!currentMap) { getMonthMap(m, y); }

            while (--first >= 0) {
                contourBefore[first] = previousCount - i;
                i++;
            }
        };
        return {
            dim: getDaysInMonth,
            gmm: getMonthMap,
            gc: getContour,
            render: render
        };
    }

});

// var b = new JMVC.calendar.create();
// console.dir(b.gmm(7, 2012));
//
