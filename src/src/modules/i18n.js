JMVC.i18n = (function () {
	var data = {};

	JMVC.lang = typeof sm_lang !== 'undefined' ? sm_lang : 'en';

	return  {

		load : function (dict) {
			data = dict;
		},

		parse : function (obj) {
			var self = this,
				replacing = JMVC.object.digForValue(obj, /i18n\(([^}|]*)?\|?([^}]*)\)/);
			
			for (i = 0, l = replacing.length; i < l; i++) {
				if ((typeof replacing[i].regexp).match(/boolean/i)) continue;
				mayP = JMVC.i18n.check(replacing[i].regexp[0]);
				if (mayP) {
					ref = JMVC.checkNS(replacing[i].container, obj);	
					// ref[replacing[i].key] = mayP;
					ref[replacing[i].key] = JMVC.i18n.get(mayP[1], mayP[2]);
				} 
			}
		},

		/**
		 * receives a Literal like
		 * {
		 * 	"hello" : {
		 * 		"de" : "hallo",
		 * 		"it" : "ciao",
		 * 		"fr" : "bonjour",
		 * 	 	"en" : "hello"
		 * 	 },
		 * 	 "prova generale" : {
		 * 	 	"de" : "Generalprobe",
		 * 	  	"it" : "prova generale",
		 * 	   	"fr" : "répétition générale",
		 * 	   	"en" : "dress rehearsal"
		 * 	 }
		 * 	}
		 * @return {[type]} [description]
		 */
		dynamicLoad : function (lo, _label) {
			for (_label in lo) {
				JMVC.lang in lo[_label] && (data[_label] = lo[_label][JMVC.lang]);
			}
		},
		
		check : function (lab) {
			// return lab.match(/i18n\(([^)|]*)?\|?([^)|]*)\|?([^)]*)?\)/); 3???
			return lab.match(/i18n\(([^}|]*)?\|?([^}]*)\)/);
		},
		
		get : function (k, fallback) {
			
			var maybe = JMVC.checkNS(k, data);
			// return data[k] || fallback || 'no Value';
			return maybe || fallback || 'no Value';
			// return maybe || fallback || false;
		}
	}
})();
