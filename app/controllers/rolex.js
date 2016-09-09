JMVC.require('core/mobile/mobile');
JMVC.controllers.rolex = function () {
	'use strict';


	JMVC.css.autoHeadings();

	this.action_index = function () {

		JMVC.require('core/lib/widgzard/widgzard', render);
		JMVC.head.addStyle(JMVC.vars.baseurl + '/media/css/core/jmvc-day.min.css', true);
		JMVC.head.addStyle(JMVC.vars.baseurl + '/media/css/rolex.css', true);
		function render(){
			JMVC.head.addStyle(
				JMVC.object.toCss({
					body : {
						'font-family' : 'verdana'
					},
					'caption' : {
						'font-size' : '2em',
						'text-align' : 'left'
					},
					'tr>th' : {
						'background-color' : '#999',
						'font-weight' : 'bold'
					},
					'tr:nth-child(odd)' : {
						'background-color' : '#ddd'
					},
					'tr:nth-child(even)' : {
						'background-color' : '#eee'
					},
					'sub' : {
						display : 'block'
					}
				}),
				true,
				true
			);


			var discounts = [
					0.08
				],
				chVat = 0.08,
				nationsVats = {
					'DE' : 0.19,
					'FR' : 0.20,
					'IT' : 0.22
				},
				currencyRate = 0.9156, // 1 CHF = 0.9156 € 

				
				chf2euro = function (c) {return ~~(c * currencyRate);},
				euro2chf = function (e) {return ~~(e / currencyRate);},
				fullPrice,
				report = "",

				nation,
				price = 'price' in JMVC.p ? JMVC.p.price : 12500,
				disc = 'disc' in JMVC.p ? JMVC.p.disc.split(',') : false;

			if (disc) discounts = disc;
			
			

			fullPrice = parseInt(price, 10);


			function createTableLines () {
				var t = [{
					tag : 'caption',
					content :[{
						tag : 'p',
						html : 'FULL PRICE : ' + fullPrice + ' € <sub>' + euro2chf(fullPrice) + ' CHF</sub>'
					}]
				},{
					tag : "col",
					attrs : { width : "10%"}
				},{
					tag : "col",
					attrs : { width : "10%"}
				},{
					tag : "col",
					attrs : { width : "22%"}
				},{
					tag : "col",
					attrs : { width : "18%"}
				},{
					tag : "col",
					attrs : { width : "20%"}
				},{
					tag : "col",
					attrs : { width : "20%"}
				}];

				
				t = t.concat(createHeader());
				
				for (var n in nationsVats) {
					t = t.concat(createNationLine(n));
				}
				return t;
			}

			function createHeader() {
				var ret = {
						tag : 'tr',
						content : []
					},
					tpl = function (txt) { return {tag : 'th', html : txt, style : {padding:'5px', textAlign:'left'}};},
					headers = ['&bull;','disc.', 'disc. p.', 'ch vat', 'back vat', 'tot.'];
				for(var i = 0, l = headers.length; i < l; i++) {
					ret.content.push(tpl(headers[i]));
				}
				return ret;
			}
			function createNationLine (n) {

				var discountedPrice,
					chPay,
					discounted,
					getBackVat,
					total,
					ret = [],
					line = function (html) {
						return {
							tag : 'td',
							style : {padding:'5px', textAlign:'left'},
							html : html
						};
					}
				for (var i = 0, l = discounts.length; i < l; i++) {
					discountedPrice = parseInt(fullPrice * (1 - discounts[i]), 10),
					chPay = ~~(discountedPrice * chVat),
					discounted = ~~((1 - discounts[i]) * fullPrice);
					getBackVat = ~~(discountedPrice * nationsVats[n]);
					total = discountedPrice + chPay - getBackVat;

					ret.push({
						tag : 'tr',
						content : [
							line(n + '<sub>' + (nationsVats[n] * 100 + '%') + '</sub>'),
							line(~~(discounts[i]*100) + '%'),
							line(discounted + ' € <sub>' + euro2chf(discounted) + ' CHF</sub>'),
							line(chPay + ' € <sub>' + euro2chf(chPay) + ' CHF</sub>'),
							line(getBackVat + ' € <sub>' + euro2chf(getBackVat) + ' CHF</sub>'),
							line(total + ' € <sub>' + euro2chf(total) + ' CHF</sub>')
						]
					});
				}
				ret.push({
					tag : 'tr',
					content : [{
						tag : 'td',
						attrs : {
							colspan : 6
						},
						html : '<hr>'
					}],
					attrs : {
						"class" : 'sep'
					}
					
				})
				return ret;
			}


			JMVC.core.widgzard.render({
				content : [{
					tag : 'table',
					style : {
						width: '100%'
					},
					wid : 'table',
					cb : function () {
						var self = this,
							$elf = self.node;
						refresh($elf);
						self.done();
					}
					
				},{
					tag : 'label', text : 'price'
				},{
					tag : 'input',
					style : {
						width : '98vw',
						margin : '1vw'
					},
					attrs : {
						type : 'range',
						min : 5000,
						max : 35000,
						step : 100,
						value : fullPrice
					},
					cb : function () {
						var self = this,
							$elf = self.node;
						JMVC.events.on($elf, 'input', function () {
							var table = self.getNode('table').node;
							fullPrice = ~~($elf.value);
							refresh(table);
						})
						self.done();
					}
				},{
					tag : 'label', text : 'discount'
				},{
					tag : 'input',
					attrs : {
						type : 'range',
						min : 0,
						max : 0.5,
						step : 0.01,
						value : 0.1
					},
					style : {
						width : '98vw',
						margin : '1vw'
					},
					cb : function () {
						var self = this,
							$elf = self.node;
						JMVC.events.on($elf, 'input', function () {
							var table = self.getNode('table').node;
							discounts = [$elf.value];
							refresh(table);
						})
						self.done();
					}
				}],
				cb : function () {

				}
			});
			function refresh (n) {
				JMVC.core.widgzard.render({
					target : n,
					content : createTableLines()
				}, true);
			}

		}
	};
};
