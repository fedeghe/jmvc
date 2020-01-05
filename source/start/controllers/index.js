JMVC.controllers.index = function () {
    'use strict';

    this.action_index = function () {
        JMVC.head.addStyle(JMVC.vars.baseurl + '/media/css/core/start.css', true);
        JMVC.getView('body')
            .set('styles', '')
            .set('id', 'container')
            .set('message', 'sample minimal controller')
            .set('content', 'JMVC')
            .render();
    };
};
