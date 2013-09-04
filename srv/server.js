var http = require('http'),
	url = require('url'),
	fs = require('fs'),
	config = fs.existsSync('config.json') ? JSON.parse(fs.readFileSync('config.json')) : {},
	rx = new RegExp("^\/(" + config.free.join('|') + ")\/"),
	port = 8080;


http.createServer(function (request, response) {
	var lookup = url.parse(decodeURI(request.url)).pathname,
 		where = lookup.match(rx) ?
 			config.webroot + url.parse(decodeURI(request.url)).pathname
 			:
 			config.webroot + '/' + config.accesspoint;
 	response.end(fs.readFileSync( where ));

}).listen(port);


console.log('listening on port ' + port);
