JMVC.require('core/lib/widgzard/widgzard');

JMVC.extend('core/engy', function () {
    JMVC.head.addStyle(JMVC.vars.extensions + 'core/lib/widgzard/engy.min.css');

    var components = {},
        config = {
            fileNameSeparator: '/',
            fileNamePrepend: '',
            ext: '.js',
            componentsUrl: JMVC.vars.engyComponents
        };

    /**
     * [_overwrite description]
     * @param  {object} ns   the namespace of destination
     * @param  {string} path the target path into the namespace
     * @param  {object} o    the object to be inserted
     * @return {void}        [description]
     */
    function _overwrite (destObj, path, obj) {
        // path can be
        // str1
        // str1/str2[/str3[...]] (or str1.str2[.str3])
        //
        // in any case we need the elements of it
        //
        var pathEls = path.split(/\.|\//),
            l = pathEls.length,
            i = 0;

        // in case path has more than one element in the split result
        // like
        // aaa/bbb/ccc/ddd
        // dig destObj to destObj.aaa.bbb.ccc
        //
        while (i < l - 1) destObj = destObj[pathEls[i++]];

        // now the object is inserted
        //
        destObj[pathEls[l - 1]] = obj;
    }

    /**
     * [_mergeComponent description]
     * @param  {[type]} ns   [description]
     * @param  {[type]} path [description]
     * @param  {[type]} o    [description]
     * @return {[type]}      [description]
     */
    function _mergeComponent (ns, path, o) {
        var componentPH = JMVC.nsCheck(path, ns),
            replacementOBJ = o,
            merged = {},
            i = 0;

        // start from the replacement
        for (i in replacementOBJ) {
            merged[i] = replacementOBJ[i];
        }
        // copy everything but 'component' & 'params', overriding
        for (i in componentPH) {
            !(i.match(/component|params/)) &&
            (merged[i] = componentPH[i]);
        }
        _overwrite(ns, path, merged);
    }

    function Processor (config) {
        this.config = config;
        this.endPromise = JMVC.Promise.create();
    }

    Processor.prototype.getFileName = function (n) {
        var els = n.split(/\/|\|/),
            res = n,
            l = els.length;
        // if (els.length > 1) {
        els[l - 1] = config.fileNamePrepend + els[l - 1];
        // }
        res = els.join(config.fileNameSeparator);
        return config.componentsUrl + res + config.ext;
    };

    Processor.prototype.run = function () {
        var self = this,
            langFunc = JMVC.i18n.parse,
            elementsN = 0,
            countPromise = JMVC.Promise.create(),
            solveTime = JMVC.Promise.create(),
            start = +new Date(), end,
            xhrTot = 0,
            cback;

        (function solve () {
            var component = JMVC.object.digForKey(self.config, 'component', 1),
                componentName, cached,
                innerPromise = JMVC.Promise.create(),
                xhrStart = 0,
                xhrEnd = 0;

            innerPromise.then(solve);

            if (!component.length) {
                end = +new Date();
                self.endPromise.done(self.config);
                countPromise.done(elementsN);
                solveTime.done(end - start);
            } else {
                elementsN++;
                component = component[0];
                componentName = self.getFileName(component.value);
                cached = componentName in components;

                // if written as named function, safari will complain:
                // (to see write it back to the named version and evaluate it in the console with safari)
                // SyntaxError: Strict mode does not allow function declarations in a lexically nested statement.
                //
                cback = function (xhrResponseText) {
                    xhrEnd = +new Date();
                    xhrTot += xhrEnd - xhrStart;
                    var params = JMVC.nsCheck(component.container + '/params', self.config),
                        obj,
                        usedParams, foundParam, foundParamValue, foundParamValueReplaced, i, l;

                    // maybe is not already cached
                    //
                    if (!cached) {
                        components[componentName] = xhrResponseText;
                    }

                    xhrResponseText = xhrResponseText.replace(/^[^{]*/, '')
                        .replace(/\/n|\/r/mg, '')
                        .replace(/(;?\n?)$/, '');

                    // eslint-disable-next-line no-eval
                    obj = eval('(' + xhrResponseText + ')');

                    // before merging the object I check for the presence of parameters
                    if (params) {
                        // check if into the component are used var placeholders
                        usedParams = JMVC.object.digForValue(obj, /#PARAM{([^}|]*)?\|?([^}]*)}/);
                        l = usedParams.length;

                        if (l) {
                            for (i = 0; i < l; i++) {
                                // check if the label of the placeholder is in the params
                                foundParam = JMVC.nsCheck(usedParams[i].regexp[1], params);

                                // in case use it otherwise, the fallback otherwise cleanup
                                foundParamValue = foundParam || usedParams[i].regexp[2] || '';

                                // string or an object?
                                if ((typeof foundParamValue).match(/string/i)) {
                                    foundParamValueReplaced = JMVC.nsCheck(usedParams[i].path, obj)
                                        .replace(usedParams[i].regexp[0], foundParamValue);
                                    _overwrite(obj, usedParams[i].path, foundParamValueReplaced);
                                } else {
                                    _overwrite(obj, usedParams[i].path, foundParamValue);
                                }
                            }
                        }
                    }
                    if (component.container) {
                        _mergeComponent(self.config, component.container, obj);
                    } else {
                        self.config = obj;
                    }

                    innerPromise.done();
                };

                // maybe is cached
                //
                if (cached) {
                    cback(components[componentName]);
                } else {
                    xhrStart = +new Date();
                    JMVC.io.get(componentName, cback, true);
                }
            }
        })();

        // now i18n
        //
        langFunc && JMVC.i18n.parse(self.config);

        countPromise.then(function (pro, par) {
            console.log('Engy components used: ' + par[0]);
        });

        solveTime.then(function (pro, par) {
            console.log('Engy time for getting components via xhr: ' + xhrTot);
            console.log('      "       unfolding : ' + (par[0] - xhrTot));
            console.log('      "       solving (xhr included): ' + par[0]);
        });

        return self.endPromise;
    };

    return {
        process: function (a) {
            return (new Processor(a)).run();
        },

        render: function (params, clean, name) {
            var t = +new Date(),
                pRet = JMVC.Promise.create();

            this.process(params).then(function (p, r) {
                var ret = JMVC.core.widgzard.render(r[0], clean, name);
                console.log('t: ' + (+new Date() - t));
                pRet.done(ret);
            });
            return pRet;
        }
    };
});
