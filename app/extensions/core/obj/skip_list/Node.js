JMVC.nsMake('JMVC.obj.SLNode');
JMVC.obj.SLNode = function (value, bottom, next) {
    this.value = value
    this.bottom = bottom || null;
    this.next = next || null;
};

JMVC.obj.SLNode.prototype.makeHeader = function () {
    this.isHeader = true;
}
JMVC.obj.SLNode.prototype.makeSentinel = function () {
    this.isSentinel = true;
}
