JMVC.core.widgzard && JMVC.hook({
    onAfterRender: function (cnt) {
        var Wid = JMVC.core.widgzard,
            done = JMVC.cookie.get('EUlaw'),
            cookieUrl = 'https://www.aboutcookies.com/',
            trans = {
                it: 'JMVC.org utilizza i cookie per garantire di fornirvi la migliore esperienza di navigazione. Se si continua senza modificare le impostazioni, supporremo che acconsentite a ricevere tutti i cookie da questo sito. Se si desidera modificare le preferenze, è possibile farlo seguendo le istruzioni <a target="_blank" href="' + cookieUrl + '">qui</a>',
                de: 'JMVC.org verwendet Cookies, um sicherzustellen, dass wir Ihnen die beste Erfahrung auf unserer Website. Wenn Sie ohne Änderung Ihrer Einstellungen fortfahren, werden wir annehmen, dass Sie glücklich, dass alle Cookies von dieser Website zu empfangen. Wenn Sie möchten, um Ihre Einstellungen Sie ändern, kann dies durch folgende Sie den Anweisungen <a target="_blank" href="' + cookieUrl + '">hier</a> zu tun',
                en: 'JMVC.org uses cookies to ensure that we give you the best experience on our website. If you continue without changing your settings, we will assume that you are happy to receive all cookies from this website. If you would like to change your preferences you may do so by following the instructions <a target="_blank" href="' + cookieUrl + '">here</a>',
                jp: 'JMVC.orgは、私たちはあなたの当社のウェブサイト上で最高の経験を与えることを保証するためにクッキーを使用しています。あなたは、設定を変更せずに続行した場合、我々はあなたが受け取るために満足していると仮定します。このサイトからすべてのクッキーをしました。あなたが設定を変更したい場合は、ここで<a target="_blank" href="' + cookieUrl + '">の指示に</a>従うことによってそれを行うことが'
            },
            iconStyle = {
                display: 'inline-block',
                textAlign: 'center',
                backgroundColor: 'white',
                width: '24px',
                height: '24px',
                fontSize: '20px',
                lineHeight: '18px',
                cursor: 'pointer',
                padding: '2px',
                marginTop: '5px',
                marginLeft: '5px'
            };

        !done && Wid.render({
            content: [{
                wid: 'cookieEU',
                style: {
                    position: 'fixed',
                    bottom: '0px',
                    padding: '10px',
                    margin: '1%',
                    left: '0px',
                    backgroundColor: 'rgba(200,200,200,0.9)',
                    width: '98%',
                    zIndex: 999,
                    fontSize: '14px',
                    color: 'white',
                    fontFamily: 'Verdana, sans'
                },
                attrs: { 'class': 'round8 group respfixed' },
                content: [{
                    attrs: { 'class': 'floatl' },
                    style: {
                        width: '95%',
                        lineHeight: '25px'
                    },
                    html: trans[JMVC.vars.currentlang]
                }, {
                    attrs: { 'class': 'floatr' },
                    style: {
                        width: '5%',
                        textAlign: 'right'
                    },
                    content: [{
                        attrs: { 'class': 'round8 respfixed' },
                        style: Object.assign({}, iconStyle, { color: 'red' }),
                        html: '&times;',
                        cb: function () {
                            var self = this,
                                $elf = self.node;
                            JMVC.events.on($elf, 'click', function () {
                                JMVC.dom.remove(self.getNode('cookieEU').node);
                            });
                            self.done();
                        }
                    }, {
                        attrs: { 'class': 'round8 respfixed' },
                        style: Object.assign({}, iconStyle, { color: 'green' }),
                        html: '&#10003;',
                        cb: function () {
                            var self = this,
                                $elf = self.node;
                            JMVC.events.on($elf, 'click', function () {
                                JMVC.dom.remove(self.getNode('cookieEU').node);
                                var oneYearMilliseconds = 1000 * 60 * 60 * 24 * 365;
                                JMVC.cookie.set('EUlaw', 'approved', oneYearMilliseconds, '/', document.location.host.replace('www.', ''));
                                done = true;
                            });
                            this.done();
                        }
                    }]
                }]

            }]
        });
    }
});
