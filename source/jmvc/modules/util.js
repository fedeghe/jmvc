/* eslint-disable no-undef */
// ---------------+
// UTIL sub-module |
// ---------------+

/**
 * private section
 * @type {Object}
 */
_.util = {};
/**
 * public section
 * @type {Object}
 */
JMVC.util = {

    checksum: function(s) {
        var hash = 0,
            strlen = s.length,
            i, c;
        if (strlen === 0) {
            return hash;
        }
        for (i = 0; i < strlen; i++) {
            c = s.charCodeAt(i);
            hash = ((hash << 5) - hash) + c;
            hash = hash & hash;
        }
        return hash;
    },
    /**
     * [ description]
     * @param  {[type]} d [description]
     * @return {[type]}   [description]
     */
    deg2rad: function(d) { return d * JMVC.M.PI / 180; },
    /**
     * [getLink description]
     * @param  {[type]} cnt  [description]
     * @param  {[type]} act  [description]
     * @param  {[type]} prms [description]
     * @return {[type]}      [description]
     */
    getLink: function(cnt, act, prms) {
        var path = [];
        if (cnt) { path.push(cnt); }
        if (act) { path.push(act); }
        if (prms) { path.push(prms); }
        return JMVC.vars.baseurl + JMVC.US + path.join(JMVC.US);
    },
    /**
     * [ description]
     * @param  {[type]} scriptname [description]
     * @return {[type]}            [description]
     */
    getParameters: function(scriptid /** string **/ , pname /** string **/ ) {
        var script = document.getElementById(scriptid),
            p = false,
            parameters = false;
        pname = pname || 'data-params';
        p = script.getAttribute(pname);
        // eslint-disable-next-line no-eval
        parameters = p ? eval('(' + p + ')') : {};
        return parameters;
    },

    getSignature: function(func) {
        var funcStr = func.toString(),
            params = funcStr.split(/\n/)[0].match(/\((.*)\)/)[1].split(','),
            out = {},
            i = -1,
            l = params.length,
            tmp;
        while (++i < l) {
            tmp = JMVC.string.trim(params[i]).match(/(\w*)\s?(\/\*\*?([^*]*)\*\*?\/)?/);
            out[tmp[1]] = tmp.length === 4 ? tmp[3] : 'not specified';
        }
        return out;
    },

    // http://stackoverflow.com/questions/7390426/better-way-to-get-type-of-a-javascript-variable
    /**
     * [ description]
     * @param  {[type]} o [description]
     * @return {[type]}   [description]
     */
    getType: function(o) {
        return ({}).toString.call(o).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    },

    isMobile: (function() {
        var ua = navigator.userAgent || navigator.vendor || window.opera;
        // eslint-disable-next-line no-useless-escape
        return /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|meego.+mobile|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|playbook|silk/i.test(ua) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0, 4));
    })(),

    typeOf: function(o) {
        if (o === null) {
            return 'null';
        }
        if (Array.isArray && Array.isArray(o)) {
            return 'array';
        }
        return typeof o;
    },

    /**
     * [ description]
     * @param  {[type]} hex [description]
     * @return {[type]}     [description]
     */
    hex2int: function(hex) {
        return parseInt(hex, 16);
    },
    /**
     * [ description]
     * @param  {[type]} i [description]
     * @return {[type]}   [description]
     */
    int2hex: function(i) {
        return parseInt(i, 10).toString(16);
    },
    /**
     * [ description]
     * @param  {[type]} o [description]
     * @return {[type]}   [description]
     */
    isArray: function(o) {
        if (Array.isArray && Array.isArray(o)) {
            return true;
        }
        var t1 = String(o) !== o,
            t2 = ({}).toString.call(o).match(/\[object\sArray\]/);

        return t1 && !!(t2 && t2.length);
    },

    isBoolean: function(o) {
        return typeof o === 'boolean' || o instanceof Boolean;
    },

    isDefined: function(o) {
        return o !== null && o !== void 0;
    },

    /**
     * [isFunction description]
     * @param  {[type]}  f [description]
     * @return {Boolean}   [description]
     */
    isFunction: function(f) {
        return typeof f === 'function' || o instanceof Function;
    },

    isNumber: function(o) {
        return typeof o === 'number' || o instanceof Number;
    },

    /**
     * [ description]
     * @param  {[type]} o [description]
     * @return {[type]}   [description]
     */
    isObject: function(o) {
        var t0 = String(o) !== o,
            t1 = o === Object(o),
            t2 = typeof o !== 'function',
            t3 = {}.toString.call(o).match(/\[object\sObject\]/);
        return t0 && t1 && t2 && !!(t3 && t3.length);
    },

    isPrimitive: function(o) {
        return /string|number|boolean/.test(typeof o);
    },

    /**
     * [ description]
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    isSet: function(e) {
        return typeof e !== 'undefined';
    },

    isString: function(o) {
        return typeof o === 'string' || o instanceof String;
    },

    /**
     * [ description]
     * @param  {[type]} el   [description]
     * @param  {[type]} type [description]
     * @return {[type]}      [description]
     */
    isTypeOf: function(el, type) {
        // eslint-disable-next-line valid-typeof
        return typeof el === type;
    },

    isUndefined: function(o) {
        return o === null || o === void 0;
    },

    /**
     * [ description]
     * @param  {[type]} ) {return      +new Date( [description]
     * @return {[type]}   [description]
     */
    now: function() {
        return +new Date();
    },
    /**
     * [ description]
     * @param  {[type]} min  [description]
     * @param  {[type]} max) {return      min + ~~(JMVC.M.random() * (max - min + 1) [description]
     * @return {[type]}      [description]
     */
    rand: function(min, max) {
        return min + ~~(JMVC.M.random() * (max - min + 1));
    },
    /**
     * [ description]
     * @param  {[type]} r [description]
     * @return {[type]}   [description]
     */
    rad2deg: function(r) {
        return r * 180 / JMVC.M.PI;
    },
    /**
     * [ description]
     * @param  {[type]} start [description]
     * @param  {[type]} end   [description]
     * @return {[type]}       [description]
     */
    range: function(start, end) {
        if (start > end) {
            throw new JMVC.Errors.BadParams('ERROR: JMVC.util.range function #badparams (' + start + ', ' + end + ')');
        }
        var ret = [];
        while (end - start + 1) {
            ret.push((start += 1) - 1);
        }
        return ret;
    },
    interval: function(fn, interval, err) {
        var active = true,
            i = 0,
            int = interval,
            init = +new Date();
        (function run() {
            int = interval + (init + (i++ * interval) - new Date());
            setTimeout(function() {
                    try {
                        fn();
                    } catch (e) {
                        err && err(e);
                        active = false;
                    }
                    active && run();
                },
                int);
        })();
        return function() {
            active = false;
        };
    },
    /**
     * [description]
     * @return {[type]} [description]
     */
    uniqueid: new function() {
        var count = 0,
            self = this;
        this.prefix = 'JMVCID';
        this.toString = function() {
            ++count;
            return self.prefix + count;
        };
    }()
};

// -----------------------------------------------------------------------------