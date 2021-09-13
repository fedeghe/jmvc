JMVC.extend('mac', {
    titlesay: function () {
        var date = new Date(),
            phrases = [
                'Hello',
                'WOW',
                'Have a nice day',
                date.getHours() + ':' + date.getMinutes(),
                'Enjoy JMVC'
            ];
        JMVC.head.title('INFO :: ' + phrases[JMVC.util.rand(0, phrases.length - 1)]);
    }
});
