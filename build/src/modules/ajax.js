/*-------------
AJAX sub-module
-------------*/

/*
This is the experimental versionof ajax utilities
*/

//PRIVATE
_.ajax = {
    types : {
        'xml' : 'text/xml',
        'html' : 'text/html',
        'json' : 'application/json'
    },
    IEfuckIds = ['Msxml2.XMLHTTP', 'Msxml3.XMLHTTP', 'Microsoft.XMLHTTP'],

    /**
     * [modes description]
     * @type {Object}
     */
    methods : {
        'POST' : 'POST',
        'GET' : 'GET'
    },
    /**
     * façade for fetting an xhr object
     * 
     * @return {Object} the xhr object
     */
    getxhr : function () {
        var xhr,
            
            i = 0,
            len = this.IEfuckIds.length;
        try {
            xhr = new W.XMLHttpRequest();
        } catch (e1) {
            for (null; i < len; i += 1) {
                try {
                    xhr = new ActiveXObject(this.IEfuckIds[i]);
                } catch (e2) {continue; }
            }
            !xhr && JMVC.debug('No way to initialize hxr');
        }
        JMVC.gc(IEfuckIds, i, len);
        JMVC.ajax.count += 1;
        return xhr;
    },

    /**
     * [call description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    call : function (options) {
        var xhr = {
                req : this.getxhr(),
                uri : options && options.uri,
                method : options && 'method' in options && this.methods[options.method] || 'POST',
                cback : options && 'cback' in options ? options.cback : function () {} ,
                cb_opened : options && 'opened' in options ? options.opened : function () {},
                cb_loading : options && 'loading' in options ? options.loading : function () {},
                cb_error : options && 'error' in options ? options.error : function () {},
                cb_abort : options && 'abort' in options ? options.abort : function () {},
                sync : options && options.sync,
                data : options && options.data || false,
                type : (options && options.type) || this.types.html,
                cache : (options && options.cache !== undefined) ? options.cache : true,
                targetType : options.type === 'xml' ?  'responseXML' : 'responseText',
                timeout : options && options.timeout || 3000,
                complete : false,
                res : false,
                ret : false,
                state : false
            },
            self = this;
        xhr.req.onerror = function () {xhr.cb_error && xhr.cb_error.apply(null, arguments); };
        xhr.req.onabort = function () {xhr.cb_abort && xhr.cb_abort.apply(null, arguments); };
        xhr.req.onreadystatechange = function () {
            if (xhr.req.readyState == 1) {
                switch (xhr.method) {
                    case 'POST':
                        try {
                            xhr.req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                            xhr.req.send(xhr.data || true);
                        } catch (e1) {}
                    break;
                    case 'GET':
                        try {
                            xhr.req.setRequestHeader("Accept", self.types[xhr.type] + "; charset=utf-8");
                            xhr.req.send(null);
                        } catch (e2) {}
                    break;
                }
            } else if (xhr.req.readyState == 2) {
                console.debug('2');
            } else if (xhr.req.readyState == 3) {
                console.debug('3');
            } else if (xhr.req.readyState == 4) {

                if(xhr.req.status !== 200){
                    xhr.req.onerror();
                    xhr.complete = true;
                    return;
                }

                xhr.complete = true;
                
                xhr.ret = xhr.type == 'json' ? new Function("return " + xhr.req[xhr.targetType])() : xhr.req[xhr.targetType];

                //cback
                xhr.cback && (function (r) {xhr.cback(r); })(xhr.ret);
                
                //IE leak ?????
                W.setTimeout(function () {
                    JMVC.ajax.count -= 1;
                    JMVC.purge(xhr.req);
                }, 50);

                return xhr.ret;
            }
        };
        xhr.req.open(xhr.method, (xhr.method === 'GET') ? (xhr.uri + ((xhr.data) ? '?' + xhr.data : "")) : xhr.uri, xhr.sync);
    }
};

// PUBLIC
JMVC.ajax = {
    count : 0,
    post : function () {},
    get : function () {},
    getJson : function () {},
    getXML : function () {}
};
