JMVC.controllers.engy = function () {
    'use strict';
    JMVC.css.autoHeadings();
    function Person (n, s) {
        this.name = n;
        this.surname = s;
    }
    Person.prototype.sayHello = function () {
        return ['Hello from', this.name, this.surname].join(' ');
    };

    /**
     * [action_index description]
     * @return {[type]} [description]
     */
    this.action_index = function () {
        document.body.style.fontFamily = 'Verdana, sans';
        JMVC.require('core/lib/widgzard/engy3', function () {
            JMVC.core.engy.render({
                content: [{
                    component: 'paragraph',
                    params: {
                        obj: new Person('Federico', 'Ghedina'),
                        content: 'hello world',
                        inner: [{
                            component: 'span',
                            params: {
                                text: 'text'
                            }
                        }, {
                            tag: 'hr'
                        }, {
                            tag: 'a',
                            attrs: {
                                href: 'https://www.google.com',
                                target: '_blank'
                            },
                            text: 'searching for something?'
                        }]
                    }
                }, {
                    tag: 'h2',
                    text: 'hello there'
                }]
            });
        });
    };
};
