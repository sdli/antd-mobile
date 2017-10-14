import request from "../utils/defaultReqOptions";
import {hashHistory} from "react-router";
import toastInit from "./lib/toastInit";
import configs from "../utils/configs";
import {setLocalStore,getLocalStore} from "../utils/setLocalStore";
import WexinPay from "./lib/weixinPay";

// 使用weixin.yiaitech.com作为转发，使得正式环境和测试环境都可以获取code
const api_route = configs.payurl;
const redirect_uri = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+configs.appId+"&redirect_uri="+api_route+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"

export default {
  namespace: 'user',

  state: {
    loginToken: "",
    courses: {},
    lessonDetails: {},
    login: false,
    userInfo: {},
    openid: 0,
    lessonMsg:[]
  },

  subscriptions: {
    setup({ dispatch, history ,query}) {  // eslint-disable-line
      console.log(arguments,query);
      history.listen(({ pathname,query }) => {
        window.scrollTo(0,0);
        console.log(query);
        if(pathname !== "/login" && pathname != "/register" && pathname != "/" && pathname != "/loginSelect" && pathname !== "/pay" && pathname != "/getOpenid" && pathname !="/videoplay" && pathname != "/test"){
          dispatch({type:"checkLogin"});
        }
        if(pathname == "/videoplay" || pathname=="/user" || pathname=="/user/statics"){
          dispatch({type:"checkLoginDeep",query});
        }
        if((new RegExp(/\user?/g)).test(pathname)){
          dispatch({type:"getUserInfo"});
        }
        if(pathname == "/"){
          dispatch({type:"getCourseMain"});
        }
        if(pathname == "/lessionList"){
          dispatch({type:"getCourseMain"});
        }
        if(pathname == "/pay"){
          dispatch({type:"checkOpenid"});
        }
        if(pathname == "/login" || pathname == "/register"){
          dispatch({type:"ifNeedLoginOrRegister"})
        }
      });
    },
  },

  effects: {
    *ifNeedLoginOrRegister({},{call,select}){
      var loginStatus = yield select(({user})=>user.login);
      if(loginStatus){
        hashHistory.push("/");
      }
    },
    *login({ bodyObj }, { call, put }) {  // eslint-disable-line
      var loginResult = yield call(request,{bodyObj:bodyObj});
      yield toastInit(put,loginResult,{msg:"登陆成功",type:"success"},{msg:"登录失败，请检查！",type:"fail"});
      if(loginResult.data.Result == 0){
        hashHistory.push("/");
        setLocalStore("tel",bodyObj.Phone,30);
      }
    },
    *register({bodyObj},{call,put}){
      var registerResult = yield call(request,{bodyObj:bodyObj});
      yield toastInit(put,registerResult,{msg:"注册成功！",type:"success"},{msg:"注册失败，请检查验证码！",type:"fail"});
      if(registerResult.data.Result == 0){
        hashHistory.push("/");
        setLocalStore("tel",bodyObj.Phone,30);
      }
    },
    *checkLogin({},{call,put}){
      var loginStatus = yield call(request,{bodyObj:{reqType:"checkLogin"}});
      if(loginStatus.data.data.login){
         yield put({type:"loginOK"});
      }
    },
    *checkLoginDeep({query},{call,put}){
      var loginStatus = yield call(request,{bodyObj:{reqType:"checkLogin"}});
      if(!loginStatus.data.data.login){
          hashHistory.push("/loginSelect");
      }else{
          yield put({type:"loginOK"});
          yield put({type:"checkCourseMain"});
          yield put({
            type:"lessonDetails",
            bodyObj:{
              ...query,
              videoType: 1,
              reqType: "CollectInfoQueryReq"
            }
          });
      }
    },
    *getUserInfo({},{call,put}){
      var loginStatus = yield call(request,{bodyObj:{reqType:"checkLogin"}});
      if(!loginStatus.data.data.login){
          hashHistory.push("/loginSelect");
      }else{
          var userInfo = yield call(request,{bodyObj:{reqType:"TeaInfoQueryReq"}});
          yield put({type:"setUserInfo",userInfo:userInfo.data.TeacherList[0]});
      }
    },
    *getCourseMain({},{call,put,select}){
      var courses = yield call(request,{bodyObj:{reqType:"CourseQueryReq"}});
      console.log(courses);
      yield put({type:"setCourses",courses:courses.data});
    },
    *checkCourseMain({},{call,put,select}){
      var courseList = yield select(({user})=>user.courses);
      if(JSON.stringify(courseList) == "{}"){
        var courses = yield call(request,{bodyObj:{reqType:"CourseQueryReq"}});
        yield put({type:"setCourses",courses:courses.data});
      }
    },
    *getVerifyCode({bodyObj},{call,put}){
      var code = yield call(request,{bodyObj});
      console.log(code);
      if(bodyObj.Type == "1"){
        yield toastInit(put,code,{msg:"发送成功！",type:"info"},{msg:"发送失败，号码已经注册。",type:"fail"});
      }else{
        yield toastInit(put,code,{msg:"发送成功！",type:"info"},{msg:"发送失败，号码尚未注册。",type:"fail"});
      }   
    },
    *lessonDetails({bodyObj},{call,put}){
      var lessonDetails = yield call(request,{bodyObj:bodyObj});
      yield put({type:"setLessonDetails",lessonDetails:lessonDetails.data});
    },
    *checkOpenid({},{call,put}){
      var loginStatus = yield call(request,{bodyObj:{reqType:"checkLogin"}});
      if(loginStatus.data.data.login){
        var checkOpenid = yield call(request,{bodyObj:{reqType:"checkOpenid"}});
        if(typeof checkOpenid.data.data.openid !== "undefined"){
          var ifOpenid = checkOpenid.data.data.openid;
          console.log(ifOpenid);
          if(ifOpenid == 0){
            window.location.href = redirect_uri;
          }else{
            yield put({type:"hasOpenid"});
            yield put({type:"loginOK"});
            yield put({type:"checkCourseMain"});
          }
        }
      }else{
        hashHistory.push("/loginSelect");
      }
    },
    *getPreIdAndPay({bodyObj},{call,put}){
      var getPrePay = yield call(request,{bodyObj:bodyObj});
      console.log(getPrePay);
      var pay = new WexinPay(configs.appId,getPrePay.data.PrepayId,function(){
          alert("支付成功, 现在您可以开始观看已经购买的课程。");
          hashHistory.push("/");
      });
      pay.callpay();
    },
    *getOpenid({bodyObj},{call,put}){
      var checkOpenid = yield call(request,{bodyObj:{reqType:"checkOpenid"}});
      if(typeof checkOpenid.data.data.openid !== "undefined" && checkOpenid.data.data.openid == 1){
        hashHistory.push("/");
      }else{
        var data = yield call(request,{bodyObj:bodyObj});
        if(data.data.Result == 0){
          yield put({type:"checkCourseMain"});
          hashHistory.push(bodyObj.url);
        }else{
          alert("获取微信openid失败，请稍后重试！");
        }
      }
    },
    *collect({bodyObj},{call,put}){
      console.log(bodyObj);
      var data = yield call(request,{bodyObj:bodyObj});
      console.log(data);
      yield toastInit(put,data,{msg:"收藏成功！",type:"info"},{msg:"收藏失败，请重试！",type:"fail"});
      yield put({
        type:"lessonDetails",
        bodyObj:{
          CourseId: bodyObj.CourseId,
          LessonId: bodyObj.LessonId,
          videoType: 1,
          reqType: "CollectInfoQueryReq"
        }
      });
    },
    *testcase({bodyObj},{call,put}){
      var data = yield call(request,{bodyObj:bodyObj});
      if(data){
        var code = {
          data:{
            Result: (bodyObj.RightAnswer==bodyObj.Answer)?0:1
          }
        }
        yield toastInit(put,code,{msg:"回答正确！",type:"info"},{msg:"回答错误！",type:"info"});
        yield put({
          type:"lessonDetails",
          bodyObj:{
            CourseId: bodyObj.CourseId,
            LessonId: bodyObj.LessonId,
            videoType: 1,
            reqType: "CollectInfoQueryReq"
          }
        });
      }
    },
    *leaveLessonMsg({bodyObj},{call,put}){
      var data = yield call(request,{bodyObj:bodyObj});
      yield toastInit(put,data,{msg:"提交成功！",type:"success"},{msg:"提交失败，请稍后重试",type:"fail"});
      hashHistory.go(-1);
    },
    *checkLessonMsg({bodyObj},{call,put}){
      var data = yield call(request,{bodyObj: bodyObj});
      yield put({type:"lessonMsg",msg:data.data.LessonMsg});
    },
    *leaveOpinion({bodyObj},{call,put}){
      var data = yield call(request,{bodyObj:bodyObj});
      yield toastInit(put,data,{msg:"提交成功！",type:"success"},{msg:"提交失败，请稍后重试",type:"fail"});
      hashHistory.go(-1);
    },
    *logout({},{call,put}){
      var data = yield call(request,{bodyObj:{reqType:"logout"}});
      yield put({type:"loginFalse"});
      if(data.data.data.code == 1){
        hashHistory.push("/");
      }
    }
  },

  reducers: {
    setCourses(state, action) {
      return { ...state, courses:action.courses };
    },
    setLessonDetails(state,action){
      return {...state,lessonDetails:action.lessonDetails}
    },
    loginOK(state,action){
      return {...state,login: true};
    },
    loginFalse(state,action){
      return {...state,login: false};
    },
    setUserInfo(state,action){
      return {...state,userInfo:action.userInfo};
    },
    hasOpenid(state,action){
      return {...state,openid:1};
    },
    clearLessonDetails(state,action){
      return {...state,lessonDetails:{}};
    },
    lessonMsg(state,action){
      return {...state,lessonMsg:action.msg};
    }
  }
};