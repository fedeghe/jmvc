/*

JMVC.require('widget/snow/snow')
JMVC.snow.jSnow(document.body, {str:'M@7730', mode:'rot'});

*/
JMVC.require('core/screen/screen');

JMVC.extend('snow', {
    jSnow: function (target, options) {
        options = options || {};
        // number of flake sources
        var strenght = options.stren || 1,
            // what snows down
            snowflake = options.str || 'flakes',
            // how many flakes per second
            // ti = options.ti || 1,
            // flake size
            // size = options.size || 80,
            color = options.color || 'white',
            bodyDim = target === 'body'
                ? JMVC.screen.getViewportSize()
                : {
                    width: JMVC.num.getNum(JMVC.css.width(target)),
                    height: JMVC.num.getNum(JMVC.css.height(target))
                },

            // x = false,
            speeds = [5, 20, 21, 22, 23],
            sizes = [2, 20],
            phases = [20, 40],
            amplitudes = [10, 20],
            directions = [-5, 5],
            opacities = [0.1, 1],

            bodyWidth = bodyDim.width - 20,
            bodyHeight = bodyDim.height - 20,

            // count = 0,

            containerId = 'snow_container',
            // snowflakez = {},

            baseDiv = JMVC.dom.create('div', {
                id: containerId,
                style: 'position:absolute; display:block; top:0px; left:0px;'
            }),

            // flake = JMVC.dom.create('span'),
            rotation = (snowflake === 'flakes'),
            rotString = options.mode === 'rot',
            rotFlakes = ['*', '#', '+'],
            rotIncr = [-1, 1],

            Snow = function () {
                JMVC.dom.append(JMVC.dom.find(target), baseDiv);
                this.flake_sources = [];

                this.start = function () {
                    for (var i = 0, l = this.flake_sources.length; i < l; i += 1) {
                        this.flake_sources[i].append_flake();
                    }
                };
                this.init = function () {
                    for (var i = 0; i < strenght; i++) {
                        this.flake_sources.push(new FlakeSource(this));
                    }
                    this.start();
                };
                this.init();
            },

            FlakeSource = function (parent) {
                var that = this,
                    rn = JMVC.util.rand(500, 1000);

                this.append_flake = function () {
                    var opa = JMVC.util.rand(opacities[0] * 10, opacities[1] * 10) / 10,
                        siz = Math.round(sizes[0] + opa * (sizes[1] - sizes[0])),
                        speed = speeds[JMVC.util.rand(0, speeds.length - 1)],
                        f = new Fla({
                            parent: this,
                            position: JMVC.util.rand(10, bodyWidth - 10),
                            // speed : parent.utility.rand(speeds[0], speeds[1]),
                            speed: speed / 5,
                            phase: JMVC.util.rand(phases[0], phases[1]),
                            amplitude: JMVC.util.rand(amplitudes[0], amplitudes[1]),
                            direction: JMVC.util.rand(directions[0], directions[1]),

                            // opacity : parent.utility.rand(opacities[0]*10, opacities[1]*10) /10,
                            // size : parent.utility.rand(sizes[0], sizes[1]),
                            opacity: opa,
                            size: siz,

                            mainobj: parent,
                            rot: 0,
                            rotIncr: rotIncr[JMVC.util.rand(0, 1)],
                            rot_fact: JMVC.util.rand(1, 20)
                        });
                    window.setTimeout(
                        function () {
                            that.append_flake();
                            window.setTimeout(
                                function () {
                                    JMVC.dom.append(baseDiv, f.el);
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

            Fla = function (opts) {
                var that = this;
                this.parent = opts.parent;

                this.el = JMVC.dom.create('span');
                this.stylize = function () {
                    JMVC.css.style(that.el, {
                        color: color,
                        fontSize: opts.size + 'px',
                        position: 'absolute',
                        opacity: opts.opacity,
                        top: '1px',
                        left: opts.position + 'px',
                        zIndex: 500
                    });
                    JMVC.dom.html(that.el, rotation ? rotFlakes[JMVC.util.rand(0, rotFlakes.length - 1)] : snowflake);
                };
                this.animator = new Animator(this.el, opts);
            },

            path = function (y, amp, phase) {
                return Math.ceil(amp * Math.cos(y / phase));
            },

            move = function (obj, x, y) {
                JMVC.css.style(obj, { left: x + 'px', top: y + 'px' });
            },

            Animator = function (f, opts) {
                var that = this;
                this.animate = function () {
                    // var top = f.css('top');
                    var y = parseInt(JMVC.css.style(f, 'top'), 10),
                        t, p;
                    opts.position += opts.direction / 8;
                    if (y < bodyHeight - opts.size) {
                        p = opts.position + path(y + 1, opts.amplitude, opts.phase);
                        if (p < 0 || p > bodyWidth - opts.size) {
                            clearTimeout(t);
                            JMVC.dom.remove(f);
                            return;
                        }

                        if (rotation || rotString) {
                            opts.rot = (opts.rot + opts.rotIncr * opts.rot_fact) % 360;

                            JMVC.css.rotate(f, opts.rot);
                        }
                        move(f, p, y + opts.speed);
                        t = window.setTimeout(function () { that.animate(); }, 40);
                    } else {
                        JMVC.dom.remove(f);
                    }
                };
            };
        return new Snow();
    }
}); // end extend
