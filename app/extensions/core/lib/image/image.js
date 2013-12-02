//
// http://www.html5rocks.com/en/tutorials/canvas/imagefilters/
// 
// 
// 
/*

////////////
http://www.jmvc.dev/demo/img
//////////

JMVC.require('core/lib/image');

var flt = JMVC.image.createFilter(JMVC.dom.find('img'));
//flt.filterImage(flt.filters.brightness, -40);
//flt.filterImage(flt.filters.threshold, 20);
flt.filterImage(flt.filters.grayscale);

 */ 
// 
// 
// 
JMVC.extend('image', {

    createFilter : function (imgtag) {  
        "use strict";

        function getPxVector(pixels) {
            var w = pixels.width,
                h = pixels.height,
                px = pixels.data;

            return function (r, c){
                if (r < 0 || r >= h || c < 0 || c >= w) {return [0,0,0,0];}

                var i = 4*(r * w + c);

                return [
                    px[i],
                    px[i + 1],
                    px[i + 2],
                    px[i + 3]
                ];
            }
        }
        function getRoundMatrix(px, r, c) {
            var gpv = getPxVector(px),
                t = [
                    gpv(r-1, c-1), gpv(r-1, c), gpv(r-1, c+1),
                    gpv(r, c-1), gpv(r, c), gpv(r, c+1),
                    gpv(r+1, c-1), gpv(r+1, c), gpv(r+1, c+1)
                ];
            return  t;
        }
        function convolutePX(matrix, factorM){
            var i = 0,
                l = matrix.length,
                p = [0,0,0,0];
            

            for (null; i < l; i += 1) {
                p[0] += matrix[i][0] * factorM[i];
                p[1] += matrix[i][1] * factorM[i];
                p[2] += matrix[i][2] * factorM[i];
                p[3] += matrix[i][3] * factorM[i];
            }
            

            /*
            if (p[0] < 0) p[0] = 0;
            if (p[0] > 255) p[0] = 255;
            if (p[1] < 0) p[1] = 0;
            if (p[1] > 255) p[1] = 255;
            if (p[2] < 0) p[2] = 0;
            if (p[2] > 255) p[2] = 255;
            if (p[3] < 0) p[3] = 0;
            if (p[3] > 255) p[3] = 255;
            */
            return p;
        }


        function filteredImage(imgt) {
            this.tag = imgt;
            this.canvas = JMVC.WD.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.canvas.width = imgt.width;
            this.canvas.height = imgt.height;
            
            JMVC.dom.insertAfter(this.canvas, this.tag);
            this.tag.style.display = 'none';
            
            this.canvas.style.display = '';
            this.ctx.drawImage(this.tag, 0, 0);
            this.active = true;
        }

        filteredImage.prototype = {
            /**
             * [reset description]
             * @return {[type]} [description]
             */
            reset : function(){
                this.ctx.drawImage(this.tag, 0, 0);
                this.disable();
            },

            /**
             * [disable description]
             * @return {[type]} [description]
             */
            disable : function () {
                this.canvas.style.display = 'none';
                this.tag.style.display = '';
                this.active = false;
            },

            /**
             * [enable description]
             * @return {[type]} [description]
             */
            enable : function () {
                this.canvas.style.display = '';
                this.tag.style.display = 'none';
                this.active = true;
            },

            /**
             * [filterImage description]
             * @param  {[type]} filter   [description]
             * @param  {[type]} var_args [description]
             * @return {[type]}          [description]
             */
            filterImage : function(filter, var_args) {
                if (! this.active) {
                    this.reset();
                    this.enable();
                }
                var args = [this.getPx()],
                    i = 1,
                    l = arguments.length;
                for (null; i < l; i += 1) {
                    args.push(arguments[i]);
                }
                this.ctx.putImageData(filter.apply(this, args), 0, 0);
            },

            getPx : function() {
                return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
            },

            
            convolute : function (pixels, matrix){
            
                var w = pixels.width,
                    h = pixels.height,
                    d = pixels.data,
                    tmparr = [],
                    //for normalization
                    min = 255,
                    max = 0,
                    normalize = false;

                for (var i = 0; i < h; i +=1 ) {
                    for (var j = 0, tmp, k; j < w; j +=1) {
                        var pij = getRoundMatrix(pixels, i, j);
                        tmp = convolutePX(pij, matrix);
                        
                        k = 4 * (i * w + j); 
                        tmparr[k] = tmp[0];
                        tmparr[k + 1] = tmp[1];
                        tmparr[k + 2] = tmp[2];
                        //tmparr[k + 3] = tmp[3];
                        tmparr[k + 3] = d[k + 3];
                        
                        // normalize ?
                        if (normalize) {
                            min = Math.min(min, tmp[0], tmp[1], tmp[2], tmp[3]);
                            max = Math.max(max, tmp[0], tmp[1], tmp[2], tmp[3]);
                        }
                    }
                }
                
                normalize && JMVC.debug(min, max);

                for (var i = 0, l = tmparr.length; i < l; i +=1) {
                    d[i] = normalize ?
                        (tmparr[i] - min) * 255 / (max - min)
                        :
                        tmparr[i];
                }

                console.debug('done')
                return pixels;
            },

            matrices : {
                
                'laplace' : [-1,-1,-1, -1,8,-1, -1,-1,-1],
                'laplace2' : [0,-1,0, -1,4,-1, 0,-1,0],

                

                'sharpen' : [0,-1,0, -1,5,-1, 0,-1,0],
                'blur' : [1/9,1/9,1/9, 1/9,1/9,1/9, 1/9,1/9,1/9],
                
                'sobelvert' : [-1,0,1, -2,0,2, -1,0,1],
                'sobeloriz' : [-1,-2,-1, 0,0,0, 1,2,1]
                /*'detect_45lines'    =>array(    array(-1,-1,2),         array(-1,2,-1),         array(2,-1,-1)  ),
                'detect_135lines'   =>array(    array(2,-1,-1),         array(-1,2,-1),         array(-1,-1,2)  ),
                'detect_edges'      =>array(    array(-1,-1,-1),        array(-1,8,-1),         array(-1,-1,-1) ),
                'sobel_horiz'       =>array(    array(-1,-2,-1),        array(0,0,0),           array(1,2,1)    ),
                'sobel_vert'        =>array(    array(-1,0,1),          array(-2,0,2),          array(-1,0,1)   ),
                'sobel'             =>array(    array(0,2,2),           array(-2,0,3),          array(-2,-3,0)  ),
                'detect_edges'      =>array(    array(-1,0,1),          array(-2,0,2),          array(-1,0,1)   ),
                'edges'             =>array(    array(0,1,2),           array(-1,0,1),          array(-2,-1,0)  ),
                'sharpen'           =>array(    array(-1, -1, -1),      array(-1, 16, -1),      array(-1, -1, -1),  8,  0),
                'laplace_emboss'    =>array(    array(-1,0,-1),         array(0,4,0),           array(-1,0,-1)),
                'sharp'             =>array(    array(0,-1,0),          array(-1,5,-1),         array(0,-1,0)),
                'mean_removal'      =>array(    array(-1,-1,-1),            array(-1,9,-1),         array(-1,-1,-1)),
                'emboss'=>array(array(-2,-1,0),array(-1,1,1), array(0,1,2))*/
            },
 


            filters : {
                laplace : function (pixels){return this.convolute(pixels, this.matrices.laplace); },
                

                
                blur : function (pixels){return this.convolute(pixels, this.matrices.blur); },
                sharpen : function (pixels){return this.convolute(pixels, this.matrices.sharpen); },
                sobeloriz : function (pixels){return this.convolute(pixels, this.matrices.sobeloriz); },
                sobelvert : function (pixels){return this.convolute(pixels, this.matrices.sobelvert); },
                brightness : function(pixels, adjustment) {
                    var d = pixels.data,
                        i = 0,
                        l = d.length;
                    for (null; i < l; i += 4) {
                        d[i] += adjustment;
                        d[i + 1] += adjustment;
                        d[i + 2] += adjustment;
                    }
                    return pixels;
                },
                threshold : function(pixels, threshold) {
                    var d = pixels.data,
                        i = 0,
                        l = d.length;
                    for (null; i < l; i += 4) {
                        var r = d[i],
                            g = d[i + 1],
                            b = d[i + 2],
                            v = (0.2126 * r + 0.7152 * g + 0.0722 * b >= threshold) ? 255 : 0;
                        d[i] = d[i + 1] = d[i + 2] = v
                    }
                    return pixels;
                },
                grayscale : function(pixels) {
                    var d = pixels.data,
                        i = 0,
                        l = d.length;
                    for (null; i < l; i += 4) {
                        var r = d[i],
                            g = d[i + 1],
                            b = d[i + 2],
                            // CIE luminance for the RGB
                            // The human eye is bad at seeing red and blue, so we de-emphasize them.
                            v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
                        d[i] = d[i + 1] = d[i + 2] = v;
                    }
                    return pixels;
                }
            }
        };


        return imgtag ? new filteredImage(imgtag) : false;
    },

    
    


    /*
    
    JMVC.require('core/lib/image');
    var img = JMVC.dom.find('img')[4];
    JMVC.image.filter.filterImg(
        JMVC.image.filter.filters.grayscale,
        img,
        20
    );


    */



    //
    // http://stackoverflow.com/a/934925/298479
    // 
    get64 : function (imgtag) {
        /*
        // in home
        // http://www.jmvc.dev/demo/img
        JMVC.require('core/lib/image');
        var img = JMVC.dom.find('img'),
            code = JMVC.image.get64(img.length ? img[0] : img);
        JMVC.dom.add(JMVC.WD.body, 'img', {src : 'data:image/jpg;base64,' + code});
         */
        // Create an empty canvas element
        var canvas = document.createElement("canvas");
        canvas.width = imgtag.width;
        canvas.height = imgtag.height;

        // Copy the image contents to the canvas
        var ctx = canvas.getContext("2d");
        ctx.drawImage(imgtag, 0, 0);

        // Get the data-URL formatted image
        // Firefox supports PNG and JPEG. You could check imgtag.src to guess the
        // original format, but be aware the using "image/jpg" will re-encode the image.
        var dataURL = canvas.toDataURL("image/png");

        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }
});

