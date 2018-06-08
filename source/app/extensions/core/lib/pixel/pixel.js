(function(W) {
    var debug = true,
        WD = W.document,
        WDB = WD.body,
        on = (function() {
            return ('addEventListener' in W) ?
                function(el, evnt, cb) {
                    el.addEventListener.apply(el, [evnt, cb, false]);
                } :
                function(el, evnt, cb) {
                    el.attachEvent.apply(el, ['on' + evnt, cb]);
                };
        })();
        
    function Pixel(src) {
        this.top = null; 
        this.left = null;
        this.parent = null;
        this.getParent();
        this.getViewPortSize();
        this.src = src;
        this.done = false;
        this.tag = document.createElement('img');
        this.render();
    }
    Pixel.prototype = {
        getParent : function () {
            var scriptTag = document.getElementsByTagName('script'),
                position = null;
            scriptTag = scriptTag[scriptTag.length - 1];
            this.parent = scriptTag.parentNode;

            // try to get parent container dimensions
            var parentWidth = this.parent.clientWidth || 0,
                parentHeight = this.parent.clientHeight || 0,
                isBody = this.parent == WD.body;
            
            position = this.getPosition();
            
            //only if it is not the body take into account the center of the container
            //
            this.left = position[0] + (isBody ? 0 : parentWidth / 2);
            this.top = position[1] + (isBody ? 0 : parentHeight / 2); 
            
        },
        getPosition: function (rel) {
            var el = this.parent,
                curleft = 0,
                curtop = 0,
                sT = WD.body.scrollTop + WD.documentElement.scrollTop,
                sL = WD.body.scrollLeft + WD.documentElement.scrollLeft;
            if (el.offsetParent) {
                do {
                    curleft += el.offsetLeft;
                    curtop += el.offsetTop;
                    el = el.offsetParent;
                } while (el);
            }
            return [!!rel ? curleft - sL : curleft, !!rel ? curtop - sT : curtop];
        },
        getViewPortSize: function() {
            
            this.viewport = (function() {
                if (typeof W.innerWidth != 'undefined') {
                    return {
                        width: W.innerWidth,
                        height: W.innerHeight
                    };
                } else {
                    if (typeof WD.documentElement != 'undefined' && typeof WD.documentElement.clientWidth != 'undefined' && WD.documentElement.clientWidth != 0) {
                        return {
                            width: WD.documentElement.clientWidth,
                            height: WD.documentElement.clientHeight
                        };
                    } else {
                        return {
                            width: WD.getElementsByTagName('body')[0].clientWidth,
                            height: WD.getElementsByTagName('body')[0].clientHeight
                        };
                    }
                }
            })();

        },
        render: function() {
            this.tag.style.position = "relative";
            this.tag.style.top = "0px";
            this.tag.style.left = "0px";
            this.tag.style.width = "1px";
            this.tag.style.height = "1px";
            this.tag.style.display = "none";
            this.parent.appendChild(this.tag);
            this.check();
        },
        check: function() {
            var self = this,
            	onScroll = function() {
	                if (self.done) return;

	                
	                var f_filterResults = function (n_win, n_docel, n_body) {
                            var n_result = n_win ? n_win : 0;
                            if (n_docel && (!n_result || (n_result > n_docel))) {
                                n_result = n_docel;
                            }
                            return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
                        },
                        tool = {
	                        scrollLeft: f_filterResults(
	                            W.pageXOffset ? W.pageXOffset : 0,
	                            WD.documentElement ? WD.documentElement.scrollLeft : 0,
	                            WDB ? WDB.scrollLeft : 0
	                        ),
	                        scrollTop: f_filterResults(
	                            W.pageYOffset ? W.pageYOffset : 0,
	                            WD.documentElement ? WD.documentElement.scrollTop : 0,
	                            WDB ? WDB.scrollTop : 0
	                        )
	                    },
	                    gotTop = (tool.scrollTop <= self.top && self.top <= (tool.scrollTop + self.viewport.height)),
	                    gotLeft = (tool.scrollLeft <= self.left && self.left <= (tool.scrollLeft + self.viewport.width));

	                if (debug) {
	                    console.debug(self.viewport);
	                    console.debug("x: ", tool.scrollLeft, self.left, tool.scrollLeft + self.viewport.width, gotLeft)
	                    console.debug("y: ", tool.scrollTop, self.top, tool.scrollTop + self.viewport.height, gotTop)
	                    console.debug('----');
	                }
	                if (gotTop && gotLeft) {
	                    self.done = true;
	                    debug && alert('visible : ' + self.src);

	                    // track
	                    self.tag.setAttribute('src', self.src);
	                }
	            };

	        // call it immediately to check if something is already visible
	        //
	        onScroll();

	        // and on scroll :D
            on(window, "scroll", onScroll);
        }
    };



    Pixel.create = function(src) {
        new Pixel(src);
    };

    JMVC.Pixel = Pixel.create;
})(window);
