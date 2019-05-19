//
JMVC.canvas.Editor.Panel = function () {
    this.node = JMVC.dom.create('div', {'class' : 'panel'});
    JMVC.dom.add(this.node, 'div', {'class' : 'arrow'});
    this.inner = JMVC.dom.add(this.node, 'div', {"class" : "inner"});
    this.rendered = false;
};

JMVC.canvas.Editor.Panel.prototype = {

    /**
     * [show description]
     * @param  {[type]} top  [description]
     * @param  {[type]} left [description]
     * @return {[type]}      [description]
     */
    show : function (top, left) {
        this.onBeforeOpen();
        JMVC.css.style(this.node, {top : top + 'px', left : (left + 25) + 'px', position : 'absolute'});
        JMVC.css.show(this.node);
        this.onAfterOpen();
    },

    /**
     * [hide description]
     * @return {[type]} [description]
     */
    hide : function () {
        this.onBeforeClose();
        JMVC.css.hide(this.node);
        this.onAfterClose();
    },

    /**
     * [render description]
     * @return {[type]} [description]
     */
    render : function () {
        !this.rendered && JMVC.dom.append(JMVC.dom.find('#jmvcCEpanel'), this.node);
        this.rendered = true;
    },

    /**
     * [html description]
     * @param  {[type]} html [description]
     * @return {[type]}      [description]
     */
    html : function (html) {
        JMVC.dom.html(this.inner, html);
    },

    /**
     * [getInnerNode description]
     * @return {[type]} [description]
     */
    getInnerNode : function () {
        return this.inner;
    },

    /**
     * [onBeforeOpen description]
     * @return {[type]} [description]
     */
    onBeforeOpen : function () {},
    onAfterOpen : function () {},
    onBeforeClose : function () {},
    onAfterClose : function () {}
};

