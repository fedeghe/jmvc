JMVC.extend('css.pointer', function () {
    var instance = false,
        axisX, axisY, square,
        infoX, infoY,
        squareSize = 20,
        lineColor = '#444',
        lineStyle = 'dashed',
        lineSize = 1,
        move = function (x, y, aX, aY, iX, iY, sQ) {
            var top = window.document.documentElement.scrollTop;

            JMVC.css.style(aX, { display: 'block', left: x + 'px', top: top + 'px' });
            JMVC.css.style(aY, { display: 'block', left: 0, top: y + 'px' });
            JMVC.css.style(sQ, { display: 'block', left: (x - squareSize / 2) + 'px', top: (y - squareSize / 2) + 'px' });

            JMVC.css.style(iX, { display: 'block', left: x + 'px', top: top + 'px' });
            JMVC.css.style(iY, { display: 'block', top: y + 'px' });
            JMVC.dom.html(iX, x);
            JMVC.dom.html(iY, y);
        },
        doMove = function (e) {
            var coords = JMVC.events.coord(e);
            move(coords[0], coords[1], axisX, axisY, infoX, infoY, square);
        },
        hide = function (e, aX, aY, iX, iY, sQ) {
            JMVC.css.style(aX, { display: 'none' });
            JMVC.css.style(aY, { display: 'none' });
            JMVC.css.style(sQ, { display: 'none' });
            JMVC.css.style(iX, { display: 'none' });
            JMVC.css.style(iY, { display: 'none' });
        },
        zoomIn = function (e) {
            var coords = JMVC.events.coord(e);
            console.debug(coords);
            console.debug(document.elementFromPoint(coords[0], coords[1]));
        },
        create = function () {
            axisX = document.createElement('div');
            axisY = document.createElement('div');
            square = document.createElement('div');
            infoX = document.createElement('div');
            infoY = document.createElement('div');
            instance = true;

            JMVC.css.style(infoX, { position: 'absolute', zIndex: 1000, top: 0, fontSize: '8px', padding: '3px' });
            JMVC.css.style(infoY, { position: 'absolute', zIndex: 1000, left: 0, fontSize: '8px', padding: '3px' });
            JMVC.css.style(axisX, { 'pointer-events': 'none', position: 'absolute', zIndex: 1000, width: '0px', height: '100%', borderLeft: lineSize + 'px ' + lineStyle + ' ' + lineColor });
            JMVC.css.style(axisY, { 'pointer-events': 'none', position: 'absolute', zIndex: 1000, width: '100%', height: '0px', borderBottom: lineSize + 'px ' + lineStyle + ' ' + lineColor });
            JMVC.css.style(square, { 'pointer-events': 'none', position: 'absolute', zIndex: 2000, width: squareSize + 'px', height: squareSize + 'px', border: '1px solid #444', backgroundColor: 'coral', opacity: 0.5 });

            move(-200, -200, axisX, axisY, infoX, infoY, square);

            JMVC.dom.append(document.body, [
                square,
                axisX, axisY, infoX, infoY]);

            JMVC.events.on(window, 'mousemove', doMove);
            JMVC.events.on(square, 'click', zoomIn);
            JMVC.events.on(window, 'scroll', function (e) { hide(e, axisX, axisY, infoX, infoY, square); });
        },
        destroy = function () {
            JMVC.events.off(window, 'mousemove', doMove);
            JMVC.events.off(window, 'scroll', hide);
            JMVC.events.off(square, 'click', zoomIn);
            JMVC.dom.remove([axisX, axisY, square, infoX, infoY]);
            instance = false;
        };

    return {
        start: function () {
            if (instance) { return; }
            document.body.style.cursor = 'none';
            create();
        },
        stop: function () {
            if (!instance) { return; }
            document.body.style.cursor = 'default';
            destroy();
        }
    };
});

/*
JMVC.require('core/css', function (){
  JMVC.css.pointer.start();
});
*/
