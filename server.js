var express = require('express');
var path = require('path');
var app = new (express)();
var httpProxy = require('http-proxy');
var compression = require('compression');
var config = require("./src/utils/configs");

app.use(compression());

var port = config.apiPort;
var serverPort = config.serverPort;
var targetUrl = config.server + ":" + port;
var proxy = httpProxy.createProxyServer({
  target: targetUrl
});

app.use(express.static(path.join(__dirname, '/dist')));
app.use(express.static(path.join(__dirname, '/dist/static')));

app.use('/api', (req, res) => {
  proxy.web(req, res, { target: targetUrl });
});

app.listen(serverPort,function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Server is listening on port %s. Open up http://localhost:%s/ in your browser.", serverPort, serverPort)
  }
});

var http = require('http');
var fs = require('fs');

http.createServer(function(request, response){
    var mp4 = 'test.mp4';
    var stat = fs.statSync(mp4);

    response.writeHead(200, {
        'Content-Type': 'video/mp4',
        'Content-Length': stat.size
    })

    var readableStream = fs.createReadStream(mp4);
    readableStream.pipe(response);
}).listen(7002);