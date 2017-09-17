var config = require("./config.js");
var pass = function(obj){
    return Object.assign(
        {result: 1,msg: "通过"},
        {verifiedBody:obj}
    );
};
var passToRes = function(obj){
    return Object.assign(
        {result: -1,msg:"返回给前端数据"},
        {verifiedBody:obj}
    );
}

var reqVerify = function(req,res){
    var body = req.body;
    switch (body.reqType){
        case ("TeacherLoginReq"):
            if(body.Type == 1 && parseInt(body.code) == req.session.pngNum){
                return  {
                    result: 1,
                    verifiedBody: {
                    Type: 1,
                    Phone: body.Phone,
                    PassWd: body.PassWd
                }}
            }else if(body.Type == 2){
                    return pass({Phone:body.Phone,verifyCode:body.verifyCode,Type:2});
            };
        case ("VerifyCodeReq"):
            return pass({Phone:body.Phone,Type:body.Type}); // 登录时type为2,注册为1，前端控制
        case ("checkOpenid"):
            return (typeof req.session !== "undefined" && req.session.openid != "")?passToRes({openid: 1}):passToRes({openid:0});
        default:
            return pass();
    }
}

module.exports = reqVerify;
