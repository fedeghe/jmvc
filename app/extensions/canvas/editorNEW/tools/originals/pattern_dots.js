

function midPointBtw(p1, p2) {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2
  };
}
function getPattern() {
  var patternCanvas = document.createElement('canvas'),
      dotWidth = 20,
      dotDistance = 5,
      patternCtx = patternCanvas.getContext('2d');

  patternCanvas.width = patternCanvas.height = dotWidth + dotDistance;

  patternCtx.fillStyle = 'red';
  patternCtx.beginPath();
  patternCtx.arc(dotWidth / 2, dotWidth / 2, dotWidth / 2, 0, Math.PI * 2, false);
  patternCtx.closePath();
  patternCtx.fill();
  return ctx.createPattern(patternCanvas, 'repeat');
}

var el = document.getElementById('c');
var ctx = el.getContext('2d');

ctx.lineWidth = 25;
ctx.lineJoin = ctx.lineCap = 'round';
ctx.strokeStyle = getPattern();

var isDrawing, points = [ ];

el.onmousedown = function(e) {
  isDrawing = true;
  points.push({ x: e.clientX, y: e.clientY });
};

el.onmousemove = function(e) {
  if (!isDrawing) return;
  
  points.push({ x: e.clientX, y: e.clientY });

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  var p1 = points[0];
  var p2 = points[1];
  
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);

  for (var i = 1, len = points.length; i < len; i++) {
    var midPoint = midPointBtw(p1, p2);
    ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
    p1 = points[i];
    p2 = points[i+1];
  }
  ctx.lineTo(p1.x, p1.y);
  ctx.stroke();
};

el.onmouseup = function() {
  isDrawing = false;
  points.length = 0;
};

