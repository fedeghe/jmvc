// type : LIB
//

JMVC.extend('border', {
    init: function () {
        JMVC.head.addStyle(JMVC.vars.extensions + 'core/lib/border/default.css', true, false);
    },
    /**
     * ALL METHODS RETURN A NODE THAT MUST BE APPENDED IN A RELATIVE POSITIONED NODE !!!
     */

    /*
        left > 0 => /
        left < 0 => \

        right > 0 => /
        right < 0 => \
    */
    xtop: function (height, width, left, right, color) {
        var node, dleft, dright, br,
            brdsize = height,
            leftStyle, rightStyle;

        node = JMVC.dom.create('div', { 'class': 'babs', 'style': 'top:' + -brdsize + 'px' });

        switch (true) {
        // /-------\
        case left >= 0 && right <= 0:
            leftStyle = 'width:' + (width / 2 - left) + 'px;' +
                'left:0px;top:0px;' +
                'border-left:' + left + 'px solid transparent;' +
                'border-bottom:' + brdsize + 'px solid ' + color + ';';
            rightStyle = 'width:' + (width / 2 + right) + 'px;' +
                'left:0px;top:0px;' +
                'border-right:' + -right + 'px solid transparent;' +
                'border-bottom:' + brdsize + 'px solid ' + color + ';';
            break;
        // /-------/OK
        case left >= 0 && right >= 0:
            leftStyle = 'width:' + (width / 2) + 'px;' +
                'left:0px;top:0px;' +
                'border-left:' + left + 'px solid transparent;' +
                'border-bottom:' + brdsize + 'px solid ' + color + ';';
            rightStyle = 'width:' + (width / 2 + right) + 'px;' +
                'right:' + -right + 'px;' +
                'top:' + -brdsize + 'px;' +
                'border-right:' + right + 'px solid transparent;' +
                'border-top:' + brdsize + 'px solid ' + color + ';';
            break;
        // \-------\OK
        case left <= 0 && right <= 0:
            leftStyle = 'width:' + (width / 2 - left) + 'px;' +
                'left:' + left + 'px;' +
                'top:0px;' +
                'border-left:' + -left + 'px solid transparent;' +
                'border-top:' + brdsize + 'px solid ' + color + ';';
            rightStyle = 'width:' + (width / 2) + 'px;' +
                'top:' + -brdsize + 'px;' +
                'right:0px;' +
                'border-right:' + -right + 'px solid transparent;' +
                'border-bottom:' + brdsize + 'px solid ' + color + ';';
            break;
        }

        dleft = JMVC.dom.create('div', { 'style': leftStyle, 'class': 'fleft zerofsize brel' }, '&nbsp;');
        dright = JMVC.dom.create('div', { 'style': rightStyle, 'class': 'fright zerofsize brel' }, '&nbsp;');
        br = JMVC.dom.create('br', { 'class': 'bclear' });

        return JMVC.dom.append(node, [dleft, dright, br]);
    },

    xbottom: function (height, width, left, right, color) {
        var node, dleft, dright, br,
            brdsize = height,
            leftStyle, rightStyle;

        node = JMVC.dom.create('div', { 'class': 'babs', 'style': 'bottom:' + (-2 * brdsize) + 'px' });
        switch (true) {
        // /-------\
        case left >= 0 && right <= 0:
            leftStyle = 'width:' + (width / 2 - left) + 'px;' +
                'left:0px;top:0px;' +
                'border-left:' + left + 'px solid transparent;' +
                'border-top:' + brdsize + 'px solid ' + color + ';';
            rightStyle = 'width:' + (width / 2 + right) + 'px;' +
                'left:0px;top:0px;' +
                'border-right:' + -right + 'px solid transparent;' +
                'border-top:' + brdsize + 'px solid ' + color + ';';
            break;
        // \-------\
        case left >= 0 && right >= 0:
            leftStyle = 'width:' + (width / 2) + 'px;' +
                'left:0px;top:0px;' +
                'border-left:' + left + 'px solid transparent;' +
                'border-top:' + brdsize + 'px solid ' + color + ';';
            rightStyle = 'width:' + (width / 2 + right) + 'px;' +
                'right:' + -right + 'px;' +
                'top:' + -brdsize + 'px;' +
                'border-right:' + right + 'px solid transparent;' +
                'border-bottom:' + brdsize + 'px solid ' + color + ';';
            break;
        // /-------/
        case left <= 0 && right <= 0:
            leftStyle = 'width:' + (width / 2 - left) + 'px;' +
                'left:' + left + 'px;' +
                'top:0px;' +
                'border-left:' + -left + 'px solid transparent;' +
                'border-bottom:' + brdsize + 'px solid ' + color + ';';
            rightStyle = 'width:' + (width / 2 + right) + 'px;' +
                'top:' + -brdsize + 'px;' +
                'right:0px;' +
                'border-right:' + -right + 'px solid transparent;' +
                'border-top:' + brdsize + 'px solid ' + color + ';';
            break;
        }
        dleft = JMVC.dom.create('div', { 'style': leftStyle, 'class': 'fleft zerofsize brel' }, '&nbsp;');
        dright = JMVC.dom.create('div', { 'style': rightStyle, 'class': 'fright zerofsize brel' }, '&nbsp;');
        br = JMVC.dom.create('br', { 'class': 'bclear' });

        return JMVC.dom.append(node, [dleft, dright, br]);
    },

    /*
        top > 0 => /
        top < 0 => \

        bottom > 0 => /
        bottom < 0 => \
    */
    xleft: function (height, width, top, bottom, color) {
        var node, dtop, dbottom,
            brdsize = width,
            topStyle, bottomStyle;

        node = JMVC.dom.create('div', { 'class': 'babs', 'style': 'left:-' + brdsize + 'px' });
        switch (true) {
        //
        // /
        // |
        // |
        // \
        case top >= 0 && bottom <= 0:
            topStyle = 'height:' + (height / 2) + 'px;' +
                'left:0px;top:0px;' +
                'border-top:' + top + 'px solid transparent;' +
                'border-right:' + brdsize + 'px solid ' + color + ';';
            bottomStyle = 'height:' + (height / 2) + 'px;' +
                'left:0px;top:0px;' +
                'border-bottom:' + (-bottom) + 'px solid transparent;' +
                'border-right:' + brdsize + 'px solid ' + color + ';';
            break;
        //
        // /
        // |
        // |
        // / OK
        case top >= 0 && bottom >= 0:
            topStyle = 'height:' + (height / 2) + 'px;' +
                'left:0px;top:0px;' +
                'border-top:' + top + 'px solid transparent;' +
                'border-right:' + brdsize + 'px solid ' + color + ';';
            bottomStyle = 'height:' + (height / 2 + bottom) + 'px;' +
                'left:0px;top:0px;' +
                'border-bottom:' + (bottom) + 'px solid transparent;' +
                'border-left:' + brdsize + 'px solid ' + color + ';';
            break;
        //
        // \
        // |
        // |
        // \ OK
        case top <= 0 && bottom <= 0:
            topStyle = 'height:' + (height / 2 - top) + 'px;' +
                'left:0px;top:' + top + 'px;' +
                'border-top:' + (-top) + 'px solid transparent;' +
                'border-left:' + brdsize + 'px solid ' + color + ';';
            bottomStyle = 'height:' + (height / 2) + 'px;' +
                'left:0px;top:' + top + 'px;' +
                'border-bottom:' + (-bottom) + 'px solid transparent;' +
                'border-right:' + brdsize + 'px solid ' + color + ';';
            break;
        }
        dtop = JMVC.dom.create('div', { 'style': topStyle, 'class': 'zerofsize brel' }, '&nbsp;');
        dbottom = JMVC.dom.create('div', { 'style': bottomStyle, 'class': 'zerofsize brel' }, '&nbsp;');

        return JMVC.dom.append(node, [dtop, dbottom]);
    },

    xright: function (height, width, top, bottom, color) {
        var node, dtop, dbottom,
            brdsize = width,
            topStyle, bottomStyle;

        node = JMVC.dom.create('div', { 'class': 'babs', 'style': 'right:-' + brdsize + 'px' });
        switch (true) {
        //
        // \
        // |
        // |
        // /
        case top >= 0 && bottom <= 0:
            topStyle = 'height:' + (height / 2) + 'px;' +
                'left:0px;' +
                'top:0px;' +
                'border-top:' + top + 'px solid transparent;' +
                'border-left:' + brdsize + 'px solid ' + color + ';';
            bottomStyle = 'height:' + (height / 2) + 'px;' +
                'left:0px;' +
                'top:0px;' +
                'border-bottom:' + (-bottom) + 'px solid transparent;' +
                'border-left:' + brdsize + 'px solid ' + color + ';';
            break;
        //
        // \
        // |
        // |
        // \ OK
        case top >= 0 && bottom >= 0:
            topStyle = 'height:' + (height / 2) + 'px;' +
                'left:0px;' +
                'top:0px;' +
                'border-top:' + top + 'px solid transparent;' +
                'border-left:' + brdsize + 'px solid ' + color + ';';
            bottomStyle = 'height:' + (height / 2 + bottom) + 'px;' +
                'left:0px;' +
                'top:0px;' +
                'border-bottom:' + (bottom) + 'px solid transparent;' +
                'border-right:' + brdsize + 'px solid ' + color + ';';
            break;
        //
        // /
        // |
        // |
        // / OK
        case top <= 0 && bottom <= 0:
            topStyle = 'height:' + (height / 2 - top) + 'px;' +
                'left:0px;' +
                'top:' + top + 'px;' +
                'border-top:' + (-top) + 'px solid transparent;' +
                'border-right:' + brdsize + 'px solid ' + color + ';';
            bottomStyle = 'height:' + (height / 2) + 'px;' +
                'left:0px;' +
                'top:' + top + 'px;' +
                'border-bottom:' + (-bottom) + 'px solid transparent;' +
                'border-left:' + brdsize + 'px solid ' + color + ';';
            break;
        }
        dtop = JMVC.dom.create('div', { 'style': topStyle, 'class': 'zerofsize brel' }, '&nbsp;');
        dbottom = JMVC.dom.create('div', { 'style': bottomStyle, 'class': 'zerofsize brel' }, '&nbsp;');

        return JMVC.dom.append(node, [dtop, dbottom]);
    },
    /*

    */
    top: function (color, bgcolor, w, size) {
        return JMVC.dom.create(
            'div',
            {
                'class': 'border oriz',
                'style': JMVC.string.replaceAll(
                    'border-left : %brdBG%; border-bottom:%brdFG%; border-right:%brdBG%;width:%w%px;',
                    {
                        brdFG: size + 'px solid ' + color,
                        brdBG: size + 'px solid ' + bgcolor,
                        w: w
                    }
                )
            },
            '&nbsp;'
        );
    },

    right: function (color, bgcolor, h, size) {
        return JMVC.dom.create(
            'div',
            {
                'class': 'border vert',
                'style': JMVC.string.replaceAll(
                    'border-left : %brdFG%; border-top:%brdBG%; border-bottom:%brdBG%;height:%h%px; float:right;',
                    {
                        brdFG: size + 'px solid ' + color,
                        brdBG: size + 'px solid ' + bgcolor,
                        h: h
                    }
                )
            },
            '&nbsp;'
        );
    },

    bottom: function (color, bgcolor, w, size) {
        return JMVC.dom.create(
            'div',
            {
                'class': 'border oriz',
                'style': JMVC.string.replaceAll(
                    'border-left : %brdBG%; border-top:%brdFG%; border-right:%brdBG%;width:%w%px;',
                    {
                        brdFG: size + 'px solid ' + color,
                        brdBG: size + 'px solid ' + bgcolor,
                        w: w
                    }
                )
            },
            '&nbsp;'
        );
    },

    left: function (color, bgcolor, h, size) {
        return JMVC.dom.create(
            'div',
            {
                'class': 'border vert',
                'style': JMVC.string.replaceAll(
                    'border-right : %brdFG%; border-top:%brdBG%; border-bottom:%brdBG%;height:%h%px; float:left;',
                    {
                        brdFG: size + 'px solid ' + color,
                        brdBG: size + 'px solid ' + bgcolor,
                        h: h
                    }
                )
            },
            '&nbsp;'
        );
    },

    vert: function (width, height, top, down, pos, color, bgcolor) {
        var verticalStyleTop = 'border-' + (top > 0 ? 'right' : 'left') + ':' + width + 'px solid ' + color + ';',
            verticalStyleBottom = 'border-' + (down > 0 ? 'right' : 'left') + ':' + width + 'px solid ' + color + ';',
            styleTop = 'border-top:' + Math.abs(top) + 'px solid ' + bgcolor + ';',
            styleBottom = 'border-bottom:' + Math.abs(down) + 'px solid ' + bgcolor + ';',
            divTop = JMVC.dom.create('div', {
                style: 'position:absolute;' + (top < 0 ? 'top:' + top + 'px;' : '') + 'border:0px;' + styleTop + verticalStyleTop + 'height:' + (height / 2 - (top > 0 ? top : 0)) + 'px;'
            }),

            divBottom = JMVC.dom.create('div', {
                'style': 'position:absolute;top:' + (height / 2) + 'px;border:0px;' + styleBottom + verticalStyleBottom + 'height:' + (height / 2 - (down > 0 ? down : 0)) + 'px;'
            }),

            container = JMVC.dom.create('div', {
                'class': 'border',
                'style': 'float:' + pos + ';position:relative;width:' + width + 'px;height:' + height + 'px;'
            });

        JMVC.dom.append(container, [divTop, divBottom]);

        return container;
    }
});
