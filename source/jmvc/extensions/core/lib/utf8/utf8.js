// type : LIB
//

JMVC.extend('utf8', {
    encode_Utf8: function (s) {
        return unescape(encodeURIComponent(s));
    },
    decode_Utf8: function (s) {
        return decodeURIComponent(escape(s));
    },
    /**
     * http://stackoverflow.com/questions/5515869/string-length-in-bytes-in-javascript
     */
    'length': function (s) {
        // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
        var m = encodeURIComponent(s).match(/%[89ABab]/g);
        return s.length + (m ? m.length : 0);
    },
    encodeUtf8: function (s) {
        for (
            var c, i = -1, l = (s = s.split('')).length, o = String.fromCharCode;
            ++i < l;
            s[i] = (c = s[i].charCodeAt(0)) >= 127 ? o(0xc0 | (c >>> 6)) + o(0x80 | (c & 0x3f)) : s[i]
        );
        return s.join('');
    },
    decodeUtf8: function (s) {
        for (
            var a, b, i = -1, l = (s = s.split('')).length, o = String.fromCharCode, c = 'charCodeAt';
            ++i < l;
            ((a = s[i][c](0)) & 0x80) && (s[i] = (a & 0xfc) == 0xc0 && ((b = s[i + 1][c](0)) & 0xc0) == 0x80 ?
                o(((a & 0x03) << 6) + (b & 0x3f))
                :
                o(128), s[++i] = '')
        );
        return s.join('');
    }
});
