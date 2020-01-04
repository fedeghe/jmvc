JMVC.head.addStyle(JMVC.vars.baseurl + '/app/extensions/widget/gauge/gauge.css', true);

JMVC.nsCheck('JMVC.widget');

JMVC.widget.Gauge = function () {
    this.node = JMVC.dom.create('div', { 'class': 'JMVCgauge' });
    var wrap = JMVC.dom.add(this.node, 'div', { 'class': 'JMVCgaugeWrap' });
    this.bar = JMVC.dom.add(wrap, 'div', { 'class': 'JMVCgaugeBar' });
    this.val = 0;
};

JMVC.widget.Gauge.prototype.set = function (v) {
    this.val = (v % 101) || this.val;
    JMVC.css.style(this.bar, { width: this.val + '%' });
    JMVC.dom.html(this.bar, this.val + ' %');
};

JMVC.widget.Gauge.prototype.get = function () {
    return ~~this.val;
};

JMVC.widget.Gauge.prototype.render = function (p) {
    return (p && JMVC.dom.isNode(p))
        ? JMVC.dom.html(p, this.node)
        : this.node;
};
