JMVC.head.addScript('https://maps.googleapis.com/maps/api/js?sensor=true');
JMVC.core.widgzard.render({
    target : document.getElementById('getsamples'),
    style : {padding : '20px'},
    content : [
        {
            tag : 'p',
            html : 'Some samples'
        },{
            tag : 'ul',
            content : [
                {
                    tag : 'li',
                    content : [{
                        tag : 'a',
                        attrs : {href : 'javascript:;'},
                        html : 'sample1',
                        cb : function () {
                            JMVC.events.bind(this, 'click', function () {
                                JMVC.core.widgzard.load('/media/js/widgzard/script1.js');
                            })
                        }
                    }]
                },{
                    tag : 'li',
                    content : [{
                        tag : 'a',
                        attrs : {href : 'javascript:;'},
                        html : 'sample2',
                        cb : function () {
                            JMVC.events.bind(this, 'click', function () {
                                JMVC.core.widgzard.load('/media/js/widgzard/script2.js');
                            })
                        }
                    }]
                },{
                    tag : 'li',
                    content : [{
                        tag : 'a',
                        attrs : {href : 'javascript:;'},
                        html : 'sample3',
                        cb : function () {
                            JMVC.events.bind(this, 'click', function () {
                                JMVC.core.widgzard.load('/media/js/widgzard/script3.js');
                            })
                        }
                    }]
                }
            ]
        }
    ]
},true);