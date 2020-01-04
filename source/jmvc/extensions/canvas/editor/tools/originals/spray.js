

var el = document.getElementById('c');
var ctx = el.getContext('2d');
var isDrawing;
var density = 50;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

el.onmousedown = function(e) {
  isDrawing = true;
  ctx.lineWidth = 10;
  ctx.lineJoin = ctx.lineCap = 'round';
  ctx.moveTo(e.clientX, e.clientY);
};
el.onmousemove = function(e) {
  if (isDrawing) {
    for (var i = density; i--; ) {
      var radius = 20;
      var offsetX = getRandomInt(-radius, radius);
      var offsetY = getRandomInt(-radius, radius);
      ctx.fillRect(e.clientX + offsetX, e.clientY + offsetY, 1, 1);
    }
  }
};
el.onmouseup = function() {
  isDrawing = false;
};

