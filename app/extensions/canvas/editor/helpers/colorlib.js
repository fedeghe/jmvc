JMVC.require('core/color/color');

JMVC.extend('core.color', {
    getWebColors : function (wsafe) {
        'use strict';
        var ret = [],
            hash = '#',
            wsafearr = ['00', '33', '66', '99', 'CC', 'FF'],
            l = wsafearr.length,
            i = 0, j = 0, k = 0;

        for (i = 0; i < l; i += 1)
            for (j = 0; j < l; j += 1)
                for (k = 0; k < l; k += 1)
                    ret.push(hash + wsafearr[i] + wsafearr[j] + wsafearr[k]);
        return ret;
    }
});