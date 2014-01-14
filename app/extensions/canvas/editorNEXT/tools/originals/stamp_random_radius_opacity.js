

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var el = document.getElementById('c');
var ctx = el.getContext('2d');

ctx.lineJoin = ctx.lineCap = 'round';
ctx.fillStyle = 'red';

var isDrawing, points = [ ], radius = 15;

el.onmousedown = function(e) {
  isDrawing = true;
  points.push({ 
    x: e.clientX, 
    y: e.clientY,
    radius: getRandomInt(10, 30),
    opacity: Math.random()
  });
};
el.onmousemove = function(e) {
  if (!isDrawing) return;
  
  points.push({ 
    x: e.clientX, 
    y: e.clientY,
    radius: getRandomInt(5, 20),
    opacity: Math.random()
  });
  
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  for (var i = 0; i < points.length; i++) {
    ctx.beginPath();
    ctx.globalAlpha = points[i].opacity;
    ctx.arc(
      points[i].x, points[i].y, points[i].radius, 
      false, Math.PI * 2, false);
    ctx.fill();
  }
};
el.onmouseup = function() {
  isDrawing = false;
  points.length = 0;
};

