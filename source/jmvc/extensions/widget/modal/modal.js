JMVC.require(
    'core/screen/screen',
    'event_scroll/event_scroll'
);
JMVC.extend('modal', {
    init: function () {
        // get style
        JMVC.head.addStyle(JMVC.vars.baseurl + '/app/extensions/widget/modal/modal.css', true);
    },
    zi_zero: 900,
    zIndex: 900,
    count: 0,
    tpl: '<div class="jmvc_modal_content shadow" style="z-index: %zindex%; width: %width%px; height: %height%px; left: %left%px; top: %top%px;">' +
        '<div class="drag" style="height:%height%px;width:%width%px;left:0px;top:0px">' +
        '<div class="tl"></div>' +
        '<div class="t"></div>' +
        '<div class="tr"></div>' +
        '<div class="l"></div>' +
        '<div class="r"></div>' +
        '<div class="bl"></div>' +
        '<div class="b"></div>' +
        '<div class="br"></div>' +
        '</div>' +
        '<div class="cnt" style="width:%width%px">' +
        '<div class="topbar">' +
        '<div class="jmvc_modal_title">%title%</div>' +
        '<div class="jmvc_modal_close" title="close">x</div>' +
        '<div class="jmvc_modal_maximize" title="maximize">□</div>' +
        '<br class="clearer">' +
        '</div>' +
        '<div class="given_content_container">' +
        '<span>Here is some content</span>' +
        '</div>' +
        '</div>' +
        '</div>',

    injtpl: function () {
        JMVC.dom.html(JMVC.WD.body, JMVC.string.replaceAll(this.tpl, {
            zindex: 300,
            width: 300,
            height: 400,
            left: 70,
            top: 50
        }));
    },

    /**
     * [open description]
     * @param  {[type]} content [description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    open: function (content, options) {
        // first tab disable scroll
        !this.count && JMVC.events.disable_scroll(JMVC.WD.body);
        this.count++;
        var bgcolor = options && options.bgcolor ? options.bgcolor : 'black',
            shadow = options && options.shadow,
            width,
            height,
            title = options.title || '',
            dom = {
                bg: null,
                modal: null,
                topbar: null,
                title: null,
                close: null,
                maximize: null,
                minimize: null,
                lowerize: null,
                content_wrapper: null
            },
            position,
            bodysize = JMVC.screen.bodySize(),
            viewportSize = JMVC.screen.getViewportSize(),
            // viewHeight = viewportSize.height,
            bgZindex = this.zIndex++,
            cntZindex = this.zIndex++;

        width = options.width || (viewportSize.width / 2);
        height = options.height || (viewportSize.height / 2);

        // create bg
        dom.bg = JMVC.dom.create('div', {
            'class': 'jmvc_modal_content_bg opa5',
            style: 'z-index:' + bgZindex + ';width:' + bodysize[0] + 'px;height:' + bodysize[1] + 'px;background-color:' + bgcolor + ';'
        });

        JMVC.dom.append(JMVC.dom.body(), dom.bg);

        // now create real content
        // a div with topbar and content passsed
        dom.modal = JMVC.dom.create('div', { 'class': 'jmvc_modal_content' + (shadow ? ' shadow' : '') });
        position = JMVC.screen.centerHelper(width, height);

        JMVC.css.style(dom.modal, {
            'z-index': cntZindex,
            width: width + 'px',
            height: height + 'px',
            left: position['left'] + 'px',
            top: position['top'] + 'px'
        });

        dom.topbar = JMVC.dom.add(dom.modal, 'div', { 'class': 'topbar' });
        dom.title = JMVC.dom.create('div', { 'class': 'jmvc_modal_title' }, title);
        dom.close = JMVC.dom.create('div', { 'class': 'jmvc_modal_close', title: 'close' }, 'x');

        dom.maximize = JMVC.dom.create('div', { 'class': 'jmvc_modal_maximize', title: 'maximize' }, '&square;');
        dom.minimize = JMVC.dom.create('div', { 'class': 'jmvc_modal_minimize', title: 'minimize' }, '<sub>&square;</sub>');
        dom.lowerize = JMVC.dom.create('div', { 'class': 'jmvc_modal_lowerize', title: 'lowerize' }, '_');

        dom.close.el = dom.maximize.el = dom.modal;
        dom.close.bg = dom.bg;

        JMVC.dom.append(dom.topbar, [dom.title, dom.close, dom.maximize, dom.minimize, dom.lowerize, JMVC.dom.create('br', { 'class': 'clearer' })]);

        //
        // exit either:
        // - click on closing cross
        // - click out of the modal
        // - press esc button
        JMVC.events.on([dom.close, dom.bg], 'click', function (e) {
            JMVC.modal.close(dom);
        });
        JMVC.events.on(JMVC.W, 'keyup', function (e) {
            JMVC.events.code(e) === 27 && JMVC.modal.close(dom);
        });

        //
        // maximize
        JMVC.events.on(dom.maximize, 'click', function (e) {
            //
            // here must be stored current position
            // to allow to get back later (on minimize)
            //
            var scr = JMVC.screen.scroll();
            JMVC.css.style(dom.modal, {
                width: 'auto',
                height: (viewportSize.height - 15) + 'px',
                left: '5px',
                right: '5px',
                top: (scr.top + 5) + 'px'
            });
        });

        dom.content_wrapper = JMVC.dom.create('div', { 'class': 'given_content_container' }, content);

        JMVC.css.style(dom.content_wrapper, { height: (height - 50) + 'px' });
        JMVC.dom.append(dom.modal, dom.content_wrapper);
        JMVC.dom.append(JMVC.dom.body(), dom.modal);
    },

    /**
     * [close description]
     * @param  {[type]} element [description]
     * @return {[type]}         [description]
     */
    close: function (element) {
        this.count--;
        if (!this.count) {
            this.zIndex = this.zi_zero;
            JMVC.events.enable_scroll();
        }
        JMVC.events.off(JMVC.W, 'keyup');
        JMVC.dom.remove(element.modal, true);
        JMVC.dom.remove(element.bg, true);
    }
});
