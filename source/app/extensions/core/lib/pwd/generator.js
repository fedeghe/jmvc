// type : LIB
//

JMVC.extend('core.lib.pwd', {
    generate: function (o) {
        o = o || {};
        var alphaLower = o.alphaLower || 0,
            alphaUpper = o.alphaUpper || 0,
            number = o.number || 0,
            symbol = o.symbol || 0,
            range = JMVC.array.range,
            sets = {
                alpha: {
                    lower: range(97, 122),
                    upper: range(65, 90)
                },
                number: range(48, 57),
                symbol: range(33, 47).concat(range(58, 64)).concat(range(91, 96))
            },
            size = ~~o.size || 8,
            tmp = [],
            pwd = '',
            basestrength = 0,
            strength;

        if (!(alphaLower + alphaUpper + number + symbol)) {
            alphaUpper = 1;
            number = 1;
        }

        // get cardinality
        //
        basestrength += (alphaLower ? sets.alpha.lower.length : 0) +
            (alphaUpper ? sets.alpha.upper.length : 0) +
            (number ? sets.number.length : 0) +
            (symbol ? sets.symbol.length : 0);

        // raw brute-force strenght
        //
        strength = Math.log10(Math.pow(basestrength, size)).toFixed(2);

        while (alphaLower--) tmp = tmp.concat(sets.alpha.lower);
        while (alphaUpper--) tmp = tmp.concat(sets.alpha.upper);
        while (number--) tmp = tmp.concat(sets.number);
        while (symbol--) tmp = tmp.concat(sets.symbol);

        while (size--) {
            pwd += String.fromCharCode(JMVC.array.rand(tmp));
        }

        if (o.nerd) {
            pwd = pwd.replace(/a/ig, '4')
                .replace(/e/ig, '3')
                .replace(/i/ig, '1')
                .replace(/o/ig, '0');
        }
        return {
            pwd: pwd,
            strength: strength
        };
    }
});
