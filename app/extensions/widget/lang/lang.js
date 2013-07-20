JMVC.extend('widget.langs', {
	init : function () {

	},
	create : function (cnt) {
		var mkp = JMVC.dom.create('ul', {'class' : 'lang'}),
			currentlang = JMVC.vars.currentlang;
		

		JMVC.each(JMVC.i18n, function (e, i){
			var img = JMVC.dom.create('img', {src : JMVC.vars.baseurl + JMVC.US +'media' + JMVC.US + 'img' + JMVC.US + 'flags' + JMVC.US + i + '.gif'}),
				a = JMVC.dom.create('a', {href : JMVC.vars.baseurl + JMVC.US + '?lang=' + i, 'class' : currentlang === i ? 'active' : '' }, img),
				li = JMVC.dom.create('li', {}, a);
			JMVC.dom.append(mkp, li);
		});
		JMVC.dom.append(cnt, mkp);
	}
})