//
JMVC.canvas.Editor.Panel = function () {
    this.node = JMVC.dom.create('div', {'class':'panel'});
    JMVC.dom.add(this.node, 'div', {'class':'arrow'});
    this.inner = JMVC.dom.add(this.node, 'div', {"class":"inner"});
    this.rendered = false;
};
JMVC.canvas.Editor.Panel.prototype = {
    show : function (top, left) {
        this.onBeforeOpen();
        JMVC.css.style(this.node, {top : (top + 15) + 'px', left : (left + 20) + 'px', position : 'absolute'});
        JMVC.css.show(this.node);
        this.onAfterOpen();
    },
    hide : function () {
        this.onBeforeClose();
        JMVC.css.hide(this.node);
        this.onAfterClose();
    },
    render : function () {
        !this.rendered && JMVC.dom.append(JMVC.dom.find('#jmvcCEpanel'), this.node);
        this.rendered = true;
    },
    html : function (html) {
        JMVC.dom.html(this.inner, html);
    },
    getInnerNode : function () {
        return this.inner;
    },
    onBeforeOpen : function () {},
    onAfterOpen : function () {},
    onBeforeClose : function () {},
    onAfterClose : function () {}
};
/*
var p = new JMVC.canvas.Editor.toolsPanel();
p.render();
p.show(40, 150);
setTimeout(function (){p.fadeOut();}, 3000);
*/
