var http = require("http");
var path = require("path");
var protoBuf = require("protobufjs");
var bufferHelper = require("bufferhelper");

var ProtoBuffTools = function(reqProtoMessageName,method,data,config){
    //test new declaration
    if(!new.target) throw "protoBuffTolls must have [new] declaration!";
    
    //constructor
    this.method = method;
    this.data = data;
    this.options = (typeof config.hostname !== "undefined")?{
        host: config.hostname,
        port: config.apiPort,
        path: "http://"+config.hostname+config.apiPort+"/"+reqProtoMessageName,
        method: method,
        headers: config.headers
    }:{
        host: config.domain,
        path: "http://"+config.domain+"/"+reqProtoMessageName,
        method: method,
        headers: config.headers
    };
}

ProtoBuffTools.prototype.createReqBuff = function(reqProtoMessageName,root,config){
    var AwesomeMessage = root.lookup(config.package+"."+reqProtoMessageName);  
    var dataTable= this.data;
    try{
        var message = AwesomeMessage.create(dataTable);  
        var buffer = AwesomeMessage.encode(message).finish();
    }catch(e){
        if(e) throw "Error in Changing Data into buffer;"
    }
    return buffer;
}

var protoBufferStart = function(reqProtoMessageName,method,data,func){
    var config = this.config;
    var protoBuffer = new ProtoBuffTools(reqProtoMessageName,method,data,config);
    var reqPromise = new Promise(function(resolve,reject){
        protoBuf.load(config.filePath,function(err,root){
            if (err) throw err;
            var reqBuffer = protoBuffer.createReqBuff(reqProtoMessageName,root,config);
            var options = Object.assign(
                protoBuffer.options,
                {
                    body:reqBuffer
                }
            );
            console.log(options,"这是请求报文");
            var reqHttps = http.request(options, function(resHttps) {
                var status = resHttps.statusCode;
                var fileroot = root;
                var rawData = new bufferHelper();

                if(status == 200){
                    resHttps.on('data', function(buffer){
                        rawData.concat(buffer)
                    });
                    resHttps.on("end",function(){
                        var realBuffer = rawData.toBuffer();
                        resolve({buffer:realBuffer,fileroot,reqProtoMessageName});
                    });
                }else{
                    reject();
                }
            });
            reqHttps.write(reqBuffer);
            reqHttps.end();
            reqHttps.on('error', function(e) {
                return "系统异常："+e.message;
            });
        });
    }).catch(function(err){
        console.log(err);
    });

    reqPromise.then(function({buffer,fileroot,reqProtoMessageName}){
        var receiveMsg = fileroot.lookup(config.package+"."+config.protoReqList[reqProtoMessageName]);
        var message = receiveMsg.decode(buffer);
        var returnObj = receiveMsg.toObject(message, {
                enums: String,  // enums as string names
                longs: String,  // longs as strings (requires long.js)
                bytes: String,  // bytes as base64 encoded strings
                defaults: true, // includes default values
                arrays: true,   // populates empty arrays (repeated fields) even if defaults=false
                objects: true,  // populates empty objects (map fields) even if defaults=false
                oneofs: true    // includes virtual oneof fields set to the present field's name
        });
        console.log(returnObj,"这是返回数据");
        func(returnObj);
    },function(){
        throw "promise rejected";
    });
}


var protoBufferMulti = function(InitArr,Initfunc){
    var arr = InitArr;
    var func = Initfunc;
    var config = this.config;
    protoBuf.load(config.filePath,function(err,root){
        if (err) throw err;
        var protoMultiStart = function(arr,obj={}){
            var protoPromise = new Promise(function(resolve,reject){
                var tempData = arr[0];
                if(arr.length >= 1) arr.splice(0,1);
                var reqProtoMessageName = tempData.reqProtoMessageName;
                var protoBuffer = new ProtoBuffTools(reqProtoMessageName,tempData.method,tempData.data,config);
                var reqBuffer = protoBuffer.createReqBuff(reqProtoMessageName,root,config);
                var options = Object.assign(
                    protoBuffer.options,
                    {
                        body:reqBuffer
                    }
                );
                var reqHttps = http.request(options, function(resHttps) {
                    var status = resHttps.statusCode;
                    var fileroot = root;
                    var rawData = new bufferHelper();
                    if(status == 200){
                        resHttps.on('data', function(buffer){
                            rawData.concat(buffer)
                        });
                        resHttps.on("end",function(){
                            var realBuffer = rawData.toBuffer();
                            resolve({buffer:realBuffer,fileroot,reqProtoMessageName,arr,obj});
                        });
                    }else{
                        reject();
                    }
                });
                reqHttps.write(reqBuffer);
                reqHttps.end();
                reqHttps.on('error', function(e) {
                    return "系统异常："+e.message;
                });
            }).catch(function(err){
                console.log(err);
            });

            protoPromise.then(function({buffer,fileroot,reqProtoMessageName,arr,obj}){
                var receiveMsg = fileroot.lookup(config.package+"."+config.protoReqList[reqProtoMessageName]);
                var message = receiveMsg.decode(buffer);
                var returnObj = receiveMsg.toObject(message, {
                        enums: String,  // enums as string names
                        longs: String,  // longs as strings (requires long.js)
                        bytes: String,  // bytes as base64 encoded strings
                        defaults: true, // includes default values
                        arrays: true,   // populates empty arrays (repeated fields) even if defaults=false
                        objects: true,  // populates empty objects (map fields) even if defaults=false
                        oneofs: true    // includes virtual oneof fields set to the present field's name
                });
                var newObj = Object.assign(obj,{
                        [reqProtoMessageName]: returnObj
                });
                if(arr.length >= 1){
                    protoMultiStart(arr,newObj);
                }else{
                    func(newObj);
                }
            },function(){
                throw "promise rejected";
            });
        }

        protoMultiStart(arr,{});
    });
}

var protoBufferExports = {
    singleRequest: protoBufferStart,
    multiRequests: protoBufferMulti,
    config: {},
    init:function(obj){
        if(typeof obj !== "undefined"){
            this.config = obj;
        } else{
            throw "init param must be Object";
        }
    }
}

module.exports = protoBufferExports;