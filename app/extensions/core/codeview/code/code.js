JMVC.head.addStyle(JMVC.vars.baseurl + '/app/extensions/core/codeview/code.css');

JMVC.hook({'onBeforeRender' : function(cnt){	
	var RX = {
			'html' : "<\\[H\\[([\\S\\s]*?)\\]H\\]>"
		},
		html = true,
		limit = 1000,
		mode = 'easy',
		strat = {
			
			easy : function () {
				// check for [[js code]], es. [[JMVC.vars.baseurl]] will be rendered as the value of baseurl
				while (limit && html) {
					html = new RegExp(RX.html, 'gm').exec(cnt),
						tmp = '';
					if (html) {
						tmp = '<pre><code>' + JMVC.htmlChars(html[1]) + '</code></pre>';
						cnt = cnt.replace(html[0], tmp);
					} else {
						html = false;
					}
					limit -= 1;
				}
				return cnt;
			},

			rainbow : function () {
				return cnt;
			}
		};
	return strat[mode]();
}});

/*
JMVC.hook({'onAfterRender' : function(c){
	return c.replace('//', '||');
}});
*/