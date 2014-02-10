JMVC.controllers.cards = function () {
    this.action_index = function () {

        JMVC.require('games/deck/deck');

        JMVC.getView('vacuum')
            .set({
                'style' : 'margin:20px;width:370px;',
                'id': 'container'
            })
            .render(function () {
                JMVC.deck.initDecks(2);
                JMVC.deck.shuffle(10);

                JMVC.dom.append(JMVC.dom.find('#container'), JMVC.deck.getDecks());
            });
    };
};