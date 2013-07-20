JMVC.require('core/css', 'core/dim');

JMVC.extend('snow', {


	jSnow : function(target, options){


		console.debug(target)
	
		options = options || {};

		//number of flake sources
		var strenght = options.stren || 1;
		//what snows down
		var snowflake = options.str || 'flakes';
		//how many flakes per second
		var ti = options.ti || 1;
		//flake size
		var size = options.size || 80;
		var color = options.color || 'white';

		var body_dim=false;
		if(target == "body"){
			body_dim = JMVC.dim.getViewportSize();
		}else{
			body_dim = new Array(JMVC.num.getNum(JMVC.css.width(target)), JMVC.num.getNum(JMVC.css.height(target)));
		}
		console.debug(body_dim)

		var x = false,
			speeds = new Array(1,2,3,4,5),
			sizes = new Array(2,20),
			phases = new Array(20,40),
			amplitudes = new Array(10,20),
			directions = new Array(-5,5),
			opacities = new Array(0.1,1),

			body_width = body_dim[0]-20,
			body_height = body_dim[1]-20,

			count = 0,

			container_id = 'snow_container',
			snowflakez ={ };

		var base_div = JMVC.dom.create('div', {id:container_id, style:"position:absolute;display:block;top:0px; left:0px;"});


		var flake = JMVC.dom.create('span'),
			rotation = (snowflake ==='flakes'),
			rot_string = options.mode=='rot',
			rot_flakes = new Array('*','#','+'),
			rot_incr = new Array(-1,1);



		var snow = function(){

			JMVC.dom.append(JMVC.dom.find(target), base_div);

			//this.utility = new utility();	

			this.flake_sources = new Array();

			this.start = function(){
				for(var i = 0, l = this.flake_sources.length; i<l; i++  ){
					(this.flake_sources)[i].append_flake();
				}
			};

			this.init = function(){

				for(var i  =0; i<strenght; i++){
					this.flake_sources.push(new flake_source(this ));
				}
				this.start();
			}
			this.init();

		};

		var flake_source = function(parent){

			var that = this;

			var rn = JMVC.util.rand(500,1000);

			this.append_flake = function(){
				var opa = JMVC.util.rand(opacities[0]*10, opacities[1]*10) /10;
				var siz = Math.round(sizes[0] + opa*(sizes[1]-sizes[0]));
				var speed = Math.round(sizes[0] + opa*(sizes[1]-sizes[0]));
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
		};


		var fla = function(opts){
			var that = this;
			this.parent = opts.parent;

			this.el = JMVC.dom.create('span');
			this.stylize = function(){
				JMVC.css.style(that.el,{
					color:color,
					'font-size':opts.size+'px',
					position:'absolute',
					opacity:opts.opacity,
					top:'1px',
					left:opts.position+'px',
					'z-index':500
				})
				JMVC.dom.html(that.el, rotation? rot_flakes[JMVC.util.rand(0, rot_flakes.length-1)] :snowflake);
			};
			this.animator = new animator(this.el,opts);
		};


		var path = function(y, amp, phase){
			return Math.ceil(amp * Math.cos(y/phase));
		};

		var move = function(obj, x, y){

			JMVC.css.style(obj, {left:x+'px',top:y+'px'});
		};

		var animator = function(f, opts){
			var that = this;
			this.animate = function(){
				//var top = f.css('top');
				var y = parseInt(JMVC.css.style(f, 'top'),10);



				opts.position += opts.direction/8;
				var t;
				if(y < body_height-opts.size){
					var p = opts.position + path(y+1, opts.amplitude, opts.phase)
					if( p<0 || p > body_width-opts.size){clearTimeout(t);JMVC.dom.remove(f); return;}

					if(rotation || rot_string){

						opts.rot=(opts.rot+opts.rot_incr*opts.rot_fact)%360;

						JMVC.css.style(f, {
							'-webkit-transform': 'rotate('+opts.rot+'deg)',
							'-moz-transform':'rotate('+opts.rot+'deg)',
							'-o-transform':'rotate('+opts.rot+'deg)'
						});
					}

					move(f, p, y+opts.speed );
					t = window.setTimeout( function(){that.animate();}, 40 );
				}else{
					JMVC.dom.remove(f);
				}

			}

		};




		new snow();



	}

}); //end extend
	
	