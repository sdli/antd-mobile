var config = require("./config.js");
var pass = function(obj,func){
    return {   
            result: 1,
            msg: "通过",
            verifiedBody: obj,
            func: func
    }
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
            console.log(body,req.session.pngNum);
            if(body.Type == 1 && parseInt(body.code) == req.session.pngNum){
                console.log(body.passWd,"password");
                return  pass(
                    {
                        Type: 1,
                        Phone: body.Phone,
                        PassWd: body.PassWd
                    },
                    function(req){
                        var phone = req.body.Phone;
                        return function(){
                            console.log(phone,"执行了保存操作");
                            req.session.phone = phone;
                        }   
                    });
            }else if(body.Type == 2){
                return pass(
                    {Phone:body.Phone,VerifyCode:body.VerifyCode,Type:2},
                    function(req){
                        var phone = req.body.Phone;
                        return function(){
                            console.log(phone,"执行了保存操作");
                            req.session.phone = phone;
                        }   
                    }
                );
            };
        case ("VerifyCodeReq"):
            return pass({Phone:body.Phone,Type:body.Type}); // 登录时type为2,注册为1，前端控制
        case ("checkOpenid"):
            console.info(req.session,req.session.openid,"here!!!!");
            return (typeof req.session !== "undefined" && typeof req.session.openid !== "undefined")?passToRes({openid: 1}):passToRes({openid:0});
        case ("RegisterReq"):
            return pass({
                Phone:body.Phone,
                VerifyCode:body.VerifyCode,
                AreaId:body.AreaId,
                Iden:body.Iden,
                PassWord:body.PassWd
            },
            function(req){
                var phone = req.body.Phone;
                return function(){
                    console.log(phone,"执行了保存操作");
                    req.session.phone = phone;
                }   
            }
            );
        case ("checkLogin"):
            return (typeof req.session.phone !== "undefined" && req.session.phone.length == 11)?
                    passToRes({login:true,phone:req.session.phone}):
                    passToRes({login:false});
        default:
            return pass();
    }
}

module.exports = reqVerify;