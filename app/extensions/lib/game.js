JMVC.extend('game', {

	create : function (init, draw, update, fps) {

		var self = this;

		this.init = init || JMVC.noop;
		this.draw = draw || JMVC.noop;
		this.update = update || JMVC.noop;
		this.fps  = fps || 50;
		this.intervalId = false;

		this.run = (function() {
			var loops = 0,
				skipTicks = 1000 / JMVC.game.fps,
				maxFrameSkip = 10,
				nextGameTick = +new Date();
			return function (){
				loops = 0;
				while ( +new Date() > nextGameTick && loops < maxFrameSkip) {
					self.update();
					nextGameTick += skipTicks;
					loops += 1;
				}
				self.draw();
			};
		})();

		(function() {
			var onEachFrame;
			if (JMVC.W.webkitRequestAnimationFrame) {
				onEachFrame = function (cb) {
					(function _cb_() { cb(); webkitRequestAnimationFrame(_cb_); })();
				};
			} else if (JMVC.W.mozRequestAnimationFrame) {
				onEachFrame = function (cb) {
					(function _cb_() {cb(); mozRequestAnimationFrame(_cb_); })();
				};
			} else {
				onEachFrame = function (cb) {
					setInterval(cb, 1000 / 60);
				}
			}
			JMVC.W.onEachFrame = onEachFrame;
		})();

		JMVC.W.onEachFrame(self.run);		

		return {
			'start' : function(){
				self.intervalId = setInterval(self.run, 0);
			},
			'stop' : function () {
				clearInterval(self.intervalId);
			}
		};
	}
});