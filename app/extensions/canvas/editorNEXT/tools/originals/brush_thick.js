

var el = document.getElementById('c');
var ctx = el.getContext('2d');

ctx.lineWidth = 10;
ctx.lineJoin = ctx.lineCap = 'butt';

var isDrawing, lastPoint;

el.onmousedown = function(e) {
  isDrawing = true;
  lastPoint = { x: e.clientX, y: e.clientY };
};

el.onmousemove = function(e) {
  if (!isDrawing) return;

  ctx.beginPath();
  ctx.moveTo(lastPoint.x, lastPoint.y);
  ctx.lineTo(e.clientX, e.clientY);
  ctx.stroke();
  
  ctx.moveTo(lastPoint.x - 5, lastPoint.y - 5);
  ctx.lineTo(e.clientX - 5, e.clientY - 5);
  ctx.stroke();
  
  lastPoint = { x: e.clientX, y: e.clientY };
};

el.onmouseup = function() {
  isDrawing = false;
};

