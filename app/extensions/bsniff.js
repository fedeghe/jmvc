JMVC.extend('sniff',{
	init : function(){
		
		this.browser = {
			name : 'not found',
			version: 'not found'
		};
		this.os = {
			name : 'not found'
		};
		
		var bcheck = {
			Firefox : "navigator.userAgent.match(/firefox\\\/([^\\\s]*)/i)",
			Opera : "navigator.userAgent.match(/opera\\\/([^\\\s]*)/i)",
			IE : "document.all && !(navigator.userAgent.match(/opera/i))",
			iCab : "navigator.userAgent.match(/icab\\\/([^\\\s]*)/i)"
		};
		var ocheck = {
			MacOS : "navigator.appVersion.match(/mac/i)",
			Win : "navigator.appVersion.match(/win/i)",
			Unix : "navigator.appVersion.match(/x11/i)",
			Linux : "navigator.appVersion.match(/linux/i)"
			
		};
		for(var bro in bcheck){
			var r = eval( bcheck[bro]) ;
			if(r){
				this.browser.name = bro;
				this.browser.version = r[1];
				break;
			}
		}
		for(var o in ocheck){
			var r = eval( bcheck[bro]) ;
			if(r){
				this.os.name = o;
				break;
			}
		}
		
				
	},
	
	browser : false,
	os:false
});


