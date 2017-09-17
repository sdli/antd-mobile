var protoBuffer = require("protoBuf-tools");
var path = require("path");
var configs = require("./lib/config.js");
var appInit = require("./lib/appInit.js"); // app配置
var reqVerify = require("./lib/reqVerify.js");

// 根据process加载配置，未设置默认为测试环境
typeof process.env.NODE_ENV === "undefined" || process.env.NODE_ENV.trim() == "dev" ? protoBuffer.init(configs.dev) : protoBuffer.init(configs.production);

// express库
var express = require('express');
var app = new express();

// 初始化APP
appInit(app, {
    listen: configs.apiPort, // 开启端口监听
    img: 4, // 开启验证码图片监听
    cookieParser: true, // 开启cookie解析（匹配session）,
    jsonParser: true, // 开启json解析
    sessionOptions: {
        secret: 'sessiontest',
        resave: true,
        saveUninitialized: false,
        cookie: { secure: false //不设置过期时间
        } }
});

// 接口统一接收地址
app.post('/', function (req, res) {
    var body = req.body;
    var verifyResult = reqVerify(req, res);
    console.log(verifyResult);
    if (verifyResult.result == 1) {
        console.log(verifyResult.verifiedBody);
        protoBuffer.singleRequest(body.reqType, "POST", verifyResult.verifiedBody, function (data) {
            res.setHeader("Content-Type", "application/json");
            console.log(data);
            res.json(data);
        });
    } else {
        res.setHeader("Content-Type", "application/json");
        res.json({
            Result: -1,
            ErrMsg: verifyResult.msg,
            data: typeof verifyResult.verifiedBody !== "undefined" ? verifyResult.verifiedBody : ""
        });
    }
});
//# sourceMappingURL=index.js.map