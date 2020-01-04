

// http://carisenda.com/blog/2012/howto-draw-a-star-with-canvas.html
function drawStar(x, y, angle) {
  var length = 15;
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.rotate(Math.PI / 180 * angle);
  for (var i = 5; i--;) {
    ctx.lineTo(0, length);
    ctx.translate(0, length);
    ctx.rotate((Math.PI * 2 / 10));
    ctx.lineTo(0, -length);
    ctx.translate(0, -length);
    ctx.rotate(-(Math.PI * 6 / 10));
  }
  ctx.lineTo(0, length);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var el = document.getElementById('c');
var ctx = el.getContext('2d');

ctx.lineJoin = ctx.lineCap = 'round';
ctx.strokeStyle = 'purple';

var isDrawing, points = [ ], radius = 15;

el.onmousedown = function(e) {
  isDrawing = true;
  points.push({ x: e.clientX, y: e.clientY, angle: getRandomInt(0, 180) });
};
el.onmousemove = function(e) {
  if (!isDrawing) return;
  
  points.push({ x: e.clientX, y: e.clientY, angle: getRandomInt(0, 180) });
  
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  for (var i = 0; i < points.length; i++) {
    drawStar(points[i].x, points[i].y, points[i].angle);
  }
};
el.onmouseup = function() {
  isDrawing = false;
  points.length = 0;
};

