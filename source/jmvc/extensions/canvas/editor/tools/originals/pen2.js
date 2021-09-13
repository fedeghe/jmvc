var el = document.getElementById('c');
var ctx = el.getContext('2d');

ctx.lineWidth = 1;
ctx.lineJoin = ctx.lineCap = 'round';

var isDrawing, points = [ ], density= 3;

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function draw(centreX, centreY, radius) {
    for (var i = density; i--; ) {
      var angle = getRandomFloat(0, Math.PI*2);
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(
        centreX + radius * Math.cos(angle),
        centreY + radius * Math.sin(angle), 
        1, 1);
    }
}

el.onmousedown = function(e) {
  points = [ ];
  isDrawing = true;
  clientX = e.clientX;
  clientY = e.clientY;
  points.push({ x: e.clientX, y: e.clientY });
};

el.onmousemove = function(e) {
  if (!isDrawing) return;
  clientX = e.clientX;
  clientY = e.clientY;
  //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  points.push({ x: e.clientX, y: e.clientY });

  for (var i = 0, len = points.length; i < len; i++) {
    dx = points[i].x - points[points.length-1].x;
    dy = points[i].y - points[points.length-1].y;
    d = dx * dx + dy * dy;

    if (d < 1000) {
        centreX = points[i].x - (dx * 0.5);
        centreY = points[i].y - (dy * 0.5);
        radius = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2)) * 0.8;
        draw(centreX, centreY, radius);
    }
  }
};

el.onmouseup = function() {
  isDrawing = false;
  points.length = 0;
};