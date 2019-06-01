/*
JMVC.require('core/fx/3DaniLogo');
JMVC.fx.threeDaniLogo(JMVC.dom.find('img')[4]);
*/
JMVC.extend('fx', function () {
    function constr (img, factor, persp) {
        factor = factor || 0.1;
        persp = persp || 0.8;

        var wp = JMVC.screen.getViewportSize(),
            position = {
                x: wp.width / 2,
                y: wp.height / 2
            },
            iW = img.width,
            iH = img.height,
            sW = iW * persp,
            sH = iH * persp,
            oriX = (iW - sW) / 2,
            oriY = -iH + (iH - sH) / 2,
            shadowImg = JMVC.dom.create('img', {
                src: img.src,
                style: 'width:' + sW + 'px;height:' + sH + 'px;'
            }),
            wrap = JMVC.dom.wrap(img, 'span', {
                style: 'position:relative'
            });

        JMVC.css.style(shadowImg, {
            zIndex: -10,
            opacity: 0.3,
            position: 'absolute',
            top: oriY + 'px',
            left: oriX + 'px'
        });

        JMVC.dom.prepend(wrap, shadowImg);

        JMVC.events.on(JMVC.WD, 'mousemove', function (e) {
            var eventPos = JMVC.events.coord(e);
            JMVC.css.style(shadowImg, {
                top: (oriY + (position.y - eventPos[1]) * factor) + 'px',
                left: (oriX + (position.x - eventPos[0]) * factor) + 'px'
            });
            JMVC.css.rotate(shadowImg, -(position.y - eventPos[1]) * (position.x - eventPos[0]) / 25E3);
        });
    }
    return {
        threeDaniLogo: constr
    };
});
