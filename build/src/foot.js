/**
 * [onerror description]
 * @param  {[type]} errorMsg   [description]
 * @param  {[type]} url        [description]
 * @param  {[type]} lineNumber [description]
 * @return {[type]}            [description]
 */
JMVC.W.onerror = function(errorMsg, url, lineNumber) {
    JMVC.debug("Uncaught error " + errorMsg + " in " + url + ", lines " + lineNumber);
};
