JMVC.controllers['404'] = function() {
	this.msg = function() {		
		var f0f = JMVC.factory('view','404');
		
		if(this.get('act')) { 
				f0f.set('msg','action `'+(this.get('act'))+'` not found');
		}
		if(this.get('cnt')) { 
				f0f.set('msg','controller `'+(this.get('cnt'))+'` not found');
		}
		
		var d = new Date();
		
		f0f.set('date', d.getFullYear()+'/'+d.getMonth()+'/'+d.getDay()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds());
		f0f.set('url', document.location.href);
		f0f.set('agent', window.navigator.userAgent);
		
		
		f0f.render();
		
		
		JMVC.head.title('404 PAGE NOT FOUND');
		//window.setTimeout(function() {document.location.href = '/';	}, 5000);
		JMVC.dom.append( JMVC.head.element, meta);
	};
};
