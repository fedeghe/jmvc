JMVC.extend('xmlparser', {

	// takes the contant of
	// the xml to be parsed
	//
	load : function (txt, or_is_xml) {

		var that = this,
			xmlDoc,
			parser;

		if (or_is_xml == undefined) {
		//clean up a bit
			txt = txt.replace(/\n/g, "").replace(/[\t ]+\</g,"<").replace(/\>[\t ]+\</g,"").replace(/\>[\t ]+$/g, ">");

			this.xmlDoc = false;

			if (JMVC.W.DOMParser) {
				parser = new DOMParser();
				xmlDoc = parser.parseFromString(txt, "text/xml");
			} else { // IE
				xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
				xmlDoc.async=false;
				xmlDoc.loadXML(txt);
			}
			this.xmlDoc = xmlDoc;
		} else {
			this.xmlDoc = txt;
		}
		
		//JMVC.debug(that.xmlDoc)
		
		
		this.nodeExtractor = function (t) {return t; };
		this.pointerNode = false;

		//set the extractor function or get the fTH node
		this.extractor = function (f, reset_extractor) {
			if (typeof f === 'number') {
				return this.pointerNode.childNodes.length > f ? this.nodeExtractor(this.pointerNode.childNodes[f]) : false;
			}
			if (typeof f === 'function' && (!this.nodeExtractor || reset_extractor)) {
				this.nodeExtractor = f;
				this.pointerNode = this.xmlDoc.documentElement;
				return true;
			}
			return false;
		};


		this.extractall = function () {
			var ret = [],
				len = this.pointerNode.childNodes.length,
				i = 0;
			while (len) {
				len -= 1;
				ret.push(this.extractor(i));
				i += 1;
			}
			return ret;
		};
		
		
		this.pointer = function(node){
			if(node){this.pointerNode = node;}
			return this.pointerNode;
		}
		
		this.root = function(){
			return this.xmlDoc.childNodes[0];
		};
		
		this.toJson = function(){
//			Create the return object
			var obj = {}, xml = that.xmlDoc;

//			element
			if (xml.nodeType == 1) {
//				do attributes
				if (xml.attributes.length > 0) {
				obj["@attributes"] = {};
					for (var j = 0; j < xml.attributes.length; j++) {
						var attribute = xml.attributes.item(j);
						obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
					}
				}
			}
//			text
			else if (xml.nodeType == 3) {
				obj = xml.nodeValue;
			}

//			do children
			if (xml.hasChildNodes()) {
				for(var i = 0; i < xml.childNodes.length; i++) {
					var item = xml.childNodes.item(i),
						nodeName = item.nodeName,
						old;
					if (typeof obj[nodeName] == "undefined") {
						obj[nodeName] = that.toJson(item);
					} else {
						if (typeof(obj[nodeName].length) == "undefined") {
							old = obj[nodeName];
							obj[nodeName] = [];
							obj[nodeName].push(old);
						}
						obj[nodeName].push(that.toJson(item));
					}
				}
			}
			return obj;
		}
	},
	
	
	/**
	 * 
	 * 
	 * SOME UTILITY FUNCTIONS
	 */
	_text : function(node){
		return node.childNodes[0].nodeValue;
	},
	_attribute : function(node, attribute){
		var r = node.attributes.getNamedItem(attribute);
		if(r == null){return '';}
		return r.nodeValue;
	},
	_tag : function(node, tag, n){
		var nodes = node.getElementsByTagName(tag);
		return n<nodes.length ? nodes[n] : false;
	},
	
//	Thanks to the great David Walsh
//	url : http://davidwalsh.name/convert-xml-json
	toJson : function(xml){ 
//		Create the return object
		var obj = {};

//		element
		if (xml.nodeType == 1) {
//			do attributes
			if (xml.attributes.length > 0) {
				obj["@attributes"] = {};
				for (var j = 0; j < xml.attributes.length; j++) {
					var attribute = xml.attributes.item(j);
					obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
				}
			}
		}
//		text
		else if (xml.nodeType == 3) {
			obj = xml.nodeValue;
		}
		
//		do children
		if (xml.hasChildNodes()) {
			for(var i = 0; i < xml.childNodes.length; i++) {
				var item = xml.childNodes.item(i),
					nodeName = item.nodeName,
					old;

				if (typeof(obj[nodeName]) == "undefined") {
					obj[nodeName] = JMVC.xmlparser.toJson(item);
				} else {
					if (typeof(obj[nodeName].length) == "undefined") {
						old = obj[nodeName];
						obj[nodeName] = [];
						obj[nodeName].push(old);
					}
					obj[nodeName].push(JMVC.xmlparser.toJson(item));
				}
			}
		}
		return obj;
	}
});
