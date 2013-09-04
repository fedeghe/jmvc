/**


------------------

        _/           
             _/_/    
      _/  _/    _/   
     _/  _/    _/    
    _/    _/_/ 

------------------

**/
JMVC.io = {

    'xhrcount' : 0,

    /**
     * [ description]
     * @return {[type]} [description]
     */
    'getxhr' : function () {
        JMVC.io.xhrcount += 1;
        var xhr,
            // IEfuckIds = ['MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'],
            // 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'
            IEfuckIds = ['Msxml2.XMLHTTP', 'Msxml3.XMLHTTP', 'Microsoft.XMLHTTP'],
            i = 0,
            len = IEfuckIds.length;

        try {
            xhr = new W.XMLHttpRequest();
        } catch (e1) {
            for (null; i < len; i += 1) {
                try {
                    xhr = new ActiveXObject(IEfuckIds[i]);
                } catch (e2) {continue; }
            }
            if (!xhr) {
                JMVC.debug('No way to initialize hxr');
            }
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
    'ajcall' : function (uri, options) {
        var xhr = JMVC.io.getxhr(),
            method = (options && options.method) || 'POST',
            cback = options && options.cback,
            cb_opened = (options && options.opened) || function () {},
            cb_loading = (options && options.loading) || function () {},
            cb_error = (options && options.error) || function () {},
            cb_abort = (options && options.abort) || function () {},
            sync = options && options.sync,
            data = (options && options.data) || {},
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
        data = JMVC.object.obj2qs(data).substr(1);

        xhr.onreadystatechange = function () {
            //console.dir(xhr)
            var tmp;

            if (state === xhr.readyState) {return false; }
            state = xhr.readyState;


            //JMVC.debug('called '+uri + ' ('+xhr.readyState+')');
            if (xhr.readyState === "complete" || (xhr.readyState === 4 && xhr.status === 200)) {
                complete = true;
                if (cback) {
                    //res = (targetType === 'responseXML') ?  xhr[targetType].childNodes[0] : xhr[targetType];
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
                            'xml' : 'text/xml',
                            'html' : 'text/html',
                            'json' : 'application/json'
                        }[type];
                        xhr.setRequestHeader("Accept", tmp + "; charset=utf-8");
                        xhr.send(null);
                    } catch (e2) {}
                    break;
                }
            }
        };

        xhr.onerror = function () {if (cb_error) {cb_error.apply(null, arguments); } };
        xhr.onabort = function () {if (cb_abort) {cb_abort.apply(null, arguments); } };

        //open request
        xhr.open(method, (method === 'GET') ? (uri + ((data) ? '?' + data : "")) : uri, sync);

        //thread abortion
        W.setTimeout(function () {if (!complete) {complete = true; xhr.abort(); } }, timeout);
        
        try {
            return (targetType === 'responseXML') ? xhr[targetType].childNodes[0] : xhr[targetType];
        } catch (e3) {}
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
    'post' : function (uri, cback, sync, data, cache) {
        return JMVC.io.ajcall(uri, {cback : cback, method : 'POST', sync : sync, data : data, cache : cache});
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
    'get' : function (uri, cback, sync, data, cache, err) {
        return JMVC.io.ajcall(uri, {cback : cback, method : 'GET', sync : sync, data : data, cache : cache, error : err});
    },

    /**
     * [ description]
     * @param  {[type]} uri   [description]
     * @param  {[type]} cback [description]
     * @param  {[type]} data  [description]
     * @return {[type]}       [description]
     */
    'getJson' : function (uri, cback, data) {
        var r = JMVC.io.ajcall(uri, {
            type : 'json',
            method: 'GET',
            sync : false,
            cback :cback,
            data : data
        });
        return (W.JSON && W.JSON.parse) ? JSON.parse(r) : JMVC.jeval('(' + r + ')');
    },

    /**
     * [ description]
     * @param  {[type]} uri   [description]
     * @param  {[type]} cback [description]
     * @return {[type]}       [description]
     */
    'getXML' : function (uri, cback) {
        return JMVC.io.ajcall(uri, {method : 'GET', sync : false, type : 'xml', cback : cback || function () {} });
    }
};
