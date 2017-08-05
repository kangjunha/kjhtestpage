var http = require('http');
var port = process.env.PORT || 3000;

http.createServer(function (request, response) {
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.end('<h1>Hello world!</h1>');
}).listen(port, function() {
	console.log('Server running at http://127.0.0.1:' + port);
});