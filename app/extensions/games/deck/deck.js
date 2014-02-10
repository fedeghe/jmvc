JMVC.extend('deck', function () {
    JMVC.require('core/obj/bucket/bucket');
    
    JMVC.head.addstyle([JMVC.vars.baseurl, 'app', 'extensions', 'games', 'deck', 'deck.css'].join(JMVC.US), false, false);
    // 
    var seeds = {
            c : '&#9829;',
            q : '&#9830;',
            f : '&#9827;',
            p : '&#9824;'
        },
        els = [null, 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
        bucket = JMVC.bucket.create();

    function getCard(s, n) {
        var crd = JMVC.dom.create('span', {'class': 'card sm_' + s});
        JMVC.dom.add(crd, 'span', {'class': 'sm'}, seeds[s]);
        JMVC.dom.add(crd, 'span', {'class': 'num'}, els[n]);
        return crd;
    }

    function initDecks(n) {
        var deck = [],
            i,
            j, jl;
        n = ~~n || 1;
        while (n--) {
            for (i in seeds) {
                for (j = 0, jl = els.length - 1; j < jl; j++) {
                    deck.push(getCard(i, j + 1));
                }
            }
        }
        bucket.fill(deck);
    }

    function shuffle(n) {
        while (n--) {
            bucket.shuffle();
        }
    }
    // 
    return {
        getCard : getCard,
        initDecks : initDecks,
        getDecks : function () {return bucket.arr; },
        shuffle : shuffle,
        next : function () {return bucket.next(); }
    };
});