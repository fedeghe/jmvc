// eslint-disable-next-line no-unused-vars
function rndSign () {
    return Math.random() > 0.5 ? 1 : -1;
}
function rndSize (min, max) {
    return min + (max - min) * Math.random();
}
JMVC.models.Star = function (fieldSize) {
    var speedFactor = 0.1,
        speed = speedFactor * rndSize(0, 2),
        direction = rndSize(0, 2 * Math.PI);
    this.time = 0;
    this.size = rndSize(1, 10);
    this.fieldSize = fieldSize;
    this.x = fieldSize.width / 2; // + Math.floor(Math.random() * (this.fieldSize.width - 2 * this.size));
    this.y = fieldSize.height / 2; // + Math.floor(Math.random() * (this.fieldSize.height - 2 * this.size));

    this.velocityX = speed * Math.cos(direction);
    this.velocityY = speed * Math.sin(direction);
    // this.velocityX = speedFactor * Math.random() * rndSign();
    // this.velocityY = speedFactor * Math.random() * rndSign();
    this.bounces = 0;
};

JMVC.models.Star.prototype.draw = function (ctx) {
    // this.bounces = this.bounces % 10;
    var o = 1 - Math.atan(this.bounces) / (Math.PI / 2),
        star = '⭐';

    ctx.fillStyle = 'rgba(255,255,255,' + o + ')';
    ctx.fillText(star, this.x, this.y);
};

JMVC.models.Star.prototype.update = function (ctx) {
    var invX = this.x < 0 || this.x > (this.fieldSize.width - this.size),
        invY = this.y < 0 || this.y > (this.fieldSize.height - this.size);
    this.time++;
    if (invX) this.velocityX = -this.velocityX;
    if (invY) this.velocityY = -this.velocityY;
    if (invX || invY) this.bounces += 1;

    this.x += this.time * this.velocityX;
    this.y += this.time * this.velocityY;
};
