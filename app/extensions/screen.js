JMVC.extend('screen',{
	getViewportSize : function(){
		var size = [0, 0]; 
		if (typeof window.innerWidth != 'undefined'){
			size = [ 
				window.innerWidth, 
				window.innerHeight 
			]; 
		}
		else
		if(typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0){
			size = [ 
				document.documentElement.clientWidth, 
				document.documentElement.clientHeight 
			]; 
		}else{
			size = [ 
				document.getElementsByTagName('body')[0].clientWidth, 
				document.getElementsByTagName('body')[0].clientHeight 
			]; 
		}
		return size; 
	}
});
