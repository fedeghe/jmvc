_.shimthags = 'canvas,audio,video,source,track,embed,datalist,keygen,output,header,nav,section,main,article,aside,footer,details,summary,figure,figcaption,mark,time,bdi,wbr,dialog,meter,progress,ruby,rt,rp';

// http://stackoverflow.com/questions/13897173/how-to-detect-if-an-html5-valid-doctype-is-present-in-the-document-using-javascr
if (document.doctype !== null) {

    var node = document.doctype,
        doctype_string = "<!DOCTYPE " +
            node.name +
            (node.publicId ? ' PUBLIC"' + node.publicId + '"' : '') +
            (!node.publicId && node.systemId ? ' SYSTEM' : '') +
            (node.systemId ? ' "' + node.systemId + '"' : '') +
        ">", t, l;

    if ('<!DOCTYPE html>' !== doctype_string) {
        t = _.shimthags.split(','),
        l = t.length;
        while (l--) {
            document.createElement(t[l]);
        }
        JMVC.head.addStyle(_.shimthags + '{display:block}', true, true);
    }
}