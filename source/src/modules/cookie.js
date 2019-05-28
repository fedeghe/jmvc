// type : LIB
//
// eslint-disable-next-line no-undef
_.cookie = {};

JMVC.cookie = {
    enabled: true,
    cookie_nocookiesaround: false,
    initCheck: function () {
        'use strict';
        return JMVC.W.navigator.cookieEnabled;
    },
    /**
     * [set description]
     * @param {[type]} name    [description]
     * @param {[type]} value   [description]
     * @param {[type]} expires [description]
     * @param {[type]} path    [description]
     * @param {[type]} domain  [description]
     * @param {[type]} secure  [description]
     */

    set: function (name, value, expires, path, domain, secure) {
        'use strict';
        if (!JMVC.cookie.enabled) return false;
        this.cookie_nocookiesaround = false;
        var today = new Date(),
            expiresDate = new Date(today.getTime() + expires);
        // expires && (expires = expires * 1000 * 60 * 60 * 24);
        JMVC.WD.cookie = name +
            '=' + JMVC.W.escape(value) +
            (expires ? ';expires=' + expiresDate.toGMTString() : '') +
            (path ? ';path=' + path : '') +
            (domain ? ';domain=' + domain : '') +
            (secure ? ';secure' : '');
        return true;
    },

    /**
     * [get description]
     * @param  {[type]} check_name [description]
     * @return {[type]}            [description]
     */

    get: function (checkName) {
        'use strict';
        var allCookies = JMVC.WD.cookie.split(';'),
            tempCookie = '',
            cookieName = '',
            cookieValue = '',
            cookieFound = false,
            i = 0,
            l = allCookies.length;

        if (!JMVC.cookie.enabled) return false;
        for (null; i < l; i += 1) {
            tempCookie = allCookies[i].split('=');
            cookieName = tempCookie[0].replace(/^\s+|\s+$/g, '');
            if (cookieName === checkName) {
                cookieFound = true;
                tempCookie.length > 1 && (cookieValue = JMVC.W.unescape(tempCookie[1].replace(/^\s+|\s+$/g, '')));
                return cookieValue;
            }
            tempCookie = null;
            cookieName = '';
        }
        return cookieFound;
    },
    /**
     * [del description]
     * @param  {[type]} name   [description]
     * @param  {[type]} path   [description]
     * @param  {[type]} domain [description]
     * @return {[type]}        [description]
     */
    del: function (name, path, domain) {
        'use strict';
        if (!JMVC.cookie.enabled) return false;
        var ret = false;
        if (this.get(name)) {
            JMVC.WD.cookie = name + '=' +
                (path ? ';path=' + path : '') +
                (domain ? ';domain=' + domain : '') +
                ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
            ret = true;
        }
        return ret;
    },

    /**
     * [delall description]
     * @return {[type]} [description]
     */
    delall: function () {
        'use strict';
        if (!JMVC.cookie.enabled) return false;
        var thecookie = JMVC.WD.cookie.split(';'),
            i = 0,
            l = thecookie.length,
            nome;
        for (null; i < l; i += 1) {
            nome = thecookie[i].split('=');
            this.del(nome[0], false, false);
        }
        this.cookie_nocookiesaround = true;
        return true;
    },

    /**
     * [getall description]
     * @return {[type]} [description]
     */
    getall: function () {
        'use strict';
        if (!JMVC.cookie.enabled) return false;
        if (JMVC.WD.cookie === '') {
            return [];
        }
        return this.cookie_nocookiesaround
            ? []
            : JMVC.each(
                JMVC.WD.cookie.split(';'),
                function (i) {
                    var t = i.split('=');
                    return { name: t[0], value: t[1] };
                }
            );
    }
};
