JMVC.extend('xmlparser', {

	// takes the content of
	// the xml to be parsed
	//
	load : function (txt, or_is_xml) {

		var that = this,
			xmlDoc,
			parser;

		if (or_is_xml == undefined) {
		//clean up a bit
			txt = txt.replace(/\n/g, "")
				.replace(/[\t ]+\</g,"<")
				.replace(/\>[\t ]+\</g,"")
				.replace(/\>[\t ]+$/g, ">");

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

		//set the extractor function or get the fTH node
		this.extractor = function (f, reset_extractor) {
			if (typeof f === 'number') {
				return this.pointerNode.childNodes.length > f ?
					this.nodeExtractor(this.pointerNode.childNodes[f])
					:
					false;
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
			if (node) {
				this.pointerNode = node;
			}
			return this.pointerNode;
		}
		
		this.root = function(){
			return this.xmlDoc.childNodes[0];
		};
		
		this.toJson = function (xml) {
			var obj = {};
			xml = xml ||that.pointerNode;


			if (xml.nodeType == 1) {
				if (xml.attributes.length > 0) {
				obj["@attributes"] = {};
					for (var j = 0; j < xml.attributes.length; j++) {
						var attribute = xml.attributes.item(j);
						obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
					}
				}
			}

			else if (xml.nodeType == 3) {
				obj = xml.nodeValue;//.replace(/\n/g, '').replace(/^\s*/, '').replace(/\s*$/, '');
			}

			if (xml.hasChildNodes()) {
				for(var i = 0; i < xml.childNodes.length; i++) {
					var item = xml.childNodes.item(i),
						nodeName = item.nodeName,
						old, tmp;

					tmp = this.toJson(item);

					if (typeof(obj[nodeName]) == "undefined") {
						!!tmp && (obj[nodeName] = tmp);
					} else {

						if (typeof(obj[nodeName].push) == "undefined") {
							old = obj[nodeName];
							obj[nodeName] = [];
							obj[nodeName].push(old);
						}
						
						!!tmp && obj[nodeName].push(tmp);
					}
				}
			}
			return obj;
		};
		// by default is the root
		this.pointerNode = this.root();
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
	}
});
