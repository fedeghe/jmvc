JMVC.W.onerror = function(errorMsg, url, lineNumber) {
    JMVC.debug("Uncaught error " + errorMsg + " in " + url + ", lines " + lineNumber);
};