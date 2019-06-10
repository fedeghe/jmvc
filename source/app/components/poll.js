var ___ = {
    tag: 'li',
    style: {
        backgroundColor: '#PARAM{bgcolor|white}',
        height: 'inherit'
    },
    attrs: { 'class': 'round8' },
    data: {
        submitUrl: '#PARAM{submitUrl}',
        id: JMVC.util.uniqueid + '',
        // questions-answers object
        qa: '#PARAM{questionsAnswers}',

        // the basic template
        tpl: {
            content: [{
                wid: 'pollElements',
                tag: 'ol',
                attrs: { 'class': 'num' },
                style: { width: '100%' },
                content: []
            }, {
                style: {
                    padding: '10px',
                    position: 'absolute',
                    bottom: '0px',
                    width: '100%'
                },
                content: [{
                    content: [{
                        content: [{
                            tag: 'button',
                            wid: 'previousB',
                            html: '&laquo;',
                            attrs: { 'class': ' round round4', onclick: 'return false;' }
                        }],
                        attrs: { 'class': 'floatl p33' },
                        style: { textAlign: 'left' }
                    }, {
                        content: [{
                            tag: 'button',
                            wid: 'submitB',
                            html: 'Submit',
                            attrs: { 'class': ' round round4', type: 'submit' }
                        }],
                        attrs: { 'class': 'floatl p33 round round4' },
                        style: { textAlign: 'center' }
                    }, {
                        content: [{
                            tag: 'button',
                            wid: 'nextB',
                            html: '&raquo;',
                            attrs: { 'class': ' round round4', onclick: 'return false;' }
                        }],
                        attrs: { 'class': 'floatl p33' },
                        style: { textAlign: 'right' }
                    }, 'clearer']
                }, {
                    content: [{
                        wid: 'gauge',
                        attrs: { 'class': 'round4 gauge' },
                        content: [{
                            style: {
                                width: '0%',
                                height: '14px',
                                backgroundColor: '#afa',
                                position: 'absolute',
                                left: '0px',
                                borderRight: '1px solid #0f0'
                            },
                            attrs: {
                                'class': 'round4 respfixed'
                            }
                        }, {
                            tag: 'div',
                            style: {
                                position: 'absolute',
                                width: '100%',
                                textAlign: 'center'
                            }
                        }]
                    }]
                }]
            }]
        }
    },
    content: [{
        tag: 'form',
        attrs: {
            action: '#PARAM{submitUrl}',
            method: 'post',
            onSubmit: 'return false;',
            'class': 'poll'
        },
        style: {
            height: '95%',
            position: 'relative'
        },

        cb: function () {
            var self = this,

                data = self.parent.data,
                // all questions-answers
                qa = data.qa,

                // get the basic template
                tpl = data.tpl,

                // some counters
                j = 0, len = qa.length,
                Poll = {
                    current: 0,
                    answered: 0,
                    size: len,
                    postElements: [],
                    postData: {}
                },
                t, u, k, id, elem, el, ul, inp, multi, name;

            // the callback of this node (the form) is intended
            // to be used to create the whole form, and that will be done
            // with the widgzard, when done another callback will manage
            // form submission
            tpl.target = self.node;

            // now process qa to write into tpl content
            for (null; j < len; j++) {
                t = qa[j];
                elem = { tag: 'li', content: [], style: {} };
                ul = { tag: 'ol', content: [] };
                inp = { tag: 'p', style: { lineHeight: '20px' }, html: (j + 1) + '. ' + t.question };
                multi = t.multi || false;
                name = t.name + (multi ? '[]' : '');

                elem.content.push(inp);

                // now answers
                //
                for (u = 0, k = t.answers.length; u < k; u++) {
                    id = JMVC.util.uniqueid + '';
                    el = multi
                        ? { tag: 'input', attrs: { type: 'checkbox', name: name, id: id, value: u } }
                        : { tag: 'input', attrs: { type: 'radio', name: name, id: id, value: u } };

                    ul.content.push({
                        tag: 'li',
                        style: { height: '20px' },
                        content: [
                            el,
                            { tag: 'label', attrs: { 'for': id }, html: t.answers[u] }
                        ]
                    });
                }
                // rem the form element name
                Poll.postElements.push({ multi: t.multi, name: name });

                // show only the first one
                if (j > 0) {
                    elem.style.display = 'none';
                }
                elem.content.push(ul);
                tpl.content[0].content.push(elem);
            }

            // now do all bindings needed as far as the tpl is rendered
            tpl.cb = function () {
                var pollRoot = this.getNode('pollElements'),
                    given = new Array(Poll.size),
                    previous = this.getNode('previousB'),
                    submit = this.getNode('submitB'),
                    next = this.getNode('nextB'),
                    gauge = this.getNode('gauge'),
                    setButtons = function () {
                        previous.node.style.visibility = Poll.current > 0 ? '' : 'hidden';
                        submit.node.style.visibility = (Poll.current === (Poll.answered - 1)) && (Poll.answered === Poll.size)
                            ? ''
                            : 'hidden';
                        next.node.style.visibility = (Poll.current < Poll.answered) && (Poll.size - 1 > Poll.current)
                            ? ''
                            : 'hidden';
                    },
                    switchToNext = function () {
                        pollRoot.descendant(Poll.current).node.style.display = 'none';
                        Poll.current++;
                        pollRoot.descendant(Poll.current).node.style.display = '';
                    },
                    switchToPrevious = function () {
                        pollRoot.descendant(Poll.current).node.style.display = 'none';
                        Poll.current--;
                        pollRoot.descendant(Poll.current).node.style.display = '';
                    },
                    updateGauge = function () {
                        gauge.descendant('0').node.style.width = ~~((Poll.answered / Poll.size) * 100) + '%';
                        gauge.descendant('1').node.innerHTML = Poll.answered + ' / ' + Poll.size;
                    };

                setButtons();
                updateGauge();

                JMVC.events.on(next.node, 'click', function (e) {
                    JMVC.events.kill(e);
                    switchToNext();
                    setButtons();
                });
                JMVC.events.on(previous.node, 'click', function (e) {
                    JMVC.events.kill(e);
                    switchToPrevious();
                    setButtons();
                });

                JMVC.events.on(pollRoot.node, 'click', function (e) {
                    JMVC.events.kill(e);
                    var el = JMVC.events.eventTarget(e),
                        val = [], tmp, i = 0;
                    if (el.tagName.toLowerCase() === 'input') {
                        if (el.type === 'radio') {
                            if (!given[Poll.current]) {
                                Poll.answered++;
                                given[Poll.current] = true;
                            }
                            updateGauge();
                            setButtons();
                        }
                        if (el.type === 'checkbox') {
                            if (!given[Poll.current]) {
                                Poll.answered++;
                                given[Poll.current] = true;
                            }

                            // collect
                            tmp = self.node[el.name].item(i);
                            while (tmp) {
                                if (tmp.checked) {
                                    val.push(tmp.value);
                                }
                                i++;
                                tmp = self.node[el.name].item(i);
                            }
                            if (val.join() === '') {
                                Poll.answered--;
                                given[Poll.current] = false;
                            }
                            updateGauge();
                            setButtons();
                        }
                    }
                });

                JMVC.events.on(self.node, 'keydown', function (e) {
                    e.keyCode === 9 && JMVC.events.kill(e);
                });

                JMVC.events.on(self.node, 'submit', function () {
                    var i, j, l, k, el, tmp, vals;
                    // build data
                    for (i = 0, l = Poll.postElements.length, el, tmp = [], vals; i < l; i++) {
                        el = Poll.postElements[i];
                        vals = self.node[el.name];
                        for (j = 0, k = vals.length; j < k; j++) {
                            if (vals[j].checked) tmp.push(vals[j].value);
                        }

                        if (el.multi) {
                            Poll.postData[el.name.replace('[]', '')] = '[' + tmp.join(',') + ']';
                        } else {
                            Poll.postData[el.name] = tmp[0];
                        }
                        tmp.length = 0;
                    }

                    JMVC.io.post(
                        self.parent.data.submitUrl,
                        function (r) {
                            JMVC.core.widgzard.render({
                                target: self.parent.node,
                                content: [{
                                    html: r,
                                    style: { color: 'red', padding: '20px', textAlign: 'center' }
                                }]
                            }, true);
                        },
                        false,
                        Poll.postData
                    );
                }, false);
            };
            JMVC.core.widgzard.render(tpl, true);
            self.done();
        }
    }]
};
