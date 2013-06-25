JMVC.require('cookie');

JMVC.hook({'onBeforeRender' : JMVC.parselang});

/*
var re = new RegExp("\\[L\\[([\\S\\s]*?)\\]([A-z]*?)\\]", 'gm'),
    cnt = "ciao ff[L[heasdasdi]ww]sd fsdfs [L[lei]it]";
re.exec(cnt);





JMVC.i18n = {
    en : {
        'hei prova' : 'hey trial'
    },
    jp : {
        'hei prova' : 'パスワード'
    }
};
JMVC.hooks.onBeforeRender[0]('[L[hei prova]jp]');


*/