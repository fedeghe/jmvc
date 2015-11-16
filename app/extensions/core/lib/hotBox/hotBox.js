JMVC.extend('core', function (){

    var W = window,
        WD = W.document,
        getCurrentScriptParentNode = function (stag) {
            stag = document.getElementsByTagName('script');
            stag = stag[stag.length - 1];
            return stag.parentNode;
        };

    function hotBox(p1, p2, p3, p4) {
        var self = this,
            start = function () {
                self.getNodePosition();
                self.getViewPortSize();
                self.check();
            };

        /**
         * explicit: p1 is the target node, p2 is the triggering function
         * implicit: p1 is the triggering function, the container must be find sniffing on the fly the last script parent node
         * @type {[type]}
         */
        this.mode = null;
        this.status = null;
        this.once = true;
        this.trigger = function () {};
        this.untrigger = function () {};
        this.step = function () {this.done = true;};
        this._twostep = (function () {
            var mid = false;
            return function () {
                if (!mid) {mid = true;}
                else {self.done = true;}
            };
        })();
        this.top = null; 
        this.left = null;
        this.done = false;
        this.isBody = false;
        this.init(p1, p2, p3, p4);

        
        // if (document.readyState.match(/complete/i)) {
            // start();
        // } else {
            JMVC.events.ready(start);
        // }
        // and on scroll :D
    }

    hotBox.prototype = {
        init: function (p1, p2, p3, p4){
            if (JMVC.dom.isElement(p1) && JMVC.util.isFunction(p2)) {
                this.mode = 'explicit';
                this.node = p1;
                this.trigger = p2;

                if (JMVC.util.isFunction(p3)) {
                    this.untrigger = p3;
                    //take the right status function
                    this.step = this._twostep;

                    if (typeof p4 !== 'undefined') {
                        this.once = !!p4;
                    }
                } else {
                    if (typeof p3 !== 'undefined') {
                        this.once = !!p3;
                    }
                }

            } else {
                if (JMVC.util.isFunction(p1)) {

                    this.mode = 'implicit';
                    this.node = _getCurrentScriptParentNode();
                    this.trigger = p1;

                    if (JMVC.util.isFunction(p2)) {
                        this.untrigger = p2;
                        this.step = this._twostep;
                        if (typeof p3 !== 'undefined') {
                            this.once = !!p3;
                        }
                    }else if (typeof p2 !== 'undefined') {
                        this.once = !!p2;
                    }
                } else {
                    throw 'Wrong params';
                }
            }
        },
        getNodePosition : function () {
            var position = null,
                // try to get parent container dimensions
                nodeWidth = this.node.clientWidth || 0,
                nodeHeight = this.node.clientHeight || 0;

            this.isBody = this.node == WD.body;
            
            position = this.getPosition();
            
            //only if it is not the body take into account the center of the container
            //
            this.left = position[0] + (this.isBody ? 0 : nodeWidth / 2);
            this.top = position[1] + (this.isBody ? 0 : nodeHeight / 2); 
            
        },
        getPosition: function (rel) {
            var el = this.node,
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
        check: function() {
            var self = this,
                viewed = false,
                check = function() {

                    // if once is set and has already triggered
                    // then shut up
                    // 
                    if (self.once && self.done) return;

                    var newStatus,
                        hasChanged,
                        WDB = WD.body,
                        f_filterResults = function (n_win, n_docel, n_body) {
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

                    newStatus = self.isBody || (gotTop && gotLeft);

                    hasChanged = newStatus != self.status;
                    if (hasChanged) {
                        if (newStatus) {
                            self.step();
                            self.trigger.call(self.node, newStatus);
                            viewed = true;

                        // if is not in the viewport & the status chasChanged
                        // call the untrigger function
                        // 
                        } else {
                            
                            // only if has been visible at least once
                            if (viewed ) {
                                self.step();
                                self.untrigger.call(self.node, newStatus);
                            }
                        }
                    }

                    // update the status for next iteration
                    // 
                    self.status = self.isBody || (gotTop && gotLeft);
                };

            // call it immediately to check if something is already visible
            //
            check();

            // on scroll & resize
            JMVC.events.on(window, "scroll", check);
            JMVC.events.on(window, "resize", function () {
                self.getNodePosition();
                self.getViewPortSize();
                check();
            });
            
        }
    };

    // publish
    // 
    return {
        hotBox : function (p1, p2, p3, p4) {
            new hotBox(p1, p2, p3, p4);
        }
    };
});


