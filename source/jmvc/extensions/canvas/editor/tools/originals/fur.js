

// based on http://www.tricedesigns.com/2012/01/04/sketching-with-html5-canvas-and-brush-images/

var img = new Image();
img.src = 'http://www.tricedesigns.com/wp-content/uploads/2012/01/brush2.png';
img.width = 10;

function distanceBetween(point1, point2) {
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}
function angleBetween(point1, point2) {
  return Math.atan2( point2.x - point1.x, point2.y - point1.y );
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var el = document.getElementById('c');
var ctx = el.getContext('2d');
ctx.lineJoin = ctx.lineCap = 'round';

var isDrawing, lastPoint;

el.onmousedown = function(e) {
  isDrawing = true;
  lastPoint = { x: e.clientX, y: e.clientY };
};

el.onmousemove = function(e) {
  if (!isDrawing) return;
  
  var currentPoint = { x: e.clientX, y: e.clientY };
  var dist = distanceBetween(lastPoint, currentPoint);
  var angle = angleBetween(lastPoint, currentPoint);
  
  for (var i = 0; i < dist; i++) {
    x = lastPoint.x + (Math.sin(angle) * i);
    y = lastPoint.y + (Math.cos(angle) * i);
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(0.5, 0.5);
    ctx.rotate(Math.PI * 180 / getRandomInt(0, 180));
    ctx.drawImage(img, 0, 0);
    ctx.restore();
  }
  
  lastPoint = currentPoint;
};

el.onmouseup = function() {
  isDrawing = false;
};

