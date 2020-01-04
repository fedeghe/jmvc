/* eslint-disable no-useless-escape */
// type : LIB
//
JMVC.extend('shl', {
    parse: function (str) {
        var r = [
                // operators
                {
                    rx: new RegExp(/(\+|-|\+=|-=|\*=|\/=|\&=|\!==|==|===|\!=|=|\>=|\<=|\<|\>|\>\>|\<\<|\?|\&\&)\s/g),
                    repl: '<span class="operator">$1 </span>'
                },
                // punctuation
                {
                    rx: new RegExp(/(;|\.|,|:)/g),
                    repl: '<span class="punct">$1</span>'
                },
                // function declaration
                {
                    rx: new RegExp(/function\s(.*[^\(])\(/g),
                    repl: '<span class="func_kw">function</span> <span class="funcname">$1</span>('
                },
                // keyworks
                {
                    rx: new RegExp(/(abstract|else|instanceof|super|boolean|enum|int|switch|break|export|interface|synchronized|byte|extends|let|this|case|false|long|throw|catch|final|native|throws|char|finally|new|transient|class|float|null|true|const|for|package|try|continue|function|private|typeof|debugger|goto|protected|var|default|if|public|void|delete|implements|return|volatile|do|import|short|while|double|in|static|with)\s/g),
                    repl: '<span class="kw">$1 </span>'
                },
                // particular objects and functions
                {
                    rx: new RegExp(/(Math|document|window|arguments|null|parseInt)/g),
                    repl: '<span class="funcz">$1</span>'
                },
                // function invocation
                {
                    rx: new RegExp(/(\s[A-z0-9-_]*)\(/g),
                    repl: '<span class="funccall">$1</span>('
                },
                // parenthesis
                {
                    rx: new RegExp(/(\(|\)|\{|\}|\[|\])/g),
                    repl: '<span class="parenth">$1</span>'
                },
                // bool
                {
                    rx: new RegExp(/(false|true)/g),
                    repl: '<span class="bool">$1</span>'
                },
                // hahahaha
                {
                    rx: new RegExp(/(JMVC)/g),
                    repl: '<span class="J">J</span><span class="M">M</span><span class="V">V</span><span class="C">C</span>'
                },
                // string... works only with '
                {
                    rx: new RegExp(/[\']([A-z0-9-_\s]*)[\']/g),
                    repl: '<span class="str">&quot;$1&quot;</span>'
                },
                // comment
                {
                    rx: new RegExp(/\/\/(.*)/g),
                    repl: '<span class="comment">//$1</span>'
                }
            ],
            i = 0,
            len = r.length;

        for (null; i < len; i += 1) {
            str = str.replace(r[i].rx, r[i].repl);
        }
        return str;
    }
});
