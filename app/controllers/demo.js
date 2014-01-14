JMVC.controllers.demo = function () {
	
	/* test a route */ 
	this.addRoutes({
		'ndl' : 'flag',
		f : 'flag'
	});

	this.action_cs = function () {
		JMVC.head.goto('console', 'index', "?h=%3C!--%20no%20html%20content%20--%3E&j=var%20data%20%3D%20%5B%0A%09%09%5B'Samsung%20Galaxy%20S4'%2C'Samsung'%2C'April%202013'%2C38%2C'4560'%5D%2C%0A%09%09%5B'Lumia%201020'%2C'Nokia'%2C'July%202013'%2C2%2C'1560'%5D%2C%0A%09%09%5B'Surface%202%20Pro'%2C'Microsoft'%2C'September%202013'%2C12%2C'53782'%5D%2C%0A%09%09%5B'iPhone%205s'%2C'Apple'%2C'September%202013'%2C53%2C'134500'%5D%2C%0A%09%09%5B'One%20X'%2C'HTC'%2C'March%202012'%2C7%2C'213068'%5D%2C%0A%09%09%5B'G%202'%2C'LG'%2C'October%202013'%2C34%2C'133068'%5D%2C%0A%09%09%5B'Yoga%202%20Pro'%2C'Lenovo'%2C'November%202013'%2C4%2C'4230'%5D%0A%09%5D%2C%0A%20%20%20%20headers%20%3D%20%5B'Product%20Name'%2C'Product%20Manufacturer'%2C'Release%20Date'%2C'Quantity'%2C'Purchase%20Value'%5D%3B%0A%0Afunction%20ProductTable(config)%20%7B%0A%20%20%20%20this.headData%20%3D%20config.head%20%7C%7C%20false%3B%0A%20%20%20%20this.bodyData%20%3D%20config.body%20%7C%7Cfalse%3B%0A%20%20%20%20if%20(!this.headData%20%7C%7C%20!this.bodyData)%20%7B%0A%20%20%20%20%20%20%20%20throw%20new%20Error('Missing%20parameters')%3B%0A%20%20%20%20%7D%0A%20%20%20%20this.node%20%3D%20null%3B%0A%7D%0AProductTable.prototype.drawLine%20%3D%20function%20(tag%2C%20data)%7B%0A%20%20%20%20var%20head%20%3D%20document.createElement('tr')%3B%0A%20%20%20%20for%20(var%20i%20%3D%200%2C%20l%20%3D%20data.length%2C%20t%3B%20i%20%3C%20l%3B%20i%2B%2B)%20%7B%0A%20%20%20%20%20%20%20%20t%20%3D%20document.createElement(tag)%3B%0A%20%20%20%20%20%20%20%20t.innerHTML%20%3D%20data%5Bi%5D%20%2B%20''%3B%0A%20%20%20%20%20%20%20%20head.appendChild(t)%3B%0A%20%20%20%20%7D%0A%20%20%20%20return%20head%3B%0A%7D%3B%0A%0AProductTable.prototype.drawHeader%20%3D%20function%20()%7B%0A%20%20%20%20this.node.appendChild(%0A%20%20%20%20%20%20%20%20this.drawLine('th'%2C%20this.headData)%0A%20%20%20%20)%3B%0A%7D%3B%0AProductTable.prototype.drawData%20%3D%20function%20()%7B%0A%20%20%20%20for(var%20j%20%3D%200%2C%20k%20%3D%20this.bodyData.length%3B%20j%20%3C%20k%3B%20j%2B%2B)%7B%0A%20%20%20%20%20%20%20%20this.node.appendChild(%0A%20%20%20%20%20%20%20%20%20%20%20%20this.drawLine('td'%2C%20this.bodyData%5Bj%5D)%0A%20%20%20%20%20%20%20%20)%3B%0A%20%20%20%20%7D%0A%7D%3B%0AProductTable.prototype.draw%20%3D%20function%20()%7B%0A%20%20%20%20this.drawHeader()%3B%0A%20%20%20%20this.drawData()%3B%0A%20%20%20%20document.body.appendChild(this.node)%3B%0A%7D%3B%0AProductTable.prototype.render%20%3D%20function%20()%7B%0A%20%20%20%20this.node%20%3D%20document.createElement('table')%3B%20%0A%20%20%20%20this.draw()%3B%0A%7D%0AProductTable.prototype.sortByColumn%20%3D%20function%20(col)%20%7B%0A%20%20%20%20var%20index%20%3D%20this.headData.indexOf(col)%3B%0A%20%20%20%20if%20(index%20%3D%3D%3D%20-1)%7B%0A%20%20%20%20%20%20%20%20throw%20new%20Error(col%20%2B%20'%20column%20not%20found')%3B%0A%20%20%20%20%7D%0A%20%20%20%20this.bodyData.sort(function%20(l1%2C%20l2)%20%7B%0A%20%20%20%20%20%20%20%20return%20parseInt(l1%5Bindex%5D%2C%2010)%20%3C%20parseInt(l2%5Bindex%5D%2C%2010)%3B%0A%20%20%20%20%7D)%3B%0A%7D%0A%0A%0Avar%20pt%20%3D%20new%20ProductTable(%7Bhead%20%3A%20headers%2C%20body%20%3A%20data%7D)%3B%0Apt.sortByColumn('Quantity')%3B%0Apt.render()%3B&c=body%7B%0A%09font-family%3A%20verdana%2C%20sans-serif%3B%0A%09font-size%20%3A%2012px%0A%7D%0Atable%7B%0A%09border%3A2px%20solid%20gainsboro%3B%0A%09margin%3A10px%0A%7D%0Atr%3Anth-child(odd)%20td%7B%0A%09background-color%3A%23ff6600%3B%0A%7D%0Atr%3Anth-child(even)%20td%7B%0A%09background-color%3A%23afa%3B%0A%7D%0Atd%7Bpadding%3A10px%7D%0Ath%7B%0A%09font-weight%3Abold%3B%0A%09padding%3A10px%3B%0A%7D%0Atd%2Cth%7Btext-align%3Aleft%3B%7D&l=#preview");
	};

	this.before = function () {
		this.startController = +new Date;
	}

	this.before_index = this.before_flag = function () {
		this.startAction = +new Date;	
	}

	this.after_index = this.after_flag = function () {
		this.endAction = +new Date;
	}

	this.after = function () {
		this.endController = +new Date;
		JMVC.debug('Controller Time: ' + ((this.endController - this.startController) || 0));
		JMVC.debug('Action Time: ' + ((this.endAction - this.startAction) || 0));
	}


	this.action_index = function () {
		JMVC.require(
			'vendors/google/analytics/analytics'
			, 'core/responsive/basic/basic'
			//, 'affix'
		);
		
		JMVC.events.loadify(500);
		JMVC.dom.preloadImage(JMVC.vars.baseurl + "/media/img/jmvc_m1.svg");

		//var newlogo = JMVC.dom.create('img', {src : JMVC.vars.baseurl + '/media/img/jmvc_m1.svg'});

		/* JMVC.require('widget/slider/slider'); */
		// <img src="media/img/jmvc_m2.svg" />
		var content = '<h3 id="samples" class="round8 roundbottom">Some samples</h3>',
			bu = JMVC.vars.baseurl,
			v = JMVC.getView('vacuum'),
			links = {
				//'Model' : 'demo/model',
				//'Controller' : 'demo/controller',
				//'View' : 'demo/view',
				'Canvas editor (WIP)' : 'canvaseditor?v=1',
				'Canvas editor (old layout)' : 'canvaseditor',
				'Cube div' : 'demo/divrot.js',
				
				'Console':'console',
				'Console atom (fullscreen)':'console/index?fullscreen=true&h=%3Cdiv%20class%3D%22container%22%3E%0A%09%3Cdiv%20class%3D%22wrap%22%3E%0A%09%09%3Cdiv%20class%3D%22circle%20horizontal%20c1%22%3E%0A%09%09%09%3Cdiv%20class%3D%22wrap-electron%22%3E%0A%09%09%09%09%3Cdiv%20class%3D%22circle%20electron%22%3E%3C%2Fdiv%3E%0A%09%09%09%3C%2Fdiv%3E%0A%09%09%3C%2Fdiv%3E%0A%09%09%3Cdiv%20class%3D%22circle%20vertical%20c1%22%3E%0A%09%09%09%3Cdiv%20class%3D%22wrap-electron%22%3E%0A%09%09%09%09%3Cdiv%20class%3D%22circle%20electron%22%3E%3C%2Fdiv%3E%0A%09%09%09%3C%2Fdiv%3E%0A%09%09%3C%2Fdiv%3E%0A%09%3C%2Fdiv%3E%0A%09%3Cdiv%20class%3D%22wrap%20r%22%3E%0A%09%09%3Cdiv%20class%3D%22circle%20horizontal%20c2%22%3E%0A%09%09%09%3Cdiv%20class%3D%22wrap-electron%22%3E%0A%09%09%09%09%3Cdiv%20class%3D%22circle%20electron%22%3E%3C%2Fdiv%3E%0A%09%09%09%3C%2Fdiv%3E%0A%09%09%3C%2Fdiv%3E%0A%09%09%3Cdiv%20class%3D%22circle%20vertical%20c2%22%3E%0A%09%09%09%3Cdiv%20class%3D%22wrap-electron%22%3E%0A%09%09%09%09%3Cdiv%20class%3D%22circle%20electron%22%3E%3C%2Fdiv%3E%09%0A%09%09%09%3C%2Fdiv%3E%0A%09%09%3C%2Fdiv%3E%0A%09%09%3Cdiv%20class%3D%22circle%20center%22%3E%3C%2Fdiv%3E%0A%09%3C%2Fdiv%3E%0A%3C%2Fdiv%3E%0A%0A%0A%0A%0A%0A%0A%0A&j=%2F*%20no%20javascript%20content%20*%2F&c=body%20%7B%0A%20%20background%3A%20%23222%3B%0A%7D%0A.container%20%7B%0A%20%20position%3A%20relative%3B%0A%20%20margin%3A%20auto%3B%0A%20%20width%3A%20250px%3B%0A%7D%0A.wrap%2C%0A.circle%20%7B%0A%20%20-webkit-transition%3A%20-webkit-transform%20500ms%20linear%3B%0A%20%20-webkit-transform-style%3A%20preserve-3d%3B%0A%20%20-moz-transition%3A%20-moz-transform%20500ms%20linear%3B%0A%20%20-moz-transform-style%3A%20preserve-3d%3B%0A%20%20width%3A%20250px%3B%0A%20%20height%3A%20250px%3B%0A%20%20margin%3A%20auto%3B%0A%20%20margin-top%3A%2050px%3B%0A%20%20position%3A%20absolute%3B%0A%7D%0A.circle%20%7B%0A%20%20position%3A%20absolute%3B%0A%20%20border%3A%203px%20solid%20%23aaaaaa%3B%0A%20%20border-radius%3A%20250px%3B%0A%20%20margin%3A%20auto%3B%0A%7D%0A.circle.c2%2C%0A.circle.center%20%7B%0A%20%20border%3A%202px%20solid%20%23666666%3B%0A%20%20width%3A%20140px%3B%0A%20%20height%3A%20140px%3B%0A%20%20top%3A%2055px%3B%0A%20%20left%3A%2055px%3B%0A%7D%0A.circle.center%20%7B%0A%20%20background%3A%20%23ffffff%3B%0A%20%20width%3A%2030px%3B%0A%20%20height%3A%2030px%3B%0A%20%20top%3A%20110px%3B%0A%20%20left%3A%20110px%3B%0A%20%20box-shadow%3A%200%200%205px%20%23fff%3B%0A%7D%0A.wrap-electron%20%7B%0A%20%20border%3A%200px%20solid%20%20%23fff%3B%0A%20%20position%3A%20absolute%3B%0A%20%20width%3A%20100%25%3B%0A%20%20height%3A%20100%25%3B%0A%20%20-webkit-animation%3A%20electron%203s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20electron%203s%20linear%20infinite%3B%0A%7D%0A.electron%20%7B%0A%20%20width%3A%2012px%3B%0A%20%20height%3A%2012px%3B%0A%20%20background%3A%20%23aaaaaa%3B%0A%20%20left%3A%2050%25%3B%0A%20%20margin-left%3A%20-8px%3B%0A%20%20border%3A%20none%3B%0A%20%20top%3A%20-7px%3B%0A%20%20-webkit-transform-origin%3A%2050%25%2050%25%3B%0A%7D%0A.c2%20.wrap-electron%20%7B%0A%20%20-webkit-animation%3A%20electron%202s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20electron%202s%20linear%20infinite%3B%0A%7D%0A.c2%20.electron%20%7B%0A%20%20top%3A%20-6px%3B%0A%7D%0A.wrap%20%7B%0A%20%20border%3A%200px%20solid%20%23aaaaaa%3B%0A%20%20-webkit-animation%3A%20lateral%2015s%20ease-in-out%20infinite%3B%0A%20%20-moz-animation%3A%20lateral%2015s%20ease-in-out%20infinite%3B%0A%7D%0A.wrap.r%20%7B%0A%20%20-webkit-animation%3A%20lateralRevert%208s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20lateralRevert%208s%20linear%20infinite%3B%0A%7D%0A.vertical%20%7B%0A%20%20-webkit-animation%3A%20vertical%208s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20vertical%208s%20linear%20infinite%3B%0A%7D%0A.horizontal%20%7B%0A%20%20-webkit-animation%3A%20horizontalRevert%206s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20horizontalRevert%206s%20linear%20infinite%3B%0A%7D%0A.vertical.c2%20%7B%0A%20%20-webkit-animation%3A%20vertical%204s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20vertical%204s%20linear%20infinite%3B%0A%7D%0A.horizontal.c2%20%7B%0A%20%20-webkit-animation%3A%20horizontalRevert%203s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20horizontalRevert%203s%20linear%20infinite%3B%0A%7D%0A%40-webkit-keyframes%20electron%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20horizontal%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateY(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateY(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20horizontalRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateY(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateY(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20vertical%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateX(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateX(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20verticalRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateX(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateX(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20lateral%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20lateralRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20electron%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20horizontal%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateY(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateY(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20horizontalRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateY(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateY(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20vertical%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateX(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateX(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20verticalRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateX(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateX(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20lateral%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20lateralRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%7D%0A&l=#preview',
				'Console cs' : 'demo/cs/',
				'widget' : 'test_widget',
				'Wcave game' : 'wcave.jmvc',
				'Image filter' : 'demo/img',
				'map_animator' : '?map=true',

//				'Console cube' : 'console/index?h=%3Cdiv%20class%3D%22flip-card-content%22%3E%0A%20%20%3Cdiv%20class%3D%22flip-card-side-a%22%20style%3D%22background%3Ared%22%3E%0A%20%20%20%20FRONT%20%0A%20%20%3C%2Fdiv%3E%0A%20%20%3Cdiv%20class%3D%22flip-card-side-b%22%20style%3D%22background%3Agreen%22%3E%0A%20%20%20%20BACK%0A%20%20%3C%2Fdiv%3E%0A%3C%2Fdiv%3E%0A%0A%3Cbutton%20id%3D%22button%22%3EFlip%3C%2Fbutton%3E&j=%24(%22%23button%22).on('click'%2C%20function()%7B%0A%20%20%24(%22.flip-card-content%22).toggleClass(%22flip%22)%3B%0A%7D)%3B&c=.flip-card-content%20%7B%0A%20%20%20%20position%3A%20relative%3B%0A%20%20%20%20margin%3A%20100px%3B%0A%20%20%20%20width%3A%20200px%3B%0A%20%20%20%20height%3A%20200px%3B%0A%20%20%20%20transform-style%3A%20preserve-3d%3B%0A%20%20%20%20perspective%3A%201000px%3B%0A%7D%0A%0A.flip-card-side-a%2C%0A.flip-card-side-b%20%7B%0A%20%20%20%20width%3A%20100%25%3B%0A%20%20%20%20position%3A%20absolute%3B%0A%20%20%20%20height%3A%20100%25%3B%0A%20%20%20%20backface-visibility%3A%20hidden%3B%0A%20%20%20%20transform-origin%3A%2050%25%2050%25%3B%0A%20%20%20%20transition%3A%20all%20.5s%20ease-in-out%3B%0A%7D%0A%0A.flip-card-side-a%20%7B%0A%20%20transform%3A%20rotateY(0deg)%20translateZ(100px)%3B%0A%20%20z-index%3A%201%3B%0A%7D%0A.flip-card-side-b%20%7B%0A%20%20transform%3A%20rotateY(90deg)%20translateZ(100px)%3B%0A%7D%0A%0A.flip%20.flip-card-side-a%20%7B%0A%20%20transform%3A%20rotateY(-90deg)%20translateZ(100px)%3B%0A%7D%0A.flip%20.flip-card-side-b%20%7B%0A%20%20transform%3A%20rotateY(0deg)%20translateZ(100px)%3B%0A%20%20z-index%3A%201%3B%0A%7D&l=http%3A%2F%2Fcodeorigin.jquery.com%2Fjquery-1.10.2.min.js#preview',
				'Some fun' : 'demo/flag',
				
				'JMVC Logo plotted' : 'demo/logo',
				'Google' : 'google.jmvc',
				'Google flash' : 'google.jmvc?flash',
				'Google aberration' : 'google.jmvc?aberrate',
				'Observer' : 'demo/observer.jmvc',
				'Sheduler' : 'demo/scheduler.jmvc',
				'Effects' : 'demo/fx.jmvc',
				'Key' : 'test_key',
				'Grind' : 'grind',
				'canvas ext using 2d lib' : 'test_canvas',
				
				
				'direct&crypt_image' : 'demo/direct',
				'Tabs' : 'tabs/one/i_say/Hello%20my%20Guest',

				'modal' : 'test_modal',
				
				'cubic' : 'cubic',
				
				'neverending carpet' : 'carpet',

				'* strict' : 'test_strict',
				'* obj/bucket' : 'test_bucket',
				'* obj/deque' : 'test_deque',
				'* obj/date' : 'test_date',
				'* lib/array' : 'test_array',
				'* JMVC.util.findRich' : 'test_arrayOp',
				'* lib/crypt' : 'test_crypt'
			},
			style = {
				'body' : {
					'background-color' : '#fff',
					'color' : '#000',
					'padding' : '0px 30px',
					'padding-bottom':'100px',
					'border-left' : '50px solid gray'
				},
				'ul' : {
					'list-style-type' : 'none',
					'padding' : '0px',
					'margin' : '0px',
					'border' : '0px'
				},
				'a' : {
					'color' : '#AAA',
					'padding-left' : '1px',
					'text-decoration' : 'none',
					'line-height' : '20px'
				},
				'a:hover' : {
					'color' : 'red'
				},
				'#samples' : {
					'background-color':'#ff6600',
					'font-size':'20px',
					'line-height':'20px',
					'padding':'10px',
					'margin-bottom':'20px'
				}
			},
			tpl = '<li><a href="%base_url%/%path%">$index$ %label%</a></li>',
			out = '',
			i;

		
		for (i in links) {
			out += JMVC.string.replaceall(tpl, {'base_url' : bu, 'path' : links[i], 'label' : i});
		}	
			
		content += '<ul>' + out + '</ul>';
		content += '<br /><b>* real test</b>';
		
		JMVC.head.addstyle(JMVC.object.toCss(style), true, true);
		
		v.set({
			id : 'content',
			style : 'font-family:Verdana, sans-serif; font-size:12px;',
			content : content,
			index : '&#9826;'
		});

		v.render(function () {
			var fromtop = 20;
			JMVC.head.title('- Foo me a sample -');
			/*
			JMVC.affix.add({
				html:'<strong>Affix</strong><p>Try o scroll, this will stop scrolling at ' + fromtop + 'px from top</p>',
				init : 68,
				min : fromtop,
				'class':'round8 roundleft',
				style:'z-index:60;height:300px; width:300px; padding:10px; right:30px; border-right:8px solid #888; background-color:gainsboro;',
				where : '#content'
			});*/
		});
				
	};







	/* test a VIEW*/
	this.action_view = function () {
		var v = JMVC.getView('test'),
			v1= JMVC.factory('view', 'test1'),
			v2= JMVC.factory('view', 'test2'),
			v3= v2.clone('test3');

		v1.set('result', 'ok1');
		v2.set('result', 'ok2');
		v2.set('result2', 'ok2bis');

		v3.set('result', 'ok3');
		v3.set('result2', 'ok3bis');

		v.render();
	};
	
	
	


	/* test some MODELs */
	this.action_model = function() {
		var _p1 = JMVC.getModel('xxx/Persona'),
			_p2 = JMVC.getModel('Persona'),
			_p3 = JMVC.getModel('Persona2'),
			tpl,
			al = '',
			v = JMVC.getView('vacuum');

		/*
		get model instance
		_p1.set('cognome','Ghedina').set('n',1);
		*/
		_p1.set({'cognome' : 'Ghedina', 'n' : 1});/*.set('cognome','Spaceman',true); */
		_p2.set('cognome', 'Ghedi').set('n', 2);
		_p3.set('cognome', 'Ghe').set('n', 3);
		
		/*	console.debug(_p1); */
		tpl = 'Modello n°%n%: %nome% %cognome%<br />';
		al += tpl.replace('%n%', _p1.get('n')).replace('%nome%', _p1.name).replace('%cognome%', _p1.get('cognome'));
		al += tpl.replace('%n%', _p2.get('n')).replace('%nome%', _p2.name).replace('%cognome%', _p2.get('cognome'));
		al += tpl.replace('%n%', _p3.get('n')).replace('%nome%', _p3.name).replace('%cognome%', _p3.get('cognome'));
		
		
		v.set('content', al);
		/*
		console.debug(v);
		v.set('id', 'nerd');
		*/
		v.set('style', 'padding:5px; border:5px solid red; font-size:12px; width:280px; background-color:white; color:green; font-weight:bold; font-family:verdana, sans-serif');
		v.render();
	};




	this.action_modelviewparse = function() {
		var p = JMVC.getModel('Persona'),
			v = JMVC.getView('parse');
		p.set('name', 'Fredrich');
		v.parse(p).render();
	};





	/* test a CONTROLLER */
	this.action_controller = function() {
		this.set('nome','Federico');
		alert(this.get('nome'));
	};





	this.action_controller2 = function() {
		this.set('nome','Federico2');
		alert(this.get('nome'));
	};
	


	/* just to celebrate a better time */
	this.action_flag = function(p) {

		/* color extension is needed */
		JMVC.require('core/color/color');

		var nation = p.nation || 'ndl',
			nations = {
				it : {
					w : 9,
					h : 6,
					strat : function (i) {
						return i % this.w < 3 ? 'green' : i % this.w < 6 ? 'white' : 'red';
					}
				},
				ch : {
					w : 7,
					h : 5,
					strat : function (i) {
						return (JMVC.array.find([10,16,17,18,24], i) >= 0) ? 'white' : 'red';
					}
				},
				ndl : {
					w : 9,
					h : 6,
					strat : function (i) {
						return i < this.w * 2 ? 'red' : i < this.w * 4 ? 'white' : 'blue';
					}
				}
				
			},
			opt = nations[nation],
			links = [],
			style = {
				'#links span' : {
					'font-family':'Verdana, sans-serif',
					'font-size' : '10px',
					color : '#666',
					margin: '10px 10px;',
					'text-decoration' : 'none',
					padding:'5px',
					'line-height' : '20px',
					cursor : 'pointer',
					'font-weight' : 'bold'
				},
				'#links span.active' : {
					color : '#aaa',
					'background-color':'#333',
					'-moz-border-radius-bottomleft':'5px',
					'-moz-border-radius-bottomright':'5px',
					'-webkit-border-bottom-left-radius':'5px',
					'-webkit-border-bottom-right-radius':'5px',
					'border-bottom-left-radius':'5px',
					'border-bottom-right-radius':'5px'
				}
			};

		JMVC.head.addstyle(JMVC.object.toCss(style), true, true);

		JMVC.head.title(nation.toUpperCase() + ' beat');

		JMVC.css.style(JMVC.WD.body, 'backgroundColor', 'black');

		var v = JMVC.getView('flag'),
			mode = 'grow',
			box_size = 1,
			factor = .8,
			top_fact = 80,
			els_top = [],
			i = 0,
			w = opt.w,
			h = opt.h
			l = w * h,
			recall = function(ll) {
				for(var g = 0; g < ll; g++) {
					els_top[g] = JMVC.util.rand(10, top_fact - 5);
				}
			},
			back = false;
		
		recall(l);
		
		back = function (s) {

			JMVC.head.title(nation.toUpperCase() + ' beat');

			opt = nations[nation];
			w = opt.w;
			h = opt.h;
			l = w * h;

			var basesize = s || box_size,
				f = document.getElementById('flag'),
				boxes = [],
				tmp, j,
				fact,
				opac = Math.sqrt(basesize / (box_size * top_fact));

			JMVC.css.style(f, {
				width : (basesize * w) + 'px',
				height : (basesize * h) + 'px',
				margin : '0 auto',
				zoom : 1,
				opacity : opac,
				'-ms-filter' : "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + (~~(100 * opac)) + ")",
				filter : "alpha(opacity=" + (~~(100 * opac)) + ")",
				marginTop : basesize + 'px'
			});
			
			j = 0;
			for (i = 0, l = h * w; i < l; i += 1) {
				j += 1;					
				tmp = JMVC.dom.create('div', {'style' : 'float:left;width:' + basesize + 'px; height:' + basesize + 'px;', 'class' : 'box'}, '&nbsp;');

				JMVC.dom.append(f, tmp);

				JMVC.css.style(tmp, {
					'background-color' : (basesize > els_top[i]) ? opt.strat(i) : JMVC.core.color.getRandomColor(true)
				});
				if (j % w == 0) {
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
			fact = (mode == 'grow') ? factor : -factor;
			
			window.setTimeout(
				function () {
					f.innerHTML = '';
					back(basesize + fact);
				},
				25
			);
		};
		
		v.render({cback : function () {
			for (var j in nations) {

				var os = {},
					tag;
				if (j == nation) {os['class'] = 'active'; }
				tag = JMVC.dom.create('span', os, j);

				(function (y, tg) {
					JMVC.events.bind(tg, 'click', function () {
						nation = y;
						JMVC.dom.removeClass(JMVC.dom.find('span'), 'active');
						JMVC.dom.addClass(tg, 'active');
					});
				})(j, tag);
				links.push(tag);
			}
			links.push(JMVC.dom.create('span', {}, '?'));
			
			JMVC.dom.append(document.getElementById('links'), links);

			back();
		}});
		
	};

	this.action_direct = function () {
		JMVC.head.title('Crypto image');
		JMVC.head.addstyle(JMVC.vars.baseurl + '/media/css/flag.css');
		JMVC.require('core/lib/crypt/crypt');
		this.render(
			'<div style="margin:50px"><span style="color:green;cursor:pointer;font-family:Verdana, sans-serif" id="see">reveal the image</span></div>',
			function () {
				JMVC.security.seed = 213123123;
				/*
				original base64 image data (my linkedin profile image)
				imgdata = "here the original base64 embedded image"
				*/
			
				// this could be obtained(with seed 213123123) from imgdata
				// executing cryp = JMVC.security.crypt(imgdata, 'colcazzo'),
				var cryp = 'ÅÛĉÅÈîîóéčùàæĔîä×ĉà×Õþîä×ããÅÆĤïæ×ãôÚÖîþç×ęôÛÖîþèØóôÝÖĤĤëØęĂÞÖĤåíÙęĊãÙþåõÛĊäæÙÿîöÜĊĖîÙĥþăÜôàèÛðòûÝĊĖúÜĥåĈÛĚĂÿÞðöćàäĖûÜĥäÑÈęáÚÕþĂèØóĂÝÖĤáëÙãÓûÚïò÷ÞĊÓûÜĕáćÞĊÓûÜĕáćÞĊÓûÜĕáćÞĊÓûÜĕáćÞĊÓûÜĕáćÞĊÓûÜĕáćÞĊÓûÜĕáćÞĊÓûÜĕáćÞĊÖÅċîîôÙãâÅÕùåæ×õè×Õĕòä×ĚäØÃåþãÞęà×ÕþĂä×óäØÕþòã×ãà×Õîîã×ãäÙÕĤþèØĉĂß×þĜîÅÚð×Ĉÿîã×ĉäÚÕĤöç×ęôÜÖîþã×ãåÏÕþöæ×ãðèÖÿöĊã÷äÝÙÞóĊØěéĎÚñøäāăäßÝÝøĚčôõéÄēîčãÔéďûĔĘíÜĊĂïÛÿĜĎàċĂąßĀĜÒäöøÉãñĘØçÒñÜæĘđëé÷ďêêóăùìÓćðëĚûčðùùĄõôęēùÕñÇøěđÖûúĐÚüöĄéþÖĈàýĝøöĂìöíĀâĖüăēêĀĄøĄďĆØĈĆąğøĜĊîöÈĈäĖ×ċĕëÚČúąéĎÚĉàčġùöÇð÷íÅæėüÈėçÿÈØāĎËėąąÊĒğĚÎĘïÆÍēďÕÁòčÌÃåþãÞęä×ÕĤòä×óäØÕþòä×óà×Õîîã×ãäÙÕĤþèØĉĂß×þĜîÅÚð×Ĉÿòã×ĉäÙÖîþæØãĂÜÖîþã×óéÉÕîòå×ĚäÛÖĀòĚØĊéØéþđĊùôìÿáĜòëÜçêèăďõäÙõìĐéģîøïĐëè×ĕĆčäñäĂÌÿĐûÝôĎăÞĦĔĒáČôÈâħĔ×åčíÛæĂćêéçċáéÞÿøìĎăïëăĝČðéõăîßĕĒ÷ĐíÆøąćÕûêċÌûĜüçþûĀÞýöĚíāĒîëĀćĎúăìČ÷ăĞüčĆăĀĄąøĚēĉĔîÆĈďĎÕċîČÌċĠýçĎąāÞčúěíÆĖïëÅđďúÈðč÷ÈĢýčËćāĄÊüěēÎĘïÆÍēďÕÁòčÌÃæĜãÚãìØÕîöô×Ěä×äĤñØČĚĈýÈĝúÒÆďĒýÚüøöæĘĈāÞôú×ÞêĕîâØ÷òÜĆċąĈâñĄéÑîÎāĀĤĚýēîĎÃýĖĊċęÏĈĂĀòĔýčĒ×ÕĐõìÌĈôÇāąüĘ÷òāØÃûģÖĂïĀĂāôĐďČëëĀČĕđĚÉÍďďÞùģõÍąÖùĂäĜæðäėÅĉėõÖÇĜċÅúħàøďÚÏĈĂĒà÷úēęùČßýćëÚõ÷ãåäôâąĂâÛ÷ôąÚíĆÞ¿ġąðæÓđêàØĎùåÔĔāøĜĠĎĎČæØÄãěØìÚÕà÷ĦùĐËČęÇÉãÞăĊĆóċíăĎñáøĎčÃĤïÙØØÏċ÷ùõÒþéĘċûđôøÆòñþčñāĕïØÔÅÙăáìðćêÏìĠáôÞĄÒÆýÿĝÛÆüÖÇăĄēČĈùÓĆÛĆàÙĄąìĄ÷ĜďĐÈäåìĎĕĆÛćðàÏÊåäÒæÖĊØýöæöĊåðÜČâĘëĐčÎéĈėăĈÞùĊíĀĘęěÞîÊðÍÞîñùÍØæāðĥÓĆëçûāôÿôÇòÔÎêâÿēîĚëċÛ÷óĐøíåÏìýûąÍćÊäâĐĢĎïéÖÎĈāßúĀèòËüĆæěĄĘÖ÷ÙćĒøÜêÊÆÅćûÙÊėÏíÅàïĔÈïĊúåüāúþðėćêâđçûĈăĐäæąðãïĐûĉāĀ×ăęÏæëğÜÖāØùÛáĄåąĉĚÕùØóĆñąĈäĀéõĦĖĊăĎýäÿĖąăėá÷æñħĐÞĘððÚõēĔéėîËÄóæÖČÓĘÊ¿ăğĕąò××îğóėúóĔËĂ÷ęėðúéÌÉĐÞäßćîĊêßĆ×ËðàĈÿĥĘěûôĊÆĄùîüćėæÁößĝÙéã×ëÕāïÔåñĖćêþĝêà×ĐććĜîĚÍÓéÞĀĢæãÞÒ×÷õēÝèÝöõêêďġĄæöÔĈĀĖĢëÇěăĎċïĄÓÍçĎć¿÷ûüĊĖäÆÉäĞÖøđãĊìÞûćØØÎćéĢĜúÆÛÔåÉđâéà×ÖÚ¿ęďòĀČėØäĞÞÚčîøþÖïăøåøÊĊ÷ĞãĕùĐéĈÞĢâóþĄïëÍÿħõÜÍĂāÉĝėÚÛÒĖĄÝħĂĉéĎĒá÷ĐĚĎÞěĆãĎĆæēýÚĖïČĚĜĒàĆęÛÙæøçØûĄøÜîãĈíč×ËČė÷ìåòöćăüĄØúēąċÉâûãÜĒëĂĈãâûāĈöĊąßĢÖâėĖíĎĢõëïðċíČÝõĘîñė×ÌØØíĊóìïöĕÿĉÏãĀÛ×ùûĜÜ×ôÍČïġÍÆÖÒÚăĎĔíĄÒíøÿĂĂøÈđĊíáïĥĉäĉØèçĦĎćØĐĉÿāúĤéëÛĒÆÄĔæēÉöďÊąûġñĐóêĎýåėĐàĒâíĎĤāùďĆîåßėďöĀČå×ëúĜĕĎêôÆÄĠĐÚāøĐĄèßöĒĀăĂÉèóîùãÒìùøēĝóíëîçßģěöÉĚÏÅçĚġĒÍĉăÚåóĖčíìďÉāûėãĐøĉÍØöñÒäãĒðÖÝĄĉâêÏÅ¿ï÷ÛćÚØÁßĄĜúÎèĕÝąĀÿÔĉïĆáÿğ÷ĎËòĐåċğģĄċøøøëĄăÕìèñéČćėĉâÙČČĂėĥøĈèÒćĉĞĀÕÜÕĂäáĐĘìĄđĐÏåïăĜïëĆÿûåÝĕčÙçĈæ÷ďĖÆĚõÅçĤĜĖãç×ĄāĝćùëĆćëÕĆĂĖĉØØĉÅĂęĊúôĖČÚđòĚĀąăĉÅăĚČëĐÑąÕâĢúùéėÿăęñĕûĎāÆĈĝôÓäõĘĀéåÝãïØëßČĤîôÿĔôìĄöÿčąăÑßăöÞñúĉĐËÙĞĔČąïô×íåóĊàĕáÙĂğÿąčõëßÛđüäÇÖđĆíðĝëďäóÍ¿ßĀùďčèÏßïßïüõùČßĚðĔďĉÔčßãþíāčĀċüïĂČßĔęÁããúøÆÒóĉêøõ×íÑďîöØóĒÇėēáÖáñëÈåĕĆÃěûãÆùïáÜďÝĒČčÎËČăÝĔýÒČÆøñĥóãĒÊéäāåØÚåãÌêďßãĄÓĎÈÍĔïóØõåĉäĎĘÍĐĔÕìùøîąÆďÏúçĎîíçĖćÇČĚĘăÇãïßÊÞĜäØČčÎÊðĜĚý÷àðĄġïÑúđíąĉĒĚíÆĖĕÞÌãāûĊåàÍÇáĘÕĊĘøÁÙäĚõûòęäÇĦĜĒÌèĔąĎäĐĈĐĔÔÎàâęøçäēàËđøÛčÍíãèģáëúÓïÁąěÿċæúĐČÃĠÞćÜôĒæâĦñĜêĎĔðāÜĝÚĎÔāØ¿đāõãöĊ×Üýğøíę÷áÌĐĐøðÚēĉþæĎóďïéàĂüþíÚåėÁÌāãÚìëęþùñßðÚÕäðìĔåÒ×óĕÝçúîďăĔâčÉďğ÷ÌñđùÿÜĀĊĆčôùÈĜïåĆéÑçÕñĔÓãèèçÉïóøĐąêîÕïõõĈèĕúàĥęĊĀđĀØþäĐêĈčÐûêĖÞĘßéàĎþýÞēáëĖêîôæóûÕííÞğđčĊÔėÆÝĦñóäêČíĈĦĠďĆõìČÜ÷÷ěáØĕÊùąøĘå÷ëßÕáĥčā×éØÊĆãĆáÖĕĎßäĝćďðęċÖýĄĖüÖĂďĄýáēĀø÷č×ĢåæĊĐçäÕĢĝØć÷ėÇÖÜôďÜąõåċĦúÛÁÛìù÷Ăóçðêæ÷õðüÓæëÓĆĉàėòûĉáãíâĜÔýÛÕúĂîãÒÉëėý÷Ăîí×óĂÊÉĝøñûñìÿÿ÷ôĈ÷ĉáêÄħÿĚÌ÷ĆæĆÿěèÙãÖøÈěĄæÌČÓáĊĜĘîøÖċÛąĔđÛČìęÁÛĎØćøðöāĉîěąĄĔ÷ÆÇáĖÓÝĚÏĐç÷ďČëąČØĊàćóúúĘÙáðģĐáęĈìøćĆãÛíæàČĖĞčçĖĉíÕĄÝĊÉòĆ×Ø÷æØËÍ×ÇããĎüĄČÓÝùïĄĒĈĕÑçÙÜĕĜĐúíîêĥùčĈéćßÍĕÞēçìéĊêģăûĉě×ëýĎĤÍäĜâćÄĎāúÛîĔÍàõġØØČÐćĀ÷ñíÝÔĆãèěõĖçäÏäĆēĚûðČøÎøĞĀ×ċĒĎĂÇûĢĚÅùďæÖæĞêĂüùãöġġĄûēÕøĈĠąĈ×ÖÖëÕėėîČùđþÖåěäĈñąíĈÿĘñÇüìïąýăëĆÑíàêñėòçøöĉăùĘĜĈĘ÷×ÞâýúÿĉùćëÞÜēðûìàćáâęÚúĄÁ×æćĘĈØõøçæĘúïđÊîÉĐòÓĎçíĂøĀúûÊĄôêûæôóøù÷ÉĆĂÝøøěÐČÝĖĦĎÞøćÇÊÝĔîæĚðÆÄßęÓÞąêċÚĘæÑĈøąÊçĄćďÎöďãĆćòõåÔîÅÝĥÜñċďÊßÄĎąÕþØÑĂíĔúčý×çüâćěęĐÓãéÍñÞãĎúÔáčàćçùĄêåêâáĜÁðìÚÄÞĥÓÏĚôêøøĚčÝïÔÜåĘåĆĎóôãíåĂÒÁĘÔÆĆõüćÙăîćÈãĂãèĖĉĈÆĝúąÎêēêýĜæØ÷ćáýûÝîíÚÙÓĆ×þĒąÆćċ×Öõüí×ãØæąĎú×øďċßčÿĀçðØÏßØđØñāĊóčČĎĜåèďÖÞÝäēíÉÍíûçĄÿïìØÊËûĄøĉËòĕîöĒûĘÝðēÊûĠāĒÆąáÈÚĤĦěÞÍåþĂõåÚìęèâÜăġėÙãåËĎāęēďåØúČĖÿċíÙÊĂéĝöìïÓÎúČøĤêøĘöāČïĆæĀÒĐðéþĒĐÞØÐßÜûĀĒùěçÙÆĞğØÛÒÑæçĝĀÑăõòÞäĜüĉĈĒùØÛîôíĈøöÎĉáò÷áĘëÞûøüÛßçéąéýęÕéÙñÿĉĚęôðîñýÆðúÚËĔëÆĉüüñãõĘÅßÜĆøĉÔćĀĉöħêāãČăüě÷ăĎÖąÛÆćĜČĊòøúßĤėĒìÙàčċĖĠòùąÐÈùğàċíčĕĂçĞĒôčăĐèìĂāčÎċćýîĒĘę÷ĐæÌĈâøđæúăîåÿĥéïċñÏüĐæęáëãÝÆñĤôĀĔôčÝėďÛÉĉđÌùęðãýÚùăâēñđÿĄÔêĉĂåĈíėëċăäđĄÍõùÍøĦäĔãēĘüìđĘĈĐĔēæÜóĠîĄóçúùĖÿÙĉÑĈæÌĎĥĈþĔďÙÊĔÝèÉñďãéòĕĎØëÓøÛîý×ÅĒó×ÍýĘòàĜÕăăôæÑíĒçćÞħĔÚÎÛćçéú÷éêÓçäÝĐâĜăĉÔÅßĔĘčÎûÕëÕïâÖÞùČāùĝħõāćċßùęîäĐĐàÅ×ĕāĚÿĎàÌøøðæĄċĆØÚħĢØÆĘóĊçäĐçùÚÏÞþ÷ûå×ÚÑúîĝõåØöĊĄýğġÕøĔâÊā÷ýďÜąìæċõûăÈĊë÷ÇĂĜòÝôôÉþüßõÈçäÎÿćòìçČąĀþđãêÆđèĉ÷àùąþöÐćÝąßñÙćêĆìäĚñçēîÅâĂćĒÞÚĕàăïóÔÅęáìÝïîñÚÒåãÄĞĄăÙûÒÎÄýĚĊØčéăćĚÞóĐöåËÛáïęæćēĎâĤĔĚĄòēĀýĘĥĎĆĈäÆêĤĜäÿïùÞÜýóăûČÊàËĀßČúÕóüûòåĆ÷ÖđëËćĦõïęÑüåðĚăêĄ÷Û÷ěäÖÛüÕðĄîđöĈďĒĆĆęĘĈàĖďßÆÿĠĊÈÖęîäþàÒĊĔíË÷ĕħÙÇĕĖćâě÷ØÚèùÝĆßåñÎēù×çàāĐĆóáĈÆĄĝ×ÝÒïďùĚñùąĖÎĂÙĆġČàêíùìĝĖėċóóāØėûĄãîìùČåĠïĀĔðØÆôĠõÝúðČàĥěćďîĆúČě÷êÌøÏíûßĎÔĂĔîĉ÷þėċ÷öä÷ûĐĆãÞòÔËĆĚ÷×ðđØæćĜÝĖðĔĉüÝĐØùăĆĕÞÛāØðúĊøÙõõāÖßĒėÿæăâêĆčĊÅÅĝĜăÞïĂĊéďĆðæĄđý×ĜėĐäïøþÜýġõúãĂëË÷ĝñÏãâÚÌøðïăčÖÆăãÝãáäėéûĐáĚêìéÛþõħĕØöóúċöĢùāúçÇăîęûøôĊÇ×äúÔìùĎîÅðÞčÊçĘÅĂĀĝąÈÖÔÎÅēħđ×ÚĐÎäãßÛĂñćïÉîýĔîĖçþĉÜĠĖíĖõèÈÝĘæ×çĐÊØîÜĐîĜĄÎĉÞĠ×ËĔÏâÈĀĎÕåÑĈÙ×ĥđĘāĄďÁÚ÷òĕúÖÖĉĊĠąċáÙĆ××Ĝ÷åëãç×ÖâõÚÌęàÜîđĢòĈúĎæČĝġÓþÓĔÙÈĂĔćðĄĉßÍĤĀíÎÛÒïčñĖĉèæĂíĄåĠđĄäÕÿćĚãČÇćĘċÕġĤÚþċîäĄāĚėýøČàéúðôíĊĂÝÚğđøĂæĉ×Èöä÷ýôĘĀčħĘčĆîĂä¿óðěĐïĆðÉĝæÕø×êÉÜěĠÒ×æïÝÇýĂČØēéĈĉĦàĊëíãÉäûîĜÝìÐíåďùóÉëÒÞĀĖúãìûÎĉÆâġęÝėÔÉùĂėĐàĜĈċĄÝØÙþïøÙÕüþñûñêĆõĤđęìĉîùÍĎîíÏĊæČ×ñÝ×ćÓøáČěßÖÊĜčäêäýÛÈĔçßąäĝÑÉċÓËÉîîđ×ÛëÎàÜùĒÅäÓÌÅĜĢóãæĉĈëďáĄØúóĂéØęúîòíëáÿėěê÷ùĎþğħóĎÛÕĀàĆáĜçïĂêĎĖėëÌÒėçÄėďûÁöòéæąöÖÛüí××ĠàòÜïĊĄ×÷ĢìćðÓÍĂ÷ÜĆăēăÇÜüĦïæíāāéîĐĆÊÛ×êĆďćČþčèïîäÞĚëĐĈÈÊęėÔÁĆĆÅëĢĜÚéÍåðĆßáïþČĂÅüąúÕæĊâúãÿðÖÅåćÙáÞđćČęÔðàĝĢĘĈ÷ĆÎæĎĖäÅęàüèòÜùÿúĖÍáĕáČùãĄÇåûĜĕÿÑÒþÍĎĆĊàõãĎĂĚģõüĉë÷åāØëÈĎčÊùûēčĐúċčúĢĒòéėĖÁÙĘæÚæèØćĈĠâ×ø×ėÈČãÝĉðØčÎöáåØþĄăÎåÜÞðû÷ĕßé÷÷òîđêÏþØûčâČÖÚáÿåĒþíÎçþěØĖûïÒąÆĦđñĂìĈèùĕöûĈĚęÍêĞØúßÒøØċĐåĆåăÔďÄĢĤčÿčĉĀäûđäøØďÛýĞØãüĄíßîñĐăÚ×ÑÙçĞěÒËēêâċáĝñèëćåùĤãøąöĀĐ×Ēăû×ČđìâæĎ÷ããč×ÊåĂĉâčíāÝóðôĀąïëéħĂđçēčûÖÝãøÞäđáÜėüùÍøôÇäĂĕëÈèèàâîòöÊęĐĈÅýĀĖĈęØøúĎ÷êïÚéÚÛąĆČÇÙąÆĆĚĂďâĜćçøħâÑÙĘõČüğĜĘĄćçĊìęøĄÎùđØëĥÞĈÍÕØØåġþðÚęÎĄ¿ħÞòßÍēîÞñÞÛ÷ĒÕ×ăûĔĒË×ÎíĆďėÔËēĊëæúĒñáċùćÿĆĆØìéĖď÷ĒġïÙÕďÎùāģðîøøýĂøĞĈéđëëöĆĥ÷ċôð×ÈØãæäãäðÊĥėÚćûęúÌåĂďÎÛĉçÖ÷âðċĚÎÇíĝğùäčĖčÄþÜíāøÎíĂďØòûĉâØĈõÝÓčĈÒÙĂãğ÷ÚÍçĊÞĆåęĆĐÎúąåąęØċċÉ¿ĜĜóÞěćØöāąäÊÙ×ÿĉĠåðíÛÖĆââñî×Ö×ÌÉđďćâê÷ùÉĥÜùąÙâæèæüòăėÎÈĀęãąÜ÷ÎĎąæĜùĆêôæýõáĆÚēĐèĆĞòñÇãìüČĖĘëÁČąÞÛĖėúäæĊĉÄâĢëþėĆàËġėĒÁñêÁøđćĖðîĄÌĀĕěČ÷ñõÙåãòûßòďîÅïüùâĄĆåõáğÖþÍãïäòđėøďÐÈċĎĘĉÊĄçďčØĥÛÅćĐ÷ÙēýąćĕĕáÿòñĒëî÷êûïþćĂăöćÆđĥĒÇÖØĀùĤýäæéĂãþĐēĔÉĔíăýĂâòØēāÚæðÞÔÊäæÌăħýëèęÎØąôĒðĂ×áÍÄÞòûÞäĂÆüęãÓĄčõĉĀĠĆØðēóÍçħĘēþÍďäéáÝčĂďöÝÝûö×åãĎØÞýáøÌĊÓÛ¿ôûÓúÍ÷ûõåĄĖąñĎþÜØĠĄÌÍċ×þøØêÉĊĈÁÅãäøïëĘĉßěúĕÍæÔìÜæāúÆòĎÈĂĄßČÌçØĄÕðöđÊùĘíÊĠĐąāÓ÷ÆýħġĆåĖèÍëħġÒýĊðùßĜãÍËÛĀðÈÞÞç÷ĄÓãÅĒåîøĈëĉÉđģÓÈÚõéêĔÿ×ÍÚîÍÄàěĊăÕøĊÌãĔēçöÕìĊģåãĀúĉÅÕööÓčùæăČÿúĚØäęāÜĝąđÁĐÊàøûĢ÷ßĎċÎĉþĆĜċÖęÏßĀĆĜëüĀ÷ąĘĢäĎ÷ĒøČħùĘþčöèèÝøêùæÊìßĖÜĘåďêïÚĝÿĖĀèíÞåĚĝĆąíĂÇÛÿã÷×ïøëÇĝāÔĐöâáÕîòÑýí÷ùæħěðàÑêĀĄĘæØ×æĂüçĔĢÔåĖêêÿĘÝÒĄèâ×¿đòÔÁ÷ñĀĊØđñÎêÒáæØýÛÛďïÁĆĀæČåõąèąĝąąËøïâéěĘąăđÎÚÇýĖúêĊÑÎÍĐēĐéóĉÍâĀĂèçóðûßôîëďäęìØāĀĚĊûĘêĂâÿøĊõĄåÆĎĠôĐĘĉøċėĝÕÿćĘáèğâøÆĉÎùĎĜýďëÍÎćßåïÚêÍçÏèåüÕĀùČąċäĂĜÎčĐĀÉõõēÚúÏËąăâü÷ĆāüõđþėßÙĄâćąüåÉÒçù¿ĤğĜĀĚíÊčėÞñúĆíýÄïěĕÝñçċĆĦöĎùûÔáăüþĈüðòčäïğĖÎ×èÞ×ÞÝòýÙĖØÈĕåõãčĐçÛħĠČďĄĈùÙîėÑ×éñÇâđąđÁđÊ×ø÷å÷þîĕčÅĒóðÊÔęêáąĀðċĘÒÚÄõöÛêúēÈāħĄùąùôúČĝĠÚëÒæåäøöÍîÔĖåĂÝĜĕýñòÎÛØîÛÞÚíąØïòĄÿÙėÎÄåĤěùÍÒĆ¿óđĆÜçĄãĂãÞûíðôÏáðęì×ÖååċïôđÜćĀÅĈòãĜÏČ×ÝâĝĠĄāòĄéßĕĤćčñóÅÕòğÒûÖąďăėöÕçæéĈÉÝØòåĒòîāĢþùËĄèçÿĔćÑíčÑäÜöĄ÷čČćë÷åēĜĈöĈÇÞïõĖāČøĊþĔĔÓþÔĊĄčĔćêØãííåĒñØÁĖðãĈĤã×ćéċÉæęĠîċăéÙùĔďĒÁèăðăēĥðČëÑìöØðñË÷ĂøüåğĈÊøĖãÊĕĠ×ÞõĐÈçğâäßðâïÜÝēÖûÚõ÷âğĎĊâćąďÉĠĐĚďąçÎØàğüúïãåØĖģďÝÒĔĆíôñĚċøøú×ñĖėÌÚïüÙāĂÙà÷ĈċÜòãæĀ×ÎÎõĞáêĉäáÏßĆÿĜĐĚ÷àÊēåãÛæóøĂîěċûïØďĄĦøØÙęÐüèďåæÍðăąČÜĢčÊòÕÆìîġĐÝñêçÈâïĒËéîûĂĝĥöÚÓïÌÄÝîçĀìďÙæàã÷ÛÒÏāùġúæËċČïÿåâÍĊìĎÎčĥĒëĊðĊùþĎġěăĈęÜæĠĐÑÅĔĐĂ÷úăĎèÓáØêĤÿČÈ×ĐëÖæĠă÷ďëìÚýĂíåĐÏĈÚåđćâîçčĂĝàĐêãóîþÜãċ×êċĀÊěÝĒÉĊÎîÖĒĎêĆûēùäĒąøąčĘþûþĞÑáåò÷ÉďąÑ×ãòÁąàďúûđÒĄĂħýÕÌããÆÚĂĀČþĖëÇĊĂēçíēĕćëġāď÷øČæĀÿáÍéïĂāÖÿßĄÉĔďĆÝþåôëûèøÉāĢ÷ĄòĒčĎäđöíðĐîüØąóâĎùÛßĦøÙØåãÉÍĞàĄêĆëøûâñüÁ÷äĀûæúēÉĔÏæĈĂĠææďēĂĀĦĕ÷ËÍÖĉ÷ďġėûĆď×ÈãîûæĘöæąôğăĀÖéċíđĂÒćôÓýËĔĀÔËêÖĊċēáĆČûÊÊĆĝĤĉďåôÁåğÝąÏČĘìÝõõóùøĆûÞùĎÒÇöôøùàĚúúéĆÚÚăôÕĈÒèæÄĥĀóÞēčýÜĥģĒÞČæĐÃĐüîûÑĉîáġĠĚÁûçÇÜĞøØðčêÞĂğąďåċĄ×ĆďāďĀĘăäĂĎðüùïĉâċăħúüØùćÙĠģÍýÕĎÙÇĖùčĂĈĔĉäĄğö×ČÐćí÷ďõãĚĖÿąĄĆÍýèąáÜĖÜøþĔąÿĉäģëÈÕðØčĠąÍÌñØûÆēġäûëÑÆþĤßðäĖöïìôĜčąùæèĈėõÕĀÑèìÌåßãÌĕĄæèãăîÞûĕçĂĎØæāåđÊßĕîąĄèùÌÈħÞðíĄĄçÕäąØÊēñÈ×ăĦěĂĊĉÉČĂýěĉïčýÅĆĄäË×æûÇîïåĂÔáÌÙðĠÛëîĒĎÇòòÚÊäÕëÕĄĖČ×ÛíÉúĖĘøĐěîáûĀüûãðĊĈöĠėäàēėâßäĜåÌìĕĐûĠüÛÙãąÞáĂöñùĈòĊßÝÞù÷ðĆèÝĐØėùøĉÍüġâěá÷ïĀÚúñĘÏì×øõĝĎĄçüĘÎúāĎ×ďïąĐĆĠûïÎĆĀú÷öóėÆïëüÇęâèûìďáċýïē÷ñÕùÜâāĉùđċùõħħđ',
					img = '<img src="data:image/jpg;base64,%imgdata%" alt="Red dot" />';

				JMVC.events.bind(JMVC.dom.find('#see'), 'click', function () {
					var p = prompt('Insert password'),
						dec;
					if (!p) {return false; }
					dec = JMVC.security.decrypt(cryp, p);
					if (!dec) {
						alert('Password invalid');
					} else {
						JMVC.WD.body.innerHTML =  img.replace(/%imgdata%/, dec);
					}
				});
			}
		);
	};


	this.action_img = function () {
		JMVC.head.title('Image Filters');
		JMVC.require('core/lib/image/image');
		JMVC.head.addstyle(JMVC.object.toCss({
			'body' : {'font-family' : 'Verdana, sans-serif'},
			'button' : {'border' : 'none', 'margin-right' : '5px', 'cursor' : 'pointer'},
			'button.flt:hover' : {'background-color' : 'green', 'color':'white'},
			'div.filters':{'margin' : '10px', 'width' : '900px'},
			'#done' : {'margin-left' : '10px'},
			'#done li' : {'padding-left':'10px','border-left':'3px solid lime','font-size' : '11px','line-height' : '13px','margin-bottom' : '5px'},
			'#reset' : {'color' : 'red','font-weight' : 'bold','margin' : '5px 0px'},
			'#realimg' : {'margin-left' : '10px'}
		}), true, true);
		
		var that = this,
			img = 'gabpattinaggio.jpg';
			//img = 'fgk.jpg';
			//img = 'marscula.jpg';
			//img = 'demo_small.png';
		
		JMVC.dom.preloadImage(JMVC.vars.baseurl + '/media/img/' + img, function () {
			var elements = [
					{id:'brightness', label : 'Brightness'},
					{id:'threshold', label : 'Threshold'},
					{id:'grayscale', label : 'Grayscale'},
					{id:'invert', label : 'Invert'},
					{id:'blur', label : 'Blur'},
					{id:'emboss', label : 'Emboss'},
					{id:'sharpen', label : 'Sharpen'},
					{id:'laplace', label : 'Laplace'},
					{id:'sobeloriz', label : 'Sobel oriz'},
					{id:'sobelvert', label:' Sobel vert'},
					{id:'red', label:' Remove RED channel'},
					{id:'green', label:'Remove GREEN channel'},
					{id:'blue', label:'Remove BLUE channel'},
					{id:'x', label:'x'},
					{id:'mblur', label:'Mblur'}
				],
				butts = '';

			for(var i =0, l = elements.length; i < l; i += 1) {
				butts += JMVC.string.replaceall('<button id="%id%" class="flt">%label%</button>', elements[i]);
			}

			function track(msg) {
				JMVC.dom.append(JMVC.dom.find('#done'), JMVC.dom.create('li',{},msg));
			}
			track.reset = function () {
				JMVC.dom.empty(JMVC.dom.find('#done'));	
			}

			that.render(
				'<div class="filters">Filters : ' + butts +
				'<br /><button id="reset">RESET</button></div>' +
				'<div style="float:left" id="realimg"><img src="'+ JMVC.vars.baseurl + '/media/img/' + img + '" /></div>'+
				'<div style="float:left"><ol id="done"></ol></div>',
				function (){
					JMVC.events.delay(function () {
						var img = JMVC.dom.find('img'),
							flt = JMVC.image.createFilter(img);
						
						JMVC.events.bind(JMVC.dom.find('#brightness'), 'click', function () { flt.filterImage(flt.filters.brightness, 20); track('brightness'); });
						JMVC.events.bind(JMVC.dom.find('#threshold'), 'click', function () {flt.filterImage(flt.filters.threshold, 50);	track('threshold'); });
						JMVC.events.bind(JMVC.dom.find('#grayscale'), 'click', function () {flt.filterImage(flt.filters.grayscale);	track('grayscale'); });
						JMVC.events.bind(JMVC.dom.find('#invert'), 'click', function () {flt.filterImage(flt.filters.invert);	track('invert'); });
						JMVC.events.bind(JMVC.dom.find('#blur'), 'click', function () {flt.filterImage(flt.filters.blur); track('blur'); });
						JMVC.events.bind(JMVC.dom.find('#sharpen'), 'click', function () {flt.filterImage(flt.filters.sharpen);	track('sharpen'); });
						JMVC.events.bind(JMVC.dom.find('#laplace'), 'click', function () {flt.filterImage(flt.filters.laplace);	track('laplace'); });
						JMVC.events.bind(JMVC.dom.find('#sobeloriz'), 'click', function () {flt.filterImage(flt.filters.sobeloriz);	track('sobel orizontal'); });
						JMVC.events.bind(JMVC.dom.find('#sobelvert'), 'click', function () {flt.filterImage(flt.filters.sobelvert);	track('sobel vertical'); });
						JMVC.events.bind(JMVC.dom.find('#emboss'), 'click', function () {flt.filterImage(flt.filters.emboss);	track('emboss'); });

						JMVC.events.bind(JMVC.dom.find('#red'), 'click', function () {flt.filterImage(flt.filters.remove, 0); track('red channel removed'); });
						JMVC.events.bind(JMVC.dom.find('#green'), 'click', function () {flt.filterImage(flt.filters.remove, 1); track('green channel removed'); });
						JMVC.events.bind(JMVC.dom.find('#blue'), 'click', function () {flt.filterImage(flt.filters.remove, 2); track('blue channel removed'); });
						JMVC.events.bind(JMVC.dom.find('#x'), 'click', function () {flt.filterImage(flt.filters.x); track('x filter'); });
						JMVC.events.bind(JMVC.dom.find('#mblur'), 'click', function () {flt.filterImage(flt.filters.mblur);	 track('motion blur'); });


						JMVC.events.bind(JMVC.dom.find('#reset'), 'click', function () {flt.reset(); track.reset(); });

					}, 1000);
				}
			);
		});
	};


	this.action_viewplus = function () {
		JMVC.head.title('Hello');
		var sv = JMVC.getView('superview');
		var _v = JMVC.getView('sv');
		_v.set('goal', ', I said hellooooooo !!!');
		sv.set('hello', ' yeah hello');
		_v.render();
	};
	


	this.action_logo = function(){
		JMVC.events.loadify(1000);
		JMVC.require('plotter/plotter', 'core/obj/bucket/bucket');
		var M = Math,
			v = JMVC.getView('vacuum');
		
		v.set({
			'style' : 'font-family:verdana;margin:0 auto;width:450px;height:150px;margin-top:80px;position:relative',
			'content' : '&nbsp;',
			'id' : 'extralogo'
		});
		
		JMVC.head.addstyle(JMVC.vars.baseurl+'/media/css/logo.css');
		
		v.render({cback : function () {
			var newlogo = document.getElementById('extralogo'),
				j = new JMVC.plotter.symbol('j', 22, 40),
				m = new JMVC.plotter.symbol('m', 22, 110),
				v = new JMVC.plotter.symbol('v', 22, 260),
				c = new JMVC.plotter.symbol('c', 22, 320);

			j.line(0,4, 22,4, 2);
			j.line(0,4, 0,26, 2);
			j.line(0,26, 22, 26, 2);
			j.line(22,4, 22,26, 2);
			j.line(0,36,0,56, 2);
			j.line(0,36,30,36, 3);
			j.line(0,56,30,56, 3);
			j.line(87,0,107,1, 2);
			j.arc(38,-16, 72,72,  -M.PI / 26	, M.PI / 2, 12);
			j.arc(38,-16, 52,52,  -M.PI / 20	, M.PI / 2	, 9);

			m.line(0,0, 0,24, 2);
			m.line(0,0, 60,0, 7);
			m.line(0,24, 60,24, 7);
			m.line(60,0, 60,24, 2);
			m.arc(60,34, 53,53, -M.PI / 20	, -M.PI	, 11);
			m.arc(60,34, 30,30, -M.PI / 10	, -M.PI	, 6);
			m.arc(60,84, 53,53, -M.PI / 20	, -JMVC.util.deg2rad(163), 12);
			m.arc(60,84, 30,30, -M.PI / 12	, -M.PI	, 7);
			m.line(60,64, 60,87, 2);
			m.line(60,114, 60,137, 2);

			v.line(0,45,0,69, 2);
			v.line(0,45, 45,45, 4);
			v.line(0,69, 45,69, 4);
			v.arc(45,23, 22,22, -M.PI / 8	, M.PI / 2	, 3);
			v.arc(45,23, 46,46, -M.PI / 18	, M.PI / 2	, 8);
			v.line(60,38, 88, 38, 2);
			v.line(60,28, 88,28, 2);
			v.line(60,0, 88,28, 3);
			v.line(60,0, 48,12, 1);
			v.line(60,28, 48,12, 1);

			c.line(0,80, 22,80, 2);
			c.line(0,80, 0,58, 2);
			c.line(22,80, 22,58, 2);
			c.arc(36,58, 12,12, -M.PI / 6	, M.PI * 3 / 2	, 3);
			c.arc(36,58, 36,36, -M.PI / 14	, M.PI * 3 / 2	, 7);
			c.line(44,22, 51,22, 0);
			c.line(44,46, 51,46, 0);
			c.line(58,22, 58,46, 2);
			c.line(66,22, 66,66, 5);
			c.line(66,66, 88,66, 2);
			c.line(88,44, 88,66, 2);
			c.arc(66,44, 22,22, -M.PI / 8, 0, 4);

			j.plot(newlogo);
			m.plot(newlogo);
			v.plot(newlogo);
			c.plot(newlogo);

			var a = newlogo.childNodes,
				i = 0,
				T1=20, T2 =10,
				bucket = new JMVC.bucket.create(JMVC.util.range(0, a.length - 1)),
				t = window.setInterval(function(){
					/* var trg = JMVC.util.rand(1,a.length-1); */
					if (!bucket.hasMore()) {
						bucket.recover();
					}
					var trg =  bucket.next() || 1;
					try {
						var c = a[trg].style.color;
					}catch(e){
						JMVC.debug(trg);
					}
					window.setTimeout(
						function (t1) {
							a[t1].style.color = 'white';
							a[t1].style.fontSize = '8px';
							window.setTimeout(
								function (t2) {
									a[t2].style.color = c;
								}, T1, t1
							);
						},0, trg
					);
				}, T2);
		}});
		/*
		if enabled will not allow that logo to be se in a frame or iframe
		JMVC.util.denyXframe();
		*/
	};
	
	this.action_xmlparser = function () {
		JMVC.require('core/xmlparser/xmlparser');
		
		var d = new JMVC.xmlparser.load('<?xml version="1.0" encoding="UTF-8" ?><root><el><name sex="M">federico</name><surname>ghedina</surname><struct><a>A</a><b>B</b></struct></el><el><name>federico2</name><surname>ghedina2</surname></el></root>'),
			t = false;
		d.extractor(function (node) {
			return {
				name : JMVC.xmlparser._text(node.childNodes[0]),
				surname : JMVC.xmlparser._text(node.childNodes[1]),
				sex : JMVC.xmlparser._attribute(node.childNodes[0],'sex')
			}
		});
		t = d.extractor(0);
		
		
		d.extractor(
			function (node) {
				JMVC.debug(2, node);
				return {
					a : JMVC.xmlparser._text(node)
				};
			},
			true
		);
		d.pointer(d.xmlDoc.getElementsByTagName('struct')[0]);
		
		t = d.extractor(0);
		
		t = d.extractor(1);
		
		/*JMVC.yes.prova(); */
	};
	
	this.action_docs = function () {
		JMVC.require('core/xmlparser/xmlparser');

		JMVC.io.get(

			JMVC.vars.baseurl + '/media/documentation.xml',

			function (doc) {
				var parser = new JMVC.xmlparser.load(doc);

				parser.extractor(function (node) {
					//JMVC.debug('node is ',node);
					var ret = {
						signature : JMVC.xmlparser._text(node.childNodes[0]),
						description : JMVC.xmlparser._text(node.childNodes[1]),
						params : {},
						returns : {
							type : JMVC.xmlparser._text(node.childNodes[3]),
							hint : JMVC.xmlparser._attribute(node.childNodes[3], 'hint')
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
	
	this.action_scheduler = function () {
		JMVC.require('scheduler/scheduler');
		var s = JMVC.scheduler.create();
		s.add({every : 3000}, function (d) {JMVC.debug(d); });
		s.add({every : 5000}, function (d) {JMVC.debug('hei heiiiii ' + d); });
		
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
		v.set({style : 'background-color:red; color:white;padding:10px;margin-bottom:10px;', id : 'prova'});
		v.set('content', explain);
		/* JMVC.debug(v); */
		
		list.setBuildStrategy(function (ul) {
			JMVC.dom.empty(ul);
			JMVC.each(list.getItems(), function (el, i) {
				JMVC.dom.append(ul, JMVC.dom.create('li', {}, i + ' : ' + el));
			});
		});
		
		v.render({
			cback : function () {
				
				var butt_plus = JMVC.dom.add(B, 'input', {type : 'button', value : '+', id : 'butt_plus'}),
					butt_minus = JMVC.dom.add(B, 'input', {type : 'button', value : '-', id : 'butt_minus'}),
					ulist = JMVC.dom.add(B, 'ul', {style : 'list-style-type:none;padding:10px;border:1px solid gray;width:200px;background-color:#eee;', id : 'mylist'}),
					item,
					render;

				JMVC.events.bind(butt_plus, 'click', function () {
					item = prompt('Item to add');
					if (item !== null && item !== '') {
						list.addItem(item);
					}
				});
				JMVC.events.bind(butt_minus, 'click', function () {
					item = prompt('Item index to be removed');
					if (item !== null && item !== '' && !isNaN(item)) {
						list.removeItemAt(item);
					} else {
						alert('Noitem with index ' + item);
					}
				});

				/* or simply */
				list.listModified.attach(function () {list.build(ulist); });

				/* first time build */
				list.build(ulist);
			}
		});
		
		
	}
	
	this.action_fx = function () {
		JMVC.require('core/fx/fx', 'animator/animator', 'core/obj/calendar/calendar', 'timer/timer');
		//
		var v = JMVC.getView('vacuum'),
			B = JMVC.dom.body();
		v.set({style : 'background-color:red', id : 'prova'});
		v.set('content', 'hello u');
		v.render({
			cback : function () {
				JMVC.dom.add(B, 'span', {id : 'bull'}, '&bull;');

				var trg = JMVC.dom.add(B, 'div', {id : 'timer'}),
					cal = JMVC.dom.add(B, 'div', {id : 'cal'}),
					calInst;

				JMVC.css.style(cal, {
					'border' : '5px solid gray',
					'padding' : '10px',
					'margin' : '20px',
					'background-color' : 'pink'
				});
				
				calInst = new JMVC.calendar.create();
				calInst.getMonthMap(6, 2013);
				calInst.getContour(6, 2013);
				
				JMVC.dom.html(cal, calInst.render());
				
				JMVC.timer.create({target : trg, lang : 'en-us', format : '%YYYY% %MM% the %D% %S%'});
				
				JMVC.fx.fadeIn(JMVC.dom.find('#prova'));

				JMVC.animator.follow_ipath(
					JMVC.dom.find('#bull'),
					function (i) {return Math.abs(20 * Math.cos(i / 10)); },
					{from : 0, to : 400},
					{step : 2, mode : 'back'}
				);
			}
		});
	};


	this.action_divrot = function () {

		JMVC.require('widget/divrot/divrot');

		JMVC.head.title('Use arrow keys');
		JMVC.css.style(JMVC.WD.body, {
			'font-family' : 'Verdana, sans-serif'
		});


		JMVC.getView('vacuum')
		.set({style : '', id : 'container', 'content' : ''})
		.render(function () {


			if (JMVC.p.aberrate) {
	            JMVC.head.addstyle(JMVC.vars.baseurl + '/app/extensions/widget/divrot/divrot_aberrate.css', true);
	        }

			var dstNode = JMVC.dom.find('#container');
			window.divrot = JMVC.widget.divrot.create({
				node : dstNode,
				bott : '<div class="inner">Bottom</div>',
				front : '<div class="inner">Front</div>',
				right :'<div class="inner">Right</div>',
				left : '<div class="inner">Left</div>',
				back : '<div class="inner">Back</div>',
				top : '<div class="inner">Top</div>'
			});
			JMVC.dom.add(dstNode, 'h2', {}, 'Use arrow keys to flip around');
			if(JMVC.p.aberrate) {
				JMVC.dom.add(dstNode, 'a', {href : JMVC.util.getLink('demo','divrot')}, 'Default cube');
			} else{
				JMVC.dom.add(dstNode, 'a', {href : JMVC.util.getLink('demo','divrot','?aberrate=true')}, 'Inner cube');
			}
		});
	};





	
};
