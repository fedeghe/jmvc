var http = require('http'),
	url = require('url'),
	fs = require('fs'),
	config = fs.existsSync('config.json') ? JSON.parse(fs.readFileSync('config.json')) : {},
	rx = new RegExp("^\/(" + config.free.join('|') + ")\/"),
	port = 'port' in config ? config.port : 8080;

http.createServer(function (request, response) {
	var lookup = url.parse(decodeURI(request.url)).pathname,
 		where = config.webroot + lookup.match(rx) ? lookup : '/' + config.accesspoint;
	console.log(where);
 	response.end(fs.readFileSync( where ));
}).listen(port);

console.log('JMVC development server listening on port ' + port);
