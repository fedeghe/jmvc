JMVC.controllers.api = function () {
    'use strict';
    this.action_index = function () {
        JMVC.require(
            'widget/tabs/tabs',
            'core/codeview/script/script',
            'core/xmlparser/xmlparser',
            'core/mobile/mobile',
            'core/responsive/basic/basic',
            // 'widget/countdown/countdown',
            'vendors/github/forkme/forkme',
            'core/lib/cookieMonster/cookieMonster'
        );
        JMVC.events.loadify(500);

        JMVC.head.addStyle(JMVC.vars.baseurl + '/media/css/core/api.css', true, false);

        var controller = this,
            main = JMVC.getView('vacuum'),
            docTpl = JMVC.getView('api/doctpl'),
            apintro = JMVC.getView('api/apintro'),
            funcModel = JMVC.getModel('api/function'),
            // field_model = JMVC.getModel('api/field'),
            // eslint-disable-next-line new-cap
            tabExt = new JMVC.tabs.tab({ tbId: 'tbMain' }),
            tabsInner = {},
            sections = [
                'jmvc', 'constructors', 'model', 'view',
                'controller', 'array', 'css', 'dom',
                'events', 'head', 'io', 'match',
                'object', 'string', 'util'
            ];

        main.set('id', 'desc');

        JMVC.io.get(JMVC.vars.baseurl + '/media/documentation.xml', gotDoc, false);

        function gotDoc (doc) {
            /* get a parser */
            // eslint-disable-next-line new-cap
            var parser = new JMVC.xmlparser.load(doc),
                addAll = function (section, strsection) {
                    var params = '',
                        sample = false,
                        testlink = false,
                        defaultParamVal = false,
                        runLabel = '&#8227;',
                        consoleLabel = 'edit',
                        len0 = 0,
                        i = 0, t = 0, len = 0,
                        trialButt,
                        // eslint-disable-next-line no-unused-vars
                        consoleButt;

                    for (i = 0, len0 = section['function'].length; i < len0; i++) {
                        // prepare content
                        funcModel.reset();
                        funcModel.set({
                            func: section['function'][i].signature['#text'],
                            description: section['function'][i].description['#text'],
                            status: section['function'][i].status
                                ? section['function'][i].status['#text']
                                : 'undefined'
                        });

                        // reset params
                        params = '';
                        defaultParamVal = false;
                        testlink = section['function'][i].testlink ? section['function'][i].testlink['#text'] : false;
                        sample = 'no sample code given yet';
                        trialButt = '<button class="trynow round8 roundbottom" onclick="%doCode%">' + runLabel + '</button>';
                        consoleButt = '<button class="consolenow round8 roundbottom" onclick="%doConsole%">' + consoleLabel + '</button>';

                        if (section['function'][i].params.param instanceof Array) {
                            for (t = 0, len = section['function'][i].params.param.length; t < len; t += 1) {
                                if (section['function'][i].params.param[t]['@attributes'].default) {
                                    defaultParamVal = section['function'][i].params.param[t]['@attributes'].default;
                                }

                                params += '<label>' +
                                        section['function'][i].params.param[t]['@attributes'].name +
                                    '</label> : ' +
                                    section['function'][i].params.param[t]['#text'] +
                                    (defaultParamVal ? '&nbsp;(default: ' + defaultParamVal + ')' : '') +
                                    '<br />';

                                defaultParamVal = false;
                            }
                        } else {
                            params += '<label>' +
                                    section['function'][i].params.param['@attributes'].name +
                                '</label> : ' +
                                section['function'][i].params.param['#text'] +
                                '<br />';
                        }

                        if (section['function'][i].sample) {
                            sample = '<pre class="code round6 roundright">' + section['function'][i].sample['#text'] + '</pre>';
                            if (section['function'][i].code) {
                                sample += JMVC.string.replaceAll(trialButt, {
                                    doCode: section['function'][i].code['#text']
                                });
                            }
                        }

                        funcModel.set({
                            testlink: testlink
                                ? '<a target="_blank" class="testLink" href="' + JMVC.vars.baseurl + JMVC.US + testlink + '">RUN TEST</a>'
                                : false,
                            parameters: params,
                            returns: section['function'][i].returns['#text']
                        });

                        sample && funcModel.set('sample', sample);

                        tabsInner[strsection].add(
                            section['function'][i].signature['@attributes'].name,
                            docTpl.reset().parse(funcModel).content
                        );
                    }
                };

            JMVC.each(sections, function (t) {
                var y;
                parser.pointer(parser.xmlDoc.getElementsByTagName(t)[0]);
                y = parser.toJson(parser.pointer());
                // eslint-disable-next-line new-cap
                tabsInner[t] = new JMVC.tabs.tab({ mode: 'v' });
                tabExt.add(t, '');
                addAll(y, t);
            });
            main.setFromUrl('nome', 'Guest');
        }

        apintro.set('postmessage', 'Thank You');
        main.set('content', '{{apintro}}<p class="rendertime">Rendering time: <strong>[[JMVC.vars.rendertime]]</strong> ms</p>');

        main.parse().render(function () {
            var j = 0,
                l = sections.length,
                i = tabExt.render('desc', JMVC.util.uniqueid),
                tO, tV, elO, elV;
            JMVC.head.title('JMVC API');
            JMVC.mobile.topHide();
            JMVC.github.forkme('fedeghe');

            JMVC.events.delay(function () {
                for (null; j < l; j++) {
                    tabsInner[sections[j]].render(i[j], JMVC.util.uniqueid);
                }
            }, 0);

            // http://www.jmvc.dev/api/index/o/1_1/v/3_3 -> promise
            // http://www.jmvc.dev/api/index/o/4_1/v/3_6 -> promise
            tO = controller.get('o');
            tV = controller.get('v');
            elO = JMVC.dom.find('#jvmc_tb' + tO);
            if (tO) {
                elO && JMVC.events.click(elO);
                if (elO && tV) {
                    JMVC.events.delay(function () {
                        elV = JMVC.dom.find('#jvmc_tb' + tV);
                        elV && JMVC.events.click(elV);
                    }, 200);
                }
            }
        });
    };
};
