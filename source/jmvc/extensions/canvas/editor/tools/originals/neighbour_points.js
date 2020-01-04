

var el = document.getElementById('c');
var ctx = el.getContext('2d');

ctx.lineWidth = 1;
ctx.lineJoin = ctx.lineCap = 'round';

var isDrawing, points = [ ];

el.onmousedown = function(e) {
  points = [ ];
  isDrawing = true;
  points.push({ x: e.clientX, y: e.clientY });
};

el.onmousemove = function(e) {
  if (!isDrawing) return;

  //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  points.push({ x: e.clientX, y: e.clientY });

  ctx.beginPath();
  ctx.moveTo(points[points.length - 2].x, points[points.length - 2].y);
  ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
  ctx.stroke();
  
  for (var i = 0, len = points.length; i < len; i++) {
    dx = points[i].x - points[points.length-1].x;
    dy = points[i].y - points[points.length-1].y;
    d = dx * dx + dy * dy;

    if (d < 1000) {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.moveTo( points[points.length-1].x + (dx * 0.2), points[points.length-1].y + (dy * 0.2));
      ctx.lineTo( points[i].x - (dx * 0.2), points[i].y - (dy * 0.2));
      ctx.stroke();
    }
  }
};

el.onmouseup = function() {
  isDrawing = false;
  points.length = 0;
};

