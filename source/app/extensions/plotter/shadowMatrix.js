(function (){

    var _constructor = function (opts) {
            this.scale = opts.scale || 1;
            this.sampling = opts.sampling || 1;

            this.className = opts['className'] || 'shadowMatrix';
            this.colorMap = opts.colorMap || {};
            this.matrix = opts.matrix || opts.frames[0];
            this.frames = opts.frames || [];
            
            this.size = [this.matrix.length, this.matrix[0].split(',').length];

            this.tpl = {
                position : 'relative',
                width: '0px',
                height: '0px',
                // margin : (this.size[0] * this.scale) + 'px,' + (this.size[1] * this.scale) + 'px',
                'box-shadow':null,
                '-webkit-box-shadow' : null,
                '-moz-box-shadow' : null
            };
            this.pointTpl = '%left%px %top%px 0px %scale%px %color%';
            // this.pointTpl = '%left%px %top%px 0px 4px %color%';
        },
        proto = _constructor.prototype;
    

    proto.resize = function () {
        this.size = [this.matrix.length, this.matrix[0].split(',').length];
    };
    
    proto.animate = function (opts, ms) {
        var n = this.frames.length,
            self = this,

            backAndForth = opts.backAndForth,
            endTime = opts.endTime || 0,
            end = opts.end,
            loop = !!opts.loop,
            nextIndex = (function () {
                var versus = 1;
                if (backAndForth) {
                    return function () {
                        versus = versus > 0 ? (i == n - 1 ? -1 : versus) : (i == 0 ? 1 : versus); 
                        i = (i + versus + n) % n;
                    };
                } else {
                    return function () {i = (i + versus) % n;};
                }
            })(),
            i = 0;
        (function z() {
            var interv = window.setInterval(function () {
                self.matrix = self.frames[i]
                self.draw({node : opts.node});
                
                
                if (endTime && i == n - 1) {
                    window.clearInterval(interv);
                    window.setTimeout(z, endTime);
                }
                if (i == n - 1 && !loop) {
                    
                    if (!!end) {
                        end();
                    }
                    window.clearInterval(interv);
                    return;
                }
                nextIndex();

            }, ms);    
        })();
        
        
    };

    proto.draw = function (opts) {
        this.node || (this.node = opts.node || (function (){alert('target node missing!!!'); })());
        
        this.node.innerHTML = '';
        
        JMVC.css.style(this.node.parentNode, {
            // border:'1px dotted gray',
            width: this.scale*this.matrix[0].length + 'px',
            height : this.scale*2*this.matrix.length + 'px'
        });

        var out = [],
            self = this,
            ret,
            i = 0,
            j = 0,
            l = 0,
            rows, el, prms;

        for (null; i < this.size[0]; i++) { 
            rows = this.matrix[i].split(',');           
            for (l = rows.length, j = 0; j < l; j++) {
                if (this.colorMap[rows[j]] instanceof Array && this.colorMap[rows[j]][0] instanceof Function) {
                    prms = this.colorMap[rows[j]][1] || {};
                    this.node.appendChild(this.colorMap[rows[j]][0].call(this, i, j, prms));
                } else {
                    el = this.colorMap[rows[j]] || '#000';
                    out.push(JMVC.string.replaceAll(this.pointTpl,{
                        left: j * this.scale * 2 * this.sampling,
                        top : i * this.scale * 2 * this.sampling,
                        color : this.colorMap[rows[j]] || '#000',
                        scale : this.scale
                    }));
                }
            }
        }
        
        
        this.tpl['box-shadow'] = this.tpl['-webkit-box-shadow'] = this.tpl['-moz-box-shadow'] = out.join(",\n");
        
        JMVC.css.style(this.node, this.tpl);

        //for mobile avoid the mediaquery to 100% for all divs
        JMVC.dom.addClass(this.node, 'respfixed');
        
        return this;
    };

    proto.redraw = function (mat){
        if (mat) this.matrix = mat;
        this.draw();
        return this;
    };

    proto.replaceMap = function (m){
        this.colorMap = m;
    };

    proto.mirror = function () {
        
        var m = [],
            i = 0,
            tmp;
        while (i < this.size[0]) {
            tmp = this.matrix[i].split(',')
            tmp.reverse();
            m.push(tmp.join(','));
            i++;
        }
        this.matrix = m;
        this.redraw();
        
        return this;
    };

    proto.fromImage = function (opts) {
        var self = this;

        JMVC.shadowMatrix.getMatrixFromImage(opts)
        .then(function (res) {
            self.matrix = res.matrix;
            self.colorMap = res.colorMap;
            self.scale = res.scale;
            self.resize();
            self.redraw();
        });
        return this;
    };


    /**
     * shadowMatrix factory
     * @param  {[type]} opts [description]
     * @return {[type]}      [description]
     */
    JMVC.shadowMatrix = function (opts) {
        return new _constructor(opts);
    }


    /**
     * getMatrixFromImage static method
     * promise based
     * 
     * @param  {[type]} opts [description]
     * @return {[type]}      [description]
     */
    JMVC.shadowMatrix.getMatrixFromImage = function (opts) {
        
        var img,
            w, h,
            cnv, ctx,
            res = {
                scale : opts.size || 1,
                matrix : [],
                colorMap : {},
                sampling : opts.sampling || 1
            },
            tmpMatrix = [],
            // sampling = opts.sampling || 1,
            getPxData = function () {
                return ctx.getImageData(0, 0, cnv.width, cnv.height);
            },
            getPxFun = function () {
                var pixels = getPxData(),
                    w = pixels.width,
                    h = pixels.height,
                    px = pixels.data;

                return function (r, c) {
                    if (r < 0 || r >= h || c < 0 || c >= w) {
                        return [0, 0, 0, 0];
                    }
                    var i = 4 * (r * w + c) * res.sampling,
                        r1 = r2 = r3 = r4 = 0;
                    if (res.sampling == 1) {
                        r1 = px[i],
                        r2 = px[i + 1],
                        r3 = px[i + 2],
                        r4 = px[i + 3];
                    } else {
                        for (var jr = 0; jr < res.sampling; jr++)
                            for (var jc = 0; jc < res.sampling; jc++) {
                                var i2 = 4 * ((r+jr) * w + c + jc);
                                r1 += px[i2],
                                r2 += px[i2 + 1],
                                r3 += px[i2 + 2],
                                r4 += px[i2 + 3];
                            }

                    }
                    return [r1/res.sampling, r2/res.sampling, r3/res.sampling, r4/res.sampling];
                }
            },
            px,
            // a promise to proceed only when
            // the image is loaded
            // &&
            // the matrix is ready
            promiseLoadAndDone = JMVC.Promise.create(),
            proceed = function (){
                var i, r, c, h, w, row, compon,
                    tmpColorMap,
                    colorIndex;
                //
                //  create shoulder canvas with the image
                cnv = document.createElement('canvas');
                w = cnv.width = img.width;
                h = cnv.height = img.height;
                cnv.style.display = 'none';
                //JMVC.WDB.appendChild(cnv);
                ctx = cnv.getContext("2d");
                ctx.drawImage(img, 0, 0);

                pxF = getPxFun();
                
                //
                //  write matrix and collect colorMap
                for (r = 0, c = 0, tmpColorMap = [], colorIndex = 0; r < h; r+=res.sampling) {
                    row = [];
                    for (c = 0; c < w; c+=res.sampling) {
                        compon = pxF(r, c);
                        color = 'rgba(' + compon.join(',') + ')';
                        if (!tmpColorMap[color]){
                            tmpColorMap[color] = colorIndex++;
                        }
                        row.push(tmpColorMap[color]);
                    }
                    res.matrix.push(row.join(','))
                }

                // 
                // invert to obtain colorMap
                for (i in tmpColorMap) {
                    res.colorMap[tmpColorMap[i]] = i;
                }


                //
                // resolve the promise, passing res to all thens
                promiseLoadAndDone.done(res);
            };

        if (opts.imgUrl) {
            //
            // create image from url
            img = new Image();
            //
            // proceed when loaded
            img.onload = proceed;
            img.src = opts.imgUrl;

        } else if (opts.img) {

            img = opts.img;
            proceed();
        }

        //
        // return it to allow then execution
        return promiseLoadAndDone;
    };



    JMVC.shadowMatrix.triUL = function (i, j, prms) {
        var n = JMVC.dom.create('div');
        JMVC.css.style(n, {
            position:'absolute',
            width:'0px',
            height:'0px',
            borderBottom : (2 * this.scale) + 'px solid ' + this.colorMap[prms.color],
            borderLeft : (2 * this.scale) + 'px solid transparent',
            top: (this.scale * (2 * i -1)) + 'px',
            left:(this.scale * (2 * j -1)) + 'px'
        });
        return n;
    };

    JMVC.shadowMatrix.triUR = function(i, j, prms) {
        var n = JMVC.dom.create('div');
        JMVC.css.style(n, {
            position:'absolute',
            width:'0px',
            height:'0px',
            borderBottom : (2 * this.scale) + 'px solid ' + this.colorMap[prms.color],
            borderRight : (2 * this.scale) + 'px solid transparent',
            top: ((2 * i -1) * this.scale) + 'px',
            left:(this.scale * (2 * j -1)) + 'px'
        });
        return n;
    };

})();

/*
JMVC.require('plotter/shadowMatrix2');
var t = new JMVC.shadowMatrix('Federico');
t.hello();
 */