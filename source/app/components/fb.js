var ___ = {
    tag : "li",
    style : {
        height : "#PARAM{height|99%}",
        width : "#PARAM{width|100%}",
        backgroundColor : "#PARAM{bgcolor|white}"
    },
    attrs : {'class':'round8'},
    content : [{
        attrs : {
            "class" : "innerwrap"
        },
        data : {
            id : JMVC.util.uniqueid + '',
            fbBase : "http://www.facebook.com/plugins/likebox.php",
            colorscheme : "#PARAM{colorscheme|light}",
            show_faces : "#PARAM{show_faces|true}",
            header : "#PARAM{header|false}",
            stream : "#PARAM{stream|false}",
            show_border : "#PARAM{show_border|false}",
            href : "#PARAM{fbPageUrl}",
            appId : 0
        },
        content : [{
            tag : "iframe",
            attrs : {
                src: "#PARAM{fbPageUrl}",
                name: "pincolpallo",
                height : "#PARAM{height|100%}",
                width: "100%",
                scrolling : "#PARAM{scrolling|no}",
                frameborder : 0,
                allowTransparency : "false"
            },
            style : {
                border:'none'
                ,overflow: 'hidden'
            },
            cb : function () {
                
                var p = this.parent.data,
                    qs = JMVC.object.toQs({
                        colorscheme : p.colorscheme,
                        show_faces : p.show_faces,
                        header : p.header,
                        stream : p.stream,
                        show_border : p.show_border,
                        href : p.href,
                        appId : p.appId
                    });
                this.node.src = this.parent.data.fbBase + qs;
                this.done();
            }
        }]
    }]
}