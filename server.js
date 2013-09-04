/*var http = require('http'),
	fs = require('fs');
http.createServer(function (request, response) {
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.end(fs.readFileSync('../index.html')); 
}).listen(8010);

*/
var http = require('http'),
	path = require('path'),
	url = require('url'),
	fs = require('fs');
   
http.createServer(function (request, response) {
	var lookup = url.parse(decodeURI(request.url)).pathname,
 		letgo = lookup.match(/^\/(app|media)\//);


 	response.end(fs.readFileSync(  letgo ? '.' + url.parse(decodeURI(request.url)).pathname : './index.html'  ));

}).listen(8080);
console.log('started');