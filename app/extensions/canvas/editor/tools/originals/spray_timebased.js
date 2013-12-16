

var el = document.getElementById('c');
var ctx = el.getContext('2d');
var clientX, clientY, timeout;
var density = 50;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

el.onmousedown = function(e) {
  ctx.lineJoin = ctx.lineCap = 'round';
  clientX = e.clientX;
  clientY = e.clientY;
  
  timeout = setTimeout(function draw() {
    for (var i = density; i--; ) {
      var radius = 30;
      var offsetX = getRandomInt(-radius, radius);
      var offsetY = getRandomInt(-radius, radius);
      ctx.fillRect(clientX + offsetX, clientY + offsetY, 1, 1);
    }
    if (!timeout) return;
    timeout = setTimeout(draw, 50);
  }, 50);
};
el.onmousemove = function(e) {
  clientX = e.clientX;
  clientY = e.clientY;
};
el.onmouseup = function() {
  clearTimeout(timeout);
};

