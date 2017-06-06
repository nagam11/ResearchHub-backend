var Config = require('./config/config');
var app = require('./app');

/**
 * Start the server
*/
//Express
app.listen(Config.app.port);
//HTTP version
/*var http = require('http');
var server = http.createServer(function(req, res) {
  res.writeHead(200);
  console.log("Server is listening on port %s", Config.app.port);
  res.end('Hi everybody. This is the ResearchHub server!');
});
server.listen(Config.app.port);*/
