

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var el = document.getElementById('c');
var ctx = el.getContext('2d');

ctx.lineWidth = 1;
ctx.lineJoin = ctx.lineCap = 'round';
ctx.strokeStyle = 'purple';

var isDrawing, lastPoint;

el.onmousedown = function(e) {
  isDrawing = true;
  lastPoint = { x: e.clientX, y: e.clientY };
};

el.onmousemove = function(e) {
  if (!isDrawing) return;

  ctx.beginPath();
  
  ctx.moveTo(lastPoint.x - getRandomInt(0, 2), lastPoint.y - getRandomInt(0, 2));
  ctx.lineTo(e.clientX - getRandomInt(0, 2), e.clientY - getRandomInt(0, 2));
  ctx.stroke();
  
  ctx.moveTo(lastPoint.x, lastPoint.y);
  ctx.lineTo(e.clientX, e.clientY);
  ctx.stroke();
  
  ctx.moveTo(lastPoint.x + getRandomInt(0, 2), lastPoint.y + getRandomInt(0, 2));
  ctx.lineTo(e.clientX + getRandomInt(0, 2), e.clientY + getRandomInt(0, 2));
  ctx.stroke();
    
  lastPoint = { x: e.clientX, y: e.clientY };
};

el.onmouseup = function() {
  isDrawing = false;
};

