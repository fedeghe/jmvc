JMVC.require('core/xmlparser/xmlparser');
JMVC.controllers.xmlparser = function () {
	var v = JMVC.getView('vacuum'),
		parser;
	JMVC.io.getXML('http://ad3.liverail.com/?LR_PUBLISHER_ID=1331&LR_CAMPAIGN_ID=229&LR_SCHEMA=vast2', function (r)	 {
		parser = JMVC.xmlparser.load(r, true);
		console.dir(parser.jsonify());
	});
	v.render();
};