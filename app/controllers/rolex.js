JMVC.require('core/mobile/mobile');
JMVC.controllers.rolex = function () {
	'use strict';


	JMVC.css.autoHeadings();

	this.action_index = function () {

		JMVC.require('core/lib/widgzard/widgzard', render);
		JMVC.head.addStyle(JMVC.vars.baseurl + '/media/css/rolex.css', true);
		function render(){
			JMVC.head.addStyle(
				JMVC.object.toCss({
					body : {
						'font-family' : 'verdana',
						'font-size':'0.6em'
					},
					'caption' : {
						'font-size' : '1.6em',
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
					},
					button : {
						border:'none',
						'margin-left' : '5px',
						'-moz-border-radius':'3px',
						'-webkit-border-radius':'3px',
						'border-radius':'3px',
						'height' : '2.5em'
					},
					'button.plus' : {
						'background-color':'green'
					},
					'button.minus' : {
						'background-color':'red'
					}
				}),
				true,
				true
			);


			var discount = 0.08,
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
				price = 'price' in JMVC.p ? JMVC.p.price : 12350,
				disc = 'disc' in JMVC.p ? JMVC.p.disc.split(',') : false;

			if (disc) discount = disc;
			
			

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
					attrs : { width : "5%"}
				},{
					tag : "col",
					attrs : { width : "5%"}
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
					headers = [
						'&bull;',
						'disc.', 
						'0%&nbsp;vat',
						'disc.&nbsp;p.',
						'ch&nbsp;vat',
						'back&nbsp;vat',
						'tot'
					],i,l;
				for(i = 0, l = headers.length; i < l; i++) {
					ret.content.push(tpl(headers[i]));
				}
				return ret;
			}

			function createNationLine (n) {

				var discountedPrice,
					zeroVat,
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
				
				discountedPrice = parseInt(fullPrice * (1 - discount), 10),

				zeroVat = ~~(discountedPrice/(1+nationsVats[n]));
				chPay = ~~(zeroVat * chVat),
				discounted = ~~((1 - discount) * fullPrice);
				getBackVat = ~~(zeroVat * nationsVats[n]);
				total = discountedPrice + chPay - getBackVat;

				ret.push({
					tag : 'tr',
					content : [
						line(n + '<sub>' + (nationsVats[n] * 100 + '%') + '</sub>'),
						line( (discount*100).toFixed(1) + '%'),
						line(zeroVat + '€<sub>' + euro2chf(zeroVat)  + 'chf</sub>'),
						line(discounted + ' € <sub>' + euro2chf(discounted) + ' CHF</sub>'),
						line(chPay + ' € <sub>' + euro2chf(chPay) + ' CHF</sub>'),
						line(getBackVat + ' € <sub>' + euro2chf(getBackVat) + ' CHF</sub>'),
						line(total + ' € <sub>' + euro2chf(total) + ' CHF</sub>')
					]
				});
				
				ret.push({
					tag : 'tr',
					content : [{
						tag : 'td',
						attrs : {
							colspan : 7
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
					style : {
						'margin' : '1em',
						'margin-bottom' : '1em'
					},
					content : [{
						tag : 'label', text : 'price'
					},{
						tag : 'button', html : "-",
						attrs : {"class" : "minus"},
						cb : function () {
							var self = this,
								$elf = self.node;
							JMVC.events.on($elf, 'click', function () {
								var pI = self.getNode('priceInput').node;
								pI.value = ~~(pI.value) - 10;
								JMVC.events.trigger(pI, 'change');
							});
							self.done();
						}
					},{
						tag : 'button', html : "+",
						attrs : {"class" : "plus"},
						cb : function () {
							var self = this,
								$elf = self.node;
							JMVC.events.on($elf, 'click', function () {
								var pI = self.getNode('priceInput').node;
								pI.value = ~~(pI.value) + 10;
								JMVC.events.trigger(pI, 'change');
							});
							self.done();
						}
					}]
				},{
					tag : 'input',
					wid : "priceInput",
					style : {
						width : '98vw',
						margin : '1vw'
					},
					attrs : {
						type : 'range',
						min : 1000,
						max : 35000,
						step : 10,
						value : fullPrice
					},
					cb : function () {
						var self = this,
							$elf = self.node;
						function _ref() {
							var table = self.getNode('table').node;
							fullPrice = ~~($elf.value);
							refresh(table);
						}
						JMVC.events.on($elf, 'input', _ref)
						JMVC.events.on($elf, 'change', _ref)
						self.done();
					}
				},{
					style : {
						'margin' : '1em',
						'margin-bottom' : '1em'
					},
					content : [{
						tag : 'label', text : 'discount'
					},{
						tag : 'button', html : "-",
						attrs : {"class" : "minus"},
						cb : function () {
							var self = this,
								$elf = self.node;
							JMVC.events.on($elf, 'click', function () {
								var pI = self.getNode('discountInput').node;
								pI.value = parseFloat(pI.value, 10) - 0.01;
								JMVC.events.trigger(pI, 'change');
							});
							self.done();
						}
					},{
						tag : 'button', html : "+",
						attrs : {"class" : "plus"},
						cb : function () {
							var self = this,
								$elf = self.node;
							JMVC.events.on($elf, 'click', function () {
								var pI = self.getNode('discountInput').node;
								pI.value = parseFloat(pI.value, 10) + 0.01;
								JMVC.events.trigger(pI, 'change');
							});
							self.done();
						}
					}]
				},{
					tag : 'input',
					wid : "discountInput",
					attrs : {
						type : 'range',
						min : 0,
						max : 0.50,
						step : 0.001,
						value : discount
					},
					style : {
						width : '98vw',
						margin : '1vw'
					},
					cb : function () {
						var self = this,
							$elf = self.node;
						function _ref() {
							var table = self.getNode('table').node;
							discount = $elf.value;
							refresh(table);
						}
						JMVC.events.on($elf, 'input', _ref)
						JMVC.events.on($elf, 'change', _ref)
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
