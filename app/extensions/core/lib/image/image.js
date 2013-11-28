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

            filters : {
                brightness : function(pixels, adjustment) {
                    console.debug(arguments)
                    //var pixels = this.getPx();
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

