JMVC.require('core/css/css', 'core/dim/dim');

JMVC.extend('snow', {


	jSnow : function(target, options){

		options = options || {};

		//number of flake sources
		var strenght = options.stren || 1,
			//what snows down
			snowflake = options.str || 'flakes',
			//how many flakes per second
			ti = options.ti || 1,
			//flake size
			size = options.size || 80,
			color = options.color || 'white',

			body_dim = target == "body" ? 
					JMVC.dim.getViewportSize()
					:
					new Array(JMVC.num.getNum(JMVC.css.width(target)), JMVC.num.getNum(JMVC.css.height(target))),
			
			

			x = false,
			speeds = [1,2,3,4,5,20,21,22,23],
			sizes = [2,20],
			phases = [20,40],
			amplitudes = [10,20],
			directions = [-5,5],
			opacities = [0.1,1],

			body_width = body_dim[0]-20,
			body_height = body_dim[1]-20,

			count = 0,

			container_id = 'snow_container',
			snowflakez = { },

			base_div = JMVC.dom.create('div', {id:container_id, style:"position:absolute;display:block;top:0px; left:0px;"}),

			flake = JMVC.dom.create('span'),
			rotation = (snowflake ==='flakes'),
			rot_string = options.mode=='rot',
			rot_flakes = new Array('*','#','+'),
			rot_incr = new Array(-1,1),

			Snow = function(){

				JMVC.dom.append(JMVC.dom.find(target), base_div);

				this.flake_sources = [];

				this.start = function () {
					for (var i = 0, l = this.flake_sources.length; i < l; i += 1) {
						this.flake_sources[i].append_flake();
					}
				};

				this.init = function(){
					for(var i  =0; i<strenght; i++){
						this.flake_sources.push(new Flake_source(this));
					}
					this.start();
				}
				this.init();
			},

			Flake_source = function (parent) {

				var that = this,
					rn = JMVC.util.rand(500,1000);

				this.append_flake = function(){
					var opa = JMVC.util.rand(opacities[0]*10, opacities[1]*10) /10;
					var siz = Math.round(sizes[0] + opa*(sizes[1]-sizes[0]));
					//var speed = Math.round(sizes[0] + opa*(sizes[1]-sizes[0]));
					var speed =  speeds[JMVC.util.rand(0, speeds.length - 1)];
					
					var f = new fla({
						parent:this,
						position: JMVC.util.rand(10, body_width-10),
						//speed : parent.utility.rand(speeds[0], speeds[1]),
						speed : speed/5,
						phase : JMVC.util.rand(phases[0], phases[1]),
						amplitude : JMVC.util.rand(amplitudes[0], amplitudes[1]),
						direction : JMVC.util.rand(directions[0], directions[1]),

						//opacity : parent.utility.rand(opacities[0]*10, opacities[1]*10) /10,
						//size : parent.utility.rand(sizes[0], sizes[1]),
						opacity:opa,
						size:siz,

						mainobj: parent,
						rot : 0,
						rot_incr : rot_incr[JMVC.util.rand(0, 1)],
						rot_fact : JMVC.util.rand(1, 20)
					});
					window.setTimeout(
						function(){
							that.append_flake();
							window.setTimeout(
								function(){
									JMVC.dom.append(base_div, f.el);
									f.stylize();
									f.animator.animate();
								},
								rn
							);
						},
						rn
					);
				};
			},

			fla = function (opts) {
				var that = this;
				this.parent = opts.parent;

				this.el = JMVC.dom.create('span');
				this.stylize = function () {
					JMVC.css.style(that.el, {
						color : color,
						'font-size' : opts.size + 'px',
						position : 'absolute',
						opacity : opts.opacity,
						top : '1px',
						left : opts.position + 'px',
						'z-index' : 500
					})
					JMVC.dom.html(that.el, rotation? rot_flakes[JMVC.util.rand(0, rot_flakes.length - 1)] : snowflake);
				};
				this.animator = new animator(this.el, opts);
			},

			path = function (y, amp, phase) {
				return Math.ceil(amp * Math.cos(y / phase));
			},

			move = function (obj, x, y) {
				JMVC.css.style(obj, {left : x + 'px', top : y + 'px' });
			},

			animator = function (f, opts) {
				var that = this;

				this.animate = function () {
					//var top = f.css('top');
					var y = parseInt(JMVC.css.style(f, 'top'), 10);



					opts.position += opts.direction / 8;
					var t;
					if (y < body_height-opts.size) {
						var p = opts.position + path(y + 1, opts.amplitude, opts.phase)
						if (p < 0 || p > body_width - opts.size) {
							clearTimeout(t);
							JMVC.dom.remove(f);
							return;
						}

						if (rotation || rot_string) {
							opts.rot=(opts.rot+opts.rot_incr*opts.rot_fact)%360;
							JMVC.css.style(f, {
								'-webkit-transform': 'rotate(' + opts.rot + 'deg)',
								'-moz-transform':'rotate(' + opts.rot + 'deg)',
								'-o-transform':'rotate(' + opts.rot + 'deg)'
							});
						}
						move(f, p, y + opts.speed );
						t = window.setTimeout( function () {that.animate(); }, 40 );
					} else {
						JMVC.dom.remove(f);
					}

				}

			};

		new Snow();
	}
}); //end extend
	
	