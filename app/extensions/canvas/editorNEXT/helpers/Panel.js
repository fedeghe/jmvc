//
JMVC.canvas.Editor.Panel = function () {
    this.node = JMVC.dom.create('div', {'class':'panel'});
    JMVC.dom.add(this.node, 'div', {'class':'arrow'});
    this.inner = JMVC.dom.add(this.node, 'div', {"class":"inner"});
    this.rendered = false;
};
JMVC.canvas.Editor.Panel.prototype.show = function (top, left) {
    this.onBeforeOpen();
    JMVC.css.style(this.node, {top : (top + 15) + 'px', left : (left + 20) + 'px', position : 'absolute'});
    JMVC.css.show(this.node);
    this.onAfterOpen();
};
JMVC.canvas.Editor.Panel.prototype.hide = function () {
    this.onBeforeClose();
    JMVC.css.hide(this.node);
    this.onAfterClose();
};
JMVC.canvas.Editor.Panel.prototype.render = function () {
    !this.rendered && JMVC.dom.append(JMVC.dom.find('#jmvcCEpanel'), this.node);
    this.rendered = true;
};
JMVC.canvas.Editor.Panel.prototype.html = function (html) {
    JMVC.dom.html(this.inner, html);
};
JMVC.canvas.Editor.Panel.prototype.getInnerNode = function () {
    return this.inner;
};
JMVC.canvas.Editor.Panel.prototype.onBeforeOpen = function () {};
JMVC.canvas.Editor.Panel.prototype.onAfterOpen = function () {};
JMVC.canvas.Editor.Panel.prototype.onBeforeClose = function () {};
JMVC.canvas.Editor.Panel.prototype.onAfterClose = function () {};
/*
var p = new JMVC.canvas.Editor.toolsPanel();
p.render();
p.show(40, 150);
setTimeout(function (){p.fadeOut();}, 3000);
*/
