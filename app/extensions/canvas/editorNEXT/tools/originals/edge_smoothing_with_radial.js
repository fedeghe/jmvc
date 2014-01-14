

var el = document.getElementById('c');
var ctx = el.getContext('2d');
var isDrawing;

el.onmousedown = function(e) {
  isDrawing = true;
  ctx.moveTo(e.clientX, e.clientY);
};
el.onmousemove = function(e) {
  if (isDrawing) {
    var radgrad = ctx.createRadialGradient(
      e.clientX,e.clientY,10,e.clientX,e.clientY,20);
    
    radgrad.addColorStop(0, '#000');
    radgrad.addColorStop(0.5, 'rgba(0,0,0,0.5)');
    radgrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = radgrad;
    
    ctx.fillRect(e.clientX-20, e.clientY-20, 40, 40);
  }
};
el.onmouseup = function() {
  isDrawing = false;
};

//////////////////////////////////////////////////////





function distanceBetween(point1, point2) {
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}
function angleBetween(point1, point2) {
  return Math.atan2( point2.x - point1.x, point2.y - point1.y );
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
  
  for (var i = 0; i < dist; i+=5) {
    
    x = lastPoint.x + (Math.sin(angle) * i);
    y = lastPoint.y + (Math.cos(angle) * i);
    
    var radgrad = ctx.createRadialGradient(x,y,10,x,y,20);
    
    radgrad.addColorStop(0, '#000');
    radgrad.addColorStop(0.5, 'rgba(0,0,0,0.5)');
    radgrad.addColorStop(1, 'rgba(0,0,0,0)');
    
    ctx.fillStyle = radgrad;
     ctx.fillRect(x-20, y-20, 40, 40);
  }
  
  lastPoint = currentPoint;
};

el.onmouseup = function() {
  isDrawing = false;
};

