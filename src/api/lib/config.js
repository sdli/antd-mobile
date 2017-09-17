var path = require("path");
var filepath = path.join(__dirname,"../protos/teacher.proto");

//proto 字典
var dictionary = {
    TeacherCourseReq:"TeacherCourseResp",
    TeacherLoginReq: "TeacherLoginResp",
    CollectInfoQueryReq: "CollectInfoQueryResp",
    TestCaseQueryReq: "TestCaseQueryResp",
    VerifyCodeReq: "VerifyCodeResp"
};

var headers ={
    "Content-Type": "application/x-protobuf",
    "Authorization": "Basic d2VpbGluX2h0dHA6QFB4dzE3RCM="
};

//redis配置
var redis = {
   "host" : "172.18.0.4",
   "port" : "6699",
   "db" : 1,
   "ttl" : 1800,
   "logErrors" : true
};

module.exports = {
    apiPort: 3061,
    redis: redis,
    dev:{
        headers: headers,
        hostname: '47.94.101.71',
        apiPort: 8001,
        package: "teacher",
        filePath: filepath,
        protoReqList: dictionary
    },
    production:{
        headers: headers,
        hostname: '47.94.101.71',
        apiPort: 8001,
        package: "teacher",
        protoReqList: dictionary,
        filePath: filepath
    }
};