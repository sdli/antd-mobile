
var md5 = require("md5");

/**
 * 
 * @param {*} appId 
 * @param {*} prepay_id 
 */
function payInit(appId,prepay_id){

    // 配置appid，此id为公众号id，不为商户id
    this.appId = appId;

    // 从后台获取的prepay_id
    this.pack = "prepay_id=" + prepay_id;

    // 随机字符串
    this.nonceStr = this.getNonceStr(32);

    // 时间戳
    this.timeStamp = this.getTimeStamp();

    // JS bradge的配置
    this.options = {
        "appId": this.appId,
        "timeStamp": this.timeStamp,
        "nonceStr": this.nonceStr,
        "package":"prepay_id=" + prepay_id,
        "signType":"MD5",
        "paySign": this.getPaySign(this.appId,this.nonceStr,this.pack,"MD5",this.timeStamp)
    };

    // 唤醒支付
    this.jsApiCall = function(){
        alert(JSON.stringify(this.options)+"---call");
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
    const str1 = "appId="+appId+"&nonceStr="+nonceStr+"&package="+pack+"&signType="+signType+"&timeStamp="+timeStamp;
    const newStr = str1 +"&key="+key;
    return md5(newStr).toUpperCase();
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

module.exports = payInit;