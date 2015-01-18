{
    tag : "li",
    style : {
        height:"inherit",
        width:"100%",
        backgroundColor : "#PARAM{bgcolor|white}",
    },
    attrs : {'class':'round8'},
    content : [{
        attrs : {
            "class" : "innerwrap"
        },
        style : {
            height:"inherit",
            width:"100%"
        },
        content : [{
            tag : "a",
            attrs : {
                href : "#PARAM{link}",
                target:"_blank"
            },
            content : [{
                tag : "img",
                attrs : {
                    src : "#PARAM{imageUrl}"
                },
                style : {
                    width:"100%",
                    paddingTop : "30px"
                }
            }],
            cb : function () {
                this.node.addEventListener('click', function () {
                    this.blur();
                },false);
                this.done();
            }
        }]
    }]
}