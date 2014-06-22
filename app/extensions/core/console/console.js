// type : LIB
// 

JMVC.require(
    'core/screen/screen',
    'core/lib/widgzard/widgzard',
    'event_scroll/event_scroll'
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
                        '<link rel="stylesheet" type="text/css" href="/media/css/core/jmvc.min.css">'+
                        '<style type="text/css">%style%</style>'+
                    '</head>'+
                    '<body class="console">%body%</body>'+
                '</html>',
            options : '<div class="pad20">'+
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
            title = JMVC.head.title();

        if (JMVC.console._.status) {

            JMVC.dom.remove(JMVC.dom.find('#jmvc-console'));
            JMVC.events.enable_scroll();
            JMVC.W.scrollTo(0, JMVC.console._.scroll);

        } else {

            var jmvc_iframe_file = 'jmvc.min.js',
                dims = JMVC.screen.getViewportSize(),
                border_size = 0,
                margin = -1,
                top_height = 10,
                foot_height = 100,
                screendata = JMVC.screen.getScreenData(),
                scrollTop = screendata.scrollTop,
                triBrdCol = '#606060',
                

                // main container
                container = JMVC.dom.create(
                    'div',{
                        'id' : 'jmvc-console',
                        'class' : 'jmvc-console',
                        'style' : 'left:' + margin + 'px;right:' + margin + 'px;top:' + margin + 'px;bottom:' + margin + 'px;border:' + border_size + 'px solid black'
                    }
                ),

                content = {
                    h : h || (JMVC.p.h ? decodeURIComponent(JMVC.p.h) : "<p><span id='hw'>hello world</span></p>"),
                    j : j || (JMVC.p.j ? decodeURIComponent(JMVC.p.j) : "var t = document.getElementById('hw');\nt.onclick = function () {t.innerHTML='clicked'; };"),
                    c : c || (JMVC.p.c ? decodeURIComponent(JMVC.p.c) : "p {\n\tmargin:20px\n}\nspan{\n\tcolor:red;\n\tfont-family:arial, sans-serif;\n\tfont-size:20px;\n\tcursor:pointer;\n}")
                },
                // triangle = {
                //   tag : "div",
                //   "float" : "right",
                //   style  : {"height":"0px","width":"0px","borderBottom":"30px solid " + triBrdCol,"borderLeft":"20px solid #333", "marginTop":"-10px"}
                // },
                brd = '<div class=" gbox" style="float: right; height: 0px; width: 0px; border-bottom: 30px solid rgb(96, 96, 96); border-left: 20px solid rgb(51, 51, 51); margin-top: -10px;"></div>',
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
                                html : "<a href='" + JMVC.vars.baseurl + "'><img src='/media/img/jmvc_m1.svg' width='60'/></a>",
                                style : {
                                    "float" : "left",
                                    marginTop : "12px",
                                    marginLeft : "10px"
                                },
                                attrs : {title : "web console v." + version}
                            },{
                                "tag":"button",
                                html:"GET URL",
                                attrs : {
                                    id : "get-url",
                                    "class" : "round4"
                                },
                                style : {
                                    "float" : "left",
                                    height : "20px",
                                    lineHeight : "16px",
                                    padding : "0px 5px"
                                }
                            },{
                                tag : "button",
                                html : "FullScreen",
                                attrs : {
                                    id : "go-fs",
                                    "class" : "round4"
                                },
                                style : {
                                    "float" : "left",
                                    height : "20px",
                                    lineHeight : "16px",
                                    padding : "0px 5px"
                                }
                            },{
                                tag : "button",
                                html : "Reset",
                                attrs : {
                                    id : "reset",
                                    "class" : "round4"
                                },
                                style : {
                                    "float" : "left",
                                    height : "20px",
                                    lineHeight : "16px",
                                    padding : "0px 5px"
                                }
                            },{
                                tag : "button",
                                html : "Reset All",
                                attrs : {
                                    id : "resetall",
                                    "class" : "round4"
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
                                        "tag":"div",
                                        attrs : {"class":"round4 roundtop text"},
                                        style : {"float":"right"}
                                    },{
                                        "tag":"div",
                                        style : {"float":"right"},
                                        attrs : {"class":"tri"}
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
                                        attrs : {"class":"tri"}
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
                                        attrs : {"class":"round4 roundtop text"},
                                        style : {"float":"right"},
                                        html : "CSS"
                                    },{
                                        style : {"float" : "right"},
                                        attrs : {"class" : "tri"}
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
                                        tag : "div",
                                        attrs : {"class" : "round4 roundtop text"},
                                        style : {"float" : "right"},
                                        html : "JS"
                                    },{
                                        tag : "div",
                                        style : {"float" : "right"},
                                        attrs : {"class" : "tri"}
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
                                        attrs : {"class":"round4 roundtop text"},
                                        style : {"float":"right"},
                                        html : "HTML"
                                    },{
                                        style : {"float":"right"},
                                        attrs : {"class":"tri"}
                                    }
                                ]
                            },
                            "clearer"
                        ]
                    },{
                        target : container,
                        attrs : {"class" : "input-divs"},
                        content : [
                            {
                                attrs : {
                                    id : "in-html",
                                    "class" : "in-html inputdiv"
                                },
                                content : [{
                                    tag : "textarea",
                                    attrs : {
                                        id : "content-html"
                                    },
                                    style : {
                                        height : (dims.height - 61) + "px",
                                        border : "none"
                                    },
                                    html : content.h
                                }]
                            },{
                                attrs : {"id" : "in-javascript", "class" : "in-javascript inputdiv"},
                                content: [{
                                    tag : "textarea",
                                    attrs : {
                                        id : "content-javascript"
                                    },
                                    style : {
                                        height : (dims.height - 61) + "px",
                                        border : "none"
                                    },
                                    html : content.j
                                }]
                            },{
                                attrs : {
                                    id : "in-css",
                                    "class" : "in-css inputdiv"
                                },
                                content: [{
                                    tag : "textarea",
                                    attrs : {"id":"content-css"},
                                    style : {
                                        height : (dims.height - 61) + "px",
                                        border : "none"
                                    },
                                    html : content.c
                                }]
                            },{
                                attrs : {
                                    id : "in-preview",
                                    "class" : "in-preview inputdiv"
                                },
                                content: [{
                                    tag : "iframe",
                                    attrs : {
                                        id : "outarea",
                                        width : "100%",
                                        height : (dims.height - 61) + "px"
                                    },
                                    style : {backgroundColor : 'white'}
                                }]
                            },{
                                attrs : {
                                    id : "in-options",
                                    "class" : "in-options inputdiv"
                                },
                                html : JMVC.console._.options
                            }
                        ]
                    }]

                },
                hash = false;

            function getUrl() {
                var vals = getValues(),
                    url = [JMVC.vars.baseurl, JMVC.c, JMVC.a].join(JMVC.US) + JMVC.object.toQs({
                        h : vals[0] || defaults.h,
                        j : vals[1] || defaults.j,
                        c : vals[2] || defaults.c,
                        l : JMVC.dom.find('#options').value
                    }) + (hash ? "#" + hash : '');
                prompt("Copy the following url", url);
            }

            function getValues() {
                return [
                    JMVC.dom.find('#content-html').value,
                    JMVC.dom.find('#content-javascript').value,
                    JMVC.dom.find('#content-css').value
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
                    iframe = JMVC.dom.find('#outarea'),
                    lib = JMVC.dom.find('#content-options').value || false,
                    scriptTag;

                ///reset iframe
                


                scriptTag = document.createElement('script');
                scriptTag.innerHTML = j;

                if ('_af' in JMVC.dom.find('#outarea').contentWindow) {
                    JMVC.dom.find('#outarea').contentWindow.cancelAnimationFrame(JMVC.dom.find('#outarea').contentWindow._af);
                }

                JMVC.dom.find('#outarea').contentDocument.documentElement.innerHTML = JMVC.string.replaceAll(
                    JMVC.console._.tpl, {
                        'style' : c,
                        'body' : h,
                        'options' : JMVC.console._.options
                    }
                );

                //exit fullscreen
                JMVC.dom.find('#outarea').contentWindow.document.onkeyup =  function (e) {
                    if (fsmode && e.keyCode == 27) {
                        JMVC.head.title(title);
                        JMVC.css.style(JMVC.dom.find('#outarea'),{'position':'relative'});
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

                    if (lib) {
                        appendScript(lib, iframe.contentWindow, innerload);
                    } else {
                       innerload(); 
                    }

                    //iframe.contentWindow.eval(appendScript( '/app/' + jmvc_iframe_file));
                    
                    
                    
                    //iframe.contentWindow.document.getElementsByTagName('head').item(0).appendChild(scriptTag);
                    

                }catch(e){
                    console.error(e);
                }
            }

            function gofs(){
                JMVC.head.title('Press esc to exit preview');   
                JMVC.css.style(JMVC.dom.find('#outarea'), {
                    position : 'absolute',
                    top :'0px',
                    left :'0px',
                    width :'100%',
                    height :'100%'
                });
                JMVC.dom.find('#outarea').contentDocument.documentElement.focus();
            
                fsmode = true;
                //update();
            }

            function reset(current) {
                if (!!current) {
                    JMVC.dom.find('#content-' + visibleTab).value = '';
                } else {
                    JMVC.dom.find('#content-html').value = 
                    JMVC.dom.find('#content-javascript').value = 
                    JMVC.dom.find('#content-css').value = 
                    JMVC.dom.find('#content-options').value = '';
                }
            }



            //save scroll vertical position
            JMVC.console._.scroll = scrollTop;

            //scroll to top
            JMVC.W.scrollTo(0, 1);

            //disable scroll
            JMVC.events.disable_scroll();

            JMVC.set('height', dims.height - 60);
            JMVC.head.addStyle(JMVC.vars.baseurl + '/app/extensions/core/console/console.css', true);
            JMVC.dom.append(JMVC.dom.body(), container);

            // -------------------------------------
            JMVC.core.widgzard.render(config, true);
            // -------------------------------------

            //lib
            if(JMVC.p.l) {
                JMVC.dom.find('#options').value = decodeURIComponent(JMVC.p.l);
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
            if (hash == 'preview') {
                JMVC.css.show(JMVC.dom.find('#go-fs'));
                JMVC.css.hide(JMVC.dom.find('#reset'));
                JMVC.css.hide(JMVC.dom.find('#resetall'));
            } else {
                JMVC.css.hide(JMVC.dom.find('#go-fs'));
                JMVC.css.show(JMVC.dom.find('#reset'));
                JMVC.css.show(JMVC.dom.find('#resetall'));
            }



            JMVC.events.bind(JMVC.dom.find('.ablock'), 'click', function (e) {
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

                if (id == 'preview') {
                    fsmode = false;
                    JMVC.css.show(JMVC.dom.find('#go-fs'));
                    JMVC.css.hide(JMVC.dom.find('#reset'));
                    JMVC.css.hide(JMVC.dom.find('#resetall'));
                } else {
                    JMVC.css.hide(JMVC.dom.find('#go-fs'));
                    JMVC.css.show(JMVC.dom.find('#reset'));
                    JMVC.css.show(JMVC.dom.find('#resetall'));
                }

            });

            //enable tab on textareas
            JMVC.each(JMVC.dom.find('textarea'), function (el) {
                el.onkeydown = function (e) {
                    var textarea = this,
                        input,
                        remove,
                        posstart,
                        posend,
                        compensateForNewline,
                        before,
                        after,
                        selection,
                        val;

                    if (e.keyCode == 9) { // tab
                        input = textarea.value; // as shown, `this` would also be textarea, just like e.target
                        remove = e.shiftKey;
                        posstart = textarea.selectionStart;
                        posend = textarea.selectionEnd;

                        // if anything has been selected, add one tab in front of any line in the selection
                        if (posstart != posend) {
                            posstart = input.lastIndexOf('\n', posstart) + 1;
                            compensateForNewline = input[posend - 1] == '\n';
                            before = input.substring(0, posstart);
                            after = input.substring(posend - (~~compensateForNewline));
                            selection = input.substring(posstart, posend);

                            // now add or remove tabs at the start of each selected line, depending on shift key state
                            // note: this might not work so good on mobile, as shiftKey is a little unreliable...
                            if (remove) {
                                if (selection[0] == '\t') {
                                    selection = selection.substring(1);
                                }
                                selection = selection.split('\n\t').join('\n');
                            } else {
                                selection = selection.split('\n');
                                if (compensateForNewline){
                                    selection.pop();    
                                } 
                                selection = '\t'+selection.join('\n\t');
                            }

                            // put it all back in...
                            textarea.value = before+selection+after;
                            // reselect area
                            textarea.selectionStart = posstart;
                            textarea.selectionEnd = posstart + selection.length;
                        } else {
                            val = textarea.value;
                            textarea.value = val.substring(0,posstart) + '\t' + val.substring(posstart);
                            textarea.selectionEnd = textarea.selectionStart = posstart + 1;
                        }
                        e.preventDefault(); // dont jump. unfortunately, also/still doesnt insert the tab.
                    }
                }
            });

            JMVC.events.bind(JMVC.dom.find('#get-url'), 'click', getUrl);
            JMVC.events.bind(JMVC.dom.find('#go-fs'), 'click', gofs);
            JMVC.events.bind(JMVC.dom.find('#preview'), 'click', update);
            JMVC.events.bind(JMVC.dom.find('#resetall'), 'click', function () {reset(); });
            JMVC.events.bind(JMVC.dom.find('#reset'), 'click', function () {reset(true); });


            JMVC.events.delay(function () {update(); }, 0);

            //fullscreen ?
            !!JMVC.p.fullscreen && gofs();
        }
        JMVC.console._.status = !JMVC.console._.status;
    }
}); 