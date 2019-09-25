JMVC.require('core/lib/cookieMonster/cookieMonster');
JMVC.controllers.demo = function () {
    'use strict';
    var self = this;

    /* test a route */
    this.addRoutes({
        ndl: 'flag',
        f: 'flag'
    });

    this.action_cs = function () {
        JMVC.head.goto('console', 'index', '?fullscreen=true&h=%3C!--%20no%20html%20content%20--%3E&j=var%20data%20%3D%20%5B%0A%09%09%5B%27Samsung%20Galaxy%20S4%27%2C%27Samsung%27%2C%27April%202013%27%2C38%2C%274560%27%5D%2C%0A%09%09%5B%27Lumia%201020%27%2C%27Nokia%27%2C%27July%202013%27%2C2%2C%271560%27%5D%2C%0A%09%09%5B%27Surface%202%20Pro%27%2C%27Microsoft%27%2C%27September%202013%27%2C12%2C%2753782%27%5D%2C%0A%09%09%5B%27iPhone%205s%27%2C%27Apple%27%2C%27September%202013%27%2C53%2C%27134500%27%5D%2C%0A%09%09%5B%27One%20X%27%2C%27HTC%27%2C%27March%202012%27%2C7%2C%27213068%27%5D%2C%0A%09%09%5B%27G%202%27%2C%27LG%27%2C%27October%202013%27%2C34%2C%27133068%27%5D%2C%0A%09%09%5B%27Yoga%202%20Pro%27%2C%27Lenovo%27%2C%27November%202013%27%2C4%2C%274230%27%5D%0A%09%5D%2C%0A%20%20%20%20headers%20%3D%20%5B%27Product%20Name%27%2C%27Product%20Manufacturer%27%2C%27Release%20Date%27%2C%27Quantity%27%2C%27Purchase%20Value%27%5D%3B%0A%0Afunction%20ProductTable(config)%20%7B%0A%20%20%20%20this.headData%20%3D%20config.head%20%7C%7C%20false%3B%0A%20%20%20%20this.bodyData%20%3D%20config.body%20%7C%7Cfalse%3B%0A%20%20%20%20if%20(!this.headData%20%7C%7C%20!this.bodyData)%20%7B%0A%20%20%20%20%20%20%20%20throw%20new%20Error(%27Missing%20parameters%27)%3B%0A%20%20%20%20%7D%0A%20%20%20%20this.node%20%3D%20null%3B%0A%7D%0AProductTable.prototype.drawLine%20%3D%20function%20(tag%2C%20data)%7B%0A%20%20%20%20var%20head%20%3D%20document.createElement(%27tr%27)%3B%0A%20%20%20%20for%20(var%20i%20%3D%200%2C%20l%20%3D%20data.length%2C%20t%3B%20i%20%3C%20l%3B%20i%2B%2B)%20%7B%0A%20%20%20%20%20%20%20%20t%20%3D%20document.createElement(tag)%3B%0A%20%20%20%20%20%20%20%20t.innerHTML%20%3D%20data%5Bi%5D%20%2B%20%27%27%3B%0A%20%20%20%20%20%20%20%20head.appendChild(t)%3B%0A%20%20%20%20%7D%0A%20%20%20%20return%20head%3B%0A%7D%3B%0A%0AProductTable.prototype.drawHeader%20%3D%20function%20()%7B%0A%20%20%20%20this.node.appendChild(%0A%20%20%20%20%20%20%20%20this.drawLine(%27th%27%2C%20this.headData)%0A%20%20%20%20)%3B%0A%7D%3B%0AProductTable.prototype.drawData%20%3D%20function%20()%7B%0A%20%20%20%20for(var%20j%20%3D%200%2C%20k%20%3D%20this.bodyData.length%3B%20j%20%3C%20k%3B%20j%2B%2B)%7B%0A%20%20%20%20%20%20%20%20this.node.appendChild(%0A%20%20%20%20%20%20%20%20%20%20%20%20this.drawLine(%27td%27%2C%20this.bodyData%5Bj%5D)%0A%20%20%20%20%20%20%20%20)%3B%0A%20%20%20%20%7D%0A%7D%3B%0AProductTable.prototype.draw%20%3D%20function%20(el)%7B%0A%20%20%20%20this.drawHeader()%3B%0A%20%20%20%20this.drawData()%3B%0A%20%20%20%20el.appendChild(this.node)%3B%0A%7D%3B%0AProductTable.prototype.render%20%3D%20function%20(el)%7B%0A%20%20%20%20this.node%20%3D%20document.createElement(%27table%27)%3B%20%0A%20%20%20%20this.draw(el)%3B%0A%7D%0AProductTable.prototype.sortByColumn%20%3D%20function%20(col)%20%7B%0A%20%20%20%20var%20index%20%3D%20this.headData.indexOf(col)%3B%0A%20%20%20%20if%20(index%20%3D%3D%3D%20-1)%7B%0A%20%20%20%20%20%20%20%20throw%20new%20Error(col%20%2B%20%27%20column%20not%20found%27)%3B%0A%20%20%20%20%7D%0A%20%20%20%20this.bodyData.sort(function%20(l1%2C%20l2)%20%7B%0A%20%20%20%20%20%20%20%20return%20parseInt(l1%5Bindex%5D%2C%2010)%20%3C%20parseInt(l2%5Bindex%5D%2C%2010)%3B%0A%20%20%20%20%7D)%3B%0A%7D%0A%0A%0Avar%20pt%20%3D%20new%20ProductTable(%7Bhead%20%3A%20headers%2C%20body%20%3A%20data%7D)%3B%0Apt.sortByColumn(%27Quantity%27)%3B%0Apt.render(document.body)%3B&c=body%7B%0A%09font-family%3A%20verdana%2C%20sans-serif%3B%0A%09font-size%20%3A%2012px%0A%7D%0Atable%7B%0A%09border%3A2px%20solid%20gainsboro%3B%0A%09margin%3A10px%0A%7D%0Atr%3Anth-child(odd)%20td%7B%0A%09background-color%3A%23ff6600%3B%0A%7D%0Atr%3Anth-child(even)%20td%7B%0A%09background-color%3A%23afa%3B%0A%7D%0Atd%7Bpadding%3A10px%7D%0Ath%7B%0A%09font-weight%3Abold%3B%0A%09padding%3A10px%3B%0A%7D%0Atd%2Cth%7Btext-align%3Aleft%3B%7D&l=#preview');
    };

    this.before = function () {
        // JMVC.events.loadify(1000);
        self.startController = JMVC.util.now();
        JMVC.debug(-2);
    };

    this.before_index = this.before_flag = function () {
        self.startAction = JMVC.util.now();
        JMVC.debug(-1);
    };

    this.after_index = this.after_flag = function () {
        self.endAction = JMVC.util.now();
        JMVC.debug(1);
    };

    this.after = function () {
        JMVC.debug(2);
        self.endController = JMVC.util.now();
        JMVC.debug('Controller Time: ' + ((self.endController - self.startController) || 0));
        JMVC.debug('Action Time: ' + ((self.endAction - self.startAction) || 0));

        // JMVC.events.disableRightClick();

        JMVC.events.onRight(JMVC.WD, function () {
            JMVC.debug('right click locked');
        });
        JMVC.debug('disabled right click');

        JMVC.require('vendors/twitter/twitter');

        JMVC.vendors.twitter.follow(document.body, {
            name: 'purejmvc',
            // ,lang : 'ja'
            // url : 'http://www.jmvc.org'
            // title : 'mytitle'
            text: 'check out JMVC demo',
            // ,via : 'via me'
            // ,size : 'large'
            // ,related : '#javascript'
            hashtags: 'javascript, pure javascript',
            'show-count': false
        });

        // JMVC.require('widget/screensaver/screensaver', function () {
        //     // JMVC.screensaver.on(5000, {pwd : "xxx", msg : "Please enter security password to unlock (xxx)... how could You workaround it?"});
        //     JMVC.screensaver.on(5000, { pwd: 'xxx' });
        // });
    };

    this.action_index = function () {
        JMVC.debug('0-');

        JMVC.require(
            'vendors/google/analytics/analytics',
            'core/responsive/basic/basic',
            'core/screen/screen'
        );

        // show window size, and test orientation switch,
        JMVC.responsive.onChange(function (e) {
            var d = JMVC.screen.getViewportSize();
            JMVC.dom.html(JMVC.dom.find('#size'), '[' + d.width + ' ; ' + d.height + ']');
        });

        JMVC.events.loadify(500);

        JMVC.dom.preloadImage(JMVC.vars.baseurl + '/media/img/jmvc_n1.png');

        // var newlogo = JMVC.dom.create('img', {src : JMVC.vars.baseurl + '/media/img/jmvc_m1.svg'});
        /* JMVC.require('widget/slider/slider'); */
        // <img src="media/img/jmvc_m2.svg" />
        var content = '<h3 id="samples" class="round8 roundbottom">Some JMVC based samples <span id="size"></span></h3>',
            bu = JMVC.vars.baseurl,
            v = JMVC.getView('vacuum'),
            links = {
                'Event delegation on steroids': 'pub',
                'Canvas editor (WorkInProgress)': 'canvaseditor',
                'Widgzard SPA': 'widgzard/sample/',
                // 'Widgzard<sup> n</sup> = Engy' : 'widgzard/engy/',
                '6 Divs Cube css3 tranformations ': 'demo/divrot.js',
                Console: 'console',
                'Get gravatar from email (FullScreen, esc to exit)': 'console/index?fullscreen=true&h=%3Cp%3E%0A%09%3Cinput%20id%3D%22tx%22%20type%3D%22text%22%20%2F%3E%0A%09%3Cbutton%20id%3D%22bt%22%3Eget%20avatar%3C%2Fbutton%3E%0A%3C%2Fp%3E&j=var%20tx%20%3D%20JMVC.dom.find(%27%23tx%27)%2C%0A%09bt%20%3D%20JMVC.dom.find(%27%23bt%27)%3B%0A%09%09%0AJMVC.events.on(bt%2C%20%27click%27%2C%20function%20()%20%7B%0A%09var%20t%20%3D%20tx.value%2C%0A%09%09url%20%3D%20false%2C%0A%09%09img%3B%0A%09if%20(!!t)%20%7B%0A%09%09url%20%3D%20get_gravatar(t%2C%20200)%3B%0A%09%09img%20%3D%20document.createElement(%27img%27)%3B%0A%09%09img.onload%20%3D%20function%20()%20%7B%0A%09%09%09JMVC.dom.append(document.body%2C%20img)%3B%0A%09%09%7D%3B%0A%09%09img.src%20%3D%20url%3B%0A%09%7D%0A%7D)%3B%0A%0A%0A%0Afunction%20get_gravatar(email%2C%20size)%20%7B%0A%20%0A%09%2F%2F%20MD5%20(Message-Digest%20Algorithm)%20by%20WebToolkit%0A%09%2F%2F%0A%20%0A%09var%20MD5%3Dfunction(s)%7Bfunction%20L(k%2Cd)%7Breturn(k%3C%3Cd)%7C(k%3E%3E%3E(32-d))%7Dfunction%20K(G%2Ck)%7Bvar%20I%2Cd%2CF%2CH%2Cx%3BF%3D(G%262147483648)%3BH%3D(k%262147483648)%3BI%3D(G%261073741824)%3Bd%3D(k%261073741824)%3Bx%3D(G%261073741823)%2B(k%261073741823)%3Bif(I%26d)%7Breturn(x%5E2147483648%5EF%5EH)%7Dif(I%7Cd)%7Bif(x%261073741824)%7Breturn(x%5E3221225472%5EF%5EH)%7Delse%7Breturn(x%5E1073741824%5EF%5EH)%7D%7Delse%7Breturn(x%5EF%5EH)%7D%7Dfunction%20r(d%2CF%2Ck)%7Breturn(d%26F)%7C((~d)%26k)%7Dfunction%20q(d%2CF%2Ck)%7Breturn(d%26k)%7C(F%26(~k))%7Dfunction%20p(d%2CF%2Ck)%7Breturn(d%5EF%5Ek)%7Dfunction%20n(d%2CF%2Ck)%7Breturn(F%5E(d%7C(~k)))%7Dfunction%20u(G%2CF%2Caa%2CZ%2Ck%2CH%2CI)%7BG%3DK(G%2CK(K(r(F%2Caa%2CZ)%2Ck)%2CI))%3Breturn%20K(L(G%2CH)%2CF)%7Dfunction%20f(G%2CF%2Caa%2CZ%2Ck%2CH%2CI)%7BG%3DK(G%2CK(K(q(F%2Caa%2CZ)%2Ck)%2CI))%3Breturn%20K(L(G%2CH)%2CF)%7Dfunction%20D(G%2CF%2Caa%2CZ%2Ck%2CH%2CI)%7BG%3DK(G%2CK(K(p(F%2Caa%2CZ)%2Ck)%2CI))%3Breturn%20K(L(G%2CH)%2CF)%7Dfunction%20t(G%2CF%2Caa%2CZ%2Ck%2CH%2CI)%7BG%3DK(G%2CK(K(n(F%2Caa%2CZ)%2Ck)%2CI))%3Breturn%20K(L(G%2CH)%2CF)%7Dfunction%20e(G)%7Bvar%20Z%3Bvar%20F%3DG.length%3Bvar%20x%3DF%2B8%3Bvar%20k%3D(x-(x%2564))%2F64%3Bvar%20I%3D(k%2B1)*16%3Bvar%20aa%3DArray(I-1)%3Bvar%20d%3D0%3Bvar%20H%3D0%3Bwhile(H%3CF)%7BZ%3D(H-(H%254))%2F4%3Bd%3D(H%254)*8%3Baa%5BZ%5D%3D(aa%5BZ%5D%7C(G.charCodeAt(H)%3C%3Cd))%3BH%2B%2B%7DZ%3D(H-(H%254))%2F4%3Bd%3D(H%254)*8%3Baa%5BZ%5D%3Daa%5BZ%5D%7C(128%3C%3Cd)%3Baa%5BI-2%5D%3DF%3C%3C3%3Baa%5BI-1%5D%3DF%3E%3E%3E29%3Breturn%20aa%7Dfunction%20B(x)%7Bvar%20k%3D%22%22%2CF%3D%22%22%2CG%2Cd%3Bfor(d%3D0%3Bd%3C%3D3%3Bd%2B%2B)%7BG%3D(x%3E%3E%3E(d*8))%26255%3BF%3D%220%22%2BG.toString(16)%3Bk%3Dk%2BF.substr(F.length-2%2C2)%7Dreturn%20k%7Dfunction%20J(k)%7Bk%3Dk.replace(%2Frn%2Fg%2C%22n%22)%3Bvar%20d%3D%22%22%3Bfor(var%20F%3D0%3BF%3Ck.length%3BF%2B%2B)%7Bvar%20x%3Dk.charCodeAt(F)%3Bif(x%3C128)%7Bd%2B%3DString.fromCharCode(x)%7Delse%7Bif((x%3E127)%26%26(x%3C2048))%7Bd%2B%3DString.fromCharCode((x%3E%3E6)%7C192)%3Bd%2B%3DString.fromCharCode((x%2663)%7C128)%7Delse%7Bd%2B%3DString.fromCharCode((x%3E%3E12)%7C224)%3Bd%2B%3DString.fromCharCode(((x%3E%3E6)%2663)%7C128)%3Bd%2B%3DString.fromCharCode((x%2663)%7C128)%7D%7D%7Dreturn%20d%7Dvar%20C%3DArray()%3Bvar%20P%2Ch%2CE%2Cv%2Cg%2CY%2CX%2CW%2CV%3Bvar%20S%3D7%2CQ%3D12%2CN%3D17%2CM%3D22%3Bvar%20A%3D5%2Cz%3D9%2Cy%3D14%2Cw%3D20%3Bvar%20o%3D4%2Cm%3D11%2Cl%3D16%2Cj%3D23%3Bvar%20U%3D6%2CT%3D10%2CR%3D15%2CO%3D21%3Bs%3DJ(s)%3BC%3De(s)%3BY%3D1732584193%3BX%3D4023233417%3BW%3D2562383102%3BV%3D271733878%3Bfor(P%3D0%3BP%3CC.length%3BP%2B%3D16)%7Bh%3DY%3BE%3DX%3Bv%3DW%3Bg%3DV%3BY%3Du(Y%2CX%2CW%2CV%2CC%5BP%2B0%5D%2CS%2C3614090360)%3BV%3Du(V%2CY%2CX%2CW%2CC%5BP%2B1%5D%2CQ%2C3905402710)%3BW%3Du(W%2CV%2CY%2CX%2CC%5BP%2B2%5D%2CN%2C606105819)%3BX%3Du(X%2CW%2CV%2CY%2CC%5BP%2B3%5D%2CM%2C3250441966)%3BY%3Du(Y%2CX%2CW%2CV%2CC%5BP%2B4%5D%2CS%2C4118548399)%3BV%3Du(V%2CY%2CX%2CW%2CC%5BP%2B5%5D%2CQ%2C1200080426)%3BW%3Du(W%2CV%2CY%2CX%2CC%5BP%2B6%5D%2CN%2C2821735955)%3BX%3Du(X%2CW%2CV%2CY%2CC%5BP%2B7%5D%2CM%2C4249261313)%3BY%3Du(Y%2CX%2CW%2CV%2CC%5BP%2B8%5D%2CS%2C1770035416)%3BV%3Du(V%2CY%2CX%2CW%2CC%5BP%2B9%5D%2CQ%2C2336552879)%3BW%3Du(W%2CV%2CY%2CX%2CC%5BP%2B10%5D%2CN%2C4294925233)%3BX%3Du(X%2CW%2CV%2CY%2CC%5BP%2B11%5D%2CM%2C2304563134)%3BY%3Du(Y%2CX%2CW%2CV%2CC%5BP%2B12%5D%2CS%2C1804603682)%3BV%3Du(V%2CY%2CX%2CW%2CC%5BP%2B13%5D%2CQ%2C4254626195)%3BW%3Du(W%2CV%2CY%2CX%2CC%5BP%2B14%5D%2CN%2C2792965006)%3BX%3Du(X%2CW%2CV%2CY%2CC%5BP%2B15%5D%2CM%2C1236535329)%3BY%3Df(Y%2CX%2CW%2CV%2CC%5BP%2B1%5D%2CA%2C4129170786)%3BV%3Df(V%2CY%2CX%2CW%2CC%5BP%2B6%5D%2Cz%2C3225465664)%3BW%3Df(W%2CV%2CY%2CX%2CC%5BP%2B11%5D%2Cy%2C643717713)%3BX%3Df(X%2CW%2CV%2CY%2CC%5BP%2B0%5D%2Cw%2C3921069994)%3BY%3Df(Y%2CX%2CW%2CV%2CC%5BP%2B5%5D%2CA%2C3593408605)%3BV%3Df(V%2CY%2CX%2CW%2CC%5BP%2B10%5D%2Cz%2C38016083)%3BW%3Df(W%2CV%2CY%2CX%2CC%5BP%2B15%5D%2Cy%2C3634488961)%3BX%3Df(X%2CW%2CV%2CY%2CC%5BP%2B4%5D%2Cw%2C3889429448)%3BY%3Df(Y%2CX%2CW%2CV%2CC%5BP%2B9%5D%2CA%2C568446438)%3BV%3Df(V%2CY%2CX%2CW%2CC%5BP%2B14%5D%2Cz%2C3275163606)%3BW%3Df(W%2CV%2CY%2CX%2CC%5BP%2B3%5D%2Cy%2C4107603335)%3BX%3Df(X%2CW%2CV%2CY%2CC%5BP%2B8%5D%2Cw%2C1163531501)%3BY%3Df(Y%2CX%2CW%2CV%2CC%5BP%2B13%5D%2CA%2C2850285829)%3BV%3Df(V%2CY%2CX%2CW%2CC%5BP%2B2%5D%2Cz%2C4243563512)%3BW%3Df(W%2CV%2CY%2CX%2CC%5BP%2B7%5D%2Cy%2C1735328473)%3BX%3Df(X%2CW%2CV%2CY%2CC%5BP%2B12%5D%2Cw%2C2368359562)%3BY%3DD(Y%2CX%2CW%2CV%2CC%5BP%2B5%5D%2Co%2C4294588738)%3BV%3DD(V%2CY%2CX%2CW%2CC%5BP%2B8%5D%2Cm%2C2272392833)%3BW%3DD(W%2CV%2CY%2CX%2CC%5BP%2B11%5D%2Cl%2C1839030562)%3BX%3DD(X%2CW%2CV%2CY%2CC%5BP%2B14%5D%2Cj%2C4259657740)%3BY%3DD(Y%2CX%2CW%2CV%2CC%5BP%2B1%5D%2Co%2C2763975236)%3BV%3DD(V%2CY%2CX%2CW%2CC%5BP%2B4%5D%2Cm%2C1272893353)%3BW%3DD(W%2CV%2CY%2CX%2CC%5BP%2B7%5D%2Cl%2C4139469664)%3BX%3DD(X%2CW%2CV%2CY%2CC%5BP%2B10%5D%2Cj%2C3200236656)%3BY%3DD(Y%2CX%2CW%2CV%2CC%5BP%2B13%5D%2Co%2C681279174)%3BV%3DD(V%2CY%2CX%2CW%2CC%5BP%2B0%5D%2Cm%2C3936430074)%3BW%3DD(W%2CV%2CY%2CX%2CC%5BP%2B3%5D%2Cl%2C3572445317)%3BX%3DD(X%2CW%2CV%2CY%2CC%5BP%2B6%5D%2Cj%2C76029189)%3BY%3DD(Y%2CX%2CW%2CV%2CC%5BP%2B9%5D%2Co%2C3654602809)%3BV%3DD(V%2CY%2CX%2CW%2CC%5BP%2B12%5D%2Cm%2C3873151461)%3BW%3DD(W%2CV%2CY%2CX%2CC%5BP%2B15%5D%2Cl%2C530742520)%3BX%3DD(X%2CW%2CV%2CY%2CC%5BP%2B2%5D%2Cj%2C3299628645)%3BY%3Dt(Y%2CX%2CW%2CV%2CC%5BP%2B0%5D%2CU%2C4096336452)%3BV%3Dt(V%2CY%2CX%2CW%2CC%5BP%2B7%5D%2CT%2C1126891415)%3BW%3Dt(W%2CV%2CY%2CX%2CC%5BP%2B14%5D%2CR%2C2878612391)%3BX%3Dt(X%2CW%2CV%2CY%2CC%5BP%2B5%5D%2CO%2C4237533241)%3BY%3Dt(Y%2CX%2CW%2CV%2CC%5BP%2B12%5D%2CU%2C1700485571)%3BV%3Dt(V%2CY%2CX%2CW%2CC%5BP%2B3%5D%2CT%2C2399980690)%3BW%3Dt(W%2CV%2CY%2CX%2CC%5BP%2B10%5D%2CR%2C4293915773)%3BX%3Dt(X%2CW%2CV%2CY%2CC%5BP%2B1%5D%2CO%2C2240044497)%3BY%3Dt(Y%2CX%2CW%2CV%2CC%5BP%2B8%5D%2CU%2C1873313359)%3BV%3Dt(V%2CY%2CX%2CW%2CC%5BP%2B15%5D%2CT%2C4264355552)%3BW%3Dt(W%2CV%2CY%2CX%2CC%5BP%2B6%5D%2CR%2C2734768916)%3BX%3Dt(X%2CW%2CV%2CY%2CC%5BP%2B13%5D%2CO%2C1309151649)%3BY%3Dt(Y%2CX%2CW%2CV%2CC%5BP%2B4%5D%2CU%2C4149444226)%3BV%3Dt(V%2CY%2CX%2CW%2CC%5BP%2B11%5D%2CT%2C3174756917)%3BW%3Dt(W%2CV%2CY%2CX%2CC%5BP%2B2%5D%2CR%2C718787259)%3BX%3Dt(X%2CW%2CV%2CY%2CC%5BP%2B9%5D%2CO%2C3951481745)%3BY%3DK(Y%2Ch)%3BX%3DK(X%2CE)%3BW%3DK(W%2Cv)%3BV%3DK(V%2Cg)%7Dvar%20i%3DB(Y)%2BB(X)%2BB(W)%2BB(V)%3Breturn%20i.toLowerCase()%7D%3B%0A%20%0A%09var%20size%20%3D%20size%20%7C%7C%2080%3B%0A%20%0A%09return%20%27http%3A%2F%2Fwww.gravatar.com%2Favatar%2F%27%20%2B%20MD5(email)%20%2B%20%27.jpg%3Fs%3D%27%20%2B%20size%3B%0A%7D%0A%0Atx.value%20%3D%20%27fedeghe%40gmail.com%27%3B%0Atx.focus()%3B%0A&c=p%7Bpadding%3A10px%7D&l=#preview',
                'Console atom (FullScreen, esc to exit)': 'console/index?fullscreen=true&h=%3Cdiv%20class%3D%22container%22%3E%0A%09%3Cdiv%20class%3D%22wrap%22%3E%0A%09%09%3Cdiv%20class%3D%22circle%20horizontal%20c1%22%3E%0A%09%09%09%3Cdiv%20class%3D%22wrap-electron%22%3E%0A%09%09%09%09%3Cdiv%20class%3D%22circle%20electron%22%3E%3C%2Fdiv%3E%0A%09%09%09%3C%2Fdiv%3E%0A%09%09%3C%2Fdiv%3E%0A%09%09%3Cdiv%20class%3D%22circle%20vertical%20c1%22%3E%0A%09%09%09%3Cdiv%20class%3D%22wrap-electron%22%3E%0A%09%09%09%09%3Cdiv%20class%3D%22circle%20electron%22%3E%3C%2Fdiv%3E%0A%09%09%09%3C%2Fdiv%3E%0A%09%09%3C%2Fdiv%3E%0A%09%3C%2Fdiv%3E%0A%09%3Cdiv%20class%3D%22wrap%20r%22%3E%0A%09%09%3Cdiv%20class%3D%22circle%20horizontal%20c2%22%3E%0A%09%09%09%3Cdiv%20class%3D%22wrap-electron%22%3E%0A%09%09%09%09%3Cdiv%20class%3D%22circle%20electron%22%3E%3C%2Fdiv%3E%0A%09%09%09%3C%2Fdiv%3E%0A%09%09%3C%2Fdiv%3E%0A%09%09%3Cdiv%20class%3D%22circle%20vertical%20c2%22%3E%0A%09%09%09%3Cdiv%20class%3D%22wrap-electron%22%3E%0A%09%09%09%09%3Cdiv%20class%3D%22circle%20electron%22%3E%3C%2Fdiv%3E%09%0A%09%09%09%3C%2Fdiv%3E%0A%09%09%3C%2Fdiv%3E%0A%09%09%3Cdiv%20class%3D%22circle%20center%22%3E%3C%2Fdiv%3E%0A%09%3C%2Fdiv%3E%0A%3C%2Fdiv%3E%0A%0A%0A%0A%0A%0A%0A%0A&j=%2F*%20no%20javascript%20content%20*%2F&c=body%20%7B%0A%20%20background%3A%20%23222%3B%0A%7D%0A.container%20%7B%0A%20%20position%3A%20relative%3B%0A%20%20margin%3A%20auto%3B%0A%20%20width%3A%20250px%3B%0A%7D%0A.wrap%2C%0A.circle%20%7B%0A%20%20-webkit-transition%3A%20-webkit-transform%20500ms%20linear%3B%0A%20%20-webkit-transform-style%3A%20preserve-3d%3B%0A%20%20-moz-transition%3A%20-moz-transform%20500ms%20linear%3B%0A%20%20-moz-transform-style%3A%20preserve-3d%3B%0A%20%20width%3A%20250px%3B%0A%20%20height%3A%20250px%3B%0A%20%20margin%3A%20auto%3B%0A%20%20margin-top%3A%2050px%3B%0A%20%20position%3A%20absolute%3B%0A%7D%0A.circle%20%7B%0A%20%20position%3A%20absolute%3B%0A%20%20border%3A%203px%20solid%20%23aaaaaa%3B%0A%20%20border-radius%3A%20250px%3B%0A%20%20margin%3A%20auto%3B%0A%7D%0A.circle.c2%2C%0A.circle.center%20%7B%0A%20%20border%3A%202px%20solid%20%23666666%3B%0A%20%20width%3A%20140px%3B%0A%20%20height%3A%20140px%3B%0A%20%20top%3A%2055px%3B%0A%20%20left%3A%2055px%3B%0A%7D%0A.circle.center%20%7B%0A%20%20background%3A%20%23ffffff%3B%0A%20%20width%3A%2030px%3B%0A%20%20height%3A%2030px%3B%0A%20%20top%3A%20110px%3B%0A%20%20left%3A%20110px%3B%0A%20%20box-shadow%3A%200%200%205px%20%23fff%3B%0A%7D%0A.wrap-electron%20%7B%0A%20%20border%3A%200px%20solid%20%20%23fff%3B%0A%20%20position%3A%20absolute%3B%0A%20%20width%3A%20100%25%3B%0A%20%20height%3A%20100%25%3B%0A%20%20-webkit-animation%3A%20electron%203s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20electron%203s%20linear%20infinite%3B%0A%7D%0A.electron%20%7B%0A%20%20width%3A%2012px%3B%0A%20%20height%3A%2012px%3B%0A%20%20background%3A%20%23aaaaaa%3B%0A%20%20left%3A%2050%25%3B%0A%20%20margin-left%3A%20-8px%3B%0A%20%20border%3A%20none%3B%0A%20%20top%3A%20-7px%3B%0A%20%20-webkit-transform-origin%3A%2050%25%2050%25%3B%0A%7D%0A.c2%20.wrap-electron%20%7B%0A%20%20-webkit-animation%3A%20electron%202s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20electron%202s%20linear%20infinite%3B%0A%7D%0A.c2%20.electron%20%7B%0A%20%20top%3A%20-6px%3B%0A%7D%0A.wrap%20%7B%0A%20%20border%3A%200px%20solid%20%23aaaaaa%3B%0A%20%20-webkit-animation%3A%20lateral%2015s%20ease-in-out%20infinite%3B%0A%20%20-moz-animation%3A%20lateral%2015s%20ease-in-out%20infinite%3B%0A%7D%0A.wrap.r%20%7B%0A%20%20-webkit-animation%3A%20lateralRevert%208s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20lateralRevert%208s%20linear%20infinite%3B%0A%7D%0A.vertical%20%7B%0A%20%20-webkit-animation%3A%20vertical%208s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20vertical%208s%20linear%20infinite%3B%0A%7D%0A.horizontal%20%7B%0A%20%20-webkit-animation%3A%20horizontalRevert%206s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20horizontalRevert%206s%20linear%20infinite%3B%0A%7D%0A.vertical.c2%20%7B%0A%20%20-webkit-animation%3A%20vertical%204s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20vertical%204s%20linear%20infinite%3B%0A%7D%0A.horizontal.c2%20%7B%0A%20%20-webkit-animation%3A%20horizontalRevert%203s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20horizontalRevert%203s%20linear%20infinite%3B%0A%7D%0A%40-webkit-keyframes%20electron%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20horizontal%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateY(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateY(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20horizontalRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateY(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateY(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20vertical%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateX(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateX(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20verticalRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateX(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateX(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20lateral%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20lateralRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20electron%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20horizontal%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateY(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateY(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20horizontalRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateY(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateY(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20vertical%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateX(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateX(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20verticalRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateX(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateX(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20lateral%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20lateralRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%7D%0A&l=#preview',
                'onecodepen (FullScreen, esc to exit)': 'console/index?fullscreen=true&h=%3Ccanvas%20id%3D%22c%22%3E%3C%2Fcanvas%3E&j=var%20a%20%3D%20document.getElementsByTagName(%27canvas%27)%5B0%5D%3B%0Avar%20b%20%3D%20document.body%3B%0A%0Avar%20requestAnimationFrame%20%3D%0A%09window.requestAnimationFrame%20%7C%7C%0A%20%20%20%20window.mozRequestAnimationFrame%20%7C%7C%0A%20%20%20%20window.webkitRequestAnimationFrame%20%7C%7C%0A%20%20%20%20window.msRequestAnimationFrame%20%7C%7C%0A%20%20%20%20function(f)%7B%20setTimeout(f%2C%201000%2F30)%3B%20%7D%3B%0A%0Aa.style.width%20%3D%20(a.width%20%3D%20innerWidth)%20%2B%20%27px%27%3B%0Aa.style.height%20%3D%20(a.height%20%3D%20innerHeight)%20%2B%20%27px%27%3B%0A%0Avar%20c%20%3D%20a.getContext(%272d%27)%3B%0A%0Aif%20(typeof%20raf%20!%3D%3D%20%27undefined%27)%20cancelAnimationFrame(raf)%3B%0A%0Asw%20%3D%20a.width%3B%0Ash%20%3D%20a.height%3B%0A%0Afunction%20drawGlypy(angle%2C%20distance)%20%7B%0A%0A%20%20%20%20var%20rings%20%3D%2019%3B%0A%20%20%20%20for%20(%20var%20j%20%3D%200%3B%20j%20%3C%20rings%3B%20j%2B%2B%20)%20%7B%0A%20%20%20%20%20%20base%20%3D%20Math.pow(1.5%2C%20(j%20%2B%201)%20)%0A%20%20%20%20%20%20d%20%3D%20base%20%2B%20distance%20*%20base%3B%0A%20%20%20%20%20%20x%20%3D%20sw%20%2F%202%20%2B%20Math.cos(angle)%20*%20d%3B%0A%20%20%20%20%20%20y%20%3D%20sh%20%2F%202%20%2B%20Math.sin(angle)%20*%20d%3B%0A%20%20%20%20%20%20size%20%3D%20d%20%2F%2020%0A%20%20%20%20%20%20%0A%20%20%20%20%20%20c.fillStyle%20%3D%20%22hsla(%22%20%2B%20~~(j%20%2F%20rings%20*%20300)%20%2B%20%22%2C100%25%2C%2030%25%2C%201)%22%0A%20%20%20%20%20%20c.beginPath()%3B%0A%20%20%20%20%20%20c.arc(x%2C%20y%2C%20size%20*%203%2C%200%2C%202%20*%20Math.PI%2C%20false)%3B%0A%20%20%20%20%20%20c.fill()%3B%0A%20%20%20%20%7D%0A%7D%0A%0Ap%20%3D%200%3B%0A%0Afunction%20r()%20%7B%0A%09a.width%20%3D%20a.width%3B%0A%09p%2B%2B%3B%0A%09dots%20%3D%2020%3B%0A%09tunnel%20%3D%200%3B%0A%0A%09for%20(%20var%20i%20%3D%200%3B%20i%20%3C%20dots%3B%20i%2B%2B%20)%20%7B%0A%09%20%20%20%20angle%20%3D%20p%20%2F%20100%20%2B%20i%20%2F%20dots%20*%20Math.PI%20*%202%3B%0A%09%09distance%20%3D%20tunnel%20%2B%20%20(Math.sin(3%20*%20i%20%2F%20dots%20*%20Math.PI%20*%202)%20%2B%201%20%2B%20Math.cos(p%20%2F%2020%20%2B%202%20*%20i%20%2F%20dots%20*%20Math.PI%20*%202)%20%2B%201)%20%2F%204%3B%0A%09%09drawGlypy(angle%2C%20distance)%3B%0A%09%7D%0A%0A%20%09%2F%2F%20GLOB%0A%20%09window.raf%20%3D%20requestAnimationFrame(r)%3B%0A%7D%0Ar()%3B%0A&c=html%2C%20body%20%7B%0A%09margin%3A%200%3B%0A%09padding%3A%200%3B%0A%09border%3A%200%3B%0A%09background-color%3Ablack%0A%7D%0A%23c%20%7B%20display%3A%20block%3B%20%7D&l=#preview',
                'cp4 (FullScreen, esc to exit)': 'console/index?fullscreen=true&h=%3C!--%20no%20html%20content%20--%3E&j=var%20canvas%20%3D%20document.createElement(%20%27canvas%27%20)%2C%0A%20%20%20%20ctx%20%3D%20canvas.getContext(%20%272d%27%20)%2C%0A%20%20%20%20width%20%3D%20canvas.width%20%3D%20500%2C%0A%20%20%20%20height%20%3D%20canvas.height%20%3D%20500%2C%0A%20%20%20%20rect%20%3D%20%7B%0A%20%20%20%20%20%20x%3A%20width%20%2F%202%2C%0A%20%20%20%20%20%20y%3A%20height%20%2F%202%2C%0A%20%20%20%20%20%20width%3A%2080%2C%0A%20%20%20%20%20%20height%3A%2080%2C%0A%20%20%20%20%20%20rotation%3A%200%0A%20%20%20%20%7D%2C%0A%20%20%20%20tick%20%3D%200%3B%0A%0Actx.lineWidth%20%3D%205%3B%0A%0Afunction%20update()%20%7B%20%20%0A%20%20rect.y%20%3D%20height%20%2F%202%20%2B%20Math.sin(%20tick%20%2F%2020%20)%20*%20175%3B%0A%20%20rect.rotation%20%3D%20Math.cos(%20tick%20%2F%2040%20)%20*%20Math.PI%20*%200.5%3B%0A%7D%0A%0Afunction%20render()%20%7B%0A%20%20ctx.save()%3B%0A%20%20%0A%20%20ctx.translate(%20height%20%2F%202%2C%20width%20%2F%202%20)%3B%0A%20%20ctx.rotate(%20tick%20%2F%2040%20)%3B%0A%20%20%0A%20%20ctx.translate(%20-height%20%2F%202%2C%20-width%20%2F%202%20)%3B%20%20%0A%20%20ctx.fillStyle%20%3D%20%27%23333%27%3B%0A%20%20ctx.fillRect(%20-width%20%2F%202%2C%20height%20%2F%202%20%2C%20width%20*%202%2C%20height%20*%202%20)%3B%0A%20%20%0A%20%20ctx.save()%3B%0A%20%20ctx.translate(%20rect.x%2C%20rect.y%20)%3B%0A%20%20ctx.rotate(%20rect.rotation%20)%3B%0A%20%20ctx.fillStyle%20%3D%20%27%23f34%27%3B%0A%20%20ctx.fillRect(%20-rect.width%20%2F%202%2C%20-rect.height%20%2F%202%2C%20rect.width%2C%20rect.height%20)%3B%0A%20%20ctx.strokeStyle%20%3D%20%27%23333%27%3B%0A%20%20ctx.strokeRect(%20-rect.width%20%2F%202%2C%20-rect.height%20%2F%202%2C%20rect.width%2C%20rect.height%20)%3B%0A%20%20ctx.restore()%3B%0A%20%20%0A%20%20ctx.save()%3B%0A%20%20ctx.translate(%20rect.x%2C%20height%20-%20rect.y%20)%3B%0A%20%20ctx.rotate(%20-rect.rotation%20)%3B%0A%20%20ctx.fillStyle%20%3D%20%27%23333%27%3B%0A%20%20ctx.fillRect(%20-rect.width%20%2F%202%2C%20-rect.height%20%2F%202%2C%20rect.width%2C%20rect.height%20)%3B%0A%20%20ctx.strokeStyle%20%3D%20%27%23f34%27%3B%0A%20%20ctx.strokeRect(%20-rect.width%20%2F%202%2C%20-rect.height%20%2F%202%2C%20rect.width%2C%20rect.height%20)%3B%0A%20%20ctx.restore()%3B%0A%20%20%0A%20%20ctx.restore()%3B%0A%7D%0Avar%20_af%3B%0Afunction%20loop()%20%7B%0A%20%20_af%20%3D%20requestAnimationFrame(%20loop%20)%3B%0A%20%20ctx.clearRect(%200%2C%200%2C%20width%2C%20height%20)%3B%0A%20%20update()%3B%0A%20%20render()%3B%0A%20%20tick%2B%2B%3B%0A%7D%0A%0Adocument.body.appendChild(%20canvas%20)%3B%0Aloop()%3B%0A&c=body%20%7B%0A%20%20background%3A%20%23000%3B%0A%20%20overflow%3A%20hidden%3B%0A%7D%0A%0Acanvas%20%7B%0A%20%20background%3A%20%23f34%3B%0A%20%20bottom%3A%200%3B%0A%20%20left%3A%200%3B%0A%20%20margin%3A%20auto%3B%0A%20%20position%3A%20absolute%3B%0A%20%20right%3A%200%3B%0A%20%20top%3A%200%3B%0A%7D&l=#preview',
                'cp light loader': 'console/index?fullscreen=true&h=%3C!--%20no%20html%20content%20--%3E&j=%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%20%20%0A%2F*%20Light%20Loader%0A%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%0Avar%20lightLoader%20%3D%20function(c%2C%20cw%2C%20ch)%7B%0A%09%0A%09var%20_this%20%3D%20this%3B%0A%09this.c%20%3D%20c%3B%0A%09this.ctx%20%3D%20c.getContext(%272d%27)%3B%0A%09this.cw%20%3D%20cw%3B%0A%09this.ch%20%3D%20ch%3B%09%09%09%0A%09%0A%09this.loaded%20%3D%200%3B%0A%09this.loaderSpeed%20%3D%20.6%3B%0A%09this.loaderHeight%20%3D%2010%3B%0A%09this.loaderWidth%20%3D%20310%3B%09%09%09%09%0A%09this.loader%20%3D%20%7B%0A%09%09x%3A%20(this.cw%2F2)%20-%20(this.loaderWidth%2F2)%2C%0A%09%09y%3A%20(this.ch%2F2)%20-%20(this.loaderHeight%2F2)%0A%09%7D%3B%0A%09this.particles%20%3D%20%5B%5D%3B%0A%09this.particleLift%20%3D%20180%3B%0A%09this.hueStart%20%3D%200%0A%09this.hueEnd%20%3D%20120%3B%0A%09this.hue%20%3D%200%3B%0A%09this.gravity%20%3D%20.15%3B%0A%09this.particleRate%20%3D%204%3B%09%0A%09%09%09%09%09%0A%09%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%09%0A%09%2F*%20Initialize%0A%09%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%0A%09this.init%20%3D%20function()%7B%0A%09%09this.loop()%3B%0A%09%7D%3B%0A%09%0A%09%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%09%0A%09%2F*%20Utility%20Functions%0A%09%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%09%09%09%09%0A%09this.rand%20%3D%20function(rMi%2C%20rMa)%7Breturn%20~~((Math.random()*(rMa-rMi%2B1))%2BrMi)%3B%7D%3B%0A%09this.hitTest%20%3D%20function(x1%2C%20y1%2C%20w1%2C%20h1%2C%20x2%2C%20y2%2C%20w2%2C%20h2)%7Breturn%20!(x1%20%2B%20w1%20%3C%20x2%20%7C%7C%20x2%20%2B%20w2%20%3C%20x1%20%7C%7C%20y1%20%2B%20h1%20%3C%20y2%20%7C%7C%20y2%20%2B%20h2%20%3C%20y1)%3B%7D%3B%0A%09%0A%09%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%09%0A%09%2F*%20Update%20Loader%0A%09%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%0A%09this.updateLoader%20%3D%20function()%7B%0A%09%09if(this.loaded%20%3C%20100)%7B%0A%09%09%09this.loaded%20%2B%3D%20this.loaderSpeed%3B%0A%09%09%7D%20else%20%7B%0A%09%09%09this.loaded%20%3D%200%3B%0A%09%09%7D%0A%09%7D%3B%0A%09%0A%09%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%09%0A%09%2F*%20Render%20Loader%0A%09%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%0A%09this.renderLoader%20%3D%20function()%7B%0A%09%09this.ctx.fillStyle%20%3D%20%27%23000%27%3B%0A%09%09this.ctx.fillRect(this.loader.x%2C%20this.loader.y%2C%20this.loaderWidth%2C%20this.loaderHeight)%3B%0A%09%09%0A%09%09this.hue%20%3D%20this.hueStart%20%2B%20(this.loaded%2F100)*(this.hueEnd%20-%20this.hueStart)%3B%0A%09%09%0A%09%09var%20newWidth%20%3D%20(this.loaded%2F100)*this.loaderWidth%3B%0A%09%09this.ctx.fillStyle%20%3D%20%27hsla(%27%2Bthis.hue%2B%27%2C%20100%25%2C%2040%25%2C%201)%27%3B%0A%09%09this.ctx.fillRect(this.loader.x%2C%20this.loader.y%2C%20newWidth%2C%20this.loaderHeight)%3B%0A%09%09%0A%09%09this.ctx.fillStyle%20%3D%20%27%23222%27%3B%0A%09%09this.ctx.fillRect(this.loader.x%2C%20this.loader.y%2C%20newWidth%2C%20this.loaderHeight%2F2)%3B%0A%09%7D%3B%09%0A%09%0A%09%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%09%0A%09%2F*%20Particles%0A%09%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%0A%09this.Particle%20%3D%20function()%7B%09%09%09%09%09%0A%09%09this.x%20%3D%20_this.loader.x%20%2B%20((_this.loaded%2F100)*_this.loaderWidth)%20-%20_this.rand(0%2C%201)%3B%0A%09%09this.y%20%3D%20_this.ch%2F2%20%2B%20_this.rand(0%2C_this.loaderHeight)-_this.loaderHeight%2F2%3B%0A%09%09this.vx%20%3D%20(_this.rand(0%2C4)-2)%2F100%3B%0A%09%09this.vy%20%3D%20(_this.rand(0%2C_this.particleLift)-_this.particleLift*2)%2F100%3B%0A%09%09this.width%20%3D%20_this.rand(1%2C4)%2F2%3B%0A%09%09this.height%20%3D%20_this.rand(1%2C4)%2F2%3B%0A%09%09this.hue%20%3D%20_this.hue%3B%0A%09%7D%3B%0A%09%0A%09this.Particle.prototype.update%20%3D%20function(i)%7B%0A%09%09this.vx%20%2B%3D%20(_this.rand(0%2C6)-3)%2F100%3B%20%0A%09%09this.vy%20%2B%3D%20_this.gravity%3B%0A%09%09this.x%20%2B%3D%20this.vx%3B%0A%09%09this.y%20%2B%3D%20this.vy%3B%0A%09%09%0A%09%09if(this.y%20%3E%20_this.ch)%7B%0A%09%09%09_this.particles.splice(i%2C%201)%3B%0A%09%09%7D%09%09%09%09%09%0A%09%7D%3B%0A%09%0A%09this.Particle.prototype.render%20%3D%20function()%7B%0A%09%09_this.ctx.fillStyle%20%3D%20%27hsla(%27%2Bthis.hue%2B%27%2C%20100%25%2C%20%27%2B_this.rand(50%2C70)%2B%27%25%2C%20%27%2B_this.rand(20%2C100)%2F100%2B%27)%27%3B%0A%09%09_this.ctx.fillRect(this.x%2C%20this.y%2C%20this.width%2C%20this.height)%3B%0A%09%7D%3B%0A%09%0A%09this.createParticles%20%3D%20function()%7B%0A%09%09var%20i%20%3D%20this.particleRate%3B%0A%09%09while(i--)%7B%0A%09%09%09this.particles.push(new%20this.Particle())%3B%0A%09%09%7D%3B%0A%09%7D%3B%0A%09%09%09%09%09%0A%09this.updateParticles%20%3D%20function()%7B%09%09%09%09%09%0A%09%09var%20i%20%3D%20this.particles.length%3B%09%09%09%09%09%09%0A%09%09while(i--)%7B%0A%09%09%09var%20p%20%3D%20this.particles%5Bi%5D%3B%0A%09%09%09p.update(i)%3B%09%09%09%09%09%09%09%09%09%09%09%0A%09%09%7D%3B%09%09%09%09%09%09%0A%09%7D%3B%0A%09%0A%09this.renderParticles%20%3D%20function()%7B%0A%09%09var%20i%20%3D%20this.particles.length%3B%09%09%09%09%09%09%0A%09%09while(i--)%7B%0A%09%09%09var%20p%20%3D%20this.particles%5Bi%5D%3B%0A%09%09%09p.render()%3B%09%09%09%09%09%09%09%09%09%09%09%0A%09%09%7D%3B%09%09%09%09%09%0A%09%7D%3B%0A%09%0A%0A%09%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%09%0A%09%2F*%20Clear%20Canvas%0A%09%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%0A%09this.clearCanvas%20%3D%20function()%7B%0A%09%09this.ctx.globalCompositeOperation%20%3D%20%27source-over%27%3B%0A%09%09this.ctx.clearRect(0%2C0%2Cthis.cw%2Cthis.ch)%3B%09%09%09%09%09%0A%09%09this.ctx.globalCompositeOperation%20%3D%20%27lighter%27%3B%0A%09%7D%3B%0A%09%0A%09%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%09%0A%09%2F*%20Animation%20Loop%0A%09%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%0A%09this.loop%20%3D%20function()%7B%0A%09%09var%20loopIt%20%3D%20function()%7B%0A%09%09%09requestAnimationFrame(loopIt%2C%20_this.c)%3B%0A%09%09%09_this.clearCanvas()%3B%0A%09%09%09%0A%09%09%09_this.createParticles()%3B%0A%09%09%09%0A%09%09%09_this.updateLoader()%3B%0A%09%09%09_this.updateParticles()%3B%0A%09%09%09%0A%09%09%09_this.renderLoader()%3B%0A%09%09%09_this.renderParticles()%3B%0A%09%09%09%0A%09%09%7D%3B%0A%09%09loopIt()%3B%09%09%09%09%09%0A%09%7D%3B%0A%0A%7D%3B%0A%0A%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%09%0A%2F*%20Check%20Canvas%20Support%0A%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%0Avar%20isCanvasSupported%20%3D%20function()%7B%0A%09var%20elem%20%3D%20document.createElement(%27canvas%27)%3B%0A%09return%20!!(elem.getContext%20%26%26%20elem.getContext(%272d%27))%3B%0A%7D%3B%0A%0A%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%09%0A%2F*%20Setup%20requestAnimationFrame%0A%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%0Avar%20setupRAF%20%3D%20function()%7B%0A%09var%20lastTime%20%3D%200%3B%0A%09var%20vendors%20%3D%20%5B%27ms%27%2C%20%27moz%27%2C%20%27webkit%27%2C%20%27o%27%5D%3B%0A%09for(var%20x%20%3D%200%3B%20x%20%3C%20vendors.length%20%26%26%20!window.requestAnimationFrame%3B%20%2B%2Bx)%7B%0A%09%09window.requestAnimationFrame%20%3D%20window%5Bvendors%5Bx%5D%2B%27RequestAnimationFrame%27%5D%3B%0A%09%09window.cancelAnimationFrame%20%3D%20window%5Bvendors%5Bx%5D%2B%27CancelAnimationFrame%27%5D%20%7C%7C%20window%5Bvendors%5Bx%5D%2B%27CancelRequestAnimationFrame%27%5D%3B%0A%09%7D%3B%0A%09%0A%09if(!window.requestAnimationFrame)%7B%0A%09%09window.requestAnimationFrame%20%3D%20function(callback%2C%20element)%7B%0A%09%09%09var%20currTime%20%3D%20new%20Date().getTime()%3B%0A%09%09%09var%20timeToCall%20%3D%20Math.max(0%2C%2016%20-%20(currTime%20-%20lastTime))%3B%0A%09%09%09var%20id%20%3D%20window.setTimeout(function()%20%7B%20callback(currTime%20%2B%20timeToCall)%3B%20%7D%2C%20timeToCall)%3B%0A%09%09%09lastTime%20%3D%20currTime%20%2B%20timeToCall%3B%0A%09%09%09return%20id%3B%0A%09%09%7D%3B%0A%09%7D%3B%0A%09%0A%09if%20(!window.cancelAnimationFrame)%7B%0A%09%09window.cancelAnimationFrame%20%3D%20function(id)%7B%0A%09%09%09clearTimeout(id)%3B%0A%09%09%7D%3B%0A%09%7D%3B%0A%7D%3B%09%09%09%0A%0A%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%09%0A%2F*%20Define%20Canvas%20and%20Initialize%0A%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%0Aif(isCanvasSupported)%7B%0A%20%20var%20c%20%3D%20document.createElement(%27canvas%27)%3B%0A%20%20c.width%20%3D%20400%3B%0A%20%20c.height%20%3D%20100%3B%09%09%09%0A%20%20var%20cw%20%3D%20c.width%3B%0A%20%20var%20ch%20%3D%20c.height%3B%09%0A%20%20document.body.appendChild(c)%3B%09%0A%20%20var%20cl%20%3D%20new%20lightLoader(c%2C%20cw%2C%20ch)%3B%09%09%09%09%0A%20%20%0A%20%20setupRAF()%3B%0A%20%20cl.init()%3B%0A%7D%0A&c=%0A%0Abody%20%7B%0A%09background%3A%20%23111%3B%0A%7D%0A%0Acanvas%20%7B%0A%09background%3A%20%23111%3B%0A%09border%3A%201px%20solid%20%23171717%3B%0A%09display%3A%20block%3B%0A%09left%3A%2050%25%3B%0A%09margin%3A%20-51px%200%200%20-201px%3B%0A%09position%3A%20absolute%3B%0A%09top%3A%2050%25%3B%0A%7D%0A%0A&l=#preview',
                'cp Ana Tudor rules': 'console/index?fullscreen=true&h=%0A%0A%3Cul%20class%3D%27wrapper%27%3E%0A%20%20%3Cli%20class%3D%27piece%20triangle%20triangle-big%27%3E%3C%2Fli%3E%0A%20%20%3Cli%20class%3D%27piece%20triangle%20triangle-small%27%3E%3C%2Fli%3E%0A%20%20%3Cli%20class%3D%27piece%20block%20block-low%27%3E%3C%2Fli%3E%0A%20%20%3Cli%20class%3D%27piece%20block%20block-high%27%3E%3C%2Fli%3E%0A%3C%2Ful%3E%0A%0A&j=%2F*%20no%20javascript%20content%20*%2F&c=%0A%0Abody%20%7B%20overflow%3A%20hidden%3B%20%7D%0A.wrapper%20%7B%0A%20%20position%3A%20relative%3B%0A%20%20margin%3A%201em%20auto%3B%0A%20%20padding%3A%200%3B%0A%20%20width%3A%2013em%3B%20height%3A%205em%3B%0A%20%20box-shadow%3A%20inset%20-1px%20-1px%200%20black%3B%0A%20%20list-style%3A%20none%3B%0A%20%20background%3A%20linear-gradient(black%202.5%25%2C%20transparent%201px)%2C%0A%20%20%20%20linear-gradient(90deg%2C%20black%202.5%25%2C%20transparent%201px)%3B%0A%20%20background-size%3A%201em%201em%3B%0A%20%20font%3A%202.5em%20Verdana%2C%20sans-serif%3B%0A%7D%0A.piece%20%7B%0A%20%20position%3A%20absolute%3B%0A%20%20right%3A%200%3B%20bottom%3A%200%3B%0A%20%20opacity%3A%20.85%3B%0A%20%20animation%3A%20ani%204s%20infinite%20linear%20alternate%3B%0A%7D%0A.triangle%20%7B%20overflow%3A%20hidden%3B%20transform-origin%3A%200%20100%25%3B%20%7D%0A.piece%3Abefore%20%7B%0A%20%20position%3A%20absolute%3B%0A%20%20content%3A%20%27%27%3B%0A%7D%0A.triangle%3Abefore%20%7B%0A%20%20width%3A%20inherit%3B%20height%3A%20inherit%3B%0A%20%20transform-origin%3A%20inherit%3B%0A%7D%0A.block%20%7B%20width%3A%205em%3B%20height%3A%201em%3B%20%7D%0A.block%3Abefore%20%7B%20height%3A%201em%3B%20background%3A%20inherit%3B%20%7D%0A.triangle-big%20%7B%0A%20%20right%3A%205em%3B%0A%20%20width%3A%208em%3B%20height%3A%203em%3B%0A%20%20transform%3A%20skewX(-69.444deg)%3B%20%2F*%20-arctan(width%2Fheight)%20*%2F%0A%20%20animation-name%3A%20ani-triangle-big%3B%0A%7D%0A.triangle-big%3Abefore%20%7B%0A%20%20background%3A%20crimson%3B%0A%20%20transform%3A%20skewX(69.444deg)%3B%20%20%2F*%20arctan(width%2Fheight)%20*%2F%0A%7D%0A.triangle-small%20%7B%0A%20%20bottom%3A%203em%3B%0A%20%20width%3A%205em%3B%20height%3A%202em%3B%0A%20%20transform%3A%20skewX(-68.2deg)%3B%20%2F*%20-arctan(width%2Fheight)%20*%2F%0A%20%20animation-name%3A%20ani-triangle-small%3B%0A%7D%0A.triangle-small%3Abefore%20%7B%0A%20%20background%3A%20mediumvioletred%3B%0A%20%20transform%3A%20skewX(68.2deg)%3B%20%2F*%20arctan(width%2Fheight)%20*%2F%0A%7D%0A.block-high%20%7B%0A%20%20bottom%3A%202em%3B%0A%20%20background%3A%20darkmagenta%3B%0A%20%20animation-name%3A%20ani-block-high%3B%0A%7D%0A.block-high%3Abefore%20%7B%0A%20%20top%3A%20100%25%3B%0A%20%20width%3A%202em%3B%0A%7D%0A.block-low%20%7B%0A%20%20background%3A%20darkviolet%3B%0A%7D%0A.block-low%3Abefore%20%7B%0A%20%20right%3A%200%3B%20bottom%3A%20100%25%3B%0A%20%20width%3A%203em%3B%0A%7D%0A%0A%40keyframes%20ani-triangle-big%20%7B%0A%20%200%25%2C%2025%25%20%7B%0A%20%20%20%20right%3A%205em%3B%20bottom%3A%200%3B%0A%20%20%20%20transform%3A%20rotate(0deg)%20skewX(-69.444deg)%3B%0A%20%20%7D%0A%20%2075%25%2C%20100%25%20%7B%0A%20%20%20%20right%3A%200%3B%20bottom%3A%202em%3B%0A%20%20%20%20transform%3A%20rotate(360deg)%20skewX(-69.444deg)%3B%0A%20%20%7D%0A%7D%0A%40keyframes%20ani-triangle-small%20%7B%0A%20%200%25%2C%2025%25%20%7B%0A%20%20%20%20right%3A%200%3B%20bottom%3A%203em%3B%0A%20%20%20%20transform%3A%20rotate(0deg)%20skewX(-68.2deg)%3B%0A%20%20%7D%0A%20%2075%25%2C%20100%25%20%7B%0A%20%20%20%20right%3A%208em%3B%20bottom%3A%200%3B%0A%20%20%20%20transform%3A%20rotate(-360deg)%20skewX(-68.2deg)%3B%0A%20%20%7D%0A%7D%0A%40keyframes%20ani-block-high%20%7B%0A%20%200%25%2C%2025%25%20%7B%20right%3A%200%3B%20bottom%3A%202em%3B%20%7D%0A%20%2075%25%2C%20100%25%20%7B%20right%3A%203em%3B%20bottom%3A%201em%3B%20%7D%0A%7D%0A%0A&l=#preview',
                'cp Twitter button': 'console/index?fullscreen=true&h=%0A%0A%3Csection%3E%0A%20%20%3Cdiv%20class%3D%22button%22%3E%0A%20%20%20%20%3Ca%20href%3D%22https%3A%2F%2Ftwitter.com%2Fbennettfeely%22%20class%3D%22twitter-follow-button%22%20data-show-count%3D%22false%22%20data-size%3D%22large%22%3EFollow%20%40bennettfeely%3C%2Fa%3E%0A%20%20%20%20%3Cscript%3E!function(d%2Cs%2Cid)%7Bvar%20js%2Cfjs%3Dd.getElementsByTagName(s)%5B0%5D%3Bif(!d.getElementById(id))%7Bjs%3Dd.createElement(s)%3Bjs.id%3Did%3Bjs.src%3D%22%2F%2Fplatform.twitter.com%2Fwidgets.js%22%3Bfjs.parentNode.insertBefore(js%2Cfjs)%3B%7D%7D(document%2C%22script%22%2C%22twitter-wjs%22)%3B%3C%2Fscript%3E%0A%20%20%3C%2Fdiv%3E%0A%20%20%3Cdiv%20class%3D%22cover%22%3E%0A%20%20%20%20%3Cdiv%20class%3D%22innie%22%3E%3C%2Fdiv%3E%0A%20%20%20%20%3Cdiv%20class%3D%22spine%22%3E%3C%2Fdiv%3E%0A%20%20%20%20%3Cdiv%20class%3D%22outie%22%3E%3C%2Fdiv%3E%0A%3C%2Fdiv%3E%0A%20%20%3Cdiv%20class%3D%22shadow%22%3E%3C%2Fdiv%3E%0A%3C%2Fsection%3E%0A%0A%3Csmall%3ELive%20version%20of%20Erik%20Deiner%27s%20%3Ca%20target%3D%22_blank%22%20href%3D%22http%3A%2F%2Fdribbble.com%2Fshots%2F457259-Twitter-Button-Concept%22%3ETwitter%20Button%20Concept%3C%2Fa%3E%20on%20Dribbble.%3C%2Fsmall%3E%0A%0A&j=%2F*%20no%20javascript%20content%20*%2F&c=%0A%0Asection%2C%20section%20div%20%7B%0A%20%20%2F*%20See%20it%20in%20slo-mo%2C%20you%20can%20change%20this%20*%2F%0A%20%20transition-duration%3A%20.6s%3B%0A%7D%0A%0A*%20%7B%20box-sizing%3A%20border-box%3B%20%7D%0Ahtml%2C%20body%20%7B%20height%3A%20100%25%3B%20%7D%0Abody%20%7B%0A%20%20display%3A%20flex%3B%0A%20%20flex-direction%3A%20column%3B%0A%20%20justify-content%3A%20center%3B%0A%20%20align-items%3A%20center%3B%0A%20%20background-image%3A%20-webkit-radial-gradient(center%20top%2C%20circle%20farthest-corner%2C%20%23FFFFFF%200%25%2C%20%23D8DFE9%20100%25)%3B%0A%20%20background-image%3A%20radial-gradient(circle%20farthest-corner%20at%20center%20top%2C%20%23FFFFFF%200%25%2C%20%23D8DFE9%20100%25)%3B%0A%20%20overflow%3A%20hidden%3B%0A%7D%0A%0Asection%2C%20.button%20%7B%20transition-timing-function%3A%20ease%3B%20%7D%0A%0Asection%20%7B%0A%20%20display%3A%20inline-block%3B%0A%20%20position%3A%20relative%3B%0A%20%20padding%3A%20.375rem%20.375rem%200%3B%0A%20%20height%3A%202.5rem%3B%0A%20%20background%3A%20%23A9ADB6%3B%0A%20%20border-radius%3A%20.25rem%3B%0A%20%20perspective%3A%20300%3B%0A%20%20box-shadow%3A%200%20-1px%202px%20%23fff%2C%20inset%200%201px%202px%20rgba(0%2C0%2C0%2C.2)%2C%20inset%200%20.25rem%201rem%20rgba(0%2C0%2C0%2C.1)%3B%0A%7D%0A%0A%0A.button%20%7B%20opacity%3A%200%3B%20%7D%0A%0A.cover%20%7B%0A%20%20position%3A%20absolute%3B%0A%20%20top%3A%200%3B%20right%3A%200%3B%20bottom%3A%200%3B%20left%3A%200%3B%0A%20%20transform-origin%3A%20center%20bottom%3B%0A%20%20transform-style%3A%20preserve-3d%3B%0A%20%20font%3A%201.25em%2F2%20%22icon%22%3B%0A%20%20color%3A%20white%3B%0A%20%20text-align%3A%20center%3B%0A%20%20pointer-events%3A%20none%3B%0A%20%20z-index%3A%20100%3B%0A%7D%0A%0A.innie%2C%20.outie%2C%20.spine%2C%20.shadow%20%7B%20position%3A%20absolute%3B%20width%3A%20100%25%3B%20%7D%0A%0A.innie%2C%20.outie%20%7B%0A%20%20height%3A%20100%25%3B%0A%20%20background-image%3A%20-webkit-linear-gradient(top%2C%20transparent%200%25%2C%20rgba(0%2C0%2C0%2C.1)%20100%25)%3B%0A%20%20border-radius%3A%20.25rem%3B%0A%7D%0A.innie%3Aafter%2C%20.outie%3Aafter%20%7B%20content%3A%22t%22%3B%20%7D%0A%0A.innie%20%7B%0A%20%20background-color%3A%20%2367E2FE%3B%0A%20%20text-shadow%3A%200%20-2px%204px%20rgba(0%2C0%2C0%2C.2)%3B%0A%7D%0A%0A.spine%20%7B%0A%20%20top%3A%20.25rem%3B%0A%20%20background%3A%20%2320C7F3%3B%0A%20%20height%3A%20.25rem%3B%0A%20%20transform%3A%20rotateX(90deg)%3B%0A%20%20transform-origin%3A%20center%20top%3B%0A%7D%0A%0A.shadow%20%7B%0A%20%20top%3A%20100%25%3B%0A%20%20left%3A%200%3B%0A%20%20height%3A%203.5rem%3B%0A%20%20transform-origin%3A%20center%20top%3B%0A%20%20transform%3A%20rotateX(90deg)%3B%0A%20%20opacity%3A%200%3B%0A%20%20z-index%3A%200%3B%0A%20%20background-image%3A%20-webkit-linear-gradient(top%2C%20rgba(0%2C0%2C0%2C.6)%200%25%2C%20transparent%20100%25)%3B%0A%20%20background-image%3A%20linear-gradient(to%20bottom%2C%20rgba(0%2C0%2C0%2C.6)%200%25%2C%20transparent%20100%25)%3B%0A%20%20border-radius%3A%20.4rem%3B%0A%0A%7D%0A%0A.outie%20%7B%0A%20%20background-color%3A%20%232EC8FA%3B%0A%20%20transform%3A%20translateZ(.25rem)%3B%0A%20%20text-shadow%3A%200%202px%204px%20rgba(0%2C0%2C0%2C.2)%3B%0A%7D%0A%0Asection%3Ahover%20%7B%20background%3A%20%23EBEFF2%3B%20%7D%0Asection%3Ahover%20.button%20%7B%20opacity%3A%201%3B%20%7D%0A%0Asection%3Ahover%20.cover%2C%20section%3Ahover%20.innie%2C%20section%3Ahover%20.spine%2C%20section%3Ahover%20.outie%2C%20section%3Ahover%20.spine%20%7B%20transition-timing-function%3A%20cubic-bezier(.2%2C.7%2C.1%2C1.1)%3B%20%7D%0A%0Asection%3Ahover%20.cover%20%7B%20transform%3A%20rotateX(-120deg)%3B%20%20%7D%0A%0Asection%3Ahover%20.innie%20%7B%20background-color%3A%20%233ADAFC%3B%20%7D%0Asection%3Ahover%20.spine%20%7B%20background-color%3A%20%2352B1E0%3B%20%7D%0Asection%3Ahover%20.outie%20%7B%20background-color%3A%20%232174A0%3B%20color%3A%20rgba(255%2C255%2C255%2C0)%3B%20%7D%0A%0Asection%3Ahover%20.shadow%20%7B%20%0A%20%20opacity%3A%201%3B%0A%20%20transform%3A%20rotateX(45deg)%20scale(.95)%3B%0A%7D%0A%0A%0Asmall%20%7B%0A%20%20font%3A%20.8rem%2F1%20sans-serif%3B%0A%20%20padding-top%3A%204rem%3B%0A%20%20color%3A%20%23777%3B%0A%7D%0Asmall%20a%20%7B%20color%3A%20%23222%3B%20text-decoration%3A%20none%3B%20border-bottom%3A%20thin%20solid%20%23ccc%3B%20%7D%0Asmall%20a%3Ahover%20%7B%20border-bottom-color%3A%20%23222%3B%20%7D%0A%0A%0A%2F*%20Twitter%20font%20icon%3A%20http%3A%2F%2Fcodepen.io%2Fbennettfeely%2Fpen%2FGCAKJ%20*%2F%0A%40font-face%20%7B%20font-family%3Aicon%3B%20src%3A%20url(%27http%3A%2F%2Fbennettfeely.com%2Ffonts%2Ficons.woff%27)%3B%20%7D%0A%0A&l=#preview',
                'coloured range (fullscreen, esc to edit)': 'console/index?fullscreen=true&h=%09%3Cinput%20type%3D%22range%22%20min%3D0%20max%3D120%20step%3D1%20value%3D50%3E%0A%09%0A%0A%09%3Chr%2F%3E%0A%09%3Cdiv%20style%3D%22width%3A300px%22%3E%0A%09%09%3Cinput%20type%3D%22range%22%20min%3D0%20max%3D120%20step%3D1%20value%3D50%20id%3D%22range2%22%3E%0A%09%3C%2Fdiv%3E%09%0A%0A%09%3Chr%3E%0A%0A%09%0A%09%3Cinput%20type%3D%22range%22%20min%3D0%20max%3D120%20step%3D1%20value%3D50%3E&j=function%20rangeColor(input)%20%7B%0A%20%20var%20w%2C%0A%20%20%20%20%20%20wrp%20%3D%20document.createElement(%27div%27)%2C%0A%20%20%20%20%20%20preBar%20%3D%20document.createElement(%27p%27)%2C%0A%20%20%20%20%20%20range%20%3D%20input.max%20-%20input.min%2C%0A%20%20%20%20%20%20getVal%20%3D%20function%20()%20%7B%0A%20%20%20%20%20%20%20%20return%20~~(w%20*%20(input.value%20-%20input.min)%20%2F%20range)%3B%0A%20%20%20%20%20%20%7D%3B%0A%20%20wrp.className%20%3D%20%27barCnt%27%3B%0A%20%20preBar.className%20%3D%20%27preBar%27%3B%0A%0A%20%20input.className%20%3D%20input.className.length%20%3F%20(input.className%20%2B%20%27%20colorized%27)%20%3A%20%27colorized%27%3B%0A%20%20input.parentNode.replaceChild(wrp%2C%20input)%3B%0A%0A%20%20wrp.appendChild(input)%3B%0A%20%20wrp.appendChild(preBar)%3B%0A%0A%20%20w%20%3D%20input.clientWidth%3B%0A%0A%20%20input.addEventListener(%27input%27%2C%20function%20()%20%7B%0A%20%20%20%20preBar.style.width%20%3D%20getVal()%20%2B%20%27px%27%3B%0A%20%20%7D)%3B%0A%20%20preBar.style.width%20%3D%20getVal()%20%2B%20%27px%27%3B%0A%7D%0A%0A%0ArangeColor(document.getElementById(%27range2%27))&c=body%7B%0A%09padding%3A10px%0A%7D%0A.barCnt%20%7B%0A%20%20position%3Arelative%3B%0A%20%20height%3A10px%3B%0A%20%20padding%3A5px%200px%3B%0A%7D%0A.barCnt%20.preBar%7B%0A%20%20position%3Aabsolute%3B%0A%20%20background-color%3Ablue%3B%0A%20%20height%3A5px%3B%0A%20%20line-height%3A5px%3B%0A%20%20z-index%3A200%3B%0A%20%20border-radius%3A%203px%3B%0A%20%20padding%3A0px%3B%0A%20%20margin%3A0px%3B%0A%20%20pointer-events%3A%20none%3B%0A%7D%0Ainput%5Btype%3Drange%5D.colorized%20%7B%0A%20%20-webkit-appearance%3A%20none%3B%0A%20%20width%3A%20100%25%3B%0A%20%20height%3A5px%3B%0A%20%20position%3Aabsolute%3B%0A%20%20padding%3A0px%3B%0A%20%20margin%3A0px%3B%0A%20%20cursor%3A%20ew-resize%3B%0A%20%20z-index%3A100%3B%0A%7D%0Ainput%5Btype%3Drange%5D.colorized%3A%3A-webkit-slider-runnable-track%20%7B%0A%20%20height%3A%205px%3B%0A%20%20background%3A%20orange%3B%0A%20%20border%3A%20none%3B%0A%20%20border-radius%3A%203px%3B%0A%7D%0Ainput%5Btype%3Drange%5D.colorized%3A%3A-webkit-slider-thumb%20%7B%0A%20%20-webkit-appearance%3A%20none%3B%0A%20%20border%3A%20none%3B%0A%20%20height%3A%2016px%3B%0A%20%20width%3A%2016px%3B%0A%20%20border-radius%3A%2050%25%3B%0A%20%20background%3A%20blue%3B%0A%20%20margin-top%3A%20-4px%3B%0A%20%20z-index%3A400%3B%0A%7D%0Ainput%5Btype%3Drange%5D.colorized%3Afocus%20%7B%0A%20%20outline%3A%20none%3B%0A%7D%0Ainput%5Btype%3Drange%5D.colorized%3Afocus%3A%3A-webkit-slider-runnable-track%20%7B%0A%20%20background%3A%20%23ccc%3B%0A%7D%0Ainput%5Btype%3Drange%5D.colorized%3A%3A-moz-range-track%20%7B%0A%20%20width%3A%20100%25%3B%0A%20%20height%3A%205px%3B%0A%20%20background%3A%20orange%3B%0A%20%20border%3A%20none%3B%0A%20%20border-radius%3A%203px%3B%0A%7D%0Ainput%5Btype%3Drange%5D.colorized%3A%3A-moz-range-thumb%20%7B%0A%20%20border%3A%20none%3B%0A%20%20height%3A%2016px%3B%0A%20%20width%3A%2016px%3B%0A%20%20border-radius%3A%2050%25%3B%0A%20%20background%3A%20blue%3B%0A%20%20z-index%3A400%3B%0A%7D%0Ainput%5Btype%3Drange%5D.colorized%3A%3A-moz-focus-outer%20%7B%0A%20%20border%3A%200%3B%0A%7D&l=#preview',
                'Console cs': 'demo/cs/',
                Center: 'console/index?fullscreen=true&h=%3Cdiv%20class%3D%22center%20centerALL%20round8%22%3E%0A%20%20%20%20%3Cdiv%20class%3D%22inner%22%3ELorem%20ipsum%20dolor%20sit%20amet%2C%20consectetur%20adipisicing%20elit.%20Alias%20ducimus%20sed%20optio%20esse%20architecto%20quae%20earum%20repellendus%20consequatur%20accusamus%20ipsam%3F%3C%2Fdiv%3E%0A%3C%2Fdiv%3E&j=%2F*%20no%20javascript%20content%20*%2F&c=body%7B%0A%20%20%20%20font-family%3Averdana%3B%0A%7D%0A.center%7B%0A%20%20%20%20height%3A50%25%3B%0A%20%20%20%20width%3A50%25%3B%0A%20%20%20%20background-color%3A%20gainsboro%3B%0A%20%20%20%20position%3Aabsolute%3B%0A%20%20%20%20display%3Atable%3B%0A%7D%0A.centerV%20%7B%0A%20%20%20%20top%20%3A%2025%25%3B%0A%7D%0A.centerO%20%7B%0A%20%20%20%20left%3A25%25%3B%0A%7D%0A.centerALL%7B%0A%20%20%20%20top%3A25%25%3B%0A%20%20%20%20left%3A25%25%3B%0A%7D%0A.center%20.inner%7B%0A%20%20%20%20padding%3A50px%3B%0A%20%20%20%20display%3Atable-cell%3B%0A%20%20%20%20vertical-align%3Amiddle%3B%0A%7D&l=#preview',
                Wolf: 'console/index?fullscreen=true&h=%3Csvg%20id%3D%22wolf_003-01-01%22%0A%20%20%20%20%20%20%20%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%0A%20%20%20%20%20%20%20%20%20version%3D%221.1%22%20%0A%20%20%20%20%20%20%20%20%20viewBox%3D%220%200%20520%20370%22%0A%20%20%20%20%20%20%20%20%20style%3D%22max-height%3A560%3B%20max-width%3A95%25%22%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--ui%20lol--%3E%0A%0A%20%20%20%20%20%20%20%20%3Cg%20id%3D%22G%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20x%3D%22235%22%20y%3D%22210%22%20height%3D%2220%22%20width%3D%2255%22%20fill%3D%22%23bbb%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Ctext%20x%3D%22242%22%20y%3D%22228%22%20font-size%3D%2220%22%20fill%3D%22black%22%3ERUN%3C%2Ftext%3E%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0A%0A%20%20%20%20%20%20%20%20%3Cg%20id%3D%22S%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20x%3D%22290%22%20y%3D%22210%22%20height%3D%2220%22%20width%3D%2255%22%20fill%3D%22black%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Ctext%20x%3D%22293%22%20y%3D%22228%22%20font-size%3D%2220%22%20fill%3D%22white%22%3ESTOP%3C%2Ftext%3E%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--try%201st%20on%20these%20two--%3E%0A%0A%20%20%20%20%20%20%20%20%3Cg%20id%3D%22head%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20fill%3D%22%23000%22%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20d%3D%22m%20234.46%2C6.3499%20-47.375%2C11.525%20-9.65%2C8.725%20-26.775%2C13.7%205.15%2C7.6%2010.7%2C2.45%20-2.925%2C11.475%208.325%2C-3.5%2023.5%2C-1.375%2012.225%2C16.5%2033.428%2C-17.17%2013.472%2C-39.855%20-18.55%2C-1.7256%20z%22%3E%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Canimate%20attributeName%3D%22d%22%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20begin%3D%22G.click%22%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20end%3D%22S.click%22%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20dur%3D%221s%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20values%3D%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20234.46%2C6.3499%20-47.375%2C11.525%20-9.65%2C8.725%20-26.775%2C13.7%205.15%2C7.6%2010.7%2C2.45%20-2.925%2C11.475%208.325%2C-3.5%2023.5%2C-1.375%2012.225%2C16.5%2033.428%2C-17.17%2013.472%2C-39.855%20-18.55%2C-1.7256%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20M%20234.46%2C6.3499%20179.0333%2C20.694227%20177.435%2C26.5999%20151.05637%2C41.873014%20155.81%2C47.8999%20l%2010.7%2C2.45%20-0.23412%2C11.454576%205.63412%2C-3.479576%2023.5%2C-1.375%2014.9398%2C19.63164%2030.7132%2C-20.30164%2010.00632%2C-40.616757%20-18.14466%2C1.029538%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20158.52092%2C25.455374%20-43.31409%2C7.057995%20-8.43172%2C10.349365%20-22.714093%2C12.481726%207.180457%2C10.036548%2012.730466%2C-2.017005%20-3.3311%2C15.535914%2011.57373%2C-6.34264%2016.59645%2C-0.562817%207.75799%2C12.032995%2037.89501%2C-12.702995%2013.87809%2C-38.230634%20-24.64137%2C-1.7256%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20152.02345%2C11.648268%20-52.248093%2C13.961548%20-1.934264%2C7.100635%20-21.9019%2C14.106091%205.15%2C7.6%209.075634%2C4.480457%20-1.300634%2C11.881091%208.325%2C-5.936548%2023.906087%2C-1.781091%2011.81891%2C16.906091%2033.428%2C-17.17%2013.472%2C-39.855%20-35.60584%2C-5.380422%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20M%20148.36864%2C6.7751712%2096.932723%2C18.300171%2087.28272%2C30.273902%2065.380817%2C43.567811%20l%205.15%2C7.6%2010.7%2C2.45%20-2.925%2C11.475%208.325%2C-3.5%2021.469543%2C-4.21764%209.78845%2C9.190356%2037.89501%2C-7.017716%2025.24865%2C-41.479366%20-33.98147%2C-5.380422%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20M%20139.43463%2C5.9629884%2092.059624%2C19.924536%2075.50607%2C33.116542%2054.41635%2C44.379993%20l%207.586548%2C9.630457%2018.415736%2C0.419543%20-10.234644%2C5.789721%207.512817%2C7.058376%2023.906093%2C-8.684645%2012.225%2C16.5%2033.428%2C-17.17%2016.72073%2C-41.073274%20-21.79873%2C-4.56824%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20143.08944%2C21.39446%20-49.811546%2C15.179823%20-5.182991%2C11.161548%20-23.526269%2C16.948731%205.15%2C8.006091%2011.918274%2C0.01345%20-6.173731%2C9.850635%205.48236%2C4.621827%2029.185273%2C-7.872462%209.78845%2C11.626904%2035.05237%2C-10.266447%2010.62936%2C-51.225559%20-23.017%2C-0.101234%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20141.46508%2C36.825933%20-39.65926%2C19.646828%20-8.431725%2C12.379822%20-19.465362%2C10.045178%207.586548%2C9.630457%208.669543%2C-1.204823%20-4.143274%2C12.693275%206.294547%2C4.21574%2024.718273%2C-11.527289%2010.60064%2C12.032999%2031.80363%2C-13.10909%2019.56337%2C-50.819468%20-29.51446%2C1.929223%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20155.14149%2C32.21773%20-41.55727%2C13.762587%20-3.38476%2C10.067551%20-31.697694%2C19.070208%208.282621%2C8.942553%209.804969%2C0.212413%20-2.477484%2C11.475%207.877488%2C4.555308%2025.29007%2C-11.220377%207.30231%2C9.787239%2034.77055%2C-10.009722%2013.472%2C-39.855%20-18.55%2C-1.7256%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20167.22446%2C26.847521%20-47.375%2C21.370382%20-4.27979%2C12.752656%20-24.089897%2C11.909931%209.177657%2C9.390069%2012.93758%2C-2.025173%20-7.40017%2C10.132448%204.74486%2C6.792899%2025.29007%2C-10.772865%2019.83279%2C17.395032%2025.82021%2C-14.93241%2022.86986%2C-54.623073%20-32.42303%2C1.854539%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20180.64998%2C32.21773%20-46.47997%2C18.23776%20-4.72731%2C14.095208%20-23.19486%2C13.7%205.59752%2C5.809931%2012.93759%2C5.582622%20-3.37252%2C11.027479%209.22003%2C1.87021%2025.73759%2C-12.115415%204.40503%2C16.357355%2031.23317%2C12.62467%2081.97769%2C-81.135272%20-88.95804%2C9.316083%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20191.83792%2C39.378007%20-46.47997%2C20.02783%20-4.27979%2C11.410105%20-25.87997%2C13.252482%207.38759%2C8.047518%2012.49007%2C1.554968%20-6.50514%2C7.89486%205.6399%2C5.45035%2038.71559%2C-10.772866%201.03706%2C9.339716%2022.24007%2C15.49877%20L%20301.368%2C77.473574%20197.43692%2C48.433445%20Z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20220.92654%2C31.770211%20-50.95514%2C17.342726%20-3.83227%2C8.725%20-30.87218%2C16.574101%2011.69693%2C13.321427%2010.93536%2C-2.565389%20-6.12715%2C10.414142%205.89842%2C5.261352%2039.04363%2C-1.988341%2026.93952%2C15.485491%2051.8653%2C-15.896971%20-2.74368%2C-57.046055%20-48.08615%2C1.407022%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20234.46%2C6.3499%20-47.375%2C11.525%20-9.65%2C8.725%20-26.775%2C13.7%205.15%2C7.6%2010.7%2C2.45%20-2.925%2C11.475%208.325%2C-3.5%2023.5%2C-1.375%2012.225%2C16.5%2033.428%2C-17.17%2013.472%2C-39.855%20-18.55%2C-1.7256%20z%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20repeatCount%3D%22indefinite%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fpath%3E%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%20%20%20%20%3Cg%20id%3D%22body%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20fill%3D%22%23000%22%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20d%3D%22m%20331.31%2C7.3249%20-6.775%2C0.525%20-30.975%2C10.075%20-57.278%2C-2.4793%20-10.328%2C26.769%20-30.808%2C15.043%2014.39%2C18.767%2033.689%2C23.042%2048.311%2C-13.992%209.725%2C-11.2%209.7217%2C14.043%2052.339%2C4.0971%2015.257%2C-12.126%208.337%2C-35.96%20-6.9554%2C-14.429%20-19.775%2C-17.2%20z%22%3E%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Canimate%20attributeName%3D%22d%22%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20begin%3D%22G.click%22%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20end%3D%22S.click%22%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20dur%3D%221s%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20values%3D%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20331.31%2C7.3249%20-6.775%2C0.525%20-30.975%2C10.075%20-57.278%2C-2.4793%20-10.328%2C26.769%20-30.808%2C15.043%2014.39%2C18.767%2033.689%2C23.042%2048.311%2C-13.992%209.725%2C-11.2%209.7217%2C14.043%2052.339%2C4.0971%2015.257%2C-12.126%208.337%2C-35.96%20-6.9554%2C-14.429%20-19.775%2C-17.2%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20350.59933%2C16.241199%20-32.16706%2C-2.040489%20-15.24106%2C6.409303%20-52.686%2C-5.272368%20-24.55121%2C26.876955%20-30.808%2C15.043%2014.39%2C18.767%2037.95042%2C27.34399%2055.10778%2C-30.198841%2011.36133%2C1.790591%205.86264%2C12.102137%2053.54008%2C10.392475%2017.44086%2C-28.297832%20-3.88341%2C-25.22842%20-8.04583%2C-6.14608%20-7.81639%2C-11.774337%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20287.85823%2C35.364384%20-25.4552%2C2.149366%20-52.90394%2C-0.483376%20-22.76023%2C-4.103666%20-22.10465%2C27.581183%20-27.96536%2C23.164828%2026.16665%2C19.985271%2044.06365%2C12.39057%2063.11402%2C-25.269503%2015.81637%2C5.043656%207.3782%2C4.886617%2011.63681%2C10.00475%2058.70878%2C-29.181835%20-20.49549%2C-28.650356%20-13.45286%2C-7.931538%20-15.71409%2C-6.235532%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20287.45214%2C30.491288%20-33.98313%2C-1.099365%20-43.15774%2C-0.889467%20-37.37952%2C-6.540214%20-10.328%2C26.769%20-29.99582%2C30.068381%2012.76564%2C13.081721%2040.18646%2C14.107986%2048.71709%2C-6.27626%2026.78084%2C-13.230457%2013.78261%2C4.296809%2021.06997%2C3.284917%2067.23669%2C0.462831%20L%20335.3421%2C45.166154%20316.61005%2C36.016342%20304.95688%2C33.02954%20Z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20270.80239%2C13.841542%20-67.28261%2C7.428553%20-11.07653%2C-4.138198%20-23.57241%2C-0.04275%20-32.66303%2C31.236005%20-21.4679%2C15.449092%2024.1362%2C15.112177%2088.10524%2C9.640987%2024.35161%2C-16.022459%2019.87728%2C4.637564%2023.52881%2C-3.825019%2023.50651%2C15.061567%2019.72401%2C-14.968641%2018.08319%2C-9.564061%20-34.9757%2C-39.200574%20-27.49074%2C-7.859898%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20272.02067%2C5.7197143%20-33.98313%2C3.3676396%20-39.50291%2C8.0445431%20-47.12572%2C-2.073209%20-10.328%2C26.769%20-28.37145%2C31.286655%2053.37477%2C20.797457%2039.37428%2C-2.135663%2028.00643%2C-20.895556%2019.0651%2C-7.139086%207.28515%2C7.139449%2020.66388%2C-5.649094%2057.4905%2C-6.440722%20-3.03356%2C-16.467614%20-14.67113%2C-31.078746%20-31.95775%2C-2.9868024%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20271.61457%2C13.43545%20-51.44505%2C11.083376%20-39.90901%2C3.98363%20-21.94805%2C1.175522%20-20.48028%2C55.601488%2046.75545%2C24.789194%2026.57274%2C-10.47158%2040.59256%2C-28.125512%2011.35668%2C7.530841%2020.28338%2C-5.920812%2015.81307%2C12.418637%2019.0395%2C-13.36483%208.75954%2C-4.410266%2020.11365%2C-3.066598%20-22.38687%2C-30.672655%20-21.39937%2C-15.981726%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20284.20341%2C17.496364%20-26.26739%2C4.585914%20-42.75165%2C14.135914%20-60.93282%2C6.048618%203.8852%2C13.367985%20-30.808%2C15.043%20-0.22929%2C31.761925%2051.96311%2C17.76282%2036.94044%2C-7.49455%2031.24785%2C-20.134007%2017.03134%2C-12.759026%2012.94814%2C6.127557%2015.257%2C-5.222452%2055.4436%2C-3.472689%20L%20332.04153%2C46.574717%20309.0178%2C22.065073%20Z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20M%20275.2624%2C5.4466528%20249.24415%2C13.579448%20209.3188%2C35.2899%20l%20-21.47661%2C-0.241714%20-29.57124%2C3.945615%20-17.83%2C32.04866%20-7.98587%2C25.47976%2024.73866%2C17.671789%2085.45494%2C-21.599791%2020.46541%2C-23.28297%2024.48978%2C17.175622%2024.1454%2C-6.643316%2014.36197%2C-17.49621%20-3.29845%2C-29.24724%20-17.2483%2C-9.953826%20-3.21686%2C-14.0673783%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20282.87019%2C1.8665136%20-12.14521%2C-0.3700347%20-27.39486%2C5.5998266%20-18.7915%2C16.7639465%20-32.25635%2C16.028583%20-41.54842%2C59.347219%2017.0751%2C12.949276%2046.66701%2C0.21861%2032.20037%2C-20.704758%2011.51507%2C-19.702829%207.93163%2C10.015345%2024.14541%2C2.754548%2030.02507%2C-22.866419%20-4.19349%2C-30.589792%2014.52544%2C-3.688583%20L%20299.215%2C6.3937965%20Z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20288.68792%2C7.6842397%20-21.54308%2C0.5249999%20-15.31189%2C7.3898954%20-19.68654%2C19.001534%20-25.54359%2C7.525753%20-28.57041%2C-0.620107%20-4.85325%2C70.231485%20c%2010.03629%2C3.80219%2049.42943%2C20.83085%2041.2968%2C14.53919%20l%2027.7252%2C-11.3069%2034.33846%2C-27.758146%2013.30183%2C3.750102%2012.06243%2C6.782204%2013.46694%2C-18.838762%2010.12707%2C-14.479167%202.44246%2C-24.274382%20-11.27217%2C-23.465243%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20268.10211%2C14.397%20-25.57073%2C21.558316%20-5.01899%2C7.389896%20-37.13972%2C5.576013%20-16.59324%2C29.901621%2010.36359%2C41.446524%2026.47298%2C9.81665%2032.79396%2C-17.23456%2036.22803%2C-6.3842%203.45976%2C-10.30497%2022.25219%2C-5.200244%2014.30002%2C-19.173803%207.20169%2C-23.761454%20-3.29845%2C-26.114618%20-25.30362%2C-7.268722%20-23.35513%2C-1.984409%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20332.99214%2C17.529623%20-43.91894%2C5.000172%20-21.57715%2C19.472866%20-48.77517%2C-2.031783%204.8876%2C41.537073%20-27.22786%2C16.83307%2043.92614%2C26.374799%2020.711%2C-1.12394%2025.48762%2C-12.64945%203.01224%2C-12.095035%2010.16921%2C7.777755%2022.35534%2C-10.670969%2025.10238%2C2.194552%2026.68521%2C-29.247237%20-0.69016%2C-22.931831%20-9.92961%2C-11.829792%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20331.31%2C7.3249%20-6.775%2C0.525%20-30.975%2C10.075%20-57.278%2C-2.4793%20-10.328%2C26.769%20-30.808%2C15.043%2014.39%2C18.767%2033.689%2C23.042%2048.311%2C-13.992%209.725%2C-11.2%209.7217%2C14.043%2052.339%2C4.0971%2015.257%2C-12.126%208.337%2C-35.96%20-6.9554%2C-14.429%20-19.775%2C-17.2%20z%22%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20repeatCount%3D%22indefinite%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fpath%3E%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%20%20%20%20%3Cg%20id%3D%22tail%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20fill%3D%22%23000%22%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20d%3D%22m%20482.15%2C51.699%20-36.72%2C-0.528%20-59.17%2C-7.66%20-11.62%2C-10.83%20-6.2434%2C51.773%2037.677%2C-16.113%2046.226%2C12.151%20z%22%3E%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Canimate%20attributeName%3D%22d%22%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20begin%3D%22G.click%22%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20end%3D%22S.click%22%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20dur%3D%221s%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20values%3D%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20482.15%2C51.699%20-36.72%2C-0.528%20-59.17%2C-7.66%20-11.62%2C-10.83%20-6.2434%2C51.773%2037.677%2C-16.113%2046.226%2C12.151%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20479.1405%2C60.390516%20-28.73708%2C-12.409509%20-45.28037%2C-1.066902%20-33.89191%2C-7.508711%20-1.07397%2C23.757588%2038.26775%2C11.070631%2041.14493%2C1.156707%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20436.66777%2C79.332393%20-26.16163%2C-22.050843%20-68.10401%2C-4.411269%20-16.89919%2C-8.393452%2025.43173%2C37.965893%2039.70745%2C3.379387%2028.35799%2C-3.280473%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20435.04341%2C71.616657%20-37.93828%2C-12.30465%20-36.02279%2C-2.380812%20-49.3865%2C-21.794467%20-7.05558%2C55.021731%2058.79375%2C-5.554624%2038.10417%2C1.592624%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20404.99264%2C44.002444%20-36.3139%2C-4.182823%20-18.56087%2C-10.096548%20-43.70122%2C-9.205635%2031.11701%2C43.651173%2074.63132%2C1.755021%208.86559%2C-11.808392%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20M%20412.70838%2C33.444068%20382.48584%2C18.70287%20354.58487%2C15.915966%20308.44711%2C9.5529712%20l%20-0.15203%2C31.0623398%2047.0171%2C5.003752%2032.82499%2C-3.280473%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20417.17539%2C35.880616%20-35.90782%2C-15.14729%20-29.52533%2C-6.441725%20-54.2596%2C4.195381%2025.43173%2C24.158786%2064.47903%2C4.191569%2024.29707%2C-1.250016%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20421.64239%2C36.286707%20-27.3799%2C-13.929016%20-35.21061%2C-7.253908%20-56.69614%2C7.444112%20-7.05558%2C24.158786%2062.85466%2C0.536747%2047.03819%2C-0.03174%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20M%20410.43929%2C30.129989%20380.43206%2C16.623986%20343.63792%2C6.7263986%20285.0286%2C9.769437%20l%2016.57998%2C21.789336%2061.39542%2C12.975629%2030.11538%2C-4.85466%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20M%20399.25136%2C48.4782%20364.76894%2C10.806259%20332.44999%2C4.9363288%20291.29384%2C6.1892976%20328.90714%2C32.006291%20367.47918%2C48.11454%20384.16903%2C46.840019%20Z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20M%20410.43928%2C45.793096%20398.33274%2C26.02185%20361.53861%2C12.544124%20l%20-51.89657%2C2.148004%204.94454%2C26.712027%2059.60535%2C2.235212%2026.53523%2C1.410583%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20415.36198%2C26.997367%20-44.3278%2C-10.373382%20-28.2913%2C4.870486%20-27.73062%2C-0.5371%2015.68495%2C30.292166%2046.17983%2C0.89266%2045.77848%2C-12.014938%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20471.30165%2C43.55551%20-44.3278%2C-0.975517%20-21.57854%2C5.765521%20-56.81925%2C-5.012275%2030.0055%2C32.977271%2040.80963%2C2.235212%2029.66786%2C-16.042594%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20482.15%2C51.699%20-36.72%2C-0.528%20-59.17%2C-7.66%20-11.62%2C-10.83%20-6.2434%2C51.773%2037.677%2C-16.113%2046.226%2C12.151%20z%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20repeatCount%3D%22indefinite%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fpath%3E%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%20%20%20%20%3Cg%20id%3D%22front1%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20fill%3D%22%23000%22%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20d%3D%22m%20247.06%2C84.186%2014.528%2C34.603%2026.415%2C11.358%2017.698%2C-8.4527%20-1.3207%2C-5.8112%20-32.754%2C-4.2263%2013.471%2C-35.396%20z%22%3E%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Canimate%20attributeName%3D%22d%22%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20begin%3D%22G.click%22%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20end%3D%22S.click%22%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20dur%3D%221s%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20values%3D%22m%20247.06%2C84.186%2014.528%2C34.603%2026.415%2C11.358%2017.698%2C-8.4527%20-1.3207%2C-5.8112%20-32.754%2C-4.2263%2013.471%2C-35.396%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20211.87039%2C62.579002%20-8.63059%2C70.271158%2028.39929%2C15.38096%208.0314%2C-5.30569%20-2.8005%2C-6.75469%20-16.25204%2C-5.55787%2050.73636%2C-55.405783%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20189.55822%2C56.281662%20-39.64535%2C49.106318%2015.45053%2C23.13465%2018.51019%2C3.73005%20-1.72679%2C-13.12085%20-15.69817%2C-9.50549%20111.33185%2C-34.821931%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20221.3784%2C37.673989%20-65.78025%2C32.790137%205.70434%2C24.759016%2015.26145%2C13.882328%208.0194%2C-5.8112%20-10.01288%2C-22.906506%2098.39372%2C-8.777687%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20149.59807%2C67.555434%20-52.477072%2C16.328889%20-31.249975%2C23.540737%203.07871%2C8.19705%2017.765595%2C-4.18683%2022.474432%2C-17.221227%20111.33902%2C-16.715799%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20121.17168%2C63.49452%20-50.040532%2C8.207058%20-19.879417%2C15.418914%204.296985%2C8.603138%2018.577777%2C-4.592926%2025.317067%2C-8.693305%2089.41009%2C6.431414%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20165.43563%2C63.881431%20-80.091288%2C17.953254%20-26.78297%2C1.611807%20-5.043118%2C6.166589%2021.014326%2C9.214181%2046.02773%2C-6.256757%2047.17658%2C-2.502598%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20132.94832%2C81.749452%20-13.4923%2C13.892339%20-27.595156%2C7.703179%20-26.972051%2C-0.33087%204.364579%2C11.24463%2029.377982%2C4.70772%2084.943086%2C-21.182807%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20161.47624%2C104.23611%20-36.04146%2C40.42072%20-22.81191%2C8.22538%20-7.810487%2C9.448%2039.850897%2C0.007%2018.7105%2C-19.44189%2073.88585%2C-43.898829%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20166.84646%2C111.39638%2017.2131%2C18.04487%20-25.49701%2C32.39131%2032.01855%2C-1.29242%2011.6573%2C-32.66224%2017.36795%2C-18.99438%200.493%2C-25.998137%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20202.64785%2C123.03183%2025.71593%2C10.43707%208.51431%2C21.20338%20-6.46794%2C9.89551%2019.2651%2C-2.23106%200.36228%2C-11.38658%20-9.7999%2C-46.13642%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20217.41592%2C129.29708%2018.10814%2C-3.88349%2022.83486%2C11.358%2060.65966%2C-12.03285%208.07717%2C-15.20906%20-61.84264%2C15.91198%20-23.22542%2C-25.550617%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20242.47689%2C124.8219%2019.00318%2C-2.09342%2012.09444%2C-4.3051%2051.26181%2C24.66358%206.28708%2C-17.44665%20-29.62136%2C-4.2263%20-49.18144%2C-28.235727%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20247.06%2C84.186%2014.528%2C34.603%2026.415%2C11.358%2017.698%2C-8.4527%20-1.3207%2C-5.8112%20-32.754%2C-4.2263%2013.471%2C-35.396%20z%22%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20repeatCount%3D%22indefinite%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fpath%3E%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%3Cg%20id%3D%22front2%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20fill%3D%22%23000%22%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20d%3D%22m%20259.21%2C88.676%2031.698%2C25.886%2013.736%2C6.8678%2018.49%2C1.849%2017.298%2C-5.9402%200.92774%2C-9.6444%20-18.733%2C3.6266%20-18.775%2C-7.3246%20-16.641%2C-25.094%20z%22%3E%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Canimate%20attributeName%3D%22d%22%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20begin%3D%22G.click%22%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20end%3D%22S.click%22%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20dur%3D%221s%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20values%3D%22m%20259.21%2C88.676%2031.698%2C25.886%2013.736%2C6.8678%2018.49%2C1.849%2017.298%2C-5.9402%200.92774%2C-9.6444%20-18.733%2C3.6266%20-18.775%2C-7.3246%20-16.641%2C-25.094%20z%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20207.60252%2C92.517975%2046.35116%2C37.494675%2012.11163%2C8.08607%2020.11437%2C3.06728%2012.83099%2C-8.37675%20-11.255%2C-5.58349%20-13.04772%2C2.40833%20-10.65317%2C-9.35506%20-40.43003%2C-64.146519%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20174.04438%2C74.115888%2033.2088%2C52.628852%2020.23346%2C6.8678%2011.58644%2C-2.618%20-1.3822%2C-6.3463%20-7.60018%2C-3.95912%20-10.61117%2C-0.43431%200.71739%2C-19.91343%2094.56407%2C-40.706803%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20167.01152%2C38.40037%2030.08937%2C48.141325%20-11.44166%2C6.461709%2014.02299%2C20.123116%2015.67364%2C0.96335%209.45565%2C-5.1774%20-4.11371%2C-6.52568%20-12.68363%2C-4.075869%2081.86645%2C-65.698359%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20141.8496%2C64.329699%20-51.956826%2C39.287011%2011.705546%2C12.14699%208.33771%2C1.44291%202.27262%2C-14.06203%206.61302%2C-3.959117%2032.84061%2C-1.246497%2031.98642%2C-4.888051%2043.86661%2C-4.789434%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20133.72777%2C72.045435%20-25.96698%2C24.261635%20-33.776689%2C14.17745%20-19.276498%2C4.69163%20-0.976112%2C7.86691%2015.547029%2C5.78707%2022.282229%2C-5.30741%2056.351901%2C-21.94389%2038.18134%2C-21.439176%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20154.03233%2C86.239452%204.48988%2C12.078893%20-16.31476%2C14.989625%20-14.80949%2C20.12311%20-23.71723%2C11.52174%2035.85159%2C0.91397%2018.22132%2C-21.14498%2025.48896%2C-11.7916%2022.74986%2C-46.616843%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20161.34198%2C96.797828%2014.64216%2C12.891082%20-21.59395%2C25.95409%20-22.11914%2C11.1891%2040.03912%2C-0.66102%205.39474%2C-7.61394%2014.97259%2C-17.89624%2025.08287%2C-26.004802%20-30.04202%2C-6.413796%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20169.59859%2C93.510515%2031.698%2C25.886005%208.81331%2C27.4536%20-9.7036%2C14.37949%2024.9058%2C-0.12248%203.61284%2C-10.53943%20-3.96492%2C-22.32941%2021.50156%2C-42.678473%20-30.06652%2C4.442139%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20196.89715%2C97.985689%2040.64835%2C23.648411%2029.39911%2C31.92877%20-7.46601%2C11.24687%2023.56324%2C-2.36006%20-2.20488%2C-17.2522%20-22.31314%2C-22.3294%20-8.4821%2C-20.30261%20-11.71831%2C-28.226621%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20225.98578%2C109.17362%2047.36111%2C17.38317%2024.0289%2C13.58056%2024.75524%2C-5.75879%202.97745%2C-7.73027%20-10.70772%2C-4.72171%20-18.28548%2C3.6266%20-16.98493%2C-12.69481%20-22.45872%2C-27.331588%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20232.25102%2C105.14597%2015.58738%2C24.99096%2025.81896%2C27.90112%20-1.64828%2C7.21918%2019.08807%2C-1.91254%20-8.47013%2C-15.46213%203.19535%2C-6.6663%20-35.78065%2C-35.07068%2014.68521%2C-29.569175%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20251.94179%2C100.22328%2020.51006%2C18.2782%2019.55372%2C21.63587%2045.78857%2C17.95963%208.79517%2C-7.73027%20-9.36516%2C-5.16923%20-24.99825%2C-10.69396%20-10.71968%2C-14.93239%20-18.43107%2C-28.674139%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20259.21%2C88.676%2031.698%2C25.886%2013.736%2C6.8678%2018.49%2C1.849%2017.298%2C-5.9402%200.92774%2C-9.6444%20-18.733%2C3.6266%20-18.775%2C-7.3246%20-16.641%2C-25.094%20z%22%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20repeatCount%3D%22indefinite%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fpath%3E%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%20%20%20%20%3Cg%20id%3D%22back1%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20fill%3D%22%23000%22%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20d%3D%22m%20311.78%2C88.676%20-6.5056%2C16.008%20-13.57%2C9.8787%20-20.603%2C8.4527%2024.2%2C0.36581%2027.573%2C-12.517%2013.873%2C-9.1113%2020.73%2C-19.152%20-56.263%2C-8.4527%20z%22%3E%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Canimate%20attributeName%3D%22d%22%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20begin%3D%22G.click%22%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20end%3D%22S.click%22%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20dur%3D%221s%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20values%3D%22m%20311.78%2C88.676%20-6.5056%2C16.008%20-13.57%2C9.8787%20-20.603%2C8.4527%2024.2%2C0.36581%2027.573%2C-12.517%2013.873%2C-9.1113%2020.73%2C-19.152%20-56.263%2C-8.4527%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20316.47585%2C120.43545%20-8.57969%2C20.89077%20-22.42221%2C11.24602%20-5.55254%2C10.62798%2014.80391%2C0.25996%2029.09775%2C-15.39118%207.64282%2C-16.63367%2012.7842%2C-77.493474%20-100.03534%2C13.981629%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20319.08964%2C108.16839%2039.78882%2C19.25673%201.45538%2C15.97007%20-24.25782%2C5.20397%2042.47411%2C1.17799%20-7.35086%2C-36.47639%20-13.74121%2C-8.70521%20-17.71697%2C-42.03818%20-54.23254%2C-2.749288%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20370.25716%2C94.767371%2048.72283%2C12.759269%2025.82086%2C25.31017%2014.72695%2C-0.0752%20-3.82031%2C-11.81693%20L%20426.4277%2C90.559641%20414.31085%2C87.945803%20400.11699%2C67.169438%20323.54943%2C57.904555%20Z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20308.53128%2C83.009902%2013.79896%2C8.292264%2022.97823%2C5.411695%2023.66096%2C-4.136133%2016.48426%2C2.396267%2027.97909%2C0.884016%20-23.08131%2C-9.1113%20-39.77762%2C-13.872814%20-64.38482%2C-7.234426%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20332.49067%2C81.385537%2019.48424%2C-4.296569%2032.72442%2C13.939614%2015.94523%2C-1.699585%20-0.57158%2C-7.756017%20-11.81786%2C-2.770807%20-2.37066%2C-7.486935%20L%20334.73629%2C47.29014%20257.76263%2C59.5481%20Z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20304.47036%2C72.432345%2044.25582%2C7.07399%209.17111%2C-4.334499%2021.63051%2C9.670974%2013.64162%2C0.771902%204.0197%2C-6.831721%20-10.49248%2C-10.735665%20-52.77254%2C-16.309361%20-53.01427%2C3.730042%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20313.40437%2C83.396812%2038.97663%2C-0.235655%2017.69904%2C9.472609%2015.53913%2C6.422243%203.08325%2C-7.756018%20-5.3204%2C-8.862177%20-11.71076%2C-2.613838%20-1.19894%2C-15.903269%20-90.78076%2C-13.325797%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20292.42882%2C89.035342%2022.58303%2C0.344892%2014.17607%2C11.668766%2016.09343%2C6.66263%206.2993%2C-3.21433%20-1.51563%2C-10.726926%20-21.03335%2C-8.216264%20-8.35863%2C-28.549868%20-43.285%2C22.873516%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20291.32521%2C85.432029%2016.07884%2C28.114141%209.25339%2C6.74608%2011.17073%2C-1.39268%201.82413%2C-9.92709%20-9.57094%2C-8.93686%20-2.23763%2C-28.354549%20-27.92631%2C-40.440236%20-51.38305%2C32.907894%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20290.63875%2C103.80341%20-9.19071%2C9.74276%20-6.40972%2C11.66877%20-3.59734%2C15.16546%208.08938%2C8.86864%206.09217%2C-13.41203%2011.18789%2C-18.95669%2022.61277%2C-76.40024%20-96.08124%2C42.603425%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20272.73805%2C119.46652%20-22.16871%2C14.21793%20-9.09482%2C9.8787%20-0.46472%2C10.24277%209.43193%2C2.6034%2011.46237%2C-12.06949%2037.59142%2C-26.56447%20-20.88911%2C-29.89242%20-30.30699%2C14.8182%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20299.58909%2C104.25093%204.23482%2C9.29524%20-23.41538%2C13.45884%20-10.75762%2C7.11015%209.43193%2C6.63106%2028.91555%2C-5.80424%2017.00562%2C-8.66379%208.64703%2C-54.953396%20-54.47293%2C21.08345%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20311.78%2C88.676%20-6.5056%2C16.008%20-13.57%2C9.8787%20-20.603%2C8.4527%2024.2%2C0.36581%2027.573%2C-12.517%2013.873%2C-9.1113%2020.73%2C-19.152%20-56.263%2C-8.4527%20z%22%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20repeatCount%3D%22indefinite%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fpath%3E%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%20%20%20%20%3Cg%20id%3D%22back2%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20fill%3D%22%23000%22%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20d%3D%22m%20313.62%2C71.774%2049.826%2C19.562%20-1.4868%2C34.06%20-7.228%2C16.313%20-8.4502%2C8.1296%20-23.401%2C0.16815%2021.91%2C-14.837%202.2412%2C-17.162%20z%22%3E%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Canimate%20attributeName%3D%22d%22%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20begin%3D%22G.click%22%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20end%3D%22S.click%22%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20dur%3D%221s%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20values%3D%22m%20313.62%2C71.774%2049.826%2C19.562%20-1.4868%2C34.06%20-7.228%2C16.313%20-8.4502%2C8.1296%20-23.401%2C0.16815%2021.91%2C-14.837%202.2412%2C-17.162%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20296.29469%2C88.367547%2068.45563%2C-9.996133%20-1.11514%2C33.320536%2017.84775%2C21.14162%206.59756%2C28.42213%20-29.68192%2C0.71984%2017.17868%2C-11.56515%20-8.54158%2C-12.21923%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20296.41909%2C74.287859%2054.95775%2C-22.893877%2022.7651%2C32.174606%2023.22885%2C5.754624%2022.81885%2C15.439268%2014.36549%2C14.38136%20-7.73464%2C4.65537%20-29.7107%2C-19.08126%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20332.3002%2C64.870447%2072.16103%2C1.693979%2021.25432%2C1.978781%2022.41667%2C13.064269%2014.29091%2C2.444321%206.64977%2C10.320434%20-8.54686%2C3.437112%20-25.37301%2C-9.852355%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20389.153%2C97.783028%20-71.59532%2C-8.864394%2034.24924%2C-30.50853%2018.76185%2C16.313%2021.60056%2C1.632138%2012.33504%2C10.726526%2030.03183%2C4.249295%20-3.03799%2C15.325307%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20298.59463%2C53.112976%2034.39452%2C-15.361856%209.07158%2C14.161522%2030.5385%2C0.06934%2020.78838%2C11.378331%2026.14214%2C6.259521%201.19934%2C9.934574%20-10.34763%2C0.299929%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20300.62508%2C62.433898%2050.63818%2C-14.549675%2021.66041%2C-0.457768%2024.04103%2C15.500818%2030.53458%2C6.099143%202.58884%2C8.289977%20-13.82604%2C4.655387%20-37.14966%2C-13.507178%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20291.69106%2C51.469432%2054.29301%2C3.318344%2038.31016%2C-0.863859%2019.98012%2C17.531275%2011.44828%2C3.256503%2012.33504%2C6.665612%20-5.29813%2C10.340666%20-31.87047%2C-12.694995%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20320.22483%2C82.426239%20-7.90374%2C-20.267043%2032.97204%2C-4.874011%2019.17552%2C17.655552%2017.50581%2C0.521805%205.68762%2C14.488706%20-13.89138%2C2.616177%20-29.98005%2C-15.371931%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20254.82497%2C67.820386%2027.00622%2C-27.960332%2059.88179%2C22.795339%209.77766%2C28.843486%2016.61078%2C11.709741%20-7.7379%2C10.01353%20-16.57649%2C-6.78169%20-7.60418%2C-19.399584%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20255.38836%2C72.422239%2044.83018%2C-36.327723%2026.27885%2C59.22964%20-10.36062%2C23.920794%20-12.92538%2C31.84802%20-6.39534%2C-1.62192%20-4.046%2C-11.25686%2012.98161%2C-25.21731%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20256.54552%2C60.925834%2070.04617%2C-11.714266%20-9.04464%2C52.377842%20-3.64786%2C11.83782%20-38.43387%2C38.56078%20-8.63293%2C-10.57227%2026.38518%2C-31.39514%204.47878%2C-9.5542%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20293.37379%2C71.685823%2048.93096%2C5.241447%20-42.21088%2C67.6238%20-23.78614%2C13.6279%20-17.40055%2C-2.1633%202.55501%2C-7.43965%2016.09227%2C-6.78169%2024.61707%2C-23.42724%20z%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20m%20313.62%2C71.774%2049.826%2C19.562%20-1.4868%2C34.06%20-7.228%2C16.313%20-8.4502%2C8.1296%20-23.401%2C0.16815%2021.91%2C-14.837%202.2412%2C-17.162%20z%22%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20repeatCount%3D%22indefinite%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fpath%3E%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C%2Fsvg%3E&j=%2F*%20no%20javascript%20content%20*%2F&c=%2F*%20no%20css%20content%20*%2F&l=#preview',
                'Some widgets': 'test_widget',
                'Watch VAT. save calculator': 'rolex',
                'Wcave game': 'wcave.jmvc',
                'Canvas based Image filter': 'demo/img',
                'Streetview panorama animator': '?map=true',
                'Some flag fun': 'demo/flag',
                'JMVC Logo plotted': 'demo/logo',
                'Google logo plot': 'google',
                'Observer': 'demo/observer.jmvc',
                'Sheduler': 'demo/scheduler.jmvc',
                'Effects': 'demo/fx.jmvc',
                'audiometer': 'console/index?fullscreen=true&h=%3Ccanvas%20id%3D%22vol%22%3E%3C%2Fcanvas%3E&j=%2F*%20no%20javascript%20content%20*%2F%0A(function()%20%7B%0A%20%20%20%20var%20active%20%3D%20false%2C%0A%20%20%20%20%20%20%20%20color%20%3D%20function%20()%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20return%20active%20%3F%20%22%23DB2080%22%20%3A%20%22%23555%22%3B%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20to%2C%0A%20%20%20%20%20%20%20%20cnv%20%3D%20document.getElementById(%27vol%27)%2C%0A%20%20%20%20%20%20%20%20ctx%20%3D%20cnv.getContext(%272d%27)%2C%0A%20%20%20%20%20%20%20%20size%20%3D%2020%2C%0A%20%20%20%20%20%20%20%20width%20%3D%20size%2C%0A%20%20%20%20%20%20%20%20height%20%3D%20size%2C%0A%20%20%20%20%20%20%20%20mrg%20%3D%202%2C%0A%20%20%20%20%20%20%20%20draw%20%3D%20function%20()%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20ctx.fillStyle%20%3D%20active%20%3F%20%27%23fff%27%20%3A%20%27transparent%27%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20ctx.clearRect(0%2C%200%2C%20width%2C%20height)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20ctx.fillStyle%20%3D%20active%20%3F%20%27%23DB2080%27%20%3A%20%27%23555%27%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20var%20h1%20%3D%20active%20%3F%20height%2F5%20%2B%20~~(Math.random()%20*%204%2F5*height)%20%3A%20~~(1%2F3%20*%20height)%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20h2%20%3D%20active%20%3F%20height%2F5%20%2B%20~~(Math.random()%20*%204%2F5*height)%20%3A%20~~height%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20h3%20%3D%20active%20%3F%20height%2F5%20%2B%20~~(Math.random()%20*%204%2F5*height)%20%3A%20~~(2%2F3%20*%20height)%3B%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20ctx.fillRect(mrg%2C%20%20%20%20%20%20%20%20%20%20%20height%20-%20h1%2C%20width%20%2F%203%20-mrg%2C%20h1)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20ctx.fillRect(~~(width%20%2F%203)%20%2B%20mrg%2C%20%20%20height%20-%20h2%2C%20width%20%2F%203%20-%20mrg%2C%20h2)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20ctx.fillRect(~~(2%20*%20width%20%2F%203)%20%2B%20mrg%2C%20height-%20h3%2C%20width%2F3%20-%20mrg%2C%20h3)%3B%0A%20%20%20%20%20%20%20%20%7D%3B%0A%20%20%20%20cnv.width%20%3D%20width%3B%0A%20%20%20%20cnv.height%20%3D%20height%3B%0A%20%20%20%20cnv.title%3D%22sound%20on%22%3B%0A%20%20%20%20draw()%3B%0A%20%20%20%20JMVC.events.on(cnv%2C%20%27click%27%2C%20function%20()%20%7B%0A%20%20%20%20%20%20%20%20active%20%3D%20!active%3B%0A%20%20%20%20%20%20%20%20if%20(active)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20to%20%3D%20setInterval(draw%2C%20100)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20cnv.title%3D%22sound%20off%22%3B%0A%20%20%20%20%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20clearInterval(to)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20cnv.title%3D%22sound%20on%22%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20draw()%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D)%3B%0A%7D)()%3B%0A&c=body%7B%0A%09background-color%3A%23aaa%0A%7D%0A%0A%23vol%20%7B%0A%09background-color%3Atransparent%3B%0A%09cursor%3Apointer%3B%0A%09position%3Arelative%3B%0A%09top%3A50px%3B%0A%09left%3A50px%3B%0A%09border%3A1px%20solid%20%23ddd%0A%7D%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A&l=#preview',
                // Key: 'test_key',
                // Grind: 'grind',
                'canvas ext using 2d lib': 'test_canvas',
                'deviceLight API (FF only)': 'console/index?fullscreen=true&h=%3Ch3%3ELight%3A%20%3Cspan%20id%3D%22l%22%3E%3C%2Fspan%3E%3C%2Fh3%3E&j=window.addEventListener(%27devicelight%27%2C%20function(e)%20%7B%0A%09document.getElementById(%27l%27).innerHTML%20%3D%20e.value%3B%0A%7D)&c=body%7Bbackground-color%3Ablack%3B%20padding%3A50px%7D%0Ah3%7Bcolor%3A%20white%7D%0Aspan%7Bcolor%3Ared%7D&l=#preview',
                'Orientation API': 'demo/orientation',
                'direct&crypt_image': 'demo/direct',
                'Tabs': 'tabs/index/i_say/Hello%20my%20Guest',
                'modal': 'test_modal',
                'cubic': 'cubic',
                'neverending carpet': 'carpet',
                'Widgzard': 'widgzard',
                'Auto submit file': 'test/upload',
                'Trial drawer': 'demo/drawer.jmvc',
                'tumblr loader': 'console/index?fullscreen=true&h=%3Cp%3Ecopied%20from%20%3Ca%20href%3D%22http%3A%2F%2Fcodepen.io%2FAllThingsSmitty%2Fpen%2FdodrNr%22%20target%3D%22_blank%22%3EAllThingsSmitty%3C%2Fa%3E%3C%2Fp%3E%0A%3Cdiv%20class%3D%22container%22%3E%0A%20%20%3Cspan%3E%3C%2Fspan%3E%0A%20%20%3Cspan%3E%3C%2Fspan%3E%0A%20%20%3Cspan%3E%3C%2Fspan%3E%0A%3C%2Fdiv%3E&j=%2F%2F%20no%20way&c=body%20%7B%0A%20%20background%3A%20%2336465d%3B%0A%7D%0A.container%20%7B%0A%20%20left%3A%2046%25%3B%0A%20%20position%3A%20absolute%3B%0A%20%20top%3A%2050%25%3B%0A%7D%0A.container%20span%20%7B%0A%20%20-webkit-animation%3A%20loader%20.75s%20infinite%20ease-in-out%3B%0A%20%20animation%3A%20loader%20.75s%20infinite%20ease-in-out%3B%0A%20%20background%3A%20%23b0b7c1%3B%0A%20%20border-radius%3A%2010px%3B%0A%20%20bottom%3A%20-10px%3B%0A%20%20display%3A%20block%3B%0A%20%20height%3A%2030px%3B%0A%20%20position%3A%20absolute%3B%0A%20%20width%3A%2030px%3B%0A%7D%0A.container%20span%3Anth-child(2)%20%7B%0A%20%20-webkit-animation-delay%3A%20.25s%3B%0A%20%20animation-delay%3A%20.25s%3B%0A%20%20left%3A%2042px%3B%0A%7D%0A.container%20span%3Anth-child(3)%20%7B%0A%20%20-webkit-animation-delay%3A%20.5s%3B%0A%20%20animation-delay%3A%20.5s%3B%0A%20%20left%3A%2084px%3B%0A%7D%0A%40-webkit-keyframes%20loader%20%7B%0A%20%200%25%2C%20100%25%20%7B%0A%20%20%20%20background%3A%20%23b0b7c1%3B%0A%20%20%20%20height%3A%2030px%3B%0A%20%20%20%20-webkit-transform%3A%20translateY(0)%3B%0A%20%20%20%20transform%3A%20translateY(0)%3B%0A%20%20%7D%0A%20%2050%25%20%7B%0A%20%20%20%20background%3A%20%23e8e9ed%3B%0A%20%20%20%20height%3A%2040px%3B%0A%20%20%20%20-webkit-transform%3A%20translateY(5px)%3B%0A%20%20%20%20transform%3A%20translateY(5px)%3B%0A%20%20%7D%0A%7D%0A%40keyframes%20loader%20%7B%0A%20%200%25%2C%20100%25%20%7B%0A%20%20%20%20background%3A%20%23b0b7c1%3B%0A%20%20%20%20height%3A%2030px%3B%0A%20%20%20%20-webkit-transform%3A%20translateY(0)%3B%0A%20%20%20%20transform%3A%20translateY(0)%3B%0A%20%20%7D%0A%20%2050%25%20%7B%0A%20%20%20%20background%3A%20%23e8e9ed%3B%0A%20%20%20%20height%3A%2040px%3B%0A%20%20%20%20-webkit-transform%3A%20translateY(5px)%3B%0A%20%20%20%20transform%3A%20translateY(5px)%3B%0A%20%20%7D%0A%7D&l=#preview',
                'css sprite': 'console/index?fullscreen=true&h=%3Cdiv%20class%3D%22hi%22%3E%3C%2Fdiv%3E&j=%2F*%20no%20javascript%20content%20*%2F&c=.hi%20%7B%0A%20%20%20%20width%3A%2050px%3B%0A%20%20%20%20height%3A%2072px%3B%0A%20%20%20%20background-image%3A%20url(%22http%3A%2F%2Fs.cdpn.io%2F79%2Fsprite-steps.png%22)%3B%0A%20%20%20%20%0A%20%20%20%20-webkit-animation%3A%20play%20.8s%20steps(10)%20infinite%3B%0A%20%20%20%20%20%20%20-moz-animation%3A%20play%20.8s%20steps(10)%20infinite%3B%0A%20%20%20%20%20%20%20%20-ms-animation%3A%20play%20.8s%20steps(10)%20infinite%3B%0A%20%20%20%20%20%20%20%20%20-o-animation%3A%20play%20.8s%20steps(10)%20infinite%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20animation%3A%20play%20.8s%20steps(10)%20infinite%3B%0A%7D%0A%0A%40-webkit-keyframes%20play%20%7B%0A%20%20%20from%20%7B%20background-position%3A%20%20%20%200px%3B%20%7D%0A%20%20%20%20%20to%20%7B%20background-position%3A%20-500px%3B%20%7D%0A%7D%0A%0A%40-moz-keyframes%20play%20%7B%0A%20%20%20from%20%7B%20background-position%3A%20%20%20%200px%3B%20%7D%0A%20%20%20%20%20to%20%7B%20background-position%3A%20-500px%3B%20%7D%0A%7D%0A%0A%40-ms-keyframes%20play%20%7B%0A%20%20%20from%20%7B%20background-position%3A%20%20%20%200px%3B%20%7D%0A%20%20%20%20%20to%20%7B%20background-position%3A%20-500px%3B%20%7D%0A%7D%0A%0A%40-o-keyframes%20play%20%7B%0A%20%20%20from%20%7B%20background-position%3A%20%20%20%200px%3B%20%7D%0A%20%20%20%20%20to%20%7B%20background-position%3A%20-500px%3B%20%7D%0A%7D%0A%0A%40keyframes%20play%20%7B%0A%20%20%20from%20%7B%20background-position%3A%20%20%20%200px%3B%20%7D%0A%20%20%20%20%20to%20%7B%20background-position%3A%20-500px%3B%20%7D%0A%7D%0A&l=#preview',
                'Css logo attempt': 'console/index?fullscreen=true&h=%3Cdiv%20class%3D%22logo%22%3E%0A%09%3Cdiv%20class%3D%22o1%22%3E%0A%09%09%3Cdiv%20class%3D%22ell%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22cil%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22arr%22%3E%3C%2Fdiv%3E%0A%09%3C%2Fdiv%3E%0A%09%3Cdiv%20class%3D%22o2%22%3E%0A%09%09%3Cdiv%20class%3D%22ell%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22cil%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22arr%22%3E%3C%2Fdiv%3E%0A%09%3C%2Fdiv%3E%0A%09%3Cdiv%20class%3D%22o3%22%3E%0A%09%09%3Cdiv%20class%3D%22ell%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22cil%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22arr%22%3E%3C%2Fdiv%3E%0A%09%3C%2Fdiv%3E%0A%09%3Cdiv%20class%3D%22o4%22%3E%0A%09%09%3Cdiv%20class%3D%22ell%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22cil%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22arr%22%3E%3C%2Fdiv%3E%0A%09%3C%2Fdiv%3E%0A%09%3Cdiv%20class%3D%22o5%22%3E%0A%09%09%3Cdiv%20class%3D%22ell%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22cil%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22arr%22%3E%3C%2Fdiv%3E%0A%09%3C%2Fdiv%3E%0A%09%3Cdiv%20class%3D%22o6%22%3E%0A%09%09%3Cdiv%20class%3D%22ell%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22cil%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22arr%22%3E%3C%2Fdiv%3E%0A%09%3C%2Fdiv%3E%0A%3C%2Fdiv%3E&j=%2F*%20no%20javascript%20content%20*%2F&c=body%7B%0A%09margin-top%3A10px%3B%0A%7D%0A.logo%7B%0A%09position%3Arelative%3B%0A%09width%3A%20500px%3B%0A%09height%3A538px%3B%0A%09text-align%3Acenter%3B%0A%09margin%3A0%20auto%3B%0A%7D%0A.o1%2C%20.o2%2C%20.o3%2C%20.o4%2C%20.o5%2C%20.o6%7B%0A%09position%3Aabsolute%3B%0A%7D%0A.o1%7B%0A%09left%3A200px%3B%0A%7D%0A.o2%7B%0A%09left%3A327px%3B%0A%09top%3A74px%3B%0A%20%09-webkit-transform%3A%20rotate(60deg)%3B%0A%09-moz-transform%3A%20rotate(60deg)%3B%0A%09-ms-transform%3A%20rotate(60deg)%3B%0A%09-o-transform%3A%20rotate(60deg)%3B%0A%7D%0A.o3%7B%0A%09left%3A327px%3B%0A%09top%3A221px%3B%0A%20%09-webkit-transform%3A%20rotate(120deg)%3B%0A%09-moz-transform%3A%20rotate(120deg)%3B%0A%09-ms-transform%3A%20rotate(120deg)%3B%0A%09-o-transform%3A%20rotate(120deg)%3B%0A%7D%0A%0A.o4%7B%0A%09left%3A200px%3B%0A%09top%3A293px%3B%0A%20%09-webkit-transform%3A%20rotate(180deg)%3B%0A%09-moz-transform%3A%20rotate(180deg)%3B%0A%09-ms-transform%3A%20rotate(180deg)%3B%0A%09-o-transform%3A%20rotate(180deg)%3B%0A%7D%0A%0A.o5%7B%0A%09left%3A73px%3B%0A%09top%3A217px%3B%0A%20%09-webkit-transform%3A%20rotate(240deg)%3B%0A%09-moz-transform%3A%20rotate(240deg)%3B%0A%09-ms-transform%3A%20rotate(240deg)%3B%0A%09-o-transform%3A%20rotate(240deg)%3B%0A%7D%0A%0A.o6%7B%0A%09left%3A73px%3B%0A%09top%3A72px%3B%0A%20%09-webkit-transform%3A%20rotate(300deg)%3B%0A%09-moz-transform%3A%20rotate(300deg)%3B%0A%09-ms-transform%3A%20rotate(300deg)%3B%0A%09-o-transform%3A%20rotate(300deg)%3B%0A%7D%0A.ell%20%7B%0A%09width%3A%20100px%3B%0A%20%09height%3A%2060px%3B%0A%09background%3A%20%23e51d8a%3B%0A%09-moz-border-radius%3A%2050px%20%2F%2030px%3B%0A%09-webkit-border-radius%3A%2050px%20%2F%2030px%3B%0A%09border-radius%3A%2050px%20%2F%2030px%3B%20%7D%0A%7D%0A.eli%3Aafter%7B%0A%09content%20%3A%20%22%22%3B%0A%7D%0A.cil%7B%0A%09position%3Arelative%3B%0A%09top%3A%20-30px%3B%0A%09width%3A%20100px%3B%0A%20%09height%3A%20150px%3B%0A%09background-color%3A%23e51d8a%3B%09%0A%7D%0A.arr%20%7B%0A%09position%3Arelative%3B%0A%09width%3A%200%3B%0A%09height%3A%200%3B%0A%09top%3A%20-30px%3B%0A%09border-left%3A%2050px%20solid%20transparent%3B%0A%09border-right%3A%2050px%20solid%20transparent%3B%0A%09border-top%3A%2035px%20solid%20%23e51d8a%3B%0A%7D&l=#preview',
                'Space invaders shadow based': 'console/index?fullscreen=true&h=%3Cp%3EDirectly%20from%20the%20fabulous%20%3Ca%20href%3D%22http%3A%2F%2Fcss-tricks.com%2Fexamples%2FShapesOfCSS%2F%22%20target%3D%22_blank%22%3Ecss-tricks.com%3C%2Fa%3E%20just%20to%20test%20this%20console.%3C%2Fp%3E%0A%0A%3Cdiv%20id%3D%22space-invader%22%3E%3C%2Fdiv%3E&j=%2F*%20no%20javascript%20content%20*%2F&c=body%7B%0A%09padding%3A30px%3B%0A%09font-family%3Averdana%2C%20sans%0A%7D%0Ap%7B%0A%09padding%3A10px%200px%0A%7D%0A%23space-invader%7B%0A%09position%3Aabsolute%3B%0A%09left%3A50px%3B%0A%09top%3A100px%3B%0A%09box-shadow%3A%200%200%200%201em%20red%2C%200%201em%200%201em%20red%2C%20-2.5em%201.5em%200%20.5em%20red%2C%202.5em%201.5em%200%20.5em%20red%2C%20-3em%20-3em%200%200%20red%2C%203em%20-3em%200%200%20red%2C%20-2em%20-2em%200%200%20red%2C%202em%20-2em%200%200%20red%2C%20-3em%20-1em%200%200%20red%2C%20-2em%20-1em%200%200%20red%2C%202em%20-1em%200%200%20red%2C%203em%20-1em%200%200%20red%2C%20-4em%200%200%200%20red%2C%20-3em%200%200%200%20red%2C%203em%200%200%200%20red%2C%204em%200%200%200%20red%2C%20-5em%201em%200%200%20red%2C%20-4em%201em%200%200%20red%2C%204em%201em%200%200%20red%2C%205em%201em%200%200%20red%2C%20-5em%202em%200%200%20red%2C%205em%202em%200%200%20red%2C%20-5em%203em%200%200%20red%2C%20-3em%203em%200%200%20red%2C%203em%203em%200%200%20red%2C%205em%203em%200%200%20red%2C%20-2em%204em%200%200%20red%2C%20-1em%204em%200%200%20red%2C%201em%204em%200%200%20red%2C%202em%204em%200%200%20red%3B%0A%09background%3A%20red%3B%0A%09width%3A%201em%3B%0A%09height%3A%201em%3B%0A%09overflow%3A%20hidden%3B%0A%09margin%3A%2050px%200%2070px%2065px%3B%0A%7D%20&l=#preview',
                // 'Shadow based experiment' : 'console/index?fullscreen=true&h=%3Cp%3EDirectly%20from%20the%20fabulous%20%3Ca%20href%3D%22http%3A%2F%2Fcss-tricks.com%2Fexamples%2FShapesOfCSS%2F%22%20target%3D%22_blank%22%3Ecss-tricks.com%3C%2Fa%3E%20just%20to%20test%20this%20console.%3C%2Fp%3E%0A%0A%3Cdiv%20id%3D%22space-invader%22%3E%3C%2Fdiv%3E&j=%2F*%20no%20javascript%20content%20*%2F%0Avar%20el%20%3D%20JMVC.dom.find(%27%23space-invader%27)%2C%0A%09tpl%20%3D%20%27%25left%25px%20%25top%25px%200%201px%20red%27%2C%0A%09els%20%3D%20%5B%5D%2C%0A%09versus%20%3D%201%2C%0A%09curx%20%3D%200%2C%20cury%20%3D%200%3B%0A%0Awindow.setInterval(function%20()%7B%0A%09if%20(cury%20%3D%3D%20100)%20versus%20%3D%20-1%3B%0A%09if%20(cury%20%3D%3D%200)%20versus%20%3D%201%0A%09els.push(JMVC.string.replaceAll(tpl%2C%20%7Bleft%3A%20curx%2C%20top%3Acury%7D))%3B%0A%09el.style.boxShadow%20%3D%20els.join(%27%2C%27)%3B%09%20%0A%09cury%20%3D%20cury%20%2B%20versus%3B%0A%09curx%2B%2B%3B%0A%7D%2C100)%3B%0A&c=body%7B%0A%09padding%3A30px%3B%0A%09font-family%3Averdana%2C%20sans%0A%7D%0Ap%7B%0A%09padding%3A10px%200px%0A%7D%0A%23space-invader%7B%0A%09position%3Aabsolute%3B%0A%09left%3A50px%3B%0A%09top%3A100px%3B%0A%09box-shadow%3A%200px%200px%200%201px%20red%3B%0A%09width%3A%200em%3B%0A%09height%3A%200em%3B%0A%09overflow%3A%20hidden%3B%0A%09margin%3A%2050px%200%2070px%2065px%3B%0A%7D%20&l=#preview',
                'ShadowMatrix function experiment': 'demo/shadow?size=3',
                'ShadowMatrix function experiment animation': 'demo/animation?size=5',
                'ShadowMatrix create matrix from image': 'demo/shadowJMVC',
                // 'ShadowMatrix just for Mario, with gauge' : 'demo/Mario',
                'ShadowMatrix characters': 'demo/pixelplotter',
                'Swipe me fx': 'demo/slideText?txt=swipe%20me',
                // 'glitch': 'console/index?fullscreen=true&h=%3Cimg%20id%3D%22img%22%20src%3D%22data%3Aimage%2Fjpg%3Bbase64%2C%2F9j%2F4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP%2FsABFEdWNreQABAAQAAAAyAAD%2F7gAOQWRvYmUAZMAAAAAB%2F9sAhAAIBgYGBgYIBgYIDAgHCAwOCggICg4QDQ0ODQ0QEQwODQ0ODBEPEhMUExIPGBgaGhgYIyIiIiMnJycnJycnJycnAQkICAkKCQsJCQsOCw0LDhEODg4OERMNDQ4NDRMYEQ8PDw8RGBYXFBQUFxYaGhgYGhohISAhIScnJycnJycnJyf%2FwAARCAHOAoADASIAAhEBAxEB%2F8QAoQAAAgMBAQEBAAAAAAAAAAAAAAECAwQFBgcIAQEBAQEBAAAAAAAAAAAAAAAAAQIDBBAAAQQBAwIEAwYDBgQFAwUBAQARAgMEITESQQVRYSITcYEykaFCIxQGscFS8NHhYnIz8UMkFYKSslMHonM0wmN0JRY1EQEBAAICAgEDAwQCAgMAAAAAARECITFBElFxgQNhIjKRobHB0RPhQlIjFP%2FaAAwDAQACEQMRAD8A8cBumyE17HIMmAmyB5qhh0wGQpIhM6YCGTGmm6IGR%2FBNkMqEyD57J%2BCGdAITZCBDYsmB96GKfwQLxTZCBpqgEap%2Be6baOgTaI8kJsiBCPghAdU%2FNA280fBAkJo80Ajonoj4dVQkAfYmxCFABCf8AJCBMhk2dNmVCb7Ubpo313UC3R1TQyoX8E%2F7BAGiGdEDFDEJjwQ2iARugJt4oIsm3%2BCZCGdAm%2BxHh4eCaG1QL4JnTVDJgBBFNtSgBDfegEJtomgXR0J%2FBJAaJdVI%2BSGb5oF8EfxT%2FAIoQLyQmyGQJPZPVvJB1KCO6aGHRPdkQmLob7Nk0II9GT3TOzBHyQJvtRqSPJNvNDIFpoU28OqGQikgjV%2FFSA6pNoiE3RRZlMj5%2BSSDmJ6ITDLLqG1TZ0Nt0CkwRLSCkEAapj71UA8kN4J7I6fzQLVGqeqPigQBTb%2Fin1Q3h0QCSfRMoheaaPIoCAI8AhNDfegAj4IQAgE2R8EdEAhMI1QJMDVDIQHiE0DZCAAS18VII8lQtk28EIZwoEA7p7p%2FBGqBJ7IKFQmCbIYjdNkQkAICf81AtkxqEN47J%2FHRURbVPRk%2Fig6IEmyG0dDIBB12T6shAkfD%2BxTZ90IBkmTbRNvtQRDf4J6nomyGKBeaNPkm3VDdECQyYCEA33I6poQI%2FchMfxQgCEm6qR8EmbVVB1%2B9DI80xqgjtun8U2HghBH%2BzJt1TQUCQPNPx0TOuqCPihS38kggSE%2FvT6FBFvsQ3%2BCex8EIF5IYBSSUHLCYCYT%2FsFl0DOn0ZNk1UJk%2FgmgabIFtshk%2F5IQDIb70%2BmgR0RBtr4IZDD5I2QGqeyEboAIT0QgG8EI%2BKfkgTIYBMIbVAmT8EbJ9NEBp0QAhk9vigTeeyZB3Rr8EyXJLAP0GyBaaMj%2BPVCeiITaOE2OhQ2iaoTeCbI6IZQCN00iHQAQnujqgTPsnsh2RoqDX5oRsm2xQJi6fxQ3RHkgEJsjRAghPyT%2FmgizdE9tU9EmQDI6eSfxQgSfRBGqBugPJMeCQ8kauiApsj4I6KqW6OifxQgSEwExoohITbRGpKoT%2BKbP8ANCOmn2oDZLZPQI2QDHxQyeyN0CP8OqP7Omz7asjQ7IE2vknrskzJ%2BIQLzCbMzoboEzqH6oI7o16%2FamQjTqgToT0KeiBIYIAKbIOWEwEAaqQ2WGwAn1ZATVQmTIQyNd0AGQ3mhk0AkU0MgTDZNMAIZAI8kNqmgW2qE0MgEJ9Ef2CAZCYBZDaOgTIDsn0dP4IhMgB0wG6o2QJPyTbdCBbp7JjZJkAjQbpt9qDogSfxTR4eaBdE%2FihCoGKD4lCN0B8PsR8dk0HZQCXT4pgOgfBUHmjxT3%2BCECQU2R0QIOpD%2BCAyWyAQE0DyQDI2b7kdUwHVCCAmyANEA3gk3%2FBP4ptrugTN8UMn1R1YIhfBCaG%2BxAM%2BqPJMdEMd0CZ9kDdPdMfBAtOqTJtqn5oEY6aalGjJo6AIE3imfhsm2uiPL7kCOiN9tkwEN0QRAITYf4Jt5pMSgENqybaIIQJkjuB0TI%2FghvBAm6p%2FBDdfFGo0ZAAdTsgAO%2F3J6faj5boOYB1TZ9EMpBZbJkN1TKNt0QIR5hMjxQIaphBTQJP%2BzJpboBh%2FcUMhtEwGQJPRNmRuiF5p7%2BaG%2B1NvuRS%2BOyGT%2BKN0QeCPNk2%2BxNtkVH5J9U2%2BSGRCTYoT%2BKBfxQj4p%2FxQLZP%2BSen2I80CAQyaOqA2dGvVB8kaoBAATVtEK52wjbP265SAnYQ%2FEHeTeSX5XWZsk8qdShXX1wrunCEhKMZGIkNOQBbkqin6lmLZfA6skX2TQ3gqgZHh1R5lPdAk93Q2qEA3ihka6eCaBfAJt%2FijzGyEA3%2FBHl9ibIHiUA3ihvkjfUJt0QJnTCPNNEI6f3oEX1QhhuijVDJhxuhj%2FcVUL%2BzoLH4pshuigAEygMhuqAAQ3huhDaIAj%2FFPo6P5o6KhfDojXZS%2BHVCCLaug9U%2F%2BCbIhbaob5JtohAt0n3b5KTFBDF0UMwb70uPRPZCBa9EMgo80Qm0dPT4eCNd028euyikdNPuR8k2dHTzRHN1QAyYT2UbL%2BwQmz6ujZAIbx1QhigB96eyG6lPXdAhogJs4dNELzR4p%2FBAAQLy3TRvsmgW24QB1TZtk%2FBAkDwCbJjw6II9PNNP%2B2qOrIEyaE2dABvBIh0%2FghUJk%2FJDeCfggGSbVNNAkk%2BiCoDXwR8UIZAIJbdPY%2FwA0aEIsSmXnI%2BJKiHdSn9Z%2BJ%2FiloqiLJ%2FchkwHQI%2BPgjfVPoluEAz6p%2FFHRDB9UBon1%2BCG%2BSEAHQUwgjRAkBjvsmwTbRgiEEDwCeoT16IpAbdUfFPwZDbIF5J7lNm2S6aIg6eKaH6MhAurJsd0Mf7kwNECZAbdNighAadUOhid0MgPh9qB1Q2wCaBdGQm3RDahAeRCB0TZ0AfNAm%2FxQwTB0QyIjuEz%2FAGCbbo6ugSXRS6bJtoqItoEgNFIjTRGunmoEA2oT0KAOibeCCPXVPRAGybdeqDmAIZtk9k9Qo2ihk0xugWiaYCAEQggJkfamik3yQ3Ton%2FJGraIgbXzQjZPRAJfwTTQLyQn8EwgjtujVlJA6oF1TZMBG6BN9qE02QLdDJoVCQn5FMDx3QJj1QB1T8whtT0QJihS%2BaRHigQ1CGTbwR8kCYJtt8QPvQAmA5iP80f4hS9VZ3DmGsl4ciPvUQpz0nLw5H%2BKifBAvNCbBHmEQMyP5pgA7o8PFUA0%2BKGOyZBR4dUCQFL%2BCNXQRAT6eaf8AZkABAm%2B5PyO6enRDB3PzQIjp9ifwTKECZDFMfxRq6IX8dk2R4%2BKb%2BKBN%2Fgj%2BKfiEM2yA%2FsyGPTZGnyTZAeCTBPz8Ea%2BKBMmE2QgQTPkgBvkhv%2BKAIZDJ9PNAf%2FFAm0R80%2BjOhm%2BKAASZ90022QIs7pJkav0Qd0AwZ0eKGHVPbzQRAITbUJnbyR1foiEN0af3psjrqgGYBLzU26dPBLyRXLb%2B9CaCFFGx%2FkjyKaSKP7FPfb5ITDohf2dNmH8ED70IBMsEeSCEBr8kIT6IF8kwgBCATQhAk2CCEIDdN0IQH8EADqU%2F5o2VDZLqjVCA3Rumz%2FFGoCBeRQmzJgePRQJkafNMDXVB0VCb7EMCXdMDw2Q3RlAg6kPqgB%2FVH%2F1BA12U6h%2BZDxEoN%2F5gEvS69z6ozH5kwzeov9qirbR65v1lIv8ANQboeiTopdPggB0JqoSYQEwoEyN2ZNtwjZAkEdQmz%2FJMeJQRbVMeJTG7o23QLbUp9UBNtUC%2BCNE028UCA%2B1DOmgeCqEAyYdCenRRS6shk2ZHVULYapgFDDxR%2FYqIGTDsjXYIbr4qqD%2FYJbpjdMdEQmQB0TO5SUU0bobTTdBQDBDfYhk2KqEz6J9EdQ6ZZBEumzIbX4JkHogXigbJs7%2BSPkgTHbxQx6KSTIABCGdMIFqj4J67oZv5oOXv8UBg6eiB96ijyQyZG3ighFJvkmzo3TRC22QNkFNtEB1Q3T700a%2FJAN4oA%2B5MJMgEJs6GKBMmnr9iSATRsn0QIBNvkhkNogSbAan5IIfVk%2FggAPsS6KTdEM6BMgDxTR59EAz7JN0Uhvp0S6bfJAt9xsn8Nk%2FNJtdEAdTvohj8k9gyEA2oCuoiZcmDyBgYjqTzj4qkfatnb6%2FdvFY0MmAPnyBH8Fnf%2BNa1%2FlGbWyMrQCxlIHyLuxSOo%2Bz%2BC15NHs4sLZAfnWTaerxlAsQQNGk%2FVZBMciCfUDHkFNdp5LOeESdx9ikQ40UeUJg8ZAtuxdtUweh3OxW0G6Z2%2BCAPu2TZEL4I223TR5sgPuR5JgII1Jd0CH2I3TARqgG%2BSC6epCN0CQCTonqEbeSAHihhunp0R1KCLaumEz5boZAI8mT%2BHxQgDqkzDyUkIItqmdk9xqgeHggTJ%2BKGcoZAm%2BSbDZDJoIjQOmyOgCbIhMybJtqj%2BCKTIA%2B5Nk2RCZHwR8E%2F7MgRBI0Q3j1TQgNkboR1ZAimAU2Sd9NkB4pobqgoOUHT0S08UP5qNGf4p6pOAjQ6oYMMEbIB%2B5PzVMF%2FFMbI%2BCEQdUeabf4o2QACE3%2B5GqACPuQN9NE99EA3RAGibfekzbfJAx4o31Qhn2%2BxAajZGgPkm3mhtgUAT4IZ0aumgTJt4fNHzT0QRbzTR0Hin8RugXQeKOqeiNwOjIEmm3RJvsQHRHTyTZB8kC8F6D9s9vrzZZUrZRhCiMJSlOfCIeXWS4HTyWPuGVfiwrljyY8hLXUPHUaHQrG%2F8asnMey7pHGt7HHItzKqjznZOqYMZWD6JXUw%2Bou2o2fUFfOLZZcsiRrsgImTVSnKILdNCVGeZl3zMr7pTLP62IcAxiNejFZZ2%2FmkyYbahg22y4Ysd5GzE9y3OqqyLRMRshGQEdCDOMdx8d11apTGbRjfqcfIqssMAKucZxGp%2BmcYrnYMqj3OP6e%2BRo9%2Bv2xZ9Zh7sG58Rxdem7lkYt%2Fce3SxrqLfzpczVw5fSWfj6lZbOrhrEvcyzj6XKNVJiND0SbrsvS81gGqGKYGqaIizJgJshFLohNG6BaDVNkMmEQijdMhGyBN0GwQw6psjbRAfFCenzQgOnml%2FBMBPRAkP96aAECT6f3IA8UAoBkfFNkgEAhtExpqjogCQhGqEAENu6fRPogQBRsgDVMjxRAjRkJsil8E9EMXdMaIEAUHfxTA67o%2FmgX%2FBCf3IZAkx96fj0QzoOOYgujiOqYHV0afFRRxCG00%2Bae41TH9igWvj8Ea77p9EPowQGoRr13R6vJkyC%2BvRAJpBm2UgNECDf3ptp46JNsnq6AZNh%2FigNshtVQHp9iCD%2FgmdUIhM6k7MkgAoDr4J9EdH3QyBjXyR5lHwTHigTFDMfJB1OmyP5KB6aughJyn0VA2iPBAfdDIGQkdm6Jn46o6OoF0f7E9WTfRkgijX5Lh98f3K4gseO3zK7jv5Lh96%2FwB%2BHjx%2FmVnf%2BLWn8nJidWECTsXdX5MIAQPs6kfWx1028FbOGB%2BkplC%2BUsycpC2ni0IRBHAib%2Brl9y142acJrI8YHT1kczp4RloFwt44juq7RXP9bR%2BRp7tIMjE6D3YL0PcO24vbe5YN9OMKrDZMnjORB4xJZpOyor79k9zysSj3421wnTFpVQrk4tj1rGu%2B5XZ%2Fcdchf2%2BUgQeVjtJ4v7ZfQ7%2FFJmzNmFnxlhsJMz011CjruU5yE7Jt0kRLyI6KPTRemdR5r3R5puNEjqpBELVCevzQzqhOShv%2BKbFtEboGkfFDJ6IEE9UeCEAjfRCaBITb%2FBBZkB5ICP4oAQGyEJ7oD4BIBPpojVECB4eKH8kMygEAJoQCNuiPghkD0ST%2BKHQH8EfFA8E0Buhk%2FigbfBAuqf8ANG6PNAwEOgbaIbxQG6GTQgQTZt0eBCNUHHQdRuoifkpcgjWC4%2BZRx6udFJwNCPihx4KAA802G6QTc%2FaiBj%2Fimz9UEjoC6ThkDY6o18UAoVDY%2FwCCfRzokE3QDlMbJbJugbfNA2R8OqEBuddAmG2Q7bFG7N80BunoUv7EIdvggZB%2BaBpokSXCfRwQgf8AFCTghDtp16IGCm3%2FAAS2T3%2BKAb7UEao06hCAf7UDX4IT8ggQ00KenihyyQQAXE7036iD6%2Bj%2BZXc6l1wu9ke%2FH%2FR%2FMrO%2FTWnbnx3AdlbXIe4A7CR%2BkyBH2LLWxmGA38CVfQCLYEAnUfgA%2B9cnZv7cI097x6I82ldSxJDfXCXQL23e512907RUfosvmDWwYjix%2FivE4IA%2FcOMzf79TtEx%2FFHd17XvAA7z2T%2F8AkWMdD%2BELK%2FDiSqNfccykGIjX7ZEa4CEXmOWzlW7pZP8A%2FwBfuOn%2FALHT%2FIgldvx%2Fxcd%2F5AeCevzR5oC2wE%2BjJeITQCNkeaEAPBCNkbFAICaWqATS2800AhGqBqgfxSQnsgPF0JbhHxQMIGqBqjxQGnRCNEwgOiBr8UOCjVAdUIQ2qgY6lASTVD6JAhD%2BKe6mQN%2Fgm2yjv%2FBSdAIRvqgqh6J%2BSinvr1UB1TZJ21CAS6BjVk9fgkCOvxTHmNEMPOCyKmLa%2FBZAfFN1G8Ngvh5p%2FqK2WIP4poYbRfBP3693WIajRSYNqqmGsX1%2F1b7Ji6rYH7VjER81LhuXQw1%2B7B90xOJ0Cze1LdwVIVkdWRMRo5OnzPgqRWOsj9qPaG4kUFxkfBLn4uyqNMT%2BIoFMTvNBaZiOnJQ93q58FH2B0kgY48UDNrbdE%2Fcs3ZAoiB9RdApD%2FUUB7ljbI96W3VP2tPqKXsdRJA%2Fdn4KUbpDcKApn%2FUmKDo8kFnvD7FIW%2BSr9gbGSYqYaEoJ8z0CZlN20Ufb8ZFP2wNiUD5WD8L%2BKOc%2F6FIBtAUb6hAuc%2FwChlIEvqEEoCB%2Bfgh%2BqTJpkwFw%2B9f8A5ENdofzK7j6Lhd6H58T%2FAJAPHxWd%2BmtO3NrMfc1JboSeqnQAbIEcd9NZFRhXdMcq65yERqYjQBW0iXKDEgDU%2BsMuTq3YB5fuDGYv%2BfTtIy%2FFHx2Xt%2B9R4957Fp%2Fz7Nx%2FlC8T26Rn%2B4cQuSDfVxlJv6ojTjuvd99iR3rsTt%2F%2BRa7H%2FKFlqOFlD%2F8AuO47f8jZ%2FwChJ%2BifcLDHvmeJaifsB3GnoLJLt%2BP%2BLj%2BScgo6aJfFN9dfmtsG4OvVHk6TJbJkS1ZCT9PFCZEtP7k%2Fjuo6odA%2Fmm7pP4hDjwQNHxSJ8PmjfyTIaDskCgHr9yB6MjfVJ%2FNDhBL4I81F0D7kyJIfVRcpugZ3%2FkjfRRfVN1Mh%2BXRHkl%2FxSGuyuRJ9gg6KPVPdQS6%2FzQ7nVRcJugZPRMOouDqUApkwk6AVE6pggt0QwkSgHXT5KLtqUwUDLuE3DfwUSdEnQTPih%2FtUHbqny8UE3dN%2FsUDLZ0cgEyYeZBHgj0qz2QdQCQEe1HfXTdGkNOhTDb6KwVwOiPaj0QITA3%2B5MSgN0vaiRuUxWPElDgxZHpH5pc%2F8qftxPUpmvTdAC6Y2GiRskdWT9o%2BKQqP9SIiJnon7klL2vNP2jr6lVR5ncun7g6R%2B9MVHxTFPjJERNx6R1T92afteaYpbc6IEL5l3KkLjsUe1HxR7QcaoJRtPg6s5y8mVYrA6lS49HLILBMspcnY9VSKxs5QK2%2FEUF3xUnP2Kni34igQHifNQX9AEOypMfCRT4ka8iqLXHwTEn0VREv6tEMQPqKgt0S6qtpNpJP1%2F1fchhY%2F3JuqvV%2FV9yPVvyf5IqxcPvL%2FqYt%2FQP4ldj1b8lxO7k%2FqBq3pGv2rO%2FS69qsfOzseqyum8112D1xh1bTX7VXS%2BrOwiW9DfYq6Ymc%2BMfUSNA%2F8AJdmOBXVhyvulZEhhIcQIh%2FjLkuWZPu64tdf9tcvYgfxC2skyqD%2FWNpdCvR965Hv%2FAO3xs2RYYxLFyQFy%2FwBvfoo1yjTeTR7kDCc48ZFpR3iCevmux3sRPf8AsBiXByZEacARxDenqs28tazgd9xMPhPKtoiMuQjysEYu8Q2%2FkvL84r1%2F7iIGNKHGL7g8SCvD8JbaLp%2BK8Vy%2FLOY0ch1ISFkPEKn2x13R7MSHXVzXe5B%2FqHwS96D7qr2ofFP2q%2FBBb70G1kgXQ1Jkqfaj0QKY9T8kFxuh4pG6J2Kh7UH1S9qHzQTlMHTklyJ09z%2BCXtQfqj2YnqUD3%2F5pQwf%2FAHCgVQfqmK4hFLQluUinw10MvtTYf3qWmyIgYeD%2FAGocDd9PNScEo0TIQmB1%2Fip89%2FBQQYgoLOY8VEl%2Fxa%2BSga4npsl7cOv3IqRP%2BY%2FaEzM78vhsqzVA6N96iaYeaIu9xtz94R77dB9qoNENwUHHiBoS6K0e8DuQPmj3qxvJZP077SUTjzG0nRGz9RX4pi%2Bsfi1WH2LA2yDRa5OiDacivfkkcmH9f3LEaLm3DqBpv1LfeoYbJZZdwRol%2BvI%2FC6y%2Fp7z4ao%2FTXPq32qrhq%2FX%2FAOVI9wcaBlmONa%2BhCX6Sw6Ej7UyYaf8AuBf%2BJZI58v7BUfpJ%2FwBQR%2Bjl%2FUpkwsln2dCq5Zt8vx6KX6L%2FADfcj9FFx6i6ZMKjlWneR%2B1RN9u3IrSMKvqSmMOrqTr0dMq5%2FuzZnZIWT8VBx1%2BxA0%2Baos96Z0JS9yfioaHZCCfuS8Uczu5UfghwgmJnxT9yTbqtD7Ii33ZbOj3ZeKq2KboLfck26PckOqqTBLILRMpiyYO6qfwQ6C%2F3ZnwB6J%2B5Z5KjknyOyDQLJeAKlzJ3YfNZeRH8EzI6Dog08h4puH6rLyKfOTKjVy8ymJj%2FABKyiZ8Uc5eKI2cgmJP81j5EoE5DcqDo1CJfkVcABtt5rk85bOj3JbOWUw3NpOMOjaIj1DQHRlW6x%2B5Lx16pe5JlWby2vrojlrqsfuSOqOZ030QbH6ePRDrH7kk%2Fclug18iuJ3YvkDx4htH8V0fcK5PcpPcCf6QFnfpde1MDIOY8gQNwAu3hd1xYUV1WdshdZXxlO6ycvXw1MZAFvUuFDiORYbF9%2FFehwcn9tQxqo5NOXLIjxORwMRWax9Yho7%2BC47eOLfo7Tzzj6u92LMjkVgnFFYM4AxgwiPUI6rsd5jL%2FAL92DjIcDdPiI6gFtzLp8FyO2X%2Ftq32odux76bJkAe%2BeT%2BocWMQG9W7ldPu0Jx%2FcX7fkW0sMY6uXiNg2ja9VjzPHfbes4v1a%2FwBwAjHaZEiAxL7kDdeLPkvZ%2FuWf5JcnkIB3AHqA9TN0deF96R2HyXX8H8b9XP8ANOY0AgdUPros4tPgyBcWchdnFpdL%2BwVHvS8NEe4TsEF%2FL%2FFHJZxbN9k%2Bc%2FBBocuh3LLP7lngPNS9yfggucM4TdUicm1GyYkVBa6HVRkmJA6ILHSfx%2BSr5a%2FFPl4oLHRuq%2BX%2BKOSCzxS5eKhy13Ry6oqb9EO4%2BCr5a6I5oLCeqAVWJhvNHLVBYk6hyCDLwQT5dEEjdV8tNdUcmZ0EzIDxPko%2B51Yk%2FBIy6p8%2FkgPcLvxKOb9CkSlydBYJA%2BKfkq%2BSDIHb4ILNEujqHIBLkPHVQWO7lBmNNVXzjrslygT0QWc4%2BIT9yO5I%2B1VPA6EBkvyn6aILfdhp6gl71b%2FUqj7Z3AIQRUOgQcoIfVRdk9H3WgyU%2FNJGnRAwgFJ0DVBJyEOou%2Brp76syCWh%2BKH8kgeiHQScI6paf4pBBN%2BqHUX6poJOhwoOm7oiXLom6g6fkgkCyYIUNE31ZkE3c%2FFD9dilXE2TEI6mRYDzOi7I%2FbPcX9Rr2LAS6%2FYpbIsmXH5aJ8lPLxrsO%2BWPcBziztqGOuipf7FcmEwenim58VWDumCiJfNP%2BCi7eaH1dBNDjZRdD6oJsEEsoOgS6ILBL7Fy8%2FW4atoF0X%2B1c3P8A935eDrO%2FTWnaiBI5ddP6gtFJjqTL1cTpyVmDfgU2wnlYUsmECTbWJmHMMwiCBprqt%2BHndqjKRs7ZKVImZWwFpjKVbkxqjp0018lytvxXTGfOHS%2Fbwr50H3pA846e5ofWN4%2FiXoO75FR752e3FsF%2Ft2zeMZAQcRLOPErz2FdTkZtB7fj24ePOyuHtyrjbGJcAyNkmI8VfkZGdDMw8eyy41wsmYCWPGqPKMJeqHGXqKxZmyt63Es7dXutkbMT3jd%2BbMHnSdeJd2caaLyrnxXWye659uNDGttyTSA3tzr4VgNtodFxuX2rr%2BKYl%2Brn%2BW5sWCSOar5Af3JErq5LubFLmq%2BQO6OSC0TIHxRz21VT9UGSC0zKBM9N1Xz1QJaILefR9UcyP5KkS2T5aKC%2FmSkJkKjkpCXRUW8y%2BpS5%2F4Krlv4JcnUF3Mp%2B4NWVHII5aIq42dECxUckuSC%2F3Ec30%2B9UiTf3Jcggv9wAI5%2BP2Kjlugy8UF4s6%2BOyXPz%2BCp5IEmQX%2B5ol7mnwVBIQZoLxYT1R7uu6zmwAalm8VA5FYO7oNRsS5%2BBWf36z%2BJH6ir%2BpQw0cx0Rz6rN%2Bor%2FqUDlQ6AlUxWzmDr4JCYfosRy9GiPg6j%2Brl1AdTJhuM2PTVR5FYjlyOoiEjlWHqAyLhu5eJRyOz6LB%2Bps%2FqQcqx9xp5Ierc58Ucj0XP%2FVWnYo%2FVW7v9yZPWpGcPkjnFZOWyb6J7L6tXOGpdHuQ8Vl5Mgkpk9WvnHRij3AeqycijkSnserX7kRsUe5Hd1k5ap8inserV7kXTFkVk5I5FPY9Wz3Io9yOjLJySEuqex6tnuR8U%2Fcj4rHy80OmT1bPcj4oM4%2BKx80clcnq2e5HxT5gaPqsXJPkpk9Wz3B4pxkDIREtSWWHl5oMiZRYsQdEuxNXUhbVjXVz%2FAFAhIS5QIcaxK9Fhd%2BotPuZOdCI1FcXk0%2FP%2FAMPkvF30SHtEzBJr5HrqSSroY1vCkwrslEAH0RgYvuSDIuuV2dJPD1OXT2%2FPyfcs7pHlP01VkEn1S4xiPLlouJfVGnIsojZGftkjmNAW%2BKWLj3Xzh7sbYGoemcoQD8ZGYc8j%2FBYbjKNshKXIg6y2fzZb02vTO2s7w16EEiQ081ETi7OsXPzRzWss4b5HhuR8iD%2FBR5nUxG3mFi5ktqjmUymG4TPHUD7UGY081iNhZHM%2BKZMNvLxQLASwGnisXM7J8%2FBMmG3kX1H3rHfk2VWk1kRJDagFRFh8VReSZu%2F3rO3TWs5dDEr7HMSObfkVHTl7dYnofqZ5x1dUcccX2igmVDS9uVgImY9OQBIWatyZakabuFdCJBk05SPE6Aj7lz8tXp1ezxqnkY0R7JnziQCbRJuQ2bT7Vu4iOXhmHscOVkR7Ru3EC%2FL3dW%2BCydm973sdpX8PdiZDnWI%2FV%2BIEuuv3CN087ChE2kmVgEfchImRrk3Hj1Sta9M90qoYuhHvF%2FTDkQfSNuXm%2FwAlwzkSiW4EEbgrdkxyKyfeleDHkDC62EtgfwDUrlwzK4ESnDl5EeDLWlxLz2xtM3pdK%2BcS3B%2Fgo%2FqbPDRboyF%2BLOUKhTbWZFxIeoNyLh%2Bg0DLnm3kBFtN%2Fmty58pdceDnlSgWmGPgo%2FrZeChKAkXLqUImMTGLtLQhXlOE4ZUpyEWcnomcmUTxkGkOhShQY2AGJE4nY%2BIVtlNX1WayJeX9ynJjVWcmQ6AOj9XJtgycwMiYeOgDQiCWCUsScDyrPq6DyTNP2iORbORiI6gcmII0Z0SybQI%2F5g8QPB2UaZ20WmdzyHGUYkayEuJ4dRoJN8lZkSyTZCEqxExj%2BTXCvg8SeRlxc9Vm7WdtTSWcHiXmzIjC2EpQLgiGh0HixXY%2FcOBZg5MoYFE541MKZ3XAGfGV1cbALDENHUniuRPGze0d0txMuBrycfmLIxLCJMCd%2FgV159y7j3GyWSTD26xRCYpEoxk8QIxIi4JiI%2Fi2WLtfaWXjH%2Bem5pPWyzlwJZU3fluo%2FqbCdJKWXV7OTdTOGsJkHiRLfUMRoyp9rjI8j6gBICJEt9dWfpuFv2Z9VvvWE6Ek%2BSBk2B9V2MQexkU52OZRyJxJj7ZjEAcOIMRWTKMvTqs5nj5XdTjXVGAlIASxqozslMQ4%2FTZIA8jqU9l9OcKbsXulGLHMuonDGsETC2UWEhL6SPIrD70n%2BrVdLLwcjEssx8mE64%2FTWbnh6OTxeDSCdGXmWYMe3Ucp0iRlZQwlGZJDNARcF4vup75mZz%2BpdMXFmPq5nvSO8il7h1crTdmWW4UKfbr9qg8eYqrhYzuOU4x5E69SVTXcKJxstxvcx7ATGM2D7h42CPQ%2BCt2Sa%2FZX7sn3T%2FUWD8TIuyKL%2FAHLYw9uyUwRAcRARI1biI%2Fi202VRExZ7RA5PxZ%2BvxU9j1%2B64ZNg%2FESj9TI7yOqr5QjIV2V%2BuJMZeoDYgdAVfl4X6XKGMMjHtcxa6qznX6wJayYbOx0V9j1QN8j%2BIkKJtPit%2BH2XLy6p3e9j0AORG%2BwVmYH4qxIeqPmFml2zun6avKjjWTxri1dkI8gSP9LlW2yS3z0kmbZOcdqPc66ko5%2BKplzgPUDHXUHTVbYZpxqf0xw4wyYEkZPKyFo5bAjnw0%2F0rN2%2B7U1%2ByjmOhRz13XRq71dj2SNmFVa4POF0YzckceXKcZS%2B9VW53ap45EcC2GSS%2FL34moR6tD2RL%2FwCpPe%2FCev6xj5vujmd%2BivjnY1WGaY1S%2FUiwWV2SEGAHmQZF%2FwCnb4qv9TiziTZVL3CXkYFh15SbYatpsnst1%2FVCXIPyiRs7jodlHkr6LsGNMY3%2FAKkSkXsFZga5RH0jjIh2KV2Ri22841zlF25WEQePFgCKxJmbcJ7Hr%2Bqj3Ecy5UrJ4nL8oWGscfraJkW9b8TJvJlGEqxEniZT%2FwA2keO3j4p7HqlPlXx5AeqIkGIOh8WOnwUOSlxemWQQZCMhCTzi%2FIjT0vyI032UI3cJaOOQ4yaW8TuE9jB85BLkSnGInzEIGfAcpa6iI3J8nUeMwxAEnAkeJdgdPUx0%2BaZTBg9Eauluj5rSH11QkybaKAcp6pboQMFDpMgKhodLdNAIdHxQ2qATcpaBH9nQP4ISTQCaQ%2B9GqBukSxB%2FigKMpyrlGcCxGyl6J26tuRiQx66rMfncao8buRHEN0ALfauvidz7HX2mjHv7ddZnak5UDLhwI9EW1GnVYMXF7bm4AvuF4vgBXEhhBogD%2Bn%2Baw5OMKyJV8y4EYctIkDz6rnjt07%2F8OzGYBMmIiT6Wr3Da%2Bp1wMgg32dHk%2FX%2Ba7EcaM51ynZZq7bDWIHL5ark5sBDLujElhLRy5%2B1a0vKbzhShJC2waHdLqmqgdPpokyGZAwmo6J%2FBA1Rb9X%2BDq5vFU2gctQpt0s7Tx5zruFlR4WRIlCfHaQIIL%2FFbKcG2WJkdwNlPGsiMoEgWkzP1Rr3kPFZKoG0yjX6pn8Oo6gLoS7b3OGFdmXY3DFpIhO0lhGczpE9ei52tfZp7NAHIx5GMSYzjIn2CS3IbTfRda%2FIlHuGDZVXOqcJSnCYq4FxCRDefkuX2iu1qMoRh7Vd0R7srbCBN%2BQHGOh0Cs%2FJnnY5gapcufLgbiNYS%2Fr6fBSta9JdyyL8qfu5Pu2TAIhZZSI8YsSI83J6rhc6o4cqpwa6UxKqRg5468vW4YbaNqupcYBoR9sbgcRa%2Bx6z9K5U78mdFI5SNWKZCHUR5yMvk5CvhPLXCUIxstprlVUT6QZGTkxAPqYO5dVmEhIxIUjVZGE4%2B4LJmQJboSBJtfirrMi7mIRiNABt5ea3ozv1FXsTiPVp8VVaOMg02ERyLFjoenmryL7BIy46akdVVjYl%2BffCmqBE5A6FhtrufJavPE7rE45vUaIZrZECBygZFp2fWR0MtSHV11MrL7JOOJLgfH4FPI7Fm4U7qc6qeLbRKAMLABIxsPESESxZW5dQkPchkxekxrlVGLSnpImY0ZgzHXqmNtcZl5XjaX1s%2BWZ41nZ3LAAdVZbXON1mNfIUX1kxnCYJIkNh6H3V1cr8Gmju%2Fbr%2BN9NpeMoAzrBLRlq%2FJ2PwWS2c7%2B4W3XmVs5S5zEejlwZHw1WdtrKuukszVORXbGFU%2BBBjKXusXZiGf5r0Xau41Y%2F7q7DcAYVTsibY2MYiEpyjJwAOki64eXbWLsiEbAJ22zjxJYfUN36FYso3Z17VVuMWB9w1j0xiJEylptEErntzOfo6a8Xh0s%2BQhmZJnWZiM7aBPUasYxeQO7baoqzZEXxssNcpRp4wieMSYEb8Y%2BfkoY%2BJ3C%2FAttrrtlj1D3LSIylAADiJS6AMd1mHdLRGFdUBAkwMrQ5sesvD1y2bpxZT9O2rebeeeXXx4doFPeY5lJtyBxGFdVMiMZcuJMQzyjIeK4F9ZrssiHJjIxYkGWh6t%2FFdXtmXl5d991UDkXSnGUa5yfQyEXkWBmeUgAyh3vt2f27Ltx%2B5VypySecvcfnqNN%2FwkMrn%2BrOFOPdCquNk48RKRA4jRyPDwT7nk436vHze1SnVxrrNlgJkRfEeuQLBgTsFi9%2BuvGkAfzBKLDfTqpXyyoQrNsJVV5AFtUSPTZEnjzgfkyNZs5njy0Zfdu4Z9pvzsqzJsDAxmAzDYq%2Bc45cTXVVGycSYxNIMYzEmZh6ZaeC5lc4klwGDO%2FwDfFiy6OFEWThh48oQnbIRF5l7UWLaGdpiB80xJMSYkS225tzTHb8zGqtFkZVkgwhOVZPLd2GoL%2Fd4rHk%2F9woxY9syIWiFcpWwqsrlXKL6TIfcFg%2FwW8513bsqnGyrbJVU2SnE0WCyEiCYvXIGUTqGJ8F1cj9x9u7zjinJ7XTRlQyBbVkRlPj7IP%2BxwA4jQ%2BrZ%2FBS2y9ZhiY7xc4w8nMX32GuIlcYH6oQILaD6AAvRftH9v1Z%2BWLs4%2F9BLnRGyJi5tIAEeNnX19fku3i%2Ft%2FsOZInsNeV3LOsEpSjEnHnVI%2FjhpdWYeHIgjxXIj%2BzLYZcIW5P6MTJnGWZE1%2Bker0zDxmR146g9Fm%2Fk15lvq66fj2lm0k38%2FLsT%2F%2BMO912HBrsruojP3ABGcWmRxBst9s8REa6llw%2FwBxftez9r20U52TjZOXYI8KKSRKuIL87omPH1DQOXO69QKe%2BXkduxP3bCyYjy9mdsqox4AGMQx1PyCw2%2F8Ax%2F8AuPPqsy7LsfLuAlZbGOULbiR4s7yPxV1uf%2Fb%2Bznveb%2B3H%2BnmgZWWyogNSSIgaan0sAPH4Ln5Febh0DEvjGvnIZFcuYEtuPQ9Vvr%2FbWdl5s8IyGNbWQL55Nka4VvsbJS2UO6%2Fti3tWPP3bITyagJ2Gu%2BqcDAy4HjGvkXc%2F1fJazJwktvXbo9i7d3z9xGOPi9yx6ZUwJhDJsHOzk8fxRk5Ow5FV1dt7pRfYP0mDkwplGdsLIxiCQPb8YT1O8Y9ei83g0TyMmqmMpRjOUYznWDIxiSByYNs6lfkXw40jInZGmRMAZFonrxD6KY%2Bizb5zfu9lLAyu3dnliZ%2FasMRst92V4uAuga9TGHrmRyAYx49Fye6W9q7gJZ2H244T8K%2FZrshZXGLcTMVyItM%2Bvg65B5ZAuzLcqVl8eMuciTKZlv6pEScfAqdkhwjIWn39rZagkBm9XLX7Ex%2BqXbxhdf26nDmYTyjVyrJjO2sEScgcY%2B1O3eJfXVZbsaur24410cu2ZI4VwmJRLji%2FINLl0Z1fcY5MvcybrLAQI85kkyYHiYymSS3gmY4UsKUKITlk1TBlMHhWawSIzk8i0i6sz8ls%2BIouwe42ZBj%2Bln7svWa418WcGTARDbDQBUw96jhbOsxqlLQ2weEjHf0yDSblsrru5d0lVPEuulOB4xnyImT7f0%2BvUnj01VJzb5CqNsYWxqlyAsgC5IEWkdCQw2dOS%2BvjP3KmFlsrMeisWmYLEhpAQ9bxMvp0CDCwWQlOEYTPGUapR4gggcTxPSX3q4NKXtypptjGJhCdUvbAkAPzpT6t%2Fm0SzceFNVMoZEL7ZP8AqIw14SDGI5fi0P2vumeSy4UWSEAa%2BMOWxIHqDEnf7kzdGx5mmEBGTkwieI5aCLctANSPNVA2Ck6tVKTGLjWUQ49O%2FXdXYtePZGw5Fnt8A8ZO2wJ4iLHkZM3kqzyjK%2BwUDHjIGALiQcSaQDw%2BGmo8VCchpHhwMRxmA%2BpB3k538UTjKLxIBlEPJmOhbV4nzQYEV%2B6Q9cpGIk4dwHOjk9UOU0OhC2wE%2FNIDxQ2iAB0R1Q6eqAd0a%2BCA6OqBo%2BCQQgeqPih%2FFJ%2FtQNHVIlNAOh9NUIBQN0Ol8EaoGoCM7piEIvIv9yk6nhH%2FAKmP%2Fi%2FgVNl17dXAheO22j2%2FRGUgZ8pBidhoG1XPzJSEKQQ0m9RBJL%2FPT7F08K8fo7KNI8pFomQHQaiJ1K5%2FcGaMTLkYjT1O3%2Fh6LDpcOp22%2B2FOJScWN0bwRO6ceUoNPePmQPsXKzj%2FANXb48vh9y6OBZ%2BXgQJ35PEvr6j0C52YP%2BptYMBLQM33FXXtN%2F4%2FdnJTd0AaqQiTsujmi6HVntlSFUndlcJmKnQyvFXjup8GOzktxHUpj5M%2FDPxJ6fJMQkdl08Pt%2BRkyur9sxsqDmvieWm7%2BCoshXTIwsBExoY9R8VZzylzLhl9qRWbIHGbfDqy6gHvERorlI7aa6%2BZVXce15tEJZNsAIRlwkIkEgjTVvNTecLreeWGokSJiTyGzEeK1C6UxMkkkhzF3c%2FPqslUJWkwjvLZwAN%2FEq4UTp5GYiDxOgD9f8pXJt2u0WXiymERaYysiDDnXGPLkG0%2BolWzs452LKVkjKPMmE8iNjEQl1iPT8Vm7VGwzx7gHe0NONHKQlycnnI%2BlannDPxJ312ziDMyhOuurl6JOBwPXzSrOlGXliyho2QlIuJVi7mQG3ZtVzPbx6sKyNtMrMqzgcewS4ioA8pvH8XIaeS3Zsj6jGFkKy5EJ%2B0REMWiZQ9RXLlKysWzjdGTwiwBJYy6ajeLMUXB1n8uw%2BYP3BbrL2IEQdAP4BQtM7MLHpABmZcn6uwdZLDkWWyhXF2DsNS0Q5K1rcZZ2mcRdbAyhKbk%2B4NIhjsfioUDGqnCV0ZgxPqAPEuA7jXzChGXCmdZ9RLNKLgfyUKyPbEwzxkS0tQdAmecmHYzh%2BVXecuvInMV6AyMxpKTycf5uO%2B4WKuFAptkS8tRXESIILdR1ZTujL2KpylWdK4iMNw3I6j%2B2qyV%2B17lJukY1GxrJRHIiJYSIiWcsrbbzblJJOG%2BFdtX7fyMv6o2XVxAcv6CeT%2BWq5lWXOqw3by0JHivQ5eR%2Br7JlAVwriboiFddYqAYiA9EdieP2ry30yAD8wWPxCzWvoszJztybL5R4%2B7IzA6arZTkV%2Fpr8XjxFojIGLiLwdjMAl1UbK7rYCbSABOuzstpwe0YdWJl5mSL45cLueFjS%2FNpaJjTOyUvTrZvDw%2BKzf6rO3b7d%2B5iO029oyMnNGNKArhXUYSeuURGUA7en0jTwXPhX2iVdPuY2VK33TzloIyqB9MRHcS011XGqkZjgGjxj6Zba77hdns8CccxM4%2BnIGs48iwi5EXOhJTEam3ji5mDorxacurJwrraT7hsbgDOvhKOvLnEtElvvXSyre3%2Fuf9xCfd%2B6XQxJQH%2FWW1%2BsiAA4cY8t%2BhXmM26yvKyWDQjkTkD4ESLMrMSOSbYe2JV2OAJcSW5HXx2Vk555Y26xOMtmT2GqXb8zunbpmdeBYI5VNpiDCEjxjKJ0MzyIBAGi5eRm5WYInIaRGkIwrjCMR%2FkjWIxHLcsNV6CWPlxwe5YkIzsGTMGEhExFkeQ1HJvDqsUIHAs%2FV4Upj2xxhK0R0JGriJIVuM8ElcuqqyyQFcJTlPSMQCTIjoAFqswsqVfD2J1mcRKAlGY5ASZxyCYgZ1TyImMJj1y5Hi5cPxHUudgtlUOeT7fJoERHKsuDEkuYicgB8yFlrDhWU20WyqvjKucd4szKMa7ZzEKRKZI2C29zjKnIvplIz9u0B5EEtxHWEpR%2BwpYsoTjfKQ9sDiY8Rt6ttS6ZTy19uwP3N7PudrxcuVeS9cbqBYIy4eogShpJvBXdt79lduzv0%2Fdbv1GELAMmqRGQwjIcvZ9TAybcSDjqs13cc%2Ft8IVU5UvZk3uCqREJAj6XHp2%2FisfccnEybnxsX9JEMBEyMi3jIsNT8FLM8Xqt%2B3rj1tjrfuDvvae5Qql23Eni2whKiVcyJ1iHLlGdP4qz4gku5Xn6MvIxZGeNdOiUhxMqpGBI8CYkIjI1y5RiC4IaURIMQ20h9ir9uTPxLePxVkxMRnbb2uaJ2zskZ2SM5SLylIkkk6lyVHTopSEYtpr1RCudj8ISkYgylxDsBufgFUXYefm4E5WYWRZjTkOMpVSMCR4PFU2WTtsnbZIzsmTKc5FySS5JKizIMSA7ghQThOR9IJA8lfCudxFXKXMniI8SST4KOHjG42SMXrhEvLlxAkQTFy0vBEZmU41uPSW1YR33JDfahghk5FMxEH1VEgchs2mx8FEG4k1ylwcORM8Q31B%2Fj0VU9JyHgTtqPklqqLhMWzrhMwpiAImwRO39UhFyT8EpSr9sAiRmdDIy0DH8IHl4qlCgloToGfopEMIyJBBJ9IOobxHTyVacQ8gC7Eh21LeSovnGqyVs6ZGFcfojZrKQf6XiOLgaqNMoAmM29QaMizCT6GRPTxUJ8YgRhIkHWQIZjr5l9En9QIGnggssc8ZiMI6AAQdi2nLXxZVOdXUpyecpCPDkX4h2D9A6TliG8HPX4INAKHCWnijRaYNNwhvSSx0SHKTmMXA38kyHv12QP7FAc9HT9uwjSBb4FULTYp6KcMe2esYkjdKVRg3IgGR0Dh9PgpkQdPUq2OPbMiMYEuWcAkfaFOWJkwgbJUzEI7yMSAEyihGngnxQyojp8k0yPJCBa%2BKGZTAJVkaLZaRjIv4AqyGVHyRr1C2x7flyDisjzLD%2BKqOOYy4y36tr%2FAATFTMUMfBkYpIvBGh9WvyWyOLWQeUj8g6zUREcsRi7B92B2WdphrS5ro4kZfoZ2Sk8ok%2FgiT0%2FEdVkzvcaAmdh1Mf8A9Oy6WNTae1ZGT6PbhMgvKPJ2G0X5H5BcjK%2BiEtXkNdAPvWG27EnUJYAl9YEgC%2BgeZ8NkTxoW3TlMkRJ3Gv2clHFujCOHW%2FqPIhm%2FqPUpW5tkCYg7dXf7%2Bq3pjNyzvbjhd%2BixRt7h%2BLKz2ceA1rl8ZSA%2FgFz5ZlhOjnzKgbbJdAV0zHLFdOU8eLNCA%2BJJVNmVHjxjxY9AGWH8yZaLK2vGs9wQJiJdI9U9l9SlkM7RGiji51lWRG6EQJw9UZEO0h1C9Fb%2Bxu%2BfoIdx9uP6eymzI5c46VVAGUjEF9H2ZeYxq6Y5QhfKXtO05UgTOof0voVy22ze%2BnTXXHOHsKe%2FdzxM8dwxwRfnw5ZmT6jKZmDzeTt4Ll94ybO4SldcIwmbpyEYwERxIDfT4%2Bay9zunGOPXVZMVRrBhE6Fy45EDQFhquZK60mBlOTmZBJLllqbftk8Twl15txM3y7nb7fYoIriZtJyAC7t8PJdPGlV3HHzq5zFIyTJjPXjyGpbTZS%2FbX7qwO10XxzsLGzLd433wMpA6RiGIOniyuMcU32Trprj7sZ2hogH1AT9PgPUtbWY4Z11ubniPO%2F8A%2Bdyp5v6bEAyK7JCum9%2BEZkt4nQArJkYGR2%2B%2FJpujGXsSlVK2uZlUZAt6bNiC2hXocEj%2FALthuQZe3JhyPIeiO3QLzQttlOyEjM1uTwLM7%2BC55465b2mPPDpdo%2FSylWcicIyBPtxNspEz%2FD6Ylm8VbGONPJxhT7POQkCIV2CDmuT8jPUhHbbICqmEaZxkLuRvBhW8T%2BE8vDxC05JxI5GEas2WRIxmbRK3l7Z4S0B%2FmFny1r0ozOyZtGGM6cMcVSh7j1x4z4yB4nUuF5v%2FAN74fzXcyzT7EjXaZnUD82Vjln2K4YP%2B75j%2BaTPkdC2bY%2BLEDmZaCIfUkeRUu22C3LjXaRDkTCcpsAOnqMmAbzVmPkV4hws22r3xjTjb7MpGInxI9JlH1B%2FJcvIvMjdOMBAXWGwakmIJJ4OTqNeuqqXt1s%2ByrN7hkSqsrqqM41wlIuGAEOQMdCNN1hi9lUhKUB7RLMwMn4jRt1lqsmKyB1HH5EjZaao2TyIV1AyJIaI1fTVXWdJWzJxRi1U%2FnV2SlGsmFZMjEHlMGRZvxN8QVTjVSJrsjKl4WCUYWniTrENsP%2BCuuqsjbxlXxgx0bQgciDssYdq%2FORGgboPILXrc4rOZ3Hpu4RyJ4OfLIhT70rhK2GOTKAdpEgky%2BJ81wqcXGuPGydUN2lKXEj46dF2vaycjsF87ZTss90SlO0knQ76%2BQXFGJOwtI8A3qmzt8lv%2FAK7J10e0t4rZ3D9s1Y9FNvb8j9VKX%2B8SYwjHRwxJG%2Bq4kMedxIqiZEbnovQjJqjhWYtdnGRsE4ykCBxAMSG%2Ba4VsrMfSo8YkseMuT9FysbiQrjjyAnJ5DWXFiw8G01XWw7b7sWNl1pAjkueRJcEe5IddyXXCnZGYgIVcJBho5JJXXx8WUDf2zMNmKapxmJ2QlAw5GMJSsqbkfSxZ1mrJllzzXXlXGoe9CyyUgWbf1ba9SlizsqhOfsCcpfTziCBoQfD5Lp90hh4cKKq7K8ik12R9%2BkcLJcZH25WAj6j1308FwoSsmzSLeD%2BCSylzPq7QyowyIgATAjWSdyWNbj7lmtEvZPr5wI5O8mPRvko3SEbYiLxIgNev1OqJWX0x9syjM3tYJRIk%2FJ2GjkE9QirJRFmHy5Qhw9QiSXlsGi7qeLDnXYCBE1x0AG%2BpJJK592RZZjRD1wFczEQiGs1D8peMeisry4Xykciw0ah40QAEoncaECLfBEQyjESnAdJ7MB08lowBV7OVK7kYiIMeBAPJwzuDop9x%2FwC2Rhj2dq90myswyIXwb1jecNZBi7aHp5q7sl2XTP8AS%2FpI5NEpAziDXXZysHGtrpAsH6bJ4PLjTtsmDGUiY8jLi%2Fpfbk2zo5Vggl5vH1OTofJdLudAlkGs4lXb7KokXUxnIkzgTylLnItI%2BEdFzvbiQeLu%2BgPgkDEqJy5SekOAIgc3HUuSNVVOZkdgB5KXs2M7bIFM9FcVMxHlFg0fUH5Enfw06LVTKn9JbTKtr5SjON2haABBiNiHJ11%2BSzmqSnVVyd%2FBMGSlb%2F0%2FsmqBPLmL9fcZm47tx%2BSjGsmuUwR6dwSAddNAdSr4CdMjKM%2BJMTE%2FCQ4n7lXzEa7IOGsZ3AJ9JcMdx8kwucqoynFzGRD6FiQ4SEjGQlEsRqPigx9L6t1PRSqqsts4VQNkmMuMQSWiOROngAoLMaum6VgyLJQauc6zEAvOIeMTyMdD5a%2BSq9uRDgJEh9FKNkgGJ%2FvVREBipxZx6X8VW%2BpbqhyC7oOlOrDrxY2G2z9RKInVCNUOIL7GYsfofw%2FJYbpc5GcnM5EmRO5J1JUOUmIcseijqmRMGAixGpbw2UudTg%2B2GG%2BpGn2qsl20Zgx8%2FNWwFgqNojGVcSYElneY8H5HbQ7IqWUKo2yjVXOqIZoWl5hw7HQKkTmIyiJERm3MPoW1DqdpusHvWSM%2BRYzOpcdD8lUoPUdk%2FandO%2Bi04GPPI9pjM1to%2BnUrbkfsjvOHEyycDIhH%2BqVcm%2B0BlR%2B2f3B3bsQyIYOWaY2kchAjUjxcL09P%2FwAkfuSFkZyyo28QQBOES4PizKbe2eP8PLtfyy3Ez8fR5KfZ7avysp8aMdfzIkdW%2FEyI9mxKx68wAS1ccQPvK6v7u%2FdvcP3DXj2ZUaxLHBhH24s%2FI8iZanwXnbc22qjG9uIecDKXpB%2FE3gkt8u3482fujoe12ymPGeUZ9NN%2F%2FoCcK8OJIjC2UCPqnyY%2F%2BdcqrumTGwflRk5Ygw8dOgXqJgRqlKMQZRiSNH1AVy3hhqq7eJcaq4iWxHEn7V0cWiHDnKoQHLiPSAGZ%2FBefqyO%2B5Fkfy7uJIctIBn82XsrqqLoCu%2FWJGodkpz8M8pU1QJMouNoghyfALm5MxlYd0IwmJ2hoxZ%2BoPRev%2Fb%2BT%2B2u3WWW5GHXluBGIl6hGT7%2BoSXvu295%2Fb9mJ7%2Ft0Ycolo11wHJvJorlbtbxZHC7flu1k%2Fb9svz1D9v8AdbgZUY1tgG5hCUv4BY7cDLqPGyBiTs4X3nun7wyKzcMHjGggiJ4jmQ27r5V3vuJulTaICotKPE7tEt1W%2FwAe1txef7JLvO%2Bfs8yMO%2BR10V0cGwOOR13YJ2Z1r%2BmbfDRZzlWyd5k%2FNd%2F2tT2v6NVWKMeXP3CJDq7LQck7G2R%2F8S5RsPz8UaSYcyFfaTpfW3uujK%2BAdyZfEqByID6RqsUqTHabp%2BxM7lh10T2vwesnldLLI0DLLVL%2FAKjls7nbyWiGPFi7SPQ7LNXERvY9Cdx5eCzvnjLWmM8O1h586%2B1ZGJEVmu2TykaomzRtI2NyiNOhXPzcu%2B2irHnImqkNUCNgSZFj5kq7HoypYlt1dMjjwJFlwfjElt9FlzMe6mjHushxrvBlVJ3MhE8Tp01XPh05W4x%2F%2FF9LnXVn%2FEVTaQLSZgkEv0dvlorMUVn2RKfHSRAYkSIJaKRjVbcBbI1wGj6BWJWnt9hHKQ4xgSCBMA7ea1%2BzXIuOAcueI%2FvKzCquiQponGcZ68iX1PitVOFkWWGP5YEQC7rU2xyz654aqe0V3xPGTyOvIbhYe49jz65e%2FUDZDrqxHRy%2Bi9j%2Bz78TDzpxsjDIJrO2vEuPNaf3H%2BkyqMvLkZThJh7QmTAMREgR2W9vX1lndYnt72WcSd5fObLc3ENmHlT4yri3tmfIeoAgDiZROixYcbpZEY0f7jmUNRHUDk7lvBdnu2HTONI7dQBKLm6MdZ9GB6%2FILj4EJzzIVxlwlKQi7OR8tHZcXZr7nM2SpnMvKVUSSdXJJLrnk%2FR%2FqLfct3cmjbARlzAg0ZtxcAnVujrCD9Lv9RVR0MIz42Ee4dA3Ex%2FqGzr1VZPMO%2F8As%2BW%2Ftx3815DGlWIXc%2FbZg%2FKMj%2BIb8V6yljIM3%2BzoA%2F8A7cdvJX%2Fknn6KMLnHumITyI4S4jRv9uP4eq4%2F6E1YGRlWxqPKUODWjmBIufyRrJx9i62KY19zw5gkn2pCXpLA8BpyD9Fy7c2qWNbSBWL4ScRjXAOXHL80FY%2BMNX%2FSzAl26NriuUw0f05FfKUZuNZykDHiNfNK2ywZFAMZRMeQB4Vwf0kOBH%2BajHuVluFX2%2ByvHEBecgWE%2Fm8paGINeph%2FlOixmIjbW0YDceiuTbH%2BouVWVt87pVSEjYYgEnlKptvCGqxYmHPKlxjbVX7khU9k%2BIBlrylppHxKtt0rLQI3c%2ByIDb%2Bp1lxq777TRjQM7Z%2FTGAeRbVgyVdf1i%2FM5jGphHcPybwA%2BGywkSluXZb%2B5VZGJGGPk1ypvj6bITBjIOAWkPMFU15uUJ2WGb2WQEJ2EB%2BEWAA%2BUQEFcQIR4zB%2B1l1O2zor5XTE%2BUTEVT4kgSfYtoVyrJCQjxLjz6Lo4mNyxRabHjyJ9sEEgx4l%2BLE9VZt6pNcvXd%2B%2FdVvfsAxuiDKjjw%2FLEPTJ4kafBeWxb6RKPOqPGc9m1jrE%2BjbXonQYHDyxIFxGvi2mvM7%2BkdFkw4idtUZB3lIs7a8XGq6a78zbEYukk9Zw%2By0Z37DlRHEnRZCMwJSh7mnLxHI%2BKWV2v9jvMWSyKZ8SBH0fU3iHXynJtlXdWYnlxAlIBy3qbUrs2Z1mVliNkbBytEBIfSxD8vh0Xo%2F7dbMy7c%2Fr%2FAMvP%2FwDn2znPX6LbP27HW2dgFQh7jRfls4Gui53Y%2B34eTEzyA8ZwsJBLB4ThxY9N13Mi7LGPKMpCoe0Q0yAWEDuNSuJ2OL11aFoi0liItrEakryb7Ztr2a64knb0%2Bd%2B1MfB9n9wYPs52PfGVNmJAyE6JyqI9z0f%2B3L1aLzBzczIyZzzL5ZF54iOZa5ujKBjxsBcuQIsHXdyP3Dj9s7dPENVU7cgyjCYczjyjGImJS8PJedxpcM%2BQ89%2FgGXLXNu3tOJeP1ddsazX1vNlzx0x5w7jeDZlzldXVKUYStOoEyZafHcqVIhLDsw5YEf1FPuWSyq4ylNmHpkRPjxjvsrsyPPHMJzEPVKfORHTYB2Wa2cO2xuxsW%2BN8biYk8YyHtuJCUZvpLTVhstfpGMeao7hVKdkeJYCIbXXxWC0gCIMjyA0O%2FXZW5XPJyuNIM5EARjEEkka6AKOVjzp9rnIGdlYsIB2EvpjIEAiWmvyVZRrrNldkvbMtBxkBLdxy2DbeK3wwcWE4mwyA48vn4bbLPiC7iaocjMy4xhHUmR0YAbupe7mYtlkJcqrADCcZAiQfcESDorT3L3TbXdh0mnHgDOoVvxi%2F1keGoVeBlWVzgZyeNUZRrEtQAXOgPmVK%2FKysjFJEoU1xAiaKniC%2B54jT4rJSWd%2BoSdcpeOltxN0uUnJI1JURBTJdLVvgumHMuLgulxGik7jVRlHl1ZBVfpAt81RVL8JLg6AOrrIkVly42BWUhis1qdLrIAHwPmXUZyeEYcYgwJeYGpfodenRRiHLOreIkeEYiRGp1G32qNLsB7oX4UY8rL4iVZNwqgDW8%2FUJtCejgA9dllBMSAXg%2Br6gkJEV9HVlotnXGU7DOFQEIgyMuILkRHgN9FBCUo8REAEu%2FPr8PBVoV9gpEY%2B1MkGAMhZEAie0hHiTp4OyCgKThtR8E2g2ki%2FwU6Ko2T4zsjXEAkykW0Hh5qiyoYksa2V1lkcqJj%2BnhGIMJAvz5ScGJHTQoshmSxKrra5%2FpXlXRbxaHIHlOIm2pHJ1VyrrnIRawfhkzP5sdlOWSZ1CnUVg8hAE8QTueOzqfczPMVDjxJI9T7dG%2BKDIE6RA%2BCQkQJRDMSNW1081FBOVc4lyAH1DEHz6KPqQd%2FFXYtMcnIronbGiEyIyutJEIA%2FilxBLfJBYTbCcpAkcnOhVh%2FV044tlJuRHGO5bxWidtMuJl6QdHI8Q6sEa7QYmQasbPt0VZ%2BzDHLuYPqddwtlmbkV1Y3CTcoEkDx5ELTi9thdbEDlw%2FqHizsurldjFtRyK8aydGLACy2IkYxdy8iNApbJ21I4WRlZNF8QLJEEuQSu9iX2TwI5Em58JSHg4def9sZWXCFkSxkAJxkNiWdl6kYlWPVHFi5pjFi51bV9U8HlR%2B2bZd57nXi9xnxxzXbOQh6STCBnHUv1C6eVkUUwgLpCMpD0uVyaIYOLOJxRVXb0PMyltrsSs2d3ydVsomuFprnKEZSGzN5eazi%2B1ueLJw1nh1O1TjfC6cADGNmjuuxAkxDlvDyXB7VlXZlNs5SNfrbjHoG6cluIhANbaQPObfwZXETDVk3GuEyZnY9V4vuVotpxieRn%2BYTIlw3PRegttwhGXtkWWEEAAGZ06fiXCy4TlVjm%2BJjZ6zwkOOhlvx0V1nLO8kmXI4yOoT4EerTTXVaxUY6jRQur9EiS5AXT14c%2FblQLITLT8ND5qU7McXNQCa2Gs2BdtdvNQyLKrRWKqvaEIRjL1GXKQHqn6tn8FVWPWsct4jSLXsjMAddNw62%2B8BEekciAS%2FwAPBc4MTF9dD4laeUuIAiGAGp%2BHgt6XtnaLvfEdI8Y%2FJYYEfqQZASHIuCSAfi2qmYy15HdUQ0s0PUpvcw0mK9DTlTx%2Bz5WL%2BlquGR6v1ETKRqAI1jrxBLdVx8vFyYY9OVOqccex%2FbtkDxkxb0lm3C1Y12bDt99NeQY4sj%2BbSJgRmdPwuCdvBQtx42YJtObAe1DkMaXJ358BCOjPry%2BC49f1de%2F6M1Uo%2FwDT%2FPrpuo3S5RGzA7BSqJEafn181PNgI2AgaGILD4LTNUy%2Bj5j%2Ba6na7Z10ZRg5LRDDc%2FVoFzSwjIaiPKL9XV9V8aqMgRcxkYgltevmrek17d%2FtdleC%2BQ4jMxdufGTa%2Bn7k%2B49xptjGvHiYCR5yPIyBfU6FcrHsrr9ucrCfdrcRIJYy0d38lZ7gGLXTbZKfGyREhHUkxG5J8lM35amHcw%2B6Qm8KcSGOTPj7oBJOh9XIjdwvCO0ySXLnkfNek7dWLsmFEoyELLDyLkA7%2BAH8Vzu%2FR4d5v4xAi8RADbSMeieTwzZZJ9rXT24%2BfisvWP8AqWq8xMq%2FcPECAcDd3KqyBjRtiMSUp1P9U9C%2FVVGrEMms489h9MojqNnXp8ckz3P%2B15H8A3%2FvXlMURkLQRDUB%2BUZH8Q3ZepxeMrA3Sn0sP%2F24%2FZ8EJ%2FpTiP8A93xgNZe3LiHLh6w7dAvNeo2W768ugPVemxjId2xgCQ9Zbb%2F2xq3VeWcCy0lvxasR1Ui7NlHICHIzjAkciOFYZ%2F8AzFX3wxJZdEO3TsyJyA5Rm5PuEfTHiS4Wao%2B4YSEYuOIeFRLAaD1S0CdYl%2BqpFlkqok62ykPTp9XoRIhdYWnEmDjkJCIm79dZLDVOULOUJGBH4oljv0IW7KMYiUa7hbFixFnJx%2FpIC5fL70WNudbZbCqdspTmXJlI8pHpqdVlrhO6cKqYmVlhEYx8SSwATlaJQESNQGBWnFuxceiw21RvndGUYamMqpD6Z7MQfBPofVRCuUwREEmIMpeQG624pqrgZVzsjYYsWAEXJ4sDq4MTqs%2BNn5GKbp0zMJ5EJU2EdYWBpx%2BBWiiyoYsKwTKzmTZEhgATERMS%2BvXopVmFkWhg5J2P5fT%2FADHyCqwZ8rqYlgYmXTUvFWTDdvvYN%2Ft%2F%2Bo%2BQWXt5P6yt%2FP8A9JVyl7acqRNxYgemLh%2BL%2BodPxfBegpP5sCSNJjrqvPZZHvT1P0RZgJD6huTt8Qu9RL82tn%2BoaK5Pl0MnNpjM0A%2Bu2syjKuLBuB%2F5k15%2FHy7cXHxvZIiZzsgXAk4MonY%2FBdDPc90p5OT7E3EmmfpP4Y6fJccH%2Fp8PT%2FmT%2FwDVHVRXR7rk043d8PIyhOyquuRMAYyJJBDdANSvPjuGVCwShNuOkXAOnnpqun%2B53jk48S%2F%2B1sQItr4DZcW2v241kzjIzBMoxd4MTFpab6OiXtovz7bqPbskJy5EuAzD5LNG4xBiACCG1G3wRMxmXjEQYM0XbTrqSlXKMSTKPI%2Fhc7H%2BaC2u0e9C2VYMR9UOUoiTDUmQLh%2FJa8%2FvOV3DGqoyoxnZXZK2WSQTdYZRhWIzmdTGMawIhZaMmFVd1c6YT91msI9VZBd4a9dis8pGWpRW6q6dr2EAT0bgBH6QAC0W103RZfZbKydspTsnpZORMpS1f1GROyjhGv0iwzEeXrMGMhH%2FACjxVlsqhGUKrJSi8pcZRYu%2FEPqQ%2FHVQ%2BDlY2PYIRDkDlp0H8PNU1HkH%2Fmo3zM4cpaniBr5aBZnI2ViXl07IW1URyLK5xqm4rsMSIyI34yOhZZDlE%2FTED4qr37jV7BnI1O4gS4B8QOis9%2BP6UY4orB5cpXsfcPgHdgPgFfap6xfXaLIuNx0UiXXoP29%2B06u%2B4tl%2Fbs%2BEsmFYM8KcDG03ay9uvUiUSBpL7lzM7tfcO3GH67Ftx42x51SnEgSiesSyTeXjPJt%2BPac44YiHiyplWCfJT5vEsDzBdtG4%2FHxVcrogONT4LWZWcVD2wAXLAKosSdVbwtsiZOG3Z1LHxZX%2B6fcrrNUDYI2y4c23jB9DLwCzbG8Wds5iQrY3RgXjVEniYnkOW4blr1UJzEhHiCNPU50JfcaaaKCgstqNJgOcJ84CYNcuQHL8MvCQ6hWRxbhRXmTjxxbLJVC46x5wAlKJ467SCzqyNrRFchyrBMuILEkht9UDyDRO6c6B7dUpEwrJMuIPRzqWVSslOsWcoQHEbRkeX2uyfvyDcIiLdWG%2FiNHCvHyAV0nHNnutcJiIp4nWJBJnz20OjKpdGHc6x263Cnh1zvsmJxzuVgti34OIlwMT5xdc7dQCnFjHiWDF3A1%2BHwS9uXEyb0jcjz2SB6HQIDbbRPiU5e2foMj%2FAKgB102J6JyFQETXKRk55AgDoGYg%2BLqjf%2BUIRlYPQ%2Fx6K6oUE3yr1lKPqB8HConGBoEpFo6aD4LYcGeEBZZOEjk0C6EYSEiImRiBPiTxl6dipkd3s%2FfBg4f6KsxEzZGwCUQX9JidSV1T%2B6pYHab%2B01DjK2cJzk49UAGlAggu68HKAsyanlGJBjuWWzvXrtMSQGG%2ByxdNbnP%2FALXn7NTa%2FwBEsXtmVblwvjWeBsEjqAAHdelzYGcZ1xZ5RID7ajqsvYhKOHxkxIloxBcH4Lbd6ZgnYBaHn8ftVlFkLbr4ltOMIk7htyyBi9vys32rbLAbsgxlOTRhAy0MiwkeIXYtsrLaFh4Df7Vz6JYc82Mb6pwh74jZaTyYEtKcYji7DomejCqdtfb8ieBRVzp9wPcZy9QOnID06Mru4zMM%2BVfa48sYf7Up1xlYxO8tJKGTfZHuMqsaEJUiY4zlAGcoab%2FUxZW92jmZWbZZgRsx8M6xpEi0R5zlxdSeBPu3v5WRGzDjLEx%2BEQaRMgAgMSTMjc6qr9wZFtltE8muMJmqIjGEYxHGIEYlotuA79VR3PFr9ys5NkaDGDCNhLkHV2AJ6rf3jt%2BVfbSM24%2B9GmtifUfbMY%2B2Hf8ApbRXW4sqbS2WPOG0n6SB8lTdZ6SJT8mWvOwq8OUY8zIyG5YarFR27IybDXUYkgOST0XS7uU0xVuDRRk2mJjyYOzt1VOTCNWZZCIYROg%2BS9Dg9tGLSIxIMpsZz8fh5KjNppqlYfbEpygZcydX%2Bn6VjPLpjhwgXMX8%2FP8AipSsI9IHQKAOseu%2F9tVCy0iTfBWVnCcpnqfsUIfWPiVWbZFTgQeLfUXdLVkbsfEvsxbcmEQa6ieUiQG0fQEh%2FkFlseQgQNTtoydTGsg6fMqFv0wboorXVVf7USB%2BXAiUzp1LDXrupZ%2F4erxCz12TEa4D6ZFyPgVozvwf6RohUceuNnu87Pa4jnEyD8iB9IRxbFtnzcymAYa8g3X4aqeFbOi2UwTWD6TNuWkgQWCpc%2B1fqdx%2FPZTyTDZWwGJZOPKEa4kg9QJHRaJ3RlyNcDXCdhIhDYBgzrJ%2FyqHH%2FKG%2FxKsqhIUj6pevXjsNB9SVJ229rH%2F9lTZxkPzCOUjox10C537m9uHeLjWTIkQNmjNLiNBqX0bVb%2B2xI7lSeDD3C8jJ9T4RVH7lx4YvdoX1ZUZ5F7WSqg70gARjzntyLO3QJ5i%2BPu5FsiZmBkJcBxE4FxJuodlV1j%2FqXV7n2K%2Ft0%2FcjkU5mPZGdleRTIGMo1mMZyY%2BoeqbDxXK6hv6lSzF5bsLkecRKUHIHLkwHqGq9Phv7o%2F8Ata6g%2FwDLG%2Fj8V5XGMWsB47ByYk%2FiHQL1eAxvi3WrRg3%2FACx9nwVJ%2FpRVAf8AdqNNDWX0JH%2B2Oq86f0hhaYTmL%2F6SRxOvqL9F6SHGPeaOUmArl1Lj8ofYvNmmHs23i0m2MjH2eD6EnXlt8lmLsuoFJFPKYnMzY1ylKRYEMQI6F1bdbTOVFdOL7MoggyESDLQ%2FhmTqqMXkPbfkAZNqY1xJfwHqkrrIYgvxoVRaxpC8%2BqUSWP0vqzdFUimyuXHjMyiDpJ4wDf8Al1WGFceFlQiJSJHG1yGAdw3m%2FwBy6mRDEPP2qzCLaSMWltu64svTI8ToVUWfpZtYTOEfbjyLyAJ1AaI6nXZFdP5U75N7cXgOrzMSQGcH5qMazIuXJJ%2FipShGDwP1DoFFVxjIgkBxHWR8Oi101j2TkTj%2BVEisych5SBLb7geCz1REnB2ZaLseE7o1YJsthIQPGUWlz4jmBGJLgSdvJDDdGum8mGLCyzCrrhdlF48oiO4lLYPMsPjs%2Bi0S7B3DtluJl5VXt0ZVUbseRI9UJiTMN%2BmqyUUdx7bfbROFlFlsPbtpIIM4yI9MgRs4Xre8ZZuxMHHlZfbVj49ftfqBxNcuJE4R8Yg7Fc7viyS5y6a%2Fjtl2%2BHjcsRF0uQi%2FGPEycF%2BQ%2Bnjo7ePRdygxFsNBrMa6riZnue9P2z6OEfcAI1jyDb7%2Bpl2sc%2FmwBf6x1W2Z5TzmPcqRGLf9PLVvbi3GXzXIgZRowyDr7k%2FvkF1s4n%2FuNZj0om5jLkX4n8UtFyY60YT%2FAPuSb%2FzBES%2Fcw%2F6qhhp7T6AxG%2FnqVwiSS5Xq%2B5ZNeJn42QIQushEn27gbapxkDDjOJGp10Lry04mEjGQII6FWJUUAE7IXSxu33EUSlKMYZBMYyJ0h%2FmsYExCElvTn%2B3JEoSgWkGPgupZjQwhdVnc6sj2o243ARlGXICceX%2BWUTuFzhOEpGVryJdy%2FVD4uZysxLxj2QtMRLhIS4kkOxdnjr9i05fcKcq2y6ON7NtkjIy9ycwxZo%2Btzp8Vj%2BmP5bES%2BpwCfk%2BygYFjJ3bdMeVzVs7gYyiw1AGz9X0fZUBnBIcdR4phbq%2B12WYc8421wjCUYmsyAn6tpCPUKWyd%2FQmtvTC3KXoG50G%2FyXTwuyZ2ZXbdXACumPuWWTIjEDzJ6noOp0V9eHZk42JDnXGeO8RxDSMJSNjzPUglh5LSJf8Ab6pV8RMT9MnJJIJdthos3fnE5a%2F6t7rn%2BP63n%2BzZ2yyPbcD3sWmyHcI%2F9ROyE5A%2B1H8XHZn6gru9g7%2FifumqX7b7yJW5eVOyzG7jYPclAtzERylyH0t6d%2FBecyOz5XcYY9%2FbMK2jGtiIC66TVme0jGbAcQVwsuq7teddi2Qr92kmEwJRui7M8ZxcHxBCzrJc883n6O35Nrr6yTjXjjqu7k9tjTVlHEplIVzjTbZx5gavyi%2Bsf5rg34cKiRKbT6RYffqtf%2FfbP0ZpMQcjkPXICUZQA%2FFrusQz7BT7JhXLVzZxHPppy8NFrWbTtnfb8VxieP7iUYe5GPL0Q00Adt9fFXi3GgYvAWBw4mHBHUaELPbnTmfTCMAzEAb%2BbrPzlsdR5rWL5c7trOufsdnATPt6R6A%2BCgpysEg3AA%2BIdQVZoQhCIEIQgEIQgEwxOqSEFgrEnY7KUKdfVsqoyMS4V9dwkQJaFWYS5beAljmcun4R8FqlRTRGJryI3zuoE7Iwf8omRj7cyQPV6QdPFGLTVbi22WyaUGIjs5ZO6rCqsMMK6V4lRGVspR4iNhPqrD7tpqs55s%2BGscZ%2BWOca5ZNXuTECDFnB%2FktfeWnc0iIhuqxyFX6ioWkxLx4kB%2Bq194MZXHmWi3gr8JHa%2FboAxJiMoyAlvEv0Gi6dsmm%2B%2Bi5X7ZjXHDsFcxOPNywIbQaarp2k89NxslVntn9PpO%2BxLBczHzIR7lGFuPA48bR7vHWZg%2Fq4mfIA%2FJdG2cvT6df8x%2FuZc7CzMmnu1c5UQuxa7gbKYwYTiD6oylEctfioqWWc63Ls%2FRmyONyBhGI2i7sZBn0UsmEuc42WxqjbCMZRnMA%2BmXPbU7qOdXdd3CzI5CimU%2BcK5TEYx1fiBIuyh3fIoy%2B4Sze4ZAlfbrPjEyMvs4xUk6M94af3DHj3CI71Oz9X7cCY8eUuPEcHMj%2FSzKXcf%2BjvohVk12QNQnKwk8ByAlxOg1jsVjz76RbCdlU7p8HiSREMPFnVfc7ImqEjxj6NYkGQGo%2BJKF8racaGVbZOy%2BNxYyaEeQDAFg6txsanHlG2NdlU7QRxmANB4ss%2FaSDTcB6hwk%2FH8uO3X%2B9Xx4j9MIiIH5mkbOY6bnqrymI3RPoh8BvodlzO4ktMsePt%2FwBIIfkOu63QP5cPgNvgub3GQJmzP7ZZyQdx8kHEtuNtgsn9RGpPkGVNs4ECPAAjefUqcOMra4XS9uDiM7G5cQdyw3ZWdwqqx8m2rHlK2h%2FyL7IGqU4dLOBJZ%2Fir8MsQVkNwFdbZbbXXGeorHGDRA0%2BQCqhoQira%2FpIf4B2%2B5QtJ4xffwV1Q%2FKnLjoNz8VROQMR9w8EE4H%2Fb%2BJ%2Fit2RVO6cIVjnIwcAeADn%2BC50X%2FLPQO%2F2rr142TmZMKMMgWyqkXlIQHGMSZayboluJkYxdKuE4hmMo%2BZ0UR%2Fs3aHUj%2BwUZwI9yBA5CQBAPUOpxL1XAgjWP8USdtVs53exdNuUqnkwAcueg%2BCu%2FUG%2BkThWYgSbiCw0DOVqxsPDlhW3ysjKVFH5MZluXrGoAOp6BYtDDSAYT8WZx96zmX7LMy%2FVvwK4Q7lD2uMgLH5iTyIPkuX%2B44kd2yCBrIxIl5CIC6HbuIz6WEH9zUgkyV%2FcLaJZ%2BRGUBKdfEggAy1j57Kr4%2B7N3Ozt2Ti41t8squ8UNIypgBZkRABiD6PSNHOpXnvD%2FUrsm%2Bd10%2BUpSEZERBLgB9gFSzEf6vgmsxMFua14vICxiRpuJiPUdTsvW9rAOTCP4jV4u%2F5Y%2B34ryOOzWDTYbw5dR9q9f2Yc82kH%2F2z0b%2FAJX3KsztVN4d9pBBI9ssNP8A2h06ryYMx7sAWhMnlHUAtLR16%2FOiYfuGEG2qd%2BL%2FAPJivK88DhbA%2B7GwzYTBBiIueWm77dVnXqNbdtGJTZXbGss9VvCfAAgSBYtYSzabhO6%2Bd2TRCyUT7UJVxIm5ZpH1GI313WeN2FQTwmbJRP5U5A%2FI8ToqBdMzjISJMdiGDaNoy0zl0MLH%2FW5NWDXZTCV8vbjOycxCJlpyM7GjH4lW9y%2FbJwMeN4zKMiwyNcsemfOyMwWIaL6eB2K5hstd%2BUpN0kXC6%2FaP3BPtdF1EMWqUrZRtheYg2QsrEvaMCfp4ykJaeCuEcOs8C8dWILHyVYiJXes6SJcqzLusysq%2FJmRzunKyfECI5TPIsBoNSrsWiqVZ988dfq8NlLcN6y24e1%2FZv7a7Lkyts7zfZTUIA0yrrlISloT6jEjQFeqxf2tj4FlGb2ePu38pybKiIGVYsMICI00MNZLz37MlnZvZ76xXOccW0Gm4mXAwIImBFmcMNXXoM39w5X6euomETTEwFkfqA8yvPttrnbTe%2BPD0a67ft2%2FHrJi85%2BGXuGRP91Z8DXjDIlg0yhxYRHtA8jq4MuOjeHmvK9x%2FcNXcZRxgSJRgKoxJJ0gPqeT%2FAFM66nce8D9BLBxI%2B1CUDDIsiBzsBMZNIsV4fHjjwyqhTzMmlzMmYaS0DeSz%2BPSW%2B1zx03%2BTa6a%2BuuMXOUcwj3ZuA%2FGLPHkfqGxH0%2FH5LtUf7tZ%2FzjouLmAm6RBAAjFw%2FF%2FUNh%2BJdnGIN1eunMPqvR8PNO6s7g57jX%2F9iXpkP8p%2FBFcuqMp0YUYRMjzmSAHYCQJP2Lo9ynTHOieQBFMhuQG4yb1HVU0YVw7bhZglEQ5zBj%2BJiXdtm6bqp8pd%2FGRVbCqQnGMogyBZyY7OW0I8AvO5EQTGUSZEvyfpqvW9wv8A12MKJ2muoETFRYAyA4mb9CxZc00UUxrwa8U2zuD2SJY%2BovBiHbTZ05k5iXFvF8eXn%2BBcAllshOdMRESIA1003VEowqyJRl6oxkR56HyVkJi68e7KXCchGbbs7aHVXOExluM%2F1grvutAsriKhyeR4w0j9gUsDs2R3jMNGLETkBKy2bcYiMAZS%2BbDRX9hw8S%2FN%2FSZlgjXyMBceQEWJHI8QSy7Xcp3dj7rkY3ZbYTwceUSLhFjZyiOQly6uSFjbfuTv5q6zmS9fDgfuvtOD2bu92D26c7caEa5RsmxLziJkOG2dlxaomyYgF7y%2F9u5XfO35XdIX88iNkYwxRAPMGJ9Ql5EMQuHb2m3s0OWTQLMjeVYk5j8WdZ1%2FJMSXt1%2F6rdr8Tty8bt%2BTZkiqqsWSJIiDqD01WyXZMt4wnKJIHExfUEdCtGF3bH%2FW1zzMc41MpNK%2BosR9oZYM%2FuGTXK%2FEqyIXY87DONtTufhOQjNtNir%2B%2B3xGv%2Fq11zztc39GnMyrseFeFKMYSxwYyMICEj%2Frl1W3svfu0YE5HuHaxniQAayZaJBfnDjwLt5rzMsiyVYrkXALgndON5AaURLwW%2FXXGK538u9uZX0ef707Wey9wwcOGRQbreeLRoaxFvxylyPpkHH8V85vkbZykRqS7%2BKJ38pmUICETtAbKE7ZSL7JrrrOmdt9tpiqyCN0KZsMgxZQVZCEIQCFIQkQ6iQRugEIQgEIQgEJkEbhJAIQhAICvycWzElGFxiZThGyJrnGwcZgSGsCQ%2Buo3CpjIR6Og6okY0Ev6tN%2FgtMzhkRGHGwT9gfqTYQxt5F%2Fbb8LNvqs0CBQQ%2FqcMd9guhn5Xbcm2A7ZiHEhXjQhfykZysuH12eQPgEXw5kpVDIrFolqYszfzWru%2FEXH3HZujLLKUIZFfOHIHjqC3Vae7ke8ZTBIboU%2BEdn9s%2B0MOz2SZDn6nDasF0r35uNzsud%2B3Y1xxJ%2B04Bk5Bbdl0LiTLQ6swSqy2ymOLsC%2FXU%2FeuUau525T87PYFnpj9MWD%2FBdO3mWEZa%2F5fD5Ln04%2BXHudN9VhFoujKgGfq5A%2BkQjqXfZQRysOk5hldbCuXpHAkyk4YbDzW3OwK6crJhlCU7sSAlMV8THdgOYMgqu40CGTZl50p%2B7K%2FwBqz0jl731SEuRBfx0T7rOGHl2Y8BDKAAHuiUvbl10DRdipc8eGpjnyO7Tqxr64YghkxNcT7tkT9Ri8o8ZHodH6qPeJ0Xmg0wnjx9uEZRj6zy052ANHc9E%2B5zsnfXHtInGk1xfQGXJvWeQAYcnZZO5c%2FahGzWQhq8vU7jc%2BCf8AKVZ23SN4mdBGYjK7Us24gOnirROBGLxMT%2FuCJFfDw%2BkfzVHZouZ1xIhyBHKHqZxuZasyvyPchZRGRsLGwPMhyNGJ208Ar5TwujM8I%2BLdVgzpE8hr%2FtnYhncdCtchKk%2B3NhKHpLFw4XPyzylIf5Czh%2Bo6qozZefXKjHw4wpsrrr5TlCr2pe5MM05fVPh0OyDhzPb6%2B6zvFkI3DGlW0jKA484kmWjFiwHgofosWrKxoX5RGPbGEsi%2BFcpe1y%2BqPEtyMR4KOfl493CnFx400VAQjKPLlZKJP50%2BRLSmNwNApMdz5LnPLs92z6cTs0O1YOJGGNmT%2FUDuNvH9TkU1yMYCcQZCsCYOg3ZeZEogjXZbcPtOTnZeHhUyrNua3tA2RADyMPzCS0Dpseill9kyMS7OonITlhTNcjUDZGZEmPGcAYgAAlyVeIdskLWhKPJgeninKugYdVwyBK%2Bc5RniiMgYRA0mZn0nl4BZ%2BEnZlZl4tuHfPGuMTZWwka5CcXIfSUSQd0FkL5wqlVGRELG5xGx4l4v8CuhDIqx8iq%2B6HuVxhrB2dw3TwXFXSumI%2B1MgFojQ6jZLMwzi5PlVImcotWZjlxOrHVtU5xoGNYYP7hlqNG4%2Fh%2Ba0YNVeaJUQo922P5kteI4RGuqxH6L4kAMR9rrPnHwuPPy0M9WM3Ss6f%2BIqcBKFeoDmY%2Bo%2BI6LRi24ccKoX0iy0RBrk5DATPIFj1CL7K7KBbGNVZlZKPtREniAxj9T7vpr0VZnbTgGr9fAQIB90NFiS3V5Jd2srrycw2ct4%2B0AIkGfCH1fibi6niZAjmCmIiBZZA%2FSHBjr9W%2Br6rl99vlDu2QwBEhEEEf5Qp21evux04eRkwyMmuIFNI5WTlIRHUiIch5FtANVSQQYuNzorBlyljikgDgSQQN%2BQALv10VJmCYkEkv8AYtRl0sXBzJ0yyIUTNMjKEbBLjEyg05xB8YxLlev%2FAG5TOfdKYEawqlyD6%2F7TfNeTx8zNjjmiF841QlKyEOLgTkBGUh4kgMvYftETs79hRkSecJ8iRufZlunOKvGWfvP5f7pNegAqfUn%2FANmPhsvn9n%2B5P%2FUf4r6B%2B6LzT%2B8rImPERrgIlwHEqItJeAnF5SI1BJ2%2BKzr1Pou15pxiZAsAeIJLllqpq45sI11GcDMREJkF30YyDR3VMMLInjSy4weiFgqlY4YTlEzEfHURKnj4wsnxlPifwhtz4LSPcdt7FVj9qs793jEI7dzFVFtM4k%2B6JRLWRcniY8hp1XnsnEsFbnIgBIuKHeUQQZasOmy50zdWJYspy4xk5rEiYv4tsirFyLZNXUbH122bq%2FRT1veV9p8Op2LsPcO7dxrwMPj7lsZylykIxEaxylKcugZY7MEHKyaLrRAVCUiIDkDYC3AN9jroY2DnCQtjYapENIxLaHQhwu9239v125FUbpDhZU5nXEzI3YER6uFz3%2FLJ5d9fw2z2xxJlyO0d3z8KmXbsGyVdWR6ZwB0kOq6Hc%2B6TuhTjGsc8esVflhuRcyBn4n1M6tp7fVi5vOESOI0h1c6FlpuwfyZ58aiKeXGVh2Mh6xH4mIXnu2t2zJ3%2FAJen1s0xbjDhd%2Ft7ee19sx%2B3WWy7sTbLucHIhHVqoRBAGwfRcPCyI1Q42VgS5E%2B5q7EbLod0wsqWXdkVQLY9ZvtIiYmEOfHlLyEpAOuFZOUyDI7Bl6tJPWPF%2BWWb3Pi%2FLVbYLJWy1HpjGOgLkSB1fUbdFfX3O2EnEA4LxPmsFMo8bOQdou%2FzGyslACcYg%2FXJgfIh10xHPNRsNl9nvZE5WSJ1JOreS64GDbhDHw6rv1UbJcLZTEYzqLkcog6Sj9i4hmxZ1pndOtoWAx0iQ%2BhYhxumJU5dau%2BvJyMSF9MceGJGNOSYEgWGLj3Jb%2BrxK25%2BfjzzLqMeNfK6MQcnl9TAH%2FBeblMEHjLdFeRbj2i2AjNtnD%2FanrIe15X5%2BBdC6sWH3LrRy9I2A%2FC3806cfHiYi6E4z5NodXGrMq7O45c7Y5FkgJ1v7bDoenwVf5t1n6nnxskXMn6%2BKl1z1WtdpO5l28quq66N9c44syG9uNRjHQNy9JOpbVSwq8iy22Fs5SruAF9ggZANISEyBr0Wnt2eTT7lwNsmIjdIR4gnT1cv5LrY9vZodq7lZYBPKNf%2FAElgnKuUZD%2FIARIE9CvPbc%2Btj1%2Bun7d%2FmZwzW%2Fuo9rw%2F0MZzpsZwOA9US%2BoI1Dry1neO4zyRmY05VEMYSj5F316rn5U777jKcjM9HLsFGOTOuPtbxAIb4rpr%2BPXWdOP5PzbbX%2F4yccNp7z3Y5McmV85WRv8A1gjIAw9%2FrZ7ZHFz101WCQjYbbZtEyJIEQwcl9B4JC%2BY2VZJO5ddHK3JFCEIgQhCAQhCBgPorIRA1O6ri7hXOrEppaHQh0bIVQaEahRMBLXZSQgXCLMftT4x8EOg%2BCBsGYqucOoU30UZTbbdKRUG6lMhj4pKXImIr0YEydg%2BrDfw0WWgIyloAT4AapMrISlCQnWTGUS4lEsQfJK2dlsudhMiwi%2FkAw%2B5VHRi36cxD8n0kPgtd2XDKMRDHrxxTjxql7YP5k4nW2ZP4pPqsYJOPKA2J0ltsFuycq%2FJEDdAVxqx401iMBAGMDpIt9RL6lZ8tTqufOfDIqeAmHHj%2FACWruxEbySOWm3VZp2GF1fEA6h3D7q%2Fup4XFgJFtiqjs%2FtuyM8WwxiYNJmJd9F0b25%2BAZcz9tzFmNb6BAiewfXTfVdHIbk3RkqstonIBiSOvQfyXIEKK8z3TfCNnuPCMCZSEn0%2BnZdS6ILE6a7zLLn4%2BLhXd0rrsyBVKy6MTPiRCBJblI%2BXkFPIWTbjRy5SsqsvuLEknjFz9pXRNlYx8oCuAyuFf6WQBkXMmmNX%2FAAqvuMMXFyMiuqMb7Kro113k%2BicNRziNPDRbMjJrl%2BspwqDXRfCH6eRIMqyCOTzaO%2BqzbxxnudNaznnH3cnOx8i41yMzCuMfzBKfAH7Usj26aKRdxtiIEOxZ3DFae9TFt1M%2B4SjTP2YViIixNcYjiRGAA1A36rP3qj9NVjQhZGwTqjYJVkFhIRIgf8w6%2BCvj7oq7Xk%2BxM2VyAMHkCPREEBwfNWdzzarciORXLlAzmRKUjKRJESST1JK5VNkokhz1Yy1OyhaZ2QiJS2JZw2%2FwVxM5ZzcYajngAAOSPFVHI96xpkiJBGhTo7RmXwFkQIwOoJO6143Z4HIpqybRGMyBMguQH1aI3ZXMML59vxa8GV7yJMCYgy0dtFxqZUT9w5PPlwPtCDazcNyf8PwXqzRR%2BnuxwDZGFcxWX4sRpGZfw8Fw8quqnBnx9REgDPr8FJVrmRaOvFyD8Frp7x3XHxsjCoyrK8bL%2FwDyKYFoz04%2BoddNFgNgUeZJ8FWeWzD7l3Dt0rJ4dpqlbCVUyBEvCWkh6gWfyRk5Pbp4GJj42F7GVVzOVlGwz91z6AK2EYCI8N1n%2FT3TJ4HkIx5EuBp81XOBgWOpG6Kl7xNAoEIMJc%2Fc4j3NQ3Hlvx8lqtAl7cZHiOIeSws%2By2SiZCJPSICYSoxvso5SqnISkOLjTRWU05NsZRFR%2FMb1HQfeqolphg7F2%2BC1jPlAt7JZ9NdUWJke1CmqZYgEFv8AUXRyiK2hLQzG4c7HZNpXnnIGBDkA%2BZf%2BaYonGBET15eJ2V9bjM5Zzjbnhpw5mWdAiUmFgYH6QzLB33XulpOjiP8A6QtuIDDLiZ8iHBd%2FSNRusnfYSPcJWE%2BicY8JHbQbKNOfOcZRjGMBExHqlq8j5qEYPKI8Sup2Ls2X3%2FuNPbMPib7jxgZlgPiV1%2B4ftbI7Xb%2BlnCd0rJWxqmI8fcjVZKnlAayaXAlZu0g8%2FUZe1bMQeuDCUuRABkTxHzZd79t96ji90x7TbVjmuuyEbsky9qMpVSriZcBIkOdmXRjOfZ8TlmdhxbpXzhf7l0TExjGPICP4dRN2XkcydWRZZdVTHFrIeqmBeLhoy1kX6Ok2yYxitnfLZ5Pc5ZZyBbVcRCOTDkYHhGInwEmnxjy2%2BSrt%2FQUU3U4JtyL5iqcL%2BPCMQISN8fb1P1M0n2C50R6XYk6N4L0%2F7O7NZ3PKtr963FlZA1CytvXXaJV2R9Q1B2V4k%2Bh3fq4OEPflZXdf7VcYTsjyBIlOI9MPTsZbPsp%2BiDSEnL6nYL6Dk%2F8Ax5%2B3MW6eFk%2FuD9LmRAMqrq9AJB4kkMNQvP3%2FALUwZY0Le1d5x826VhqljD0yDcjzBJ%2Bn0pNp8UutebopsuuhVRGVlth41wiCSSegC9xhftM9r7fbnd%2FyJ03zrl%2Bl7XVI%2B5M8X%2FMbWPHdl0f20aKrodu%2FaeBCfcvZjLJ7tnFq9IiVnGE9mMmC3Z1NeLgZNODlf9y7%2FmgYmfnzBEaIw5c41c2MZFmHiNlNtvsuuuXl%2B0wyO2U1W5VF36DPkRi5NsHjMxeMuC9Rh5ox5g0ylOYHIV6cTGJDxk%2Bux6Lo5%2F7azu3dgwaM7uPOqm0zhURw4RlESiP8pJd%2FiuHRWbu7cu3g8a5loTPIVwlL0mcgPpA3Xj%2FLJd8z%2B84e38O1v48W%2BfH6Le%2BZsMidcMWDVVw485QEJuSZSifERJ0JXG%2FceVX2nHwqYiz9VbWbMrHt0iC7QnH7wt%2F7kunV3KU8mcY03zlJqiIwEhLjMcd4%2BqB0PRef%2FeWZg927lj2YOSJwjjiuTylICQJPF5a9Vv8AFpmzMzDfeaa%2BuvF%2F5eay83JzL533TMpzAjIvvEAAA%2BQZZmV1mLYHZpfAqiVVg%2FCV7HhvNttyNEwWIPhsqzyHQhSq5ymIxDk7BkymFkaxKYE%2FxOVoyrr8mUfeHvShCMQ%2F1xriOMQP8oC34GB7PcMM5IE%2FcjOfA6txAIf7Vk7nOUc2wQL%2BiNczWWLcQDHTceSjXUwxkUBgZWR%2BT%2FzSMadGvI%2BMSrBNoBsgxG3GQJb%2BKXuSP%2FOrl%2Fqj%2FgjKForjJo28z4AEAfatmHXCziJVTulrxhAsH%2FzHwWXIlIkAzgf8sA38lrwuJiISNh5uPar%2FAB%2BUi6o6OZfcaaKuUCIQ0FQaLv0%2BGy6HZ%2F2xmdzhPJsupoopkYXxusEJxeIIlxOpBfor5VY5x%2B3Xc6rJiPG2qofRwmTEcuuhX0DveT2zI7GO5UYcacfLhGmfEQAFkHH0j1DbfyXC7YtmPL0fz0mLZmYl%2BLHxnKxpUylbVOM4g8ZRG7j%2FACnVlzRGM7QJkxgZDnIByATqW0dl7GJxKjOFY%2FKs4%2B9XJjyjE8m5dGK4HdMSivKvswhKGNyeoTIJAPQkLWm%2Bbjk2%2FDZr7Zl58f5cy%2Bk0WyrfkBrGbNyidYyY%2BIVS2ZYkZgyD%2BiAH%2FlCysWHwdbnTjtMWooQhVAhCEApiIV2HhZWdd7OJVK%2B7jKYrgOUiIDlIgDwAdV9WSFyYYIdJCrJuhJCoaAkhA3R5pIcBAnk%2BygXJLqYl0B3Tnj2xOo%2BwuoqpClwlsyDCUfP4KKi5CbnxRr4IJQdJ3xyNoEhyfgt2TLuU40y7hz4DGjDDMww9gSlx4eMX5arCBKVB1aL6jforRbbZy92wz9usVwEiTxiC4iH2GqeQQnwyIEh4sBqH1Uu6SMLpcdS3ULOfeORA1ONtlo7mZe9L232%2BSGeHW%2Fbdk7Ma0yiIkTA9IboujefW3kud%2B3J2yx7fdOokANG0ZdC%2FSbkaMlViuEQxLR116n7nWCMsIZojONhlKwCyewiCdSw1LLdZxDPoH2jqft0XPjfRDNEZ47x9we7OUnJi%2Fq4jbZBozrLYdxto7c0scS%2FKtMPzJRfSUvqbRb8ns3cO%2FZFmXh43t41UAboxJFcAAx%2Bok6s65%2Bf79%2Bdb%2Bh9yvCJeuJIDRd4iUvSCW3Xas%2FcGZgZFsMuwVWXxErMfgwPp4g8IiMR6WWN7t6%2FsxdvGW9fXP7rifoV%2FZv1ssifdMkxvxMH9VVH6pWQiIe3WJOWeMh8F57u4rjTRwDAg6Eufw6OunnXnBsrhTKOSbqA04yPECYEvbOg1GxWDv1ldlGGaKjD0cbYk8gbABylHQN8Emc%2FplNsY47cOEuL%2FAD2UozcEDofiqjCwjY6bq7EplLkwO4WmHqcSQ%2FR1f6Bp8lkGSK8miUJAHkABXF5u4%2Bkrmz7rOmEcWAeMBxlLzWOWRIzEndkkHas7nGJyIyERMRs%2F3SQeXk343%2B9ci%2FO93HNLayIJbQaLLZYJF2Y9dX1UHVCZCkwYa79FFBphdEgA6KUrIc3JcHX0rIFODP5%2BCqYdGoY5aMINIhwZ6Kcow%2BmRAl4LmkE%2FUHbZRGx3ZX2%2FRPXnt3aI9tPCMqJcvx2mTufIaAKN9WKZk0iQj0JXPrvyIxEIzjx8SBopVZFm05%2Bk6EqY1znlqe2MZdEmPImEeOjOS5IVdl8K6zKJjKQ6P%2FcpYhqmJ%2B5aBGABA81ne29%2Fy4Gut5EkMXZX2kmJwmLbm8pRvNQGXdj8iSOAJ08iQsuTm25dhna2uwbYeS6mH2%2BzuFVdNJMpDi7h3csSB5D1fBI9qOP7uTZGu6vHblUTxlIylwiOG%2FmfJc%2FfXOL2363HHTn4E8qF8Z4UZe9EgiVbgj%2Fyr18e9XXZn679xyssyJcRAUTAMY8eBNjbRbpE9SvMnvF9chGMYVVAEezAcRrpuFzr7rLCBGcjCLs%2B%2B76%2FareeExMdvoX7t%2FdtPduyYHZsGqqNVcpVmRBEotxAJ5aRBffyXzvIhMZF0JkTnCchOyJeJILGQPUHxTN10oCEiW6qoyJ3lv5JJhOPh2O1Z1HbMeOVVZIdxru51wlxlTw9uUATCQPrBkdfBa%2Bzd6z8TFshj2yhCjlKiUWEoymNfV0DgFedEtQSH%2BC7cse7tVM6cmETi5J9N9bSk4iCRHUaMdU4%2Fq1rrbzJ129tlX5Gfgyz%2B5dvy7u6n2nlKp42VcItLlx0YP8AFcXsefD9rW3Rye3yj3jGmRXKUYzgIyjrFmbk5Bde%2B%2Fbn%2FwAkdpq7eMbJlk2flgCy0RJjKMeHAMR6dHXk8juuB3LNuuyTIUzlO08fqErDGRc%2BHpZLxLbj6fNXF2vrjj5c7E7r3C%2BYrsiKwZyulIaWmEomBh6XlJou2mi1Xd7n%2BplZge4arJwtEZNH1w15S4MND9LLnZmXScm63Hia5WyM5WCRMjyfl6v8z9FZHJ7ZX2xoi0Z4sBiQxr9rjqD1d1w22t8PRppJMX%2Brp5ndO45xOTlWyssLcuRJH%2BkA9NVRZ%2B56MP8Abx7XiUWRzbZmeRkn0iURIkQPUhmXMwe%2FSwMn35QhYTEw9uyPMAH8TONfNUW5uNInhP5EJrpc53mfMN9tZJPx3F8s2f3PI7hxlZbI8XMpSYkyP1SPmVz42cbInQ9SD5rddOqVcyBE6FtvBcbn628uu6764kxJh5d%2Fa3NuXUqyKhMEj7lmnCRkT4kqkEbe4GHQ6LXix96Z92XoA0FYeRPgFqWRmzaskgYjd%2FJae1QlbmRAABEZE%2FYq8oCFkwImt29LvI%2FHwWfHzrsK0247CxuIJDspbmcNSSWZdvIupnl087pY9ePDjZYB6msA%2BgHyC5N9WKciyNFkvaGtVsvqP%2BptlXbbk90yLczLuFl8zyslMiJOnQaDQBgAqJmAn6ToNpBSfU266xl0a%2B3ZtmLHKrlXKqUzSBKUefKIBPpOvXdV5eDm4Mq4ZdNcDbAW1Es0oHacTEsRos0bLIgcZQ8ddCpWW33CAsAsjXHhWORIjEa8Y66BVjnPhG7kCHEI%2BUd%2F5rZhzaPD3JxEtParHqn5P0WO6Ehr7QgPF3P8VuwyY0zl7wrAGsW9cv8AQW0VMutTbLHMJmuHGLCdUT6QPIr0%2Fce9U1dlOBiWRuqsAmQQeVconXiT0LrwV9sqsWEgOItLRA2AAV3a7%2FfrsE5GVlYHEdCOv3Lhtrz7T9Xr121sn47rzxZfjDRVf%2BaBKXpkevnuodyjV%2BmlGNwIEoiLR10J0dQyICEuUB%2BXLWPl5LFlT9yAj%2FTuPHzSTNljW1xrZSysqVcK6KZCUIxYzMdTr5uqBbRKnhN%2FcH4w32KqfKcxF%2BWwiqjoSF1kee73P9mmyOJENCZmdNWI%2FiqJcX9JLeaihVm3PiQJ7JIRF1GTbj2xupnKuyH02QJjIfAhVmTyMn1O6ihDPhLkUCSUSHHLbqp%2FlvohgjIBAkiUQNRqoiL7IYScK3Gosy740VGInN2Nk41x0BlrKZERsqhCQIJDhRdtPkUMfKXIeCgS5QmQB1fzCBJj4pJoJDkC4Ovipe8TAgvy04nT5voouCkwQwnG3RjESPirLLqJVCEKRGzrNyT96zoG7sSBqfgrlMOrXWZ4s7OTRidR8Qr78OWGRytrsldRC4CqXLjGZ0jNtpBtQqKpNTIykw6j5K67Hoo4mrIjfK6mNlsYgj25GRBrkTuQwOnis%2BWvDJOFk76%2FbcENsVp7kJG0%2B34bhZpwM769QD6W1bRaO5gytIjoG%2BCqOt%2B3BaKLfeMn5DjyfZl0ciTT8dFzv25Cyui0WOSZAhy%2BjLfkyPPQbDRKrHbIDi4J10ADD71gjlWV54EaYGMbBy0eUg%2FqD7hx4LZbIBiQZOeug%2BwKAy8gwhj49MeVeT70r4x1lFgBXPxDqZXH2V9ygcnOsyDxx8ecuUKTIiMAS4jEEmWis7yJVZw%2F7l7luWIRJAILgxBi8zy%2FCyp7nGF2fblZko1WTlzlVEagkkkCEWER5Kzugrw8oUjhlzjCJjcJE1uQJaMzs7J8Hyn3A8J4w7d64zribJTgDKMyByjF%2BWgPVWd1yMgV4UpVCuyuAgZCLEkf80v1L7qvOnO%2BNH6KMsesVRF%2FqaJm3qly9LA%2BCP3BPuNtHb7M6ZkfZgKZHrTAcKyGbT0lS9fcn%2BnSn3Ps1X7at7PDt8Jd2tsE7c8%2Bo8QXaPh4Ly8bDQLPer5cg1YdmPiVV7kxWYRlv4KhzM8eRLaqSdrZhCM4V3RsnCNwBeVc34y8jxIP3qqLO3j1XTo7bIw9%2BUxFwSAz%2FwAVzzb9bxEjMM5Go1BeP2LTFlSlRHgZxnyIkxDFtnflt8lSBqx26troux%2F%2FAKTNr7fT23Frqx6KozE%2BEAZWTsjKErrDJ3nwmYg9Bss%2FaJ9p%2FWP3n3f0vCbjHbmZ8TwHq0EeW6fPkkzcdfVzw6syMW7FNYuABtrjdERkJemeseXElj5HVasnJ7dPDxqcbENeTXzOVkSmZe6ZF4cY6CIiNFgJBOgZUOMjE6fYpQJMiogkMnDWSC%2BBjGUZS1ALkHYq7Itx7IV%2BzERmAfcER56OeqoYnz8kuJAJ46Opjz8NZ8fKXEEgGJY%2BC352BjYtsKsbNqy4mmF07KxKMROQeVPqDmUVziQNeTeSkDpun3JjnhfjTIFk9dI7rRGQlVZzewt6Yx6ADqqMUlrNgeO5VuPImu5rBCPVtyny14n3XUdwngfpsmFrmBD1w0kY7SAl000QO7V3XzhkymaJzlbZaAPcJI0Dy8Cs18J%2Fpa2hCEdNT9RWWuqVlggImR8Ihz9inrLyzbenXOF2WWFdkW9y9q8E%2B1ie2ZSmGJ3joPmuLLgJE1Px6ct%2FuUpxgJfWZMfpIY6KMYEl%2BnmrrMec%2FVLz1C5OHK04uH7xF1041Y4kBKc31%2FyxEdSp42JTk3Qrlb7MT9RIfXoIsvZ0%2Ftafa%2BNPco%2BzZlVSHb8aRjK2XIgTnYNRV6ToTrropttieSR52zHhiY8e4Uike4R7NUwY2SgZShzhGQ1AMC5de2qh2DL7TiVQxxeI1Sys8zJBnbCEoCMZgO0ZTdl4%2BPZsvGxcfLy4i3GtnHgOXqkOor%2FFxD6lmdexwsi7tOHTmxohPtsr5VSq09ZEeUoeoE8CCuO9lxz1fp%2Fh6PxSyXjizp57IwMLt8q8esylZb6tdOIJaLnq7OsgshB66ZychjBndtdvkur%2B7e%2Fx7vlV5IphTKFUKYxgGaMHb%2BK8zh9zGFmVZM6xfCuyNk6JfTMRL8ZSGoB8ldZdo1%2F2azvh6bnTj9pryTdRK60mIoEHshx6z6AeC4Xd7MvKsrtrpFdMIR4%2B2GEv8xHml3bvOPmZ36zBxYYdAiAMOJMoD0iMi8tXJ1U4dxpnj%2B0AABGMd9m0bVa0%2FHdbnHbP5Pze2t1lxOM%2FZxpG2J9Q%2B5R9yS32XQOnVUTET03XaPNyohaIk848vLoqgKgQZGTkxBIbQP6t%2FLZaDXHwR%2BmMh6XDpcEyqEzKXEEHw5BdHt0LISsBMaTOIDxZyH1GuyrEI1REaK%2BWRIPbMj01jwj5sudGd9d3ISeY26%2FaCsXnqt8682ZdCeIcg3%2B3bVSIV2WATl6pmpvSDLrLp4rkiMpSEQHkeivlzkOJkSkIxh9JeXj%2FAHKyVnaw%2FwBHMDUgnwBUTjTiHIU%2BcvHVS4mWvMOdTqt4jGaqjROQdmGznZ%2FBKdRrkxAcbsVbHLyaq5UV2yFUy8oA%2BknxZR9%2BXEAgaO%2Bm7qcHKB32%2Ba6l1FNWJVOMxLlEmYiQSDpouf78dOUBp1V%2BNLGJsstIEawJGrk0rByAlGBIIdtU4Sy8J%2FqsXIooxb4msVEnnHUEHZwstWUcUxnjSlGf4zsD4Km6yM7ZyqjwrlImEHfiCdA%2FVVrMkdffbi9WefLZXlXX5A9yZInvEbfYlOUuR%2BLLPXaay4Afoeo%2BC6%2BLj19wD0yAnCsSvhI6vqOUfFmBKlxOfDWuduM8nn%2Ft%2FueBhYvc76WwMtjRkxIlF5BwDxOh8j5%2BC49kDCZB%2BRGxXTtvnVAYVlp4g6VueIPi2yzTrIBiRyidh%2FckvybazwxIVhrMRy%2FDs6LYwjw9sk%2BkGRPid1pzwrQhCAQpQjzJHIRYEvIsCwdvieiigEITQJCZSQPlI9UEk6EpFCAQjfZHkgeqSEyG3QHLqAEOkhAJgkOxZ9D5pJgsg6WgpJlrJ9j8FpvhhwMRh2ztMqIyyOcePC0k8q4%2BIGmqyD%2FZLfU%2FXbZaLThEgYUbItREZBsIL3OeZg34dmU8qzWQE7q%2BUgNmfyW3uNE7bhEfiYD4lYZiBuhzk2zaLpdw903R3G3BvHpsrckx5d3A7F3LsMZ43c6JUW2cbYwk2sCNDojJJ5Bt16Dvh797uKO%2BCXIUQ%2FTSmICRgYx5CQgZbS2defyPq8NFJnH7uKu0ktk5jn3elvSHJ3lr9g2WM15lmWCJmMY2RNXI8Q4OnH5rdIn8AAl1%2Fq%2F%2BrVcuyEZZh9yzhL3Bx5CR8GZh4q%2BUdHudUpdyybe5mZzYykciDNL3A5lzkerqvucoU5Uau2y96BhExulD1uYjkGly2looZszVkWRlXK%2B38cpExi79RpL7VqzpchI9vhKGOa4OAYykJCPrLx1YychZ54v%2BGuPp9WfuhOYMaWQIY3tVRhLePMxDGZjqTI9Sp9yorj23EjK73TbATpMJBox1HCY1IOjsjusZEYh7jMiQx4ewAHkam9HgB81Xn14n6XD%2FAE1smlHlbzifTLUcIt9XpYur9flL5%2BjkGhh6enio1Y9xmDCPLxZaQceuA9sSuk%2F4vSPvWyPuHHsNp4wIDRh0HkytvxEk%2Baqvssx8IRA9bcCRqzrjmiWgi5J8l0rjMVjiHjyP8Fdjzk9cYVRZvzJuH%2BzdSLe%2B3GspupY2RMeWzqtdju0KzXGw2iNkS0KmJMgd5CQHEcfNcfV0jN7HkgjiWTG6cgx1LlURJJZ9WDBWQ1bXQdFWp17hkFkTxIl1GxVkrbJgQMnjEmQHR5M5%2B5VfDREeQJfVReV%2F5JoYxe7nv04N%2Fer84du%2FI%2F7cLePtQ%2FU%2B%2FwAX978ft8PweD6rGCHGhfyTDN80wsa8OFcpzjIngY%2Boq%2BiEY%2B4KY8izznIaR8lRhgGU3k3pKvgwhOVoJiAOMBsRp9RU%2BW%2FGrPlAGiJEJEje07fILLWbZScSIOwI002XRtFIprlkmZiT9MNIgfFbqR2GqQlS18ZGQEbTbExES0TMRjEeryKW2Tq1mSXaZrl0YJsnECJkToAASSV67N7F2vH7fi4s65Y2fGycsm2wvKcC3tcK9wG11VV1%2BXLBjD9tYsYWcY%2Fqp1SibXHJ%2BHKZs4ycdOiO05n7jo%2FceHbl9vpys2Le3Rk2VQEvTpylbMAFtnKxjfbnPq7XbXTjTX2%2BbHc7b%2BzLxfj%2FAPZMCV19lPvxy80R4CJ9MZ117AuC3LVa%2B9ftrLwqrZ5947jlZNEBdbLX2ZCz1RhI6zkG3V%2FZs794xyM009rybLLKJjFiLYRrqsM%2FTKJ58ZQBdmVWVmf%2FACPDtmdDuHbseyucWlZOdAlAe4HMRGzX1eSeu01%2Fln69OG22b%2FHH%2BXkLp2wnGM5ysFURXXyL8YR0jEHwAUDffKsTlyOOJEcj9PIDkw82T7lm5dmPgxn2yuqVUbBkTrthI2yM3ErAJHiw0D9Fb3ruGVdbRYe04uNVGFkJU410ZVSslE%2FmSlXOUROIIYeS53Xnm6%2F1ejTfjrb%2BiNmR28drjiW11ifuSuOQQTZJ4iIrkf6QuHkU4r6Dj8FVbO4iIsrIkOrggqqXIj1OF101%2FVy%2FJtz1%2FVVZXEH0lVNIFhv0ZaJGIAFceUyNZSIAHwCzQ9z3R%2FV5rq4p%2FnwDiB4nVyE67pSmBKLnoPNaYnKFegJh49FRQRG0GsRlPoDo3wdORZaLaIRnbHSbiI66a6rRiZtYYyB03Cl3AmVGKciIh6jpEv06rHZ7Zl6fSCzAdFi9YrvpMcyy%2Fo9BlWYl2JkgzML4TpljVxj6ZwIl7hnLxDxZeXySfekxYg9NF0HmzMW8TuoXfpjEg6WOHkPhqs6cfq6fm%2FdPjHywQeU4g7DdTkNXCmRHRpBugYqsuuseS9keQ8ECR6%2FNKXH8RSjwfRVDMgN0CQTlx6pFuuiCMz0CrUp%2FBgorLQQhCAQCQXBY%2BIQhAySS5LnxWmm%2FkYVkO%2BjrKrKuIeR9Tfh1BL9QfJS4a1znh0p4omA5YeP96rvwAYR9n%2FdA9VR6%2BcD1WmAnwjrq2o%2FvVNvLjr9L6fHyWJ7O23pjnDlkEFiGI6FJ1qyhLm159bbndvNllXRws%2BD3QgM3mg76FVCTQkgExokhA0kIUF2OIicZyLAH6nIAPQ8hso5EzZfZYS5nIyJclydSXlqVPD979RD2BEzf0%2B5x4O34vc9P2qrQ%2BXp0%2BxBFAbrshCBumCG1UeofRSaLSPLUHQNuPFBFSESQ7aeKipR5fh%2FsUH%2F%2F2Q%3D%3D%22%2F%3E&j=%0A%20%20var%20%24img%20%3D%20JMVC.dom.find(%22%23img%22)%3B%0A%20%20var%20data%20%3D%20JMVC.dom.attr(%24img%2C%20%22src%22)%3B%0A%20%20var%20maxErrors%20%3D%20100%3B%0A%20%20var%20margin%20%3D%202200%3B%0A%0A%20%20function%20update()%20%7B%0A%20%20%20%20var%20corrupted%20%3D%20data%3B%0A%20%20%20%20if%20(Math.random()%20%3E%200.7)%20%7B%0A%20%20%20%20%20%20var%20errors%20%3D%20Math.round(Math.random()%20*%20maxErrors)%0A%20%20%20%20%20%20for%20(var%20i%20%3D%200%3B%20i%20%3C%20errors%3B%20i%2B%2B)%20%7B%0A%20%20%20%20%20%20%20%20var%20p%20%3D%20margin%20%2B%20Math.round(Math.random()%20*%20(corrupted.length%20-%20margin%20-%201))%3B%0A%20%20%20%20%20%20%20%20corrupted%20%3D%20corrupted.substr(0%2C%20p)%20%2B%20corrupted.charAt(p%20%2B%201)%20%2B%20corrupted.charAt(p)%20%2B%20corrupted.substr(p%20%2B%202)%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20JMVC.dom.attr(%24img%2C%20%22src%22%2C%20corrupted)%3B%0A%0A%20%20%7D%0A%20%20update()%3B%0A%20%20setInterval(update%2C%2026)%3B%0A%0A&c=body%0A%20%20background%20%23382e37%0A%20%20text-align%20center%0Aimg%0A%20%20width%20529px%0A%20%20height%20382px%0A&l=#preview",
                'hotBox': 'hotBox',
                'inline Mobile Video': 'demo/inlineVideo',
                'Mobile inline Video Preview': 'demo/previewVideo',
                'inline Mobile Video inline Preview': 'demo/previewInlineVideo',
                'my 2 way data binding': 'demo/wwdb',
                '* strict': 'test_strict',
                '* obj/bucket': 'test_bucket',
                '* obj/deque': 'test_deque',
                '* obj/date': 'test_date',
                '* lib/array': 'test_array',
                '* JMVC.util.findRich': 'test_arrayOp',
                '* lib/crypt': 'test_crypt',
                '* FizzBuzz perf': 'test_fizzbuzz',
                '* Leap year': 'test_leap',
                '* loops': 'test_loops',
                '* array loops': 'test_arrayLoop',
                '* arguments 2 array': 'test_arguments2array'
            },
            tpl = '<li><a href="%base_url%/%path%">$index$ %label%</a></li>',
            out = '',
            i;
        if (!JMVC.util.isMobile) {
            links['inline Mobile Video'] = null;
            delete links['inline Mobile Video'];
            delete links['Mobile inline Video Preview'];
            delete links['Watch VAT. save calculator'];
            delete links['inline Mobile Video inline Preview'];
        }

        for (i in links) {
            out += JMVC.string.replaceAll(tpl, {
                'base_url': bu,
                'path': links[i],
                'label': i
            });
        }
        content += '<ul>' + out + '</ul>';
        content += '<br /><b>* real test</b>';

        // JMVC.head.addStyle(JMVC.object.toCss(style), true, true);
        JMVC.head.addStyle('/media/css/demo.css');

        v.set({
            id: 'content',
            style: 'font-family:Verdana, sans-serif; font-size:12px;margin-bottom:50px',
            content: content,
            index: '&#9826;'
        });

        JMVC.debug('0');

        v.render(function () {
            JMVC.debug('render view');
            JMVC.head.title('JMVC samples list');

            // JMVC.require('affix/affix');
            // var fromtop = 20;
            // JMVC.affix.add({
            //  html:'<strong>Affix</strong><p>Try o scroll, this will stop scrolling at ' + fromtop + 'px from top</p>',
            //  init : 168,
            //  min : fromtop,
            //  'class':'round8 roundleft',
            //  style:'z-index:60;height:300px; width:300px; padding:10px; right:30px; border-right:8px solid #888; background-color:gainsboro;',
            //  where : '#content'
            // });
        });
        JMVC.debug('0+');
    };

    this.action_demo = function () {
        JMVC.require(
            // 'core/lib/grind/grind'
            'core/lib/widgzard/widgzard'
        );

        function makeList (title, links) {
            var cnt = [{
                    style: { padding: '10px 0px' },
                    html: '<strong>' + title + '</strong>'
                }],
                inner = { tag: 'ul', content: [] },
                k;

            for (k in links) {
                inner.content.push({
                    tag: 'li',
                    content: [{
                        tag: 'a',
                        html: k,
                        attrs: { href: links[k] }
                    }]
                });
            }
            cnt.push(inner);
            return {
                content: cnt,
                style: {
                    backgroundColor: 'yellow',
                    margin: '5px',
                    'float': 'left'
                },
                attrs: {
                    'class': 'round8 pad5 respfixed'
                }
            };
        }

        function getConfig () {
            return {
                cb: function () {
                    console.debug('done');
                },
                target: JMVC.dom.find('#extralogo'),
                content: [{

                    style: { margin: '0 auto', width: '800px' },
                    content: [
                        makeList('Image', {
                            'Image filters': '/demo/img',
                            'Canvas Editor (WIP)': '/canvaseditor',
                            'Canvas editor (old layout)': '/canvaseditor?v=1'
                        }),
                        makeList('Google', {
                            'Streetview panorama animator': '/?map=true',
                            'Google': '/google.jmvc',
                            'Google flash': '/google.jmvc?flash',
                            'Google aberration': '/google.jmvc?aberrate'
                        }),
                        makeList('JMVC', {
                            'Model': '/demo/model',
                            'Controller': '/demo/controller',
                            'View': '/demo/view'
                        }),
                        makeList('css3 exp', {
                            '6 Divs Cube css3 tranformations ': '/demo/divrot.js'
                        }),
                        'clearer',
                        makeList('Console', {
                            'Console': '/console',
                            'Console atom (fullscreen)': '/console/index?fullscreen=true&h=%3Cdiv%20class%3D%22container%22%3E%0A%09%3Cdiv%20class%3D%22wrap%22%3E%0A%09%09%3Cdiv%20class%3D%22circle%20horizontal%20c1%22%3E%0A%09%09%09%3Cdiv%20class%3D%22wrap-electron%22%3E%0A%09%09%09%09%3Cdiv%20class%3D%22circle%20electron%22%3E%3C%2Fdiv%3E%0A%09%09%09%3C%2Fdiv%3E%0A%09%09%3C%2Fdiv%3E%0A%09%09%3Cdiv%20class%3D%22circle%20vertical%20c1%22%3E%0A%09%09%09%3Cdiv%20class%3D%22wrap-electron%22%3E%0A%09%09%09%09%3Cdiv%20class%3D%22circle%20electron%22%3E%3C%2Fdiv%3E%0A%09%09%09%3C%2Fdiv%3E%0A%09%09%3C%2Fdiv%3E%0A%09%3C%2Fdiv%3E%0A%09%3Cdiv%20class%3D%22wrap%20r%22%3E%0A%09%09%3Cdiv%20class%3D%22circle%20horizontal%20c2%22%3E%0A%09%09%09%3Cdiv%20class%3D%22wrap-electron%22%3E%0A%09%09%09%09%3Cdiv%20class%3D%22circle%20electron%22%3E%3C%2Fdiv%3E%0A%09%09%09%3C%2Fdiv%3E%0A%09%09%3C%2Fdiv%3E%0A%09%09%3Cdiv%20class%3D%22circle%20vertical%20c2%22%3E%0A%09%09%09%3Cdiv%20class%3D%22wrap-electron%22%3E%0A%09%09%09%09%3Cdiv%20class%3D%22circle%20electron%22%3E%3C%2Fdiv%3E%09%0A%09%09%09%3C%2Fdiv%3E%0A%09%09%3C%2Fdiv%3E%0A%09%09%3Cdiv%20class%3D%22circle%20center%22%3E%3C%2Fdiv%3E%0A%09%3C%2Fdiv%3E%0A%3C%2Fdiv%3E%0A%0A%0A%0A%0A%0A%0A%0A&j=%2F*%20no%20javascript%20content%20*%2F&c=body%20%7B%0A%20%20background%3A%20%23222%3B%0A%7D%0A.container%20%7B%0A%20%20position%3A%20relative%3B%0A%20%20margin%3A%20auto%3B%0A%20%20width%3A%20250px%3B%0A%7D%0A.wrap%2C%0A.circle%20%7B%0A%20%20-webkit-transition%3A%20-webkit-transform%20500ms%20linear%3B%0A%20%20-webkit-transform-style%3A%20preserve-3d%3B%0A%20%20-moz-transition%3A%20-moz-transform%20500ms%20linear%3B%0A%20%20-moz-transform-style%3A%20preserve-3d%3B%0A%20%20width%3A%20250px%3B%0A%20%20height%3A%20250px%3B%0A%20%20margin%3A%20auto%3B%0A%20%20margin-top%3A%2050px%3B%0A%20%20position%3A%20absolute%3B%0A%7D%0A.circle%20%7B%0A%20%20position%3A%20absolute%3B%0A%20%20border%3A%203px%20solid%20%23aaaaaa%3B%0A%20%20border-radius%3A%20250px%3B%0A%20%20margin%3A%20auto%3B%0A%7D%0A.circle.c2%2C%0A.circle.center%20%7B%0A%20%20border%3A%202px%20solid%20%23666666%3B%0A%20%20width%3A%20140px%3B%0A%20%20height%3A%20140px%3B%0A%20%20top%3A%2055px%3B%0A%20%20left%3A%2055px%3B%0A%7D%0A.circle.center%20%7B%0A%20%20background%3A%20%23ffffff%3B%0A%20%20width%3A%2030px%3B%0A%20%20height%3A%2030px%3B%0A%20%20top%3A%20110px%3B%0A%20%20left%3A%20110px%3B%0A%20%20box-shadow%3A%200%200%205px%20%23fff%3B%0A%7D%0A.wrap-electron%20%7B%0A%20%20border%3A%200px%20solid%20%20%23fff%3B%0A%20%20position%3A%20absolute%3B%0A%20%20width%3A%20100%25%3B%0A%20%20height%3A%20100%25%3B%0A%20%20-webkit-animation%3A%20electron%203s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20electron%203s%20linear%20infinite%3B%0A%7D%0A.electron%20%7B%0A%20%20width%3A%2012px%3B%0A%20%20height%3A%2012px%3B%0A%20%20background%3A%20%23aaaaaa%3B%0A%20%20left%3A%2050%25%3B%0A%20%20margin-left%3A%20-8px%3B%0A%20%20border%3A%20none%3B%0A%20%20top%3A%20-7px%3B%0A%20%20-webkit-transform-origin%3A%2050%25%2050%25%3B%0A%7D%0A.c2%20.wrap-electron%20%7B%0A%20%20-webkit-animation%3A%20electron%202s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20electron%202s%20linear%20infinite%3B%0A%7D%0A.c2%20.electron%20%7B%0A%20%20top%3A%20-6px%3B%0A%7D%0A.wrap%20%7B%0A%20%20border%3A%200px%20solid%20%23aaaaaa%3B%0A%20%20-webkit-animation%3A%20lateral%2015s%20ease-in-out%20infinite%3B%0A%20%20-moz-animation%3A%20lateral%2015s%20ease-in-out%20infinite%3B%0A%7D%0A.wrap.r%20%7B%0A%20%20-webkit-animation%3A%20lateralRevert%208s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20lateralRevert%208s%20linear%20infinite%3B%0A%7D%0A.vertical%20%7B%0A%20%20-webkit-animation%3A%20vertical%208s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20vertical%208s%20linear%20infinite%3B%0A%7D%0A.horizontal%20%7B%0A%20%20-webkit-animation%3A%20horizontalRevert%206s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20horizontalRevert%206s%20linear%20infinite%3B%0A%7D%0A.vertical.c2%20%7B%0A%20%20-webkit-animation%3A%20vertical%204s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20vertical%204s%20linear%20infinite%3B%0A%7D%0A.horizontal.c2%20%7B%0A%20%20-webkit-animation%3A%20horizontalRevert%203s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20horizontalRevert%203s%20linear%20infinite%3B%0A%7D%0A%40-webkit-keyframes%20electron%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20horizontal%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateY(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateY(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20horizontalRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateY(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateY(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20vertical%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateX(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateX(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20verticalRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateX(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateX(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20lateral%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20lateralRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20electron%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20horizontal%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateY(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateY(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20horizontalRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateY(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateY(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20vertical%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateX(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateX(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20verticalRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateX(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateX(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20lateral%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20lateralRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%7D%0A&l=#preview',
                            'Onecodepen (fs)': '/console/index?fullscreen=true&h=%3Ccanvas%20id%3D%22c%22%3E%3C%2Fcanvas%3E&j=var%20a%20%3D%20document.getElementsByTagName(%27canvas%27)%5B0%5D%3B%0Avar%20b%20%3D%20document.body%3B%0A%0Avar%20requestAnimationFrame%20%3D%0A%09window.requestAnimationFrame%20%7C%7C%0A%20%20%20%20window.mozRequestAnimationFrame%20%7C%7C%0A%20%20%20%20window.webkitRequestAnimationFrame%20%7C%7C%0A%20%20%20%20window.msRequestAnimationFrame%20%7C%7C%0A%20%20%20%20function(f)%7B%20setTimeout(f%2C%201000%2F30)%3B%20%7D%3B%0A%0Aa.style.width%20%3D%20(a.width%20%3D%20innerWidth)%20%2B%20%27px%27%3B%0Aa.style.height%20%3D%20(a.height%20%3D%20innerHeight)%20%2B%20%27px%27%3B%0A%0Avar%20c%20%3D%20a.getContext(%272d%27)%3B%0A%0Aif%20(typeof%20raf%20!%3D%3D%20%27undefined%27)%20cancelAnimationFrame(raf)%3B%0A%0Asw%20%3D%20a.width%3B%0Ash%20%3D%20a.height%3B%0A%0Afunction%20drawGlypy(angle%2C%20distance)%20%7B%0A%0A%20%20%20%20var%20rings%20%3D%2019%3B%0A%20%20%20%20for%20(%20var%20j%20%3D%200%3B%20j%20%3C%20rings%3B%20j%2B%2B%20)%20%7B%0A%20%20%20%20%20%20base%20%3D%20Math.pow(1.5%2C%20(j%20%2B%201)%20)%0A%20%20%20%20%20%20d%20%3D%20base%20%2B%20distance%20*%20base%3B%0A%20%20%20%20%20%20x%20%3D%20sw%20%2F%202%20%2B%20Math.cos(angle)%20*%20d%3B%0A%20%20%20%20%20%20y%20%3D%20sh%20%2F%202%20%2B%20Math.sin(angle)%20*%20d%3B%0A%20%20%20%20%20%20size%20%3D%20d%20%2F%2020%0A%20%20%20%20%20%20%0A%20%20%20%20%20%20c.fillStyle%20%3D%20%22hsla(%22%20%2B%20~~(j%20%2F%20rings%20*%20300)%20%2B%20%22%2C100%25%2C%2030%25%2C%201)%22%0A%20%20%20%20%20%20c.beginPath()%3B%0A%20%20%20%20%20%20c.arc(x%2C%20y%2C%20size%20*%203%2C%200%2C%202%20*%20Math.PI%2C%20false)%3B%0A%20%20%20%20%20%20c.fill()%3B%0A%20%20%20%20%7D%0A%7D%0A%0Ap%20%3D%200%3B%0A%0Afunction%20r()%20%7B%0A%09a.width%20%3D%20a.width%3B%0A%09p%2B%2B%3B%0A%09dots%20%3D%2020%3B%0A%09tunnel%20%3D%200%3B%0A%0A%09for%20(%20var%20i%20%3D%200%3B%20i%20%3C%20dots%3B%20i%2B%2B%20)%20%7B%0A%09%20%20%20%20angle%20%3D%20p%20%2F%20100%20%2B%20i%20%2F%20dots%20*%20Math.PI%20*%202%3B%0A%09%09distance%20%3D%20tunnel%20%2B%20%20(Math.sin(3%20*%20i%20%2F%20dots%20*%20Math.PI%20*%202)%20%2B%201%20%2B%20Math.cos(p%20%2F%2020%20%2B%202%20*%20i%20%2F%20dots%20*%20Math.PI%20*%202)%20%2B%201)%20%2F%204%3B%0A%09%09drawGlypy(angle%2C%20distance)%3B%0A%09%7D%0A%0A%20%09%2F%2F%20GLOB%0A%20%09window.raf%20%3D%20requestAnimationFrame(r)%3B%0A%7D%0Ar()%3B%0A&c=html%2C%20body%20%7B%0A%09margin%3A%200%3B%0A%09padding%3A%200%3B%0A%09border%3A%200%3B%0A%09background-color%3Ablack%0A%7D%0A%23c%20%7B%20display%3A%20block%3B%20%7D&l=#preview',
                            'Console cs': '/demo/cs/'
                        }),
                        makeList('Widget', {
                            'Some widgets': '/test_widget',
                            'modal': 'test_modal'
                        }),
                        makeList('Games', {
                            'Wcave game': '/wcave.jmvc',
                            'Tic Tac Toe': '/ttt.jmvc'
                        }),
                        makeList('Test', {
                            'strict': '/test_strict',
                            'obj/bucket': '/test_bucket',
                            'obj/deque': '/test_deque',
                            'obj/date': '/test_date',
                            'lib/array': '/test_array',
                            'findRich': '/test_arrayOp',
                            'Key': '/test_key',
                            'lib/crypt': '/test_crypt',
                            'FizzBuzz perf': '/test_fizzbuzz'
                        }),
                        makeList('Exp', {
                            'cubic': '/cubic'
                        }),
                        'clearer'
                    ]
                }]
            };
        }
        JMVC.getView('vacuum')
            .set({
                'style': 'font-family:verdana;',
                'id': 'extralogo'
            }).render(function () {
                JMVC.css.style(JMVC.dom.body(), 'backgroundColor', '#444');
                JMVC.core.widgzard.render(getConfig(), true); //, function (){console.debug('end'); }, 'b960');
            });
    };

    /* test a VIEW */
    this.action_view = function () {
        var v = JMVC.getView('test'),
            v1 = JMVC.factory('view', 'test1'),
            v2 = JMVC.factory('view', 'test2'),
            v3 = v2.clone('test3');

        v1.set('result', 'ok1');
        v2.set('result', 'ok2');
        v2.set('result2', 'ok2bis');

        v3.set('result', 'ok3');
        v3.set('result2', 'ok3bis');

        v.render();
    };

    /* test some MODELs */
    this.action_model = function () {
        var p1 = JMVC.getModel('xxx/Persona'),
            p2 = JMVC.getModel('Persona'),
            p3 = JMVC.getModel('Persona2'),
            tpl,
            al = '',
            v = JMVC.getView('vacuum');

        /*
            get model instance
            _p1.set('cognome','Ghedina').set('n',1);
    `   */
        p1.set({
            'cognome': 'Ghedina',
            'n': 1
        }); /* .set('cognome','Spaceman',true); */
        p2.set('cognome', 'Ghedi').set('n', 2);
        p3.set('cognome', 'Ghe').set('n', 3);

        /* console.debug(_p1); */
        tpl = 'Modello n°%n%: %nome% %cognome%<br />';
        al += tpl.replace('%n%', p1.get('n')).replace('%nome%', p1.name).replace('%cognome%', p1.get('cognome'));
        al += tpl.replace('%n%', p2.get('n')).replace('%nome%', p2.name).replace('%cognome%', p2.get('cognome'));
        al += tpl.replace('%n%', p3.get('n')).replace('%nome%', p3.name).replace('%cognome%', p3.get('cognome'));

        v.set('content', al);
        /*
            console.debug(v);
            v.set('id', 'nerd');
        */
        v.set('style', 'padding:5px; border:5px solid red; font-size:12px; width:280px; background-color:white; color:green; font-weight:bold; font-family:verdana, sans-serif');
        v.render();
    };

    this.action_modelviewparse = function () {
        var p = JMVC.getModel('Persona'),
            v = JMVC.getView('parse');
        p.set('name', 'Fredrich');
        v.parse(p).render();
    };

    /* test a CONTROLLER */
    this.action_controller = function () {
        this.set('nome', 'Federico');
        alert(this.get('nome'));
    };

    /* just to celebrate a better time */
    this.action_flag = function (p) {
        /* color extension is needed */
        JMVC.require('core/color/color');

        var nation = p.nation || 'it',
            nations = {
                it: {
                    w: 9,
                    h: 6,
                    strat: function (i) {
                        return i % this.w < 3 ? 'green' : i % this.w < 6 ? 'white' : 'red';
                    }
                },
                ch: {
                    w: 7,
                    h: 5,
                    strat: function (i) {
                        return (JMVC.array.find([10, 16, 17, 18, 24], i) >= 0) ? 'white' : 'red';
                    }
                },
                ndl: {
                    w: 9,
                    h: 6,
                    strat: function (i) {
                        return i < this.w * 2 ? 'red' : i < this.w * 4 ? 'white' : 'blue';
                    }
                },
                de: {
                    w: 9,
                    h: 6,
                    strat: function (i) {
                        return i < this.w * 2 ? 'black' : i < this.w * 4 ? '#DD0000' : '#FFCE00';
                    }
                },
                uk: {
                    w: 9,
                    h: 5,
                    strat: function (i) {
                        return (JMVC.array.find([4, 13, 18, 19, 20, 21, 22, 23, 24, 25, 26, 31, 40], i) >= 0) ? '#CC0000' : 'white';
                    }
                },
                jp: {
                    w: 20,
                    h: 10,
                    strat: function (i) {
                        return (JMVC.array.find([69, 70, 88, 89, 90, 91, 108, 109, 110, 111, 129, 130], i) >= 0) ? '#CC0000' : 'white';
                    }
                }
            },
            opt = nations[nation],
            links = [],
            style = {
                '#links span': {
                    'font-family': 'Verdana, sans-serif',
                    'font-size': '10px',
                    color: '#666',
                    margin: '10px 10px;',
                    'text-decoration': 'none',
                    padding: '5px',
                    'line-height': '20px',
                    cursor: 'pointer',
                    'font-weight': 'bold'
                },
                '#links span.active': {
                    color: '#aaa',
                    'background-color': '#333',
                    '-moz-border-radius-bottomleft': '5px',
                    '-moz-border-radius-bottomright': '5px',
                    '-webkit-border-bottom-left-radius': '5px',
                    '-webkit-border-bottom-right-radius': '5px',
                    'border-bottom-left-radius': '5px',
                    'border-bottom-right-radius': '5px'
                }
            },
            v = JMVC.getView('flag'),
            mode = 'grow',
            boxSize = 1,
            factor = 0.8,
            topFact = 80,
            elsTop = [],
            i = 0,
            w = opt.w,
            h = opt.h,
            l = w * h,
            recall = function (ll) {
                for (var g = 0; g < ll; g++) {
                    elsTop[g] = JMVC.util.rand(10, topFact - 5);
                }
            },
            back = false;

        JMVC.head.addStyle(JMVC.object.toCss(style), true, true);

        JMVC.head.title(nation.toUpperCase() + ' beat');

        JMVC.css.style(JMVC.WD.body, 'backgroundColor', '#444');

        recall(l);

        back = function (s) {
            JMVC.head.title(nation.toUpperCase() + ' beat');

            opt = nations[nation];
            w = opt.w;
            h = opt.h;
            l = w * h;

            var basesize = s || boxSize,
                f = document.getElementById('flag'),
                j,
                fact,
                opac = Math.sqrt(basesize / (boxSize * topFact)),
                tmp;

            JMVC.css.style(f, {
                width: (basesize * w) + 'px',
                height: (basesize * h) + 'px',
                margin: '0 auto',
                zoom: 1,
                opacity: opac,
                '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (~~(100 * opac)) + ')',
                filter: 'alpha(opacity=' + (~~(100 * opac)) + ')',
                marginTop: basesize + 'px'
            });

            j = 0;
            for (i = 0, l = h * w; i < l; i += 1) {
                j += 1;
                tmp = JMVC.dom.create('div', {
                    'style': 'float:left;width:' + basesize + 'px; height:' + basesize + 'px;',
                    'class': 'box'
                }, '&nbsp;');

                JMVC.dom.addClass(tmp, 'respfixed');

                JMVC.dom.append(f, tmp);

                JMVC.css.style(tmp, {
                    'background-color': (basesize > elsTop[i]) ? opt.strat(i) : JMVC.core.color.getRandomColor(true)
                });
                if (j % w === 0) {
                    tmp = JMVC.dom.clearer();
                    JMVC.dom.append(f, tmp);
                }
            }

            if (basesize > boxSize * topFact) {
                mode = 'shrink';
                recall(l);
            }
            if (basesize < boxSize) {
                mode = 'grow';
                recall(l);
            }
            fact = (mode === 'grow') ? factor : -factor;

            window.setTimeout(
                function () {
                    f.innerHTML = '';
                    back(basesize + fact);
                },
                25
            );
        };

        v.render({
            cback: function () {
                var os = {},
                    tag, j;
                for (j in nations) {
                    if (j === nation) {
                        os['class'] = 'active';
                    }
                    tag = JMVC.dom.create('span', os, j);

                    (function (y, tg) {
                        JMVC.events.on(tg, 'click', function () {
                            nation = y;
                            JMVC.dom.removeClass(JMVC.dom.find('span'), 'active');
                            JMVC.dom.addClass(tg, 'active');
                        });
                    })(j, tag);
                    links.push(tag);
                }
                JMVC.dom.append(document.getElementById('links'), links);
                back();
            }
        });
    };

    this.action_direct = function () {
        JMVC.head.title('Crypto image');

        JMVC.head.addStyle(JMVC.object.toCss({
            'body': {
                'background-color': 'black'
            }
        }), true, true);

        JMVC.require('core/lib/crypt/crypt');

        this.render(
            '<div style="margin:50px"><span style="color:green;cursor:pointer;font-family:Verdana, sans-serif" id="see">reveal the image</span></div>',
            function () {
                JMVC.security.seed = 213123123;

                /**
                 / original base64 image data (my linkedin profile image)
                 / imgdata = '/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8KCwkMEQ8SEhEPERATFhwXExQaFRARGCEYGhwdHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAC/AL8DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD6vxig4pM00msgFOKTPvikJGM5HHvXN+JPFdlot5DbS/O8mSwxgqOx/Pihuw0rnSErgksAAcHJ6fU1mXOvaPbB/Nv4lMalmGcmvILjxhdx3+pyJLvS7c7cn7oDZBx/ujH41zl/fz3Vy80rne3Udqzcx2PeU8VaO87RLccLGJGcDKgH+tXNP1rTL+aWO2ukdoslxjGB06n6V86JcyLn5jz1561atdTuYVaOKVow/wB7B60ucLH0hGyugdGV0PRhyDTsY65/EV4JZeK9Xs4RHb30iRp90Z71oWfjrW4pGY37ncMncobn2BFVzhY9qNA96870P4kBiI9TtCQFx5kIzk/StjVfHWkWlklyHL+Z91AOc+9PmCx1pIHemGRR1P58V5RqXxLuGJFnbKF9XPNc7e+NNculYG78tT2XjFS5hY9ynv7aEZeVFH+01ZN74u0W13Br2MkdQOTXhNxqV5dEefdzP9XNMMqeuTS5mw0PWr/4k6ZEMW8csx6cDFYOofEjUHyttaogPRicmuBaRDznHvQZFHfrSuO50F94v1y4+VrsoP8AZrFudQu5nJluZXJ65c1BIeOtV2Y55NArkxkyeRk0pLAZquG+b2p7SA8UATB2OOwqVQpHJ5qqsoAx71JHlu9AH08aaf0FGTVTVbtbPT5rliuI1ydxwBW17Eoq+JNZttE057q4boDtX1NeB6/qUuoX095O5d5GJ57D+lbPjjxBPq18wLYhBBVVOV+tcq6scnJrJu5QhbPU9RzSF+ck5pj8E0wnIzUgSlsKccmlHygMzY9qg8wYxmopJdzEE9KEBYebHA6fWk85xjJJOPWqoOW6dqfu55NAFpLlt65YkfWtq2u4LuwWzuHIYNlWx0HvXOxA8++KtQMYbhRg9AaECLNzF5U7xBt+043DoagKn0NbkUUV2okWMBxgNg9RSyaeBnjimMwGU9s00g9q3Tp4qNtOzQKxi8jnJpCWzwTWydOOKjbTjjFAWMosxHU00sc8kVqnT2Ipjac3TFAWM0McdfpQWIOQKvnT3x0/Smtp7gdDQFikWJp3mNjAzVj7DID0NAsZB0WgLH0/+BJ9q89+KWoX8FvGqSR2sMgKkrJl5PqOwrvbuVYbWWV3VFRSxZjgL7mvnjxVrF3quqS3F3cNMckJnoq9QBVzYIgig80sw7HrRJbt0xV/SwotME8nmpZWUdhUAYUts69s1UlhdRwvFdExjcds1VmjUn2oA5uXcGxiolDselb0tpG1NSyjU80AY6LIxwARirUVpIRkoa2IoI1Odgq5EqgjoMUAY8FhJsBCnrRcwSLIGdOB14rpYCpIyBT7+2SWykI9KB2MfSZvKmCryg5wK6QKkkauhBUjIrz+O6MV00TsVKH5W/pXb+Fp1utKB4DI2Cvp/nNA0WPKHb0pvk/5xV0rg0m0dDxQMp+SPT86DCD6Vb2An1o29gBQBSFsPak+zr6VeKAc0m0dSaAKQth1xmka1API61oBBjn86CoxgUAZptB/doNouemK0tvH86TYtCA734k3tvY+E7mSePzN3yop6Fuoz7cfzr58L5lVQBtJ7dK9w+NMTv4Id1P+qnRiPXqv/s1eFRsPNyDzTluZm/p8x2bB+dTSMTkAHPrVWwXK8ccVZ8tsj9aQyMJJnOQKDCx+8T68VIzheD2ND3EZXg80AQvGSMAmmrCw5brU6Orck/ShpkUc4oBCpG2QADg1MFIQ5BFVzcKXABHSrFvdLxlhjoaBj7cHrk1eVi1vIGAxjP1qKIwTZG9Qe3NWJrdkt2x0IyDQNHmWtysmpSMvHJJyK6v4eXKvOULIA4xkk5JB6Y6dK4vxK7peyNzuBPWtf4cypP4qjVXwCu8DtnHNAup6qUx1B/GmFcVOwyM9+9MccUFEZHGaaCO1PI4pu3jPegBMY5o2g96dnA603IxgcUAKAQc45pKOeOMikJGfagBT0zRx6UgPrRnFCA7b4nWD6j4KvokLb4lEqgd9vJz+Ga+ebNWkuAncnrX034i1Gx0zSJbjUcmBv3ZQdXyCMCvnKwiVdZYAEKGJxiqkQtjWAW0h3PgADJ965+81O6aZnj4GeBWprs2QE/hzzXNXVxLkrGhI9h1qQJJtVvVYsy8Uiaw+NzCq0aTXELu7LHt6Bj1qlJDKG2gMTnHtQB0NrfmYZjY8dqS5upol3Nux/WpPB9qHlZZMbttbeq6btsXfA47UAjjLvWrhB8nBrOfWtRkO1ZMYqPVIp/NJVDjPQVWsoLkzrvXAJ5PXigZqW1/qZYMJs45wDXe+C9Zvr6VbS9kXYo+X5cE1xENldSMY4bUTg9GQbWX3rU0Vby1vIiylHVh160gLPxQ002l1HcKuFk9/rVf4SWZm8TpMrZESO2O/Ix/Oum+I0aX3h62lYgMkg5HfNZnwz1DS9D1AxX5Ky3ZEcbKOV54z+NMD01x19xUTdKmkGM5FQk8dxQUMY8U0+v50rHOeCaOq46UARtjr2pMc8HtTio96aeBgg0AKD74pCQec0elABHOKAA9PqaM5bmlIyRSEZ60IDd+OkhTwxaoCRm7HI7fK3+NeSWRMV6+5gWKg5PvXbeNvGNt4gsTp0cB2FwyyH+FhnH88VwILHVtuCAF5zTlqyC9dxiRiW7+lUpIJY1/dxKwHbvWkxBYDj0qZUQenH61IHNSpcyHC2qr6E02PSpS/mSSHPoOgrpZBGAGKrVW8u4EUKvLHgKO9IEJoUPl3S7RiumlRZLRg2CM85rL0uOOOMSy/K/YVs2hjuIzHkAmmhnJax4fE2ZojtPYdKwjpV7AwwisPcc12er3iWkvlSqeRwaqRXUTk8ihgZekwanG6t5KoPXdXQRxGYiR9hc9wKIDG2DwRjrUwIjb93gr6elCAg8ZmNfDoib5TuU8fWuLuo7db7SZ7dy7rMqyfXdkfzrtPHFsLnQHdeiR7s/iP8axfhrpC6g0F3OpMUEhlBI4bGAP5/pTA9PkPJz6moG9/WpHqJzg889hQUMJGT1HNIc5zmg5/Kgkk8Y6UAB54HWmkepzSkelIelABznA/ChTxilA6dKCDnigBFzu60vTtS7cEc80HjJNCA82dZpHCBTknirt3brC4mJPmFcMPwHNa2hLa3UoPGRU3jO2S2EE8kZEJQjfjjd6H0oIsc3LchT1qIX2OCeKpX7mOQqO/NUZpH8vJoBF2/wBVIBAOD0FM0qWaCY380PmhBkJmsm1QzTF5G4BwPetxNwgxnPtjikxlpfE0VwoBiMZHHPFaej+J7S2jd3TfgE8da4rU7ZySYw2fQCmaTbXEcn74EZ6ZpAdTrmsprlkfJtpI2Rsh24zXPQ30trN5chz71swqNnJ6DFZGr28O8qZAS3TnpQBr2Wp5G0PyemDWot/lEYtjJHNcXpiuuQTkDjNbMLMcx8sMjrQB2GsSGXQvLxneyLgdxnJH6V0Wg2a2lrOscQjiaTEagcYAHP55rmJ5Zo9Pso0tZrjfIc+WmdvHGT+NdhYCaHT4IpxiRV5Hpkk/1poaHMctUbYNPbrgCojnNMYhHPtSdAcU7JpO9ACD8KCMmk70o60AKBxSgc4xTJJEjHzsBTTdwIuWkXH1oAlYbRk1C7M2VWoX1C1k4Ey/nSpc24581fzoA8q8P629lOhY5APrXtHhu/stWtVR40kDAEq4DA/nXze8u1s55r0L4Sa3O/iCCxdvkbp+FJEsd47svsXiK7gACoJCUAHAB5H86wAFZduPrXoPxpt1h1uC4UgeZbjI9wSK893YyDigRDcWp8sonB6ism6j1eyuAtw8hiONpTmugVmJUMCRWhcGFrdVlDjA4I7UgRyjyzkkpLcN+FCyzMgZ5p93b5K3Hns0ADPG3PUjBqJruy3hUKD3PNAzGJ1WQbLQ3I3HliMAVY/s25twGu53eUjnJziup0+7hMYCAOQOeOKpawdwVgOc9aAK9hGvCD05q1YKxn244znNV7P92rHIq7p/3i455AAoA9L8L/Lp/B461ouQMDjrWb4bBXTlU+lXXPNUMRjyTUZxjrzQx96jLY4zQMcTzijI60xQ0jbY+TSSRXI4EZNACs3PFMknCJuJqN47nJ/dmqd1HOyMPKbkUAcd498TrbZjhkIYZ71xUni26lj2+dg/Wuo8S+FZr24Mhjc/hXM3PhCdORC4/ChCM1devw5ZLpuvrUg8RaiB/wAfTE/WiXw7Mh4jcAe1QNosi/3h9aYhJSDxnmvSfgLaQT+I2ln4eNfkzXlwfuePSuw+Ek98PF9qts55b5x2x60gZ6n8b486hbd8Q/1NeUvIUJJPXoK9j+NkLj7DMR8phK/Qjn+teM3o2ydOlJiRehIYrxz7Vq+XI0YBwc8dOa5y0uwkikjjPNdBb6pEiq+AfbNIZDcaD52CSqn05qKLw4pORIhOew6VoTazCeVYAjrVN9aUMAnA68UgLkNkIFCRjcPUUzUoQqneB06VHBrKHjOW7VU1PUhI2FIJNAET4wqr1PStrw9bfaJHY8JDGXYj17f0rmUmLzhQdz5/CvVvhrovneHtXlKb8WrBWx1f739BQtQNDw/n+z1PI+tXJD19ap6AoNgp55/Wrbj25qkURMeOKiZqkYY6VGwycetMC3p8eTvNXVYgnKqfSoLUbYxUuRQA4+6DNAEZ6xj8qYzd88Um89jQBJ5Nux/1YprWNkww0Q/KkV/Wnb+PegCBtH01wf3Cn6rUD+HtJY8wpn/dq8XwBil3+ooQHyhBbTXB478ius8NW97pN5DLA4865dbeLHXc5x/Wo7CPT9OPmu/2ll6cFU/xq9oWpHUPiH4dDqqRrqEO1AMfxikI+jfHGijXNDks05uIhugJ7tjp+OK+ddZtZLe6lhnjaOVCQ6EYIPpX1BOWLbgOa4r4h+DYPEdubm12wakg4bHyy+x9/eqaEfPcqsvKkEDpULXTgBQelaWq2dxp149jewPBPGcMjcfr3rNmiU5PBqbDRC124BG6ozPIRw/BqGeNl5B701EYHBc0hl61nkVslsY6ZqT7Szkqh+pNU40klmWGINI5OAoBJP4V6h4E+GN1d+Xea8WtoOohH+sb6+lAjK+H3hi+167VYIysKnMs7D5VH9TX0Po2nW2j6E9nACIo4WyW6scck1X0iztdOtI7Wzt0ghQcKo6+59aZ411Eab4M1e8LbfLs5dv128VSVgR578O703nhm3Yt86gqQT6Vvv8AjXj/AII1wWGmxRMxBBzkHpXo+n+JdNuUIll8uQYzu4z9KSYzUZaaqkuBxUsbxzLvhkWRT0KHcD+VKi/vOmKYFpRtjFNHQmpdoKc1GR6UAMYU3pT2zTCKAAE/gKXcRznNJ/Kjpk96ADcfSgu2OtKTkk00nFCA+dE2+URjv+dO8H3KR+P9EmP+rS9jOSfRqpXc5VPLUnkcmo/D3PiXTh289cfnSQj7NSUFQQQeKGAIyBzVDTSxtYyTn5RVtSeO2asRzvjbwjp3ieyKTr5V0g/czoPmU+/qK8B8T+H9T8O3jWmow7Uz8kqj5HHqDX05qV5ZadbfadQuI7eLsXOC30Hc+wrzjxN4yj1OddNg0BnsGOHuryIlcY5KoOQffNSwPBrt85IHC10Pg7wB4h8SMkqQGzsjybicEAj/AGR1NdXo+o+AdJ8UhLvw1eFN42zTMXSNuv3D0HI9TXt2mzWWoWUdxps8U0GOPKI+X2wOn0osgOS8G+A9H8NoDBEbi7x808wyc+3p+FddFEeMn61YWNU9MClJA4FOwBGoFea/tE6z9j8GNpsbkPeSKhwewOT/AEr0e4fyojI3QDJr50+POpSXmuQW5bIQkgZ/Wk2NHIWUwjhUc8fzrTi1JBHtkjYtjgg1h2knygZHBANWQeD6+tQMtw65qGl3RlsLuaJCegbp+FdZofxNvI2Vb+CO5Ucbh8rf4VwM6hs5HSq2Sr5BINCYH0f4e8VaNrahLefy5scxycH8D3rZdMDODivmG0upYGDxuVYdCDiu68PfETU7JUiuHE6Dj5/8aq4HsBB9KYRzzxXJ6f8AEDTbnAnieM9ypyK6Cw1fTb8D7Ndox/uk4P60XAtnGOKQ45Bp5GOenpxTD1P600AEjJpCR36UE00ketMD5imYk85+tJo8yxeItNkcjatymfzFRsc//rqlcMVlR1BBVwRj25qUB9saamLVFPUKOn0rF8deLLHwnp3nTATXj/6iAHlj6n0p3h/XBeaHpYtcPeXVokyhgQq/KCSa5bX/AAS+q3bXeo3nnzP36AD0FUSjhtL1vUfEWqvqWtTmaVmPlR4+SMckBR2b3rppIQ8RUYIb5TuUnPswz7dTWNqXh+XQLlZEKyK7BCD39q3bTdLbg5DZ+UEjg9Mq3r0PtUsDPmtllyhU5+7scbtuedpA46AYPvWPqGraj4JuYdU0qR4g7gS25H7twf4dvY+4rpwgyCU+Qr0c9jyVIHHQcVgeJLa01TUbe3mXdGgDFVG3r0IP0xSQHqngHxvpHjGz/cOLe/jXMtsx+YH1HqK6ZkKHnrXmOieArbTmjvdNnaCZcMjLwVzXf6ZqEsv+g3oC3iLklfusPWrTAj1qYJbSMxwiqWY+gFfKHi/Vhrfiu7vI23QBysX+6O9e2ftBeI20jw2NNtWYXGokoWGRtjH3j/IV882A6sePT6VLHYvQna+DkCr4KhAcnFZ64z1NWbeQA7X64qR2CVyylhj3xUPysMng1YWB55Ge3ABCl2B6ECs9ULsx3EE84B6UAWijA9N3fikVzyOKgSOYMNkrbsjBJqxLK7oC6JvzgsO9CAfHMUIOcfStK01WaNgRIc+ucVj7ht5yKUPjFMDv9J8bapabQZy8fTa5yMfzrsNM8dadcIFu0MLf3l5FeJpKwPBqaO6cH5Tg0XA+iLK/sr2IPa3Eco9AefyqVmArwfSNfmtLpJIWKOncd677QvEd1fqYTzKi7yemRnH9apMR/9k='
                 / this could be obtained(with seed 213123123) from imgdata
                 / cryp = JMVC.security.crypt(imgdata, 'unsafe')
                 */
                var cryp = '×ÚĐÃÍÙéòùÿóâúĈçÖÚÿéâçåÚÚéâêÃËďêåçÕîÜêâ÷ÙÚďýæèÕêÞêòûÛÛďğêèċüàêĘÞßÜďēîëåÑëíĉëäÞêéõìüĐðíę÷õßêéóí×ÞñïĉĝøáĐàćëČüāòäïùãÚğĆîČÐÇÚĘèØÚéýçèåüßêĘÚÝÜÙÜĆìÖÞíðĉÚùáĀÜĆîüÍýðĉÚùáĀÜĆîüÍýðĉÚùáĀÜĆîüÍýðĉÚùáĀÜĆîüÍýðĉÚùáĀÜĆîüÍýðĉÚùáĀßÐĝÕÚêëâéÃÚäàåççâÙéĉëÖÚĐíãÕÌêÙðĘçÕÚéýãçåÞÚéòëÕÚÙéâçÕÚÙéâë×ÚďùçèûüáëòĕàÈÐùâĚæÚÙéĈëØÚďñæçċîÞêâ÷ÕÚÙîÚçåâÜéâ÷æÛêñĉóéÞßíÒìüÛđòęìØäÚēĂëÝâÈóęĝæïëØćçÿæÊòĚčûĄãîĉĉíàêėčðýüćóôĕÄçìāÔõØĄÎùÑøÚëăČêùéĉìþçüëïÉĐûýāçăĂøĀĂúßĔĒĉÇëÉČďĊÈþðęåĎÝðßĐÕďÞĂĈóõĒÞðïĔÖďîĆĉóċĖßðąĘ×ďĄĊĊóěĚàðÊĜØďÉĎċôåĞáñßĠÙĐÞĒČôõ×âñïÙÚĐîËčðĊÚ¿íĄÝĖČăÏýĚęÞĊéÈáćĈÇÄèĖ×ÕÌêÙðĘëÕÚďíãçåÞÚéòëÖÚééâçÕÚÙéâë×ÚďùçèûüáëòĕàÈÐùâĚæÞÙéĈë×ÛÙùåèÕüÞêâ÷ÕÚéòÔçÕÞÛéęëÙÛëíęèüãÚýòĊüüêõĊóăÞáîæñæĈúðãéçæĒýėçêòĆôóéüòăöðëĀÑêċúíæĈąòĚčĄäĂýÓôĎĀÍ÷ČôÙëíĂéùÙąãýÒøêïĄČúýêĉĂĂèüāóÊĐđćĂçÈČùĀÇþàĔ×čăèÝĐúćÜĂáĕìđĄèíĔûćìĆâĕĂĕąèăĘĂćĂĊãĕĒęĆèÈĜăćÇĎäĕ×ĝćéÝĠĄĈÜĒåĖìÖĈéíÙąĈìËæĖĂÚĉéăÝĆĈĂÏçĖĒÞĊéÈáćĈÇÄèĖ×ÕÍĈÙìâóÖÚÙñóçČÞÙøĘêÊďĐđĈÚĄæÈØĎęûßçóõöĊĂăòèóÉáàĞùô¿ãèîąĒăčÍìăùÃèÐĕôĝČĀĉ÷ęÕäĂĀĝĘÖĆćëíēčÿČÙéĄîÞÏþýÒēìèĎĉñĈÖÈæĞÕĒáúĄĕèĉāďáôċĞüýĐÛÌĖčãäĞôÝ÷ÐûĖØĕØóÚĠÐěþáÌÙěĒÃÿĒÛ÷ğÌÉĊĖĆÙéýĉĢĄĞÆéýýÙüõèÐßóò÷üäïëí÷ÝãďéÑĈñæøÒĘèåÃĉøõÆĎăČĐęĀđĂïãÖÊćÎþÙÜÞüđôďÛþēÉÝ××õčüüĖÿêúçó÷ĕċÈďêØèÊÉčċíîÄāßġĖčøàîØñøüĒÜüĔÿÊÎÇí÷ÚÞóýóÚþćÍêðăÙÄĂêĘÚÖîÐÉėøČþċïÜđííÌÏĖĄóĂüćĊďØÖßîĢĉÿÍĊæéÚÜÌÐÈøÕđÖĂááõĚ×êÞĠÖđÝēă×ôĚþïþðøđëąăĔĚîàÄòáÒçãüÃáñē×đÉĘêîùĆßúó×äÎÐþÖøąñĐôĖíÞßĆĊììÍñèöĄÝùÄæöĄěĀòßßÙĚèËðĒçùÉāñáĚĔĊÐùíûċêßàÓÑ×îçÏÜĖÖëÊËêēØáĄüùðúìāæĠĒüÉýÝčćĊĎéÑĀïóáĊýĝõùÉĆďØñýĆÈÌē×ĀÙæïàĄęČÏûìçÿãĈþíċûÜĒČĜĂĕûéêđĄēĉÛùúåĠĂáĎùûìÜÿĊûĖõÉÉÞáÕĜÅĒÌÓ÷ĘćĈèàâĀĆßčČòěÉćâĔĖĀìãÎÝĄ×Öâý÷ĕüÆòÍÝïçĆĄĐēĚċæĄÈĘíçîĊčïÌĈÆĉÏûâÞéÚìêÓõãĐĉþòĖÜãÍęĒęăÚĐßÒðÜąčáâîÄÑùĉćÖÚàìþõüöčúøõÛĆąāĝê×čýĐğãýÅÐÝėĒÑÞçòĜĕëÄÎÏęÕĈăÝČĀÒôùÛÎ×ĒûĉĈðØÚÛãÎüÝèðÉÐÜÓčĈäăĂĠãöąÊÐğíÿüÛÚþ÷õêÄČċĒÜćüĆòēðĉÎéĐăöéÒêĢôì¿üăÝđĐÌÞÈğďïĎîÿûčęßüûĕčîčĀåĢúßąĀÐğúĞāĈĈòąĠÙÞÑóæèíþúðâÜúðăàÖĞþãâ÷ñýąĈçÿ×ĊąÿčÝÖôÕßĈôčĚÊÎñēćýĈĊÊĝÕòĉĐïĢĖîÝòæĔøĞÄáĎĀðĞÕÑÃÓìĚåæñĊĉøûÒÙĉæéàçĒîÖûËđÚĜÌÖÈÌÜėĂčßćÈöăđéîîÚĐđëæÚĠĈôûÒêûĚćùÛĆĒĊēáĐßýÚęÄÉÿáĒÙèĉÌęïĚãēéóęďÌăĆòđéëēďüøğøèçóċĈèăĂîâýáĈċĠéûÄÉċċÙđêĊĆüÓïĄăùċÔúÚÚïõÑó÷ýþĘòýÝèéóėĔèÌĐØÐùāčĈßĈĊØêÞđČýÞĉËĕïĐÕēîĒØêÝÝÈöâęîÛÈÿĈòÜÉÇÓãðÍĊÐáÌñëĈðàçĜÛĊëúÓęáĀãēēðĀÎèęðĝĆďúĝ÷ÿöðïþÔüÚëëĠûĐûåÏĕėĔþđîĚçÙąĎĉûÔìÇüæõĄđÞććęÚ÷ÖïĒāêčýĀÐØĔĝËáĊúëĈĈÉĐþÐùċĈČõæÞĂĆĈĂøûøāíéúûĈČÎáĔ×éąĀČóĝĊßüíęĐ÷ýċÙ÷ēþîĆÚĐçÉĎðċèĞýĈĄìĔċĀûÈĜđíÅçëġċûÌÉÙā×òÝđďéóďĆîîĘêøÿĈùÚêĕÝÊçČĈėÉÞĉďċĕáîÙāÙìüãċêäĔĆëûğôòÝàü÷ã×ÈċĈāäĖÝĒÚüØÑÆìïġČïÍäÚÚîČçóĎóĎéĆĒÿÝĘñÊêãēČćĉāÚýċïĆēÃ÷×óêÉÈüĔüßáÍÿÐĖìûÃîđ×ĉčãêÕêÝËÛĞđÕĂçÙØøößáúØđĜÿÈÍĠ÷ÖĆĀÈĕÑĊØđéõđÑçéìà×ê×ÝÎþăØÕćÉėÓßûÛéêôìćéùēÌĠĆÏîčìç÷ÉąØąùõÚãùĕĎÅđąēĂ×ÕéáÞÒĕÖÛĂĖÙÜ×ĈĐďöçîĉČêÐĊăçćĝĆēßÉČĞéÞÊíñĜäçËÌÌēÔĚĊòÃíØēçþèĢïÙčĈĈÞçěăēÏċćĠĆÎÐôÖĒêêÚĜëÝøäÑğÌôáíĎÜêĊÅéÃęďøýéðęėÕćÊýîóęäçđìěúĀĎòĕÐĖÌđÊĊãÑøíëõõđÕáèĚ÷ýċñãàĄĉêóÐĜĔĐÍúéġîðÞćçùìê×đÃàõÜÌïáĢĉċØËæìÔëîñÿàÑçåďßûîçāĆĊëĘÛöċíÞðĘ÷ĄÇûĉĖÿîûÜĐè×ĉßÚòçØĀÉõçïåÎÚî÷Ġ÷äðéãîçċÞĞąòČąĀĒĐćÖăÏċéĘÿÊýþĊ×ĊâßéęĐäÊĉóêĝèóßáòċÇçïòēĊÿčÊĠÑïčÝéöéēëčđěĎĖçæĎðëðčäÎĞÕċìäĎ÷öòÝÚÌĠČđÉãÚÞúÜøäÌĞęñËĉýġïĠĉÛèÿĕČÈüđĘñÚąăîĀĘéĉÑÜĜďîâÚčĘ×ėéđÉêÐíāßûþðĝčæÑÓÚó÷üíîæĀÜàùĉäõÅéáÜđěÇăèčĈèáòÍėÓčÍÏüĖâÜÄÌáĠĈĉéÚãéòĉÈÎĈóðċãæāēëíúúÿêõÖĎëĐÞöčäċêĖçéÕÐúÜďýØÏĂÜìĜăĄäĊÕĒÙĊÿČÚĜÞēÃïĂÑùûæÿČěÕćûĖēþÄÌÌđÒíČÉĒûëĈþîûĕãĜÇóéČùğ×æÛĞďñċĂîČûÿÕÞãïëĞýĊăùĕĐëÚïØĉÙäĀÙìëßÊÎÃàÒõÊúòĖċÚÛþÚÿđĘćËéíÐĎĎēðöùüČåăĚèĎÝÒĀÙĒ÷ÞãČþėüíČđàöďõĐÃöěéąÉùüùëàĎÏôéĚÊÛĂÙĒĒÞÝãïÓčáíĆðĕ÷ÖÉæĚćēíóĂāÙĊąìÍĝđĕĀÌæĝęÕëĉèêÚėÜąòĂîĈĈčúčĒÜöčċĀćçÈÐíéċĐàďïĚĉèÌćÚĚðČëčêēð×îæñęñüÝĉÇöëüØăèù÷ýćĈäēěĘĊñÙòÖöìĂÿĂĒýÅÈĉĂúóÞČÌÝĘêìþÃëÚĀĊċÎþăùÍĄðāĐÑìÎûíÒĞÙçĄČôóíÍúýõčÍàéĊøþÇċíØ÷ĈčÊĎñĊğĀáîĐÒÜÄĀäøę÷ÄÉÊĔÒî÷äčîČßÃċîĎÕùëóąàõĖáċòíôõÆèÇñęÕãĎąÓêÖõñËĐ×ØĀòÿõČčÉáþöûĔċēÉìôßØÊÙĠùÛßĒËĂæĉöäçþÖÚĎÄæõåÖÅđÉáęûèýãĕČíáÎÞùČÞøđéýîÿÌîÈÓėÛÄċà÷ĆéõèĉÜ×ûÕëČĒēØĄæûàéĚèĂćá×ćùÛÿďÑçßÝÏÜđéåþûØĆĒÕÛà÷ìçÕÒèęĂóÉûąĔêğæìÝĂ×ÖÝÝüÓðđüíďĠĂĕ×ëąßéïËÿãÛÌôùìïúîüÊÄÍďøñûÎèĞùĈùçĎïïĚÈĀċüđÖ÷ÛÊîĘğčáÃîĉĔÜÑÐþĘïàáîĜĖéÕßÍĢõĒąĒÛáąĞýëāÿØÑĀîĈñëÿÅÈüĠìĝÜûĎÿČĞÖòÜĒÑėîîéčďîÊÊáðïùĄüđðäØąċÎíÑØäìĈûÐēçìàøĐõûċĈĂãíÕàãĚ÷ýÌĎÌíöñĊåàďìõÍâÝòĐûäąËûØøýĎąĔóĀàëÿÚäóÌÎĊôÑěãèçõôğÃäÇā÷ęÆāĂĝêĠÜĄÙĕĎĎĂãùĠÕČÙËòėċĚäòüóĘĐĄïÏéĘĝýČèċĄ×ÆþĊÛĊýÿďĄûĒċæĐùęóþéíăàĊĎûóýēĘćĂàÎĜÖñăéðČù÷æđßāĊøÍāûáĘñÝÝßÚåĝæăĊýĘïþûÑÛĈĘÊþĄëâčÌóąöćêăĂúÝõěéÑþÿĖòĉĈÏČăÝçóÏČĚÝĆæĉġćþøĄþĢēĚäáÞěíĔåáüčĊøËČÇđñÞõđþĐēĖ×ÏÿØçÙãĉåýæĎĀÛáÜăíÕéÍ×đúÕÒèēñðĎÏąėèßÃðĈðĒðĎĀÐàÚĎåîåòèúÅáæñĄÛĎĆÿÝÐñûĄăàúÜéÚÚÝÕîëĆăčđĠçĄýĔêċĀÚÚĢďçÃÜĀüęďĀÚÎČìéØćāďãìĎĎÎØėúĈìÏċæĉÌÉàĒëô×ÚÐÚąĀĄáÛêõđĂĂĊĜÔĈĆÜÌĕëöāßûõñĝÜçùÚĉòõÌíėñíæîËĒðØçËÝíÙđîÞâùċČþăüÞéÖăâċċÔò÷āìÙĒïìËçëĆñĄñÏĕð÷ąèÇööĀĄáÐĞëĕÖßÊ×ĘèêâÚéðêÄßåØĒýõÜñÛÙÖäĆĀêČðāČąÙòĠèßÍïÕèċéýĜęôċĀĐĖñĚþĂăĠčĖúÞÈþĘĕÖĂåĂéîäßùčċÑÞÐëÚċĊÇíþďæÞøúÌĚöÝîĒëāĘØúêÛĕĂúöñÝċďÝÈÞòÞûĖÕýìĚĎęĄċĄēćðĈĉáÚóęüËÌĢùöåÌÈĜēôÉüĀĢØ×ćĐĉöďðÊÝÞĂèĘÆÑçàĒĀÕìËüďĖåÛĊÚøĖÉàÈøĚċāÝïėĕÕĀÞñĜċðÜçûĀđďĉĎéüČêþçúõíó÷đÐěîĐĆêÚÚèęçàðùėòČćýġíčøđĆòéÜêÉïďÓćÆąĊ÷ĔĉåăāĉõëõĀûāâîäÎÍĚĎðÉóćáñęăÉČĂēĐúâûÓøēøďàïõÑâýĀāäćÜíÌñđĞýëîÝéĖÿĄÇÙđĕõáåċĕûöòæøăĘûÜćĒďôáòĀðñĚçýÙċöÝÞĉçáâéØÑãëîēÿÐÈė×ÖÕäÚĠôč÷ÍĐüëðÙăàĢĔèèíüğêěëĄððÒĕÕąñĊóđÅÜÏõÓüëĈðÙä×ÿÍÝġÐĔçĉûÚÕÛÌÊþĢĐçÌĊÐø×ØÍąçĐúÛÕéĊĀĕîüĎÇěĕýĈïêÜÑđØÚÝęÕêÕÈĆĀěċÌĎÉěÖÛĆÉäÜôćÇèÇđäéČýĎēăĖ¿ßâíĔĊÈÐċĞĔþýäÏďâéăãÛýâîÕÛÍðÙÜċÚÞĂąěäċðėñĞĄčÉĐÒě×ÍíďĆĀöăááĘùßÑÑÛúğØĂÿúåĉëĉÐěĐĔÖÏāěĎÜþÊýġĖçĈĐÐĐĊõâĉìĕĖčêĆâýîéæðĀċèìĆýîĔåĐÕÍáßöčæĒĂġěđÿĉäċïÑÚÜđĢîčîÎĈáÔĈÉäËðďęÄÚÜøèÙäîĂêĒðĆĎđÛĉûßÝËøïçĎàâÙø÷öåéÛêÙÜąāõâüíÈċÚÖĚċàčÝÔċéăĆòěďĉĉÈÓØĎáòÛéð÷ãþçóđćċýďþĈõ÷ÒùéìßüàĎëåÖÉĊÉāìĞĂËÌÜěĔâïÏøÚØĆááęØĖÃÌāÜÖÛÕÚćéÚòÌåÇôđÕÖÍÎÙĐěåæÜĒēýöÍúêùúĀîÃĔùþäçíõóĐčííĂęĐĆēéĠÚÜþåñÜě÷áüìĢĊĐÝÏÈĠòÖþûñÓõùçëðñÕëîçÙëĔÙäßåēďéÞĎâęïÚËćâ×ąēąýÉððğáéãĊČûÕüüÜÚÞèċúĂċĎÿâñĂØ×ČîĆđÓÜĀăÊÓąčÃðčėÙù¿ßòĚÓÚáāĂċÐĎìæËøĉéøèêëÕÕ×āÛõÒĊùďďÝûòĄĎĎĚöčÌëùđãÕċÚþüæÕëĂðğØóüÍĂċâċÅêæėĔďÃÌĀáĂÿüãëìęĔāďëĎĈòõêìÓêØĀćÌčïČÿēðĔĘČĉþèûĖĝ¿ÞăáÙöÚÒĉĜĔÛÉûÍĠÓĞÊÉÿĂ×ĔÌûÌà×ĎöýÐùÐ×âþíĞêûÞãèĀĐñÍăÃöČòþÐÜõóÞĄāã×òĐĂÄČčîÙăËđČðĒÞĂêčĉïíċĐĢØüąÄðñÑÿÖĐûàąõõÎđØĖĝÿĂăĒċöâýÚĊ×ĖÙĂĉÓâČöçáĂåĉõÝÍÚäùąćÈÝĒñàĐÌĘðøÝāçčĘÜêĈìĉěéùïñéċĘêçÑĉöóÕćÙÞÙûûåăöČïÚÜêĒĄöéîĒýĐ÷ąćýêÑÜêáÚĚìîþèïß÷ûÅéíĐêØÚââöâëèÍďęē×äìČĚĘßöÿùòéÿÌãÜïùÿþÊÏĎÑĘāîąôěĎåýĒÝÐéĊïĎĐēĕĊćýðĕþĀäúàøĘÖðĐÙćÝÇÒÚùĕ÷âÝď×ďÑĎÊèñÌĚìãÜÙÚćĄÏÙėïčĄÎÍ×øĘöăÊÝĒđéëåčðñýóĉēúÿÊïßğĚĉùčåëÔĖÌþìĞïþêòÿĖìėúìćôöĈíđíĝó÷ÕÍÃÞåôÕÞòÞęĐÌĊñĢąÞÌîąàÚĐåÛâÝïěČÈÉāđĘëçăğĘÖåÈãē÷ÕëćúÓñċûÜÚĜéÖÅĐþÛäĔÊċíìÌîĈãñàĘĖĂÈüęÙþċÛāĔÔÑăĈéðĚĎÖûìĀãÚËÑāĝĔÞâðÑßđôÉÝäéÕÞÊÎüĊĆòÜñûÝęÕëĈÏëñúÍèèĕĖÕÆąĄÞĄìéÈĐęÚĕëĉàýñďÜÍüìĒėæċĉíð×ÕæþĠĊđÝÄĂĎéíýăðöåđćÉÍĝêĎĉĀâßĕĐĄÄçóÌĊøóČĂíċÊąĀĖċćãïÛù×ëíâèĘù×ÖèïôăčãúÌĚÕĎ¿ÝñøæĊĉûąÙÓĝõĄÿÜăîčĒÃĠÚÕùĊùíćö÷ĊċĞìđÙÝĈýíþèĀÚùĆĒõðĉÚąĞĄÊÌáċċċéÚøèĉáăûĎēÙĆçąđöÛäÛĉĊåø×ÊÊÜãíÊĈĒøêøċÈÚęèċâąÍêØÖÅÞñðãĉÄāĄÞÒĔÿïċĔĔÿÊóĉüØùĎĄĉĐÌĖâîÌØČĒāðßñïïÉèÙėãðäÍîÞĉÚÙÄßöÒĊ¿ñýĉÙýĈĈçėĉî¿ČúÞÌĒÕăãÓéÙüĂÃÙ×ÝêòáġĔñĂæċßåÛêáÑüùÖäĈÊĖøØþÏÝáďç×âćÜøğëÏċċĄđÅñÈđěĚøèČñØýĎčÈďĉ÷÷äćÞÌÛÍúòÜÒ×ÙúúÜî×ùÑäĊćòćÎüĞÒØÌïëþĈøÉÐÐ÷ØÖÇćĀĕÔÿĈÑÎďĒ÷èÏîĞėÞÕăðĒÐçÝâÉğøíāđêõęèÖēăðđþăÄĆÓëĊâĎíñčĒÌĎéāěěÈēÑóôÿĎîòĉĂėÿĎÚĠöęöđĒôėĎÿðêüÑñÜüÜÓ÷ñýÈĎ÷ĎñíßĈúĕĐÚçàùĎĖøĈãċÒíæÏíéîÿéÌĈüÓĠèÜãéâëÃĀãĀĄøĎćæòÐñþĉăá×çØüþûĈěÆèČóõđÿÉÈĖçéÕÄüíÓÑéëĂĞÌĊãÑàÛìø¿éÑíĎö¿ċëáċõçÿêęđþ÷ÎîøíûĂĄûĕĐÕØÌèđùúüËÐáĄČĂìéĒØôçîÞùò÷ùäßéêğÖēîìõùČčñġõĔÉëîĜôċãËùěóĠĊăúğċĖÇĂýġìúĆÎîØĈÕ÷ēćøĎû¿ÈĉóÙèÌíÃðÚúÌèËĒøēăĐÏýěÞÿĊĂÝéîąÝðØÖėêÎòĉąĈúúüùĖïËþäěùõ×ÌÈðĄÑċċĒĒęôÈĒĂÙðĊøçÿØãĔćàçðĖĘčâĄċúÛßĈçùćČâìďøãĘĈÑÍñééÅÉèďØĝÖÍĀàôóÿĊéïěęþĒúđĄëÕăÇéèøÅçüĀĐÑăÄÙČëÞéāäĞĘ×ùßæÜÓĠèæðûïěĊÌÜØéïÍíðĜÓēĎðïėøûøđĈěÙûÄàçøìï¿ñÊğðĔÄĈċďðùÌàÃéÚîÌçćìãëöĂÏĠÙÖÌĐđċÌÙĄÄÞČąìÙþåĖ××íðæýÚó×ąâéÕìãĐÚïĐìùúÇĜæÜĎÒĂàèôĄČúēñċçäĀğĆĝãíÇéæĘÄþÌĎĚĕþâËùåðĆÎÈÓñõĄìðĕĖ÷ëÎúñòđûóÇÿČØâááÿöĝþāíċÙČĎċìđÒðÖáČēċÿĈăÿďÒĎÆĄĆġĈĀÜÛÙöø÷ùÝÎÓĕ÷áčďÞÖėÛąËúčęàĎùòäċûûĈÓçĊîĈþĠïĜÝËîĊÌéãÎíċăĎÌċþÜ÷ĝáÏĀěÖîçĊÊûēÛÖâæëúîÄÿÌčÙüõçĊĉĉòùÿđÝĔĉČĒûðÙêÇċòČîêãÝāĞĎíÄĎĈāèêČĎîāąéØĂčÞÙöúÞìýØðéĂčðæÜØăÍ×ÙćąÍàěãèÍäñúěĠČñâÞćÞÕÞÜüăĔÕćāčîßčĉđó×éċÊþüăÞØÐæČĐĞÃĎăÜñÜÄñÙĜďíãäéÜÖèĄÎß÷ĆĔĄđììÒöÊÉÈéæĐÞĉÛúÔÜéÞÈØČċĈæÜÝĊēíĄÐÝÌĚÞĈÐġęċÝčæēĄĐõčđĕćĠÚëċċÐÕĆĊĄċîüĀëÉêãüċëĂÚÖėéÛÑěĂćāåîîñûßèĆØēìÌýýôíîċćĈÛďúÕíðĒÐÜýÚàĔċÜĂÉĈÛĉÕìÛýĉéĖíčûøĆþêĈăġĉčåĊÇóäùõÎúĀÐçÕìÃęÔĈìþćÛďĔĎéËÞâêÄßíûċĎĈåÉĞöČÙðĉĞĒýĈíąĉ÷ēäąêÜÌùáüăêóØöÌĊĘđïåÑêýúïöÎìĝöĔäČďĢØĊèðæęùĎ¿ñéôčĀÙäđóØè×ÝËáĒÙöíüôăčÉÝòÓöëþĀÑõĒÙĆÉèĜöęØéąĜčĒčāíÝÌÝćüúĜĖċøĉÙÜ×çíéĎÿñėÛċùĒÕðĉòüýÑėæÍÿßĈùÆÎàßĕĝúÍüĞúÑÈċĈğĈğ×îÃùēÖ÷ÒĂġ÷ïÜáéċ÷čùãäĉÑ×èîúčÔēìýßďåìêàËĚÑïäÉĐûòîąćÿðęĜĄáĂïěÕ÷èäčÐĐìæČěęÑíáÉðĒñÊóăóéĔĆñą÷ĊċÕċúüĎĐĊýæĖĂéîüåĒíĝêēðĎ×ĀąÞċĞÌčÇĈÛÛĊòÿąþĝĔöëċìéċ×ąòâĊôóČĐāęøÿ¿ĀÞĎìîýÈîĐēČýĎÏĞêØÇêÚġĔþ¿ÏçáĆØúčÚčêØÄăďÚïôĈðñĀèĕÿĈïïóĚþáËĒÐïêÑÐÚâÜćþèü×üàáñĞòĔõÄÜēäĘÈäĀéĄĔÚóÎÜě×âðúčòçËñÎÜĒøÆÜîġĚĒüăËĠööčČåĖĈ×íðÚÝÖíùÌÙêäĒÆÛÎíäęÍîäěęÙÙÞÐÜãÜéÚïđċçÍçËĎĊđêēđ÷ìčçèñõïđĆûċĒãðąđäóØĕ×ÏâĞěčćèÑëâČÜæíñðĉúìČóÑ×ëúæďóï÷Äčċ÷ĐËāČÝĚñééĂîîêĊÒâàăćĄúúùûğÌÿìĉÖğáÿĒĚĔôáÑüĉąĉÝßčØîòúÌĄÝçċÞĉãğñèąúçÞĄîÉíÿØùç¿ĂäóÐęĆËáøĂÙÙüćáâċúĒĉþĎçĆĐþûïČāčäĘëïëäçĖĄĊÊÐÏùėëøÊþęúúĎäāßĚċāëĆðÚćĄæê×Úđ¹ÌÜĝďęõÿý',
                    img = '<img src="data:image/jpg;base64,%imgdata%" alt="Red dot" />';

                JMVC.events.on(JMVC.dom.find('#see'), 'click', function () {
                    var p = prompt('Insert password (the right one is `unsafe`)'),
                        dec;
                    if (!p) {
                        return false;
                    }
                    dec = JMVC.security.decrypt(cryp, p);
                    if (!dec) {
                        alert('Password invalid');
                    } else {
                        JMVC.WD.body.innerHTML = img.replace(/%imgdata%/, dec);
                    }
                });
            }
        );
    };

    this.action_img = function () {
        JMVC.head.title('Image Filters');
        JMVC.require('core/lib/image/image');
        JMVC.head.addStyle(JMVC.object.toCss({
            'body': {
                'font-family': 'Verdana, sans-serif'
            },
            'button': {
                'border': 'none',
                'margin-right': '5px',
                'cursor': 'pointer'
            },
            'button.flt:hover': {
                'background-color': 'green',
                'color': 'white'
            },
            'div.filters': {
                'margin': '10px',
                'width': '900px'
            },
            '#done': {
                'margin-left': '10px'
            },
            '#done li': {
                'padding-left': '10px',
                'border-left': '3px solid lime',
                'font-size': '11px',
                'line-height': '13px',
                'margin-bottom': '5px'
            },
            '#reset': {
                'color': 'red',
                'font-weight': 'bold',
                'margin': '5px 0px'
            },
            '#realimg': {
                'margin-left': '10px'
            }
        }), true, true);

        var that = this,
            img = 'gabpattinaggio.jpg';

        JMVC.dom.preloadImage(JMVC.vars.baseurl + '/media/img/' + img, function () {
            var elements = [{
                    id: 'brightness',
                    label: 'Brightness'
                }, {
                    id: 'threshold',
                    label: 'Threshold'
                }, {
                    id: 'grayscale',
                    label: 'Grayscale'
                }, {
                    id: 'invert',
                    label: 'Invert'
                }, {
                    id: 'blur',
                    label: 'Blur'
                }, {
                    id: 'emboss',
                    label: 'Emboss'
                }, {
                    id: 'sharpen',
                    label: 'Sharpen'
                }, {
                    id: 'laplace',
                    label: 'Laplace'
                }, {
                    id: 'sobeloriz',
                    label: 'Sobel oriz'
                }, {
                    id: 'sobelvert',
                    label: 'Sobel vert'
                }, {
                    id: 'red',
                    label: 'Remove RED channel'
                }, {
                    id: 'green',
                    label: 'Remove GREEN channel'
                }, {
                    id: 'blue',
                    label: 'Remove BLUE channel'
                }, {
                    id: 'x',
                    label: 'x'
                }, {
                    id: 'mblur',
                    label: 'Mblur'
                }],
                butts = '',
                i, l = elements.length;

            for (null; i < l; i += 1) {
                butts += JMVC.string.replaceAll('<button id="%id%" class="flt">%label%</button>', elements[i]);
            }

            function track (msg) {
                JMVC.dom.append(JMVC.dom.find('#done'), JMVC.dom.create('li', {}, msg));
            }
            track.reset = function () {
                JMVC.dom.empty(JMVC.dom.find('#done'));
            };

            that.render(
                '<div class="filters">Filters : ' + butts +
                '<br /><button id="reset">RESET</button></div>' +
                '<div style="float:left" id="realimg"><img src="' + JMVC.vars.baseurl + '/media/img/' + img + '" /></div>' +
                '<div style="float:left"><ol id="done"></ol></div>',
                function () {
                    JMVC.events.delay(function () {
                        var img = JMVC.dom.find('img'),
                            flt = JMVC.image.createFilter(img);
                        flt.prepare();
                        JMVC.events.on(JMVC.dom.find('#brightness'), 'click', function () {
                            flt.filterImage(flt.filters.brightness, 20);
                            track('brightness');
                        });
                        JMVC.events.on(JMVC.dom.find('#threshold'), 'click', function () {
                            flt.filterImage(flt.filters.threshold, 50);
                            track('threshold');
                        });
                        JMVC.events.on(JMVC.dom.find('#grayscale'), 'click', function () {
                            flt.filterImage(flt.filters.grayscale);
                            track('grayscale');
                        });
                        JMVC.events.on(JMVC.dom.find('#invert'), 'click', function () {
                            flt.filterImage(flt.filters.invert);
                            track('invert');
                        });
                        JMVC.events.on(JMVC.dom.find('#blur'), 'click', function () {
                            flt.filterImage(flt.filters.blur);
                            track('blur');
                        });
                        JMVC.events.on(JMVC.dom.find('#sharpen'), 'click', function () {
                            flt.filterImage(flt.filters.sharpen);
                            track('sharpen');
                        });
                        JMVC.events.on(JMVC.dom.find('#laplace'), 'click', function () {
                            flt.filterImage(flt.filters.laplace);
                            track('laplace');
                        });
                        JMVC.events.on(JMVC.dom.find('#sobeloriz'), 'click', function () {
                            flt.filterImage(flt.filters.sobeloriz);
                            track('sobel orizontal');
                        });
                        JMVC.events.on(JMVC.dom.find('#sobelvert'), 'click', function () {
                            flt.filterImage(flt.filters.sobelvert);
                            track('sobel vertical');
                        });
                        JMVC.events.on(JMVC.dom.find('#emboss'), 'click', function () {
                            flt.filterImage(flt.filters.emboss);
                            track('emboss');
                        });
                        JMVC.events.on(JMVC.dom.find('#red'), 'click', function () {
                            flt.filterImage(flt.filters.remove, 0);
                            track('red channel removed');
                        });
                        JMVC.events.on(JMVC.dom.find('#green'), 'click', function () {
                            flt.filterImage(flt.filters.remove, 1);
                            track('green channel removed');
                        });
                        JMVC.events.on(JMVC.dom.find('#blue'), 'click', function () {
                            flt.filterImage(flt.filters.remove, 2);
                            track('blue channel removed');
                        });
                        JMVC.events.on(JMVC.dom.find('#x'), 'click', function () {
                            flt.filterImage(flt.filters.x);
                            track('x filter');
                        });
                        JMVC.events.on(JMVC.dom.find('#mblur'), 'click', function () {
                            flt.filterImage(flt.filters.mblur);
                            track('motion blur');
                        });
                        JMVC.events.on(JMVC.dom.find('#reset'), 'click', function () {
                            flt.reset();
                            track.reset();
                        });
                    }, 1000);
                }
            );
        });
    };

    this.action_viewplus = function () {
        JMVC.head.title('Hello');
        var sv = JMVC.getView('superview'),
            v = JMVC.getView('sv');
        v.set('goal', ', I said hellooooooo !!!');
        sv.set('hello', ' yeah hello');
        v.render();
    };

    this.action_logo = function () {
        JMVC.head.title('JMVC logo');
        JMVC.events.loadify(1000);

        JMVC.require(
            'plotter/plotter'
            , 'core/obj/bucket/bucket'
        );

        var M = Math,
            v = JMVC.getView('vacuum');

        v.set({
            'style': 'font-family:verdana;margin:0 auto;width:393px;height:113px;margin-top:80px;position:relative;' + (JMVC.p.back ? ';background-image:url(' + JMVC.vars.baseurl + '/media/img/jmvc_n2.png);' : ''),
            'content': '&nbsp;',
            'id': 'extralogo'
        });

        JMVC.head.addStyle(JMVC.vars.baseurl + '/media/css/logo.css');

        v.render({
            cback: function () {
                var newlogo = document.getElementById('extralogo'),
                    /* eslint-disable new-cap */
                    j = new JMVC.plotter.symbol('j', 0, 0),
                    m = new JMVC.plotter.symbol('m', 76, 0),
                    v = new JMVC.plotter.symbol('v', 228, 0),
                    c = new JMVC.plotter.symbol('c', 333, 0),
                    /* eslint-enable new-cap */
                    scale = parseFloat(JMVC.p.scale, 10) || 1,
                    a = newlogo.childNodes,
                    T1 = 20,
                    T2 = 10,
                    bucket, col;

                JMVC.dom.addClass(newlogo, 'respfixed');

                j.line(2, 14, 6, 36, 2);
                j.line(6, 36, 28, 40, 2);
                j.line(28, 40, 28, 6, 3);
                j.line(28, 6, 2, 14, 2);
                j.line(35, 5, 35, 40, 3);
                j.line(35, 5, 65, 2, 3);
                j.line(65, 2, 65, 40, 3);
                j.line(14, 72, 22, 106, 3);
                j.arc(-7, 40, 72, 72, M.PI / 27, 0, 10);
                j.arc(-17, 40, 52, 42, M.PI / 17, 0, 5);

                m.line(0, 10, 0, 56, 5);
                m.line(0, 56, 30, 61, 3);
                m.line(30, 61, 30, 6, 5);
                m.line(30, 6, 0, 10, 3);
                m.line(37, 18, 37, 48, 3);
                m.arc(35, 83, 53, 66, -M.PI / 21, 0, 11);
                m.arc(35, 83, 23, 36, -M.PI / 12, 0, 5);
                m.line(58, 90, 88, 94, 2);
                m.line(79, 26, 92, 50, 2);
                m.arc(104, 72, 39, 54, -M.PI / 15.7, 0, 11);
                m.line(116, 78, 142, 72, 2);
                m.arc(102, 72, 14, 25, -M.PI / 6, -M.PI / 18, 4);

                v.line(0, 56, 10, 28, 2);
                v.line(10, 28, 40, 60, 4);
                v.line(40, 60, 30, 90, 2);
                v.line(30, 90, 0, 56, 4);
                v.line(48, 60, 38, 90, 2);
                v.arc(48, 24, 21, 37, M.PI / 10, -M.PI / 9, 6);
                v.line(67, 11, 97, 15, 2);
                v.arc(46, 24, 51, 65, M.PI / 18, 0, 10);

                c.line(0, 48, 30, 53, 2);
                c.line(46, 3, 54, 30, 2);
                c.line(0, 57, 54, 65, 5);
                c.line(54, 65, 46, 96, 3);
                c.arc(50, 50, 20, 18, -M.PI / 8, -M.PI / 2 - 0.2, 4);
                c.arc(40, 40, 39, 36, -M.PI / 12.5, -M.PI / 2 - 0.1, 7);
                c.arc(45, 58, 45, 38, -M.PI / 16, M.PI - 0.2, 7);

                j.plot(newlogo, scale);
                m.plot(newlogo, scale);
                v.plot(newlogo, scale);
                c.plot(newlogo, scale);

                // eslint-disable-next-line new-cap
                bucket = new JMVC.bucket.create(JMVC.util.range(0, a.length - 1));

                window.setInterval(function () {
                    // var trg = JMVC.util.rand(1,a.length-1);
                    if (!bucket.hasMore()) {
                        bucket.recover();
                    }
                    var trg = bucket.next() || 1;
                    try {
                        col = a[trg].style.color;
                    } catch (e) {
                        JMVC.debug(trg);
                    }
                    window.setTimeout(
                        function (t1) {
                            a[t1].style.color = 'white';
                            a[t1].style.fontSize = '10px';
                            window.setTimeout(
                                function (t2) {
                                    a[t2].style.color = col;
                                }, T1, t1
                            );
                        }, 0, trg
                    );
                }, T2);
            }
        });
        /*
            if enabled will not allow that logo to be se in a frame or iframe
            JMVC.util.denyXframe();
        */
    };

    this.action_xmlparser = function () {
        JMVC.require('core/xmlparser/xmlparser');
        // eslint-disable-next-line new-cap
        var d = new JMVC.xmlparser.load('<?xml version="1.0" encoding="UTF-8" ?><root><el><name sex="M">federico</name><surname>ghedina</surname><struct><a>A</a><b>B</b></struct></el><el><name>federico2</name><surname>ghedina2</surname></el></root>'),
            // eslint-disable-next-line no-unused-vars
            t = false;
        d.extractor(function (node) {
            return {
                name: JMVC.xmlparser._text(node.childNodes[0]),
                surname: JMVC.xmlparser._text(node.childNodes[1]),
                sex: JMVC.xmlparser._attribute(node.childNodes[0], 'sex')
            };
        });
        t = d.extractor(0);

        d.extractor(
            function (node) {
                JMVC.debug(2, node);
                return {
                    a: JMVC.xmlparser._text(node)
                };
            },
            true
        );
        d.pointer(d.xmlDoc.getElementsByTagName('struct')[0]);
        t = d.extractor(0);
        t = d.extractor(1);
        /* JMVC.yes.prova(); */
    };

    this.action_docs = function () {
        JMVC.require('core/xmlparser/xmlparser');

        JMVC.io.get(

            JMVC.vars.baseurl + '/media/documentation.xml',

            function (doc) {
                // eslint-disable-next-line new-cap
                var parser = new JMVC.xmlparser.load(doc);

                parser.extractor(function (node) {
                    // JMVC.debug('node is ',node);
                    var ret = {
                        signature: JMVC.xmlparser._text(node.childNodes[0]),
                        description: JMVC.xmlparser._text(node.childNodes[1]),
                        params: {},
                        returns: {
                            type: JMVC.xmlparser._text(node.childNodes[3]),
                            hint: JMVC.xmlparser._attribute(node.childNodes[3], 'hint')
                        }
                    };
                    /*
                        for(var j = 0, l= node.childNodes[2].childNodes.length; j<l; j++){
                            ret.params[  JMVC.xmlparser._attribute(node.childNodes[2].childNodes[j], 'name')  ]  =  JMVC.xmlparser._text(node.childNodes[2].childNodes[j]);
                        }
                    */
                    JMVC.each(node.childNodes[2].childNodes, function (el, i) {
                        ret.params[JMVC.xmlparser._attribute(el, 'name')] = JMVC.xmlparser._text(el);
                    });
                    return ret;
                });
                parser.pointer(parser.xmlDoc.getElementsByTagName('dom')[0]);

                /*
                    JMVC.debug(JMVC.xmlparser.toJson(parser.xmlDoc.getElementsByTagName('dom')[0] ));
                */

                /*
                var r = parser.extractor(0),
                    all = parser.extractall();
                JMVC.debug(all);
                */

                /*
                step into model
                parser.pointer(parser.xmlDoc.getElementsByTagName('model')[0]);
                r = parser.extractor(0);
                */
                /* JMVC.debug(r); */
            },
            true
        );
    };

    this.action_scheduler = function () {
        JMVC.require('scheduler/scheduler');
        var s = JMVC.scheduler.create();
        s.add({
            every: 3000
        }, function (d) {
            JMVC.debug(d);
        });
        s.add({
            every: 5000
        }, function (d) {
            JMVC.debug('hei heiiiii ' + d);
        });

        JMVC.W.s = s;
    };

    this.action_observer = function () {
        JMVC.require('core/codeview/codehl/codehl');
        var list = JMVC.getModel('List', ['Item0', 'Item1', 'Item2', 'Item3']),
            v = JMVC.getView('vacuum'),
            explain = 'Use buttons to add/remove items to the list (constructed with some elements)<br />' +
                '<[H[' +
                'var list = JMVC.getModel(\'List\', [\'Item0\', \'Item1\', \'Item2\', \'Item3\']);' +
                ']H]>',
            B = JMVC.dom.body();

        /* JMVC.debug(list.getItems()); */
        v.set({
            style: 'background-color:red; color:white;padding:10px;margin-bottom:10px;',
            id: 'prova'
        });
        v.set('content', explain);
        /* JMVC.debug(v); */

        list.setBuildStrategy(function (ul) {
            JMVC.dom.empty(ul);
            JMVC.each(list.getItems(), function (el, i) {
                JMVC.dom.append(ul, JMVC.dom.create('li', {}, i + ' : ' + el));
            });
        });

        v.render({
            cback: function () {
                var buttPlus = JMVC.dom.add(B, 'input', {
                        type: 'button',
                        value: '+',
                        id: 'buttPlus'
                    }),
                    buttMinus = JMVC.dom.add(B, 'input', {
                        type: 'button',
                        value: '-',
                        id: 'buttMinus'
                    }),
                    ulist = JMVC.dom.add(B, 'ul', {
                        style: 'list-style-type:none;padding:10px;border:1px solid gray;width:200px;background-color:#eee;',
                        id: 'mylist'
                    }),
                    item;

                JMVC.events.on(buttPlus, 'click', function () {
                    item = prompt('Item to add');
                    if (item !== null && item !== '') {
                        list.addItem(item);
                    }
                });
                JMVC.events.on(buttMinus, 'click', function () {
                    item = prompt('Item index to be removed');
                    if (item !== null && item !== '' && !isNaN(item)) {
                        list.removeItemAt(item);
                    } else {
                        alert('Noitem with index ' + item);
                    }
                });

                /* or simply */
                list.listModified.attach(function () {
                    list.build(ulist);
                });

                /* first time build */
                list.build(ulist);
            }
        });
    };

    this.action_fx = function () {
        JMVC.require('core/fx/fx', 'animator/animator', 'core/obj/calendar/calendar', 'timer/timer');
        //
        var v = JMVC.getView('vacuum'),
            B = JMVC.dom.body();
        v.set({
            style: 'background-color:red',
            id: 'prova'
        });
        v.set('content', 'hello u');
        v.render({
            cback: function () {
                JMVC.dom.add(B, 'span', {
                    id: 'bull'
                }, '&bull;');

                var trg = JMVC.dom.add(B, 'div', {
                        id: 'timer'
                    }),
                    cal = JMVC.dom.add(B, 'div', {
                        id: 'cal'
                    }),
                    calInst;

                JMVC.css.style(cal, {
                    'border': '5px solid gray',
                    'padding': '10px',
                    'margin': '20px',
                    'background-color': 'pink'
                });

                // eslint-disable-next-line new-cap
                calInst = new JMVC.calendar.create();
                calInst.getMonthMap(6, 2013);
                calInst.getContour(6, 2013);

                JMVC.dom.html(cal, calInst.render());

                JMVC.timer.create({
                    target: trg,
                    lang: 'en-us',
                    format: '%YYYY% %MM% the %D% %S%'
                });

                JMVC.fx.fadeIn(JMVC.dom.find('#prova'));

                JMVC.animator.follow_ipath(
                    JMVC.dom.find('#bull'),
                    function (i) {
                        return Math.abs(20 * Math.cos(i / 10));
                    }, {
                        from: 0,
                        to: 400
                    }, {
                        step: 2,
                        mode: 'back'
                    }
                );
            }
        });
    };

    this.action_divrot = function () {
        JMVC.require('widget/divrot/divrot');

        JMVC.head.title('Use arrow keys or swipe');

        JMVC.css.style(JMVC.WD.body, {
            'font-family': 'Verdana, sans-serif'
        });

        JMVC.events.loadify(500);

        var videoContents = [
            '<img src="http://cdn.makeagif.com/media/3-21-2015/tKTOVd.gif" style="width:100%">',
            '<img src="http://cdn.makeagif.com/media/3-21-2015/S_qd1S.gif" style="width:100%">',
            '<img src="http://cdn.makeagif.com/media/3-21-2015/jBjHUs.gif" style="width:100%">',
            '<img src="http://cdn.makeagif.com/media/3-21-2015/OY1rRE.gif" style="width:100%">',
            '<img src="http://cdn.makeagif.com/media/3-21-2015/_QGR8Q.gif" style="width:100%">',
            '<img src="http://cdn.makeagif.com/media/3-21-2015/5t9uEb.gif" style="width:100%">'
        ];

        JMVC.getView('vacuum')
            .set({
                style: 'margin-top:20px',
                id: 'container',
                'content': ''
            })
            .render(function () {
                if (JMVC.p.aberrate) {
                    JMVC.head.addStyle(JMVC.vars.baseurl + '/app/extensions/widget/divrot/divrot_aberrate.css', true);
                }

                var dstNode = JMVC.dom.find('#container'),
                    cnt = JMVC.p.video ? videoContents : ['bottom', 'front', 'right', 'left', 'back', 'top'];
                window.divrot = JMVC.widget.divrot.create({
                    node: dstNode,
                    bott: '<div class="inner">' + cnt[0] + '</div>',
                    front: '<div class="inner">' + cnt[1] + '</div>',
                    right: '<div class="inner">' + cnt[2] + '</div>',
                    left: '<div class="inner">' + cnt[3] + '</div>',
                    back: '<div class="inner">' + cnt[4] + '</div>',
                    top: '<div class="inner">' + cnt[5] + '</div>'
                });
                JMVC.dom.add(dstNode, 'h2', {}, 'Swipe in the 8 directions or use the arrow keys to flip around');
                if (JMVC.p.aberrate) {
                    JMVC.dom.add(dstNode, 'a', {
                        href: JMVC.util.getLink('demo', 'divrot')
                    }, 'Default cube');
                } else {
                    JMVC.dom.add(dstNode, 'a', {
                        href: JMVC.util.getLink('demo', 'divrot', '?aberrate=true')
                    }, 'Inner cube');
                }
            });
    };

    this.action_divrotMobile = function () {
        JMVC.require('widget/divrot/divrot');
        JMVC.head.title('Use arrow keys');
        JMVC.css.style(JMVC.WD.body, {
            'font-family': 'Verdana, sans-serif'
        });
        JMVC.getView('vacuum')
            .set({
                style: '',
                id: 'container',
                'content': ''
            })
            .render(function () {
                if (JMVC.p.aberrate) {
                    JMVC.head.addStyle(JMVC.vars.baseurl + '/app/extensions/widget/divrot/divrot_aberrate.css', true);
                }

                var dstNode = JMVC.dom.find('#container');
                window.divrot = JMVC.widget.divrot.create({
                    node: dstNode,
                    bott: '<div class="inner">Bottom</div>',
                    front: '<div class="inner">Front</div>',
                    right: '<div class="inner">Right</div>',
                    left: '<div class="inner">Left</div>',
                    back: '<div class="inner">Back</div>',
                    top: '<div class="inner">Top</div>'
                });
                JMVC.dom.add(dstNode, 'h2', {}, 'Use arrow keys to flip around');
                if (JMVC.p.aberrate) {
                    JMVC.dom.add(dstNode, 'a', {
                        href: JMVC.util.getLink('demo', 'divrot')
                    }, 'Default cube');
                } else {
                    JMVC.dom.add(dstNode, 'a', {
                        href: JMVC.util.getLink('demo', 'divrot', '?aberrate=true')
                    }, 'Inner cube');
                }
            });
    };

    this.action_captcha = function () {
        JMVC.require('core/captcha/captcha');

        JMVC.head.title('Captcha');
        JMVC.css.style(JMVC.WD.body, {
            'font-family': 'Verdana, sans-serif'
        });

        JMVC.getView('vacuum')
            .set({
                style: '',
                id: 'container',
                'content': ''
            })
            .render(function () {
                JMVC.core.captcha.create(JMVC.dom.find('#container'));
            });
    };

    this.action_dropbox = function () {
        JMVC.require('vendors/dropbox/dropbox');
        JMVC.head.title('Dropbox attempt');
        var dbox;

        JMVC.getView('vacuum')
            .set({
                style: '',
                id: 'container',
                'content': ''
            })
            .render(function () {
                dbox = JMVC.vendors.dropbox.create();

                dbox.login(function () {
                    // dbox.getTable('tasklists');
                    // dbox.insert('tasklists', {name:'Federico', surname : 'Ghedina'});
                    // dbox.truncate('tasklists');
                    dbox.getFileContent('hw.html', function (err, cnt) {
                        console.debug(cnt);
                        if (err) {
                            console.debug(err);
                        }
                    });
                });
                // db.logout();
            });
    };

    this.action_drawer = function () {
        JMVC.require(
            'core/mobile/drawer/drawer',
            'core/lorem'
        );

        JMVC.getView('vacuum')
            .set({
                style: '',
                id: 'container',
                'content': ''
            })
            .render(function () {
                document.body.style.backgroundColor = 'red';
                document.body.style.padding = '50px';
                document.body.innerHTML = JMVC.string.lorem(500);

                var drawer = JMVC.mobile.drawer.create([{
                    label: 'JMVC logo',
                    href: '/demo/logo.html'
                }, {
                    label: 'Google logo plotted',
                    href: '/google.jmvc'
                }, {
                    label: 'Google logo plotted flash',
                    href: '/google.jmvc?flash'
                }, {
                    label: 'Google logo plotted aberration',
                    href: '/google.jmvc?aberrate'
                }]);

                drawer.render();
            });
    };

    this.action_shadow = function () {
        var that = this;
        JMVC.require(
            'core/mobile/drawer/drawer',
            'core/lorem',
            'plotter/shadowMatrix'
        );

        JMVC.head.title('JMVC plotter example');

        JMVC.getView('vacuum')
            .set({
                style: 'padding:0px 10px 50px',
                id: 'container'
            })
            .render(function () {
                var size = that.get('size') || 5,
                    cnt = JMVC.dom.find('#container'),
                    flag = JMVC.dom.create('div', { id: 'flag' }),
                    space1 = JMVC.dom.create('div', { id: 'space1' }),
                    space2 = JMVC.dom.create('div', { id: 'space2' }),
                    space3 = JMVC.dom.create('div', { id: 'space3' }),
                    space4 = JMVC.dom.create('div', { id: 'space4' }),
                    space5 = JMVC.dom.create('div', { id: 'space5' }),
                    mario = JMVC.dom.create('div', { id: 'mario' }),
                    pacman = JMVC.dom.create('div', { id: 'pacman' }),
                    dimonni = JMVC.dom.create('div', { id: 'dimonni' }),

                    ul = JMVC.dom.create('div'),
                    li0 = JMVC.dom.add(ul, 'div', { style: 'margin:20px' }),
                    li1 = JMVC.dom.add(ul, 'div', { style: 'margin:20px' }),
                    li2 = JMVC.dom.add(ul, 'div', { style: 'margin:20px' }),
                    li3 = JMVC.dom.add(ul, 'div', { style: 'margin:20px' }),
                    li4 = JMVC.dom.add(ul, 'div', { style: 'margin:20px' }),
                    li5 = JMVC.dom.add(ul, 'div', { style: 'margin:20px' }),
                    li6 = JMVC.dom.add(ul, 'div', { style: 'margin:20px' }),
                    li7 = JMVC.dom.add(ul, 'div', { style: 'margin:20px' }),
                    li8 = JMVC.dom.add(ul, 'div', { style: 'margin:20px' }),
                    sm0, sm1, sm2, sm3, sm4, sm5, sm6, sm7, sm8;

                JMVC.css.style(JMVC.WDB, { padding: '50px' });

                JMVC.dom.append(li0, flag);
                JMVC.dom.append(li1, space1);
                JMVC.dom.append(li2, space2);
                JMVC.dom.append(li3, space3);
                JMVC.dom.append(li4, space4);
                JMVC.dom.append(li5, space5);
                JMVC.dom.append(li6, mario);
                JMVC.dom.append(li7, pacman);
                JMVC.dom.append(li8, dimonni);
                JMVC.dom.append(cnt, ul);
                JMVC.dom.append(JMVC.WDB, cnt);

                sm0 = JMVC.shadowMatrix({
                    scale: size,
                    matrix: [
                        '.,.,.,.,.,.,.,.,.,.,.,.,.,.',
                        '.,.,.,.,.,.,.,.,.,.,.,.,.,.',
                        '.,.,.,.,.,.,O,O,.,.,.,.,.,.',
                        '.,.,.,.,.,.,O,O,.,.,.,.,.,.',
                        '.,.,.,.,O,O,O,O,O,O,.,.,.,.',
                        '.,.,.,.,O,O,O,O,O,O,.,.,.,.',
                        '.,.,.,.,.,.,O,O,.,.,.,.,.,.',
                        '.,.,.,.,.,.,O,O,.,.,.,.,.,.',
                        '.,.,.,.,.,.,.,.,.,.,.,.,.,.',
                        '.,.,.,.,.,.,.,.,.,.,.,.,.,.'
                    ],
                    colorMap: {
                        'O': 'transparent',
                        '.': 'red'
                    }
                });
                sm1 = JMVC.shadowMatrix({
                    scale: size,
                    matrix: [
                        ' , ,L,#,#,R, , ',
                        ' ,L,#,#,#,#,R, ',
                        'L,#,#,#,#,#,#,R',
                        '#,#, ,#,#, ,#,#',
                        '#,#,#,#,#,#,#,#',
                        ' ,#, ,#,#, ,#, ',
                        '#, , , , , , ,#',
                        ' ,#, , , , ,#, '
                    ],
                    colorMap: {
                        'L': [JMVC.shadowMatrix.triUL, { color: '#' }],
                        'R': [JMVC.shadowMatrix.triUR, { color: '#' }],
                        '#': '#0a0',
                        ' ': 'transparent'
                    }
                });
                sm2 = JMVC.shadowMatrix({
                    scale: size,
                    matrix: [
                        ' , ,#, , , , , ,#, , ',
                        ' , , ,#, , , ,#, , , ',
                        ' , ,#,#,#,#,#,#,#, , ',
                        ' ,#,#, ,#,#,#, ,#,#, ',
                        '#,#,#,#,#,#,#,#,#,#,#',
                        '#, ,#,#,#,#,#,#,#, ,#',
                        '#, ,#, , , , , ,#, ,#',
                        ' , , ,#,#, ,#,#, , , '
                    ],
                    colorMap: {
                        '#': '#008',
                        ' ': 'transparent'
                    }
                });
                sm3 = JMVC.shadowMatrix({
                    scale: size,
                    matrix: [
                        ' , , , ,#,#,#,#, , , , ',
                        ' ,#,#,#,#,#,#,#,#,#,#, ',
                        '#,#,#,#,#,#,#,#,#,#,#,#',
                        '#,#,#, , ,#,#, , ,#,#,#',
                        '#,#,#,#,#,#,#,#,#,#,#,#',
                        ' , ,#,#,#, , ,#,#,#, , ',
                        ' ,#,#, , ,#,#, , ,#,#, ',
                        ' , ,#,#, , , , ,#,#, , '
                    ],
                    colorMap: {
                        '#': '#DD127D',
                        ' ': 'transparent'
                    }
                });
                sm4 = JMVC.shadowMatrix({
                    scale: size,
                    matrix: [
                        ' , , , , ,#,#,#,#,#,#, , , , , ',
                        ' , , ,#,#,#,#,#,#,#,#,#,#, , , ',
                        ' , ,#,#,#,#,#,#,#,#,#,#,#,#, , ',
                        ' ,#,#, ,#,#, ,#,#, ,#,#, ,#,#, ',
                        '#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#',
                        ' , ,#,#,#, , ,#,#, , ,#,#,#, , ',
                        ' , , ,#, , , , , , , , ,#, , , '
                    ],
                    colorMap: {
                        '#': '#ffdd00',
                        ' ': 'transparent'
                    }
                });
                sm5 = JMVC.shadowMatrix({
                    scale: size,
                    matrix: [
                        ' , , , , , , ,#, , , , , , , ',
                        ' , , , , , ,#,#,#, , , , , , ',
                        ' , , , , , ,#,#,#, , , , , , ',
                        ' ,#,#,#,#,#,#,#,#,#,#,#,#,#, ',
                        '#,#,#,#,#,#,#,#,#,#,#,#,#,#,#',
                        '#,#,#,#,#,#,#,#,#,#,#,#,#,#,#',
                        '#,#,#,#,#,#,#,#,#,#,#,#,#,#,#',
                        '#,#,#,#,#,#,#,#,#,#,#,#,#,#,#'
                    ],
                    colorMap: {
                        '#': '#0f0',
                        ' ': 'transparent'
                    }
                });
                sm6 = JMVC.shadowMatrix({
                    scale: size,
                    matrix: [
                        ' , , ,#,#,#,#,#, , , , ',
                        ' , ,#,#,#,#,#,#,#,#,#, ',
                        ' , ,@,@,@,$,$,@,$, , , ',
                        ' ,@,$,@,$,$,$,@,$,$,$, ',
                        ' ,@,$,@,@,$,$,$,@,$,$,$',
                        ' ,@,@,$,$,$,$,@,@,@,@, ',
                        ' , , ,$,$,$,$,$,$,$, , ',
                        ' , ,@,@,#,@,@,@, , , , ',
                        ' ,@,@,@,#,@,@,#,@,@,@, ',
                        '@,@,@,@,#,#,#,#,@,@,@,@',
                        '$,$,@,#,$,#,#,$,#,@,$,$',
                        '$,$,$,#,#,#,#,#,#,$,$,$',
                        '$,$,#,#,#,#,#,#,#,#,$,$',
                        ' , ,#,#,#, , ,#,#,#, , ',
                        ' ,@,@,@, , , , ,@,@,@, ',
                        '@,@,@,@, , , , ,@,@,@,@'
                    ],
                    colorMap: {
                        '#': '#db0102', // red
                        '$': '#f8aa00', // skin
                        '@': '#706700', // hair
                        ' ': 'transparent'
                    }
                });
                sm7 = JMVC.shadowMatrix({
                    scale: size,
                    matrix: [
                        ' , , ,y,y,y,y,y, , , , , , , , , , , , , , , , ,p,p,p,p, , , , , , , , , , , , , , , , , ,c,c,c,c, , , , , ',
                        ' ,y,y,y,y,y,y,y,y,y, , , , , , , , , , , , ,p,p,p,p,p,p,p,p, , , , , , , , , , , , , ,c,c,c,c,c,c,c,c, , , ',
                        'y,y,y,y,y,y,y,y,y,y,y, , , , , , , , , , ,p,p,p,p,p,p,p,p,p,p, , , , , , , , , , , ,c,c,c,c,c,c,c,c,c,c, , ',
                        'y,y,y,y,y,y,y,y,y,y,y, , , , , , , , , ,p,p,p, , ,p,p,p,p, , ,p, , , , , , , , , ,c,c, , ,c,c,c,c, , ,c,c, ',
                        ' , ,y,y,y,y,y,y,y,y,y,y, , , , , , , , ,p,p, , , , ,p,p, , , , , , , , , , , , , ,c, , , , ,c,c, , , , ,c, ',
                        ' , , , , , ,y,y,y,y,y,y, , , , , , , , ,p,p, , ,E,E,p,p, , ,E,E, , , , , , , , , ,c, ,E,E, ,c,c, ,E,E, ,c, ',
                        ' , , , , , , , ,y,y,y,y, , , , , , , ,p,p,p, , ,E,E,p,p, , ,E,E,p, , , , , , , ,c,c, ,E,E, ,c,c, ,E,E, ,c,c',
                        ' , , , , , ,y,y,y,y,y,y, , , , , , , ,p,p,p,p, , ,p,p,p,p, , ,p,p, , , , , , , ,c,c,c, , ,c,c,c,c, , ,c,c,c',
                        ' , ,y,y,y,y,y,y,y,y,y,y, , , , , , , ,p,p,p,p,p,p,p,p,p,p,p,p,p,p, , , , , , , ,c,c,c,c,c,c,c,c,c,c,c,c,c,c',
                        'y,y,y,y,y,y,y,y,y,y,y, , , , , , , , ,p,p,p,p,p,p,p,p,p,p,p,p,p,p, , , , , , , ,c,c,c,c,c,c,c,c,c,c,c,c,c,c',
                        'y,y,y,y,y,y,y,y,y,y,y, , , , , , , , ,p,p,p,p,p,p,p,p,p,p,p,p,p,p, , , , , , , ,c,c,c,c,c,c,c,c,c,c,c,c,c,c',
                        ' ,y,y,y,y,y,y,y,y,y, , , , , , , , , ,p,p, ,p,p,p, , ,p,p,p, ,p,p, , , , , , , ,c,c, ,c,c,c, , ,c,c,c, ,c,c',
                        ' , , ,y,y,y,y,y, , , , , , , , , , , ,p, , , ,p,p, , ,p,p, , , ,p, , , , , , , ,c, , , ,c,c, , ,c,c, , , ,c'
                    ],
                    colorMap: {
                        ' ': 'transparent',
                        'y': '#ff0', // red
                        'r': '#f00', // skin
                        'p': '#faa', // hair
                        'a': '#aaf', // hair
                        'c': 'coral', // hair
                        'o': '#f83',
                        'E': '#005'
                    }
                });
                sm8 = JMVC.shadowMatrix({
                    scale: size,
                    matrix: [
                        ' , , , , , , , , , , , , , , , , , , , , , , , ',
                        ' , , , , , , , , , , , , , , , , , , , , , , , ',
                        ' , , , , , ,O,-,O,-,O,-,O,-,O,-,b, , , , , , , ',
                        ' , , , , ,B,-,-,-,-,-,-,-,-,-,-,B, , , , , , , ',
                        ' , , , , ,B,-,-,-,-,-,-,-,-,O,-,O, , , , , , , ',
                        ' , , , ,B,-,-,-,-,-,-,-,-,-,-,-,-,B, , , , , , ',
                        ' , , , ,B,-,-,-,-,-,-,-,-,-,-,-,O,B,B, , , , , ',
                        ' , , , ,B,-,-,-,-,-,-,-,-,-,-,-,-,-,B, , , , , ',
                        ' , , , ,B,-,-,-,-,-,-,-,-,-,-,-,-,-,B, , , , , ',
                        ' , , , ,B,B,-,-,-,-,B,B,-,-,-,-,-,-,B, , , , , ',
                        ' , , , ,O,B, ,O,O,O,O,B, , ,O,-,-,-,-,B, , , , ',
                        ' , , , ,O, , ,O,O, ,O, , , ,O,-,-,-,-,B, , , , ',
                        ' , , , ,B,O,O,-,-,-,-,O,O,O,-,-,-,-,-,B, , , , ',
                        ' , , , ,B,-,-,B,B,-,-,-,-,-,-,-,-,-,-,B, , , , ',
                        ' , , , , ,B,-,-,-,-,-,-,-,-,-,-,-,B,B, , , , , ',
                        ' , , , , ,B,-,-,-,-,-,B,-,-,-,-,-,B, , , , , , ',
                        ' , , , , ,B,-,-,B,B,B,-,-,-,-,-,B,B, , , , , , ',
                        ' , , , ,B,+,B,-,-,-,-,-,-,-,B,B,+,+,B,B,B, , , ',
                        ' , , , ,B,+,+,B,B,-,-,B,B,B,B,+,+,+,B,-,B, , , ',
                        ' , ,B,B,-,+,+,+,+,B,B,+,+,+,+,+,B,B,B,-,-,B, , ',
                        'B,B,-,-,-,+,+,+,+,+,+,+,+,+,+,+,B,-,-,-,-,B,B, ',
                        'B,-,-,-,-,B,B,+,+,+,+,+,+,+,+,+,B,B,B,-,-,-,B, ',
                        'B,-,-,-,B, ,B,+,+,+,c,c,+,+,+,B, , ,B,-,-,B,B, ',
                        ' ,B,B,B, , ,B,+,+,c,+,+,x,+,+,B, , , ,B,-,B, , ',
                        ' , , , , , ,B,+,+,c,+,+,y,+,+,B,B, , ,B,B,B, , ',
                        ' , , , , , ,B,+,+,+,c,c,+,+,+,+,B,B, , , , , , '
                    ],
                    colorMap: {
                        ' ': 'transparent',
                        'B': '#000',
                        '-': '#f0d6b5', // pink
                        'O': '#5f3006', // marrone
                        '+': '#a8e00d', // green
                        'c': '#7b78e3', // celeste c
                        'x': '#928398', // riga1
                        'y': '#845500' // riga1
                    }
                });

                sm0.draw({ node: flag });
                sm1.draw({ node: space1 });
                sm2.draw({ node: space2 });
                sm3.draw({ node: space3 });
                sm4.draw({ node: space4 });
                sm5.draw({ node: space5 });
                sm6.draw({ node: space5 });
                sm7.draw({ node: pacman });
                sm8.draw({ node: dimonni });

                window.setInterval(function () {
                    sm6.mirror();
                }, 500);
            });
    };

    this.action_pixelplotter = function () {
        var that = this;
        JMVC.require(
            'core/mobile/drawer/drawer',
            'core/lorem',
            'plotter/shadowMatrix'
        );

        JMVC.getView('vacuum')
            .set({
                style: 'padding:0px 10px 50px',
                id: 'container'
            })
            .render(function () {
                var size = that.get('size') || 5,
                    cnt = JMVC.dom.find('#container'),
                    to = window.setInterval(function () { }, 1E6),
                    go = function () { },
                    character = 'mario',
                    characters = {};

                characters = {
                    spiderman: {
                        pixelMap: [
                            ' , , , , , , , ,x,x,x,x,x,x, , , , , , , ',
                            ' , , , , , , ,x,o,o,o,o,o,o,x, , , , , , ',
                            ' , , , , , ,x,o,o,o,o,o,o,o,o,x, , , , , ',
                            ' , , , , , ,x,o,o,x,x,x,o,o,o,x, , , , , ',
                            ' , , , , ,x,o,o,x,.,.,.,x,o,x,.,x, , , , ',
                            ' , , , , ,x,o,x,.,.,.,.,x,x,.,.,x, , , , ',
                            ' , , , , ,x,o,x,.,.,.,.,.,.,.,.,x, , , , ',
                            ' , , , , ,x,o,x,.,.,.,.,.,.,.,.,x, , , , ',
                            ' , , , , ,x,o,x,.,.,.,.,x,x,.,.,x, , , , ',
                            ' , , , , , ,x,o,x,.,.,x,o,o,x,.,x, , , , ',
                            ' , , , ,x,x,o,x,o,x,x,o,o,o,o,x, , , , , ',
                            ' , , ,x,o,i,i,o,x,o,o,o,o,o,x,o,x,x, , , ',
                            ' , ,x,o,i,i,i,i,o,x,x,x,x,x,o,i,i,o,x, , ',
                            ' ,x,o,i,i,i,i,i,i,o,o,o,o,o,i,i,i,i,o,x, ',
                            ' ,x,o,i,x,x,x,i,i,i,i,i,i,i,x,x,x,i,o,x, ',
                            ' ,x,o,o,o,x,x,o,o,o,o,o,o,o,x,x,o,o,o,x, ',
                            ' ,x,o,o,o,x,x,o,o,o,o,o,o,o,x,x,o,o,o,x, ',
                            ' , ,x,x,x, ,x,i,i,i,i,i,i,i,x, ,x,x,x, , ',
                            ' , , , , ,x,i,i,i,i,i,i,i,i,i,x, , , , , ',
                            ' , , , ,x,i,i,i,i,i,x,i,i,i,i,i,x, , , , ',
                            ' , , ,x,i,i,i,i,i,x, ,x,i,i,i,i,i,x, , , ',
                            ' ,x,x,o,o,o,o,o,x, , , ,x,o,o,o,o,o,x,x, ',
                            'x,o,o,o,o,o,o,o,x, , , ,x,o,o,o,o,o,o,o,x',
                            'x,x,x,x,x,x,x,x,x, , , ,x,x,x,x,x,x,x,x,x'
                        ],
                        colorMap: { 'x': '#000', 'o': '#f00', 'i': '#1065D0', '.': '#fff', ' ': 'transparent' }
                    },
                    mario: {
                        pixelMap: [
                            ' , , ,#,#,#,#,#, , , , ',
                            ' , ,#,#,#,#,#,#,#,#,#, ',
                            ' , ,i,i,i,O,O,i,O, , , ',
                            ' ,i,O,i,O,O,O,i,O,O,O, ',
                            ' ,i,O,i,i,O,O,O,i,O,O,O',
                            ' ,i,i,O,O,O,O,i,i,i,i, ',
                            ' , , ,O,O,O,O,O,O,O, , ',
                            ' , ,i,i,#,i,i,i, , , , ',
                            ' ,i,i,i,#,i,i,#,i,i,i, ',
                            'i,i,i,i,#,#,#,#,i,i,i,i',
                            'O,O,i,#,O,#,#,O,#,i,O,O',
                            'O,O,O,#,#,#,#,#,#,O,O,O',
                            'O,O,#,#,#,#,#,#,#,#,O,O',
                            ' , ,#,#,#, , ,#,#,#, , ',
                            ' ,i,i,i, , , , ,i,i,i, ',
                            'i,i,i,i, , , , ,i,i,i,i'
                        ],
                        colorMap: { '#': '#db0102', 'O': '#f8aa00', 'i': '#706700', ' ': 'transparent' }
                    }
                };

                JMVC.css.style(JMVC.WDB, { padding: '50px', backgroundColor: '#ddd' });

                JMVC.core.widgzard.render({
                    target: cnt,
                    content: [{
                        // gauge
                        tag: 'input',
                        attrs: {
                            'class': 'floatl',
                            type: 'range',
                            min: 1,
                            max: 50,
                            step: 1,
                            value: size
                        },
                        style: { margin: '20px' },
                        cb: function () {
                            var self = this,
                                $elf = self.node;
                            JMVC.events.on($elf, 'input', function () {
                                size = $elf.value;
                                go();
                            });
                            self.done();
                        }
                    }, {
                        tag: 'select',
                        'class': 'floatl',
                        style: { margin: '20px' },
                        content: [{
                            tag: 'option',
                            attrs: { value: 'mario' },
                            html: 'mario'
                        }, {
                            tag: 'option',
                            attrs: { value: 'spiderman' },
                            html: 'spiderman'
                        }],
                        cb: function () {
                            var self = this,
                                $elf = self.node;
                            JMVC.events.on($elf, 'change', function () {
                                character = $elf.value;
                                go();
                            });
                            self.done();
                        }
                    },
                    'clearer',
                    {
                        content: [{
                            style: {
                                height: 50 * size + 'px'
                            },
                            content: [{
                                style: { margin: '50px' },
                                wid: 'target'
                            }]
                        }]
                    }],
                    cb: function () {
                        var target = this.getNode('target').node;
                        go = function () {
                            window.clearInterval(to);

                            var sm0 = JMVC.shadowMatrix({
                                scale: size,
                                matrix: characters[character].pixelMap,
                                colorMap: characters[character].colorMap
                            });
                            sm0.draw({ node: target });
                            to = window.setInterval(function () {
                                sm0.mirror();
                            }, 500);
                        };
                        go();
                    }
                });
            });
    };

    this.action_shadowJMVC = function () {
        var that = this;
        JMVC.require(
            'core/mobile/drawer/drawer',
            'core/lorem',
            'plotter/shadowMatrix'
        );

        JMVC.head.title('JMVC shadow css');

        JMVC.getView('vacuum')
            .set({
                style: 'padding:0px 10px 50px',
                id: 'container'
            })
            .render(function () {
                var size = that.get('size') || 1,
                    JMVCdomCreate = JMVC.dom.create,
                    cnt = JMVC.dom.find('#container'),
                    input = JMVCdomCreate('input', { type: 'text', id: 'imgurl' }),
                    butt = JMVCdomCreate('input', { type: 'button', value: 'get it' }),
                    exportHtml = JMVCdomCreate('input', { type: 'button', value: 'get html' }),
                    pestCss = JMVCdomCreate('input', { type: 'button', value: 'pest css' }),
                    size1 = JMVCdomCreate('input', { type: 'button', value: 'size 1' }),
                    size2 = JMVCdomCreate('input', { type: 'button', value: 'size 2' }),
                    size3 = JMVCdomCreate('input', { type: 'button', value: 'size 3' }),
                    size4 = JMVCdomCreate('input', { type: 'button', value: 'size 4' }),
                    download = JMVCdomCreate('input', { type: 'button', value: 'download' }),
                    logo = JMVCdomCreate('div', { id: 'logo', style: 'margin-top:10px' }),
                    images = [
                        JMVCdomCreate('a', { href: 'javascript:;', alt: '/media/img/shad/js.jpg' }, 'js'),
                        JMVCdomCreate('a', { href: 'javascript:;', alt: '/media/img/shad/code.jpg' }, 'code'),
                        JMVCdomCreate('a', { href: 'javascript:;', alt: '/media/img/shad/javascript-save-all.jpg' }, 'will save us all'),
                        JMVCdomCreate('a', { href: 'javascript:;', alt: '/media/img/shad/Maurizio.png' }, 'java won`t'),
                        JMVCdomCreate('a', { href: 'javascript:;', alt: '/media/img/shad/raja.jpg' }, 'what about Raja?'),
                        JMVCdomCreate('a', { href: 'javascript:;', alt: '/media/img/shad/mememe.jpg' }, '&Lucas?'),
                        JMVCdomCreate('a', { href: 'javascript:;', alt: '/media/img/shad/verkstedt.png' }, 'verkstedt')
                    ];

                JMVC.css.style(JMVC.WDB, { padding: '50px' });
                JMVC.css.mappedStyle('xxx', 'a{margin-left:5px}');

                JMVC.dom.append(cnt, [input, butt, pestCss, exportHtml, size1, size2, size3, size4, download].concat(images, logo));
                JMVC.dom.append(JMVC.WDB, cnt);

                JMVC.events.on(butt, 'click', function () {
                    if (!input.value) {
                        document.location.search = '?size=1';
                    } else {
                        go(input.value || 1);
                    }
                });

                JMVC.events.on(exportHtml, 'click', function () {
                    alert('check out the console to get the full html');
                    console.log(logo.outerHTML.replace(/rgb\(/g, '\nrgb('));
                });
                JMVC.events.on(images, 'click', function () {
                    go(JMVC.vars.baseurl + JMVC.dom.attr(this, 'alt'));
                });
                JMVC.events.on(size1, 'click', function () {
                    JMVC.bom.qs({ size: 0.5 });
                });
                JMVC.events.on(size2, 'click', function () {
                    JMVC.bom.qs({ size: 1 });
                });
                JMVC.events.on(size3, 'click', function () {
                    JMVC.bom.qs({ size: 1.5 });
                });
                JMVC.events.on(size4, 'click', function () {
                    JMVC.bom.qs({ size: 2 });
                });
                JMVC.events.on(pestCss, 'click', function () {
                    JMVC.css.pest();
                });
                JMVC.events.on(download, 'click', function () {
                    console.log(logo.outerHTML);
                });

                function go (img) {
                    JMVC.shadowMatrix.getMatrixFromImage({
                        size: size,
                        // imgUrl : img || (JMVC.vars.baseurl + '/media/img/fgk.jpg')
                        imgUrl: img || (JMVC.vars.baseurl + '/media/img/fedesmall.jpg')
                    })
                        // promise returned, done when image loaded and
                        // matrix done
                        .then(function (pro, result) {
                            JMVC.shadowMatrix(pro.result[0]).draw({ node: logo });
                        });
                }
                go();
            });
    };

    this.action_animation = function () {
        var that = this;
        JMVC.require(
            'core/mobile/drawer/drawer',
            'core/lorem',
            'plotter/shadowMatrix'
        );

        JMVC.head.title('JMVC shadow css animation');

        JMVC.getView('vacuum')
            .set({
                style: 'padding:0px 10px 50px',
                id: 'container'
            })
            .render(function () {
                var size = that.get('size') || 10,
                    cnt = JMVC.dom.find('#container'),
                    space = JMVC.dom.create('div', { id: 'space', style: 'margin:50px' }),
                    sm;

                JMVC.css.style(JMVC.WDB, { padding: '50px' });

                JMVC.dom.append(cnt, space);
                JMVC.dom.append(JMVC.WDB, cnt);

                sm = JMVC.shadowMatrix({
                    scale: size,
                    frames: [
                        [
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , '
                        ], [
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            'o, , , , , , , , , , , , , ',
                            'o, , , , , , , , , , , , , ',
                            'o, , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , '
                        ], [
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            'o, , , , , , , , , , , , , ',
                            ' ,o, , , , , , , , , , , , ',
                            ' ,o, , , , , , , , , , , , ',
                            ' ,o, , , , , , , , , , , , ',
                            'o, , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , '
                        ], [
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            'o, , , , , , , , , , , , , ',
                            '.,o, , , , , , , , , , , , ',
                            '.,.,o, , , , , , , , , , , ',
                            '.,.,o, , , , , , , , , , , ',
                            '.,.,o, , , , , , , , , , , ',
                            '.,o, , , , , , , , , , , , ',
                            'o, , , , , , , , , , , , , '
                        ], [
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            'o,o, , , , , , , , , , , , ',
                            ' , ,o, , , , , , , , , , , ',
                            ' , , ,o, , , , , , , , , , ',
                            'X, , ,o, , , , , , , , , , ',
                            ' , , ,o, , , , , , , , , , ',
                            ' , ,o, , , , , , , , , , , ',
                            'o,o, , , , , , , , , , , , '
                        ], [
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            'o,o,o, , , , , , , , , , , ',
                            '.,.,.,o, , , , , , , , , , ',
                            '.,.,.,.,o, , , , , , , , , ',
                            '.,X,.,.,o, , , , , , , , , ',
                            '.,.,.,.,o, , , , , , , , , ',
                            '.,.,.,o, , , , , , , , , , ',
                            'o,o,o, , , , , , , , , , , '
                        ], [
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' ,o,o,o, , , , , , , , , , ',
                            'o, , , ,o, , , , , , , , , ',
                            ' , , , , ,o, , , , , , , , ',
                            ' , ,X, , ,o, , , , , , , , ',
                            ' , , , , ,o, , , , , , , , ',
                            'o, , , ,o, , , , , , , , , ',
                            ' ,o,o,o, , , , , , , , , , '
                        ], [
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , ,o,o,o, , , , , , , , , ',
                            ' ,o,.,.,.,o, , , , , , , , ',
                            'o,.,.,.,.,.,o, , , , , , , ',
                            'o,.,.,X,.,.,o, , , , , , , ',
                            'o,.,.,.,.,.,o, , , , , , , ',
                            ' ,o,.,.,.,o, , , , , , , , ',
                            ' , ,o,o,o, , , , , , , , , '
                        ], [
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , ,o,o,o, , , , , , , , ',
                            ' , ,o, , , ,o, , , , , , , ',
                            ' ,o, , , , , ,o, , , , , , ',
                            ' ,o, , ,X, , ,o, , , , , , ',
                            ' ,o, , , , , ,o, , , , , , ',
                            ' , ,o, , , ,o, , , , , , , ',
                            ' , , ,o,o,o, , , , , , , , '
                        ], [
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , ,o,o,o, , , , , , , ',
                            ' , , ,o,.,.,.,o, , , , , , ',
                            ' , ,o,.,.,.,.,.,o, , , , , ',
                            ' , ,o,.,.,X,.,.,o, , , , , ',
                            ' , ,o,.,.,.,.,.,o, , , , , ',
                            ' , , ,o,.,.,.,o, , , , , , ',
                            ' , , , ,o,o,o, , , , , , , '
                        ], [
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , ,o,o,o, , , , , , ',
                            ' , , , ,o, , , ,o, , , , , ',
                            ' , , ,o, , , , , ,o, , , , ',
                            ' , , ,o, , ,X, , ,o, , , , ',
                            ' , , ,o, , , , , ,o, , , , ',
                            ' , , , ,o, , , ,o, , , , , ',
                            ' , , , , ,o,o,o, , , , , , '
                        ], [
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , ,o,o,o, , , , , ',
                            ' , , , , ,o,.,.,.,o, , , , ',
                            ' , , , ,o,.,.,.,.,.,o, , , ',
                            ' , , , ,o,.,.,X,.,.,o, , , ',
                            ' , , , ,o,.,.,.,.,.,o, , , ',
                            ' , , , , ,o,.,.,.,o, , , , ',
                            ' , , , , , ,o,o,o, , , , , '
                        ], [
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , ,o,o,o, , , , ',
                            ' , , , , , ,o, , , ,o, , , ',
                            ' , , , , ,o, , , , , ,o, , ',
                            ' , , , , ,o, , ,X, , ,o, , ',
                            ' , , , , ,o, , , , , ,o, , ',
                            ' , , , , , ,o, , , ,o, , , ',
                            ' , , , , , , ,o,o,o, , , , '
                        ], [
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , ,o,o,o, , , ',
                            ' , , , , , , ,o,.,.,.,o, , ',
                            ' , , , , , ,o,.,.,.,.,.,o, ',
                            ' , , , , , ,o,.,.,X,.,.,o, ',
                            ' , , , , , ,o,.,.,.,.,.,o, ',
                            ' , , , , , , ,o,.,.,.,o, , ',
                            ' , , , , , , , ,o,o,o, , , '
                        ], [
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , ,o,o,o, , ',
                            ' , , , , , , , ,o, , , ,o, ',
                            ' , , , , , , ,o, , , , , ,o',
                            ' , , , , , , ,o, , ,X, , ,o',
                            ' , , , , , , ,o, , , , , ,o',
                            ' , , , , , , , ,o, , , ,o, ',
                            ' , , , , , , , , ,o,o,o, , '
                        ], [
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , ,o,o,o, ',
                            ' , , , , , , , , ,o,.,.,.,o',
                            ' , , , , , , , ,o,.,.,.,.,.',
                            ' , , , , , , , ,o,.,.,X,.,.',
                            ' , , , , , , , ,o,.,.,.,.,.',
                            ' , , , , , , , , ,o,.,.,.,o',
                            ' , , , , , , , , , ,o,o,o, '
                        ], [
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , ,o,o,o',
                            ' , , , , , , , , , ,o, , , ',
                            ' , , , , , , , , ,o, , , , ',
                            ' , , , , , , , , ,o, , ,X, ',
                            ' , , , , , , , , ,o, , , , ',
                            ' , , , , , , , , , ,o, , , ',
                            ' , , , , , , , , , , ,o,o,o'
                        ], [
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , ,o,o',
                            ' , , , , , , , , , , ,o,.,.',
                            ' , , , , , , , , , ,o,.,.,.',
                            ' , , , , , , , , , ,o,.,.,X',
                            ' , , , , , , , , , ,o,.,.,.',
                            ' , , , , , , , , , , ,o,.,.',
                            ' , , , , , , , , , , , ,o,o'
                        ], [
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , ,o',
                            ' , , , , , , , , , , , ,o, ',
                            ' , , , , , , , , , , ,o, , ',
                            ' , , , , , , , , , , ,o, , ',
                            ' , , , , , , , , , , ,o, , ',
                            ' , , , , , , , , , , , ,o, ',
                            ' , , , , , , , , , , , , ,o'
                        ], [
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , ,o',
                            ' , , , , , , , , , , , ,o,.',
                            ' , , , , , , , , , , , ,o,.',
                            ' , , , , , , , , , , , ,o,.',
                            ' , , , , , , , , , , , , ,o',
                            ' , , , , , , , , , , , , , '
                        ], [
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , ,o',
                            ' , , , , , , , , , , , , ,o',
                            ' , , , , , , , , , , , , ,o',
                            ' , , , , , , , , , , , , , ',
                            ' , , , , , , , , , , , , , '
                        ]
                    ],
                    colorMap: {
                        o: 'red',
                        ' ': 'white',
                        '.': 'coral'
                    }
                });

                sm.animate({
                    node: space,
                    backAndForth: true
                }, 50);

                window.setTimeout(function () {
                    sm.replaceMap({
                        o: 'red',
                        ' ': 'black',
                        '.': 'white',
                        'x': 'white'
                    });
                }, 3000);
            });
    };

    this.action_slideText = function () {
        var ctrl = this;
        JMVC.require('core/fx/txtSlide');

        JMVC.head.title('JMVC slide text');
        JMVC.getView('vacuum').set({
            style: 'padding:50px; background-color: black; color:red; font-size:5em;font-family:Verdana,sans',
            id: 'container'
        }).render(function () {
            var cnt = JMVC.dom.find('#container'),
                txt = ctrl.get('txt') || 'SWIPE ME',
                hello = JMVC.dom.create('div', { id: 'space', style: 'margin:50px' }, txt);

            JMVC.dom.append(cnt, hello);
            JMVC.dom.append(JMVC.WDB, cnt);

            JMVC.fx.txtSlide.slide(hello, txt, { versus: 'left', repeat: 3000 });

            window.setTimeout(function () {
                console.debug('right');
                JMVC.fx.txtSlide.shut();
                JMVC.fx.txtSlide.slide(hello, txt, { versus: 'right', repeat: 3000 });
            }, 10000);
            window.setTimeout(function () {
                console.debug('both');
                JMVC.fx.txtSlide.shut();
                JMVC.fx.txtSlide.slide(hello, txt, { versus: 'both', repeat: 3000 });
            }, 20000);
        });
    };

    this.action_orientation = function () {
        // JMVC.require('vendors/twitter/twitter');
        JMVC.getView('demo/orientation')
            .set({
                style: '',
                id: 'container',
                'content': ''
            })
            .render(function () {
                // experimental

                // JMVC.vendors.twitter.linkShare(document.body, {
                // // url : 'http://www.jmvc.org'
                // title : 'mytitle'
                // ,text : 'testo del tweet'
                // //,via : 'via me'
                // //,size : 'large'
                // ,related : '#javascript'
                // ,hashtags : 'javascript, pure javascript'
                // });

                // JMVC.vendors.twitter.follow(document.body, {
                // 'show-count' : false
                // ,'size' : 'large'
                // ,'show-screen-name' : true
                // });

                // JMVC.vendors.twitter.hashTag(document.body, {
                //  size : 'large'
                //  ,related : 'purejmvc'
                //  //,url : 'http://www.jmvc.dev'
                //  //,button_hashtag : '#javascript'
                //  ,text : 'my text'
                // });

                // JMVC.vendors.twitter.mention(document.body, {
                //  size : 'large'
                //  ,related : 'purejmvc'
                //  ,url : 'http://www.jmvc.dev'
                //  ,screen_name : 'purejmvc'
                //  ,text : 'my text'
                // });

                JMVC.head.addStyle(JMVC.vars.baseurl + '/app/views/demo/orientation.css', true);

                var $ = JMVC.dom.find,
                    Mr = Math.round;

                if (!window.DeviceOrientationEvent) {
                    $('#do-unsupported').classList.remove('hidden');
                } else {
                    $('#do-info').classList.remove('hidden');
                    window.addEventListener('deviceorientation', function (e) {
                        e.absolute = true;
                        $('#cube').style.webkitTransform =
                            $('#cube').style.transform = 'rotateX(' + e.beta + 'deg) ' + 'rotateY(' + e.gamma + 'deg) ' + 'rotateZ(' + e.alpha + 'deg)';
                        $('#beta').innerHTML = Mr(e.beta);
                        $('#gamma').innerHTML = Mr(e.gamma);
                        $('#alpha').innerHTML = Mr(e.alpha);
                        $('#is-absolute').innerHTML = e.absolute ? 'true' : 'false';
                    });
                }
                if (!window.DeviceMotionEvent) {
                    $('#dm-unsupported').classList.remove('hidden');
                } else {
                    $('#dm-info').classList.remove('hidden');
                    window.addEventListener('devicemotion', function (e) {
                        // e.interval = 5;
                        $('#acceleration-x').innerHTML = Mr(e.acceleration.x);
                        $('#acceleration-y').innerHTML = Mr(e.acceleration.y);
                        $('#acceleration-z').innerHTML = Mr(e.acceleration.z);
                        $('#acceleration-including-gravity-x').innerHTML = Mr(e.accelerationIncludingGravity.x);
                        $('#acceleration-including-gravity-y').innerHTML = Mr(e.accelerationIncludingGravity.y);
                        $('#acceleration-including-gravity-z').innerHTML = Mr(e.accelerationIncludingGravity.z);
                        $('#rotation-rate-beta').innerHTML = Mr(e.rotationRate.beta);
                        $('#rotation-rate-gamma').innerHTML = Mr(e.rotationRate.gamma);
                        $('#rotation-rate-alpha').innerHTML = Mr(e.rotationRate.alpha);
                        $('#interval').innerHTML = e.interval;
                    });
                }

                if (!('oncompassneedscalibration' in window)) {
                    $('#cnc-unsupported').classList.remove('hidden');
                } else {
                    window.addEventListener('compassneedscalibration', function (e) {
                        alert('Compass needs calibrating! Wave your device in a figure-eight motion');
                    });
                }
            });
    };

    this.action_orientation2 = function () {
        // JMVC.require('vendors/twitter/twitter');
        JMVC.require('core/mobile/devicemotion');

        JMVC.getView('demo/orientation')
            .set({
                style: '',
                id: 'container',
                'content': ''
            })
            .render(function () {
                // experimental

                // JMVC.vendors.twitter.linkShare(document.body, {
                //  //url : 'http://www.jmvc.org'
                //  title : 'mytitle'
                //  ,text : 'testo del tweet'
                //  //,via : 'via me'
                //  //,size : 'large'
                //  ,related : '#javascript'
                //  ,hashtags : 'javascript, pure javascript'
                // });

                // JMVC.vendors.twitter.follow(document.body, {
                //  'show-count' : false
                //  ,'size' : 'large'
                //  ,'show-screen-name' : true
                // });

                // JMVC.vendors.twitter.hashTag(document.body, {
                //  size : 'large'
                //  ,related : 'purejmvc'
                //  //,url : 'http://www.jmvc.dev'
                //  //,button_hashtag : '#javascript'
                //  ,text : 'my text'
                // });

                // JMVC.vendors.twitter.mention(document.body, {
                //  size : 'large'
                //  ,related : 'purejmvc'
                //  ,url : 'http://www.jmvc.dev'
                //  ,screen_name : 'purejmvc'
                //  ,text : 'my text'
                // });

                JMVC.head.addStyle(JMVC.vars.baseurl + '/app/views/demo/orientation.css', true);

                var $ = JMVC.dom.find,
                    Mr = Math.round;

                if (!window.DeviceOrientationEvent) {
                    $('#do-unsupported').classList.remove('hidden');
                } else {
                    $('#do-info').classList.remove('hidden');

                    JMVC.mobile.devicemotion.deviceOrientation(function (je) {
                        $('#cube').style.webkitTransform =
                            $('#cube').style.transform = 'rotateX(' + je.beta + 'deg) ' + 'rotateY(' + je.gamma + 'deg) ' + 'rotateZ(' + je.alpha + 'deg)';
                        $('#beta').innerHTML = Mr(je.beta);
                        $('#gamma').innerHTML = Mr(je.gamma);
                        $('#alpha').innerHTML = Mr(je.alpha);
                        $('#is-absolute').innerHTML = je.absolute ? 'true' : 'false';
                    }, true);
                }

                if (!window.DeviceMotionEvent) {
                    $('#dm-unsupported').classList.remove('hidden');
                } else {
                    $('#dm-info').classList.remove('hidden');

                    JMVC.mobile.devicemotion.deviceMotion(function (je) {
                        $('#acceleration-x').innerHTML = Mr(je.accX);
                        $('#acceleration-y').innerHTML = Mr(je.accY);
                        $('#acceleration-z').innerHTML = Mr(je.accZ);
                        $('#acceleration-including-gravity-x').innerHTML = Mr(je.accGX);
                        $('#acceleration-including-gravity-y').innerHTML = Mr(je.accGY);
                        $('#acceleration-including-gravity-z').innerHTML = Mr(je.accGZ);
                        $('#rotation-rate-beta').innerHTML = Mr(je.accBeta);
                        $('#rotation-rate-gamma').innerHTML = Mr(je.accGamma);
                        $('#rotation-rate-alpha').innerHTML = Mr(je.accAlpha);
                        $('#interval').innerHTML = je.interval;
                    });
                }
                if (!('oncompassneedscalibration' in window)) {
                    $('#cnc-unsupported').classList.remove('hidden');
                } else {
                    window.addEventListener('compassneedscalibration', function (e) {
                        alert('Compass needs calibrating! Wave your device in a figure-eight motion');
                    });
                }
            });
    };

    this.action_inlineVideo = function () {
        JMVC.require('core/html5/inlineVideo');
        JMVC.css.fontAwesome();
        JMVC.head.title('JMVC inline mobile video');
        var mobile = JMVC.util.isMobile;
        JMVC.getView('vacuum')
            .set({
                style: 'padding:0px 10px 50px;',
                id: 'container'
            })
            .render(function () {
                JMVC.core.widgzard.render({
                    target: document.getElementById('container'),
                    content: [{
                        tag: 'video',
                        wid: 'wideo',
                        attrs: { preload: 'preload' },
                        style: {
                            width: '300px',
                            visibility: 'hidden'
                        },
                        content: [{
                            tag: 'source',
                            attrs: {
                                type: 'video/webm',
                                src: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.webm'
                            }
                        }, {
                            tag: 'source',
                            attrs: {
                                type: 'video/mp4',
                                src: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.mp4'
                            }
                        }]
                    }],
                    cb: function () {
                        var $video = this.getNode('wideo').node,
                            ev = mobile ? 'canplaythrough' : 'loadeddata';
                        JMVC.events.on($video, ev, function () {
                            var c = JMVC.html5.inlineVideo($video);
                            c.canvas.style.border = '5px solid red';
                            c.canvas.parentNode.style.margin = '20px';
                        }, false);
                        $video.load();
                    }
                });
            });
    };
    this.action_previewVideo = function () {
        JMVC.require('core/html5/videoPreview');
        JMVC.css.fontAwesome();
        JMVC.head.title('JMVC inline mobile video preview');
        var mobile = JMVC.util.isMobile;

        JMVC.getView('vacuum')
            .set({
                style: 'padding:0px 10px 50px;',
                id: 'container'
            })
            .render(function () {
                JMVC.core.widgzard.render({
                    target: document.getElementById('container'),
                    content: [{
                        tag: 'video',
                        wid: 'wideo',
                        attrs: { preload: 'preload' },
                        style: {
                            width: '300px'
                        },
                        content: [{
                            tag: 'source',
                            attrs: {
                                type: 'video/webm',
                                src: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.webm'
                            }
                        }, {
                            tag: 'source',
                            attrs: {
                                type: 'video/mp4',
                                src: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.mp4'
                            }
                        }],
                        end: function () {
                            var $video = this.node,
                                ev = mobile ? 'canplaythrough' : 'loadeddata';
                            JMVC.events.one($video, ev, function () {
                                JMVC.html5.videoPreview($video);
                            }, false);
                            $video.load();
                        }
                    }]
                });
            });
    };

    this.action_previewInlineVideo = function () {
        JMVC.require('core/html5/inlinePreviewVideo');
        JMVC.css.fontAwesome();

        var mobile = JMVC.util.isMobile;

        JMVC.getView('vacuum')
            .set({
                style: 'padding:0px 10px 50px;',
                id: 'container'
            })
            .render(function () {
                JMVC.core.widgzard.render({
                    target: document.getElementById('container'),
                    content: [{
                        tag: 'video',
                        wid: 'wideo',
                        attrs: { preload: 'preload' },
                        style: {
                            width: '300px'
                        },
                        content: [{
                            tag: 'source',
                            attrs: {
                                type: 'video/webm',
                                src: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.webm'
                            }
                        }, {
                            tag: 'source',
                            attrs: {
                                type: 'video/mp4',
                                src: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.mp4'
                            }
                        }],
                        end: function () {
                            var $video = this.node,
                                ev = mobile ? 'canplaythrough' : 'loadeddata';

                            // $video.addEventListener(ev, function () {

                            JMVC.events.one($video, ev, function () {
                                // $elf.load();
                                JMVC.html5.previewInlineVideo($video);
                            }, false);
                            $video.load();
                        }
                    }]
                });
            });
    };

    this.action_wwdb = function () {
        JMVC.css.fontAwesome();
        JMVC.head.title('JMVC two way data binding');
        JMVC.getView('vacuum')
            .set({
                style: 'padding:0px 10px 50px;line-height:30px;font-family:Verdana, sans',
                id: 'container'
            })
            .render(function () {
                var t = { value: 'please edit me' },
                    secToGo = 60;
                window.t = t;

                JMVC.core.widgzard.render({
                    target: document.getElementById('container'),
                    content: [{
                        tag: 'h1',
                        html: 'Two way data binding'
                    }, {
                        tag: 'p',
                        html: 'The following fields are all 2wdb with <b>t.value</b> that you can edit/read from the console (after ' + secToGo + ' seconds will be unbinded)'
                    }, {
                        tag: 'span',
                        html: '1:'
                    }, {
                        tag: 'input',
                        attrs: { type: 'text' },
                        style: { width: '300px' },
                        wid: 'input1'
                    },
                    { tag: 'br' }, { tag: 'span', html: '2:' },
                    {
                        tag: 'input',
                        attrs: { type: 'text' },
                        style: {
                            width: '300px'
                        },
                        wid: 'input2'
                    }, { tag: 'br' }, { tag: 'span', html: '3:' }, {
                        tag: 'span',
                        wid: 'text'
                    }, { tag: 'br' }, { tag: 'span', html: '4:' }, {
                        tag: 'textarea',
                        attrs: { rows: 20, cols: 50 },
                        wid: 'ta'
                    }, {
                        style: { color: 'red', fontWeight: 'bold' },
                        wid: 'debug'
                    }],
                    cb: function () {
                        var self = this,
                            text = self.getNode('text').node,
                            ta = self.getNode('ta').node,
                            input1 = self.getNode('input1').node,
                            input2 = self.getNode('input2').node,
                            deb = self.getNode('debug').node,
                            debFun = function (o) { console.log(o); };

                        JMVC.events.wwon(t, 'value', input1, debFun);
                        JMVC.events.wwon(t, 'value', input2, debFun);
                        JMVC.events.wwon(t, 'value', text, debFun);
                        JMVC.events.wwon(t, 'value', ta, debFun);

                        window.setTimeout(function () {
                            JMVC.events.wwoff(input1, input2, text, ta);
                            deb.innerHTML = '2wdb stopped';
                        }, secToGo * 1E3);
                    }
                });
            });
    };
};
