JMVC.controllers.demo = function() {

	'use strict';

	var self = this;

	/* test a route */
	this.addRoutes({
		ndl: 'flag',
		f: 'flag'
	});

	this.action_cs = function() {
		JMVC.head.goto('console', 'index', "?fullscreen=true&h=%3C!--%20no%20html%20content%20--%3E&j=var%20data%20%3D%20%5B%0A%09%09%5B%27Samsung%20Galaxy%20S4%27%2C%27Samsung%27%2C%27April%202013%27%2C38%2C%274560%27%5D%2C%0A%09%09%5B%27Lumia%201020%27%2C%27Nokia%27%2C%27July%202013%27%2C2%2C%271560%27%5D%2C%0A%09%09%5B%27Surface%202%20Pro%27%2C%27Microsoft%27%2C%27September%202013%27%2C12%2C%2753782%27%5D%2C%0A%09%09%5B%27iPhone%205s%27%2C%27Apple%27%2C%27September%202013%27%2C53%2C%27134500%27%5D%2C%0A%09%09%5B%27One%20X%27%2C%27HTC%27%2C%27March%202012%27%2C7%2C%27213068%27%5D%2C%0A%09%09%5B%27G%202%27%2C%27LG%27%2C%27October%202013%27%2C34%2C%27133068%27%5D%2C%0A%09%09%5B%27Yoga%202%20Pro%27%2C%27Lenovo%27%2C%27November%202013%27%2C4%2C%274230%27%5D%0A%09%5D%2C%0A%20%20%20%20headers%20%3D%20%5B%27Product%20Name%27%2C%27Product%20Manufacturer%27%2C%27Release%20Date%27%2C%27Quantity%27%2C%27Purchase%20Value%27%5D%3B%0A%0Afunction%20ProductTable(config)%20%7B%0A%20%20%20%20this.headData%20%3D%20config.head%20%7C%7C%20false%3B%0A%20%20%20%20this.bodyData%20%3D%20config.body%20%7C%7Cfalse%3B%0A%20%20%20%20if%20(!this.headData%20%7C%7C%20!this.bodyData)%20%7B%0A%20%20%20%20%20%20%20%20throw%20new%20Error(%27Missing%20parameters%27)%3B%0A%20%20%20%20%7D%0A%20%20%20%20this.node%20%3D%20null%3B%0A%7D%0AProductTable.prototype.drawLine%20%3D%20function%20(tag%2C%20data)%7B%0A%20%20%20%20var%20head%20%3D%20document.createElement(%27tr%27)%3B%0A%20%20%20%20for%20(var%20i%20%3D%200%2C%20l%20%3D%20data.length%2C%20t%3B%20i%20%3C%20l%3B%20i%2B%2B)%20%7B%0A%20%20%20%20%20%20%20%20t%20%3D%20document.createElement(tag)%3B%0A%20%20%20%20%20%20%20%20t.innerHTML%20%3D%20data%5Bi%5D%20%2B%20%27%27%3B%0A%20%20%20%20%20%20%20%20head.appendChild(t)%3B%0A%20%20%20%20%7D%0A%20%20%20%20return%20head%3B%0A%7D%3B%0A%0AProductTable.prototype.drawHeader%20%3D%20function%20()%7B%0A%20%20%20%20this.node.appendChild(%0A%20%20%20%20%20%20%20%20this.drawLine(%27th%27%2C%20this.headData)%0A%20%20%20%20)%3B%0A%7D%3B%0AProductTable.prototype.drawData%20%3D%20function%20()%7B%0A%20%20%20%20for(var%20j%20%3D%200%2C%20k%20%3D%20this.bodyData.length%3B%20j%20%3C%20k%3B%20j%2B%2B)%7B%0A%20%20%20%20%20%20%20%20this.node.appendChild(%0A%20%20%20%20%20%20%20%20%20%20%20%20this.drawLine(%27td%27%2C%20this.bodyData%5Bj%5D)%0A%20%20%20%20%20%20%20%20)%3B%0A%20%20%20%20%7D%0A%7D%3B%0AProductTable.prototype.draw%20%3D%20function%20(el)%7B%0A%20%20%20%20this.drawHeader()%3B%0A%20%20%20%20this.drawData()%3B%0A%20%20%20%20el.appendChild(this.node)%3B%0A%7D%3B%0AProductTable.prototype.render%20%3D%20function%20(el)%7B%0A%20%20%20%20this.node%20%3D%20document.createElement(%27table%27)%3B%20%0A%20%20%20%20this.draw(el)%3B%0A%7D%0AProductTable.prototype.sortByColumn%20%3D%20function%20(col)%20%7B%0A%20%20%20%20var%20index%20%3D%20this.headData.indexOf(col)%3B%0A%20%20%20%20if%20(index%20%3D%3D%3D%20-1)%7B%0A%20%20%20%20%20%20%20%20throw%20new%20Error(col%20%2B%20%27%20column%20not%20found%27)%3B%0A%20%20%20%20%7D%0A%20%20%20%20this.bodyData.sort(function%20(l1%2C%20l2)%20%7B%0A%20%20%20%20%20%20%20%20return%20parseInt(l1%5Bindex%5D%2C%2010)%20%3C%20parseInt(l2%5Bindex%5D%2C%2010)%3B%0A%20%20%20%20%7D)%3B%0A%7D%0A%0A%0Avar%20pt%20%3D%20new%20ProductTable(%7Bhead%20%3A%20headers%2C%20body%20%3A%20data%7D)%3B%0Apt.sortByColumn(%27Quantity%27)%3B%0Apt.render(document.body)%3B&c=body%7B%0A%09font-family%3A%20verdana%2C%20sans-serif%3B%0A%09font-size%20%3A%2012px%0A%7D%0Atable%7B%0A%09border%3A2px%20solid%20gainsboro%3B%0A%09margin%3A10px%0A%7D%0Atr%3Anth-child(odd)%20td%7B%0A%09background-color%3A%23ff6600%3B%0A%7D%0Atr%3Anth-child(even)%20td%7B%0A%09background-color%3A%23afa%3B%0A%7D%0Atd%7Bpadding%3A10px%7D%0Ath%7B%0A%09font-weight%3Abold%3B%0A%09padding%3A10px%3B%0A%7D%0Atd%2Cth%7Btext-align%3Aleft%3B%7D&l=#preview");
	};

	this.before = function() {
		//JMVC.events.loadify(1000);
		self.startController = JMVC.util.now();
		JMVC.debug(-2)
		
		
	};

	this.before_index = this.before_flag = function() {
		self.startAction = JMVC.util.now();
		JMVC.debug(-1)
	};

	this.after_index = this.after_flag = function() {
		self.endAction = JMVC.util.now();
		JMVC.debug(1)
	};

	this.after = function () {
		
		JMVC.debug(2);
		self.endController = JMVC.util.now();
		JMVC.debug('Controller Time: ' + ((self.endController - self.startController) || 0));
		JMVC.debug('Action Time: ' + ((self.endAction - self.startAction) || 0));

		JMVC.events.disableRightClick();

		JMVC.events.onRight(JMVC.WD, function() {
			JMVC.debug('right click locked');
		});
		JMVC.debug('disabled right click');

		
		JMVC.require('vendors/twitter/twitter');


		JMVC.vendors.twitter.follow(document.body, {
			name : 'purejmvc'
			//,lang : 'ja'
			//url : 'http://www.jmvc.org'
			//title : 'mytitle'
			,text : 'check out JMVC demo'
			//,via : 'via me'
			//,size : 'large'
			//,related : '#javascript'
			,hashtags : 'javascript, pure javascript'
			,'show-count' : false
		});	
		

		

		// JMVC.require('widget/screensaver/screensaver');
		// JMVC.screensaver.on(5000);
	};



	this.action_index = function () {
		JMVC.debug('0-');

		JMVC.require(
			'vendors/google/analytics/analytics'
			,'core/responsive/basic/basic'
			,'core/screen/screen'
			//,'affix/affix'

		);

		// show window size, and test orientation switch, 
		JMVC.responsive.onChange(function (e) {
			var d = JMVC.screen.getViewportSize();
			JMVC.dom.html(JMVC.dom.find('#size'), '[' + d.width + ' ; ' + d.height + ']');
		});

		JMVC.events.loadify(500);

		JMVC.dom.preloadImage(JMVC.vars.baseurl + '/media/img/jmvc_n1.png');

		//var newlogo = JMVC.dom.create('img', {src : JMVC.vars.baseurl + '/media/img/jmvc_m1.svg'});

		/* JMVC.require('widget/slider/slider'); */
		// <img src="media/img/jmvc_m2.svg" />
		var content = '<h3 id="samples" class="round8 roundbottom">Some JMVC based samples <span id="size"></span></h3>',
			bu = JMVC.vars.baseurl,
			v = JMVC.getView('vacuum'),
			links = {
				'Canvas editor (WorkInProgress)': 'canvaseditor',
				'Widgzard SPA' : 'widgzard/sample/',
				//'Widgzard<sup> n</sup> = Engy' : 'widgzard/engy/',
				'6 Divs Cube css3 tranformations ': 'demo/divrot.js',
				'Console': 'console',
				'Get gravatar from email (FullScreen, esc to exit)' : 'console/index?fullscreen=true&h=%3Cp%3E%0A%09%3Cinput%20id%3D%22tx%22%20type%3D%22text%22%20%2F%3E%0A%09%3Cbutton%20id%3D%22bt%22%3Eget%20avatar%3C%2Fbutton%3E%0A%3C%2Fp%3E&j=var%20tx%20%3D%20JMVC.dom.find(%27%23tx%27)%2C%0A%09bt%20%3D%20JMVC.dom.find(%27%23bt%27)%3B%0A%09%09%0AJMVC.events.on(bt%2C%20%27click%27%2C%20function%20()%20%7B%0A%09var%20t%20%3D%20tx.value%2C%0A%09%09url%20%3D%20false%2C%0A%09%09img%3B%0A%09if%20(!!t)%20%7B%0A%09%09url%20%3D%20get_gravatar(t%2C%20200)%3B%0A%09%09img%20%3D%20document.createElement(%27img%27)%3B%0A%09%09img.onload%20%3D%20function%20()%20%7B%0A%09%09%09JMVC.dom.append(document.body%2C%20img)%3B%0A%09%09%7D%3B%0A%09%09img.src%20%3D%20url%3B%0A%09%7D%0A%7D)%3B%0A%0A%0A%0Afunction%20get_gravatar(email%2C%20size)%20%7B%0A%20%0A%09%2F%2F%20MD5%20(Message-Digest%20Algorithm)%20by%20WebToolkit%0A%09%2F%2F%0A%20%0A%09var%20MD5%3Dfunction(s)%7Bfunction%20L(k%2Cd)%7Breturn(k%3C%3Cd)%7C(k%3E%3E%3E(32-d))%7Dfunction%20K(G%2Ck)%7Bvar%20I%2Cd%2CF%2CH%2Cx%3BF%3D(G%262147483648)%3BH%3D(k%262147483648)%3BI%3D(G%261073741824)%3Bd%3D(k%261073741824)%3Bx%3D(G%261073741823)%2B(k%261073741823)%3Bif(I%26d)%7Breturn(x%5E2147483648%5EF%5EH)%7Dif(I%7Cd)%7Bif(x%261073741824)%7Breturn(x%5E3221225472%5EF%5EH)%7Delse%7Breturn(x%5E1073741824%5EF%5EH)%7D%7Delse%7Breturn(x%5EF%5EH)%7D%7Dfunction%20r(d%2CF%2Ck)%7Breturn(d%26F)%7C((~d)%26k)%7Dfunction%20q(d%2CF%2Ck)%7Breturn(d%26k)%7C(F%26(~k))%7Dfunction%20p(d%2CF%2Ck)%7Breturn(d%5EF%5Ek)%7Dfunction%20n(d%2CF%2Ck)%7Breturn(F%5E(d%7C(~k)))%7Dfunction%20u(G%2CF%2Caa%2CZ%2Ck%2CH%2CI)%7BG%3DK(G%2CK(K(r(F%2Caa%2CZ)%2Ck)%2CI))%3Breturn%20K(L(G%2CH)%2CF)%7Dfunction%20f(G%2CF%2Caa%2CZ%2Ck%2CH%2CI)%7BG%3DK(G%2CK(K(q(F%2Caa%2CZ)%2Ck)%2CI))%3Breturn%20K(L(G%2CH)%2CF)%7Dfunction%20D(G%2CF%2Caa%2CZ%2Ck%2CH%2CI)%7BG%3DK(G%2CK(K(p(F%2Caa%2CZ)%2Ck)%2CI))%3Breturn%20K(L(G%2CH)%2CF)%7Dfunction%20t(G%2CF%2Caa%2CZ%2Ck%2CH%2CI)%7BG%3DK(G%2CK(K(n(F%2Caa%2CZ)%2Ck)%2CI))%3Breturn%20K(L(G%2CH)%2CF)%7Dfunction%20e(G)%7Bvar%20Z%3Bvar%20F%3DG.length%3Bvar%20x%3DF%2B8%3Bvar%20k%3D(x-(x%2564))%2F64%3Bvar%20I%3D(k%2B1)*16%3Bvar%20aa%3DArray(I-1)%3Bvar%20d%3D0%3Bvar%20H%3D0%3Bwhile(H%3CF)%7BZ%3D(H-(H%254))%2F4%3Bd%3D(H%254)*8%3Baa%5BZ%5D%3D(aa%5BZ%5D%7C(G.charCodeAt(H)%3C%3Cd))%3BH%2B%2B%7DZ%3D(H-(H%254))%2F4%3Bd%3D(H%254)*8%3Baa%5BZ%5D%3Daa%5BZ%5D%7C(128%3C%3Cd)%3Baa%5BI-2%5D%3DF%3C%3C3%3Baa%5BI-1%5D%3DF%3E%3E%3E29%3Breturn%20aa%7Dfunction%20B(x)%7Bvar%20k%3D%22%22%2CF%3D%22%22%2CG%2Cd%3Bfor(d%3D0%3Bd%3C%3D3%3Bd%2B%2B)%7BG%3D(x%3E%3E%3E(d*8))%26255%3BF%3D%220%22%2BG.toString(16)%3Bk%3Dk%2BF.substr(F.length-2%2C2)%7Dreturn%20k%7Dfunction%20J(k)%7Bk%3Dk.replace(%2Frn%2Fg%2C%22n%22)%3Bvar%20d%3D%22%22%3Bfor(var%20F%3D0%3BF%3Ck.length%3BF%2B%2B)%7Bvar%20x%3Dk.charCodeAt(F)%3Bif(x%3C128)%7Bd%2B%3DString.fromCharCode(x)%7Delse%7Bif((x%3E127)%26%26(x%3C2048))%7Bd%2B%3DString.fromCharCode((x%3E%3E6)%7C192)%3Bd%2B%3DString.fromCharCode((x%2663)%7C128)%7Delse%7Bd%2B%3DString.fromCharCode((x%3E%3E12)%7C224)%3Bd%2B%3DString.fromCharCode(((x%3E%3E6)%2663)%7C128)%3Bd%2B%3DString.fromCharCode((x%2663)%7C128)%7D%7D%7Dreturn%20d%7Dvar%20C%3DArray()%3Bvar%20P%2Ch%2CE%2Cv%2Cg%2CY%2CX%2CW%2CV%3Bvar%20S%3D7%2CQ%3D12%2CN%3D17%2CM%3D22%3Bvar%20A%3D5%2Cz%3D9%2Cy%3D14%2Cw%3D20%3Bvar%20o%3D4%2Cm%3D11%2Cl%3D16%2Cj%3D23%3Bvar%20U%3D6%2CT%3D10%2CR%3D15%2CO%3D21%3Bs%3DJ(s)%3BC%3De(s)%3BY%3D1732584193%3BX%3D4023233417%3BW%3D2562383102%3BV%3D271733878%3Bfor(P%3D0%3BP%3CC.length%3BP%2B%3D16)%7Bh%3DY%3BE%3DX%3Bv%3DW%3Bg%3DV%3BY%3Du(Y%2CX%2CW%2CV%2CC%5BP%2B0%5D%2CS%2C3614090360)%3BV%3Du(V%2CY%2CX%2CW%2CC%5BP%2B1%5D%2CQ%2C3905402710)%3BW%3Du(W%2CV%2CY%2CX%2CC%5BP%2B2%5D%2CN%2C606105819)%3BX%3Du(X%2CW%2CV%2CY%2CC%5BP%2B3%5D%2CM%2C3250441966)%3BY%3Du(Y%2CX%2CW%2CV%2CC%5BP%2B4%5D%2CS%2C4118548399)%3BV%3Du(V%2CY%2CX%2CW%2CC%5BP%2B5%5D%2CQ%2C1200080426)%3BW%3Du(W%2CV%2CY%2CX%2CC%5BP%2B6%5D%2CN%2C2821735955)%3BX%3Du(X%2CW%2CV%2CY%2CC%5BP%2B7%5D%2CM%2C4249261313)%3BY%3Du(Y%2CX%2CW%2CV%2CC%5BP%2B8%5D%2CS%2C1770035416)%3BV%3Du(V%2CY%2CX%2CW%2CC%5BP%2B9%5D%2CQ%2C2336552879)%3BW%3Du(W%2CV%2CY%2CX%2CC%5BP%2B10%5D%2CN%2C4294925233)%3BX%3Du(X%2CW%2CV%2CY%2CC%5BP%2B11%5D%2CM%2C2304563134)%3BY%3Du(Y%2CX%2CW%2CV%2CC%5BP%2B12%5D%2CS%2C1804603682)%3BV%3Du(V%2CY%2CX%2CW%2CC%5BP%2B13%5D%2CQ%2C4254626195)%3BW%3Du(W%2CV%2CY%2CX%2CC%5BP%2B14%5D%2CN%2C2792965006)%3BX%3Du(X%2CW%2CV%2CY%2CC%5BP%2B15%5D%2CM%2C1236535329)%3BY%3Df(Y%2CX%2CW%2CV%2CC%5BP%2B1%5D%2CA%2C4129170786)%3BV%3Df(V%2CY%2CX%2CW%2CC%5BP%2B6%5D%2Cz%2C3225465664)%3BW%3Df(W%2CV%2CY%2CX%2CC%5BP%2B11%5D%2Cy%2C643717713)%3BX%3Df(X%2CW%2CV%2CY%2CC%5BP%2B0%5D%2Cw%2C3921069994)%3BY%3Df(Y%2CX%2CW%2CV%2CC%5BP%2B5%5D%2CA%2C3593408605)%3BV%3Df(V%2CY%2CX%2CW%2CC%5BP%2B10%5D%2Cz%2C38016083)%3BW%3Df(W%2CV%2CY%2CX%2CC%5BP%2B15%5D%2Cy%2C3634488961)%3BX%3Df(X%2CW%2CV%2CY%2CC%5BP%2B4%5D%2Cw%2C3889429448)%3BY%3Df(Y%2CX%2CW%2CV%2CC%5BP%2B9%5D%2CA%2C568446438)%3BV%3Df(V%2CY%2CX%2CW%2CC%5BP%2B14%5D%2Cz%2C3275163606)%3BW%3Df(W%2CV%2CY%2CX%2CC%5BP%2B3%5D%2Cy%2C4107603335)%3BX%3Df(X%2CW%2CV%2CY%2CC%5BP%2B8%5D%2Cw%2C1163531501)%3BY%3Df(Y%2CX%2CW%2CV%2CC%5BP%2B13%5D%2CA%2C2850285829)%3BV%3Df(V%2CY%2CX%2CW%2CC%5BP%2B2%5D%2Cz%2C4243563512)%3BW%3Df(W%2CV%2CY%2CX%2CC%5BP%2B7%5D%2Cy%2C1735328473)%3BX%3Df(X%2CW%2CV%2CY%2CC%5BP%2B12%5D%2Cw%2C2368359562)%3BY%3DD(Y%2CX%2CW%2CV%2CC%5BP%2B5%5D%2Co%2C4294588738)%3BV%3DD(V%2CY%2CX%2CW%2CC%5BP%2B8%5D%2Cm%2C2272392833)%3BW%3DD(W%2CV%2CY%2CX%2CC%5BP%2B11%5D%2Cl%2C1839030562)%3BX%3DD(X%2CW%2CV%2CY%2CC%5BP%2B14%5D%2Cj%2C4259657740)%3BY%3DD(Y%2CX%2CW%2CV%2CC%5BP%2B1%5D%2Co%2C2763975236)%3BV%3DD(V%2CY%2CX%2CW%2CC%5BP%2B4%5D%2Cm%2C1272893353)%3BW%3DD(W%2CV%2CY%2CX%2CC%5BP%2B7%5D%2Cl%2C4139469664)%3BX%3DD(X%2CW%2CV%2CY%2CC%5BP%2B10%5D%2Cj%2C3200236656)%3BY%3DD(Y%2CX%2CW%2CV%2CC%5BP%2B13%5D%2Co%2C681279174)%3BV%3DD(V%2CY%2CX%2CW%2CC%5BP%2B0%5D%2Cm%2C3936430074)%3BW%3DD(W%2CV%2CY%2CX%2CC%5BP%2B3%5D%2Cl%2C3572445317)%3BX%3DD(X%2CW%2CV%2CY%2CC%5BP%2B6%5D%2Cj%2C76029189)%3BY%3DD(Y%2CX%2CW%2CV%2CC%5BP%2B9%5D%2Co%2C3654602809)%3BV%3DD(V%2CY%2CX%2CW%2CC%5BP%2B12%5D%2Cm%2C3873151461)%3BW%3DD(W%2CV%2CY%2CX%2CC%5BP%2B15%5D%2Cl%2C530742520)%3BX%3DD(X%2CW%2CV%2CY%2CC%5BP%2B2%5D%2Cj%2C3299628645)%3BY%3Dt(Y%2CX%2CW%2CV%2CC%5BP%2B0%5D%2CU%2C4096336452)%3BV%3Dt(V%2CY%2CX%2CW%2CC%5BP%2B7%5D%2CT%2C1126891415)%3BW%3Dt(W%2CV%2CY%2CX%2CC%5BP%2B14%5D%2CR%2C2878612391)%3BX%3Dt(X%2CW%2CV%2CY%2CC%5BP%2B5%5D%2CO%2C4237533241)%3BY%3Dt(Y%2CX%2CW%2CV%2CC%5BP%2B12%5D%2CU%2C1700485571)%3BV%3Dt(V%2CY%2CX%2CW%2CC%5BP%2B3%5D%2CT%2C2399980690)%3BW%3Dt(W%2CV%2CY%2CX%2CC%5BP%2B10%5D%2CR%2C4293915773)%3BX%3Dt(X%2CW%2CV%2CY%2CC%5BP%2B1%5D%2CO%2C2240044497)%3BY%3Dt(Y%2CX%2CW%2CV%2CC%5BP%2B8%5D%2CU%2C1873313359)%3BV%3Dt(V%2CY%2CX%2CW%2CC%5BP%2B15%5D%2CT%2C4264355552)%3BW%3Dt(W%2CV%2CY%2CX%2CC%5BP%2B6%5D%2CR%2C2734768916)%3BX%3Dt(X%2CW%2CV%2CY%2CC%5BP%2B13%5D%2CO%2C1309151649)%3BY%3Dt(Y%2CX%2CW%2CV%2CC%5BP%2B4%5D%2CU%2C4149444226)%3BV%3Dt(V%2CY%2CX%2CW%2CC%5BP%2B11%5D%2CT%2C3174756917)%3BW%3Dt(W%2CV%2CY%2CX%2CC%5BP%2B2%5D%2CR%2C718787259)%3BX%3Dt(X%2CW%2CV%2CY%2CC%5BP%2B9%5D%2CO%2C3951481745)%3BY%3DK(Y%2Ch)%3BX%3DK(X%2CE)%3BW%3DK(W%2Cv)%3BV%3DK(V%2Cg)%7Dvar%20i%3DB(Y)%2BB(X)%2BB(W)%2BB(V)%3Breturn%20i.toLowerCase()%7D%3B%0A%20%0A%09var%20size%20%3D%20size%20%7C%7C%2080%3B%0A%20%0A%09return%20%27http%3A%2F%2Fwww.gravatar.com%2Favatar%2F%27%20%2B%20MD5(email)%20%2B%20%27.jpg%3Fs%3D%27%20%2B%20size%3B%0A%7D%0A%0Atx.value%20%3D%20%27fedeghe%40gmail.com%27%3B%0Atx.focus()%3B%0A&c=p%7Bpadding%3A10px%7D&l=#preview',
				'Console atom (FullScreen, esc to exit)': 'console/index?fullscreen=true&h=%3Cdiv%20class%3D%22container%22%3E%0A%09%3Cdiv%20class%3D%22wrap%22%3E%0A%09%09%3Cdiv%20class%3D%22circle%20horizontal%20c1%22%3E%0A%09%09%09%3Cdiv%20class%3D%22wrap-electron%22%3E%0A%09%09%09%09%3Cdiv%20class%3D%22circle%20electron%22%3E%3C%2Fdiv%3E%0A%09%09%09%3C%2Fdiv%3E%0A%09%09%3C%2Fdiv%3E%0A%09%09%3Cdiv%20class%3D%22circle%20vertical%20c1%22%3E%0A%09%09%09%3Cdiv%20class%3D%22wrap-electron%22%3E%0A%09%09%09%09%3Cdiv%20class%3D%22circle%20electron%22%3E%3C%2Fdiv%3E%0A%09%09%09%3C%2Fdiv%3E%0A%09%09%3C%2Fdiv%3E%0A%09%3C%2Fdiv%3E%0A%09%3Cdiv%20class%3D%22wrap%20r%22%3E%0A%09%09%3Cdiv%20class%3D%22circle%20horizontal%20c2%22%3E%0A%09%09%09%3Cdiv%20class%3D%22wrap-electron%22%3E%0A%09%09%09%09%3Cdiv%20class%3D%22circle%20electron%22%3E%3C%2Fdiv%3E%0A%09%09%09%3C%2Fdiv%3E%0A%09%09%3C%2Fdiv%3E%0A%09%09%3Cdiv%20class%3D%22circle%20vertical%20c2%22%3E%0A%09%09%09%3Cdiv%20class%3D%22wrap-electron%22%3E%0A%09%09%09%09%3Cdiv%20class%3D%22circle%20electron%22%3E%3C%2Fdiv%3E%09%0A%09%09%09%3C%2Fdiv%3E%0A%09%09%3C%2Fdiv%3E%0A%09%09%3Cdiv%20class%3D%22circle%20center%22%3E%3C%2Fdiv%3E%0A%09%3C%2Fdiv%3E%0A%3C%2Fdiv%3E%0A%0A%0A%0A%0A%0A%0A%0A&j=%2F*%20no%20javascript%20content%20*%2F&c=body%20%7B%0A%20%20background%3A%20%23222%3B%0A%7D%0A.container%20%7B%0A%20%20position%3A%20relative%3B%0A%20%20margin%3A%20auto%3B%0A%20%20width%3A%20250px%3B%0A%7D%0A.wrap%2C%0A.circle%20%7B%0A%20%20-webkit-transition%3A%20-webkit-transform%20500ms%20linear%3B%0A%20%20-webkit-transform-style%3A%20preserve-3d%3B%0A%20%20-moz-transition%3A%20-moz-transform%20500ms%20linear%3B%0A%20%20-moz-transform-style%3A%20preserve-3d%3B%0A%20%20width%3A%20250px%3B%0A%20%20height%3A%20250px%3B%0A%20%20margin%3A%20auto%3B%0A%20%20margin-top%3A%2050px%3B%0A%20%20position%3A%20absolute%3B%0A%7D%0A.circle%20%7B%0A%20%20position%3A%20absolute%3B%0A%20%20border%3A%203px%20solid%20%23aaaaaa%3B%0A%20%20border-radius%3A%20250px%3B%0A%20%20margin%3A%20auto%3B%0A%7D%0A.circle.c2%2C%0A.circle.center%20%7B%0A%20%20border%3A%202px%20solid%20%23666666%3B%0A%20%20width%3A%20140px%3B%0A%20%20height%3A%20140px%3B%0A%20%20top%3A%2055px%3B%0A%20%20left%3A%2055px%3B%0A%7D%0A.circle.center%20%7B%0A%20%20background%3A%20%23ffffff%3B%0A%20%20width%3A%2030px%3B%0A%20%20height%3A%2030px%3B%0A%20%20top%3A%20110px%3B%0A%20%20left%3A%20110px%3B%0A%20%20box-shadow%3A%200%200%205px%20%23fff%3B%0A%7D%0A.wrap-electron%20%7B%0A%20%20border%3A%200px%20solid%20%20%23fff%3B%0A%20%20position%3A%20absolute%3B%0A%20%20width%3A%20100%25%3B%0A%20%20height%3A%20100%25%3B%0A%20%20-webkit-animation%3A%20electron%203s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20electron%203s%20linear%20infinite%3B%0A%7D%0A.electron%20%7B%0A%20%20width%3A%2012px%3B%0A%20%20height%3A%2012px%3B%0A%20%20background%3A%20%23aaaaaa%3B%0A%20%20left%3A%2050%25%3B%0A%20%20margin-left%3A%20-8px%3B%0A%20%20border%3A%20none%3B%0A%20%20top%3A%20-7px%3B%0A%20%20-webkit-transform-origin%3A%2050%25%2050%25%3B%0A%7D%0A.c2%20.wrap-electron%20%7B%0A%20%20-webkit-animation%3A%20electron%202s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20electron%202s%20linear%20infinite%3B%0A%7D%0A.c2%20.electron%20%7B%0A%20%20top%3A%20-6px%3B%0A%7D%0A.wrap%20%7B%0A%20%20border%3A%200px%20solid%20%23aaaaaa%3B%0A%20%20-webkit-animation%3A%20lateral%2015s%20ease-in-out%20infinite%3B%0A%20%20-moz-animation%3A%20lateral%2015s%20ease-in-out%20infinite%3B%0A%7D%0A.wrap.r%20%7B%0A%20%20-webkit-animation%3A%20lateralRevert%208s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20lateralRevert%208s%20linear%20infinite%3B%0A%7D%0A.vertical%20%7B%0A%20%20-webkit-animation%3A%20vertical%208s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20vertical%208s%20linear%20infinite%3B%0A%7D%0A.horizontal%20%7B%0A%20%20-webkit-animation%3A%20horizontalRevert%206s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20horizontalRevert%206s%20linear%20infinite%3B%0A%7D%0A.vertical.c2%20%7B%0A%20%20-webkit-animation%3A%20vertical%204s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20vertical%204s%20linear%20infinite%3B%0A%7D%0A.horizontal.c2%20%7B%0A%20%20-webkit-animation%3A%20horizontalRevert%203s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20horizontalRevert%203s%20linear%20infinite%3B%0A%7D%0A%40-webkit-keyframes%20electron%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20horizontal%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateY(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateY(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20horizontalRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateY(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateY(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20vertical%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateX(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateX(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20verticalRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateX(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateX(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20lateral%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20lateralRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20electron%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20horizontal%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateY(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateY(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20horizontalRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateY(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateY(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20vertical%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateX(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateX(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20verticalRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateX(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateX(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20lateral%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20lateralRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%7D%0A&l=#preview',
				'onecodepen (FullScreen, esc to exit)': 'console/index?fullscreen=true&h=%3Ccanvas%20id%3D%22c%22%3E%3C%2Fcanvas%3E&j=var%20a%20%3D%20document.getElementsByTagName(%27canvas%27)%5B0%5D%3B%0Avar%20b%20%3D%20document.body%3B%0A%0Avar%20requestAnimationFrame%20%3D%0A%09window.requestAnimationFrame%20%7C%7C%0A%20%20%20%20window.mozRequestAnimationFrame%20%7C%7C%0A%20%20%20%20window.webkitRequestAnimationFrame%20%7C%7C%0A%20%20%20%20window.msRequestAnimationFrame%20%7C%7C%0A%20%20%20%20function(f)%7B%20setTimeout(f%2C%201000%2F30)%3B%20%7D%3B%0A%0Aa.style.width%20%3D%20(a.width%20%3D%20innerWidth)%20%2B%20%27px%27%3B%0Aa.style.height%20%3D%20(a.height%20%3D%20innerHeight)%20%2B%20%27px%27%3B%0A%0Avar%20c%20%3D%20a.getContext(%272d%27)%3B%0A%0Aif%20(typeof%20raf%20!%3D%3D%20%27undefined%27)%20cancelAnimationFrame(raf)%3B%0A%0Asw%20%3D%20a.width%3B%0Ash%20%3D%20a.height%3B%0A%0Afunction%20drawGlypy(angle%2C%20distance)%20%7B%0A%0A%20%20%20%20var%20rings%20%3D%2019%3B%0A%20%20%20%20for%20(%20var%20j%20%3D%200%3B%20j%20%3C%20rings%3B%20j%2B%2B%20)%20%7B%0A%20%20%20%20%20%20base%20%3D%20Math.pow(1.5%2C%20(j%20%2B%201)%20)%0A%20%20%20%20%20%20d%20%3D%20base%20%2B%20distance%20*%20base%3B%0A%20%20%20%20%20%20x%20%3D%20sw%20%2F%202%20%2B%20Math.cos(angle)%20*%20d%3B%0A%20%20%20%20%20%20y%20%3D%20sh%20%2F%202%20%2B%20Math.sin(angle)%20*%20d%3B%0A%20%20%20%20%20%20size%20%3D%20d%20%2F%2020%0A%20%20%20%20%20%20%0A%20%20%20%20%20%20c.fillStyle%20%3D%20%22hsla(%22%20%2B%20~~(j%20%2F%20rings%20*%20300)%20%2B%20%22%2C100%25%2C%2030%25%2C%201)%22%0A%20%20%20%20%20%20c.beginPath()%3B%0A%20%20%20%20%20%20c.arc(x%2C%20y%2C%20size%20*%203%2C%200%2C%202%20*%20Math.PI%2C%20false)%3B%0A%20%20%20%20%20%20c.fill()%3B%0A%20%20%20%20%7D%0A%7D%0A%0Ap%20%3D%200%3B%0A%0Afunction%20r()%20%7B%0A%09a.width%20%3D%20a.width%3B%0A%09p%2B%2B%3B%0A%09dots%20%3D%2020%3B%0A%09tunnel%20%3D%200%3B%0A%0A%09for%20(%20var%20i%20%3D%200%3B%20i%20%3C%20dots%3B%20i%2B%2B%20)%20%7B%0A%09%20%20%20%20angle%20%3D%20p%20%2F%20100%20%2B%20i%20%2F%20dots%20*%20Math.PI%20*%202%3B%0A%09%09distance%20%3D%20tunnel%20%2B%20%20(Math.sin(3%20*%20i%20%2F%20dots%20*%20Math.PI%20*%202)%20%2B%201%20%2B%20Math.cos(p%20%2F%2020%20%2B%202%20*%20i%20%2F%20dots%20*%20Math.PI%20*%202)%20%2B%201)%20%2F%204%3B%0A%09%09drawGlypy(angle%2C%20distance)%3B%0A%09%7D%0A%0A%20%09%2F%2F%20GLOB%0A%20%09window.raf%20%3D%20requestAnimationFrame(r)%3B%0A%7D%0Ar()%3B%0A&c=html%2C%20body%20%7B%0A%09margin%3A%200%3B%0A%09padding%3A%200%3B%0A%09border%3A%200%3B%0A%09background-color%3Ablack%0A%7D%0A%23c%20%7B%20display%3A%20block%3B%20%7D&l=#preview',
				'cp4 (FullScreen, esc to exit)' : 'console/index?fullscreen=true&h=%3C!--%20no%20html%20content%20--%3E&j=var%20canvas%20%3D%20document.createElement(%20%27canvas%27%20)%2C%0A%20%20%20%20ctx%20%3D%20canvas.getContext(%20%272d%27%20)%2C%0A%20%20%20%20width%20%3D%20canvas.width%20%3D%20500%2C%0A%20%20%20%20height%20%3D%20canvas.height%20%3D%20500%2C%0A%20%20%20%20rect%20%3D%20%7B%0A%20%20%20%20%20%20x%3A%20width%20%2F%202%2C%0A%20%20%20%20%20%20y%3A%20height%20%2F%202%2C%0A%20%20%20%20%20%20width%3A%2080%2C%0A%20%20%20%20%20%20height%3A%2080%2C%0A%20%20%20%20%20%20rotation%3A%200%0A%20%20%20%20%7D%2C%0A%20%20%20%20tick%20%3D%200%3B%0A%0Actx.lineWidth%20%3D%205%3B%0A%0Afunction%20update()%20%7B%20%20%0A%20%20rect.y%20%3D%20height%20%2F%202%20%2B%20Math.sin(%20tick%20%2F%2020%20)%20*%20175%3B%0A%20%20rect.rotation%20%3D%20Math.cos(%20tick%20%2F%2040%20)%20*%20Math.PI%20*%200.5%3B%0A%7D%0A%0Afunction%20render()%20%7B%0A%20%20ctx.save()%3B%0A%20%20%0A%20%20ctx.translate(%20height%20%2F%202%2C%20width%20%2F%202%20)%3B%0A%20%20ctx.rotate(%20tick%20%2F%2040%20)%3B%0A%20%20%0A%20%20ctx.translate(%20-height%20%2F%202%2C%20-width%20%2F%202%20)%3B%20%20%0A%20%20ctx.fillStyle%20%3D%20%27%23333%27%3B%0A%20%20ctx.fillRect(%20-width%20%2F%202%2C%20height%20%2F%202%20%2C%20width%20*%202%2C%20height%20*%202%20)%3B%0A%20%20%0A%20%20ctx.save()%3B%0A%20%20ctx.translate(%20rect.x%2C%20rect.y%20)%3B%0A%20%20ctx.rotate(%20rect.rotation%20)%3B%0A%20%20ctx.fillStyle%20%3D%20%27%23f34%27%3B%0A%20%20ctx.fillRect(%20-rect.width%20%2F%202%2C%20-rect.height%20%2F%202%2C%20rect.width%2C%20rect.height%20)%3B%0A%20%20ctx.strokeStyle%20%3D%20%27%23333%27%3B%0A%20%20ctx.strokeRect(%20-rect.width%20%2F%202%2C%20-rect.height%20%2F%202%2C%20rect.width%2C%20rect.height%20)%3B%0A%20%20ctx.restore()%3B%0A%20%20%0A%20%20ctx.save()%3B%0A%20%20ctx.translate(%20rect.x%2C%20height%20-%20rect.y%20)%3B%0A%20%20ctx.rotate(%20-rect.rotation%20)%3B%0A%20%20ctx.fillStyle%20%3D%20%27%23333%27%3B%0A%20%20ctx.fillRect(%20-rect.width%20%2F%202%2C%20-rect.height%20%2F%202%2C%20rect.width%2C%20rect.height%20)%3B%0A%20%20ctx.strokeStyle%20%3D%20%27%23f34%27%3B%0A%20%20ctx.strokeRect(%20-rect.width%20%2F%202%2C%20-rect.height%20%2F%202%2C%20rect.width%2C%20rect.height%20)%3B%0A%20%20ctx.restore()%3B%0A%20%20%0A%20%20ctx.restore()%3B%0A%7D%0Avar%20_af%3B%0Afunction%20loop()%20%7B%0A%20%20_af%20%3D%20requestAnimationFrame(%20loop%20)%3B%0A%20%20ctx.clearRect(%200%2C%200%2C%20width%2C%20height%20)%3B%0A%20%20update()%3B%0A%20%20render()%3B%0A%20%20tick%2B%2B%3B%0A%7D%0A%0Adocument.body.appendChild(%20canvas%20)%3B%0Aloop()%3B%0A&c=body%20%7B%0A%20%20background%3A%20%23000%3B%0A%20%20overflow%3A%20hidden%3B%0A%7D%0A%0Acanvas%20%7B%0A%20%20background%3A%20%23f34%3B%0A%20%20bottom%3A%200%3B%0A%20%20left%3A%200%3B%0A%20%20margin%3A%20auto%3B%0A%20%20position%3A%20absolute%3B%0A%20%20right%3A%200%3B%0A%20%20top%3A%200%3B%0A%7D&l=#preview',
				'cp light loader' : 'console/index?fullscreen=true&h=%3C!--%20no%20html%20content%20--%3E&j=%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%20%20%0A%2F*%20Light%20Loader%0A%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%0Avar%20lightLoader%20%3D%20function(c%2C%20cw%2C%20ch)%7B%0A%09%0A%09var%20_this%20%3D%20this%3B%0A%09this.c%20%3D%20c%3B%0A%09this.ctx%20%3D%20c.getContext(%272d%27)%3B%0A%09this.cw%20%3D%20cw%3B%0A%09this.ch%20%3D%20ch%3B%09%09%09%0A%09%0A%09this.loaded%20%3D%200%3B%0A%09this.loaderSpeed%20%3D%20.6%3B%0A%09this.loaderHeight%20%3D%2010%3B%0A%09this.loaderWidth%20%3D%20310%3B%09%09%09%09%0A%09this.loader%20%3D%20%7B%0A%09%09x%3A%20(this.cw%2F2)%20-%20(this.loaderWidth%2F2)%2C%0A%09%09y%3A%20(this.ch%2F2)%20-%20(this.loaderHeight%2F2)%0A%09%7D%3B%0A%09this.particles%20%3D%20%5B%5D%3B%0A%09this.particleLift%20%3D%20180%3B%0A%09this.hueStart%20%3D%200%0A%09this.hueEnd%20%3D%20120%3B%0A%09this.hue%20%3D%200%3B%0A%09this.gravity%20%3D%20.15%3B%0A%09this.particleRate%20%3D%204%3B%09%0A%09%09%09%09%09%0A%09%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%09%0A%09%2F*%20Initialize%0A%09%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%0A%09this.init%20%3D%20function()%7B%0A%09%09this.loop()%3B%0A%09%7D%3B%0A%09%0A%09%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%09%0A%09%2F*%20Utility%20Functions%0A%09%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%09%09%09%09%0A%09this.rand%20%3D%20function(rMi%2C%20rMa)%7Breturn%20~~((Math.random()*(rMa-rMi%2B1))%2BrMi)%3B%7D%3B%0A%09this.hitTest%20%3D%20function(x1%2C%20y1%2C%20w1%2C%20h1%2C%20x2%2C%20y2%2C%20w2%2C%20h2)%7Breturn%20!(x1%20%2B%20w1%20%3C%20x2%20%7C%7C%20x2%20%2B%20w2%20%3C%20x1%20%7C%7C%20y1%20%2B%20h1%20%3C%20y2%20%7C%7C%20y2%20%2B%20h2%20%3C%20y1)%3B%7D%3B%0A%09%0A%09%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%09%0A%09%2F*%20Update%20Loader%0A%09%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%0A%09this.updateLoader%20%3D%20function()%7B%0A%09%09if(this.loaded%20%3C%20100)%7B%0A%09%09%09this.loaded%20%2B%3D%20this.loaderSpeed%3B%0A%09%09%7D%20else%20%7B%0A%09%09%09this.loaded%20%3D%200%3B%0A%09%09%7D%0A%09%7D%3B%0A%09%0A%09%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%09%0A%09%2F*%20Render%20Loader%0A%09%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%0A%09this.renderLoader%20%3D%20function()%7B%0A%09%09this.ctx.fillStyle%20%3D%20%27%23000%27%3B%0A%09%09this.ctx.fillRect(this.loader.x%2C%20this.loader.y%2C%20this.loaderWidth%2C%20this.loaderHeight)%3B%0A%09%09%0A%09%09this.hue%20%3D%20this.hueStart%20%2B%20(this.loaded%2F100)*(this.hueEnd%20-%20this.hueStart)%3B%0A%09%09%0A%09%09var%20newWidth%20%3D%20(this.loaded%2F100)*this.loaderWidth%3B%0A%09%09this.ctx.fillStyle%20%3D%20%27hsla(%27%2Bthis.hue%2B%27%2C%20100%25%2C%2040%25%2C%201)%27%3B%0A%09%09this.ctx.fillRect(this.loader.x%2C%20this.loader.y%2C%20newWidth%2C%20this.loaderHeight)%3B%0A%09%09%0A%09%09this.ctx.fillStyle%20%3D%20%27%23222%27%3B%0A%09%09this.ctx.fillRect(this.loader.x%2C%20this.loader.y%2C%20newWidth%2C%20this.loaderHeight%2F2)%3B%0A%09%7D%3B%09%0A%09%0A%09%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%09%0A%09%2F*%20Particles%0A%09%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%0A%09this.Particle%20%3D%20function()%7B%09%09%09%09%09%0A%09%09this.x%20%3D%20_this.loader.x%20%2B%20((_this.loaded%2F100)*_this.loaderWidth)%20-%20_this.rand(0%2C%201)%3B%0A%09%09this.y%20%3D%20_this.ch%2F2%20%2B%20_this.rand(0%2C_this.loaderHeight)-_this.loaderHeight%2F2%3B%0A%09%09this.vx%20%3D%20(_this.rand(0%2C4)-2)%2F100%3B%0A%09%09this.vy%20%3D%20(_this.rand(0%2C_this.particleLift)-_this.particleLift*2)%2F100%3B%0A%09%09this.width%20%3D%20_this.rand(1%2C4)%2F2%3B%0A%09%09this.height%20%3D%20_this.rand(1%2C4)%2F2%3B%0A%09%09this.hue%20%3D%20_this.hue%3B%0A%09%7D%3B%0A%09%0A%09this.Particle.prototype.update%20%3D%20function(i)%7B%0A%09%09this.vx%20%2B%3D%20(_this.rand(0%2C6)-3)%2F100%3B%20%0A%09%09this.vy%20%2B%3D%20_this.gravity%3B%0A%09%09this.x%20%2B%3D%20this.vx%3B%0A%09%09this.y%20%2B%3D%20this.vy%3B%0A%09%09%0A%09%09if(this.y%20%3E%20_this.ch)%7B%0A%09%09%09_this.particles.splice(i%2C%201)%3B%0A%09%09%7D%09%09%09%09%09%0A%09%7D%3B%0A%09%0A%09this.Particle.prototype.render%20%3D%20function()%7B%0A%09%09_this.ctx.fillStyle%20%3D%20%27hsla(%27%2Bthis.hue%2B%27%2C%20100%25%2C%20%27%2B_this.rand(50%2C70)%2B%27%25%2C%20%27%2B_this.rand(20%2C100)%2F100%2B%27)%27%3B%0A%09%09_this.ctx.fillRect(this.x%2C%20this.y%2C%20this.width%2C%20this.height)%3B%0A%09%7D%3B%0A%09%0A%09this.createParticles%20%3D%20function()%7B%0A%09%09var%20i%20%3D%20this.particleRate%3B%0A%09%09while(i--)%7B%0A%09%09%09this.particles.push(new%20this.Particle())%3B%0A%09%09%7D%3B%0A%09%7D%3B%0A%09%09%09%09%09%0A%09this.updateParticles%20%3D%20function()%7B%09%09%09%09%09%0A%09%09var%20i%20%3D%20this.particles.length%3B%09%09%09%09%09%09%0A%09%09while(i--)%7B%0A%09%09%09var%20p%20%3D%20this.particles%5Bi%5D%3B%0A%09%09%09p.update(i)%3B%09%09%09%09%09%09%09%09%09%09%09%0A%09%09%7D%3B%09%09%09%09%09%09%0A%09%7D%3B%0A%09%0A%09this.renderParticles%20%3D%20function()%7B%0A%09%09var%20i%20%3D%20this.particles.length%3B%09%09%09%09%09%09%0A%09%09while(i--)%7B%0A%09%09%09var%20p%20%3D%20this.particles%5Bi%5D%3B%0A%09%09%09p.render()%3B%09%09%09%09%09%09%09%09%09%09%09%0A%09%09%7D%3B%09%09%09%09%09%0A%09%7D%3B%0A%09%0A%0A%09%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%09%0A%09%2F*%20Clear%20Canvas%0A%09%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%0A%09this.clearCanvas%20%3D%20function()%7B%0A%09%09this.ctx.globalCompositeOperation%20%3D%20%27source-over%27%3B%0A%09%09this.ctx.clearRect(0%2C0%2Cthis.cw%2Cthis.ch)%3B%09%09%09%09%09%0A%09%09this.ctx.globalCompositeOperation%20%3D%20%27lighter%27%3B%0A%09%7D%3B%0A%09%0A%09%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%09%0A%09%2F*%20Animation%20Loop%0A%09%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%0A%09this.loop%20%3D%20function()%7B%0A%09%09var%20loopIt%20%3D%20function()%7B%0A%09%09%09requestAnimationFrame(loopIt%2C%20_this.c)%3B%0A%09%09%09_this.clearCanvas()%3B%0A%09%09%09%0A%09%09%09_this.createParticles()%3B%0A%09%09%09%0A%09%09%09_this.updateLoader()%3B%0A%09%09%09_this.updateParticles()%3B%0A%09%09%09%0A%09%09%09_this.renderLoader()%3B%0A%09%09%09_this.renderParticles()%3B%0A%09%09%09%0A%09%09%7D%3B%0A%09%09loopIt()%3B%09%09%09%09%09%0A%09%7D%3B%0A%0A%7D%3B%0A%0A%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%09%0A%2F*%20Check%20Canvas%20Support%0A%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%0Avar%20isCanvasSupported%20%3D%20function()%7B%0A%09var%20elem%20%3D%20document.createElement(%27canvas%27)%3B%0A%09return%20!!(elem.getContext%20%26%26%20elem.getContext(%272d%27))%3B%0A%7D%3B%0A%0A%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%09%0A%2F*%20Setup%20requestAnimationFrame%0A%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%0Avar%20setupRAF%20%3D%20function()%7B%0A%09var%20lastTime%20%3D%200%3B%0A%09var%20vendors%20%3D%20%5B%27ms%27%2C%20%27moz%27%2C%20%27webkit%27%2C%20%27o%27%5D%3B%0A%09for(var%20x%20%3D%200%3B%20x%20%3C%20vendors.length%20%26%26%20!window.requestAnimationFrame%3B%20%2B%2Bx)%7B%0A%09%09window.requestAnimationFrame%20%3D%20window%5Bvendors%5Bx%5D%2B%27RequestAnimationFrame%27%5D%3B%0A%09%09window.cancelAnimationFrame%20%3D%20window%5Bvendors%5Bx%5D%2B%27CancelAnimationFrame%27%5D%20%7C%7C%20window%5Bvendors%5Bx%5D%2B%27CancelRequestAnimationFrame%27%5D%3B%0A%09%7D%3B%0A%09%0A%09if(!window.requestAnimationFrame)%7B%0A%09%09window.requestAnimationFrame%20%3D%20function(callback%2C%20element)%7B%0A%09%09%09var%20currTime%20%3D%20new%20Date().getTime()%3B%0A%09%09%09var%20timeToCall%20%3D%20Math.max(0%2C%2016%20-%20(currTime%20-%20lastTime))%3B%0A%09%09%09var%20id%20%3D%20window.setTimeout(function()%20%7B%20callback(currTime%20%2B%20timeToCall)%3B%20%7D%2C%20timeToCall)%3B%0A%09%09%09lastTime%20%3D%20currTime%20%2B%20timeToCall%3B%0A%09%09%09return%20id%3B%0A%09%09%7D%3B%0A%09%7D%3B%0A%09%0A%09if%20(!window.cancelAnimationFrame)%7B%0A%09%09window.cancelAnimationFrame%20%3D%20function(id)%7B%0A%09%09%09clearTimeout(id)%3B%0A%09%09%7D%3B%0A%09%7D%3B%0A%7D%3B%09%09%09%0A%0A%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%09%0A%2F*%20Define%20Canvas%20and%20Initialize%0A%2F*%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D*%2F%0Aif(isCanvasSupported)%7B%0A%20%20var%20c%20%3D%20document.createElement(%27canvas%27)%3B%0A%20%20c.width%20%3D%20400%3B%0A%20%20c.height%20%3D%20100%3B%09%09%09%0A%20%20var%20cw%20%3D%20c.width%3B%0A%20%20var%20ch%20%3D%20c.height%3B%09%0A%20%20document.body.appendChild(c)%3B%09%0A%20%20var%20cl%20%3D%20new%20lightLoader(c%2C%20cw%2C%20ch)%3B%09%09%09%09%0A%20%20%0A%20%20setupRAF()%3B%0A%20%20cl.init()%3B%0A%7D%0A&c=%0A%0Abody%20%7B%0A%09background%3A%20%23111%3B%0A%7D%0A%0Acanvas%20%7B%0A%09background%3A%20%23111%3B%0A%09border%3A%201px%20solid%20%23171717%3B%0A%09display%3A%20block%3B%0A%09left%3A%2050%25%3B%0A%09margin%3A%20-51px%200%200%20-201px%3B%0A%09position%3A%20absolute%3B%0A%09top%3A%2050%25%3B%0A%7D%0A%0A&l=#preview',
				'cp Ana Tudor rules' : 'console/index?fullscreen=true&h=%0A%0A%3Cul%20class%3D%27wrapper%27%3E%0A%20%20%3Cli%20class%3D%27piece%20triangle%20triangle-big%27%3E%3C%2Fli%3E%0A%20%20%3Cli%20class%3D%27piece%20triangle%20triangle-small%27%3E%3C%2Fli%3E%0A%20%20%3Cli%20class%3D%27piece%20block%20block-low%27%3E%3C%2Fli%3E%0A%20%20%3Cli%20class%3D%27piece%20block%20block-high%27%3E%3C%2Fli%3E%0A%3C%2Ful%3E%0A%0A&j=%2F*%20no%20javascript%20content%20*%2F&c=%0A%0Abody%20%7B%20overflow%3A%20hidden%3B%20%7D%0A.wrapper%20%7B%0A%20%20position%3A%20relative%3B%0A%20%20margin%3A%201em%20auto%3B%0A%20%20padding%3A%200%3B%0A%20%20width%3A%2013em%3B%20height%3A%205em%3B%0A%20%20box-shadow%3A%20inset%20-1px%20-1px%200%20black%3B%0A%20%20list-style%3A%20none%3B%0A%20%20background%3A%20linear-gradient(black%202.5%25%2C%20transparent%201px)%2C%0A%20%20%20%20linear-gradient(90deg%2C%20black%202.5%25%2C%20transparent%201px)%3B%0A%20%20background-size%3A%201em%201em%3B%0A%20%20font%3A%202.5em%20Verdana%2C%20sans-serif%3B%0A%7D%0A.piece%20%7B%0A%20%20position%3A%20absolute%3B%0A%20%20right%3A%200%3B%20bottom%3A%200%3B%0A%20%20opacity%3A%20.85%3B%0A%20%20animation%3A%20ani%204s%20infinite%20linear%20alternate%3B%0A%7D%0A.triangle%20%7B%20overflow%3A%20hidden%3B%20transform-origin%3A%200%20100%25%3B%20%7D%0A.piece%3Abefore%20%7B%0A%20%20position%3A%20absolute%3B%0A%20%20content%3A%20%27%27%3B%0A%7D%0A.triangle%3Abefore%20%7B%0A%20%20width%3A%20inherit%3B%20height%3A%20inherit%3B%0A%20%20transform-origin%3A%20inherit%3B%0A%7D%0A.block%20%7B%20width%3A%205em%3B%20height%3A%201em%3B%20%7D%0A.block%3Abefore%20%7B%20height%3A%201em%3B%20background%3A%20inherit%3B%20%7D%0A.triangle-big%20%7B%0A%20%20right%3A%205em%3B%0A%20%20width%3A%208em%3B%20height%3A%203em%3B%0A%20%20transform%3A%20skewX(-69.444deg)%3B%20%2F*%20-arctan(width%2Fheight)%20*%2F%0A%20%20animation-name%3A%20ani-triangle-big%3B%0A%7D%0A.triangle-big%3Abefore%20%7B%0A%20%20background%3A%20crimson%3B%0A%20%20transform%3A%20skewX(69.444deg)%3B%20%20%2F*%20arctan(width%2Fheight)%20*%2F%0A%7D%0A.triangle-small%20%7B%0A%20%20bottom%3A%203em%3B%0A%20%20width%3A%205em%3B%20height%3A%202em%3B%0A%20%20transform%3A%20skewX(-68.2deg)%3B%20%2F*%20-arctan(width%2Fheight)%20*%2F%0A%20%20animation-name%3A%20ani-triangle-small%3B%0A%7D%0A.triangle-small%3Abefore%20%7B%0A%20%20background%3A%20mediumvioletred%3B%0A%20%20transform%3A%20skewX(68.2deg)%3B%20%2F*%20arctan(width%2Fheight)%20*%2F%0A%7D%0A.block-high%20%7B%0A%20%20bottom%3A%202em%3B%0A%20%20background%3A%20darkmagenta%3B%0A%20%20animation-name%3A%20ani-block-high%3B%0A%7D%0A.block-high%3Abefore%20%7B%0A%20%20top%3A%20100%25%3B%0A%20%20width%3A%202em%3B%0A%7D%0A.block-low%20%7B%0A%20%20background%3A%20darkviolet%3B%0A%7D%0A.block-low%3Abefore%20%7B%0A%20%20right%3A%200%3B%20bottom%3A%20100%25%3B%0A%20%20width%3A%203em%3B%0A%7D%0A%0A%40keyframes%20ani-triangle-big%20%7B%0A%20%200%25%2C%2025%25%20%7B%0A%20%20%20%20right%3A%205em%3B%20bottom%3A%200%3B%0A%20%20%20%20transform%3A%20rotate(0deg)%20skewX(-69.444deg)%3B%0A%20%20%7D%0A%20%2075%25%2C%20100%25%20%7B%0A%20%20%20%20right%3A%200%3B%20bottom%3A%202em%3B%0A%20%20%20%20transform%3A%20rotate(360deg)%20skewX(-69.444deg)%3B%0A%20%20%7D%0A%7D%0A%40keyframes%20ani-triangle-small%20%7B%0A%20%200%25%2C%2025%25%20%7B%0A%20%20%20%20right%3A%200%3B%20bottom%3A%203em%3B%0A%20%20%20%20transform%3A%20rotate(0deg)%20skewX(-68.2deg)%3B%0A%20%20%7D%0A%20%2075%25%2C%20100%25%20%7B%0A%20%20%20%20right%3A%208em%3B%20bottom%3A%200%3B%0A%20%20%20%20transform%3A%20rotate(-360deg)%20skewX(-68.2deg)%3B%0A%20%20%7D%0A%7D%0A%40keyframes%20ani-block-high%20%7B%0A%20%200%25%2C%2025%25%20%7B%20right%3A%200%3B%20bottom%3A%202em%3B%20%7D%0A%20%2075%25%2C%20100%25%20%7B%20right%3A%203em%3B%20bottom%3A%201em%3B%20%7D%0A%7D%0A%0A&l=#preview',
				'cp Twitter button' : 'console/index?fullscreen=true&h=%0A%0A%3Csection%3E%0A%20%20%3Cdiv%20class%3D%22button%22%3E%0A%20%20%20%20%3Ca%20href%3D%22https%3A%2F%2Ftwitter.com%2Fbennettfeely%22%20class%3D%22twitter-follow-button%22%20data-show-count%3D%22false%22%20data-size%3D%22large%22%3EFollow%20%40bennettfeely%3C%2Fa%3E%0A%20%20%20%20%3Cscript%3E!function(d%2Cs%2Cid)%7Bvar%20js%2Cfjs%3Dd.getElementsByTagName(s)%5B0%5D%3Bif(!d.getElementById(id))%7Bjs%3Dd.createElement(s)%3Bjs.id%3Did%3Bjs.src%3D%22%2F%2Fplatform.twitter.com%2Fwidgets.js%22%3Bfjs.parentNode.insertBefore(js%2Cfjs)%3B%7D%7D(document%2C%22script%22%2C%22twitter-wjs%22)%3B%3C%2Fscript%3E%0A%20%20%3C%2Fdiv%3E%0A%20%20%3Cdiv%20class%3D%22cover%22%3E%0A%20%20%20%20%3Cdiv%20class%3D%22innie%22%3E%3C%2Fdiv%3E%0A%20%20%20%20%3Cdiv%20class%3D%22spine%22%3E%3C%2Fdiv%3E%0A%20%20%20%20%3Cdiv%20class%3D%22outie%22%3E%3C%2Fdiv%3E%0A%3C%2Fdiv%3E%0A%20%20%3Cdiv%20class%3D%22shadow%22%3E%3C%2Fdiv%3E%0A%3C%2Fsection%3E%0A%0A%3Csmall%3ELive%20version%20of%20Erik%20Deiner%27s%20%3Ca%20target%3D%22_blank%22%20href%3D%22http%3A%2F%2Fdribbble.com%2Fshots%2F457259-Twitter-Button-Concept%22%3ETwitter%20Button%20Concept%3C%2Fa%3E%20on%20Dribbble.%3C%2Fsmall%3E%0A%0A&j=%2F*%20no%20javascript%20content%20*%2F&c=%0A%0Asection%2C%20section%20div%20%7B%0A%20%20%2F*%20See%20it%20in%20slo-mo%2C%20you%20can%20change%20this%20*%2F%0A%20%20transition-duration%3A%20.6s%3B%0A%7D%0A%0A*%20%7B%20box-sizing%3A%20border-box%3B%20%7D%0Ahtml%2C%20body%20%7B%20height%3A%20100%25%3B%20%7D%0Abody%20%7B%0A%20%20display%3A%20flex%3B%0A%20%20flex-direction%3A%20column%3B%0A%20%20justify-content%3A%20center%3B%0A%20%20align-items%3A%20center%3B%0A%20%20background-image%3A%20-webkit-radial-gradient(center%20top%2C%20circle%20farthest-corner%2C%20%23FFFFFF%200%25%2C%20%23D8DFE9%20100%25)%3B%0A%20%20background-image%3A%20radial-gradient(circle%20farthest-corner%20at%20center%20top%2C%20%23FFFFFF%200%25%2C%20%23D8DFE9%20100%25)%3B%0A%20%20overflow%3A%20hidden%3B%0A%7D%0A%0Asection%2C%20.button%20%7B%20transition-timing-function%3A%20ease%3B%20%7D%0A%0Asection%20%7B%0A%20%20display%3A%20inline-block%3B%0A%20%20position%3A%20relative%3B%0A%20%20padding%3A%20.375rem%20.375rem%200%3B%0A%20%20height%3A%202.5rem%3B%0A%20%20background%3A%20%23A9ADB6%3B%0A%20%20border-radius%3A%20.25rem%3B%0A%20%20perspective%3A%20300%3B%0A%20%20box-shadow%3A%200%20-1px%202px%20%23fff%2C%20inset%200%201px%202px%20rgba(0%2C0%2C0%2C.2)%2C%20inset%200%20.25rem%201rem%20rgba(0%2C0%2C0%2C.1)%3B%0A%7D%0A%0A%0A.button%20%7B%20opacity%3A%200%3B%20%7D%0A%0A.cover%20%7B%0A%20%20position%3A%20absolute%3B%0A%20%20top%3A%200%3B%20right%3A%200%3B%20bottom%3A%200%3B%20left%3A%200%3B%0A%20%20transform-origin%3A%20center%20bottom%3B%0A%20%20transform-style%3A%20preserve-3d%3B%0A%20%20font%3A%201.25em%2F2%20%22icon%22%3B%0A%20%20color%3A%20white%3B%0A%20%20text-align%3A%20center%3B%0A%20%20pointer-events%3A%20none%3B%0A%20%20z-index%3A%20100%3B%0A%7D%0A%0A.innie%2C%20.outie%2C%20.spine%2C%20.shadow%20%7B%20position%3A%20absolute%3B%20width%3A%20100%25%3B%20%7D%0A%0A.innie%2C%20.outie%20%7B%0A%20%20height%3A%20100%25%3B%0A%20%20background-image%3A%20-webkit-linear-gradient(top%2C%20transparent%200%25%2C%20rgba(0%2C0%2C0%2C.1)%20100%25)%3B%0A%20%20border-radius%3A%20.25rem%3B%0A%7D%0A.innie%3Aafter%2C%20.outie%3Aafter%20%7B%20content%3A%22t%22%3B%20%7D%0A%0A.innie%20%7B%0A%20%20background-color%3A%20%2367E2FE%3B%0A%20%20text-shadow%3A%200%20-2px%204px%20rgba(0%2C0%2C0%2C.2)%3B%0A%7D%0A%0A.spine%20%7B%0A%20%20top%3A%20.25rem%3B%0A%20%20background%3A%20%2320C7F3%3B%0A%20%20height%3A%20.25rem%3B%0A%20%20transform%3A%20rotateX(90deg)%3B%0A%20%20transform-origin%3A%20center%20top%3B%0A%7D%0A%0A.shadow%20%7B%0A%20%20top%3A%20100%25%3B%0A%20%20left%3A%200%3B%0A%20%20height%3A%203.5rem%3B%0A%20%20transform-origin%3A%20center%20top%3B%0A%20%20transform%3A%20rotateX(90deg)%3B%0A%20%20opacity%3A%200%3B%0A%20%20z-index%3A%200%3B%0A%20%20background-image%3A%20-webkit-linear-gradient(top%2C%20rgba(0%2C0%2C0%2C.6)%200%25%2C%20transparent%20100%25)%3B%0A%20%20background-image%3A%20linear-gradient(to%20bottom%2C%20rgba(0%2C0%2C0%2C.6)%200%25%2C%20transparent%20100%25)%3B%0A%20%20border-radius%3A%20.4rem%3B%0A%0A%7D%0A%0A.outie%20%7B%0A%20%20background-color%3A%20%232EC8FA%3B%0A%20%20transform%3A%20translateZ(.25rem)%3B%0A%20%20text-shadow%3A%200%202px%204px%20rgba(0%2C0%2C0%2C.2)%3B%0A%7D%0A%0Asection%3Ahover%20%7B%20background%3A%20%23EBEFF2%3B%20%7D%0Asection%3Ahover%20.button%20%7B%20opacity%3A%201%3B%20%7D%0A%0Asection%3Ahover%20.cover%2C%20section%3Ahover%20.innie%2C%20section%3Ahover%20.spine%2C%20section%3Ahover%20.outie%2C%20section%3Ahover%20.spine%20%7B%20transition-timing-function%3A%20cubic-bezier(.2%2C.7%2C.1%2C1.1)%3B%20%7D%0A%0Asection%3Ahover%20.cover%20%7B%20transform%3A%20rotateX(-120deg)%3B%20%20%7D%0A%0Asection%3Ahover%20.innie%20%7B%20background-color%3A%20%233ADAFC%3B%20%7D%0Asection%3Ahover%20.spine%20%7B%20background-color%3A%20%2352B1E0%3B%20%7D%0Asection%3Ahover%20.outie%20%7B%20background-color%3A%20%232174A0%3B%20color%3A%20rgba(255%2C255%2C255%2C0)%3B%20%7D%0A%0Asection%3Ahover%20.shadow%20%7B%20%0A%20%20opacity%3A%201%3B%0A%20%20transform%3A%20rotateX(45deg)%20scale(.95)%3B%0A%7D%0A%0A%0Asmall%20%7B%0A%20%20font%3A%20.8rem%2F1%20sans-serif%3B%0A%20%20padding-top%3A%204rem%3B%0A%20%20color%3A%20%23777%3B%0A%7D%0Asmall%20a%20%7B%20color%3A%20%23222%3B%20text-decoration%3A%20none%3B%20border-bottom%3A%20thin%20solid%20%23ccc%3B%20%7D%0Asmall%20a%3Ahover%20%7B%20border-bottom-color%3A%20%23222%3B%20%7D%0A%0A%0A%2F*%20Twitter%20font%20icon%3A%20http%3A%2F%2Fcodepen.io%2Fbennettfeely%2Fpen%2FGCAKJ%20*%2F%0A%40font-face%20%7B%20font-family%3Aicon%3B%20src%3A%20url(%27http%3A%2F%2Fbennettfeely.com%2Ffonts%2Ficons.woff%27)%3B%20%7D%0A%0A&l=#preview',
				'Console cs': 'demo/cs/',
				'Center':'console/index?fullscreen=true&h=%3Cdiv%20class%3D%22center%20centerALL%20round8%22%3E%0A%20%20%20%20%3Cdiv%20class%3D%22inner%22%3ELorem%20ipsum%20dolor%20sit%20amet%2C%20consectetur%20adipisicing%20elit.%20Alias%20ducimus%20sed%20optio%20esse%20architecto%20quae%20earum%20repellendus%20consequatur%20accusamus%20ipsam%3F%3C%2Fdiv%3E%0A%3C%2Fdiv%3E&j=%2F*%20no%20javascript%20content%20*%2F&c=body%7B%0A%20%20%20%20font-family%3Averdana%3B%0A%7D%0A.center%7B%0A%20%20%20%20height%3A50%25%3B%0A%20%20%20%20width%3A50%25%3B%0A%20%20%20%20background-color%3A%20gainsboro%3B%0A%20%20%20%20position%3Aabsolute%3B%0A%20%20%20%20display%3Atable%3B%0A%7D%0A.centerV%20%7B%0A%20%20%20%20top%20%3A%2025%25%3B%0A%7D%0A.centerO%20%7B%0A%20%20%20%20left%3A25%25%3B%0A%7D%0A.centerALL%7B%0A%20%20%20%20top%3A25%25%3B%0A%20%20%20%20left%3A25%25%3B%0A%7D%0A.center%20.inner%7B%0A%20%20%20%20padding%3A50px%3B%0A%20%20%20%20display%3Atable-cell%3B%0A%20%20%20%20vertical-align%3Amiddle%3B%0A%7D&l=#preview',
				'Some widgets': 'test_widget',
				'Wcave game': 'wcave.jmvc',
				'Canvas based Image filter': 'demo/img',
				'Streetview panorama animator': '?map=true',
				'Some flag fun': 'demo/flag',
				'JMVC Logo plotted': 'demo/logo',
				'Google': 'google.jmvc',
				'Google flash': 'google.jmvc?flash',
				'Google aberration': 'google.jmvc?aberrate',
				'Observer': 'demo/observer.jmvc',
				'Sheduler': 'demo/scheduler.jmvc',
				'Effects': 'demo/fx.jmvc',
				//'Key': 'test_key',
				//'Grind': 'grind',
				'canvas ext using 2d lib': 'test_canvas',
				'deviceLight API (FF only)' : 'console/index?fullscreen=true&h=%3Ch3%3ELight%3A%20%3Cspan%20id%3D%22l%22%3E%3C%2Fspan%3E%3C%2Fh3%3E&j=window.addEventListener(%27devicelight%27%2C%20function(e)%20%7B%0A%09document.getElementById(%27l%27).innerHTML%20%3D%20e.value%3B%0A%7D)&c=body%7Bbackground-color%3Ablack%3B%20padding%3A50px%7D%0Ah3%7Bcolor%3A%20white%7D%0Aspan%7Bcolor%3Ared%7D&l=#preview',
				'Orientation API' : 'demo/orientation',
				'direct&crypt_image': 'demo/direct',
				'Tabs': 'tabs/index/i_say/Hello%20my%20Guest',
				'modal': 'test_modal',
				'cubic': 'cubic',
				'neverending carpet': 'carpet',
				'Widgzard' : 'widgzard',
				'Trial drawer' : 'demo/drawer.jmvc',
				'css sprite' : 'console/index?fullscreen=true&h=%3Cdiv%20class%3D%22hi%22%3E%3C%2Fdiv%3E&j=%2F*%20no%20javascript%20content%20*%2F&c=.hi%20%7B%0A%20%20%20%20width%3A%2050px%3B%0A%20%20%20%20height%3A%2072px%3B%0A%20%20%20%20background-image%3A%20url(%22http%3A%2F%2Fs.cdpn.io%2F79%2Fsprite-steps.png%22)%3B%0A%20%20%20%20%0A%20%20%20%20-webkit-animation%3A%20play%20.8s%20steps(10)%20infinite%3B%0A%20%20%20%20%20%20%20-moz-animation%3A%20play%20.8s%20steps(10)%20infinite%3B%0A%20%20%20%20%20%20%20%20-ms-animation%3A%20play%20.8s%20steps(10)%20infinite%3B%0A%20%20%20%20%20%20%20%20%20-o-animation%3A%20play%20.8s%20steps(10)%20infinite%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20animation%3A%20play%20.8s%20steps(10)%20infinite%3B%0A%7D%0A%0A%40-webkit-keyframes%20play%20%7B%0A%20%20%20from%20%7B%20background-position%3A%20%20%20%200px%3B%20%7D%0A%20%20%20%20%20to%20%7B%20background-position%3A%20-500px%3B%20%7D%0A%7D%0A%0A%40-moz-keyframes%20play%20%7B%0A%20%20%20from%20%7B%20background-position%3A%20%20%20%200px%3B%20%7D%0A%20%20%20%20%20to%20%7B%20background-position%3A%20-500px%3B%20%7D%0A%7D%0A%0A%40-ms-keyframes%20play%20%7B%0A%20%20%20from%20%7B%20background-position%3A%20%20%20%200px%3B%20%7D%0A%20%20%20%20%20to%20%7B%20background-position%3A%20-500px%3B%20%7D%0A%7D%0A%0A%40-o-keyframes%20play%20%7B%0A%20%20%20from%20%7B%20background-position%3A%20%20%20%200px%3B%20%7D%0A%20%20%20%20%20to%20%7B%20background-position%3A%20-500px%3B%20%7D%0A%7D%0A%0A%40keyframes%20play%20%7B%0A%20%20%20from%20%7B%20background-position%3A%20%20%20%200px%3B%20%7D%0A%20%20%20%20%20to%20%7B%20background-position%3A%20-500px%3B%20%7D%0A%7D%0A&l=#preview',
				'Css logo attempt' : 'console/index?fullscreen=true&h=%3Cdiv%20class%3D%22logo%22%3E%0A%09%3Cdiv%20class%3D%22o1%22%3E%0A%09%09%3Cdiv%20class%3D%22ell%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22cil%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22arr%22%3E%3C%2Fdiv%3E%0A%09%3C%2Fdiv%3E%0A%09%3Cdiv%20class%3D%22o2%22%3E%0A%09%09%3Cdiv%20class%3D%22ell%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22cil%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22arr%22%3E%3C%2Fdiv%3E%0A%09%3C%2Fdiv%3E%0A%09%3Cdiv%20class%3D%22o3%22%3E%0A%09%09%3Cdiv%20class%3D%22ell%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22cil%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22arr%22%3E%3C%2Fdiv%3E%0A%09%3C%2Fdiv%3E%0A%09%3Cdiv%20class%3D%22o4%22%3E%0A%09%09%3Cdiv%20class%3D%22ell%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22cil%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22arr%22%3E%3C%2Fdiv%3E%0A%09%3C%2Fdiv%3E%0A%09%3Cdiv%20class%3D%22o5%22%3E%0A%09%09%3Cdiv%20class%3D%22ell%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22cil%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22arr%22%3E%3C%2Fdiv%3E%0A%09%3C%2Fdiv%3E%0A%09%3Cdiv%20class%3D%22o6%22%3E%0A%09%09%3Cdiv%20class%3D%22ell%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22cil%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22arr%22%3E%3C%2Fdiv%3E%0A%09%3C%2Fdiv%3E%0A%3C%2Fdiv%3E&j=%2F*%20no%20javascript%20content%20*%2F&c=body%7B%0A%09margin-top%3A10px%3B%0A%7D%0A.logo%7B%0A%09position%3Arelative%3B%0A%09width%3A%20500px%3B%0A%09height%3A538px%3B%0A%09text-align%3Acenter%3B%0A%09margin%3A0%20auto%3B%0A%7D%0A.o1%2C%20.o2%2C%20.o3%2C%20.o4%2C%20.o5%2C%20.o6%7B%0A%09position%3Aabsolute%3B%0A%7D%0A.o1%7B%0A%09left%3A200px%3B%0A%7D%0A.o2%7B%0A%09left%3A327px%3B%0A%09top%3A74px%3B%0A%20%09-webkit-transform%3A%20rotate(60deg)%3B%0A%09-moz-transform%3A%20rotate(60deg)%3B%0A%09-ms-transform%3A%20rotate(60deg)%3B%0A%09-o-transform%3A%20rotate(60deg)%3B%0A%7D%0A.o3%7B%0A%09left%3A327px%3B%0A%09top%3A221px%3B%0A%20%09-webkit-transform%3A%20rotate(120deg)%3B%0A%09-moz-transform%3A%20rotate(120deg)%3B%0A%09-ms-transform%3A%20rotate(120deg)%3B%0A%09-o-transform%3A%20rotate(120deg)%3B%0A%7D%0A%0A.o4%7B%0A%09left%3A200px%3B%0A%09top%3A293px%3B%0A%20%09-webkit-transform%3A%20rotate(180deg)%3B%0A%09-moz-transform%3A%20rotate(180deg)%3B%0A%09-ms-transform%3A%20rotate(180deg)%3B%0A%09-o-transform%3A%20rotate(180deg)%3B%0A%7D%0A%0A.o5%7B%0A%09left%3A73px%3B%0A%09top%3A217px%3B%0A%20%09-webkit-transform%3A%20rotate(240deg)%3B%0A%09-moz-transform%3A%20rotate(240deg)%3B%0A%09-ms-transform%3A%20rotate(240deg)%3B%0A%09-o-transform%3A%20rotate(240deg)%3B%0A%7D%0A%0A.o6%7B%0A%09left%3A73px%3B%0A%09top%3A72px%3B%0A%20%09-webkit-transform%3A%20rotate(300deg)%3B%0A%09-moz-transform%3A%20rotate(300deg)%3B%0A%09-ms-transform%3A%20rotate(300deg)%3B%0A%09-o-transform%3A%20rotate(300deg)%3B%0A%7D%0A.ell%20%7B%0A%09width%3A%20100px%3B%0A%20%09height%3A%2060px%3B%0A%09background%3A%20%23e51d8a%3B%0A%09-moz-border-radius%3A%2050px%20%2F%2030px%3B%0A%09-webkit-border-radius%3A%2050px%20%2F%2030px%3B%0A%09border-radius%3A%2050px%20%2F%2030px%3B%20%7D%0A%7D%0A.eli%3Aafter%7B%0A%09content%20%3A%20%22%22%3B%0A%7D%0A.cil%7B%0A%09position%3Arelative%3B%0A%09top%3A%20-30px%3B%0A%09width%3A%20100px%3B%0A%20%09height%3A%20150px%3B%0A%09background-color%3A%23e51d8a%3B%09%0A%7D%0A.arr%20%7B%0A%09position%3Arelative%3B%0A%09width%3A%200%3B%0A%09height%3A%200%3B%0A%09top%3A%20-30px%3B%0A%09border-left%3A%2050px%20solid%20transparent%3B%0A%09border-right%3A%2050px%20solid%20transparent%3B%0A%09border-top%3A%2035px%20solid%20%23e51d8a%3B%0A%7D&l=#preview',
				'Space invaders shadow based' : 'console/index?fullscreen=true&h=%3Cp%3EDirectly%20from%20the%20fabulous%20%3Ca%20href%3D%22http%3A%2F%2Fcss-tricks.com%2Fexamples%2FShapesOfCSS%2F%22%20target%3D%22_blank%22%3Ecss-tricks.com%3C%2Fa%3E%20just%20to%20test%20this%20console.%3C%2Fp%3E%0A%0A%3Cdiv%20id%3D%22space-invader%22%3E%3C%2Fdiv%3E&j=%2F*%20no%20javascript%20content%20*%2F&c=body%7B%0A%09padding%3A30px%3B%0A%09font-family%3Averdana%2C%20sans%0A%7D%0Ap%7B%0A%09padding%3A10px%200px%0A%7D%0A%23space-invader%7B%0A%09position%3Aabsolute%3B%0A%09left%3A50px%3B%0A%09top%3A100px%3B%0A%09box-shadow%3A%200%200%200%201em%20red%2C%200%201em%200%201em%20red%2C%20-2.5em%201.5em%200%20.5em%20red%2C%202.5em%201.5em%200%20.5em%20red%2C%20-3em%20-3em%200%200%20red%2C%203em%20-3em%200%200%20red%2C%20-2em%20-2em%200%200%20red%2C%202em%20-2em%200%200%20red%2C%20-3em%20-1em%200%200%20red%2C%20-2em%20-1em%200%200%20red%2C%202em%20-1em%200%200%20red%2C%203em%20-1em%200%200%20red%2C%20-4em%200%200%200%20red%2C%20-3em%200%200%200%20red%2C%203em%200%200%200%20red%2C%204em%200%200%200%20red%2C%20-5em%201em%200%200%20red%2C%20-4em%201em%200%200%20red%2C%204em%201em%200%200%20red%2C%205em%201em%200%200%20red%2C%20-5em%202em%200%200%20red%2C%205em%202em%200%200%20red%2C%20-5em%203em%200%200%20red%2C%20-3em%203em%200%200%20red%2C%203em%203em%200%200%20red%2C%205em%203em%200%200%20red%2C%20-2em%204em%200%200%20red%2C%20-1em%204em%200%200%20red%2C%201em%204em%200%200%20red%2C%202em%204em%200%200%20red%3B%0A%09background%3A%20red%3B%0A%09width%3A%201em%3B%0A%09height%3A%201em%3B%0A%09overflow%3A%20hidden%3B%0A%09margin%3A%2050px%200%2070px%2065px%3B%0A%7D%20&l=#preview',
				'Shadow based experiment' : 'console/index?fullscreen=true&h=%3Cp%3EDirectly%20from%20the%20fabulous%20%3Ca%20href%3D%22http%3A%2F%2Fcss-tricks.com%2Fexamples%2FShapesOfCSS%2F%22%20target%3D%22_blank%22%3Ecss-tricks.com%3C%2Fa%3E%20just%20to%20test%20this%20console.%3C%2Fp%3E%0A%0A%3Cdiv%20id%3D%22space-invader%22%3E%3C%2Fdiv%3E&j=%2F*%20no%20javascript%20content%20*%2F%0Avar%20el%20%3D%20JMVC.dom.find(%27%23space-invader%27)%2C%0A%09tpl%20%3D%20%27%25left%25px%20%25top%25px%200%201px%20red%27%2C%0A%09els%20%3D%20%5B%5D%2C%0A%09versus%20%3D%201%2C%0A%09curx%20%3D%200%2C%20cury%20%3D%200%3B%0A%0Awindow.setInterval(function%20()%7B%0A%09if%20(cury%20%3D%3D%20100)%20versus%20%3D%20-1%3B%0A%09if%20(cury%20%3D%3D%200)%20versus%20%3D%201%0A%09els.push(JMVC.string.replaceAll(tpl%2C%20%7Bleft%3A%20curx%2C%20top%3Acury%7D))%3B%0A%09el.style.boxShadow%20%3D%20els.join(%27%2C%27)%3B%09%20%0A%09cury%20%3D%20cury%20%2B%20versus%3B%0A%09curx%2B%2B%3B%0A%7D%2C100)%3B%0A&c=body%7B%0A%09padding%3A30px%3B%0A%09font-family%3Averdana%2C%20sans%0A%7D%0Ap%7B%0A%09padding%3A10px%200px%0A%7D%0A%23space-invader%7B%0A%09position%3Aabsolute%3B%0A%09left%3A50px%3B%0A%09top%3A100px%3B%0A%09box-shadow%3A%200px%200px%200%201px%20red%3B%0A%09width%3A%200em%3B%0A%09height%3A%200em%3B%0A%09overflow%3A%20hidden%3B%0A%09margin%3A%2050px%200%2070px%2065px%3B%0A%7D%20&l=#preview',
				'ShadowMatrix function experiment' : 'demo/shadow?size=3',
				'ShadowMatrix function experiment animation' : 'demo/animation?size=5',
				'ShadowMatrix create matrix from image' : 'demo/shadowJMVC',
				'* strict': 'test_strict',
				'* obj/bucket': 'test_bucket',
				'* obj/deque': 'test_deque',
				'* obj/date': 'test_date',
				'* lib/array': 'test_array',
				'* JMVC.util.findRich': 'test_arrayOp',
				'* lib/crypt': 'test_crypt',
				'* FizzBuzz perf': 'test_fizzbuzz',
				'* Leap year': 'test_leap'
			},
			tpl = '<li><a href="%base_url%/%path%">$index$ %label%</a></li>',
			out = '',
			i;

		for (i in links) {
			out += JMVC.string.replaceAll(tpl, {
				'base_url': bu,
				'path': links[i],
				'label': i
			});
		}
		content += '<ul>' + out + '</ul>';
		content += '<br /><b>* real test</b>';

		//JMVC.head.addStyle(JMVC.object.toCss(style), true, true);
		JMVC.head.addStyle('/media/css/demo.css');

		v.set({
			id: 'content',
			style: 'font-family:Verdana, sans-serif; font-size:12px;margin-bottom:50px',
			content: content,
			index: '&#9826;'
		});

		JMVC.debug('0')
		
		v.render(function() {
			JMVC.debug('render view')
			JMVC.head.title('- Foo me a sample -');
			/*
			var fromtop = 20;
			JMVC.affix.add({
				html:'<strong>Affix</strong><p>Try o scroll, this will stop scrolling at ' + fromtop + 'px from top</p>',
				init : 68,
				min : fromtop,
				'class':'round8 roundleft',
				style:'z-index:60;height:300px; width:300px; padding:10px; right:30px; border-right:8px solid #888; background-color:gainsboro;',
				where : '#content'
			});
			*/
		});
		JMVC.debug('0+');
	};





	this.action_demo = function () {
		JMVC.require(
			//'core/lib/grind/grind'
			'core/lib/widgzard/widgzard'
		);

		function makeList (title, links) {
			var cnt = [{
					style:{padding : '10px 0px'},
					html : '<strong>' + title + '</strong>'
				}],
				inner = {tag : 'ul', content : []},
				k;

			for (k in links) {
				inner.content.push({
					tag : 'li',
					content : [{
						tag : 'a',
						html : k,
						attrs : {href : links[k]}
					}]
				});
			}
			cnt.push(inner);
			return {
				content : cnt,
				style : {
					backgroundColor : 'yellow',
					margin : '5px',
					'float' : 'left'
				},
				attrs : {
					'class' : 'round8 pad5 respfixed'
				}
			};
		}

		function getConfig () {
			return {
				cb : function(){
					console.debug('done');
				},
				target : JMVC.dom.find('#extralogo'),
				content : [{

					style : {margin : '0 auto', width:'800px'},
					content : [
						makeList('Image', {
							'Image filters' : '/demo/img',
							'Canvas Editor (WIP)' : '/canvaseditor',
							'Canvas editor (old layout)' : '/canvaseditor?v=1'
						}),
						makeList('Google', {
							'Streetview panorama animator' : '/?map=true',
							'Google' : '/google.jmvc',
							'Google flash' : '/google.jmvc?flash',
							'Google aberration' : '/google.jmvc?aberrate'
						}),
						makeList('JMVC', {
							'Model' : '/demo/model',
							'Controller' : '/demo/controller',
							'View' : '/demo/view'
						}),
						makeList('css3 exp', {
							'6 Divs Cube css3 tranformations ' : '/demo/divrot.js'
						}),
						'clearer',
						makeList('Console', {
							'Console' : '/console',
							'Console atom (fullscreen)' : '/console/index?fullscreen=true&h=%3Cdiv%20class%3D%22container%22%3E%0A%09%3Cdiv%20class%3D%22wrap%22%3E%0A%09%09%3Cdiv%20class%3D%22circle%20horizontal%20c1%22%3E%0A%09%09%09%3Cdiv%20class%3D%22wrap-electron%22%3E%0A%09%09%09%09%3Cdiv%20class%3D%22circle%20electron%22%3E%3C%2Fdiv%3E%0A%09%09%09%3C%2Fdiv%3E%0A%09%09%3C%2Fdiv%3E%0A%09%09%3Cdiv%20class%3D%22circle%20vertical%20c1%22%3E%0A%09%09%09%3Cdiv%20class%3D%22wrap-electron%22%3E%0A%09%09%09%09%3Cdiv%20class%3D%22circle%20electron%22%3E%3C%2Fdiv%3E%0A%09%09%09%3C%2Fdiv%3E%0A%09%09%3C%2Fdiv%3E%0A%09%3C%2Fdiv%3E%0A%09%3Cdiv%20class%3D%22wrap%20r%22%3E%0A%09%09%3Cdiv%20class%3D%22circle%20horizontal%20c2%22%3E%0A%09%09%09%3Cdiv%20class%3D%22wrap-electron%22%3E%0A%09%09%09%09%3Cdiv%20class%3D%22circle%20electron%22%3E%3C%2Fdiv%3E%0A%09%09%09%3C%2Fdiv%3E%0A%09%09%3C%2Fdiv%3E%0A%09%09%3Cdiv%20class%3D%22circle%20vertical%20c2%22%3E%0A%09%09%09%3Cdiv%20class%3D%22wrap-electron%22%3E%0A%09%09%09%09%3Cdiv%20class%3D%22circle%20electron%22%3E%3C%2Fdiv%3E%09%0A%09%09%09%3C%2Fdiv%3E%0A%09%09%3C%2Fdiv%3E%0A%09%09%3Cdiv%20class%3D%22circle%20center%22%3E%3C%2Fdiv%3E%0A%09%3C%2Fdiv%3E%0A%3C%2Fdiv%3E%0A%0A%0A%0A%0A%0A%0A%0A&j=%2F*%20no%20javascript%20content%20*%2F&c=body%20%7B%0A%20%20background%3A%20%23222%3B%0A%7D%0A.container%20%7B%0A%20%20position%3A%20relative%3B%0A%20%20margin%3A%20auto%3B%0A%20%20width%3A%20250px%3B%0A%7D%0A.wrap%2C%0A.circle%20%7B%0A%20%20-webkit-transition%3A%20-webkit-transform%20500ms%20linear%3B%0A%20%20-webkit-transform-style%3A%20preserve-3d%3B%0A%20%20-moz-transition%3A%20-moz-transform%20500ms%20linear%3B%0A%20%20-moz-transform-style%3A%20preserve-3d%3B%0A%20%20width%3A%20250px%3B%0A%20%20height%3A%20250px%3B%0A%20%20margin%3A%20auto%3B%0A%20%20margin-top%3A%2050px%3B%0A%20%20position%3A%20absolute%3B%0A%7D%0A.circle%20%7B%0A%20%20position%3A%20absolute%3B%0A%20%20border%3A%203px%20solid%20%23aaaaaa%3B%0A%20%20border-radius%3A%20250px%3B%0A%20%20margin%3A%20auto%3B%0A%7D%0A.circle.c2%2C%0A.circle.center%20%7B%0A%20%20border%3A%202px%20solid%20%23666666%3B%0A%20%20width%3A%20140px%3B%0A%20%20height%3A%20140px%3B%0A%20%20top%3A%2055px%3B%0A%20%20left%3A%2055px%3B%0A%7D%0A.circle.center%20%7B%0A%20%20background%3A%20%23ffffff%3B%0A%20%20width%3A%2030px%3B%0A%20%20height%3A%2030px%3B%0A%20%20top%3A%20110px%3B%0A%20%20left%3A%20110px%3B%0A%20%20box-shadow%3A%200%200%205px%20%23fff%3B%0A%7D%0A.wrap-electron%20%7B%0A%20%20border%3A%200px%20solid%20%20%23fff%3B%0A%20%20position%3A%20absolute%3B%0A%20%20width%3A%20100%25%3B%0A%20%20height%3A%20100%25%3B%0A%20%20-webkit-animation%3A%20electron%203s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20electron%203s%20linear%20infinite%3B%0A%7D%0A.electron%20%7B%0A%20%20width%3A%2012px%3B%0A%20%20height%3A%2012px%3B%0A%20%20background%3A%20%23aaaaaa%3B%0A%20%20left%3A%2050%25%3B%0A%20%20margin-left%3A%20-8px%3B%0A%20%20border%3A%20none%3B%0A%20%20top%3A%20-7px%3B%0A%20%20-webkit-transform-origin%3A%2050%25%2050%25%3B%0A%7D%0A.c2%20.wrap-electron%20%7B%0A%20%20-webkit-animation%3A%20electron%202s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20electron%202s%20linear%20infinite%3B%0A%7D%0A.c2%20.electron%20%7B%0A%20%20top%3A%20-6px%3B%0A%7D%0A.wrap%20%7B%0A%20%20border%3A%200px%20solid%20%23aaaaaa%3B%0A%20%20-webkit-animation%3A%20lateral%2015s%20ease-in-out%20infinite%3B%0A%20%20-moz-animation%3A%20lateral%2015s%20ease-in-out%20infinite%3B%0A%7D%0A.wrap.r%20%7B%0A%20%20-webkit-animation%3A%20lateralRevert%208s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20lateralRevert%208s%20linear%20infinite%3B%0A%7D%0A.vertical%20%7B%0A%20%20-webkit-animation%3A%20vertical%208s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20vertical%208s%20linear%20infinite%3B%0A%7D%0A.horizontal%20%7B%0A%20%20-webkit-animation%3A%20horizontalRevert%206s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20horizontalRevert%206s%20linear%20infinite%3B%0A%7D%0A.vertical.c2%20%7B%0A%20%20-webkit-animation%3A%20vertical%204s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20vertical%204s%20linear%20infinite%3B%0A%7D%0A.horizontal.c2%20%7B%0A%20%20-webkit-animation%3A%20horizontalRevert%203s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20horizontalRevert%203s%20linear%20infinite%3B%0A%7D%0A%40-webkit-keyframes%20electron%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20horizontal%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateY(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateY(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20horizontalRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateY(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateY(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20vertical%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateX(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateX(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20verticalRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateX(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateX(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20lateral%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20lateralRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20electron%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20horizontal%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateY(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateY(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20horizontalRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateY(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateY(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20vertical%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateX(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateX(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20verticalRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateX(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateX(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20lateral%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20lateralRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%7D%0A&l=#preview',
							'Onecodepen (fs)' : '/console/index?fullscreen=true&h=%3Ccanvas%20id%3D%22c%22%3E%3C%2Fcanvas%3E&j=var%20a%20%3D%20document.getElementsByTagName(%27canvas%27)%5B0%5D%3B%0Avar%20b%20%3D%20document.body%3B%0A%0Avar%20requestAnimationFrame%20%3D%0A%09window.requestAnimationFrame%20%7C%7C%0A%20%20%20%20window.mozRequestAnimationFrame%20%7C%7C%0A%20%20%20%20window.webkitRequestAnimationFrame%20%7C%7C%0A%20%20%20%20window.msRequestAnimationFrame%20%7C%7C%0A%20%20%20%20function(f)%7B%20setTimeout(f%2C%201000%2F30)%3B%20%7D%3B%0A%0Aa.style.width%20%3D%20(a.width%20%3D%20innerWidth)%20%2B%20%27px%27%3B%0Aa.style.height%20%3D%20(a.height%20%3D%20innerHeight)%20%2B%20%27px%27%3B%0A%0Avar%20c%20%3D%20a.getContext(%272d%27)%3B%0A%0Aif%20(typeof%20raf%20!%3D%3D%20%27undefined%27)%20cancelAnimationFrame(raf)%3B%0A%0Asw%20%3D%20a.width%3B%0Ash%20%3D%20a.height%3B%0A%0Afunction%20drawGlypy(angle%2C%20distance)%20%7B%0A%0A%20%20%20%20var%20rings%20%3D%2019%3B%0A%20%20%20%20for%20(%20var%20j%20%3D%200%3B%20j%20%3C%20rings%3B%20j%2B%2B%20)%20%7B%0A%20%20%20%20%20%20base%20%3D%20Math.pow(1.5%2C%20(j%20%2B%201)%20)%0A%20%20%20%20%20%20d%20%3D%20base%20%2B%20distance%20*%20base%3B%0A%20%20%20%20%20%20x%20%3D%20sw%20%2F%202%20%2B%20Math.cos(angle)%20*%20d%3B%0A%20%20%20%20%20%20y%20%3D%20sh%20%2F%202%20%2B%20Math.sin(angle)%20*%20d%3B%0A%20%20%20%20%20%20size%20%3D%20d%20%2F%2020%0A%20%20%20%20%20%20%0A%20%20%20%20%20%20c.fillStyle%20%3D%20%22hsla(%22%20%2B%20~~(j%20%2F%20rings%20*%20300)%20%2B%20%22%2C100%25%2C%2030%25%2C%201)%22%0A%20%20%20%20%20%20c.beginPath()%3B%0A%20%20%20%20%20%20c.arc(x%2C%20y%2C%20size%20*%203%2C%200%2C%202%20*%20Math.PI%2C%20false)%3B%0A%20%20%20%20%20%20c.fill()%3B%0A%20%20%20%20%7D%0A%7D%0A%0Ap%20%3D%200%3B%0A%0Afunction%20r()%20%7B%0A%09a.width%20%3D%20a.width%3B%0A%09p%2B%2B%3B%0A%09dots%20%3D%2020%3B%0A%09tunnel%20%3D%200%3B%0A%0A%09for%20(%20var%20i%20%3D%200%3B%20i%20%3C%20dots%3B%20i%2B%2B%20)%20%7B%0A%09%20%20%20%20angle%20%3D%20p%20%2F%20100%20%2B%20i%20%2F%20dots%20*%20Math.PI%20*%202%3B%0A%09%09distance%20%3D%20tunnel%20%2B%20%20(Math.sin(3%20*%20i%20%2F%20dots%20*%20Math.PI%20*%202)%20%2B%201%20%2B%20Math.cos(p%20%2F%2020%20%2B%202%20*%20i%20%2F%20dots%20*%20Math.PI%20*%202)%20%2B%201)%20%2F%204%3B%0A%09%09drawGlypy(angle%2C%20distance)%3B%0A%09%7D%0A%0A%20%09%2F%2F%20GLOB%0A%20%09window.raf%20%3D%20requestAnimationFrame(r)%3B%0A%7D%0Ar()%3B%0A&c=html%2C%20body%20%7B%0A%09margin%3A%200%3B%0A%09padding%3A%200%3B%0A%09border%3A%200%3B%0A%09background-color%3Ablack%0A%7D%0A%23c%20%7B%20display%3A%20block%3B%20%7D&l=#preview',
							'Console cs' : '/demo/cs/'
						}),
						makeList('Widget', {
							'Some widgets' : '/test_widget',
							'modal' : 'test_modal'
						}),
						makeList('Games', {
							'Wcave game' : '/wcave.jmvc'
						}),
						makeList('Test', {
							'strict' : '/test_strict',
							'obj/bucket' : '/test_bucket',
							'obj/deque' : '/test_deque',
							'obj/date' : '/test_date',
							'lib/array' : '/test_array',
							'findRich' : '/test_arrayOp',
							'Key' : '/test_key',
							'lib/crypt' : '/test_crypt',
							'FizzBuzz perf' : '/test_fizzbuzz'
						}),
						makeList('Exp', {
						'cubic': '/cubic'
						}),
						'clearer'
					]
				}]
			};
		};
		JMVC.getView('vacuum')
			.set({
				'style' : 'font-family:verdana;',
				'id' : 'extralogo'
			}).render(function () {
				JMVC.css.style(JMVC.dom.body(), 'backgroundColor', '#444');
				JMVC.core.widgzard.render(getConfig(), true); //, function (){console.debug('end'); }, 'b960');
			});

	};





	/* test a VIEW*/
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
		*/
		p1.set({
			'cognome': 'Ghedina',
			'n': 1
		}); /*.set('cognome','Spaceman',true); */
		p2.set('cognome', 'Ghedi').set('n', 2);
		p3.set('cognome', 'Ghe').set('n', 3);

		/*	console.debug(_p1); */
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

	this.action_controller2 = function () {
		this.set('nome', 'Federico2');
		alert(this.get('nome'));
	};

	/* just to celebrate a better time */
	this.action_flag = function(p) {

		/* color extension is needed */
		JMVC.require('core/color/color');

		var nation = p.nation || 'it',
			nations = {
				it: {
					w: 9,
					h: 6,
					strat: function(i) {
						return i % this.w < 3 ? 'green' : i % this.w < 6 ? 'white' : 'red';
					}
				},
				ch: {
					w: 7,
					h: 5,
					strat: function(i) {
						return (JMVC.array.find([10, 16, 17, 18, 24], i) >= 0) ? 'white' : 'red';
					}
				},
				ndl: {
					w: 9,
					h: 6,
					strat: function(i) {
						return i < this.w * 2 ? 'red' : i < this.w * 4 ? 'white' : 'blue';
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
			box_size = 1,
			factor = 0.8,
			top_fact = 80,
			els_top = [],
			i = 0,
			w = opt.w,
			h = opt.h,
			l = w * h,
			recall = function(ll) {
				for (var g = 0; g < ll; g++) {
					els_top[g] = JMVC.util.rand(10, top_fact - 5);
				}
			},
			back = false;

		JMVC.head.addStyle(JMVC.object.toCss(style), true, true);

		JMVC.head.title(nation.toUpperCase() + ' beat');

		JMVC.css.style(JMVC.WD.body, 'backgroundColor', 'black');

		recall(l);

		back = function(s) {

			JMVC.head.title(nation.toUpperCase() + ' beat');

			opt = nations[nation];
			w = opt.w;
			h = opt.h;
			l = w * h;

			var basesize = s || box_size,
				f = document.getElementById('flag'),
				j,
				fact,
				opac = Math.sqrt(basesize / (box_size * top_fact)),
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
					'background-color': (basesize > els_top[i]) ? opt.strat(i) : JMVC.core.color.getRandomColor(true)
				});
				if (j % w === 0) {
					tmp = JMVC.dom.clearer();
					JMVC.dom.append(f, tmp);
				}
			}

			if (basesize > box_size * top_fact) {
				mode = 'shrink';
				recall(l);
			}
			if (basesize < box_size) {
				mode = 'grow';
				recall(l);
			}
			fact = (mode === 'grow') ? factor : -factor;

			window.setTimeout(
				function() {
					f.innerHTML = '';
					back(basesize + fact);
				},
				25
			);
		};

		v.render({
			cback: function() {
				for (var j in nations) {

					var os = {},
						tag;
					if (j === nation) {
						os['class'] = 'active';
					}
					tag = JMVC.dom.create('span', os, j);

					(function(y, tg) {
						JMVC.events.on(tg, 'click', function() {
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

	this.action_direct = function() {
		JMVC.head.title('Crypto image');

		JMVC.head.addStyle(JMVC.object.toCss({
			'body': {
				'background-color': 'black'
			}
		}), true, true);

		JMVC.require('core/lib/crypt/crypt');

		this.render(
			'<div style="margin:50px"><span style="color:green;cursor:pointer;font-family:Verdana, sans-serif" id="see">reveal the image</span></div>',
			function() {
				JMVC.security.seed = 213123123;
				/*
				original base64 image data (my linkedin profile image)
				imgdata = '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'
				*/

				// this could be obtained(with seed 213123123) from imgdata
				// executing cryp = JMVC.security.crypt(imgdata, 'colcazzo'),
				// var cryp = 'ÅÛĉÅÈîîóéčùàæĔîä×ĉà×Õþîä×ããÅÆĤïæ×ãôÚÖîþç×ęôÛÖîþèØóôÝÖĤĤëØęĂÞÖĤåíÙęĊãÙþåõÛĊäæÙÿîöÜĊĖîÙĥþăÜôàèÛðòûÝĊĖúÜĥåĈÛĚĂÿÞðöćàäĖûÜĥäÑÈęáÚÕþĂèØóĂÝÖĤáëÙãÓûÚïò÷ÞĊÓûÜĕáćÞĊÓûÜĕáćÞĊÓûÜĕáćÞĊÓûÜĕáćÞĊÓûÜĕáćÞĊÓûÜĕáćÞĊÓûÜĕáćÞĊÓûÜĕáćÞĊÖÅċîîôÙãâÅÕùåæ×õè×Õĕòä×ĚäØÃåþãÞęà×ÕþĂä×óäØÕþòã×ãà×Õîîã×ãäÙÕĤþèØĉĂß×þĜîÅÚð×Ĉÿîã×ĉäÚÕĤöç×ęôÜÖîþã×ãåÏÕþöæ×ãðèÖÿöĊã÷äÝÙÞóĊØěéĎÚñøäāăäßÝÝøĚčôõéÄēîčãÔéďûĔĘíÜĊĂïÛÿĜĎàċĂąßĀĜÒäöøÉãñĘØçÒñÜæĘđëé÷ďêêóăùìÓćðëĚûčðùùĄõôęēùÕñÇøěđÖûúĐÚüöĄéþÖĈàýĝøöĂìöíĀâĖüăēêĀĄøĄďĆØĈĆąğøĜĊîöÈĈäĖ×ċĕëÚČúąéĎÚĉàčġùöÇð÷íÅæėüÈėçÿÈØāĎËėąąÊĒğĚÎĘïÆÍēďÕÁòčÌÃåþãÞęä×ÕĤòä×óäØÕþòä×óà×Õîîã×ãäÙÕĤþèØĉĂß×þĜîÅÚð×Ĉÿòã×ĉäÙÖîþæØãĂÜÖîþã×óéÉÕîòå×ĚäÛÖĀòĚØĊéØéþđĊùôìÿáĜòëÜçêèăďõäÙõìĐéģîøïĐëè×ĕĆčäñäĂÌÿĐûÝôĎăÞĦĔĒáČôÈâħĔ×åčíÛæĂćêéçċáéÞÿøìĎăïëăĝČðéõăîßĕĒ÷ĐíÆøąćÕûêċÌûĜüçþûĀÞýöĚíāĒîëĀćĎúăìČ÷ăĞüčĆăĀĄąøĚēĉĔîÆĈďĎÕċîČÌċĠýçĎąāÞčúěíÆĖïëÅđďúÈðč÷ÈĢýčËćāĄÊüěēÎĘïÆÍēďÕÁòčÌÃæĜãÚãìØÕîöô×Ěä×äĤñØČĚĈýÈĝúÒÆďĒýÚüøöæĘĈāÞôú×ÞêĕîâØ÷òÜĆċąĈâñĄéÑîÎāĀĤĚýēîĎÃýĖĊċęÏĈĂĀòĔýčĒ×ÕĐõìÌĈôÇāąüĘ÷òāØÃûģÖĂïĀĂāôĐďČëëĀČĕđĚÉÍďďÞùģõÍąÖùĂäĜæðäėÅĉėõÖÇĜċÅúħàøďÚÏĈĂĒà÷úēęùČßýćëÚõ÷ãåäôâąĂâÛ÷ôąÚíĆÞ¿ġąðæÓđêàØĎùåÔĔāøĜĠĎĎČæØÄãěØìÚÕà÷ĦùĐËČęÇÉãÞăĊĆóċíăĎñáøĎčÃĤïÙØØÏċ÷ùõÒþéĘċûđôøÆòñþčñāĕïØÔÅÙăáìðćêÏìĠáôÞĄÒÆýÿĝÛÆüÖÇăĄēČĈùÓĆÛĆàÙĄąìĄ÷ĜďĐÈäåìĎĕĆÛćðàÏÊåäÒæÖĊØýöæöĊåðÜČâĘëĐčÎéĈėăĈÞùĊíĀĘęěÞîÊðÍÞîñùÍØæāðĥÓĆëçûāôÿôÇòÔÎêâÿēîĚëċÛ÷óĐøíåÏìýûąÍćÊäâĐĢĎïéÖÎĈāßúĀèòËüĆæěĄĘÖ÷ÙćĒøÜêÊÆÅćûÙÊėÏíÅàïĔÈïĊúåüāúþðėćêâđçûĈăĐäæąðãïĐûĉāĀ×ăęÏæëğÜÖāØùÛáĄåąĉĚÕùØóĆñąĈäĀéõĦĖĊăĎýäÿĖąăėá÷æñħĐÞĘððÚõēĔéėîËÄóæÖČÓĘÊ¿ăğĕąò××îğóėúóĔËĂ÷ęėðúéÌÉĐÞäßćîĊêßĆ×ËðàĈÿĥĘěûôĊÆĄùîüćėæÁößĝÙéã×ëÕāïÔåñĖćêþĝêà×ĐććĜîĚÍÓéÞĀĢæãÞÒ×÷õēÝèÝöõêêďġĄæöÔĈĀĖĢëÇěăĎċïĄÓÍçĎć¿÷ûüĊĖäÆÉäĞÖøđãĊìÞûćØØÎćéĢĜúÆÛÔåÉđâéà×ÖÚ¿ęďòĀČėØäĞÞÚčîøþÖïăøåøÊĊ÷ĞãĕùĐéĈÞĢâóþĄïëÍÿħõÜÍĂāÉĝėÚÛÒĖĄÝħĂĉéĎĒá÷ĐĚĎÞěĆãĎĆæēýÚĖïČĚĜĒàĆęÛÙæøçØûĄøÜîãĈíč×ËČė÷ìåòöćăüĄØúēąċÉâûãÜĒëĂĈãâûāĈöĊąßĢÖâėĖíĎĢõëïðċíČÝõĘîñė×ÌØØíĊóìïöĕÿĉÏãĀÛ×ùûĜÜ×ôÍČïġÍÆÖÒÚăĎĔíĄÒíøÿĂĂøÈđĊíáïĥĉäĉØèçĦĎćØĐĉÿāúĤéëÛĒÆÄĔæēÉöďÊąûġñĐóêĎýåėĐàĒâíĎĤāùďĆîåßėďöĀČå×ëúĜĕĎêôÆÄĠĐÚāøĐĄèßöĒĀăĂÉèóîùãÒìùøēĝóíëîçßģěöÉĚÏÅçĚġĒÍĉăÚåóĖčíìďÉāûėãĐøĉÍØöñÒäãĒðÖÝĄĉâêÏÅ¿ï÷ÛćÚØÁßĄĜúÎèĕÝąĀÿÔĉïĆáÿğ÷ĎËòĐåċğģĄċøøøëĄăÕìèñéČćėĉâÙČČĂėĥøĈèÒćĉĞĀÕÜÕĂäáĐĘìĄđĐÏåïăĜïëĆÿûåÝĕčÙçĈæ÷ďĖÆĚõÅçĤĜĖãç×ĄāĝćùëĆćëÕĆĂĖĉØØĉÅĂęĊúôĖČÚđòĚĀąăĉÅăĚČëĐÑąÕâĢúùéėÿăęñĕûĎāÆĈĝôÓäõĘĀéåÝãïØëßČĤîôÿĔôìĄöÿčąăÑßăöÞñúĉĐËÙĞĔČąïô×íåóĊàĕáÙĂğÿąčõëßÛđüäÇÖđĆíðĝëďäóÍ¿ßĀùďčèÏßïßïüõùČßĚðĔďĉÔčßãþíāčĀċüïĂČßĔęÁããúøÆÒóĉêøõ×íÑďîöØóĒÇėēáÖáñëÈåĕĆÃěûãÆùïáÜďÝĒČčÎËČăÝĔýÒČÆøñĥóãĒÊéäāåØÚåãÌêďßãĄÓĎÈÍĔïóØõåĉäĎĘÍĐĔÕìùøîąÆďÏúçĎîíçĖćÇČĚĘăÇãïßÊÞĜäØČčÎÊðĜĚý÷àðĄġïÑúđíąĉĒĚíÆĖĕÞÌãāûĊåàÍÇáĘÕĊĘøÁÙäĚõûòęäÇĦĜĒÌèĔąĎäĐĈĐĔÔÎàâęøçäēàËđøÛčÍíãèģáëúÓïÁąěÿċæúĐČÃĠÞćÜôĒæâĦñĜêĎĔðāÜĝÚĎÔāØ¿đāõãöĊ×Üýğøíę÷áÌĐĐøðÚēĉþæĎóďïéàĂüþíÚåėÁÌāãÚìëęþùñßðÚÕäðìĔåÒ×óĕÝçúîďăĔâčÉďğ÷ÌñđùÿÜĀĊĆčôùÈĜïåĆéÑçÕñĔÓãèèçÉïóøĐąêîÕïõõĈèĕúàĥęĊĀđĀØþäĐêĈčÐûêĖÞĘßéàĎþýÞēáëĖêîôæóûÕííÞğđčĊÔėÆÝĦñóäêČíĈĦĠďĆõìČÜ÷÷ěáØĕÊùąøĘå÷ëßÕáĥčā×éØÊĆãĆáÖĕĎßäĝćďðęċÖýĄĖüÖĂďĄýáēĀø÷č×ĢåæĊĐçäÕĢĝØć÷ėÇÖÜôďÜąõåċĦúÛÁÛìù÷Ăóçðêæ÷õðüÓæëÓĆĉàėòûĉáãíâĜÔýÛÕúĂîãÒÉëėý÷Ăîí×óĂÊÉĝøñûñìÿÿ÷ôĈ÷ĉáêÄħÿĚÌ÷ĆæĆÿěèÙãÖøÈěĄæÌČÓáĊĜĘîøÖċÛąĔđÛČìęÁÛĎØćøðöāĉîěąĄĔ÷ÆÇáĖÓÝĚÏĐç÷ďČëąČØĊàćóúúĘÙáðģĐáęĈìøćĆãÛíæàČĖĞčçĖĉíÕĄÝĊÉòĆ×Ø÷æØËÍ×ÇããĎüĄČÓÝùïĄĒĈĕÑçÙÜĕĜĐúíîêĥùčĈéćßÍĕÞēçìéĊêģăûĉě×ëýĎĤÍäĜâćÄĎāúÛîĔÍàõġØØČÐćĀ÷ñíÝÔĆãèěõĖçäÏäĆēĚûðČøÎøĞĀ×ċĒĎĂÇûĢĚÅùďæÖæĞêĂüùãöġġĄûēÕøĈĠąĈ×ÖÖëÕėėîČùđþÖåěäĈñąíĈÿĘñÇüìïąýăëĆÑíàêñėòçøöĉăùĘĜĈĘ÷×ÞâýúÿĉùćëÞÜēðûìàćáâęÚúĄÁ×æćĘĈØõøçæĘúïđÊîÉĐòÓĎçíĂøĀúûÊĄôêûæôóøù÷ÉĆĂÝøøěÐČÝĖĦĎÞøćÇÊÝĔîæĚðÆÄßęÓÞąêċÚĘæÑĈøąÊçĄćďÎöďãĆćòõåÔîÅÝĥÜñċďÊßÄĎąÕþØÑĂíĔúčý×çüâćěęĐÓãéÍñÞãĎúÔáčàćçùĄêåêâáĜÁðìÚÄÞĥÓÏĚôêøøĚčÝïÔÜåĘåĆĎóôãíåĂÒÁĘÔÆĆõüćÙăîćÈãĂãèĖĉĈÆĝúąÎêēêýĜæØ÷ćáýûÝîíÚÙÓĆ×þĒąÆćċ×Öõüí×ãØæąĎú×øďċßčÿĀçðØÏßØđØñāĊóčČĎĜåèďÖÞÝäēíÉÍíûçĄÿïìØÊËûĄøĉËòĕîöĒûĘÝðēÊûĠāĒÆąáÈÚĤĦěÞÍåþĂõåÚìęèâÜăġėÙãåËĎāęēďåØúČĖÿċíÙÊĂéĝöìïÓÎúČøĤêøĘöāČïĆæĀÒĐðéþĒĐÞØÐßÜûĀĒùěçÙÆĞğØÛÒÑæçĝĀÑăõòÞäĜüĉĈĒùØÛîôíĈøöÎĉáò÷áĘëÞûøüÛßçéąéýęÕéÙñÿĉĚęôðîñýÆðúÚËĔëÆĉüüñãõĘÅßÜĆøĉÔćĀĉöħêāãČăüě÷ăĎÖąÛÆćĜČĊòøúßĤėĒìÙàčċĖĠòùąÐÈùğàċíčĕĂçĞĒôčăĐèìĂāčÎċćýîĒĘę÷ĐæÌĈâøđæúăîåÿĥéïċñÏüĐæęáëãÝÆñĤôĀĔôčÝėďÛÉĉđÌùęðãýÚùăâēñđÿĄÔêĉĂåĈíėëċăäđĄÍõùÍøĦäĔãēĘüìđĘĈĐĔēæÜóĠîĄóçúùĖÿÙĉÑĈæÌĎĥĈþĔďÙÊĔÝèÉñďãéòĕĎØëÓøÛîý×ÅĒó×ÍýĘòàĜÕăăôæÑíĒçćÞħĔÚÎÛćçéú÷éêÓçäÝĐâĜăĉÔÅßĔĘčÎûÕëÕïâÖÞùČāùĝħõāćċßùęîäĐĐàÅ×ĕāĚÿĎàÌøøðæĄċĆØÚħĢØÆĘóĊçäĐçùÚÏÞþ÷ûå×ÚÑúîĝõåØöĊĄýğġÕøĔâÊā÷ýďÜąìæċõûăÈĊë÷ÇĂĜòÝôôÉþüßõÈçäÎÿćòìçČąĀþđãêÆđèĉ÷àùąþöÐćÝąßñÙćêĆìäĚñçēîÅâĂćĒÞÚĕàăïóÔÅęáìÝïîñÚÒåãÄĞĄăÙûÒÎÄýĚĊØčéăćĚÞóĐöåËÛáïęæćēĎâĤĔĚĄòēĀýĘĥĎĆĈäÆêĤĜäÿïùÞÜýóăûČÊàËĀßČúÕóüûòåĆ÷ÖđëËćĦõïęÑüåðĚăêĄ÷Û÷ěäÖÛüÕðĄîđöĈďĒĆĆęĘĈàĖďßÆÿĠĊÈÖęîäþàÒĊĔíË÷ĕħÙÇĕĖćâě÷ØÚèùÝĆßåñÎēù×çàāĐĆóáĈÆĄĝ×ÝÒïďùĚñùąĖÎĂÙĆġČàêíùìĝĖėċóóāØėûĄãîìùČåĠïĀĔðØÆôĠõÝúðČàĥěćďîĆúČě÷êÌøÏíûßĎÔĂĔîĉ÷þėċ÷öä÷ûĐĆãÞòÔËĆĚ÷×ðđØæćĜÝĖðĔĉüÝĐØùăĆĕÞÛāØðúĊøÙõõāÖßĒėÿæăâêĆčĊÅÅĝĜăÞïĂĊéďĆðæĄđý×ĜėĐäïøþÜýġõúãĂëË÷ĝñÏãâÚÌøðïăčÖÆăãÝãáäėéûĐáĚêìéÛþõħĕØöóúċöĢùāúçÇăîęûøôĊÇ×äúÔìùĎîÅðÞčÊçĘÅĂĀĝąÈÖÔÎÅēħđ×ÚĐÎäãßÛĂñćïÉîýĔîĖçþĉÜĠĖíĖõèÈÝĘæ×çĐÊØîÜĐîĜĄÎĉÞĠ×ËĔÏâÈĀĎÕåÑĈÙ×ĥđĘāĄďÁÚ÷òĕúÖÖĉĊĠąċáÙĆ××Ĝ÷åëãç×ÖâõÚÌęàÜîđĢòĈúĎæČĝġÓþÓĔÙÈĂĔćðĄĉßÍĤĀíÎÛÒïčñĖĉèæĂíĄåĠđĄäÕÿćĚãČÇćĘċÕġĤÚþċîäĄāĚėýøČàéúðôíĊĂÝÚğđøĂæĉ×Èöä÷ýôĘĀčħĘčĆîĂä¿óðěĐïĆðÉĝæÕø×êÉÜěĠÒ×æïÝÇýĂČØēéĈĉĦàĊëíãÉäûîĜÝìÐíåďùóÉëÒÞĀĖúãìûÎĉÆâġęÝėÔÉùĂėĐàĜĈċĄÝØÙþïøÙÕüþñûñêĆõĤđęìĉîùÍĎîíÏĊæČ×ñÝ×ćÓøáČěßÖÊĜčäêäýÛÈĔçßąäĝÑÉċÓËÉîîđ×ÛëÎàÜùĒÅäÓÌÅĜĢóãæĉĈëďáĄØúóĂéØęúîòíëáÿėěê÷ùĎþğħóĎÛÕĀàĆáĜçïĂêĎĖėëÌÒėçÄėďûÁöòéæąöÖÛüí××ĠàòÜïĊĄ×÷ĢìćðÓÍĂ÷ÜĆăēăÇÜüĦïæíāāéîĐĆÊÛ×êĆďćČþčèïîäÞĚëĐĈÈÊęėÔÁĆĆÅëĢĜÚéÍåðĆßáïþČĂÅüąúÕæĊâúãÿðÖÅåćÙáÞđćČęÔðàĝĢĘĈ÷ĆÎæĎĖäÅęàüèòÜùÿúĖÍáĕáČùãĄÇåûĜĕÿÑÒþÍĎĆĊàõãĎĂĚģõüĉë÷åāØëÈĎčÊùûēčĐúċčúĢĒòéėĖÁÙĘæÚæèØćĈĠâ×ø×ėÈČãÝĉðØčÎöáåØþĄăÎåÜÞðû÷ĕßé÷÷òîđêÏþØûčâČÖÚáÿåĒþíÎçþěØĖûïÒąÆĦđñĂìĈèùĕöûĈĚęÍêĞØúßÒøØċĐåĆåăÔďÄĢĤčÿčĉĀäûđäøØďÛýĞØãüĄíßîñĐăÚ×ÑÙçĞěÒËēêâċáĝñèëćåùĤãøąöĀĐ×Ēăû×ČđìâæĎ÷ããč×ÊåĂĉâčíāÝóðôĀąïëéħĂđçēčûÖÝãøÞäđáÜėüùÍøôÇäĂĕëÈèèàâîòöÊęĐĈÅýĀĖĈęØøúĎ÷êïÚéÚÛąĆČÇÙąÆĆĚĂďâĜćçøħâÑÙĘõČüğĜĘĄćçĊìęøĄÎùđØëĥÞĈÍÕØØåġþðÚęÎĄ¿ħÞòßÍēîÞñÞÛ÷ĒÕ×ăûĔĒË×ÎíĆďėÔËēĊëæúĒñáċùćÿĆĆØìéĖď÷ĒġïÙÕďÎùāģðîøøýĂøĞĈéđëëöĆĥ÷ċôð×ÈØãæäãäðÊĥėÚćûęúÌåĂďÎÛĉçÖ÷âðċĚÎÇíĝğùäčĖčÄþÜíāøÎíĂďØòûĉâØĈõÝÓčĈÒÙĂãğ÷ÚÍçĊÞĆåęĆĐÎúąåąęØċċÉ¿ĜĜóÞěćØöāąäÊÙ×ÿĉĠåðíÛÖĆââñî×Ö×ÌÉđďćâê÷ùÉĥÜùąÙâæèæüòăėÎÈĀęãąÜ÷ÎĎąæĜùĆêôæýõáĆÚēĐèĆĞòñÇãìüČĖĘëÁČąÞÛĖėúäæĊĉÄâĢëþėĆàËġėĒÁñêÁøđćĖðîĄÌĀĕěČ÷ñõÙåãòûßòďîÅïüùâĄĆåõáğÖþÍãïäòđėøďÐÈċĎĘĉÊĄçďčØĥÛÅćĐ÷ÙēýąćĕĕáÿòñĒëî÷êûïþćĂăöćÆđĥĒÇÖØĀùĤýäæéĂãþĐēĔÉĔíăýĂâòØēāÚæðÞÔÊäæÌăħýëèęÎØąôĒðĂ×áÍÄÞòûÞäĂÆüęãÓĄčõĉĀĠĆØðēóÍçħĘēþÍďäéáÝčĂďöÝÝûö×åãĎØÞýáøÌĊÓÛ¿ôûÓúÍ÷ûõåĄĖąñĎþÜØĠĄÌÍċ×þøØêÉĊĈÁÅãäøïëĘĉßěúĕÍæÔìÜæāúÆòĎÈĂĄßČÌçØĄÕðöđÊùĘíÊĠĐąāÓ÷ÆýħġĆåĖèÍëħġÒýĊðùßĜãÍËÛĀðÈÞÞç÷ĄÓãÅĒåîøĈëĉÉđģÓÈÚõéêĔÿ×ÍÚîÍÄàěĊăÕøĊÌãĔēçöÕìĊģåãĀúĉÅÕööÓčùæăČÿúĚØäęāÜĝąđÁĐÊàøûĢ÷ßĎċÎĉþĆĜċÖęÏßĀĆĜëüĀ÷ąĘĢäĎ÷ĒøČħùĘþčöèèÝøêùæÊìßĖÜĘåďêïÚĝÿĖĀèíÞåĚĝĆąíĂÇÛÿã÷×ïøëÇĝāÔĐöâáÕîòÑýí÷ùæħěðàÑêĀĄĘæØ×æĂüçĔĢÔåĖêêÿĘÝÒĄèâ×¿đòÔÁ÷ñĀĊØđñÎêÒáæØýÛÛďïÁĆĀæČåõąèąĝąąËøïâéěĘąăđÎÚÇýĖúêĊÑÎÍĐēĐéóĉÍâĀĂèçóðûßôîëďäęìØāĀĚĊûĘêĂâÿøĊõĄåÆĎĠôĐĘĉøċėĝÕÿćĘáèğâøÆĉÎùĎĜýďëÍÎćßåïÚêÍçÏèåüÕĀùČąċäĂĜÎčĐĀÉõõēÚúÏËąăâü÷ĆāüõđþėßÙĄâćąüåÉÒçù¿ĤğĜĀĚíÊčėÞñúĆíýÄïěĕÝñçċĆĦöĎùûÔáăüþĈüðòčäïğĖÎ×èÞ×ÞÝòýÙĖØÈĕåõãčĐçÛħĠČďĄĈùÙîėÑ×éñÇâđąđÁđÊ×ø÷å÷þîĕčÅĒóðÊÔęêáąĀðċĘÒÚÄõöÛêúēÈāħĄùąùôúČĝĠÚëÒæåäøöÍîÔĖåĂÝĜĕýñòÎÛØîÛÞÚíąØïòĄÿÙėÎÄåĤěùÍÒĆ¿óđĆÜçĄãĂãÞûíðôÏáðęì×ÖååċïôđÜćĀÅĈòãĜÏČ×ÝâĝĠĄāòĄéßĕĤćčñóÅÕòğÒûÖąďăėöÕçæéĈÉÝØòåĒòîāĢþùËĄèçÿĔćÑíčÑäÜöĄ÷čČćë÷åēĜĈöĈÇÞïõĖāČøĊþĔĔÓþÔĊĄčĔćêØãííåĒñØÁĖðãĈĤã×ćéċÉæęĠîċăéÙùĔďĒÁèăðăēĥðČëÑìöØðñË÷ĂøüåğĈÊøĖãÊĕĠ×ÞõĐÈçğâäßðâïÜÝēÖûÚõ÷âğĎĊâćąďÉĠĐĚďąçÎØàğüúïãåØĖģďÝÒĔĆíôñĚċøøú×ñĖėÌÚïüÙāĂÙà÷ĈċÜòãæĀ×ÎÎõĞáêĉäáÏßĆÿĜĐĚ÷àÊēåãÛæóøĂîěċûïØďĄĦøØÙęÐüèďåæÍðăąČÜĢčÊòÕÆìîġĐÝñêçÈâïĒËéîûĂĝĥöÚÓïÌÄÝîçĀìďÙæàã÷ÛÒÏāùġúæËċČïÿåâÍĊìĎÎčĥĒëĊðĊùþĎġěăĈęÜæĠĐÑÅĔĐĂ÷úăĎèÓáØêĤÿČÈ×ĐëÖæĠă÷ďëìÚýĂíåĐÏĈÚåđćâîçčĂĝàĐêãóîþÜãċ×êċĀÊěÝĒÉĊÎîÖĒĎêĆûēùäĒąøąčĘþûþĞÑáåò÷ÉďąÑ×ãòÁąàďúûđÒĄĂħýÕÌããÆÚĂĀČþĖëÇĊĂēçíēĕćëġāď÷øČæĀÿáÍéïĂāÖÿßĄÉĔďĆÝþåôëûèøÉāĢ÷ĄòĒčĎäđöíðĐîüØąóâĎùÛßĦøÙØåãÉÍĞàĄêĆëøûâñüÁ÷äĀûæúēÉĔÏæĈĂĠææďēĂĀĦĕ÷ËÍÖĉ÷ďġėûĆď×ÈãîûæĘöæąôğăĀÖéċíđĂÒćôÓýËĔĀÔËêÖĊċēáĆČûÊÊĆĝĤĉďåôÁåğÝąÏČĘìÝõõóùøĆûÞùĎÒÇöôøùàĚúúéĆÚÚăôÕĈÒèæÄĥĀóÞēčýÜĥģĒÞČæĐÃĐüîûÑĉîáġĠĚÁûçÇÜĞøØðčêÞĂğąďåċĄ×ĆďāďĀĘăäĂĎðüùïĉâċăħúüØùćÙĠģÍýÕĎÙÇĖùčĂĈĔĉäĄğö×ČÐćí÷ďõãĚĖÿąĄĆÍýèąáÜĖÜøþĔąÿĉäģëÈÕðØčĠąÍÌñØûÆēġäûëÑÆþĤßðäĖöïìôĜčąùæèĈėõÕĀÑèìÌåßãÌĕĄæèãăîÞûĕçĂĎØæāåđÊßĕîąĄèùÌÈħÞðíĄĄçÕäąØÊēñÈ×ăĦěĂĊĉÉČĂýěĉïčýÅĆĄäË×æûÇîïåĂÔáÌÙðĠÛëîĒĎÇòòÚÊäÕëÕĄĖČ×ÛíÉúĖĘøĐěîáûĀüûãðĊĈöĠėäàēėâßäĜåÌìĕĐûĠüÛÙãąÞáĂöñùĈòĊßÝÞù÷ðĆèÝĐØėùøĉÍüġâěá÷ïĀÚúñĘÏì×øõĝĎĄçüĘÎúāĎ×ďïąĐĆĠûïÎĆĀú÷öóėÆïëüÇęâèûìďáċýïē÷ñÕùÜâāĉùđċùõħħđ',
				// 
				// OR
				// executing cryp = JMVC.security.crypt(imgdata, 'unsafe'),
				var cryp = '×ÚĐÃÍÙéòùÿóâúĈçÖÚÿéâçåÚÚéâêÃËďêåçÕîÜêâ÷ÙÚďýæèÕêÞêòûÛÛďğêèċüàêĘÞßÜďēîëåÑëíĉëäÞêéõìüĐðíę÷õßêéóí×ÞñïĉĝøáĐàćëČüāòäïùãÚğĆîČÐÇÚĘèØÚéýçèåüßêĘÚÝÜÙÜĆìÖÞíðĉÚùáĀÜĆîüÍýðĉÚùáĀÜĆîüÍýðĉÚùáĀÜĆîüÍýðĉÚùáĀÜĆîüÍýðĉÚùáĀÜĆîüÍýðĉÚùáĀßÐĝÕÚêëâéÃÚäàåççâÙéĉëÖÚĐíãÕÌêÙðĘçÕÚéýãçåÞÚéòëÕÚÙéâçÕÚÙéâë×ÚďùçèûüáëòĕàÈÐùâĚæÚÙéĈëØÚďñæçċîÞêâ÷ÕÚÙîÚçåâÜéâ÷æÛêñĉóéÞßíÒìüÛđòęìØäÚēĂëÝâÈóęĝæïëØćçÿæÊòĚčûĄãîĉĉíàêėčðýüćóôĕÄçìāÔõØĄÎùÑøÚëăČêùéĉìþçüëïÉĐûýāçăĂøĀĂúßĔĒĉÇëÉČďĊÈþðęåĎÝðßĐÕďÞĂĈóõĒÞðïĔÖďîĆĉóċĖßðąĘ×ďĄĊĊóěĚàðÊĜØďÉĎċôåĞáñßĠÙĐÞĒČôõ×âñïÙÚĐîËčðĊÚ¿íĄÝĖČăÏýĚęÞĊéÈáćĈÇÄèĖ×ÕÌêÙðĘëÕÚďíãçåÞÚéòëÖÚééâçÕÚÙéâë×ÚďùçèûüáëòĕàÈÐùâĚæÞÙéĈë×ÛÙùåèÕüÞêâ÷ÕÚéòÔçÕÞÛéęëÙÛëíęèüãÚýòĊüüêõĊóăÞáîæñæĈúðãéçæĒýėçêòĆôóéüòăöðëĀÑêċúíæĈąòĚčĄäĂýÓôĎĀÍ÷ČôÙëíĂéùÙąãýÒøêïĄČúýêĉĂĂèüāóÊĐđćĂçÈČùĀÇþàĔ×čăèÝĐúćÜĂáĕìđĄèíĔûćìĆâĕĂĕąèăĘĂćĂĊãĕĒęĆèÈĜăćÇĎäĕ×ĝćéÝĠĄĈÜĒåĖìÖĈéíÙąĈìËæĖĂÚĉéăÝĆĈĂÏçĖĒÞĊéÈáćĈÇÄèĖ×ÕÍĈÙìâóÖÚÙñóçČÞÙøĘêÊďĐđĈÚĄæÈØĎęûßçóõöĊĂăòèóÉáàĞùô¿ãèîąĒăčÍìăùÃèÐĕôĝČĀĉ÷ęÕäĂĀĝĘÖĆćëíēčÿČÙéĄîÞÏþýÒēìèĎĉñĈÖÈæĞÕĒáúĄĕèĉāďáôċĞüýĐÛÌĖčãäĞôÝ÷ÐûĖØĕØóÚĠÐěþáÌÙěĒÃÿĒÛ÷ğÌÉĊĖĆÙéýĉĢĄĞÆéýýÙüõèÐßóò÷üäïëí÷ÝãďéÑĈñæøÒĘèåÃĉøõÆĎăČĐęĀđĂïãÖÊćÎþÙÜÞüđôďÛþēÉÝ××õčüüĖÿêúçó÷ĕċÈďêØèÊÉčċíîÄāßġĖčøàîØñøüĒÜüĔÿÊÎÇí÷ÚÞóýóÚþćÍêðăÙÄĂêĘÚÖîÐÉėøČþċïÜđííÌÏĖĄóĂüćĊďØÖßîĢĉÿÍĊæéÚÜÌÐÈøÕđÖĂááõĚ×êÞĠÖđÝēă×ôĚþïþðøđëąăĔĚîàÄòáÒçãüÃáñē×đÉĘêîùĆßúó×äÎÐþÖøąñĐôĖíÞßĆĊììÍñèöĄÝùÄæöĄěĀòßßÙĚèËðĒçùÉāñáĚĔĊÐùíûċêßàÓÑ×îçÏÜĖÖëÊËêēØáĄüùðúìāæĠĒüÉýÝčćĊĎéÑĀïóáĊýĝõùÉĆďØñýĆÈÌē×ĀÙæïàĄęČÏûìçÿãĈþíċûÜĒČĜĂĕûéêđĄēĉÛùúåĠĂáĎùûìÜÿĊûĖõÉÉÞáÕĜÅĒÌÓ÷ĘćĈèàâĀĆßčČòěÉćâĔĖĀìãÎÝĄ×Öâý÷ĕüÆòÍÝïçĆĄĐēĚċæĄÈĘíçîĊčïÌĈÆĉÏûâÞéÚìêÓõãĐĉþòĖÜãÍęĒęăÚĐßÒðÜąčáâîÄÑùĉćÖÚàìþõüöčúøõÛĆąāĝê×čýĐğãýÅÐÝėĒÑÞçòĜĕëÄÎÏęÕĈăÝČĀÒôùÛÎ×ĒûĉĈðØÚÛãÎüÝèðÉÐÜÓčĈäăĂĠãöąÊÐğíÿüÛÚþ÷õêÄČċĒÜćüĆòēðĉÎéĐăöéÒêĢôì¿üăÝđĐÌÞÈğďïĎîÿûčęßüûĕčîčĀåĢúßąĀÐğúĞāĈĈòąĠÙÞÑóæèíþúðâÜúðăàÖĞþãâ÷ñýąĈçÿ×ĊąÿčÝÖôÕßĈôčĚÊÎñēćýĈĊÊĝÕòĉĐïĢĖîÝòæĔøĞÄáĎĀðĞÕÑÃÓìĚåæñĊĉøûÒÙĉæéàçĒîÖûËđÚĜÌÖÈÌÜėĂčßćÈöăđéîîÚĐđëæÚĠĈôûÒêûĚćùÛĆĒĊēáĐßýÚęÄÉÿáĒÙèĉÌęïĚãēéóęďÌăĆòđéëēďüøğøèçóċĈèăĂîâýáĈċĠéûÄÉċċÙđêĊĆüÓïĄăùċÔúÚÚïõÑó÷ýþĘòýÝèéóėĔèÌĐØÐùāčĈßĈĊØêÞđČýÞĉËĕïĐÕēîĒØêÝÝÈöâęîÛÈÿĈòÜÉÇÓãðÍĊÐáÌñëĈðàçĜÛĊëúÓęáĀãēēðĀÎèęðĝĆďúĝ÷ÿöðïþÔüÚëëĠûĐûåÏĕėĔþđîĚçÙąĎĉûÔìÇüæõĄđÞććęÚ÷ÖïĒāêčýĀÐØĔĝËáĊúëĈĈÉĐþÐùċĈČõæÞĂĆĈĂøûøāíéúûĈČÎáĔ×éąĀČóĝĊßüíęĐ÷ýċÙ÷ēþîĆÚĐçÉĎðċèĞýĈĄìĔċĀûÈĜđíÅçëġċûÌÉÙā×òÝđďéóďĆîîĘêøÿĈùÚêĕÝÊçČĈėÉÞĉďċĕáîÙāÙìüãċêäĔĆëûğôòÝàü÷ã×ÈċĈāäĖÝĒÚüØÑÆìïġČïÍäÚÚîČçóĎóĎéĆĒÿÝĘñÊêãēČćĉāÚýċïĆēÃ÷×óêÉÈüĔüßáÍÿÐĖìûÃîđ×ĉčãêÕêÝËÛĞđÕĂçÙØøößáúØđĜÿÈÍĠ÷ÖĆĀÈĕÑĊØđéõđÑçéìà×ê×ÝÎþăØÕćÉėÓßûÛéêôìćéùēÌĠĆÏîčìç÷ÉąØąùõÚãùĕĎÅđąēĂ×ÕéáÞÒĕÖÛĂĖÙÜ×ĈĐďöçîĉČêÐĊăçćĝĆēßÉČĞéÞÊíñĜäçËÌÌēÔĚĊòÃíØēçþèĢïÙčĈĈÞçěăēÏċćĠĆÎÐôÖĒêêÚĜëÝøäÑğÌôáíĎÜêĊÅéÃęďøýéðęėÕćÊýîóęäçđìěúĀĎòĕÐĖÌđÊĊãÑøíëõõđÕáèĚ÷ýċñãàĄĉêóÐĜĔĐÍúéġîðÞćçùìê×đÃàõÜÌïáĢĉċØËæìÔëîñÿàÑçåďßûîçāĆĊëĘÛöċíÞðĘ÷ĄÇûĉĖÿîûÜĐè×ĉßÚòçØĀÉõçïåÎÚî÷Ġ÷äðéãîçċÞĞąòČąĀĒĐćÖăÏċéĘÿÊýþĊ×ĊâßéęĐäÊĉóêĝèóßáòċÇçïòēĊÿčÊĠÑïčÝéöéēëčđěĎĖçæĎðëðčäÎĞÕċìäĎ÷öòÝÚÌĠČđÉãÚÞúÜøäÌĞęñËĉýġïĠĉÛèÿĕČÈüđĘñÚąăîĀĘéĉÑÜĜďîâÚčĘ×ėéđÉêÐíāßûþðĝčæÑÓÚó÷üíîæĀÜàùĉäõÅéáÜđěÇăèčĈèáòÍėÓčÍÏüĖâÜÄÌáĠĈĉéÚãéòĉÈÎĈóðċãæāēëíúúÿêõÖĎëĐÞöčäċêĖçéÕÐúÜďýØÏĂÜìĜăĄäĊÕĒÙĊÿČÚĜÞēÃïĂÑùûæÿČěÕćûĖēþÄÌÌđÒíČÉĒûëĈþîûĕãĜÇóéČùğ×æÛĞďñċĂîČûÿÕÞãïëĞýĊăùĕĐëÚïØĉÙäĀÙìëßÊÎÃàÒõÊúòĖċÚÛþÚÿđĘćËéíÐĎĎēðöùüČåăĚèĎÝÒĀÙĒ÷ÞãČþėüíČđàöďõĐÃöěéąÉùüùëàĎÏôéĚÊÛĂÙĒĒÞÝãïÓčáíĆðĕ÷ÖÉæĚćēíóĂāÙĊąìÍĝđĕĀÌæĝęÕëĉèêÚėÜąòĂîĈĈčúčĒÜöčċĀćçÈÐíéċĐàďïĚĉèÌćÚĚðČëčêēð×îæñęñüÝĉÇöëüØăèù÷ýćĈäēěĘĊñÙòÖöìĂÿĂĒýÅÈĉĂúóÞČÌÝĘêìþÃëÚĀĊċÎþăùÍĄðāĐÑìÎûíÒĞÙçĄČôóíÍúýõčÍàéĊøþÇċíØ÷ĈčÊĎñĊğĀáîĐÒÜÄĀäøę÷ÄÉÊĔÒî÷äčîČßÃċîĎÕùëóąàõĖáċòíôõÆèÇñęÕãĎąÓêÖõñËĐ×ØĀòÿõČčÉáþöûĔċēÉìôßØÊÙĠùÛßĒËĂæĉöäçþÖÚĎÄæõåÖÅđÉáęûèýãĕČíáÎÞùČÞøđéýîÿÌîÈÓėÛÄċà÷ĆéõèĉÜ×ûÕëČĒēØĄæûàéĚèĂćá×ćùÛÿďÑçßÝÏÜđéåþûØĆĒÕÛà÷ìçÕÒèęĂóÉûąĔêğæìÝĂ×ÖÝÝüÓðđüíďĠĂĕ×ëąßéïËÿãÛÌôùìïúîüÊÄÍďøñûÎèĞùĈùçĎïïĚÈĀċüđÖ÷ÛÊîĘğčáÃîĉĔÜÑÐþĘïàáîĜĖéÕßÍĢõĒąĒÛáąĞýëāÿØÑĀîĈñëÿÅÈüĠìĝÜûĎÿČĞÖòÜĒÑėîîéčďîÊÊáðïùĄüđðäØąċÎíÑØäìĈûÐēçìàøĐõûċĈĂãíÕàãĚ÷ýÌĎÌíöñĊåàďìõÍâÝòĐûäąËûØøýĎąĔóĀàëÿÚäóÌÎĊôÑěãèçõôğÃäÇā÷ęÆāĂĝêĠÜĄÙĕĎĎĂãùĠÕČÙËòėċĚäòüóĘĐĄïÏéĘĝýČèċĄ×ÆþĊÛĊýÿďĄûĒċæĐùęóþéíăàĊĎûóýēĘćĂàÎĜÖñăéðČù÷æđßāĊøÍāûáĘñÝÝßÚåĝæăĊýĘïþûÑÛĈĘÊþĄëâčÌóąöćêăĂúÝõěéÑþÿĖòĉĈÏČăÝçóÏČĚÝĆæĉġćþøĄþĢēĚäáÞěíĔåáüčĊøËČÇđñÞõđþĐēĖ×ÏÿØçÙãĉåýæĎĀÛáÜăíÕéÍ×đúÕÒèēñðĎÏąėèßÃðĈðĒðĎĀÐàÚĎåîåòèúÅáæñĄÛĎĆÿÝÐñûĄăàúÜéÚÚÝÕîëĆăčđĠçĄýĔêċĀÚÚĢďçÃÜĀüęďĀÚÎČìéØćāďãìĎĎÎØėúĈìÏċæĉÌÉàĒëô×ÚÐÚąĀĄáÛêõđĂĂĊĜÔĈĆÜÌĕëöāßûõñĝÜçùÚĉòõÌíėñíæîËĒðØçËÝíÙđîÞâùċČþăüÞéÖăâċċÔò÷āìÙĒïìËçëĆñĄñÏĕð÷ąèÇööĀĄáÐĞëĕÖßÊ×ĘèêâÚéðêÄßåØĒýõÜñÛÙÖäĆĀêČðāČąÙòĠèßÍïÕèċéýĜęôċĀĐĖñĚþĂăĠčĖúÞÈþĘĕÖĂåĂéîäßùčċÑÞÐëÚċĊÇíþďæÞøúÌĚöÝîĒëāĘØúêÛĕĂúöñÝċďÝÈÞòÞûĖÕýìĚĎęĄċĄēćðĈĉáÚóęüËÌĢùöåÌÈĜēôÉüĀĢØ×ćĐĉöďðÊÝÞĂèĘÆÑçàĒĀÕìËüďĖåÛĊÚøĖÉàÈøĚċāÝïėĕÕĀÞñĜċðÜçûĀđďĉĎéüČêþçúõíó÷đÐěîĐĆêÚÚèęçàðùėòČćýġíčøđĆòéÜêÉïďÓćÆąĊ÷ĔĉåăāĉõëõĀûāâîäÎÍĚĎðÉóćáñęăÉČĂēĐúâûÓøēøďàïõÑâýĀāäćÜíÌñđĞýëîÝéĖÿĄÇÙđĕõáåċĕûöòæøăĘûÜćĒďôáòĀðñĚçýÙċöÝÞĉçáâéØÑãëîēÿÐÈė×ÖÕäÚĠôč÷ÍĐüëðÙăàĢĔèèíüğêěëĄððÒĕÕąñĊóđÅÜÏõÓüëĈðÙä×ÿÍÝġÐĔçĉûÚÕÛÌÊþĢĐçÌĊÐø×ØÍąçĐúÛÕéĊĀĕîüĎÇěĕýĈïêÜÑđØÚÝęÕêÕÈĆĀěċÌĎÉěÖÛĆÉäÜôćÇèÇđäéČýĎēăĖ¿ßâíĔĊÈÐċĞĔþýäÏďâéăãÛýâîÕÛÍðÙÜċÚÞĂąěäċðėñĞĄčÉĐÒě×ÍíďĆĀöăááĘùßÑÑÛúğØĂÿúåĉëĉÐěĐĔÖÏāěĎÜþÊýġĖçĈĐÐĐĊõâĉìĕĖčêĆâýîéæðĀċèìĆýîĔåĐÕÍáßöčæĒĂġěđÿĉäċïÑÚÜđĢîčîÎĈáÔĈÉäËðďęÄÚÜøèÙäîĂêĒðĆĎđÛĉûßÝËøïçĎàâÙø÷öåéÛêÙÜąāõâüíÈċÚÖĚċàčÝÔċéăĆòěďĉĉÈÓØĎáòÛéð÷ãþçóđćċýďþĈõ÷ÒùéìßüàĎëåÖÉĊÉāìĞĂËÌÜěĔâïÏøÚØĆááęØĖÃÌāÜÖÛÕÚćéÚòÌåÇôđÕÖÍÎÙĐěåæÜĒēýöÍúêùúĀîÃĔùþäçíõóĐčííĂęĐĆēéĠÚÜþåñÜě÷áüìĢĊĐÝÏÈĠòÖþûñÓõùçëðñÕëîçÙëĔÙäßåēďéÞĎâęïÚËćâ×ąēąýÉððğáéãĊČûÕüüÜÚÞèċúĂċĎÿâñĂØ×ČîĆđÓÜĀăÊÓąčÃðčėÙù¿ßòĚÓÚáāĂċÐĎìæËøĉéøèêëÕÕ×āÛõÒĊùďďÝûòĄĎĎĚöčÌëùđãÕċÚþüæÕëĂðğØóüÍĂċâċÅêæėĔďÃÌĀáĂÿüãëìęĔāďëĎĈòõêìÓêØĀćÌčïČÿēðĔĘČĉþèûĖĝ¿ÞăáÙöÚÒĉĜĔÛÉûÍĠÓĞÊÉÿĂ×ĔÌûÌà×ĎöýÐùÐ×âþíĞêûÞãèĀĐñÍăÃöČòþÐÜõóÞĄāã×òĐĂÄČčîÙăËđČðĒÞĂêčĉïíċĐĢØüąÄðñÑÿÖĐûàąõõÎđØĖĝÿĂăĒċöâýÚĊ×ĖÙĂĉÓâČöçáĂåĉõÝÍÚäùąćÈÝĒñàĐÌĘðøÝāçčĘÜêĈìĉěéùïñéċĘêçÑĉöóÕćÙÞÙûûåăöČïÚÜêĒĄöéîĒýĐ÷ąćýêÑÜêáÚĚìîþèïß÷ûÅéíĐêØÚââöâëèÍďęē×äìČĚĘßöÿùòéÿÌãÜïùÿþÊÏĎÑĘāîąôěĎåýĒÝÐéĊïĎĐēĕĊćýðĕþĀäúàøĘÖðĐÙćÝÇÒÚùĕ÷âÝď×ďÑĎÊèñÌĚìãÜÙÚćĄÏÙėïčĄÎÍ×øĘöăÊÝĒđéëåčðñýóĉēúÿÊïßğĚĉùčåëÔĖÌþìĞïþêòÿĖìėúìćôöĈíđíĝó÷ÕÍÃÞåôÕÞòÞęĐÌĊñĢąÞÌîąàÚĐåÛâÝïěČÈÉāđĘëçăğĘÖåÈãē÷ÕëćúÓñċûÜÚĜéÖÅĐþÛäĔÊċíìÌîĈãñàĘĖĂÈüęÙþċÛāĔÔÑăĈéðĚĎÖûìĀãÚËÑāĝĔÞâðÑßđôÉÝäéÕÞÊÎüĊĆòÜñûÝęÕëĈÏëñúÍèèĕĖÕÆąĄÞĄìéÈĐęÚĕëĉàýñďÜÍüìĒėæċĉíð×ÕæþĠĊđÝÄĂĎéíýăðöåđćÉÍĝêĎĉĀâßĕĐĄÄçóÌĊøóČĂíċÊąĀĖċćãïÛù×ëíâèĘù×ÖèïôăčãúÌĚÕĎ¿ÝñøæĊĉûąÙÓĝõĄÿÜăîčĒÃĠÚÕùĊùíćö÷ĊċĞìđÙÝĈýíþèĀÚùĆĒõðĉÚąĞĄÊÌáċċċéÚøèĉáăûĎēÙĆçąđöÛäÛĉĊåø×ÊÊÜãíÊĈĒøêøċÈÚęèċâąÍêØÖÅÞñðãĉÄāĄÞÒĔÿïċĔĔÿÊóĉüØùĎĄĉĐÌĖâîÌØČĒāðßñïïÉèÙėãðäÍîÞĉÚÙÄßöÒĊ¿ñýĉÙýĈĈçėĉî¿ČúÞÌĒÕăãÓéÙüĂÃÙ×ÝêòáġĔñĂæċßåÛêáÑüùÖäĈÊĖøØþÏÝáďç×âćÜøğëÏċċĄđÅñÈđěĚøèČñØýĎčÈďĉ÷÷äćÞÌÛÍúòÜÒ×ÙúúÜî×ùÑäĊćòćÎüĞÒØÌïëþĈøÉÐÐ÷ØÖÇćĀĕÔÿĈÑÎďĒ÷èÏîĞėÞÕăðĒÐçÝâÉğøíāđêõęèÖēăðđþăÄĆÓëĊâĎíñčĒÌĎéāěěÈēÑóôÿĎîòĉĂėÿĎÚĠöęöđĒôėĎÿðêüÑñÜüÜÓ÷ñýÈĎ÷ĎñíßĈúĕĐÚçàùĎĖøĈãċÒíæÏíéîÿéÌĈüÓĠèÜãéâëÃĀãĀĄøĎćæòÐñþĉăá×çØüþûĈěÆèČóõđÿÉÈĖçéÕÄüíÓÑéëĂĞÌĊãÑàÛìø¿éÑíĎö¿ċëáċõçÿêęđþ÷ÎîøíûĂĄûĕĐÕØÌèđùúüËÐáĄČĂìéĒØôçîÞùò÷ùäßéêğÖēîìõùČčñġõĔÉëîĜôċãËùěóĠĊăúğċĖÇĂýġìúĆÎîØĈÕ÷ēćøĎû¿ÈĉóÙèÌíÃðÚúÌèËĒøēăĐÏýěÞÿĊĂÝéîąÝðØÖėêÎòĉąĈúúüùĖïËþäěùõ×ÌÈðĄÑċċĒĒęôÈĒĂÙðĊøçÿØãĔćàçðĖĘčâĄċúÛßĈçùćČâìďøãĘĈÑÍñééÅÉèďØĝÖÍĀàôóÿĊéïěęþĒúđĄëÕăÇéèøÅçüĀĐÑăÄÙČëÞéāäĞĘ×ùßæÜÓĠèæðûïěĊÌÜØéïÍíðĜÓēĎðïėøûøđĈěÙûÄàçøìï¿ñÊğðĔÄĈċďðùÌàÃéÚîÌçćìãëöĂÏĠÙÖÌĐđċÌÙĄÄÞČąìÙþåĖ××íðæýÚó×ąâéÕìãĐÚïĐìùúÇĜæÜĎÒĂàèôĄČúēñċçäĀğĆĝãíÇéæĘÄþÌĎĚĕþâËùåðĆÎÈÓñõĄìðĕĖ÷ëÎúñòđûóÇÿČØâááÿöĝþāíċÙČĎċìđÒðÖáČēċÿĈăÿďÒĎÆĄĆġĈĀÜÛÙöø÷ùÝÎÓĕ÷áčďÞÖėÛąËúčęàĎùòäċûûĈÓçĊîĈþĠïĜÝËîĊÌéãÎíċăĎÌċþÜ÷ĝáÏĀěÖîçĊÊûēÛÖâæëúîÄÿÌčÙüõçĊĉĉòùÿđÝĔĉČĒûðÙêÇċòČîêãÝāĞĎíÄĎĈāèêČĎîāąéØĂčÞÙöúÞìýØðéĂčðæÜØăÍ×ÙćąÍàěãèÍäñúěĠČñâÞćÞÕÞÜüăĔÕćāčîßčĉđó×éċÊþüăÞØÐæČĐĞÃĎăÜñÜÄñÙĜďíãäéÜÖèĄÎß÷ĆĔĄđììÒöÊÉÈéæĐÞĉÛúÔÜéÞÈØČċĈæÜÝĊēíĄÐÝÌĚÞĈÐġęċÝčæēĄĐõčđĕćĠÚëċċÐÕĆĊĄċîüĀëÉêãüċëĂÚÖėéÛÑěĂćāåîîñûßèĆØēìÌýýôíîċćĈÛďúÕíðĒÐÜýÚàĔċÜĂÉĈÛĉÕìÛýĉéĖíčûøĆþêĈăġĉčåĊÇóäùõÎúĀÐçÕìÃęÔĈìþćÛďĔĎéËÞâêÄßíûċĎĈåÉĞöČÙðĉĞĒýĈíąĉ÷ēäąêÜÌùáüăêóØöÌĊĘđïåÑêýúïöÎìĝöĔäČďĢØĊèðæęùĎ¿ñéôčĀÙäđóØè×ÝËáĒÙöíüôăčÉÝòÓöëþĀÑõĒÙĆÉèĜöęØéąĜčĒčāíÝÌÝćüúĜĖċøĉÙÜ×çíéĎÿñėÛċùĒÕðĉòüýÑėæÍÿßĈùÆÎàßĕĝúÍüĞúÑÈċĈğĈğ×îÃùēÖ÷ÒĂġ÷ïÜáéċ÷čùãäĉÑ×èîúčÔēìýßďåìêàËĚÑïäÉĐûòîąćÿðęĜĄáĂïěÕ÷èäčÐĐìæČěęÑíáÉðĒñÊóăóéĔĆñą÷ĊċÕċúüĎĐĊýæĖĂéîüåĒíĝêēðĎ×ĀąÞċĞÌčÇĈÛÛĊòÿąþĝĔöëċìéċ×ąòâĊôóČĐāęøÿ¿ĀÞĎìîýÈîĐēČýĎÏĞêØÇêÚġĔþ¿ÏçáĆØúčÚčêØÄăďÚïôĈðñĀèĕÿĈïïóĚþáËĒÐïêÑÐÚâÜćþèü×üàáñĞòĔõÄÜēäĘÈäĀéĄĔÚóÎÜě×âðúčòçËñÎÜĒøÆÜîġĚĒüăËĠööčČåĖĈ×íðÚÝÖíùÌÙêäĒÆÛÎíäęÍîäěęÙÙÞÐÜãÜéÚïđċçÍçËĎĊđêēđ÷ìčçèñõïđĆûċĒãðąđäóØĕ×ÏâĞěčćèÑëâČÜæíñðĉúìČóÑ×ëúæďóï÷Äčċ÷ĐËāČÝĚñééĂîîêĊÒâàăćĄúúùûğÌÿìĉÖğáÿĒĚĔôáÑüĉąĉÝßčØîòúÌĄÝçċÞĉãğñèąúçÞĄîÉíÿØùç¿ĂäóÐęĆËáøĂÙÙüćáâċúĒĉþĎçĆĐþûïČāčäĘëïëäçĖĄĊÊÐÏùėëøÊþęúúĎäāßĚċāëĆðÚćĄæê×Úđ¹ÌÜĝďęõÿý',
					img = '<img src="data:image/jpg;base64,%imgdata%" alt="Red dot" />';

				JMVC.events.on(JMVC.dom.find('#see'), 'click', function() {
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

	this.action_img = function() {
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

		JMVC.dom.preloadImage(JMVC.vars.baseurl + '/media/img/' + img, function() {
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
				butts = '';

			for (var i = 0, l = elements.length; i < l; i += 1) {
				butts += JMVC.string.replaceAll('<button id="%id%" class="flt">%label%</button>', elements[i]);
			}

			function track(msg) {
				JMVC.dom.append(JMVC.dom.find('#done'), JMVC.dom.create('li', {}, msg));
			}
			track.reset = function() {
				JMVC.dom.empty(JMVC.dom.find('#done'));
			};

			that.render(
				'<div class="filters">Filters : ' + butts +
				'<br /><button id="reset">RESET</button></div>' +
				'<div style="float:left" id="realimg"><img src="' + JMVC.vars.baseurl + '/media/img/' + img + '" /></div>' +
				'<div style="float:left"><ol id="done"></ol></div>',
				function() {
					JMVC.events.delay(function() {
						var img = JMVC.dom.find('img'),
							flt = JMVC.image.createFilter(img);
						flt.prepare();

						JMVC.events.on(JMVC.dom.find('#brightness'), 'click', function() {
							flt.filterImage(flt.filters.brightness, 20);
							track('brightness');
						});
						JMVC.events.on(JMVC.dom.find('#threshold'), 'click', function() {
							flt.filterImage(flt.filters.threshold, 50);
							track('threshold');
						});
						JMVC.events.on(JMVC.dom.find('#grayscale'), 'click', function() {
							flt.filterImage(flt.filters.grayscale);
							track('grayscale');
						});
						JMVC.events.on(JMVC.dom.find('#invert'), 'click', function() {
							flt.filterImage(flt.filters.invert);
							track('invert');
						});
						JMVC.events.on(JMVC.dom.find('#blur'), 'click', function() {
							flt.filterImage(flt.filters.blur);
							track('blur');
						});
						JMVC.events.on(JMVC.dom.find('#sharpen'), 'click', function() {
							flt.filterImage(flt.filters.sharpen);
							track('sharpen');
						});
						JMVC.events.on(JMVC.dom.find('#laplace'), 'click', function() {
							flt.filterImage(flt.filters.laplace);
							track('laplace');
						});
						JMVC.events.on(JMVC.dom.find('#sobeloriz'), 'click', function() {
							flt.filterImage(flt.filters.sobeloriz);
							track('sobel orizontal');
						});
						JMVC.events.on(JMVC.dom.find('#sobelvert'), 'click', function() {
							flt.filterImage(flt.filters.sobelvert);
							track('sobel vertical');
						});
						JMVC.events.on(JMVC.dom.find('#emboss'), 'click', function() {
							flt.filterImage(flt.filters.emboss);
							track('emboss');
						});

						JMVC.events.on(JMVC.dom.find('#red'), 'click', function() {
							flt.filterImage(flt.filters.remove, 0);
							track('red channel removed');
						});
						JMVC.events.on(JMVC.dom.find('#green'), 'click', function() {
							flt.filterImage(flt.filters.remove, 1);
							track('green channel removed');
						});
						JMVC.events.on(JMVC.dom.find('#blue'), 'click', function() {
							flt.filterImage(flt.filters.remove, 2);
							track('blue channel removed');
						});
						JMVC.events.on(JMVC.dom.find('#x'), 'click', function() {
							flt.filterImage(flt.filters.x);
							track('x filter');
						});
						JMVC.events.on(JMVC.dom.find('#mblur'), 'click', function() {
							flt.filterImage(flt.filters.mblur);
							track('motion blur');
						});


						JMVC.events.on(JMVC.dom.find('#reset'), 'click', function() {
							flt.reset();
							track.reset();
						});

					}, 1000);
				}
			);
		});
	};

	this.action_viewplus = function() {
		JMVC.head.title('Hello');
		var sv = JMVC.getView('superview');
		var v = JMVC.getView('sv');
		v.set('goal', ', I said hellooooooo !!!');
		sv.set('hello', ' yeah hello');
		v.render();
	};

	this.action_logo = function() {

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
			cback: function() {
				var newlogo = document.getElementById('extralogo'),
					j = new JMVC.plotter.symbol('j', 0, 0),
					m = new JMVC.plotter.symbol('m', 76, 0),
					v = new JMVC.plotter.symbol('v', 228, 0),
					c = new JMVC.plotter.symbol('c', 333, 0);

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
				m.arc(102, 72, 14, 25, -M.PI / 6, -M.PI/18, 4);
				

				v.line(0, 56, 10, 28, 2);
				v.line(10, 28, 40, 60, 4);
				v.line(40, 60, 30, 90, 2);
				v.line(30, 90, 0, 56, 4);
				v.line(48, 60, 38, 90, 2);
				v.arc(48, 24, 21, 37, M.PI / 10, -M.PI/9, 6);
				v.line(67, 11, 97, 15, 2);
				v.arc(46, 24, 51, 65, M.PI / 18, 0, 10);


				

				c.line(0, 48, 30, 53, 2);
				c.line(46, 3, 54, 30, 2);
				c.line(0, 57, 54, 65, 5);
				c.line(54, 65, 46, 96, 3);
				
				c.arc(50, 50, 20, 18, -M.PI / 8, -M.PI/2 - 0.2, 4);
				c.arc(40, 40, 39, 36, -M.PI / 12.5, -M.PI/2 - 0.1, 7);
				
				c.arc(45, 58, 45, 38, -M.PI / 16, M.PI - 0.2, 7);


				var scale = 1;

				j.plot(newlogo, scale);
				m.plot(newlogo, scale);
				v.plot(newlogo, scale);
				c.plot(newlogo, scale);


				var a = newlogo.childNodes,
					i = 0,
					T1 = 20,
					T2 = 10,
					bucket = new JMVC.bucket.create(JMVC.util.range(0, a.length - 1));
				window.setInterval(function() {
					// var trg = JMVC.util.rand(1,a.length-1); 
					if (!bucket.hasMore()) {
						bucket.recover();
					}
					var trg = bucket.next() || 1;
					try {
						var col = a[trg].style.color;
					} catch (e) {
						JMVC.debug(trg);
					}
					window.setTimeout(
						function(t1) {
							a[t1].style.color = 'white';
							a[t1].style.fontSize = '10px';
							window.setTimeout(
								function(t2) {
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

	this.action_xmlparser = function() {
		JMVC.require('core/xmlparser/xmlparser');

		var d = new JMVC.xmlparser.load('<?xml version="1.0" encoding="UTF-8" ?><root><el><name sex="M">federico</name><surname>ghedina</surname><struct><a>A</a><b>B</b></struct></el><el><name>federico2</name><surname>ghedina2</surname></el></root>'),
			t = false;
		d.extractor(function(node) {
			return {
				name: JMVC.xmlparser._text(node.childNodes[0]),
				surname: JMVC.xmlparser._text(node.childNodes[1]),
				sex: JMVC.xmlparser._attribute(node.childNodes[0], 'sex')
			}
		});
		t = d.extractor(0);


		d.extractor(
			function(node) {
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

		/*JMVC.yes.prova(); */
	};

	this.action_docs = function() {
		JMVC.require('core/xmlparser/xmlparser');

		JMVC.io.get(

			JMVC.vars.baseurl + '/media/documentation.xml',

			function(doc) {
				var parser = new JMVC.xmlparser.load(doc);

				parser.extractor(function(node) {
					//JMVC.debug('node is ',node);
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
					JMVC.each(node.childNodes[2].childNodes, function(el, i) {
						ret.params[JMVC.xmlparser._attribute(el, 'name')] = JMVC.xmlparser._text(el);
					});
					return ret;
				});
				parser.pointer(parser.xmlDoc.getElementsByTagName('dom')[0]);






				/*
			JMVC.debug(JMVC.xmlparser.toJson(parser.xmlDoc.getElementsByTagName('dom')[0] ));
			*/

				/*
			var r = parser.extractor(0);
			var all = parser.extractall();
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

	this.action_scheduler = function() {
		JMVC.require('scheduler/scheduler');
		var s = JMVC.scheduler.create();
		s.add({
			every: 3000
		}, function(d) {
			JMVC.debug(d);
		});
		s.add({
			every: 5000
		}, function(d) {
			JMVC.debug('hei heiiiii ' + d);
		});

		JMVC.W.s = s;
	};

	this.action_observer = function() {
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

		list.setBuildStrategy(function(ul) {
			JMVC.dom.empty(ul);
			JMVC.each(list.getItems(), function(el, i) {
				JMVC.dom.append(ul, JMVC.dom.create('li', {}, i + ' : ' + el));
			});
		});

		v.render({
			cback: function() {

				var butt_plus = JMVC.dom.add(B, 'input', {
					type: 'button',
					value: '+',
					id: 'butt_plus'
				}),
					butt_minus = JMVC.dom.add(B, 'input', {
						type: 'button',
						value: '-',
						id: 'butt_minus'
					}),
					ulist = JMVC.dom.add(B, 'ul', {
						style: 'list-style-type:none;padding:10px;border:1px solid gray;width:200px;background-color:#eee;',
						id: 'mylist'
					}),
					item,
					render;

				JMVC.events.on(butt_plus, 'click', function() {
					item = prompt('Item to add');
					if (item !== null && item !== '') {
						list.addItem(item);
					}
				});
				JMVC.events.on(butt_minus, 'click', function() {
					item = prompt('Item index to be removed');
					if (item !== null && item !== '' && !isNaN(item)) {
						list.removeItemAt(item);
					} else {
						alert('Noitem with index ' + item);
					}
				});

				/* or simply */
				list.listModified.attach(function() {
					list.build(ulist);
				});

				/* first time build */
				list.build(ulist);
			}
		});
	}

	this.action_fx = function() {
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
			cback: function() {
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
					function(i) {
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

	this.action_divrot = function() {

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
			.render(function() {


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
			.render(function() {
				
				JMVC.core.captcha.create(JMVC.dom.find('#container'));

			});
	};

	this.action_dropbox = function () {
		JMVC.require('vendors/dropbox/dropbox');

		var dbox;


		JMVC.getView('vacuum')
			.set({
				style: '',
				id: 'container',
				'content': ''
			})
			.render(function() {
				
				dbox = JMVC.vendors.dropbox.create();

			    dbox.login(function (){
			        //dbox.getTable('tasklists');
			        //dbox.insert('tasklists', {name:'Federico', surname : 'Ghedina'});
			    	//dbox.truncate('tasklists');
			        dbox.getFileContent('hw.html', function (err, cnt) {
			        	console.debug(cnt);
			        });
			    });

			    //db.logout();

			});
	};




	this.action_drawer = function (){
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
		.render(function() {

			document.body.style.backgroundColor = 'red';

			document.body.style.padding = '50px';

			document.body.innerHTML = JMVC.string.lorem(500);
			
			var drawer = JMVC.mobile.drawer.create([{
		        label : 'JMVC logo',
		        href : '/demo/logo.html'
		    },{
		        label : 'Google logo plotted',
		        href : '/google.jmvc'
		    },{
		        label : 'Google logo plotted flash',
		        href : '/google.jmvc?flash'
		    },{
		        label : 'Google logo plotted aberration',
		        href : '/google.jmvc?aberrate'
		    }]);

		    drawer.render();
		});
	};

	this.action_shadow = function (){
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
		.render(function() {

			
			var size = that.get('size') || 5,
				cnt = JMVC.dom.find('#container'),
				flag = JMVC.dom.create('div', {id:'flag'}),
				space1 = JMVC.dom.create('div', {id:'space1'}),
				space2 = JMVC.dom.create('div', {id:'space2'}),
				space3 = JMVC.dom.create('div', {id:'space3'}),
				space4 = JMVC.dom.create('div', {id:'space4'}),
				space5 = JMVC.dom.create('div', {id:'space5'}),
				mario = JMVC.dom.create('div', {id:'mario'}),
				pacman = JMVC.dom.create('div', {id:'pacman'}),
				dimonni = JMVC.dom.create('div', {id:'dimonni'}),

				ul = JMVC.dom.create('div'),
				li0 = JMVC.dom.add(ul, 'div', {style:'height:'+(20 * size)+'px'}),
				li1 = JMVC.dom.add(ul, 'div', {style:'height:'+(20 * size)+'px'}),
				li2 = JMVC.dom.add(ul, 'div', {style:'height:'+(20 * size)+'px'}),
				li3 = JMVC.dom.add(ul, 'div', {style:'height:'+(20 * size)+'px'}),
				li4 = JMVC.dom.add(ul, 'div', {style:'height:'+(20 * size)+'px'}),
				li5 = JMVC.dom.add(ul, 'div', {style:'height:'+(20 * size)+'px'}),
				li6 = JMVC.dom.add(ul, 'div', {style:'height:'+(20 * size)+'px'}),
				li7 = JMVC.dom.add(ul, 'div', {style:'height:'+(30 * size)+'px'}),
				li8 = JMVC.dom.add(ul, 'div', {style:'height:'+(50 * size)+'px'});

			JMVC.css.style(JMVC.WDB, {padding : '50px'});

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

			
			

			var sm0 = JMVC.shadowMatrix({
				scale : size,
				matrix : [
					'.,.,.,.,.,.,.,.,.,.,.,.,.,.',
					'.,.,.,.,.,.,.,.,.,.,.,.,.,.',
					'.,.,.,.,.,.,O,O,.,.,.,.,.,.',
					'.,.,.,.,.,.,O,O,.,.,.,.,.,.',
					'.,.,.,.,O,O,O,O,O,O,.,.,.,.',
					'.,.,.,.,O,O,O,O,O,O,.,.,.,.',
					'.,.,.,.,.,.,O,O,.,.,.,.,.,.',
					'.,.,.,.,.,.,O,O,.,.,.,.,.,.',
					'.,.,.,.,.,.,.,.,.,.,.,.,.,.',
					'.,.,.,.,.,.,.,.,.,.,.,.,.,.',
				],
				colorMap : {
					'O' : 'transparent',
					'.' : 'red'
				}
			});
			sm0.draw({node : flag});


			var sm1 = JMVC.shadowMatrix({
				scale : size,
				matrix : [
					' , ,L,#,#, , , ',
					' , ,#,#,#,#, , ',
					' ,#,#,#,#,#,#, ',
					'#,#, ,#,#, ,#,#',
					'#,#,#,#,#,#,#,#',
					' ,#, ,#,#, ,#, ',
					'#, , , , , , ,#',
					' ,#, , , , ,#, '
				],
				colorMap :  {
					'L' : [JMVC.shadowMatrix.triUL, {color : '#'}],
					'R' : [JMVC.shadowMatrix.triUR, {color : '#'}],
					'#' : '#0a0',
					' ' : 'transparent'
				}
			});


			var sm2 = JMVC.shadowMatrix({
				scale : size,
				matrix : [
					' , ,#, , , , , ,#, , ',
					' , , ,#, , , ,#, , , ',
					' , ,#,#,#,#,#,#,#, , ',
					' ,#,#, ,#,#,#, ,#,#, ',
					'#,#,#,#,#,#,#,#,#,#,#',
					'#, ,#,#,#,#,#,#,#, ,#',
					'#, ,#, , , , , ,#, ,#',
					' , , ,#,#, ,#,#, , , '
				],
				colorMap : {
					'#' : '#008',
					' ' : 'transparent'
				}
			});
			sm2.draw({node : space2});

			var sm3 = JMVC.shadowMatrix({
				scale : size,
				matrix : [
					' , , , ,#,#,#,#, , , , ',
					' ,#,#,#,#,#,#,#,#,#,#, ',
					'#,#,#,#,#,#,#,#,#,#,#,#',
					'#,#,#, , ,#,#, , ,#,#,#',
					'#,#,#,#,#,#,#,#,#,#,#,#',
					' , ,#,#,#, , ,#,#,#, , ',
					' ,#,#, , ,#,#, , ,#,#, ',
					' , ,#,#, , , , ,#,#, , '
				],
				colorMap : {
					'#' : '#DD127D',
					' ' : 'transparent'
				}
			});
			sm3.draw({node : space3});



			var sm4 = JMVC.shadowMatrix({
				scale : size,
				matrix : [
					' , , , , ,#,#,#,#,#,#, , , , , ',
					' , , ,#,#,#,#,#,#,#,#,#,#, , , ',
					' , ,#,#,#,#,#,#,#,#,#,#,#,#, , ',
					' ,#,#, ,#,#, ,#,#, ,#,#, ,#,#, ',
					'#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#',
					' , ,#,#,#, , ,#,#, , ,#,#,#, , ',
					' , , ,#, , , , , , , , ,#, , , '
				],
				colorMap : {
					'#' : '#ffdd00',
					' ' : 'transparent'
				}
			});
			sm4.draw({node : space4});

			var sm5 = JMVC.shadowMatrix({
				scale : size,
				matrix : [
					' , , , , , , ,#, , , , , , , ',
					' , , , , , ,#,#,#, , , , , , ',
					' , , , , , ,#,#,#, , , , , , ',
					' ,#,#,#,#,#,#,#,#,#,#,#,#,#, ',
					'#,#,#,#,#,#,#,#,#,#,#,#,#,#,#',
					'#,#,#,#,#,#,#,#,#,#,#,#,#,#,#',
					'#,#,#,#,#,#,#,#,#,#,#,#,#,#,#',
					'#,#,#,#,#,#,#,#,#,#,#,#,#,#,#'
				],
				colorMap : {
					'#' : '#0f0',
					' ' : 'transparent'
				}
			});
			sm5.draw({node : space5});

			var sm6 = JMVC.shadowMatrix({
				scale : size,
				matrix : [
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
				colorMap : {
					'#' : '#db0102',// red
					'$' : '#f8aa00',// skin
					'@' : '#706700',// hair
					' ' : 'transparent'
				}
			});
			sm6.draw({node : space5});
			window.setInterval(function (){
				sm6.mirror();
			}, 500);


			var sm7 = JMVC.shadowMatrix({
				scale : size,
				matrix : [
					' , , ,y,y,y,y,y, , , , , , , , , , , , , , , , ,p,p,p,p, , , , , , , , , , , , , , ,c,c,c,c, , , , , ',
					' ,y,y,y,y,y,y,y,y,y, , , , , , , , , , , , ,p,p,p,p,p,p,p,p, , , , , , , , , , ,c,c,c,c,c,c,c,c, , , ',
					'y,y,y,y,y,y,y,y,y,y,y, , , , , , , , , , ,p,p,p,p,p,p,p,p,p,p, , , , , , , , ,c,c,c,c,c,c,c,c,c,c, , ',
					'y,y,y,y,y,y,y,y,y,y,y, , , , , , , , , ,p,p,p, , ,p,p,p,p, , ,p, , , , , , ,c,c, , ,c,c,c,c, , ,c,c, ',
					' , ,y,y,y,y,y,y,y,y,y,y, , , , , , , , ,p,p, , , , ,p,p, , , , , , , , , , ,c, , , , ,c,c, , , , ,c, ',
					' , , , , , ,y,y,y,y,y,y, , , , , , , , ,p,p, , ,E,E,p,p, , ,E,E, , , , , , ,c, ,E,E, ,c,c, ,E,E, ,c, ',
					' , , , , , , , ,y,y,y,y, , , , , , , ,p,p,p, , ,E,E,p,p, , ,E,E,p, , , , ,c,c, ,E,E, ,c,c, ,E,E, ,c,c',
					' , , , , , ,y,y,y,y,y,y, , , , , , , ,p,p,p,p, , ,p,p,p,p, , ,p,p, , , , ,c,c,c, , ,c,c,c,c, , ,c,c,c',
					' , ,y,y,y,y,y,y,y,y,y,y, , , , , , , ,p,p,p,p,p,p,p,p,p,p,p,p,p,p, , , , ,c,c,c,c,c,c,c,c,c,c,c,c,c,c',
					'y,y,y,y,y,y,y,y,y,y,y, , , , , , , , ,p,p,p,p,p,p,p,p,p,p,p,p,p,p, , , , ,c,c,c,c,c,c,c,c,c,c,c,c,c,c',
					'y,y,y,y,y,y,y,y,y,y,y, , , , , , , , ,p,p,p,p,p,p,p,p,p,p,p,p,p,p, , , , ,c,c,c,c,c,c,c,c,c,c,c,c,c,c',
					' ,y,y,y,y,y,y,y,y,y, , , , , , , , , ,p,p, ,p,p,p, , ,p,p,p, ,p,p, , , , ,c,c, ,c,c,c, , ,c,c,c, ,c,c',
					' , , ,y,y,y,y,y, , , , , , , , , , , ,p, , , ,p,p, , ,p,p, , , ,p, , , , ,c, , , ,c,c, , ,c,c, , , ,c'
				],
				colorMap : {
					' ' : 'transparent',
					'y' : '#ff0',// red
					'r' : '#f00', // skin
					'p' : '#faa', //hair
					'a' : '#aaf', //hair
					'c' : 'coral', //hair
					'o' : '#f83',
					'E' : '#005'
				}
			});
			sm7.draw({node : pacman});

            var sm8 = JMVC.shadowMatrix({
                scale : size,
                matrix : [
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
                colorMap : {
                    ' ' : 'transparent',
                    'B' : '#000',
                    '-' : '#f0d6b5', //pink
                    'O' : '#5f3006', //marrone
                    '+' : '#a8e00d', //green
                    'c' : '#7b78e3', //celeste c
                    'x' : '#928398', //riga1
                    'y' : '#845500' //riga1
                }
            });
			sm8.draw({node : dimonni});
		});
	};

	this.action_Mario = function (){
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
		.render(function() {

			
			var size = that.get('size') || 5,
				cnt = JMVC.dom.find('#container'),
				mario = JMVC.dom.create('div', {id:'mario'}),

				ul = JMVC.dom.create('div'),
				li0 = JMVC.dom.add(ul, 'div', {style:'height:'+(50 * size)+'px'});

			JMVC.css.style(JMVC.WDB, {padding : '50px'});

			JMVC.dom.append(li0, mario);
			JMVC.dom.append(cnt, ul);
			JMVC.dom.append(JMVC.WDB, cnt);

			

			var sm0 = JMVC.shadowMatrix({
				scale : size,
				matrix : [
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
				colorMap : {
					'#' : '#db0102',// red
					'$' : '#f8aa00',// skin
					'@' : '#706700',// hair
					' ' : 'transparent'
				}
			});
			sm0.draw({node : mario});
			window.setInterval(function (){
				sm0.mirror();
			}, 500);

		});
	};

	this.action_shadowJMVC = function (){
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
		.render(function() {

			
			var size = that.get('size') || 1,
				JMVCdomCreate = JMVC.dom.create,
				cnt = JMVC.dom.find('#container'),
				input = JMVCdomCreate('input', {type:'text', id:'imgurl'}),
				butt = JMVCdomCreate('input', {type:'button', value:'get it'}),
				pestCss = JMVCdomCreate('input', {type:'button', value:'pest css'}),
				size1 = JMVCdomCreate('input', {type:'button', value:'size 1'}),
				size2 = JMVCdomCreate('input', {type:'button', value:'size 2'}),
				size3 = JMVCdomCreate('input', {type:'button', value:'size 3'}),
				size4 = JMVCdomCreate('input', {type:'button', value:'size 4'}),
				logo = JMVCdomCreate('div', {id:'logo', style:'margin-top:10px'}),
				img1 = JMVCdomCreate('a', {href:'javascript:;', alt:'/media/img/shad/js.jpg'}, 'js'),
				img2 = JMVCdomCreate('a', {href:'javascript:;', alt:'/media/img/shad/code.jpg'}, 'code'),
				img3 = JMVCdomCreate('a', {href:'javascript:;', alt:'/media/img/shad/javascript-save-all.jpg'}, 'will save us all');

			JMVC.css.style(JMVC.WDB, {padding : '50px'});
			JMVC.css.mappedStyle('xxx', 'a{margin-left:5px}');

			
			JMVC.dom.append(cnt, [input, butt, pestCss, size1, size2, size3, size4, img1, img2, img3, logo]);
			JMVC.dom.append(JMVC.WDB, cnt);

			JMVC.events.on(butt, 'click', function (){
				if (!input.value) {
					document.location.search = '?size=1';	
				} else {
					go(input.value || 1);
				}

			});
			JMVC.events.on([img1, img2, img3], 'click', function (){
				go(JMVC.vars.baseurl + JMVC.dom.attr(this, 'alt'));
			});
			JMVC.events.on(size1, 'click', function (){
				JMVC.bom.qs({size : .5});
			});
			JMVC.events.on(size2, 'click', function (){
				JMVC.bom.qs({size : 1});
			});
			JMVC.events.on(size3, 'click', function (){
				JMVC.bom.qs({size : 1.5});
			});
			JMVC.events.on(size4, 'click', function (){
				JMVC.bom.qs({size : 2});
			});
			JMVC.events.on(pestCss, 'click', function (){
				JMVC.css.pest();
			});


			function go (img) {

				JMVC.shadowMatrix.getMatrixFromImage({
					size : size,
					imgUrl : img || (JMVC.vars.baseurl + '/media/img/fgk.jpg')
				})
				// promise returned, done when image loaded and
				// matrix done
				.then(function(pro, result) {
					

					// pro is the promise
					// res is the result that can be even found as pro.result
					
					var sm = JMVC.shadowMatrix(pro.result[0]).draw({node : logo});
					
					/*
					window.setTimeout(function () {
						sm.fromImage({
							size : size,
							imgUrl : JMVC.vars.baseurl + '/media/img/jmvc_n3.png'
						});
					}, 5000);
					*/
				});
			}
			
			go();

		});
	};


	this.action_animation = function (){
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
		.render(function() {			
			var size = that.get('size') || 10,
				cnt = JMVC.dom.find('#container'),
				space = JMVC.dom.create('div', {id:'space', style:'margin:50px'});

			JMVC.css.style(JMVC.WDB, {padding : '50px'});

			JMVC.dom.append(cnt, space);
			JMVC.dom.append(JMVC.WDB, cnt);
			
			

			var sm = JMVC.shadowMatrix({
				scale : size,
				frames : [
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
					],[
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
					],[
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
					],[
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
					],[
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
					],[
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
					],[
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
					],[
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
					],[
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
					],[
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
					],[
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
					],[
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
					],[
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
					],[
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
					],[
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
					],[
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
					],[
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
					],[
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
					],[
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
					],[
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
					],[
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
				colorMap : {
					o : 'red',
					' ' : 'white',
					'.': 'coral'
				}
			});
			
			sm.animate({
				node : space,
				backAndForth : true
			}, 50);


			window.setTimeout(function () {
				sm.replaceMap({
					o : 'red',
					' ' : 'black',
					'.': 'white',
					'x' : 'white'
				});
			}, 3000);

			
		});
	};




	this.action_orientation = function () {

		//JMVC.require('vendors/twitter/twitter');

		JMVC.getView('demo/orientation')
			.set({
				style: '',
				id: 'container',
				'content': ''
			})
			.render(function() {

				// experimental
				 
				// JMVC.vendors.twitter.linkShare(document.body, {
				// 	//url : 'http://www.jmvc.org'
				// 	title : 'mytitle'
				// 	,text : 'testo del tweet'
				// 	//,via : 'via me'
				// 	//,size : 'large'
				// 	,related : '#javascript'
				// 	,hashtags : 'javascript, pure javascript'
				// });

				// JMVC.vendors.twitter.follow(document.body, {
				// 	'show-count' : false
				// 	,'size' : 'large'
				// 	,'show-screen-name' : true
				// });

				// JMVC.vendors.twitter.hashTag(document.body, {
				// 	size : 'large'
				// 	,related : 'purejmvc'
				// 	//,url : 'http://www.jmvc.dev'
				// 	//,button_hashtag : '#javascript'
				// 	,text : 'my text'
				// });

				// JMVC.vendors.twitter.mention(document.body, {
				// 	size : 'large'
				// 	,related : 'purejmvc'
				// 	,url : 'http://www.jmvc.dev'
				// 	,screen_name : 'purejmvc'
				// 	,text : 'my text'
				// });

				
				JMVC.head.addStyle(JMVC.vars.baseurl + '/app/views/demo/orientation.css', true);

				var $ = JMVC.dom.find,
					Mr = Math.round;

				if (!window.DeviceOrientationEvent) {
					$('#do-unsupported').classList.remove('hidden');
				} else {
					$('#do-info').classList.remove('hidden');
					window.addEventListener('deviceorientation', function(e) {
						e.absolute = true;
						$('#cube').style.webkitTransform = 
						$('#cube').style.transform = 'rotateX(' + e.beta + 'deg) ' + 'rotateY(' + e.gamma + 'deg) ' + 'rotateZ(' + e.alpha + 'deg)';
	 					$('#beta').innerHTML = Mr(e.beta);
	 					$('#gamma').innerHTML = Mr(e.gamma);
	 					$('#alpha').innerHTML = Mr(e.alpha);
	 					$('#is-absolute').innerHTML = e.absolute ? "true" : "false";
	 				});
         		}
         		if (!window.DeviceMotionEvent) {
         			$('#dm-unsupported').classList.remove('hidden');
     			} else {
     				$('#dm-info').classList.remove('hidden');
     				window.addEventListener('devicemotion', function(e) {
     					e.interval = 5;
     					$('$acceleration-x').innerHTML = Mr(e.acceleration.x);
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
					window.addEventListener('compassneedscalibration', function(e) {
						alert('Compass needs calibrating! Wave your device in a figure-eight motion');
					});
				}

			});
	};
};