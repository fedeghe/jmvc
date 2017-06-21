JMVC.require(
	'games/tictactoe/ttt',
	'core/responsive/basic/basic',
	'core/mobile/mobile'
);

JMVC.controllers.ttt = function () {
	'use strict';

	this.action_index = function () {


		var opts = {
			cplx : JMVC.p.cplx || 3,
            size : JMVC.p.size || 720,
			toWin : JMVC.p.toWin || 3
		};

        JMVC.require('games/deck/deck');

        JMVC.head.title('Tic Tac Toe');

        JMVC.getView('vacuum')
            .set({
                'style' : 'margin:0 auto; text-align:center; width:' + opts.size + 'px; vertical-align:middle; display:table-cell;',
                'id': 'container'
            })
            .render(function () {
            	document.body.style.display = 'table';
            	document.body.style.height = '100vh';
            	opts.trg = document.getElementById('container');
                JMVC.TTT.start(opts);
            });
	};
	//
};
