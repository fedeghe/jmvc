JMVC.core.widgzard.render({
    target : document.getElementById('getsamples'),
    attrs : {'class':'round respfixed', id : 'getsamples'},
    style : {backgroundColor:'#ddd'},
    content : [{
        style : {padding:'10px', cursor:'pointer', textTransform : 'uppercase'},
        html : 'load some samples',
        cb : function () {
            JMVC.events.on(this.node, 'click', function (){
                JMVC.core.widgzard.load('/media/js/widgzard/samples.js');
            });
            this.done();
        }
    }]
},true);