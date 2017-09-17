var configs = require("./config.js");
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var captchapng = require('captchapng');

//获取png图片方法
var imgGenerator = function (num) {
    return function (req, res) {
        var pngNum = parseInt(Math.random() * 9 * Math.pow(10, num - 1) + Math.pow(10, num - 1));
        req.session.pngNum = pngNum;
        var p = new captchapng(80, 30, parseInt(pngNum)); // width,height,numeric captcha 
        p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha) 
        p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha) 

        var img = p.getBase64();
        var imgbase64 = new Buffer(img, 'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png'
        });
        res.end(imgbase64);
    };
};

// 监听方法
var listen = function (port) {
    return function (error) {
        if (error) {
            console.warn("listen method error");
        } else {
            console.info("==> 🌎  API listening on port %s.", port, port);
        }
    };
};

// 配置传输session和cookie
var appInit = function (app, options) {
    typeof options.cookieParser !== "undefined" && options.cookieParser ? app.use(cookieParser()) : null;
    typeof options.jsonParser !== "undefined" && options.cookieParser ? app.use(bodyParser.json()) : null;
    typeof options.jsonParser !== "undefined" && options.cookieParser ? app.use(bodyParser.urlencoded({ extended: false })) : null;
    typeof options.sessionOptions !== "undefined" && options.cookieParser ? app.use(session(options.sessionOptions)) : null;
    typeof options.img !== "undefined" && options.cookieParser ? app.get("/verifycode", imgGenerator(options.img)) : null;
    typeof options.listen !== "undefined" ? app.listen(options.listen, listen(options.listen)) : null;
};

module.exports = appInit;
//# sourceMappingURL=appInit.js.map