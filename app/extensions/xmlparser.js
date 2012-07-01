JMVC.extend('xmlparser',{							
	load : function(txt){
		txt = txt.replace(/\n/g, "").replace(/[\t ]+\</g,"<").replace(/\>[\t ]+\</g,"").replace(/\>[\t ]+$/g, ">");

		this.xmlDoc = false;
		var xmlDoc, parser;
		
		if(window.DOMParser){
			parser=new DOMParser();
			xmlDoc=parser.parseFromString(txt,"text/xml");
		}else{ // Internet Explorer
			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async=false;
			xmlDoc.loadXML(txt);
		}
		this.xmlDoc = xmlDoc;
		
		this.nodeExtractor = false;
		
		this.pointerNode = false;
				
		this.extractor = function(f, reset_extractor){
		
		//	console.debug('pointer node  is ', this.pointerNode);
		
			if(typeof f === 'number'){
				return this.pointerNode.childNodes.length > f ? this.nodeExtractor(this.pointerNode.childNodes[f]) :false;
			}
			if(typeof f === 'function' && (!this.nodeExtractor || reset_extractor)){
				this.nodeExtractor = f;
				
				this.pointerNode = this.xmlDoc.documentElement;
				console.debug('pointer node  is ', this.pointerNode);
				return true;	
			}
			return false;
		};
		
		
		
		
		this.extractall = function(){
			var ret = [], len = this.pointerNode.childNodes.length, i=0;
			while(len--){
				ret.push(this.extractor(i++));
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
		
	},
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
				var item = xml.childNodes.item(i);
				var nodeName = item.nodeName;
				if (typeof(obj[nodeName]) == "undefined") {
					obj[nodeName] = this.toJson(item);
				} else {
					if (typeof(obj[nodeName].length) == "undefined") {
						var old = obj[nodeName];
						obj[nodeName] = [];
						obj[nodeName].push(old);
					}
					obj[nodeName].push(this.toJson(item));
				}
			}
		}
		return obj;
	}
});
