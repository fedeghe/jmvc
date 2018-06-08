	JMVC.controllers.drive = function () {
	"use strict";


	this.action_index = function () {
		this.render(function () {
			var lines = [
				createLine('media/img/drive/1.png', [
					'dall`autostrada prendi uscita 61 Zch-Affoltern',
					'tieniti a SX dopo essere uscito',
					'alla fine della discesa giri a SX in wehntalerstrasse',
					'procedi per circa 1km (occhio alle macchinette)'
				]),
				createLine('media/img/drive/2.png', [
					
					'dopo la segheria (che vedi sulla SX) a DX dovresti vedere un cartello per Regensdorf, gira',
					'dopo poco ti trovi una rotonda dove prendi la 2da uscita (in sostanza vai a sinistra)',
					'segui la strada a sx, passi il cavalcavia',
					'alla rotonda vai dritto, passi sotto il tunnel della stazione di Regensdorf-Watt'
				]),
				createLine('media/img/drive/3.png', [
					
					'arrivi a un semaforo vai a DX',
					'in fondo alla strada vai a SX, lo so é da un po che ti trovi',
					'...le istruzioni finiscono qui :D'

				])
			];

			function createLine (img, texts) {
				return {
					tag : 'tr',
					content : [{
						tag : 'td',
						style: {textAlign : 'right'},
						content : [{
							tag : 'img',
							attrs : {src : img}
						}]
					}, {
						tag : 'td',
						style: {verticalAlign : 'top'},
						content : [{
							tag : 'ul',
							style : { marginLeft:'10px'},
							cb : function () {
								var self = this,
									$elf = self.node,
									i = 0, l=texts.length, els = [];
								for (null; i < l; i++) {
									els.push({tag : 'li', html : '&rarr;&nbsp;' + texts[i] + '', style:{lineHeight:'45px'} });
								}
								JMVC.core.widgzard.render({
									target : $elf,
									content : els
								})
								this.done();
							}
						}]
					}]	
				};
			}
			
			JMVC.core.widgzard.render({
				style : {
					fontSize:'30px',
					fontFamily:'Verdana'
				},
				content : [{
					tag : 'table',
					content : lines
				}]
			});
		});
	};


}