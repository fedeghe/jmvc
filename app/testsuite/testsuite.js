/*
 *    TEST SUITE
 *    sightly basedon the work of Angus Croll checking pros/cons of strict mode 
 *    http://javascriptweblog.wordpress.com/2011/05/03/javascript-strict-mode/
 *    thank You Angus
 */

JMVC.extend('test', {

    /**
     * [vars description]
     * @type {Object}
     */
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

    /**
     * [init description]
     * @return {[type]} [description]
     */
    init : function () {
        'use strict';
        JMVC.require(
            'core/sniffer/sniffer',
            'core/fx/fx',
            'core/lib/shl/shl',
            'core/color/color'
        );
    },

    /**
     * [initialize description]
     * @param  {[type]} outcode [description]
     * @return {[type]}         [description]
     */
    initialize : function (outcode) {
        'use strict';
        if (outcode !== undefined && outcode) {
            JMVC.test.vars.outCode = outcode;
        }
        JMVC.head.addstyle(JMVC.test.vars.css_path + JMVC.US + JMVC.test.vars.css_default);
        JMVC.head.addstyle(JMVC.test.vars.css_path + JMVC.US + JMVC.test.vars.css_code);
        JMVC.test.vars.banner = JMVC.dom.add(JMVC.dom.body(), 'div', {id : 'results'});
    },

    /**
     * [describe description]
     * @param  {[type]} html [description]
     * @return {[type]}      [description]
     */
    describe : function (html) {
        'use strict';
        if (JMVC.test.vars.mode == JMVC.test.vars.HTML_MODE) {
            JMVC.dom.add(JMVC.test.vars.banner, 'div', {'class' : 'describe fiveround'}, html);
        }
    },

    /**
     * [code description]
     * @param  {[type]} code [description]
     * @return {[type]}      [description]
     */
    code : function (code) {
        JMVC.dom.add(JMVC.test.vars.banner, 'code', {'class' : 'debug fiveround'}, this.listCode(code));
    },

    listCode : function (code, noNumberLines) {
        'use strict';
        var lines = code.split(/\n/),
            outline = '<li><span class="nline">%nline%</span>%line%</li>',
            out = '',
            l = lines.length,
            j = 0,
            i = 1,
            min = Infinity;

        // get the minimum spaces at the beginning of lines, but 0
        // used to remove these spaces from code
        //
        
        for (j = 0; j < l; j++) {
            var tmp = lines[j].match(/^(\s*)/)[0].length;

            // 0 cen be ignored
            // 
            if (tmp && tmp < min) {
                min = tmp;
            }
        }
        
        // loop lines
        // 
        for (j = 0; j < l; j++) {
            // remove the right number of spaces at line begin
            lines[j] = lines[j].replace(new RegExp("^\\\s{" + min + "}"), '');
            out += JMVC.string.replaceall(outline, {
                nline : noNumberLines ? '' : i,
                //line : JMVC.htmlchars(JMVC.shl.parse(lines[j]) || ' ')
                line : JMVC.htmlchars(lines[j] || ' ')
            }, '%', '%');
            i += 1;
        }
        return '<ul>' + out + '</ul>';
    },

    /**
     * [message description]
     * @param  {[type]} msg [description]
     * @return {[type]}     [description]
     */
    message : function (msg) {
        'use strict';
        if (JMVC.test.vars.mode == JMVC.test.vars.CONSOLE_MODE) {
            JMVC.debug("MSG: " + msg);
        } else {
            JMVC.dom.add(JMVC.test.vars.banner, 'div', {'class' : 'msg fiveround'}, msg);
        }
    },

    /**
     * [outDebug description]
     * @param  {[type]} kind [description]
     * @param  {[type]} opts [description]
     * @return {[type]}      [description]
     */
    outDebug : function (kind, opts) {
        'use strict';
        JMVC.test.vars.debug_id += 1;
        var tpl  = '<span class="more" id="toggle_%id%">more</span><div class="hideSpec" id="spec_%id%"><h4>%tit%</h4><h4>%real%</h4><pre class="fiveround">%code%</pre></div>',
            pars = {
                id : JMVC.test.vars.debug_id,
                tit : null,
                code : null,
                real : null
            };

        switch (kind) {
        case 'ex':
            pars.tit = 'Expecting exception : ' + opts.exception.name;
            pars.code = this.listCode(opts.code, true); //opts.code.toString();
            break;
        case 'val':
            pars.tit = 'Expecting value : ' + (opts.expvalue && opts.expvalue.toString());
            pars.real = 'Returned value : ' + (opts.realvalue && opts.realvalue.toString());
            pars.code = this.listCode(opts.code, true); //opts.code.toString();
            break;
        case 'ass':
            pars.tit = 'Asserting';
            pars.real = 'Returned value : ' + opts.realvalue.toString();
            pars.code = this.listCode(opts.code, true); //opts.code.toString();
            break;
        default:break;
        }
        return [JMVC.test.vars.debug_id, JMVC.string.replaceall(tpl, pars)];
    },

    /**
     * [testException description]
     * @param  {[type]} testName      [description]
     * @param  {[type]} code          [description]
     * @param  {[type]} expectedError [description]
     * @return {[type]}               [description]
     */
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
            debuginfo = JMVC.test.outDebug('ex', {
                exception : expectedError,
                code : typeof code === 'function' ? code.toString() : code 
            });
        }
        JMVC.test.finishTest(res, debuginfo);
    },

    /**
     * [testAssertion description]
     * @param  {[type]} testName [description]
     * @param  {[type]} value    [description]
     * @return {[type]}          [description]
     */
    testAssertion : function (testName, valueFn) {
        'use strict';
        var res = false, debuginfo = false;
        JMVC.test.startTest(testName);
        res = !!valueFn();
        if (JMVC.test.vars.outCode) {
            debuginfo = JMVC.test.outDebug('ass', {
                realvalue: res,
                code : valueFn.toString()
            });
        }
        JMVC.test.finishTest(res, debuginfo);
    },

    /**
     * [testValue description]
     * @param  {[type]}   testName      [description]
     * @param  {Function} fn            [description]
     * @param  {[type]}   expectedValue [description]
     * @param  {[type]}   options       [description]
     * @return {[type]}                 [description]
     */
    testValue : function (testName, fn, expectedValue, options) {
        'use strict';
        var res = true,
            i = 0,
            debuginfo = false,
            real;
        options = options || {};
        JMVC.test.startTest(testName);
        real = fn.apply(options.ctx || null, options.args || []);
        res = (real == expectedValue);
        
        if (JMVC.test.vars.outCode) {
            debuginfo = JMVC.test.outDebug('val', {
                realvalue : real,
                expvalue : expectedValue != undefined ? expectedValue : 'null',
                code : fn.toString()
            });
        }
        JMVC.test.finishTest(res, debuginfo);
    },
    

    testimes : [],
    /**
     * [testTime description]
     * @param  {[type]}   testName [description]
     * @param  {Function} fn       [description]
     * @param  {[type]}   times    [description]
     * @param  {[type]}   options  [description]
     * @return {[type]}            [description]
     */
    testTime : function (testName, fn, times, options) {
        'use strict';    
        JMVC.test.startTest(testName);
        while (times) {
            fn.apply(null, options || []);
            times -= 1;
        }
        // this is the real time
        this.testimes.push([testName, JMVC.test.finishTest(true)]);
    },

    /**
     * [startTest description]
     * @param  {[type]} testName [description]
     * @return {[type]}          [description]
     */
    startTest : function (testName) {
        'use strict';
        if (JMVC.test.vars.mode == JMVC.test.vars.CONSOLE_MODE) {
            JMVC.debug("testing..." + testName);
        } else {
            JMVC.test.vars.currentTestWidget = JMVC.dom.add(JMVC.test.vars.banner, 'div', {id : 'test_' + JMVC.test.vars.cur_timer}, testName);
        }
        JMVC.test.vars.start_time = +new Date;
    },

    /**
     * [finishTest description]
     * @param  {[type]} passed    [description]
     * @param  {[type]} debuginfo [description]
     * @return {[type]}           [description]
     */
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
                
                JMVC.dom.add(JMVC.test.vars.currentTestWidget, 'div', {}, debuginfo[1] || '');
                JMVC.events.bind(
                    JMVC.dom.find('#toggle_' + debuginfo[0]),
                    'click',
                    function () {JMVC.fx.toggle(JMVC.dom.find('#spec_' + debuginfo[0])); }
                );
            }
        }
        JMVC.test.vars.cur_timer += 1;
        return time;
    },

    /**
     * [startAll description]
     * @return {[type]} [description]
     */
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

    /**
     * [finishAll description]
     * @param  {[type]} code [description]
     * @return {[type]}      [description]
     */
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
                //JMVC.dom.append(JMVC.dom.find('#globalResult'), JMVC.dom.create('pre', {'style' : 'font-size:12px; color:#afa'}, JMVC.shl.parse(code.toString())));
                JMVC.dom.append(JMVC.dom.find('#globalResult'), JMVC.dom.create('pre', {'style' : 'font-size:12px; color:#afa'}, code.toString()));
            }
            JMVC.head.title('Test '+  wholeResClass.toUpperCase());
            
        } else if (JMVC.test.vars.mode == JMVC.test.vars.CONSOLE_MODE) {
            JMVC.debug(result);
            JMVC.debug(wholeResString);
        }

        JMVC.head.link('icon', {type : "image/vnd.microsoft.icon", href : JMVC.vars.baseurl + "/media/favicon.ico"});
    },

    /**
     * [pause description]
     * @return {[type]} [description]
     */
    pause : function () {
        'use strict';
        JMVC.dom.add(JMVC.test.vars.banner, 'hr', {'class' : 'pause fiveround'});
    },

    timeSummary : function () {
        
        var l = this.testimes.length,
            colors = JMVC.core.color.getGradientArray('#00ff00', '#ff0000', l - 2),
            list = JMVC.dom.create('ul'),
            cnt = JMVC.dom.create('div', {'class':'timesummary fiveround'}, list);

        //order
        this.testimes = this.testimes.sort(function (a, b) {
            return a[1] > b[1];
        });
        JMVC.dom.add(list, 'li',{'class':'head'}, 'Time summary');
        
        for (var k = 0; k < l; k++) {
            var o = {style:'color:' + colors[k]};
            if (k == 0) {
                o['class'] = 'best';
            }
            if (k == l - 1) {
                o['class'] = 'worst';
            }
            JMVC.dom.add(list, 'li', o, '<strong>' + this.testimes[k][1] + '</strong>:' + this.testimes[k][0]);
        }
        JMVC.dom.append(JMVC.test.vars.banner, cnt);
    }
});
