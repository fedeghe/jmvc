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
            
            JMVC.dom.swap(imgt, this.canvas);
            this.ctx.drawImage(imgtag, 0, 0);
        }

        filteredImage.prototype = {
            filterImage : function(filter, var_args) {
                console.debug(this);
                var args = [this.getPx()];
                for (var i=1; i<arguments.length; i++) {
                    args.push(arguments[i]);
                }
                this.ctx.putImageData(
                    filter.apply(this, args)
                    , 0, 0
                );
                
            },
            getPx : function() {
                return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
            },


            filters : {
                brightness : function(pixels, adjustment) {
                    console.debug(arguments)
                    //var pixels = this.getPx();
                    var d = pixels.data;
                    for (var i=0; i<d.length; i+=4) {
                        d[i] += adjustment;
                        d[i+1] += adjustment;
                        d[i+2] += adjustment;
                    }
                    return pixels;
                },
                threshold : function(pixels, threshold) {
                    var d = pixels.data;
                    for (var i=0; i<d.length; i+=4) {
                        var r = d[i];
                        var g = d[i+1];
                        var b = d[i+2];
                        var v = (0.2126*r + 0.7152*g + 0.0722*b >= threshold) ? 255 : 0;
                        d[i] = d[i+1] = d[i+2] = v
                    }
                    return pixels;
                },
                grayscale : function(pixels) {
                    var d = pixels.data;
                    for (var i=0; i<d.length; i+=4) {
                        var r = d[i];
                        var g = d[i+1];
                        var b = d[i+2];
                        // CIE luminance for the RGB
                        // The human eye is bad at seeing red and blue, so we de-emphasize them.
                        var v = 0.2126*r + 0.7152*g + 0.0722*b;
                        d[i] = d[i+1] = d[i+2] = v
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

