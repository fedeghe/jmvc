{
    tag: "li",
    style : {
        height:"inherit",
        width:"inherit",
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
        data: {
            submitUrl: "#PARAM{submitUrl}",
            id: JMVC.util.uniqueid + ''
        },
        content: [{
            tag: "form",
            attrs: {
                action: "#PARAM{submitUrl}",
                method: "post",
                onSubmit: "return false;"
            },
            content: [{
                tag:"div",
                content: [{
                    tag: "label",
                    attrs: {"class":"blk"},
                    html: "Name"
                },{
                    tag: "input",
                    attrs: {
                        type: "text"
                    },
                    cb: function () {
                        this.node.id = this.climb(3).data.id + '_name';
                        this.done();
                    }
                }]
            },{
                tag: "div",
                content: [{
                    tag: "label",
                    attrs: {"class":"blk"},
                    html: "Email"
                },{
                    tag: "input",
                    attrs: {
                        type: "text"
                    },
                    cb: function () {
                        this.node.id = this.climb(3).data.id + '_email';
                        this.done();
                    }
                }]
            },{
                tag: "div",
                content: [{
                    tag: "input",
                    attrs: {
                        "class":"blk",
                        type : "submit",
                        value : "Submit"
                    }
                }]
            }],
            cb : function () {
                var self = this,
                    valid = function (f) {
                        var ret = f.value != '';
                        if (ret) {
                            f.style.border = '';
                        } else {
                            f.style.border = '1px solid red';
                        }
                        return ret;
                    };



                this.node.addEventListener('submit', function () {

                    var nameF = document.getElementById(self.parent.data.id + '_name'),
                        emailF = document.getElementById(self.parent.data.id + '_email');


                    (valid(nameF) & valid(emailF))
                    &&
                    JMVC.io.post(self.parent.data.submitUrl, function (r) {

                            JMVC.core.widgzard.render({
                                target : self.parent.node,
                                content : [{
                                    html : r,
                                    style : {color:'red', padding:'20px', textAlign:'center'}
                                }]
                            }, true);

                        },
                        false,
                        {
                            name : nameF.value,
                            email : emailF.value,
                        }
                    );
                },false);
                this.done();
            }
        }]
    }]
}