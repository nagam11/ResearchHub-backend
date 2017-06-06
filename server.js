var Config = require('./config/config');
var app = require('./app');

/**
 * Start the server
*/
//if we want to use express
//app.listen(Config.app.port);
var http = require('http');
var server = http.createServer(function(req, res) {
  res.writeHead(200);
  console.log("Server is listening on port %s", Config.app.port);
  res.end('Hi everybody. This is the ResearchHub server!');
});
server.listen(Config.app.port);
