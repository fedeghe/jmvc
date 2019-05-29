// load widget style related
JMVC.head.addStyle(JMVC.vars.baseurl + '/app/extensions/widget/accordion/accordion.css', true);

JMVC.require('core/fx/fx', 'core/cookie/cookie');

JMVC.widget.Accordion = function (h, slide, theme) {
    this.theme = theme || 'default';
    this.eff = slide || 'default';
    this.els = [];
    this.height = h || 300;
};
JMVC.widget.Accordion.prototype.addElement = function (title, content) {
    this.els.push({
        title: title,
        content: content,
        dom: []
    });
};
JMVC.widget.Accordion.prototype.removeElement = function (n) {
    this.els[n] && this.els.splice(n, 1);
};

JMVC.widget.Accordion.prototype.render = function (container, openIndex, rem) {
    var ul = JMVC.dom.create('ul', { 'class': 'accordionContainer ' + this.theme }),
        attrs,
        self = this,
        cookieRemName = rem ? 'jmvc_accordion_' + rem : null,
        cookieVal,
        showFunc = this.eff === 'default' ? 'show' : 'slideDown',
        hideFunc = this.eff === 'default' ? 'hide' : 'slideUp',
        viewtmp,
        li,
        i,
        len;

    openIndex = openIndex || 0;

    viewtmp = openIndex;

    if (rem) {
        cookieVal = JMVC.num.getNum(JMVC.cookie.get(cookieRemName));
        openIndex = cookieVal >= 0 ? cookieVal : openIndex;
    }

    JMVC.cookie.set(cookieRemName, openIndex);

    JMVC.dom.append(container, ul);

    for (i = 0, len = this.els.length, li = false; i < len; i += 1) {
        li = JMVC.dom.add(ul, 'li', { 'class': 'accordionElement ' + this.theme });
        attrs = {
            'class': 'content ' + this.theme
            /* 'style':'minHeight:' + this.height + 'px' */
        };

        if (i !== openIndex) {
            attrs.style = 'display:none';
        }
        // console.debug('openIndex : '+ openIndex );
        this.els[i].dom = [
            JMVC.dom.create('div', { 'class': this.theme + ' title' + (i === openIndex ? ' selected' : '') }, this.els[i].title),
            JMVC.dom.create('div', attrs, this.els[i].content)
        ];

        JMVC.dom.append(li, this.els[i].dom[0]);
        JMVC.dom.append(li, this.els[i].dom[1]);

        (function (j) {
            JMVC.events.on(
                self.els[j].dom[0],
                'click',
                function (e) {
                    var y = JMVC.cookie.get(cookieRemName);

                    if (y === j) {
                        return false;
                    }

                    JMVC.fx[hideFunc](self.els[y].dom[1], 10);
                    JMVC.fx[showFunc](self.els[j].dom[1], 10);
                    JMVC.dom.removeClass(self.els[y].dom[0], 'selected');
                    JMVC.dom.addClass(self.els[j].dom[0], 'selected');
                    viewtmp = j;
                    JMVC.cookie.set(cookieRemName, j);
                }
            );
        })(i);
    }
};
