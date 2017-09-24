import request from "../utils/defaultReqOptions";
import {hashHistory} from "react-router";
import toastInit from "./lib/toastInit";
import configs from "../utils/configs";
import {setLocalStore,getLocalStore} from "../utils/setLocalStore";
import WexinPay from "./lib/weixinPay";

const api_route = "http%3a%2f%2fteacher.yiaitech.com%2fgetOpenid";
const redirect_uri = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+configs.appId+"&redirect_uri="+api_route+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
export default {

  namespace: 'user',

  state: {
    loginToken: "",
    courses: {},
    lessonDetails: {},
    login: false,
    userInfo: {},
    openid: 0
  },

  subscriptions: {
    setup({ dispatch, history ,query}) {  // eslint-disable-line
      console.log(arguments,query);
      history.listen(({ pathname }) => {
        if(pathname !== "/login" && pathname != "/register" && pathname != "/loginSelect" && pathname !== "/pay"){
          dispatch({type:"checkLogin"});
        }
        if(pathname == "/videoplay"){
          dispatch({type:"checkLoginDeep"});
        }
        if((new RegExp(/\user?/g)).test(pathname)){
          dispatch({type:"getUserInfo"});
        }
        if(pathname == "/"){
          dispatch({type:"getCourseMain"});
        }
        if(pathname == "/lessionList"){
          dispatch({type:"checkCourseMain"});
        }
        if(pathname == "/pay"){
          dispatch({type:"checkOpenid"});
        }
      });
    },
  },

  effects: {
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
    *checkLoginDeep({},{call,put}){
      var loginStatus = yield call(request,{bodyObj:{reqType:"checkLogin"}});
      if(!loginStatus.data.data.login){
          hashHistory.push("/loginSelect");
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
      yield toastInit(put,code,{msg:"发送成功！",type:"info"},{msg:"发送失败，号码未注册。",type:"fail"});
    },
    *lessonDetails({bodyObj},{call,put}){
      var lessonDetails = yield call(request,{bodyObj:bodyObj});
      console.log("lesson request!!!");
      yield put({type:"setLessonDetails",lessonDetails:lessonDetails.data})
    },
    *checkOpenid({},{call,put}){
      var checkOpenid = yield call(request,{bodyObj:{reqType:"checkOpenid"}});
      if(typeof checkOpenid.data.data.openid !== "undefined"){
        var ifOpenid = checkOpenid.data.data.openid;
        console.log(ifOpenid);
        if(ifOpenid == 0){
          window.location.href = redirect_uri;
        }else{
          yield put({type:"hasOpenid"});
        }
      }
    },
    *getPreIdAndPay({bodyObj},{call,put}){
      var getPrePay = yield call(request,{bodyObj:bodyObj});
      console.log(getPrePay);
      // var pay = new WexinPay(configs.appId,"wx201709231619538114f0cfcc0322680862");
      // pay.callpay();
    },
    *getOpenid({bodyObj},{call,put}){
      var data = yield call(request,{bodyObj:bodyObj});
      if(data.data.Result == 0){
        hashHistory.push(bodyObj.url);
      }else{
        alert("获取微信openid失败，请稍后重试！");
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
    setUserInfo(state,action){
      return {...state,userInfo:action.userInfo};
    },
    hasOpenid(state,action){
      return {...state,openid:1};
    }
  },
};
