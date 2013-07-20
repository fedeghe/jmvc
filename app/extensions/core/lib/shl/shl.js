
JMVC.extend('shl', {
	'parse' : function (str) {
		return str;
		//console.debug(str);
		var r = [
				//operators
				new RegExp(/(\+|-|\+=|-=|\*=|\/=|\&=|\!==|==|===|\!=|=|\>=|\<=|\<|\>|\>\>|\<\<|\?|\&\&)\s/g),
				'<span class="operator">$1 </span>',
				
				//punctuation
				new RegExp(/(;|\.|,|:)/g),
				'<span class="punct">$1</span>',
				
				
				// function declaration
				new RegExp(/function\s(.*[^\(])\(/g),
				'<span class="func_kw">function</span> <span class="funcname">$1</span>(',
				
				//keyworks				
				new RegExp(/(abstract|else|instanceof|super|boolean|enum|int|switch|break|export|interface|synchronized|byte|extends|let|this|case|false|long|throw|catch|final|native|throws|char|finally|new|transient|class|float|null|true|const|for|package|try|continue|function|private|typeof|debugger|goto|protected|var|default|if|public|void|delete|implements|return|volatile|do|import|short|while|double|in|static|with)\s/g),
				'<span class="kw">$1 </span>'
				,
				
				// particular objects and functions
				new RegExp(/(Math|document|window|arguments|null|parseInt)/g),
				'<span class="funcz">$1</span>',
				
				//function invocation
				new RegExp(/(\s[A-z0-9-_]*)\(/g),
				'<span class="funccall">$1</span>(',
				
				
				
				//parenthesis
				new RegExp(/(\(|\)|\{|\}|\[|\])/g),
				'<span class="parenth">$1</span>',
				
				//bool
				new RegExp(/(false|true)/g),
				'<span class="bool">$1</span>',
				
				
				// hahahaha
				new RegExp(/(JMVC)/g),
				'<span class="J">J</span><span class="M">M</span><span class="V">V</span><span class="C">C</span>',
				
				//string... works only with '
				new RegExp(/[\']([A-z0-9-_\s]*)[\']/g),
				'<span class="str">&quot;$1&quot;</span>',
				
				//comment
				new RegExp(/\/\/(.*)/g),
				'<span class="comment">//$1</span>'
				
			],
			i = 0,
			len = r.length
		
		for (null; i < len; i += 2){
			str = str.replace(r[i], r[i + 1]);
		}
		return str;
	}
});



