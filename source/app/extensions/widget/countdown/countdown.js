
// be sure to have the correct namespace
JMVC.nsMake('JMVC.widget');

// create the widget
JMVC.extend('widget.countdown', {
    init: function () {
        var wc = JMVC.widget.countdown;
        wc.tpl = '<span class="jmvc_countdown" id="%id%">' +
            '<span class="wrap"><span id ="%idD%">%d%</span> days</span>' +
            // '<span class="wrap"><span id ="%idH%">%h%</span>h</span>' +
            // '<span class="wrap"><span id ="%idM%">%m%</span>m</span>' +
            // '<span class="wrap"><span id ="%idS%">%s%</span>s</span>' +
            // '<span class="wrap"><span id ="%idMS%">%ms%</span>ms</span>' +
            '</span>';
    },

    start: function (sel, date) {
        JMVC.head.addStyle('.jmvc_countdown{color:red} .jmvc_countdown span{padding:0px 3px}', true, true);
        var node = JMVC.dom.find(sel),
            wc = JMVC.widget.countdown,
            ids = {
                id: '' + JMVC.util.uniqueid,
                idD: '' + JMVC.util.uniqueid,
                idH: '' + JMVC.util.uniqueid,
                idM: '' + JMVC.util.uniqueid,
                idS: '' + JMVC.util.uniqueid,
                idMS: '' + JMVC.util.uniqueid
            },
            tpl = JMVC.string.replaceAll(wc.tpl, ids),
            now = JMVC.util.now(),
            d, h, m, s, ms,
            interval,
            diff,
            minms = 60 * 1000,
            hourms = minms * 60,
            dayms = hourms * 24,
            timeover = function () {
                JMVC.dom.html(JMVC.dom.find('#' + ids.id), 'Time over');
            },
            tf = function () {
                diff = date - now;
                d = ~~(diff / dayms) || '0';
                h = ~~((diff - d * dayms) / hourms) || '0';
                m = ~~((diff - d * dayms - h * hourms) / minms) || '0';
                s = ~~((diff - d * dayms - h * hourms - m * minms) / 1000) || '0';
                ms = diff % 1000;
                JMVC.dom.html(node, JMVC.string.replaceAll(tpl, {
                    d: d,
                    h: h,
                    m: m,
                    s: s,
                    ms: ms
                }));

                now = JMVC.util.now();
                if (now > date) {
                    JMVC.W.clearInterval(interval);
                    timeover();
                }
            };

        if (!node) {
            console.log('xxx');
            return false;
        }
        JMVC.dom.add(node, 'span', {}, JMVC.widget.countdown.tpl);
        tf();
        interval = JMVC.W.setInterval(tf, minms);
    }
});
