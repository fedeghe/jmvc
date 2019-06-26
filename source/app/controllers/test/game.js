JMVC.require('core/lib/game/game');

JMVC.controllers.game = function () {
    this.action_index = function () {
        JMVC.getModel('game/Rect');
        JMVC.getModel('game/Circle');

        var density = 1E3,
            Game = JMVC.game.create(
                function () {
                    var t = null;
                    this.size = {
                        width: 640,
                        height: 480
                    };
                    this.entities = [];
                    this.context = document.getElementById('viewport').getContext('2d');
                    this.context.imageSmoothingEnabled = true;
                    this.context.clearRect(0, 0, this.size.width, this.size.height);
                    while (density--) {
                        // t = Math.random() > 0.5;
                        // this.entities.push(new JMVC.models[t ? 'Rect' : 'Circle'](this.size));
                        t = new JMVC.models.Rect(this.size);
                        // t = new JMVC.models.Circle(this.size);
                        this.entities.push(t);
                    }
                },
                function () {
                    this.context.clearRect(0, 0, this.size.width, this.size.height);
                    var i = 0,
                        l = this.entities.length;
                    for (null; i < l; i++) {
                        this.entities[i].draw(this.context);
                    }
                },
                function () {
                    for (var i = 0; i < this.entities.length; i++) {
                        this.entities[i].update(this.context);
                    }
                }
            );
        this.render(function test () {
            'use strict';
            JMVC.test.initialize(true);
            JMVC.test.startAll();
            JMVC.test.describe('<canvas style="border:1px solid black" id="viewport" height="480" width="640"></canvas>');
            JMVC.test.finishAll();
            Game.start();
        });
    };
};
