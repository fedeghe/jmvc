/*
======
PARSER
======
*/
Parser = {
    /**
     * microtemplating function (http://ejohn.org/blog/javascript-micro-templating/)
     * Parses a string looking for  
     * @param  {string} content the content that must be parsed
     * @return {string}         parsed content
     */
    tpl : function (content) {
        return (content.match(/\<%/)) ?
        (function (str) {
            var fn = new Function('obj',
                "var p=[]; p.push('" +
                str.replace(/[\r\t\n]/g, " ")
                .split("<%").join("\t")
                .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                .replace(/\t=(.*?)%>/g, "',$1,'")
                .split("\t").join("');")
                .split("%>").join("p.push('")
                .split("\r").join("\\'") + "');  return p.join('');"
                );
            return fn(str);
        })(content) : content;
    },

    /**
     * This function get a content and substitute jmvc.vars
     * and direct view placeholders like {{viewname .... }}
     * returns parsed content
     * 
     * @param  {[type]} content [description]
     * @return {[type]}         [description]
     */
    parse : function (content) {

        if (typeof content === undef) {
            return '';
        }

        // the view content
        var cont = content,
            RX = {
                //
                // for hunting view placeholders
                'patt' : "{{(.[^\\}]*)}}",
                //
                // for getting explicit params passed within view placeholders
                'pattpar' : "\\s(.[A-z]*)=`(.[^/`]*)`",
                //
                // for variables
                'pattvar' : "\\$(.[^\\$\\s}]*)\\$",
                //
                // for getting only the viewname
                'viewname' : "^(.[A-z_\/]*)\\s"
            },
            //
            // some loop counters
            i = 0, j, k,
            //
            // recursion limit for replacement
            limit = 100,
            //
            // flag to stop parsing
            go_ahead = true,
            //
            // only the view name
            viewname,
            //
            // original content of {{}} stored for final replacement
            orig,
            //
            // to store inner variables found in the placeholder
            register,
            //
            // results of view hunt 
            res,
            //
            // the view instance
            myview,
            //
            // two temporary variables for regexp results
            tmp1, tmp2;

        // check
        // beforeParse hook
        jmvc.hook_check('onBeforeParse', [cont]);
        
        while (i < limit) {
            i += 1;
            res = new RegExp(RX.patt, 'gm').exec(cont);
            
            if (res) {
                viewname = orig = res[1];
                register = false;

                // got params within ?
                if (new RegExp(RX.pattpar, 'gm').test(res[1])) {
                    // register becomes an object and flags result for later check
                    register = {};

                    // get only the view name, ingoring parameters
                    tmp2  = (new RegExp(RX.viewname)).exec(res[1]);
                    viewname = tmp2[1];

                    tmp2 = res[1];
                    while (go_ahead) {
                        // this is exactly pattpar but if I use it does not work
                        tmp1 = (new RegExp(RX.pattpar, 'gm')).exec(tmp2);

                        if (tmp1) {
                            // add to temporary register
                            register[tmp1[1]] = tmp1[2];
                            tmp2 = tmp2.replace(' ' + tmp1[1] + '=`' + tmp1[2] + '`', "");
                        } else {
                            go_ahead = false;
                        }
                    }
                }
                // if not loaded give an alert
                if (!$JMVC.views[viewname]) {
                    // here the view is requested but not explicitly loaded with the $JMVC.getView method.
                    // You should use that method, and you'll do for sure if You mean to use View's variable
                    // but if You just load a view as a simple chunk with {{myview}} placeholder inside another one
                    // then $JMVC will load it automatically (take care to not loop, parsing stops after 100 replacements)
                    /*
                        alert('`'+viewname+'` view not loaded.\nUse Factory in the controller to get it. \n\njmvc will'+
                            ' load it for you but variables are\n lost and will not be replaced.');
                    */
                    myview = $JMVC.factory('view', viewname);
                } else {
                    myview = $JMVC.views[viewname];
                }

                // in case there are some vars in placeholder
                // register will hold values obtained above
                // and we give'em to the view, the parse method
                // will do the rest
                if (register !== false) {
                    for (k in register) {
                        if (register.hasOwnProperty(k)) {
                            myview.set(k, register[k]);
                        }
                    }
                }

                // before view substitution,
                // look for variables, these have to be set with set method on view instance,
                // (and that cannot be done using {{viewname}} placeholder )
                tmp1 = true;
                while (tmp1) {
                    tmp1 = new RegExp(RX.pattvar, 'gm').exec(myview.content);
                    if (tmp1) {
                        myview.content = myview.content.replace('$' + tmp1[1] + '$', myview.get(tmp1[1]));
                    }
                }
                
                // now the whole view
                cont = cont.replace('{{' + orig + '}}', myview.content);
            } else {
                i = limit;
            }
        }
        // now $JMVC.vars parse
        for (j in $JMVC.vars) {
            if ($JMVC.vars.hasOwnProperty(j)) {
                cont = cont.replace(new RegExp("\\$" + j + "\\$", 'g'), $JMVC.vars[j]);
            }
        }
        //
        // use Resig microtemplating function on final content
        cont = Parser.tpl(cont);
        //
        // afterParse hook
        jmvc.hook_check('onAfterParse', [cont]);
        return cont;
    }
};
//
// END PARSER
//