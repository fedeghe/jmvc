(function () {
    var head = document.getElementsByTagName('head')[0],
        ss = document.getElementsByTagName('script'),
        s = ss[ss.length - 1],
        trg = s.parentNode,
        ua = navigator.userAgent || navigator.vendor || window.opera,
        // eslint-disable-next-line no-useless-escape
        isMobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|meego.+mobile|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|playbook|silk/i.test(ua) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0, 4)),
        TTT = {},
        RET = { start: function (o) { (new TTT.Game(o)).start(); } };

    TTT.Game = function (o) {
        o = o || {};
        this.id = ~~(Math.random() * 10000);
        this.cplx = ~~o.cplx || 3;
        this.size = ~~o.size || 300;
        this.target = o.trg || trg;
        this.drawpanel = o.panel || false;
        this.dom = null;
        this.panel = null;
        this.board = null;
        this.boxes = [];
        this.movenum = 0;
        this.toWin = o.toWin || this.cplx;
        this.moves = [[], []];
        // this.winningSequences();
    };
    /*
        TTT.Game.prototype.winningSequences = function () {
            var ws = [],
                i = 0, j = 0, l = this.cplx,
                tmp = [], tmp2 = [];

            for (i = 0; i < l; i++) {
                //row
                tmp = [];
                for (j = 0; j < l; j++) tmp.push(~~(i * l + j));
                ws.push(tmp);

                //col
                tmp = [];
                for (j = 0; j < l; j++) tmp.push(~~(i + l * j));
                ws.push(tmp)
            }

            //cross
            tmp = [];
            tmp2 = [];

            for (i = 0, j = l-1; i < l * l; i+=l+1, j+=l-1){
                tmp.push(~~i) && tmp2.push(~~j);
            }

            ws.push(tmp)
            ws.push(tmp2);
            TTT.Game.prototype.winningSequences = ws;
        }

        TTT.Game.prototype.checkWinnerBrute = function () {

            var player = this.movenum % 2,
                win = false,
                i = 0, j = 0, l = this.winningSequences.length;

            for (null; i < l && !win; i++) {
                for (j = 0; j < this.cplx; j++) {
                    if (this.moves[player].indexOf(this.winningSequences[i][j]) < 0) {
                        win = false;
                        break;
                    }
                    win = true;
                }
            }
            if (win) {
                this.win();
                return true;
            }
            return false;
        };
    */

    TTT.Game.prototype.win = function (score) {
        var self = this;
        // player = this.movenum % 2;
        self.highLightWinner(score);
        // alert('Player ' + (player+1) + ' WINS!!!');
        window.setTimeout(function () {
            self.restart();
        }, 3000);
    };

    TTT.Game.prototype.highLightWinner = function (score) {
        var i, s, l;
        for (i in score) {
            if (score[i].length === this.toWin) break;
        }
        s = score[i];
        for (i = 0, l = this.toWin; i < l; i++) {
            this.boxes[s[i][0] * this.cplx + s[i][1]].classList.add('win');
        }
    };

    TTT.Game.prototype.checkWinner = function (ind) {
        // based on toWin
        var self = this,
            player = this.movenum % 2,
            // moves = this.moves[player],
            bounded = function (i, isIndex) {
                var top = self.cplx * (isIndex ? self.cplx : 1);
                return i >= 0 && i < top;
            },
            i2c = function (i) {
                return bounded(i, true)
                    ? [~~(i / self.cplx), i % self.cplx]
                    : false;
            },
            c2i = function (coord) {
                return (bounded(coord[0]) && bounded(coord[1]))
                    ? coord[0] * self.cplx + coord[1]
                    : false;
            },
            checkBox = function (coord) {
                if (!coord) return false;
                var i = c2i(coord);
                return i !== false ? !!(self.boxes[i].className.match(new RegExp('p' + player))) : false;
            },
            score = {
                '\\': [],
                '/': [],
                o: [],
                v: []
            },
            check = function (dir, prevFn, nextFn) {
                var currentPrev = i2c(ind),
                    currentNext = i2c(ind);
                score[dir].push(currentPrev);

                currentPrev = prevFn(currentPrev);
                while (checkBox(currentPrev)) {
                    score[dir].push(currentPrev);
                    currentPrev = prevFn(currentPrev);
                }
                currentNext = nextFn(currentNext);
                while (checkBox(currentNext)) {
                    score[dir].push(currentNext);
                    currentNext = nextFn(currentNext);
                }
            },
            max = 0,
            i;

        // diag \
        check('\\',
            function (coord) { return [coord[0] - 1, coord[1] - 1]; },
            function (coord) { return [coord[0] + 1, coord[1] + 1]; }
        );

        // diag /
        check('/',
            function (coord) { return [coord[0] + 1, coord[1] - 1]; },
            function (coord) { return [coord[0] - 1, coord[1] + 1]; }
        );

        // vert
        check('v',
            function (coord) { return [coord[0] - 1, coord[1]]; },
            function (coord) { return [coord[0] + 1, coord[1]]; }
        );

        // oriz
        check('o',
            function (coord) { return [coord[0], coord[1] - 1]; },
            function (coord) { return [coord[0], coord[1] + 1]; }
        );

        for (i in score) {
            max = score[i].length > max ? score[i].length : max;
        }
        if (max === this.toWin) {
            window.setTimeout(function () {
                self.win(score);
            }, 10);
            return true;
        }
        self.movenum++;
        return false;
    };

    TTT.Game.prototype.restart = function () {
        this.movenum = 0;
        this.boxes = [];
        this.moves = [[], []];
        this.start(true);
    };

    TTT.Game.prototype.start = function (reset) {
        !reset && this.basicStyle();
        this.dom = document.createElement('div');
        this.dom.className = 'respfixed';
        this.createBoard();
        this.handleEvents();
        this.render();
    };

    TTT.Game.prototype.render = function () {
        this.target.innerHTML = '';
        this.target.appendChild(this.dom);
    };

    TTT.Game.prototype.handleEvents = function () {
        var self = this;
        this.board.addEventListener(isMobile ? 'touchstart' : 'click', function (e) {
            self.board.blur();
            var trg = e.originalTarget || e.target,
                player = self.movenum % 2,
                index;
            if (trg.className.match(/p[0|1]/)) return;
            trg.innerHTML = player ? '&times;' : '&bull;';
            trg.classList.add('p' + player);
            index = ~~(trg.getAttribute('data-n'));
            self.moves[player].push(index);

            self.checkWinner(index);
            /*
                        if (self.moves[player].length >= self.cplx){
                            if (!self.checkWinnerBrute()) self.movenum++;
                        } else {
                            self.movenum++;
                        }
            */
        }, false);
    };
    TTT.Game.prototype.basicStyle = function () {
        var s = document.createElement('style'),
            id = '#ttt' + this.id,
            // perc = ~~(100 / this.cplx),
            bsize = ~~(this.size / this.cplx),
            h = ~~(this.size / 18) + 'px';
        s.type = 'text/css';
        s.innerHTML = id + '{font-family:Verdana,sans;width:' + ~~this.size + 'px !important;height:' + ~~this.size + 'px !important;outline:2px solid white}' +
            id + ' .box{width:' + bsize + 'px !important;height:' + bsize + 'px !important;outline:2px solid black; float:left}' +
            id + ' .win{background-color: #0a0}' +
            id + '+.panel{height:' + h + '; line-height:' + h + '; font-family:Verdana, sans; font-size:1em;}' +
            id + ' .p0{font-size: ' + bsize / 2 + 'px;line-height:' + bsize + 'px;width:' + bsize + 'px;height:' + bsize + 'px;line-height:' + bsize + 'px;color:red;text-align:center}' +
            id + ' .p1{font-size: ' + bsize / 2 + 'px;line-height:' + bsize + 'px;color:blue;text-align:center}' +
            id + ' .clear{clear:both}';
        head.appendChild(s);
    };

    TTT.Game.prototype.drawPanel = function () {
        this.panel = document.createElement('div');
        this.panel.className = 'panel';
        this.panel.innerHTML = 'panel';
        this.dom.appendChild(this.panel);
    };
    TTT.Game.prototype.createBoard = function () {
        var self = this,
            t, i;
        this.board = document.createElement('div');

        this.board.className = 'respfixed';
        this.board.id = 'ttt' + this.id;
        for (i = 0; i < this.cplx * this.cplx; i++) {
            t = document.createElement('div');
            t.setAttribute('data-n', i);
            t.className = 'box respfixed';
            self.board.appendChild(t);
            self.boxes.push(t);
        }
        t = document.createElement('br');
        t.className = 'clear';
        self.board.appendChild(t);
        this.dom.appendChild(this.board);
        this.drawpanel && this.drawPanel();
    };
    JMVC.TTT = RET;
})();
