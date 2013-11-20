JMVC.require('core/css' ,'core/dim' ,'core/lib/grind' ,'event_scroll');
// http://www.jmvc.dev/console/index?h=%3Ccanvas%20id%20%3D%20%22c%22%20%3E%20%3C%2Fcanvas%3E&j=%2F*%0ACopyright%20(c)%202013%20lonely-pixel.com%2C%20Suffick%20at%20codepen.io%20(http%3A%2F%2Fcodepen.io%2FSuffick)%0A%0AView%20this%20and%20others%20at%20http%3A%2F%2Flonely-pixel.com%0A%0APermission%20is%20hereby%20granted%2C%20free%20of%20charge%2C%20to%20any%20person%20obtaining%20a%20copy%20of%20this%20software%20and%20associated%20documentation%20files%20(the%20%22Software%22)%2C%20to%20deal%20in%20the%20Software%20without%20restriction%2C%20including%20without%20limitation%20the%20rights%20to%20use%2C%20copy%2C%20modify%2C%20merge%2C%20publish%2C%20distribute%2C%20sublicense%2C%20and%2For%20sell%20copies%20of%20the%20Software%2C%20and%20to%20permit%20persons%20to%20whom%20the%20Software%20is%20furnished%20to%20do%20so%2C%20subject%20to%20the%20following%20conditions%3A%0A%0AThe%20above%20copyright%20notice%20and%20this%20permission%20notice%20shall%20be%20included%20in%20all%20copies%20or%20substantial%20portions%20of%20the%20Software.%0A*%2F%0A%0A%2F%2F%20settings%0A%0Avar%20physics_accuracy%20%3D%205%2C%0Amouse_influence%20%20%20%20%20%20%3D%2020%2C%20%0Amouse_cut%20%20%20%20%20%20%20%20%20%20%20%20%3D%205%2C%0Agravity%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3D%201200%2C%20%0Acloth_height%20%20%20%20%20%20%20%20%20%3D%2030%2C%0Acloth_width%20%20%20%20%20%20%20%20%20%20%3D%2050%2C%0Astart_y%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3D%2020%2C%0Aspacing%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3D%207%2C%0Atear_distance%20%20%20%20%20%20%20%20%3D%2060%3B%0A%0A%0Awindow.requestAnimFrame%20%3D%0Awindow.requestAnimationFrame%20%20%20%20%20%20%20%7C%7C%0Awindow.webkitRequestAnimationFrame%20%7C%7C%0Awindow.mozRequestAnimationFrame%20%20%20%20%7C%7C%0Awindow.oRequestAnimationFrame%20%20%20%20%20%20%7C%7C%0Awindow.msRequestAnimationFrame%20%20%20%20%20%7C%7C%0Afunction(callback)%20%7B%0A%20%20%20%20window.setTimeout(callback%2C%201000%20%2F%2060)%3B%0A%7D%3B%0A%0Avar%20canvas%2C%0A%09ctx%2C%0A%09cloth%2C%0A%09boundsx%2C%0A%09boundsy%2C%0A%09mouse%20%3D%20%7B%0A%09%09down%3A%20false%2C%0A%09%09button%3A%201%2C%0A%09%09x%3A%200%2C%0A%09%09y%3A%200%2C%0A%09%09px%3A%200%2C%0A%09%09py%3A%200%0A%09%7D%3B%0A%0Awindow.onload%20%3D%20function()%20%7B%0A%0A%09canvas%20%3D%20document.getElementById('c')%3B%0A%09ctx%20%20%20%20%3D%20canvas.getContext('2d')%3B%0A%0A%09canvas.width%20%3D%20canvas.clientWidth%3B%0A%09canvas.height%20%3D%20376%3B%0A%0A%09canvas.onmousedown%20%3D%20function(e)%20%7B%0A%09%09mouse.button%20%3D%20e.which%3B%0A%09%09mouse.px%20%3D%20mouse.x%3B%0A%09%09mouse.py%20%3D%20mouse.y%3B%0A%20%20var%20rect%20%3D%20canvas.getBoundingClientRect()%3B%0A%20%20mouse.x%20%3D%20e.clientX%20-%20rect.left%2C%0A%20%20mouse.y%20%3D%20e.clientY%20-%20rect.top%2C%0A%09%09mouse.down%20%3D%20true%3B%0A%09%09e.preventDefault()%3B%0A%09%7D%3B%0A%0A%09canvas.onmouseup%20%3D%20function(e)%20%7B%0A%09%09mouse.down%20%3D%20false%3B%0A%09%09e.preventDefault()%3B%0A%09%7D%3B%0A%0A%09canvas.onmousemove%20%3D%20function(e)%20%7B%0A%09%09mouse.px%20%3D%20mouse.x%3B%0A%09%09mouse.py%20%3D%20mouse.y%3B%0A%09%09var%20rect%20%3D%20canvas.getBoundingClientRect()%3B%0A%20%20mouse.x%20%3D%20e.clientX%20-%20rect.left%2C%0A%20%20mouse.y%20%3D%20e.clientY%20-%20rect.top%2C%0A%09%09e.preventDefault()%3B%0A%09%7D%3B%0A%0A%09canvas.oncontextmenu%20%3D%20function(e)%20%7B%0A%09%09e.preventDefault()%3B%20%0A%09%7D%3B%0A%0A%09boundsx%20%3D%20canvas.width%20-%201%3B%0A%09boundsy%20%3D%20canvas.height%20-%201%3B%0A%0A%09ctx.strokeStyle%20%3D%20'rgba(222%2C222%2C222%2C0.6)'%3B%0A%09cloth%20%3D%20new%20Cloth()%3B%0A%09update()%3B%0A%7D%3B%0A%0Avar%20Point%20%3D%20function(x%2C%20y)%20%7B%0A%0A%09this.x%20%3D%20x%3B%0A%09this.y%20%3D%20y%3B%0A%09this.px%20%3D%20x%3B%0A%09this.py%20%3D%20y%3B%0A%09this.vx%20%3D%200%3B%0A%09this.vy%20%3D%200%3B%0A%09this.pin_x%20%3D%20null%3B%0A%09this.pin_y%20%3D%20null%3B%0A%09this.constraints%20%3D%20%5B%5D%3B%0A%7D%3B%0A%0APoint.prototype.update%20%3D%20function(delta)%20%7B%0A%0A%09if%20(mouse.down)%20%7B%0A%0A%09%09var%20diff_x%20%3D%20this.x%20-%20mouse.x%2C%0A%09%09%09diff_y%20%3D%20this.y%20-%20mouse.y%2C%0A%09%09%09dist%20%20%20%3D%20Math.sqrt(diff_x%20*%20diff_x%20%2B%20diff_y%20*%20diff_y)%3B%0A%0A%09%09if%20(mouse.button%20%3D%3D%201)%20%7B%0A%0A%09%09%09if(dist%20%3C%20mouse_influence)%20%7B%0A%09%09%09%09this.px%20%3D%20this.x%20-%20(mouse.x%20-%20mouse.px)%20*%201.8%3B%0A%09%09%09%09this.py%20%3D%20this.y%20-%20(mouse.y%20-%20mouse.py)%20*%201.8%3B%0A%09%09%09%7D%0A%0A%09%09%7D%20else%20if%20(dist%20%3C%20mouse_cut)%20this.constraints%20%3D%20%5B%5D%3B%0A%09%7D%0A%0A%09this.add_force(0%2C%20gravity)%3B%0A%0A%09delta%20*%3D%20delta%3B%0A%09nx%20%3D%20this.x%20%2B%20((this.x%20-%20this.px)%20*%20.99)%20%2B%20((this.vx%20%2F%202)%20*%20delta)%3B%0A%09ny%20%3D%20this.y%20%2B%20((this.y%20-%20this.py)%20*%20.99)%20%2B%20((this.vy%20%2F%202)%20*%20delta)%3B%0A%0A%09this.px%20%3D%20this.x%3B%0A%09this.py%20%3D%20this.y%3B%0A%0A%09this.x%20%3D%20nx%3B%0A%09this.y%20%3D%20ny%3B%0A%0A%09this.vy%20%3D%20this.vx%20%3D%200%0A%7D%3B%0A%0APoint.prototype.draw%20%3D%20function()%20%7B%0A%0A%09if%20(this.constraints.length%20%3C%3D%200)%20return%3B%0A%09%0A%09var%20i%20%3D%20this.constraints.length%3B%0A%09while(i--)%20this.constraints%5Bi%5D.draw()%3B%0A%7D%3B%0A%0APoint.prototype.resolve_constraints%20%3D%20function()%20%7B%0A%0A%09if%20(this.pin_x%20!%3D%20null%20%26%26%20this.pin_y%20!%3D%20null)%20%7B%0A%09%0A%09%09this.x%20%3D%20this.pin_x%3B%0A%09%09this.y%20%3D%20this.pin_y%3B%0A%09%09return%3B%0A%09%7D%0A%0A%09var%20i%20%3D%20this.constraints.length%3B%0A%09while(i--)%20this.constraints%5Bi%5D.resolve()%3B%0A%0A%09this.x%20%3E%20boundsx%20%3F%20this.x%20%3D%202%20*%20boundsx%20-%20this.x%20%3A%201%20%3E%20this.x%20%26%26%20(this.x%20%3D%202%20-%20this.x)%3B%0A%09this.y%20%3C%201%20%3F%20this.y%20%3D%202%20-%20this.y%20%3A%20this.y%20%3E%20boundsy%20%26%26%20(this.y%20%3D%202%20*%20boundsy%20-%20this.y)%3B%0A%7D%3B%0A%0APoint.prototype.attach%20%3D%20function(point)%20%7B%0A%0A%09this.constraints.push(%0A%09%09new%20Constraint(this%2C%20point)%0A%09)%3B%0A%7D%3B%0A%0APoint.prototype.remove_constraint%20%3D%20function(lnk)%20%7B%0A%0A%09var%20i%20%3D%20this.constraints.length%3B%0A%09while(i--)%20if(this.constraints%5Bi%5D%20%3D%3D%20lnk)%20this.constraints.splice(i%2C%201)%3B%0A%7D%3B%0A%0APoint.prototype.add_force%20%3D%20function(x%2C%20y%20)%20%20%7B%0A%0A%09this.vx%20%2B%3D%20x%3B%0A%09this.vy%20%2B%3D%20y%3B%0A%7D%3B%0A%0APoint.prototype.pin%20%3D%20function(pinx%2C%20piny)%20%7B%0A%09this.pin_x%20%3D%20pinx%3B%0A%09this.pin_y%20%3D%20piny%3B%0A%7D%3B%0A%0Avar%20Constraint%20%3D%20function(p1%2C%20p2)%20%7B%0A%0A%09this.p1%20%3D%20p1%3B%0A%09this.p2%20%3D%20p2%3B%0A%09this.length%20%3D%20spacing%3B%0A%7D%3B%0A%0AConstraint.prototype.resolve%20%3D%20function()%20%7B%0A%0A%09var%20diff_x%20%3D%20this.p1.x%20-%20this.p2.x%2C%0A%09%09diff_y%20%3D%20this.p1.y%20-%20this.p2.y%2C%0A%09%09dist%20%3D%20Math.sqrt(diff_x%20*%20diff_x%20%2B%20diff_y%20*%20diff_y)%2C%0A%09%09diff%20%3D%20(this.length%20-%20dist)%20%2F%20dist%3B%0A%0A%09if%20(dist%20%3E%20tear_distance)%20this.p1.remove_constraint(this)%3B%0A%0A%09var%20px%20%3D%20diff_x%20*%20diff%20*%200.5%3B%0A%09var%20py%20%3D%20diff_y%20*%20diff%20*%200.5%3B%0A%0A%09this.p1.x%20%2B%3D%20px%3B%0A%09this.p1.y%20%2B%3D%20py%3B%0A%09this.p2.x%20-%3D%20px%3B%0A%09this.p2.y%20-%3D%20py%3B%0A%7D%3B%0A%0AConstraint.prototype.draw%20%3D%20function()%20%7B%0A%0A%09ctx.moveTo(this.p1.x%2C%20this.p1.y)%3B%0A%09ctx.lineTo(this.p2.x%2C%20this.p2.y)%3B%0A%7D%3B%0A%0Avar%20Cloth%20%3D%20function()%20%7B%0A%0A%09this.points%20%3D%20%5B%5D%3B%0A%0A%09var%20start_x%20%3D%20canvas.width%20%2F%202%20-%20cloth_width%20*%20spacing%20%2F%202%3B%0A%0A%09for(var%20y%20%3D%200%3B%20y%20%3C%3D%20cloth_height%3B%20y%2B%2B)%20%7B%0A%0A%09%09for(var%20x%20%3D%200%3B%20x%20%3C%3D%20cloth_width%3B%20x%2B%2B)%20%7B%0A%0A%09%09%09var%20p%20%3D%20new%20Point(start_x%20%2B%20x%20*%20spacing%2C%20start_y%20%2B%20y%20*%20spacing)%3B%0A%0A%20%20%20x%20!%3D%200%20%26%26%20p.attach(this.points%5Bthis.points.length%20-%201%5D)%3B%0A%09%09%09y%20%3D%3D%200%20%26%26%20p.pin(p.x%2C%20p.y)%3B%0A%09%09%09y%20!%3D%200%20%26%26%20p.attach(this.points%5Bx%20%2B%20(y%20-%201)%20*%20(cloth_width%20%2B%201)%5D)%0A%0A%09%09%09this.points.push(p)%3B%0A%09%09%7D%0A%09%7D%0A%7D%3B%0A%0ACloth.prototype.update%20%3D%20function()%20%7B%0A%0A%09var%20i%20%3D%20physics_accuracy%3B%0A%0A%09while(i--)%20%7B%0A%09%09var%20p%20%3D%20this.points.length%3B%0A%09%09while(p--)%20this.points%5Bp%5D.resolve_constraints()%3B%0A%09%7D%0A%0A%09i%20%3D%20this.points.length%3B%0A%09while(i--)%20this.points%5Bi%5D.update(.016)%3B%0A%7D%3B%0A%0ACloth.prototype.draw%20%3D%20function()%20%7B%0A%0A%09ctx.beginPath()%3B%0A%0A%09var%20i%20%3D%20cloth.points.length%3B%0A%09while(i--)%20cloth.points%5Bi%5D.draw()%3B%0A%0A%09ctx.stroke()%3B%0A%7D%3B%0A%0Afunction%20update()%20%7B%0A%0A%09ctx.clearRect(0%2C%200%2C%20canvas.width%2C%20canvas.height)%3B%0A%0A%09cloth.update()%3B%0A%09cloth.draw()%3B%0A%0A%09requestAnimFrame(update)%3B%0A%7D&c=*%20%7B%0A%09%20margin%3A%200%3B%0A%20%20overflow%3Ahidden%3B%0A%20%20-webkit-user-select%3A%20none%3B%0A%20%20-moz-user-select%3A%20none%3B%0A%20%20-ms-user-select%3A%20none%3B%0A%20%20-o-user-select%3A%20none%3B%0A%20%20user-select%3A%20none%3B%20%20%0A%7D%0A%0Abody%20%7B%0A%20%20background%3A%23333%3B%0A%7D%0A%0Acanvas%20%7B%0A%20%20background%3A%23333%3B%0A%20%20width%3A1000px%3B%0A%20%20height%3A376px%3B%0A%20%20margin%3A0%20auto%3B%0A%20%20display%3Ablock%3B%0A%7D%0A%0A%23info%20%7B%0A%20%20position%3Aabsolute%3B%0A%20%20left%3A-1px%3B%0A%20%20top%3A-1px%3B%0A%20%20width%3Aauto%3B%0A%20%20max-width%3A380px%3B%0A%20%20height%3Aauto%3B%0A%20%20background%3A%23f2f2f2%3B%0A%20%20border-bottom-right-radius%3A10px%3B%0A%7D%0A%0A%23top%20%7B%0A%20%20background%3A%23fff%3B%0A%20%20width%3A100%25%3B%0A%20%20height%3Aauto%3B%0A%20%20position%3Arelative%3B%0A%20%20border-bottom%3A1px%20solid%20%23eee%3B%0A%7D%0A%0Ap%20%7B%0A%20%20font-family%3AArial%2C%20sans-serif%3B%0A%20%20color%3A%23666%3B%0A%20%20text-align%3Ajustify%3B%0A%20%20font-size%3A%2016px%3B%0A%20%20margin%3A10px%3B%0A%7D%0A%0Aa%20%7B%0A%20%20font-family%3Asans-serif%3B%0A%20%20color%3A%23444%3B%0A%20%20text-decoration%3Anone%3B%0A%20%20font-size%3A%2020px%3B%0A%7D%0A%0A%23site%20%7B%0A%20%20float%3Aleft%3B%0A%20%20margin%3A%2010px%3B%0A%20%20color%3A%20%2338a%3B%0A%20%20border-bottom%3A1px%20dashed%20%23888%3B%0A%7D%0A%0A%23site%3Ahover%20%7B%0A%20%20color%3A%20%237af%3B%0A%7D%0A%0A%23close%20%7B%0A%20%20float%3Aright%3B%0A%20%20margin%3A%2010px%3B%0A%7D%0A%0A%23p%20%7B%0A%20%20font-family%3A%20Verdana%2C%20sans-serif%3B%0A%20%20position%3Aabsolute%3B%0A%20%20right%3A10px%3B%0A%20%20bottom%3A10px%3B%0A%20%20color%3A%23adf%3B%0A%20%20border%3A%201px%20dashed%20%23555%3B%0A%20%20padding%3A4px%208px%3B%0A%7D&l=#css
JMVC.extend('console', {

	init : function () {
		JMVC.head.meta("generator", "jmvc resident in your machine");
		JMVC.console._ = {
			status : false,
			scroll : 0,
			tpl : '<!DOCTYPE html>'+
				'<html>'+
					'<head>'+
						'<style type="text/css">body{background-color:white} html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:"";content:none}table{border-collapse:collapse;border-spacing:0}</style>'+
						'<style type="text/css">%style%</style>'+
					'</head>'+
					'<body>%body%</body>'+
				'</html>',
			options : '<div class="pad20">'+
					'<legend>Load external<legend>'+
					'<select id ="fw">'+
						'<option value="" selected="selected">No libraries</options>'+
						'<optgroup label="jQuery">'+
							'<option value="http://codeorigin.jquery.com/jquery-1.10.2.min.js">jQuery 1.10.2</option>'+
							'<option value="http://codeorigin.jquery.com/jquery-1.9.1.min.js">jQuery 1.9.1</option>'+
						'</optgroup>'+
					'</select>'+
				'</div>'
		}
	},
	
	toggle : function () {
		var fsmode = false,
			title = JMVC.head.title();

		if (JMVC.console._.status) {

			JMVC.dom.remove(JMVC.dom.find('#jmvc-console'));
			JMVC.events.enable_scroll();
			JMVC.W.scrollTo(0, JMVC.console._.scroll);

		} else {

			var dims = JMVC.dim.getViewportSize(),
				border_size = 0,
				margin = -1,
				top_height = 10,
				foot_height = 100,
				screendata = JMVC.dim.getScreenData(),
				scrollTop = screendata.scrollTop,
				triBrdCol = '#606060',

				// main container
				container = JMVC.dom.create(
					'div',{
						'id' : 'jmvc-console',
						'class' : 'jmvc-console',
						'style' : 'left:' + margin + 'px;right:' + margin + 'px;top:' + margin + 'px;bottom:' + margin + 'px;border:' + border_size + 'px solid black'
					}
				),

				content = {
					h : JMVC.p.h ? decodeURIComponent(JMVC.p.h) : "<div id='hw'>hello world</div>",
					j : JMVC.p.j ? decodeURIComponent(JMVC.p.j) : "var t = document.getElementById('hw');\nt.onclick = function (){t.innerHTML='clicked';};",
					c : JMVC.p.c ? decodeURIComponent(JMVC.p.c) : "#hw{\n\tcolor:red;\n\tfont-family:arial, sans-serif;\n\tpadding:20px;\n\tfont-size:20px\n}"
				},
				// triangle = {
				// 	 tag : "div",
				// 	 "float" : "right",
				// 	 style  : {"height":"0px","width":"0px","borderBottom":"30px solid " + triBrdCol,"borderLeft":"20px solid #333", "marginTop":"-10px"}
				// },
				brd = '<div class=" gbox" style="float: right; height: 0px; width: 0px; border-bottom: 30px solid rgb(96, 96, 96); border-left: 20px solid rgb(51, 51, 51); margin-top: -10px;"></div>',
				version = 0.3,
				defaults = {
					h : '<!-- no html content -->',
					j : '/* no javascript content */',
					c : '/* no css content */'
				},
				config  = [
					{
						"target" : '#jmvc-console',
						"tag" : "div",
						"class" : "console-head",
						"inner" : [
							{
								"tag":"div",
								"float":"left",
								"html" : "<a href='" + JMVC.vars.baseurl + "'><img src='/media/img/jmvc_m1.svg' width='60'/></a>",
								"style" : {"marginTop":"12px", "marginLeft":"10px"}
							},{
								"tag":"h5",
								"float":"left",
								"html":"web console v." + version,
								"style" : {"color":"#888", "paddingLeft":"10px"}
							},{
								"tag":"button",
								"float":"left",
								"html":"GET URL",
								"attrs" : {"id":"get-url"},
								"class" : "round4"
							},{
								"tag":"button",
								"float":"left",
								"html":"FullScreen",
								"attrs" : {"id":"go-fs"},
								"class" : "round4"
							},

							////////////////////////////////////////

							{
								"tag":"a",
								"attrs" : {"id" : "options", "href":"#options"},
								"class" : "ablock",
								"float":"right",
								"inner" : [
									{
										"tag":"div",
										"class":"round4 roundtop text",
										"float":"right"
									},{
										"tag":"div",
										"float":"right",
										"class":"tri"
									}
								]
							},{
								"tag":"a",
								"attrs" : {"id" : "preview", "href":"#preview"},
								"class" : "ablock",
								"float":"right",
								"inner" : [
									{
										"tag":"div",
										"class":"round4 roundtop text",
										"float":"right"
									},{
										"tag":"div",
										"float":"right",
										"class":"tri"
									}
								]
							},{
								"tag":"a",
								"attrs" : {"id" : "css", "href":"#css"},
								"class" : "ablock",
								"float":"right",
								"inner" : [
									{
										"tag":"div",
										"class":"round4 roundtop text",
										"float":"right",
										"html":"CSS"
									},{
										"tag":"div",
										"float":"right",
										"class":"tri"
									}
								]
							},{
								"tag":"a",
								"attrs" : {"id" : "javascript", "href":"#javascript"},
								"class" : "ablock",
								"float":"right",
								"inner" : [
									{
										"tag":"div",
										"class":"round4 roundtop text",
										"float":"right",
										"html":"JAVASCRIPT"
									},{
										"tag":"div",
										"float":"right",
										"class":"tri"
									}
								]
							},{
								"tag":"a",
								"attrs" : {"id" : "html", "href":"#html"},
								"class" : "ablock",
								"float":"right",
								"inner" : [
									{
										"tag":"div",
										"class":"round4 roundtop text",
										"float":"right",
										"html":"HTML"
									},{
										"tag":"div",
										"float":"right",
										"class":"tri"
									}
								]
							},
							"clearer"
						]
					},{
						"tag" : "div",
						"target" : "#jmvc-console",
						"class" : "input-divs",
						"inner" : [
							{
								"tag" : "div",
								"attrs" : {"id" : "in-html"},
								"class" : "in-html inputdiv",
								"inner": [{
									"tag" : "textarea",
									"attrs" : {"id":"content-html"},
									"style" : {"height" : (dims.height - 60) + "px", "border":"none"},
									"html" : content.h
								}]
							},{
								"tag" : "div",
								"attrs" : {"id" : "in-javascript"},
								"class" : "in-javascript inputdiv",
								"inner": [{
									"tag" : "textarea",
									"attrs" : {"id":"content-javascript"},
									"style" : {"height" : (dims.height - 60) + "px", "border":"none"},
									"html" : content.j
								}]
							},{
								"tag" : "div",
								"attrs" : {"id" : "in-css"},
								"class" : "in-css inputdiv",
								"inner": [{
									"tag" : "textarea",
									"attrs" : {"id":"content-css"},
									"style" : {"height" : (dims.height - 60) + "px", "border":"none"},
									"html" : content.c
								}]
							},{
								"tag" : "div",
								"attrs" : {"id" : "in-preview"},
								"class" : "in-preview inputdiv",
								"inner": [{
									"tag":"iframe",
									//"style" : {"position":"fixed", "top":"0px", "left":"0px", "bottom":"0px", "right":"0px", "width":"100%", "height":"100%", "border":"none", "margin":"0", "padding":"0", "overflow":"hidden", "zIndex":999999},
									"attrs":{"id":"outarea", "width":"100%","height":(dims.height - 60) + "px"}
								}]
							},{
								"tag" : "div",
								"attrs" : {"id" : "in-options"},
								"class" : "in-options inputdiv",
								"html": JMVC.console._.options
							}
						]
					}
				],
				hash = false;


			//save scroll vertical position
			JMVC.console._.scroll = scrollTop;

			//scroll to top
			JMVC.W.scrollTo(0, 1);

			//disable scroll
			JMVC.events.disable_scroll();

			JMVC.set('height', dims.height - 60);
			JMVC.head.addstyle(JMVC.vars.baseurl + '/app/extensions/core/console/console.css', true);
			JMVC.dom.append(JMVC.dom.body(), container);
			JMVC.grind.render(config);

			//lib
			if(JMVC.p.l) {
				JMVC.dom.find('#fw').value = decodeURIComponent(JMVC.p.l);
			}

			if (JMVC.hash.match(/html|css|javascript|preview|options/)) {
				JMVC.dom.addClass(JMVC.dom.find('#' + JMVC.hash), 'active');
				JMVC.css.show(JMVC.dom.find('#in-' + JMVC.hash));
				hash = JMVC.hash;
			} else {
				JMVC.dom.addClass(JMVC.dom.find('#html'), 'active');
				JMVC.css.show(JMVC.dom.find('#in-html'));
			}

			if (hash == 'preview') {
				JMVC.css.show(JMVC.dom.find('#go-fs'));
			}



			JMVC.events.bind(JMVC.dom.find('.ablock'), 'click', function (e) {
				var butt = JMVC.dom.find(this),
					id =  JMVC.dom.attr(butt, 'id') || 'xxx';
				
				JMVC.each(JMVC.dom.find('.ablock'), function (elbutt){
					JMVC.dom.removeClass(elbutt, 'active');
				});
				JMVC.dom.addClass(butt, 'active');
				hash = id;

				JMVC.each(JMVC.dom.find('.inputdiv'), function (el){
					JMVC.css.style(el, 'display', 'none');
				});
				JMVC.css.style(JMVC.dom.find('#in-' + id), 'display', 'block');

				if (id == 'preview') {
					JMVC.css.show(JMVC.dom.find('#go-fs'));
				} else {
					JMVC.css.hide(JMVC.dom.find('#go-fs'));
				}

			});

			//enable tab on textareas
			JMVC.each(JMVC.dom.find('textarea'), function (el){
				el.onkeydown = function(e){
					var textarea= this,
						input,
						remove,
						posstart,
						posend,
						compensateForNewline,
						before,
						after,
						selection,
						val;
					if (e.keyCode == 9) { // tab
						input = textarea.value; // as shown, `this` would also be textarea, just like e.target
						remove = e.shiftKey;
						posstart = textarea.selectionStart;
						posend = textarea.selectionEnd;
						// if anything has been selected, add one tab in front of any line in the selection
						if (posstart != posend) {
							posstart = input.lastIndexOf('\n', posstart) + 1;
							compensateForNewline = input[posend - 1] == '\n';
							before = input.substring(0, posstart);
							after = input.substring(posend - (~~compensateForNewline));
							selection = input.substring(posstart, posend);

							// now add or remove tabs at the start of each selected line, depending on shift key state
							// note: this might not work so good on mobile, as shiftKey is a little unreliable...
							if (remove) {
								if (selection[0] == '\t') {
									selection = selection.substring(1);
								}
								selection = selection.split('\n\t').join('\n');
							} else {
								selection = selection.split('\n');
								if (compensateForNewline){
									selection.pop();	
								} 
								selection = '\t'+selection.join('\n\t');
							}

							// put it all back in...
							textarea.value = before+selection+after;
							// reselect area
							textarea.selectionStart = posstart;
							textarea.selectionEnd = posstart + selection.length;
						} else {
							val = textarea.value;
							textarea.value = val.substring(0,posstart) + '\t' + val.substring(posstart);
							textarea.selectionEnd = textarea.selectionStart = posstart + 1;
						}
						e.preventDefault(); // dont jump. unfortunately, also/still doesnt insert the tab.
					}
				}
			});



			JMVC.events.bind(JMVC.dom.find('#get-url'), 'click', function () {
				var vals = getValues(),
					url = [JMVC.vars.baseurl, JMVC.c, JMVC.a].join(JMVC.US) + JMVC.object.obj2qs({
						h : vals[0] || defaults.h,
						j : vals[1] || defaults.j,
						c : vals[2] || defaults.c,
						l : JMVC.dom.find('#fw').value
					}) + (hash ? "#" + hash : '');
				prompt("Copy the following url", url);
			});
			JMVC.events.bind(JMVC.dom.find('#go-fs'), 'click', function () {
				gofs();
			});
			JMVC.events.bind(JMVC.dom.find('#preview'), 'click', function () {update(); });
			
			function getValues() {
				return [
					JMVC.dom.find('#content-html').value,
					JMVC.dom.find('#content-javascript').value,
					JMVC.dom.find('#content-css').value
				];
			}
			function appenderCode (src) {
				return  '(function() {'+
					'var l = document.createElement("script");' +
					'l.type = "text/javascript";' +
					'l.src = "' + src + '";' +
					'var s = document.getElementsByTagName("head")[0];' +
					's.appendChild(l);' +
				'})();'
			}
			
			function update(){
				var vals = getValues(),
					h = vals[0] || defaults.h,
					j = vals[1] || defaults.j,
					c = vals[2] || defaults.c,
					iframe = JMVC.dom.find('#outarea'),
					lib = JMVC.dom.find('#fw').value;

				JMVC.dom.find('#outarea').contentDocument.documentElement.innerHTML = JMVC.string.replaceall(
					JMVC.console._.tpl, {
						'style' : c,
						'body' : h,
						'options' : JMVC.console._.options
					}
				);

				//exit fullscreen
				JMVC.dom.find('#outarea').contentWindow.document.onkeyup =  function (e) {
					if (fsmode && e.keyCode == 27) {
						JMVC.head.title(title);
						JMVC.css.style(JMVC.dom.find('#outarea'),{'position':'relative'});
						fsmode = false;
					};
				}
				try {
					var dl = JMVC.WD.location;
					iframe.contentWindow.eval('var JMVCshut = true; ')
					iframe.contentWindow.eval(appenderCode( "/app/jmvc.js"));
					!!lib && iframe.contentWindow.eval(appenderCode(lib));
					iframe.contentWindow.eval(j);
				}catch(e){
					console.error(e);
				}
			}

			function gofs(){
				JMVC.head.title('Press esc to exit preview');
				JMVC.css.style(JMVC.dom.find('#outarea'), {
					position : 'absolute',
					top :'0px',
					left :'0px',
					width :'100%',
					height :'100%'
				});
				JMVC.dom.find('#outarea').contentDocument.documentElement.focus();
				fsmode = true;
			}

			JMVC.events.delay(function () {update(); }, 0);

			//fullscreen ?
			JMVC.p.fullscreen && gofs();
		}
		JMVC.console._.status = !JMVC.console._.status;
	}
});	