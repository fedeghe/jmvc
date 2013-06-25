JMVC.require('screen');
JMVC.extend('modal',{
	'id' : 0,
	'open' : function(width, height){
		this.id++;
		var scrData = JMVC.screen.getScreenData(),
			bg,
			modal,
			bodysize = JMVC.screen.bodySize();
		//create bg
		JMVC.debug(bodysize);
		bg = JMVC.dom.create(
			'div',
			{'style' : 'position:absolute;top:0px;left:0px;width:'+bodysize[0]+'px;height:'+bodysize[1]+'px;background-color:red;opacity:0.2'},
			'hei'
		);
		JMVC.dom.append(JMVC.dom.body(), bg);
		//JMVC.debug(scrData);
		//JMVC.debug(this.id);
	}
});
