/*
 *    TEST SUITE
 *    sightly basedon the work of Angus Croll checking pros/cons of strict mode 
 *    http://javascriptweblog.wordpress.com/2011/05/03/javascript-strict-mode/
 */

JMVC.extend('test', {
    vars : {
        'HTML_MODE' : 1,
        'CONSOLE_MODE' : 2,
        'mode' : 1,//HTML
        'banner' : false,
        'currentTestWidget' : false,
        'cur_timer' : 0,
        'testsPassed' : 0,
        'totalTests' : 0,
        'css_path' : [JMVC.vars.baseurl,  'app', 'testsuite', 'css'].join(JMVC.US),
        'css_default' : 'style.css',
        'css_code' : 'javascript.css',
        'start_time' : 0,
        'end_time' : 0,
        'outCode' : false,
        'debug_id' : 0
    },
    //
    init : function () {
        'use strict';
        JMVC.require(
            'core/sniffer/sniffer',
            'core/fx/fx',
            'core/lib/shl/shl'
        );
    },

    initialize : function (outcode) {
        'use strict';
        if (outcode !== undefined && outcode) {
            JMVC.test.vars.outCode = outcode;
        }
        JMVC.head.addstyle(JMVC.test.vars.css_path + JMVC.US + JMVC.test.vars.css_default);
        JMVC.head.addstyle(JMVC.test.vars.css_path + JMVC.US + JMVC.test.vars.css_code);
        JMVC.test.vars.banner = JMVC.dom.add(JMVC.dom.body(), 'div', {id : 'results'});
    },
    describe : function (html) {
        'use strict';
        if (JMVC.test.vars.mode == JMVC.test.vars.HTML_MODE) {
            JMVC.dom.add(JMVC.test.vars.banner, 'div', {'class' : 'describe fiveround'}, html);
        }
    },

    code : function (code) {
        'use strict';
        var lines = code.split(/\n/),
            outline = '<li><span class="nline">%nline%</span>%line%</li>',
            out = '',
            l,
            i = 1;
        for (l in lines) {
            out += JMVC.string.replaceall(outline, {nline : i, line : JMVC.shl.parse(lines[l]) || ' '}, '%', '%');
            i += 1;
        }
        JMVC.dom.add(JMVC.test.vars.banner, 'code', {'class' : 'debug fiveround'}, '<ul>' + out + '</ul>');
        //console.debug('<ul>' + out + '</ul>');
    },

    message : function (msg) {
        'use strict';
        if (JMVC.test.vars.mode == JMVC.test.vars.CONSOLE_MODE) {
            JMVC.debug("MSG: " + msg);
        } else {
            JMVC.dom.add(JMVC.test.vars.banner, 'div', {'class' : 'msg fiveround'}, msg);
        }
    },

    outDebug : function (kind, opts) {
        'use strict';
        JMVC.test.vars.debug_id += 1;
        var tpl  = '<span class="more" id="toggle_%id%">more</span><div class="hideSpec" id="spec_%id%"><h4>%tit%</h4><h4>%real%</h4><pre class="fiveround">%code%</pre></div>',
            pars = {'id' : JMVC.test.vars.debug_id,'tit' : null, 'code' : null, 'real' : null};

        switch (kind) {
        case 'ex':
            pars.tit = 'Expecting exception : ' + opts.exception.name;
            pars.code = opts.code.toString();
            break;
        case 'val':
            pars.tit = 'Expecting value : ' + opts.expvalue.toString();
            pars.real = 'Returned value : ' + opts.realvalue.toString();
            pars.code = opts.code.toString();
            break;
        case 'ass':
            pars.tit = 'Asserting';
            pars.code = opts.code.toString();
            break;
        default:break;
        }
        return [JMVC.test.vars.debug_id, JMVC.string.replaceall(tpl, pars)];
    },

    testException : function (testName, code, expectedError) {
        /*
        EvalError        An error in the eval() function has occurred.
        //
        RangeError        Out of range number value has occurred.
        //
        ReferenceError    An illegal reference has occurred.
        //
        SyntaxError    A syntax error within code inside the eval() function has occurred.
                    All other syntax errors are not caught by try/catch/finally, and will trigger
                     the default browser error message associated with the error.
                    To catch actual syntax errors, you may use the onerror event.
        //
        TypeError        An error in the expected variable type has occurred.
        //
        URIError        An error when encoding or decoding the URI has occurred (ie: when calling encodeURI()).
        */
        'use strict';
        JMVC.test.startTest(testName);
        var res = true,
            debuginfo = false;

        try {
            expectedError == SyntaxError ? eval(code) : code();
            res = false;
        } catch (e) {
            res = (e instanceof expectedError);
        }

        if (JMVC.test.vars.outCode) {
            debuginfo = JMVC.test.outDebug('ex', {'exception' : expectedError, 'code' : code});
        }
        JMVC.test.finishTest(res, debuginfo);
    },

    testAssertion : function (testName, value) {
        'use strict';
        var res = false, debuginfo = false;
        JMVC.test.startTest(testName);
        res = !!value;
        if (JMVC.test.vars.outCode) {
            debuginfo = JMVC.test.outDebug('ass', {'code' : value});
        }
        JMVC.test.finishTest(res, debuginfo);
    },

    testValue : function (testName, fn, expectedValue, options) {
        'use strict';
        var res = true,
            i = 0,
            debuginfo = false,
            real;
        options = options || {};
        JMVC.test.startTest(testName);
        real = fn.apply(options.ctx, options.args || []);
        res = (real === expectedValue);
        
        if (JMVC.test.vars.outCode) {
            debuginfo = JMVC.test.outDebug('val', {'realvalue' : real, 'expvalue' : expectedValue != undefined ? expectedValue : 'null', 'code' : fn.toString()});
        }
        JMVC.test.finishTest(res, debuginfo);
    },
    
    
    
    testTime : function (testName, fn, times, options) {
        'use strict';    
        JMVC.test.startTest(testName);
        while (times) {
            fn.apply(null, options || []);
            times -= 1;
        }
        // this is the real time
        JMVC.test.finishTest(true);
    },
    

    startTest : function (testName) {
        'use strict';
        if (JMVC.test.vars.mode == JMVC.test.vars.CONSOLE_MODE) {
            JMVC.debug("testing..." + testName);
        } else {
            JMVC.test.vars.currentTestWidget = JMVC.dom.add(JMVC.test.vars.banner, 'div', {id : 'test_' + JMVC.test.vars.cur_timer}, testName);
        }
        JMVC.test.vars.start_time = +new Date;
    },

    finishTest : function (passed, debuginfo) {
        'use strict';
        var time = 0,
            result = false;

        JMVC.test.vars.end_time = +new Date;
        time = JMVC.test.vars.end_time - JMVC.test.vars.start_time;
        
        JMVC.test.vars.totalTests += 1;
        passed && JMVC.test.vars.testsPassed++;
        result = passed ? "passed" : "failed";
        if (JMVC.test.vars.mode == JMVC.test.vars.CONSOLE_MODE) {
            JMVC.debug(result +' in '+JMVC.test.vars.all_times[JMVC.test.vars.cur_timer]+' ms');
        } else {
            JMVC.dom.attr(JMVC.test.vars.currentTestWidget, 'class', result + ' fiveround');
            JMVC.dom.add(JMVC.test.vars.currentTestWidget, 'strong', {'class' : 'time'}, time + ' ms' );
            if (debuginfo) {
                JMVC.dom.add(JMVC.test.vars.currentTestWidget, 'div', {}, JMVC.shl.parse(debuginfo[1]) );
                JMVC.events.bind(JMVC.dom.find('#toggle_' + debuginfo[0]), 'click', function () {JMVC.fx.toggle(JMVC.dom.find('#spec_' + debuginfo[0])); });
            }
        }
        JMVC.test.vars.cur_timer += 1;
    },

    startAll : function () {
        'use strict';
        var togglespec_visibility = false,
            panel,
            togglebutton;
        if (JMVC.test.vars.mode == JMVC.test.vars.HTML_MODE) {
            JMVC.dom.add(
                JMVC.test.vars.banner,
                'div',
                {'id' : 'bro'},
                (JMVC.sniffer && JMVC.sniffer.os.name !== 'undefined') ? 
                    JMVC.sniffer.os.name + ' : ' + JMVC.sniffer.browser.name + ' v.' + JMVC.sniffer.browser.version
                    :
                    window.navigator.userAgent
            );
            if (JMVC.test.vars.outCode) {
                panel = JMVC.dom.add(JMVC.test.vars.banner, 'div', {id : 'panel', 'class' : 'fiveround'});
                togglebutton = JMVC.dom.add(panel, 'input', {'id' : 'togglespec', 'type' : 'button', 'class' : 'panelbutton fiveround', 'value' : 'Toggle `more`'});
                JMVC.events.bind(togglebutton, 'click', function () {
                    JMVC.each(JMVC.dom.find('.more'), function (i) {i.click(); });
                    togglespec_visibility = !togglespec_visibility;
                });
            }
        }
    },
    
    finishAll : function (code) {
        'use strict';
        var result = ["","(", JMVC.test.vars.testsPassed, "out of", JMVC.test.vars.totalTests, "tests passed", ")"].join(' '),
            res = JMVC.test.vars.testsPassed === JMVC.test.vars.totalTests,
            wholeResClass = res ? 'passed' : 'failed' ,
            wholeResString = 'Test ' + wholeResClass;
        if (JMVC.test.vars.mode == JMVC.test.vars.HTML_MODE) {
            JMVC.dom.add(JMVC.test.vars.banner, 'div', {id : 'summary'}, result);
            JMVC.dom.add(JMVC.test.vars.banner, 'div', {id : 'globalResult','class' : wholeResClass + ' fiveround'}, wholeResString);
            JMVC.dom.attr(JMVC.dom.find('#bro'), 'class', res ? 'ok' : 'ko');
            
            if (code != undefined) {
                JMVC.dom.append(JMVC.dom.find('#globalResult'), JMVC.dom.create('pre', {'style' : 'font-size:12px; color:#afa'}, JMVC.shl.parse(code.toString())));
            }
            JMVC.head.title('Test '+  wholeResClass.toUpperCase());
            
        } else if (JMVC.test.vars.mode == JMVC.test.vars.CONSOLE_MODE) {
            JMVC.debug(result);
            JMVC.debug(wholeResString);
        }

        JMVC.head.link('icon', {type : "image/vnd.microsoft.icon", href : JMVC.vars.baseurl + "/media/favicon.ico"});
    },
    pause : function () {
        'use strict';
        JMVC.dom.add(JMVC.test.vars.banner, 'hr', {'class' : 'pause fiveround'});
    }
});
