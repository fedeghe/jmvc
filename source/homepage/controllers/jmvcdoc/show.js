JMVC.controllers.show = function () {
    this.action_index = function () {
        JMVC.debug('yeah');
        console.debug(arguments);
    };
    // check http://www.jmvc.org/jmvcdoc_show/what/name/Federico/surname/Ghedina?age=36
    this.action = function () {
        JMVC.debug('Checking magic action');
        console.debug(arguments);
    };
};
