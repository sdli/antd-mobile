
var crypto=require('crypto');  
var md5=crypto.createHash("md5"); 

function payInit(appId,prepay_id){
    this.appId = appId,
    this,prepay_id = prepay_id;
    this.nonceStr = this.getNonceStr(32);
    this.timeStamp = this.getTimeStamp();
    this.options = {
        "appId": this.appId,
        "timeStamp": this.timeStamp,
        "nonceStr": this.nonceStr,
        "package":"prepay_id=" + this.prepay_id,
        "signType":"MD5",
        "paySign": this.getPaySign(this.appId,this.nonceStr,"prepay_id=" + this.prepay_id,"MD5",this.timeStamp)
    };
    this.jsApiCall = function(){
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            this.options,
            function(res){
                WeixinJSBridge.log(res.err_msg);
                alert(res.err_code+res.err_desc+res.err_msg);
            }
        );
    }.bind(this);
}

payInit.prototype.getTimeStamp = function(){
    return Date.parse(new Date())/1000;
}

payInit.prototype.getNonceStr = function(int){
    var base = "abcdefjhijklmnopqistuvwxyz1234567890";
    var string = "";
    for(var i = 0; i<int; i++){
        string += base.substr(Math.random()*(base.length),1);
    }
    return string;
}

payInit.prototype.getPaySign = function(appId,nonceStr,pack,signType,timeStamp){
    const key = "3foptz6c3zk3lh28jd5vpu0q8y4umnai";
    const str1 = "appid="+appId+"&nonceStr="+nonceStr+"&package="+pack+"&signType="+signType+"&timeStamp="+timeStamp;
    const newStr = str1 +"&key="+key;
    alert(newStr,md5.update(newStr).digest("hex").toUpperCase());
    return md5.update(newStr).digest("hex").toUpperCase();
}

payInit.prototype.getTimeStamp = function(){
    return Date.parse(new Date())/1000;
}

payInit.prototype.callpay = function(){
    if (typeof WeixinJSBridge == "undefined"){
        if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', this.jsApiCall, false);
        }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', this.jsApiCall); 
            document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall);
        }
    }else{
        this.jsApiCall();
    }
}

export default payInit;