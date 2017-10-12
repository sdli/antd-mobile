// 模块引入
var express       = require('express');
var path          = require('path');
var app           = new (express)();
var httpProxy     = require('http-proxy');
var compression   = require('compression');
var config        = require("./src/utils/configs");
var bodyParse     = require("body-parser");

// 压缩传输，也可以使用gzip模块
app.use(compression());

// 配置信息
var port          = config.apiPort;
var serverPort    = config.serverPort;
var targetUrl     = (typeof process.env.NODE_ENV === "undefined" || process.env.NODE_ENV == "dev")?config.devServer + ":" + port:config.productionServer+":"+config.productionApiPort;
var proxy         = httpProxy.createProxyServer({target: targetUrl});
var domain        = (typeof process.env.NODE_ENV === "undefined" || process.env.NODE_ENV == "dev")?config.devDomain:config.domain;

// express静态资源目录
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

app.get("/wetest-8de8645bbf12ce49c7e41c413c453984.txt",(req,res)=>{
  var body = "wetest-8de8645bbf12ce49c7e41c413c453984";
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(body);
  res.end();
});

// 微信重定向
app.get("/getOpenid",(req,res)=>{
  var code = req.query.code;
  res.writeHead(301, {'Location': domain + '/#/getOpenid?code='+code});
  res.end();
});

// 监听方法
app.listen(serverPort,function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Server is listening on port %s. Open up http://localhost:%s/ in your browser.", serverPort, serverPort)
  }
});