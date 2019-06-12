JMVC.models.Circle = function (fieldSize) {
    var speedFactor = 2;
    this.size = 1;
    this.fieldSize = fieldSize;
    this.x = this.size + Math.floor(Math.random() * (this.fieldSize.width - 2 * this.size));
    this.y = this.size + Math.floor(Math.random() * (this.fieldSize.height - 2 * this.size));
    this.velocityX = speedFactor * Math.random();
    this.velocityY = speedFactor * Math.random();
    this.inv = false;
};

JMVC.models.Circle.prototype.draw = function (ctx) {
    ctx.fillStyle = this.inv ? '#FF0000' : '#00FF00';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
    ctx.fill();
};

JMVC.models.Circle.prototype.update = function (ctx) {
    var invX = this.x < this.size || this.x > (this.fieldSize.width - this.size),
        invY = this.y < this.size || this.y > (this.fieldSize.height - this.size);
    if (invX) this.velocityX = -this.velocityX;
    if (invY) this.velocityY = -this.velocityY;
    if (invX || invY) this.inv = !this.inv;
    this.x += this.velocityX;
    this.y += this.velocityY;
};
