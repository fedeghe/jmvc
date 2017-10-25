/*
 *    TEST SUITE
 *    sightly basedon the work of Angus Croll checking pros/cons of strict mode 
 *    http://javascriptweblog.wordpress.com/2011/05/03/javascript-strict-mode/
 *    thank You Angus
 */

JMVC.extend('test', function () {
    'use strict';

    /**
     * [vars description]
     * @type {Object}
     */
    var vars = {
            HTML_MODE : 1,
            CONSOLE_MODE : 2,
            mode : 1,//HTML
            banner : false,
            currentTestWidget : false,
            cur_timer : 0,
            testsPassed : 0,
            totalTests : 0,
            css_path : [JMVC.vars.baseurl, 'app', 'testsuite', 'css'].join(JMVC.US),
            css_default : 'style.css',
            css_code : 'javascript.css',
            start_time : 0,
            end_time : 0,
            outCode : false,
            debug_id : 0,
            all_times : []
        },
        /*
        listCode = function (code, noNumberLines) {
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
                //lines[j] = lines[j].replace(new RegExp("^\\\s{" + min + "}"), '');

                out += JMVC.string.replaceAll(
                    outline, {
                        nline : noNumberLines ? '' : i,
                        line : '<span>' + JMVC.htmlChars(lines[j] || ' ') + '</span>'
                    }
                );
                i += 1;
            }
            return '<ul>' + out + '</ul>';
        },
        */
        highlight = function (code) {
            return code
                .replace(/function/g, '<span class="function">function</span>')
                .replace(/JMVC/g, '<span class="jmvc">JMVC</span>')
                .replace(/new/g, '<span class="new">new</span>')
                .replace(/([\}\{\[\]\(\)}])/g, function (str, $1) {
                    return '<span class="parenthesis">' + $1 + '</span>';
                });
        },
        listCode = function (code, noNumberLines) {
            var lines = code.split(/\n/).filter(function (line) {
                    return line.replace(/\s|\t*/g, '').length;
                }),
                outline = '<li><span class="nline">%nline%</span>%line%</li>',
                out = [],
                l = lines.length,
                j = 0,
                i = 1,
                min = Infinity,
                tmp;

            // get the minimum spaces at the beginning of lines, but 0
            // used to remove these spaces from code
            //
            for (j = 0; j < l; j++) {
                // first replace tabs with 4 spaces and count spaces
                //
                lines[j] = lines[j].replace(/\t/g, "    ");
                tmp = lines[j].match(/^(\s*)/)[0].length;

                // get the minimum
                // 
                if (tmp && tmp < min) {
                    min = tmp;
                }
            }
            
            // loop lines to create 
            // 
            for (j = 0; j < l; j++, i++) {
                // remove the right number of spaces at line begin
                // 
                lines[j] = lines[j].replace(new RegExp("^\\\s{" + min + "}"), '');

                out.push(JMVC.string.replaceAll(outline, {
                    nline : noNumberLines ? '' : i,
                    line : '<span>' + highlight(JMVC.htmlChars(lines[j] || ' ')) + '</span>'
                }));
            }
            return '<ul>' + out.join('') + '</ul>';
        };

    
    JMVC.require(
        'core/sniffer/sniffer',
        'core/fx/fx',
        'core/lib/shl/shl',
        'core/color/color'
    );
    
    return  {
        vars : vars,
        /**
         * [initialize description]
         * @param  {[type]} outcode [description]
         * @return {[type]}         [description]
         */
        initialize : function (outcode) {
            if (outcode !== undefined && outcode) {
                vars.outCode = outcode;
            }
            JMVC.head.addStyle(vars.css_path + JMVC.US + vars.css_default);
            JMVC.head.addStyle(vars.css_path + JMVC.US + vars.css_code);
            vars.banner = JMVC.dom.add(JMVC.dom.body(), 'div', {id : 'results'});
        },

        /**
         * [describe description]
         * @param  {[type]} html [description]
         * @return {[type]}      [description]
         */
        describe : function (html) {
            if (vars.mode == vars.HTML_MODE) {
                JMVC.dom.add(
                    vars.banner,
                    'div',
                    {'class' : 'describe fiveround'},
                    html
                );
            }
        },


        listCode : listCode,

        /**
         * [code description]
         * @param  {[type]} code [description]
         * @return {[type]}      [description]
         */
        code : function (code) {
            JMVC.dom.add(
                vars.banner,
                'code',
                {'class' : 'debug fiveround'},
                listCode(code)
            );
        },



        /**
         * [message description]
         * @param  {[type]} msg [description]
         * @return {[type]}     [description]
         */
        message : function (msg) {
            if (vars.mode == vars.CONSOLE_MODE) {
                JMVC.debug("MSG: " + msg);
            } else {
                JMVC.dom.add(
                    vars.banner,
                    'div',
                    {'class' : 'msg fiveround'},
                    msg
                );
            }
        },

        /**
         * [outDebug description]
         * @param  {[type]} kind [description]
         * @param  {[type]} opts [description]
         * @return {[type]}      [description]
         */
        outDebug : function (kind, opts) {
            vars.debug_id += 1;
            var tpl  = '<span class="more" id="toggle_%id%">more</span><div class="hideSpec" id="spec_%id%"><h4>%tit%</h4><h4>%real%</h4><pre class="fiveround">%code%</pre></div>',
                pars = {
                    id : vars.debug_id,
                    tit : null,
                    code : null,
                    real : null
                };

            switch (kind) {
            case 'ex':
                pars.tit = 'Expecting exception : ' + opts.exception.name;
                pars.real = 'Returned exception : ' + opts.realvalue.toString();
                pars.code = listCode(opts.code, true);
                break;
            case 'val':
                pars.tit = 'Expecting value : ' + (opts.expvalue && (JMVC.util.isObject(opts.expvalue) ? JSON.stringify(opts.expvalue) : opts.expvalue.toString()));
                pars.real = 'Returned value : ' + (opts.realvalue && (JMVC.util.isObject(opts.realvalue) ? JSON.stringify(opts.realvalue) : opts.realvalue.toString()));
                pars.code = listCode(opts.code, true);
                break;
            case 'ass':
                pars.tit = 'Asserting';
                pars.real = 'Returned value : ' + opts.realvalue.toString();
                pars.code = listCode(opts.code, true);
                break;
            default:break;
            }
            return [vars.debug_id, JMVC.string.replaceAll(tpl, pars)];
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
            JMVC.test.startTest(testName);
            var res = true,
                debuginfo = false,
                ne = new expectedError(),
                ex;
            try {
                expectedError == SyntaxError ? eval(code) : code();
                res = false;
            } catch (e) {
                ex = e;
                res = (e instanceof expectedError);
            }

            
            
            if (vars.outCode) {
                debuginfo = JMVC.test.outDebug('ex', {
                    exception : ne || expectedError,
                    realvalue : (ex instanceof expectedError ? expectedError.name : ex.name) || ne.name,
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
            var res = false,
                debuginfo = false;

            JMVC.test.startTest(testName);
            res = !!valueFn();

            if (vars.outCode) {
                debuginfo = JMVC.test.outDebug(
                    'ass',
                    {
                        realvalue: res,
                        code : valueFn.toString()
                    }
                );
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
            var res = true,
                debuginfo = false,
                i = 0,
                real;

            options = options || {};
            JMVC.test.startTest(testName);

            real = fn.apply(options.ctx || null, options.args || []);
            res = (real == expectedValue) || JMVC.object.compare(real,  expectedValue);
            
            if (vars.outCode) {
                debuginfo = JMVC.test.outDebug(
                    'val',
                    {
                        realvalue : real,
                        expvalue : expectedValue, // != undefined ? expectedValue : 'null',
                        code : fn.toString()
                    }
                );
            }
            JMVC.test.finishTest(res, debuginfo);
        },
        
        testimes : [],

        /**
         * [testTime description]
         * in the case the testing function is desctructive, (for example a function that use splice function
         * to shuffle into a new array, JMVC.head.goto('test_arrayShuffle'))
         * non primitive objects are references
         * and that would make the test invalid, so to avoid it we build as many clones as necessary,
         * allowing to not influence test time
         * 
         * @param  {[type]}   testName [description]
         * @param  {Function} fn       [description]
         * @param  {[type]}   times    [description]
         * @param  {[type]}   options  [description]
         * @return {[type]}            [description]
         */
        testTime2 : function (testName, fn, times, options) {
            // clone agruments as many times as needed
            //
            var argClones = [],
                n = times;
            while (n--) argClones.push(JMVC.object.clone(options));

            // now start timing and invocation loop
            //
            JMVC.test.startTest(testName);
            while (times--) {
                fn.apply(null, argClones[times] || []);
            }

            // this is the real time
            // 
            this.testimes.push([testName, JMVC.test.finishTest(true)]);
        },
        testTime : function (testName, fn, times, options) {
            // if options is not an array but a function 
            // then is intended to produce the arguments in lieu of options
            //
            var generateParams = typeof options === 'function',
                argClones = [],
                n = times;

            // clone agruments as many times as needed
            //
            while (n--) argClones.push(
                generateParams ?
                    options()
                    :
                    JMVC.object.clone(options)
            );

            // now start timing and invocation loop
            //
            JMVC.test.startTest(testName);
            while (times--) {
                fn.apply(null, argClones[times] || []);
            }

            // this is the real time
            // 
            this.testimes.push([testName, JMVC.test.finishTest(true)]);
        },

        /**
         * [startTest description]
         * @param  {[type]} testName [description]
         * @return {[type]}          [description]
         */
        startTest : function (testName) {
            if (vars.mode == vars.CONSOLE_MODE) {
                JMVC.debug("testing..." + testName);
            } else {
                vars.currentTestWidget = JMVC.dom.add(
                    vars.banner,
                    'div',
                    {id : 'test_' + vars.cur_timer},
                    testName
                );
            }
            vars.start_time = +new Date;
        },

        /**
         * [finishTest description]
         * @param  {[type]} passed    [description]
         * @param  {[type]} debuginfo [description]
         * @return {[type]}           [description]
         */
        finishTest : function (passed, debuginfo) {
            var time = 0,
                result = false;

            vars.end_time = +new Date;
            time = vars.end_time - vars.start_time;
            
            vars.totalTests += 1;
            passed && vars.testsPassed++;
            result = passed ? "passed" : "failed";

            if (vars.mode == vars.CONSOLE_MODE) {

                vars.all_times[vars.cur_timer] = time;
                JMVC.debug(result + ' in ' + vars.all_times[vars.cur_timer] + ' ms');

            } else {
                
                JMVC.dom.attr(
                    vars.currentTestWidget,
                    'class',
                    result + ' fiveround'
                );
                JMVC.dom.add(
                    vars.currentTestWidget,
                    'strong',
                    {'class' : 'time'}, 
                    time + ' ms'
                );

                if (debuginfo) {
                    
                    JMVC.dom.add(
                        vars.currentTestWidget,
                        'div',
                        {},
                        debuginfo[1] || ''
                    );
                    JMVC.events.on(
                        JMVC.dom.find('#toggle_' + debuginfo[0]),
                        'click',
                        function () {JMVC.fx.toggle(JMVC.dom.find('#spec_' + debuginfo[0])); }
                    );
                }
            }
            vars.cur_timer += 1;

            return time;
        },

        /**
         * [startAll description]
         * @return {[type]} [description]
         */
        startAll : function () {
            var togglespec_visibility = false,
                panel,
                togglebutton;
            if (vars.mode == vars.HTML_MODE) {
                JMVC.dom.add(
                    vars.banner,
                    'div',
                    {'id' : 'bro'},
                    (JMVC.sniffer && JMVC.sniffer.os.name !== 'undefined') ? 
                        JMVC.sniffer.os.name + ' : ' + JMVC.sniffer.browser.name + ' v.' + JMVC.sniffer.browser.version
                        :
                        window.navigator.userAgent
                );
                if (vars.outCode) {
                    panel = JMVC.dom.add(
                        vars.banner,
                        'div',
                        {id : 'panel', 'class' : 'fiveround'}
                    );
                    togglebutton = JMVC.dom.add(
                        panel,
                        'input',
                        {'id' : 'togglespec', 'type' : 'button', 'class' : 'panelbutton fiveround', 'value' : 'Toggle `more`'}
                    );
                    JMVC.events.on(togglebutton, 'click', function () {
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
            var result = ["","(", vars.testsPassed, "out of", vars.totalTests, "tests passed", ")"].join(' '),
                res = vars.testsPassed === vars.totalTests,
                wholeResClass = res ? 'passed' : 'failed' ,
                wholeResString = 'Test ' + wholeResClass;

            if (vars.mode == vars.HTML_MODE) {
                JMVC.dom.add(
                    vars.banner,
                    'div',
                    {id : 'summary'},
                    result
                );
                JMVC.dom.add(
                    vars.banner,
                    'div',
                    {id : 'globalResult','class' : wholeResClass + ' fiveround'},
                    wholeResString
                );
                JMVC.dom.attr(
                    JMVC.dom.find('#bro'),
                    'class',
                    res ? 'ok' : 'ko'
                );
                
                if (code != undefined) {
                    //JMVC.dom.append(JMVC.dom.find('#globalResult'), JMVC.dom.create('pre', {'style' : 'font-size:12px; color:#afa'}, JMVC.shl.parse(code.toString())));
                    JMVC.dom.append(
                        JMVC.dom.find('#globalResult'),
                        JMVC.dom.create(
                            'pre',
                            {'style' : 'font-size:12px; color:#afa'},
                            code.toString()
                        )
                    );
                }
                JMVC.head.title('Test '+  wholeResClass.toUpperCase());
                
            } else if (vars.mode == vars.CONSOLE_MODE) {
                JMVC.debug(result);
                JMVC.debug(wholeResString);
            }
/*
            JMVC.head.link(
                'icon',
                {
                    type : "image/vnd.microsoft.icon",
                    href : JMVC.vars.baseurl + "/media/favicon.ico"
                }
            );
*/
        },

        /**
         * [pause description]
         * @return {[type]} [description]
         */
        pause : function () {
            JMVC.dom.add(
                vars.banner,
                'hr',
                {'class' : 'pause fiveround'}
            );
        },

        hr : function () {
            JMVC.dom.add(
                vars.banner,
                'hr'
            );
        },

        timeSummary : function (title) {
            var l = this.testimes.length,
                colors = JMVC.core.color.getGradientArray('#00ff00', '#ff0000', l - 2),
                list = JMVC.dom.create('ul'),
                anchor = JMVC.dom.create('a', {name: 'ts'}),
                cnt = JMVC.dom.create(
                    'div',
                    {'class':'timesummary fiveround'},
                    list
                );
            JMVC.dom.append(cnt, anchor);
                
            title = title || 'Times summary';

            //order
            this.testimes = this.testimes.sort(function (a, b) {
                return a[1] > b[1] ? 1 : a[1] < b[1] ? -1 : 0;
            });
            
            JMVC.dom.add(
                list,
                'li',
                {'class':'head'},
                title
            );
            
            for (var k = 0; k < l; k++) {
                var o = {style : 'color:' + colors[k]};
                if (k == 0) {
                    o['class'] = 'best';
                }
                if (k == l - 1) {
                    o['class'] = 'worst';
                }
                JMVC.dom.add(
                    list,
                    'li',
                    o,
                    '<strong>' + this.testimes[k][1] + '</strong>:' + this.testimes[k][0]
                );
            }
            JMVC.dom.append(vars.banner, cnt);
            this.testimes.length = 0;
        }
    };
});