/*
-----------------
STRING sub-module
-----------------
*/
JMVC.string = {
    /**
     * [ description]
     * @param  {[type]} code [description]
     * @return {[type]}      [description]
     */
    'code2str' : function (code) {
        return String.fromCharCode.apply(null, code);
    },

     /**
     * [ description]
     * @param  {[type]} html [description]
     * @return {[type]}      [description]
     */
    'htmlEntities' : function (html) {
        return html
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/&(?![\w\#]+;)/g, '&amp;');
    },

    /**
     * [ description]
     * @param  {[type]} s){return s.replace(/^\s+/g [description]
     * @param  {[type]} ''         [description]
     * @return {[type]}            [description]
     */
    'ltrim' : function (s) {return s.replace(/^\s+/g, ''); },

    'multireplace' : function (cnt, o, i) {
        for (i in o) {
            cnt = cnt.replace(o[i], i);
        }
        return cnt;
    },

    /**
     * [ description]
     * @param  {[type]} val  [description]
     * @param  {[type]} el   [description]
     * @param  {[type]} pos  [description]
     * @param  {[type]} lngt [description]
     * @return {[type]}      [description]
     */
    'padme' : function (val, el, pos, len) {
        len = len || 2;
        while ((String(val)).length < len) {
            switch (pos) {
            case 'pre':
                val = String(el + val);
                break;
            case 'post':
                val = String(val + el);
                break;
            }
        }
        return val;
    },
    
    /** 
     * [ description]
     * @param  {string} tpl      the template
     * @param  {literal or function} o        
     * @param  {string} dD       [description]
     * @param  {string} Dd       [description]
     * @param  {string} fallback [description]
     * @return {[type]}          [description]
     */
    'replaceall' : function (tpl, o, dD, Dd, fback) {
        dD || (dD = '%');
        Dd || (Dd = '%');
        var reg = new RegExp(dD + '([A-z0-9-_]*)' + Dd, 'g'),
            str;
        return tpl.replace(reg, function (str, $1) {
            return (typeof o === 'function' ? o($1) : o[$1]) || fback || dD + $1 + Dd;
        });
    },
    
    /**
     * [ description]
     * @param  {[type]} s){return s.replace(/\s+$/g [description]
     * @param  {[type]} ''         [description]
     * @return {[type]}            [description]
     */
    'rtrim' : function (s) {return s.replace(/\s+$/g, ''); },

    /**
     * [ description]
     * @param  {[type]} str [description]
     * @param  {[type]} pwd [description]
     * @return {[type]}     [description]
     */
    'str2code' : function (str) {
        var out = [],
            i = 0,
            l = str.length;
        while (i < l) {
            out.push(str.charCodeAt(i));
            ++ i;   
        }
        return out;
    },

    /**
     * [ description]
     * @param  {[type]} str [description]
     * @param  {[type]} n   [description]
     * @return {[type]}     [description]
     */
    'strRepeat' : function (str, n) {
        var t = [];
        while (n -= 1) {t.push(str.replace(/\%n\%/g, n)); }
        return t.reverse().join('');
    },

    /**
     * [ description]
     * @param  {[type]} s){return s.replace(/^\s+|\s+$/g [description]
     * @param  {[type]} ''         [description]
     * @return {[type]}            [description]
     */
    'trim' : function (s) {return s.replace(/^\s+|\s+$/g, ''); }
};
