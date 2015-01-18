JMVC.require('core/lib/widgzard/widgzard');
JMVC.extend('core/engy', function () {
    "use strict";

    JMVC.head.addStyle(JMVC.vars.extensions + 'core/lib/widgzard/engy.min.css');

    return {
        process :function () {

            var args = [].slice.call(arguments, 0),
                config = args[0],
                Promise = JMVC.Promise,
                endPromise = Promise.create(),
                nsCheck = JMVC.nsCheck,
                digForValue = JMVC.object.digForValue,
                digForKey = JMVC.object.digForKey,
                Processor, processorPROTO,
                getComponentsManager,
                outConfig = {},
                ENGY_COMPONENTS_PATH = JMVC.vars.engyComponents;


                Processor = function (config) {
                    this.components = [];
                    this.retFuncs = [];
                    this.config = config;
                };
                processorPROTO = Processor.prototype;

                processorPROTO.getComponents = function () {
                    var self = this,
                        tmp = JMVC.object.digForKey(self.config, 'component'),
                        i, l;

                    //build at level
                    for (i = 0, l = tmp.length; i < l; i++) {
                    
                        if (!self.components[tmp[i].level])  {
                            self.components[tmp[i].level] = [];
                        }     
                        self.components[tmp[i].level].push({
                            component : tmp[i],
                            params : JMVC.nsCheck(tmp[i].container ?  tmp[i].container + '.params' : 'params' , self.config)
                        });
                    }
                }; 
                
                processorPROTO.getComponentsPromise = function () {
                    var self = this,
                        p = Promise.create(),
                        i1, i2, l1, l2;

                    self.getComponents();

                    self.retFuncs = [];

                    for (i1 = 0, l1 = self.components.length; i1 < l1; i1++) {

                        // could be undefined @ that level
                        if (self.components[i1]) {

                            for (i2 = 0, l2 = self.components[i1].length; i2 < l2; i2++) {

                                (function (j1, j2) {

                                    self.retFuncs.push(function () {

                                        var pr = Promise.create(),

                                            file = ENGY_COMPONENTS_PATH + self.components[j1][j2].component.value + '.js';
                                
                                        // not get it as json , so it's possible to specify the cb within the component
                                        // net being it validated from JSON.parse
                                        JMVC.io.get(
                                            file,
                                            function (r) {
                                                self.components[j1][j2].json = eval('(' + r.replace(/\/n|\/r/g, '') + ')');
                                                //self.components[j1][j2].json = eval('(' + r + ')');
                                                pr.done();
                                            }
                                        );
                                        return pr;
                                    });
                                })(i1, i2);
                            }    
                        }
                    }
                    p.done();
                    return p;
                };

                processorPROTO.run = function () {

                    var self = this,
                        tmp, i1, i2 , l1, l2;

                    
                    self.getComponentsPromise().then(function () {
                        Promise.join(self.retFuncs).then(function (pro, r) {
                            
                            build(self, pro); // let the build resolve it

                        }).then(function (p, r) {

                            endPromise.done(r[0].config);

                        });
                    });
                    
                
                };

                function copyWithNoComponentNorParams(o) {
                    var ret = {};
                    for (var j in o) {
                        if (!j.match(/params|component/)) {
                            ret[j] = o[j];
                        }
                    }
                    return ret;
                }

                function build(instance, pro) {

                    //  in revese order the sostitution
                    /*
                     * {component: s1 , k1 : x1, k2: ,x2, .....} or 
                     * {component: s1 , params: {}, k1 : x1, k2: ,x2, .....}
                     *
                     * will be at the end replaced with
                     * {content : [ resulting ], k1 : x1, k2: ,x2, .....}
                     * 
                     */
                    // localize config, that will be modified

                    var components = instance.components,
                        config = instance.config,
                        k = components.length,
                        i, l,
                        comp, params, json, res,ref,
                        solve = function (j, p) {

                            // use 
                            var replacing = JMVC.object.digForValue(j, /#PARAM{([^}|]*)?\|?([^}]*)}/),
                                i, l,
                                mayP, fback, ref,
                                ret;
                            
                            for (i = 0, l = replacing.length; i < l; i++) {

                                mayP = JMVC.nsCheck(replacing[i].regexp[1], p),
                                fback = replacing[i].regexp[2],
                                ref = JMVC.nsCheck(replacing[i].container, j);
                                if (mayP !== undefined) {
                                    ref[replacing[i].key] = mayP;    
                                } else {
                                    ref[replacing[i].key] = fback || false; //'{MISSING PARAM}';
                                }

                                // WANT SEE if some params are missing?
                                // !mayP && !fback && console.log("WARNING: missing parameter! " + replacing[i].regexp[1]);
                            }
                            // return a clean object
                            // with no component & params
                            return copyWithNoComponentNorParams(j);
                        };
                    // from the deepest, some could be empty
                    while (k--) {
                        if (components[k]) {
                            for (i = 0, l = components[k].length; i < l; i++) {
                                comp = components[k][i];
                                params = comp.params;
                                json = comp.json;

                                res = solve(json, params);

                                ref = JMVC.nsCheck(comp.component.parentContainer, config);
                                
                                if (comp.component.parentKey != undefined) {
                                    ref[comp.component.parentKey] = res;
                                } else {
                                    // root
                                    instance.config = res;
                                }
                            }
                        }
                    }
                    
                    pro.done(instance);
                }
                
                (new Processor(config)).run();
                return endPromise;

            
            
            
        }
    };
});