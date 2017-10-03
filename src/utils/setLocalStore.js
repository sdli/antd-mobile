const setLocalStore = function(key,value,time){
    var expireTime = Date.parse(new Date())/1000+time;
    window.localStorage[key] = value+"/"+expireTime;
	console.log(value+"/"+expireTime);
}

const getLocalStore = function(key){
    var getTime = Date.parse(new Date())/1000;
    if(`${key}` in window.localStorage){
        var data = window.localStorage[key];
        var expireTime = data.substr(data.indexOf("/")+1,data.length);
        console.log(expireTime);
        if(parseInt(expireTime) > getTime){
            console.log(parseInt(expireTime)- getTime);
            return data.substr(0,data.indexOf("/"));
        }else{
            return false;
        }
    }else{
        return false
    }
}

export {setLocalStore};
export {getLocalStore};