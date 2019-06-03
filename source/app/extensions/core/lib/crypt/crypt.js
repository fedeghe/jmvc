// type : FACTOY_METHOD
//

JMVC.extend('security', {

    seed: 3,

    useEncoding: false,

    crypt: function (msg, pwd) {
        pwd = pwd + '';
        var codePwd = JMVC.string.str2code(pwd),
            codeMsg = [].concat(JMVC.string.str2code(escape(msg)), codePwd),
            cout = [],
            lm = codeMsg.length,
            lp = codePwd.length,
            i = 0,
            j = 0,
            t,
            out;
        while (i < lm) {
            t = codeMsg[i] + codePwd[j] + JMVC.security.seed;
            cout.push(t);
            i += 1;
            j = (j + 1) % lp;
        }
        out = JMVC.string.code2str(cout);

        return JMVC.security.useEncoding ? encodeURIComponent(out) : out;
    },

    decrypt: function (cmsg, pwd) {
        pwd = pwd + '';
        if (JMVC.security.useEncoding) cmsg = decodeURIComponent(cmsg);
        var codeCmsg = JMVC.string.str2code(cmsg),
            codePwd = JMVC.string.str2code(pwd),
            out = [], outStr, mat,
            lm = codeCmsg.length,
            lp = codePwd.length,
            i = 0,
            j = 0,
            t;

        while (i < lm) {
            t = codeCmsg[i] - codePwd[j] - JMVC.security.seed;
            out.push(t);
            i += 1;
            j = (j + 1) % lp;
        }

        outStr = unescape(JMVC.string.code2str(out));
        mat = outStr.match(new RegExp('^(.*)' + pwd + '$'));
        return mat ? mat[1] : false;
    },

    javascrypt: function (code, pwd) {
        return '(function (p) {' +
            'if (p) {' +
            'try {' +
            'eval(JMVC.security.decrypt(\'' + JMVC.security.crypt(code, pwd) + '\', p));' +
            '} catch (e) {' +
            'console.debug(e);alert(\'Password invalid\');' +
            '}' +
            '}' +
            '})(prompt(\'Insert passphrase please:\'))';
    },

    Caesar: (function () {
        function _2WayrCpt (msg, ch, versus) {
            var firstUpper = 'A'.charCodeAt(0),
                firstLower = 'a'.charCodeAt(0),
                res = [],
                base,
                top = 26,
                l = msg.length;

            // default chiper
            ch = ch || 20;

            // default versus
            versus = versus || 1;

            while (l--) {
                if (!msg[l].match(/[A-z]/)) {
                    res[l] = msg[l];
                } else {
                    base = msg[l].match(/[A-Z]/) ? firstUpper : firstLower;
                    res[l] = String.fromCharCode(base + (msg[l].charCodeAt(0) - base + versus * ch + top) % top);
                }
            }
            return res.join('');
        }
        return {
            crypt: function (msg, ch) {
                return _2WayrCpt(msg, ch, 1);
            },
            decrypt: function (msg, ch) {
                return _2WayrCpt(msg, ch, -1);
            }
        };
    })()
});
