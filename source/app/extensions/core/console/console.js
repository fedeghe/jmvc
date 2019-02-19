// type : LIB
// 

JMVC.require(
    'core/screen/screen',
    'core/lib/widgzard/widgzard',
    'event_scroll/event_scroll',
    'core/responsive/basic/basic'
);

JMVC.extend('console', {

    init : function () {
        JMVC.head.meta("generator", "jmvc resident in your machine");
        JMVC.console._ = {
            status : false,
            scroll : 0,
            tpl : '<!DOCTYPE html>'+
                '<html>'+
                    '<head>'+
                        '<link rel="stylesheet" type="text/css" href="/media/css/core/jmvc.css">'+
                        '<style type="text/css">%style%</style>'+
                    '</head>'+
                    '<body class="console">%body%</body>'+
                '</html>',
            options : '<div>'+
                    '<legend>Load external<legend>'+
                    '<select id ="content-options">'+
                        '<option value="" selected="selected">No libraries</options>'+
                        '<optgroup label="jQuery">'+
                            '<option value="http://codeorigin.jquery.com/jquery-1.10.2.min.js">jQuery 1.10.2</option>'+
                            '<option value="http://codeorigin.jquery.com/jquery-1.9.1.min.js">jQuery 1.9.1</option>'+
                        '</optgroup>'+
                    '</select>'+
                '</div>'
        }
    },
    
    toggle : function (h, j, c, tab) {
        var fsmode = false,
            visibleTab,
            title = JMVC.head.title(),
            headerHeight = 39;

        if (JMVC.console._.status) {

            JMVC.dom.remove(JMVC.dom.find('#jmvc-console'));
            JMVC.events.enable_scroll();
            JMVC.W.scrollTo(0, JMVC.console._.scroll);

        } else {

            var jmvc_iframe_file = 'jmvc.js',
                dims = JMVC.screen.getViewportSize(),
                border_size = 0,
                margin = -1,
                screendata = JMVC.screen.getScreenData(),
                scrollTop = screendata.scrollTop,
                defaultContent = {
                    h : "<p><span id='hw'>hello world</span></p>",
                    j : "var t = document.getElementById('hw');\nt.onclick = function () {t.innerHTML='clicked'; };",
                    c : "p {\n\tmargin:20px\n}\nspan{\n\tcolor:red;\n\tfont-family:arial, sans-serif;\n\tfont-size:20px;\n\tcursor:pointer;\n}"
                },

                // main container
                container = JMVC.dom.create(
                    'div',{
                        'id' : 'jmvc-console',
                        'class' : 'jmvc-console',
                        'style' : 'left:' + margin + 'px;right:' + margin + 'px;top:' + margin + 'px;bottom:' + margin + 'px;border:' + border_size + 'px solid black'
                    }
                ),

                content = {
                    h : h != undefined ? h : (JMVC.p.h ? decodeURIComponent(JMVC.p.h) : defaultContent.h),
                    j : j != undefined ? j : (JMVC.p.j ? decodeURIComponent(JMVC.p.j) : defaultContent.j),
                    c : c != undefined ? c : (JMVC.p.c ? decodeURIComponent(JMVC.p.c) : defaultContent.c)
                },
                
                version = 0.4,
                
                defaults = {
                    h : '<!-- no html content -->',
                    j : '/* no javascript content */',
                    c : '/* no css content */'
                },

                config  = {
                    target : container,
                    content : [{
                        attrs : {"class" : "console-head"},
                        content : [
                            {
                                tag : "a",
                                attrs : {
                                    href : JMVC.vars.baseurl,
                                    title : "web console v." + version
                                },
                                content : [{
                                    tag : "img",
                                    attrs : {
                                        src : "/media/img/jmvc_n3.png",
                                        width : "60"
                                    }
                                }],
                                style : {
                                    "float" : "left",
                                    marginTop : "12px",
                                    marginLeft : "10px"
                                }
                            },{
                                tag : "button",
                                html : "get url",
                                attrs : {
                                    id : "get-url",
                                    "class" : "round4",
                                    title : 'get url'
                                },
                                style : {
                                    "float" : "left",
                                    height : "20px",
                                    lineHeight : "16px",
                                    padding : "0px 5px"
                                }
                            },{
                                tag : "button",
                                html : "FScreen",
                                attrs : {
                                    id : "go-fs",
                                    "class" : "round4",
                                    title : 'go fullscreen'
                                },
                                style : {
                                    "float" : "left",
                                    height : "20px",
                                    lineHeight : "16px",
                                    padding : "0px 5px"
                                }
                            },{
                                tag : "button",
                                html : "reset",
                                attrs : {
                                    id : "reset",
                                    "class" : "round4",
                                    title : 'reset'
                                },
                                style : {
                                    "float" : "left",
                                    height : "20px",
                                    lineHeight : "16px",
                                    padding : "0px 5px"
                                }
                            },{
                                tag : "button",
                                html : "reset all",
                                attrs : {
                                    id : "resetall",
                                    "class" : "round4",
                                    title : 'reset all'
                                },
                                style : {
                                    "float" : "left",
                                    height : "20px",
                                    lineHeight : "16px",
                                    padding : "0px 5px"
                                }
                            },

                            ////////////////////////////////////////

                            {
                                tag : "a",
                                attrs : {
                                    id : "options",
                                    href : "#options",
                                    "class" : "ablock"
                                },
                                style : {"float" : "right"},
                                content : [
                                    {
                                        attrs : {"class":"round4 roundtop text"},
                                        style : {"float":"right"}
                                    },{
                                        style : {"float":"right"},
                                        attrs : {"class":"tri resp_dskt"}
                                    }
                                ]
                            },{
                                tag : "a",
                                attrs : {
                                    id : "preview",
                                    href : "#preview",
                                    "class" : "ablock"
                                },
                                style : {"float":"right"},
                                content : [
                                    {
                                        attrs : {"class":"round4 roundtop text"},
                                        style : {"float":"right"},
                                    },{
                                        style : {"float":"right"},
                                        attrs : {"class":"tri resp_dskt"}
                                    }
                                ]
                            },{
                                tag : "a",
                                attrs : {
                                    id : "css",
                                    href : "#css",
                                    "class" : "ablock"
                                },
                                style : {"float":"right"},
                                content : [
                                    {
                                        attrs : {"class":"round4 roundtop text resp_dskt"},
                                        style : {"float":"right"},
                                        html : "CSS"
                                    },{
                                        attrs : {"class":"round4 roundtop text resp_mobi"},
                                        style : {"float":"right"},
                                        html : "{}"
                                    },{
                                        style : {"float" : "right"},
                                        attrs : {"class" : "tri resp_dskt"}
                                    }
                                ]
                            },{
                                tag : "a",
                                attrs : {
                                    id : "javascript",
                                    href : "#javascript",
                                    "class" : "ablock"
                                },
                                style : {"float" : "right"},
                                content : [
                                    {
                                        attrs : {"class" : "round4 roundtop text resp_dskt"},
                                        style : {"float" : "right"},
                                        html : "JS"
                                    },{
                                        attrs : {"class" : "round4 roundtop text resp_mobi"},
                                        style : {"float" : "right"},
                                        html : "{;}"
                                    },{
                                        style : {"float" : "right"},
                                        attrs : {"class" : "tri resp_dskt"}
                                    }
                                ]
                            },{
                                tag : "a",
                                attrs : {
                                    id : "html",
                                    href : "#html",
                                    "class" : "ablock"
                                },
                                style : {"float":"right"},
                                content : [
                                    {
                                        attrs : {"class":"round4 roundtop text resp_dskt"},
                                        style : {"float":"right"},
                                        html : "HTML"
                                    },{
                                        attrs : {"class":"round4 roundtop text resp_mobi"},
                                        style : {"float":"right"},
                                        html : "&lt;&gt;"
                                    },{
                                        style : {"float":"right"},
                                        attrs : {"class":"tri resp_dskt"}
                                    }
                                ]
                            },
                            "clearer"
                        ]
                    },{
                        attrs : {"class" : "input-divs respfixed"},
                        
                        content : [
                            {
                                attrs : {
                                    id : "in-html",
                                    "class" : "in-html inputdiv respfixed"
                                },
                                content : [{
                                    tag : "textarea",
                                    attrs : {
                                        id : "content-html"
                                    },
                                    style : {
                                        height : (dims.height - headerHeight) + "px",
                                        border : "none"
                                    },
                                    html : content.h
                                }],
                                style: {
                                    height: (dims.height - headerHeight) + "px"
                                }
                            },{
                                attrs : {
                                    id : "in-javascript",
                                    "class" : "in-javascript inputdiv respfixed"
                                },
                                content: [{
                                    tag : "textarea",
                                    attrs : {
                                        id : "content-javascript"
                                    },
                                    style : {
                                        height : (dims.height - headerHeight) + "px",
                                        border : "none"
                                    },
                                    html : content.j
                                }],
                                style: {
                                    height: (dims.height - headerHeight) + "px"
                                }
                            },{
                                attrs : {
                                    id : "in-css",
                                    "class" : "in-css inputdiv respfixed"
                                },
                                content: [{
                                    tag : "textarea",
                                    attrs : {"id":"content-css"},
                                    style : {
                                        height : (dims.height - headerHeight) + "px",
                                        border : "none"
                                    },
                                    html : content.c
                                }],
                                style: {
                                    height: (dims.height - headerHeight) + "px"
                                }
                            },{
                                attrs : {
                                    id : "in-preview",
                                    "class" : "in-preview inputdiv respfixed"
                                },
                                content: [{
                                    tag : "iframe",
                                    attrs : {
                                        id : "outarea",
                                        width : "100%",
                                        height : (dims.height - headerHeight) + "px"
                                    },
                                    style : {backgroundColor : 'white'}
                                }],
                                style: {
                                    height: (dims.height - headerHeight) + "px"
                                }
                            },{
                                attrs : {
                                    id : "in-options",
                                    "class" : "in-options inputdiv respfixed"
                                },
                                html : JMVC.console._.options,
                                style: {
                                    height: (dims.height - headerHeight) + "px"
                                }
                            }
                        ]
                    }],
                    cb : start
                },
                hash = false;



            //
            // ending Widgzard cb
            // 
            function start() {

                var contentHTML = JMVC.dom.find('#content-html'),
                    contentJAVASCRIPT = JMVC.dom.find('#content-javascript'),
                    contentCSS = JMVC.dom.find('#content-css'),
                    contentOPTIONS = JMVC.dom.find('#content-options'),
                    tongueOPTIONS = JMVC.dom.find('#options'),
                    tonguePREVIEW = JMVC.dom.find('#preview'),
                    buttGOFS = JMVC.dom.find('#go-fs'),
                    buttRESET = JMVC.dom.find('#reset'),
                    buttRESETALL = JMVC.dom.find('#resetall'),
                    buttGETURL = JMVC.dom.find('#get-url'),
                    outarea = JMVC.dom.find('#outarea'),
                    inPreview = JMVC.dom.find('#in-preview');

                function getUrl() {
                    var vals = getValues(),
                        url = [JMVC.vars.baseurl, JMVC.c, JMVC.a].join(JMVC.US) +
                            JMVC.object.toQs({
                                h : vals[0] || defaults.h,
                                j : vals[1] || defaults.j,
                                c : vals[2] || defaults.c,
                                l : tongueOPTIONS.value || ''
                            }) +
                            (hash ? "#" + hash : ''),
                        l = url.length,
                        limit = 2047;

                    // just let the user know about url 2k limit
                    l > limit && alert('Url length : ' + l + "\n"  + "It seems like all content cannot be safely put in a url,\nit WON`T WORK in some browsers.");
                    prompt("Copy the following url", url);
                }

                function getValues() {
                    return [
                        contentHTML.value,
                        contentJAVASCRIPT.value,
                        contentCSS.value
                    ];
                }
                
                function appendScript (src, w, cb) {
                    w = w || JMVC.W;
                    var l = w.document.createElement("script");
                    l.type = "text/javascript";
                    if (cb) {
                        l.onload = cb;
                    }
                    l.src = src;
                    var s = w.document.getElementsByTagName("head")[0];
                    s.appendChild(l);
                }
                
                function update(){
                    var vals = getValues(),
                        h = vals[0] || defaults.h,
                        j = vals[1] || defaults.j,
                        c = vals[2] || defaults.c,
                        iframe = outarea,
                        lib = contentOPTIONS.value || false,
                        scriptTag;

                    ///reset iframe
                    scriptTag = document.createElement('script');
                    scriptTag.innerHTML = j;

                    if ('_af' in outarea.contentWindow) {
                        outarea.contentWindow.cancelAnimationFrame(outarea.contentWindow._af);
                    }

                    outarea.contentDocument.documentElement.innerHTML = JMVC.string.replaceAll(
                        JMVC.console._.tpl, {
                            'style' : c,
                            'body' : h,
                            'options' : JMVC.console._.options
                        }
                    );

                    //exit fullscreen
                    outarea.contentWindow.document.onkeyup =  function (e) {
                        if (fsmode && e.keyCode == 27) {
                            JMVC.head.title(title);
                            JMVC.css.style(inPreview,{'position':'relative'});
                            fsmode = false;
                            //update();
                        };
                    }
                    
                    try {
                        var dl = JMVC.WD.location,
                            loaded = false,
                            innerload = function () {
                                appendScript('/app/' + jmvc_iframe_file, iframe.contentWindow, function () {
                                    iframe.contentWindow.document.getElementsByTagName('head').item(0).appendChild(scriptTag);    
                                });
                            }
                        
                        iframe.contentWindow.eval('var JMVCshut = true; ');

                        (lib && appendScript(lib, iframe.contentWindow, innerload))
                        ||
                        innerload();

                    }catch(e){
                        console.error(e);
                    }
                }

                function gofs(){
                    
                    JMVC.head.title('Press esc to exit preview');   
                    JMVC.css.style(inPreview, {
                        position : 'absolute',
                        top :'0px',
                        left :'0px',
                        bottom: '0px',
                        right :'0px'
                    });
                    outarea.contentDocument.documentElement.focus();
                
                    fsmode = true;
                }

                function reset(current) {
                    if (!!current) {
                        JMVC.dom.find('#content-' + visibleTab).value = '';
                    } else {
                        contentHTML.value = 
                        contentJAVASCRIPT.value = 
                        contentCSS.value = 
                        contentOPTIONS.value = '';
                    }
                }

                function previewMode(onoff) {
                    var mode = ['show', 'hide'];
                    fsmode = onoff;
                    !onoff && mode.reverse();
                    JMVC.css[mode[0]](buttGOFS);
                    JMVC.css[mode[1]](buttRESET);
                    JMVC.css[mode[1]](buttRESETALL);
                }

                //lib
                if(JMVC.p.l) {
                    tongueOPTIONS.value = decodeURIComponent(JMVC.p.l);
                }

                if (tab && tab.match(/html|css|javascript|preview|options/)) {
                    JMVC.dom.addClass(JMVC.dom.find('#' + tab), 'active');
                    JMVC.css.show(JMVC.dom.find('#in-' + tab));
                    hash = tab;
                } else {
                    if (JMVC.hash.match(/html|css|javascript|preview|options/)) {
                        JMVC.dom.addClass(JMVC.dom.find('#' + JMVC.hash), 'active');
                        JMVC.css.show(JMVC.dom.find('#in-' + JMVC.hash));
                        hash = JMVC.hash;
                    } else {
                        JMVC.dom.addClass(JMVC.dom.find('#html'), 'active');
                        JMVC.css.show(JMVC.dom.find('#in-html'));
                    }
                }
                visibleTab = hash;
                
                previewMode(hash == 'preview');
                
                JMVC.events.on(JMVC.dom.find('.ablock'), 'click', function (e) {
                    var butt = JMVC.dom.find(this),
                        id =  JMVC.dom.attr(butt, 'id') || 'xxx';

                    visibleTab = id;
                    butt.blur();

                    JMVC.each(JMVC.dom.find('.ablock'), function (elbutt){
                        JMVC.dom.removeClass(elbutt, 'active');
                    });
                    JMVC.dom.addClass(butt, 'active');
                    hash = id;

                    JMVC.each(JMVC.dom.find('.inputdiv'), function (el){
                        JMVC.css.style(el, 'display', 'none');
                    });
                    JMVC.css.style(JMVC.dom.find('#in-' + id), 'display', 'block');


                    previewMode(id == 'preview');

                });

                //enable tab on textareas
                JMVC.each(JMVC.dom.find('textarea'), JMVC.events.doTab);

                JMVC.events.on(buttGETURL, 'click', getUrl);
                JMVC.events.on(buttGOFS, 'click', gofs);
                JMVC.events.on(tonguePREVIEW, 'click', update);
                JMVC.events.on(buttRESETALL, 'click', function () {reset(); });
                JMVC.events.on(buttRESET, 'click', function () {reset(true); });


                JMVC.events.delay(function () {update(); }, 0);

                //fullscreen ?
                !!JMVC.p.fullscreen && gofs();
            }


            //save scroll vertical position
            JMVC.console._.scroll = scrollTop;

            //scroll to top
            JMVC.W.scrollTo(0, 1);

            //disable scroll
            JMVC.events.disable_scroll();

            // JMVC.set('height', dims.height - 60);
            JMVC.head.addStyle(JMVC.vars.baseurl + '/app/extensions/core/console/console.css', false);
            JMVC.dom.append(JMVC.dom.body(), container);
            
            // -------------------------------------
            JMVC.core.widgzard.render(config, true);
            // -------------------------------------


        }
        JMVC.console._.status = !JMVC.console._.status;
        return JMVC.console._.status;
    }
}); 