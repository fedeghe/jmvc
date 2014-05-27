JMVC.extend('widget.langs', {

	//get the basic styles
	init : function () {
		JMVC.head.addStyle(JMVC.vars.baseurl + '/app/extensions/widget/lang/lang.css');
	},

	//create the ul with home langs links within
	create : function (cnt) {
		var mkp = JMVC.dom.create('ul', {'class' : 'lang'});
		JMVC.each(JMVC.i18n, function (e, i){
			var img = JMVC.dom.create('img', {src : JMVC.vars.baseurl + JMVC.US +'media' + JMVC.US + 'img' + JMVC.US + 'flags' + JMVC.US + i + '.gif'}),
				a = JMVC.dom.create('a', {'href' : JMVC.vars.baseurl + JMVC.US + '?lang=' + i, 'class' : JMVC.vars.currentlang === i ? 'active' : ''}, img),
				li = JMVC.dom.create('li', {}, a);
			JMVC.dom.append(mkp, li);
		});
		JMVC.dom.append(cnt, mkp);
	}
})