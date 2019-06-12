JMVC.models.Rect = function (fieldSize) {
    var speedFactor = 2;
    this.size = 5;
    this.fieldSize = fieldSize;
    this.x = fieldSize.width / 2; // + Math.floor(Math.random() * (this.fieldSize.width - 2 * this.size));
    this.y = fieldSize.height / 2; // + Math.floor(Math.random() * (this.fieldSize.height - 2 * this.size));
    this.velocityX = speedFactor * Math.random() * (Math.random() > 0.5 ? 1 : -1);
    this.velocityY = speedFactor * Math.random() * (Math.random() > 0.5 ? 1 : -1);
    this.bounces = 0;
};

JMVC.models.Rect.prototype.draw = function (ctx) {
    this.bounces = this.bounces % 10;
    var o = 1 - this.bounces / 10;
    ctx.fillStyle = 'rgba(255,255,255,' + o + ')';
    ctx.fillRect(this.x, this.y, this.size, this.size);
};

JMVC.models.Rect.prototype.update = function (ctx) {
    var invX = this.x < 0 || this.x > (this.fieldSize.width - this.size),
        invY = this.y < 0 || this.y > (this.fieldSize.height - this.size);
    if (invX) this.velocityX = -this.velocityX;
    if (invY) this.velocityY = -this.velocityY;
    if (invX || invY) this.bounces += 2;
    this.x += this.velocityX;
    this.y += this.velocityY;
};
