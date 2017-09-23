var config = require("./config.js");

// 单次请求
var pass = function(obj,reqType,func){
    return {   
            result: 1,
            msg: "通过",
            verifiedBody: obj,
            func: func,
            reqType: reqType
    }
};

// 多次请求
var passMulti = function(arr,func){
    return {
        result: 2,
        msg: "通过",
        func: func,
        verifiedBodies: arr
    }
}

// 直接返回前端，不做请求
var passToRes = function(obj){
    return Object.assign(
        {result: -1,msg:"返回给前端数据"},
        {verifiedBody:obj}
    );
}

// http get请求
var passToHttpGet = function(obj){
    return {
        result: 3,
        msg: "通过",
        verifiedBody: obj,
        func: func
    }
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
                    body.reqType,
                    function(req){
                        var phone = req.body.Phone;
                        return function(data){
                            console.log(phone,"执行了保存操作");
                            req.session.phone = phone;
                            req.session.teacherid = data.TeacherId;
                        }   
                    });
            }else if(body.Type == 2){
                return pass(
                    {Phone:body.Phone,VerifyCode:body.VerifyCode,Type:2},
                    body.reqType,
                    function(req){
                        var phone = req.body.Phone;
                        return function(data){
                            console.log(phone,"执行了保存操作");
                            req.session.phone = phone;
                            req.session.teacherid = data.TeacherId;
                        }   
                    }
                );
            };
        case ("VerifyCodeReq"):
            return pass({
                Phone:body.Phone,
                Type:body.Type},
                body.reqType
            ); // 登录时type为2,注册为1，前端控制
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
                body.reqType,
                function(req){
                    var phone = req.body.Phone;
                    return function(data){
                        console.log(phone,"执行了保存操作");
                        req.session.phone = phone;
                        req.session.teacherid = data.TeacherId;
                    }   
                }
            );
        case ("checkLogin"):
            return (typeof req.session.phone !== "undefined" && req.session.phone.length == 11)?
                    passToRes({login:true,phone:req.session.phone}):
                    passToRes({login:false});
        case ("CourseQueryReq"):
            if(typeof req.session.phone !== "undefined" && req.session.phone.length == 11 && req.session.teacherid != ""){
                return passMulti([
                        {
                            reqProtoMessageName: "CourseQueryReq",
                            method:"POST",
                            data:{}
                        },
                        {
                            reqProtoMessageName: "TeacherCourseReq",
                            method:"POST",
                            data:{
                                TeacherId: req.session.teacherid
                            }
                        }
                    ],function(data){
                        console.log(data);
                    }
                );
            }else{
                return pass({},body.reqType); 
            }
        case ("CollectInfoQueryReq"):
            if(typeof req.session.phone !== "undefined" && req.session.phone.length == 11 && req.session.teacherid != ""){
                return passMulti(
                    [
                        {
                            reqProtoMessageName: "CollectInfoQueryReq",
                            method:"POST",
                            data:{
                                TeacherId: req.session.teacherid,
                                CourseId: req.body.CourseId,
                                LessonId : req.body.LessonId
                            }
                        },
                        {
                            reqProtoMessageName: "TestCaseQueryReq",
                            method:"POST",
                            data:{
                                TeacherId: req.session.teacherid,
                                CourseId: req.body.CourseId,
                                LessonId : req.body.LessonId 
                            }
                        },
                        {
                            reqProtoMessageName: "SecurityTokenReq",
                            method:"POST",
                            data:{
                                Type: req.body.videoType,
                                VideoId: req.body.VideoId
                            }  
                        }
                    ]
                );
            }
        case "getOpenid":
            var baseUrl =  "https://api.weixin.qq.com/sns/oauth2/access_token";
            var reqUrl = baseUrl+"?appid="+config.appId+"&secret="+config.appSecret +"&code="+ req.body.code+"&grant_type=authorization_code";
            return passToHttpGet({reqUrl: reqUrl});
        case "TeaInfoQueryReq":
            if(typeof req.session.teacherid !== 'undefined'){
                return pass({
                        TeacherId: req.session.teacherid 
                    },
                    req.body.reqType
                );
            }
        case "getPrePay":
            if(typeof req.session.teacherid !== "undefined"){
                return pass({
                    TeacherId:req.session.teacherid,
                    CourseId:req.body.CourseId,
                    Money: req.body.Money,
                    reqType: "PayCourseReq"
                });
            }
        default:
            return pass();
    }
}

module.exports = reqVerify;