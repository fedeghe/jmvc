/*-------------
AJAX sub-module
-------------*/
// private section
_.io = {
    /**
     * Façade for getting the xhr object
     * @return {object} the xhr
     */
    getxhr : function () {
        JMVC.io.xhrcount += 1;
        var xhr,
            IEfuckIds = ['Msxml2.XMLHTTP', 'Msxml3.XMLHTTP', 'Microsoft.XMLHTTP'],
            len = IEfuckIds.length,
            i = 0;
        try {
            xhr = new W.XMLHttpRequest();
        } catch (e1) {
            for (null; i < len; i += 1) {
                try {
                    xhr = new W.ActiveXObject(IEfuckIds[i]);
                } catch (e2) {continue; }
            }
            !xhr && JMVC.debug('No way to initialize XHR');
        }
        JMVC.gc(IEfuckIds, i, len);
        return xhr;
    },
    /**
     * [ description]
     * @param  {[type]} uri     [description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    ajcall : function (uri, options) {
        var xhr = _.io.getxhr(),
            method = (options && options.method) || 'POST',
            cback = options && options.cback,
            cb_opened = (options && options.opened) || function () {},
            cb_loading = (options && options.loading) || function () {},
            cb_error = (options && options.error) || function () {},
            cb_abort = (options && options.abort) || function () {},
            sync = options && options.sync,
            data = (options && options.data) || false,
            type = (options && options.type) || 'text/html',
            cache = (options && options.cache !== undefined) ? options.cache : true,
            targetType = type === 'xml' ?  'responseXML' : 'responseText',
            timeout = options && options.timeout || 3000,
            complete = false,
            res = false,
            ret = false,
            state = false;
        //prepare data, caring of cache
        if (!cache) {data.C = JMVC.util.now(); }
        data = JMVC.object.toQs(data).substr(1);
        xhr.onreadystatechange = function () {
            var tmp;
            if (state === xhr.readyState) {
                return false;
            }
            state = xhr.readyState;
            if (xhr.readyState === 'complete' || (xhr.readyState === 4 && xhr.status === 200)) {
                complete = true;
                if (cback) {
                    res = xhr[targetType];
                    (function () {cback(res); })(res);
                }
                ret = xhr[targetType];
                //IE leak ?????
                W.setTimeout(function () {
                    JMVC.io.xhrcount -= 1;
                    //JMVC.purge(xhr);
                }, 50);
                return ret;
            } else if (xhr.readyState === 3) {
                //loading data
                cb_loading(xhr);
            } else if (xhr.readyState === 2) {
                //headers received
                cb_opened(xhr);
            } else if (xhr.readyState === 1) {
                switch (method) {
                case 'POST':
                    try {
                        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                        xhr.send(data || true);
                    } catch (e1) {}
                    break;
                case 'GET':
                    try {
                        tmp = {
                            xml : 'text/xml',
                            html : 'text/html',
                            json : 'application/json'
                        }[type] || 'text/html';

                        xhr.setRequestHeader('Accept', tmp + '; charset=utf-8');
                        xhr.send(null);
                    } catch (e2) {}
                    break;
                default :
                    alert(method);
                    xhr.send(null);
                    break;
                }
            }
            return true;
        };
        xhr.onerror = function () {
            cb_error && cb_error.apply(null, arguments);
        };
        xhr.onabort = function () {
            cb_abort && cb_abort.apply(null, arguments);
        };
        //open request
        xhr.open(method, (method === 'GET') ? (uri + ((data) ? '?' + data: '')) : uri, sync);
        //thread abortion
        W.setTimeout(function () {
            if (!complete) {
                complete = true;
                xhr.abort();
            }
        }, timeout);
        try {
            return (targetType === 'responseXML') ? xhr[targetType].childNodes[0] : xhr[targetType];
        } catch (e3) {}
        return true;
    }
};
//
// public section
JMVC.io = {
    xhrcount : 0,
    getxhr : _.io.getxhr,
    /**
     * [ description]
     * @param  {[type]} uri   [description]
     * @param  {[type]} cback [description]
     * @param  {[type]} sync  [description]
     * @param  {[type]} data  [description]
     * @param  {[type]} cache [description]
     * @return {[type]}       [description]
     */
    post : function (uri, cback, sync, data, cache, err) {
        return _.io.ajcall(uri, {
            cback : cback,
            method : 'POST',
            sync : sync,
            data : data,
            cache : cache,
            error: err
        });
    },
    /**
     * [ description]
     * @param  {[type]} uri   [description]
     * @param  {[type]} cback [description]
     * @param  {[type]} sync  [description]
     * @param  {[type]} data  [description]
     * @param  {[type]} cache [description]
     * @return {[type]}       [description]
     */
    get : function (uri, cback, sync, data, cache, err) {
        return _.io.ajcall(uri, {
            cback : cback || function () {},
            method : 'GET',
            sync : sync,
            data : data,
            cache : cache,
            error : err
        });
    },
    /**
     * [delete description]
     * @param  {[type]} uri   [description]
     * @param  {[type]} cback [description]
     * @param  {[type]} sync  [description]
     * @param  {[type]} data  [description]
     * @param  {[type]} cache [description]
     * @param  {[type]} err   [description]
     * @return {[type]}       [description]
     */
    'delete' : function (uri, cback, sync, data, cache, err) {
        return _.io.ajcall(uri, {
            cback : cback || function () {},
            method : 'DELETE',
            sync : sync,
            data : data,
            cache : cache,
            error : err
        });
    },
    /**
     * [ description]
     * @param  {[type]} uri   [description]
     * @param  {[type]} cback [description]
     * @param  {[type]} data  [description]
     * @return {[type]}       [description]
     */
    getJson : function (uri, cback, data) {
        return _.io.ajcall(uri, {
            type : 'json',
            method: 'GET',
            sync : false,
            cback : function (r) {
                var j = (W.JSON && W.JSON.parse) ? JSON.parse(r) : JMVC.jeval('(' + r + ')');
                cback(j);
            },
            data : data
        });
    },
    /**
     * [ description]
     * @param  {[type]} uri   [description]
     * @param  {[type]} cback [description]
     * @return {[type]}       [description]
     */
    getXML : function (uri, cback) {
        return _.io.ajcall(uri, {
            method : 'GET',
            sync : false,
            type : 'xml',
            cback : cback || function () {}
        });
    }
};
//-----------------------------------------------------------------------------