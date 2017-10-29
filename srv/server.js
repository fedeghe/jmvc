var http = require('http'),
	url = require('url'),
	fs = require('fs'),

	configfile = __dirname + '/config.json',
	config = fs.existsSync(configfile) ? JSON.parse(fs.readFileSync(configfile)) : {},
	rx = new RegExp("^\/(" + config.free.join('|') + ")\/"),
	port = 'port' in config ? config.port : 8080;

http.createServer(function (request, response) {

	try{
		var lookup = url.parse(decodeURI(request.url)).pathname,
			where = config.webroot + (lookup.match(rx) ? lookup : '/' + config.accesspoint);

		response.end(fs.readFileSync( where ));

	}catch(e){
		console.log(e);
		console.log('Server EXITED')
		process.exit();
	}

}).listen(port);

console.log('JMVC development server listening on port ' + port + ' (http://localhost:' + port + ')');
console.log('press CTRL + c to shut it down');
