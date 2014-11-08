(function (){

    var _constructor = function (opts) {


            this.scale = opts.scale || 1;
            this.className = opts['className'] || 'shadowMatrix';
            this.colorMap = opts.colorMap || {};
            this.matrix = opts.matrix || opts.frames[0];
            this.frames = opts.frames || [];
            
            this.size = [this.matrix.length, this.matrix[0].split(',').length];

            this.tpl = {
                position : 'relative',
                width: '0px',
                height: '0px',
                margin : (this.size[0] * this.scale) + 'px,' + (this.size[1] * this.scale) + 'px',
                'box-shadow':null,
                '-webkit-box-shadow' : null,
                '-moz-box-shadow' : null
            };
            this.pointTpl = '%left%px %top%px 0px ' + this.scale + 'px %color%';
        },
        proto = _constructor.prototype;
    

    proto.resize = function () {
        this.size = [this.matrix.length, this.matrix[0].split(',').length];
    };
    
    proto.animate = function (opts, ms) {
        var n = this.frames.length,
            self = this,

            backAndForth = opts.backAndForth,
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
        window.setInterval(function () {
            self.matrix = self.frames[i]
            self.draw({node : opts.node});
            nextIndex();
        }, ms);
    };

    proto.draw = function (opts) {
        this.node || (this.node = opts.node || (function (){alert('target node missing!!!'); })());
        this.node.innerHTML = '';

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
                        left: j * this.scale * 2,
                        top : i * this.scale * 2 ,
                        color : this.colorMap[rows[j]] || '#000'
                    }));
                }
            }
        }
        this.tpl['box-shadow'] = this.tpl['-webkit-box-shadow'] = this.tpl['-moz-box-shadow'] = out.join(',');
        JMVC.css.style(this.node, this.tpl);
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
                colorMap : {}
            },
            tmpMatrix = [],
            sampling = opts.sampling || 1,
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
                    var i = 4 * (r * w + c);
                    return [
                        px[i],
                        px[i + 1],
                        px[i + 2],
                        px[i + 3]
                    ];
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
                for (r = 0, c = 0, tmpColorMap = [], colorIndex = 0; r < h; r++) {
                    row = [];
                    for (c = 0; c < w; c++) {
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