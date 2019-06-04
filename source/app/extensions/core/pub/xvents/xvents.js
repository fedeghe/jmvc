JMVC.extend('xvents', {
    init: function () {
        // console.debug('xvents initialized');
        this.xvents.els = ('abort|afterprint|beforeprint|beforeunload|blur|canplay|canplaythrough|change|click|' +
            'contextmenu|dblclick|drag|dragend|dragenter|dragleave|dragover|dragstart|drop|durationchange|emptied|' +
            'ended|error|focus|formchange|forminput|haschange|input|invalid|keydown|keypress|keyup|load|loadeddata|' +
            'loadedmetadata|loadstart|message|mousedown|mousemove|mouseout|mouseover|mouseup|mousewheel|offline|' +
            'online|pagehide|pageshow|pause|play|playing|popstate|progress|ratechange|readystatechangeseeked|redo|' +
            'reset|resize|scroll|seeking|select|stalled|storage|submit|suspend|timeupdate|undo|unload|volumechange|waiting'
        ).split('|');
    },

    /**
     * [ description]
     * @return {[type]} [description]
     */
    create: function () {
        /**
         * [ description]
         * @param  {[type]} node    [description]
         * @param  {[type]} attrAct [description]
         * @param  {[type]} attrPar [description]
         * @return {[type]}         [description]
         */
        var Area = function (node, attrAct, attrPar) {
            this.node = node;
            this.attrAct = attrAct || false;
            this.attrPar = attrPar || false;
            this.map = {};
            this.binded = false;
            this.listening = true;
        };
        /**
         * [ description]
         * @param  {[type]} eventType [description]
         * @param  {[type]} func      [description]
         * @param  {[type]} action    [description]
         * @param  {[type]} bubble    [description]
         * @return {[type]}           [description]
         */
        Area.prototype.listen = function (eventType, func, action, bubble) {
            this.map[eventType] || (this.map[eventType] = action ? {} : []);
            // bubbles
            func['bubble'] = !!bubble;
            if (action) {
                this.map[eventType][action] || (this.map[eventType][action] = []);
                this.map[eventType][action].push(func);
            } else {
                this.map[eventType].push(func);
            }
            return this;
        };

        /**
         * [ description]
         * @param  {[type]} eventType [description]
         * @param  {[type]} action    [description]
         * @return {[type]}           [description]
         */
        Area.prototype.clean = function (eventType, action) {
            this.map[eventType] &&
                !!action
                ? (this.map[eventType][action] && (delete this.map[eventType][action]))
                : (delete this.map[eventType]);
        };

        /**
         * [ description]
         * @return {[type]} [description]
         */
        Area.prototype.enable = function () { this.listening = true; };

        /**
         * [ description]
         * @return {[type]} [description]
         */
        Area.prototype.disable = function () { this.listening = false; };

        /**
         * [ description]
         * @return {[type]} [description]
         */
        Area.prototype.bind = function () {
            var self = this;
            // console.debug(self.map)
            if (!self.binded) {
                // loop the map
                JMVC.each(self.map, function (fnArr, ev) {
                    JMVC.each(fnArr, function (fn, i) {
                        JMVC.events.on(self.node, ev, function (e) {
                            if (!self.listening) { return false; }

                            var trg = JMVC.events.eventTarget(e),
                                realtrg = e.currentTarget,
                                eventType = e.type,
                                act = JMVC.dom.attr(trg, self.attrAct),
                                par = JMVC.dom.attr(trg, self.attrPar);

                            // if is array
                            if (fn instanceof Array) {
                                act = act.length ? act.split('|') : false;
                                if (!act) { return false; }
                                par = { 'event': e, 'node': trg, 'realtarget': realtrg, 'params': par.length ? getParams(par) : false };

                                JMVC.each(act, function (a) {
                                    self.map[eventType] &&
                                        self.map[eventType][a] &&
                                        (function (el, p) {
                                            JMVC.each(el, function (f) {
                                                f(p, trg, realtrg);
                                                !f.bubble && JMVC.events.stopBubble(e);
                                            });
                                        })(self.map[eventType][a], par);
                                });
                            } else {
                                fn.apply(self.node, [e, trg, realtrg]);
                                !fn.bubble && JMVC.events.stopBubble(e);
                            }
                        });
                    });
                });
                this.binded = true;
            }
        };

        /**
         * [getParams description]
         * @param  {[type]} att [description]
         * @return {[type]}     [description]
         */
        function getParams (att) {
            return JSON.parse(att.replace(/'/g, '"'));
        }

        return {
            list: [],
            add: function (node, attrAct, attrPar) {
                var newarea = new Area(node, attrAct, attrPar);
                this.list.push(newarea);
                return newarea;
            },
            disable: function () {
                JMVC.each(this.list, function (e) {
                    e.disable();
                });
            },
            enable: function () {
                JMVC.each(this.list, function (e) {
                    e.enable();
                });
            }
        };
    }
});
