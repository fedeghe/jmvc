
JMVC.head.addstyle(JMVC.vars.baseurl + '/app/extensions/games/wcave/wcave.css');


JMVC.head.addstyle(JMVC.vars.baseurl + '/app/extensions/games/wcave/freckle.css', true);


/**
 * 
 * wcave
 * 
 * @version: 1.4.13
 * @date : 25-04-2013
 * @copyright (c) 2013, Federico Ghedina <fedeghe@gmail.com>
 * 
 * All rights reserved.
 * 
 */
!function (W) {
	//ooooooooooo
	'use strict';
	//ooooooooooo

	//the main Wcave object, private
	var Wcave = function () {},
		instance = false,

		// the function that will be published in Window, and called with configuration
		wcave = function (conf) {
			if (!instance) {
				instance = new Wcave().init(conf);
			} else {
				W.console.error('A Wcave instance exists yet!!! ' + vars.version );
			}
		},
		self,
		//just cache document, and short it
		WD = W.document,

		/**
		 * vars are modified during the game
		 */
		vars = {

			urlE : encodeURIComponent(document.location.href), 

			// score for the game
			score : 0,

			// bonus obtained
			bonus : 0,

			// the worm 
			wormQueue : [],

			// the container for the canvas
			cnt : null,

			// that will be the canvas element
			canvas : null,

			// canvas sizes
			canvasHeight : 0,
			canvasWidth : 0,

			// the 2d context for the canvas
			ctx : null,

			// a flag for game activation
			active : false,

			// is the game over
			gameover : false,

			// here will steo in&out bounds for the tunnel
			bound_pairs : [],

			// offset to move background up and down
			Yoffset : 0,

			// offset to move background forward
			Xoffset : 0,

			// velocity
			//velocity : 0,

			// initial force direction (downward) 
			versus : -1,

			// function increment resetted each up and down, 
			// is the actual param of the force function 
			cursor : 0,

			// initial vertical position relative to the starting point
			xB : 0,

			// initial velocity, a bit upwarp
			vB : 15,

			//delta : 0,

			// this saves the last steep factor used,
			// is recalculated ensuring maxStepVariation(cnv.height%)
			// to the new value
			lastSteep : 0,

			// this will be the array for all the obstacles
			// is dynamic, so will not explode but will remain tiny, tipically 2 or 3 sized
			// if setting are given it becomes false
			obstacles : [],

			// as for obstacles, given option ill contain dynamic array of point pills
			ppills : [],

			// number of hit point pills, used as factor to increase score bonus

			//not used at the moment
			//hpills : false,

			// the audio element, sibling next to canvas
			audio : null,

			//messagePanel div, used for start/end game, sibling prev to canvas
			messagePanel : null,

			// the index of the collision lines to be checked (tipically 0 or 1)
			tunnelCollisionIndex : 0,

			//pause
			paused : false,

			//mid background index
			freezeBgIndex : 0,

			//cache length
			freezeBgLength : 0,

			feverMode : false,
			feverCount : 0,
			feverIndexes : [],

			// for final extra bonus (score 10%), if all ppills have been caught
			missedPpills : 0,

			//cbackz
			cbacks : {
				gameover : function () {},
				gamestart : function () {},
				scoreupdate : function () {},
			}
		},
		/**
		 * conf is a set of constants to calibrate various aspects of the game,
		 * many of that values are given in percentage, relative to canvas height or width
		 */
		conf = {

			gameName : 'Wcave',

			// the worm size, perc @ cnv.height
			wormSize : 0.015,

			// position from left of the worm head, perc @ cnv.width
			wormHead : 0.16,

			//number of point that built the worm queue
			wormLenght : 8,

			// minimum width of a tunnel branch, perc @ cnv.width
			minStep : 0.5,

			// maximum width of a tunnel branch, perc @ cnv.width
			maxStep : 1.5,

			// speep of the worm, perc @ cnv.width
			//speed : 0.023,
			speed : 0.018,

			// animation timeout (ms)
			freq : 25,

			// initial tunnel height, perc @ cnv.height
			initHeight : 0.95,

			// tunnel decay at each branch, perc @ self.height
			stepDecay : 0.98,

			// just a dev flag to enable disable any collision
			collision : true,

			// obstable size perc @ cnv.height, this is height, halved in width
			obstacleSize : 0.1,

			// minimum & maximim steep (1 corresponds to PI/4)
			minSteep : -0.7,// perc min and max speet variation
			maxSteep : 0.7,

			//maximum variation between steep-i and steep-(i+1)
			maxSteepVariation : 0.5,

			// audio file
			audiointro : JMVC.vars.baseurl + '/media/audio/revolve.ogg',

			// id attribute for the audio tag
			audioid : 'au',

			// radius for point pills, perc @ cnv.width
			ppillsSize : 0.015,

			theme : 'holland',

			// the tunnel height will shrink until it satisfies
			// tunnel_height >= stopHeightDecay * obstacleSize
			stopHeightDecay : 3,



			doomObstacles : 3,

			//as far as the cave stop shrinking, freezeDecay becomes true
			freezeDecay : false,

			/**
			 * used for storing real px values for all elements
			 * set in width or height percentage
			 */
			real : {},

			/**
			 * id attribute for high score list container
			 * @type {String}
			 */
			hsContainerId : 'hscontainer',

			// reload the page at restart or make it gently?
			// this setting has something to do with tracking because
			// as far as a hard restart is used, each single game can be tracked
			hardRestart : false,

			// frequency used in any blinking element
			blinkrate : 2,

			// if false it is possible to doom as far as the missed pill is visible
			// if true it is possible to doom only before missing a pill
			ppillsStrictCatch : false,

			// colors used
			colors : {
				matrix : {
					worm : ['#00ff00', '#003300'],
					//the background, the gradient is created with all the colors specified
					bg : ['#000000', '#00ff00', '#000000'],
					freezebg : ['#555555', '#333333'],
					//freezebg : ['#FF0000', '#00FF00', '#0000FF'],
					tunnel : '#000000',
					obstacles : '#ffffff',
					//ppills : '#ff0000',
					hpills : '#00ff00',
					feverHead : ['#FF0000', '#00FF00', '#0000FF'],
					feverBonus : ['#FF0000', '#00FF00', '#0000FF'],
					ppills : ['#FF0000', '#00FF00', '#0000FF']
				},
				matrix2 : {
					worm : ['#ffff00', '#330000'],
					//the background, the gradient is created with all the colors specified
					bg : ['#0000ff', '#ffff00',  '#fede76'],
					freezebg : ['#555555', '#333333'],
					//freezebg : ['#FF0000', '#00FF00', '#0000FF'],
					tunnel : '#555555',
					obstacles : '#ffffff',
					//ppills : '#ff0000',
					hpills : '#00ff00',
					feverHead : ['#FFFF00', '#0fFFf0', '#ff00FF'],
					feverBonus : ['#FF0000', '#00FF00', '#0000FF'],
					ppills : ['#0000', '#ffFF00', '#ffffFF']
				},
				holland : {
					worm : ['#ff8800', '#662200'],
					//the background, the gradient is created with all the colors specified
					bg : ['#00AA00', '#FF6600', '#000000'],
					freezebg : ['#555555', '#333333'],
					//freezebg : ['#FF0000', '#00FF00', '#0000FF'],
					tunnel : '#000000',
					obstacles : '#ffffff',
					//ppills : '#ff0000',
					hpills : '#00ff00',
					feverHead : ['#FF6600', '#00AA00', '#FFFFFF'],
					feverBonus : ['#FF6600', '#00AA00', '#FFFFFF'],
					ppills : ['#FF6600', '#00AA00', '#FFFFFF']
				}
			},

			// gravity factor
			g : 1.4,

			// template for start & end
			tpl : {
				start : '<h1>%gameName%</h1>' +
					'<div id="intro">' +
						'<div id="introtext">' +
							'<ul>' +
								'<li>Hold mouse to move up, release to move down</li>' +
								'<li>stay away from <span class="white">big white</span> rounded blocks</li>' +
								'<li>catch <span class="rgb1">r</span><span class="rgb2">g</span><span class="rgb3">b</span> rounded pills for points</li>' +
								'<li>%wormLength% consecutive pills enable <span class="ks" id="fmode">fever mode</span></li>' +
								//'<li>&DoubleUpDownArrow;</li>' +
								'<li>clean the cave hitting <span class="ks">d</span> (%doomObstacles% available); pause/resume with <span class="ks">p</span></li>' +
							'</ul>' +
						'</div>' +
					'</div>' +
					'<input id="start" type="button" value="START"/>',

				gameover : '<h1>%gameName%</h1>' +
					'<div id="outro">' +
						'<p>You scored <span>%score%</span> points</p>' +
						'<div id="%hscontainerid%"></div>' +
					'</div>' +
					'<input id="restart" type="button" value="PLAY AGAIN" />'
			}
		},
		cache = {
			//some lengths
			'fever_colors_length' : 0,
			'fever_bonus_length' : 0,
			'feverGradients' : [],

			//just to clone orignal object for soft restart
			'origVars' : 0,
			'origConf' : 0,

			//for unbindings at soft reloat
			'bindings' : [],

			//grows up
			'time' : 0
		};


	// generic onerror
	W.onerror = function (msg, url, ln) {
		W.console.error("JavaScript error: '" + msg + "' on " + url + "@" + ln);
	};

	Wcave.prototype.restart = function () {
		
		//ga event
		if (W._gaq) {
			_gaq.push(['_trackEvent', 'Game', 'Restat', 'another game']);
		}
		//hard restart
		if (conf.hardRestart) {
			W.document.location.reload();
		} else {
			// clean up content & intervals
			W.clearInterval(cache.panelBlink);

			W.document.getElementById(cache.opts.id).innerHTML = '';

			// recover conf and vars from clones got at the beginning 
			vars = cache.origVars;
			conf = cache.origConf;

			// unbind all events
			this.unbindall();

			// nullify instance and start over
			instance = null;
			wcave(cache.opts);
		}
	};

	/**
	 * Used to notify to user abount missing
	 * init script parameters
	 * 
	 * @param  String msg [the message to display]
	 * @return void
	 */
	Wcave.prototype.error = function (msg) {
		var err = WD.createElement('div');
		err.className = 'err';
		err.innerHTML = msg;
		WD.body.appendChild(err);
	};


	/**
	 * 
	 */
	/**
	 * called to add to points the bonus given by ppills 
	 * 
	 * @return void
	 */
	Wcave.prototype.ppillsScore = function () {
		// one more point pills caught
		vars.feverMode =  vars.feverCount >=  conf.wormLenght;
		vars.score += vars.feverMode ? 2 : 1;
	};






	/**
	 * initialize the game
	 * 
	 * @params {object} for options
	 *         mandatory parameters are:
	 *         > id : the id attribute of the target container div
	 *         
	 * 
	 * @return Wcave instance [description]
	 */
	Wcave.prototype.init = function () {
		// Wcave reference
		self = this;

			// game canvas size
		var	gamesize = null,

			// id attribute of the container in which the canvas will be created
			// must exists in the  body
			id = null,

			// size for the game canvas
			w = null,
			h = null,

			// size option passed
			size = null,
			i = 0;

		//options passed
		cache.opts = Array.prototype.pop.call(arguments);



		cache.origVars = self.utils.clone(vars);
		cache.origConf = self.utils.clone(conf);
		cache.fever_colors_length = conf.colors[conf.theme].feverHead.length;
		cache.fever_bonus_length = conf.colors[conf.theme].feverBonus.length;



		//self.utils.getYR('fede');


		if(conf.ppillsStrictCatch) {
			self.checkFeverAlive = function () {
				if (vars.ppills.length && vars.ppills[0].left + vars.Xoffset < vars.real.wormHead) {
					vars.feverCount = 0;
					//no more extrabonus
					vars.missedPpills += 1;
				}
			};
			self.clearPpills = function () {
				if (vars.ppills.length && vars.ppills[0].left + vars.Xoffset < 0) {
				//if (vars.ppills.length && vars.ppills[0].left < vars.real.wormHead) {
					vars.ppills.splice(0, 1);
				}
			};
		} else{
			self.checkFeverAlive = function () {
				if (vars.ppills.length && vars.ppills[0].left + vars.Xoffset < 0) {
					vars.feverCount = 0;
					//no more extrabonus
					vars.missedPpills += 1;
					vars.ppills.splice(0, 1);
				}
			};
			self.clearPpills = function () {};
		}


		vars.wormColors = self.utils.getGradientArray(
			conf.colors[conf.theme].worm[0],
			conf.colors[conf.theme].worm[1],
			conf.wormLenght - 2
		);
		//cache.feverGradients = [];
		for (null; i < cache.fever_colors_length; i += 1) {
			cache.feverGradients[i] = self.utils.getGradientArray(
				conf.colors[conf.theme].feverHead[i],
				'#111111',
				conf.wormLenght - 2
			);
		}
		vars.freezeBgLength = conf.colors[conf.theme].freezebg.length;

		

		//  some checks for mandatory options
		if (!cache.opts) {
			self.error('No options passed!');
			return false;
		}
		if (typeof cache.opts.id === 'undefined') {
			self.error('No id passed!');
			return false;
		}
		if (typeof cache.opts.size === 'undefined' && (typeof (cache.opts.w * cache.opts.h) !== 'number')) {
			self.error('No size info passed!');
			return false;
		}

		if (cache.opts.cbacks && cache.opts.cbacks.gameover && typeof cache.opts.cbacks.gameover === 'function') {
			vars.cbacks.gameover = cache.opts.cbacks.gameover;
		}
		if (cache.opts.cbacks && cache.opts.cbacks.gamestart && typeof cache.opts.cbacks.gamestart === 'function') {
			vars.cbacks.gamestart = cache.opts.cbacks.gamestart;
		}
		if (cache.opts.cbacks && cache.opts.cbacks.scoreupdate && typeof cache.opts.cbacks.scoreupdate === 'function') {
			vars.cbacks.scoreupdate = cache.opts.cbacks.scoreupdate;
		}



		id = cache.opts.id;
		w = cache.opts.w;
		h = cache.opts.h;
		size = cache.opts.size;


		//try to get a reference to the container
		self.cnt = WD.getElementById(id);

		// if the container is not found, stop
		if (!self.cnt) {
			self.error('no container #' + id + ' found.');
			return false;
		}

		// OK now it seems to be all right and the game can be initialized

		/**
		 * obstacles requires to be specified in options
		 * @type {Array}
		 */
		//cache.opts.obstacles && (vars.obstacles = []);
		if (typeof cache.opts.obstacles !== 'undefined' && !cache.opts.obstacles) {
			vars.obstacles = false;
		}

		/**
		 * ppills must be specified in options
		 * ppils stand for PointPills, if caugth give an extra immediate score
		 * exponential in the number of caugth pills
		 * @type {Array}
		 */
		//cache.opts.ppills && (vars.ppills = []);
		if (typeof cache.opts.ppills !== 'undefined' && !cache.opts.ppills) {
			vars.ppills = false;
		}



		conf.doomObstacles = (
			typeof cache.opts.doom !== 'undefined'
			&&
			!cache.opts.doom
		) ? false : cache.opts.doom || conf.doomObstacles;


		/**
		 * hpills must be specified as boolean in options
		 * at the moment are not implemented
		 * are meant to make the next height decay to be skipped
		 * @type {Array}
		 */
		cache.opts.hpills && (vars.hpills = []);

		/**
		 * container for real px values (obtained from percentages specified in Wcave.conf)
		 * @type {Object}
		 */
		//vars.real = {};

		/**
		 * size is copied from a mandatory value from options and if its value is set as 'auto'
		 * the width and height of canvas will be valued as the  maximum viewport possible values
		 */
		if (size && size === 'auto') {
			gamesize = self.utils.getScreenSize();
			w = parseInt(gamesize.w, 10);
			h = parseInt(gamesize.h, 10);
		}

		// stilize the canvas as set above
		self.utils.stilize(self.cnt, {
			width : w + 'px',
			height : h + 'px'
		});
		// and store 'em in the Wcave object
		vars.canvasWidth = w;
		vars.canvasHeight = h;

		self.cnt.className = 'cnt';

		// create&append a relative positioned
		// container for the canvas
		self.container = WD.createElement('div');
		self.cnt.appendChild(self.container);
		self.utils.stilize(self.container, {
			position : 'relative',
			width : w + 'px',
			height : h + 'px',
			overflow : 'hidden'
		});

		// create & stilize & append
		// the canvas tag playground
		self.canvas = W.document.createElement('canvas');
		// hint : explicit attributes for the canvas tag are mandatory
		self.canvas.setAttribute('width', w);
		self.canvas.setAttribute('height', h);
		self.utils.stilize(self.canvas, {
			position : 'absolute',
			width : w + 'px',
			height : h + 'px',
			left : '0px',
			top : '0px',
			zIndex : 100
		});
		self.container.appendChild(self.canvas);


		//get the canvas context
		self.ctx = self.canvas.getContext("2d");


		/**
		 * messagePanel is used to show start/end dialogs
		 * @type DOMnode
		 */
		self.messagePanel = WD.createElement('div');
		self.messagePanel.setAttribute('id', 'panel');
		self.utils.stilize(self.messagePanel, {
			position : 'relative',
			width : w / 2 + 'px',
			left :  w / 4 + 'px'
			//,top :  h / 4 + 'px'
			//,height : h / 2 + 'px'
		});
		self.utils.attr(self.messagePanel, {'class' : 'panel'});
		self.messagePanel.innerHTML = self.utils.replaceall(
			conf.tpl.start, {
				gameName : conf.gameName,
				wormLength : conf.wormLenght,
				doomObstacles : conf.doomObstacles
			}
		);



		
		self.container.appendChild(self.messagePanel);

		self.utils.stilize(self.messagePanel, {
			top : ((vars.canvasHeight - self.messagePanel.clientHeight) / 2) + 'px'
		});



		//psycoize fever mode string
		i = W.document.getElementById('fmode');
		cache.panelBlink = W.setInterval(
			function () {
				i.style.color = conf.colors[conf.theme].feverHead[+new Date() % cache.fever_colors_length];
			},
			20
		);

		/////////////////////////////////////////////////////////////////
		// get real measures
		vars.real = {
			wormSize : self.canvas.height * conf.wormSize,
			wormHead : self.canvas.width * conf.wormHead,
			initHeight : self.canvas.height * conf.initHeight,
			obstacleSize : self.canvas.height * conf.obstacleSize,
			//speed : self.canvas.width * conf.speed,
			speed : self.canvas.width * conf.speed,
			ppillsSize : self.canvas.height * conf.ppillsSize
		};
		//
		//
		//
		//
		////////////////////////////////////////////////////////////////

		// create tunnel begin
		self.initTunnel();

		// create audio markup, if silence
		// is not requested in options
		(typeof cache.opts.sound === 'undefined' || !!cache.opts.sound) && self.initAudio();

		(typeof cache.opts.collision !== 'undefined' && !cache.opts.collision) && (conf.collision = false);

		//bind panel start
		self.panelBind();

		// draw background
		self.drawBg();

		// draw the tunnel
		self.drawTunnel();

		// be chain frienldy with init
		return self;
	};

	/**
	 * [initTunnel description]
	 * @return {[type]} [description]
	 */
	Wcave.prototype.initTunnel = function () {
		// initial bounds
		var	leftCur = vars.canvasWidth / 2,
			h = vars.canvasHeight,
			w = vars.canvasWidth,
			rh = vars.real.initHeight,
			done = false,
			t1,
			t2,
			len = 0,
			lnode,
			topCur;

		//first
		//
		// (left)
		// o...   (t1)
		// |
		// |
		// 0...   (t2)
		vars.bound_pairs.push({
			left : 0,
			t1 : (h - rh) / 2,
			t2 : (h + rh) / 2
		});

		//second, always in the middle
		//    (left)
		//      .
		//      .
		// ..---o... (t1)
		//      |
		//      |
		// ..---o...  (t2)
		// 
		vars.bound_pairs.push({
			left : w / 2,
			t1 : (h - rh) / 2,
			t2 : (h + rh) / 2
		});

		len = vars.bound_pairs.length;

		// complete util a branch is totally drawn outside
		while (!done) {

			// get the last node in the list, just to decide where to put the next one
			// using step&steep bounds settings
			lnode = vars.bound_pairs[len - 1];

			// leftCur at first is middle width, as the last node (2nd) in the list before entering the loop
			// and is used to remember where has been left placed the last node
			leftCur += w * self.utils.rand(conf.minStep, conf.maxStep);

			// tmpTop
			topCur = lnode.t1 + h * self.utils.rand(conf.minSteep, conf.maxSteep);

			t1 = topCur;
			t2 =  topCur + (lnode.t2 - lnode.t1) * conf.stepDecay;


			vars.bound_pairs.push({
				left : leftCur,
				t1 : t1,
				t2 : t2
			});

			//gain a bit
			len += 1;

			// if the last node has been drawn out, we're done
			done = (vars.bound_pairs[len - 2].left > Math.abs(vars.Xoffset) + w);
		}
	};


	/**
	 * create the audio markup 
	 * @return {[type]} [description]
	 */
	Wcave.prototype.initAudio = function () {
		//var self = this;
		//
		//audio
		if (conf.audiointro) {

			vars.audio = WD.createElement('audio');

			self.utils.attr(vars.audio, {'id' : conf.audioid, 'loop' : ''});

			// append the source tag
			vars.audio.appendChild(
				self.utils.attr(
					WD.createElement('source'),
					{'type' : 'audio/ogg', 'src' : conf.audiointro}
				)
			);

			self.container.appendChild(vars.audio);
			vars.audio.play();
		}
	};


	/**
	 * [panelBind description]
	 * @return {[type]} [description]
	 */
	Wcave.prototype.panelBind = function () {
		var	togglehs = WD.getElementById('toggleHs'),
			start = WD.getElementById('start'),

			message_panel = function (e) {
				self.canvas.style.cursor = 'none';
				self.utils.killEvent(e);
				self.messagePanel.style.display = 'none';
				vars.active = true;
				self.gameBind();
				
				vars.cbacks.gamestart.call(self);
				
				self.run();
			},
			highscore_panel = function (e) {

				// specify a callback for manage highscores json data
				self.getHS(function (jdata) {

					//cache panel reference, being used more than once thereafter
					var panel = WD.getElementById('panel');

					// append the hs table creation results in the right place
					WD.getElementById('introhs').appendChild(
						Wcave.prototype.utils.buildHighScoreTable(jdata)
					);

					// now that the panel is higher, adjust top position
					panel.style.top = ((vars.canvasHeight - panel.clientHeight) / 2) + 'px';

					//hide the button to display HS
					togglehs.style.display = 'none';

				});
			};
		// bind start & getHS buttonz 
		self.utils.bind(start, 'click', message_panel);

		//store bindings
		cache.bindings.push([start, 'click', message_panel]);
	};

	// used to resume the game after a pause (p)
	Wcave.prototype.resume = function () {
		self.run();
	};

	/**
	 * This method set all the ingame bindings:
	 * 
	 * - controls to play (mouse and almost all keyboard)
	 * - pause/resume (p)
	 * - doom button (d)
	 * 
	 * @return {[type]} [description]
	 */
	Wcave.prototype.gameBind = function () {
		var	f_down = function (e) {
				self.cnt.blur();

				if (vars.gameover) {
					return false;
				}

				if (!vars.active) {
					vars.active = true;
					return;
				}
				self.g_reinit();
				vars.versus = 1;
				vars.cursor = 0;
			},

			f_up = function (e) {
				self.cnt.blur();
				if (vars.gameover) {
					return false;
				}
				self.g_reinit();
				vars.versus = -1;
				vars.cursor = 0;
			},

			listen = function (e) {
				return (
					e.keyCode !== 68 && e.charCode !== 100   //doom
					&&
					e.keyCode !== 112 && e.charCode !== 112  //pause
				);
			},

			k_press = function (e) {
				listen(e) && f_down(e);
			},

			k_up = function (e) {
				listen(e) && f_up(e);
			},

			k_down = function (e) {
				if (vars.gameover) {
					return;
				}

				switch (e.keyCode) {
				// pause
				case 80:
					vars.paused = !vars.paused;
					!vars.paused && self.resume();
					e.stopPropagation();
					break;
				// doom
				case 68:
					if (conf.doomObstacles) {
						conf.doomObstacles -= 1;
						//flash
						self.ctx.fillStyle = '#FFFFFF';
						self.ctx.fillRect(
							0,
							0,
							self.canvas.width,
							self.canvas.height
						);
						vars.obstacles = [];
						vars.ppills = [];
						e.stopPropagation();
					}
					break;
				default: break;
				}
			};

		// real bindings
		self.utils.bind(self.cnt, 'mousedown', f_down);
		self.utils.bind(self.cnt, 'mouseup', f_up);
		self.utils.bind(self.cnt, 'touchstart', f_down);
		self.utils.bind(self.cnt, 'touchend', f_up);
		//
		self.utils.bind(WD, 'keypress', k_press);
		self.utils.bind(WD, 'keyup', k_up);
		self.utils.bind(WD, 'keydown', k_down);


		//store bindings
		cache.bindings.push([self.cnt, 'mousedown', f_down]);
		cache.bindings.push([self.cnt, 'mouseup', f_up]);
		cache.bindings.push([self.cnt, 'touchstart', f_down]);
		cache.bindings.push([self.cnt, 'touchend', f_up]);
		//
		cache.bindings.push([WD, 'keypress', k_press]);
		cache.bindings.push([WD, 'keyup', k_up]);
		cache.bindings.push([WD, 'keydown', k_down]);
	};

	/**
	 * Necessary to unbind all binded events before reloading the game,
	 * if not done, for example, at second loading a 'd' hit would take 2 oom possibilities.
	 * Look at the restart method
	 * @return {[type]} [description]
	 */
	Wcave.prototype.unbindall = function () {
		var	bin = cache.bindings,
			i = 0,
			l = bin.length;
		for (null; i < l; i += 1) {
			self.utils.unbind(bin[i][0], bin[i][1], bin[i][2]);
		}
	};


	/**
	 * that method sets the initial conditions as
	 * at every gravity inversion (or every propulsion switch, as u like)
	 * @return void
	 */
	Wcave.prototype.g_reinit = function () {
		vars.xB = vars.xB
			+ vars.vB * vars.cursor
			+ 0.5 * vars.versus * conf.g * vars.cursor * vars.cursor;
		vars.vB = vars.vB
			+ vars.versus * conf.g * vars.cursor;
	};

	/**
	 * called at each draw cycle by xypos, computes the offset for the background,
	 * that sill be applied at each backgraound element; additionally it will compute
	 * base score
	 * @return Object wcave
	 */
	Wcave.prototype.ypos = function () {

		vars.Yoffset = vars.xB
			+ vars.vB * vars.cursor
			+ vars.versus * 0.5 * conf.g * vars.cursor * vars.cursor;
		/**
		 * x = xo + vo t + 1/2 g t t
		 */
		return self;
	};


	/**
	 * Called at each draw cycle by xypos just to move orizontally
	 * @return Object wcave
	 */
	Wcave.prototype.xpos = function () {
		vars.Xoffset -= vars.real.speed;
		return self;
	};


	/**
	 * execute both previous
	 * @return Object Wcave
	 */
	Wcave.prototype.xypos = function () {
		return self.xpos().ypos();
	};

	Wcave.prototype.updateCursor = function () {
		vars.cursor += 1;
	};

	Wcave.prototype.update = function () {
		W.setTimeout(
			function (s) {s.run(); },
			conf.freq,
			self
		);
	};

	/**
	 * 
	 * @return {[type]} [description]
	 */
	Wcave.prototype.run = function () {
		cache.time += 1;

		/**
		 * here all these methods are called in sequence,
		 * if an elementcontains a 2 sized array, the first is a condition
		 * and the second is the name of the method that will be executed
		 * only if the condition is evalued true.
		 */
		self.utils.queueCall.apply(self, [
			'updateCursor',
			'xypos',
			'drawBg',
			'drawTunnel',
			'drawScore',
			'drawObstacles',
			'drawWorm',
			'drawPills',
			'drawDoomObstacles',
			[conf.collision, 'checkCollisions'],
			//[vars.ppills, 'ppillsNotifyBonus'],
			[vars.active && !vars.paused, 'update'],
			[!vars.active, 'gameOver']
		]);

	};

	/**
	 * [drawScore description]
	 * @return {[type]} [description]
	 */
	Wcave.prototype.drawScore = function () {
		var	ss = self.ctx.strokeStyle;

		self.ctx.strokeStyle = "#ffffff";
		self.ctx.fillStyle = "#000000";
		self.ctx.lineWidth = 2;
		//font-family: 'Freckle Face',cursive;
		self.ctx.font = "bold 50px 'Freckle Face',Verdana";
		self.ctx.textBaseline = 'top';
		self.ctx.strokeText(self.utils.formatScore(vars.score), 5, 5);
		self.ctx.strokeStyle = ss;
		vars.cbacks.scoreupdate.call(self, vars.score);
	};

	Wcave.prototype.checkCollisions = function () {
		var	imgdFW = self.ctx.getImageData(
				vars.real.wormHead + vars.real.wormSize + 1,
				self.canvas.height / 2,
				1,
				1
			),
			pixFW = imgdFW.data,
			imgdFW2 = self.ctx.getImageData(
				vars.real.wormHead + vars.real.wormSize + 2,
				self.canvas.height / 2,
				1,
				1
			),
			pixFW2 = imgdFW2.data,
			rgbFW = self.utils.rgb2hex(pixFW[0], pixFW[1], pixFW[2]),
			rgbFW2 = self.utils.rgb2hex(pixFW2[0], pixFW2[1], pixFW2[2]),
			rgbTrg,
			gameoverize = function () {
				vars.active = false;
				vars.gameover = true;
				return;
			},
			obstacle,
			ppill,
			whead;


		//obstacle ? 
		if (vars.obstacles && vars.obstacles.length) {
			//the obstacle that can be hit
			obstacle = vars.obstacles[0];

			whead = self.canvas.height / 2;

			//on x, near to obstacle
			vars.real.wormHead - obstacle[0] + vars.Xoffset < vars.real.speed / 2
			&&
			vars.real.wormHead - obstacle[0] + vars.Xoffset  > 0
			&&
			//on y between top and down
			obstacle[1] + vars.Yoffset - vars.real.obstacleSize / 2 < whead
			&&
			whead <  obstacle[1] + vars.Yoffset + vars.real.obstacleSize / 2
			//
			&&
			gameoverize();
		}


		//ppills ? 
		if (vars.ppills && vars.ppills.length) {
			//the ppills 
			ppill = vars.ppills[0];
			//use center distance

			if (
				self.utils.pdistance(
					vars.real.wormHead,
					self.canvas.height / 2,
					ppill.left + vars.Xoffset,
					ppill.top + vars.Yoffset
				) < (4 * vars.real.wormSize)
			) {
				vars.feverCount += 1;
				self.ppillsScore();
				self.removePpills();
				return;
			}
		}

		//out of tunnel ? 
		// solo se due pixel uno davanti all' altro sono
		// diversi dal tunnel
		// prendo il secondo con target
		rgbFW !== conf.colors[conf.theme].tunnel && (rgbTrg = rgbFW)
		&&
		rgbFW2 !== conf.colors[conf.theme].tunnel && (rgbTrg = rgbFW2)
		&&
		gameoverize();

		/*
		
				| i  j  k  |
		a x b = | a1 a2 a3 | = i(a2 b3 - b2 a3) - j(a1 b3 - b1 a3) + k (a1 b2 - b1 a2)
				| b1 b2 b3 |
		a3 = b3 = 0 (plane)
		the sign of the k components tell us if we are above or below
		 */
	};

	Wcave.prototype.drawDoomObstacles = function () {
		var	ss = self.ctx.strokeStyle,
			str = '',
			i = 0;
		for (null; i < conf.doomObstacles; i += 1) {
			str += '* ';
		}
		self.ctx.strokeStyle = "#ffffff";
		self.ctx.fillStyle = "#000000";
		self.ctx.lineWidth = 1;
		self.ctx.font = "20px 'Freckle Face',Verdana";
		self.ctx.textBaseline = 'top';
		self.ctx.strokeText(str, 5, 60);
		self.ctx.strokeStyle = ss;
	};

	/**
	 * [bg description]
	 * @return {[type]} [description]
	 */
	Wcave.prototype.drawBg = function () {
		var	cg = self.ctx.createLinearGradient(0, 0, self.canvas.width, 0),
			step = 1 / (conf.colors[conf.theme].bg.length - 1);

		cg.addColorStop(0, conf.colors[conf.theme].bg[0]);
		cg.addColorStop(
			step,
			//vars.freezeDecay ? conf.colors[conf.theme].freezebg[vars.freezeBgIndex] : conf.colors[conf.theme].bg[1]
			vars.freezeDecay ? conf.colors[conf.theme].freezebg[ ~~(cache.time / conf.blinkrate) % vars.freezeBgLength ] : conf.colors[conf.theme].bg[1]
		);
		cg.addColorStop(2 * step, conf.colors[conf.theme].bg[2]);
		vars.freezeBgIndex += 1;
		vars.freezeBgIndex %= vars.freezeBgLength;
		self.ctx.fillStyle = cg;
		self.ctx.fillRect(0, 0, self.canvas.width, self.canvas.height);
	};

	/**
	 * [drawWorm description]
	 * @return {[type]} [description]
	 */
	Wcave.prototype.drawWorm = function () {
		var	i,
			l,
			feverCount = vars.feverCount;

		for (i = 0, l = conf.wormLenght; i < l; i += 1) {

			self.ctx.beginPath(
				vars.real.wormHead - i * vars.real.speed,
				vars.Yoffset + self.canvas.height / 2 - vars.wormQueue[i]
			);
			self.ctx.arc(
				vars.real.wormHead - i * vars.real.speed,
				vars.Yoffset + self.canvas.height / 2  - vars.wormQueue[i],
				vars.real.wormSize,
				0,
				2 * Math.PI,
				true
			);

			self.ctx.fillStyle = feverCount ?
				cache.feverGradients[(~~(cache.time / conf.blinkrate) + i) % cache.fever_colors_length][i]
				:
				vars.wormColors[i];

			feverCount && (feverCount -= 1);

			self.ctx.lineWidth = 1;
			self.ctx.closePath();
			self.ctx.fill();
		}

		self.checkWorm();
	};

	/**
	 * [checkWorm description]
	 * @return {[type]} [description]
	 */
	Wcave.prototype.checkWorm = function () {
		vars.wormQueue.splice(0, 0, vars.Yoffset);

		if (vars.wormQueue.length > conf.wormLenght) {
			vars.wormQueue.pop();
		}
	};

	/**
	 * [drawTunnel description]
	 * @return {[type]} [description]
	 */
	Wcave.prototype.drawTunnel = function () {
		var	i = 0,
			p = vars.bound_pairs,
			len = p.length,
			vertex = 30;

		self.ctx.fillStyle = conf.colors[conf.theme].tunnel;
		self.ctx.strokeStyle = conf.colors[conf.theme].tunnel;
		self.ctx.lineWidth = 0;

		for (null; i < len - 1; i += 1) {
			//ray up
			self.ctx.beginPath();
			self.ctx.moveTo(self.canvas.width / 2, vertex);
			self.ctx.lineTo(p[i].left + vars.Xoffset, p[i].t1 + vars.Yoffset);
			self.ctx.stroke();
			self.ctx.closePath();

			//ray down
			self.ctx.beginPath();
			self.ctx.moveTo(self.canvas.width / 2, self.canvas.height - vertex);
			self.ctx.lineTo(p[i].left + vars.Xoffset, p[i].t2 + vars.Yoffset);
			self.ctx.stroke();
			self.ctx.closePath();

			self.ctx.beginPath();
			self.ctx.moveTo(p[i].left - 1 + vars.Xoffset, p[i].t1 + vars.Yoffset);
			self.ctx.lineTo(p[i + 1].left + vars.Xoffset, p[i + 1].t1 + vars.Yoffset);
			/*
			o-----------o
						|
						|
						|
						|
			o-----------o
			 */
			self.ctx.lineTo(p[i + 1].left + vars.Xoffset, p[i + 1].t2 + vars.Yoffset);
			self.ctx.lineTo(p[i].left - 1 + vars.Xoffset, p[i].t2 + vars.Yoffset);

			self.ctx.stroke();

			self.ctx.closePath();
			self.ctx.fill();

			//set collisionTunnelIndex
			//can choose up or down is indifferent
			if (p[i].left - 1 + vars.Xoffset < vars.real.wormHead && vars.real.wormHead <= p[i + 1].left + vars.Xoffset) {
				vars.collisionTunnelIndex = i;
			}
		}

		//manage bound_pairs
		this.checkTunnel();
	};

	/**
	 * [checkTunnel description]
	 * @return {[type]} [description]
	 */
	Wcave.prototype.checkTunnel = function () {
		var	l = vars.bound_pairs.length,
			ref2First = vars.bound_pairs[1],
			ref2Last = vars.bound_pairs[l - 2];


		function delBound() {
			vars.bound_pairs.splice(0, 1);
		}

		function addBound() {
			var l_in = vars.bound_pairs.length,
				lnode = vars.bound_pairs[l_in - 1],
				tmp = self.utils.rand(conf.minSteep, conf.maxSteep),
				ynew,
				left,
				t1,
				t2;

			if (Math.abs(vars.lastSteep - tmp) > conf.maxSteepVariation) {
				tmp = self.utils.randSign() * self.utils.rand(vars.lastSteep, conf.maxSteepVariation);
				vars.lastSteep = tmp;
			}

			ynew = lnode.t1 + vars.canvasHeight * tmp;

			left = lnode.left + vars.canvasWidth * self.utils.rand(conf.minStep, conf.maxStep);
			t1 = ynew;
			t2 = ynew + lnode.t2 - lnode.t1;


			if (!vars.freezeDecay
				&&
				(
					(vars.obstacles && (lnode.t2 - lnode.t1) > vars.real.obstacleSize * conf.stopHeightDecay)
					||
					(!vars.obstacles && (lnode.t2 - lnode.t1) > vars.real.obstacleSize)
				)
			) {
				t2 = ynew + (lnode.t2 - lnode.t1) * conf.stepDecay;
			} else {
				vars.freezeDecay = true;
			}


			vars.bound_pairs.push({
				left : left,
				t1 : t1,
				t2 : t2
			});
			// Trig added bound
			// used to add/remove obstacles and pills
			self.onAddedBound();
		}

		// should remove on tail ?
		ref2First.left + vars.Xoffset < 0 && delBound();

		// should add on head ?
		//console.debug(ref2Last.left +  vars.Xoffset < vars.canvasWidth)
		ref2Last.left + vars.Xoffset < vars.canvasWidth  && addBound();
	};

	/**
	 * [onAddedBound description]
	 * @return {[type]} [description]
	 */
	Wcave.prototype.onAddedBound = function () {
		var	len = vars.bound_pairs.length,
			last = vars.bound_pairs[len - 1],
			semilast = vars.bound_pairs[len - 2],
			midX,
			midY,
			pill;

		// obstacles
		if (vars.obstacles) {
			vars.obstacles.push([
				last.left,
				self.utils.rand(last.t1 + vars.real.obstacleSize / 2, last.t2 - vars.real.obstacleSize / 2) ]);
		}

		//pills
		if (vars.ppills) {
			midX = (last.left + semilast.left) / 2;
			midY = (last.t1 + semilast.t2) / 2 + self.utils.randSign() * 0.8 * self.utils.rand(0, last.t2 - last.t1) / 2;
			pill = {
				left : midX,
				top : midY,
				getRandomColor : function () {
					var i = 0,
						pool = conf.colors[conf.theme].ppills;
					pill.getRandomColor = function () {
						i += 1;
						return pool[~~(i / conf.blinkrate) % pool.length];
					};
					return pool[i];
				}
			};
			vars.ppills.push(pill);
		}
	};

	/**
	 * [drawObstacles description]
	 * @return {[type]} [description]
	 */
	Wcave.prototype.drawObstacles = function () {
		var	i,
			l;
		if (vars.obstacles.length && vars.obstacles[0][0] + vars.Xoffset < 0) {
			vars.obstacles.splice(0, 1);
		}

		self.ctx.fillStyle = conf.colors[conf.theme].obstacles;

		for (i = 0, l = vars.obstacles.length; i < l; i += 1) {
			self.roundRect(
				vars.obstacles[i][0] + vars.Xoffset - vars.real.obstacleSize / 2,
				vars.obstacles[i][1] + vars.Yoffset - vars.real.obstacleSize / 2,
				vars.real.obstacleSize / 2,
				vars.real.obstacleSize
			);
		}
	};
	Wcave.prototype.roundRect = function (x, y, w, h, r) {
		r = r || 20;
		self.ctx.beginPath();
		self.ctx.moveTo(x + r, y);
		self.ctx.lineTo(x + w - r, y);
		self.ctx.quadraticCurveTo(x + w, y, x + w, y + r);
		self.ctx.lineTo(x + w, y + h - r);
		self.ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
		self.ctx.lineTo(x + r, y + h);
		self.ctx.quadraticCurveTo(x, y + h, x, y + h - r);
		self.ctx.lineTo(x, y + r);
		self.ctx.quadraticCurveTo(x, y, x + r, y);
		self.ctx.closePath();
		self.ctx.stroke();
		self.ctx.fill();
	};

	/**
	 * [removePpills description]
	 * @return {[type]} [description]
	 */
	Wcave.prototype.removePpills = function () {

		vars.ppills.splice(0, 1);
	};

	/**
	 * [drawPills description]
	 * @return {[type]} [description]
	 */
	Wcave.prototype.drawPills = function () {
		var	i, l;
		
		self.checkFeverAlive();
		self.clearPpills();

		function pill(x, y, tpill) {
			self.ctx.beginPath(
				x,
				y
			);
			self.ctx.arc(
				x, y,
				vars.real.ppillsSize,
				0,
				2 * Math.PI,
				true
			);
			self.ctx.fillStyle = tpill.getRandomColor();// conf.colors[conf.theme].ppills;
			self.ctx.lineWidth = 1;
			self.ctx.closePath();
			self.ctx.fill();
		}


		self.ctx.fillStyle = conf.colors[conf.theme].ppills;

		for (i = 0, l = vars.ppills.length; i < l; i += 1) {
			pill(
				vars.ppills[i].left + vars.Xoffset - vars.real.ppillsSize / 2,
				vars.ppills[i].top + vars.Yoffset - vars.real.ppillsSize / 2,
				vars.ppills[i]
			);
		}
	};




	/**
	 * [gameOver description]
	 * @return {[type]} [description]
	 */
	Wcave.prototype.gameOver = function () {

		self.messagePanel.innerHTML = self.utils.replaceall(
			conf.tpl.gameover,
			{
				'gameName' : conf.gameName,
				'score': self.utils.formatScore(vars.score)
			}
		);

		self.utils.fadeIn(self.messagePanel);

		self.utils.bind(WD.getElementById('restart'), 'click', function () {
			self.restart();
		});

		self.utils.stilize(self.canvas, {
			cursor : 'default'
		});

		vars.cbacks.gameover.call(self, vars.score);

		//console.debug(vars);
		return false;
	};


	/**
	 * [utils description]
	 * @type {Object}
	 */
	Wcave.prototype.utils = {
		queueCall : function () {
			var i = 0,
				funcz = arguments,
				l = funcz.length;

			for (null; i < l; i += 1) {
				funcz[i] instanceof Array ?
					funcz[i][0] && this[funcz[i][1]].call(this)
					:
					this[funcz[i]].call(this);
			}
		},

		clone : function (obj) {
			var temp,
				key;
			if (obj === null || typeof obj !== 'object') {
				return obj;
			}
			temp = obj.constructor();

			for (key in obj) {
				if (obj.hasOwnProperty(key)) {
					temp[key] = this.clone(obj[key]);
				}
			}
			return temp;
		},

		fadeIn : function (el) {
			var o = 0.02,
				initOp = o,
				t;
			el.style.opacity = o;
			el.style.display = 'block';
			t = W.setInterval(
				function () {
					initOp += o;
					el.style.opacity = initOp;
					if (initOp >= 1) {
						el.style.opacity = 1;
						W.clearInterval(t);
					}
				},
				10
			);
		},
		formatScore : function (s) {
			s = String(s);
			var ret = [],
				l = s.length - 1,
				cnt = 0;
			while (l >= 0) {
				if (cnt % 3 === 0 && cnt) {
					ret.splice(0, 0, '.');
				}
				ret.splice(0, 0, s[l]);
				cnt += 1;
				l -= 1;
			}
			return ret.join('');
		},
		orderJsonBy : function (j, field) {
			var res = {};
		},
		stilize : function (el, rules) {
			var j;
			for (j in rules) {
				if (rules.hasOwnProperty(j)) {
					el.style[j] = rules[j];
				}
			}
			return el;
		},
		attr : function (el, obj) {
			var i;
			for (i in obj) {
				if (obj.hasOwnProperty(i)) {
					el.setAttribute(i, obj[i]);
				}
			}
			return el;
		},
		makeNS : function (str, obj, ctx) {
			var self = this,
				chr = '.',
				els = str.split(chr),
				u = 'undefined',
				ret;

			(typeof ctx === u) && (ctx = W);
			(typeof obj === u) && (obj = {});

			if (!ctx[els[0]]) {
				ctx[els[0]] = (els.length === 1) ? obj : {};
			}
			ret = ctx[els[0]];

			return (els.length > 1) ?
				self.makeNS(els.slice(1).join(chr), obj, ctx[els[0]])
				:
				ret;
			//return true;
		},

		bind : function (el, tipo, fn) {
			if (W.addEventListener) {
				el.addEventListener(tipo, fn, false);
			} else if (W.attachEvent) {
				var f = function () {fn.call(el, W.event); };
				el.attachEvent('on' + tipo, f);
			} else {
				el['on' + tipo] = function () {fn.call(el, W.event); };
			}
		},
		unbind : function (el, tipo, func) {
			if (el === null) {return; }
			if (el.removeEventListener) {
				el.removeEventListener(tipo, func, false);
			} else if (el.detachEvent) {
				el.detachEvent("on" + tipo, func);
			}
			func = null;
		},
		rand : function (min, max) {
			return min + Math.random() * (max - min);
		},
		randSign : function () {
			return Math.random() > 0.5 ? -1 : 1;
		},
		getScreenSize : function () {
			var f_filterResults = function (n_win, n_docel, n_body) {
				var n_result = n_win || 0;
				if (n_docel && (!n_result || (n_result > n_docel))) {
					n_result = n_docel;
				}
				return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
			};
			return {
				w  : f_filterResults(
					W.innerWidth || 0,
					WD.documentElement ? WD.documentElement.clientWidth : 0,
					WD.body ? WD.body.clientWidth : 0
				),
				h : f_filterResults(
					W.innerHeight || 0,
					WD.documentElement ? WD.documentElement.clientHeight : 0,
					WD.body ? WD.body.clientHeight : 0
				)
			};
		},
		'replaceall' : function (tpl, o, dD, Dd) {
			var reg = new RegExp((dD || '%') + '([A-z0-9-_]*)' + (Dd || '%'), 'g'),
				str;
			return tpl.replace(reg, function (str, $1) {
				//return o[$1] || $1;
				return o[$1] || '';
			});
		},
		'checkpound' : function (color) {
			return (color.charAt(0) === '#') ? color.substr(1) : color;
		},
		'getRandomColor' : function () {
			return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
		},
		'getGradientArray' : function (color1, color2, num) {
			var ret = [],
				int1,
				int2,
				diffs,
				components1,
				components2,
				components,
				i,
				j,
				operator,
				steps,
				signs;
			num += 1;
			color1 = this.checkpound(color1);
			color2 = this.checkpound(color2);

			int1 = this.hex2int(color1);
			int2 = this.hex2int(color2);

			num = Math.min(Math.abs(int1 - int2), num);

			diffs = {};
			steps = {};
			signs = {
				'+' : function (a, b) {return (a === b) ? a : a + b; },
				'-' : function (a, b) {return (a === b) ? a : a - b; }
			};
			components1 = this.hex2rgb(color1);
			components2 = this.hex2rgb(color2);

			components = {'r' : 0, 'g' : 0, 'b' : 0};
			for (i in components) {
				if (components.hasOwnProperty(i)) {
					diffs[i] = Math.abs(parseInt(components1[i], 10) - parseInt(components2[i], 10));
					steps[i] = diffs[i] / num;
				}
			}
			for (i = 0; i < num; i += 1) {
				for (j in components) {
					if (components.hasOwnProperty(j)) {
						operator = (parseInt(components1[j], 10) < parseInt(components2[j], 10)) ? '+' : '-';
						components[j] = this.padme(
							this.int2hex(signs[operator](parseInt(components1[j], 10), steps[j] * i)),
							0,
							'pre'
						);
					}
				}
				ret[i] = '#' + components.r + components.g + components.b;
			}
			ret[num] = '#' + color2;
			return ret;
		},
		'padme' : function (val, el, pos, lngt) {
			var len = lngt || 2;
			while ((String(val)).length < len) {
				switch (pos) {
				case 'pre':
					val = String(el + val);
					break;
				case 'post':
					val = String(val + el);
					break;
				}
			}
			return val;
		},
		'hex2int' : function (hex) {
			return parseInt(hex, 16);
		},
		'int2hex' : function (i) {
			return parseInt(i, 10).toString(16);
		},
		rgb2hex : function (r, g, b) {
			r = parseInt(r, 10).toString(16);
			g = parseInt(g, 10).toString(16);
			b = parseInt(b, 10).toString(16);
			r.length > 1 || (r = '0' + r);
			g.length > 1 || (g = '0' + g);
			b.length > 1 || (b = '0' + b);
			return '#' + r + g + b;
		},
		'hex2rgb' : function (hex) {
			var strhex = String(hex),
				more = (strhex.charAt(0) === '#') ? 1 : 0;
			return {
				r : parseInt(strhex.substr(more, 2), 16),
				g : parseInt(strhex.substr(more + 2, 2), 16),
				b : parseInt(strhex.substr(more + 4, 2), 16)
			};
		},
		killEvent : function (e) {
			if (!e) {
				e = W.event;
				e.cancelBubble = true;
				e.returnValue = false;
			}
			if (e.stopPropagation) {
				e.stopPropagation();
				e.preventDefault();
			}
			return false;
		},
		pdistance : function (p1x, p1y, p2x, p2y) {
			return Math.max(Math.abs(p2x - p1x), Math.abs(p2y - p1y));
			//return Math.sqrt((p2x - p1x) * (p2x - p1x) + (p2y - p1y) * (p2y - p1y));
		},
		out : function (msg, what) {
			W.console.debug(msg, what);
		}
	};

	//publish
	W.Wcave = wcave;

}(window);




