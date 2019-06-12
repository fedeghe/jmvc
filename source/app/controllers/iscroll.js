JMVC.controllers.iscroll = function () {
    'use strict';
    this.action_index = function () {
        JMVC.require('iscroll/iscroll');
        JMVC.getView('scroll').render(function () {
            JMVC.iscroll.create(JMVC.dom.find('#divnode'));
        });
    };
};
