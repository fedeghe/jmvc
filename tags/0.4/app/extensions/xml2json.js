/*
 * thanks to Thomas Frank
 * http://www.thomasfrank.se/xml_to_json.html
 * 
 * even though it causes A LOT of warnings :(
 **/

JMVC.extend('xml2json',{
	
	// if arrayMap, all node of xmlDocument will be put into an array
      // if not arrayMap, all single node of xmlDocument wil be treated as property
      ToJSON : function(xmlDoc,arrayMap)
      {
          if(xmlDoc.hasChildNodes())
          {
              var node = this.ParseNode(xmlDoc,arrayMap);
              node["X-Parse-Engine"]="MX.Util.XML";
              node["X-JSMX-Framework"]="Version 1.2";
              return node;
          }
          return null;
      },
      ParseNode : function(xmlNode,arrayMap)
      {
          var node =
          {
              "$attribute":null,
              "$count":0,
              //"$name":xmlNode.nodeName,
              //"$type":xmlNode.nodeType,
              "$value":""
          };
          var _node = null;
          if(xmlNode.attributes)  // because xmlNode.hasAttributes() method just work in FF
          {
              node["$attribute"] = {};
              for(var i=0,n=xmlNode.attributes.length;i<n;++i)
              {
                  _node = xmlNode.attributes[i];
                  node["$attribute"][_node.nodeName] = _node.nodeValue; // or escape(_node.nodeValue)?
              }
          }
          if(xmlNode.hasChildNodes())
          {
              if(xmlNode.firstChild.nodeType==3)
              {
                  node["$value"] = xmlNode.firstChild.nodeValue.replace(/\n\r*/g, "").replace(/^\s+/, "").replace(/\s+$/, "");
              }
              var name = "";
              var p = null;
              var count = 0;
              for(var i=0,n=xmlNode.childNodes.length;i<n;++i)
              {
                  _node = xmlNode.childNodes[i];
                  if(_node.nodeType==3) continue;
                  name = _node.nodeName;
                  p = this.ParseNode(_node,arrayMap);
                  if(node[name]==null)
                  {
                      node["$count"]++;
                      if(!arrayMap)
                      {
                          count=0;
                          for(var c=0,m=xmlNode.childNodes.length;c<m;++c)
                          {
                              if(xmlNode.childNodes[c].tagName==name)count++;
                              if(count==2) break;
                          }
                          if(count==1)
                          {
                              node[name] = p;
                              continue;
                          }
                      }
                      node[name] = [];
                  }
                  node[name].push(p);
              }
          }
          return node;
      }
	
	
	
	
	
	

	
	,
	
	parser:function(xmlcode,ignoretags,debug) {
		if(!ignoretags) {ignoretags=""};
		xmlcode=xmlcode.replace(/\s*\/>/g,'/>');
		xmlcode=xmlcode.replace(/<\?[^>]*>/g,"").replace(/<\![^>]*>/g,"");
		if (!ignoretags.sort) {ignoretags=ignoretags.split(",")};
		var x=this.no_fast_endings(xmlcode);
		x=this.attris_to_tags(x);
		x=escape(x);
		x=x.split("%3C").join("<").split("%3E").join(">").split("%3D").join("=").split("%22").join("\"");
		for (var i=0;i<ignoretags.length;i++) {
			x=x.replace(new RegExp("<"+ignoretags[i]+">","g"),"*$**"+ignoretags[i]+"**$*");
			x=x.replace(new RegExp("</"+ignoretags[i]+">","g"),"*$***"+ignoretags[i]+"**$*")
		};
		x='<JSONTAGWRAPPER>'+x+'</JSONTAGWRAPPER>';
		this.xmlobject={};
		var y=this.xml_to_object(x).jsontagwrapper;
		if(debug) {y=this.show_json_structure(y,debug)};
		return y
	},
	xml_to_object:function(xmlcode) {
		var x=xmlcode.replace(/<\//g,"§");
		x=x.split("<");
		var y=[];
		var level=0;
		var opentags=[];
		for (var i=1;i<x.length;i++) {
			var tagname=x[i].split(">")[0];
			opentags.push(tagname);
			level++
			y.push(level+"<"+x[i].split("§")[0]);
			while(x[i].indexOf("§"+opentags[opentags.length-1]+">")>=0) {level--;opentags.pop()}
		};
		var oldniva=-1;
		var objname="this.xmlobject";
		for (var i=0;i<y.length;i++) {
			var preeval="";
			var niva=y[i].split("<")[0];
			var tagnamn=y[i].split("<")[1].split(">")[0];
			tagnamn=tagnamn.toLowerCase();
			var rest=y[i].split(">")[1];
			if(niva<=oldniva) {
				var tabort=oldniva-niva+1;
				for (var j=0;j<tabort;j++) {objname=objname.substring(0,objname.lastIndexOf("."))}
			};
			objname+="."+tagnamn;
			var pobject=objname.substring(0,objname.lastIndexOf("."));
			if (eval("typeof "+pobject) != "object") {preeval+=pobject+"={value:"+pobject+"};\n"};
			var objlast=objname.substring(objname.lastIndexOf(".")+1);
			var already=false;
			for (var k in eval(pobject)) {if(k==objlast) {already=true}};
			var onlywhites=true;
			for(var s=0;s<rest.length;s+=3) {
				if(rest.charAt(s)!="%") {onlywhites=false}
			};
			if (rest!="" && !onlywhites) {
				if(rest/1!=rest) {
					rest="'"+rest.replace(/\'/g,"\\'")+"'";
					rest=rest.replace(/\*\$\*\*\*/g,"</");
					rest=rest.replace(/\*\$\*\*/g,"<");
					rest=rest.replace(/\*\*\$\*/g,">")
				}
			} 
			else {rest="{}"};
			if(rest.charAt(0)=="'") {rest='unescape('+rest+')'};
			if (already && !eval(objname+".sort")) {preeval+=objname+"=["+objname+"];\n"};
			var before="=", after="";
			if (already) {before=".push(";after=")"};
			var toeval=preeval+objname+before+rest+after;
			eval(toeval);
			if(eval(objname+".sort")) {objname+="["+eval(objname+".length-1")+"]"};
			oldniva=niva
		};
		return this.xmlobject
	},
	show_json_structure:function(obj,debug,l) {
		var x='';
		if (obj.sort) {x+="[\n"} else {x+="{\n"};
		for (var i in obj) {
			if (!obj.sort) {x+=i+":"};
			if (typeof obj[i] == "object") {
				x+=this.show_json_structure(obj[i],false,1)
			}
			else {
				if(typeof obj[i]=="function") {
					var v=obj[i]+"";
					//v=v.replace(/\t/g,"");
					x+=v
				}
				else if(typeof obj[i]!="string") {x+=obj[i]+",\n"}
				else {x+="'"+obj[i].replace(/\'/g,"\\'").replace(/\n/g,"\\n").replace(/\t/g,"\\t").replace(/\r/g,"\\r")+"',\n"}
			}
		};
		if (obj.sort) {x+="],\n"} else {x+="},\n"};
		if (!l) {
			x=x.substring(0,x.lastIndexOf(","));
			x=x.replace(new RegExp(",\n}","g"),"\n}");
			x=x.replace(new RegExp(",\n]","g"),"\n]");
			var y=x.split("\n");x="";
			var lvl=0;
			for (var i=0;i<y.length;i++) {
				if(y[i].indexOf("}")>=0 || y[i].indexOf("]")>=0) {lvl--};
				tabs="";for(var j=0;j<lvl;j++) {tabs+="\t"};
				x+=tabs+y[i]+"\n";
				if(y[i].indexOf("{")>=0 || y[i].indexOf("[")>=0) {lvl++}
			};
			if(debug=="html") {
				x=x.replace(/</g,"&lt;").replace(/>/g,"&gt;");
				x=x.replace(/\n/g,"<BR>").replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;")
			};
			if (debug=="compact") {x=x.replace(/\n/g,"").replace(/\t/g,"")}
		};
		return x
	},
	no_fast_endings:function(x) {
		x=x.split("/>");
		for (var i=1;i<x.length;i++) {
			var t=x[i-1].substring(x[i-1].lastIndexOf("<")+1).split(" ")[0];
			x[i]="></"+t+">"+x[i]
		}	;
		x=x.join("");
		return x
	},
	attris_to_tags: function(x) {
		var d=' ="\''.split("");
		x=x.split(">");
		for (var i=0;i<x.length;i++) {
			var temp=x[i].split("<");
			for (var r=0;r<4;r++) {temp[0]=temp[0].replace(new RegExp(d[r],"g"),"_jsonconvtemp"+r+"_")};
			if(temp[1]) {
				temp[1]=temp[1].replace(/'/g,'"');
				temp[1]=temp[1].split('"');
				for (var j=1;j<temp[1].length;j+=2) {
					for (var r=0;r<4;r++) {temp[1][j]=temp[1][j].replace(new RegExp(d[r],"g"),"_jsonconvtemp"+r+"_")}
				};
				temp[1]=temp[1].join('"')
			};
			x[i]=temp.join("<")
		};
		x=x.join(">");
		x=x.replace(/ ([^=]*)=([^ |>]*)/g,"><$1>$2</$1");
		x=x.replace(/>"/g,">").replace(/"</g,"<");
		for (var r=0;r<4;r++) {x=x.replace(new RegExp("_jsonconvtemp"+r+"_","g"),d[r])}	;
		return x
	}
});


