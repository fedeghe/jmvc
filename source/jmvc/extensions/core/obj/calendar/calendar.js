// type : FACTORY_METHOD
//

JMVC.extend('calendar', {
    vars: {
        css_path: JMVC.vars.extensions + 'core/obj/calendar',
        today: new Date(),
        dINm: [31, false, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        months: []
    },
    init: function () {
        // JMVC.debug(this.vars.css_path);
        JMVC.head.addStyle(JMVC.calendar.vars.css_path + '/calendar.css');
    },
    create: function (options) {
        var cal = JMVC.calendar,
            self = this;
        this.contour_before = {};
        this.contour_after = {};
        this.currentMap = false;
        this.current_length = 0;
        this.starts_with = 1;// lun
        this.ends_with = (this.starts_with + 6) % 7;
        this.row_tpl = '<tr>' + JMVC.string.repeat('<td class="cl%n%">%%n%%</td>', 7) + '</tr>';

        return {
            getDaysInMonth: function (m, y) {
                var bis = ((!(y % 100) && !(y % 400)) || (!(y % 4) && (y % 100)));
                return cal.vars.dINm[m] ? cal.vars.dINm[m] : (bis ? 29 : 28);
            },
            getMonthMap: function (m, y) {
                var d = new Date(),
                    first,
                    dim = this.getDaysInMonth(m, y),
                    i = 1;
                self.currentMap = {};
                d.setFullYear(y);
                d.setMonth(m);
                d.setDate(i);
                first = d.getDay();
                self.current_length = dim;
                do { self.currentMap[i] = (first++) % 7; } while (i++ < dim);
                return self.currentMap;
            },
            getContour: function (m, y) {
                var mdown = (m - 1) % 12,
                    ydown = (mdown !== m) ? y-- : y,
                    previousCount = this.getDaysInMonth(mdown, ydown),

                    first = self.currentMap[1],
                    last = self.currentMap[self.current_length],
                    iStart = self.starts_with,
                    hmBefore = ((first + 7 - 1) % 7) - self.starts_with + 1,
                    hmAfter = (self.ends_with ? self.ends_with : 7) - last,
                    j;

                if (!self.currentMap) { this.getMonthMap(m, y); }

                for (j = 0; j < hmBefore; j++) {
                    self.contour_before[previousCount - hmBefore + j + 1] = iStart++;
                }
                for (j = 0; j < hmAfter; j++) {
                    self.contour_after[j + 1] = (++last) % 7;
                }

                return [self.contour_before, self.contour_after, self.row_tpl];
            },
            render: function () {
                var mid = '<table class="cal"><tr>',
                    col = 0,
                    i = self.starts_with,
                    j = 0,
                    l = cal.vars.days.length;

                for (null; j < l; i = (i + 1) % 7, j++) {
                    mid += '<th>' + cal.vars.days[i] + '</th>';
                }
                mid += '</tr>';

                // pre
                for (i in self.contour_before) {
                    mid += '<td class="pre">' + i + '</td>';
                    col += 1;
                }
                // current
                for (i in self.currentMap) {
                    mid += '<td class="curr">' + i + '</td>';
                    col++;
                    if (col % 7 === 0) {
                        mid += '</tr><tr>';
                        col = 0;
                    }
                }

                // post
                for (i in self.contour_after) {
                    mid += '<td class="after">' + i + '</td>';
                }
                mid += '</tr></table>';

                return mid;
            }
        };
    }
});
