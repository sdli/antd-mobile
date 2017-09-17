var express = require('express');
var path = require('path');
var app = new (express)();
var httpProxy = require('http-proxy');
var compression = require('compression');
var config = require("./src/utils/configs");

app.use(compression());

var port = config.apiPort;
var serverPort = config.serverPort;
var targetUrl = (typeof process.env.NODE_ENV === "undefined" || process.env.NODE_ENV == "dev")?config.server + ":" + port:config.productionServer+":"+config.productionApiPort;
var proxy = httpProxy.createProxyServer({
      target: targetUrl
});

app.use(express.static(path.join(__dirname, '/dist')));
app.use(express.static(path.join(__dirname, '/dist/static')));

// 端口转发
app.use('/api', (req, res) => {
  proxy.web(req, res, { target: targetUrl });
});

// 微信验证文件，一次性验证，上线时可删除。
app.get("/MP_verify_8NkWdD5pYfIZ0k0p.txt",(req,res)=>{
  var body = "8NkWdD5pYfIZ0k0p";
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(body);
  res.end();
});

// 监听方法
app.listen(serverPort,function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Server is listening on port %s. Open up http://localhost:%s/ in your browser.", serverPort, serverPort)
  }
});
