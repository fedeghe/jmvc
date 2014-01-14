

var el = document.getElementById('c');
var ctx = el.getContext('2d');

ctx.lineWidth = 3;
ctx.lineJoin = ctx.lineCap = 'round';

var isDrawing, lastPoint;

el.onmousedown = function(e) {
  isDrawing = true;
  lastPoint = { x: e.clientX, y: e.clientY };
};

el.onmousemove = function(e) {
  if (!isDrawing) return;

  ctx.beginPath();
  
  ctx.globalAlpha = 1;
  ctx.moveTo(lastPoint.x - 4, lastPoint.y - 4);
  ctx.lineTo(e.clientX - 4, e.clientY - 4);
  ctx.stroke();
  
  ctx.globalAlpha = 0.6;
  ctx.moveTo(lastPoint.x - 2, lastPoint.y - 2);
  ctx.lineTo(e.clientX - 2, e.clientY - 2);
  ctx.stroke();
  
  ctx.globalAlpha = 0.4;
  ctx.moveTo(lastPoint.x, lastPoint.y);
  ctx.lineTo(e.clientX, e.clientY);
  ctx.stroke();
  
  ctx.globalAlpha = 0.3;
  ctx.moveTo(lastPoint.x + 2, lastPoint.y + 2);
  ctx.lineTo(e.clientX + 2, e.clientY + 2);
  ctx.stroke();
  
  ctx.globalAlpha = 0.2;
  ctx.moveTo(lastPoint.x + 4, lastPoint.y + 4);
  ctx.lineTo(e.clientX + 4, e.clientY + 4);
  ctx.stroke();
    
  lastPoint = { x: e.clientX, y: e.clientY };
};

el.onmouseup = function() {
  isDrawing = false;
};

