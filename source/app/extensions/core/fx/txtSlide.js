JMVC.extend('fx.txtSlide', {
    active: true,
    shut: function () {
        this.active = false;
    },
    slide: function (node, txt, options) {
        txt = txt || 'swiping';
        options = options || {};

        var n = node,
            color = options.color || [255, 255, 255],
            steps = options.steps || 5,
            versus = options.versus || 'right',
            keys = [],
            repeat = options.repeat || false,
            topAlpha = options.topAlpha || 0.6,
            step = topAlpha / steps,
            chars = txt.split(''),
            len = chars.length,
            speed = options.speed || 500,
            nextSpeed = speed / 10,
            letterSpeed = speed / (2 * steps),
            els = [],
            tplStyle = { 'color': 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',%alpha%)' },
            i, t,
            repTo,
            self = this;

        // init
        //
        self.active = true;
        n.style.fontSize = '1em';
        n.style.fontWeight = 'bold';
        n.style.letterSpacing = '0.1em';
        n.innerHTML = '';
        for (i = 0; i < len; i++) {
            keys[i] = i;
            t = document.createElement('span');
            t.style.color = tplStyle.color.replace(/%alpha%/, 0);
            t.innerHTML = chars[i];
            n.appendChild(t);
            els.push(t);
        }

        // maybe wrong versus
        //
        versus === 'left' && keys.reverse();

        function fade (node) {
            var beg = 0, current = 0, end = topAlpha, sign = 1,
                to = window.setInterval(function () {
                    if (current >= end) sign = -1;
                    if (current <= beg) sign = 1;
                    current = current + sign * step;
                    node.style.color = tplStyle.color.replace(/%alpha%/, current);
                    if (current <= 0 || !self.active) {
                        window.clearInterval(to);
                    }
                }, letterSpeed);
        }

        function seq () {
            // shut it up if not active
            //
            if (!self.active) {
                window.clearInterval(repTo);
                return;
            }
            for (i = 0; i < len; i++) {
                (function (j, k) {
                    window.setTimeout(function () {
                        fade(els[j]);
                    }, nextSpeed * k);
                })(keys[i], i);
            }
        }

        // first
        seq();

        // what about the repeat param?
        //
        if (repeat) {
            repTo = window.setInterval(function () {
                // maybe we should reverse each time?
                versus === 'both' && keys.reverse();
                // again
                seq();
            }, repeat);
        }
    }
});
