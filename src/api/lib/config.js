var path = require("path");
var filepath = path.join(__dirname,"../protos/teacher.proto");

//proto 字典
var dictionary = {
    TeacherCourseReq:"TeacherCourseResp",
    TeacherLoginReq: "TeacherLoginResp",
    CollectInfoQueryReq: "CollectInfoQueryResp",
    TestCaseQueryReq: "TestCaseQueryResp",
    VerifyCodeReq: "VerifyCodeResp",
    RegisterReq: "RegisterResp",
    CourseQueryReq: "CourseQueryResp",
    TeacherCourseReq: "TeacherCourseResp",
    SecurityTokenReq: "SecurityTokenResp",
    TeaInfoQueryReq: "TeaInfoQueryResp",
    PayCourseReq:"PayCourseResp",
    DialogCollectReq:"DialogCollectResp",
    TestAnswerCommitReq: "TestAnswerCommitResp",
    LessonMessageQueryReq: "LessonMessageQueryResp",
    LessonMessageCommitReq: "LessonMessageCommitResp",
    CourseOpinionCommitReq: "CourseOpinionCommitResp"
};

var headers ={
    "Content-Type": "application/x-protobuf",
    "Authorization": "Basic d2VpbGluX2h0dHA6QFB4dzE3RCM="
};

//redis配置
var redis = {
   "host" : "172.31.218.116",
   "port" : "6699",
   "db" : 1,
   "ttl" : 3600*24,
   "logErrors" : true
},devRedis = {
   "host" : "172.17.134.132",
   "port" : "6699",
   "db" : 1,
   "ttl" : 3600*24,
   "logErrors" : true
};

module.exports = {
    apiPort: 3061,
    redis: redis,
    devRedis: devRedis,
    appId:"wx7d69cc6664fea758",
    appSecret:"ed630046456d36d2ac82f0456f79a06b",
    dev:{
        headers: headers,
        apiPort: 8001,
        package: "teacher",
        filePath: filepath,
        domain: "test.api.yiaitech.com",
        protoReqList: dictionary
    },
    production:{
        headers: headers,
        apiPort: 8001,
        package: "teacher",
        domain: "api.yiaitech.com",
        protoReqList: dictionary,
        filePath: filepath
    }
};