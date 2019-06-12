JMVC.controllers.modal = function () {
    this.action_index = function () {
        JMVC.require('widget/modal/modal', 'event_scroll/event_scroll');
        JMVC.events.loadify(1000);

        this.render(false, function test () {
            'use strict';
            JMVC.test.initialize(true);
            JMVC.test.startAll();

            JMVC.test.describe(JMVC.string.repeat('<br />', 20) + '<input type="button" id="openmodal" value="Open modal" style="cursor:pointer" />' + JMVC.string.repeat('<br />', 40));

            JMVC.events.on(JMVC.dom.find('#openmodal'), 'click', function () {
                var t = JMVC.dom.create('span', {}, 'Here is some content');
                JMVC.modal.open(t, { title: 'Titolo del modal', bgcolor: '#777', shadow: true });
            });
            JMVC.test.finishAll();
        });
    };
};
