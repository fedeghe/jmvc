

var el = document.getElementById('c');
var ctx = el.getContext('2d');
var clientX, clientY, timeout;
var density = 50;

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

el.onmousedown = function(e) {
  ctx.lineJoin = ctx.lineCap = 'round';
  clientX = e.clientX;
  clientY = e.clientY;
  
  timeout = setTimeout(function draw() {
    for (var i = density; i--; ) {
      var angle = getRandomFloat(0, Math.PI*2);
      var radius = getRandomFloat(0, 20);
      ctx.fillRect(
        clientX + radius * Math.cos(angle),
        clientY + radius * Math.sin(angle), 
        1, 1);
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

