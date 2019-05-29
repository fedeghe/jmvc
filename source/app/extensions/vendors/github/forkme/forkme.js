JMVC.extend('github', function () {
    var forkMeImageURL = JMVC.vars.baseurl + '/media/img/forkme_right_gray_6d6d6d.png';
    JMVC.dom.preloadImage(forkMeImageURL);
    return {
        forkme: function (ghname) {
            var img = JMVC.dom.create('img', {
                    style: 'position: absolute; z-index:200; top: 0; right: 0; border: 0;',
                    src: forkMeImageURL,
                    alt: 'Fork me on GitHub'
                }),
                a = JMVC.dom.create('a', {
                    href: 'https://github.com/' + ghname,
                    target: '_blank'
                });
            JMVC.dom.append(a, img);
            JMVC.dom.append(JMVC.dom.body(), a);
        }
    };
});
