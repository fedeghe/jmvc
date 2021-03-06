JMVC.extend('widget.divrot', {

    init: function () {
        JMVC.head.addStyle(JMVC.vars.baseurl + '/app/extensions/widget/divrot/divrot.css', true);
    },

    create: function (options) {
        var node = options.node,
            width = options.width || 200,
            height = options.height || 200,
            cnt = {
                top: options.top || '',
                bott: options.bott || '',
                right: options.right || '',
                back: options.back || '',
                left: options.left || '',
                front: options.front || ''
            },
            tpl = JMVC.string.replaceAll(
                '<div class="flip-card" style="width:%width%px !important; height:%height%px !important; margin-bottom:100px">' +
                    '<div class="flip-card-content">' +
                        '<div class="flip-card-side-top" style="background:gainsboro">%cnt_top%</div>' +
                        '<div class="flip-card-side-bott" style="background:lime">%cnt_bott%</div>' +
                        '<div class="flip-card-side-right" style="background:green">%cnt_right%</div>' +
                        '<div class="flip-card-side-back" style="background:blue">%cnt_back%</div>' +
                        '<div class="flip-card-side-left" style="background:yellow">%cnt_left%</div>' +
                        '<div class="flip-card-side-front" style="background:red">%cnt_front%</div>' +
                    '</div>' +
                '</div>',
                {
                    height: height,
                    width: width,
                    cnt_top: cnt.top,
                    cnt_bott: cnt.bott,
                    cnt_right: cnt.right,
                    cnt_back: cnt.back,
                    cnt_left: cnt.left,
                    cnt_front: cnt.front
                }
            ),
            currentO = 0,
            currentV = 0,
            clsNode = null,
            step = 90,
            swiping = false;

        JMVC.dom.html(node, tpl);

        clsNode = JMVC.dom.find('.flip-card-content');

        JMVC.events.on(document, 'keyup', function (e) {
            var code = parseInt(JMVC.events.code(e), 10),
                mode = 'o';

            switch (code) {
            case 37: currentO -= 1; mode = 'o'; break;
            case 39: currentO += 1; mode = 'o'; break;
            case 38: currentV += 1; mode = 'v'; break;
            case 40: currentV -= 1; mode = 'v'; break;
            }

            if (mode === 'o') {
                setO(currentO);
            } else if (mode === 'v') {
                setV(currentV);
            }
        });

        JMVC.events.drag.on(document, {
            move: function (e, data) {
                JMVC.events.preventDefault(e);
                if (swiping === true) {
                    return;
                }
                swiping = true;
                switch (data.orientation) {
                case 'e':
                    currentO += 1;
                    setO(currentO);
                    break;
                case 'se':
                    currentO += 1;
                    currentV -= 1;
                    setO(currentO);
                    setV(currentV);
                    break;
                case 's':
                    currentV -= 1;
                    setV(currentV);
                    break;
                case 'so':
                    currentV -= 1;
                    currentO -= 1;
                    setV(currentV);
                    setO(currentO);
                    break;
                case 'o':
                    currentO -= 1;
                    setO(currentO);
                    break;
                case 'no':
                    currentO -= 1;
                    currentV += 1;
                    setO(currentO);
                    setV(currentV);
                    break;
                case 'n':
                    currentV += 1;
                    setV(currentV);
                    break;
                case 'ne':
                    currentV += 1;
                    currentO += 1;
                    setV(currentV);
                    setO(currentO);
                    break;
                }
            },
            end: function () {
                swiping = false;
            }
        });

        function setO (o) {
            currentO = o;
            var tmp = currentO * step;
            return JMVC.css.style(clsNode, {
                'transform': 'rotateY(' + tmp + 'deg)',
                '-o-transform': 'rotatey(' + tmp + 'deg)',
                '-webkit-transform': 'rotateY(' + tmp + 'deg)',
                '-ms-transform': 'rotateY(' + tmp + 'deg)'
            });
        }

        function setV (v) {
            currentV = v;
            var tmp = currentV * step;
            return JMVC.css.style(clsNode, {
                'transform': 'rotateX(' + tmp + 'deg)',
                '-o-transform': 'rotatex(' + tmp + 'deg)',
                '-webkit-transform': 'rotateX(' + tmp + 'deg)',
                '-ms-transform': 'rotateX(' + tmp + 'deg)'
            });
        }

        return {
            setV: setV,
            setO: setO
            /**
                set : function (o, v){
                    var fq = new JMVC.FunctionQueue();
                    fq.add(function (o1, v1) {
                        console.debug(arguments)
                        var s = setO(o1);
                        return v1;
                    });
                    fq.add(function (v2) {
                        console.debug(arguments)
                        var s = setV(v2);
                        return s;
                    });
                    fq.run(o, v);
                }
            */

        };
    }
});
