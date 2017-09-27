import React from 'react';
import { Router, Route,IndexRoute } from 'dva/router';
import IndexPage from './routes/IndexPage';
import LessonList from "./routes/LessionList.route";
import VideoPage from "./routes/VideoPage.route";
import MessagePage from "./routes/Message.route";
import UserCenterPage from "./routes/UserCenter.route";
import CommentDetailsPage from "./routes/CommentDetails.route";
import XindePage from "./routes/Xinde.route";
import Nprogress from "./routes/Nprogress.route";
import Progress from "nprogress";
import LoginPage from "./routes/Login.route";
import UserStatics from "./routes/lessionStatics.route";
import UserInfoPage from "./routes/UserInfoPage.route";
import RegisterPage from "./routes/RegisterPage.route";
import LoginSelectPage from "./routes/LoginSelect.route";
import GetOpenidPage from "./routes/GetOpenid.route";
import PayPage from "./routes/PayPage.route";
import Videotest from "./routes/videotest.route";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Nprogress} >
        <IndexRoute component={IndexPage} />
        <Route path="/lessionList" component={LessonList} />
        <Route path="/videoplay" component={VideoPage} />
        <Route path="/message" component={MessagePage} />
        <Route path="/user" >
          <IndexRoute component={UserCenterPage} />
          <Route path="/user/statics" component={UserStatics} />
          <Route path="/user/info" component={UserInfoPage} />
        </Route>
        <Route path="/commentDetails" component={CommentDetailsPage} />
        <Route path="/xinde" component={XindePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/loginSelect" component={LoginSelectPage} />
        <Route path="/getOpenid" component={GetOpenidPage} />
        <Route path="/pay" component={PayPage} />
        <Route path="/videotest" component={Videotest} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
