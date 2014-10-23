/*
JMVC.require('core/fx/3DaniLogo');
JMVC.fx.threeDaniLogo(JMVC.dom.find('img')[4]);
*/
JMVC.extend('fx', function () {
    function construct(img, factor, persp) {
        factor = factor || 0.02;
        persp = persp || 0.8;

        var wp = JMVC.screen.getViewportSize(),
            position = {x : wp.width/2, y : wp.height/2},   //JMVC.dom.getPosition(img),
            iW = img.width,
            iH = img.height,
            sW = iW * persp,
            sH = iH * persp,
            shadowImg = JMVC.dom.create('img', {src: img.src, style : 'width:' + sW + 'px;height:' + sH + 'px;'}),
            wrap = JMVC.dom.wrap(img, 'span', {style : 'position:relative'}),
            oriX = (iW - sW) / 2,
            oriY = -iH + (iH - sH) / 2;

        JMVC.css.style(shadowImg, {
            zIndex : -10,
            opacity : 0.3,
            position:'absolute',
            top : oriY + 'px',
            left : oriX + 'px'
        });

        JMVC.dom.prepend(wrap, shadowImg);

        JMVC.events.on(JMVC.W, 'mousemove', function (e) {
            var eventPos = JMVC.events.coord(e);
            JMVC.css.style(shadowImg, {
                top : (oriY + (position.y - eventPos[1]) * factor) + 'px',
                left: (oriX + (position.x - eventPos[0]) * factor) + 'px'
            });            
        })
    }
    return {
        threeDaniLogo : construct
    }
});