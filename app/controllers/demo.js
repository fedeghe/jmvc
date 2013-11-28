JMVC.controllers.demo = function () {
	
	/* test a route */ 
	this.addRoutes({
		'swiss' : 'flag',
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
		JMVC.require('vendors/google/analytics', 'core/responsive/basic', 'affix');
		
		JMVC.events.loadify(500);

		JMVC.dom.preloadImage(JMVC.vars.baseurl + "/media/img/jmvc_m1.svg");

		var newlogo = JMVC.dom.create('img', {src : JMVC.vars.baseurl + '/media/img/jmvc_m1.svg'});

		/* JMVC.require('widget/slider'); */
		
		var content = '<h3 id="samples" class="round8 roundbottom">FOO SAMPLES</h3>',
			bu = JMVC.vars.baseurl,
			v = JMVC.getView('vacuum'),
			links = {
				'Model' : 'demo/model',
				'Controller' : 'demo/controller',
				'View' : 'demo/view',
				'Tabs' : 'tabs/one/i_say/Hello%20my%20Guest',
				'Console':'console',
				'Console atom (fullscreen)':'console/index?fullscreen=true&h=%3Cdiv%20class%3D%22container%22%3E%0A%09%3Cdiv%20class%3D%22wrap%22%3E%0A%09%09%3Cdiv%20class%3D%22circle%20horizontal%20c1%22%3E%0A%09%09%09%3Cdiv%20class%3D%22wrap-electron%22%3E%0A%09%09%09%09%3Cdiv%20class%3D%22circle%20electron%22%3E%3C%2Fdiv%3E%0A%09%09%09%3C%2Fdiv%3E%0A%09%09%3C%2Fdiv%3E%0A%09%09%3Cdiv%20class%3D%22circle%20vertical%20c1%22%3E%0A%09%09%09%3Cdiv%20class%3D%22wrap-electron%22%3E%0A%09%09%09%09%3Cdiv%20class%3D%22circle%20electron%22%3E%3C%2Fdiv%3E%0A%09%09%09%3C%2Fdiv%3E%0A%09%09%3C%2Fdiv%3E%0A%09%3C%2Fdiv%3E%0A%09%3Cdiv%20class%3D%22wrap%20r%22%3E%0A%09%09%3Cdiv%20class%3D%22circle%20horizontal%20c2%22%3E%0A%09%09%09%3Cdiv%20class%3D%22wrap-electron%22%3E%0A%09%09%09%09%3Cdiv%20class%3D%22circle%20electron%22%3E%3C%2Fdiv%3E%0A%09%09%09%3C%2Fdiv%3E%0A%09%09%3C%2Fdiv%3E%0A%09%09%3Cdiv%20class%3D%22circle%20vertical%20c2%22%3E%0A%09%09%09%3Cdiv%20class%3D%22wrap-electron%22%3E%0A%09%09%09%09%3Cdiv%20class%3D%22circle%20electron%22%3E%3C%2Fdiv%3E%09%0A%09%09%09%3C%2Fdiv%3E%0A%09%09%3C%2Fdiv%3E%0A%09%09%3Cdiv%20class%3D%22circle%20center%22%3E%3C%2Fdiv%3E%0A%09%3C%2Fdiv%3E%0A%3C%2Fdiv%3E%0A%0A%0A%0A%0A%0A%0A%0A&j=%2F*%20no%20javascript%20content%20*%2F&c=body%20%7B%0A%20%20background%3A%20%23222%3B%0A%7D%0A.container%20%7B%0A%20%20position%3A%20relative%3B%0A%20%20margin%3A%20auto%3B%0A%20%20width%3A%20250px%3B%0A%7D%0A.wrap%2C%0A.circle%20%7B%0A%20%20-webkit-transition%3A%20-webkit-transform%20500ms%20linear%3B%0A%20%20-webkit-transform-style%3A%20preserve-3d%3B%0A%20%20-moz-transition%3A%20-moz-transform%20500ms%20linear%3B%0A%20%20-moz-transform-style%3A%20preserve-3d%3B%0A%20%20width%3A%20250px%3B%0A%20%20height%3A%20250px%3B%0A%20%20margin%3A%20auto%3B%0A%20%20margin-top%3A%2050px%3B%0A%20%20position%3A%20absolute%3B%0A%7D%0A.circle%20%7B%0A%20%20position%3A%20absolute%3B%0A%20%20border%3A%203px%20solid%20%23aaaaaa%3B%0A%20%20border-radius%3A%20250px%3B%0A%20%20margin%3A%20auto%3B%0A%7D%0A.circle.c2%2C%0A.circle.center%20%7B%0A%20%20border%3A%202px%20solid%20%23666666%3B%0A%20%20width%3A%20140px%3B%0A%20%20height%3A%20140px%3B%0A%20%20top%3A%2055px%3B%0A%20%20left%3A%2055px%3B%0A%7D%0A.circle.center%20%7B%0A%20%20background%3A%20%23ffffff%3B%0A%20%20width%3A%2030px%3B%0A%20%20height%3A%2030px%3B%0A%20%20top%3A%20110px%3B%0A%20%20left%3A%20110px%3B%0A%20%20box-shadow%3A%200%200%205px%20%23fff%3B%0A%7D%0A.wrap-electron%20%7B%0A%20%20border%3A%200px%20solid%20%20%23fff%3B%0A%20%20position%3A%20absolute%3B%0A%20%20width%3A%20100%25%3B%0A%20%20height%3A%20100%25%3B%0A%20%20-webkit-animation%3A%20electron%203s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20electron%203s%20linear%20infinite%3B%0A%7D%0A.electron%20%7B%0A%20%20width%3A%2012px%3B%0A%20%20height%3A%2012px%3B%0A%20%20background%3A%20%23aaaaaa%3B%0A%20%20left%3A%2050%25%3B%0A%20%20margin-left%3A%20-8px%3B%0A%20%20border%3A%20none%3B%0A%20%20top%3A%20-7px%3B%0A%20%20-webkit-transform-origin%3A%2050%25%2050%25%3B%0A%7D%0A.c2%20.wrap-electron%20%7B%0A%20%20-webkit-animation%3A%20electron%202s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20electron%202s%20linear%20infinite%3B%0A%7D%0A.c2%20.electron%20%7B%0A%20%20top%3A%20-6px%3B%0A%7D%0A.wrap%20%7B%0A%20%20border%3A%200px%20solid%20%23aaaaaa%3B%0A%20%20-webkit-animation%3A%20lateral%2015s%20ease-in-out%20infinite%3B%0A%20%20-moz-animation%3A%20lateral%2015s%20ease-in-out%20infinite%3B%0A%7D%0A.wrap.r%20%7B%0A%20%20-webkit-animation%3A%20lateralRevert%208s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20lateralRevert%208s%20linear%20infinite%3B%0A%7D%0A.vertical%20%7B%0A%20%20-webkit-animation%3A%20vertical%208s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20vertical%208s%20linear%20infinite%3B%0A%7D%0A.horizontal%20%7B%0A%20%20-webkit-animation%3A%20horizontalRevert%206s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20horizontalRevert%206s%20linear%20infinite%3B%0A%7D%0A.vertical.c2%20%7B%0A%20%20-webkit-animation%3A%20vertical%204s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20vertical%204s%20linear%20infinite%3B%0A%7D%0A.horizontal.c2%20%7B%0A%20%20-webkit-animation%3A%20horizontalRevert%203s%20linear%20infinite%3B%0A%20%20-moz-animation%3A%20horizontalRevert%203s%20linear%20infinite%3B%0A%7D%0A%40-webkit-keyframes%20electron%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20horizontal%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateY(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateY(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20horizontalRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateY(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateY(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20vertical%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateX(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateX(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20verticalRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateX(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateX(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20lateral%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-webkit-keyframes%20lateralRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-webkit-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20electron%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20horizontal%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateY(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateY(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20horizontalRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateY(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateY(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20vertical%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateX(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateX(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20verticalRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateX(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateX(0deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20lateral%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%7D%0A%40-moz-keyframes%20lateralRevert%20%7B%0A%20%20from%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(360deg)%3B%0A%20%20%7D%0A%20%20to%20%7B%0A%20%20%20%20-moz-transform%3A%20rotateZ(0deg)%3B%0A%20%20%7D%0A%7D%0A&l=#preview',
				'Console cs' : 'demo/cs/',
				'Some fun' : 'demo/flag',
				'Wcave game' : 'wcave.jmvc',
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

				'modal' : 'test_modal',
				'widget' : 'test_widget',
				'cubic' : 'cubic',
				'map_animator' : '?map=true',
				'carpet' : 'carpet',

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
					'height':'1800px',
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
					'font-size':'40px',
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

		JMVC.head.addstyle(JMVC.object.obj2css(style), true, true);
		
		v.set({
			id : 'content',
			style : 'font-family:Verdana, sans-serif; font-size:12px;',
			content : content,
			index : '&#9826;'
		});

		v.render(function () {
			var fromtop = 20;
			JMVC.head.title('- Foo me a sample -');
			
			JMVC.affix.add({
				html:'<strong>Affix</strong><p>Try o scroll, this will stop scrolling at ' + fromtop + 'px from top</p>',
				init : 68,
				min : fromtop,
				'class':'round8 roundleft',
				style:'z-index:60;height:300px; width:300px; padding:10px; right:30px; border-right:8px solid #888; background-color:gainsboro;',
				where : '#content'
			});
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
	








	
	/* just to celebrate a good start */
	this.action_flag = function() {
		/* color extension is needed */
		JMVC.require('core/color');
		
		JMVC.head.title('CH beat');

		JMVC.head.addstyle(JMVC.vars.baseurl+'/media/css/flag.css');

		var v = JMVC.getView('flag'),
			mode = 'grow',
			box_size=1,
			factor = 0.8,
			top_fact = 80,
			els_top = [],
			i = 0,
			l = 5 * 7,
			recall = function() {
				for(null; i<l; i++) {
					els_top[i] = JMVC.util.rand(10, top_fact-5);
				}
			},
			back = false;
			
		recall();
		
		back = function(s) {
			var basesize = s || box_size,
				f = document.getElementById('flag'),
				boxes = [],
				tmp, i, j, l,
				fact,
				opac = Math.sqrt(basesize / (box_size * top_fact));
			f.style.width = (basesize * 7.5) + 'px';
			f.style.height = (basesize * 5.5) + 'px';
			f.style.margin = '0 auto';
			f.style.zoom = 1;
			f.style.opacity = opac;
			f.style['-ms-filter'] = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + (~~(100 * opac)) + ")";
			f.style.filter = "alpha(opacity=" + (~~(100 * opac)) + ")";
			f.style.marginTop = basesize + 'px';
			j = 0;
			for (i = 0, l = 5 * 7; i < l; i += 1) {
				j += 1;					
				tmp = JMVC.dom.create('div', {'style' : 'width:' + basesize + 'px; height:' + basesize + 'px;', 'class' : 'box'}, '&nbsp;');
				JMVC.dom.append(f, tmp);
				tmp.style.backgroundColor = (basesize > els_top[i]) ?
					((JMVC.array.find([10,16,17,18,24], i) >= 0) ? 'white' : 'red')
					:
					JMVC.core.color.getRandomColor(true);
				if(j%7 == 0) {
					tmp = JMVC.dom.create('div',{'class':'clearer'},'&nbsp;');
					JMVC.dom.append(f, tmp);
				}
			}

			if (basesize > box_size * top_fact) {				
				mode = 'shrink';
				recall();
			}
			if (basesize < box_size) {
				mode = 'grow';					
				recall();
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
		
		v.render({cback : back});
		
	};



	this.action_direct = function () {
		JMVC.head.title('Crypto image');
		JMVC.head.addstyle(JMVC.vars.baseurl + '/media/css/flag.css');
		JMVC.require('core/lib/crypt');
		this.render(
			'<div style="color:green;margin:50px;cursor:pointer;font-family:Verdana, sans-serif" id="see">reveal the image</div>',
			function () {
				JMVC.security.seed = 213123123;
				/*
				original base64 image data (my linkedin profile image)
				imgdata = "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"
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
						JMVC.WD.body.innerHTML =  JMVC.string.replaceall(img, {imgdata:dec});
					}
				});
				JMVC.debug('simple callback on render!');
			}
		);
	};


	this.action_img = function () {
		JMVC.head.title('Filter image');
		JMVC.require('core/lib/image');
		var that = this;
		JMVC.dom.preloadImage(JMVC.vars.baseurl + '/media/img/gabpattinaggio.jpg', function () {
			that.render(
				'<button id="brightness">brightness</button>' +
				'<button id="threshold">threshold</button>' +
				'<button id="grayscale">grayscale</button>' +
				'<button id="reset">RESET</button>' +
				'<img src="'+ JMVC.vars.baseurl + '/media/img/gabpattinaggio.jpg" />',
				function (){
					JMVC.events.delay(function () {
						var img = JMVC.dom.find('img'),
							flt = JMVC.image.createFilter(img);
						
						JMVC.events.bind(JMVC.dom.find('#brightness'), 'click', function () {
							flt.filterImage(flt.filters.brightness, -40);	
						});
						JMVC.events.bind(JMVC.dom.find('#threshold'), 'click', function () {
							flt.filterImage(flt.filters.threshold, 20);	
						});
						JMVC.events.bind(JMVC.dom.find('#grayscale'), 'click', function () {
							flt.filterImage(flt.filters.grayscale);	
						});
						JMVC.events.bind(JMVC.dom.find('#reset'), 'click', function () {
							flt.reset();	
						});

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
		JMVC.require('plotter', 'core/obj/bucket');
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

			j.plot(newlogo);

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
			m.plot(newlogo);

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
			v.plot(newlogo);

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
		JMVC.require('core/xmlparser');
		
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
		JMVC.require('core/xmlparser');

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
		JMVC.require('scheduler');
		var s = JMVC.scheduler.create();
		s.add({every : 3000}, function (d) {JMVC.debug(d); });
		s.add({every : 5000}, function (d) {JMVC.debug('hei heiiiii ' + d); });
		
		JMVC.W.s = s;
	
	};
	
	
	this.action_observer = function () {
		JMVC.require('core/codeview/codehl');
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
		JMVC.require('core/fx', 'animator', 'core/obj/calendar', 'timer');
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
	}
	




	
};
