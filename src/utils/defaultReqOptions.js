import request from "./request";
import config from "./configs";

const postInit = function(postObj,bodyObj){
    var post = JSON.stringify(postObj);
    return Object.assign(JSON.parse(post),{body:JSON.stringify(bodyObj)});
};

const requestMethod = {
    get: {
       method: "GET",
       credentials: "include" 
    },
    post:{
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8" 
        },
        credentials: 'include'
    }
};

const requestExport = function*({bodyObj}){
    var url;
    url = (config.devDomain)+"/api";
    // url = config.server+":"+config.serverPort+"/api";
    var postInitObj = postInit(requestMethod.post,bodyObj);
    console.log(url,postInitObj);
    var data = yield request(url,postInitObj);
    return data;
};

export default requestExport;