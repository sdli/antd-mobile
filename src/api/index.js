var protoBuffer        = require("./lib/protobufTools");
var path               = require("path");
var https              = require("https");
var configs            = require("./lib/config.js");
var appInit            = require("./lib/appInit.js"); // app配置
var reqVerify          = require("./lib/reqVerify.js");

// 根据process加载配置，未设置默认为测试环境
(typeof process.env.NODE_ENV === "undefined" || process.env.NODE_ENV.trim() == "dev")
?protoBuffer.init(configs.dev)
:protoBuffer.init(configs.production);

// express库
var express            = require('express');
var app                = new express();

// 初始化APP
appInit(app,{
    cookieParser: true, // 开启cookie解析（匹配session）,
    jsonParser: true, // 开启json解析
    sessionOptions:{
        secret: 'sessiontest',
        resave: true,
        saveUninitialized: false,
        cookie: {
            secure: false
        }
    },
    sessionDevOptions:{
        secret: 'sessiontest',
        resave: true,
        saveUninitialized: false,
        cookie: {secure: false} //不设置过期时间
    },
    openid: true, // 开启微信openid获取,
    listen: configs.apiPort, // 开启端口监听
    img: 4,  // 开启验证码图片监听
});

// 接口统一接收地址
app.post('/',function(req,res){
    var body = req.body;
    var verifyResult = reqVerify(req,res);
    console.log(verifyResult);
    if(verifyResult.result == 1){
        console.log(verifyResult.verifiedBody,"verified");
        if(typeof verifyResult.reqType !== "undefined"){
            protoBuffer.singleRequest(
                verifyResult.reqType,
                "POST",
                verifyResult.verifiedBody,
                function(data){
                    res.setHeader("Content-Type", "application/json");
                    console.log(data);
                    (verifyResult.func != null)?verifyResult.func(req)(data):null;
                    res.json(data);
                }
            );
        }else{
            res.json({
                Result: -1,
                ErrMsg: "请求出错",
                data: {}
            });
        }
    }else if(verifyResult.result == 2){
        console.log(verifyResult.verifiedBodies);
        protoBuffer.multiRequests(
            verifyResult.verifiedBodies,
            function(data){
                res.json(data);
            }
        );
    }else if(verifyResult.result == 3){
        https.get(verifyResult.verifiedBody.reqUrl,function(httpReq){
            httpReq.on("data",function(data){
                var data = JSON.parse(data);
                if(typeof data.openid !== "undefined"){
                    req.session.openid = data.openid;
                    res.json({
                        Result: 0,
                        ErrMsg: "获取微信openid成功！",
                        data: {}
                    });
                }
            });
        });
    }else{
        res.setHeader("Content-Type", "application/json");
        res.json({
            Result: -1,
            ErrMsg: verifyResult.msg,
            data: (typeof verifyResult.verifiedBody !== "undefined")?verifyResult.verifiedBody:""
        });
    }
});

process.on('unhandledRejection', (reason, p) => {
    console.log("Unhandled Rejection at: Promise ", p, " reason: ", reason);
});