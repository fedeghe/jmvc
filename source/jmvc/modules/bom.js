JMVC.bom = {
    document: JMVC.WD,
    frames: JMVC.W.frames,
    history: JMVC.W.history,
    location: JMVC.W.location,
    navigator: JMVC.W.navigator,
    // here or in JMVC.head? bah
    qs: function (qs) {
        JMVC.bom.location.search = JMVC.object.toQs(qs);
    }
};
