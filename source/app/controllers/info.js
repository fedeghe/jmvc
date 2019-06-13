JMVC.controllers.info = function () {
    'use strict';
    this.action_index = function () {
        JMVC.css.autoHeadings();
        JMVC.events.loadify(500);
        JMVC.require(
            'core/codeview/script/script',
            // ,'core/responsive/basic/basic',
            'vendors/google/analytics/analytics',
            'core/sniffer/sniffer',
            'core/mobile/mobile',
            'core/screen/screen',
            'vendors/github/forkme/forkme',
            'core/lib/cookieMonster/cookieMonster'
        );

        var main = JMVC.getView('info/info'),
            readme = JMVC.getView('info/readme'),
            // extend = JMVC.getView('info/extend'),
            features = JMVC.getView('info/features'),
            infoIntro = JMVC.getView('info/info_intro'),
            infOutro = JMVC.getView('info/info_outro'),
            backtotop = '<a href="#top" class="goToTop">go to top</a>',
            toplinks = [],
            toplinksdata = {
                intro: 'Introduction',
                req: 'Requirements',
                started: 'Get started',
                howiw: 'How it works',
                features: 'Features',
                urlstruc: 'Url structure',
                samples: 'Samples',
                extend: 'Extend jmvc',
                api: 'Api',
                coredoc: 'Core doc',
                extdoc: 'Extension doc',
                testsuite: 'Test suite',
                why: 'Why'
            },
            i,
            logoimg = 'jmvc_n2.png';

        JMVC.dom.preloadImage(
            JMVC.vars.baseurl + '/media/img/' + logoimg
        );

        for (i in toplinksdata) {
            toplinks.push('<a href="#' + i + '" class="round4">' + toplinksdata[i] + '</a>');
        }

        JMVC.head.addStyle(JMVC.vars.baseurl + '/media/css/info.css', true);// parsed

        features.set({
            fr: '<b class="index">&#9758;</b>',
            clearer: '<br class="clearer" />',
            backtotop: backtotop
        });

        readme.set({
            // 'extend' : '{{extend}}',
            // 'api': '{{info_outro}}',
            'githublink': 'https://github.com/fedeghe/jmvc',
            'legend': '<b>*</b> : mandatory parameter',
            'backtotop': backtotop,
            'toplinks': toplinks.join(' ~ '),
            'logo': 'jmvc_n2.png'
        });

        infoIntro.set({
            'review': JMVC.vars.review,
            'version': JMVC.vars.version,
            'last_modified': JMVC.vars.date + ' @ ' + JMVC.vars.time, // JMVC.vars.last_modified,
            'gmt': 'GMT+' + -(new Date().getTimezoneOffset() / 60),
            'backtotop': backtotop
        });

        infOutro.set({
            'backtotop': backtotop
        });

        main.parse().render(function () {
            JMVC.head.lastModified();
            JMVC.github.forkme('fedeghe');
            JMVC.mobile.topHide();
            JMVC.head.title('JMVC :: info');
        });
    };
};
