JMVC.hook({'onBeforeRender' : function(cnt){	
	
	var RX = {
			'script' : "\\[\\[([\\S\\s]*?)\\]\\]"
		},
		script = true,
		limit = 1000;
		
	// check for [[js code]], es. [[JMVC.vars.baseurl]] will be rendered as the value of baseurl
	while (limit && script) {
		script = new RegExp(RX.script, 'gm').exec(cnt),
			tmp = '';
		if (script) {
			tmp = JMVC.W.eval(script[1]);
			cnt = cnt.replace(script[0], tmp);
		} else {
			script = false;
		}
		limit -= 1;
	}
	return cnt;

}});

/*
JMVC.hook({'onAfterRender' : function(c){
	return c.replace('//', '||');
}});
*/