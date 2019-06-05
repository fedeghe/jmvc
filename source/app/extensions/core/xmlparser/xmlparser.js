JMVC.extend('xmlparser', {
    // takes the content of
    // the xml to be parsed
    //
    load: function (txt, orIsXml) {
        var that = this,
            xmlDoc,
            parser,
            clean = function (d) {
                return d.replace(/>\n</g, '').replace(/\t/g, '').replace(/^\s*/g, '').replace(/\s*$/g, '');
                // return d.replace(/\n/gm, '').replace(/\t/gm, '').replace(/^\s*/g, '').replace(/\s*$/g, '');
            };

        if (typeof orIsXml === 'undefined') {
            // clean up a bit
            txt = txt.replace(/\n/g, '')
                .replace(/[\t ]+</g, '<')
                .replace(/>[\t ]+</g, '')
                .replace(/>[\t ]+$/g, '>');

            this.xmlDoc = false;

            if (JMVC.W.DOMParser) {
                parser = new DOMParser();
                xmlDoc = parser.parseFromString(txt, 'text/xml');
            } else { // IE
                // eslint-disable-next-line no-undef
                xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
                xmlDoc.async = false;
                xmlDoc.loadXML(txt);
            }
            this.xmlDoc = xmlDoc;
        } else {
            this.xmlDoc = txt;
        }
        // JMVC.debug(that.xmlDoc)

        this.nodeExtractor = function (t) { return t; };

        // set the extractor function or get the fTH node
        this.extractor = function (f, resetExtractor) {
            if (typeof f === 'number') {
                return this.pointerNode.childNodes.length > f
                    ? this.nodeExtractor(this.pointerNode.childNodes[f])
                    : false;
            }
            if (typeof f === 'function' && (!this.nodeExtractor || resetExtractor)) {
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

        this.pointer = function (node) {
            if (node) {
                this.pointerNode = node;
            }
            return this.pointerNode;
        };

        this.root = function () {
            return this.xmlDoc.childNodes[0];
        };

        this.toJson = function (xml) {
            var obj = {},
                i = 0,
                len,
                attribute,
                item,
                nodeName,
                old, tmp;
            xml = xml || that.pointerNode;

            if (xml.nodeType === 1) {
                if (xml.attributes.length > 0) {
                    obj['@attributes'] = {};
                    for (i = 0, len = xml.attributes.length; i < len; i++) {
                        attribute = xml.attributes.item(i);
                        obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
                    }
                }
            } else if (xml.nodeType === 3) {
                // obj = xml.nodeValue;
                // obj = xml.nodeValue.replace(/\n/g, '').replace(/^\s*/, '').replace(/\s*$/, '');
                // obj = xml.nodeValue.replace(/>\n</g, '').replace(/^\s*/, '').replace(/\s*$/, '');
                obj = clean(xml.nodeValue);
            }

            if (xml.hasChildNodes()) {
                for (i = 0, len = xml.childNodes.length; i < len; i++) {
                    item = xml.childNodes.item(i);
                    nodeName = item.nodeName;
                    tmp = this.toJson(item);

                    if (typeof (obj[nodeName]) === 'undefined') {
                        !!tmp && (obj[nodeName] = tmp);
                    } else {
                        if (typeof (obj[nodeName].push) === 'undefined') {
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

        /*
        ================================
        1 ELEMENT_NODE
        2 ATTRIBUTE_NODE
        3 TEXT_NODE
        4 CDATA_SECTION_NODE
        5 ENTITY_REFERENCE_NODE
        6 ENTITY_NODE
        7 PROCESSING_INSTRUCTION_NODE
        8 COMMENT_NODE
        9 DOCUMENT_NODE
        10 DOCUMENT_TYPE_NODE
        11 DOCUMENT_FRAGMENT_NODE
        12 NOTATION_NODE
        ================================
        */
        this.jsonify = function (xml) {
            var obj = {},
                i = 0,
                len,
                attribute,
                item,
                nodeName,
                old, tmp;

            xml = xml || that.pointerNode;
            // ELEMENT_NODE
            // nodeName : the element name
            // nodeValue : null
            //
            if (xml.nodeType === 1) {
                obj.name = xml.nodeName;
                if (xml.attributes.length > 0) {
                    obj['@attributes'] = {};
                    for (i = 0, len = xml.attributes.length; i < len; i++) {
                        attribute = xml.attributes.item(i);
                        obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
                    }
                }
            } else if (xml.nodeType === 3) {
                // node that 2 has been skipped since they are attributes, already done
                // TEXT_NODE 3
                // nodeName : #text
                // nodeValue : content of node
                //
                obj = clean(xml.nodeValue);
                // CDATA_SECTION_NODE 4
                // nodeName : #cdata-section
                // nodeValue : content of node
                //
            } else if (xml.nodeType === 4) {
                obj.value = clean(xml.nodeValue);
                // ENTITY_REFERENCE 5
                // nodeName : entity reference name
                // nodeValue : null
                //
            } else if (xml.nodeType === 5) {
                obj.value = clean(xml.nodeValue);

                // ENTITY_NODE 6
                // nodeName : entity node
                // nodeValue : null
                //
            } else if (xml.nodeType === 6) {
                obj.name = clean(xml.nodeName);
                // PROCESSING_INSTRUCTION_NODE 7
                // nodeName : target
                // nodeValue : content of node
                //
            } else if (xml.nodeType === 7) {
                obj.value = clean(xml.nodeValue);
                // COMMENT_NODE 8
                // nodeNAme : #comment
                // nodeValue : comment text
                //
            } else if (xml.nodeType === 8) {
                obj.value = xml.data;
                // DOCUMENT_NODE 9
                // nodeName : #document
                // nodeValue : null
                //
            } else if (xml.nodeType === 9) {
                obj.value = clean(xml.nodeValue);
                // DOCUMENT_TYPE_NODE 10
                // nodeName : doctype name
                // nodeValue : null
                //
            } else if (xml.nodeType === 10) {
                obj.value = clean(xml.nodeValue);
                // DOCUMENT_FRAGMENT_NODE 11
                // nodeName : #document fragment
                // nodeValue : null
                //
            } else if (xml.nodeType === 11) {
                obj.value = clean(xml.nodeValue);
                // NOTATION_NODE 12
                // nodeName : notation name
                // nodeValue : null
                //
            } else if (xml.nodeType === 12) {
                obj.value = clean(xml.nodeValue);
            }

            if (xml.hasChildNodes()) {
                for (i = 0, len = xml.childNodes.length; i < len; i++) {
                    item = xml.childNodes.item(i);
                    nodeName = item.nodeName;

                    tmp = this.jsonify(item);

                    if (typeof (obj[nodeName]) === 'undefined') {
                        !!tmp && (obj[nodeName] = tmp);
                    } else {
                        if (typeof (obj[nodeName].push) === 'undefined') {
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

        return that;
    },
    /**
     * SOME UTILITY FUNCTIONS
     */
    _text: function (node) {
        return node.childNodes[0].nodeValue;
    },
    _attribute: function (node, attribute) {
        var r = node.attributes.getNamedItem(attribute);
        if (r == null) { return ''; }
        return r.nodeValue;
    },
    _tag: function (node, tag, n) {
        var nodes = node.getElementsByTagName(tag);
        return n < nodes.length ? nodes[n] : false;
    }
});
