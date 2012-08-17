JMVC.extend('loading',{
	init : function(){
		JMVC.require('screen');
		
		var size = JMVC.screen.getViewportSize();
		
		JMVC.events.start(function(){
			//create a full size div absolute and append with big z-index to the body
			var p = JMVC.dom.create('p', {style:'margin-top:50px;background-color:red;color:white;text-align:center;font-size:20px;line-height:30px'}, 'LOADING...');
			var div = JMVC.dom.create('div', {id:'initload', style:'background-color:white;position:absolute;left:0px;top:0px;width:'+size[0]+'px;height:'+size[1]+'px'});
			
			
			JMVC.dom.append(JMVC.dom.body(),div);
			JMVC.dom.append(div, p);
			//JMVC.debug(JMVC.dom.body().innerHTML);
		});
		
	}
});

