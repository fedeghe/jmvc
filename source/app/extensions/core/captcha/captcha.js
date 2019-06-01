// type : FACTOY_METHOD
//
JMVC.require(
    'core/lib/crypt/crypt'
    , 'core/lib/widgzard/widgzard'
);

JMVC.extend('core/captcha', function () {
    JMVC.security.seed = 213123123;
    JMVC.security.useEncoding = true;
    var path = '/app/extensions/core/captcha/img/',
        data = {
            'c1.png': '%C3%8D%C3%97%C3%A9%C3%9C%C3%87%C3%A5%C3%A4%C3%97%C3%A0%C3%A1%C3%8B%C3%9F%C3%8F%C3%94%C3%9E%C3%9D%C3%8F%C3%8E%C3%99%C3%8B%C3%AC%C3%A5%C3%89%C3%8C%C3%A4%C3%A2%C3%AC%C3%9C%C3%8E%C3%90%C3%9E%C3%8D%C3%A9%C3%9A%C3%8A%C3%94%C3%8D%C3%97%C2%B4%C2%AE%C2%B0%C2%B1%C2%9D%C2%A0',
            'c2.png': '%C3%A6%C3%9A%C3%A3%C3%A0%C3%A1%C3%BB%C3%BD%C3%9A%C3%9A%C3%A5%C3%A5%C3%B5%C3%A8%C3%97%C3%98%C3%A1%C3%A9%C3%A4%C3%B2%C3%8E%C3%A6%C3%A9%C3%A3%C3%A2%C3%BD%C3%A5%C3%A6%C3%A0%C3%A8%C3%A6%C3%B7%C3%90%C3%A3%C3%9E%C3%A4%C3%AA%C3%A6%C3%9A%C3%87%C2%B5%C3%84%C3%8B%C3%90%C2%B9',
            'c3.png': '%C3%A2%C3%93%C3%AB%C3%88%C3%8D%C3%A3%C3%B9%C3%93%C3%A2%C3%8D%C3%91%C3%9D%C3%A4%C3%90%C3%A0%C3%89%C3%95%C3%8C%C3%AE%C3%87%C3%AE%C3%91%C3%8F%C3%8A%C3%B9%C3%9E%C3%AE%C3%88%C3%94%C3%8E%C3%B3%C3%89%C3%AB%C3%86%C3%90%C3%92%C3%A2%C3%93%C3%8B%C2%96%C2%B8%C2%9B%C2%B8%C2%9A',
            'c4.png': '%C3%8B%C3%98%C3%98%C3%AB%C3%8C%C3%A5%C3%A2%C3%98%C3%8F%C3%B0%C3%90%C3%9F%C3%8D%C3%95%C3%8D%C3%AC%C3%94%C3%8E%C3%97%C3%8C%C3%9B%C3%B4%C3%8E%C3%8C%C3%A2%C3%A3%C3%9B%C3%AB%C3%93%C3%90%C3%9C%C3%8E%C3%98%C3%A9%C3%8F%C3%94%C3%8B%C3%98%C2%A1%C2%BE%C2%A4%C3%80%C2%A0%C2%A1'
        },
        getMarkup = function (captchaInst) {
            function enableChk () {
                var butt = this.node;

                JMVC.events.on(butt, 'click', function () {
                    var input = butt.getNode('inputTxt'),
                        val = input.value,
                        passed = JMVC.security.decrypt(data[captchaInst.imgName], val);

                    console.debug(passed ? 'OK' : 'No way man');
                });
            }

            function refresh () {
                var self = this.node;
                JMVC.events.on(self, 'click', function () {
                    captchaInst.imgName = getRandImg();
                    JMVC.dom.attr(self, 'src', path + captchaInst.imgName);
                });
            }

            return {
                style: {
                    width: '300px',
                    padding: '5px',
                    backgroundColor: '#ddd'
                },
                content: [{
                    tag: 'img',
                    style: { cursor: 'pointer' },
                    attrs: { src: path + captchaInst.imgName, title: 'click to refresh' },
                    cb: refresh,
                    wid: 'img'
                }, {
                    style: { padding: '5px 0px' },
                    content: [{
                        tag: 'input',
                        attrs: { type: 'text' },
                        style: { 'float': 'left' },
                        wid: 'inputTxt'
                    }, {
                        tag: 'input',
                        attrs: { type: 'button', value: 'check', 'class': 'round6' },
                        style: { cursor: 'pointer', border: 'none', padding: '2px', margin: '0px 2px', 'float': 'right' },
                        wid: 'butt',
                        cb: enableChk
                    }, 'clearer']
                }]
            };
        };

    function getRandImg () {
        return JMVC.array.rand(Object.keys(data));
    }

    function factory (trg) {
        new Captcha().render(trg);
    }

    function Captcha () {
        this.imgName = getRandImg();
        this.conf = getMarkup(this);
    }

    Captcha.prototype.check = function () {

    };

    Captcha.prototype.render = function (trg) {
        var self = this;
        self.conf.target = trg;
        JMVC.core.widgzard.render(self.conf, true);
    };
    return { create: factory };
});
