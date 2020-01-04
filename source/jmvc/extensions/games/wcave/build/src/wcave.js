
$$src/init/init.js$$

// generic onerror
W.onerror = function (msg, url, ln) {
    W.console.error("JavaScript error: '" + msg + "' on " + url + "@" + ln);
};

$$src/proto/proto.js$$

//publish
W.Wcave = wcave;