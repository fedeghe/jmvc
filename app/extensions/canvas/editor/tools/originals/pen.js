

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var el = document.getElementById('c');
var ctx = el.getContext('2d');

ctx.lineJoin = ctx.lineCap = 'round';
/*ctx.shadowBlur = 10;
ctx.shadowColor = 'rgb(0, 0, 0)';*/

var isDrawing, points = [ ];

el.onmousedown = function(e) {
  isDrawing = true;
  points.push({ 
    x: e.clientX, 
    y: e.clientY,
    width: getRandomInt(3, 5)
  });
};

el.onmousemove = function(e) {
  if (!isDrawing) return;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  points.push({ 
    x: e.clientX, 
    y: e.clientY,
    width: getRandomInt(3, 5)
  });

  for (var i = 1; i < points.length; i++) {
    ctx.beginPath();
    ctx.moveTo(points[i-1].x, points[i-1].y);
    ctx.lineWidth = points[i].width;
    ctx.lineTo(points[i].x, points[i].y);
    ctx.stroke();
  }
};

el.onmouseup = function() {
  isDrawing = false;
  points.length = 0;
};

