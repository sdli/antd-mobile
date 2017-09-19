import request from "../utils/defaultReqOptions";
import {hashHistory} from "react-router";
import toastInit from "./lib/toastInit";
import configs from "../utils/configs";
import {setLocalStore,getLocalStore} from "../utils/setLocalStore";

const api_route = encodeURI(configs.domain + "/api/getOpenid");
const redirect_uri = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+configs.appId+"&redirect_uri="+api_route+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
export default {

  namespace: 'user',

  state: {
    loginToken: "",
    courses: {},
    courseDetails: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        if(pathname !== "/login" && pathname != "/register" && pathname != "/loginSelect"){
          dispatch({type:"checkLogin"});
        }
        if(pathname == "/videoplay"){
          dispatch({type:"checkLoginDeep"});
        }
        if(pathname == "/"){
          dispatch({type:"getCourseMain"});
        }
        if(pathname == "/lessionList"){
          dispatch({type:"checkCourseMain"});
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
      console.log(loginStatus,"检测登录状态");
    },
    *checkLoginDeep({},{call,put}){
      var loginStatus = yield call(request,{bodyObj:{reqType:"checkLogin"}});
      if(!loginStatus.data.data.login){
          hashHistory.push("/loginSelect");
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
    *lessonDetails({bodyObj},{call,pu}){
      var lessonDetails = yield call(reques,{bodyObj});
      console.log(lessonDetails);
    },
    *checkOpenid({},{call,put}){
      var checkOpenid = yield call(request,{bodyObj:{reqType:"checkOpenid"}});
      if(typeof checkOpenid.data.data.openid !== "undefined"){
        var ifOpenid = checkOpenid.data.data.openid;
        console.log(ifOpenid);
        if(ifOpenid == 0){
          window.location.href = redirect_uri;
        }
      }
    }
  },

  reducers: {
    setCourses(state, action) {
      return { ...state, courses:action.courses };
    },
    setCoursesDetails(state,action){
      return {...state,courseDetails:action.courseDetails}
    }
  },

};
